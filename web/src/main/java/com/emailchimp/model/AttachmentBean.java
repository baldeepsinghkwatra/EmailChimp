/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.model;

/**
 *
 * @author anshul
 */
public class AttachmentBean {
    
    private String name;
    private String sName;

    public AttachmentBean(String name, String sName) {
        this.name = name;
        this.sName = sName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }
    
}
