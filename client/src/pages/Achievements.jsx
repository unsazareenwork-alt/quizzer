import Navbar from "../components/Navbar";
import "../styles/Achievements.css";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Achievements() {
  const [history, setHistory] = useState([]);
const [badges, setBadges] = useState([]);
const [loading, setLoading] = useState(true);
const [showUnlock, setShowUnlock] = useState(false);
const [unlockedBadge, setUnlockedBadge] = useState(null);
const [unlockQueue, setUnlockQueue] = useState([]);
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

    setHistory(response.data.history);
setBadges(response.data.badges || []);
const previousBadges =
  JSON.parse(localStorage.getItem("userBadges")) || [];

const newlyUnlocked = response.data.badges.filter(
  badge => !previousBadges.includes(badge)
);

if (newlyUnlocked.length > 0) {
  setUnlockQueue(newlyUnlocked);
}

localStorage.setItem(
  "userBadges",
  JSON.stringify(response.data.badges)
);

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
const badgeImages = {
  first_steps: "firststeps.png",
  perfect_run: "perfectrun.png",
  on_fire: "onfire.png",
  high_achiever: "highacheiver.png",
};
useEffect(() => {
  if (unlockQueue.length === 0) return;

  setUnlockedBadge(unlockQueue[0]);
  setShowUnlock(true);

  const timer = setTimeout(() => {
    setShowUnlock(false);

    setTimeout(() => {
      setUnlockQueue(prev => prev.slice(1));
    }, 300);

  }, 2500);

  return () => clearTimeout(timer);

}, [unlockQueue]);
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const today = new Date();

const startOfWeek = new Date(today);
const day = startOfWeek.getDay();

const diff = day === 0 ? 6 : day - 1;

startOfWeek.setDate(startOfWeek.getDate() - diff);
startOfWeek.setHours(0, 0, 0, 0);

const completedDays = history
  .filter((quiz) => {
    const quizDate = new Date(quiz.created_at);
    quizDate.setHours(0, 0, 0, 0);

    return quizDate >= startOfWeek && quizDate <= today;
  })
  .map((quiz) => new Date(quiz.created_at).getDay());
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

          <div className="week-strip">

  {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => {

    // Convert Monday-first index to JavaScript's Sunday-first day number
    const dayNumber = index === 6 ? 0 : index + 1;

    const isActive = completedDays.includes(dayNumber);
    const date = new Date(startOfWeek);
date.setDate(startOfWeek.getDate() + index);

const isToday =
  date.toDateString() === new Date().toDateString();

    return (
      <div
        key={index}
        className={`day-card ${
  isActive ? "active" : ""
} ${isToday ? "today" : ""}`}
      >
        <div className="day-icon"></div>
        <span>{day}</span>

      </div>
    );

  })}

</div>

          {/* ================= BADGES ================= */}

          <div className="badges-card">

            <h3>BADGES</h3>

            <div className="badges-grid">

               <div
  className={`badge-card ${
    badges.includes("first_steps") ? "" : "locked"
  }`}
>
  <img
  src={
    badges.includes("first_steps")
      ? "/badges/firststeps.png"
      : "/badges/locked.png"
  }
  alt="First Steps"
/>

  <h4>FIRST STEPS</h4>

  <p>
    {badges.includes("first_steps")
      ? "Complete your first quiz"
      : "Locked"}
  </p>
</div>

                <div
  className={`badge-card ${
    badges.includes("perfect_run") ? "" : "locked"
  }`}
>
  <img
    src={
      badges.includes("perfect_run")
        ? "/badges/perfectrun.png"
        : "/badges/locked.png"
    }
    alt="Perfect Run"
  />

  <h4>PERFECT RUN</h4>

  <p>
    {badges.includes("perfect_run")
      ? "Score full marks"
      : "Locked"}
  </p>
</div>

              <div
  className={`badge-card ${
    badges.includes("on_fire") ? "" : "locked"
  }`}
>
  <img
    src={
      badges.includes("on_fire")
        ? "/badges/onfire.png"
        : "/badges/locked.png"
    }
    alt="On Fire"
  />

  <h4>ON FIRE</h4>

  <p>
    {badges.includes("on_fire")
      ? "7 day streak"
      : "Locked"}
  </p>
</div>

              <div
  className={`badge-card ${
    badges.includes("high_achiever") ? "" : "locked"
  }`}
>
  <img
    src={
      badges.includes("high_achiever")
        ? "/badges/highacheiver.png"
        : "/badges/locked.png"
    }
    alt="High Achiever"
  />

  <h4>HIGH ACHIEVER</h4>

  <p>
    {badges.includes("high_achiever")
      ? "80% Accuracy"
      : "Locked"}
  </p>
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
      {showUnlock && unlockedBadge && (
  <div className="badge-unlock-overlay">

    <div className="badge-unlock-card">

     <img
  src={`/badges/${badgeImages[unlockedBadge]}`}
  alt={unlockedBadge}
/>

      <h2>Badge Unlocked</h2>

      <h3>
  {unlockedBadge.replace(/_/g, " ").toUpperCase()}
</h3>

    </div>

  </div>
)}

    </>
  );
}