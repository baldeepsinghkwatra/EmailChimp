EmailChimp.controller('MainController', {
	init : function() {
		this.bindEvents();
	},

	bindEvents : function() {
		var thisInstance = EmailChimp.controllers.MainController;

		$$("signIn").define({
			click : thisInstance.login
		});
		$$("signUp").define({
			click : thisInstance.register
		});
		$$("needAccount").define({
			click : thisInstance.showRegister
		});
		$$("forgotPasswordLabel").define({
			click : thisInstance.showForgotPassword
		});
	},
	bindForgotPasswordEvents : function() {
		var thisInstance = EmailChimp.controllers.MainController;

		$$("forgotPasswordButton").define({
			click : thisInstance.forgetPassword
		});

	},
	showForgotPassword : function() {
		var thisInstance = EmailChimp.controllers.MainController;

		webix.ui(EmailChimp.views.ForgotPassword.getLayout()).show();
		thisInstance.bindForgotPasswordEvents();
	},
	showRegister : function() {
		$$("showReg").define("collapsed", false);
	},
	login : function() {

		var loginForm = $$('login');
		var responseLoginMessage = $$('responseLoginMessage');
		responseLoginMessage.hide();

		if (loginForm.validate()) {

			var values = loginForm.getValues();
			values.rememberMe = 'on';
			
			webix.ajax().post(
					"checkLogin",
					values,
					{
						success : function(response) {
							var obj = JSON.parse(response);

							if (obj.status == 200) {
								window.location.href ='';
							}

							responseLoginMessage.define({
								label : "<span style='color:red'>"
										+ obj.message + "</span>",
								css : "lines"
							});

							responseLoginMessage.show();

							loginForm.clear();

						}
					});
		}
	},
	register : function() {

		var registerForm = $$('register');
		var responseRegisterMessage = $$('responseRegisterMessage');
		responseRegisterMessage.hide();

		if (registerForm.validate()) {

			webix.ajax().post("registerConsumer", registerForm.getValues(), {
				success : function(response, data, XmlHttpRequest) {

					var obj = JSON.parse(response);
					
					responseRegisterMessage.define({
						label : "<span style='color:red'>" + obj.message + "</span>",
						css : "lines"
					});

					responseRegisterMessage.show();

				}
			});
		}
	},
	forgetPassword : function() {

		var forgotPasswordForm = $$('forgotPasswordForm');

		var forgotPasswordMessage = $$('forgotPasswordMessage');
		forgotPasswordMessage.hide();

		if (forgotPasswordForm.validate()) {

			webix.ajax().post(
					"forgot-password",
					forgotPasswordForm.getValues(),
					{
						success : function(response, data, XmlHttpRequest) {

							var obj = JSON.parse(response);

							forgotPasswordMessage.define({
								label : "<span style='color:red'>" + obj.message
										+ "</span>",
								css : "lines"
							});

							forgotPasswordMessage.show();
							forgotPasswordForm.clear();

						}
					});
		}
	}

});
