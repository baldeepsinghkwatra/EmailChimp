EmailChimp.controller('ResetPasswordController', {
    component: ['views/user/ResetPassword'],
	init : function() {
            this.showView();
	},
        showView: function() {
            var resetPassword = EmailChimp.views.ResetPassword.getLayout();
            $$('mainLayout').removeView("cols");
            $$('mainLayout').addView({ 
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
        }
    });