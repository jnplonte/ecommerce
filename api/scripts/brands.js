var config = require( "../config.js" );
var connection = require( "./helpers/database" );
var helpMe = require( "./helpers/helpme" );

var brandsFunctions = function() {
	this.allBrand = allBrand;
  this.getBrand = getBrand;
	this.postBrand = postBrand;
	this.putBrand = putBrand;
	this.deleteBrand = deleteBrand;
	this.getBrandValue = getBrandValue;
};

var query = 'SELECT * FROM brands';

function allBrand(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var page = req.query.page || 1;
	var finalQuery = query;

	helpMe.getQuery(helpMe.queryLimit(helpMe.queryOrder(finalQuery), page), function(results){
		res.json(results);
	});
}

function getBrand(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id || null;

	getBrandValue(id, function(results){
		res.json(results);
	});
}

function postBrand(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  if(typeof(req.body) != 'undefined' && req.body.name && req.body.description){
		var name = req.body.name, description = req.body.description;
		var finalQuery = 'INSERT INTO brands SET ?', params = {"name": name, "description": description};
		helpMe.postQuery(finalQuery, params, function(results){
			res.json(results);
		});
	}else{
		res.json({"error": {"code":"name and description is required"}});
	}
}

function putBrand(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var id = req.params.id || null;
	getBrandValue(id, function(validationResults){
		if(validationResults.length >= 1){
			if(typeof(req.body) != 'undefined' && (req.body.name || req.body.description)){
				var finalQuery = 'UPDATE brands SET ? WHERE id = ' + connection.escape(id), params = {};
				if(req.body.name){
					params.name = req.body.name;
				}

				if(req.body.description){
					params.description = req.body.description;
				}

				helpMe.putQuery(finalQuery, params, function(results){
					res.json(results);
				});
			}else{
				res.json({"error": {"code":"name or description is required"}});
			}
		}else{
			res.json({"error": {"code":"invalid brand id"}});
		}
	});
}

function deleteBrand(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var id = req.params.id || null;
	getBrandValue(id, function(validationResults){
		if(validationResults.length >= 1){
			var finalQuery = 'DELETE FROM brands WHERE id = ' + connection.escape(id);
			helpMe.deleteQuery(finalQuery, function(results){
				res.json(results);
			});
		}else{
			res.json({"error": {"code":"invalid brand id"}});
		}
	});
}

function getBrandValue(id, callback) {
  if(id){
		var finalQuery = query + ' WHERE id = ' + connection.escape(id);

		helpMe.getQuery(finalQuery, function(results){
			callback(results);
		});
	}else{
		callback({"error": {"code":"id is required"}});
	}
}

module.exports = brandsFunctions;
