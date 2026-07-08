import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Improvements() {
  const history =
    JSON.parse(localStorage.getItem("quizHistory")) || [];

  const lineData = history.map((quiz, index) => ({
    quiz: `Quiz ${index + 1}`,
    score: quiz.score,
  }));

  let totalCorrect = 0;
  let totalQuestions = 0;
  let bestScore = 0;

  history.forEach((quiz) => {
    totalCorrect += quiz.score;
    totalQuestions += quiz.total;

    if (quiz.score > bestScore) {
      bestScore = quiz.score;
    }
  });

  const totalWrong =
    totalQuestions - totalCorrect;

  const pieData = [
    {
      name: "Correct",
      value: totalCorrect,
    },
    {
      name: "Incorrect",
      value: totalWrong,
    },
  ];

  const COLORS = [
    "#00C49F",
    "#FF4D4F",
  ];

  const averageScore =
    history.length > 0
      ? (
          history.reduce(
            (sum, quiz) => sum + quiz.score,
            0
          ) / history.length
        ).toFixed(2)
      : 0;

  const accuracy =
    totalQuestions > 0
      ? (
          (totalCorrect / totalQuestions) *
          100
        ).toFixed(2)
      : 0;

  // ===== Weak Areas =====

  const weakAreasMap = {};

  history.forEach((quiz) => {
    if (!quiz.questions) return;

    quiz.questions.forEach((question) => {
      if (!question.isCorrect) {
        let topic = "General";

        const q =
          question.question.toLowerCase();

        if (
          q.includes("language") ||
          q.includes("hindi") ||
          q.includes("sinhala")
        ) {
          topic = "Language Policy";
        } else if (
          q.includes("constitution") ||
          q.includes("schedule")
        ) {
          topic = "Indian Constitution";
        } else if (
          q.includes("agitation") ||
          q.includes("state")
        ) {
          topic = "Regional Movements";
        } else if (
          q.includes("technology") ||
          q.includes("education")
        ) {
          topic = "Technology & Education";
        }

        weakAreasMap[topic] =
          (weakAreasMap[topic] || 0) + 1;
      }
    });
  });

  const weakAreas =
    Object.entries(weakAreasMap);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <h1>Improvements</h1>

      {/* Stats */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div>
          <h3>
            Total Quizzes: {history.length}
          </h3>
        </div>

        <div>
          <h3>
            Average Score: {averageScore}
          </h3>
        </div>

        <div>
          <h3>
            Best Score: {bestScore}
          </h3>
        </div>

        <div>
          <h3>
            Accuracy: {accuracy}%
          </h3>
        </div>
      </div>

      {/* Line Chart */}

      <h2>Performance Trend</h2>

      <div
        style={{
          width: "100%",
          height: 350,
        }}
      >
        <ResponsiveContainer>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="quiz" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        Accuracy Breakdown
      </h2>

      <div
        style={{
          width: "100%",
          height: 350,
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {pieData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weak Areas */}

      <h2>Areas Needing Improvement</h2>

      {weakAreas.length === 0 ? (
        <p>
          Great job! No weak areas
          detected yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "15px",
          }}
        >
          {weakAreas.map(
            ([topic, count], index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  border:
                    "1px solid #444",
                  borderRadius: "8px",
                  background:
                    "rgba(255,255,255,0.05)",
                }}
              >
                <h3>{topic}</h3>

                <p>
                  Missed {count} time
                  {count > 1 ? "s" : ""}
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* Learning Insight */}

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        Learning Insight
      </h2>

      <p>
        You have completed{" "}
        {history.length} quizzes with
        an overall accuracy of{" "}
        {accuracy}%.
      </p>

      <p>
        Your highest score so far is{" "}
        {bestScore}.
      </p>

      {history.length >= 2 &&
        history[
          history.length - 1
        ]?.score >
          history[
            history.length - 2
          ]?.score && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >
             Your latest score
            improved compared to the
            previous quiz!
          </p>
        )}
    </div>
  );
}

export default Improvements;