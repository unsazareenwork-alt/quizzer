import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

import "../styles/Improvements.css";

function Improvements() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const sortedHistory = [...response.data].sort(
        (a, b) =>
          new Date(a.created_at) -
          new Date(b.created_at)
      );

      setHistory(sortedHistory);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
      STATS
  ============================ */

  const totalQuizzes = history.length;

  const bestScore =
    history.length > 0
      ? Math.max(...history.map((q) => q.score))
      : 0;

  const totalCorrect = history.reduce(
    (sum, quiz) => sum + Number(quiz.score),
    0
  );

  const totalQuestions = history.reduce(
    (sum, quiz) =>
      sum + Number(quiz.total_questions),
    0
  );

  const totalWrong =
    totalQuestions - totalCorrect;

  const accuracy =
    totalQuestions > 0
      ? (
          (totalCorrect / totalQuestions) *
          100
        ).toFixed(0)
      : 0;

  /* ===========================
      BAR CHART
  ============================ */

  const chartData = history.map(
    (quiz, index) => ({
      quiz: `Q${index + 1}`,
      score: quiz.score,
    })
  );

  /* ===========================
      PIE CHART
  ============================ */

  const pieData = [
    {
      name: "Correct",
      value: totalCorrect,
    },
    {
      name: "Wrong",
      value: totalWrong,
    },
  ];

  const COLORS = [
    "#8B5CF6",
    "#F87171",
  ];

  /* ===========================
      WEAK AREAS
  ============================ */

  const weakMap = {};

  history.forEach((quiz) => {
    if (!quiz.questions) return;

    quiz.questions.forEach((question) => {
      if (!question.isCorrect) {
        weakMap[question.question] =
          (weakMap[question.question] || 0) + 1;
      }
    });
  });

  const weakAreas = Object.entries(
    weakMap
  ).sort((a, b) => b[1] - a[1]);

  /* ===========================
      INSIGHT
  ============================ */

const improved =
  history.length >= 2 &&
  history[history.length - 1].score >
    history[history.length - 2].score;

if (loading) {
  return (
    <>
      <Navbar />
      <div className="loading-page">
        Loading...
      </div>
    </>
  );
}

return (
  <>
    <Navbar />

    <div className="improvement-page">
      <div className="improvement-container">

        <h1 className="page-title">
          Improvements
        </h1>

        {/* TOP CARDS */}

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">📑</div>

            <div>
              <span>QUIZZES</span>
              <h2>{totalQuizzes}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>

            <div>
              <span>ACCURACY</span>
              <h2>{accuracy}%</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>

            <div>
              <span>BEST SCORE</span>
              <h2>{bestScore}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>

            <div>
              <span>DAY STREAK</span>
              <h2>7</h2>
            </div>
          </div>

        </div>

        {/* CHARTS */}

        <div className="charts-row">

          <div className="chart-card">

            <h3>Score Trend</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quiz" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#8B5CF6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="chart-card">

            <h3>Accuracy</h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* IMPROVEMENTS */}

        <div className="improvement-card">

          <h3>Areas To Improve</h3>

          {weakAreas.length === 0 ? (
            <p>🎉 Great job! No weak areas found.</p>
          ) : (
            weakAreas.map(([question, count], index) => (
              <div
                key={index}
                style={{
                  border: "2px solid #222",
                  borderRadius: "10px",
                  padding: "14px",
                  marginBottom: "12px",
                  background: "#fff",
                }}
              >
                <strong>{question}</strong>

                <p style={{ marginTop: "8px" }}>
                  Missed {count} time{count > 1 ? "s" : ""}
                </p>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  </>
);
}

export default Improvements;