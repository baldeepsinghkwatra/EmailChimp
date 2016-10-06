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
            { field: 'email', type: 'text', required: true, html: { caption: 'Email', attr: 'style="width: 200px"' } },
            { field: 'password',  type: 'password', required: true, html: { caption: 'Password', attr: 'style="width: 200px"' } }           
        ],
        actions: {
            'Save': function (event) {
                console.log('save');
                this.save();
                
//                setTimeout(function () { 
////                    location.reload();
////                  }, 0 * 1000);
            },
            'Clear': function (event) {
                console.log('clear', event);
                this.clear();
            }
        },
        onSave: function(event) {
            console.log(event);
            if(event.status == "success") {
                setTimeout(function () { 
                    location.reload();
                  }, 0 * 1000);
            }
        },
        onSubmit: function(form, formObj){
            $.extend(formObj.postData, formObj.postData.record);
        }
    });
});
