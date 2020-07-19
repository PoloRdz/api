'use strict'

var UserModel = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function saveUser(req, res) {
    var user = new UserModel();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email.toLowerCase();
    user.isAdmin = params.isAdmin;
    user.username = params.username;
    user.image = null;

    UserModel.findOne({
        $or: [
            {email: user.email},
            {username: user.username}
        ]
    })
    .then(function(user){
        if(!user){
            return bcrypt.genSalt(10);
        } else{
            throw new Error("US409");
        }
    }).then(function(salt){
        return bcrypt.hash(params.password, salt);
    }).then(function(hash){
        user.password = hash;
        return user.save();
    }).then(function(savedUser){
        res.status(200).send({user: savedUser});
    }).catch(function (err) {
        if(err.message == 'US409'){
            res.status(500).send({ message: 'The user you\'re trying to create already exists'});    
        } else{
            res.status(500).send({ message: err.message });
        }        
    });
}

function getUser(req, res){
    var id = req.params.id;

    UserModel.findOne({_id: id})
    .then(function(user){
        if(user){
            res.status(200).send({user: user});
        } else{
            throw new Error('El usuario no existe');
        }
    })
    .catch(function(error){
        res.status(500).send({message: error.message});
    });
}

function getUsers(req, res){
    UserModel.find()
    .then(function(users){
        if(users)
            res.status(200).send({users: users});
        else
            throw new Error('US404');
    })
    .catch(function(error){
        if(error.message == 'US404')
            res.status(404).send({message: 'There are no users available'});
        else
            res.status(500).send({message: 'Unexpected Server Error'});
    });
}

function login(req, res) {
    var login = new UserModel();
    var params = req.body;

    var email = params.email.toLowerCase();
    var password = params.password;

    UserModel.findOne({email: email})
    .then(function(user){
        if(!user){
            throw new Error('US404');
        }
        login = user;
        return bcrypt.compare(password, user.password);
    }).then(function(check){
        if(check){
            res.status(200).send({user: login, token: jwt.createToken(login)});
        } else{
            throw new Error('US401');
        }
    }).catch(function(err){
        if(err.message == 'US404')
            res.status(404).send({message: 'Incorrect username'});
        else if(err.message == 'US401')
            res.status(401).send({message: 'Incorrect password'})
        else 
            res.status(500).send({message: 'Unexpected Server Error'});
    });
}

function findOne(req, res) {
    var login = new UserModel();

    var email = req.query.email;

    UserModel.findOne({email: email})
    .then(function(user){
        if(!user){
            throw new Error('US404');
        }
        res.status(200).send({user: user});
    }).catch(function(err){
        if(error.message == 'US404')
            res.status(404).send({message: 'User not found'});
        else
            res.status(500).send({ message: 'Unexpected Server Error'});
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    //user.department = body.department._id;

    UserModel.findByIdAndUpdate(userId, update)
    .then(function (userUpdated) {
        res.status(200).send({ user: userUpdated });
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).send({ message: 'Error al actualizar el usuario' });        
    });
}

function updateProfile(req, res){
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
        throw new Error('No tienes permiso para actualizar este usuario');
    }

    UserModel.findByIdAndUpdate(userId, update).then(function (userUpdated) {
        res.status(200).send({ user: userUpdated });
    })
    .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
}

function deleteUser(req, res){
    var userId = req.params.id;

    UserModel.findByIdAndDelete(userId).then(function(deletedUser){
        res.status(200).send({user: deletedUser});
    })
    .catch(function(err){
        res.status(500).send({message: 'Internal Server Error'});
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
            UserModel.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({ message: 'Couldn\'t save image' });
                } else {
                    res.status(200).send({ image: file_name, user: userUpdated });
                }
            });
        } else {
            res.status(200).send({ message: 'Invalid file extension' })
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
    getUser,
    login,
    updateUser,
    updateProfile,
    deleteUser,
    getUsers,
    uploadImage,
    getImageFile,
    findOne
};