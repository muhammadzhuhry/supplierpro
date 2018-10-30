import React, { Component } from 'react';
import { AlertList } from 'react-bs-notifier';
import supplierapi from '../../api_handlers/supplier';

import AddSupplier from './Create';
import DetailSupplier from './Detail';
// import DetailSupplier from './Detail';
// import EditSupplier from './Edit';
// import DeleteSupplier from './Delete';

class Index  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier : [],
            currentSupplier : {},
            alertData: {
                status: 99,
                message: ''
            },
            alerts : []
        };
        this.getAll = this.getAll.bind(this);
        this.viewModalHandler = this.viewModalHandler.bind(this);
        this.editModalHandler = this.editModalHandler.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this);
    };

    onAlertDismissed(alert){
        const alerts = this.state.alerts;
        const idx = alerts.indexOf(alert); // buat array
        console.log(idx);
        if(idx >= 0){
            this.setState({
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx+1)]
            });
        }
    };

    async getAll() {
        console.log("Debug Get All");
        let result = await supplierapi.getAll();

        if(result.status === 200){
            console.log(result.message);
            this.setState({
                supplier: result.message
            })
        } else {
            console.log(result.message);
        }
    };

    viewModalHandler(supplierid){
        let obj = {};
        this.state.supplier.map((ele) => {
            if(ele._id === supplierid){
                obj = ele;
            }
        });

        this.setState({
            currentSupplier : obj
        })
    };

    editModalHandler(supplierid){
        let obj = {};
        this.state.supplier.map((ele) => {
            if(ele._id === supplierid){
                obj = ele;
            }
        });

        this.setState({
            currentSupplier : obj
        });
    };

    deleteModalHandler(supplierid){
        let obj = {};
        this.state.supplier.map((ele) => {
            if(ele._id === supplierid ){
                obj = ele;
            }
        });

        this.setState({
            currentSupplier : obj
        })
    };

    modalStatus(status, message){
        this.getAll();
        this.setState({
            alertData : {
                status : status,
                message : message
            }
        });

        if(status === 1){
            this.setState({
                alerts : [{
                    type: "success",
                    headline: "Good Job!",
                    message: "Process successfully."
                }]
            });
        }
        else if(status === 0){
            this.setState({
                alerts : [{
                    type: "danger",
                    headline: "Whoa!",
                    message: "Process failed!"
                }]
            });
        }
    };

    componentDidMount() {
        this.getAll();
    }

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Supplier
                        <small>Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                        <li className="active">Client</li>
                    </ol>
                </section>

                {
                    (this.state.alertData.status === 1) ? <AlertList alerts={this.state.alerts} timeout={180} onDismiss={this.onAlertDismissed.bind(this)} /> : ''
                }
                {
                    (this.state.alertData.status === 0) ? <AlertList alerts={this.state.alerts} timeout={180} onDismiss={this.onAlertDismissed.bind(this)} /> : ''
                }

                <section className="content">
                    
                    <div className="row">
                        <div className="col-xs-12">    

                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Data Supplier</h3>
                                    
                                    <div className="pull-right">
                                        <button className="btn btn-flat btn-primary" data-toggle="modal" data-target="#modal-add"><i className="fa fa-plus"></i></button>
                                    </div>
                                </div>

                                <div className="box-body">
                                
                                    <table id="tabel" className="table table-bordered table-striped">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Object ID</th>
                                            <th>Company Name</th>
                                            <th>Contact Name</th>
                                            <th>Full Address</th>
                                            <th>Aksi</th>
                                        </tr>
                                        </thead>
                                        
                                        <tbody>
                                        { this.state.supplier.map((elemen, i) => {
                                            return (
                                                
                                                    <tr key={ i }>
                                                        <td>{ i+1 }</td>
                                                        <td>{ elemen._id }</td>
                                                        <td>{ elemen.CompanyName }</td>
                                                        <td>{ elemen.ContactName }</td>
                                                        <td>{ elemen.FullAddress }</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-flat btn-info" onClick={ () => {this.viewModalHandler(elemen._id)} } data-toggle="modal" data-target="#modal-detail" style={{ marginRight: '5px' }}><i className="fa fa-search-plus"></i></button> 
                                                            <button className="btn btn-sm btn-flat btn-warning" onClick={ () => {this.editModalHandler(elemen._id)} } data-toggle="modal" data-target="#modal-edit" style={{ marginRight: '5px' }}><i className="fa fa-edit"></i></button>
                                                            <button className="btn btn-sm btn-flat btn-danger" onClick={ () => {this.deleteModalHandler(elemen._id)} } data-toggle="modal" data-target="#modal-delete" style={{ marginRight: '5px' }}><i className="fa fa-times"></i></button>
                                                        </td>
                                                    </tr>
                                            )
                                        })}
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="modal fade" id="modal-add">
                        <div className="modal-dialog">
                            <AddSupplier
                                modalStatus = { this.modalStatus }
                            />
                        </div>
                    </div>

                    <div className="modal fade" id="modal-detail">
                        <div className="modal-dialog">
                            <DetailSupplier 
                                 supplier = { this.state.currentSupplier }
                            />
                        </div>
                    </div>

                    {/* <div className="modal fade" id="modal-edit">
                        <div className="modal-dialog">
                            <EditClient 
                                modalStatus = { this.modalStatus }
                                client = { this.state.currentClient }
                            />
                        </div>
                    </div> */}

                    {/* <div className="modal fade" id="modal-delete">
                        <div className="modal-dialog">
                            <DeleteClient 
                                modalStatus = { this.modalStatus }
                                client = { this.state.currentClient }
                            />
                        </div>
                    </div> */}

                </section>
            </div>
        )
};
};

export default Index;