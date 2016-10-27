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
                            }
                        ]
                    }
                ]
            }
        }
);