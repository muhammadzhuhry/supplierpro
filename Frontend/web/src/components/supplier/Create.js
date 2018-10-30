import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import supplierapi from '../../api_handlers/supplier';

class AddSupplier extends Component {
    constructor (props){
        super(props);

        this.state={
            formdata:{
                CompanyName    : '',
                ContactName    : '',
                ContactEmail   : '',
                ContactTitle   : '',
                Address        : '',
                City           : '',
                PostalCode     : '',
                Country        : '',
                Phone          : '',
                Fax            : ''
            },
            errors: {}
        };
        this.resetForm = this.resetForm.bind(this);
        this.submitHandler=this.submitHandler.bind(this);
        this.textChanged = this.textChanged.bind(this);
        //this.handleValidation = this.handleValidation.bind(this);
    };

    // untuk reset form kembali menjadi kosong
    resetForm() {
        this.setState({
            formdata:{
                CompanyName    : '',
                ContactName    : '',
                ContactEmail   : '',
                ContactTitle   : '',
                Address        : '',
                City           : '',
                PostalCode     : '',
                Country        : '',
                Phone          : '',
                Fax            : ''
            },
            errors: {}
        });
    };

    handleValidation(){
        let fields = this.state.formdata;
        let errors = {};
        let formIsValid = true;

        // Company Name
        if(!fields.CompanyName){
            formIsValid = false;
            errors.CompanyName = "Nama Company tidak boleh kosong";
         }else if(!fields.CompanyName.match(/^[a-zA-Z\s]+$/)){
               formIsValid = false;
               errors.CompanyName = "Nama Company harus berupa huruf";
        }

        // Contact Name
        if(!fields.ContactName){
            formIsValid = false;
            errors.ContactName = "Nama Contact tidak boleh kosong";
         }else if(!fields.ContactName.match(/^[a-zA-Z\s]+$/)){
               formIsValid = false;
               errors.ContactName = "Nama Contact harus berupa huruf";
        } 
        
        // Contact Email
        if(!fields.ContactEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            formIsValid = false;
            errors.ContactEmail = "Contact harus berupa email";
        }

        // Title Contact
        if(!fields.ContactTitle.match(/^[a-zA-Z\s]+$/)){
            formIsValid = false;
            errors.ContactTitle = "Contact Title harus berupa huruf";
        }

        // Phone
        if(!fields.Phone.match(/^[0-9() +-]*$/)){
            formIsValid = false;
            errors.Phone = "Format Phone tidak valid";
        }
        
        // Fax
        if(!fields.Fax.match(/^[0-9() +-]*$/)){
            formIsValid = false;
            errors.Fax = "Format Fax tidak valid";
        } 

        this.setState({errors: errors});
        return formIsValid;
    };

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    };

    async submitHandler(){
        
        if(this.handleValidation()){
            let token = localStorage.getItem(appconfig.secure_key.token);
            console.log(this.state.formdata);

            let result = await supplierapi.insertNew(this.state.formdata);
  
            if(result.status === 200){
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(1, 'Success');
            } else {
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed');
            }
        }
    };

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button  id="hidePopUpBtn" onClick = { this.resetForm } type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Input Data Supplier</h4>
                </div>

                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Nama Company</label>
                                <div className="col-sm-9">
                                    <input ref="CompanyName" type="text" className="form-control" name="CompanyName" placeholder="masukan nama company" value={ this.state.formdata.CompanyName } onChange={ this.textChanged }></input>
                                    <span style={{color: "red"}}>{this.state.errors.CompanyName}</span>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Nama Contact</label>
                                <div className="col-sm-9">
                                    <input ref="ContactName" type="text" className="form-control" name="ContactName" placeholder="masukan nama contact" value={ this.state.formdata.ContactName } onChange={ this.textChanged }></input>
                                    <span style={{color: "red"}}>{this.state.errors.ContactName}</span>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Contact Email</label>
                                <div className="col-sm-9">
                                    <input ref="ContactEmail" type="email" className="form-control" name="ContactEmail" placeholder="masukan contact email" value={ this.state.formdata.ContactEmail } onChange={ this.textChanged }></input>
                                    <span style={{color: "red"}}>{this.state.errors.ContactEmail}</span>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Title Contact</label>
                                <div className="col-sm-9">
                                    <input ref="ContactTitle" type="text" className="form-control" name="ContactTitle" placeholder="masukan title contact" value={ this.state.formdata.ContactTitle } onChange={ this.textChanged }></input>
                                    <span style={{color: "red"}}>{this.state.errors.ContactTitle}</span>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Address</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="Address" placeholder="masukan alamat" value={ this.state.formdata.Address } onChange={ this.textChanged }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">City</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="City" placeholder="masukan kota" value={ this.state.formdata.City } onChange={ this.textChanged }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Postal Code</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="PostalCode" placeholder="masukan kode pos" value={ this.state.formdata.PostalCode } onChange={ this.textChanged }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Country</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="Country" placeholder="masukan negara" value={ this.state.formdata.Country } onChange={ this.textChanged }></input>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Phone</label>
                                <div className="col-sm-9">
                                    <input ref="Phone" type="text" className="form-control" name="Phone" placeholder="masukan phone" value={ this.state.formdata.Phone } onChange={ this.textChanged }></input>
                                    <span style={{color: "red"}}>{this.state.errors.Phone}</span>
                                </div> 
                            </div>

                            <div className="form-group">
                                <label className="col-sm-3 control-label">Fax</label>
                                <div className="col-sm-9">
                                    <input ref="Fax" type="text" className="form-control" name="Fax" placeholder="masukan fax" value={ this.state.formdata.Fax } onChange={ this.textChanged }></input>
                                    <span style={{color: "red"}}>{this.state.errors.Fax}</span>
                                </div> 
                            </div>

                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" onClick={ this.resetForm } className="btn btn-danger pull-left" data-dismiss="modal">Close</button>
                    <button type="button" onClick={ this.submitHandler } className="btn btn-primary">Save changes</button>
                </div>
            </div>
        )
    }
};

export default AddSupplier;