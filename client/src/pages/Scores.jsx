
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Scores.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Scores() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/quizzes/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATS ================= */

  const quizzesTaken = history.length;

  const bestScore =
    history.length > 0
      ? Math.max(...history.map((q) => Number(q.score)))
      : 0;

  const totalCorrect = history.reduce(
    (sum, quiz) => sum + Number(quiz.score),
    0
  );

  const totalQuestions = history.reduce(
    (sum, quiz) => sum + Number(quiz.total_questions),
    0
  );

  const avgAccuracy =
    totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;

  if (loading) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "60px" }}>
          Loading...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="scores-page">
        <div className="scores-container">

          {/* TOP CARDS */}

          <div className="stats-grid">

            <div className="score-stat">
              <span>QUIZZES TAKEN</span>
              <h2>{quizzesTaken}</h2>
            </div>

            <div className="score-stat">
              <span>AVG ACCURACY</span>
              <h2>{avgAccuracy}%</h2>
            </div>

            <div className="score-stat">
              <span>BEST SCORE</span>
              <h2>{bestScore}</h2>
            </div>

            <div className="score-stat">
              <span>DAY STREAK</span>
              <h2>7</h2>
            </div>

          </div>

          {/* HISTORY */}

          <div className="history-card">

            <h2>QUIZ HISTORY</h2>

            {history.map((quiz, index) => (

             <div
  className="history-row"
  key={quiz.id}
  onClick={() => {
    localStorage.setItem(
      "reviewQuiz",
      JSON.stringify(quiz.questions)
    );

    localStorage.setItem(
      "reviewTitle",
      quiz.title
    );

    navigate("/review");
  }}
>

                <div className="history-left">

                  <div className="file-icon">
                    
                  </div>

                  <div>

                    <h4>{quiz.title}</h4>

                    <p>
                      {quiz.subject} •{" "}
                      {new Date(quiz.created_at).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="history-right">

                  <div
                    className={`score-box ${
                      quiz.score / quiz.total_questions >= 0.8
                        ? "green"
                        : quiz.score / quiz.total_questions >= 0.5
                        ? "yellow"
                        : "red"
                    }`}
                  >
                    {quiz.score} / {quiz.total_questions}
                  </div>

                  <h3>
                    {Math.round(
                      (quiz.score / quiz.total_questions) * 100
                    )}
                    %
                  </h3>

                  <span>›</span>

                </div>

              </div>

            ))}

          </div>

        </div>
      </div>
    </>
  );
}