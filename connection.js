const mysql = require("mysql");
const util = require('util'); 


const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Password1",
      database: "company_db"
    });
    
    //connection.connect(); 
    connection.query=util.promisify(connection.query); 

   connection.connect(function(err) {
    if (err) throw err;
      console.log("error")
  
  });
  
   module.exports = connection 