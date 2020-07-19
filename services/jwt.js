'use strict'

var jwt  = require('jwt-simple');
var moment = require('moment');
var secret = 'claveSecreta';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        isAdmin: user.isAdmin,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(2, 'days').unix()
    };
    return jwt.encode(payload, secret);
};