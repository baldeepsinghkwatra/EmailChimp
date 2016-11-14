EmailChimp.view('ChangePassword', {
	getLayout : function() {
		return {
			id : 'forgotPassword',
			view : "window",
			modal : true,
			autoheight : true,
			position : "center",
			width : 400,
			head : EmailChimp.getPopupToolbar('Change Password'),
			move : true,
			body : {
				view : "form",
				id : "changePasswordForm",
				adjust : true,
				elements : [ 
                                {view: "label", label: '<span style=font-size:25px;font-weight:bold><center>Change Password</center></span>', height: 30, align: "center"},
                                {view: "text", type: 'password', id: 'currentPassword', name: "currentPassword", label: "<span class='webix_icon fa-key'></span>Current Password", placeholder: 'Write your new password here..', required: true, invalidMessage: "Please Enter Current Password"},
                                {view: "text", type: 'password', id: 'userPassword', name: "userPassword", label: "<span class='webix_icon fa-key'></span>New Password", placeholder: 'Write your new password here..', required: true, invalidMessage: "Please Enter New Password"},
                                {view: "text", type: 'password', id: 'userPasswordConfirm', name: "userPasswordConfirm", label: "<span class='webix_icon fa-key'></span>Confirm Password", placeholder: 'Confirm your new password.. ', required: true, invalidMessage: "Please Confirm your Password"},
                                {cols: [
                                        {view: "button", id: "submitButton", value: "Change Password", click: "EmailChimp.controllers.ChangePasswordController.submitForm()"}
                                    ]},
                                {view: "label", height: 50, id: 'responseMessage', align: "center"}
                                ],
				rules: {
                                    userPasswordConfirm: function (data) {
                                        //passwords must be equal
                                        if ($$('userPassword').getValue() !== $$('userPasswordConfirm').getValue()) {
                                            webix.message({type: "error", text: "Passwords are not Same"});
                                            return false;
                                        }
                                        if($$('currentPassword').getValue() === $$('userPassword').getValue()) {
                                            webix.message({type: "error", text: "Password is same as current password"});
                                            return false;
                                        }

                                        return true;
                                    }
                                },
				elementsConfig : {
					labelPosition : "top",
				}
			}
		}
	}
});
