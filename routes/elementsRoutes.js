/**
 * Created by cellis on 10/13/14.
 */
var express = require('express');
var router = express.Router();
var elementCtrlr = require('../controllers/elementsCtrlr');
var dbutils = require('../controllers/dbutils');


/* GET datasets listing. */
function getElements(req, res) {
    var db = req.db;

    //parse http service request
    try {
        var query = dbutils.ParseMongoQueryParams(req.query);
    } catch (e) {
        throw e;
    }

    //get a dataset controller and get some results
    new elementsCtrlr(req.param("dsname")).find(db, query, function (results) {

        if (req.accepts('html')) {
            res.render('collection', { "title": "elements", "results": results });
        } else {
            res.send(results);
        }
    });
};
router.get('/', function(req, res) {getElements(req,res)});
router.get('/:id', function(req, res) {getElement(req,res)});


/*
 * POST to datasets creates a new dataset
 * accept:  json or url-form-encoded
 */
router.post(':dsname/elements', function(req, res) {
    var userobj = {'username': "user1", 'isDatasetAuthor': true};
    console.log("REQ DSNAME: ", req.params);
    new elementCtrlr(req.param.dsname).insert(req.db, userobj, req.body, function(results) {
        res.statusCode=201;
        console.log("POST RESULT1: " + results);
        if (req.accepts('html')) {
            res.send("http://localhost:3000/datasets/" + results);
        } else {
            var obj = { 'id': results};
            console.log("POST RESULT: " + results);
            res.send(obj);
        }
    });
});

/*
 * PUT to datasets updates a dataset
 * accept:  json or url-form-encoded
 */
router.put('/', function(req, res) {
    res.send(new elementCtrlr(req.param("dsname")).insert(req.db, req.body), function(results) {
        res.statusCode(201);  //TODO:  200 or 201, 201 is typical for put, but this is an update?????
        if (req.accepts('html')) {
            res.send("http://localhost:3000/datasets/" + req.param("dsname") + "/elements/" + results);
        } else {
            var obj = { 'id': results};
            res.send(obj);
        }
    });
});

/*
 * DELETE a dataset by its name.
 */
router.delete('/:id', function(req, res) {
    new elementCtrlr(req.param("dsname")).remove(req.db, req.param("id"), function(results) {
        if (results > 0)
            res.send(200);
        else
            //TODO:  get inline with system wide error handling
            res.statusCode(404);
    })
});


module.exports = router;