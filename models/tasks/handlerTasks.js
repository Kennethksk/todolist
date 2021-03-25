const mongoose = require('mongoose');
const Task = require('./tasks');
const dato = require('../date');

module.exports = {
    getTasks: async function(query, sort) {
        const dbname = "todolist";         // databasen hedder todolist
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
        console.log("Connected to server by mongoose");
        });
        let result = await Task.find(query, null, sort);
        return result;
    },

    createTasks: async function(req) {
        const dbname = "todolist";         // databasen hedder todolist
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
        console.log("Connected to server by mongoose");
        });
        
        let task = new Task({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            deadline: req.body.deadline,
            email: req.session.email
        });
        Task.create(task, function(error, savedDocument) {
            if (error) 
                console.log(error);
            console.log(savedDocument);
            db.close(); 
        });
    },

    completeTask: async function(id) {
        const dbname = "todolist";         // databasen hedder todolist
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
        console.log("Connected to server by mongoose");
        });

        let check = {_id: id};
        let date = new Date();
        Task.updateOne(check, { $set: {
            completionDate: date,
            deletedDate: date
        }}, function(error, savedDocument) {
            if (error)
                console.log(error);
            console.log(savedDocument);
            db.close();
        });
    },


    removeTask: async function(id) {
        const dbname = "todolist";         // databasen hedder todolist
        const findDB = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(findDB, conparam);
        const db = mongoose.connection;
        db.once("open", function() {
        console.log("Connected to server by mongoose");
        });

       let check = {_id: id};
        let date = new Date();
        Task.updateOne(check, { $set: {
            deletedDate: date
        }}, function(error, savedDocument) {
            if (error)
                console.log(error);
            console.log(savedDocument);
            db.close();
        });
    }
}