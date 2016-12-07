/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.controller.rest;

import com.emailchimp.constants.EmailConstants;
import com.emailchimp.core.model.Account;
import com.emailchimp.core.model.EmailTracks;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.core.service.EmailTrackService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author anshul
 */
@RestController
public class EmailTracksController {
    
    @Autowired
    private EmailTrackService emailTrackService;
    
    @Autowired
    private AccountService accountService;
    
    @GetMapping(EmailConstants.URL_GET_EMAIL_TRACKS)
    public List<EmailTracks> getEmaiTracks(Principal principal){
        
        Account account = accountService.findByUniqueField("userEmail", principal.getName());
 
        return emailTrackService.findByField("account", account);
    }
    
}
