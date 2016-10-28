EmailChimp.controller('MainController',
        {
            init: function () {
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
                        success:function(text, data, XmlHttpRequest){
                            var x = $("#msgErr").html(text);
//                            alert(x+": "+text);
                            webix.message(x+"${messageDefault}"+text);
                            $$('login').clear();
                            setTimeout(function () {
                                window.location.reload(1);
                            }, 3000);  // After 5 secs
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
                            webix.message(text);
                            $$('register').clear();
                        }
                    });
               }
            }
            
        }
);
