'use strict'

var express = require('express');
var terminalController = require('../controllers/terminal');
var md_auth = require('../middlewares/authenticate');

var router = express.Router();

router.post('/new', md_auth.ensureAuth, terminalController.saveTerminal);
//router.get('/dispatch/:number', md_auth.ensureAuth, leaseOperatorController.getDispatch);

module.exports = router;