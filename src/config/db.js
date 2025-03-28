const mysql = require("mysql2/promise");
require("dotenv").config("../.env");
const fs = require("fs");

// Create the connection pool
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST, // 'srv1402.hstgr.io'
  user: process.env.DB_USER, // 'u702853446_ecom_lightup'
  password: process.env.DB_PASSWORD, // 'your_password'
  database: process.env.DB_NAME, // 'e_commercelightup_db'
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync(process.env.CA),
  },
  waitForConnections: true, // This will allow the pool to wait for connections
  connectionLimit: 0, // Maximum number of connections in the pool
  queueLimit: 0, // No limit on the number of queued connection requests
});

console.log(process.env.CA);

// Example of using async/await with the pool
const testConnection = async () => {
  try {
    // Get a connection from the pool
    const [rows, fields] = await connectionPool.execute("SELECT * FROM users");
    console.log(rows); // Log results
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
};


// Call the test function
testConnection();

const queryWithRetry = (sql, values, retries = 3) => {
  return new Promise((resolve, reject) => {
    const attemptQuery = () => {
      pool.query(sql, values, (err, results) => {
        if (err) {
          if (retries > 0 && err.code === 'ECONNRESET') {
            console.log('Connection reset, retrying...');
            retries -= 1;
            attemptQuery(); // Retry on connection reset
          } else {
            reject(err); // Reject if retries are exhausted or different error
          }
        } else {
          resolve(results);
        }
      });
    };
    attemptQuery();
  });
};

module.exports = connectionPool;
