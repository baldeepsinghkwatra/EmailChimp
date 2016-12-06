/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Calendar;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author anshul
 */
@Entity
public class EmailTracks implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable=false)
    private String status;
    
    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Account account;
    
    @Column(unique = false, nullable = true)
    private Long count;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = true)
    private Calendar openDateTime;
    
    @OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
    private List<AttachmentList> attachments;
    
    @Column(nullable = false)
    private String recepients;
    
    @Column(nullable = false)
    private String message;
    
    @Column(nullable = false)
    private String subject;
    
    @Column(nullable = true)
    private String files;

    @Column(nullable = true)
    private String cc;
    
    @Column(nullable = true)
    private String bcc;

    public String getRecepients() {
        return recepients;
    }
    
    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Campaign campaign;
    public void setRecepients(String recepients) {
        this.recepients = recepients;
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

    public String getFiles() {
        return files;
    }

    public void setFiles(String files) {
        this.files = files;
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

    public List<AttachmentList> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<AttachmentList> attachments) {
        this.attachments = attachments;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Calendar getOpenDateTime() {
        return openDateTime;
    }

    public void setOpenDateTime(Calendar openDateTime) {
        this.openDateTime = openDateTime;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
}
