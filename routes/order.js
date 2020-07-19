'use strict'

var express = require('express');
var orderController = require('../controllers/order');
var md_auth = require('../middlewares/authenticate');

var router = express.Router();

router.post('/new', md_auth.ensureAuth, orderController.saveOrder);

module.exports = router;