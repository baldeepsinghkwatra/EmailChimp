<%-- 
    Document   : welcome
    Created on : 5 Sep, 2016, 1:14:32 PM
    Author     : baldeep
--%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Consumer Home</title>
<link rel="stylesheet" href="resources/css/bootstrap.min.css">
</head>
<body>
    <div class="panel panel-primary col-lg-3" style="margin: 0 auto;float: none;text-align: center">
            <div class="panel-body">
                ${greeting}
                <a href="logout" class="btn-sm btn-danger">Logout</a>
            </div>
        </div>
    
</body>
</html>
