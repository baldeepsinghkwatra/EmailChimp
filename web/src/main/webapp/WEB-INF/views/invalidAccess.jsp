<%-- 
Document   : layout
Created on : 27 Sep, 2016, 1:04:40 AM
Author     : anshul
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Admin Home</title>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/w2ui.min.css">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/emailChimp.css">

        <script  src="<%=request.getContextPath()%>/resources/js/jquery-3.1.0.min.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/w2ui-1.4.3.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/StyleConstant.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/HeaderPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/LeftPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/FooterPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/EmailChimp.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/admin/Mailbox.js"></script>
    </head>
    <body style="margin: 1px">
        <div id="layout-container" style="height:700px;">
            <div id="layout" style="width: 100%; height: 100%;"></div>
        </div>
    </body>
</html>
