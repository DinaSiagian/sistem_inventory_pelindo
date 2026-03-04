import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ── Auth ──
import Auth from "./components/Auth";

// ── Super Admin ──
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ViewAsset from "./components/ViewAsset";
import BudgetManagement from "./components/BudgetManagement";
import BudgetInput from "./components/BudgetInput";

// ── User / Pegawai ──
import UserLayout from "./components/UserLayout";
import UserDashboard from "./components/Userdashboard";
import UserAssets from "./components/Userassets";
import UserBorrow from "./components/Userborrow";
import UserHistory from "./components/Userhistory";
import UserProfile from "./components/UserProfile";

/* ============================================================
   APP
   ============================================================ */
function App() {
  return (
    <Router>
      <Routes>

        {/* ══════════════════════════════════════════
            1. AUTH — Full screen login / register
            ══════════════════════════════════════════ */}
        <Route path="/"      element={<Auth />} />
        <Route path="/login" element={<Auth />} />

        {/* ══════════════════════════════════════════
            2. SUPER ADMIN — Sidebar lengkap
            ══════════════════════════════════════════ */}
        <Route element={<Layout />}>
          <Route path="/dashboard"    element={<Dashboard />} />
          <Route path="/assets"       element={<ViewAsset />} />
          <Route path="/budget/input" element={<BudgetInput />} />
          <Route path="/budget"       element={<BudgetManagement />} />
          <Route path="/projects"     element={<ComingSoon label="Daftar Pekerjaan" />} />
          <Route path="/users"        element={<ComingSoon label="User Management" />} />
          <Route path="/reports"      element={<ComingSoon label="Laporan Eksekutif" />} />
        </Route>

        {/* ══════════════════════════════════════════
            3. USER / PEGAWAI — Sidebar terbatas
            ══════════════════════════════════════════ */}
        <Route path="/user" element={<UserLayout />}>
          <Route index            element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="assets"    element={<UserAssets />} />
          <Route path="borrow"    element={<UserBorrow />} />
          <Route path="history"   element={<UserHistory />} />
          <Route path="profile"   element={<UserProfile />} />
        </Route>

        {/* ══════════════════════════════════════════
            4. Catch-all → login
            ══════════════════════════════════════════ */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

/* ── Helper: Placeholder untuk halaman coming soon ── */
const ComingSoon = ({ label }) => (
  <div style={{
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    height: "60vh", gap: "14px", textAlign: "center",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }}>
    <span style={{ fontSize: "3rem" }}>🚧</span>
    <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#334155" }}>{label}</span>
    <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
      Halaman ini sedang dalam pengembangan
    </span>
  </div>
);

export default App;