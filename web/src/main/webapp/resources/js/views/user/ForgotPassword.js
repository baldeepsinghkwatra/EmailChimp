EmailChimp.view('ForgotPassword', {
	getLayout : function() {
		return {
			id : 'forgotPassword',
			view : "window",
			modal : true,
			height : 250,
			width : 300,
			left : 450,
			top : 50,
			head : {
				view : "toolbar",
				cols : [ {
					view : "label",
					label : "Forgot Password!!!!"
				}, {
					view : "button",
					label : 'X',
					width : 30,
					align : 'right',
					click : "$$('forgotPassword').close();"
				} ]
			},
			move : true,
			body : {
				view : "form",
				id : "fgtPswd",
				borderless : true,
				elements : [
						{
							view : "text",
							type : "email",
							label : 'Email',
							name : "email"
						},
						{
							view : "button",
							value : "Submit",
							click : function() {
								if (this.getParentView().validate()) { // validate
																		// form
									var values = $$('fgtPswd').getValues();
									webix.ajax().post("forgot-password",
											"userEmail=" + values.email);
									webix.message("All is correct");
									// this.getTopParentView().hide(); //hide
									// window
								} else
									webix.message({
										type : "error",
										text : "Form data is invalid"
									});
							}
						} ],
				rules : {
					"email" : webix.rules.isEmail
				},
				elementsConfig : {
					labelPosition : "top",
				}
			}
		}
	}
});
