'use strict'

var jwt  = require('jwt-simple');
var moment = require('moment');
var secret = 'claveSecretaCurso';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(2, 'days').unix()
    };
    return jwt.encode(payload, secret);
};