'use strict';

const Response = require('../config/response');
const ObjectID = require('mongodb').ObjectID;
const productsModel = require('../models/product.model');

var now = new Date();

const ProductController = {
    GetAllHandler : (req, res, next) => {
        global.dbo.collection('Products').aggregate([
            {
                $match : { IsDelete : false }
            },
            {
                $lookup :
                {
                    from : 'Suppliers',
                    localField : 'SupplierName',
                    foreignField : '_id',
                    as : 'Show_Suppliers'
                }
            },
            {
                $unwind : '$Show_Suppliers'
            },
            {
                $project :
                {
                    ProductName : '$ProductName',
                    SupplierName : '$Show_Suppliers.CompanyName',
                    CategoryName : '$CategoryName',
                    QuantityPerUnit : '$QuantityPerUnit',
                    UnitPrice : '$UnitPrice',
                    UnitsInStock : '$UnitsInStock',
                    IsDelete : '$IsDelete',
                    CreatedBy : '$CreatedBy',
                    CreatedDate : '$CreatedDate',
                    UpdateBy : '$UpdateBy',
                    UpdateDate : '$UpdateDate'
                }
            }
        ]).toArray((error, data) => {
            if(error) {
                return next(new Error());
            }

            // kalo pake aggregate lebih baik tidak usah dimapping supaya tidak ada issue
            // let modelProducts = data.map((entity) => {
            //     return new productsModel(entity);
            // });

            Response.send(res, 200, data);
        }); 
    },
    GetDetailByIDHandler : (req, res, next) => {
        let id = req.params.id;
        global.dbo.collection('Products').aggregate([
            {
                $match : 
                { 
                    IsDelete : false,
                    _id : ObjectID(id)
                }
            },
            {
                $lookup :
                {
                    from : 'Suppliers',
                    localField : 'SupplierName',
                    foreignField : '_id',
                    as : 'Show_Suppliers'
                }
            },
            {
                $unwind : '$Show_Suppliers'
            },
            {
                $project :
                {
                    ProductName : '$ProductName',
                    SupplierName : '$Show_Suppliers.CompanyName',
                    CategoryName : '$CategoryName',
                    QuantityPerUnit : '$QuantityPerUnit',
                    UnitPrice : '$UnitPrice',
                    UnitsInStock : '$UnitsInStock',
                    IsDelete : '$IsDelete',
                    CreatedBy : '$CreatedBy',
                    CreatedDate : '$CreatedDate',
                    UpdateBy : '$UpdateBy',
                    UpdateDate : '$UpdateDate'
                }
            }
        ]).toArray((error, data) => {
            if(error){
                return next(new Error());
            }

            // kalo pake aggregate lebih baik tidak usah dimapping supaya tidak ada issue
            // let model = data.map((entity) => {
            //     return new productsModel(entity);
            // });

            Response.send(res, 200, data);
        });
    },
    CreateHandler : (req, res, next) => {
        let reqdata = req.body;
        var data = {};

        data.ProductName        = reqdata.ProductName;
        data.SupplierName       = ObjectID(reqdata.SupplierName);
        data.CategoryName       = reqdata.CategoryName;
        data.QuantityPerUnit    = reqdata.QuantityPerUnit;
        data.UnitPrice          = reqdata.UnitPrice;
        data.UnitsInStock       = reqdata.UnitsInStock;
        data.IsDelete           = false;
        data.CreatedDate        = now;
        data.CreatedBy          = global.user.UserName;
        data.UpdateDate         = null;
        data.UpdateBy           = null;

        var model = new productsModel(data);

        global.dbo.collection('Products').insertOne(model, function(error, data){
            if(error) {
                return next(new Error());
            }

            Response.send(res, 200, data);
        });
    },
    UpdateHandler : (req, res, next) => {
        let id = req.params.id;
        let reqdata = req.body;
        var oldmodel = {};
        var updatemodel = {};

        global.dbo.collection('Products').find({ IsDelete : false, '_id' : ObjectID(id) }).toArray((error, data) => {
            if(error) {
                return next(new Error());
            }

            oldmodel = data.map((entity) => {
                return new productsModel(entity);
            });

            // insert data
            updatemodel._id   = ObjectID(id);

            if(reqdata.ProductName == null || reqdata.ProductName == undefined || reqdata.ProductName == "") {
                updatemodel.ProductName = oldmodel[0].ProductName;
            } else {
                updatemodel.ProductName    = reqdata.ProductName;
            }

            if(reqdata.SupplierName == null || reqdata.SupplierName == undefined || reqdata.SupplierName == "") {
                updatemodel.SupplierName = oldmodel[0].SupplierName;
            } else {
                updatemodel.SupplierName    = reqdata.SupplierName;
            }

            if(reqdata.CategoryName == null || reqdata.CategoryName == undefined || reqdata.CategoryName == "") {
                updatemodel.CategoryName = oldmodel[0].CategoryName;
            } else {
                updatemodel.CategoryName    = reqdata.CategoryName;
            }

            if(reqdata.QuantityPerUnit == null || reqdata.QuantityPerUnit == undefined || reqdata.QuantityPerUnit == "") {
                updatemodel.QuantityPerUnit = oldmodel[0].QuantityPerUnit;
            } else {
                updatemodel.QuantityPerUnit    = reqdata.QuantityPerUnit;
            }

            if(reqdata.UnitPrice == null || reqdata.UnitPrice == undefined || reqdata.UnitPrice == "") {
                updatemodel.UnitPrice = oldmodel[0].UnitPrice;
            } else {
                updatemodel.UnitPrice    = reqdata.UnitPrice;
            }

            if(reqdata.UnitsInStock == null || reqdata.UnitsInStock == undefined || reqdata.UnitsInStock == "") {
                updatemodel.UnitsInStock = oldmodel[0].UnitsInStock;
            } else {
                updatemodel.UnitsInStock    = reqdata.UnitsInStock;
            }

            updatemodel.IsDelete       = oldmodel[0].IsDelete;
            updatemodel.CreatedDate    = oldmodel[0].CreatedDate;
            updatemodel.CreatedBy      = oldmodel[0].CreatedBy;
            updatemodel.UpdateDate     = now;
            updatemodel.UpdateBy       = global.user.UserName;

            var model = new productsModel(updatemodel);

            global.dbo.collection('Products').findOneAndUpdate(
                {'_id' : ObjectID(id)},
                {$set : model},
                function(err, data){
                    if(err) {
                        return next(new Error());
                    }

                    Response.send(res, 200, data);
                }
            );
        });
    },
    DeleteHandler : (req, res, next) => {
        let id = req.params.id;
        var oldmodel = {};
        var deletemodel = {};

        global.dbo.collection('Products').find({ IsDelete : false, '_id' : ObjectID(id) }).toArray((error, data) => {
            if(error) {
                return next(new Error());
            }

            oldmodel = data.map((entity) => {
                return new productsModel(entity);
            });

            deletemodel._id                = ObjectID(id);
            deletemodel.ProductName        = oldmodel[0].ProductName;
            deletemodel.SupplierName       = oldmodel[0].SupplierName;
            deletemodel.CategoryName       = oldmodel[0].CategoryName;
            deletemodel.QuantityPerUnit    = oldmodel[0].QuantityPerUnit;
            deletemodel.UnitPrice          = oldmodel[0].UnitPrice;
            deletemodel.UnitsInStock       = oldmodel[0].UnitsInStock;
            deletemodel.IsDelete           = true;
            deletemodel.CreatedDate        = oldmodel[0].CreatedDate;
            deletemodel.CreatedBy          = oldmodel[0].CreatedBy;
            deletemodel.UpdateDate         = now;
            deletemodel.UpdateBy           = global.user.UserName;

            var model = new productsModel(deletemodel);

            global.dbo.collection('Products').findOneAndUpdate
            (
                {'_id' : ObjectID(id)},
                {$set : model},
                function(error, data) {
                    if(error) {
                        return next(new Error());
                    }

                    Response.send(res, 200, data);
                }
            );
        });
    }
};

module.exports = ProductController;