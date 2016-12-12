/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var data = JSON.parse(webix.ajax().sync().get("get-scheduler").responseText);

function changeData() {
    console.log(data);
}

EmailChimp.controller('SchedulerController',
        {
            component: ['views/mail/SchedulerGrid', 'views/mail/ScheduleForm', 'models/MailModal'],
            init: function () {
                controller = this;
                schedulerGrid = EmailChimp.views.SchedulerGrid;
                mailModal = EmailChimp.models.MailModal;
                scheduleForm = EmailChimp.views.ScheduleForm;
                
                // Change main layout
                $$("content").removeView('main');
                $$("content").addView(schedulerGrid.getLayout(), 1);
                $$("mainLayout").resize();

                this.bindSchedulerEvents();

            },
            bindSchedulerEvents: function () {
                //Bind Events
                $$("mail_filter").attachEvent("onChange", this.filterMails);

                //Event on css
                $$("schedulerGrid").on_click.trash = this.deleteSchedule;

                //Event on properties
                $$("add").define({click: this.addSchedule});
                $$("refresh").define({click: this.refreshMail});
                
            },
            filterMails: function () {

                var val = this.getValue();
                if (val == "all")
                    $$("sentMailGrid").filter("#status#", "");
                else
                    $$("sentMailGrid").filter("#status#", val);
            },
            deleteSchedule: function (e,id,node) {

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
            addSchedule: function () {
                
                webix.ui({
                    view: "window",
                    id: "win2",
                    autoheight : true,
                    position : "center",
                    width : 1000,
                    head : EmailChimp.getPopupToolbar('New Schedule'),
                    modal: true,
                    body: scheduleForm.getLayout()
                }).show();

//                controller.bindComposeMailEvents();

            },
            
        }
);