/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.controller.rest;

import com.emailchimp.constants.EmailConstants;
import com.emailchimp.core.model.Account;
import com.emailchimp.core.model.EmailConfiguration;
import com.emailchimp.core.model.Template;
import java.security.Principal;
import java.util.Locale;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.core.service.TemplateService;
import java.util.Calendar;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author anshul
 */
@RestController
public class EmailTemplateController {
    
    @Autowired
    AccountService accountService;
    
    @Autowired
    TemplateService templateService;
    
    @Autowired
    private MessageSource messageSource;
    
    @PostMapping(EmailConstants.URL_ADD_EMAIL_TEMPLATE)
    public String addEmailTemplates(Template template, Principal principal, Locale locale) {
        try {

            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            template.setAccount(account);
            template.setCreatedDateTime(Calendar.getInstance());
            templateService.save(template);

        } catch (Exception e) {
            e.printStackTrace();
            return messageSource.getMessage("email.template.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.template.success", new Object[]{}, locale);
    }
    
    @GetMapping(EmailConstants.URL_GET_EMAIL_TEMPLATE)
    public List<Template> getEmailTemplates(Principal principal) {
        try {

            Account account = accountService.findByUniqueField("userEmail", principal.getName());

            return templateService.findByField("account", account);
        } catch (Exception e) {
        }
        return null;
    }
    
    @PostMapping(EmailConstants.URL_UPDATE_EMAIL_TEMPLATE)
    public String updateEmailConfiguration(Template template, Principal principal, Locale locale) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());

            template.setAccount(account);
            templateService.update(template);

        } catch (Exception e) {
            return messageSource.getMessage("email.template.update.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.template.update.success", new Object[]{}, locale);
    }
    
    @PostMapping(EmailConstants.URL_DELETE_EMAIL_TEMPLATE)
    public String deleteEmailConfiguration(Long id, Principal principal, Locale locale) {
        try {

            Template template = templateService.findByUniqueField("id", id);
            Account account = accountService.findByUniqueField("userEmail", principal.getName());

            if (template.getAccount().getId() == account.getId()) {

                templateService.delete(template);
                return messageSource.getMessage("email.template.delete.success", new Object[]{}, locale);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return messageSource.getMessage("email.template.delete.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.template.delete.failure", new Object[]{}, locale);
    }
}
