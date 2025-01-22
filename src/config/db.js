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

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database!');
});

module.exports = connection;
