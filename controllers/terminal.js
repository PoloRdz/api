'use strict'

var TerminalModel = require('../models/terminal');

function saveTerminal(req, res){
    var terminal = new TerminalModel();
    terminal.name = req.body.name;
    terminal.identifier = req.body.identifier;
    terminal.organization = req.body.organization;

    terminal.save()
    .then(function(savedTerminal){
        res.status(200).send({terminal: savedTerminal});
    }).catch(function(error){
         res.status(500).send({message: 'Error en el servidor'});
    });
}

module.exports = {
    saveTerminal
}