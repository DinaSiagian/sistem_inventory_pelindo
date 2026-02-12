import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Halaman Login */}
        <Route path="/" element={<Auth />} />

        {/* Rute Dashboard dengan Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Nanti kamu bisa tambah halaman lain di sini, misal: */}
          {/* <Route path="inventory" element={<InventoryList />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
