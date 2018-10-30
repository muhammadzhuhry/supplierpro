import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import clientapi from '../../api_handlers/client';

class DeleteClient extends Component {
    constructor(props) {
        super(props);

        this.deleteHandler = this.deleteHandler.bind(this);
    }

    async deleteHandler(){
        let token = localStorage.getItem(appconfig.secure_key.token);

        let result = await clientapi.deleteExistingClient(this.props.client._id);
        
        console.log("Debug ID");
        console.log(this.props.client._id);

        if(result.status === 200){
            console.log(result.message);
            document.getElementById("hidePopUpBtnDelete").click();
            this.props.modalStatus(1, 'Success');
        } else {
            console.log(result.message);
            document.getElementById("hidePopUpBtnDelete").click();
            this.props.modalStatus(0, 'Failed');
        }
    }

    render(){
        return(
            <div class="modal-content">
                <div class="modal-header">
                    <button id="hidePopUpBtnDelete" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Detail Data Pendonor</h4>
                </div>

                <div class="modal-body">
                    <div class="callout callout-danger" style={{ marginottom: "0!important"}}>
                        <h4><i class="fa fa-info"></i> Perhatian : </h4>
                        Apakah Anda yakin untuk menghapus data di bawah?
                    </div>
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">ID Client</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="form-control" name="id_client" placeholder="masukan id client" value={ this.props.client._id }></input>
                                </div> 
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Nama Client</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="form-control" name="nama_client" placeholder="masukan nama client" value={ this.props.client.nama_client }></input>
                                </div> 
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Created Date</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="form-control" name="created_date" placeholder="masukan tanggal create" value={ this.props.client.created_date }></input>
                                </div> 
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Created By</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="form-control" name="created_by" placeholder="masukan nama create" value={ this.props.client.created_by }></input>
                                </div> 
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                    <button type="button" onClick={ this.deleteHandler } className="btn btn-danger">Delete</button>
                </div>
            </div>
        )
    }
};

export default DeleteClient;