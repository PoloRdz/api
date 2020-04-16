'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = Schema({
    role: String,
    identifier: String
});

module.exports = mongoose.model('Role', roleSchema);