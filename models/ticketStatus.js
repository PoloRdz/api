'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    identifier: String,
    description: String
});

module.exports = mongoose.model('TicketStatus', userSchema);