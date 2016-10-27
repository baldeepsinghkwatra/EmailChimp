
EmailChimp.component('Router', {
    routes: [
        {hash: '#sentMail', controller: 'SentMailController'},
        {hash: '#outbox', controller: 'OutBoxController'},
        {hash: '#forgotPassword', controller: 'ForgotPasswordController'}

    ],
    defaultRoute: '#sentMail',
    currentHash: '',
    startRouting: function () {
        window.location.hash = window.location.hash || this.defaultRoute;
        setInterval(this.hashCheck, 100);
    },
    hashCheck: function () {

        var router = EmailChimp.components.Router;
        if (window.location.hash != router.currentHash) {

            for (var i = 0, currentRoute; currentRoute = router.routes[i++]; ) {

                if (window.location.hash == currentRoute.hash)
                    EmailChimp.loadController(currentRoute.controller);
            }
            router.currentHash = window.location.hash;
        }
    }

});