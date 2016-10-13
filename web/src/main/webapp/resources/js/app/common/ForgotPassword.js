/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ForgotPassword = {
    init: function () {
        if (w2ui.forgotPassword == undefined) {
            $().w2form(this.getforgotPasswordForm());
        }

        w2ui.layout.content('main', w2ui.forgotPassword);

    },
    getforgotPasswordForm: function () {
        return {
            name: 'forgotPassword',
            header: 'Forgot Password',
            style: 'width: 450px;height:150px;left: 30%;top: 25%;',
            url: 'forgot-password',
            fields: [
                {field: 'userEmail', type: 'email', required: true, html: {caption: 'Email', attr: 'style="width: 200px"'}}            ],
            actions: {
                
                "register": function () {
                    EmailChimp.loadComponent('user/UserRegistration');
                },
                "Submit" : function () {
                    this.save();
                },
                "Login": function () {
                     EmailChimp.loadComponent('user/UserLogin');

                }
            },
            onSave: function (event) {
                console.log(event);
//                if (event.status == "success") {
//                    setTimeout(function () {
//                        location.reload();
//                    }, 0 * 1000);
//                }
            },
            onSubmit: function (form, formObj) {
                w2utils.settings.dataType = 'HTTP';
                $.extend(formObj.postData, formObj.postData.record);
            }
        };
    }
}
