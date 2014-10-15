/**
 * Created by cellis on 10/13/14.
 */

/**
 * Handlers to process operations on the datasets collection
 */

// References
var ObjectID = require('mongodb').ObjectID;

//class global private (static) variables
//  none

//constructor
function Datasets() {
};

/*
 * gets all elements from a collection
 */
Datasets.prototype.find = function(db, queryObject, callback) {
    var self = this;

    //default query to max 100 results
    queryObject.options.limit=100;

    db.collection("datasets")
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
Datasets.prototype.insert = function(db, user, element, callback) {

    //verify current user.organization has datasets author role
    if (!user.isDatasetAuthor) {
        throw new Error("User's current organization does not have the datasets author role.");
    }

    //create aq new dataset object from the request
    //TODO

    console.log("Element: ", element);

    //insert the new dataset
    db.collection("datasets").insert(element, function(err, results) {
        if (err) {
            console.log('yikes, error on dataset insert: ' + err);
            throw err;
        }
        console.log('Inserted element into datasets!', results[0]._id);
        callback(results[0]._id);
    });
};

/*
 * updates an existing dataset.  update overwrites the existing dataset unless
 * fields are specified in the url, in which case, only the specified field is overwritten.
 */
Datasets.prototype.update = function(db, body, elementId, fieldpath, callback) {
    var self = this;

    //TODO:  Construct full object with all metadata, data, and spaces.
    //body = DatasetModel(body).getValidatedDataset();

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
    db.collection("datasets").update(selector, update, function(err, results) {
        if (err) throw err;
        console.log("DEBUG: after update: ", err, results);
        callback(elementId);
    });
};


//remove an element by its ID.
Datasets.prototype.remove = function(db, elementId, callback) {

    var selector = {"_id": new ObjectID(elementId)};

    db.collection("datasets").remove(selector, function(err, result) {
        console.log("Remove result: ", result);
        callback(result);
    });
};

//export the class
module.exports = Datasets;