const mongoose = require('mongoose');
const Account = require('./accounts');
const bcrypt = require('bcrypt');

exports.getAccount = async function(query, sort) {
    const dbname = "todolist";         // databasen hedder todolist
    const findDB = `mongodb://localhost:27017/${dbname}`;
    const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(findDB, conparam);
    const db = mongoose.connection;
    db.once("open", function() {
    console.log("Connected to server by mongoose");
    });
    let result = await Account.find(query, null, sort);
    return result;
};

exports.createAccount = async function(req) {
    const dbname = "todolist";         // databasen hedder todolist
    const findDB = `mongodb://localhost:27017/${dbname}`;
    const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(findDB, conparam);
    const db = mongoose.connection;
    db.once("open", function() {
    console.log("Connected to server by mongoose");
    });
    
    bcrypt.hash(req.body.password, 10, function(error, hash) {
        let account = new Account({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        Account.create(account, function(error, savedDocument) {
            if (error) 
                console.log(error);
            console.log(savedDocument);
            db.close(); 
        });
    });
} 


// const model = require("./accounts");
// const bcrypt = require("bcrypt"); 
// const mongooseWrap = require ('../mongooseWrap');

// exports.createAccount = async function(req, res){
//     let hash = await bcrypt.hash('test', 10);

//     let account = new Account({
//         email: "kennethkskristensen@hotmail.com",
//         password: test, 
//         firstname: "Kenneth",
//         lastname: "Kristensen",
//         rights: model.Roles.admin
//       });
    
//     await mongooseWrap.save(account); 
// }