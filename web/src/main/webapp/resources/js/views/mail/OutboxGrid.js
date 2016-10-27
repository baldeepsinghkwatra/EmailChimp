EmailChimp.view('OutboxGrid',
        {
            getLayout: function () {
                return {
                    id: 'main',
                    type: 'clean',
                    rows: [
                        {height: 49,
                            id: "title",
                            css: "title",
                            template: "<div class='header'>#title#</div>",
                            data: {
                                title: "Outbox Mails"
                            }
                        }, {
                            type: "space",
                            rows: [
                                {}
                            ]
                        }

                    ]
                };
            }
        });