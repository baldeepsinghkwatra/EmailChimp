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
package com.jwt.security.dao;

import com.jwt.model.security.User;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author baldeep
 */
@Repository
@Transactional
public class UserDAOImpl extends AbstractDAOImpl<Long, User> implements UserDAO {

    @Override
    public User getUserByEmail(String userEmail) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("email", userEmail));
        System.out.println(userEmail+"com.jwt.security.dao.UserDAOImpl.getUserByEmail()"+ (User) criteria.uniqueResult());
        return (User) criteria.uniqueResult();
    }

}
