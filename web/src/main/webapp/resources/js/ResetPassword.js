EmailChimp.app('ResetPassword', {
    component: ['views/user/ResetPasswordView'],
    init: function () {
        
        this.showView();
        this.bindEvents();
    },
    submitForm: function () {
        $$('resetPswd').callEvent("onSubmit");
    },
    bindEvents: function () {
        var form = $$('resetPswd');
        form.attachEvent("onSubmit", function () {
                if (form.validate()) {
                    $$("submitButton").disable();
                    webix.ajax().post("change-password", form.getValues(), function (text, xml, xhr) {
                        var color = 'red';
                        if (xhr.status === 200) {
                            color = 'green';
                        }
                        $$("responseMessage").define({label: "<span style=\"color:" + color + "\">" + text + "</span>", css: "lines"});
                        $$('responseMessage').refresh();
                    });
                    $$("submitButton").enable();
                    form.clear();
                }
            });
    },
    showView: function() {
        var username =  document.getElementById("username").innerHTML;
        var useremail = document.getElementById("useremail").innerHTML;
        var fgtpswdcode = document.getElementById("fgtpswdcode").innerHTML;
            
        var layout = {
            id: "mainLayout",
            type: 'clean',
            cols: [
                {
                },{
                    id: 'main',
                    rows: [{},EmailChimp.views.ResetPasswordView.getLayout(),{}]
                },{
                 }
            ]
        };
        webix.ui(layout).show();
    }
});
