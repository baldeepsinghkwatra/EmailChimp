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

import com.emailchimp.core.dao.EmailCategoryDAO;
import com.emailchimp.core.model.Account;
import com.emailchimp.core.model.EmailCategory;
import com.emailchimp.core.model.EmailCategoryBean;
import com.emailchimp.core.model.EmailList;
import com.emailchimp.core.model.EmailListBean;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author baldeep
 */
@Service
@Transactional
public class EmailCategoryServiceImpl extends CommonServiceImpl<EmailCategory> implements EmailCategoryService {

    EmailCategoryDAO emailCategoryDAO;

    @Autowired
    public EmailCategoryServiceImpl(EmailCategoryDAO emailCategoryDAO) {
        super(emailCategoryDAO);
        this.emailCategoryDAO = emailCategoryDAO;
    }

    @Override
    public List<EmailCategoryBean> getEmailCategoryBean(Account account) {
        List<EmailCategory> emailCategory = emailCategoryDAO.findByField("account", account);
        List<EmailCategoryBean> emailCategoryBean = new ArrayList();
        Iterator<EmailCategory> itr = emailCategory.iterator();
        while(itr.hasNext()){
            EmailCategoryBean cat_bean = new EmailCategoryBean();
            EmailCategory list_cat = itr.next();
            Set<EmailList> list_email = list_cat.getEmailList();
            Iterator<EmailList> itr_email_list = list_email.iterator();
            Set<EmailListBean> list_email_bean = new HashSet<EmailListBean>();
            while(itr_email_list.hasNext()){
                EmailList list = itr_email_list.next();
                EmailListBean list_bean = new EmailListBean();
                list_bean.setContact(list.getContact());
                list_bean.setEmail(list.getEmail());
                list_bean.setFirstName(list.getFirstName());
                list_bean.setLastName(list.getLastName());
                list_bean.setId(list.getId());
                list_email_bean.add(list_bean);
            }
            cat_bean.setAddedDate(list_cat.getAddedDate());
            cat_bean.setCategoryName(list_cat.getCategoryName());
            cat_bean.setId(list_cat.getId());
            cat_bean.setEmailListBean(list_email_bean);
            emailCategoryBean.add(cat_bean);
        }
        System.out.println("list: "+emailCategoryBean.size());
        return emailCategoryBean;
    }
}
