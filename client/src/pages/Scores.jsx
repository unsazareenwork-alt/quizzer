import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Scores() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setHistory(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load quiz history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h1>Quiz History</h1>

        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No quizzes taken yet.</p>
        ) : (
          history.map((quiz) => (
            <div
              key={quiz.id}
              style={{
                border: "2px solid #17131F",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                background: "#FFFDF5",
                boxShadow: "5px 5px 0 #17131F",
              }}
            >
              <h2>{quiz.title}</h2>

              <p>
                <strong>Score:</strong>{" "}
                {quiz.score}/{quiz.total_questions}
              </p>

              <p>
                <strong>Accuracy:</strong>{" "}
                {Math.round(Number(quiz.accuracy))}%
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  quiz.created_at
                ).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Scores;