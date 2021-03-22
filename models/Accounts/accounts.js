const mongoose = require("mongoose");

const accountsSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String, 
    lastname: String,
    rights: {type: String, enum: ["admin", "user", "xyz"], default: "xyz"}
});

module.exports = mongoose.model("Account", accountsSchema, 'accounts');