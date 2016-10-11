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
package com.emailchimp.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author baldeep
 */
@Entity
@Table(name = "EC_USERS")
public class Users implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "user_name", unique = false, nullable = false)
    private String userName;

    @Column(name = "user_email", unique = true, nullable = false)
    private String userEmail;

    @Column(name = "user_mobile", unique = true, nullable = false)
    private String userMobile;

    @Column(name = "user_role", unique = false, nullable = false)
    private String userRole;

    @Column(name = "user_password", unique = false, nullable = false)
    private String userPassword;

    @Column(name = "user_enabled", unique = false, nullable = false)
    private int userEnabled = 1;

    @Temporal(TemporalType.DATE)
    @Column(name = "created_date", updatable = false)
    private Date createdDate;

    @Column(name = "forgot_password_code", unique = false)
    private String forgotPasswordCode;

    @Temporal(TemporalType.DATE)
    @Column(name = "forgot_password_expiry_date", updatable = false)
    private Date forgotPasswordExpiryDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "last_password_updated_date", updatable = false)
    private Date lastPasswordUpdatedDate;

    @Column(name = "verification_code", unique = false, nullable = false)
    private String verificationCode;

    @Column(name = "is_verified", unique = false, nullable = false)
    private boolean isVerified = false;

    @Temporal(TemporalType.DATE)
    @Column(name = "verification_date", updatable = false)
    private Date verificationDate;

    @Column(name = "is_active", unique = false, nullable = false)
    private boolean isActive = false;

    @Temporal(TemporalType.DATE)
    @Column(name = "activation_date", updatable = false)
    private Date activationDate;

    @Column(name = "activation_status", unique = false, nullable = true)
    private String activationStatus;

    @Column(name = "accountNonExpired", unique = false, nullable = true)
    private boolean accountNonExpired = true;
    @Column(name = "accountNonLocked", unique = false, nullable = true)
    private boolean accountNonLocked = true;
    @Column(name = "credentialsNonExpired", unique = false, nullable = true)
    private boolean credentialsNonExpired = true;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }

    public long getId() {
        return id;
    }

    public void setId(long userId) {
        this.id = userId;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public int getUserEnabled() {
        return userEnabled;
    }

    public void setUserEnabled(int userEnabled) {
        this.userEnabled = userEnabled;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getForgotPasswordCode() {
        return forgotPasswordCode;
    }

    public void setForgotPasswordCode(String forgotPasswordCode) {
        this.forgotPasswordCode = forgotPasswordCode;
    }

    public Date getForgotPasswordExpiryDate() {
        return forgotPasswordExpiryDate;
    }

    public void setForgotPasswordExpiryDate(Date forgotPasswordExpiryDate) {
        this.forgotPasswordExpiryDate = forgotPasswordExpiryDate;
    }

    public Date getLastPasswordUpdatedDate() {
        return lastPasswordUpdatedDate;
    }

    public void setLastPasswordUpdatedDate(Date lastPasswordUpdatedDate) {
        this.lastPasswordUpdatedDate = lastPasswordUpdatedDate;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }

    public Date getVerificationDate() {
        return verificationDate;
    }

    public void setVerificationDate(Date verificationDate) {
        this.verificationDate = verificationDate;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public Date getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(Date activationDate) {
        this.activationDate = activationDate;
    }

    public String getActivationStatus() {
        return activationStatus;
    }

    public void setActivationStatus(String activationStatus) {
        this.activationStatus = activationStatus;
    }

    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

}
