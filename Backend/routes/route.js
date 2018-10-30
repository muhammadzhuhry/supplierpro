'use strict';

// import Logger
var winston = require('../config/winston');
var morgan = require('morgan');

// import controller (module)
var supplier = require('../controllers/supplier');
var user = require('../controllers/user');
var product = require('../controllers/product');

// import middleware
var middleware = require('../middleware/checktoken');

module.exports = exports = function(server) {

    //CORS (Cross Origin Resource Sharing) ->  Setting agar bisa menambahkan header yang berisi auth untuk mengecek token
    var corsMiddleware = require('restify-cors-middleware');
    var cors = corsMiddleware({
        origins : ['*'],
        allowHeaders : ['Authorization']
    });

    server.pre(cors.preflight);
    server.use(cors.actual);

    // User Route
    server.post('/api/login', user.Login);
    server.get('/api/logout', user.Logout);

    // Supplier Route
    server.get('/api/supplier/', middleware.checkToken, supplier.GetAllHandler);
    server.get('/api/supplier/:id', middleware.checkToken, supplier.GetDetailByIDHandler);
    server.post('/api/supplier/', middleware.checkToken, supplier.CreateHandler);
    server.put('/api/supplier/:id', middleware.checkToken, supplier.UpdateHandler);
    server.del('/api/supplier/:id', middleware.checkToken, supplier.DeleteHandler);

    // Product Route
    server.get('/api/product/', middleware.checkToken, product.GetAllHandler);
    server.get('/api/product/:id', middleware.checkToken, product.GetDetailByIDHandler);
    server.post('/api/product/', middleware.checkToken, product.CreateHandler);
    server.put('/api/product/:id', middleware.checkToken, product.UpdateHandler);
    server.del('/api/product/:id', middleware.checkToken, product.DeleteHandler);

    // error handler
    server.use(function(err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        
        winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        if(err.name === 'UnaothotizedError') {
            res.status(401).json({ status: 0, code: 401, type: "Unaothorized", message: err.name + ": " + err.message });
        } else {
            res.status(404).json({ status: 0, code: 404, type: "ENOENT", message: "file not found" });
        }

        res.status(err.status || 500);
        res.render('error');
    });

    server.use(morgan('combined', { strwam: winston.stream }));
}