var test_JSON = require('../models/test_JSON.js');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	data_model: function(req, res){
		res.render('data_model', {
			// meta_id : test_JSON.meta._id
			test_JSON : test_JSON
		});
	}
};

module.exports = indexController;