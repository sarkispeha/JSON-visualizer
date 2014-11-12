var express = require('express');
var router = express.Router();
var UserCtrlr = require('../controllers/usersCtrlr');

/* GET users listing. */
router.get('/', function(req, res) {
  var db = req.db;

  //parse http service request
  try {
    var query = dbutils.ParseMongoQueryParams(req.query);
    console.log("Query str:", query)
  } catch (e) {
    throw e;
  }

  //get a dataset controller and get some results
  (new UserCtrlr).find(db, query, function (results) {

    if (req.accepts('html')) {
      res.render('collection', { "title": "users", "results": results });
    } else {
      res.send(results);
    }
  });
});

/*
 * POST to users creates a new dataset
 * accept:  json or url-form-encoded
 */
router.put('/:userid', function(req, res) {

  var bodyobj = JSON.parser(req.body);

  var newUserObj = { email: req.param("userid"), name: bodyobj.name };

  var userobj = {'username': "user1", 'isDatasetAuthor': true};
  (new UserCtrlr).insert(req.db, userobj, newUserObj, function(results) {
    res.statusCode=201;
    console.log("POST RESULT1: " + results);
    if (req.accepts('html')) {
      res.send(results);
    } else {
      var obj = { 'id': results};
      console.log("POST RESULT: " + results);
      res.send(obj);
    }
  });
});


module.exports = router;
