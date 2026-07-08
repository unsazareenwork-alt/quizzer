import React from "react";

function Achievements() {
  const history =
    JSON.parse(localStorage.getItem("quizHistory")) || [];

  const stats =
    JSON.parse(localStorage.getItem("quizStats")) || {
      currentStreak: 0,
      longestStreak: 0,
      xp: 0,
    };

  const totalCorrect = history.reduce(
    (sum, quiz) => sum + quiz.score,
    0
  );

  const totalQuestions = history.reduce(
    (sum, quiz) => sum + quiz.total,
    0
  );

  const accuracy =
    totalQuestions === 0
      ? 0
      : Math.round(
          (totalCorrect / totalQuestions) * 100
        );

  const level = Math.floor(stats.xp / 100) + 1;

  const currentXP = stats.xp % 100;

  const badges = [
    {
      title: "1 Day Streak",
      unlocked: stats.currentStreak >= 1,
    },
    {
      title: "7 Day Streak",
      unlocked: stats.currentStreak >= 7,
    },
    {
      title: "30 Day Streak",
      unlocked: stats.currentStreak >= 30,
    },
    {
      title: "100 Day Streak",
      unlocked: stats.currentStreak >= 100,
    },
    {
      title: "365 Day Streak",
      unlocked: stats.currentStreak >= 365,
    },
    {
      title: "First Quiz",
      unlocked: history.length >= 1,
    },
    {
      title: "100 XP",
      unlocked: stats.xp >= 100,
    },
    {
      title: "Accuracy Master",
      unlocked: accuracy >= 80,
    },
    {
      title: "Perfect Quiz",
      unlocked: history.some(
        (quiz) => quiz.score === quiz.total
      ),
    },
    {
      title: "Quiz Champion",
      unlocked: history.length >= 25,
    },
  ];

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "auto",
      }}
    >
      <h1> Achievements</h1>

      {/* Stats Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div className="card">
          <h2></h2>
          <h3>Current Streak</h3>
          <p>{stats.currentStreak} Day(s)</p>
        </div>

        <div className="card">
          <h2></h2>
          <h3>Longest Streak</h3>
          <p>{stats.longestStreak} Day(s)</p>
        </div>

        <div className="card">
          <h2></h2>
          <h3>Total XP</h3>
          <p>{stats.xp}</p>
        </div>

        <div className="card">
          <h2></h2>
          <h3>Level</h3>
          <p>{level}</p>
        </div>

        <div className="card">
          <h2></h2>
          <h3>Accuracy</h3>
          <p>{accuracy}%</p>
        </div>

        <div className="card">
          <h2></h2>
          <h3>Total Quizzes</h3>
          <p>{history.length}</p>
        </div>
      </div>

      {/* XP Progress */}

      <h2 style={{ marginTop: "50px" }}>
        XP Progress
      </h2>

      <div
        style={{
          width: "100%",
          height: "25px",
          background: "#ddd",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${currentXP}%`,
            height: "100%",
            background: "#4caf50",
          }}
        />
      </div>

      <p style={{ marginTop: "10px" }}>
        {currentXP}/100 XP to Level {level + 1}
      </p>

      {/* Badges */}

      <h2 style={{ marginTop: "50px" }}>
        Badge Collection
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {badges.map((badge, index) => (
          <div
            key={index}
            className="card"
            style={{
              opacity: badge.unlocked ? 1 : 0.4,
            }}
          >
            <h2>
              {badge.unlocked ? "🏅" : "🔒"}
            </h2>

            <h3>{badge.title}</h3>

            <p>
              {badge.unlocked
                ? "Unlocked"
                : "Locked"}
            </p>
          </div>
        ))}
      </div>

      {/* Daily Goals */}

      <h2 style={{ marginTop: "50px" }}>
        Today's Goals
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div className="card">
          <h3>
            {history.length > 0 ? "✅" : "⬜"} Complete a Quiz
          </h3>

          <p>
            Take at least one quiz today.
          </p>
        </div>

        <div className="card">
          <h3>
            {accuracy >= 80 ? "✅" : "⬜"} Score Above 80%
          </h3>

          <p>
            Maintain overall accuracy above 80%.
          </p>
        </div>

        <div className="card">
          <h3>
            {stats.currentStreak >= 1 ? "✅" : "⬜"} Maintain Streak
          </h3>

          <p>
            Don't miss today's quiz.
          </p>
        </div>
      </div>

      {/* Reward */}

      <h2 style={{ marginTop: "50px" }}>
        Daily Reward
      </h2>

      <div className="card">
        <h2> +50 XP Bonus</h2>

        <p>
          Complete today's goals to earn bonus XP.
        </p>
      </div>
    </div>
  );
}

export default Achievements;