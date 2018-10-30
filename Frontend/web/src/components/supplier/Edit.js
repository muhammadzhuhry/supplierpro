import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import clientapi from '../../api_handlers/client';

class EditClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: {
                nama_client: '',
                _id: ''
            }
        };
        this.updateHandler = this.updateHandler.bind(this);
        this.textChanged = this.textChanged.bind(this);
    };

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    async updateHandler(){
        let token = localStorage.getItem(appconfig.secure_key.token);
        console.log(this.state.formdata);

        let result = await clientapi.updateExistingClient(this.state.formdata);

        if(result.status === 200){
            console.log(result.message);
            document.getElementById("hidePopUpBtnUpdate").click();
            this.props.modalStatus(1, 'Success');
        } else {
            console.log(result.message);
            document.getElementById("hidePopUpBtnUpdate").click();
            this.props.modalStatus(0, 'Failed');
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            formdata: newProps.client
        })
    }

    render(){
        return(
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" id="hidePopUpBtnUpdate" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Edit Data Pendonor</h4>
                </div>

                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Nama Client</label>
                                <div class="col-sm-9">
                                    <input type="hidden" class="form-control" name="id_client" value={ this.state.formdata._id }></input>
                                    <input type="text" class="form-control" name="nama_client" placeholder="masukan nama client" value={ this.state.formdata.nama_client } onChange={this.textChanged}></input>
                                </div> 
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Close</button>
                    <button type="button" onClick={ this.updateHandler} class="btn btn-primary">Save changes</button>
                </div>
            </div>
        )
    }
};

export default EditClient;