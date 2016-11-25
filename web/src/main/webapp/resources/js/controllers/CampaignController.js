var data = webix.ajax().sync().get("get-email-templates");
var emailConfigData = webix.ajax().sync().get("get-email-configuration");
var emailCategoryListData = webix.ajax().sync().get("get-email-category");

function changeData() {
    data = JSON.parse(data.responseText);
    emailConfigData = JSON.parse(emailConfigData.responseText);
    emailCategoryListData = JSON.parse(emailCategoryListData.responseText);
    for (var i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty("name")) {
            data[i]["value"] = EmailChimp.htmlEncode(data[i]["name"]);
            delete data[i]["name"];
        }
    }
    for (var i = 0; i < emailConfigData.length; i++) {
        if (emailConfigData[i].hasOwnProperty("smtpHost")) {
            emailConfigData[i]["value"] = EmailChimp.htmlEncode(emailConfigData[i]["id"]+": "+emailConfigData[i]["smtpHost"]);
            delete emailConfigData[i]["smtpHost"];
        }
    }
    for (var i = 0; i < emailCategoryListData.length; i++) {
        emailCategoryListData[i]["id"] = emailCategoryListData[i]["id"]; 
        emailCategoryListData[i]["value"] = EmailChimp.htmlEncode(emailCategoryListData[i]["categoryName"]); 
        var list_data = emailCategoryListData[i]["emailListBean"];
        for(var j=0;j<list_data.length;j++){
            list_data[j]["value"] = list_data[j].email;
        }
        emailCategoryListData[i]["data"] = list_data;
    }
}
EmailChimp.controller('MyListController',
        {
            component: ['views/preferences/CampaignGrid', 'views/preferences/AddCampaign', 'models/MailModal'],
            init: function () {
                controller = this;
                campaignGrid = EmailChimp.views.CampaignGrid;
                addCampaign = EmailChimp.views.AddCampaign;

                // Change main layout
                $$("content").removeView('main');
                $$("content").addView(campaignGrid.getlayout(), 1);
                $$("mainLayout").resize();
                this.bindEvents();
            },
            bindEvents: function () {
                //Event on css
                $$("campaignGrid").on_click.trash = this.deleteSettings;
                $$("campaignGrid").on_click.save = this.saveSettings;

                //Event on properties
                $$("add").define({click: this.addSettings});
                $$("edit").define({click: this.editSettings});
                $$("edit").disable();
                
                $$("campaignGrid").attachEvent("onItemClick", function(id, e, node){
                    $$("edit").enable();
                });
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
                            {view: "label", label: "Add New Campaign"},
                            {view: "button", label: 'X', width: 50, align: 'right', click: "$$('win2').close();"}
                        ]
                    },
                    body: {
                            rows:[
                            {
                                view: "tabbar", 
                                id: "tabbar", 
                                value: "listView", 
                                multiview: true, options: [
                                    { value: "List", id: "addCampaign"},
                                    { value: "Form", id: "categoryListTree"}
                                ]
                            },
                            {
                                cells: [
                                    addCampaign.getLayout(),
                                    addCampaign.getTreeLayout()
                                ]
                            }
                        ]
                    }
                }).show();
            },
            editSettings: function () {
                webix.ui({
                    view: "window",
                    id: "win3",
                    width: 500,
                    height: 800,
                    position: "center",
                    modal: true,
                    head: {
                        view: "toolbar", cols: [
                            {view: "label", label: "Update List"},
                            {view: "button", label: 'X', width: 50, align: 'right', click: "$$('win3').close();"}
                        ]
                    },
                    body: addUserForm.getEditLayout()
                }).show();
            }
        }
);
