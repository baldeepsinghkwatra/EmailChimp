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

import com.emailchimp.model.Users;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author baldeep
 */
@Repository
public class UserDAOImpl extends AbstractDAOImpl<Long, Users> implements UserDAO {


    @Override
    public Users getUserByMobile(String mobileNumber) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("userMobile", mobileNumber));
        return (Users) criteria.uniqueResult();
    }

    @Override
    public Users getUserByEmail(String userEmail) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("userEmail", userEmail));
        Users u= (Users) criteria.uniqueResult();
        System.out.println(u+"---"+userEmail);
        return u;
    }

    @Override
    public Users authenticateUser(String userEmail, String userPassword) {

        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("userEmail", userEmail));
        criteria.add(Restrictions.eq("userPassword", userPassword));
        return (Users) criteria.uniqueResult();
    }
}
