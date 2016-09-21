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
package com.emailchimp.configuration;

import com.emailchimp.constants.UserConstants;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 *
 * @author baldeep
 */
@Component
public class CustomPasswordEncoder implements PasswordEncoder {

    /**
     * Used to encode the password. Bcrypt is used to hash the password
     * @param cs
     * @return 
     */
    @Override
    public String encode(CharSequence cs) {
        String password = cs.toString();
        return BCrypt.hashpw(password, UserConstants.SALT);

    }

    /**
     * Match password entered by user to the one saved in database
     * @param cs
     * @param dbPassword
     * @return 
     */
    @Override
    public boolean matches(CharSequence cs, String dbPassword) {
        return encode(cs).equals(dbPassword);
    }

}
