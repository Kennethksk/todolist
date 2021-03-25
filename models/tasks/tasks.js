const mongoose = require("mongoose");


const tasksSchema = mongoose.Schema({
    userID: String,
    title: String,
    description: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    deadline: Date,
    status: {type: Boolean, default: false},
    completionDate: Date,
    deletedDate: Date,
    email: String
});

module.exports = mongoose.model("Task", tasksSchema, 'tasks');