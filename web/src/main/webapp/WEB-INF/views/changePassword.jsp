<%-- 
    Document   : changePassword
    Created on : 11 Oct, 2016, 4:07:06 PM
    Author     : baldeep
--%>

<%@page import="com.emailchimp.model.Users"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h4>${user}</h4>
        
        
        <h4>Get User details from Request attribute</h4>
        <%=((Users)request.getAttribute("user")).getUserEmail()%>
                
    </body>
</html>
