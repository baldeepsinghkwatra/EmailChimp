changeData();

EmailChimp.view('AddUser',
        {
            getLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id: "addUser",
                    elements: [
                        {
                            view: "text",
                            label: 'First Name :',
                            name: "firstName",
                            value: $$("myListGrid").getSelectedItem().firstName,
                            required: true
                        }, {
                            view: "text",
                            label: 'Last Name :',
                            name: "lastName",
                            value: $$("myListGrid").getSelectedItem().lastName,
                            required: true
                        }, {
                            view: "text",
                            label: 'Email :',
                            name: "email",
                            value: $$("myListGrid").getSelectedItem().email,
                            required: true
                        }, {
                            view: "text",
                            label: 'Contact :',
                            name: "contact",
                            value: $$("myListGrid").getSelectedItem().contact,
                            required: true
                        },{
                            view: "label",
                            label: "Select Category: ",
                        },
                        {
                            id: "categoryList",
                            view:"list",
                            height:200,
                            select:true,
                            multiselect: true,
                            data: data
                         },
                        {view: "label", height: 50,hidden:true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Add",
                            click: function () {
                                var item = $$("categoryList").getSelectedItem(true);
                                var id = item[0].id;
                                for(var i=1; i<item.length; i++){
                                    id += ","+item[i].id;
                                }
                                if ($$('addUser').validate()) { //validate form
                                    $$('addUser').setValues({
                                        firstName: $$("addUser").getValues().firstName,
                                        lastName: $$("addUser").getValues().lastName,
                                        email: $$("addUser").getValues().email,
                                        contact: $$("addUser").getValues().contact,
                                        emailCategoryId:id
                                    });
                                    webix.ajax().post("add-email-list", $$('addUser').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        var grid = $$("myListGrid");
                                        grid.clearAll();
                                        grid.showProgress();
                                        $$("win2").close();
                                        webix.delay(function () {
                                            grid.parse(EmailChimp.models.MailModal.getEmailList());
                                            grid.hideProgress();
                                        }, null, null, 50);
                                        $$('addUser').clear();
                                        $$("responseMessage").show();
                                        $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                                        $$('responseMessage').refresh();
                                    });

                                }
                            }
                        }
                    ],
                    elementsConfig: {
                        labelPosition: "top"
                    }
                };
            },
            getEditLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id: "editUser",
                    elements: [
                        {
                            view: "text",
                            label: 'First Name :',
                            name: "firstName",
                            value: $$("myListGrid").getSelectedItem().firstName,
                            required: true
                        }, {
                            view: "text",
                            label: 'Last Name :',
                            name: "lastName",
                            value: $$("myListGrid").getSelectedItem().lastName,
                            required: true
                        }, {
                            view: "text",
                            label: 'Email :',
                            name: "email",
                            value: $$("myListGrid").getSelectedItem().email,
                            required: true
                        }, {
                            view: "text",
                            label: 'Contact :',
                            name: "contact",
                            value: $$("myListGrid").getSelectedItem().contact,
                            required: true
                        },
                        {view: "label", height: 50,hidden:true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Update",
                            click: function () {
                                
                                if ($$('editUser').validate()) { //validate form
                                    var item = $$("myListGrid").getSelectedItem().emailCategory;
                                    var id = "";
                                    for(var i=0; i<item.length; i++){
                                        id += item[i].id+",";
                                    }
                                    $$('editUser').setValues({
                                        id: $$("myListGrid").getSelectedItem().id,
                                        firstName: $$("editUser").getValues().firstName,
                                        lastName: $$("editUser").getValues().lastName,
                                        email: $$("editUser").getValues().email,
                                        contact: $$("editUser").getValues().contact,
                                        emailCategoryId: id
                                    });
                                    webix.ajax().post("update-email-list", $$('editUser').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        var grid = $$("myListGrid");
                                        grid.clearAll();
                                        grid.showProgress();
                                        $$("win3").close();
                                        webix.delay(function () {
                                            grid.parse(EmailChimp.models.MailModal.getEmailList());
                                            grid.hideProgress();
                                        }, null, null, 50);
                                        $$('editUser').clear();
                                        $$("responseMessage").show();
                                        $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                                        $$('responseMessage').refresh();
                                    });

                                }
                            }
                        }
                    ],
                    elementsConfig: {
                        labelPosition: "top"
                    }
                };
            }
        });

function parse_options() {
    var list = $$("combo1").getPopup().getList();
    var new_options = [
        {id: 1, name: "Germany"},
        {id: 2, name: "Great Britain"},
        {id: 3, name: "Australia"},
        {id: 4, name: "Belarus"}
    ];
    list.clearAll();
    list.parse(new_options);
}

function reload_options() {
    var list = $$("richselect2").getPopup().getList();
    list.clearAll();
    list.load("get-email-category");
}
