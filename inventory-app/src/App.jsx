import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import Komponen
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import BudgetManagement from "./components/budget/BudgetManagement";

// Import AssetManagement (Bisa dibuat filenya setelah ini)
// import AssetManagement from "./components/AssetManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. ROUTE PUBLIK (Tanpa Sidebar/Navbar) */}
        <Route path="/login" element={<Auth />} />

        {/* 2. ROUTE TERPROTEKSI (Dengan Layout: Sidebar & Header) */}
        <Route path="/" element={<Layout />}>
          {/* Index Route: Mengarahkan '/' ke '/dashboard' secara otomatis */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />

          {/* Modul Anggaran (Capex & Opex) */}
          <Route path="budgets" element={<BudgetManagement />} />

          {/* Modul Aset: Tempat dimana aset di-link ke Anggaran */}
          <Route
            path="assets"
            element={<div>Halaman Daftar Aset (Placeholder)</div>}
          />

          {/* Tambahkan modul lain di sini nanti */}
        </Route>

        {/* 3. CATCH-ALL ROUTE (Halaman tidak ditemukan) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
