'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaseOperatorSchema = Schema({
    name: String
});

module.exports = mongoose.model('LeaseOperator', leaseOperatorSchema);