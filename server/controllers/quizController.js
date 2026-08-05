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
// ================= GET USER =================

const userResult = await pool.query(
  `
  SELECT xp, badges
  FROM users
  WHERE id = $1
  `,
  [userId]
);

let xp = userResult.rows[0].xp || 0;
let badges = userResult.rows[0].badges || [];

// Add XP
xp += score * 10;

// First Steps
if (!badges.includes("first_steps")) {
  badges.push("first_steps");
}

// Perfect Run
if (
  score === totalQuestions &&
  !badges.includes("perfect_run")
) {
  badges.push("perfect_run");
}

// High Achiever
if (
  accuracy >= 80 &&
  !badges.includes("high_achiever")
) {
  badges.push("high_achiever");
}

// Save XP & badges
await pool.query(
  `
  UPDATE users
  SET xp = $1,
      badges = $2
  WHERE id = $3
  `,
  [xp, badges, userId]
);
// ================= BADGES =================

const badgeResult = await pool.query(
  "SELECT badges FROM users WHERE id = $1",
  [userId]
);



// First Steps
if (score >= 0 && !badges.includes("first_steps")) {
  badges.push("first_steps");
}

// Perfect Run
if (score === totalQuestions && !badges.includes("perfect_run")) {
  badges.push("perfect_run");
}

// High Achiever
if (accuracy >= 80 && !badges.includes("high_achiever")) {
  badges.push("high_achiever");
}

// Save updated badges
await pool.query(
  "UPDATE users SET badges = $1 WHERE id = $2",
  [badges, userId]
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

    // Quiz history
const historyResult = await pool.query(
  `
  SELECT *
  FROM quiz_results
  WHERE user_id = $1
  ORDER BY created_at DESC
  `,
  [userId]
);

// User badges
const badgeResult = await pool.query(
  `
  SELECT badges
  FROM users
  WHERE id = $1
  `,
  [userId]
);

res.json({
  history: historyResult.rows,
  badges: badgeResult.rows[0].badges || [],
});

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};