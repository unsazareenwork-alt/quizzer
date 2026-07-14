import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/PlayQuiz.css";

export default function PlayQuiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
const [currentQuestion, setCurrentQuestion] = useState(0);

const [selectedOption, setSelectedOption] = useState("");
const [showAnswer, setShowAnswer] = useState(false);

const [score, setScore] = useState(0);
const [answeredQuestions, setAnsweredQuestions] = useState([]);
  useEffect(() => {
    const storedQuiz = JSON.parse(
      localStorage.getItem("generatedQuiz")
    );

    if (!storedQuiz || storedQuiz.length === 0) {
      alert("No quiz found.");
      navigate("/quiz");
      return;
    }

    setQuestions(storedQuiz);
  }, [navigate]);

  if (questions.length === 0) return null;

  const question = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const handleCheckAnswer = () => {
    const updatedQuestions = [...questions];

    updatedQuestions[currentQuestion].selectedAnswer =
      selectedOption;

    updatedQuestions[currentQuestion].isCorrect =
      selectedOption === question.correctAnswer;

    setQuestions(updatedQuestions);

    setShowAnswer(true);
  };

  const handleNext = async () => {
  let updatedScore = score;

  const isCorrect =
    selectedOption === question.correctAnswer;

  if (isCorrect) {
    updatedScore++;
    setScore(updatedScore);
  }

  const finalAnsweredQuestions = [
    ...answeredQuestions,
    {
      question: question.question,
      options: question.options,
      selectedAnswer: selectedOption,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      isCorrect,
    },
  ];

  setAnsweredQuestions(finalAnsweredQuestions);

  if (currentQuestion === questions.length - 1) {
    try {
      const token = localStorage.getItem("token");

      const title =
        localStorage.getItem("quizTitle") ||
        "Generated Quiz";

      const accuracy =
        (updatedScore / questions.length) * 100;

      console.log(
        "Questions being sent:",
        finalAnsweredQuestions
      );

      await axios.post(
        "http://localhost:5000/api/quizzes/save",
        {
          title,
          score: updatedScore,
          totalQuestions: questions.length,
          accuracy,
          questions: finalAnsweredQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "lastScore",
        updatedScore
      );

      localStorage.setItem(
        "lastAccuracy",
        accuracy.toFixed(0)
      );

      alert(
        `Quiz Finished!\n\nScore: ${updatedScore}/${questions.length}`
      );

      navigate("/scores");
      return;

    } catch (err) {
      console.error(err);
      alert("Failed to save quiz.");
      return;
    }
  }

  setCurrentQuestion((prev) => prev + 1);
  setSelectedOption("");
  setShowAnswer(false);
};
  return (
    <>
      <Navbar />

      <div className="playquiz-page">
        <div className="quiz-top">
          <div className="subject-tag">
            📄 {localStorage.getItem("quizTitle")}
          </div>

          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span>
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>

        <div className="quiz-card">
          <div className="question-title">
            <div className="question-number">
              Q{currentQuestion + 1}
            </div>

            <h2>{question.question}</h2>
          </div>

          <div className="options">
            {question.options.map((option, index) => {
              let className = "option-card";

              if (selectedOption === option)
                className += " selected";

              if (showAnswer) {
                if (
                  option === question.correctAnswer
                ) {
                  className += " correct";
                } else if (
                  option === selectedOption
                ) {
                  className += " wrong";
                }
              }

              return (
                <button
                  key={index}
                  disabled={showAnswer}
                  className={className}
                  onClick={() =>
                    setSelectedOption(option)
                  }
                >
                  <div className="option-letter">
                    {String.fromCharCode(
                      65 + index
                    )}
                  </div>

                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div className="explanation-box">
              <h3>Explanation</h3>

              <p>{question.explanation}</p>
            </div>
          )}

          <div className="quiz-footer">
            {!showAnswer ? (
              <button
                className="next-btn"
                disabled={!selectedOption}
                onClick={handleCheckAnswer}
              >
                CHECK ANSWER
              </button>
            ) : (
              <button
                className="next-btn"
                onClick={handleNext}
              >
                {currentQuestion ===
                questions.length - 1
                  ? "FINISH QUIZ"
                  : "NEXT →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}