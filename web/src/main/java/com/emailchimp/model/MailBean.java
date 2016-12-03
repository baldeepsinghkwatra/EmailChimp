/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template files, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.model;

import com.emailchimp.core.model.AttachmentBean;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author anshul
 */
public class MailBean {
    
    private String to;
    private String message;
    private String subject;
    private String files;
    private String cc;
    private String bcc;
    private List<AttachmentBean> attachments;
    
    public List<AttachmentBean> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<AttachmentBean> attachments) {
		this.attachments = attachments;
	}

	public String getCc() {
        return cc;
    }

    public void setCc(String cc) {
        this.cc = cc;
    }

    public String getBcc() {
        return bcc;
    }

    public void setBcc(String bcc) {
        this.bcc = bcc;
    }
    
    public String getFiles() {
        return files;
    }

    public void setFiles(String files) {
        this.files = files;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return "MailBean{" + "to=" + to + ", message=" + message + ", subject=" + subject + '}';
    }
    
   
}
