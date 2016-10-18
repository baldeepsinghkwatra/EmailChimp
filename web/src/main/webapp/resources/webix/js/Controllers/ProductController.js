define(['Views/product/ProductGrid'], function (productGrid) {
    return{
        init: function () {
          $$("content").removeView('main');
          $$("content").addView(productGrid,1);
          $$("mainLayout").resize();

        }
    }

});