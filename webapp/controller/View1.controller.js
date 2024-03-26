sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, FilterType,JSONModel) {
        "use strict";

        return Controller.extend("masterdetail.controller.View1", {
            onListPress:function(oEvent){
                var OrderID = oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID");

                var oFilter = new Filter("OrderID", FilterOperator.EQ, OrderID);

                this.getView().byId("OrderTable").getBinding("items").filter(oFilter, FilterType.Application);
                this.getSplitContObj().to(this.createId("orderDetails"));

            },
            onPressDetails:function(oEvent) {
                        var that = this;
                        var productId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                        var oModel = this.getOwnerComponent().getModel();
                        oModel.read("/Products("+productId+") ", {
                            success: function (oData) {
                               // console.log(oData);
                            var jData = new JSONModel(oData);
                            that.getView().byId("productFrom").setModel(jData);
                            that.getSplitContObj().to(that.createId("productsDetail"));

                        },error:function(oError){
                            console.log(oError);
                        }
            })
                    
            },
            getSplitContObj:function(){
                var result = this.byId("SplitCont");
                return result;
            },
            onProductsback:function(oEvent)
            {
                this.getSplitContObj().backDetail();

            }      
            
          

        });
    });
