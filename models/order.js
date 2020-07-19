'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = Schema({
    number: String,
    dispatch: {type: Schema.ObjectId, ref: 'Dispatch'},
    lease: {type: Schema.ObjectId, ref: 'Lease'},
    terminal: {type: Schema.ObjectId, ref: 'Terminal'},
    tank: String,
    comments: String
});

module.exports = mongoose.model('Order', orderSchema);