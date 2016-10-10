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

import com.emailchimp.model.UserAttempts;
import com.emailchimp.model.Users;
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
public class UserAttemptsDAOImpl extends AbstractDAOImpl<Long, UserAttempts> implements UserAttemptsDAO {

    private final int MAX_ATTEMPTS = 3;
    @Autowired
    UserDAO userDAO;

    @Override
    public void updateFailAttempts(String username) {
        UserAttempts userAttempts = getUserAttempts(username);
        System.out.println(userAttempts);
        if (userAttempts != null) {
            userAttempts.setAttempts(userAttempts.getAttempts() + 1);
            update(userAttempts);
        } else {
            userAttempts = new UserAttempts();
            userAttempts.setAttempts(1);
            userAttempts.setUsername(username);
            userAttempts.setLastModified(new Date());
            persist(userAttempts);
        }
        if (userAttempts.getAttempts() >= MAX_ATTEMPTS) {
            Users users = userDAO.getUserByEmail(username);
            users.setAccountNonLocked(false);
            userDAO.update(users);
        }
    }

    @Override
    public void resetFailAttempts(String username) {
        UserAttempts userAttempts = getUserAttempts(username);
        if (userAttempts != null) {
            userAttempts.setAttempts(0);
            userAttempts.setLastModified(null);
            update(userAttempts);
        }
    }

    @Override
    public UserAttempts getUserAttempts(String username) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("username", username));
        return (UserAttempts) criteria.uniqueResult();
    }
}
