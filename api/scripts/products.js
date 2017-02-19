var config = require( "../config.js" );
var connection = require( "./helpers/database" );
var helpMe = require( "./helpers/helpme" );

var productsFunctions = function() {
	this.allProduct = allProduct;
  this.getProduct = getProduct;
	this.postProduct = postProduct;
	this.putProduct = putProduct;
	this.deleteProduct = deleteProduct;
	this.getProductValue = getProductValue;
};

var query = "SELECT * FROM products";

function allProduct(req, res) {
  res.setHeader('Content-Type', 'application/json');
	var page = req.query.page || 1, brandId = req.query.brandId || null;
	var finalQuery = query + " WHERE status = '1'";

	if(brandId){
		finalQuery = finalQuery + " AND brand_id = " + connection.escape(brandId);
	}

	helpMe.getQuery(helpMe.queryLimit(helpMe.queryOrder(finalQuery), page), function(results){
		if(results.length >= 1){
			var reviewsFunctions = require('./reviews');
			var reviews = new reviewsFunctions();
			reviews.getReviewByProduct(results, function(finalResults){
				res.json(finalResults);
			});
		}else{
			res.json(results);
		}
	});
}

function getProduct(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id || null;

	getProductValue(id, function(results){
		if(results.length >= 1){
			var reviewsFunctions = require('./reviews');
			var reviews = new reviewsFunctions();
			reviews.getReviewByProduct(results, function(finalResults){
				res.json(finalResults);
			});
		}else{
			res.json(results);
		}
	});
}

function postProduct(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if(typeof(req.body) != 'undefined' && req.body.name && req.body.brand_id && req.body.description && req.body.price && req.body.color && req.body.stock){
		var name = req.body.name, brand_id = req.body.brand_id, description = req.body.description, price = req.body.price, color = req.body.color, stock = req.body.stock;

		checkBrand(brand_id, function(pValue){
			if(pValue === null){
				var finalQuery = 'INSERT INTO products SET ?', params = {"name": name, "brand_id": brand_id, "description": description, "price": price, "color": color, "stock": stock};

				// 0 -> outofstock 1 -> stock 2 -> archive
				if(req.body.status){
					var status = parseInt(req.body.status);
					if(isNaN(status)){
						status = 1;
					}
					params.status = status;
				}

				helpMe.postQuery(finalQuery, params, function(results){
					res.json(results);
				});
			}else{
				res.json(pValue);
			}
		});
	}else{
		res.json({"error": {"code":"name, brand_id, description, price, color and stock is required"}});
	}
}

function putProduct(req, res) {
  res.setHeader('Content-Type', 'application/json');
	var id = req.params.id || null;
	getProductValue(id, function(validationResults){
		if(validationResults.length >= 1){
			if(typeof(req.body) != 'undefined' && (req.body.name || req.body.description || req.body.price || req.body.color || req.body.stock || req.body.status)){
				var finalQuery = 'UPDATE products SET ? WHERE id = ' + connection.escape(id), params = {};

				if(req.body.name){
					params.name = req.body.name;
				}

				if(req.body.description){
					params.description = req.body.description;
				}

				if(req.body.price){
					params.price = req.body.price;
				}

				if(req.body.color){
					params.color = req.body.color;
				}

				if(req.body.stock){
					params.stock = req.body.stock;
				}

				// 0 -> outofstock 1 -> stock 2 -> archive
				if(req.body.status){
					var status = parseInt(req.body.status);
					if(isNaN(status)){
						status = 1;
					}
					params.status = status;
				}

				helpMe.putQuery(finalQuery, params, function(results){
					res.json(results);
				});
			}else{
				res.json({"error": {"code":"atleats one field is required"}});
			}
		}else{
			res.json({"error": {"code":"invalid product id"}});
		}
	});
}

function deleteProduct(req, res) {
  res.setHeader('Content-Type', 'application/json');
	var id = req.params.id || null;
	getProductValue(id, function(validationResults){
		if(validationResults.length >= 1){
			var finalQuery = 'DELETE FROM products WHERE id = ' + connection.escape(id);
			helpMe.deleteQuery(finalQuery, function(results){
				res.json(results);
			});
		}else{
			res.json({"error": {"code":"invalid product id"}});
		}
	});
}

function getProductValue(id, callback) {
  if(id){
		var finalQuery = query + ' WHERE id = ' + connection.escape(id);
		helpMe.getQuery(finalQuery, function(results){
			callback(results);
		});
	}else{
		callback({"error": {"code":"id is required"}});
	}
}

function checkBrand(brand_id, callback){
	var brandsFunctions = require('./brands');
	var brands = new brandsFunctions();
	brands.getBrandValue(brand_id, function(finalResults){
		if(finalResults.length >= 1){
			callback(null);
		}else{
			callback({"error": {"code":"invalid brand"}});
		}
	});
}

module.exports = productsFunctions;
