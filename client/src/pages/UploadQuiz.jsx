import { useRef, useState } from "react";
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
              className={`drop-zone ${dragging ? "dragging" : ""}`}
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

            <div className="streak-card">

              <div>

                <small>KEEP IT GOING!</small>

                <p>
                  Quiz today to save your streak.
                </p>

              </div>

              <div className="streak-box">

                <h2>7</h2>

                <span>DAY STREAK</span>

              </div>

            </div>

            <div className="stats-grid">

              <div className="mini-card">

                <small>QUIZZES</small>

                <h2>16</h2>

              </div>

              <div className="mini-card">

                <small>ACCURACY</small>

                <h2>82%</h2>

              </div>

            </div>

            <div className="recent-card">

              <h3>RECENT</h3>

              <ul>

                <li>
                  Physics
                  <span>4/5</span>
                </li>

                <li>
                  React
                  <span>5/5</span>
                </li>

                <li>
                  Biology
                  <span>4/5</span>
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}