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

import com.emailchimp.constants.AdminConstants;
import com.emailchimp.model.Users;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.emailchimp.service.UserService;

/**
 *
 * @author baldeep
 */
@Controller
public class AdminController {

    @Autowired
    UserService userService;

    @RequestMapping(value = AdminConstants.URL_GET_USER_BY_MOBILE, method = RequestMethod.GET)
    @ResponseBody
    public Users getUserByMobile(@PathVariable String mobileNumber, ModelMap model) {
        return userService.getUserByMobile(mobileNumber);

    }

    @RequestMapping(value = AdminConstants.URL_GET_ALL_USERS, method = RequestMethod.GET)
    @ResponseBody
    public List<Users> getAllUser() {
        return userService.getAllUsers();
    }
}
