<%-- 
Document   : layout
Created on : 27 Sep, 2016, 1:04:40 AM
Author     : anshul
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!doctype html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/main.css" type="text/css" media="screen" charset="utf-8">
        <title>Login Page</title>
    </head>
      <!--   <style>

            .transparent{
                    background-color: transparent;
            }
            a.check_flight{
                    color:  #367ddc;
            }
            .webix_el_box .webixtype_form {
                    color: #fff;
            }
            .webix_el_counter .webix_inp_counter_prev, .webix_el_counter .webix_inp_counter_next {
                    color: #fff;
            }
            .webix_el_counter .webix_inp_counter_next {
                    line-height: 28px;
            }
    </style> -->
        
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/webix/css/webix.css" type="text/css" media="screen" charset="utf-8">
        
     	<script src="<%=request.getContextPath()%>/resources/webix/js/webix_debug.js" type="text/javascript" charset="utf-8"></script>
        <script src="<%=request.getContextPath()%>/resources/js/EmailChimp.js" type="text/javascript" charset="utf-8"></script>
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script> -->
    </head>
    

    <body>
        
        <div id="msgErr" style="display:none;">${messageDefault}</div>
        <script data-main="<%=request.getContextPath()%>/resources/js/Main" 
        src="<%=request.getContextPath()%>/resources/webix/js/require.js"></script>
    </body>
</html>
