// ============================================================
// UserLayout.jsx — sidebar + badge notifikasi + pop alert
// ============================================================
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
import "./Shared.css";

import logoPelindo from "../../pictures/pelindo2.png";
import batikImg from "../../pictures/batik.png";

import { transactionsMock, assetsMock, fmt } from "./Data";
import { useLoanNotifications } from "./useLoanNotifications";
import LoanAlertPopup from "./LoanAlertPopup";
import { authAPI } from "../../services/api";

// ─────────────────────────────────────────
// Main Layout
// ─────────────────────────────────────────
const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [showAlert, setShowAlert] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    if (location.pathname === path) {
      setResetKey((prevKey) => prevKey + 1);
    }
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const getInitials = (name) => {
    if (!name) return "U";
    const strName = String(name);
    const parts = strName.split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return strName.slice(0, 2).toUpperCase();
  };

  const getRoleLabel = (roleCode) => {
    const roles = {
      admin: "Administrator",
      user: "User / Pegawai",
    };
    return roles[roleCode] || roleCode;
  };

  // Fleksibel: support id = 1 (number), "1" (string), atau "u001" (string)
  const rawId = String(user?.id ?? "");
  const userId = rawId.startsWith("u")
    ? rawId
    : `u00${rawId}`;

  const userInitials = getInitials(user?.name);



  const menuItems = [


    { path: "/user/inventaris", label: "Inventaris Aset", icon: <FaBox /> },
    {
      path: "/user/peminjaman",
      label: "BAST Aset",
      icon: <FaHandHolding />,
    },

    { category: "Akun" },
    { path: "/user/profil", label: "Profil Saya", icon: <FaUserCircle /> },
  ];

  useEffect(() => {
    const found = menuItems.find((item) => item.path === location.pathname);
    if (found) setPageTitle(found.label);
  }, [location]);

  const handleLogout = () => {
    // Menghapus window.confirm karena sering diblokir oleh browser
    authAPI.logout().catch(console.error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>

      <div className="layout-wrapper" style={{ flexDirection: "row" }}>
        <aside
          className={`sidebar ${collapsed ? "collapsed" : ""}`}
          style={{ "--batik-url": `url(${batikImg})`, borderRight: "1px solid rgba(255,255,255,0.1)", borderLeft: "none" }}
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
                  className={`menu-item ${location.pathname.startsWith(item.path) ? "active" : ""}`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <div className="menu-icon" style={{ position: "relative" }}>
                    {item.icon}
                  </div>

                  {!collapsed && (
                    <span className="menu-text">{item.label}</span>
                  )}
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
                <span>Pelindo</span> /{" "}
                <span className="active">{pageTitle}</span>
              </div>
            </div>

            <div className="topbar-right">
              

              <div
                className="user-profile"
                onClick={() => navigate("/user/profil")}
                style={{ cursor: "pointer" }}
              >
                <div className="user-info">
                  <span className="user-name">{user?.name || "User"}</span>
                  <span className="user-role">
                    {getRoleLabel(user?.role_code)}
                  </span>
                </div>
                <div className="user-avatar">{userInitials}</div>
              </div>
            </div>
          </header>

          <main className="page-content">
            <Outlet key={`${location.pathname}-${resetKey}`} />
          </main>
        </div>
      </div>


    </>
  );
};

export default UserLayout;
