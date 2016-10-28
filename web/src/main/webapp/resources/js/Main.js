EmailChimp.app('Main', {
	component : [ 'views/user/Login', 'views/user/Register',
			'components/Router', 'controllers/MainController' ],
	routes : [ {
		hash : '#forgotPassword',
		controller : 'ForgotPasswordController'
	}],
	defaultRoute : '#',
	init : function() {
		var layout = {
			id : "mainLayout",
			cols : [
					{
						width : 360,
						multi : false,
						rows : [ EmailChimp.views.Login.getLayout(),
								EmailChimp.views.Register.getLayout() ]
					}, {
						id : 'main'
					}

			]
		};
		webix.ui(layout).show();

		EmailChimp.components.Router.startRouting();

	}
});
