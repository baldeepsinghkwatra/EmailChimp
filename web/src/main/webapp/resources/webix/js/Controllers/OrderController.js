define(['Views/order/OrderGrid'], function (orderGrid) {
    return{
        init: function () {
          $$("content").removeView('main');
          $$("content").addView(orderGrid,1);
          $$("mainLayout").resize();
        }
    }

});