EmailChimp.app('ResetPassword', {
    component: ['views/user/ResetPasswordView'],
    init: function () {
        
        this.showView();
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
