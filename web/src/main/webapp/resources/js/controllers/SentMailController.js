EmailChimp.controller('SentMailController',
        {
            component: ['views/mail/SentGrid', 'views/mail/ComposeForm', 'models/MailModal'],
            init: function () {
                controller = this;
                sentGrid = EmailChimp.views.SentGrid;
                mailModal = EmailChimp.models.MailModal;
                composeForm = EmailChimp.views.ComposeForm;

                // Change main layout
                $$("content").removeView('main');
                $$("content").addView(sentGrid.getlayout(), 1);
                $$("mainLayout").resize();

                this.bindSentMailEvents();

            },
            bindSentMailEvents: function () {
                //Bind Events
                $$("mail_filter").attachEvent("onChange", this.filterMails);

                //Event on css
                $$("sentMailGrid").on_click.trash = this.deleteMail;

                //Event on properties
                $$("compose").define({click: this.composeMail});
                $$("refresh").define({click: this.refreshMail});
            },
            bindComposeMailEvents: function () {

            },
            filterMails: function () {

                var val = this.getValue();
                if (val == "all")
                    $$("sentMailGrid").filter("#status#", "");
                else
                    $$("sentMailGrid").filter("#status#", val);
            },
            deleteMail: function () {

                webix.confirm({
                    text: "The mail will be deleted. <br/> Are you sure?",
                    ok: "Yes",
                    cancel: "Cancel",
                    callback: function (res) {
                        if (res) {
                            var item = webix.$$("sentMailGrid").getItem(id);
                            item.status = "0";
                            item.statusName = "Deleted";
                            webix.$$("sentMailGrid").refresh(id);
                        }
                    }
                });
            },
            refreshMail: function () {

                var grid = $$("sentMailGrid");
                grid.clearAll();
                grid.showProgress();

                webix.delay(function () {
                    grid.parse(mailModal.getAll);
                    grid.hideProgress();
                }, null, null, 300);
            },
            composeMail: function () {

                webix.ui({
                    view: "window",
                    id: "win2",
                    width: 1000,
                    height: 600,
                    position: "center",
                    modal: true,
                    head: 'Compose <span style="float: right; font-size: 25px;padding: 10px;" \n\
                    class="webix_icon fa-times-circle closepopup"></span>',
                    body: composeForm.getLayout()
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