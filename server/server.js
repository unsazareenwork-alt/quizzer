const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const quizRoutes = require("./routes/quizRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Load environment variables first
dotenv.config();

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/upload", uploadRoutes);

// Test Database Connection
db.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Database Error:", err);
  } else {
    console.log("Aiven MySQL Connected Successfully");
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Quizzer Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});