var test_JSON = require('../models/test_JSON.js');
var api = require('./api.js')
var geocoder = require('geocoder');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	data_model: function(req, res){
		api.geoData(req, res);
		var geo = req.api.geoData;
		console.log('geoData from index :', geo);
		console.log('this console.log is in the index : ', api.geoData());
		res.render('data_model'/*, {
			test_JSON : test_JSON
		}*/);

		// res.send(geo);
	}
};

module.exports = indexController;