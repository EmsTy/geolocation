// function to check the validity of tokens

var jwt = require('jsonwebtoken');
var config = require('../config');
function verifyToken(req, res, next) {
  //var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzE0MDY5NDIsImV4cCI6MTUzMTQ5MzM0Mn0.6pRzFFSYBr-azMlc_C6x-0tbtXlRevXkbEaULsz531o';
  var token = req.headers.token;
  console.log(`TOKEN:  ${token}`);

  if (!token)
    //return res.status(403).send({ auth: false, message: 'No token provided.' });
    return res.status(401).send({ auth: false, message: 'No token provided.' });
    // HTTP status code: 401 - no token provided, 403 - bad token, 400 - bad request (general)
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    //return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}


module.exports = verifyToken;