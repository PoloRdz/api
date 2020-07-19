'use strict'

var OrganizationModel = require('../models/organization');

function saveOrganization(req, res){
    var params = req.body;

    var organization = new OrganizationModel();
    organization.name = params.name;
    organization.identifier = params.identifier;

    OrganizationModel.findOne({identifier: params.identifier})
    .then(foundUser => {
        if(foundUser)
            throw new Error('OR409');
        return organization.save()
    }).then(function(savedOrganization){
        res.status(200).send({organization: savedOrganization});
    }).catch(function(err){
        if(err.message == 'OR409')
            res.status(409).send({message: 'This organization already exists'});
        else
            res.status(500).send({message: 'Internal Server Error'});
    });
}

function getOrganizations(req, res){
    OrganizationModel.find().populate({path: 'rol'}).exec()
    .then(function(departments){
        res.status(200).send({departments: departments});
    }).catch(function(err){
        res.status(500).send({message: "Error en el servidor"});
    });
}

module.exports = {
    saveOrganization,
    getOrganizations
}