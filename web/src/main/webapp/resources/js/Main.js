EmailChimp.app('Main', {
	component : [ 'views/user/Login',
	              'views/user/Register',
	              'views/user/ForgotPassword',
			'components/Router' ],

	routes : [ {
		hash : '#welcome',
		controller : 'MainController'
	}, {
		hash : '#forgotPassword',
		controller : 'MainController'
	} ],
	defaultRoute : '#welcome',
	init : function() {
		var layout = {
			id : "mainLayout",
			type : 'clean',
			cols : [
					{
						view : "scrollview",
						body : {
							type : 'clean',
							width : 375,
							multi : false,

							rows : [ EmailChimp.views.Login.getLayout(),
									EmailChimp.views.Register.getLayout() ]
						}
					}, {
						id : 'main'
					}

			]
		};
		webix.ui(layout).show();

		EmailChimp.components.Router.startRouting();

	}
});
