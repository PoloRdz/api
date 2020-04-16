'use strict'

var userModel = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function saveUser(req, res) {
    var user = new userModel();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email.toLowerCase();
    user.isAdmin = params.isAdmin;
    user.department = params.department;
    user.image = null;

    userModel.findOne({email: user.email})
    .then(function(user){
        if(!user){
            return bcrypt.genSalt(10);
        } else{
            res.status(409).send({message: 'El email que intentas registrar ya existe'});
        }
    }).then(function(salt){
        return bcrypt.hash(params.password, salt);
    }).then(function(hash){
        user.password = hash;
        return user.save();
    }).then(function(savedUser){
        res.status(200).send({user: savedUser});
    }).catch(function (err) {
        res.status(500).send({ message: 'Error al guardar usuario' });
    });
}

function login(req, res) {
    var login = new userModel();
    var params = req.body;

    var email = params.email.toLowerCase();
    var password = params.password;

    userModel.findOne({email: email})
    .then(function(user){
        if(!user){
            res.status(404).send({ message: 'El usuario no existe'});
        } else{
            login = user;
            return bcrypt.compare(password, user.password);
        }
    }).then(function(check){
        if(check){
            res.status(200).send({user: login, token: jwt.createToken(login)});
        } else{
            res.status(404).send({ message: 'Contraseña incorrecta'});
        }
    }).catch(function(err){
        res.status(500).send({ message: 'Error en la peticion'});
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    userModel.findByIdAndUpdate(userId, update)
    .then(function (userUpdated) {
        res.status(200).send({ user: userUpdated });
    })
    .catch(function (err) {
        res.status(500).send({ message: 'Error al actualizar el usuario' });
    });
}

function updateProfile(req, res){
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permiso para actualizar este usuario' });
    }

    userModel.findByIdAndUpdate(userId, update).then(function (userUpdated) {
        res.status(200).send({ user: userUpdated });
    })
    .catch(function (err) {
        res.status(500).send({ message: 'Error al actualizar el perfil' });
    });
}

function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = '';
    if (req.files) {

        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jfif') {
            userModel.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                } else {
                    res.status(200).send({ image: file_name, user: userUpdated });
                }
            });
        } else {
            res.status(200).send({ message: 'Extensión del archivo no valida' })
        }

        console.log(ext_split);
    } else {
        res.status(200).send({ message: 'No has subido ninguna imagen...' });
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/' + imageFile;
    fs.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({ message: 'No existe la imagen' });
        }
    });
}

module.exports = {
    saveUser,
    login,
    updateUser,
    updateProfile,
    uploadImage,
    getImageFile
};