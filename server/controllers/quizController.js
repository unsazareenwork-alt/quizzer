const db = require("../config/db");

const createQuiz = (req, res) => {
  const { title, description, created_by } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const sql = `
    INSERT INTO quizzer_quizzes
    (title, description, created_by)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [title, description || "", created_by || null],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Quiz created successfully",
        quizId: result.insertId,
      });
    }
  );
};

module.exports = { createQuiz };
const addQuestion = (req, res) => {
  const {
    quiz_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
  } = req.body;

  const sql = `
    INSERT INTO quizzer_questions
    (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      quiz_id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Question added successfully",
        questionId: result.insertId,
      });
    }
  );
};
module.exports = {
  createQuiz,
  addQuestion,
};