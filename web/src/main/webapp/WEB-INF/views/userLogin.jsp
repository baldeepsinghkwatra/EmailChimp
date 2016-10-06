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
    </head>
    <body>
        <div id="loginDiv" class="panel panel-primary col-lg-3" style="margin: 0 auto;float: none;">
            <div class="panel-body">
                <h4>Email Chimp Login</h4>
                <form class="form-horizontal" name="loginForm" action="checkLogin" method="POST">
                    <div class="form-group left-inner-addon">
                        <i class="material-icons">email</i>
                        <input class="form-control element-space" type="text" placeholder="Email" name="email" required="" title="Enter your Email here"/>
                    </div>
                    <div class="form-group left-inner-addon">
                        <i class="material-icons">lock_outline</i>
                        <input class="form-control element-space" type="password" placeholder="Password" name="password" title="Enter your Password here"/>
                    </div>
                    <input style="display: none" type="checkbox" name="remember-me" checked="" />
                    <div class="form-group" style="text-align: center">
                        <input class="btn btn-primary" type="submit" value="Login" />
                    </div>
                    <center>
                        <strong> Not a User? <a href="#" onclick="toggleDiv('loginDiv', 'registerDiv')">Register Here</a></strong></center>
                </form>
                <center><span style="color: green;font-weight: bold"> ${data}</span></center>
            </div>
        </div>
        <div id="registerDiv" class="panel panel-primary col-lg-3" style="margin: 0 auto;float: none;display: none">
            <div class="panel-body">
                <h4>Email Chimp Register</h4>
                <form class="form-horizontal left-inner-addon" name="registerForm" action="registerConsumer" method="POST">
                    <div class="form-group">
                        <i class="material-icons">email</i>
                        <input class="form-control element-space" type="text" placeholder="Full Name" name="userName" required="" title="Enter your Name here"/>
                    </div>   
                    <div class="form-group">
                        <i class="material-icons">email</i>
                        <input class="form-control element-space" type="email" placeholder="Email" name="userEmail" required="" title="Enter your Email here"/>
                    </div>
                    <div class="form-group left-inner-addon">
                        <i class="material-icons">lock_outline</i>
                        <input class="form-control element-space" type="password" placeholder="Password" name="userPassword" title="Enter your Password here"/>
                    </div>
                    <div class="form-group left-inner-addon">
                        <i class="material-icons">contact_phone</i>
                        <input class="form-control element-space" type="text" placeholder="Contact Number" name="userMobile" title="Enter your Mobile Number here"/>
                    </div>
                    <input style="display: none" type="checkbox" name="remember-me" checked="" />
                    <div class="form-group" style="text-align: center">
                        <input class="btn btn-primary" type="submit" value="Register" />
                    </div>
                    <center> <strong> Already registered? <a href="#" onclick="toggleDiv('registerDiv', 'loginDiv')">Sign In</a></strong></center>
                </form>
            </div>
        </div>
    </body>
    <script  src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
    <script  src="<%=request.getContextPath()%>/resources/js/main.js"></script>
</html>
