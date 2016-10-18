
require(['Views/common/MainToolbar', 
    'Views/common/SideMenu',
    'Router'],
   function (mainToolbar,sideMenu,router) {

    var layout = {
        id:"mainLayout",
        rows: [
            mainToolbar,
            {
                id:"content",
                cols: [
                    sideMenu
                ]
            }
        ]
    };
    webix.ui(layout).show();

     router.startRouting(); 
});