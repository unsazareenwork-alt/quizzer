const pool = require("../config/db");

exports.saveQuizResult = async (req, res) => {
  try {
    const {
        title,
      score,
      totalQuestions,
      accuracy,
      questions,

    } = req.body;

    const userId = req.user.id;

    await pool.query(
  `
  INSERT INTO quiz_results
  (
    user_id,
    title,
    score,
    total_questions,
    accuracy,
    questions
  )
  VALUES ($1,$2,$3,$4,$5,$6)
  `,
  [
    userId,
    title,
    score,
    totalQuestions,
    accuracy,
    JSON.stringify(questions),
  ]
);
    res.status(201).json({
      success: true,
      message: "Quiz saved successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// GET QUIZ HISTORY

exports.getQuizHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT *
      FROM quiz_results
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};