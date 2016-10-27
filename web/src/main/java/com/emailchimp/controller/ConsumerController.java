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
package com.emailchimp.controller;

import com.emailchimp.constants.ConsumerConstants;
import com.emailchimp.constants.UserConstants;
import com.emailchimp.core.model.Account;
import com.emailchimp.service.ConsumerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.emailchimp.core.service.Email;
import com.emailchimp.model.MailBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.emailchimp.constants.ApplicationConstants;
import com.emailchimp.util.GenerateCode;
import com.emailchimp.util.ReadFile;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.emailchimp.core.service.AccountService;
import java.util.Calendar;

/**
 *
 * @author baldeep
 */
@Controller
public class ConsumerController {

    @Autowired
    ConsumerService consumerService;

    @Autowired
    AccountService accountService;

    @Autowired
    Email email;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private ResourceLoader resourceLoader;
    @Value("${domain.${mode}}")
    private String domain;

    @PostMapping(ConsumerConstants.URL_REGISTER_CONSUMER)
    @ResponseBody
    public String registerConsumer(Account account, Locale locale) {
        String verificationCode = GenerateCode.random(50);
        account.setUserPassword(passwordEncoder.encode(account.getUserPassword()));
        account.setUserRole(UserConstants.ROLE_CONSUMER);
        account.setVerificationCode(verificationCode);
        account.setCreatedDate(Calendar.getInstance());
        try {
            //save user to DB
            accountService.save(account);

            //Load resource of Html File
            Resource resource = resourceLoader.getResource("classpath:/mails/VerificationMail");
            //Find Absolute Path of the file
            String absolutePath = resource.getFile().getAbsolutePath();
            // Get Html Content in String format by calling Utility Class read method
            String verificationMailBody = ReadFile.read(absolutePath);
            //Replace all the tags in the mail body
            verificationMailBody = verificationMailBody
                    .replaceAll(UserConstants.TAG_USER_NAME, account.getUserName())
                    .replaceAll(UserConstants.TAG_USER_EMAIL, account.getUserEmail())
                    .replaceAll(UserConstants.TAG_USER_VERIFICATION_CODE, verificationCode)
                    .replaceAll(ApplicationConstants.TAG_DOMAIN, domain);

            //Call Email Service
            email.sendMail(account.getUserEmail(), "Welcome from  EmailChimp :)", verificationMailBody);
        } catch (Exception e) {
            e.printStackTrace();
            return messageSource.getMessage("user.registration.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("user.registration.success", new Object[]{account.getUserName()}, locale);
    }

    @RequestMapping(ConsumerConstants.URL_UPLOAD_LIST)
    public String uploadListPage() {
        return ConsumerConstants.PATH_UPLOAD_LIST;
    }

    @PostMapping(ConsumerConstants.URL_SEND_MAIL)
    public String sendMailController(MailBean record) {
        try {
            email.sendMail(record.getTo(), record.getSubject(), record.getMessage());
            return "Sent";
        } catch (Exception ex) {
            return "Not Sent";
        }
    }

}
