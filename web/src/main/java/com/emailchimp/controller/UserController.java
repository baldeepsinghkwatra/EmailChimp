/**
 * ****************************************************************************
 *
 * Copyright (c) 2016, Mindfire Solutions and/or its affiliates. All rights
 * reserved.
 * ___________________________________________________________________________________
 *
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Mindfire and its suppliers,if any. The intellectual and technical concepts
 * contained herein are proprietary to Mindfire Solutions. and its suppliers and
 * may be covered by us and Foreign Patents, patents in process, and are
 * protected by trade secret or copyright law. Dissemination of this information
 * or reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Mindfire Solutions
 */
package com.emailchimp.controller;

import com.emailchimp.constants.ApplicationConstants;
import com.emailchimp.constants.UserConstants;
import com.emailchimp.core.service.Email;
import com.emailchimp.model.LoginUser;
import com.emailchimp.core.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import com.emailchimp.util.GenerateCode;
import com.emailchimp.util.ReadFile;
import java.security.Principal;
import java.util.Calendar;
import java.util.Locale;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.emailchimp.core.service.AccountService;

/**
 *
 * @author baldeep
 */
@Controller
public class UserController {

    @Autowired
    AccountService accountService;
    @Autowired
    private MessageSource messageSource;
    @Autowired
    private ResourceLoader resourceLoader;
    @Value("${domain.${mode}}")
    private String domain;
    @Autowired
    Email email;
    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * Welcome page that checks if the user is already logged in and if his
     * session is persisted route him to the role based welcome page else show
     * login page
     *
     * @param principal
     * @param request
     * @param error
     * @param logout
     * @return
     */
    @GetMapping(UserConstants.DEFAULT_URL)
    public ModelAndView welcomePage(Principal principal, HttpServletRequest request, String error, String logout) {
        System.out.println(logout);
        if (error != null) {
            return new ModelAndView(UserConstants.LOGIN_PAGE, ApplicationConstants.MESSAGE_DEFAULT, getErrorMessage(request, "SPRING_SECURITY_LAST_EXCEPTION"));
        } else if (logout != null) {
            
            return new ModelAndView(UserConstants.LOGIN_PAGE, ApplicationConstants.MESSAGE_DEFAULT, "You have been Logged out Successfully");
        } else {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            if (principal != null) {
                AbstractAuthenticationToken authToken = null;
                try {
                    authToken = (UsernamePasswordAuthenticationToken) principal;
                } catch (Exception e) {
                    authToken = (RememberMeAuthenticationToken) principal;
                }
                LoginUser user = (LoginUser) authToken.getPrincipal();

                String userName = "";

                if (user != null) {
                    userName = user.getUserName();
                    String userRole = "";

                    for (GrantedAuthority authority : auth.getAuthorities()) {
                        userRole = authority.getAuthority();
                    }
                    switch (userRole) {
                        case UserConstants.ROLE_ADMIN:
                            return new ModelAndView(UserConstants.WELCOME_PAGE_ADMIN);
                        case UserConstants.ROLE_PROVIDER:
                            return new ModelAndView(UserConstants.WELCOME_PAGE_PROVIDER);
                        case UserConstants.ROLE_CONSUMER:
                            return new ModelAndView(UserConstants.WELCOME_PAGE_CONSUMER);
                        default:
                            break;
                    }
                }
            }
        }
        return new ModelAndView(UserConstants.LOGIN_PAGE);
    }

    /**
     * View to be displayed when the user does not have enough rights to view
     * the resource
     *
     * @return
     */
    @GetMapping(UserConstants.INVALID_ACCESS_PAGE)
    public String invalidAccess() {
        return UserConstants.INVALID_ACCESS_PAGE;

    }

