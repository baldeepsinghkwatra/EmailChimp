
EmailChimp.component('Router', {
   
    currentHash: '',
    startRouting: function () {
        window.location.hash = window.location.hash || EmailChimp.app.defaultRoute;
        setInterval(this.hashCheck, 100);
    },
    hashCheck: function () {

        var router = EmailChimp.components.Router;
        var routes = EmailChimp.app.routes;
        if (window.location.hash !== router.currentHash) {

            for (var i = 0, currentRoute; currentRoute = routes[i++]; ) {

                if (window.location.hash == currentRoute.hash)
                    EmailChimp.loadController(currentRoute.controller);
            }
            router.currentHash = window.location.hash;
        }
    }

});