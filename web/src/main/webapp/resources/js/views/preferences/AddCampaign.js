changeData();

EmailChimp.view('AddCampaign',
        {
            getLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id: "addCampaign",
                    elements: [
                        {
                            view: "text",
                            label: 'Campaign Name :',
                            name: "campaignName",
                            required: true
                        }, {
                            view: "text",
                            label: 'Email Subject :',
                            name: "emailSubject",
                            required: true
                        }, {
                            view: "text",
                            label: 'Reply To Name:',
                            name: "replyToName",
                            required: true
                        }, {
                            view: "text",
                            label: 'Reply To Email :',
                            name: "replyToEmail",
                            type: "email",
                            required: true
                        },
                        {
                            view: "richselect",
                            name: "templateId",
                            label: "Template",
                            required: true,
//                            template:function htmlEncode( html ) {
//                                return html.options;
//                            },
                            options: data
                        },
                        {
                            view: "richselect",
                            label: "Email Configuration",
                            required: true,
                            name: "emailConfigId",
//                            template:function htmlEncode( html ) {
//                                return html.options;
//                            },
                            options: emailConfigData
                        },
                        {view: "label", height: 50, hidden: true, id: 'response', align: "center"},
                        {
                            view: "button",
                            value: "Next",
                            click: function () {
                                if ($$('addCampaign').validate()) {
                                    $$("categoryListTree").show();
                                } else {
                                    $$("response").show();
                                    $$("response").setHTML("<span style=\"color:red\">*Please fill form properly</span>");
                                }
                            }
                        }
                    ],
                    rules: {
                        "replyToEmail": webix.rules.isEmail
                    },
                    elementsConfig: {
                        labelPosition: "top"
                    }
                };
            },
            getTreeLayout: function () {
                return {
                    id: "categoryListTree",
                    height: 480,
                    rows: [
                        {
                            view: "tree",
                            id: "categoryTree",
                            select: true,
                            multiselect:"level",
                            activeTitle: true,
                            data: emailCategoryListData
                        },
                        {view: "label", height: 50, hidden: true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            cols: [{
                                    view: "button",
                                    value: "Previous",
                                    click: function () {
                                        $$("addCampaign").show();
                                    }
                                },
                                {
                                    view: "button",
                                    value: "Add",
                                    click: function () {
                                        var cat_list_id = "";
                                        var arr_cat_list = ($$("categoryTree").getSelectedItem(true));
                                        for (var i = 0; i < arr_cat_list.length; i++) {
                                            cat_list_id += arr_cat_list[i].id + ",";
                                        }
                                        if (arr_cat_list.length == 0) {
                                            $$("responseMessage").show();
                                            $$("responseMessage").setHTML("<span style=\"color:red\">*Please Select Category</span>");
                                        } else if ($$('addCampaign').validate()) { //validate form
                                            $$('addCampaign').setValues({
                                                name: $$("addCampaign").getValues().campaignName,
                                                emailSubject: $$("addCampaign").getValues().emailSubject,
                                                replyToEmail: $$("addCampaign").getValues().replyToEmail,
                                                replyToName: $$("addCampaign").getValues().replyToName,
                                                templateId: $$("addCampaign").getValues().templateId,
                                                emailConfigId: $$("addCampaign").getValues().emailConfigId,
                                                emailListId: cat_list_id
                                            });
                                            webix.ajax().post("add-campaign", $$('addCampaign').getValues(), function (text, xml, xhr) {
                                                var color = 'red';
                                                if (xhr.status === 200) {
                                                    color = 'green';
                                                }
                                                var grid = $$("campaignGrid");
                                                grid.clearAll();
                                                grid.showProgress();
                                                $$("win2").close();
                                                webix.delay(function () {
                                                    grid.parse(EmailChimp.models.MailModal.getCampaign());
                                                    grid.hideProgress();
                                                }, null, null, 50);
                                                $$('addCampaign').clear();
                                                $$("responseMessage").show();
                                                $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                                                $$('responseMessage').refresh();
                                            });

                                        }
                                    }
                                },
                            ]
                        }
                    ]

                };
            },
            getEditTreeLayout: function () {
                return {
                    id: "editCategoryListTree",
                    height: 480,
                    rows: [
                        {
                            view: "tree",
                            id: "categoryTree",
                            select: "multiselect",
                            activeTitle: true,
                            data: emailCategoryListData
                        },
                        {view: "label", height: 50, hidden: true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            cols: [{
                                    view: "button",
                                    value: "Previous",
                                    click: function () {
                                        $$("editCampaign").show();
                                    }
                                },
                                {
                                    view: "button",
                                    value: "Update",
                                    click: function () {
                                        var cat_list_id = "";
                                        var arr_cat_list = ($$("categoryTree").getSelectedItem(true));
                                        for (var i = 0; i < arr_cat_list.length; i++) {
                                            cat_list_id += arr_cat_list[i].id + ",";
                                        }
                                        console.log(cat_list_id);
                                        if ($$('editCampaign').validate()) { //validate form
                                            $$('editCampaign').setValues({
                                                id: $$("campaignGrid").getSelectedItem().id,
                                                name: $$("editCampaign").getValues().campaignName,
                                                emailSubject: $$("editCampaign").getValues().emailSubject,
                                                replyToEmail: $$("editCampaign").getValues().replyToEmail,
                                                replyToName: $$("editCampaign").getValues().replyToName,
                                                templateId: $$("editCampaign").getValues().templateId,
                                                emailConfigId: $$("editCampaign").getValues().emailConfigId,
                                                emailListId: cat_list_id
                                            });
                                            webix.ajax().post("update-campaign", $$('editCampaign').getValues(), function (text, xml, xhr) {
                                                var color = 'red';
                                                if (xhr.status === 200) {
                                                    color = 'green';
                                                }
                                                var grid = $$("campaignGrid");
                                                grid.clearAll();
                                                grid.showProgress();
                                                $$("win3").close();
                                                webix.delay(function () {
                                                    grid.parse(EmailChimp.models.MailModal.getCampaign());
                                                    grid.hideProgress();
                                                }, null, null, 50);
                                                $$('editCampaign').clear();
                                                $$("responseMessage").show();
                                                $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                                                $$('responseMessage').refresh();
                                            });

                                        }
                                    }
                                },
                            ]
                        }
                    ]

                };
            },
            getEditLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id: "editCampaign",
                    elements: [
                        {
                            view: "text",
                            label: 'Campaign Name :',
                            name: "campaignName",
                            value: $$("campaignGrid").getSelectedItem().name,
                            required: true
                        }, {
                            view: "text",
                            label: 'Email Subject :',
                            name: "emailSubject",
                            value: $$("campaignGrid").getSelectedItem().emailSubject,
                            required: true
                        }, {
                            view: "text",
                            label: 'Reply To Name:',
                            name: "replyToName",
                            value: $$("campaignGrid").getSelectedItem().replyToName,
                            required: true
                        }, {
                            view: "text",
                            label: 'Reply To Email :',
                            name: "replyToEmail",
                            type: "email",
                            value: $$("campaignGrid").getSelectedItem().replyToEmail,
                            required: true
                        },
                        {
                            view: "richselect",
                            name: "templateId",
                            label: "Template",
                            id: "templateCombo",
                            required: true,
//                            template:function htmlEncode( html ) {
//                                return html.options;
//                            },
                            options: data
                        },
                        {
                            view: "richselect",
                            id: "configCombo",
                            label: "Email Configuration",
                            required: true,
                            name: "emailConfigId",
//                            template:function htmlEncode( html ) {
//                                return html.options;
//                            },
                            options: emailConfigData
                        },
                        {view: "label", height: 50, hidden: true, id: 'response', align: "center"},
                        {
                            view: "button",
                            value: "Next",
                            click: function () {
                                if ($$('editCampaign').validate()) {
                                    $$("editCategoryListTree").show();
                                } else {
                                    $$("response").show();
                                    $$("response").setHTML("<span style=\"color:red\">*Please fill form properly</span>");
                                }
                            }
                        }
                    ],
                    rules: {
                        "replyToEmail": webix.rules.isEmail
                    },
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