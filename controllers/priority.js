'use strict'

var PriorityModel = require('../models/priority');

function getPriorities(req, res){
    PriorityModel.find().then(function(priorities){
        res.status(200).send({priorities: priorities});
    })
    .catch(function(err){
        res.status(500).send({message: 'No fue posible obtener la lista de prioridad'});
    });
}

function savePriority(req, res){
    var params = req.body;

    var priority = new PriorityModel();
    priority.name = params.name;
    priority.description = params.description;

    priority.save().then(function(savedPriority){
        res.status(200).send({priority: savedPriority});
    })
    .catch(function(err){
        res.status(500).send({message: 'No fue posible guardar los datos'});
    });
}

module.exports = {
    getPriorities,
    savePriority
}