require("dotenv").config();
const db = require("../config/db");

const sql = `
CREATE TABLE IF NOT EXISTS quizzer_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer CHAR(1) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

db.query(sql, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("quizzer_questions table created!");
  }

  process.exit();
});