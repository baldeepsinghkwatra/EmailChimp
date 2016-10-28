EmailChimp.view('Register', {
	getLayout : function() {
		return {
			header : "Register",
			id : "showReg",
			collapsed : true,
			body : {
				view : "form",
				id : "register",
				elements : [ {
					view : "text",
                                        required:true,
					name : "userName",
					label : "User Name",
					placeholder : "Matthew",
					labelPosition : "top"
				}, {
					view : "text",
                                        required:true,
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
                                        type: "number",
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
					view : "button",
					value : "Sign Up",
					inputWidth : 100,
					click : "EmailChimp.controllers.MainController.register()",
					align : "center"
				}, {} ],
                                rules:{
                                        userMobile:function(value){ return value.toString().length == 10; }
                                    },

				elementsConfig : {
					labelAlign : "left"
				},
				onClick : {
					info : function(e, id) {
						alert(id);
						webix.message(this.item(id).title);
						return false; // blocks default onclick event
					}
				},
			}
		}
	}
});
