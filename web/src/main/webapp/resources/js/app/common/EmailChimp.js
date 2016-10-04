/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var EmailChimp = {
    init: function () {
        this.setLayoutContainerHeight();
        $(window).resize(this.setLayoutContainerHeight);
        this.createLayout();
        this.initializePanel();
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
    }

}
