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
                            required: true
                        }, {
                            view: "text",
                            label: 'Last Name :',
                            name: "lastName",
                            required: true
                        }, {
                            view: "text",
                            label: 'Email :',
                            name: "email",
                            required: true
                        }, {
                            view: "text",
                            label: 'Contact :',
                            name: "contact",
                            required: true
                        },
                        {view: "select", id: "check",
                            label: "Category (Select)",
                            options: data},
                        {view: "combo",
                            width: 400,
                            label: 'Category (combo)',
                            labelWidth: 220,
                            name: "emailCategoryId",
                            required: true,
                            options: data},
                        {view: "label", height: 50, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Add",
                            click: function () {
                                if ($$('addUser').validate()) { //validate form

                                    webix.ajax().post("add-email-list", $$('addUser').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        $$('addUser').clear();
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
