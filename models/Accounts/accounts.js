const mongoose = require("mongoose");

const Roles = {
    ADMIN: 'admin',
    USER: 'user'
}

const userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String, 
    lastname: String,
    rights: {type: String, enum: Role, default: Role.USER}
});

const User = mongoose.model("Account", userSchema, 'accounts');

exports.User = User; 
exports.Role = Role;
