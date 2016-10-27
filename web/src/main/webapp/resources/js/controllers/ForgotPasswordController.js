EmailChimp.controller('ForgotPasswordController',
        {
            component: ['views/user/ForgotPassword'],
            init: function () {
                forgotPassword = EmailChimp.views.ForgotPassword;
                webix.ui(forgotPassword.getLayout()).show();
            }
        });
