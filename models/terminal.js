'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var terminalSchema = Schema({
    name: String,
    identifier: String,
    organization: {type: Schema.ObjectId, ref: 'Organization'}
});

module.exports = mongoose.model('Terminal', terminalSchema);