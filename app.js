'use strict'

var express = require('express');
//var bodyParser = require('body-parser');

var app = express();

var user_routes = require('./routes/user');
var organization_routes = require('./routes/organization');
var dispatch_routes = require('./routes/dispatch');
var leaseOperator_routes = require('./routes/leaseOperator');
var lease_routes = require('./routes/lease');
var terminal_routes = require('./routes/terminal');
var order_routes = require('./routes/order');

// cargar rutas
app.use(express.urlencoded({extender:false}));
app.use(express.json());

// cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//rutas base
app.use('/api/user', user_routes);
app.use('/api/organization', organization_routes);
app.use('/api/dispatch', dispatch_routes);
app.use('/api/lease-operator', leaseOperator_routes);
app.use('/api/lease', lease_routes);
app.use('/api/terminal', terminal_routes);
app.use('/api/order', order_routes);

// app.use('/api', artist_routes);
// app.use('/api', album_routes);
// app.use('/api', song_routes);

module.exports = app; 