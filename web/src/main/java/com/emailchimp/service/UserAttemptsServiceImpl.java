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
package com.emailchimp.service;

import com.emailchimp.dao.AbstractDAO;
import com.emailchimp.dao.UserAttemptsDAO;
import com.emailchimp.model.UserAttempts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author baldeep
 */
@Service
@Transactional
public class UserAttemptsServiceImpl extends CommonServiceImpl<UserAttempts> implements UserAttemptsService {

    UserAttemptsDAO userAttemptsDAO;

    @Autowired
    public UserAttemptsServiceImpl(UserAttemptsDAO userAttemptsDAO) {
        super(userAttemptsDAO);
        this.userAttemptsDAO = userAttemptsDAO;
    }

    @Override
    public void updateFailAttempts(String username) {
        userAttemptsDAO.updateFailAttempts(username);
    }

    @Override
    public void resetFailAttempts(String username) {
        userAttemptsDAO.resetFailAttempts(username);
    }

    @Override
    public UserAttempts getUserAttempts(String username) {
        return userAttemptsDAO.getUserAttempts(username);
    }

}
