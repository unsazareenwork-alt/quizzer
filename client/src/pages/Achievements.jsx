import Navbar from "../components/Navbar";
import "../styles/Achievements.css";

export default function Achievements() {
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
                  7
                </div>

              </div>

              <div className="profile-info">

                <h2>ALEX KADE</h2>

                <div className="profile-tags">

                  <div className="tag level">
                    LEVEL 7
                  </div>

                  <div className="tag badges">
                    4 / 8 BADGES
                  </div>

                </div>

                <div className="xp-text">
                  XP → LEVEL
                </div>

                <div className="xp-bar">
                  <div
                    className="xp-fill"
                    style={{ width: "64%" }}
                  ></div>
                </div>

                <div className="xp-count">
                  320 / 500 XP
                </div>

              </div>

            </div>

            <div className="streak-card">

              <div className="streak-number">
                7
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