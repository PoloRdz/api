'use strict'

var LeaseOperatorModel = require('../models/leaseOperator');

function saveLeaseOperator(req, res){
    var params = req.body;

    var leaseOperator = new LeaseOperatorModel();
    leaseOperator.name = params.name;

    leaseOperator.save().then(function(savedLeaseOperator){
        res.status(200).send({leaseOperator: savedLeaseOperator});
    }).catch(function(error){
        res.status(500).send({message: "Error en el servidor"});
    });
}

function getLeaseOperator(req, res){
    var leaseOpNumber = req.params.number;
    LeaseOperatorModel.findOne({number: leaseOpNumber})
    .then(function(dispatch){
        res.status(200).send({dispatch: dispatch});
    }).catch(function(err){
        res.status(500).send({message: "Error en el servidor"});
    });
}

function getLeaseOperators(req, res){
    LeaseOperatorModel.find()
    .then(leaseOperatos => {
        res.status(200).send({leaseOperators: leaseOperatos});
    })
    .catch(error => {
        res.status(500).send({message: 'Error en el servidor'});
    })
}

function updateLeaseOperator(req, res){
    var leaseOperator = new LeaseOperatorModel();
    var params = req.body;
    LeaseOperatorModel.findOne({_id: req.params.id})
    .then(leaseOp => {
        if(leaseOp){
            leaseOperator = leaseOp;
            leaseOperator.name = params.name;
            return leaseOperator.save();
        } else{
            throw new Exception("The lease operator you're trying to update doesn't exist");
        }
    })
    .then(savedLeaseOp => {
        res.status(200).send({leaseOperator: savedLeaseOp});
    })
    .catch(error => {
        res.status(500).send({message: error.message});
    })
    
}

module.exports = {
    saveLeaseOperator,
    getLeaseOperator,
    getLeaseOperators,
    updateLeaseOperator
}