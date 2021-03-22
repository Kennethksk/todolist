const mongoose = require('mongoose');
const account = require('./accounts');
const bcrypt = require('bcrypt');
const getAccount = require('./handlerAccounts');

exports.verifyAccount = async function (req) {
    let check = { email: req.body.email };
    let u = await this.getAccount(check);
    let success = await bcrypt.compare(req.body.password, u[0].password);
    if (success) {
        req.session.authenticated = true;       // set session vars
        req.session.user = u[0].firstName;      // set session vars
    } else {
        req.session.destroy();
    }
    return success;
};