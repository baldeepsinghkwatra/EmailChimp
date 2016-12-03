EmailChimp.view('ComposeForm',
        {
            getLayout: function () {
                return {
                    view: "form",
                    id: "composeMail",
                    borderless: true,
                    elements: [
                        {
                            view: "text",
                            label: 'To :',
                            name: "to"
                        }, {
                            view: "text",
                            label: 'Subject :',
                            name: "subject"
                        },
//            {view:"iframe", id:"frame-body", height: 100, src:"http://fontawesome.io/icon/times-circle/"},
                        {
                            id: 'editor',
                            view: "ckeditor",
                            name: "message",
                            height: 200,
                            value: "",
                            label: 'editor',
                            required: true
                        },
                        {
                            view: "uploader", upload: "upload",
                            id: "upl1", name: "files",
                            value: "Add documents",
                            link: "doclist"
                        },
                        {view: "list", scroll: true, id: "doclist", type: "uploader", autoheight: true},
                        {view: "label", height: 50,hidden:true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Send",
                            click: function() {
//                                //send files to server side
                                var formValues = this.getParentView().getValues();
                                
                                var attachmentList = new Array();
                                var order = $$("upl1").files.data.order;
                                for (var i=0; i<order.length; i++){
                                    attachmentList[i] = $$("upl1").files.getItem(order[i]);
                                    delete attachmentList[i]["file"];
                                    delete attachmentList[i]["percent"];
                                    delete attachmentList[i]["progress"];
                                    delete attachmentList[i]["size"];
                                    delete attachmentList[i]["sizetext"];
                                    delete attachmentList[i]["status"];
                                    delete attachmentList[i]["type"];
                                    delete attachmentList[i]["id"];
                                }
                                console.log(JSON.parse(JSON.stringify(attachmentList)));
                                if($$("composeMail").validate()){
                                    $$("composeMail").setValues({
                                        to: formValues.to,
                                        subject: formValues.subject,
                                        files: formValues.files,
                                        attachments: JSON.parse(JSON.stringify(attachmentList))
                                    });
                                    webix.ajax().post("sendMail", $$('composeMail').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        var grid = $$("sentMailGrid");
                                        grid.clearAll();
                                        grid.showProgress();
                                        $$("win2").close();
                                        webix.delay(function () {
                                            grid.parse(EmailChimp.models.MailModal.getAll());
                                            grid.hideProgress();
                                        }, null, null, 50);
                                        $$('composeMail').clear();
                                        $$("responseMessage").show();
                                        $$("responseMessage").setHTML("<span style=\"color:" + color + "\">" + text + "</span>");
                                        $$('responseMessage').refresh();
                                    });

                                }
                            }
                        }
                    ],
                    rules: {
                        "to": webix.rules.isEmail,
                        "subject": webix.rules.isNotEmpty,
                        "message": webix.rules.isNotEmpty
                    },
                    elementsConfig: {
                        labelPosition: "top"
                    }
                }
            }
        });