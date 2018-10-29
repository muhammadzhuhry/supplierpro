'use strict';

const Response = require('../config/response');
const jwt = require('jsonwebtoken');
const secret = require('../config/token');

const AuthMiddleware = {
    checkToken : (req, res, next) => {
        console.log(req.headers);
        var token = req.headers.authorization;
        if(token == null) {
            Response.send(res, 403, "You are not Authorized");
        } else {
            jwt.verify(token, secret.secretkey, (err, decrypt) => {
                if(decrypt != undefined){
                    req.userdata = decrypt;
                    global.user = decrypt;
                    next();
                } else {
                    Response.send(res, 403, "You are not Authorized");
                }
            });
        }
    },
    checkTokenAndRoleAdmin : (req, res, next) => {
        console.log(req.headers);
        var token = req.headers.Authorization;
        if(token == null){
            Response.send(res, 403, "You are not Authorized");
        } else {
            jwt.verify(token, secret.secretkey, (err, decrypt) => {
                if(decrypt != undefined) {
                    if(decrypt.Role == 'administrator') {
                        req.userdata = decrypt;
                        global.user = decrypt;
                        next();
                    } else {
                        Response.send(res, 403, "You are not Authorized because your Role not Administrator");
                    }
                } else {
                    Response.send(res, 403, "You are not Authorized");
                }
            });
        }
    }
};

module.exports = AuthMiddleware;