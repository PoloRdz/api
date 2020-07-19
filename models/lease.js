'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaseSchema = Schema({
    name: String,
    shortname: String,
    identifier: String,
    leaseOperator: {type: Schema.ObjectId, ref: 'LeaseOperator'}
});

module.exports = mongoose.model('Lease', leaseSchema);