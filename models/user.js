'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    surname: String,
    username: String,
    email: String,
    password: String,
    isAdmin: {type: Boolean, default: 'false'},
    image: String
});

module.exports = mongoose.model('User', userSchema);