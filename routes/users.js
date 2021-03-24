var express = require('express');
var router = express.Router();
const account = require('../models/accounts/handlerAccounts');
const tasks = require('../models/tasks/handlerTasks');
const Tasks = require('../models/tasks/tasks');
const Account = require('../models/accounts/accounts');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/createUser', function(req, res, next) {
  res.render('createUser', { title: 'Home Page' });
});

router.post('/createUser', async function(req, res, next) {
  let result = await account.createAccount(req);
  res.render('createUser', {
    title: "Create a new user",
    account: result
  });
});

router.get('/login', function(req, res) {       // display register route
  res.render('login', {                       // display register form view
      title: 'User login'        // input data to view
  });
});

router.post('/login', async function(req, res) {// new user post route
  let rc = await account.verifyAccount(req); // verify credentials
  if (rc && req.session.rights === 'user' || req.session.rights === 'admin') {
        res.render('index', {                   // find the view 'index'
            title: 'Logget ind',         // input data to 'index'
            loggedin: true,
            who: req.session.user,               // using session var(s)
        });
  } else {
      res.render('login', {                   // find the view 'login'
          title: 'Ikke logget ind',   // input data to 'login'
          loggedin: false
      });
  }
});

router.get('/tasks', async function(req, res) {
  let result = await tasks.getTasks({}, {});  
  res.render('tasks', {                       
      title: 'Task testing',                  
      tasks: result        
  });
});

router.get('/addTasks', function(req, res) {
  res.render('addTasks', {
      title: 'Create a task'        
  });
});

router.post('/addTasks', async function(req, res, next) {
  let result = await tasks.createTasks(req);
  res.render('addTasks', {
    title: "Create a task",
    tasks: result
  });
});

router.get('/awaiting', async function(req, res) {
  let result = await account.getAccount({}, {});  
  res.render('awaiting', {                       
      title: 'Task testing',                  
      accounts: result        
  });
});

module.exports = router;
