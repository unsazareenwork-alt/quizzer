import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadQuiz from "./pages/UploadQuiz";
import Scores from "./pages/Scores";
import Improvements from "./pages/Improvements";
import Achievements from "./pages/Achievements";
import ProtectedRoute from "./components/ProtectedRoute";
import PlayQuiz from "./pages/PlayQuiz";
import ReviewQuiz from "./pages/ReviewQuiz";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <UploadQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/scores"
        element={
          <ProtectedRoute>
            <Scores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/improvements"
        element={
          <ProtectedRoute>
            <Improvements />
          </ProtectedRoute>
        }
      />
      <Route
  path="/playquiz"
  element={
    <ProtectedRoute>
      <PlayQuiz />
    </ProtectedRoute>
  }
/>
<Route
    path="/review"
    element={<ReviewQuiz />}
/>

      <Route
        path="/achievements"
        element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;