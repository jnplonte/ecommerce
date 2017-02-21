var config = require( "../config.js" );
var connection = require( "./helpers/database" );
var helpMe = require( "./helpers/helpme" );

var usersFunctions = function() {
	this.allUser = allUser;
  this.getUser = getUser;
	this.postUser = postUser;
	this.putUser = putUser;
	this.deleteUser = deleteUser;
	this.getUserValue = getUserValue;
};

var query = 'SELECT * FROM users';

function allUser(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var page = req.query.page || 1;
	var finalQuery = query;

	helpMe.getQuery(helpMe.queryLimit(helpMe.queryOrder(finalQuery), page), function(results){
		res.json(results);
	});
}

function getUser(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id || null;

	if(helpMe.isEmail(id)){
		getUserEmail(id, function(results){
			res.json(results);
		});
	}else{
		getUserValue(id, function(results){
			res.json(results);
		});
	}
}

function postUser(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  if(typeof(req.body) != 'undefined' && req.body.name && req.body.email){
		var name = req.body.name, email = req.body.email;
		getUserEmail(email, function(validationResults){
			if(validationResults.length === 0){
				var finalQuery = 'INSERT INTO users SET ?', params = {"name": name, "email": email};
				if(req.body.bday){
					params.bday = req.body.bday;
				}

				// 0 -> customer 1 -> merchant
				if(req.body.type){
					var type = parseInt(req.body.type);
					if(isNaN(type)){
						type = 0;
					}
					params.type = type;
				}

				helpMe.postQuery(finalQuery, params, function(results){
					res.json(results);
				});
			}else{
				res.json({"error": {"code":"email already exists"}});
			}
		});
	}else{
		res.json({"error": {"code":"name and email is required"}});
	}
}

function putUser(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var id = req.params.id || null;
	getUserValue(id, function(validationResults){
		if(validationResults.length >= 1){
			if(typeof(req.body) != 'undefined' && (req.body.name || req.body.bday || req.body.type)){
				var finalQuery = 'UPDATE users SET ? WHERE id = ' + connection.escape(id), params = {};
				if(req.body.name){
					params.name = req.body.name;
				}

				if(req.body.bday){
					params.bday = req.body.bday;
				}

				// 0 -> customer 1 -> merchant
				if(req.body.type){
					var type = parseInt(req.body.type);
					if(isNaN(type)){
						type = 0;
					}
					params.type = type;
				}

				helpMe.putQuery(finalQuery, params, function(results){
					res.json(results);
				});
			}else{
				res.json({"error": {"code":"atleats one field is required"}});
			}
		}else{
			res.json({"error": {"code":"invalid brand id"}});
		}
	});
}

function deleteUser(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
	var id = req.params.id || null;
	getUserValue(id, function(validationResults){
		if(validationResults.length >= 1){
			var finalQuery = 'DELETE FROM users WHERE id = ' + connection.escape(id);
			helpMe.deleteQuery(finalQuery, function(results){
				res.json(results);
			});
		}else{
			res.json({"error": {"code":"invalid brand id"}});
		}
	});
}

function getUserValue(id, callback) {
  if(id){
		var finalQuery = query + ' WHERE id = ' + connection.escape(id);

		helpMe.getQuery(finalQuery, function(results){
			callback(results);
		});
	}else{
		callback({"error": {"code":"id is required"}});
	}
}

function getUserEmail(email, callback) {
  if(email){
		var finalQuery = query + ' WHERE email = ' + connection.escape(email);

		helpMe.getQuery(finalQuery, function(results){
			callback(results);
		});
	}else{
		callback({"error": {"code":"email is required"}});
	}
}

module.exports = usersFunctions;
