// 
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var url = "mongodb+srv://new_user:"+config.u_pass+"@cluster0-utqkm.mongodb.net/test?retryWrites=true";
let dbo;

/**
 * @name connect
 * @description
 *  establish database connection
 */

function connect() {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) {
            console.log(err);
        } else {
            dbo = db.db("geodb");
            console.log('Database connection established');
        }
    });
};


/**
 *  insert user object  into database
 */

var dbInsertUser = function dbInsertUser(userObject, cb) {
    dbo.collection("usercollection").insertOne(userObject, function (err, res) {
        if (err) {
            cb(err, null);
        } else {
            console.log(`one user inserted: ${JSON.stringify(userObject)}`);
            return cb(null, res);
        }
    });

};

/**
 *  find user in database by email
 */
var dbFindUser = function dbFindUser(email, cb) {
    dbo.collection("usercollection").find({ email: email }).toArray(function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            console.log(`Found user: ${JSON.stringify(result)}`);
            return cb(null, result)
        }
    });

};

/**
 *  insert geolocation data into database
 */

var dbInsert = function dbInsert(data) {
    dbo.collection("geolocation").insertOne(data, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(`one document inserted: ${JSON.stringify(data)}`);
        }
    });

};


/**
 *  get geolocation data from database by the ip address
 */

var dbFind = function dbFind(data, cb) {
    dbo.collection("geolocation").find({ ip: data.ip }).toArray(function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            console.log(`Found result: ${JSON.stringify(result)}`);
            return cb(null, result);
        }
    });
};

/**
 *  delete geolocation data from database by the entry id
 */

var dbDelete = function dbDelete(id, cb) {
    dbo.collection("geolocation").remove({ id: id }, function (err, res) {
        if (err) {
            cb(err, null);
        } else {
            console.log(`one record removed: ${res}`);
            return cb(null, res)
        };
    });

};

var dbObject = {
    "connect": connect,
    "dbInsertUser": dbInsertUser,
    "dbFindUser": dbFindUser,
    "dbInsert": dbInsert,
    "dbFind": dbFind,
    "dbDelete": dbDelete,

}

/**
 * @description
 * used to expose the methods
 */

module.exports = dbObject;