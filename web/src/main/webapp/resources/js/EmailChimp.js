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
    },
    checkDate: function (str) {
                var matches = str.match(/(\d{1,2})[- \/](\d{1,2})[- \/](\d{4})/);
                if (!matches)
                    return;

                // parse each piece and see if it makes a valid date object
                var month = parseInt(matches[1], 10);
                var day = parseInt(matches[2], 10);
                var year = parseInt(matches[3], 10);
                var date = new Date(year, month - 1, day);
                if (!date || !date.getTime())
                    return;

                // make sure we have no funny rollovers that the date object sometimes accepts
                // month > 12, day > what's allowed for the month
                if (date.getMonth() + 1 != month ||
                        date.getFullYear() != year ||
                        date.getDate() != day) {
                    return;
                }
                return(date);
            }

};