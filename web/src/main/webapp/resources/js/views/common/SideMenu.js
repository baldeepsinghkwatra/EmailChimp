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
                                value: "Contact",
                                open: true,
                                data: [
                                   
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
                                    }
                                ]
                            } ,{
                                id: "emailSchedule",
                                value: "Schedule",
                                open: true,
                                data: [ 	
                                        {
                                    id: "emailTemplate",
                                    value: "Email Templates",
                                    icon: "file-text",
                                    details: "Email Templates"
                                },
                                
                                {
                                    id: "campaign",
                                    value: "Campaign",
                                    icon: "flag",
                                    details: "Campaign Management"
                                },
                                
                                {
                                    id: "scheduler",
                                    value: "Scheduler",
                                    icon: "clock-o",
                                    details: "Scheduler"
                                }
                                        ]
                            },{
                                id: "emailsetting",
                                value: "Setting",
                                open: true,
                                data: [ {
                                    id: "emailSettings",
                                    value: "Email Configuration",
                                    icon: "wrench",
                                    details: "Email Settings"
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
