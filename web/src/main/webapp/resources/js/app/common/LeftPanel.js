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
                    content: '<a href="#" class=" rotate  showButton " >Menu</a>'
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
                        console.log(event);
                        openPopup();
                    }
            }
        };
    },
    openPopup: function () {;
                if (!w2ui.foo) {
                    $().w2form({
                        name: 'foo',
                        style: 'border: 0px; background-color: transparent;',
                        url: 'server/post',
            //            formHTML: 
            //                '<div class="w2ui-page page-0">'+
            //                '    <div class="w2ui-field">'+
            //                '        <label>First Name:</label>'+
            //                '        <div>'+
            //                '           <input name="To" type="email" maxlength="100" style="width: 250px"/>'+
            //                '        </div>'+
            //                '    </div>'+
            //                '    <div class="w2ui-field">'+
            //                '        <label>Last Name:</label>'+
            //                '        <div>'+
            //                '            <input name="Subject" type="text" maxlength="100" style="width: 250px"/>'+
            //                '        </div>'+
            //                '    </div>'+
            //                '    <div class="w2ui-field">'+
            //                '        <label>Email:</label>'+
            //                '        <div>'+
            //                '            <textarea id="editor" name="Message" type="text" style="width: 385px; height: 80px; resize: none"></textarea>'+
            //                '        </div>'+
            //                '    </div>'+
            //                '</div>'+
            //                '<div class="w2ui-buttons">'+
            //                '    <button class="btn" name="reset">Reset</button>'+
            //                '    <button class="btn" name="save">Save</button>'+
            //                '</div>',
                        fields: [
                            { field: 'To', type: 'email', required: true },
                            { field: 'Subject', type: 'text', required: true },
                            { field: 'Message', type: 'textarea', html: { caption: 'Message', attr: 'style="width: 300px; height: 90px"' } },
                            { field: 'File', type: 'file' }
                        ],
            //            record: { 
            //                To    : 'jdoe@email.com',
            //                Subject     : 'Doe',
            //                Message : 'HI'
            //            },
                        actions: {
                            "save": function () {  this.save(); },
                            "reset": function () { this.clear(); }
                        },
                        onValidate: function(event) {
                          debugger;
                            console.log(event);
                            this.record.Message=$('iframe').contents().find('body').html();
                        }
                    });
                }
                $().w2popup('open', {
                    title   : 'Form in a Popup',
                    body    : '<div id="form" style="width: 100%; height: 100%;"></div>',
                    style   : 'padding: 15px 0px 0px 0px',
                    width   : 700,
                    height  : 500, 
                    showMax : true,
                    onToggle: function (event) {
                        $(w2ui.foo.box).hide();
                        event.onComplete = function () {
                            $(w2ui.foo.box).show();
                            w2ui.foo.resize();
                        };
                    },
                    onOpen: function (event) {
                        event.onComplete = function () {
                            // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                            $('#w2ui-popup #form').w2render('foo');
                            CKEDITOR.plugins.addExternal( 'timestamp', 'http://sdk.ckeditor.com/samples/assets/plugins/timestamp/', 'plugin.js' );

                            CKEDITOR.replace( 'Message', {
                                    extraPlugins: 'timestamp'
                            } );
                        };
                    }
                });
    
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
