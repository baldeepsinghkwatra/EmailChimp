/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var HeaderPanel = {
    init: function () {

        this.initialize();
    },
    initialize: function () {
        w2ui.layout.content('top', $().w2layout(this.getHeaderLayout()));
        w2ui.layout.get('top').content.content('bottom', $().w2toolbar(this.getToolbar()));
    },
    getToolbar: function () {
        return {
            name: 'toolbar',
            items: [
                {
                    type: 'menu',
                    id: 'item2',
                    caption: 'Menu',
                    items: [
                        {
                            text: 'Item 1',
                            icon: 'fa-camera'
                        },
                        {
                            text: 'Item 2',
                            icon: 'fa-picture'
                        },
                        {
                            text: 'Item 3',
                            icon: 'fa-glass'
                        }
                    ]},
                {
                    type: 'menu',
                    id: 'item3',
                    caption: 'Menu',
                }, {
                    type: 'menu',
                    id: 'item4',
                    caption: 'Menu',
                },
                {
                    type: 'spacer'
                },
                {
                    type: 'button',
                    id: 'item7',
                    caption: 'Logout'
                }

            ]
        };
    },
    getHeaderLayout: function () {
        return {
            name: 'headerLayout',
            panels: [
                {
                    type: 'main',
                    resizable: false,
                    content: '<img src="resources/images/emailchimp-icon.png" height="60px" >\n\
                                <div style ="font-size: 29px;color: #1e83c9;margin-top: -45px;margin-left: 66px;padding-bottom: 5px;"> EMAIL CHIMP</div>'

                },
                {
                    type: 'bottom',
                    size: 35,
                    resizable: false,
                    style: "padding: 4px; border: 1px solid silver; border-radius: 3px;"
                }

            ]

        };
    }
}

