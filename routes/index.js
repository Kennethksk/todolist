var express = require('express');
var router = express.Router();
const Account = require('../models/accounts/accounts');
const accounts = require('../models/accounts/handlerAccounts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

module.exports = router;