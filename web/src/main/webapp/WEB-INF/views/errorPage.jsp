<%-- 
    Document   : 404
    Created on : 13 Sep, 2016, 3:37:23 PM
    Author     : baldeep
--%>

<%@page import="com.emailchimp.constants.ExceptionConstants"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error Page</title>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css">
    </head>
    <body style="text-align: center;">
        <h1 style="color: white">Error in Processing your Request</h1>
        <h3 style="color: white">Message: <%=request.getAttribute(ExceptionConstants.ERROR_MESSAGE)%></h3>
    </body>
</html>
