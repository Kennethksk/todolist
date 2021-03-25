var express = require("express");
var router = express.Router();
const account = require("../models/accounts/handlerAccounts");
const tasks = require("../models/tasks/handlerTasks");
const Tasks = require("../models/tasks/tasks");
const Account = require("../models/accounts/accounts");
const accounts = require("../models/accounts/accounts");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/createUser", function (req, res, next) {
  res.render("createUser", { title: "Home Page" });
});

router.post("/createUser", async function (req, res, next) {
  let result = await account.createAccount(req);
  res.render("createUser", {
    title: "Create a new user",
    account: result,
  });
});

router.get("/login", function (req, res) {
  // display register route
  res.render("login", {
    // display register form view
    title: "User login", // input data to view
  });
});

router.post("/login", async function (req, res) {
  // new user post route
  let rc = await account.verifyAccount(req); // verify credentials
  if ((rc && req.session.rights === "user") || req.session.rights === "admin") {
    res.render("index", {
      // find the view 'index'
      title: "Velkommen til din to do liste", // input data to 'index'
      loggedin: true,
      who: req.session.user, // using session var(s)
    });
  } else {
    res.render("login", {
      // find the view 'login'
      title: "Ikke logget ind", // input data to 'login'
      loggedin: false,
    });
  }
});

router.get("/tasks", async function (req, res) {
  if (!req.session.authenticated) {
    // hvis ikke logget ind direkte tilbage ingen grund til at læse først
    res.redirect("/users/login");
  } else {
    //let check = { email: req.session.email }; // obj der udpeger den indloggede user
    let check = {                       // for at blive vist:
      email: req.session.email,        // skal være indloggede user
      completionDate: { $eq: null },   // skal være uden completed date
      deletedDate: { $eq: null  }     // skal være uslettet
  };
    let result = await tasks.getTasks(check, {}); // læs kun dennes todos
    console.log(result);
    res.render("tasks", {
      title: "Task testing",
      tasks: result,
    });
  }
});

router.get("/addTasks", function (req, res) {
  if (!req.session.authenticated) {
    res.redirect("/users/login");
  } else {
    res.render("addTasks", {
      title: "Create a task",
    });
  }
});

router.post("/addTasks", async function (req, res, next) {
  let result = await tasks.createTasks(req);
  res.render("addTasks", {
    title: "Create a task",
    tasks: result,
  });
});

router.get("/awaiting", async function (req, res) {
  let result = await account.getAccount({}, {});
  if (!req.session.authenticated) {
    res.redirect("/users/login");
  } else if (req.session.rights != "admin") {
    res.redirect("/users/tasks");
  } else {
    res.render("awaiting", {
      title: "Awaiting users",
      accounts: result,
    });
  }
});

router.get("/approve/:id", async function (req, res) {
  let result = await account.approveAccount({email: req.params.id}, {});
  res.redirect("/users/awaiting");  
});

router.get("/decline/:id", async function (req, res) {
  let result = await account.declineAccount({email: req.params.id}, {});
  res.redirect("/users/awaiting");  
});

router.get("/historyTasks", async function (req, res) {
  if (!req.session.authenticated) {
    // hvis ikke logget ind direkte tilbage ingen grund til at læse først
    res.redirect("/users/login");
  } else {
    //let check = { email: req.session.email }; // obj der udpeger den indloggede user
    let check = {                       // for at blive vist:
      email: req.session.email,        // skal være indloggede user
      deletedDate: { $ne: null  }     // skal være uslettet
  };
    let result = await tasks.getTasks(check, {}); // læs kun dennes todos
    console.log(result);
    res.render("historyTasks", {
      title: "Your task history",
      tasks: result,
    });
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/users/login");
});

router.get("/complete/:id", function (req, res) {
  tasks.completeTask(req.params.id);
  res.redirect("/users/tasks");
});

router.get("/remove/:id", function (req, res) {
  tasks.removeTask(req.params.id);
  res.redirect("/users/tasks");
});

module.exports = router;
