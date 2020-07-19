'use strict'

var LeaseModel = require('../models/lease');

function saveLease(req, res){
    var params = req.body;

    var lease = new LeaseModel();
    lease.name = params.name;
    lease.shortname = req.body.shortname;
    lease.identifier = params.identifier;
    lease.leaseOperator = params.leaseOperator;

    LeaseModel.findOne({identifier: lease.identifier})
    .then(function(result){
        if(result){
            throw new Error("Lease already exists");
        } else{
            return lease.save();
        }
    })
    .then(function(savedLease){
        res.status(200).send({lease: savedLease});
    }).catch(function(error){
        res.status(500).send({message: error.message});
    });;
}

//TODO Editar metodo
function getLease(req, res){
    var dispatchNumber = req.params.number;
    LeaseModel.findOne({number: dispatchNumber})
    .then(function(dispatch){
        res.status(200).send({dispatch: dispatch});
    }).catch(function(err){
        res.status(500).send({message: "Error en el servidor"});
    });
}

module.exports = {
    saveLease,
    getLease
}