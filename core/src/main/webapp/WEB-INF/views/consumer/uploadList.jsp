<%-- 
    Document   : uploadList
    Created on : 15 Sep, 2016, 1:20:26 PM
    Author     : baldeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <form action="uploadFile" method="POST" enctype="multipart/form-data">
            <input type="file" name="excelFileName" value="" />
            <input type="submit" value="Upload" />
        </form>
        
    </body>
</html>
