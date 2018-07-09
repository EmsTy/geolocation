var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require('./VerifyToken');
var db = require('../db');

// modules for using JSON Web Tokens and encrypting passwords
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Here we’re expecting the user to send us three values, a name, an email and a password.
// We’re immediately going to take the password and encrypt it with Bcrypt’s hashing method.
//var hashedPassword = bcrypt.hashSync(req.body.password, 8);
var hashedPassword = bcrypt.hashSync(config.password, 8);

var userObject = {
  "name": "Emilia",
  "email": "emi.tyb@gmai.com",
  "password": hashedPassword
};


/*
 * '/register' endpoint
*/

router.get('/register', function (req, res) {
  // Take the hashed password, include name and email and create a new user. 
  // After the user has been successfully created, we’re at ease to create a token for that user.

  db.dbInsertUser(userObject, function (err, user) {
    if (err) return res.status(500).send('There was a problem registering the user.')
    // create a token
    // The jwt.sign() method takes a payload and the secret key defined in config.js as parameters.
    // It creates a unique string of characters representing the payload. In our case, the payload is an object containing only the id of the user.

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    console.log(token);
    res.status(200).send({ auth: true, token: token });
  });
});

/*
 * '/login' endpoint
*/

router.get('/login', function (req, res) {
  db.dbFindUser(userObject.email, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(config.password, user[0].password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});


/*
 * '/logout' endpoint
*/

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});


module.exports = router;