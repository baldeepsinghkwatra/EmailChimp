<%-- 
    Document   : changePassword
    Created on : 11 Oct, 2016, 4:07:06 PM
    Author     : baldeep
--%>

<%@page import="com.emailchimp.model.Users"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
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
                
                EmailChimp.loadComponent('common/ResetPassword');
                
                if (hash != '' && hash != 'common/ResetPassword')
                    EmailChimp.loadComponent(hash);
                
            });
        </script>
    </head>
    <body style="margin: 1px">
        <div id="layout-container" style="height:700px;">
            <div id="layout" style="width: 100%; height: 100%;"></div>
        </div>
    </body>
</html>