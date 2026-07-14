import Navbar from "../components/Navbar";
import "../styles/Scores.css";

const history = [
  {
    title: "cell-biology-ch4.txt",
    subject: "Cell Biology",
    date: "01/12/2026",
    score: "5 / 5",
    percentage: "100%",
    color: "green",
  },
  {
    title: "physics-notes.txt",
    subject: "Physics",
    date: "01/11/2026",
    score: "4 / 5",
    percentage: "80%",
    color: "green",
  },
  {
    title: "unsa-debate (1).txt",
    subject: "World History",
    date: "01/09/2026",
    score: "4 / 5",
    percentage: "80%",
    color: "green",
  },
  {
    title: "chem-reactions.txt",
    subject: "Chemistry",
    date: "01/08/2026",
    score: "3 / 5",
    percentage: "60%",
    color: "yellow",
  },
  {
    title: "unsa-debate.txt",
    subject: "World History",
    date: "01/08/2026",
    score: "1 / 5",
    percentage: "20%",
    color: "red",
  },
];

export default function Scores() {
  return (
    <>
      <Navbar />

      <div className="scores-page">

        <div className="scores-container">

          {/* TOP CARDS */}

          <div className="stats-grid">

            <div className="score-stat">
              <span> QUIZZES TAKEN</span>
              <h2>6</h2>
            </div>

            <div className="score-stat">
              <span> AVG ACCURACY</span>
              <h2>70%</h2>
            </div>

            <div className="score-stat">
              <span> BEST SCORE</span>
              <h2>5</h2>
            </div>

            <div className="score-stat">
              <span> DAY STREAK</span>
              <h2>7</h2>
            </div>

          </div>

          {/* HISTORY */}

          <div className="history-card">

            <h2> QUIZ HISTORY</h2>

            {history.map((quiz, index) => (

              <div className="history-row" key={index}>

                <div className="history-left">

                  <div className="file-icon">
                    
                  </div>

                  <div>

                    <h4>{quiz.title}</h4>

                    <p>
                      {quiz.subject} • {quiz.date}
                    </p>

                  </div>

                </div>

                <div className="history-right">

                  <div className={`score-box ${quiz.color}`}>
                    {quiz.score}
                  </div>

                  <h3>{quiz.percentage}</h3>

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