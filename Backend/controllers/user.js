'use strict';

const Response = require('../config/response');
const ObjectID = require('mongodb').ObjectID;

const jwt = require('jsonwebtoken');
const secret = require('../config/token');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model');

const UserController = {
    Login : (req, res, next) => {
        var username = req.body.UserName;
        var password = req.body.Password;

        if(username == null || password == null) {
            Response.send(res, 404, "User Tidak ditemukan");
        } else {
            global.dbo.collection('User').findOne({ UserName : username }, (err, data) => {
                if(data) {
                    console.log(data.UserName);
                    console.log(data.Password);

                    if(bcrypt.compareSync(password, data.Password)){
                        let token = jwt.sign(data, secret.secretkey, {
                            expiresIn: 7200 // expire 2 jam
                        });
    
                        delete data.Password;
    
                        let doc = {
                            userdata : data,
                            token : token
                        };
    
                        Response.send(res, 200, doc);
                    }
                } else {
                    Response.send(res, 404, "User Tidak Ditemukan");
                }
            });
        }
    },
    Logout : (req, res, next) => {
        let doc = {
            status : "Logout berhasil",
            userdata : null,
            token : null
        }
        Response.send(res, 200, doc);
    },
    GetAllHandler : (req, res, next) => {
        global.dbo.collection('User').find({ IsDelete : false }).toArray((error, data) => {
            if(error) {
                return next(new Error());
            }

            let modelCollection = data.map((entity) => {
                return new UserModel(entity);
            });

            Response.send(res, 200, modelCollection);
        });
    },
    GetDetailByIDHandler : (req, res, next) => {
        let id = req.params.id;
        global.dbo.collection('User').find({ IsDelete : false, '_id' : ObjectID(id) }).toArray((error, data) => {
            if(error) {
                return next(new Error());
            }

            let model = data.map((entity) => {
                return new UserModel(entity);
            });

            Response.send(res, 200, model);
        });
    }
    // CreateHandler : (req, res, next) => {
    //     let reqdata = req.body;
    //     var data = {};

    //     data.UserName    = reqdata.UserName;
    //     data.Password    = bcrypt.hashSync(reqdata.Password, 8); // 8 = salt, tingkat level enksripsi
    //     data.Role        = reqdata.Role;
    //     data.IsDelete    = false;
    //     data.CreatedDate = now;
    //     data.CreatedBy   = global.user.UserName;
    //     data.UpdateDate  = null;
    //     data.UpdateBy    = null;
    // }
}

module.exports = UserController;