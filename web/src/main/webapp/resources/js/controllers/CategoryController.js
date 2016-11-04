EmailChimp.controller('CategoryController',
        {
            component: ['views/category/CategoryGrid', 'views/category/AddCategory', 'models/MailModal'],
            init: function () {
                controller = this;
                categoryGrid = EmailChimp.views.CategoryGrid;
                addCategoryForm = EmailChimp.views.AddCategory;

                // Change main layout
                $$("content").removeView('main');
                $$("content").addView(categoryGrid.getlayout(), 1);
                $$("mainLayout").resize();
                this.bindEvents();
            },
            bindEvents: function () {
                //Event on css
                $$("categoryGrid").on_click.trash = this.deleteSettings;
                $$("categoryGrid").on_click.save = this.saveSettings;

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
                            var item = webix.$$("categoryGrid").getItem(id);
                            item = item.id;
                            webix.ajax().post("delete-email-category", "id=" + item, function (text, xml, xhr) {
                                webix.alert(text);
                            }),
                                    $$("categoryGrid").remove(id);
                        }
                    }
                });
            },
            saveSettings: function (e, id, node) {
                var item = webix.$$("categoryGrid").getItem(id);
                console.log($$("categoryGrid").validateEditor());
                debugger;
                if (item.categoryName.length > 1) {
                    webix.confirm({
                        text: "The category will be saved. <br/> Are you sure?",
                        ok: "Yes",
                        cancel: "Cancel",
                        callback: function (res) {
                            if (res) {

                                webix.ajax().post("update-email-category", item, function (text, xml, xhr) {
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
                    height: 500,
                    position: "center",
                    modal: true,
                    head: {
                        view: "toolbar", cols: [
                            {view: "label", label: "Add New Category"},
                            {view: "button", label: 'X', width: 50, align: 'right', click: "$$('win2').close();"}
                        ]
                    },
                    body: addCategoryForm.getLayout()
                }).show();
            }
        }
);
