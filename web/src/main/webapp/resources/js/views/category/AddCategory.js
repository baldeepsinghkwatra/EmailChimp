EmailChimp.view('AddCategory',
        {
            getLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id: "addCategory",
                    elements: [
                        {
                            view: "text",
                            label: 'CATEGORY NAME :',
                            name: "categoryName",
                            required: true
                        },
                        {view: "label", height: 50, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Add",
                            click: function () {
                                if ($$('addCategory').validate()) { //validate form

                                    webix.ajax().post("add-email-category", $$('addCategory').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        var grid = $$("categoryGrid");
                                        grid.clearAll();
                                        grid.showProgress();
                                        $$("win2").close();
                                          webix.delay(function () {
                                            grid.parse(EmailChimp.models.MailModal.getEmailCategory());
                                            grid.hideProgress();
                                        }, null, null, 50);
                                        $$('addCategory').clear();
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