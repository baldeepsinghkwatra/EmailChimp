/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SendMail = {
    init: function () {
        if (w2ui.sendMailForm == undefined) {
            $().w2form(this.getSendMailForm());
        }

        EmailChimp.openPopUp({
            title: 'Send Mail',
            name: 'sendMailForm'
        }, this.loadCkEditor);

    },
    loadCkEditor: function () {
        $('#w2ui-popup #popup').w2render('sendMailForm');

        CKEDITOR.config.width = "90%";
        CKEDITOR.config.height = "200";
        CKEDITOR.plugins.addExternal('timestamp',
                'http://sdk.ckeditor.com/samples/assets/plugins/timestamp/', 'plugin.js');

        CKEDITOR.replace('Message', {
            extraPlugins: 'timestamp'
        });
    },
    getSendMailForm: function () {
        return {
            name: 'sendMailForm',
            style: 'border: 0px; background-color: transparent;',
            url: 'sendMail',
            fields: [
                {
                    field: 'To',
                    type: 'email',
                    required: true,
                    html: {attr: 'style="width: 90%"'}
                },
                {
                    field: 'Subject',
                    type: 'text',
                    required: true,
                    html: {attr: 'style="width: 90%"'}
                },
                {
                    field: 'Message',
                    type: 'textarea'
                },
                {
                    field: 'Attachment',
                    type: 'file',
                    html: {attr: 'style="width: 90%"'}

                }
            ],
            actions: {
                save: function () {
                    this.save();
                },
                reset: function () {
                    this.clear();
                }
            },
            onValidate: function (event) {
                this.record.message = $('iframe').contents().find('body').html();
            }
        };
    }
};