import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ── Admin ──
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ViewAsset from "./components/ViewAsset";

// ── User ──
import UserLayout    from "./components/User/UserLayout";
import UserDashboard from "./components/User/Dashboard";
import Inventaris    from "./components/User/Inventaris";
import Peminjaman    from "./components/User/Peminjaman";
import Scanbarcode   from "./components/User/Scanbarcode";
import Profil        from "./components/User/Profil";

function App() {
  return (
    <Router>
      <Routes>

        {/* ── Admin routes ── */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assets"    element={<ViewAsset />} />
        </Route>

        {/* ── User routes ── */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard"  element={<UserDashboard />} />
          <Route path="inventaris" element={<Inventaris />} />
          <Route path="peminjaman" element={<Peminjaman />} />
          <Route path="scan"       element={<Scanbarcode />} />
          <Route path="profil"     element={<Profil />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;