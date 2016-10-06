/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
    $('#form').w2form({ 
        name   : 'form',
        header : 'Auto-Generated Form',
        url    : 'checkLogin',
        fields : [
            { field: 'email', type: 'text', required: true, html: { caption: 'Email', attr: 'style="width: 300px"' } },
            { field: 'password',  type: 'password', required: true, html: { caption: 'Password', attr: 'style="width: 300px"' } }           
        ],
        actions: {
            'Save': function (event) {
                console.log('save', event);
                this.save();
                setTimeout(function () { 
                    location.reload();
                  }, 3 * 1000);
            },
            'Clear': function (event) {
                console.log('clear', event);
                this.clear();
            }
        },
        onSubmit: function(form, formObj){
            $.extend(formObj.postData, formObj.postData.record);
        }
    });
});
