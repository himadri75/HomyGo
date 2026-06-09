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
  connectionLimit: 10,
  queueLimit: 0,
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