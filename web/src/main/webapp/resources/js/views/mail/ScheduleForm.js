changeData();

EmailChimp.view('ScheduleForm',
        {
            getLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    id: "addSchedule",
                    elements: [
                        {
                            view: "text",
                            label: 'Scheduler Name :',
                            name: "name",
                            required: true
                        }, { 
                            view:"radio", 
                            name:"status", 
                            label:"Status: ", 
                            options:["activate", "deactivate"] ,
                            required: true
                        }, {
                            view: "text",
                            label: 'Year :',
                            name: "year",
                            value: 1,
                            type: "number"
                        }, {
                            view: "text",
                            label: 'Month :',
                            name: "month",
                            type: "number"
                        }, {
                            view: "text",
                            label: 'Date :',
                            name: "date",
                            type: "number"
                        }, {
                            view: "text",
                            label: 'Hour :',
                            name: "hour",
                            type: "number"
                        }, {
                            view: "text",
                            label: 'Minutes :',
                            name: "minutes",
                            type: "number"
                        },{
                            view: "richselect",
                            label: "Campaign",
                            name: "campaignId",
//                            template:function htmlEncode( html ) {
//                                return html.options;
//                            },
                            options: data
                        },
                        {view: "label", height: 50,hidden:true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Add",
                            click: function () {
                                
                                if ($$('addSchedule').validate()) { //validate form
                                    webix.ajax().post("add-schedule", $$('addSchedule').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        $$("win2").close();
                                        var grid = $$("schedulerGrid");
                                        grid.clearAll();
                                        grid.showProgress();
                                        webix.delay(function () {
                                            grid.parse(EmailChimp.models.MailModal.getEmailList());
                                            grid.hideProgress();
                                        }, null, null, 50);
                                        $$('addSchedule').clear();
                                        $$("responseMessage").show();
                                        $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                                        $$('responseMessage').refresh();
                                    });

                                }else {
                                    $$("responseMessage").show();
                                    $$("responseMessage").setHTML("<span style=\"color:red\"> Please Fill all the details. </span>");
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