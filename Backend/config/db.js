'use strict';

// import Mongo Driver
const MongoClient = require('mongodb').MongoClient;
var dbo = null;

const DBConnection = {
    connect : (conn) => {
        // global config diambil dari server.js yang mana berisi require ke './app.js'
        MongoClient.connect(global.config.dbconn, { useNewUrlParser : true }, (err, db) => {
            if(!err){
                dbo = db.db(global.config.dbname);
            }
            conn(err, db);
        });
    },
    getconnection : () => {
        return dbo;
    }
};

module.exports = DBConnection;