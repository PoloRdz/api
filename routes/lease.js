'use strict'

var express = require('express');
var leaseController = require('../controllers/lease');
var md_auth = require('../middlewares/authenticate');

var router = express.Router();

router.post('/new', md_auth.ensureAuth, leaseController.saveLease);
//router.get('/dispatch/:number', md_auth.ensureAuth, leaseOperatorController.getDispatch);

module.exports = router;