/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var LeftPanel = {
    init: function () {
        this.initialize();
    },
    initialize: function () {

        w2ui.layout.content('left', $().w2layout(this.getSideLayout()));
        w2ui.layout.get('left').content.content('main', $().w2sidebar(this.getLeftMenu()));
        w2ui['sidebar'].on('render', function (event) {
            $(".hideButton").click(LeftPanel.hide);
            $(".showButton").click(LeftPanel.show);
        });
    },
    getSideLayout: function () {
        return{
            name: 'sideLayout',
            panels: [
                {
                    type: 'left',
                    size: 30,
                    resizable: false,
                    hidden: true,
                    style: StyleConstant.slideBar,
                    content: '<a href="#" class="rotate  showButton">Menu<img src=""></a>'
                },
                {
                    type: 'main', size: 200,
                    resizable: false,
                    title: '<div class="null">Menu<a href="#" class="hideButton" style="float: right;">\n\
                                        <img src="resources/images/navigate_left.png" height="20px"></a></div>'
                }
            ]
        };
    },
    getLeftMenu: function () {
        return {
            name: 'sidebar',
            nodes: [
                {
                    id: 'general',
                    text: 'Mail Box',
                    group: true,
                    expanded: true,
                    nodes: [
                        {
                            id: 'n1',
                            text: 'Outbox',
                            selected: true
                        },
                        {
                            id: 'n2',
                            text: 'Compose Mail'
                        },
                        {
                            id: 'n3',
                            text: 'Sent Mail'
                        }
                    ]
                }
            ],
            onClick: function(event) {
                    if(event.target == "n2"){
                        EmailChimp.loadComponent('admin','SendMail');
                       
                    }
            }
        };
    },
    hide: function () {

        w2ui.layout.get('left').content.hide("main", "sidebar", true);
        w2ui.layout.get('left').content.show("left", "", true);
        w2ui.layout.sizeTo('left', 30);
    },
    show: function () {
        w2ui.layout.get('left').content.show("main", "sidebar", true);
        w2ui.layout.get('left').content.hide("left", "", true);
        w2ui.layout.sizeTo('left', 200);
    }
}
