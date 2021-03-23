var express = require('express');
var router = express.Router();
const Account = require('../models/accounts/accounts');
const accounts = require('../models/accounts/handlerAccounts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.get('/createUser', function(req, res, next) {
  res.render('createUser', { title: 'Home Page' });
});

router.post('/createUser', async function(req, res, next) {
  let result = await accounts.createAccount(req);
  res.render('createUser', {
    title: "Create a new user",
    accounts: result
  });
});

module.exports = router;