import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaHistory,
  FaBell,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";

// === IMPORT ASET GAMBAR ===
// import logoPelindo from "../pictures/pelindo2.png";
// import batikImg from "../pictures/batik.png";

// Placeholder jika gambar belum tersedia
const logoPelindo = null;
const batikImg = null;

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Menu khusus User — lebih terbatas dari Super Admin
  const menuItems = [
    { path: "/user/dashboard", label: "Beranda", icon: <FaHome /> },
    { category: "Aset" },
    { path: "/user/assets", label: "Daftar Aset", icon: <FaBox /> },
    { path: "/user/borrow", label: "Pinjam Aset", icon: <FaClipboardList /> },
    { category: "Riwayat" },
    { path: "/user/history", label: "Riwayat Peminjaman", icon: <FaHistory /> },
    { category: "Akun" },
    { path: "/user/profile", label: "Profil Saya", icon: <FaUser /> },
  ];

  useEffect(() => {
    const currentMenu = menuItems.find((item) => item.path === location.pathname);
    if (currentMenu) setPageTitle(currentMenu.label);
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      navigate("/");
    }
  };

  const mockNotifs = [
    { id: 1, text: "Peminjaman Laptop #LP-0023 disetujui", time: "5 menit lalu", unread: true },
    { id: 2, text: "Aset Kamera #KM-0011 sudah dikembalikan", time: "1 jam lalu", unread: true },
    { id: 3, text: "Jadwal maintenance bulan ini telah diperbarui", time: "Kemarin", unread: false },
  ];
  const unreadCount = mockNotifs.filter((n) => n.unread).length;

  return (
    <div className="ul-wrapper">
      {/* ======= SIDEBAR ======= */}
      <aside
        className={`ul-sidebar ${collapsed ? "ul-sidebar--collapsed" : ""}`}
        style={batikImg ? { "--batik-url": `url(${batikImg})` } : {}}
      >
        {/* Header / Logo */}
        <div className="ul-sidebar-header">
          {logoPelindo ? (
            <img src={logoPelindo} alt="Pelindo" className="ul-sidebar-logo" />
          ) : (
            <div className="ul-sidebar-logo-placeholder">
              {collapsed ? "P" : "PELINDO"}
            </div>
          )}
        </div>

        {/* User Info Card (collapsed: avatar only) */}
        {!collapsed && (
          <div className="ul-user-card">
            <div className="ul-user-avatar">JS</div>
            <div className="ul-user-info">
              <span className="ul-user-name">Joy Silalahi</span>
              <span className="ul-user-role-badge">Pegawai</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="ul-user-card ul-user-card--mini">
            <div className="ul-user-avatar">JS</div>
          </div>
        )}

        {/* Menu */}
        <nav className="ul-menu">
          {menuItems.map((item, index) =>
            item.category ? (
              !collapsed && (
                <div key={index} className="ul-menu-category">
                  {item.category}
                </div>
              )
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`ul-menu-item ${location.pathname === item.path ? "ul-menu-item--active" : ""}`}
              >
                <span className="ul-menu-icon">{item.icon}</span>
                {!collapsed && <span className="ul-menu-label">{item.label}</span>}
              </Link>
            )
          )}

          <div className="ul-menu-logout" onClick={handleLogout}>
            <span className="ul-menu-icon"><FaSignOutAlt /></span>
            {!collapsed && <span className="ul-menu-label">Keluar</span>}
          </div>
        </nav>
      </aside>

      {/* ======= MAIN CONTENT ======= */}
      <div className="ul-main">
        {/* Topbar */}
        <header className="ul-topbar">
          <div className="ul-topbar-left">
            <button className="ul-toggle-btn" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <FaChevronRight size={13} /> : <FaChevronLeft size={13} />}
            </button>
            <div className="ul-breadcrumb">
              <span>Pelindo</span>
              <span className="ul-breadcrumb-sep">/</span>
              <span className="ul-breadcrumb-active">{pageTitle}</span>
            </div>
          </div>

          <div className="ul-topbar-right">
            {/* Notifikasi */}
            <div className="ul-notif-wrap">
              <button
                className={`ul-notif-btn ${notifOpen ? "ul-notif-btn--open" : ""}`}
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <FaBell size={15} />
                {unreadCount > 0 && (
                  <span className="ul-notif-badge">{unreadCount}</span>
                )}
              </button>
              {notifOpen && (
                <div className="ul-notif-dropdown">
                  <div className="ul-notif-header">
                    <span>Notifikasi</span>
                    <span className="ul-notif-count">{unreadCount} baru</span>
                  </div>
                  {mockNotifs.map((n) => (
                    <div key={n.id} className={`ul-notif-item ${n.unread ? "ul-notif-item--unread" : ""}`}>
                      <div className="ul-notif-dot" style={{ background: n.unread ? "#00b5e2" : "#cbd5e1" }} />
                      <div className="ul-notif-body">
                        <p>{n.text}</p>
                        <span>{n.time}</span>
                      </div>
                    </div>
                  ))}
                  <button className="ul-notif-seeall">Lihat Semua</button>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="ul-profile">
              <div className="ul-profile-info">
                <span className="ul-profile-name">Joy Silalahi</span>
                <span className="ul-profile-role">Pegawai</span>
              </div>
              <div className="ul-profile-avatar">JS</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="ul-page-content">
          <Outlet />
        </main>
      </div>

      {/* ======= STYLES ======= */}
      <style>{`
        /* === RESET & VARS === */
        *, *::before, *::after { box-sizing: border-box; }
        .ul-wrapper {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          background: #f1f5f9;
        }

        /* === SIDEBAR === */
        .ul-sidebar {
          width: 270px;
          flex-shrink: 0;
          background: linear-gradient(180deg, #003675 0%, #001f42 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 50;
          box-shadow: 5px 0 30px rgba(0,0,0,0.2);
          overflow: hidden;
          transition: width 0.3s ease;
        }
        .ul-sidebar--collapsed { width: 80px; }

        /* Batik texture overlay */
        .ul-sidebar::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--batik-url, none);
          background-size: 300px;
          background-repeat: repeat;
          filter: brightness(0) invert(1);
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
        }

        /* Header */
        .ul-sidebar-header {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          position: relative;
          z-index: 2;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .ul-sidebar-logo { height: 34px; width: auto; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
        .ul-sidebar-logo-placeholder {
          color: white;
          font-weight: 900;
          font-size: 1.1rem;
          letter-spacing: 3px;
          opacity: 0.9;
        }

        /* User Card */
        .ul-user-card {
          margin: 12px 14px;
          padding: 14px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
          backdrop-filter: blur(6px);
        }
        .ul-user-card--mini {
          justify-content: center;
          padding: 10px;
        }
        .ul-user-avatar {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #00b5e2, #004494);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 800; font-size: 0.85rem;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.2);
        }
        .ul-user-info { display: flex; flex-direction: column; gap: 3px; overflow: hidden; }
        .ul-user-name {
          color: white; font-size: 0.88rem; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ul-user-role-badge {
          background: rgba(0,181,226,0.25);
          color: #7dd3fc;
          font-size: 0.65rem; font-weight: 700;
          padding: 2px 8px; border-radius: 20px;
          text-transform: uppercase; letter-spacing: 0.5px;
          width: fit-content;
          border: 1px solid rgba(0,181,226,0.3);
        }

        /* Menu */
        .ul-menu {
          flex: 1;
          padding: 8px 12px 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
          background: rgba(0,0,0,0.2);
          margin: 0 14px 14px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .ul-menu::-webkit-scrollbar { display: none; }

        .ul-menu-category {
          font-size: 0.62rem; text-transform: uppercase;
          letter-spacing: 1.5px; color: rgba(255,255,255,0.4);
          margin: 14px 0 6px 10px; font-weight: 700;
        }
        .ul-menu-item {
          display: flex; align-items: center;
          padding: 10px 14px; margin-bottom: 3px;
          border-radius: 11px; color: rgba(255,255,255,0.8);
          text-decoration: none; font-size: 0.875rem; font-weight: 600;
          transition: all 0.2s; gap: 12px;
        }
        .ul-sidebar--collapsed .ul-menu-item {
          justify-content: center;
          padding: 12px 0;
          width: 46px;
          margin: 0 auto 4px;
        }
        .ul-menu-item:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          transform: translateX(2px);
        }
        .ul-sidebar--collapsed .ul-menu-item:hover { transform: none; }
        .ul-menu-item--active {
          background: #00b5e2;
          color: white;
          box-shadow: 0 4px 14px rgba(0,181,226,0.4);
        }
        .ul-menu-icon { font-size: 1rem; flex-shrink: 0; display: flex; align-items: center; }
        .ul-menu-label { white-space: nowrap; }

        .ul-menu-logout {
          margin-top: auto;
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px;
          border-radius: 11px;
          color: #fca5a5;
          cursor: pointer; font-size: 0.875rem; font-weight: 700;
          background: rgba(220,38,38,0.12);
          border: 1px solid rgba(220,38,38,0.2);
          transition: all 0.25s;
          justify-content: center;
        }
        .ul-sidebar--collapsed .ul-menu-logout { padding: 12px 0; width: 46px; margin: auto auto 0; }
        .ul-menu-logout:hover {
          background: rgba(220,38,38,0.5);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 14px rgba(220,38,38,0.35);
        }

        /* === MAIN === */
        .ul-main {
          flex: 1; display: flex; flex-direction: column;
          height: 100vh; overflow: hidden;
        }

        /* Topbar */
        .ul-topbar {
          height: 70px; flex-shrink: 0;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          border-bottom: 1px solid #e8ecf0;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
        }
        .ul-topbar-left { display: flex; align-items: center; gap: 14px; }
        .ul-toggle-btn {
          background: white; border: 1px solid #e2e8f0;
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #64748b; transition: all 0.2s;
        }
        .ul-toggle-btn:hover { border-color: #00b5e2; color: #00b5e2; }
        .ul-breadcrumb {
          display: flex; align-items: center; gap: 7px;
          font-size: 0.85rem; color: #94a3b8;
          background: white; padding: 6px 14px;
          border-radius: 50px; border: 1px solid #e2e8f0;
        }
        .ul-breadcrumb-sep { opacity: 0.4; }
        .ul-breadcrumb-active { color: #004494; font-weight: 700; }

        .ul-topbar-right { display: flex; align-items: center; gap: 12px; }

        /* Notif */
        .ul-notif-wrap { position: relative; }
        .ul-notif-btn {
          width: 38px; height: 38px; border-radius: 10px;
          background: white; border: 1px solid #e2e8f0;
          display: flex; align-items: center; justify-content: center;
          color: #64748b; cursor: pointer; position: relative;
          transition: all 0.2s;
        }
        .ul-notif-btn--open, .ul-notif-btn:hover {
          border-color: #00b5e2; color: #00b5e2;
          background: #f0f9ff;
        }
        .ul-notif-badge {
          position: absolute; top: -5px; right: -5px;
          background: #ef4444; color: white;
          font-size: 0.6rem; font-weight: 800;
          width: 16px; height: 16px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid white;
        }
        .ul-notif-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          width: 300px; background: white;
          border: 1px solid #e2e8f0; border-radius: 16px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12); z-index: 1000;
          overflow: hidden;
        }
        .ul-notif-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 16px; border-bottom: 1px solid #f1f5f9;
          font-size: 0.88rem; font-weight: 700; color: #1e293b;
        }
        .ul-notif-count {
          background: #f0f9ff; color: #0284c7;
          font-size: 0.72rem; font-weight: 700;
          padding: 2px 8px; border-radius: 20px;
        }
        .ul-notif-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 16px;
          border-bottom: 1px solid #f8fafc;
          transition: background 0.15s;
        }
        .ul-notif-item:hover { background: #f8fafc; }
        .ul-notif-item--unread { background: #f0f9ff; }
        .ul-notif-dot {
          width: 8px; height: 8px; border-radius: 50%;
          flex-shrink: 0; margin-top: 5px;
        }
        .ul-notif-body p {
          margin: 0 0 3px; font-size: 0.8rem; font-weight: 600;
          color: #334155; line-height: 1.4;
        }
        .ul-notif-body span { font-size: 0.72rem; color: #94a3b8; }
        .ul-notif-seeall {
          width: 100%; padding: 12px;
          background: none; border: none;
          color: #004494; font-size: 0.82rem; font-weight: 700;
          cursor: pointer; transition: background 0.15s;
        }
        .ul-notif-seeall:hover { background: #f8fafc; }

        /* Profile */
        .ul-profile {
          display: flex; align-items: center; gap: 12px;
          padding: 6px 8px 6px 14px;
          background: white; border-radius: 50px;
          cursor: pointer; border: 1px solid #e2e8f0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.2s;
        }
        .ul-profile:hover { border-color: #00b5e2; box-shadow: 0 4px 16px rgba(0,181,226,0.12); }
        .ul-profile-info { display: flex; flex-direction: column; gap: 1px; text-align: right; }
        .ul-profile-name { font-size: 0.85rem; font-weight: 700; color: #1e293b; }
        .ul-profile-role {
          font-size: 0.7rem; color: #94a3b8; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.3px;
        }
        .ul-profile-avatar {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #00b5e2, #004494);
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; color: white;
          font-weight: 800; font-size: 0.82rem;
          border: 2px solid #e0f2fe;
        }

        /* Page Content */
        .ul-page-content {
          flex: 1; overflow-y: auto; padding: 28px;
          scroll-behavior: smooth;
        }
        .ul-page-content::-webkit-scrollbar { width: 6px; }
        .ul-page-content::-webkit-scrollbar-track { background: transparent; }
        .ul-page-content::-webkit-scrollbar-thumb {
          background: rgba(0,68,148,0.12); border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default UserLayout;