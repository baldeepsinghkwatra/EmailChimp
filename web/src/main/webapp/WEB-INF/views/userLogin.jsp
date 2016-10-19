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
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/w2ui.min.css">
        <script  src="<%=request.getContextPath()%>/resources/js/jquery-3.1.0.min.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/w2ui-1.4.3.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/StyleConstant.js"></script>

        <script  src="<%=request.getContextPath()%>/resources/js/app/common/HeaderPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/LeftPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/FooterPanel.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/app/common/EmailChimp.js"></script>
        <script>
            $(document).ready(function () {
                
                var hash = window.location.hash.replace(/^#/, '');

                EmailChimp.conf.headerPanel = false;
                EmailChimp.conf.LeftPanel = false;
                EmailChimp.conf.toolbar = false;
                EmailChimp.init();
                             
                
                if (hash != '' && hash != 'user/UserLogin')
                    EmailChimp.loadComponent(hash);
                else 
                   EmailChimp.loadComponent('user/UserLogin'); 
                
            });
        </script>
    </head>
    <body style="margin: 1px">
        <div id="layout-container" style="height:700px;">
            <div id="layout" style="width: 100%; height: 100%;"></div>
        </div>
    </body>
</html>
