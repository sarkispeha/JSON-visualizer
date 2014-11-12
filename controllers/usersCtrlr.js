/**
 * Created by sshekhar22 on 11/11/14.
 */

/**
 * Handlers to process operations on the datasets collection
 */

// References
var ObjectID = require('mongodb').ObjectID;

//class global private (static) variables
//  none

//constructor
function Users() {
};

/*
 * gets all elements from a collection
 */
Users.prototype.find = function(db, queryObject, callback) {
    var self = this;

    //default query to max 100 results
    queryObject.options.limit=100;

    if (!db.auth) {
      db.authenticate("odp", "Hack4art", function(error, result){
                       console.log("RESULT FROM DB authentication:", error, result)
                       db.collection("users")
                           .find(queryObject.select, queryObject.fields, queryObject.options)
                           .toArray(function(err, result) {
                             console.log("From Users.find:", queryObject.select, err, result)
                                         if (err) throw err;
                                         callback(result);
                                     });
                     });
    } else {
      db.collection("users")
          .find(queryObject.select, queryObject.fields, queryObject.options)
          .toArray(function(err, result) {
cons  ole.log("From Users.find:", queryObject.select, err, result)
              if (err) throw err;
              callback(result);
          });
    }
};

/*
 * insert a document into the collection
 * supports inserting url-form-encoded or json formats
 * TODO:  add url-form-encoded support
 */
Users.prototype.insert = function(db, element, callback) {

    // verify authorization for creating a new user
    if (false) {
        throw new Error("No permission to create a new user.");
    }

    //create a new user object from the request
    //TODO

    console.log("Element: ", element);

    //insert the new dataset
    db.collection("users").insert(element, function(err, results) {
        if (err) {
            console.log('yikes, error on user insert: ' + err);
            throw err;
        }
        console.log('Inserted element into user!', results[0]._id);
        callback(results[0]._id);
    });
};

/*
 * updates an existing user.  update overwrites the existing user unless
 * fields are specified in the url, in which case, only the specified field is overwritten.
 */
Users.prototype.update = function(db, body, elementId, fieldpath, callback) {
    var self = this;

    //TODO:  Construct full object with all metadata, data, and spaces.
    //body = UserModel(body).getValidatedDataset();

    //we are adding a field to the top of
    var selector = {"_id": new ObjectID(elementId)};
    var update = {"$set": body};
    var fields;
    var fstr;

    //if a field path was provided in the URI, constructed a specific setter
    if (fieldpath) {
        //parse apart the fields
        fields = fieldpath.split(/\//);
        console.log("FIELDS: ",fields);
        if (fields.length > 3) {
            var firstField = true;
            for (var i = 3; i < fields.length; i++) {
                if (fields[i].length > 0) {
                    if (firstField) {
                        fstr = fields[i];
                        firstField = false;
                    }
                    else {
                        fstr += "." + fields[i]
                    }
                }
            }
        }
        console.log("fields string: " + fstr);

        //construct set command
        //TODO:

    };

    console.log("DEBUG: selector: " + selector);

    //update the element with the setter constructed.
    db.collection("users").update(selector, update, function(err, results) {
        if (err) throw err;
        console.log("DEBUG: after update: ", err, results);
        callback(elementId);
    });
};


//remove an element by its ID.
Users.prototype.remove = function(db, elementId, callback) {

    var selector = {"_id": new ObjectID(elementId)};

    db.collection("users").remove(selector, function(err, result) {
        console.log("Remove result: ", result);
        callback(result);
    });
};

//export the class
module.exports = Users;
