import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdSportsEsports } from "react-icons/md";
import logo from "../assets/logo.png";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save logged in user (optional but useful)
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after login
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="left-panel">

          <div className="brand">
            <img
              src={logo}
              alt="Quizzer"
              className="brand-logo"
            />

            <h2>
              QUIZ<span>ZER</span>
            </h2>
          </div>

          <h1>
            TURN YOUR
            <br />
            NOTES INTO
            <br />
            A HIGH SCORE.
          </h1>

          <p>
            Drop a file, get 5 questions,
            <br />
            and level up every time you study.
          </p>

          <div className="stats">

            <div className="stat-card">
              <div className="stat-title">
                Q/A UPLOAD
              </div>
              <h3>5</h3>
            </div>

            <div className="stat-card">
              <div className="stat-title">
                ☀ BEST STREAK
              </div>
              <h3>
                7<span>d</span>
              </h3>
            </div>

          </div>

        </div>

        <div className="right-panel">

          <div className="tabs">

            <button className="active">
              LOG IN
            </button>

            <Link to="/register">
              <button>SIGN UP</button>
            </Link>

          </div>

          <form onSubmit={handleSubmit}>

            <label>EMAIL</label>

            <div className="input-box">
              <MdEmail />

              <input
                type="email"
                name="email"
                placeholder="you@study.gg"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>PASSWORD</label>

            <div className="input-box">
              <MdLock />

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              <MdSportsEsports />
              LET'S GO
            </button>

          </form>

          <p className="bottom-text">
            New player?
            <Link to="/register">
              Create one
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}