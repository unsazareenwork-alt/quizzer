import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <img src={logo} alt="Quizzer" />

        <h2>
          QUIZ<span>ZER</span>
        </h2>
      </div>

      <div className="navbar-links">

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/quiz">
          Quiz
        </NavLink>

        <NavLink to="/scores">
          Scores
        </NavLink>

        <NavLink to="/achievements">
          Badges
        </NavLink>

      </div>

      <div className="navbar-right">

        <div className="pill">
          🔥 7 Day Streak
        </div>

        <div className="pill purple">
          ⚡ 320 XP
        </div>

      </div>

    </nav>
  );
}