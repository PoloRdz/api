'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = Schema({
    name: String,
    identifier: String,
    rol: {type: Schema.ObjectId, ref: 'Role'}
});

module.exports = mongoose.model('Department', departmentSchema);