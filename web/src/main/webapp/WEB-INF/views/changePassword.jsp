<%-- 
    Document   : changePassword
    Created on : 11 Oct, 2016, 4:07:06 PM
    Author     : baldeep
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Change Password</title>
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
                    {view: "label", label: '<span style=font-size:25px;font-weight:bold><center>Change Password</center></span>', height: 30, align: "center"},
                    {view: "label", label: '<span style=font-size:15px;>Hi, <c:out value="${user.userName}"/></span>', height: 30},
                    {view: "text", type: 'password', id: 'userPassword', name: "userPassword", label: "<span class='webix_icon fa-key'></span>New Password", placeholder: 'Write your new password here..', required: true, invalidMessage: "Please Enter New Password"},
                    {view: "text", type: 'password', id: 'userPasswordConfirm', name: "userPasswordConfirm", label: "<span class='webix_icon fa-key'></span>Confirm Password", placeholder: 'Confirm your new password.. ', required: true, validate: webix.rules.isNotEmpty, invalidMessage: "Please Confirm your Password"},
                    {cols: [
                            {view: "button", id: "submitButton", value: "Change Password", click: "submitForm"}
                        ]},
                    {view: "label", height: 50, id: 'responseMessage', align: "center"}
                ], rules: {
                    userPasswordConfirm: function (data) {
                        //passwords must be equal
                        if ($$('userPassword').getValue() !== $$('userPasswordConfirm').getValue()) {
                            webix.message({type: "error", text: "Passwords are not Same"});
                            return false;
                        }


                        return true;
                    }
                }
            });
            form.setValues({userEmail: "<c:out value="${user.userEmail}"/>", verificationCode: "<c:out value="${user.forgotPasswordCode}"/>"});

            form.attachEvent("onSubmit", function () {
                if (form.validate()) {

                    $$("submitButton").disable();
                    webix.ajax().post("change-password", form.getValues(), function (text, xml, xhr) {
                        var color = 'red';
                        if (xhr.status === 200) {
                            color = 'green';
                        }
                        $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                        $$('responseMessage').refresh();
                    });
                    $$("submitButton").enable();
                    form.clear();
                }
            });

            function submitForm() {
                form.callEvent("onSubmit");
            }
        </script>
    </body>
</html>