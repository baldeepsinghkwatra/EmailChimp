/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ResetPassword = {
    init: function () {
        if (w2ui.resetPassword == undefined) {
            $().w2form(this.getResetPasswordForm())
        }

        w2ui.layout.content('main', w2ui.resetPassword);
    },
    getResetPasswordForm: function () {
        return {
            name: 'resetPassword',
            header: 'Change Password',
            style: 'width: 450px;height:220px;left: 30%;top: 25%;',
//            url: 'checkLogin',
            fields: [
                {field: 'pswd', type: 'password', required: true, html: {caption: 'Password', attr: 'style="width: 200px"'}},
                {field: 'confirmPswd', type: 'password', required: true, html: {caption: 'Confirm Password', attr: 'style="width: 200px"'}}
            ],
            actions: {
                'Submit': function (event) {
                    this.save();
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
