var express = require('express');
var router = express.Router();
const verifyAccount = require('../models/Accounts/handlerUsers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {       // display register route
  res.render('login', {                       // display register form view
      title: 'User login'        // input data to view
  });
});
router.post('/login', async function(req, res) {// new user post route
  let rc = await verifyAccount.verifyAccount(req); // verify credentials
  if (rc) {
      res.render('index', {                   // find the view 'index'
          title: 'nodeAuthDemo Home',         // input data to 'index'
          loggedin: true,
          who: req.session.user               // using session var(s)
      });
  } else {
      res.render('login', {                   // find the view 'login'
          title: 'nodeAuthDemo User Login',   // input data to 'login'
          loggedin: false
      });
  }
});


module.exports = router;
