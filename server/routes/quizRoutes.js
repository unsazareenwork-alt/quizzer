const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createQuiz,
  addQuestion,
} = require("../controllers/quizController");

// Protected Routes
router.post("/create", authMiddleware, createQuiz);
router.post("/add-question", authMiddleware, addQuestion);

module.exports = router;