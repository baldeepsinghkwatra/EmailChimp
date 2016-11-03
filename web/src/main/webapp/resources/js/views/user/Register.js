EmailChimp.view('Register', {
	getLayout : function() {
		return {
			header : "Register",
			id : "showReg",

			collapsed : true,
			body : {
				padding : 40,
				type : 'clean',
				view : "form",
				id : "register",
				elements : [ {
					view : "text",
					required : true,
					name : "userName",
					label : "User Name",
					placeholder : "Matthew",
					labelPosition : "top"
				}, {
					view : "text",
					required : true,
					name : "userEmail",
					label : "Email",
					type : "email",
					placeholder : "mattclark@some.com",
					labelPosition : "top"
				}, {
					view : "text",
					name : "userMobile",
					label : "Mobile",
					labelWidth : 120,
					required : true,
					type : "number",
					placeholder : "10-digit number",
					labelPosition : "top"
				}, {
					view : "text",
					name : "userPassword",
					label : "Password",
					type : "password",
					required : true,
					labelWidth : 120,
					placeholder : "********",
					labelPosition : "top"
				}, {
					height : 10
				}, {
					view : "label",
					id : 'responseRegisterMessage',
					hidden : true,
					align : "center"
				}, {
					view : "button",
					value : "Sign Up",
					id : "signUp",
					inputWidth : 140,
					align : "center"

				}, {} ],
				rules : {
					userMobile : function(value) {
						return value.toString().length == 10;
					},
					'userEmail' : webix.rules.isEmail

				},

				elementsConfig : {
					labelAlign : "left"
				}
			}
		}
	}
});
