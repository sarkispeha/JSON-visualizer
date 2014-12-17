var test_JSON = require('../models/test_JSON.js');
var geocoder = require('geocoder');

var api = {
	geoData: function(req, res, callback) {
		var geo = {};
		var placeInfo = '2100 22nd st, Boulder, CO';
		geocoder.geocode(placeInfo,function(err, data){
			// var lat = data.results[0].geometry.location.lat;
			// var lng = data.results[0].geometry.location.lng;
			
			//geo = data;
			console.log('this console.log is in the api: ', data);
			callback(data);
			// function(results){
			// res.send(geo);//what we want
			// };
		})
	}
};

module.exports = api;