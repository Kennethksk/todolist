const model = require("./user");
const bcrypt = require("bcrypt"); 
const mongooseWrap = require ('../../lib/mongooseWrap');
//const Role = require('./user');

exports.createUser = async function(req, res){
    let hash = await bcrypt.hash('test', 10);

    let user = new model.User({
        email: "morten@iba.dk",
        password: hash, 
        firstname: "Morten",
        lastname: "Højrup Kristensen",
        rights: model.Role.ADMIN
      });
    
    await mongooseWrap.save(user); 
}