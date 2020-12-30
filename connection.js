var mysql = require("mysql");
var util = require('util'); 


var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Password1",
      database: "company_db"
    });
    
   connection.connect(); 
   connection.query=util.promisify(connection.query); 
   module.exports = connection 