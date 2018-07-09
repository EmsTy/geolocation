// function to check the validity of tokens

var jwt = require('jsonwebtoken');
var config = require('../config');
function verifyToken(req, res, next) {
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzExMDA3MzQsImV4cCI6MTUzMTE4NzEzNH0.wUGq0drOq1MVOaOr0yIXjAlxytgXnYHpFA5f1ILMZg8';
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}


module.exports = verifyToken;