var EmailChimp = {
    controllers: {},
    views: {},
    apps: {},
    models: {},
    components: {},
    component: function (name, obj) {
        this.components[name] = obj;
    },
    controller: function (name, obj) {

        this.controllers[name] = obj;

        this.load(obj.component, function () {
            EmailChimp.controllers[name].init();
        });

    },
    app: function (name, obj) {

        this.app = obj;

        this.load(obj.component, function () {
            EmailChimp.app.init();
        });

    },
    view: function (name, obj) {
        this.views[name] = obj;

    },
    model: function (name, obj) {
        this.models[name] = obj;

    },
    load: function (views, callback) {

        if (views != undefined) {
            require(views, function () {
                if (callback != undefined)
                    callback();
            });

        } else {
            if (callback != undefined)
                callback();
        }

    },
    loadController: function (controller, callback) {
        if (EmailChimp.controllers[controller] == undefined) {
            this.load(['controllers/' + controller], callback);

        } else {
            EmailChimp.controllers[controller].init();
        }
    },
    getPopupToolbar : function(label){
    	return{
            view: "toolbar",
            cols: [{
                    view: "label",
                    label: label
                }, {
                    view: "button",
                    label: 'X',
                    width: 30,
                    align: 'right',
                    click: function(a, b,c){
                    	this.getTopParentView().close();
                    }
                }]
        };
    },
    htmlEncode : function ( html ) {
        return document.createElement( 'a' ).appendChild( 
            document.createTextNode( html ) ).parentNode.innerHTML;
    }

};