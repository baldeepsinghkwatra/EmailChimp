EmailChimp.view('AddSettings',
        {
            getLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id:"addSettings",
                    elements: [
                        {
                            view: "text",
                            label: 'SMTP HOST :',
                            name: "smtpHost",
                            required: true
                        }, {
                            view: "text",
                            label: 'SMTP PORT :',
                            name: "smtpPort",
                            required: true
                        }, {
                            view: "text",
                            label: 'USERNAME :',
                            name: "smptpUsername",
                            required: true
                        }, {
                            view: "text",
                            label: 'PASSWORD :',
                            name: "smtpPassword",
                            required: true
                        },
                        {view: "label", height: 50, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Add",
                            click: function () {
                                if ($$('addSettings').validate()) { //validate form
                                    
                                    webix.ajax().post("add-email-configuration", $$('addSettings').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        $$('addSettings').clear();
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