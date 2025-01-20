const mysql = require('mysql2');
require('dotenv').config({path:"../.env"}); // Load environment variables from .env file
  // Adjust the path as necessary

// Get the database connection details from .env file
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log(process.env.DB_HOST)
// Enable promise support
const promiseConnection = connection.promise();

module.exports = promiseConnection;
