EmailChimp.controller('EmailTemplateController',
        {
            component: ['views/preferences/EmailTemplateGrid', 'views/preferences/AddTemplates', 'models/MailModal'],
            init: function () {
                controller = this;
                emailTemplateGrid = EmailChimp.views.EmailTemplateGrid;
                addTemplatesForm = EmailChimp.views.AddTemplates;
                mailModal = EmailChimp.models.MailModal;
               

                // Change main layout
                $$("content").removeView('main');
                $$("content").addView(emailTemplateGrid.getlayout(), 1);
                $$("mainLayout").resize();

                this.bindMailTemplateEvents();

            },
            bindMailTemplateEvents: function () {

                //Event on css
                $$("emailTemplateGrid").on_click.trash = this.deleteMailTemplate;
                $$('emailTemplateGrid').render();
                //Event on properties
                $$("add").define({click: this.addTemplates});
                $$("edit").define({click: this.updateTemplates});
                $$("edit").disable();
                //click events
                $$("emailTemplateGrid").attachEvent("onItemClick", function(id, e, node){
                    if(($$("emailTemplateGrid").getSelectedItem(true).length) > 1
                            || ($$("emailTemplateGrid").getSelectedItem(true).length) == 0){
                        $$("edit").disable();
                    }else {
                        $$("edit").enable();
                    }
                });
                $$("emailTemplateGrid").attachEvent("onAfterRender", function(){
                    //... some code here ... 
                    
                });
            },
            bindComposeMailEvents: function () {

            },
            filterMails: function () {

                var val = this.getValue();
                if (val == "all")
                    $$("emailTemplateGrid").filter("#status#", "");
                else
                    $$("emailTemplateGrid").filter("#status#", val);
            },
            deleteMailTemplate: function () {

                webix.confirm({
                    text: "The mail will be deleted. <br/> Are you sure?",
                    ok: "Yes",
                    cancel: "Cancel",
                    callback: function (res) {
                        if (res) {
                            var item = webix.$$("emailTemplateGrid").getSelectedItem();
                            console.log(item);
                            webix.ajax().post("delete-email-template","id="+item.id, function (text, xml, xhr) {
                                    var grid = $$("emailTemplateGrid");
                                    grid.clearAll();
                                    grid.showProgress();

                                    webix.delay(function () {
                                        grid.parse(EmailChimp.models.MailModal.getEmailTemplates());
                                        grid.hideProgress();
                                    }, null, null, 300);    
                            });
                        }
                    }
                });
            },
            deleteSettings: function () {

                var grid = $$("emailTemplateGrid");
                grid.clearAll();
                grid.showProgress();

                webix.delay(function () {
                    grid.parse(EmailChimp.models.MailModal.getEmailTemplates());
                    grid.hideProgress();
                }, null, null, 300);
            },
            addTemplates: function () {

                webix.ui({
                    view: "window",
                    id: "win2",
                    width: 1000,
                    height: 600, 
                    position: "center",
                    modal: true,
                    head : EmailChimp.getPopupToolbar('Add New Template!!'),
                    body: addTemplatesForm.getLayout()
                }).show();

                controller.bindComposeMailEvents();

            },
            updateTemplates: function () {
                
                webix.ui({
                    view: "window",
                    id: "win3",
                    width: 1000,
                    height: 600, 
                    position: "center",
                    modal: true,
                    head : EmailChimp.getPopupToolbar('Update Template!!'),
                    body: addTemplatesForm.getEditLayout()
                }).show();

                controller.bindComposeMailEvents();

            },
            save_form: function () {

                //send files to server side
                $$("upl1").send(function () {

                    //getting file properties
                    $$('upl1').files.data.each(function (obj) {
                        var status = obj.status;
                        var name = obj.name;
                        if (status == 'server') {
                            var sname = obj.sname; //came from upload script
                            webix.message("Upload: " + status + " for " + name + " stored as " + sname);
                        } else {
                            webix.message("Upload: " + status + " for " + name);
                        }
                    });

                    //after that send form
                    webix.ajax().post(
                            "php/saveform.php",
                            $$("myform").getValues(),
                            function (text) {
                                //show server side response
                                webix.message(text);
                            }
                    );
                });
            }
        }
);