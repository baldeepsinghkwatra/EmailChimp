/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var UserLogin = {
    init: function () {
        w2ui.layout.content('main', $().w2form(this.getLoginForm()));
        
        w2ui['layout'].get('main').content.formHTML += '<br><button class="btn" style="position: absolute;'+
        'left: 50%;'+
        'top: 60%;'+
        '-webkit-transform: translate(-50%, -50%);'+
        '-ms-transform: translate(-50%, -50%);'+
        'transform: translate(-50%, -50%);" onclick="UserLogin.openPopup()" >New User? Register</button>';
    },
    getLoginForm: function () {
        return {
            name   : 'form',
            header : 'Login',
            style : 'width: 450px;height:220px;left: 30%;top: 0%;',
            url    : 'checkLogin',
            fields : [
                { field: 'email', type: 'text', required: true, html: { caption: 'Email', attr: 'style="width: 200px"' } },
                { field: 'password',  type: 'password', required: true, html: { caption: 'Password', attr: 'style="width: 200px"' } }           
            ],
            actions: {
                'Save': function (event) {
                    console.log('save');
                    this.save();
                },
                'Clear': function (event) {
                    console.log('clear', event);
                    this.clear();
                }
            },
            onSave: function(event) {
                console.log(event);
                if(event.status == "success") {
                    setTimeout(function () { 
                        location.reload();
                      }, 0 * 1000);
                }
            },
            onSubmit: function(form, formObj){
                w2utils.settings.dataType = 'HTTP';
                $.extend(formObj.postData, formObj.postData.record);
            }
        };
    },
    openPopup : function () {
        $().w2popup('open', this.getSignUpPopup());
    },
    getSignUpPopup: function () {
        if (!w2ui.foo) {
        $().w2form({
            name: 'foo',
            style: 'border: 0px; background-color: transparent;',
            url: 'registerConsumer',
            fields: [
                { field: 'userName', type: 'text', required: true, html: { caption: 'Full Name', attr: 'style="width: 200px"' } },
                { field: 'userEmail',  type: 'email', required: true, html: { caption: 'Email', attr: 'style="width: 200px"' } },
                { field: 'userPassword',  type: 'password', required: true, html: { caption: 'Password', attr: 'style="width: 200px"' } },
                { field: 'userMobile',  type: 'number', required: true, html: { caption: 'Contact No.', attr: 'style="width: 200px"' } }
            ],
            actions: {
                "save": function () { this.save(); },
                "reset": function () { this.clear(); },
            },
            onSave: function(event) {
                console.log(event);
                if(event.status == "success") {
                    setTimeout(function () { 
                        location.reload();
                      }, 0 * 1000);
                }
            },
            onSubmit: function(form, formObj){
                w2utils.settings.dataType = 'JSON';
            }
        });
    }
        var title = "Sign Up!!";
        var width = 500;
        var height = 300;
        var name = "foo";
        return {
            title: title,
            name: name,
            body: '<div id="popup" style="width: 100%; height: 100%;"></div>',
            style: 'padding: 15px 0px 0px 0px',
            width: width,
            height: height,
            showMax: true,
            onToggle: function (event) {
                $(w2ui.foo.box).hide();
                event.onComplete = function () {
                    $(w2ui.foo.box).show();
                    w2ui.foo.resize();
                }
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                    $('#w2ui-popup #popup').w2render('foo');
                }
            }
        };
    }
};
//function openPopup () {
//    if (!w2ui.foo) {
//        $().w2form({
//            name: 'foo',
//            style: 'border: 0px; background-color: transparent;',
//            url: 'registerConsumer',
//            fields: [
//                { field: 'userName', type: 'text', required: true, html: { caption: 'Full Name', attr: 'style="width: 200px"' } },
//                { field: 'userEmail',  type: 'email', required: true, html: { caption: 'Email', attr: 'style="width: 200px"' } },
//                { field: 'userPassword',  type: 'password', required: true, html: { caption: 'Password', attr: 'style="width: 200px"' } },
//                { field: 'userMobile',  type: 'number', required: true, html: { caption: 'Contact No.', attr: 'style="width: 200px"' } }
//            ],
//            actions: {
//                "save": function () { this.save(); },
//                "reset": function () { this.clear(); },
//            },
//            onSave: function(event) {
//                console.log(event);
//                if(event.status == "success") {
//                    setTimeout(function () { 
//                        location.reload();
//                      }, 0 * 1000);
//                }
//            },
//            onSubmit: function(form, formObj){
//                w2utils.settings.dataType = 'JSON';
//            }
//        });
//    }
//    $().w2popup('open', {
//        title   : 'Form in a Popup',
//        body    : '<div id="form" style="width: 100%; height: 100%;"></div>',
//        style   : 'padding: 15px 0px 0px 0px',
//        width   : 500,
//        height  : 300, 
//        showMax : true,
//        onToggle: function (event) {
//            $(w2ui.foo.box).hide();
//            event.onComplete = function () {
//                $(w2ui.foo.box).show();
//                w2ui.foo.resize();
//            }
//        },
//        onOpen: function (event) {
//            event.onComplete = function () {
//                // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
//                $('#w2ui-popup #form').w2render('foo');
//            }
//        }
//    });
//}

//        $(function () {    
//            var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
//            $('#layout').w2layout({
//                name: 'layout',
//                panels: [
//                    { type: 'top', size: 50, style: pstyle, content: 'top', resizable: true },
//                    { type: 'left', size: 300, style: pstyle, content: 'left', resizable: true },
//                    { type: 'main', style: pstyle, content: 'main' }
//                ]
//            });
//            w2ui['layout'].content('main','<div id="form" style="width: 450px;height:220px;position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);"></div>');
//        });
