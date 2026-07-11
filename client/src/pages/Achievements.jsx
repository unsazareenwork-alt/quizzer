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

                <div className="avatar-box">
                  AK
                </div>

                <div className="level-box">
                  7
                </div>

              </div>

              <div className="profile-info">

                <h2>ALEX KADE</h2>

                <div className="profile-tags">

                  <div className="tag level-tag">
                    LEVEL 7
                  </div>

                  <div className="tag badge-tag">
                    4 / 8 BADGES
                  </div>

                </div>

                <div className="xp-label">
                  XP → LEVEL
                </div>

                <div className="xp-bar">
                  <div className="xp-fill"></div>
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

              <div className="streak-title">
                DAY STREAK
              </div>

            </div>

          </div>

          {/* ================= WEEK STREAK ================= */}

          <div className="week-card">

            <h3>THIS WEEK</h3>

            <div className="week-strip">

              {["M","T","W","T","F","S","S"].map((day,index)=>(

                <div
                  key={index}
                  className="day-card"
                >

                  <div className="day-icon">
                    🔥
                  </div>

                  <span>{day}</span>

                </div>

              ))}

            </div>

          </div>

          {/* ================= BADGES ================= */}

          <div className="badges-card">

            {/* We'll add your PNG badges here next */}

          </div>

        </div>
      </div>

    </>
  );
}