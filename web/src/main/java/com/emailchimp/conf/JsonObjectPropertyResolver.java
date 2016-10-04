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
package com.emailchimp.conf;

import com.emailchimp.conf.annotation.JsonObjectProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import javax.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 *
 * @author jaspreetsingh
 */
public final class JsonObjectPropertyResolver implements HandlerMethodArgumentResolver {

    /**
     * Configured as appropriate for the JSON you expect.
     */
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(JsonObjectProperty.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        Class<?> parameterType=null;
        try {
            parameterType= parameter.getParameterType();
            String pathVariable = parameter.getParameterName();
            HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
            ServletServerHttpRequest inputMessage = new ServletServerHttpRequest(servletRequest);
            
            // handle potential exceptions from this as well
            ObjectNode rootObject = objectMapper.readValue(inputMessage.getBody(), ObjectNode.class);
            JsonObjectProperty annotation = parameter.getParameterAnnotation(JsonObjectProperty.class);
            String jsonInString = rootObject.get(annotation.name().isEmpty() ? pathVariable : annotation.name()).toString();
            System.out.println(jsonInString);
            return objectMapper.readValue(jsonInString, parameterType);
        } catch (NullPointerException npe) {

            throw new HttpMessageNotReadableException("Could not read document, Parameter Type"+parameterType+" not parseable");
        }
    }
}
