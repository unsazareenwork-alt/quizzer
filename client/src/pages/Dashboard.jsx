import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

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
    }
  };

  /* ---------- Statistics ---------- */

  const quizzesTaken = history.length;

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

  const totalXP = quizzesTaken * 20;

  // Temporary streak
  const dayStreak = 7;

  const achievements = [];

  if (quizzesTaken >= 1) {
    achievements.push(" First Quiz");
  }

  if (totalXP >= 100) {
    achievements.push(" 100 XP");
  }

  if (dayStreak >= 7) {
    achievements.push(" 7 Day Streak");
  }

  const recentQuizzes = history.slice(0, 3);

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        <h1 className="welcome">
          Welcome Back, Unsa 
        </h1>

        <div className="dashboard-grid">

          {/* LEFT */}

          <div className="left-column">

            <Link to="/quiz" className="newquiz-link">
              <div className="newquiz-card">
                <h2>+ NEW QUIZ</h2>
                <p>Create a quiz from your notes</p>
              </div>
            </Link>

            <div className="card">
              <h2>Recent Quizzes</h2>

              {recentQuizzes.length === 0 ? (
                <p>No quizzes yet.</p>
              ) : (
                recentQuizzes.map((quiz) => (
                  <div className="row" key={quiz.id}>
                    <span>
                      {quiz.title.length > 20
                        ? quiz.title.substring(0, 20) + "..."
                        : quiz.title}
                    </span>

                    <span>
                      {quiz.score}/{quiz.total_questions}
                    </span>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* RIGHT */}

          <div className="right-column">

            <div className="card">
              <h2>Statistics</h2>

              <div className="row">
                <span>Accuracy</span>
                <span>{avgAccuracy}%</span>
              </div>

              <div className="row">
                <span>Quizzes</span>
                <span>{quizzesTaken}</span>
              </div>

              <div className="row">
                <span>XP</span>
                <span>{totalXP}</span>
              </div>

            </div>

            <div className="card">
              <h2>Achievements</h2>

              {achievements.length === 0 ? (
                <p>No achievements yet.</p>
              ) : (
                achievements.map((achievement, index) => (
                  <p key={index}>{achievement}</p>
                ))
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}