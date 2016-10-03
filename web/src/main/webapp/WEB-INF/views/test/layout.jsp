<%-- 
    Document   : layout
    Created on : 27 Sep, 2016, 1:04:40 AM
    Author     : anshul
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" type="text/css" href="http://w2ui.com/src/w2ui-1.4.2.min.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
        <script type="text/javascript" src="http://w2ui.com/src/w2ui-1.4.2.min.js"></script>
        <script src="http://cdn.ckeditor.com/4.5.11/standard-all/ckeditor.js"></script>
    </head>
    <body>
        <div id="layout" style="width: 1500px; height: 600px;"></div>
<br>
        <input type="checkbox" id="instant" onclick="window.instant = this.checked;"> <label for="instant">Instant</label>
        <div style="height: 10px;"></div>
        <input type="button" value="Top" onclick="w2ui['layout'].toggle('top', window.instant)" style="width: 60px">
        <input type="button" value="Left" onclick="w2ui['layout'].toggle('left', window.instant)" style="width: 60px">
        <input type="button" value="Right" onclick="w2ui['layout'].toggle('right', window.instant)" style="width: 60px">
        <input type="button" value="Preview" onclick="w2ui['layout'].toggle('preview', window.instant)" style="width: 60px">
        <input type="button" value="Bottom" onclick="w2ui['layout'].toggle('bottom', window.instant)" style="width: 60px">
        
        <script type="text/javascript">
            function setLayoutContainerHeight()
            {
                // Get top position of layout container, subtract from screen height, subtract a bit for padding
                var y = $('#layout-container').position().top;
                var layoutHeight = $(window).height() - y - 10;
                $('#layout-container').css('height', layoutHeight + 'px');
            }
            
           function openPopup () {
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
    
            } 

           function slideAway( layout, panelName, minSize )
            {
                var panel = layout.get(panelName);

                // Install slide-away properties
                panel._hidden  = false;
                panel._minSize = minSize;
                panel._maxSize = panel.size;

                // Install the slide-away button and wrap the original content
                var mainContent = layout.content(panelName);

                // Replace the original panel content with a top/main layout
                // Put the original content in the nested main, and the slide button
                // in the nested top
                // FIXME: name needs to be guaranteed unique if more than one panel being
                // slide away
                layout.content( panelName,$().w2layout({
                        name:    "slideAwayLayout",
                        panels:  [{type:'top', size:20 },{type:'main'}]
                    })
                );

                // FIXME: Use proper images for < and > button, perhaps Font Awesome
                // FIXME: Buttons should probably be pins so that they don't imply a direction
                w2ui.slideAwayLayout.content('top', '<a href="#" class="slideAwayButton">Menu <</a>');
                w2ui.slideAwayLayout.content('main', mainContent);

                // The click handler. Refers to itself, so stored in local var
                var onClick = function() {
                    var size  = panel._hidden ? panel._maxSize : panel._minSize;
                    alert(panel._hidden);
                    panel._hidden = !panel._hidden;

                    if (!panel._hidden) {
                       // w2ui.slideAwayLayout.show( "main", "slideAwayLayout", true );
                    }

                    // Show or hide the main content
                    layout.sizeTo(panelName, size);

                    // If we don't have this, the DOM gets overwritten by the sizeTo.
                    // Looking at the w2ui source, we might get an onRefresh event after
                    // the sizeTo animation.
                    setTimeout(function () { 
                            
                            alert(1);
                            // Change the button (see FIXME above)
                            $( ".slideAwayButton" ).html( panel._hidden ? ">" : "<" );

                            // Reinstall the click handler
                            $( ".slideAwayButton" ).click( onClick );

                            // Show/Hide the main content            
                            if (panel._hidden) {
                                w2ui.slideAwayLayout.hide( "main", "slideAwayLayout", true );
                            }
                            else {
                                w2ui.slideAwayLayout.show( "main", "slideAwayLayout", true );
                            }
                        },
                        0 );
                };

                // Wait for first click
                $( ".slideAwayButton" ).click(onClick);
            }

            $(function () {	
                    var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
                $('#layout').w2layout({
                            name: 'layout',
                            panels: [
                                    { type: 'top', size: 50, resizable: true, style: pstyle, content: '<div id="toolbar" style="padding: 4px; border: 1px solid silver; border-radius: 3px"></div>' },
                                    { type: 'left', size: 200, resizable: true, style: pstyle, content: 'Menu' },
                                    { type: 'main', style: pstyle, content: '<div id="main" style="width: 1200px; height: 500px;"></div>' },
                                    { type: 'preview', size: '50%', resizable: true, hidden: true, style: pstyle, content: 'preview' },
                                    { type: 'right', size: 200, resizable: true, hidden: true, style: pstyle, content: 'right' },
                                    { type: 'bottom', size: 50, resizable: true, hidden: true, style: pstyle, content: 'bottom' }
                            ]
                    });

                var config = {
                    sidebar: {
                        name: 'sidebar',
                        nodes: [ 
                            { id: 'general', text: 'General', group: true, expanded: true, nodes: [
                                { id: 'n1', text: 'Outbox', img: 'icon-page', selected: true },
                                { id: 'n2', text: 'Compose Mail', img: 'icon-page' },
                                { id: 'n3', text: 'Sent Mail', img: 'icon-page' }
                            ]}
                        ],
                        onClick: function(event) {
                           if(event.target == "n2"){
                               openPopup();
                           }
                        }
                    },
                    favs: {
                        name: 'favorites',
                        nodes: [ 
                            { id: 'general', text: 'Favorites', group: true, expanded: true, nodes: [
                                { id: 'n1', text: 'Task 100', img: 'icon-page', selected: true },
                                { id: 'n2', text: 'Task 114', img: 'icon-page' },
                                { id: 'n3', text: 'Task 249', img: 'icon-page' }
                            ]}
                        ],
                    },
                            grid: { 
                                    name: 'grid',
                                    url : 'resources/test/jsonMail.txt',
                                    method : 'GET',
                                    show: { 
                                            footer	: true,
                                            toolbar	: true,
                                            toolbarEdit: true,
                                            expandColumn: true,
                                            selectColumn: true

                                    },
                                    columns: [				
                                            { field: 'id', caption: 'id', size: '50px', sortable: true, resizable: true },

                                            { field: 'Name', caption: 'Produkt', size: '140px', sortable: true, searchable: 'text', resizable: true }

                                    ],
//                                    records: [
//                                        { recid: 1, id: 1, Name: 'Anshul'},
//                                        { recid: 2, id: 2, Name: 'Nishant'}
//                                   ],
                                    onLoad: function(event) {
                                            var jsonStatus = event.xhr.responseText;
                                            var status = JSON.parse(jsonStatus);
                                            if(status.status == "error") {
                                                w2alert(status.status);
                                            }
                                    }, 
                                    onError: function(target, eventData) {
                                        console.log(eventData);
                                        w2ui['grid'].error('Some error.');
                                    },
                                    onEdit: function (event) {
                                            w2alert('edit');
                                    },
                                    onExpand: function (event) {
                                            $('#'+event.box_id).html('<div style="padding: 10px">Expanded content</div>').animate({ 'height': 100 }, 100);
                                    }
                            }
                            

                };
                    function refreshGrid(auto) {
                            w2ui.grid.autoLoad = auto;
                            w2ui.grid.skip(0);
                    }


                w2ui.layout.content('left', $().w2sidebar(config.sidebar));
                w2ui.layout.content('right', $().w2sidebar(config.favs));

                $('#toolbar').w2toolbar({
                            name: 'toolbar',
                            items: [
                                    { type: 'html',  id: 'item6',
                                            html: '<div style="padding: 3px 10px;">'+
                                                      ' Aufgabe Suchen:'+
                                                      '	<input size="20" style="padding: 3px; border-radius: 2px; border: 1px solid silver"/>'+
                                                      '</div>' 
                                    },
                        { type: 'check',  id: 'item1', caption: 'Check', icon: 'fa-check', checked: true },
                                    { type: 'break',  id: 'break0' },
                                    { type: 'menu',   id: 'item2', caption: 'Menu', icon: 'fa-table', items: [
                                            { text: 'Item 1', icon: 'fa-camera' }, 
                                            { text: 'Item 2', icon: 'fa-picture' }, 
                                            { text: 'Item 3', icon: 'fa-glass' }
                                    ]},
                                    { type: 'break', id: 'break1' },
                                    { type: 'radio',  id: 'item3',  group: '1', caption: 'Radio 1', icon: 'fa-star', checked: true },
                                    { type: 'radio',  id: 'item4',  group: '1', caption: 'Radio 2', icon: 'fa-heart' },
                                    { type: 'break', id: 'break2' },
                                    { type: 'drop',  id: 'item5', caption: 'Drop Down', icon: 'fa-plus', html: '<div style="padding: 10px">Drop down</div>' },
                                    { type: 'break', id: 'break3' },

                                    { type: 'spacer' },
                                    { type: 'button',  id: 'item7',  caption: 'Item 5', icon: 'fa-flag' }
                            ]
                    });



                    $('#main').w2grid(config.grid);

                    w2ui.toolbar.on('*', function (event) { 
                            console.log('EVENT: '+ event.type + ' TARGET: '+ event.target, event);
                    });



                // Enable slide-away for left panel
                // Try commenting this out, the GUI should look the same except it doesn't have
                // the slideAway button.
                slideAway( w2ui.layout, 'left', 30 );
            });

        </script>
        
    </body>
</html>
