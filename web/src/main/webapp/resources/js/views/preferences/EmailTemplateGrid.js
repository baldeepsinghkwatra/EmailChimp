
EmailChimp.view('EmailTemplateGrid',
        {
            getEmailSettingsGrid: function () {
                return{
                    id: "emailTemplateGrid",
                    view: "datatable",
                    select: true,
                    editable: false,
                    columns: [
                        {
                            id: "id",
                            header: "#",
                            width: 50
                        }, {
                            id: "name",
                            header: "Name",
                            template:function htmlEncode( html ) {
                                return EmailChimp.htmlEncode(html.name);
                            },
                            fillspace: 1,
                        }, {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='cursor:pointer;' class='webix_icon fa-trash-o trash'></span>"}
                    ],
                    pager: "pagerA",
                    data:   EmailChimp.models.MailModal.getEmailTemplates(),
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
                            data: {title: "Email Template"}
                        },
                        {
                            type: "space",
                            rows: [
                                {
                                    height: 40,
                                    cols: [
                                        this.getButton('add', 'Add', 'plus-circle'),
                                        this.getButton('edit', 'Edit', 'pencil-square-o'),
                                        {}
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