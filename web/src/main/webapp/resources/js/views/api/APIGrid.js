
EmailChimp.view('APIGrid',
        {
            getApiGrid: function () {
                return{
                    id: "apiGrid",
                    view: "datatable",
                    select: true,
                    editable: true,
                    editaction: "dblclick",
                    on: {
                        onBeforeEditStop: function (data, prevent) {
                            var newValue = data.value;
                            if (newValue.length === 0 || !newValue.trim())
                            {
                                webix.alert("Please make sure you enter valid details");
                                return false;
                            }
                        }
                    },
                    columns: [
                        {
                            id: "id",
                            header: "#",
                            width: 50
                        }, {
                            id: "apiKey",
                            header: "API Key",
                            template:function htmlEncode( html ) {
                                return EmailChimp.htmlEncode(html.apiKey);
                            },
                            fillspace: 1,
                            width: 1000,
                            editor: "text"
                        }, {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='cursor:pointer;' class='webix_icon fa-trash-o trash'></span>"}
                    ],
                    pager: "pagerA",
                    data: EmailChimp.models.MailModal.getApi(),
                    ready: function () {
                        webix.extend(this, webix.ProgressBar);
                    }
                };
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
                            data: {title: "API"}
                        },
                        {
                            type: "space",
                            rows: [
                                {
                                    height: 40,
                                    cols: [
                                        this.getButton('generate', 'Generate', 'plus-circle'),
                                        {},
                                        {}
                                    ]
                                },
                                {
                                    rows: [
                                        this.getApiGrid(),
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
        });
