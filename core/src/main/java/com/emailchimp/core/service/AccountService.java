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
package com.emailchimp.core.service;

import com.emailchimp.core.model.Account;
import java.util.List;

/**
 *
 * @author baldeep
 */
public interface AccountService extends CommonService<Account> {

    /**
     * Service to get Account by Email
     *
     * @param userEmail
     * @return
     */
    public Account getUserByEmail(String userEmail);

    /**
     * Service to get Account by Mobile Number
     *
     * @param mobileNumber
     * @return
     */
    public Account getUserByMobile(String mobileNumber);

    /**
     * Service to get All Account
     *
     * @return
     */
    public List<Account> getAllUsers();

    public Account authenticateUser(String userEmail, String userPassword);
}
