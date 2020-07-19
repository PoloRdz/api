'use strict'

var express = require('express');
var priorityController = require('../controllers/priority');
var md_auth = require('../middlewares/authenticate');
var router = express.Router();

router.get('/priority/get', md_auth.ensureAuth, priorityController.getPriorities);
router.post('/priority/save', [md_auth.ensureAuth, md_auth.isAdmin], priorityController.savePriority);

module.exports = router;