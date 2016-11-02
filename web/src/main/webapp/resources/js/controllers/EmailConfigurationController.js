EmailChimp.controller('EmailConfigurationController',
        {
            component: ['views/preferences/EmailSettingsGrid', 'views/preferences/AddSettings', 'models/MailModal'],
            init: function () {
                controller = this;
                emailSettingsGrid = EmailChimp.views.EmailSettingsGrid;
                 addSettingsForm = EmailChimp.views.AddSettings;
                mailModal = EmailChimp.models.MailModal;
               

                // Change main layout
                $$("content").removeView('main');
                $$("content").addView(emailSettingsGrid.getlayout(), 1);
                $$("mainLayout").resize();

                this.bindSentMailEvents();

            },
            bindSentMailEvents: function () {
                //Bind Events
                $$("mail_filter").attachEvent("onChange", this.filterMails);

                //Event on css
                $$("emailSettingsGrid").on_click.trash = this.deleteMail;

                //Event on properties
                $$("add").define({click: this.addSettings});
                $$("delete").define({click: this.deleteSettings});
            },
            bindComposeMailEvents: function () {

            },
            filterMails: function () {

                var val = this.getValue();
                if (val == "all")
                    $$("emailSettingsGrid").filter("#status#", "");
                else
                    $$("emailSettingsGrid").filter("#status#", val);
            },
            deleteMail: function () {

                webix.confirm({
                    text: "The mail will be deleted. <br/> Are you sure?",
                    ok: "Yes",
                    cancel: "Cancel",
                    callback: function (res) {
                        if (res) {
                            var item = webix.$$("emailSettingsGrid").getItem(id);
                            item.status = "0";
                            item.statusName = "Deleted";
                            webix.$$("emailSettingsGrid").refresh(id);
                        }
                    }
                });
            },
            deleteSettings: function () {

                var grid = $$("emailSettingsGrid");
                grid.clearAll();
                grid.showProgress();

                webix.delay(function () {
                    grid.parse(mailModal.getAll);
                    grid.hideProgress();
                }, null, null, 300);
            },
            addSettings: function () {

                webix.ui({
                    view: "window",
                    id: "win2",
                    width: 1000,
                    height: 600,
                    position: "center",
                    modal: true,
                    head: 'Add New Configuration <span style="float: right; font-size: 25px;padding: 10px;" \n\
                    class="webix_icon fa-times-circle closepopup"></span>',
                    body: addSettingsForm.getLayout()
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