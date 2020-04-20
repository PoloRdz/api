'use strict'

var express = require('express');
var departmentController = require('../controllers/department');
var md_auth = require('../middlewares/authenticate');

var router = express.Router();

router.post('/department/new', md_auth.ensureAuth, departmentController.saveDepartment);
router.get('/department/getAll', md_auth.ensureAuth, departmentController.getDepartments);

module.exports = router;