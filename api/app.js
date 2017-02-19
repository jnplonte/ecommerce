var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var brandsFunctions = require('./scripts/brands');
var productsFunctions = require('./scripts/products');
var reviewsFunctions = require('./scripts/reviews');
var usersFunctions = require('./scripts/users');

var routes = require('./scripts/routes');
var config = require( "./config.js" );

var functions = {
  brands: new brandsFunctions(),
  products: new productsFunctions(),
  reviews: new reviewsFunctions(),
  users: new usersFunctions()
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.setup(app, functions);

var server = app.listen(config.port, function () {
  var port = server.address().port;
  console.log('api listening to http://localhost:%s', port);
});
