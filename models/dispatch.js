'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var dispatchSchema = Schema({
    date: Date,
    number: String,
    organization: {type: Schema.ObjectId, ref: 'Organization'}
});

module.exports = mongoose.model('Dispatch', dispatchSchema);