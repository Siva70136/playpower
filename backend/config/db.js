const mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createPool({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.NAME
});

connection.getConnection((err, conn) => {
  if(err) console.log(err)
  console.log("Connected successfully")
})

module.exports = connection.promise();