/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.model;

import com.emailchimp.core.model.Campaign;
import com.emailchimp.core.model.Scheduler;
import com.emailchimp.core.model.Template;
import com.emailchimp.core.service.CampaignService;
import com.emailchimp.core.service.Email;
import com.emailchimp.core.service.TemplateService;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author anshul
 */
public class CampaignListTrigger implements Runnable{

    private List<Scheduler> threadListScheduler;

    private Email email;
    
    public List<Scheduler> getThreadListScheduler() {
        return threadListScheduler;
    }

    public void setThreadListScheduler(List<Scheduler> threadListScheduler) {
        this.threadListScheduler = threadListScheduler;
    }

    public CampaignListTrigger(List<Scheduler> threadListScheduler,Email email) {
        this.threadListScheduler = threadListScheduler;
        this.email = email;
    }
            
    @Override
    public void run() {
        for(int i=0;i<threadListScheduler.size();i++){
            Scheduler scheduler = threadListScheduler.get(i);
            Campaign campaign = scheduler.getCampaign();
            Template template = campaign.getTemplate();
            try {
                String content = "<img src=\"http://a5176112.ngrok.io/EmailChimp/resources/images/menu.png\">"+template.getTemplateContent();
                System.out.println("Sending the email.");
                email.sendMail("anshulgupta231193@gmail.com", campaign.getEmailSubject(), content);
                System.out.println("Email Sent.");
            } catch (Exception ex) {
                System.out.println("HI");
                ex.printStackTrace();
                Logger.getLogger(CampaignListTrigger.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
    
}
