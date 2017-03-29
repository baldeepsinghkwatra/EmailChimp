/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.controller.rest;

import com.emailchimp.constants.EmailConstants;
import com.emailchimp.core.model.Account;
import com.emailchimp.core.model.Campaign;
import com.emailchimp.core.model.EmailTracks;
import com.emailchimp.core.model.Scheduler;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.core.service.CampaignService;
import com.emailchimp.core.service.SchedulerService;
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
 * @author anshul
 */

@RestController
public class SchedulerController {
    
    @Autowired
    private AccountService accountService;
    
    @Autowired
    private CampaignService campaignService;
    
    @Autowired
    private SchedulerService schedulerService;
    
    @Autowired
    private MessageSource messageSource;
    
    @PostMapping(EmailConstants.URL_ADD_SCHEDULE)
    public String addScheduler(Principal principal, Scheduler scheduler, String campaignId, Locale locale){
        try{
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            Campaign campaign = campaignService.findByUniqueField("id", Long.parseLong(campaignId));
            
            EmailTracks emailTracks = new EmailTracks();
            emailTracks.setAccount(account);
            emailTracks.setCampaign(campaign);
            emailTracks.setStatus("pending");
            emailTracks.setMessage(campaign.getTemplate().getTemplateContent());
            emailTracks.setSubject(campaign.getEmailSubject());
            emailTracks.setRecepients(campaign.getReplyToEmail());
            scheduler.setEmailTracks(emailTracks);
            scheduler.setAccount(account);
            scheduler.setCampaign(campaign);
            scheduler.setAddedDateTime(Calendar.getInstance());
            schedulerService.save(scheduler);
            return messageSource.getMessage("email.scheduler.success", new Object[]{}, locale);
        } catch(Exception e){
            e.printStackTrace();
            return messageSource.getMessage("email.scheduler.failure", new Object[]{}, locale);
        }
    }
    
    @GetMapping(EmailConstants.URL_GET_SCHEDULER)
    public List<Scheduler> getScheduler(Principal principal){
        try{
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            return schedulerService.findByField("account", account);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    
    @PostMapping(EmailConstants.URL_DELETE_SCHEDULE)
    public String deleteCampaign(Principal principal, String id, Locale locale){
        try{
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            Scheduler schedule = schedulerService.findByUniqueField("id", Long.parseLong(id));
            if(account.getId() == schedule.getAccount().getId()){
                schedulerService.delete(schedule);
            }
        }catch(Exception e){
            return messageSource.getMessage("email.scheduler.delete.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.scheduler.delete.success", new Object[]{}, locale);
    }
}
