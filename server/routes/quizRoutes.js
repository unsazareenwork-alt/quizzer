const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const quizController = require("../controllers/quizController");

router.post(
  "/save",
  authMiddleware,
  quizController.saveQuizResult
);

router.get(
  "/history",
  authMiddleware,
  quizController.getQuizHistory
);

module.exports = router;