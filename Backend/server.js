'use strict';

// import Restify
const restify = require('restify');

// import + configurasi moment
const moment = require('moment');
var time = moment().format("DD/MM/YYYY hh:mm:ss a");

// import Logger
var winston = require('./config/winston');

// import config DB
const DB = require('./config/db');

// Global Configuration
global.config = require('./config/app');

// Configurasi db(connect) + logger
DB.connect((err, db) => {
    if(err != null){
        console.log(err);
        winston.error(err);
        process.exit();
    } else {
        // create Server
        const server = restify.createServer(
            {
                name : "SupplierPro API",
                version : "1.0.0"
            }
        );

        console.log('[DATABASE] connected');
        winston.info('[DATABASE]' + config.dbconn + ' connected ');

        global.dbo = DB.getconnection();

        // Body Parser to parse form body with http method POST(untuk data)
        server.use(restify.plugins.bodyParser());

        // import Route
        require('./routes/route')(server);

        // Default Route
        server.get('/', restify.plugins.serveStatic(
            {
                directory : __dirname, // to get this current directory
                default : "/index.html"
            }
        ));

        server.listen(config.port, function(){
            console.log("%s listen at %s on %s", server.name, server.url, time);
            winston.info(server.name + " listen at " +  server.url + " on " + time);
        });
    }
});