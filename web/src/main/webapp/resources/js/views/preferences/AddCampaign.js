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
                            view:"richselect",
                            name: "templateId",
                            label: "Select Template",
                            required: true,
//                            template:function htmlEncode( html ) {
//                                return html.options;
//                            },
                            options: data
                         },
                         {
                            view:"richselect",
                            label: "Select Email Configuration",
                            required: true,
                            name: "emailConfigId",
//                            template:function htmlEncode( html ) {
//                                return html.options;
//                            },
                            options: emailConfigData
                         },
                        {view: "label", height: 50,hidden:true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Add",
                            click: function () {
                                var cat_list_id = "";
                                var arr_cat_list = ($$("categoryListTree").getSelectedItem(true));
                                for(var i=0;i<arr_cat_list.length;i++){
                                    cat_list_id += arr_cat_list[i].id+",";
                                }
                                console.log(cat_list_id);
                                if ($$('addCampaign').validate()) { //validate form
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
                                            grid.parse(EmailChimp.models.MailModal.getEmailList());
                                            grid.hideProgress();
                                        }, null, null, 50);
                                        $$('addCampaign').clear();
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
            getTreeLayout: function() {
                return {
                    view:"tree",
                    id: "categoryListTree",
                    height: 475,
                    select: true,
                    activeTitle:true,
                    data: emailCategoryListData
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