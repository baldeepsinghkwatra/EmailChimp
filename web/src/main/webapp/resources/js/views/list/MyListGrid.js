
EmailChimp.view('MyListGrid',
        {
            getMyListGrid: function () {
                return{
                    id: "myListGrid",
                    view: "datatable",
                    select: true,
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
                        },{
                            id: "contact",
                            header: "Contact",
                            template:function htmlEncode( html ) {
                                return EmailChimp.htmlEncode(html.contact);
                            },
                            minWidth: 20,
                            editor: "text"
                        }, {
                            id: "email",
                            header: "Email",
                            template:function htmlEncode( html ) {
                                return EmailChimp.htmlEncode(html.email);
                            },
                            width: 270,
                            editor: "text"
                        }, {
                            id: "firstName",
                            header: "First Name",
                            template:function htmlEncode( html ) {
                                return EmailChimp.htmlEncode(html.firstName);
                            },
                            width: 200,
                            editor: "text"
                        }, {
                            id: "lastName",
                            header: "Last Name",
                            template:function htmlEncode( html ) {
                                return EmailChimp.htmlEncode(html.lastName);
                            },
                            width: 200,
                            editor: "text"
                        }, 
                        {
                            id: "emailCategory",
                            header: "Category",
                            template: function(data){
                                var category = data.emailCategory;
                                var categoryName="";
                                for (var i = 0; i < category.length; i++) {
                                    categoryName += category[i].categoryName+" ";
                                }
                                return categoryName;
                            },
                            width: 200,
                            editor: "text"
                        },
                        {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='cursor:pointer;' class='webix_icon fa-trash-o trash'></span>"},
                        {
                            id: "save",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='cursor:pointer;' class='webix_icon fa-floppy-o save'></span>"}
                    ],
                    pager: "pagerA",
                    data: EmailChimp.models.MailModal.getEmailList(),
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
                            data: {title: "My List"}
                        },
                        {
                            type: "space",
                            rows: [
                                {
                                    height: 40,
                                    cols: [
                                        this.getButton('add', 'Add', 'plus-circle'),
                                        this.getButton('edit', 'Edit', 'pencil-square-o'),
                                        this.getButton('import', 'Import(.xls)', 'upload'),
                                        {}
                                    ]
                                },
                                {
                                    rows: [
                                        this.getMyListGrid(),
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
