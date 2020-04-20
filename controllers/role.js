'use strict'

var roleModel = require('../models/role');

function saveRole(req, res){
    var role = new roleModel();
    var params = req.body;

    role.name = params.name;
    role.identifier = params.identifier;

    console.log(role);

    role.save().then(function(savedRole){
        res.status(200).send({role: savedRole});
    }).catch(function(error){
        res.status(500).send({message: "Error en el servidor"});
    });
}

module.exports = {
    saveRole
}