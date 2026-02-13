import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/src/pictures/logo2.png" alt="Logo" />
          <span>Inventory System</span>
        </div>
        
        <nav className="sidebar-menu">
          {/* Menu Dashboard */}
          <Link 
            to="/dashboard" 
            className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <i className="fas fa-home"></i> Dashboard
          </Link>

          {/* Menu Anggaran (Capex & Opex) */}
          <Link 
            to="/budgets" 
            className={`menu-item ${location.pathname === '/budgets' ? 'active' : ''}`}
          >
            <i className="fas fa-wallet"></i> Anggaran Capex/Opex
          </Link>

          {/* Menu Aset (Contoh masa depan) */}
          <Link 
            to="/assets" 
            className={`menu-item ${location.pathname === '/assets' ? 'active' : ''}`}
          >
            <i className="fas fa-boxes"></i> Daftar Aset
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <header className="top-navbar">
          {/* Header content like User Profile / Search */}
          <div className="user-info">Halo, Admin</div>
        </header>

        <div className="page-body">
          {/* Outlet adalah tempat dimana halaman Dashboard atau Budgets akan muncul */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;