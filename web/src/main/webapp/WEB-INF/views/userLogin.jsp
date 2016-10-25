<%-- 
    Document   : userLogin
    Created on : 6 Sep, 2016, 12:28:04 PM
    Author     : baldeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Page</title>
        <link rel="stylesheet" href="http://cdn.webix.com/edge/webix.css" type="text/css" media="screen" charset="utf-8">
        <script src="http://cdn.webix.com/edge/webix.js" type="text/javascript" charset="utf-8"></script>
        <script src="<%=request.getContextPath()%>/resources/js/nav.js" type="text/javascript"></script>
    </head>
    <body style="margin: 1px">
        <style>
            body{
                    background: #F2EFEA;
            }
            .transparent{
                    background-color: transparent;
            }
            a.check_flight{
                    color:  #367ddc;
            }
            .webix_el_box .webixtype_form {
                    color: #fff;
            }
            .webix_el_counter .webix_inp_counter_prev, .webix_el_counter .webix_inp_counter_next {
                    color: #fff;
            }
            .webix_el_counter .webix_inp_counter_next {
                    line-height: 28px;
            }
    </style>
        
       <script type="text/javascript">

                function login() {
                    var values = $$("login").getValues();
                    webix.ajax().post("checkLogin","email="+values.email+"&password="+values.password);
                }
                
                function register() {
                    var values = $$("login").getValues();
                    webix.ajax().post("registerConsumer","userName="+values.userName+"&userEmail="+values.userEmail+"&userMobile="+values.userMobile+"&userPassword="+values.userPassword);
                }

