import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaMoneyBillWave,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
  FaBuilding,
  FaChevronLeft,
  FaChevronRight,
  FaPlusCircle, // BARU: Icon untuk input anggaran
} from "react-icons/fa";
import "./Layout.css";

// === IMPORT ASET GAMBAR ===
import logoPelindo from "../pictures/pelindo2.png";
import batikImg from "../pictures/batik.png";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard Utama", icon: <FaHome /> },
    { category: "Manajemen Aset" },
    { path: "/assets", label: "Inventory Aset", icon: <FaBox /> },
    { category: "Keuangan & Proyek" },
    {
      path: "/budget",
      label: "Anggaran (CAPEX/OPEX)",
      icon: <FaMoneyBillWave />,
    },
    { path: "/budget/input", label: "Input Anggaran", icon: <FaPlusCircle /> }, // BARU
    { path: "/projects", label: "Daftar Pekerjaan", icon: <FaBuilding /> },
    { category: "Administrasi" },
    { path: "/users", label: "User Management", icon: <FaUsers /> },
    { path: "/reports", label: "Laporan Eksekutif", icon: <FaChartBar /> },
  ];

  useEffect(() => {
    const currentMenu = menuItems.find(
      (item) => item.path === location.pathname,
    );
    if (currentMenu) {
      setPageTitle(currentMenu.label);
    }
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      navigate("/");
    }
  };

  return (
    <div className="layout-wrapper">
      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""}`}
        style={{ "--batik-url": `url(${batikImg})` }}
      >
        <div className="sidebar-header">
          <img src={logoPelindo} alt="Pelindo" className="sidebar-logo-img" />
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item, index) =>
            item.category ? (
              !collapsed && (
                <div key={index} className="menu-category">
                  {item.category}
                </div>
              )
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
              >
                <div className="menu-icon">{item.icon}</div>
                {!collapsed && <span className="menu-text">{item.label}</span>}
              </Link>
            ),
          )}

          <div className="menu-item logout" onClick={handleLogout}>
            <div className="menu-icon">
              <FaSignOutAlt />
            </div>
            {!collapsed && <span className="menu-text">Sign Out</span>}
          </div>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="toggle-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
            <div className="breadcrumb">
              <span>Pelindo</span> / <span className="active">{pageTitle}</span>
            </div>
          </div>

          <div className="topbar-right">
            <span className="dashboard-year-badge">Tahun Anggaran: 2026</span>
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">Joy Silalahi</span>
                <span className="user-role">Super Admin</span>
              </div>
              <div className="user-avatar">JS</div>
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
