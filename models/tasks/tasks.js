const mongoose = require("mongoose");


const tasksSchema = mongoose.Schema({
    userID: String,
    title: String,
    description: String,
    startDate: String,
    deadline: String,
    status: {type: Boolean, default: false},
    completionDate: String,
    email: req.session.email
});

module.exports = mongoose.model("Task", tasksSchema, 'tasks');