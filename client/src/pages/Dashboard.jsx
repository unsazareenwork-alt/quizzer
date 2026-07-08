import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      <Navbar />

      <div className="dashboard-container">

        <h1 className="welcome">
          Welcome Back, Unsa 👋
        </h1>

        <div className="dashboard-grid">

          {/* LEFT SIDE */}

          <div className="left-column">

            <Link to="/quiz" className="newquiz-link">
              <div className="newquiz-card">
                <h2>+ NEW QUIZ</h2>
                <p>Create a quiz from your notes</p>
              </div>
            </Link>

            <div className="card">
              <h2>Recent Quizzes</h2>

              <div className="row">
                <span>Physics Notes</span>
                <span>8/10</span>
              </div>

              <div className="row">
                <span>OS Notes</span>
                <span>10/10</span>
              </div>

              <div className="row">
                <span>React Basics</span>
                <span>7/10</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="right-column">

            <div className="card">
              <h2>Statistics</h2>

              <div className="row">
                <span>Accuracy</span>
                <span>82%</span>
              </div>

              <div className="row">
                <span>Quizzes</span>
                <span>16</span>
              </div>

              <div className="row">
                <span>XP</span>
                <span>320</span>
              </div>

            </div>

            <div className="card">
              <h2>Achievements</h2>

              <p>🏆 First Quiz</p>
              <p>⚡ 100 XP</p>
              <p>🔥 7 Day Streak</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}