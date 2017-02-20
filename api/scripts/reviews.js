var config = require( "../config.js" );
var connection = require( "./helpers/database" );
var helpMe = require( "./helpers/helpme" );
var async = require('async');

var reviewsFunctions = function() {
	this.allReview = allReview;
  this.getReview = getReview;
	this.postReview = postReview;
	this.putReview = putReview;
	this.deleteReview = deleteReview;
  this.getReviewByProduct = getReviewByProduct;
};

var query = 'SELECT reviews.*, users.name, users.email, users.type, users.bday FROM reviews INNER JOIN users ON reviews.user_id=users.id';

function allReview(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var page = req.query.page || 1;
	var finalQuery = query;

	helpMe.getQuery(helpMe.queryLimit(helpMe.queryOrder(finalQuery), page), function(results){
		res.json(results);
	});
}

function getReview(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id || null;

	getReviewValue(id, function(results){
		res.json(results);
	});
}

function postReview(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  var product_id = req.params.product_id || null;
	if(typeof(req.body) != 'undefined' && req.body.user_id && req.body.rating && req.body.comment){
		checkProduct(product_id, function(pValue){
			if(pValue === null){
				var user_id = req.body.user_id, rating = req.body.rating, comment = req.body.comment;
				checkUser(user_id, function(uValue){
					if(uValue === null){
						var finalQuery = 'INSERT INTO reviews SET ?', params = {"product_id": product_id, "user_id": user_id, "rating": rating, "comment": comment};
						helpMe.postQuery(finalQuery, params, function(results){
							res.json(results);
						});
					}else{
						res.json(uValue);
					}
				});
			}else{
				res.json(pValue);
			}
		});
	}else{
		res.json({"error": {"code":"user_id, rating and comment is required"}});
	}
}

function putReview(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var id = req.params.id || null;
	getReviewValue(id, function(validationResults){
		if(validationResults.length >= 1){
			if(typeof(req.body) != 'undefined' && (req.body.rating || req.body.comment)){
				var finalQuery = 'UPDATE reviews SET ? WHERE id = ' + connection.escape(id), params = {};
				if(req.body.rating){
					params.rating = req.body.rating;
				}

				if(req.body.comment){
					params.comment = req.body.comment;
				}

				helpMe.putQuery(finalQuery, params, function(results){
					res.json(results);
				});
			}else{
				res.json({"error": {"code":"rating or comment is required"}});
			}
		}else{
			res.json({"error": {"code":"invalid review id"}});
		}
	});
}

function deleteReview(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var id = req.params.id || null;
	getReviewValue(id, function(validationResults){
		if(validationResults.length >= 1){
			var finalQuery = 'DELETE FROM reviews WHERE id = ' + connection.escape(id);
			helpMe.deleteQuery(finalQuery, function(results){
				res.json(results);
			});
		}else{
			res.json({"error": {"code":"invalid review id"}});
		}
	});
}

function getReviewByProduct(results, callback){
	if(results.length >= 1){
	  var queryResult = [];
	  var finalQuery = query + ' WHERE reviews.product_id = ';

	  results.forEach(function(data, index) {
	    queryResult.push(function(callback) {
				connection.query(helpMe.queryOrder(finalQuery + connection.escape(data.id), 'reviews.id'), function (qerr, qres, qfld) {
	        if(!qerr){
	          callback(null, qres);
	        }else{
	          return callback(qerr);
	        }
	      });
	    });
	  });

	  async.parallel(queryResult, function(error, result, fields) {
	    if(!error){
	      results.forEach(function(data, index) {
	        data.reviews = result[index];
	      });
	      callback(results);
	    }else{
	      return callback({"error": error});
	    }
	  });
	}else{
		return callback({"error": {"code":"invalid products"}});
	}
}

function checkUser(user_id, callback){
	var usersFunctions = require('./users');
	var users = new usersFunctions();
	users.getUserValue(user_id, function(finalResults){
		if(finalResults.length >= 1){
			if(finalResults[0].type != '0'){
				callback({"error": {"code":"user must be a customer"}});
			}else{
				callback(null);
			}
		}else{
			callback({"error": {"code":"invalid user id"}});
		}
	});
}

function checkProduct(product_id, callback){
	var productsFunctions = require('./products');
	var products = new productsFunctions();
	products.getProductValue(product_id, function(finalResults){
		if(finalResults.length >= 1){
			callback(null);
		}else{
			callback({"error": {"code":"invalid product"}});
		}
	});
}

function getReviewValue(id, callback) {
  if(id){
		var finalQuery = query + ' WHERE reviews.id = ' + connection.escape(id);

		helpMe.getQuery(finalQuery, function(results){
			callback(results);
		});
	}else{
		callback({"error": {"code":"id is required"}});
	}
}

module.exports = reviewsFunctions;
