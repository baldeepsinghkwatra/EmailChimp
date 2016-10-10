/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var EmailChimp = {
    conf:{
        headerPanel : true,
        LeftPanel : true,
        toolbar : true
    },
    init: function () {
        this.setLayoutContainerHeight();
        $(window).resize(this.setLayoutContainerHeight);
        this.w2uiConf();
        this.createLayout();
        this.initializePanel();
    },
    w2uiConf: function () {
        w2utils.settings.dataType = 'JSON';
    },
    setLayoutContainerHeight: function () {

        var y = $('#layout-container').position().top;
        var layoutHeight = $(window).height() - y - 10;
        $('#layout-container').css('height', layoutHeight + 'px');
    },
    createLayout: function () {
        $('#layout').w2layout({
            name: 'layout',
            panels: [
                {type: 'top', size: 100, resizable: false, style: StyleConstant.layout},
                {type: 'left', size: 200, resizable: false, style: StyleConstant.layout},
                {type: 'main', resizable: true, style: StyleConstant.layout, content: 'main', title: 'Outbox'},
                {type: 'bottom', size: 30, resizable: false, style: StyleConstant.layout},
            ]
        });
    },
    initializePanel: function () {
        Object.create(HeaderPanel).init();
        Object.create(LeftPanel).init();
        Object.create(FooterPanel).init();
    },
    openPopUp: function (conf, callback) {
        $().w2popup('open', this.getPopup(conf, callback));
    },
    getPopup: function (conf, callback) {
        var title = "Title";
        var width = 700;
        var height = 610;
        var name = "form";
        if (conf != undefined) {
            if (conf.title != undefined)
                title = conf.title;
            if (conf.width != undefined)
                width = conf.width;
            if (conf.height != undefined)
                height = conf.height;
            if (conf.name != undefined)
                name = conf.name;
        }
        return {
            title: title,
            name: name,
            body: '<div id="popup" style="width: 100%; height: 100%;"></div>',
            style: 'padding: 15px 0px 0px 0px',
            width: width,
            height: height,
            showMax: true,
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui[this.get().name ].resize();
                };
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    callback();
                };
            }
        };
    },
    loadComponent: function (package,component) {

        if(window[component] == undefined){
            $.getScript('resources/js/app/'+package+'/'+component+'.js', function () {
                    window[component].init();
                });
        }else{
             window[component].init();
        }
    }

}