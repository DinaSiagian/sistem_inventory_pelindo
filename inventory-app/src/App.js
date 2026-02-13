import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ViewAsset from "./components/ViewAsset"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout utama */}
        <Route path="/" element={<Layout />}>
          {/* Default halaman ke dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* INI PERBAIKANNYA: Jalur untuk halaman aset */}
          <Route path="assets" element={<ViewAsset />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;