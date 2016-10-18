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
package com.emailchimp.dao;

import com.emailchimp.core.model.Account;

/**
 *
 * @author baldeep
 */
public interface AccountDAO extends AbstractDAO<Long, Account>{

    /**
     * Finds user based on matching mobile number
     * @param mobileNumber of Account
     * @return 
     */
    public Account getUserByMobile(String mobileNumber);

    /**
     * Finds user based on matching email
     * @param userEmail
     * @return 
     */
    public Account getUserByEmail(String userEmail);
    
    /**
     * Authenticate user based on email and password
     * @param userEmail
     * @param userPassword
     * @return 
     */
    public Account authenticateUser(String userEmail,String userPassword);

}
