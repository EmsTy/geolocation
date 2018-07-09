'use strict'

//module used to make http request
var request = require('request');
//configuration object
var config = require('./../../config');


/**
 * @name getGeolocation
 * @description
 *  service function to get geolocation data
 * @param cb a callback function
 */

var getGeolocation = function getGeolocation(cb) {
  var url = config.basepath.concat("?access_key=").concat(config.apikey);
  request(url, function (error, response, body) {
    cb(error, response, body); //callback function
  });
};

/**
 * @description
 * Service object to expose required functions
 */

var serviceObject = {
  "getGeolocation": getGeolocation
};

/**
 * @description
 * used to expose the methods
 */
module.exports = serviceObject;