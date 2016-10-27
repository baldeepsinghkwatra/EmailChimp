EmailChimp.controller('OutBoxController',
        {
            component: ['views/mail/OutboxGrid'],
            init: function () {
                outboxGrid = EmailChimp.views.OutboxGrid;

                $$("content").removeView('main');
                $$("content").addView(outboxGrid.getLayout(), 1);
                $$("mainLayout").resize();
            }

        }
);