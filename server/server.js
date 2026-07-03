const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/upload", uploadRoutes);

// Test Database Connection
db.query("SELECT NOW()")
  .then(() => {
    console.log("✅ Supabase PostgreSQL Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ Database Error:", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("Quizzer Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});