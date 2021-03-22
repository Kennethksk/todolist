const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {type: String, unique: true},
    firstname: String,
    lastname: String,
    password: String,
})

module.exports = mongoose.model("Admin", adminSchema, 'admins');    // 1. parameter er modulets navn, 2. parameter er schema og 3. parameter er kollektionsnavn(books collection fra databasen)