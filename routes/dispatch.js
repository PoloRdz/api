'use strict'

var express = require('express');
var dispatchController = require('../controllers/dispatch');
var md_auth = require('../middlewares/authenticate');

var router = express.Router();

router.post('/new', md_auth.ensureAuth, dispatchController.saveDispatch);
router.get('/:number', md_auth.ensureAuth, dispatchController.getDispatch);

module.exports = router;