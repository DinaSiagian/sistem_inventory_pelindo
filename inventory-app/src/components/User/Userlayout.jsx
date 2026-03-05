import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaHandHolding,
  FaQrcode,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../Layout.css";
import "./shared.css";

import logoPelindo from "../../pictures/pelindo2.png";
import batikImg from "../../pictures/batik.png";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
  const userInitials = currentUser.nama
    ? currentUser.nama
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const menuItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: <FaHome /> },
    { category: "Manajemen Aset" },
    { path: "/user/inventaris", label: "Inventaris Aset", icon: <FaBox /> },
    {
      path: "/user/peminjaman",
      label: "Peminjaman & Pengembalian",
      icon: <FaHandHolding />,
    },
    { path: "/user/scan", label: "Scan Barcode", icon: <FaQrcode /> },
    { category: "Akun" },
    { path: "/user/profil", label: "Profil Saya", icon: <FaUserCircle /> },
  ];

  useEffect(() => {
    const currentMenu = menuItems.find(
      (item) => item.path === location.pathname,
    );
    if (currentMenu) setPageTitle(currentMenu.label);
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      sessionStorage.removeItem("currentUser");
      navigate("/login");
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
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">{currentUser.nama || "User"}</span>
                <span className="user-role">
                  {currentUser.cabang || "Pegawai"}
                </span>
              </div>
              <div className="user-avatar">{userInitials}</div>
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

export default UserLayout;
