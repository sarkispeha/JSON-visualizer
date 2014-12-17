var test_JSON = require('../models/test_JSON.js');
var api = require('./api.js')
var geocoder = require('geocoder');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	data_model: function(req, res){
		api.geoData(req, res, function(geoData) {
			
			console.log('this is from index :', res)
			console.log('geoData from index :', geoData);
			res.render('data_model', {
				test_JSON : geoData
			});
		});


		// res.send(geo);
	}
};

module.exports = indexController;