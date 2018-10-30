import React, { Component } from 'react';

class DetailSupplier extends Component {
    render(){
        return(
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Detail Data Supplier</h4>
                </div>

                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">ID Supplier</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="form-control" name="IdSupplier" value={ this.props.supplier._id }></input>
                                </div> 
                            </div>

                            <div class="form-group">
                                <label className="col-sm-3 control-label">Nama Company</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="form-control" name="CompanyName" value={ this.props.supplier.CompanyName }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Nama Contact</label>
                                <div className="col-sm-9">
                                    <input type="text" disabled class="form-control" name="ContactName" value={ this.props.supplier.ContactName }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Contact Email</label>
                                <div className="col-sm-9">
                                    <input type="text" disabled class="form-control" name="ContactEmail" value={ this.props.supplier.ContactEmail }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Title Contact</label>
                                <div className="col-sm-9">
                                    <input type="text" disabled class="form-control" name="ContactTitle" value={ this.props.supplier.ContactTitle }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Address</label>
                                <div className="col-sm-9">
                                    <input type="text" disabled class="form-control" name="Address" value={ this.props.supplier.Address }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">City</label>
                                <div className="col-sm-9">
                                    <input type="text" disabled class="form-control" name="City" value={ this.props.supplier.City }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Postal Code</label>
                                <div className="col-sm-9">
                                    <input type="text" disabled class="form-control" name="PostalCode" value={ this.props.supplier.PostalCode }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Phone</label>
                                <div className="col-sm-9">
                                    <input type="text" disabled class="form-control" name="Phone" value={ this.props.supplier.Phone }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Fax</label>
                                <div className="col-sm-9">
                                <input type="text" disabled class="form-control" name="Fax" value={ this.props.supplier.Fax }></input>
                                </div> 
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Created Date</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="form-control" name="CreatedDate" value={ this.props.supplier.CreatedDate }></input>
                                </div> 
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Created By</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="form-control" name="CreatedBy" value={ this.props.supplier.CreatedBy }></input>
                                </div> 
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Close</button>
                </div>
            </div>
        )
    }
};

export default DetailSupplier;