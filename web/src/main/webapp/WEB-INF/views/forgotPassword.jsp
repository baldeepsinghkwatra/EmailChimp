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
        <script src="http://cdn.webix.com/edge/webix.js" type="text/javascript" charset="utf-8"></script>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/webix/css/main.css" type="text/css" media="screen" charset="utf-8">
    </head>
    <body>
        <div id="inputForm" class="formDiv"></div>
        <script>
            var form = webix.ui({
                container: "inputForm",
                view: "form",
                width: 400,
                elementsConfig: {
                    labelPosition: "top"
                },
                elements: [
                    {view: "label", label: '<span style=font-size:25px;font-weight:bold><center>Forgot Password</center></span>', height: 30, align: "center"},
                    {view: "text", name: "userEmail", label: "<span class='webix_icon fa-user'></span>Email", placeholder: 'Tell us your Email', required: true, validate: webix.rules.isEmail, invalidMessage: "Please Enter Correct Email"},
                    {cols: [
                            {view: "button",id:"submitButton", value: "Send Email", click: "submitForm"}
                        ]},
                    {view: "label",height:40, id: 'responseMessage', align: "center"}
                ]
            });

            form.attachEvent("onSubmit", function () {
                if (form.validate()) {
                    
                     $$("submitButton").disable();
                    webix.ajax().post("forgot-password", form.getValues(), function (text, xml, xhr) {
                        var color = 'red';
                        if (xhr.status === 200) {
                            color = 'green';
                        }
                        $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                        $$('responseMessage').refresh();
                    });
                    $$("submitButton").enable();
                }
            });

            function submitForm() {
                form.callEvent("onSubmit");
            }
        </script>
    </body>
</html>