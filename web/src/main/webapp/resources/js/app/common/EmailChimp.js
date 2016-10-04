/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function openPopup () {
                if (!w2ui.foo) {
                    $().w2form({
                        name: 'foo',
                        style: 'border: 0px; background-color: transparent;',
                        url: 'sendMail',
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
                            { field: 'to', type: 'email', required: true },
                            { field: 'subject', type: 'text', required: true },
                            { field: 'message', type: 'textarea', html: { caption: 'Message', attr: 'style="width: 300px; height: 90px"' } },
                            { field: 'file', type: 'file' }
                        ],
                        record: { 
                            to    : 'anshulgupta231193@gmail.com',
                            subject     : 'Anshul',
                            message : 'HI'
                        },
                        actions: {
                            "save": function () {  this.save(); },
                            "reset": function () { this.clear(); }
                        },
                        onValidate: function(event) {
                            console.log(event);
//                            this.cmd = "true";
                            w2utils.settings.dataType = 'JSON';
                            this.record.message=$('iframe').contents().find('body').html();
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

                            CKEDITOR.replace( 'message', {
                                    extraPlugins: 'timestamp'
                            } );
                        };
                    }
                });
    
            } 

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
