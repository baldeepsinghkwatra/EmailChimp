EmailChimp.view('ComposeForm',
        {
            getLayout: function () {
                return {
                    view: "form",
                    borderless: true,
                    elements: [
                        {
                            view: "text",
                            label: 'To :',
                            name: "login"
                        }, {
                            view: "text",
                            label: 'Subject :',
                            name: "email"
                        },
//            {view:"iframe", id:"frame-body", height: 100, src:"http://fontawesome.io/icon/times-circle/"},
                        {
                            id: 'editor',
                            view: "ckeditor",
                            name: "editor",
                            height: 200,
                            label: 'editor'
                        },
                        {
                            view: "uploader", upload: "php/upload.php",
                            id: "upl1", name: "files",
                            value: "Add documents",
                            link: "doclist", autosend: false
                        },
                        {view: "list", scroll: true, id: "doclist", type: "uploader", height: 80},
                        {
                            view: "button",
                            value: "Send",
                            click: function () {
                                if (this.getParentView().validate()) { //validate form
                                    webix.message("All is correct");
                                    this.getTopParentView().hide(); //hide window
                                } else
                                    webix.message({type: "error", text: "Form data is invalid"});
                            }
                        }
                    ],
                    rules: {
                        "email": webix.rules.isEmail,
                        "login": webix.rules.isNotEmpty
                    },
                    elementsConfig: {
                        labelPosition: "top",
                    }
                }
            }
        });