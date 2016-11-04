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
                            label: 'editor'
                        },
                        {view: "label", height: 50, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
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
                                        $$('addTemplate').clear();
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