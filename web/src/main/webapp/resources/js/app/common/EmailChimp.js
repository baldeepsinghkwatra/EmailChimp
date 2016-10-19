/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var EmailChimp = {
    conf: {
        headerPanel: true,
        LeftPanel: true,
        toolbar: true
    },
    init: function () {
        this.setLayoutContainerHeight();
        $(window).resize(this.setLayoutContainerHeight);
        this.w2uiConf();
        this.createLayout();
        this.initializePanel();
        this.registerHashChange();
    },
    configure: function (conf) {
        if (!conf.popUp) {
            w2popup.close();
        } else {
            w2ui.layout.get('main').title = conf.title;
        }
        w2ui.sidebar.select(conf.sideBar);
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
                {
                    type: 'top', 
                    size: 100, 
                    resizable: false, 
                    style: StyleConstant.layout
                },
                {
                    type: 'left', 
                    size: 200, 
                    resizable: false, 
                    style: StyleConstant.layout
                },
                {
                    type: 'main', 
                    resizable: true, 
                    style: StyleConstant.layout                    
                },
                {
                    type: 'bottom', 
                    size: 30, 
                    resizable: false, 
                    style: StyleConstant.layout
                }
            ]
        });
    },
    initializePanel: function () {

        if(!EmailChimp.conf.headerPanel){
            w2ui['layout'].get('main').title = '';
            w2ui['layout'].hide('top',true);
        }
        else{
            HeaderPanel.init();
        }
        
        if(!EmailChimp.conf.LeftPanel){
            w2ui['layout'].hide('left',true);
        }else {
            LeftPanel.init();
             
        }
        if(!EmailChimp.conf.toolbar){
            w2ui['layout'].hide('bottom',true);
        }else {
            FooterPanel.init();
        }

    },
    openPopUp: function (conf, callback) {
        $().w2popup('open', this.getPopup(conf, callback));
    },
    getPopup: function (conf, callback) {
        var title = "Title";
        var width = 700;
        var height = 610;
        var name = "form";
        var showMax = false;
        if (conf !== undefined) {
            if (conf.title !== undefined)
                title = conf.title;
            if (conf.width !== undefined)
                width = conf.width;
            if (conf.height !== undefined)
                height = conf.height;
            if (conf.name !== undefined)
                name = conf.name;
            if (conf.showMax !== undefined)
                showMax = conf.showMax;
        }
        return {
            title: title,
            name: name,
            body: '<div id="popup" style="width: 100%; height: 100%;"></div>',
            style: 'padding: 15px 0px 0px 0px',
            width: width,
            height: height,
            showMax: showMax, 
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui[this.get().name].resize();
                };
            },
            onOpen: function (event) {
                event.onComplete = function () {
                    callback();
                };
            }
        };
    },
    loadComponent: function (component) {
        
        window.location.hash = component;

        var package = component.substr(0, component.lastIndexOf("/"));
        component = component.substr(component.lastIndexOf("/") + 1, component.length);

        if (window[component] === undefined) {
            $.getScript('resources/js/app/' + package + '/' + component + '.js', function () {
                window[component].init();
            });
        } else {
            window[component].init();
        }
    },
    registerHashChange: function () {
        if (("onhashchange" in window)) {

            //modern browsers 
            $(window).bind('hashchange', function () {
                var hash = window.location.hash.replace(/^#/, '');
                EmailChimp.loadComponent(hash);

            });

        } else {

            //IE and browsers that don't support hashchange
            $('a.hash-changer').bind('click', function () {
                var hash = $(this).attr('href').replace(/^#/, '');
                EmailChimp.loadComponent(hash);
            });

        }
    }


}
