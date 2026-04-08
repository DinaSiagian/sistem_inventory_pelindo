import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaMoneyBillWave,
  FaUsers,
  FaSignOutAlt,
  FaPlusCircle,
  FaChevronLeft,
  FaChevronRight,
  FaHandHolding,
} from "react-icons/fa";
import "./Layout.css";

import logoPelindo from "../pictures/pelindo2.png";
import batikImg from "../pictures/batik.png";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);

  // 1. TAMBAHKAN STATE INI UNTUK TRIGGER RESET
  const [resetKey, setResetKey] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard Utama", icon: <FaHome /> },
    { category: "Manajemen Aset" },
    { path: "/assets", label: "Inventory Aset", icon: <FaBox /> },
    {
      path: "/peminjaman",
      label: "BAST Aset",
      icon: <FaHandHolding />,
    },
    { category: "Keuangan & Proyek" },
    {
      path: "/budget",
      label: "Input Pekerjaan",
      icon: <FaMoneyBillWave />,
    },
    {
      path: "/budget/input",
      label: "Input Anggaran",
      icon: <FaPlusCircle />,
      submenu: [
        { path: "/budget/input/opex", label: "OPEX" },
        { path: "/budget/input/capex", label: "CAPEX" },
      ],
    },
    { category: "Administrasi" },
    { path: "/users", label: "User Management", icon: <FaUsers /> },
  ];

  useEffect(() => {
    const currentMenu = menuItems.find(
      (item) => item.path === location.pathname,
    );
    if (currentMenu) {
      setPageTitle(currentMenu.label);
    } else {
      // Check submenu items
      for (const item of menuItems) {
        if (item.submenu) {
          const subItem = item.submenu.find(
            (sub) => sub.path === location.pathname,
          );
          if (subItem) {
            setPageTitle(`${item.label} - ${subItem.label}`);
            break;
          }
        }
      }
    }
  }, [location]);

  useEffect(() => {
    const handleNavigateToBudget = (e) => {
      navigate("/budget");
    };

    window.addEventListener("navigate-to-budget", handleNavigateToBudget);
    return () => {
      window.removeEventListener("navigate-to-budget", handleNavigateToBudget);
    };
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) navigate("/");
  };

  // 2. FUNGSI UNTUK MERESET HALAMAN JIKA MENU YANG SAMA DIKLIK
  const handleMenuClick = (path) => {
    if (location.pathname === path) {
      // Jika URL saat ini sama dengan URL menu yang diklik, tambah nilai resetKey
      setResetKey((prevKey) => prevKey + 1);
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
            ) : item.submenu ? (
              <div key={index}>
                <button
                  className={`menu-item ${expandedMenu === index ? "active" : ""} ${location.pathname.includes(item.path) ? "active" : ""}`}
                  onClick={() => setExpandedMenu(expandedMenu === index ? null : index)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: expandedMenu === index ? "rgba(0, 181, 226, 0.15)" : "none",
                    border: expandedMenu === index ? "1px solid rgba(0, 181, 226, 0.3)" : "none",
                    cursor: "pointer",
                  }}
                >
                  <div className="menu-icon">{item.icon}</div>
                  {!collapsed && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
                      <span className="menu-text">{item.label}</span>
                      <FaChevronRight
                        style={{
                          transition: "transform 0.3s",
                          transform: expandedMenu === index ? "rotate(90deg)" : "rotate(0deg)",
                          fontSize: "0.75rem",
                        }}
                      />
                    </div>
                  )}
                </button>
                {expandedMenu === index && !collapsed && (
                  <div style={{
                    paddingLeft: "12px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    margin: "4px 0",
                  }}>
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={`${index}-${subIndex}`}
                        to={subItem.path}
                        className={`menu-item submenu-item ${location.pathname === subItem.path ? "active" : ""}`}
                        onClick={() => handleMenuClick(subItem.path)}
                      >
                        <span className="menu-text">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
                // 3. TAMBAHKAN ONCLICK DI SINI
                onClick={() => handleMenuClick(item.path)}
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
                <span className="user-name">Joy Silalahi</span>
                <span className="user-role">Super Admin</span>
              </div>
              <div className="user-avatar">JS</div>
            </div>
          </div>
        </header>

        <main className="page-content">
          {/* 4. TAMBAHKAN KEY PADA OUTLET */}
          <Outlet key={`${location.pathname}-${resetKey}`} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
