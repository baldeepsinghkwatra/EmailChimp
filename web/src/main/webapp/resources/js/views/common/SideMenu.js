EmailChimp.view('SideMenu',
        {
            component: ['Components/SideMenuIcon'],
            layout: {
                width: 200,
                rows: [
                    {
                        view: "tree",
                        id: "app:menu",
                        type: "sideMenu",
                        css: "menu",
                        activeTitle: true,
                        select: true,
                        tooltip: {
                            template: function (obj) {
                                return obj.$count ? "" : obj.details;
                            }
                        },
                        on: {
                            onBeforeSelect: function (id) {
                                if (this.getItem(id).$count) {
                                    return false;
                                }

                            },
                            onAfterSelect: function (id) {
                                window.location.href = "#" + id;
                            }
                        },
                        data: [
                            {
                                id: "main",
                                value: "Mail",
                                open: true,
                                data: [
                                    {
                                        id: "sentMail",
                                        value: "Sent Mail",
                                        icon: "send-o",
                                        details: "Sent Mail"
                                    },
                                    {
                                        id: "outbox",
                                        value: "Outbox",
                                        icon: "hdd-o",
                                        details: "Outbox"
                                    }
                                ]
                            },
                            {
                                id: "preferences",
                                value: "Preferences",
                                open: false,
                                data: [
                                    {
                                        id: "emailSettings",
                                        value: "Email Configuration",
                                        icon: "wrench",
                                        details: "Email Settings"
                                    },
                                    {
                                        id: "myCategory",
                                        value: "My Category",
                                        icon: "cubes",
                                        details: "List of Categories"
                                    },
                                    {
                                        id: "myList",
                                        value: "My List",
                                        icon: "navicon",
                                        details: "List of Users"
                                    },
                                    {
                                        id: "emailTemplate",
                                        value: "Email Templates",
                                        icon: "file-text",
                                        details: "Email Templates"
                                    },
                                    {
                                        id: "api",
                                        value: "API",
                                        icon: "key",
                                        details: "Generate API Keys"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
);
