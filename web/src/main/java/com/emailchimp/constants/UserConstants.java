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

/**
 *
 * @author baldeep
 */
package com.emailchimp.constants;

public interface UserConstants {

    /**
     * Constants for User Roles
     */
    String ROLE_ADMIN = "ROLE_ADMIN";
    String ROLE_CONSUMER = "ROLE_CONSUMER";
    String ROLE_PROVIDER = "ROLE_PROVIDER";

    /**
     * Constants for Welcome page User Role Wise
     */
    String WELCOME_PAGE_ADMIN = "/admin/welcome";
    String WELCOME_PAGE_CONSUMER = "/consumer/welcome";
    String WELCOME_PAGE_PROVIDER = "/provider/welcome";

    /**
     * Login Page Constants
     */
    String LOGIN_PAGE = "/userLogin";
    /**
     * Invalid Access Page
     */
    String INVALID_ACCESS_PAGE = "/invalidAccess";

    /**
     * Default URL
     */
    String DEFAULT_URL = "/";
    
    /**
     * Forgot Password
     */
    String URL_FORGOT_PASSWORD="/forgot-password";
    
    /**
     * Reset Password
     */
    String URL_RESET_PASSWORD="/reset-password";
    /**
     * Change Password
     */
    String URL_CHANGE_PASSWORD="/change-password";

    /**
     * Greeting Constants
     */
    String WELCOME_GREETING_KEY = "greeting";
    String WELCOME_GREETING_ADMIN = "Admin: ";
    String WELCOME_GREETING_CONSUMER = "Consumer: ";
    String WELCOME_GREETING_PROVIDER = "Provider: ";

    /**
     * SALT for HASH
     */
    public static final String SALT = "$2a$08$nv8/8OQhGiZ7wzaFB4SoSO6wQeHErBRARhicAjbv0ZMctopyB0F.W";

    String RESPONSE_DATA = "data";
    String MESSAGE_REGISTRATION_SUCCESS = "Registration Successful";
    String MESSAGE_REGISTRATION_FAILURE = "User already registered";

    String TAG_USER_EMAIL = "<<userEmail>>";
    String TAG_USER_NAME = "<<userName>>";
    String TAG_USER_VERIFICATION_CODE = "<<verificationCode>>";
}
