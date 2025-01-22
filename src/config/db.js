const mysql = require('mysql2');
require('dotenv').config('../.env');


const fs = require('fs');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // 'srv1402.hstgr.io'
  user: process.env.DB_USER,       // 'u702853446_ecom_lightup'
  password: process.env.DB_PASSWORD, // 'your_password'
  database: process.env.DB_NAME,    // 'e_commercelightup_db'
  port: process.env.DB_PORT ,
  ssl: {
    ca: fs.readFileSync(process.env.CA)
  },  // Default MySQL port
});

console.log(process.env.CA)
// Test the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Successfully connected to the database!');
    
    // You can also run a simple query to ensure everything is working
    connection.query('SELECT 1 + 1 AS result', (err, results) => {
      if (err) {
        console.error('Error running query:', err.message);
      } else {
        console.log('Query result:', results);
      }
      
      // Close the connection after the test
      connection.end();
});
  }
  })
module.exports = connection;
