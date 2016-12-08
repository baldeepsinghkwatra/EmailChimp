EmailChimp
		.view(
				'MainToolbar',
				{
					layout : {
						view : "toolbar",
						padding : 5,
						elements : [
								{
									view : "button",
									type : "icon",
									icon : "envelope-o",
									width : 25
								},
								{
									view : "label",
									label : "EMAIL CHIMP",
									width : 200
								},
								{},
								{
									view : "button",
									type : "icon",
									icon : "user",
									width : 30,
									popup : {
										view : "popup",
										id : "lang",
										head : false,
										width : 150,
										body : {
											view : "list",
											scroll : false,
											yCount : 2,
											select : true,
											borderless : true,
											template : "#lang#",
											data : [ {
												id : 'changePassword',
												lang : "Change Password"
											}, {
												id : 'logout',
												lang : "logout"
											} ],
											on : {
												"onItemClick" : function(id, e,
														node) {
													if (id === "logout") {
														window.location.href = "logout";
													}
													if (EmailChimp.components.Router.currentHash === "#changePassword") {
														EmailChimp.controllers.ChangePasswordController
																.init();
													}
													window.location.hash = '#'
															+ id;
													$$('lang').hide();
												}
											}
										}
									}
								} ]
					}
				});
