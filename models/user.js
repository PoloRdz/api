'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    isAdmin: {type: Boolean, default: 'false'},
    department: {type: Schema.ObjectId, ref: 'Department'},
    image: String
});

module.exports = mongoose.model('User', userSchema);