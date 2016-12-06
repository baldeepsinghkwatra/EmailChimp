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
package com.emailchimp.core.service;

/**
 *
 * @author baldeep
 */
import com.emailchimp.core.model.AttachmentBean;
import com.emailchimp.core.model.AttachmentList;
import java.io.File;
import java.util.List;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@PropertySource("classpath:EmailConfig.properties")
@Component
public class Email {

    @Value("${email.username}")
    private String username;

    @Autowired
    private JavaMailSender mailSender;
    final String FROM="EmailChimp <mindfireprojects@gmail.com>";

    /**
     * This method triggers the email in background thread i.e. the mail is sent
     * asynchronously
     *
     * @param to Email to whom mail has to be sent
     * @param subject Subject of the email Messages
     * @param msg Message body to be sent along with email
     * @throws InterruptedException
     */
    @Async
    public void sendMail(String to, String subject, String msg) throws InterruptedException {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            message.setSubject(subject);
            message.setHeader("Content-Type", "text/plain; charset=UTF-8");
            MimeMessageHelper helper;
            helper = new MimeMessageHelper(message, true);
            helper.setFrom(FROM);
            helper.setTo(to);
            helper.setText(msg, true);
            mailSender.send(message);
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
    }

    public void sendMail(String to, String subject, String message, List<AttachmentList> attachments) {
        try {
            MimeMessage messageAttach = mailSender.createMimeMessage();
            messageAttach.setSubject(subject);
            messageAttach.setHeader("Content-Type", "text/plain; charset=UTF-8");
            MimeMessageHelper helper;
            helper = new MimeMessageHelper(messageAttach, true);
            helper.setFrom(FROM);
            helper.setTo(to);
            helper.setText(message, true);
            for(int i=0;i<attachments.size();i++){
                AttachmentList attachment = attachments.get(i);
                helper.addAttachment(attachment.getName(), new File("/home/anshul/tmpFiles/"+attachment.getsName()));
            }
            mailSender.send(messageAttach);
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
    }

}