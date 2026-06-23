require("dotenv").config();
const mysql = require("mysql2");

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  passwordExists: !!process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

connection.connect((err) => {
  if (err) {
    console.error("CONNECT ERROR:", err);
  } else {
    console.log("SUCCESS!");
  }
});