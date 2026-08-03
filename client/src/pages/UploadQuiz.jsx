import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/UploadQuiz.css";

export default function UploadQuiz() {

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

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

      const quizzes = response.data;

      setHistory(quizzes);

      calculateStreak(quizzes);

    } catch (err) {

      console.error(err);

    }

  };

  /* =========================
          STREAK
  ========================== */

  const calculateStreak = (quizzes) => {

    if (quizzes.length === 0) {
      setStreak(0);
      return;
    }

    const uniqueDates = [
      ...new Set(
        quizzes.map(q =>
          new Date(q.created_at).toDateString()
        )
      ),
    ];

    uniqueDates.sort(
      (a, b) => new Date(b) - new Date(a)
    );

    let count = 0;

    let today = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {

      const expected = new Date(today);

      expected.setDate(today.getDate() - i);

      if (
        new Date(uniqueDates[i]).toDateString() ===
        expected.toDateString()
      ) {

        count++;

      } else {

        break;

      }

    }

    setStreak(count);

  };

  /* =========================
          STATS
  ========================== */

  const quizzesTaken = history.length;

  const totalCorrect = history.reduce(
    (sum, quiz) => sum + Number(quiz.score),
    0
  );

  const totalQuestions = history.reduce(
    (sum, quiz) => sum + Number(quiz.total_questions),
    0
  );

  const avgAccuracy =
    totalQuestions > 0
      ? Math.round(
          (totalCorrect / totalQuestions) * 100
        )
      : 0;

  const recentQuizzes = history.slice(0, 3);

  /* =========================
        FILE PICKER
  ========================== */

  const openPicker = () => {
    inputRef.current.click();
  };

  const handleFile = (selectedFile) => {

    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".txt")) {

      alert("Please upload a TXT file.");

      return;

    }

    setFile(selectedFile);

  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length > 0) {

      handleFile(e.dataTransfer.files[0]);

    }

  };
    /* =========================
        GENERATE QUIZ
  ========================== */

  const generateQuiz = async () => {

    if (!file) {
      alert("Please upload a TXT file first.");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/api/upload/txt",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "generatedQuiz",
        JSON.stringify(response.data.questions)
      );

      localStorage.setItem(
        "quizTitle",
        file.name
      );

      alert("Quiz Generated Successfully!");

      navigate("/playquiz");

    } catch (err) {

      console.error(err);

      alert("Failed to generate quiz.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <>

      <Navbar />

      <div className="upload-page">

        <div className="upload-container">

          {/* LEFT */}

          <div className="upload-card">

            <div className="upload-header">

              <div className="upload-title">
                📄 NEW QUIZ
              </div>

              <div className="question-pill">
                ⚡ 5 Questions
              </div>

            </div>

            <div
              className={`drop-zone ${
                dragging ? "dragging" : ""
              }`}
              onClick={openPicker}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >

              <div className="upload-icon">
                ☁️
              </div>

              <h2>DROP YOUR NOTES HERE</h2>

              <p>TXT FILE ONLY</p>

              <button
                className="browse-btn"
                type="button"
              >
                Browse Files
              </button>

              <input
                ref={inputRef}
                type="file"
                accept=".txt"
                hidden
                onChange={(e) =>
                  handleFile(e.target.files[0])
                }
              />

            </div>

            {file && (

              <div className="file-card">

                <span>
                  📄 {file.name}
                </span>

                <span className="ready-tag">
                  READY
                </span>

              </div>

            )}

            <button
              className="generate-btn"
              disabled={!file || loading}
              onClick={generateQuiz}
            >

              {loading
                ? "Generating..."
                : "⚡ GENERATE QUIZ"}

            </button>

          </div>
                    {/* RIGHT */}

          <div className="right-panel">

            {/* STREAK */}

            <div className="streak-card">

              <div>

                <small>KEEP IT GOING!</small>

                <p>
                  Quiz today to save your streak.
                </p>

              </div>

              <div className="streak-box">

                <h2>{streak}</h2>

                <span>DAY STREAK</span>

              </div>

            </div>

            {/* STATS */}

            <div className="stats-grid">

              <div className="mini-card">

                <small>QUIZZES</small>

                <h2>{quizzesTaken}</h2>

              </div>

              <div className="mini-card">

                <small>ACCURACY</small>

                <h2>{avgAccuracy}%</h2>

              </div>

            </div>

            {/* RECENT QUIZZES */}

            <div className="recent-card">

              <h3>RECENT</h3>

              <ul>

                {recentQuizzes.length === 0 ? (

                  <li>No quizzes yet</li>

                ) : (

                  recentQuizzes.map((quiz) => (

                    <li key={quiz.id}>

                      <span className="recent-title">

                        {quiz.title.length > 18
                          ? quiz.title.substring(0, 18) + "..."
                          : quiz.title}

                      </span>

                      <span>

                        {quiz.score}/{quiz.total_questions}

                      </span>

                    </li>

                  ))

                )}

              </ul>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}