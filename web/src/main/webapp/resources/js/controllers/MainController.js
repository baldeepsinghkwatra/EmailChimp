EmailChimp.controller('MainController',
        {
            init: function () {
            },
            showRegister: function () {
                $$("showReg").define("collapsed", false);
            },
            login: function () {
                var values = $$("login").getValues();
                webix.ajax().post("checkLogin", "email=" + values.email + "&password=" + values.password);
            },
            register: function () {
                var values = $$("register").getValues();
                webix.ajax().post("registerConsumer", "userName=" + values.userName
                        + "&userEmail=" + values.userEmail + "&userMobile="
                        + values.userMobile + "&userPassword=" + values.userPassword);
            }
        }
);
