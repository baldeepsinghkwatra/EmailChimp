/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.exception;

/**
 *
 * @author anshul
 */
public class EmailChimpException extends Exception {

    private int statusCode;
    private String message;

    public EmailChimpException(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;

    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getMessage() {
        return message;

    }
}
