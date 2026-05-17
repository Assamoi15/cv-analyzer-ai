import { Routes, Route, Navigate } from "react-router-dom";

import Login               from "./pages/Login";
import AdminDashboard      from "./pages/AdminDashboard";
import RecruiterDashboard  from "./pages/RecruiterDashboard";
import ProtectedRoute      from "./components/ProtectedRoute";
import DashboardLayout     from "./components/DashboardLayout";

// New Pages (We will create these)
import CandidatesPage      from "./pages/CandidatesPage";
import UploadPage          from "./pages/UploadPage";
import AIToolkitPage       from "./pages/AIToolkitPage";
import ReportsPage         from "./pages/ReportsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Recruiter Routes with Shared Layout */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute role="recruiter">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/recruiter/dashboard" />} />
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="candidates" element={<CandidatesPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="toolkit" element={<AIToolkitPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;