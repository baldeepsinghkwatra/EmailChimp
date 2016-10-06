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

import com.emailchimp.constants.UserConstants;
import com.emailchimp.model.LoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import com.emailchimp.service.UserService;
import java.security.Principal;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

/**
 *
 * @author baldeep
 */
@Controller
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = UserConstants.DEFAULT_URL, method = RequestMethod.GET)
    public String welcomePage(ModelMap model, Principal principal,String error) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
//        if(error.equals("true")) {
//            System.out.println(error);
//            return "redirect:/"+UserConstants.LOGIN_PAGE;
//        }
        if (principal != null) {
            AbstractAuthenticationToken authToken = null;
            try {
                authToken = (UsernamePasswordAuthenticationToken) principal;
            } catch (Exception e) {
                authToken = (RememberMeAuthenticationToken) principal;
            }
            LoginUser user=(LoginUser) authToken.getPrincipal();
            System.out.println("\n\nUser:: "+user);
            
            String userName = "";

            if (user != null) {
                userName = user.getUserName();
                String userRole = "";

                for (GrantedAuthority authority : auth.getAuthorities()) {
                    userRole = authority.getAuthority();
                }
                switch (userRole) {
                    case UserConstants.ROLE_ADMIN:
                        model.addAttribute(UserConstants.WELCOME_GREETING_KEY, UserConstants.WELCOME_GREETING_ADMIN + userName);
                        return UserConstants.WELCOME_PAGE_ADMIN;

                    case UserConstants.ROLE_PROVIDER:
                        model.addAttribute(UserConstants.WELCOME_GREETING_KEY, UserConstants.WELCOME_GREETING_PROVIDER + userName);
                        return UserConstants.WELCOME_PAGE_PROVIDER;

                    case UserConstants.ROLE_CONSUMER:
                        model.addAttribute(UserConstants.WELCOME_GREETING_KEY, UserConstants.WELCOME_GREETING_CONSUMER + userName);
                        return UserConstants.WELCOME_PAGE_CONSUMER;

                    default:
                        break;
                }
            }

        }
        return UserConstants.LOGIN_PAGE;
    }

    @RequestMapping(value = UserConstants.INVALID_ACCESS_PAGE)
    public ModelAndView invalidAccess() {
        return new ModelAndView(UserConstants.INVALID_ACCESS_PAGE);

    }
}
