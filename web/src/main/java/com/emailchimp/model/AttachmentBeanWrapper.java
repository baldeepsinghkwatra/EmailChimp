/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.model;

import java.util.List;

/**
 *
 * @author anshul
 */
public class AttachmentBeanWrapper {
    
    private List<AttachmentBean> attachmentBeanList;

    public List<AttachmentBean> getAttachmentBeanList() {
        return attachmentBeanList;
    }

    public void setAttachmentBeanList(List<AttachmentBean> attachmentBeanList) {
        this.attachmentBeanList = attachmentBeanList;
    }
    
}
