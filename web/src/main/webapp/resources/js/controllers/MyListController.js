var data = webix.ajax().sync().get("get-email-category");

function changeData() {
    data = JSON.parse(data.responseText);
    for (var i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty("categoryName")) {
            data[i]["value"] = data[i]["categoryName"];
            delete data[i]["categoryName"];
        }
    }

}
EmailChimp.controller('MyListController',
        {
            component: ['views/list/MyListGrid', 'views/list/AddUser', 'models/MailModal'],
            init: function () {
                controller = this;
                myListGrid = EmailChimp.views.MyListGrid;
                addUserForm = EmailChimp.views.AddUser;

                // Change main layout
                $$("content").removeView('main');
                $$("content").addView(myListGrid.getlayout(), 1);
                $$("mainLayout").resize();
                this.bindEvents();
            },
            bindEvents: function () {
                //Event on css
                $$("myListGrid").on_click.trash = this.deleteSettings;
                $$("myListGrid").on_click.save = this.saveSettings;

                //Event on properties
                $$("add").define({click: this.addSettings});
            },
            deleteSettings: function (e, id, node) {
                webix.confirm({
                    text: "The configuration will be deleted. <br/> Are you sure?",
                    ok: "Yes",
                    cancel: "Cancel",
                    callback: function (res) {
                        if (res) {
                            var item = webix.$$("myListGrid").getItem(id);
                            item = item.id;
                            webix.ajax().post("delete-email-list", "id=" + item, function (text, xml, xhr) {
                                webix.alert(text);
                            }),
                                    $$("myListGrid").remove(id);
                        }
                    }
                });
            },
            saveSettings: function (e, id, node) {
                var item = webix.$$("myListGrid").getItem(id);
                if (item.firstName.length > 1 && item.lastName.length > 1 && item.email.length > 1 && item.contact.length > 1) {
                    webix.confirm({
                        text: "The configuration will be saved. <br/> Are you sure?",
                        ok: "Yes",
                        cancel: "Cancel",
                        callback: function (res) {
                            if (res) {

                                webix.ajax().post("update-email-list", item, function (text, xml, xhr) {
                                    webix.alert(text);
                                });
                            }
                        }
                    });
                }
            },
            addSettings: function () {
                webix.ui({
                    view: "window",
                    id: "win2",
                    width: 500,
                    height: 800,
                    position: "center",
                    modal: true,
                    head: {
                        view: "toolbar", cols: [
                            {view: "label", label: "Add New User"},
                            {view: "button", label: 'X', width: 50, align: 'right', click: "$$('win2').close();"}
                        ]
                    },
                    body: addUserForm.getLayout()
                }).show();
            }
        }
);
