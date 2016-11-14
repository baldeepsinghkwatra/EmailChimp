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
import com.emailchimp.core.model.API;
import com.emailchimp.core.model.Account;
import com.emailchimp.core.service.APIService;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.core.util.GenerateAPI;
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
public class APIController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private APIService apiService;

    @Autowired
    private MessageSource messageSource;

    @PostMapping(EmailConstants.URL_ADD_API)
    public String addAPI(API api, Principal principal, Locale locale) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            
            api.setAccount(account);
            api.setGeneratedTimestamp(Calendar.getInstance());
            api.setApiKey(GenerateAPI.generateKey(30, String.valueOf(account.getId())));

            apiService.save(api);
        } catch (Exception e) {
            return messageSource.getMessage("email.api.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.api.success", new Object[]{}, locale);
    }

    @GetMapping(EmailConstants.URL_GET_API)
    public List<API> getAPI(Principal principal) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            return apiService.findByField("account", account);
        } catch (Exception e) {
        }
        return null;
    }

    @PostMapping(EmailConstants.URL_DELETE_API)
    public String deleteAPI(Long id, Principal principal, Locale locale) {
        try {

            API api = apiService.findByUniqueField("id", id);
            Account account = accountService.findByUniqueField("userEmail", principal.getName());

            if (api.getAccount().getId() == account.getId()) {
                apiService.delete(api);
                return messageSource.getMessage("email.api.delete.success", new Object[]{}, locale);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return messageSource.getMessage("email.api.delete.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.api.delete.failure", new Object[]{}, locale);
    }

    @PostMapping(EmailConstants.URL_UPDATE_API)
    public String updateEmailCategory(API api, Principal principal, Locale locale) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            api.setAccount(account);
            apiService.update(api);

        } catch (Exception e) {
            return messageSource.getMessage("email.api.update.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.api.update.success", new Object[]{}, locale);
    }
}
