'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petitionerSchema = Schema({
    name: String,
    surname: String,
    email: String    
});

module.exports = mongoose.model('Petitioner', petitionerSchema);