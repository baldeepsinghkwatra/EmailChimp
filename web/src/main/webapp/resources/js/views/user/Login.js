EmailChimp
		.view(
				'Login',
				{
					getLayout : function() {
						return {

							header : "LOGIN!!",
							body : {
								view : "form",
								id : "login",
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
                                                                                        required: true,
                                                                                        type: 'email',
											name : "email",
											label : "Email",
											placeholder : "mattclark@some.com",
											labelPosition : "top"
										},
										{
											view : "text",
											name : "password",
                                                                                        required: true,
											label : "Password",
											type : "password",
											labelPosition : "top",
											labelWidth : 120,
											placeholder : "********"
										},
										{
											height : 10
										},
										{
											view : "button",
											value : "Sign In",
											inputWidth : 140,
											click : "EmailChimp.controllers.MainController.login()",
											align : "center"
										},
										{
											view : "template",
											template : "<div style='text-align:center;cursor:pointer;' onclick='EmailChimp.controllers.MainController.showRegister()'>Need an account? Register</div><br><div style='text-align:center;cursor:pointer;'><a href='#forgotPassword'>Forgot Password</a></div>",
											height : 160,
											align : "center",
											type : "clean"
										} ],
                                                                                rules:{
                                                                                        "email":webix.rules.isEmail
                                                                                    },
								elementsConfig : {
									labelWidth : 100,
									labelAlign : "left"
								}
							}
						}
					}
				});
