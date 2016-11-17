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
package com.emailchimp.controller.rest;

import com.emailchimp.constants.EmailConstants;
import com.emailchimp.core.model.Account;
import com.emailchimp.core.model.EmailCategory;
import com.emailchimp.core.model.EmailList;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.core.service.EmailCategoryService;
import com.emailchimp.core.service.EmailListService;
import java.security.Principal;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author baldeep
 */
@RestController
public class EmailListController {

    @Autowired
    EmailListService emailListService;
    @Autowired
    AccountService accountService;

    @Autowired
    EmailCategoryService emailCategoryService;
    @Autowired
    private MessageSource messageSource;

    @PostMapping(EmailConstants.URL_ADD_EMAIL_LIST)
    public String addEmailList(EmailList emailList,String emailCategoryId, Principal principal, Locale locale) {
        try {
            String[] category = emailCategoryId.split(",");
            Set<EmailCategory> emailCategories = new HashSet<EmailCategory>();
            for(int i=0;i<category.length; i++){
                EmailCategory emailCategory = emailCategoryService.findByUniqueField("id", Long.parseLong(category[i]));
                emailCategories.add(emailCategory);
            }
                Account account = accountService.findByUniqueField("userEmail", principal.getName());
                emailList.setAccount(account);
                emailList.setAddedDate(Calendar.getInstance());
                emailList.setEmailCategory(emailCategories);

                emailListService.save(emailList);
            

        } catch (Exception e) {
            e.printStackTrace();
            return messageSource.getMessage("email.list.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.list.success", new Object[]{}, locale);
    }

    
    
    @GetMapping(EmailConstants.URL_GET_EMAIL_LIST)
    public List<EmailList> getEmailList(Principal principal) {
        try {

            Account account = accountService.findByUniqueField("userEmail", principal.getName());

            return emailListService.findByField("account", account);
        } catch (Exception e) {
        }
        return null;
    }

    
    
    @PostMapping(EmailConstants.URL_DELETE_EMAIL_LIST)
    public String deleteEmailList(Long id, Principal principal, Locale locale) {
        try {

            EmailList emailList = emailListService.findByUniqueField("id", id);
            Account account = accountService.findByUniqueField("userEmail", principal.getName());

            if (emailList.getAccount().getId() == account.getId()) {

                emailListService.delete(emailList);
                return messageSource.getMessage("email.list.delete.success", new Object[]{}, locale);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return messageSource.getMessage("email.list.delete.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.list.delete.failure", new Object[]{}, locale);
    }

    
    
    @PostMapping(EmailConstants.URL_UPDATE_EMAIL_LIST)
    public String updateEmailList(EmailList emailList, Principal principal, Locale locale) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());

            emailList.setAccount(account);
            emailListService.update(emailList);

        } catch (Exception e) {
            return messageSource.getMessage("email.list.update.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.list.update.success", new Object[]{}, locale);
    }
}
