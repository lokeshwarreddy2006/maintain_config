sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    function (Controller, MessageBox, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("com.sap.pimd.maintainconfig.controller.View1", {
            onInit: function () {
                var oModel = this.getOwnerComponent().getModel();
                this.oDataModel = new sap.ui.model.odata.ODataModel(oModel.sServiceUrl);
                var oModel = new JSONModel();
                this.getView().setModel(oModel, "HomeModel");
            },
            // delete ISIC record
            onDeleteISIC: function () {
                this.getView().byId("idSmartTableISIC").setBusy(true);
                var oSelectedItems = this.getView().byId("TableISICId").getSelectedItems();
                var aBatchArray = [];
                for (var i = 0; i < oSelectedItems.length; i++) {
                    var oPayload = oSelectedItems[i].getBindingContext().getObject();
                    var oBatchOperation = this.oDataModel.createBatchOperation("/ISICCodeSet(Langu='" + oPayload.Langu + "',IsicCode='" + oPayload.IsicCode + "')", "DELETE");
                    aBatchArray.push(oBatchOperation);
                }
                this.oDataModel.addBatchChangeOperations(aBatchArray);
                this.oDataModel.submitBatch(function (oResult) {
                    this.getView().byId("idSmartTableISIC").setBusy(false);
                    try {
                        if (oResult.__batchResponses[0].__changeResponses[0].statusCode == '204' || oResult.__batchResponses[0].__changeResponses[0].statusCode == '200') {
                            MessageBox.success("Record deleted successfully");
                            this.getView().byId("TableISICId").removeSelections();
                            this.getView().byId("idSmartTableISIC").getModel().refresh();
                        }
                    } catch (err) { }
                    try {
                        if (oResult.__batchResponses[0].response.statusCode == '502' || oResult.__batchResponses[0].response.statusCode == '500' || oResult.__batchResponses[0].response.statusCode == '400' || oResult.__batchResponses[0].response.statusCode == '405') {
                            try {
                                var errRes = this.xmlToJson(oResult.__batchResponses[0].response.body)
                                MessageBox.error(errRes.error.message);
                            } catch (err) { MessageBox.error(oResult.__batchResponses[0].response.statusText); }
                        }
                    } catch (err) { }
                }.bind(this), function (oError) {
                    MessageBox.error("Batch error");
                    this.getView().byId("idSmartTableISIC").setBusy(false);
                }.bind(this));
            },
            // enable delete button for ISIC table
            onSelectionISICChange: function (oEvent) {
                // var oSelectedItems = oEvent.getSource().getSelectedItem().getBindingContext().getObject()
                var oSelectedItems = this.getView().byId("TableISICId").getSelectedItems();
                if (oSelectedItems.length > 0) {
                    this.getView().byId("idISICDelete").setEnabled(true);
                    this.getView().byId("idISICEdit").setEnabled(true);
                } else {
                    this.getView().byId("idISICDelete").setEnabled(false);
                    this.getView().byId("idISICEdit").setEnabled(false);
                }
            },
            onEditISICPress: function () {
                var oSelectedItems = this.getView().byId("TableISICId").getSelectedItems();
                if (oSelectedItems.length > 1) {
                    MessageBox.error("Select only one record to proceed.!");
                    return;
                }
                var oData = oSelectedItems[0].getBindingContext().getObject();
                this.onCreateISICPress(oData);
            },
            onEditSACCode: function () {
                var oSelectedItems = this.getView().byId("TableSId").getSelectedItems();
                if (oSelectedItems.length > 1) {
                    MessageBox.error("Select only one record to proceed.!");
                    return;
                }
                var oData = oSelectedItems[0].getBindingContext().getObject();
                this.onCreateSACCodePress(oData);
            },
            onEditSubCategory: function () {
                var oSelectedItems = this.getView().byId("TableSubCategoryId").getSelectedItems();
                if (oSelectedItems.length > 1) {
                    MessageBox.error("Select only one record to proceed.!");
                    return;
                }
                var oData = oSelectedItems[0].getBindingContext().getObject();
                this.onCreateSubCategoryPress(oData);
            },

            // delete SACCode record
            onDeleteSACCode: function () {
                this.getView().byId("idSmartTableSACCode").setBusy(true);
                var oSelectedItems = this.getView().byId("TableSId").getSelectedItems();
                var aBatchArray = [];
                for (var i = 0; i < oSelectedItems.length; i++) {
                    var oPayload = oSelectedItems[i].getBindingContext().getObject();
                    var oBatchOperation = this.oDataModel.createBatchOperation("/SACCodeSet(Langu='" + oPayload.Langu + "',SacCode='" + oPayload.SacCode + "')", "DELETE");
                    aBatchArray.push(oBatchOperation);
                }
                this.oDataModel.addBatchChangeOperations(aBatchArray);
                this.oDataModel.submitBatch(function (oResult) {
                    this.getView().byId("idSmartTableSACCode").setBusy(false);
                    try {
                        if (oResult.__batchResponses[0].__changeResponses[0].statusCode == '204' || oResult.__batchResponses[0].__changeResponses[0].statusCode == '200') {
                            MessageBox.success("Record deleted successfully");
                            this.getView().byId("TableSId").removeSelections();
                            this.getView().byId("idSmartTableSACCode").getModel().refresh();
                        }
                    } catch (err) { }
                    try {
                        if (oResult.__batchResponses[0].response.statusCode == '502' || oResult.__batchResponses[0].response.statusCode == '500' || oResult.__batchResponses[0].response.statusCode == '400' || oResult.__batchResponses[0].response.statusCode == '405') {
                            try {
                                var errRes = this.xmlToJson(oResult.__batchResponses[0].response.body)
                                MessageBox.error(errRes.error.message);
                            } catch (err) { MessageBox.error(oResult.__batchResponses[0].response.statusText); }
                        }
                    } catch (err) { }
                }.bind(this), function (oError) {
                    MessageBox.error("Batch error");
                    this.getView().byId("idSmartTableSACCode").setBusy(false);
                }.bind(this));
            },
            // enable delete button for SACCode table
            onSelectionChangeSACCode: function (oEvent) {
                // var oSelectedItems = oEvent.getSource().getSelectedItem().getBindingContext().getObject()
                var oSelectedItems = this.getView().byId("TableSId").getSelectedItems();
                if (oSelectedItems.length > 0) {
                    this.getView().byId("idDeleteSACODE").setEnabled(true);
                    this.getView().byId("idEditSACODE").setEnabled(true);
                } else {
                    this.getView().byId("idDeleteSACODE").setEnabled(false);
                    this.getView().byId("idEditSACODE").setEnabled(false);
                }
            },

            // delete SubCategory record
            onDeleteSubCategory: function () {
                this.getView().byId("idSmartTableSubCategory").setBusy(true);
                var oSelectedItems = this.getView().byId("TableSubCategoryId").getSelectedItems();
                var aBatchArray = [];
                for (var i = 0; i < oSelectedItems.length; i++) {
                    var oPayload = oSelectedItems[i].getBindingContext().getObject();
                    var oBatchOperation = this.oDataModel.createBatchOperation("/SubCategorySet(Langu='" + oPayload.Langu + "',SubCategory='" + oPayload.SubCategory + "')", "DELETE");
                    aBatchArray.push(oBatchOperation);
                }
                this.oDataModel.addBatchChangeOperations(aBatchArray);
                this.oDataModel.submitBatch(function (oResult) {
                    this.getView().byId("idSmartTableSubCategory").setBusy(false);
                    try {
                        if (oResult.__batchResponses[0].__changeResponses[0].statusCode == '204' || oResult.__batchResponses[0].__changeResponses[0].statusCode == '200') {
                            MessageBox.success("Record deleted successfully");
                            this.getView().byId("TableSubCategoryId").removeSelections();
                            this.getView().byId("idSmartTableSubCategory").getModel().refresh();
                        }
                    } catch (err) { }
                    try {
                        if (oResult.__batchResponses[0].response.statusCode == '502' || oResult.__batchResponses[0].response.statusCode == '500' || oResult.__batchResponses[0].response.statusCode == '400' || oResult.__batchResponses[0].response.statusCode == '405') {
                            try {
                                var errRes = this.xmlToJson(oResult.__batchResponses[0].response.body)
                                MessageBox.error(errRes.error.message);
                            } catch (err) { MessageBox.error(oResult.__batchResponses[0].response.statusText); }
                        }
                    } catch (err) { }
                }.bind(this), function (oError) {
                    MessageBox.error("Batch error");
                    this.getView().byId("idSmartTableSubCategory").setBusy(false);
                }.bind(this));
            },
            // enable delete button for SubCategory table
            onSelectionChangeSubCategory: function (oEvent) {
                // var oSelectedItems = oEvent.getSource().getSelectedItem().getBindingContext().getObject()
                var oSelectedItems = this.getView().byId("TableSubCategoryId").getSelectedItems();
                if (oSelectedItems.length > 0) {
                    this.getView().byId("idDeleteSubCategory").setEnabled(true);
                    this.getView().byId("idEditSubCategory").setEnabled(true);
                } else {
                    this.getView().byId("idDeleteSubCategory").setEnabled(false);
                    this.getView().byId("idEditSubCategory").setEnabled(false);
                }
            },

            // create ISIC record
            onCreateISICPress: function (oData) {
                var oModel = this.getView().getModel("HomeModel");
                if (oData.Langu == undefined) {
                    oModel.setProperty("/Langu", "");
                    oModel.setProperty("/IsicCode", "");
                    oModel.setProperty("/IsicCodet", "");
                    oModel.setProperty("/Editable", true);
                    this.createISIC = true;
                    this.editISIC = false;
                }
                else {
                    oModel.setProperty("/Langu", oData.Langu);
                    oModel.setProperty("/IsicCode", oData.IsicCode);
                    oModel.setProperty("/IsicCodet", oData.IsicCodet);
                    oModel.setProperty("/Editable", false);
                    this.createISIC = false;
                    this.editISIC = true;
                }
                if (!this.oCreateDialog) {
                    this.oCreateDialog = Fragment.load({
                        name: "com.sap.pimd.maintainconfig.fragments.CreateISIC",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }
                this.oCreateDialog.then(function (oDialog) {
                    oDialog.open();
                    if (this.createISIC) {
                        sap.ui.getCore().byId("idISICTitle").setTitle("Create ISIC");
                        sap.ui.getCore().byId("idISICCreateTitle").setText("Create");
                    }
                    else if (this.editISIC) {
                        sap.ui.getCore().byId("idISICTitle").setTitle("Edit ISIC");
                        sap.ui.getCore().byId("idISICCreateTitle").setText("Update");
                    }
                }.bind(this));
            },
            onCancelISIC: function () {
                this.oCreateDialog.then(function (oDialog) {
                    oDialog.close();
                }.bind(this));
            },
            onSaveISICRequest: function () {
                var oHomeModel = this.getView().getModel("HomeModel").getData();
                var postData = {};
                postData.Langu = oHomeModel.Langu;
                postData.IsicCode = oHomeModel.IsicCode;
                postData.IsicCodet = oHomeModel.IsicCodet;
                if (postData.Langu == "" || postData.IsicCode == "" || postData.IsicCodet == "") {
                    MessageBox.error("Enter Mandatory Fields");
                    return;
                }
                this.getView().byId("idSmartTableISIC").setBusy(true);
                // on edit isic
                if (this.editISIC) {
                    this.getView().byId("idSmartTableISIC").setBusy(true);
                    this.oDataModel.update("/ISICCodeSet(Langu='"+postData.Langu+"',IsicCode='"+postData.IsicCode+"')", postData, null, function (oData, response) {
                        this.onCancelISIC();
                        this.createISIC = false;
                        this.editISIC = false;
                        MessageBox.success("Succesfully updated");
                        this.getView().byId("TableISICId").removeSelections();
                        this.getView().byId("idSmartTableISIC").setBusy(false);
                        this.getView().byId("idISICEdit").setEnabled(false);
                        this.getView().byId("idSmartTableISIC").getModel().refresh();
                    }.bind(this), function (error) {
                        var errRes =  this.xmlToJson(error.response.body);
                        MessageBox.error(errRes.error.message);
                        this.getView().byId("idSmartTableISIC").setBusy(false);
                    }.bind(this), true);
                }
                else {
                    this.oDataModel.create("ISICCodeSet", postData, null, function (oData, response) {
                        this.onCancelISIC();
                        MessageBox.success("Succesfully Created");
                        this.getView().byId("TableISICId").removeSelections();
                        this.getView().byId("idSmartTableISIC").setBusy(false);
                        this.getView().byId("idSmartTableISIC").getModel().refresh();
                    }.bind(this), function (error) {
                        var errRes = this.xmlToJson(error.response.body);
                        MessageBox.error(errRes.error.message);
                        this.getView().byId("idSmartTableISIC").setBusy(false);
                    }.bind(this), true);
                }
            },
            onCreateSACCodePress: function (oData) {
                var oModel = this.getView().getModel("HomeModel");
                if (oData.Langu == undefined) {
                    oModel.setProperty("/Langu", "");
                    oModel.setProperty("/SacCode", "");
                    oModel.setProperty("/SacCodet", "");
                    oModel.setProperty("/SACCodeEditable", true);
                    this.createSACCode = true;
                    this.editSACCode = false;
                }
                else {
                    oModel.setProperty("/Langu", oData.Langu);
                    oModel.setProperty("/SacCode", oData.SacCode);
                    oModel.setProperty("/SacCodet", oData.SacCodet);
                    oModel.setProperty("/SACCodeEditable", false);
                    this.createSACCode = false;
                    this.editSACCode = true;
                }
                if (!this.oCreateSACCodeDialog) {
                    this.oCreateSACCodeDialog = Fragment.load({
                        name: "com.sap.pimd.maintainconfig.fragments.CreateSACCode",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }
                this.oCreateSACCodeDialog.then(function (oDialog) {
                    oDialog.open();
                    if (this.createSACCode == true) {
                        sap.ui.getCore().byId("idSACCodeTitle").setTitle("Create SacCode");
                        sap.ui.getCore().byId("idCreateSACCodeTitle").setText("Create");
                    }
                    else if (this.editSACCode == true) {
                        sap.ui.getCore().byId("idSACCodeTitle").setTitle("Edit SacCode");
                        sap.ui.getCore().byId("idCreateSACCodeTitle").setText("Update");
                    }
                }.bind(this));
            },
            onCancelSACCode: function () {
                this.oCreateSACCodeDialog.then(function (oDialog) {
                    oDialog.close();
                }.bind(this));
            },
            onSaveSACCodeRequest: function () {
                var oHomeModel = this.getView().getModel("HomeModel").getData();
                var postData = {};
                postData.Langu = oHomeModel.Langu;
                postData.SacCode = oHomeModel.SacCode;
                postData.SacCodet = oHomeModel.SacCodet;
                if (postData.Langu == "" || postData.SacCode == "" || postData.SacCodet == "") {
                    MessageBox.error("Enter Mandatory Fields");
                    return;
                }
                this.getView().byId("idSmartTableSACCode").setBusy(true);
                //on edit saccode
                if (this.editSACCode == true) {
                    this.oDataModel.update("/SACCodeSet(Langu='" + postData.Langu + "',SacCode='" + postData.SacCode + "')", postData, null, function (oData, response) {
                        this.onCancelSACCode();
                        this.editSACCode = false;
                        MessageBox.success("Succesfully Updated");
                        this.getView().byId("idSmartTableSACCode").setBusy(false);
                        this.getView().byId("TableSId").removeSelections();
                        this.getView().byId("idEditSACODE").setEnabled(false);
                        this.getView().byId("idSmartTableSACCode").getModel().refresh();
                    }.bind(this), function (error) {
                        var errRes = this.xmlToJson(error.response.body);
                        MessageBox.error(errRes.error.message);
                        this.getView().byId("idSmartTableSACCode").setBusy(false);
                    }.bind(this), true);
                }
                // on create saccode
                if (this.createSACCode == true) {
                    this.oDataModel.create("SACCodeSet", postData, null, function (oData, response) {
                        this.onCancelSACCode();
                        this.createSACCode = false;
                        MessageBox.success("Succesfully Created");
                        this.getView().byId("idSmartTableSACCode").setBusy(false);
                        this.getView().byId("TableSId").removeSelections();
                        this.getView().byId("idSmartTableSACCode").getModel().refresh();
                    }.bind(this), function (error) {
                        var errRes = this.xmlToJson(error.response.body);
                        MessageBox.error(errRes.error.message);
                        this.getView().byId("idSmartTableSACCode").setBusy(false);
                    }.bind(this), true);
                }

            },
            onCreateSubCategoryPress: function (oData) {
                var oModel = this.getView().getModel("HomeModel");
                if (oData.Langu == undefined) {
                    oModel.setProperty("/Langu", "");
                    oModel.setProperty("/SubCategory", "");
                    oModel.setProperty("/SubCtgryt", "");
                    oModel.setProperty("/EditableSubCategory", true);
                    this.createSubCategory = true;
                    this.editSubCategory = false;
                }
                else{
                    oModel.setProperty("/Langu", oData.Langu);
                    oModel.setProperty("/SubCategory", oData.SubCategory);
                    oModel.setProperty("/SubCtgryt", oData.SubCtgryt);
                    oModel.setProperty("/EditableSubCategory", false);
                    this.createSubCategory = false;
                    this.editSubCategory = true;
                }
                if (!this.oCreateSubCategoryDialog) {
                    this.oCreateSubCategoryDialog = Fragment.load({
                        name: "com.sap.pimd.maintainconfig.fragments.CreateSubCategory",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }
                this.oCreateSubCategoryDialog.then(function (oDialog) {
                    oDialog.open();
                    if(this.createSubCategory == true){
                        sap.ui.getCore().byId("idCreateSCTitle").setTitle("Create Subcategory");
                        sap.ui.getCore().byId("idCreateSCButton").setText("Create");
                    }
                    else if(this.editSubCategory == true){
                        sap.ui.getCore().byId("idCreateSCTitle").setTitle("Edit Subcategory");
                        sap.ui.getCore().byId("idCreateSCButton").setText("Update");
                    }
                }.bind(this));
            },
            onCancelSubCategory: function () {
                this.oCreateSubCategoryDialog.then(function (oDialog) {
                    oDialog.close();
                }.bind(this));
            },
            onSaveSubCategoryRequest: function () {
                var oHomeModel = this.getView().getModel("HomeModel").getData();
                var postData = {};
                postData.Langu = oHomeModel.Langu;
                postData.SubCategory = oHomeModel.SubCategory;
                postData.SubCtgryt = oHomeModel.SubCtgryt;
                if (postData.Langu == "" || postData.SacCode == "" || postData.SubCtgryt == "") {
                    MessageBox.error("Enter Mandatory Fields");
                    return;
                }
                this.getView().byId("idSmartTableSubCategory").setBusy(true);
                // on create sub category
                if(this.createSubCategory == true){
                    this.oDataModel.create("SubCategorySet", postData, null, function (oData, response) {
                        this.onCancelSubCategory();
                        this.createSubCategory = false;
                        MessageBox.success("Succesfully Created");
                        this.getView().byId("idSmartTableSubCategory").setBusy(false);
                        this.getView().byId("TableSubCategoryId").removeSelections();
                        this.getView().byId("idSmartTableSubCategory").getModel().refresh();
                    }.bind(this), function (error) {
                        var errRes = this.xmlToJson(error.response.body);
                        MessageBox.error(errRes.error.message);
                        this.getView().byId("idSmartTableSubCategory").setBusy(false);
                    }.bind(this), true);
                }

                // on edit sub category

                if(this.editSubCategory == true){
                    this.oDataModel.update("/SubCategorySet(Langu='" + postData.Langu + "',SubCategory='" + postData.SubCategory + "')", postData, null, function (oData, response) {
                        this.onCancelSubCategory();
                        this.editSubCategory = false;
                        MessageBox.success("Succesfully Updated");
                        this.getView().byId("idSmartTableSubCategory").setBusy(false);
                        this.getView().byId("idEditSubCategory").setEnabled(false);
                        this.getView().byId("TableSubCategoryId").removeSelections();
                        this.getView().byId("idSmartTableSubCategory").getModel().refresh();
                    }.bind(this), function (error) {
                        var errRes = this.xmlToJson(error.response.body);
                        MessageBox.error(errRes.error.message);
                        this.getView().byId("idSmartTableSubCategory").setBusy(false);
                    }.bind(this), true);
                }

                
            },
            xmlToJson: function (xml) {
                function parse(node, j) {
                    var nodeName = node.nodeName.replace(/^.+:/, '').toLowerCase();
                    var cur = null;
                    var text = $(node).contents().filter(function (x) {
                        return this.nodeType === 3;
                    });
                    if (text[0] && text[0].nodeValue.trim()) {
                        cur = text[0].nodeValue;
                    } else {
                        cur = {};
                        $.each(node.attributes, function () {
                            if (this.name.indexOf('xmlns:') !== 0) {
                                cur[this.name.replace(/^.+:/, '')] = this.value;
                            }
                        });
                        $.each(node.children, function () {
                            parse(this, cur);
                        });
                    }

                    j[nodeName] = cur;
                }

                var roots = $(xml);
                var root = roots[roots.length - 1];
                var json = {};
                parse(root, json);
                return json;
            }

        });
    });
