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
                            view: "uploader", upload: "php/upload.php",
                            id: "upl1", name: "files",
                            value: "Add documents",
                            link: "doclist", autosend: false
                        },
                        {view: "list", scroll: true, id: "doclist", type: "uploader", height: 80},
                        {view: "label", height: 50,hidden:true, id: 'responseMessage', label: '<span style=color:red><c:out value="${messageDefault}"/></span>', align: "center"},
                        {
                            view: "button",
                            value: "Send",
                            click: function () {
                                if (this.getParentView().validate()) { //validate form
                                    webix.ajax().post("sendMail", $$('composeMail').getValues(), function (text, xml, xhr) {
                                        var color = 'red';
                                        if (xhr.status === 200) {
                                            color = 'green';
                                        }
                                        webix.delay(function () {
                                            grid.parse(EmailChimp.models.MailModal.getCampaign());
                                            grid.hideProgress();
                                        }, null, null, 50);
                                        $$("responseMessage").show();
                                        $$("responseMessage").setHTML("<span style=\"color:" + color + "\">" + text + "</span>");
                                    })
                                } else
                                    webix.message({type: "error", text: "Form data is invalid"});
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