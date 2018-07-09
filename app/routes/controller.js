'use strict'
var util = require('./service');
var db = require('../.././db');

module.exports = function (app, express) {

  var api = express.Router();



  /**
   * @name addGeolocation
   * @description
   *  end point to store geolocation data available
   */

  api.get('/addGeolocation', function (req, res) {
    var result = util.getGeolocation(function (err, response, data) {
      if (err) {
        console.log(err);
      } else {
        // store in database
        db.dbInsert(JSON.parse(data));
        res.send(data);
      }
    });
  });



  /**
   * @name getGeolocation
   * @description
   * end point to get geolocation available
   */

  api.get('/getGeolocation', function (req, res) {

    util.getGeolocation(function (err, response, data) {
      if (err) {
        console.log(err);
      } else {
        // store in database
        db.dbFind(JSON.parse(data), function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      }
    });
  });



  /**
   * @name deleteGeolocation
   * @description
   * end point to delete geolocation data
   * @param id unique identifier of a record in database
   */

  api.get('/deleteGeolocation/:id', function (req, res) {

    // remove from database by id parameter
    db.dbDelete(req.params.id, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  return api;

}