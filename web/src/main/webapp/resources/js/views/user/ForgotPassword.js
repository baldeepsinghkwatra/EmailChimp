EmailChimp.view('ForgotPassword', {
	getLayout : function() {
		return {
			id : 'forgotPassword',
			view : "window",
			modal : true,
			autoheight : true,
			position : "center",
			width : 300,
			head : EmailChimp.getPopupToolbar('Forgot Password'),
			move : true,
			body : {
				view : "form",
				id : "forgotPasswordForm",
				adjust : true,
				elements : [ {
					view : "text",
					type : "email",
					label : 'Email',
					name : "userEmail"
				}, {
					view : "label",
					hidden : true,
					id : 'forgotPasswordMessage',
					align : "center",
					css : "lines"
				}, {
					view : "button",
					value : "Submit",
					id : 'forgotPasswordButton'
				} ],
				rules : {
					"userEmail" : webix.rules.isEmail
				},
				elementsConfig : {
					labelPosition : "top",
				}
			}
		}
	}
});
