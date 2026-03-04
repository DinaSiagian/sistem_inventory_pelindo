import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ViewAsset from "./components/ViewAsset";
import Auth from "./components/Auth";
import BudgetManagement from "./components/BudgetManagement";
import Budgetinput from "./components/Budgetinput";
import Peminjaman from "./components/Peminjaman";
import UserManagement from "./components/UserManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Halaman Login (Auth) berada di luar Layout agar tampil full screen */}
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />

        {/* 2. Halaman Internal yang menggunakan Sidebar & Header (Layout) */}
        <Route element={<Layout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Manajemen Aset */}
          <Route path="/assets" element={<ViewAsset />} />
          <Route path="/peminjaman" element={<Peminjaman />} />

          {/* Keuangan & Proyek - URUTAN PENTING! */}
          {/* Route yang lebih spesifik HARUS di atas yang lebih general */}
          <Route path="/budget/input" element={<Budgetinput />} />
          <Route path="/budget" element={<BudgetManagement />} />
          <Route
            path="/projects"
            element={
              <div style={{ padding: "2rem" }}>
                Halaman Daftar Pekerjaan (Coming Soon)
              </div>
            }
          />

          {/* Administrasi */}
          <Route path="/users" element={<UserManagement />} />
          <Route
            path="/reports"
            element={
              <div style={{ padding: "2rem" }}>
                Halaman Laporan Eksekutif (Coming Soon)
              </div>
            }
          />
        </Route>

        {/* 3. Catch-all route - redirect ke login jika route tidak ditemukan */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
