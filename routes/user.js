'use strict'

var express = require('express');
var userController = require('../controllers/user');
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

var api = express.Router();

api.post('/register', userController.saveUser);
api.post('/login', userController.login);
api.put('/user/update/:id', md_auth.ensureAuth, userController.updateUser);
api.put('/user/update-profile/:id', md_auth.ensureAuth, userController.updateProfile);
// api.post('/upload-user-image/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);
// api.get('/get-user-image/:imageFile', userController.getImageFile);

module.exports = api;