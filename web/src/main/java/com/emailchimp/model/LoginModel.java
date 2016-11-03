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
public class LoginModel {
    
    private String url;
    private String message;
    private int status;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LoginModel(String url, String message, int status) {
        this.url = url;
        this.message = message;
        this.status = status;
    }    
    
    public LoginModel() {
        
    }
}
