const model = require('./person');
const mongooseWrap = require('../mongooseWrap');
const bcrypt = require('bcrypt');
const saltRounds = 10; 


exports.readPerson = async function(req, res, query){
    try {
        let personinfo = await mongooseWrap.retrieve(model.Person, query);
        return personinfo;
        
    } catch (error) {
        console.log(error);
    }
}

exports.updatePerson = async function(req, res, query, updatequery){
    try {
        await mongooseWrap.update(model.Person, query, updatequery);
        
    } catch (error) {
        console.log(error);
    }
}


exports.comparePassword = async function(plain, personinfo, req){
    //comparing plaintext (input) to hash value from database
    const loggedin = await bcrypt.compare(plain, personinfo[0].password);
    if(loggedin){
        req.session.authenticated = true;       // set session vars
        req.session.user = personinfo[0].email;  
    }

    return loggedin;
}

exports.postPerson = async function(req, res){
    let hash = await bcrypt.hash(req.body.password, saltRounds);

    if(req.body.newsletter == 'on'){
        req.body.newsletter = true;
    } 
    else{
        req.body.newsletter = false;
    };

    let person = new model.Person({
        cpr: req.body.cpr, 
        currentpenalties: 0,
        email: req.body.email,
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        middlename: req.body.middlename, 
        newsletter: req.body.newsletter,
        password: hash
      });

    await mongooseWrap.save(person); 
    req.session.authenticated = true;       // set session vars
    req.session.user = req.body.email;
    res.redirect('/library/booksview');     
}