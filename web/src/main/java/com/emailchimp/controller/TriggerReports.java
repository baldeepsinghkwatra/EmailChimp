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

import com.emailchimp.core.model.Scheduler;
import com.emailchimp.core.service.AccountService;
import com.emailchimp.core.service.Email;
import com.emailchimp.core.service.SchedulerService;
import com.emailchimp.model.CampaignListTrigger;
import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 *
 * @author baldeep
 */
@Component
public class TriggerReports {

    /*
     * second, minute, hour, day of month, month, day(s) of week
     */
    @Autowired
    private SchedulerService schedulerService;

    @Autowired
    private AccountService accountService;
    
    @Autowired
    private Email email;
    
    private ExecutorService executorService = Executors.newFixedThreadPool(10);
        
    @Scheduled(cron = "0 42 11 * * *")
    public void scheduleTaskUsingCronExpression() {

    }

    @Scheduled(fixedDelay = 10000)
    public void checkForTasks() throws InterruptedException, ExecutionException {
        
        List<Scheduler> schedulerList = schedulerService.list();
        List<Scheduler> threadScheduledList = findSchdeuledCampaigns(schedulerList);
        Future future = executorService.submit(new CampaignListTrigger(threadScheduledList,email));
        System.out.println("Executed");
    }

    private List<Scheduler> findSchdeuledCampaigns(List<Scheduler> schedulerList) {
        List<Scheduler> threadList = new ArrayList<Scheduler>();
        for(int i=0;i<schedulerList.size();i++){
            Scheduler scheduler = schedulerList.get(i);
            Date now = new Date();
            String input = scheduler.getYear()+"-"+scheduler.getMonth()+"-"+scheduler.getDate()+" "+scheduler.getHour()+"-"+scheduler.getMinutes();
            SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh-mm");
            Date t;
            try {
               t = ft.parse(input); 
               if(t.compareTo(now) <= 0 && scheduler.getStatus().equals("activate")){
                   threadList.add(scheduler);
                   scheduler.setStatus("In Progress");
                   schedulerService.update(scheduler);
               }
            }catch (ParseException e) { 
               System.out.println("Unparseable using " + ft); 
            }
        }
        return threadList;
    }
}
