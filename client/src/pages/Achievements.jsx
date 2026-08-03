import Navbar from "../components/Navbar";
import "../styles/Achievements.css";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Achievements() {
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

    setHistory(response.data);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
const quizzesTaken = history.length;

const totalCorrect = history.reduce(
  (sum, quiz) => sum + Number(quiz.score),
  0
);

const totalQuestions = history.reduce(
  (sum, quiz) => sum + Number(quiz.total_questions),
  0
);

const accuracy =
  totalQuestions > 0
    ? Math.round((totalCorrect / totalQuestions) * 100)
    : 0;

const xp = totalCorrect * 10;

const level = Math.floor(xp / 100) + 1;

const currentLevelXP = (level - 1) * 100;

const nextLevelXP = level * 100;

const xpPercent =
  ((xp - currentLevelXP) / 100) * 100;
  const uniqueDates = [
  ...new Set(
    history.map((quiz) => {
      const d = new Date(quiz.created_at);
      return d.toISOString().split("T")[0]; // YYYY-MM-DD
    })
  ),
];

let streak = 0;

let current = new Date();

while (true) {
  const dateString = current.toISOString().split("T")[0];

  if (uniqueDates.includes(dateString)) {
    streak++;
    current.setDate(current.getDate() - 1);
  } else {
    break;
  }
  
}
  return (
    <>
      <Navbar />

      <div className="achievement-page">
        <div className="achievement-container">

          {/* ================= PROFILE CARD ================= */}

          <div className="profile-card">

            <div className="profile-left">

              <div className="avatar-wrapper">

                <div className="avatar">
                  AK
                </div>

                <div className="level-badge">
                  {level}
                </div>

              </div>

              <div className="profile-info">

                <h2>ALEX KADE</h2>

                <div className="profile-tags">

                  <div className="tag level">
                    LEVEL {level}
                  </div>

                  <div className="tag badges">
                    {quizzesTaken} QUIZZES
                  </div>

                </div>

                <div className="xp-text">
                  XP → LEVEL
                </div>

                <div
                className="xp-fill"
                 style={{
                width: `${xpPercent}%`
               }}
              ></div>

                <div className="xp-count">
                  {xp} / {nextLevelXP} XP
                </div>

              </div>

            </div>

            <div className="streak-card">

              <div className="streak-number">
              {streak}
                </div>

              <div className="streak-text">
                DAY STREAK
              </div>

            </div>

          </div>

          {/* ================= WEEK STREAK ================= */}

          <div className="week-card">

            <h3>THIS WEEK</h3>

            <div className="week-strip">

              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <div key={index} className="day-card active">
                  <div className="day-icon"></div>
                  <span>{day}</span>
                </div>
              ))}

            </div>

          </div>

          {/* ================= BADGES ================= */}

          <div className="badges-card">

            <h3>BADGES</h3>

            <div className="badges-grid">

              <div className="badge-card">
                <img src="/badges/firststeps.png" alt="First Steps" />
                <h4>FIRST STEPS</h4>
                <p>Complete your first quiz</p>
              </div>

              <div className="badge-card">
                <img src="/badges/perfectrun.png" alt="Perfect Run" />
                <h4>PERFECT RUN</h4>
                <p>Score full marks</p>
              </div>

              <div className="badge-card">
                <img src="/badges/onfire.png" alt="On Fire" />
                <h4>ON FIRE</h4>
                <p>7 day streak</p>
              </div>

              <div className="badge-card">
                <img src="/badges/highacheiver.png" alt="High Achiever" />k, vb
                <h4>HIGH ACHIEVER</h4>
                <p>80% Accuracy</p>
              </div>

              <div className="badge-card locked">
                <img src="/badges/locked.png" alt="Locked" />
                <h4>QUIZ MASTER</h4>
                <p>Locked</p>
              </div>

              <div className="badge-card locked">
                <img src="/badges/locked.png" alt="Locked" />
                <h4>LIGHTNING</h4>
                <p>Locked</p>
              </div>

              <div className="badge-card locked">
                <img src="/badges/locked.png" alt="Locked" />
                <h4>GENIUS</h4>
                <p>Locked</p>
              </div>

              <div className="badge-card locked">
                <img src="/badges/locked.png" alt="Locked" />
                <h4>LEGEND</h4>
                <p>Locked</p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </>
  );
}