EmailChimp.view('AddTemplates',
        {
            getLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id:"addTemplate",
                    elements: [
                        {
                            view: "text",
                            label: 'Template Name :',
                            name: "name",
                            required: true
                        },{
                            id: 'editor',
                            view: "ckeditor",
                            name: "templateContent",
                            height: 200,
                            value: "",
                            label: 'editor',
                            required: true
                        },
                        {view: "label", height: 50,hidden: true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Add",
                            click: function () {
                                if ($$('addTemplate').validate()) { //validate form
                                    
                                    webix.ajax().post("add-email-template", $$('addTemplate').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        var grid = $$("emailTemplateGrid");
                                        grid.clearAll();
                                        grid.showProgress();
                                        $$("win2").close();
                                        webix.delay(function () {
                                            grid.parse(EmailChimp.models.MailModal.getEmailTemplates());
                                            grid.hideProgress();
                                        }, null, null, 300);
                                        $$("addTemplate").clear();
                                        $$("responseMessage").show();
                                        $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                                        $$('responseMessage').refresh();
                                        $$("emailTemplateGrid").refresh();
                                    });
                                    
                                } else
                                    webix.message({type: "error", text: "Form data is invalid"});
                            }
                        }
                    ],
                  
                    elementsConfig: {
                        labelPosition: "top",
                    }
                }
            },
            getEditLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id:"editTemplate",
                    elements: [
                        {
                            view: "text",
                            type: "number",
                            hidden: true,
                            name: "id",
                            value: $$("emailTemplateGrid").getSelectedItem(true)[0].id,
                        },
                        {
                            view: "text",
                            label: 'Template Name :',
                            name: "name",
                            value: $$("emailTemplateGrid").getSelectedItem(true)[0].name,
                            required: true
                        },{
                            id: 'editor',
                            view: "ckeditor",
                            name: "templateContent",
                            height: 200,
                            value: $$("emailTemplateGrid").getSelectedItem(true)[0].templateContent,
                            label: 'editor'
                        },
                        {view: "label", height: 50, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Update",
                            click: function () {
                                if ($$('editTemplate').validate()) { //validate form
                                    
                                    webix.ajax().post("update-email-template", $$('editTemplate').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        var grid = $$("emailTemplateGrid");
                                        grid.clearAll();
                                        grid.showProgress();
                                        $$("win3").close();
                                        webix.delay(function () {
                                            grid.parse(EmailChimp.models.MailModal.getEmailTemplates());
                                            grid.hideProgress();
                                        }, null, null, 300);
                                        $$('editTemplate').clear();
                                        $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                                        $$('responseMessage').refresh();
                                    });
                                    
                                } else
                                    webix.message({type: "error", text: "Form data is invalid"});
                            }
                        }
                    ],
                  
                    elementsConfig: {
                        labelPosition: "top",
                    }
                }
            }
        });