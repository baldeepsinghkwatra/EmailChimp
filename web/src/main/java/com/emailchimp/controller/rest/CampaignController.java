/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.controller.rest;

import com.emailchimp.constants.EmailConstants;
import com.emailchimp.core.model.Account;
import com.emailchimp.core.model.Campaign;
import com.emailchimp.core.model.EmailConfiguration;
import com.emailchimp.core.model.EmailList;
import com.emailchimp.core.model.Template;
import com.emailchimp.core.model.TrackCampaignOpens;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.core.service.CampaignService;
import com.emailchimp.core.service.EmailConfigurationService;
import com.emailchimp.core.service.EmailListService;
import com.emailchimp.core.service.TemplateService;
import java.security.Principal;
import java.util.ArrayList;
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
 * @author anshul
 */

@RestController
public class CampaignController {
    
    @Autowired
    AccountService accountService;
    @Autowired
    TemplateService templateService;
    @Autowired
    EmailConfigurationService emailConfigService;
    @Autowired
    EmailListService emailListService;
    @Autowired
    CampaignService campaignService;
    @Autowired
    private MessageSource messageSource;
    
    @PostMapping(EmailConstants.URL_ADD_CAMPAIGN)
    public String addCampaign(Campaign campaign, String templateId, String emailConfigId,
            String emailListId,Principal principal, Locale locale) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            List<TrackCampaignOpens> trackCampaignList = new ArrayList<TrackCampaignOpens>();
            String[] listId = emailListId.split(",");
            for(int i=0;i<listId.length;i++){
                TrackCampaignOpens trackCampaignOpens = new TrackCampaignOpens();
                trackCampaignOpens.setCampaign(campaign);
                trackCampaignOpens.setEmailList(emailListService.findByUniqueField("id", Long.parseLong(listId[i])));
                trackCampaignList.add(trackCampaignOpens);
            }
            Template template = templateService.findByUniqueField("id", Long.parseLong(templateId));
            EmailConfiguration emailConfiguration = emailConfigService.findByUniqueField("id", Long.parseLong(emailConfigId));
            campaign.setTrackCampaignOpens(trackCampaignList);
            campaign.setAccount(account);
            campaign.setTemplate(template);
            campaign.setEmailConfiguration(emailConfiguration);
            campaign.setCreatedDateTime(Calendar.getInstance());

            campaignService.save(campaign);
        }catch(Exception e){
            e.printStackTrace();
            return messageSource.getMessage("email.campaign.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.campaign.success", new Object[]{}, locale);
    }
    
    @GetMapping(EmailConstants.URL_GET_CAMPAIGN)
    public List<Campaign> getCampaignList(Principal principal){
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            return campaignService.findByField("account", account);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
    @PostMapping(EmailConstants.URL_DELETE_CAMPAIGN)
    public String deleteCampaign(Principal principal, String id, Locale locale){
        try{
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            Campaign campaign = campaignService.findByUniqueField("id", Long.parseLong(id));
            if(account.getId() == campaign.getAccount().getId()){
                campaignService.delete(campaign);
            }
        }catch(Exception e){
            return messageSource.getMessage("email.campaign.delete.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.campaign.delete.success", new Object[]{}, locale);
    }
    
    @PostMapping(EmailConstants.URL_UPDATE_CAMPAIGN)
    public String updateCampaign(Campaign campaign, String templateId, String emailConfigId,
            String emailListId,Principal principal, Locale locale) {
        try {
            Account account = accountService.findByUniqueField("userEmail", principal.getName());
            List<EmailList> emailList = new ArrayList<EmailList>();
            String[] listId = emailListId.split(",");
            for(int i=0;i<listId.length;i++){      
                String[] cat_list_id = listId[i].split("\\.");
                emailList.add(emailListService.findByUniqueField("id", Long.parseLong(cat_list_id[1])));
            }
            Template template = templateService.findByUniqueField("id", Long.parseLong(templateId));
            EmailConfiguration emailConfiguration = emailConfigService.findByUniqueField("id", Long.parseLong(emailConfigId));
            
            campaign.setAccount(account);
            campaign.setTemplate(template);
            campaign.setEmailConfiguration(emailConfiguration);
//            campaign.setEmailList(emailList);
            campaign.setCreatedDateTime(Calendar.getInstance());
            campaignService.update(campaign);
        }catch(Exception e){
            e.printStackTrace();
            return messageSource.getMessage("email.campaign.update.failure", new Object[]{}, locale);
        }
        return messageSource.getMessage("email.campaign.update.success", new Object[]{}, locale);
    }
}
