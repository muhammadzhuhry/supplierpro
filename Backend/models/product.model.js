'use strict';

// set data
function model(entity) {
    this._id                = entity._id;
    this.ProductName        = entity.ProductName;
    this.SupplierName       = entity.SupplierName;
    this.CategoryName       = entity.CategoryName;
    this.QuantityPerUnit    = entity.QuantityPerUnit;
    this.UnitPrice          = entity.UnitPrice;
    this.UnitsInStock       = entity.UnitsInStock;
    this.IsDelete           = entity.IsDelete;
    this.CreatedBy          = entity.CreatedBy;
    this.CreatedDate        = entity.CreatedDate;
    this.UpdateBy           = entity.UpdateBy;
    this.UpdateDate         = entity.UpdateDate;
};

// return data
model.prototype.getData = function() {
    return {
        _id : this._id,
        ProductName  : this.ProductName,
        SupplierName  : this.SupplierName,
        CategoryName : this.CategoryName,
        QuantityPerUnit : this.QuantityPerUnit,
        UnitPrice : this.UnitPrice,
        UnitsInStock : this.UnitsInStock,
        IsDelete : this.IsDelete,
        CreatedBy : this.CreatedBy,
        CreatedDate : this.CreatedDate,
        UpdateBy : this.UpdateBy,
        UpdateDate : this.UpdateDate
    }
};

module.exports = model;