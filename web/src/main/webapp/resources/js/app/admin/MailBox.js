/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var MailBox = {
    init: function () {
        this.initialize();
    },
    initialize: function () {
        w2ui.layout.content('main', $().w2grid(this.getOutboxGrid()));
    },
    getOutboxGrid: function () {
        return {
            name: 'grid',
            msgNotJSON: 'Give me JSON!',
            url: 'resources/test/jsonMail.txt',
            method: 'GET',
            show: {
                footer: true,
                toolbar: true
            },
            columns: [
                {
                    field: 'id',
                    caption: 'id',
                    size: '50px',
                    sortable: true,
                    resizable: true
                },
                {
                    field: 'Name',
                    caption: 'Product',
                    size: '100%',
                    sortable: true,
                    searchable: 'text',
                    resizable: true
                }

            ]

        };
    }
}