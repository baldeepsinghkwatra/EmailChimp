
EmailChimp.controller('APIController',
        {
            component: ['views/api/APIGrid', 'models/MailModal'],
            init: function () {
                controller = this;
                apiGrid = EmailChimp.views.APIGrid;


                // Change main layout
                $$("content").removeView('main');
                $$("content").addView(apiGrid.getlayout(), 1);
                $$("mainLayout").resize();
                this.bindEvents();
            },
            bindEvents: function () {
                //Event on css
                $$("apiGrid").on_click.trash = this.deleteSettings;

                //Event on properties
                $$("generate").define({click: this.addAPI});
            },
            deleteSettings: function (e, id, node) {
                webix.confirm({
                    text: "The API Key will be deleted. <br/> Are you sure?",
                    ok: "Yes",
                    cancel: "Cancel",
                    callback: function (res) {
                        if (res) {
                            var item = webix.$$("apiGrid").getItem(id);
                            item = item.id;
                            webix.ajax().post("delete-api", "id=" + item, function (text, xml, xhr) {
                                webix.alert(text);
                            }),
                                    $$("apiGrid").remove(id);
                        }
                    }
                });
            },
            addAPI: function (e, id, node) {
                var item = webix.$$("apiGrid").getItem(id);
                webix.confirm({
                    title: "API Key!!",
                    text: "The API Key will be created. <br/> Are you sure?",
                    ok: "Yes",
                    cancel: "Cancel",
                    callback: function (res) {
                        if (res) {

                            webix.ajax().post("add-api", item, function (text, xml, xhr) {
                                webix.alert(text);
                            });
                            var grid = $$("apiGrid");
                            grid.clearAll();
                            grid.showProgress();
                            webix.delay(function () {
                                grid.parse(EmailChimp.models.MailModal.getApi());
                                grid.hideProgress();
                            }, null, null, 50);
                        }
                    }
                });
            }
        }
);
