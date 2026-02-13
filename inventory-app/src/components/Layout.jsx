import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaHome, FaBox, FaMoneyBillWave, 
  FaChartBar, FaUsers, FaSignOutAlt, 
  FaBuilding, FaServer, FaChevronLeft, FaChevronRight, FaBars 
} from "react-icons/fa";
import "./Layout.css";

// === IMPORT ASET ===
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
    { path: "/monitoring", label: "Monitoring IT", icon: <FaServer /> },
    { category: "Keuangan & Proyek" },
    { path: "/budget", label: "Anggaran (CAPEX/OPEX)", icon: <FaMoneyBillWave /> },
    { path: "/projects", label: "Daftar Pekerjaan", icon: <FaBuilding /> },
    { category: "Administrasi" },
    { path: "/users", label: "User Management", icon: <FaUsers /> },
    { path: "/reports", label: "Laporan Eksekutif", icon: <FaChartBar /> },
  ];

  useEffect(() => {
    const currentMenu = menuItems.find(item => item.path === location.pathname);
    setPageTitle(currentMenu ? currentMenu.label : "Sistem Inventory");
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Keluar dari aplikasi?")) navigate("/");
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

        {/* Container Menu Kaca */}
        <div className="sidebar-menu">
          {menuItems.map((item, index) => (
            item.category ? (
              !collapsed && <div key={index} className="menu-category">{item.category}</div>
            ) : (
              <Link 
                key={index} 
                to={item.path} 
                className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
                title={collapsed ? item.label : ""}
              >
                <div className="menu-icon">{item.icon}</div>
                <span className="menu-text">{item.label}</span>
              </Link>
            )
          ))}
          
          {/* Tombol Logout: Sekarang akan didorong ke bawah (margin-top: auto)
              tapi naik sedikit karena ada padding-bottom di container */}
          <div className="menu-item logout" onClick={handleLogout}>
            <div className="menu-icon"><FaSignOutAlt /></div>
            {!collapsed && <span className="menu-text">Sign Out</span>}
          </div>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
            <div className="breadcrumb">
              <span>Pelindo</span> / <span className="active">{pageTitle}</span>
            </div>
          </div>

          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">Joy Silalahi</span>
              <span className="user-role">Super Admin</span>
            </div>
            <div className="user-avatar">JS</div>
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