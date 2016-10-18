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
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author baldeep
 */
@Repository
public class AccountDAOImpl extends AbstractDAOImpl<Long, Account> implements AccountDAO {


    @Override
    public Account getUserByMobile(String mobileNumber) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("userMobile", mobileNumber));
        return (Account) criteria.uniqueResult();
    }

    @Override
    public Account getUserByEmail(String userEmail) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("userEmail", userEmail));
        return (Account) criteria.uniqueResult();
    }

    @Override
    public Account authenticateUser(String userEmail, String userPassword) {

        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("userEmail", userEmail));
        criteria.add(Restrictions.eq("userPassword", userPassword));
        return (Account) criteria.uniqueResult();
    }
}
