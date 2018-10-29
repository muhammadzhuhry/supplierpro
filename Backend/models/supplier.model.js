'use strict';

// set data
function model(entity) {
    this._id            = entity._id;
    this.CompanyName    = entity.CompanyName;
    this.ContactName    = entity.ContactName;
    this.ContactEmail   = entity.ContactEmail;
    this.ContactTitle   = entity.ContactTitle;
    this.Address        = entity.Address;
    this.City           = entity.City;
    this.PostalCode     = entity.PostalCode;
    this.Country        = entity.Country;
    this.Phone          = entity.Phone;
    this.Fax            = entity.Fax;
    this.IsDelete       = entity.IsDelete;
    this.CreatedBy      = entity.CreatedBy;
    this.CreatedDate    = entity.CreatedDate;
    this.UpdateBy       = entity.UpdateBy;
    this.UpdateDate     = entity.UpdateDate;
};

// return data
model.prototype.getData = function() {
    return {
        _id : this._id,
        CompanyName  : this.CompanyName,
        ContactName  : this.ContactName,
        ContactEmail : this.ContactEmail,
        ContactTitle : this.ContactTitle,
        Address : this.Address,
        City : this.City,
        PostalCode : this.PostalCode,
        Country : this.Country,
        Phone : this.Phone,
        Fax : this.Fax,
        IsDelete : this.IsDelete,
        CreatedBy : this.CreatedBy,
        CreatedDate : this.CreatedDate,
        UpdateBy : this.UpdateBy,
        UpdateDate : this.UpdateDate
    }
};

module.exports = model;