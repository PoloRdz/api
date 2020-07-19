'use strict'

var DispatchModel = require('../models/dispatch');
var moment = require('moment');

function saveDispatch(req, res){
    var params = req.body;

    var dispatch = new DispatchModel();
    dispatch.date = params.date;
    dispatch.number = moment(params.date.toString(), 'yyyy-MM-dd').format('YYYYMMDD');
    dispatch.organization = params.organization;

    DispatchModel.findOne({number: dispatch.number})
    .then(function(foundDispatch){
        if(foundDispatch){
            throw new Error('DI409');
        }
        return dispatch.save();
    }).then(function(savedDispatch){
        res.status(200).send({dispatch: savedDispatch});
    }).catch(function(error){
        if(error.message == 'DI409')
            res.status(409).send({message: 'The dispatch you are trying to create already exists'})
        else
            res.status(500).send({message: error.message});
    });
}

function getDispatch(req, res){
    var dispatchNumber = req.params.number;
    DispatchModel.findOne({number: dispatchNumber})
    .then(function(dispatch){
        res.status(200).send({dispatch: dispatch});
    }).catch(function(err){
        res.status(500).send({message: "Error en el servidor"});
    });
}

module.exports = {
    saveDispatch,
    getDispatch
}