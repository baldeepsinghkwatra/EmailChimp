<%-- 
Document   : layout
Created on : 27 Sep, 2016, 1:04:40 AM
Author     : anshul
--%>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Email Chimp</title>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/webix/css/webix.css" type="text/css" media="screen" charset="utf-8">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/app.css" type="text/css" media="screen" charset="utf-8">

     	<script src="<%=request.getContextPath()%>/resources/webix/js/webix_debug.js" type="text/javascript" charset="utf-8"></script>
        <script src="<%=request.getContextPath()%>/resources/js/EmailChimp.js" type="text/javascript" charset="utf-8"></script>

       	<script type="text/javascript">
            webix.require.disabled = true;
            webix.codebase = "http://cdn.webix.com/components/ckeditor/";
            window.CKEDITOR_BASEPATH = webix.codebase + "ckeditor/";
        </script>

        <script src="http://cdn.webix.com/components/ckeditor/ckeditor.js"></script>
        <script src="http://cdn.webix.com/components/ckeditor/ckeditor/ckeditor.js"></script>



    </head>
    <body>
        <script data-main="<%=request.getContextPath()%>/resources/js/Welcome" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.js"></script>
    </body>
</html>
