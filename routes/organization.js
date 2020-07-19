'use strict'

var express = require('express');
var organizationController = require('../controllers/organization');
var md_auth = require('../middlewares/authenticate');

var router = express.Router();

router.post('/new', md_auth.ensureAuth, organizationController.saveOrganization);
router.get('/list', md_auth.ensureAuth, organizationController.getOrganizations);

module.exports = router;