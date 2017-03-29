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
package com.emailchimp.conf;

/**
 *
 * @author baldeep
 */
import com.emailchimp.model.LoginAttempts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.service.LoginAttemptsService;

@Component("authenticationProvider")
public class LimitLoginAuthenticationProvider extends DaoAuthenticationProvider {

    @Autowired
    LoginAttemptsService loginAttemptsService;
     @Autowired
    PasswordEncoder passwordEncoder;
     @Autowired
     AccountService userService;

    @Autowired
    @Qualifier("userDetailsService")
    @Override
    public void setUserDetailsService(UserDetailsService userDetailsService) {
        super.setUserDetailsService(userDetailsService);
    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
        try {
            System.out.println(authentication);

            Authentication auth = super.authenticate(authentication);
            //if reach here, means login success, else an exception will be thrown
            //reset the user_attempts
            loginAttemptsService.resetFailAttempts(authentication.getName());

            return auth;
        } catch (BadCredentialsException e) {

            //invalid login, update to user_attempts
            loginAttemptsService.updateFailAttempts(authentication.getName());
            throw e;
        } catch (LockedException e) {

            //this user is locked!
            String error = "";
            LoginAttempts userAttempts
                    = loginAttemptsService.getUserAttempts(authentication.getName());

            if (userAttempts != null) {
                error = "User account is locked!";
            } else {
                error = e.getMessage();
            }
            throw new LockedException(error);
        }
    }
}
