
var express = require('express');
var bodyParser = require('body-parser'); // used to handle request parameter
var config = require('./config'); // config file
var VerifyToken = require('./auth/VerifyToken');
var db = require('./db');
var app = express();


// allows form parameter binding to req object and extended true basically allows you to parse full objects 
app.use(bodyParser.urlencoded({ extended: true }));
// allows to handle json request parameter
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); // serves static file from public folder

// establish db connection
db.connect();

// requiring the auth controller and with app.use telling the app to link it to the route /users
var auth = require('./auth/AuthController');
app.use('/api/auth', auth);


// end point will be accessed by appending api to the end point
var api = require('./app/routes/controller')(app, express);
app.use('/api', VerifyToken, api);



app.listen(config.port, function (err) {

  if (err) {
    console.log("error");
  } else {
    // CHNAGE config file name
    console.log(`Server listening on port ${config.port}`);
  }

});


// app object visible to the rest of the program
module.exports = app;
