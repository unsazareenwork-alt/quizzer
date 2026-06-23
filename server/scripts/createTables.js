require("dotenv").config();
const db = require("../config/db");

const sql = `
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(sql, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Users table created!");
  }
  process.exit();
});