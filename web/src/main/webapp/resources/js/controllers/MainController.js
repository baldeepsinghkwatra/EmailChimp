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
                        success:function(response){
                            var obj = $.parseJSON(response);
                            if(obj.status == 100) {
                                window.location.reload();
                            }
                            $$("responseMessage").setHTML("<span style=color:red>*"+obj.message+"</span>");
                            $$('login').clear();
                            
//                            var err = $('#msgErr').html(response).context.all[31].innerHTML;
//                            if(err !== "Invalid username or password!" 
//                                    && err !== "Invalid username and password!"){
//                                setTimeout(function () {
//                                    window.location.reload(1);
//                                }, 0);  // After 0 secs                                
//                            }else {
//                                webix.message(err);
//                            }
//                            
//                            var x = $(response).filter('#msgErr');
//                            console.log(x);
//                            webix.message(x+"${messageDefault}");
//                            $$('login').clear();
                             
//                            setTimeout(function () {
//                                window.location.reload(1);
//                            }, 3000);  // After 5 secs
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
