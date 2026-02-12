import React from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Outlet untuk konten dinamis
import {
  FaHome,
  FaBox,
  FaExchangeAlt,
  FaUsers,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus sesi/token disini jika ada
    navigate("/"); // Kembali ke login
  };

  return (
    <div className="layout-container">
      {/* --- SIDEBAR KIRI --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>INVENTORY</h2>
          <p>Pelindo Multi Terminal</p>
        </div>

        <nav className="sidebar-menu">
          <a href="/dashboard" className="menu-item active">
            <FaHome className="icon" /> <span>Dashboard</span>
          </a>
          <a href="/inventory" className="menu-item">
            <FaBox className="icon" /> <span>Data Barang</span>
          </a>
          <a href="/transactions" className="menu-item">
            <FaExchangeAlt className="icon" /> <span>Transaksi</span>
          </a>
          <a href="/users" className="menu-item">
            <FaUsers className="icon" /> <span>Manajemen User</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="icon" /> <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* --- KONTEN KANAN --- */}
      <div className="main-content">
        {/* Header Atas */}
        <header className="top-header">
          <button className="toggle-btn">
            <FaBars />
          </button>
          <div className="user-info">
            <span>
              Halo, <strong>Admin Pelindo</strong>
            </span>
            <div className="avatar">AP</div>
          </div>
        </header>

        {/* Area Konten Berubah-ubah di sini */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
