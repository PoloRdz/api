'use strict'

var express = require('express');
var userController = require('../controllers/user');
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

var api = express.Router();

api.post('/register',  userController.saveUser);
api.post('/login', userController.login);
api.put('/update/:id', [md_auth.ensureAuth, md_auth.isAdmin], userController.updateUser);
api.put('/update-profile/:id', md_auth.ensureAuth, userController.updateProfile);
api.delete('/delete/:id', [md_auth.ensureAuth, md_auth.isAdmin], userController.deleteUser);
api.get('/list', [md_auth.ensureAuth, md_auth.isAdmin], userController.getUsers);

api.get('/find-one', userController.findOne);

api.get('/:id', [md_auth.ensureAuth, md_auth.isAdmin], userController.getUser);

// api.post('/upload-user-image/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);
// api.get('/get-user-image/:imageFile', userController.getImageFile);

module.exports = api;