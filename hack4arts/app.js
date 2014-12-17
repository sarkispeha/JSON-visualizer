var express = require('express');
var bodyParser = require('body-parser');

//controllers
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/api.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

//views
app.get('/', indexController.index);
app.get('/data_model', indexController.data_model);

//routes
app.get('/api/geocode', apiController.geoData);

var server = app.listen(5074, function() {
	console.log('Express server listening on port ' + server.address().port);
});
