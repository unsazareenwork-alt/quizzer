require("dotenv").config();
const db = require("../config/db");

const sql = `
CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(sql, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Quizzes table created!");
  }
  process.exit();
});