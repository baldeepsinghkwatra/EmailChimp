/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.controller.rest;

import com.emailchimp.constants.ConsumerConstants;
import com.emailchimp.core.model.AttachmentBean;
import com.emailchimp.model.FileUploadBean;
import com.emailchimp.core.model.MailBean;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author anshul
 */
@RestController
public class UploadFileController {
 
        @PostMapping(ConsumerConstants.UPLOAD)
	public FileUploadBean uploadController(MultipartFile upload) {
            FileUploadBean fileUploadBean = new FileUploadBean();
            long timestamp = new Date().getTime();
            try {
                if(!upload.isEmpty()){
                    byte[] bytes = upload.getBytes();

                    // Creating the directory to store file
                    String rootPath = "/home/anshul";
                    File dir = new File(rootPath + File.separator + "tmpFiles");
                    if (!dir.exists())
                            dir.mkdirs();

                    // Create the file on server
                    File serverFile = new File(dir.getAbsolutePath()
                                    + File.separator + timestamp);
                    BufferedOutputStream stream = new BufferedOutputStream(
                                    new FileOutputStream(serverFile));
                    stream.write(bytes);
                    stream.close();
                    fileUploadBean.setsName(timestamp+"");
                    fileUploadBean.setName(upload.getOriginalFilename());
                    fileUploadBean.setStatus("server");
                }else{
                    fileUploadBean.setsName(timestamp+"");
                    fileUploadBean.setName(upload.getOriginalFilename());
                    fileUploadBean.setStatus("error");
                }

            } catch (Exception ex) {
                fileUploadBean.setsName(timestamp+"");
                fileUploadBean.setName(upload.getOriginalFilename());
                fileUploadBean.setStatus("error");
                return fileUploadBean;
            }
            return fileUploadBean;
	}
        
}
