/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var FooterPanel = {
    init: function () {
        this.initialize();
    },
    initialize: function () {
        w2ui.layout.content('bottom', this.getFooter());
    },
    getFooter: function () {
        return'<div style="padding:5px">Hello : Jaspreet</div>';

    }
}
