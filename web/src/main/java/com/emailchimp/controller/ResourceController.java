/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author anshul
 */

@Controller
public class ResourceController {
    
    @GetMapping("/emailTrack")
    public void resourceHandling(){
        System.out.println("Hi Anshul");
    }
    
    @RequestMapping(value = "/getImage", method = RequestMethod.GET)
    public void showImage(HttpServletRequest request,
            HttpServletResponse response) throws Exception {

      ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();

      try {
          System.out.println(request.getContextPath());
         File img = new File(request.getContextPath()+"/resources/images/menu.png");
         BufferedImage image = ImageIO.read(img );
      } catch (IllegalArgumentException e) {
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
      }

      byte[] imgByte = jpegOutputStream.toByteArray();

      response.setHeader("Cache-Control", "no-store");
      response.setHeader("Pragma", "no-cache");
      response.setDateHeader("Expires", 0);
      response.setContentType("image/jpeg");
      ServletOutputStream responseOutputStream = response.getOutputStream();
      responseOutputStream.write(imgByte);
      responseOutputStream.flush();
      responseOutputStream.close();
    }
    
}
