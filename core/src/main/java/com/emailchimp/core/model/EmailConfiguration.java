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
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *
 * @author baldeep
 */
@Entity
public class EmailConfiguration implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Account account;
    @Column(unique = false, nullable = false)
    private String smtpHost;
    @Column(unique = false, nullable = false)
    private String smtpPort;
    @Column(unique = false, nullable = false)
    private String smtpUsername;
    @Column(unique = false, nullable = false)
    private String smtpPassword;
    @Column(unique = false)
    private String vehicleRadio;
    @Column(unique = false)
    private String vehicleCheck;
    @OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    @Fetch (FetchMode.SELECT)
    private List<CheckBoxBean> checkBox;

    public List<CheckBoxBean> getCheckBox() {
        return checkBox;
    }

    public void setCheckBox(List<CheckBoxBean> checkBox) {
        this.checkBox = checkBox;
    }

    public String getVehicleRadio() {
        return vehicleRadio;
    }

    public void setVehicleRadio(String vehicleRadio) {
        this.vehicleRadio = vehicleRadio;
    }

    public String getVehicleCheck() {
        return vehicleCheck;
    }

    public void setVehicleCheck(String vehicleCheck) {
        this.vehicleCheck = vehicleCheck;
    }
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
     @JsonIgnore
    private Calendar addedDate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSmtpHost() {
        return smtpHost;
    }

    public void setSmtpHost(String smtpHost) {
        this.smtpHost = smtpHost;
    }

    public String getSmtpPort() {
        return smtpPort;
    }

    public void setSmtpPort(String smtpPort) {
        this.smtpPort = smtpPort;
    }
    public String getSmtpPassword() {
        return smtpPassword;
    }

    public void setSmtpPassword(String smtpPassword) {
        this.smtpPassword = smtpPassword;
    }

    public Calendar getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(Calendar addedDate) {
        this.addedDate = addedDate;
    }

    public String getSmtpUsername() {
        return smtpUsername;
    }

    public void setSmtpUsername(String smptpUsername) {
        this.smtpUsername = smptpUsername;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return "EmailConfiguration{" + "id=" + id + ", account=" + account + ", smtpHost=" + smtpHost + ", smtpPort=" + smtpPort + ", smtpUsername=" + smtpUsername + ", smtpPassword=" + smtpPassword + ", addedDate=" + addedDate + '}';
    }


}
