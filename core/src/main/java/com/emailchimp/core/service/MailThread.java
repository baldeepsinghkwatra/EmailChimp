/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.core.service;

import com.emailchimp.core.model.EmailTracks;
import com.emailchimp.core.model.MailBean;

/**
 *
 * @author anshul
 */
public class MailThread implements Runnable{

    private EmailTracks mailBean;
    private Email email;

    public MailThread(EmailTracks mailBean, Email email) {
        this.mailBean = mailBean;
        this.email = email;
    }

    @Override
    public void run() {
        email.sendMail(mailBean.getRecepients(), mailBean.getSubject(), mailBean.getMessage(), mailBean.getAttachments());
    }
    
}
