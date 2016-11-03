/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.exception;

import com.emailchimp.constants.ExceptionConstants;

/**
 *
 * @author anshul
 */
public class LoginException extends EmailChimpException {
    
    public LoginException(String message) {
        super(ExceptionConstants.RES_CODE_INVALID_LOGIN, message);
    }
    
    public LoginException(int errorCode,String message) {
        super(errorCode, message);
    }
}
