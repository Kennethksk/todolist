const mongoose = require("mongoose");


const tasksSchema = mongoose.Schema({
    userID: String,
    title: String,
    description: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        default: null
    },
    completionDate: {
        type: Date,
        default: null
    },
    deletedDate: {
        type: Date,
        default: null
    },
    email: String
});

module.exports = mongoose.model("Task", tasksSchema, 'tasks');