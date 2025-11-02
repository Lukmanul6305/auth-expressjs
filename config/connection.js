const mysql = require("mysql2/promise");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function checkCon() {
  try {
    await pool.query("SELECT 1");
    console.log("database valid");
  } catch (error) {
    console.log("database invalid❌");
  }
}

checkCon();

module.exports = pool;
