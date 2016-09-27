/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.emailchimp.configuration;

import com.emailchimp.annotation.JsonObjectProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import javax.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
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
            NativeWebRequest webRequest,WebDataBinderFactory binderFactory) throws Exception {
        
        Class<?> parameterType = parameter.getParameterType();

        HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        ServletServerHttpRequest inputMessage = new ServletServerHttpRequest(servletRequest);

        // handle potential exceptions from this as well
        ObjectNode rootObject = objectMapper.readValue(inputMessage.getBody(), ObjectNode.class);
        JsonObjectProperty annotation = parameter.getParameterAnnotation(JsonObjectProperty.class);
        String jsonInString = rootObject.get(annotation.name()).toString();

        return objectMapper.readValue(jsonInString, parameterType);

    }
}
