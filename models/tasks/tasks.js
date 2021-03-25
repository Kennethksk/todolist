const mongoose = require("mongoose");
const dato = require('../date');

const tasksSchema = mongoose.Schema({
    userID: String,
    title: String,
    description: String,
    startDate: {
        type: String,
        default: dato.formatedDate()
    },
    deadline: {
        type: String,
        default: null
    },
    completionDate: {
        type: String,
        default: null
    },
    deletedDate: {
        type: String,
        default: null
    },
    email: String
});

module.exports = mongoose.model("Task", tasksSchema, 'tasks');