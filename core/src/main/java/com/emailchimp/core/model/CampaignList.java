/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Calendar;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author anshul
 */
@Entity
public class CampaignList implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = false, nullable = true)
    private Long count;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Calendar openDateTime;
    
    @JoinColumn
    @ManyToOne
    private EmailList emailList;
    
    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Campaign campaign;

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public Calendar getOpenDateTime() {
        return openDateTime;
    }

    public void setOpenDateTime(Calendar openDateTime) {
        this.openDateTime = openDateTime;
    }

    public EmailList getEmailList() {
        return emailList;
    }

    public void setEmailList(EmailList emailList) {
        this.emailList = emailList;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
}
