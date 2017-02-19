var mysql = require('mysql');
var config = require( "../../config.js" );

var connection = mysql.createConnection({
  host     : config.dataBase.host,
  user     : config.dataBase.username,
  password : config.dataBase.password,
  database : config.dataBase.db
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ...");
  } else {
    console.log("Error connecting database ...");
  }
});

module.exports = connection;
