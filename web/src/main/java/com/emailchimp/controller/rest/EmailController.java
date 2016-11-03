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
import com.emailchimp.core.model.EmailConfiguration;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.core.service.EmailConfigurationService;
import java.security.Principal;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
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
public class EmailController {

    @Autowired
    EmailConfigurationService emailConfigurationService;
    @Autowired
    AccountService accountService;

    @Autowired
    private MessageSource messageSource;

    @PostMapping(EmailConstants.URL_ADD_EMAIL_CONFIGURATION)
    public String addEmailConfiguration(EmailConfiguration emailConfiguration, Principal principal, Locale locale) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            emailConfiguration.setAccount(account);
            emailConfiguration.setAddedDate(Calendar.getInstance());
            emailConfigurationService.save(emailConfiguration);
        } catch (Exception e) {
            e.printStackTrace();
            return messageSource.getMessage("email.configuration.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.configuration.success", new Object[]{}, locale);
    }

    @GetMapping(EmailConstants.URL_GET_EMAIL_CONFIGURATION)
    public List<EmailConfiguration> getEmailConfiguration(Principal principal) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            return emailConfigurationService.findByField("account", account);
        } catch (Exception e) {
        }
        return null;
    }

    @PostMapping(EmailConstants.URL_DELETE_EMAIL_CONFIGURATION)
    public String deleteEmailConfiguration(Long id, Principal principal, Locale locale) {
        try {
            EmailConfiguration emailConfiguration = emailConfigurationService.findByUniqueField("id", id);
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            if (emailConfiguration.getAccount().getId() == account.getId()) {
                emailConfigurationService.delete(emailConfiguration);
                return messageSource.getMessage("email.configuration.delete.success", new Object[]{}, locale);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return messageSource.getMessage("email.configuration.delete.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.configuration.delete.failure", new Object[]{}, locale);
    }

    @PostMapping(EmailConstants.URL_UPDATE_EMAIL_CONFIGURATION)
    public String updateEmailConfiguration(EmailConfiguration emailConfiguration, Principal principal, Locale locale) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            emailConfiguration.setAccount(account);
            emailConfigurationService.update(emailConfiguration);
        } catch (Exception e) {
            return messageSource.getMessage("email.configuration.update.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.configuration.update.success", new Object[]{}, locale);
    }

}
