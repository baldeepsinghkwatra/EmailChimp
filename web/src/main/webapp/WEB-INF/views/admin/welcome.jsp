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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Home</title>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/w2ui.min.css">
    </head>
    <body>
        <div class="panel panel-primary col-lg-10" style="margin: 0 auto;float: none;">
            <div class="panel-body">
                <span style="text-align: center">
                    <h3>${greeting}</h3>
                    <a onclick="getAllUsers()" style="float: left" href="#" id="viewUsers">View All Users</a>
                    <a style="float: right" href="logout" class="btn-sm btn-danger">Logout</a>

                    <form class="form-inline" id="searchForm" name="searchForm">
                        <div class="form-group">
                            <input id="mobileNumber" class="form-control col-lg-12" type="search" placeholder="Search by Mobile" name="mobileNumber" required="" title="Enter Mobile Number here"/>
                        </div>
                        <div class="form-group">
                            <input class="btn-xs btn-primary" onclick="getUserByMobile()" type="button" value="Search" />
                        </div>
                    </form></span>
                <div id="allUsersDiv"></div>
            </div>
        </div>

        <div id="myForm" style="width: 600px"></div>
        <script  src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
        <script  src="<%=request.getContextPath()%>/resources/js/w2ui.min.js"></script>
        <script src="<%=request.getContextPath()%>/resources/js/welcome.js"></script>
        <script>
                                var test;
                                w2utils.settings.dataType = 'JSON';
                                $(function () {

                                test = $('#myForm').w2form({
                                name: 'myForm',
                                        header: 'Login Form',
                                        url: 'test',
                                fields: [
                                {name: 'first_name', id: 'st', type: 'text', required: true, options: {maxlength: 2},
                                    html: {caption: 'First Name', attr: 'style="width: 300px"'}},
                                {name: 'last_name', type: 'text', required: true},
                                {name: 'comments', type: 'text'}
                                ],
                                        actions: {
                                        reset: function () {
                                        this.clear();
                                        },
                                                save: function () {
                                                    debugger;
                                                this.save();
                                                }
                                        }
                                });
                                });
        </script>
 </body>
</html>
