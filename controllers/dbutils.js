/**
 * Created by cellis on 10/13/14.
 */
/*
 * parse request for mongo query parameters
 */
function ParseMongoQueryParams(params) {

    var queryObject = {};

    //get query options
    queryObject.options = {};
    queryObject.options.limit = params.limit || 0;
    queryObject.options.skip = params.skip || 0;
    if (params.sort) {
        var sort = [];
        var fieldpairs = params.sort.split(',');
        fieldpairs.forEach(function(val){
            var fieldparts = val.split(':');
            if (!fieldparts[1]) {fieldparts[1] = '1'}
            sort.push([fieldparts[0], fieldparts[1]]);
        });
        queryObject.options.sort = sort;
    }

    //get fields - a comma separated list of field names to INCLUDE in the results
    var fieldsObj;
    if (params.fields) {
        fieldsObj = {};
        var fields = params.fields.split(",");
        console.log('fields now: ' + fields);
        fields.forEach(function (val) {
            //console.log('adding val: '+ val);
            fieldsObj[val] = 1;
        });
    }
    queryObject.fields = fieldsObj;

    //get selector
    if (params.select) {
        console.log("select: " + params.select);
        try {
            queryObject.select = JSON.parse(params.select);
        } catch (e) {
            console.log('throwinggggggggg');
            throw e;
        }
    }
    else {
      queryObject.select = {};
    }

    return queryObject;
}


module.exports.ParseMongoQueryParams = ParseMongoQueryParams;
