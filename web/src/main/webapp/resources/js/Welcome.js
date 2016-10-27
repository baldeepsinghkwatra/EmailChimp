EmailChimp.app('Welcome', {
	component : [ 'views/common/MainToolbar', 'views/common/SideMenu',
			'components/Router', 'components/SideMenuIcon' ],
	routes : [ {
		hash : '#sentMail',
		controller : 'SentMailController'
	}, {
		hash : '#outbox',
		controller : 'OutBoxController'
	} ],
	defaultRoute : '#sentMail',
	
	init : function() {
		EmailChimp.components.SideMenuIcon.init();

		var layout = {
			id : "mainLayout",
			rows : [ EmailChimp.views.MainToolbar.layout, {
				id : "content",
				cols : [ EmailChimp.views.SideMenu.layout, {
					id : 'main'
				} ]
			} ]
		};
		webix.ui(layout).show();

		EmailChimp.components.Router.startRouting();
	}
});