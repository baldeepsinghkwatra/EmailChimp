
EmailChimp.view('EmailSettingsGrid',
        {
            getEmailSettingsGrid: function () {
                return{
                    id: "emailSettingsGrid",
                    view: "datatable",
                    select: true,
                    editable: false,
                    columns: [
                        {
                            id: "id",
                            header: "#",
                            template: "{common.checkbox()}",
                            width: 50
                        }, {
                            id: "smtpHost",
                            header: "Host",
                            width: 400
                        }, {
                            id: "smtpPort",
                            header: "Port",
                            minWidth: 20,
                            editor: "text"
                        }, {
                            id: "smptpUsername",
                            header: ["Username"],
                            width: 300
                        }, {
                            id: "smtpPassword",
                            header: "Password",
                             width: 200
                        }, {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='cursor:pointer;' class='webix_icon fa-trash-o trash'></span>"}
                    ],
                    pager: "pagerA",
                data:   EmailChimp.models.MailModal.getEmailConfiguration(),
                    ready: function () {
                        webix.extend(this, webix.ProgressBar);
                    }
                }
            },
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
            getlayout: function () {
                return {
                    id: 'main',
                    type: 'clean',
                    rows: [
                        {
                            height: 49,
                            id: "title",
                            css: "title",
                            template: "<div class='header'>#title#</div>",
                            data: {title: "Email Configuration"}
                        },
                        {
                            type: "space",
                            rows: [
                                {
                                    height: 40,
                                    cols: [
                                        this.getButton('add', 'Add', 'plus-circle'),
                                        this.getButton('delete', 'Delete', 'minus-circle'),
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
                                        this.getEmailSettingsGrid(),
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
                }
            }
        });