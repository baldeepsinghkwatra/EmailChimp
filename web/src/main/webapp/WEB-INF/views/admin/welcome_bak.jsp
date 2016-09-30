<%-- 
    Document   : welcome
    Created on : 5 Sep, 2016, 1:14:32 PM
    Author     : baldeep
--%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Home</title>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/w2ui.min.css">
        <script  src="<%=request.getContextPath()%>/resources/js/jquery-3.1.0.min.js"></script>
       <!--<script  src="<%=request.getContextPath()%>/resources/js/w2ui.min.js"></script>-->
        <script  src="<%=request.getContextPath()%>/resources/js/w2ui-1.4.3.js"></script>
<!--        <script src="<%=request.getContextPath()%>/resources/js/welcome.js"></script>-->
        <style>
            .rotate {

                position: absolute;
                margin-left: -4px; 
                margin-top: 20px; 
                /* Safari */
                -webkit-transform: rotate(90deg);

                /* Firefox */
                -moz-transform: rotate(90deg);

                /* IE */
                -ms-transform: rotate(90deg);

                /* Opera */
                -o-transform: rotate(90deg);

                /* Internet Explorer */
                filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);

            }


        </style>
        <script>

            var StyleConstant = {
                slideBar:'ckground-image: -moz-linear-gradient(#dae6f3,#c2d5ed);\n\
                        background-image: -ms-linear-gradient(#dae6f3,#c2d5ed);\n\
                        background-image: -o-linear-gradient(#dae6f3,#c2d5ed);\n\
                        background-image: linear-gradient(#dae6f3,#c2d5ed);\n\
                        filter: progid:dximagetransform.microsoft.gradient(startColorstr="#ffdae6f3", endColorstr="#ffc2d5ed", GradientType=0);\n\
                        border: 1px solid #b9cee9;\n\
                        border-bottom: 1px solid #99bbe8;',
                layout: 'border: 1px solid #dfdfdf; padding: 0px;'
               
            }

           



            function setLayoutContainerHeight()
            {
                // Get top position of layout container, subtract from screen height, subtract a bit for padding
                var y = $('#layout-container').position().top;
                var layoutHeight = $(window).height() - y - 10;
                $('#layout-container').css('height', layoutHeight + 'px');
            }


            var hide = function () {

                w2ui.layout.get('left').content.hide("main", "sidebar", true);
                w2ui.layout.get('left').content.show("left", "", true);
                w2ui.layout.sizeTo('left', 30);
            };
            var show = function () {
                w2ui.layout.get('left').content.show("main", "sidebar", true);
                w2ui.layout.get('left').content.hide("left", "", true);
                w2ui.layout.sizeTo('left', 200);
            };
            
            
            $(document).ready(function () {

                setLayoutContainerHeight();
                $(window).resize(setLayoutContainerHeight);
                $('#layout').w2layout({
                    name: 'layout',
                    panels: [
                        {type: 'top', size: 100, resizable: false, style: StyleConstant.layout,
                            content: '<img src="<%=request.getContextPath()%>/resources/images/emailchimp-icon.png" height="60px" >\n\
                                <div style ="font-size: 29px;color: #1e83c9;margin-top: -35px;margin-left: 66px;padding-bottom: 5px;"> EMAIL CHIMP</div>\n\
                                <div id="toolbar" style="padding: 4px; border: 1px solid silver; border-radius: 3px;"></div>'},
                        {type: 'left', size: 200, resizable: false, style: StyleConstant.layout },
                        {type: 'main', resizable: true, style: StyleConstant.layout, content: 'main', title: 'Outbox'},
                        {type: 'bottom', size: 30, resizable: false, style: StyleConstant.layout, content: '<div style="padding:5px">${greeting}</div>'}
                    ]
                });
                var config = {
                    toolbar: {
                        name: 'toolbar',
                        items: [
                            {type: 'menu', id: 'item2', caption: 'Menu', items: [
                                    {text: 'Item 1', icon: 'fa-camera'},
                                    {text: 'Item 2', icon: 'fa-picture'},
                                    {text: 'Item 3', icon: 'fa-glass'}
                                ]}, {type: 'menu', id: 'item3', caption: 'Menu', items: [
                                    {text: 'Item 1', icon: 'fa-camera', count: 5},
                                    {text: 'Item 2', icon: 'fa-picture', disabled: true},
                                    {text: 'Item 3', icon: 'fa-glass', count: 12}
                                ]}, {type: 'menu', id: 'item4', caption: 'Menu', items: [
                                    {text: 'Item 1', icon: 'fa-camera', count: 5},
                                    {text: 'Item 2', icon: 'fa-picture', disabled: true},
                                    {text: 'Item 3', icon: 'fa-glass', count: 12}
                                ]}, {type: 'menu', id: 'item5', caption: 'Menu', items: [
                                    {text: 'Item 1', icon: 'fa-camera', count: 5},
                                    {text: 'Item 2', icon: 'fa-picture', disabled: true},
                                    {text: 'Item 3', icon: 'fa-glass', count: 12}
                                ]},
                            {type: 'spacer'},
                            {type: 'button', id: 'item7', caption: 'Logout'}

                        ]
                    },
                    sideLayout: {
                        name: 'sideLayout',
                        panels: [
                            {type: 'left', size: 30, resizable: false, hidden: true, style: StyleConstant.slideBar,
                                content: '<a href="#" class=" rotate  showButton " >Menu</a>'
                            },
                            {type: 'main', size: 200, resizable: false,
                                title: '<div class="null">Menu<a href="#" class="hideButton" style="float: right;">\n\
                                        <img src="<%=request.getContextPath()%>/resources/images/navigate_left.png" height="20px"></a></div>'}

                        ]

                    },
                    sidebar:
                            {
                                name: 'sidebar',
                                nodes: [
                                    {id: 'general', text: 'Mail Box', group: true, expanded: true, nodes: [
                                            {id: 'n1', text: 'Outbox', selected: true},
                                            {id: 'n2', text: 'Compose Mail'},
                                            {id: 'n3', text: 'Sent Mail'}
                                        ]
                                    }
                                ]
                            },
                    grid: {
                        name: 'grid',
                        msgNotJSON: 'Give me JSON!',
                        url: 'resources/test/jsonMail.txt',
                        method: 'GET',
                        show: {
                            footer: true,
                            toolbar: true
                        },
                        columns: [
                            {field: 'id', caption: 'id', size: '50px', sortable: true, resizable: true},
                            {field: 'Name', caption: 'Product', size: '100%', sortable: true, searchable: 'text', resizable: true}

                        ]

                    }


                };
                $('#toolbar').w2toolbar(config.toolbar);
                w2ui.layout.content('left', $().w2layout(config.sideLayout));
                w2ui.layout.get('left').content.content('main', $().w2sidebar(config.sidebar));
                w2ui.layout.content('main', $().w2grid(config.grid));
                w2ui['sidebar'].on('render', function (event) {
                    $(".hideButton").click(hide);
                    $(".showButton").click(show);
                });
            });
        </script>
    </head>
    <body style="margin: 1px">
        <div id="layout-container" style="height:700px;">
            <div id="layout" style="width: 100%; height: 100%;"></div>
        </div>
        <!--<div id="layout" style="width:1200px; height: 700px;"></div>-->

        <!--        <div class="panel panel-primary col-lg-10" style="margin: 0 auto;float: none;">
                    <div class="panel-body">
                        <span style="text-align: center">
                            <h3>${greeting}</h3>
                            <a onclick="getAllUsers()" style="float: left" href="#" id="viewUsers">View All Users</a>
                            <a style="float: right" href="logout" class="btn-sm btn-danger">Logout</a>
        
                            <form class="form-inline" id="searchForm" name="searchForm">
                                <div class="form-group">
                                    <input id="mobileNumber" class="form-control col-lg-12" type="search" placeholder="Search by Mobile" name="mobileNumber" required="" title="Enter Mobile Number here"/>
                                </div>
                                <div class="form-group">
                                    <input class="btn-xs btn-primary" onclick="getUserByMobile()" type="button" value="Search" />
                                </div>
                            </form></span>
                        <div id="allUsersDiv"></div>
                    </div>
                </div>-->

        <!--<div id="myForm" style="width: 600px"></div>-->

        <!--        <script>
        //                                var test;
        //                                var record=w2ui['myForm'].request();
                    w2utils.settings.dataType = 'JSON';
                    $(function () {
        
                        test = $('#myForm').w2form({
                            name: 'myForm',
                            header: 'Login Form',
                            url: 'test',
        //                                        settings : {
        //                                        data: JSON.stringify(),
        //                                                contentType: 'application/json; charset=UTF-8'},
        
        
                            fields: [
                                {name: 'first_name', id: 'st', type: 'text', required: true, options: {maxlength: 2},
                                    html: {caption: 'First Name', attr: 'style="width: 300px"'}},
                                {name: 'last_name', type: 'text', required: true},
                                {name: 'comments', type: 'text'}
                            ],
        //                                        record: {
        //                                        first_name: 'John',
        //                                                last_name: 'Doe',
        //                                                email: 'jdoe@email.com'
        //                                        },
                            actions: {
                                reset: function () {
                                    this.clear();
                                },
                                save: function () {
                                    debugger;
                                    this.save();
                                }
                            }
                        });
                    });
                </script>-->

    </body>
</html>
