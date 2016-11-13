EmailChimp.controller('ChangePasswordController',
        {
            component: ['views/account/ChangePassword'],
            init: function () {
                controller = this;
                this.showView();
                this.bindEvents();
            },
            bindEvents: function() {
                var form = $$('changePasswordForm');
                form.attachEvent("onSubmit", function () {
                        if (form.validate()) {
                            $$("submitButton").disable();
                            webix.ajax().post("change-password", form.getValues(), function (text, xml, xhr) {
                                var color = 'red';
                                if (xhr.status === 200) {
                                    color = 'green';
                                }
                                $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                                $$('responseMessage').refresh();
                            });
                            $$("submitButton").enable();
                            form.clear();
                        }
                    });
            },
            submitForm: function () {  

                 $$('changePasswordForm').callEvent("onSubmit"); 
            },
            showView: function() {
                webix.ui(EmailChimp.views.ChangePassword.getLayout()).show();
            }
        }
);