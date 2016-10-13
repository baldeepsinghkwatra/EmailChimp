/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var UserLogin = {
    init: function () {
        if (w2ui.userLogin == undefined) {
            $().w2form(this.getLoginForm())
        }

        w2ui.layout.content('main', w2ui.userLogin);

        w2ui['layout'].get('main').content.formHTML += '<br><button class="btn" style="position: absolute;' +
                'left: 50%;' +
                'top: 60%;' +
                '-webkit-transform: translate(-50%, -50%);' +
                '-ms-transform: translate(-50%, -50%);' +
                'transform: translate(-50%, -50%);" onclick="EmailChimp.loadComponent(\'common/ForgotPassword\')" >Forgot Password?</button>';
    },
    getLoginForm: function () {
        return {
            name: 'userLogin',
            header: 'Login',
            style: 'width: 450px;height:220px;left: 30%;top: 25%;',
            url: 'checkLogin',
            fields: [
                {field: 'email', type: 'text', required: true, html: {caption: 'Email', attr: 'style="width: 200px"'}},
                {field: 'password', type: 'password', required: true, html: {caption: 'Password', attr: 'style="width: 200px"'}}
            ],
            record: {
                'remember-me': '1'
            },
            actions: {
                'Login': function (event) {
                    this.save();
                },
                'New User': function (event) {
                    EmailChimp.loadComponent('user/UserRegistration');
                }
            },
            onSave: function (event) {
                console.log(event);
                if (event.status == "success") {
                    setTimeout(function () {
                        location.href="";
                    }, 0 * 1000);
                }
            },
            onSubmit: function (form, formObj) {
                w2utils.settings.dataType = 'HTTP';
                $.extend(formObj.postData, formObj.postData.record);
            }
        };
    }
}
