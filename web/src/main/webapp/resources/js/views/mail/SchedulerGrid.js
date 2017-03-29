/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

changeData();
EmailChimp.view('SchedulerGrid',
        {
            getButton: function (id, text, icon) {
                        return {
                    view: "button",
                    id: id,
                    type: "iconButton",
                    icon: icon,
                    width: 150,
                    label: text
                };
            },
            getSchedulerGrid: function() {
              return{
                    id: "schedulerGrid",
                    view: "datatable",
                    select: true,
                    editable: false,
                    columns: [
                        {
                            id: "id",
                            header: "id",
                            width: 50
                        }, {
                            id: "taskName",
                            header: "Name",
                            minWidth: 80
                        }, {
                            id: "campaign",
                            header: "Campaign",
                            minWidth: 120,
                            template: "#campaign.name#",
                            editor: "text"
                        }, {
                            id: "status",
                            header: "Status",
                            template: "#status#",
                            minWidth: 75
                        },  {
                            id: "schedule",
                            header: "Schedule",
                            template: function(html){
                                return EmailChimp.htmlEncode(html.date+"/"+html.month+"/"+html.year+", "+html.hour+":"+html.minutes)
                            },
                            fillspace: 1,
                            minWidth: 75
                        }, {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='cursor:pointer;' class='webix_icon fa-trash-o trash'></span>"
                        }
                    ],
                    pager: "pagerA",
                    data: data,
                    ready: function () {
                        webix.extend(this, webix.ProgressBar);
                    }
                };  
            },
            getLayout: function () {
                return {
                    id: 'main',
                    type: 'clean',
                    rows: [
                        {
                            height: 49,
                            id: "title",
                            css: "title",
                            template: "<div class='header'>#title#</div>",
                            data: {title: "Scheduler"}
                        },
                        {
                            type: "space",
                            rows: [
                                {
                                    height: 40,
                                    cols: [
                                        this.getButton('add', 'Add', 'plus-circle'),
                                        this.getButton('refresh', 'Refresh', 'refresh'),
                                        {},
                                        {
                                            view: "richselect",
                                            id: "mail_filter",
                                            value: "all",
                                            maxWidth: 300,
                                            minWidth: 250,
                                            vertical: true,
                                            labelWidth: 110,
                                            options: [
                                                {id: "all", value: "All"},
                                                {id: "1", value: "Published"},
                                                {id: "2", value: "Not published"},
                                                {id: "0", value: "Deleted"}
                                            ],
                                            label: "Filter mails"
                                        }
                                    ]
                                },
                                {
                                    rows: [
                                        this.getSchedulerGrid(),
                                        {
                                            view: "toolbar",
                                            css: "highlighted_header header6",
                                            paddingX: 5,
                                            paddingY: 5,
                                            height: 40,
                                            cols: [{
                                                    view: "pager", id: "pagerA",
                                                    template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
                                                    autosize: true,
                                                    height: 35,
                                                    group: 5
                                                }

                                            ]
                                        }
                                    ]
                                }


                            ]

                        }
                    ]
                };
            }
        }
);
