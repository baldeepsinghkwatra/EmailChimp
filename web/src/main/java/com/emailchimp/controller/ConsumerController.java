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
import com.emailchimp.model.Users;
import com.emailchimp.service.ConsumerService;
import com.emailchimp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.emailchimp.core.service.Email;
import com.emailchimp.model.MailBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.emailchimp.conf.annotation.JsonObjectProperty;
import com.emailchimp.constants.ApplicationConstants;
import com.emailchimp.util.GenerateCode;
import com.emailchimp.util.ReadFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.PostMapping;

/**
 *
 * @author baldeep
 */
@Controller
public class ConsumerController {

    @Autowired
    ConsumerService consumerService;
    
    @Autowired
    UserService userService;
    
    @Autowired
    Email email;
    
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private ResourceLoader resourceLoader;
    @Value("${domain.${mode}}")
    private String domain;

    @PostMapping(ConsumerConstants.URL_REGISTER_CONSUMER)
    public ModelAndView registerConsumer(@JsonObjectProperty(name="record") Users user) {
        String verificationCode = GenerateCode.random(50);
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        user.setUserRole(UserConstants.ROLE_CONSUMER);
        user.setVerificationCode(verificationCode);
        try {
            //save user to DB
            userService.save(user);

            //Load resource of Html File
            Resource resource = resourceLoader.getResource("classpath:/mails/VerificationMail.txt");
            //Find Absolute Path of the file
            String absolutePath = resource.getFile().getAbsolutePath();
            // Get Html Content in String format by calling Utility Class read method
            String verificationMailBody = ReadFile.read(absolutePath);
            //Replace all the tags in the mail body
            verificationMailBody = verificationMailBody
                    .replaceAll(UserConstants.TAG_USER_NAME, user.getUserName())
                    .replaceAll(UserConstants.TAG_USER_EMAIL, user.getUserEmail())
                    .replaceAll(UserConstants.TAG_USER_VERIFICATION_CODE, verificationCode)
                    .replaceAll(ApplicationConstants.TAG_DOMAIN, domain);

            //Call Email Service
            email.sendMail(user.getUserEmail(), "Welcome from  EmailChimp :)", verificationMailBody);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModelAndView(UserConstants.LOGIN_PAGE, UserConstants.RESPONSE_DATA, UserConstants.MESSAGE_REGISTRATION_FAILURE);
        }
        return new ModelAndView(UserConstants.LOGIN_PAGE, UserConstants.RESPONSE_DATA, UserConstants.MESSAGE_REGISTRATION_SUCCESS);
    }

    @RequestMapping(ConsumerConstants.URL_UPLOAD_LIST)
    public String uploadListPage() {
        return ConsumerConstants.PATH_UPLOAD_LIST;
    }

    @PostMapping(ConsumerConstants.URL_SEND_MAIL)
    public String sendMailController(@JsonObjectProperty MailBean record) {
        try {
            email.sendMail(record.getTo(), record.getSubject(), record.getMessage());
            return "Sent";
        } catch (Exception ex) {
            return "Not Sent";
        }
    }

}
