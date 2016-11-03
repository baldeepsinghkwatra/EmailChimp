EmailChimp
		.view(
				'Login',
				{
					getLayout : function() {
						return {

							header : "Login!!",
							body : {
								view : "form",
								id : "login",
								type : 'clean',
								padding : 40,
								elements : [
										{
											view : "template",
											template : "<div style='text-align:center;'><img src='resources/images/Gmail.png' height='130'></div>",
											height : 160,
											align : "center",
											type : "clean"
										},
										{
											view : "text",
											required : true,
											type : 'email',
											name : "email",
											label : "Email",
											placeholder : "mattclark@some.com",
											labelPosition : "top"
										},
										{
											view : "text",
											name : "password",
											required : true,
											label : "Password",
											type : "password",
											labelPosition : "top",
											labelWidth : 120,
											placeholder : "********"
										},

										{

											view : "label",
											height : 50,
											id : 'responseLoginMessage',
											label : '',
											align : "center"
										},
										{
											view : "button",
											value : "Sign In",
											id : 'signIn',
											inputWidth : 140,
											align : "center"
										},

										{
											view : "label",
											label : "Need an account ? Register",
											autoheight : true,
											border : 0,
											align : "center",
											id : 'needAccount'

										}, {
											view : "label",
											label : "Forgot Password",
											autoheight : true,
											align : "center",
											id : 'forgotPasswordLabel'
										},

										{} ],
								rules : {
									"email" : webix.rules.isEmail
								},
								elementsConfig : {
									labelWidth : 100,
									labelAlign : "left"
								}
							}
						}
					}
				});
