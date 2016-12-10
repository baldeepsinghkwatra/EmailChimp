/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.core.service;

import com.emailchimp.core.dao.AbstractDAO;
import com.emailchimp.core.dao.SchedulerDAO;
import com.emailchimp.core.model.Scheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author anshul
 */

@Service
@Transactional
public class SchedulerServiceImpl extends CommonServiceImpl<Scheduler> implements SchedulerService{
    
    SchedulerDAO schedulerDAO;
    
    @Autowired
    public SchedulerServiceImpl(SchedulerDAO schedulerDAO) {
        super(schedulerDAO);
        this.schedulerDAO = schedulerDAO;
    }
    
}
