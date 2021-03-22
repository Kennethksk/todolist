const mongoose = require("mongoose");

const Roles = {
    admin: 'Admin',
    user: 'User'
}

const accountsSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String, 
    lastname: String,
    rights: {type: String, enum: Role, default: Role.user}
});

const User = mongoose.model("Account", accountsSchema, 'accounts');

exports.User = User; 
exports.Roles = Roles;
