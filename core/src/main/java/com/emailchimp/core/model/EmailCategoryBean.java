/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.core.model;

import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author anshul
 */
public class EmailCategoryBean {
    
    private long id;
    private String categoryName;
    private Calendar addedDate;
    private Set<EmailListBean> emailList = new HashSet<EmailListBean>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Calendar getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(Calendar addedDate) {
        this.addedDate = addedDate;
    }

    public Set<EmailListBean> getEmailListBean() {
        return emailList;
    }

    public void setEmailListBean(Set<EmailListBean> emailList) {
        this.emailList = emailList;
    }

}
