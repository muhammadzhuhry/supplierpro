'use strict';

// set data
function model(entity) {
    this._id            = entity._id;
    this.UserName    = entity.UserName;
    this.Password    = entity.Password;
    this.Role   = entity.Role;
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
        UserName  : this.UserName,
        Password  : this.Password,
        Role : this.Role,
        IsDelete : this.IsDelete,
        CreatedBy : this.CreatedBy,
        CreatedDate : this.CreatedDate,
        UpdateBy : this.UpdateBy,
        UpdateDate : this.UpdateDate
    }
};

module.exports = model;