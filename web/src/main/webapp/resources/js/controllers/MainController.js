EmailChimp.controller('MainController',
        {
            init: function () {
            },
            showRegister: function () {
                $$("showReg").define("collapsed", false);
            },
            login: function () {
                var values = $$("login").getValues();
                webix.ajax().post("checkLogin", "email=" + values.email + "&password=" + values.password,{
                    error:function(text, data, XmlHttpRequest){
                        alert("error");
                    },
                    success:function(text, data, XmlHttpRequest){
                        var x = document.getElementById("msgErr").value;
                        alert(x+"${messageDefault}"+text);
                    }
                });
//                webix.message(messageDefault);
            },
            register: function () {
                var values = $$("register").getValues();
                webix.ajax().post("registerConsumer", "userName=" + values.userName
                        + "&userEmail=" + values.userEmail + "&userMobile="
                        + values.userMobile + "&userPassword=" + values.userPassword);
            }
        }
);
