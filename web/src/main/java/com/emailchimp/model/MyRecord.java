/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.model;

/**
 *
 * @author jaspreetsingh
 */
public class MyRecord {

    private String first_name;
    private String last_name;
    private String comments;

    @Override
    public String toString() {
        return "MyRecord{" + "first_name=" + first_name + ", last_name=" + last_name + ", comments=" + comments + '}';
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

}
