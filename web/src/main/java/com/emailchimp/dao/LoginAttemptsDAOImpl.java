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

import com.emailchimp.model.LoginAttempts;
import com.emailchimp.core.model.Account;
import java.util.Date;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author baldeep
 */
@Repository
public class LoginAttemptsDAOImpl extends AbstractDAOImpl<Long, LoginAttempts> implements LoginAttemptsDAO {

    private final int MAX_ATTEMPTS = 3;
    @Autowired
    AccountDAO accountDAO;

    @Override
    public void updateFailAttempts(String username) {
        LoginAttempts loginAttempts = getUserAttempts(username);
        
        if (loginAttempts != null) {
            loginAttempts.setAttempts(loginAttempts.getAttempts() + 1);
            update(loginAttempts);
        } else {
            loginAttempts = new LoginAttempts();
            loginAttempts.setAttempts(1);
            loginAttempts.setUsername(username);
            loginAttempts.setLastModified(new Date());
            persist(loginAttempts);
        }
        if (loginAttempts.getAttempts() >= MAX_ATTEMPTS) {
            Account account = accountDAO.getUserByEmail(username);
            if (account != null) {
                account.setAccountNonLocked(false);
                accountDAO.update(account);
            }
        }
    }

    @Override
    public void resetFailAttempts(String username) {
        LoginAttempts loginAttempts = getUserAttempts(username);
        if (loginAttempts != null) {
            loginAttempts.setAttempts(0);
            loginAttempts.setLastModified(null);
            update(loginAttempts);
        }
    }

    @Override
    public LoginAttempts getUserAttempts(String username) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("username", username));
        return (LoginAttempts) criteria.uniqueResult();
    }
}
