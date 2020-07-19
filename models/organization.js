'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationSchema = Schema({
    name: String,
    identifier: String
});

module.exports = mongoose.model('Organization', organizationSchema);