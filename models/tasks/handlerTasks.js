const mongoose = require('mongoose');
const Tasks = require('./tasks');

exports.getTasks = async function(query, sort) {
    const dbname = "todolist";         // databasen hedder todolist
    const findDB = `mongodb://localhost:27017/${dbname}`;
    const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(findDB, conparam);
    const db = mongoose.connection;
    db.once("open", function() {
    console.log("Connected to server by mongoose");
    });
    let result = await Tasks.find(query, null, sort);
    return result;
};