    /**
     * Trigger forgot password mail
     *
     * @param userEmail
     * @param locale
     * @return
     */
    @PostMapping(UserConstants.URL_FORGOT_PASSWORD)
    @ResponseBody
    public String forgotPassword(String userEmail, Locale locale) {
        
        Account account = accountService.getUserByEmail(userEmail);
        
        Calendar calendar = Calendar.getInstance(); // starts with today's date and time
        try {
            if (account.getForgotPasswordCode()==null || (account.getForgotPasswordExpiryDate() == null || account.getForgotPasswordExpiryDate().before(calendar))) {
                String forgotPassword = GenerateCode.random(90);
                calendar.add(Calendar.DAY_OF_YEAR, 2);  // advances day by 2
                account.setForgotPasswordCode(forgotPassword);
                account.setForgotPasswordExpiryDate(calendar);
                accountService.update(account);

                //Load resource of Html File
                Resource resource = resourceLoader.getResource("classpath:/mails/ForgotPasswordMail");
                //Find Absolute Path of the file
                String absolutePath = resource.getFile().getAbsolutePath();
                // Get Html Content in String format by calling Utility Class read method
                String verificationMailBody = ReadFile.read(absolutePath);
                //Replace all the tags in the mail body
                verificationMailBody = verificationMailBody
                        .replaceAll(UserConstants.TAG_USER_NAME, account.getUserName())
                        .replaceAll(UserConstants.TAG_USER_EMAIL, account.getUserEmail())
                        .replaceAll(UserConstants.TAG_USER_VERIFICATION_CODE, forgotPassword)
                        .replaceAll(ApplicationConstants.TAG_DOMAIN, domain);

                //Call Email Service
                email.sendMail(account.getUserEmail(), "Forgot Password | EmailChimp", verificationMailBody);
                return messageSource.getMessage("user.forgotPassword.success", new Object[]{account.getUserName()}, locale);
            } else if (account != null) {
                return messageSource.getMessage("user.forgotPassword.success.already", new Object[]{account.getUserName(), account.getUserEmail()}, locale);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return messageSource.getMessage("user.forgotPassword.failure", new Object[]{userEmail}, locale);
    }

    /**
     * Verify forgot Password code and accordingly return the view to change
     * password if the code is valid
     *
     * @param userEmail
     * @param verificationCode
     * @return
     */
    @GetMapping(UserConstants.URL_RESET_PASSWORD)
    public ModelAndView resetPassword(String userEmail, String verificationCode) {
        Account user = accountService.getUserByEmail(userEmail);
        
        try {
            if (user.getForgotPasswordCode().equals(verificationCode)) {
                return new ModelAndView("/changePassword", "user", user);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return new ModelAndView("/forgotPassword", ApplicationConstants.MESSAGE_DEFAULT, "Link Expired. Please try Again!");
    }

    /**
     * Verify the code sent on mail and change the password
     *
     * @param userEmail
     * @param userPassword
     * @param verificationCode
     * @param locale
     * @return
     */
    @PostMapping(UserConstants.URL_CHANGE_PASSWORD)
    @ResponseBody
    public String changePassword(String userEmail, String userPassword, String verificationCode, Locale locale) {
        Account user = accountService.getUserByEmail(userEmail);
        try {
            if (verificationCode.equals(user.getForgotPasswordCode())) {
                Calendar calendar = Calendar.getInstance();
                user.setUserPassword(passwordEncoder.encode(userPassword));
                user.setLastPasswordUpdatedDate(calendar);
                user.setForgotPasswordCode("");
                user.setForgotPasswordExpiryDate(null);
                accountService.update(user);

                //Load resource of Html File
                Resource resource = resourceLoader.getResource("classpath:/mails/ChangePasswordMail");
                //Find Absolute Path of the file
                String absolutePath = resource.getFile().getAbsolutePath();
                // Get Html Content in String format by calling Utility Class read method
                String verificationMailBody = ReadFile.read(absolutePath);
                //Replace all the tags in the mail body
                verificationMailBody = verificationMailBody
                        .replaceAll(UserConstants.TAG_USER_NAME, user.getUserName())
                        .replaceAll(ApplicationConstants.TAG_DOMAIN, domain);

                //Call Email Service
                email.sendMail(user.getUserEmail(), "Password Reset Complete | EmailChimp", verificationMailBody);
                return messageSource.getMessage("user.changePassword.success", new Object[]{user.getUserName()}, locale);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return messageSource.getMessage("user.changePassword.failure", new Object[]{}, locale);
    }

    /**
     * Invoked when when the user clicks on the link shared to him after
     * registration
     *
     * @param userEmail
     * @param verificationCode
     * @return
     */
    @GetMapping(UserConstants.URL_VERIFY_USER)
    public ModelAndView verifyUser(String userEmail, String verificationCode) {
        Account user = accountService.getUserByEmail(userEmail);
        try {
            if (user.getVerificationCode().equals(verificationCode)) {
                return new ModelAndView("/completeSignUp", "user", user);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return new ModelAndView("/userLogin", "user", null);
    }

    private String getErrorMessage(HttpServletRequest request, String key) {

        Exception exception
                = (Exception) request.getSession().getAttribute(key);

        String error = "";
        if (exception instanceof BadCredentialsException) {
            error = "Invalid username or password!";
        } else if (exception instanceof LockedException) {
            error = exception.getMessage();
        } else {
            error = "Invalid username and password!";
        }
        return error;
    }
    
    
    @GetMapping("forgotPassword")
    public String forgotPassword(){return "forgotPassword";}
}
