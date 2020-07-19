'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var driverSchema = Schema({
    identifier: String,
    pin: String,
    user: {type: Schema.Objectid, ref: 'User'}
});

module.exports = mongoose.model('Driver', driverSchema);