/**
 * Created by cellis on 10/13/14.
 */

/**
 * Handlers to process operations on the elements of datasets collection
 */

// References
var ObjectID = require('mongodb').ObjectID;

//class global private (static) variables
//  none

//constructor
function Elements(dataSetName) {
    console.log("ELEMENTS CONSTRUCTOR:  ", dataSetName);
    this.dataSetName = dataSetName;
};

/*
 * gets all elements from a collection
 */
Elements.prototype.find = function(db, queryObject, callback) {
    var self = this;
    console.log ("this/self: ", this, self);

    //default query to max 100 results
    queryObject.options.limit=100;

    db.collection(self.dataSetName)
        .find(queryObject.select, queryObject.fields, queryObject.options)
        .toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
};

Elements.prototype.findById = function(db, elementId, callback) {
    var self = this;
    console.log ("this/self: ", this, self);

    //default query to max 100 results
    var queryObject = {};
    queryObject.options = {};
    queryObject.options.limit=100;
    queryObject.fields = {};
    queryObject.select = {"_id": new ObjectID(elementId)};

    db.collection(self.dataSetName)
        .find(queryObject.select, queryObject.fields, queryObject.options)
        .toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
};



/*
 * insert a document into the collection
 * supports inserting url-form-encoded or json formats
 * TODO:  add url-form-encoded support
 */
Elements.prototype.insert = function(db, user, element, callback) {
    var self = this;

    //verify current user.organization has datasets author role
    if (!user.isDatasetAuthor) {
        throw new Error("User's current organization does not have the datasets author role.");
    }

    //create aq new dataset object from the request
    //TODO

    console.log("Element: ", element, self.dataSetName);

    //insert the new dataset
    db.collection(self.dataSetName).insert(element, function(err, results) {
        if (err) {
            console.log('yikes, error on dataset insert: ' + err);
            throw err;
        }
        console.log('Inserted element into %s: ', self.dataSetName, results[0]._id);
        callback(results[0]._id);
    });
};

/*
 * updates an existing dataset.  update overwrites the existing dataset unless
 * fields are specified in the url, in which case, only the specified field is overwritten.
 */
Elements.prototype.update = function(db, body, elementid, fieldpath, callback) {
    var self = this;

    //we are adding a field to the top of
    var selector = {"_id": new ObjectID(elementid)};
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

    //update the element with the setter constructed.
    db.collection(self.dataSetName).update(selector, update, function(err, results) {
        if (err) throw err;
        callback(results);
    });
};


//remove an element by its ID.
Elements.prototype.remove = function(db, elementId, callback) {
    var self = this;
    var selector = {"_id": new ObjectID(elementId)};

    db.collection(self.dataSetName).remove(selector, function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

//export the class
module.exports = Elements;