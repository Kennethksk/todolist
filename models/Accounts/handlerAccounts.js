const model = require("./accounts");
const bcrypt = require("bcrypt"); 
const mongooseWrap = require ('../mongooseWrap');
//const Role = require('./user');

exports.createAccount = async function(req, res){
    let hash = await bcrypt.hash('test', 10);

    let account = new model.Account({
        email: "morten@iba.dk",
        password: test, 
        firstname: "Morten",
        lastname: "Due",
        rights: model.Role.admin
      });
    
    await mongooseWrap.save(account); 
}

// const mongoose = require('mongoose');
// const Person = require('../models/persons');
// const bcrypt = require('bcrypt');

// exports.getPersons = async function(query, sort) {
//     const dbname = "library";         // databasen hedder library
//     const findDB = `mongodb://localhost:27017/${dbname}`;
//     const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
//     await mongoose.connect(findDB, conparam);
//     const db = mongoose.connection;
//     db.once("open", function() {
//     console.log("Connected to server by mongoose");
//     });
//     let result = await Person.find(query, null, sort);
//     return result;
// };

// exports.putPersons = async function(req) {
//     const dbname = "library";         // databasen hedder library
//     const findDB = `mongodb://localhost:27017/${dbname}`;
//     const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
//     await mongoose.connect(findDB, conparam);
//     const db = mongoose.connection;
//     db.once("open", function() {
//     console.log("Connected to server by mongoose");
//     });
    
//     let newsletter = req.body.newsletter=='on' ? true : false;
//     bcrypt.hash(req.body.password, 10, function(error, hash) {
//         let person = new Person({
//             cpr: req.body.cpr,
//             currentpenalties: 0,
//             email: req.body.email,
//             firstname: req.body.loanerFname,
//             lastname: req.body.loanerLname,
//             middlename: req.body.loanerMname,
//             newsletter: newsletter,
//             password: hash
//         });
//         Person.create(person, function(error, savedDocument) {
//             if (error) 
//                 console.log(error);
//             console.log(savedDocument);
//             db.close(); 
//         });
//     });
// } 