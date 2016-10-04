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
import com.emailchimp.model.Consumer;
import com.emailchimp.model.Users;
import com.emailchimp.service.ConsumerService;
import com.emailchimp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import com.emailchimp.core.service.Email;
import com.emailchimp.model.MailBean;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.emailchimp.conf.annotation.JsonObjectProperty;

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

    @RequestMapping(value = ConsumerConstants.URL_REGISTER_CONSUMER, method = RequestMethod.POST)
    public ModelAndView registerUser(Consumer emailChimpUser) {
        emailChimpUser.setPassword(passwordEncoder.encode(emailChimpUser.getPassword()));
        try {
            consumerService.save(emailChimpUser);
            Users users = new Users();
            users.setUserEmail(emailChimpUser.getEmail());
            users.setUserMobile(emailChimpUser.getContact());
            users.setUserName(emailChimpUser.getName());
            users.setUserPassword(emailChimpUser.getPassword());
            users.setUserRole(UserConstants.ROLE_CONSUMER);
            userService.save(users);
            email.sendMail(emailChimpUser.getEmail(), "Welcome Mail", "Hello ");
        } catch (Exception e) {
            return new ModelAndView(UserConstants.LOGIN_PAGE, UserConstants.RESPONSE_DATA, UserConstants.MESSAGE_REGISTRATION_FAILURE);
        }
        return new ModelAndView(UserConstants.LOGIN_PAGE, UserConstants.RESPONSE_DATA, UserConstants.MESSAGE_REGISTRATION_SUCCESS);
    }

    @RequestMapping(ConsumerConstants.URL_UPLOAD_LIST)
    public String uploadListPage() {
        return ConsumerConstants.PATH_UPLOAD_LIST;
    }
    
    @RequestMapping(value = ConsumerConstants.URL_SEND_MAIL, method = RequestMethod.POST)
    public String sendMailController(@JsonObjectProperty MailBean record) {
        try {
            System.out.println("com.emailchimp.controller.ConsumerController.sendMailController()"+record);
            email.sendMail(record.getTo(),record.getSubject(),record.getMessage());
            return "Sent";
        } catch (Exception ex) {
          return "Not Sent";
        }
    }
    
}
