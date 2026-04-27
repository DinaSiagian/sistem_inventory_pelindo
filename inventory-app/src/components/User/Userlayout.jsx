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

import { transactionsMock, assetsMock, fmt } from "../Data";
import { useLoanNotifications } from "./useLoanNotifications";
import LoanAlertPopup from "./LoanAlertPopup";

// ─────────────────────────────────────────
// Main Layout
// ─────────────────────────────────────────
const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  // ✅ Pakai hook yang sama dengan LoanAlertPopup
  const { urgentLoans, badgeCount, badgeLevel } = useLoanNotifications(
    transactionsMock || [],
    userId,
  );

  const badgeColor = badgeLevel === "overdue" ? "#ef4444" : "#f59e0b";
  const badgeBg =
    badgeLevel === "overdue"
      ? "linear-gradient(135deg,#ef4444,#dc2626)"
      : "linear-gradient(135deg,#f59e0b,#d97706)";

  // pop alert muncul otomatis saat pertama buka
  useEffect(() => {
    if (urgentLoans.length > 0) {
      const t = setTimeout(() => setShowAlert(true), 500);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line

  const menuItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: <FaHome /> },
    { category: "Manajemen Aset" },
    { path: "/user/inventaris", label: "Inventaris Aset", icon: <FaBox /> },
    {
      path: "/user/peminjaman",
      label: "BAST Aset",
      icon: <FaHandHolding />,
      badge: true,
    },
    { path: "/user/scan", label: "Scan Barcode", icon: <FaQrcode /> },
    { category: "Akun" },
    { path: "/user/profil", label: "Profil Saya", icon: <FaUserCircle /> },
  ];

  useEffect(() => {
    const found = menuItems.find((item) => item.path === location.pathname);
    if (found) setPageTitle(found.label);
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const showBadge = badgeLevel === "overdue" || badgeLevel === "warning";

  return (
    <>
      <style>{`
        @keyframes badge-pulse {
          0%,100% { transform:scale(1);   }
          50%      { transform:scale(1.3); }
        }
      `}</style>

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
                  <div className="menu-icon" style={{ position: "relative" }}>
                    {item.icon}

                    {/* ── Badge angka merah/kuning ── */}
                    {item.badge && showBadge && (
                      <span
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -10,
                          minWidth: 18,
                          height: 18,
                          borderRadius: 99,
                          background: badgeBg,
                          color: "#fff",
                          fontSize: 10,
                          fontWeight: 900,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0 4px",
                          border: "2px solid #1e3a5f",
                          lineHeight: 1,
                          boxShadow:
                            badgeLevel === "overdue"
                              ? "0 2px 6px rgba(239,68,68,.5)"
                              : "0 2px 6px rgba(245,158,11,.5)",
                          animation:
                            badgeLevel === "overdue"
                              ? "badge-pulse 1.4s infinite"
                              : "none",
                          zIndex: 10,
                        }}
                      >
                        {badgeCount}
                      </span>
                    )}
                  </div>

                  {!collapsed && (
                    <span className="menu-text">{item.label}</span>
                  )}

                  {/* glowing dot kanan label */}
                  {item.badge && showBadge && !collapsed && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: badgeColor,
                        boxShadow: `0 0 7px ${badgeColor}`,
                        marginLeft: "auto",
                        flexShrink: 0,
                      }}
                    />
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
              {/* Bell di topbar */}
              {showBadge && (
                <button
                  onClick={() => setShowAlert(true)}
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    border: `1.5px solid ${badgeLevel === "overdue" ? "#fecaca" : "#fde68a"}`,
                    background:
                      badgeLevel === "overdue" ? "#fef2f2" : "#fffbeb",
                    cursor: "pointer",
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform .15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  🔔
                  <span
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      minWidth: 17,
                      height: 17,
                      borderRadius: 99,
                      background: badgeColor,
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #f8fafc",
                      animation:
                        badgeLevel === "overdue"
                          ? "badge-pulse 1.4s infinite"
                          : "none",
                    }}
                  >
                    {badgeCount}
                  </span>
                </button>
              )}

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
            <Outlet />
          </main>
        </div>
      </div>

      {/* Pop Alert — pakai LoanAlertPopup yang sudah ada */}
      {showAlert && urgentLoans.length > 0 && (
        <LoanAlertPopup
          urgentLoans={urgentLoans}
          onDismiss={() => setShowAlert(false)}
          onNavigate={(path) => navigate(path)}
        />
      )}
    </>
  );
};

export default UserLayout;
