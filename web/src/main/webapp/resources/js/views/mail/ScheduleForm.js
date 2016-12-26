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
                            view: "richselect",
                            label: 'Year :',
                            name: "year",
                            yCount: 2,
                            options: [
                                {id:1, value: 2016},
                                {id:2, value: 2017}
                            ],
                            type: "number"
                        }, {
                            view: "richselect",
                            label: 'Month :',
                            name: "month",
                            yCount: 12,
                            options: [
                                {id:1, value: 1},
                                {id:2, value: 2},
                                {id:3, value: 3},
                                {id:4, value: 4},
                                {id:5, value: 5},
                                {id:6, value: 6},
                                {id:7, value: 7},
                                {id:8, value: 8},
                                {id:9, value: 9},
                                {id:10, value: 10},
                                {id:11, value: 11},
                                {id:12, value: 12}
                            ],
                            type: "number"
                        }, {
                            view: "text",
                            label: 'Date :',
                            name: "date",
                            value: 0,
                            attributes: {
                                min:0,
                                max:31
                            },
                            type: "number"
                        }, {
                            view: "text",
                            label: 'Hour :',
                            name: "hour",
                            value: 0,
                            attributes: {
                                min:0,
                                max:23
                            },
                            type: "number"
                        }, {
                            view: "text",
                            label: 'Minutes :',
                            name: "minutes",
                            value: 0,
                            attributes: {
                                min:0,
                                max:60
                            },
                            type: "number"
                        },{
                            view: "richselect",
                            label: "Campaign",
                            name: "campaignId",
//                            template:function htmlEncode( html ) {
//                                return html.options;
//                            },
                            options: campaignData
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
                                            grid.parse(EmailChimp.models.MailModal.getSchedule());
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