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
package com.emailchimp.core.dao;

import com.emailchimp.core.model.EmailCategory;
import com.emailchimp.core.model.EmailCategoryBean;
import com.emailchimp.core.model.EmailList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

/**
 *
 * @author baldeep
 */
@Repository
public class EmailListDAOImpl  extends AbstractDAOImpl<Long, EmailList> implements EmailListDAO {

    @Override
    public List<EmailCategoryBean> getCategoryList() {
        List<EmailCategoryBean> emailCategoryList = new LinkedList();
        String sql = "select list.id,category_name,list.account_id,email_list_id,email_category_id,contact,email,first_name,is_subscribed,last_name from email_category cat JOIN email_list_category list_cat ON list_cat.email_category_id = cat.id JOIN email_list list ON list.id=list_cat.email_list_id;";
        SQLQuery query = getSession().createSQLQuery(sql);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List results = query.list();
        Iterator itr = results.iterator();
        while(itr.hasNext()){
            System.out.println(itr.next());
        }
        return results;
    }

}
