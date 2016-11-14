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

import com.emailchimp.model.ResponseModel;
import com.emailchimp.constants.ApplicationConstants;
import com.emailchimp.constants.ExceptionConstants;
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
import com.emailchimp.exception.LoginException;
import java.io.IOException;

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

	@GetMapping(UserConstants.WELCOME_URL)
	public ModelAndView welcomePage(Principal principal, HttpServletRequest request) throws LoginException {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (principal != null) {

			AbstractAuthenticationToken authToken = null;
			try {
				authToken = (UsernamePasswordAuthenticationToken) principal;
			} catch (Exception e) {
				authToken = (RememberMeAuthenticationToken) principal;
			}

			LoginUser user = (LoginUser) authToken.getPrincipal();
			if (user != null) {

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
		return new ModelAndView(UserConstants.LOGIN_PAGE);
	}


	@GetMapping(UserConstants.LOGIN_SUCCESS_URL)
	@ResponseBody
	public ResponseModel loginSucces(Principal principal, HttpServletRequest request, String error, String logout,
			Locale locale) throws LoginException {

		if (principal != null) {

			AbstractAuthenticationToken authToken = null;
			try {
				authToken = (UsernamePasswordAuthenticationToken) principal;
			} catch (Exception e) {
				authToken = (RememberMeAuthenticationToken) principal;
			}

			LoginUser user = (LoginUser) authToken.getPrincipal();
			if (user != null) {

				return new ResponseModel(UserConstants.LOGIN_SUCCESS_URL,
						messageSource.getMessage("user.login.success", new Object[] {}, locale),
						ExceptionConstants.RES_CODE_SUCCESS);
			}
		}

		return new ResponseModel(UserConstants.LOGIN_SUCCESS_URL,
				messageSource.getMessage("user.login.failure", new Object[] {}, locale),
				ExceptionConstants.RES_CODE_INVALID_LOGIN);
	}

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
	public ModelAndView loginPage(Principal principal, HttpServletRequest request, String error, String logout,
			Locale locale) throws LoginException {

		if (error != null) {

			throw getLoginException(request, "SPRING_SECURITY_LAST_EXCEPTION", locale);
		} else if (logout != null) {

			return new ModelAndView(UserConstants.LOGIN_PAGE, ApplicationConstants.MESSAGE_DEFAULT,
					"You have been Logged out Successfully");
		}

		return welcomePage(principal, request);
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
	public ResponseModel forgotPassword(String userEmail, Locale locale) {

		Account account = accountService.getUserByEmail(userEmail);

		Calendar calendar = Calendar.getInstance(); // starts with today's date
													// and time
		try {
			if (account != null) {

				String forgotPassword=account.getForgotPasswordCode();
				if ((account.getForgotPasswordCode() == null 
						|| (account.getForgotPasswordExpiryDate() == null
						|| account.getForgotPasswordExpiryDate().before(calendar)))) {

					forgotPassword = GenerateCode.random(90);
					
					calendar.add(Calendar.DAY_OF_YEAR, 2); // advances day by 2
					account.setForgotPasswordCode(forgotPassword);
					account.setForgotPasswordExpiryDate(calendar);
					
					accountService.update(account);
				}
				
				// Load resource of Html File to Find Absolute Path
				Resource resource = resourceLoader.getResource("classpath:/mails/ForgotPasswordMail");
				String absolutePath = resource.getFile().getAbsolutePath();

				// Get Html Content in String format by calling Utility Class
				String verificationMailBody = ReadFile.read(absolutePath);

				// Replace all the tags in the mail body
				verificationMailBody = verificationMailBody
						.replaceAll(UserConstants.TAG_USER_NAME, account.getUserName())
						.replaceAll(UserConstants.TAG_USER_EMAIL, account.getUserEmail())
						.replaceAll(UserConstants.TAG_USER_VERIFICATION_CODE, forgotPassword)
						.replaceAll(ApplicationConstants.TAG_DOMAIN, domain);

				// Call Email Service
				email.sendMail(account.getUserEmail(), "Forgot Password | EmailChimp", verificationMailBody);

				return new ResponseModel(UserConstants.URL_FORGOT_PASSWORD, messageSource
						.getMessage("user.forgotPassword.success", new Object[] { account.getUserName() }, locale),
						ExceptionConstants.RES_CODE_SUCCESS);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseModel(UserConstants.URL_FORGOT_PASSWORD,
				messageSource.getMessage("user.forgotPassword.failure", new Object[] { userEmail }, locale),
				ExceptionConstants.RES_CODE_FAILURE);
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
                            System.out.println(user);
				return new ModelAndView("/changePassword", "user", user);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return new ModelAndView("/forgotPassword", ApplicationConstants.MESSAGE_DEFAULT,
				"Link Expired. Please try Again!");
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
	public ResponseModel changePassword(Principal principal, String currentPassword, String userEmail, String userPassword, String verificationCode, Locale locale) {
                Account user = accountService.getUserByEmail(userEmail);
		try {
                    System.out.println(currentPassword);
                        if(currentPassword != null){
                            return changePassword(currentPassword,principal,userPassword,locale);
                        }
                        
                        else if (verificationCode.equals(user.getForgotPasswordCode())) {

				Calendar calendar = Calendar.getInstance();
				user.setUserPassword(passwordEncoder.encode(userPassword));
				user.setLastPasswordUpdatedDate(calendar);
				user.setForgotPasswordCode("");
				user.setForgotPasswordExpiryDate(null);
				accountService.update(user);

				// Load resource of Html File to Find Absolute Path
				Resource resource = resourceLoader.getResource("classpath:/mails/ChangePasswordMail");
				String absolutePath = resource.getFile().getAbsolutePath();

				// Get Html Content in String format by calling Utility Class
				// read method
				String verificationMailBody = ReadFile.read(absolutePath);

				// Replace all the tags in the mail body
				verificationMailBody = verificationMailBody.replaceAll(UserConstants.TAG_USER_NAME, user.getUserName())
						.replaceAll(ApplicationConstants.TAG_DOMAIN, domain);

				// Call Email Service
				email.sendMail(user.getUserEmail(), "Password Reset Complete | EmailChimp", verificationMailBody);

				return new ResponseModel(UserConstants.URL_CHANGE_PASSWORD, messageSource
						.getMessage("user.changePassword.success", new Object[] { user.getUserName() }, locale),
						ExceptionConstants.RES_CODE_SUCCESS);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ResponseModel(UserConstants.URL_CHANGE_PASSWORD,
				messageSource.getMessage("user.changePassword.failure", new Object[] {}, locale),
				ExceptionConstants.RES_CODE_FAILURE);
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

	private LoginException getLoginException(HttpServletRequest request, String key, Locale locale) {

		Exception exception = (Exception) request.getSession().getAttribute(key);

		if (exception instanceof LockedException) {

			return new LoginException(ExceptionConstants.RES_CODE_ACCOUNT_LOCKED,
					messageSource.getMessage("user.login.accountlocked", new Object[] {}, locale));
		} else {
			return new LoginException(ExceptionConstants.RES_CODE_INVALID_LOGIN,
					messageSource.getMessage("user.login.failure", new Object[] {}, locale));

		}
	}

	@GetMapping("forgotPassword")
	public String forgotPassword() {
		return "forgotPassword";
	}

    private ResponseModel changePassword(String currentPassword, Principal principal, String userPassword, Locale locale) throws InterruptedException, IOException {
        Account account = accountService.getUserByEmail(principal.getName());
        if(passwordEncoder.matches(currentPassword, account.getUserPassword())){
            Calendar calendar = Calendar.getInstance();
            account.setUserPassword(passwordEncoder.encode(userPassword));
            account.setLastPasswordUpdatedDate(calendar);
            accountService.update(account);

            // Load resource of Html File to Find Absolute Path
            Resource resource = resourceLoader.getResource("classpath:/mails/ChangePasswordMail");
            String absolutePath = resource.getFile().getAbsolutePath();

            // Get Html Content in String format by calling Utility Class
            // read method
            String verificationMailBody = ReadFile.read(absolutePath);

            // Replace all the tags in the mail body
            verificationMailBody = verificationMailBody.replaceAll(UserConstants.TAG_USER_NAME, account.getUserName())
                            .replaceAll(ApplicationConstants.TAG_DOMAIN, domain);

            // Call Email Service
            email.sendMail(account.getUserEmail(), "Password Reset Complete | EmailChimp", verificationMailBody);

            return new ResponseModel(UserConstants.URL_CHANGE_PASSWORD, messageSource
                            .getMessage("user.changePassword.success", new Object[] { account.getUserName() }, locale),
                            ExceptionConstants.RES_CODE_SUCCESS);

        } else {
            return new ResponseModel(UserConstants.URL_CHANGE_PASSWORD, messageSource
                            .getMessage("user.changePassword.currentpswd", new Object[] { account.getUserName() }, locale),
                            ExceptionConstants.RES_CODE_FAILURE);
        }
    }
}
