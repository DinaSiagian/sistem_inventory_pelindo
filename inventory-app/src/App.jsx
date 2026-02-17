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
import Auth from "./components/Auth"; // Pastikan Auth diimpor
import BudgetManagement from "./components/BudgetManagement"; // Impor halaman budget

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Halaman Login (Auth) berada di luar Layout agar tampil full screen */}
        <Route path="/" element={<Auth />} />

        {/* 2. Halaman Internal yang menggunakan Sidebar & Header (Layout) */}
        <Route element={<Layout />}>
          {/* Redirect otomatis ke dashboard jika mengakses /dashboard secara langsung */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Route untuk Inventory Aset */}
          <Route path="assets" element={<ViewAsset />} />

          {/* TAMBAHKAN ROUTE INI: Agar menu Budget Management berfungsi */}
          <Route path="budget" element={<BudgetManagement />} />
        </Route>

        {/* 3. Penanganan jika halaman tidak ditemukan, arahkan kembali ke Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
