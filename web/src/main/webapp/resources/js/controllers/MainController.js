EmailChimp.controller('MainController',
        {
            component: ['views/user/ForgotPassword'],
            init: function () {
            },
            showPopup: function () {
                forgotPassword = EmailChimp.views.ForgotPassword;
                webix.ui(forgotPassword.getLayout()).show();
            },
            showRegister: function () {
                $$("showReg").define("collapsed", false);
            },
            login: function () {
                if(!$$('login').validate()){
                    webix.message("Invalid Details!!");
                }else {
                    var values = $$("login").getValues();
                    webix.ajax().post("checkLogin", "email=" + values.email + "&password=" + values.password,{
                        error:function(text, data, XmlHttpRequest){
                            alert("error");
                        },
                        success:function(response){
                            var obj = $.parseJSON(response);
                            if(obj.status == 100) {
                                window.location.reload(1);
                            }
                            $$("responseMessage").setHTML("<span style=color:red>*"+obj.message+"</span>");
                            $$('login').clear();
                        }
                    });
                }
            },
            register: function () {
                if(!$$('register').validate()){
                    webix.message({
                        type:"error", 
                        text:"Form Data is Invalid"
                    });
                }else {
                    var values = $$("register").getValues();
                    webix.ajax().post("registerConsumer", "userName=" + values.userName
                            + "&userEmail=" + values.userEmail + "&userMobile="
                            + values.userMobile + "&userPassword=" + values.userPassword,{
                        error:function(text, data, XmlHttpRequest){
                            alert("error");
                        },
                        success:function(text, data, XmlHttpRequest){
                            console.log($$('responseRegisterMessage'));
                            $$('responseRegisterMessage').setHTML("<span style=color:red>*"+text+"</span>");
                            $$('register').clear();
                        }
                    });
               }
            }
            
        }
);
