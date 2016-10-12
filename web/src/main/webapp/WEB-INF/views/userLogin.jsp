<%-- 
    Document   : userLogin
    Created on : 6 Sep, 2016, 12:28:04 PM
    Author     : baldeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Page</title>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/w2ui.min.css">
        <script  src="<%=request.getContextPath()%>/resources/js/jquery-3.1.0.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/w2ui-1.4.3.js"></script>
                <script  src="<%=request.getContextPath()%>/resources/js/app/common/StyleConstant.js"></script>

        <script  src="<%=request.getContextPath()%>/resources/js/app/common/HeaderPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/LeftPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/FooterPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/EmailChimp.js"></script>
        <script>
            $(document).ready(function () {
                EmailChimp.conf.headerPanel = false;
                EmailChimp.conf.LeftPanel = false;
                EmailChimp.conf.toolbar = false;
                EmailChimp.init();
                EmailChimp.loadComponent('common','UserLogin');
            });
        </script>
    </head>
    <body style="margin: 1px">
        <div id="layout-container" style="height:700px;">
            <div id="layout" style="width: 100%; height: 100%;"></div>
        </div>
    </body>
<!--       <div id="form" style="width: 450px;height:220px;position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);"></div>
        <div style="height: 20px;"></div>
        <button class="btn" onclick="openPopup()" style="position: absolute;
        left: 50%;
        top: 70%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);">New User? Register</button>-->

<!--    </body>
    <script  src="<%=request.getContextPath()%>/resources/js/main.js"></script>-->
</html>
