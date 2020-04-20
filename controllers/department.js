'use strict'

var DepartmentModel = require('../models/department');

function saveDepartment(req, res){
    var params = req.body;

    var department = new DepartmentModel();
    department.name = params.name;
    department.identifier = params.identifier;
    department.rol = params.rol;

    department.save().then(function(savedDepartment){
        res.status(200).send({department: savedDepartment});
    }).catch(function(error){
        res.status(500).send({message: "Error en el servidor"});
    });
}

function getDepartments(req, res){
    DepartmentModel.find().populate({path: 'rol'}).exec()
    .then(function(departments){
        res.status(200).send({departments: departments});
    }).catch(function(err){
        res.status(500).send({message: "Error en el servidor"});
    });
}

module.exports = {
    saveDepartment,
    getDepartments
}