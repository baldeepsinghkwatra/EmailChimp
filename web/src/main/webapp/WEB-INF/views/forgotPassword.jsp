<%-- 
    Document   : forgotPassword
    Created on : 18 Oct, 2016, 3:21:23 PM
    Author     : baldeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Forgot Password</title>
        <link rel="stylesheet" href="http://cdn.webix.com/edge/webix.css" type="text/css" media="screen" charset="utf-8">
        <script src="http://cdn.webix.com/edge/webix_debug.js" type="text/javascript" charset="utf-8"></script>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/webix/css/app.css" type="text/css" media="screen" charset="utf-8">
    </head>
    <body>
        <div id="inputForm" style=" position: absolute;
             left: 50%;
             top: 50%;
             -webkit-transform: translate(-50%, -50%);
             transform: translate(-50%, -50%);
             "></div>
        <script>
            var form = webix.ui({
                container: "inputForm",
                view: "form",
                width: 300,
                elementsConfig: {
                    labelPosition: "top"
                },
                elements: [
//                    { template:"<center>Forgot Password</center>", type:"header" },
                    {view: "label", label: '<span style=font-size:25px;font-weight:bold><center>Forgot Password</center></span>', height: 30, align: "center"},
                    {view: "text", name: "userEmail", label: "<span class='webix_icon fa-user'></span>Email", required: true, validate: webix.rules.isEmail, invalidMessage: "Please enter correct email"},
                    {cols: [
                            {view: "button", value: "Send Email", type: "form", click: "submitForm"}
                        ]}
                ]
            });

            form.attachEvent("onSubmit", function () {
                if (form.validate())
                    webix.ajax().post("forgot-password", form.getValues());
            });

            function submitForm() {
                form.callEvent("onSubmit");
            }
        </script>
    </body>
</html>