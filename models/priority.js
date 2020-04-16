'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prioritySchema = Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Priority', prioritySchema);