'use strict'

var express = require('express');
var leaseOperatorController = require('../controllers/leaseOperator');
var md_auth = require('../middlewares/authenticate');

var router = express.Router();

router.post('/new', md_auth.ensureAuth, leaseOperatorController.saveLeaseOperator);
router.put('/:number', [md_auth.ensureAuth, md_auth.isAdmin], leaseOperatorController.updateLeaseOperator);
router.get('/list', md_auth.ensureAuth, leaseOperatorController.getLeaseOperators);
router.get('/:number', md_auth.ensureAuth, leaseOperatorController.getLeaseOperator);
//router.get('/dispatch/:number', md_auth.ensureAuth, leaseOperatorController.getDispatch);

module.exports = router;