'use strict'

var express = require('express');
var roleController = require('../controllers/role');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

api.post('/role/new', roleController.saveRole);

module.exports = api;