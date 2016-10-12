/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var UserRegistration = {
    init: function () {
        if (w2ui.userRegistration == undefined) {
            $().w2form(this.getSignUpForm());
        }

        w2ui.layout.content('main', w2ui.userRegistration);

    },
    getSignUpForm: function () {
        return {
            name: 'userRegistration',
            header: 'Registration',
            style: 'width: 450px;height:250px;left: 30%;top: 25%;',
            url: 'registerConsumer',
            fields: [
                {field: 'userName', type: 'text', required: true, html: {caption: 'Full Name', attr: 'style="width: 200px"'}},
                {field: 'userEmail', type: 'email', required: true, html: {caption: 'Email', attr: 'style="width: 200px"'}},
                {field: 'userPassword', type: 'password', required: true, html: {caption: 'Password', attr: 'style="width: 200px"'}},
                {field: 'userMobile', type: 'number', required: true, html: {caption: 'Contact No.', attr: 'style="width: 200px"'}}
            ],
            actions: {
                "register": function () {
                    this.save();
                },
                "Login": function () {
                     EmailChimp.loadComponent('user/UserLogin');

                }
            },
            onSave: function (event) {
                console.log(event);
                if (event.status == "success") {
                    setTimeout(function () {
                        location.reload();
                    }, 0 * 1000);
                }
            },
            onSubmit: function (form, formObj) {
                w2utils.settings.dataType = 'JSON';
            }
        };
    }
}
 