//                var cities = [
//                        {id:1, value:"Berlin"}, {id:2, value:"Kiev"}, {id:3, value:"Minsk"},
//                        {id:4, value:"Moscow"}, {id:5, value:"Prague"}, {id:6, value:"Riga"},
//                        {id:7, value:"St.Petersburg"}, {id:8, value:"Tallin"}, {id:9, value:"Vilnius"},{id:10, value:"Warsaw"}
//                ];
//
//                var offers = [
//                        {id:1, direction:"<b>Tallin</b> EE - <b>Berlin</b> Tegel DE", date:new Date(2013,7,25), price:"450", save:"45", places:21},
//                        {id:2, direction:"<b>Moscow</b> Vnukovo RU - <b>Kiev</b> Borispol UA", date: new Date(2013,7,28), price:"160", save:"65", places:5},
//                        {id:3, direction:"<b>Riga</b> International LV - <b>Warsaw</b> Modlin", date: new Date(2013,7,16), price:"220", save:"110", places:2},
//                        {id:4, direction:"<b>Vilnius</b> LT - <b>Kiev</b> Zhulhany UA", date: new Date(2013,8,1), price:"140", save:"40", places:35},
//                        {id:5, direction:"<b>Minsk</b> International 2 BY- <b>Berlin</b> Schoenefeld DE", date: new Date(2013,8,6), price:"378", save:"35", places:25},
//                        {id:6, direction:"<b>St. Petersburg</b> Pulkovo - <b>Tallin</b> Estonia", date: new Date(2013,7,31), price:"90", save:"82", places:11},
//                        {id:7, direction:"<b>Kiev</b> Zhulhany UA - <b>Moscow</b> Vnukovo RU", date: new Date(2013,8,15), price:"220", save:"30", places:41},
//                        {id:8, direction:"<b>Moscow</b> Sheremetyevo RU - <b>Vilnius</b> LT", date: new Date(2013,8,11), price:"321", save:"44", places:32},
//                        {id:9, direction:"<b>Warsaw</b> PL - <b>Minsk</b> International 2 BY", date: new Date(2013,8,5), price:"256", save:"32", places:55},
//                        {id:10, direction:"<b>Prague</b> CZ - <b>St. Petersburg</b> Pulkovo", date: new Date(2013,7,30), price:"311", save:"63", places:15}
//                ];

                var signin = {
                        width: 360,
                        multi:false, rows:[
                                {header:"LOGIN!!", body:{
                                        view:"form",id:"login", elements:[
                                                {view:"template", template: "<div style='text-align:center;'><img src='<%=request.getContextPath()%>/resources/images/freddie_wink.svg' height='130'></div><div style='text-align:center;' onclick="">Need an account? Register</div>", height:160, align:"center", type:"clean"},
//                                                {view:"template", template: "<div style='text-align:center;'>Need an account? Register</div>", align:"center", type:"clean"},
                                                {view:"text", name:"email", label:"Email", placeholder:"mattclark@some.com"},
                                                {view:"text", name:"password", label:"Password", type:"password", labelWidth:120, placeholder:"********"},
                                                { height: 10},
                                                {view:"button", type:"form", value:"Sign In", inputWidth:140, click:"login()",align: "center"}, {}

                                        ],
                                        elementsConfig:{ 
                                                labelWidth:100, labelAlign:"left"
                                        }
                                }},
                                {header:"Register", collapsed:true, body:{
                                        view:"form",id:"register", elements:[
                                                {view:"text", name:"userName", label:"User Name", placeholder:"Matthew"},
                                                {view:"text", name:"userEmail", label:"Email", placeholder:"mattclark@some.com"},
                                                {view:"text", name:"userMobile", label:"Mobile", labelWidth:120, placeholder:"Matt"},
                                                {view:"text", name:"userPassword", label:"Password", type:"password", labelWidth:120, placeholder:"********"},
                                                {view:"button", value:"Sign Up", type:"form", inputWidth:100, click:"register()", align:"center"}, {}
                                        ],
                                        elementsConfig:{labelAlign:"left" }
                                }}
                        ]
                };

                var special_offers = {
                        gravity:3, rows:[
                                {type:"header", css: "webix_header rounded_top", template:"Special offers"},
                                {
                                        view: "datatable", select:true,
                                        columns:[
                                                {id:"id", header:"#", width:40},
                                                {id:"direction", header:"Direction", minWidth:320, fillspace:true },
                                                {id:"date", header:"Date", width:150, sort:"date", format:webix.i18n.longDateFormatStr},
                                                {id:"price", header:"Price", css:"number", width:95, sort:"int", format:webix.i18n.priceFormat},
                                                {id:"save", header:"You save", css:"number", width:95, sort:"int", format:webix.i18n.priceFormat},
                                                {id:"places", header:"Tickets", css:"number", width:65, sort:"int"},
                                                {id:"book", header:"Booking", css:"webix_el_button", width:100, template:"<a href='javascript:void(0)' class='check_flight'>Book now</a>"}
                                        ],
//                                        data:offers,
                                        onClick:{
                                                "check_flight":function(){
                                                        return false;
                                                }
                                        },
                                        ready:function(){
                                                this.select("3");
                                        }
                                }
                        ]
                };

                var lang = {
                        view:"popup", id:"lang",
                        head:false, width: 100,
                        body:{
                                view:"list", scroll:false, 
                                yCount:4, select:true, borderless:true,
                                template:"#lang#",
                                data:[
                                        {id:1, lang:"English"},
                                        {id:2, lang:"French"},
                                        {id:3, lang:"German"},
                                        {id:4, lang:"Russian"}
                                ],
                                on:{"onAfterSelect":function(){
                                        $$("lang").hide();
                                }}
                        }
                };

                var ui = {

                        rows:[
//                                { view:"navbar", value:"booking" },
                                {
                                        type: "space",
                                        rows:[{autoheight:true, type: "wide", cols:[signin]}]
                                }
                        ]
                };


                webix.ready(function(){

                        webix.ui(ui);
                        webix.ui(lang);

                        $$("radio1").attachEvent("onChange", function(newv, oldv){
                                if(newv == 2)
                                        $$("datepicker2").show();
                                else 
                                        $$("datepicker2").hide();
                        });
                });

    </script>
    </body>
     
</html><script src='https://cdn.ravenjs.com/2.1.0/raven.min.js'></script><script>Raven.config('https://50e7233181284483abcbf6688b0505b5@app.getsentry.com/68752',{ release:'4.0.8'}).install();</script>

