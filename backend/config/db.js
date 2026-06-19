const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
};

if (isProduction) {
  const caCert = fs.readFileSync(
    path.resolve(__dirname, './ca.pem')
  );

  poolConfig.ssl = {
    ca: caCert,
    rejectUnauthorized: true,
  };
}

const pool = mysql.createPool(poolConfig);

// Handle connection errors
pool.on('error', (err) => {
  console.error('❌ MySQL Pool Error:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
    console.error('Database had a fatal error.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_CLOSE') {
    console.error('Database connection was destroyed.');
  }
});

pool.on('connection', (connection) => {
  console.log('✅ MySQL connection established');
});

// Keep-alive: Send a query every 5 minutes to maintain active connections
setInterval(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database keep-alive ping successful');
  } catch (err) {
    console.error('❌ Keep-alive ping failed:', err.message);
  }
}, 5 * 60 * 1000); // Every 5 minutes

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
  }
})();

module.exports = pool;