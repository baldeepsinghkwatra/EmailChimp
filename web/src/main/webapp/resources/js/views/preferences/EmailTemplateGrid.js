
EmailChimp.view('EmailTemplateGrid',
        {
            getEmailSettingsGrid: function () {
                return{
                    id: "emailTemplateGrid",
                    view: "datatable",
                    select: true,
                    multiselect:true,
                    editable: false,
                    columns: [
                        {
                            id: "id",
                            header: "#",
                            width: 50
                        }, {
                            id: "name",
                            header: "Name",
                             width: 200
                        }, {
                            id: "templateContent",
                            header: "Content",
                            height:100,
                             width: 400
                        }, {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='cursor:pointer;' class='webix_icon fa-trash-o trash'></span>"}
                    ],
                    pager: "pagerA",
                    data:   EmailChimp.models.TemplateModal.getEmailConfiguration(),
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