import React, { useState } from "react";

// ─── INLINE SVG ICONS ─────────────────────────────────────────
// Semua icon didefinisikan sebagai string path untuk dirender langsung
const SVG = {
  search: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  plus: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  edit: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  trash: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
  eye: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeSlash: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  user: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  check: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  times: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  key: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  filter: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  userCheck: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  ),
  userSlash: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="23" y1="11" x2="17" y2="17" />
      <line x1="17" y1="11" x2="23" y2="17" />
    </svg>
  ),
  building: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="1" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  idCard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="8" y1="10" x2="8" y2="10" />
      <line x1="12" y1="10" x2="20" y2="10" />
      <line x1="12" y1="14" x2="20" y2="14" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  phone: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
    </svg>
  ),
  mapPin: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  lock: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  envelope: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

// Helper to render icon with proper sizing
function Ico({ n, size = 14, style = {} }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
    >
      {React.cloneElement(SVG[n], {
        width: size,
        height: size,
        style: { display: "block" },
      })}
    </span>
  );
}

// ─── MASTER DATA ─────────────────────────────────────────────
const entityList = [
  { entity_code: "PMT", name: "PT Pelindo Multi Terminal" },
  { entity_code: "PTP", name: "PT Pelabuhan Indonesia" },
  { entity_code: "IKT", name: "Indonesia Kendaraan Terminal" },
];

const branchList = [
  { branch_code: "PMT-JKT", entity_code: "PMT", name: "Jakarta" },
  { branch_code: "PMT-SBY", entity_code: "PMT", name: "Surabaya" },
  { branch_code: "PMT-MDN", entity_code: "PMT", name: "Medan" },
  { branch_code: "PTP-JKT", entity_code: "PTP", name: "Jakarta" },
  { branch_code: "IKT-JKT", entity_code: "IKT", name: "Jakarta" },
];

const roleConfig = {
  superadmin: {
    label: "Super Admin",
    color: "#7c3aed",
    bg: "#ede9fe",
    iconName: "shield",
  },
  user: { label: "User", color: "#0891b2", bg: "#ecfeff", iconName: "user" },
};

// ─── MOCK DATA ────────────────────────────────────────────────
const mockUsers = [
  {
    id: 1,
    name: "Joy Valeda Silalahi",
    nip: "19900101001",
    username: "joy.silalahi",
    email: "joy.silalahi@pelindo.co.id",
    phone: "081234567890",
    role_code: "superadmin",
    entity_code: "PMT",
    branch_code: "PMT-JKT",
    is_active: true,
    created_at: "2025-01-10",
    last_login: "2026-03-04 08:32",
  },
  {
    id: 2,
    name: "Dina Marlina Siagian",
    nip: "19920202002",
    username: "dina.siagian",
    email: "dina.siagian@pelindo.co.id",
    phone: "081298765432",
    role_code: "superadmin",
    entity_code: "PMT",
    branch_code: "PMT-JKT",
    is_active: true,
    created_at: "2025-01-10",
    last_login: "2026-03-04 09:15",
  },
  {
    id: 3,
    name: "Andi Pratama",
    nip: "19950303003",
    username: "andi.pratama",
    email: "andi.pratama@pelindo.co.id",
    phone: "082112345678",
    role_code: "user",
    entity_code: "PMT",
    branch_code: "PMT-SBY",
    is_active: true,
    created_at: "2025-03-15",
    last_login: "2026-03-03 14:22",
  },
  {
    id: 4,
    name: "Sari Dewi",
    nip: "19970404004",
    username: "sari.dewi",
    email: "sari.dewi@pelindo.co.id",
    phone: "085787654321",
    role_code: "user",
    entity_code: "PTP",
    branch_code: "PTP-JKT",
    is_active: true,
    created_at: "2025-04-01",
    last_login: "2026-03-02 10:05",
  },
  {
    id: 5,
    name: "Budi Santoso",
    nip: "19880505005",
    username: "budi.santoso",
    email: "budi.santoso@pelindo.co.id",
    phone: "087890123456",
    role_code: "user",
    entity_code: "PMT",
    branch_code: "PMT-MDN",
    is_active: false,
    created_at: "2025-05-20",
    last_login: "2026-01-15 16:40",
  },
  {
    id: 6,
    name: "Rini Handayani",
    nip: "19991212006",
    username: "rini.handayani",
    email: "rini.handayani@pelindo.co.id",
    phone: "089912345678",
    role_code: "user",
    entity_code: "IKT",
    branch_code: "IKT-JKT",
    is_active: true,
    created_at: "2025-06-10",
    last_login: "2026-03-03 08:55",
  },
];

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
const getEntityName = (code) =>
  entityList.find((e) => e.entity_code === code)?.name || code;
const getBranchName = (code) =>
  branchList.find((b) => b.branch_code === code)?.name || code;

// ─── STYLES ───────────────────────────────────────────────────
const css = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");
* { box-sizing: border-box; }
:root {
  --blue:#2563eb; --blue-dk:#1d4ed8; --blue-lt:#eff6ff;
  --green:#16a34a; --green-dk:#15803d; --green-lt:#dcfce7;
  --red:#dc2626; --red-lt:#fee2e2;
  --purple:#7c3aed; --purple-lt:#ede9fe;
  --warn:#d97706; --warn-lt:#fef3c7;
  --slate:#0f172a; --slate-6:#64748b; --slate-4:#94a3b8;
  --border:#e2e8f0; --bg:#f8fafc;
  --radius:12px; --shadow:0 1px 4px rgba(0,0,0,0.06); --shadow-md:0 4px 16px rgba(0,0,0,0.1);
}
.um-root { padding:2rem; max-width:1400px; margin:0 auto; font-family:"Plus Jakarta Sans","Inter",sans-serif; background:var(--bg); min-height:100vh; }
.um-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.75rem; flex-wrap:wrap; gap:1rem; }
.um-title { font-size:1.7rem; font-weight:800; color:var(--slate); margin:0 0 4px; letter-spacing:-0.02em; }
.um-subtitle { font-size:0.875rem; color:var(--slate-6); margin:0; }

/* STATS */
.um-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:1.5rem; }
@media(max-width:900px){.um-stats{grid-template-columns:repeat(2,1fr);}}
.um-stat-card { background:#fff; border-radius:var(--radius); border:1px solid var(--border); padding:1.1rem 1.25rem; display:flex; align-items:center; gap:1rem; box-shadow:var(--shadow); transition:box-shadow .2s,transform .2s; }
.um-stat-card:hover { box-shadow:var(--shadow-md); transform:translateY(-1px); }
.um-stat-icon { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.um-stat-icon--blue   { background:#dbeafe; color:#2563eb; }
.um-stat-icon--purple { background:#ede9fe; color:#7c3aed; }
.um-stat-icon--green  { background:#dcfce7; color:#16a34a; }
.um-stat-icon--gray   { background:#f1f5f9; color:#64748b; }
.um-stat-num   { font-size:1.6rem; font-weight:800; color:var(--slate); line-height:1; }
.um-stat-label { font-size:0.77rem; color:var(--slate-6); margin-top:3px; }

/* TOOLBAR */
.um-toolbar { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; flex-wrap:wrap; }
.um-search-wrap { flex:1; min-width:260px; display:flex; align-items:center; gap:.55rem; background:#fff; border:1.5px solid var(--border); border-radius:10px; padding:.55rem .9rem; transition:border-color .15s; }
.um-search-wrap:focus-within { border-color:var(--blue); box-shadow:0 0 0 3px rgba(37,99,235,.08); }
.um-search-wrap input { border:none; outline:none; font-size:.875rem; flex:1; color:var(--slate); background:#fff; font-family:inherit; }
.um-filter-wrap { display:flex; align-items:center; gap:.45rem; background:#fff; border:1.5px solid var(--border); border-radius:10px; padding:.5rem .85rem; }
.um-filter-wrap select { border:none; outline:none; font-size:.845rem; color:#334155; background:#fff; cursor:pointer; font-family:inherit; }
.um-count { font-size:.82rem; font-weight:600; color:var(--slate-6); background:#fff; border:1px solid var(--border); border-radius:8px; padding:.4rem .8rem; white-space:nowrap; }

/* TABLE */
.um-table-wrap { background:#fff; border-radius:14px; border:1px solid var(--border); overflow-x:auto; box-shadow:var(--shadow); }
.um-table { width:100%; border-collapse:collapse; font-size:.835rem; }
.um-table thead tr { background:linear-gradient(135deg,#1e3a8a,var(--blue)); }
.um-table thead th { color:#fff; padding:.8rem 1rem; text-align:left; font-weight:600; font-size:.78rem; white-space:nowrap; }
.um-table tbody tr { border-bottom:1px solid #f1f5f9; transition:background .12s; }
.um-table tbody tr:last-child { border-bottom:none; }
.um-table tbody tr:hover { background:#fafbff; }
.um-table tbody td { padding:.8rem 1rem; vertical-align:middle; }
.um-empty { text-align:center; color:var(--slate-4); padding:3rem!important; }

/* CELLS */
.um-user-cell { display:flex; align-items:center; gap:.65rem; }
.um-avatar { width:34px; height:34px; border-radius:50%; font-weight:700; font-size:.8rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.um-avatar--blue   { background:#dbeafe; color:#1d4ed8; }
.um-avatar--purple { background:#ede9fe; color:#7c3aed; }
.um-avatar--lg { width:48px; height:48px; font-size:1rem; border-radius:12px; }
.um-user-name  { font-size:.84rem; font-weight:600; color:#1e293b; }
.um-user-email { font-size:.74rem; color:var(--slate-6); }
.um-username { font-family:"Courier New",monospace; font-size:.77rem; font-weight:700; color:var(--blue); background:var(--blue-lt); padding:2px 7px; border-radius:5px; white-space:nowrap; }
.um-entity-cell { display:flex; flex-direction:column; gap:2px; }
.um-entity-code { font-size:.73rem; font-weight:700; color:#7c3aed; background:#ede9fe; padding:1px 6px; border-radius:4px; width:fit-content; }
.um-entity-name { font-size:.78rem; color:var(--slate-6); }
.um-role-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:99px; font-size:.76rem; font-weight:600; white-space:nowrap; }
.um-status-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:99px; font-size:.76rem; font-weight:600; }
.um-status-badge--aktif   { background:var(--green-lt); color:var(--green); }
.um-status-badge--nonaktif{ background:#f1f5f9; color:var(--slate-6); }
.um-status-toggle-btn { display:inline-flex; align-items:center; gap:5px; padding:4px 12px; border-radius:99px; font-size:.76rem; font-weight:600; border:none; cursor:pointer; font-family:inherit; transition:all .15s; }
.um-status-toggle-btn--aktif   { background:var(--green-lt); color:var(--green); }
.um-status-toggle-btn--nonaktif{ background:#f1f5f9; color:var(--slate-6); }
.um-status-toggle-btn:hover { filter:brightness(.9); }
.um-last-login { font-size:.79rem; color:var(--slate-6); white-space:nowrap; }

/* ACTION BUTTONS — kunci utama fix icon */
.um-actions { display:flex; gap:.3rem; }
.um-action-btn {
  width:30px; height:30px; border-radius:7px; border:none;
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  padding:0; transition:all .15s; flex-shrink:0;
}
.um-action-btn svg { width:14px; height:14px; display:block; flex-shrink:0; }
.um-action-btn--view { background:#dbeafe; color:#1d4ed8; }
.um-action-btn--edit { background:#dcfce7; color:#15803d; }
.um-action-btn--key  { background:#fef3c7; color:#d97706; }
.um-action-btn--del  { background:#fee2e2; color:#b91c1c; }
.um-action-btn:hover { filter:brightness(.88); transform:scale(1.1); }

/* BUTTONS */
.um-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.52rem 1.15rem; border-radius:10px; font-size:.855rem; font-weight:600; border:none; cursor:pointer; transition:all .18s; font-family:inherit; }
.um-btn-lg { padding:.65rem 1.35rem; font-size:.9rem; }
.um-btn-primary   { background:linear-gradient(135deg,#1d4ed8,#2563eb); color:#fff; box-shadow:0 2px 8px rgba(37,99,235,.25); }
.um-btn-primary:hover { filter:brightness(1.1); transform:translateY(-1px); }
.um-btn-secondary { background:var(--bg); color:#475569; border:1.5px solid var(--border); }
.um-btn-secondary:hover { background:#e9eef5; }
.um-btn-danger    { background:linear-gradient(135deg,#b91c1c,#dc2626); color:#fff; }
.um-btn-warning   { background:linear-gradient(135deg,#b45309,#d97706); color:#fff; }

/* MODAL */
.um-overlay { position:fixed; inset:0; background:rgba(15,23,42,.5); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:1000; padding:1rem; }
.um-modal { background:#fff; border-radius:18px; width:100%; max-width:520px; max-height:92vh; display:flex; flex-direction:column; box-shadow:0 24px 64px rgba(0,0,0,.2); overflow:hidden; }
.um-modal--form { max-width:600px; }
.um-modal--sm   { max-width:400px; }
.um-modal-header { padding:1.15rem 1.5rem; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); border-top:3px solid var(--blue); background:#fff; }
.um-modal-header h2 { font-size:1rem; font-weight:700; color:var(--slate); display:flex; align-items:center; gap:.55rem; margin:0; }
.um-modal-close { background:none; border:none; cursor:pointer; color:var(--slate-4); padding:.15rem; border-radius:6px; display:flex; align-items:center; }
.um-modal-close:hover { background:var(--bg); }
.um-modal-body   { padding:1.3rem 1.5rem; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:1rem; background:#fff; }
.um-modal-footer { padding:1rem 1.5rem; border-top:1px solid var(--border); display:flex; gap:.6rem; justify-content:flex-end; background:#fff; }

/* FORM */
.um-form-row { display:grid; grid-template-columns:1fr 1fr; gap:.85rem; }
@media(max-width:520px){.um-form-row{grid-template-columns:1fr;}}
.um-form-group { display:flex; flex-direction:column; gap:.35rem; }
.um-form-group label { font-size:.81rem; font-weight:600; color:#475569; display:flex; align-items:center; gap:4px; }
.um-form-group input,.um-form-group select,.um-form-group textarea {
  padding:.52rem .8rem; border-radius:9px; border:1.5px solid var(--border);
  font-size:.845rem; outline:none; transition:border .15s,box-shadow .15s;
  font-family:inherit; background:#fff!important; color:var(--slate)!important;
}
.um-form-group input:focus,.um-form-group select:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(37,99,235,.09); }
.um-input-error { border-color:var(--red)!important; }
.um-error { font-size:.74rem; color:var(--red); }
.um-hint  { font-size:.74rem; color:var(--slate-4); }
.um-req   { color:var(--red); }
.um-pass-wrap { position:relative; }
.um-pass-wrap input { width:100%; padding-right:2.5rem; }
.um-pass-toggle { position:absolute; right:.6rem; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:var(--slate-4); display:flex; align-items:center; padding:0; }
.um-pass-toggle:hover { color:var(--slate-6); }
.um-pass-toggle svg { width:14px; height:14px; display:block; }

/* ROLE OPTIONS */
.um-role-options { display:flex; gap:.5rem; flex-wrap:wrap; }
.um-role-opt { display:flex; align-items:center; gap:.45rem; padding:.42rem .9rem; border-radius:99px; border:1.5px solid var(--border); cursor:pointer; font-size:.81rem; font-weight:600; color:var(--slate-6); background:#fff; transition:all .14s; }
.um-role-opt input[type="radio"] { display:none; }
.um-role-opt.active { font-weight:700; }
.um-role-opt svg { width:13px; height:13px; display:block; }

/* STATUS TOGGLE IN FORM */
.um-status-toggle { display:flex; gap:.5rem; }
.um-status-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.42rem .9rem; border-radius:99px; border:1.5px solid var(--border); cursor:pointer; font-size:.81rem; font-weight:600; background:#fff; color:var(--slate-6); font-family:inherit; transition:all .14s; }
.um-status-btn.active-green { background:var(--green-lt); color:var(--green); border-color:var(--green); }
.um-status-btn.active-red   { background:var(--red-lt);   color:var(--red);   border-color:var(--red);   }
.um-status-btn svg { width:13px; height:13px; display:block; }

/* DETAIL */
.um-detail-profile { display:flex; align-items:center; gap:1rem; padding:1rem; background:var(--bg); border:1px solid var(--border); border-radius:12px; }
.um-detail-name    { font-size:1rem; font-weight:700; color:var(--slate); }
.um-detail-grid    { display:grid; grid-template-columns:1fr 1fr; gap:.8rem 1.5rem; }
.um-detail-item    { display:flex; flex-direction:column; gap:3px; }
.um-detail-label   { font-size:.73rem; font-weight:700; color:var(--slate-4); text-transform:uppercase; letter-spacing:.04em; }
.um-detail-val     { font-size:.84rem; color:var(--slate); }

/* DELETE / RESET */
.um-delete-icon { width:52px; height:52px; border-radius:50%; background:var(--red-lt); color:var(--red); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; }
.um-delete-icon svg { width:22px; height:22px; }
.um-delete-title { font-size:1.05rem; font-weight:700; color:var(--slate); margin:0 0 .5rem; }
.um-delete-desc  { font-size:.86rem; color:var(--slate-6); margin:0; }
.um-reset-icon   { width:52px; height:52px; border-radius:50%; background:var(--warn-lt); color:var(--warn); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; }
.um-reset-icon svg { width:22px; height:22px; }
.um-reset-success{ width:52px; height:52px; border-radius:50%; background:var(--green-lt); color:var(--green); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; }
.um-reset-success svg { width:22px; height:22px; }
`;

// ─── MODAL: Form Tambah / Edit User ──────────────────────────
function UserFormModal({ user, onClose, onSave }) {
  const isEdit = !!user;
  const [form, setForm] = useState(
    user
      ? {
          name: user.name,
          nip: user.nip || "",
          username: user.username,
          email: user.email,
          phone: user.phone || "",
          role_code: user.role_code,
          entity_code: user.entity_code,
          branch_code: user.branch_code || "",
          is_active: user.is_active,
          password: "",
          confirm_password: "",
        }
      : {
          name: "",
          nip: "",
          username: "",
          email: "",
          phone: "",
          role_code: "user",
          entity_code: "",
          branch_code: "",
          is_active: true,
          password: "",
          confirm_password: "",
        },
  );
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const filteredBranches = branchList.filter(
    (b) => b.entity_code === form.entity_code,
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Wajib diisi";
    if (!form.nip.trim()) e.nip = "Wajib diisi";
    if (!form.username.trim()) e.username = "Wajib diisi";
    if (!form.email.trim()) e.email = "Wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Format email tidak valid";
    if (!form.phone.trim()) e.phone = "Wajib diisi";
    if (!form.entity_code) e.entity_code = "Wajib dipilih";
    if (!form.branch_code) e.branch_code = "Wajib dipilih";
    if (!isEdit && !form.password) e.password = "Wajib diisi";
    if (form.password && form.password.length < 8)
      e.password = "Minimal 8 karakter";
    if (form.password && form.password !== form.confirm_password)
      e.confirm_password = "Password tidak cocok";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...user,
      ...form,
      id: user?.id || Date.now(),
      created_at: user?.created_at || new Date().toISOString().split("T")[0],
      last_login: user?.last_login || "—",
    });
    onClose();
  };

  return (
    <div className="um-overlay" onClick={onClose}>
      <div
        className="um-modal um-modal--form"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="um-modal-header">
          <h2>
            <Ico n={isEdit ? "edit" : "plus"} size={15} />{" "}
            {isEdit ? "Edit User" : "Tambah User Baru"}
          </h2>
          <button className="um-modal-close" onClick={onClose}>
            <Ico n="times" size={14} />
          </button>
        </div>
        <div className="um-modal-body">
          <div className="um-form-group">
            <label>
              <Ico n="user" size={12} /> Nama Lengkap{" "}
              <span className="um-req">*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Joy Valeda Silalahi"
              className={errors.name ? "um-input-error" : ""}
            />
            {errors.name && <span className="um-error">{errors.name}</span>}
          </div>
          <div className="um-form-row">
            <div className="um-form-group">
              <label>
                <Ico n="idCard" size={12} /> NIP{" "}
                <span className="um-req">*</span>
              </label>
              <input
                value={form.nip}
                onChange={(e) => setForm({ ...form, nip: e.target.value })}
                placeholder="NIP"
                className={errors.nip ? "um-input-error" : ""}
              />
              {errors.nip && <span className="um-error">{errors.nip}</span>}
            </div>
            <div className="um-form-group">
              <label>
                <Ico n="user" size={12} /> Username{" "}
                <span className="um-req">*</span>
              </label>
              <input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="joy.silalahi"
                className={errors.username ? "um-input-error" : ""}
              />
              {errors.username && (
                <span className="um-error">{errors.username}</span>
              )}
            </div>
          </div>
          <div className="um-form-group">
            <label>
              <Ico n="phone" size={12} /> No. Telepon{" "}
              <span className="um-req">*</span>
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="08xxxxxxxxxx"
              className={errors.phone ? "um-input-error" : ""}
            />
            {errors.phone && <span className="um-error">{errors.phone}</span>}
          </div>
          <div className="um-form-group">
            <label>
              <Ico n="shield" size={12} /> Role / Peran{" "}
              <span className="um-req">*</span>
            </label>
            <div className="um-role-options">
              {Object.entries(roleConfig).map(([val, cfg]) => (
                <label
                  key={val}
                  className={`um-role-opt ${form.role_code === val ? "active" : ""}`}
                  style={
                    form.role_code === val
                      ? {
                          borderColor: cfg.color,
                          background: cfg.bg,
                          color: cfg.color,
                        }
                      : {}
                  }
                >
                  <input
                    type="radio"
                    name="role"
                    value={val}
                    checked={form.role_code === val}
                    onChange={() => setForm({ ...form, role_code: val })}
                  />
                  <Ico n={cfg.iconName} size={13} /> {cfg.label}
                </label>
              ))}
            </div>
          </div>
          <div className="um-form-group">
            <label>
              <Ico n="building" size={12} /> Entitas{" "}
              <span className="um-req">*</span>
            </label>
            <select
              value={form.entity_code}
              onChange={(e) =>
                setForm({
                  ...form,
                  entity_code: e.target.value,
                  branch_code: "",
                })
              }
              className={errors.entity_code ? "um-input-error" : ""}
            >
              <option value="">-- Pilih Entitas --</option>
              {entityList.map((e) => (
                <option key={e.entity_code} value={e.entity_code}>
                  {e.entity_code} — {e.name}
                </option>
              ))}
            </select>
            {errors.entity_code && (
              <span className="um-error">{errors.entity_code}</span>
            )}
          </div>
          <div className="um-form-group">
            <label>
              <Ico n="mapPin" size={12} /> Cabang / Branch{" "}
              <span className="um-req">*</span>
            </label>
            <select
              value={form.branch_code}
              onChange={(e) =>
                setForm({ ...form, branch_code: e.target.value })
              }
              className={errors.branch_code ? "um-input-error" : ""}
              disabled={!form.entity_code}
            >
              <option value="">-- Pilih Cabang --</option>
              {filteredBranches.map((b) => (
                <option key={b.branch_code} value={b.branch_code}>
                  {b.name}
                </option>
              ))}
            </select>
            {!form.entity_code && (
              <span className="um-hint">Pilih entitas terlebih dahulu</span>
            )}
            {errors.branch_code && (
              <span className="um-error">{errors.branch_code}</span>
            )}
          </div>
          <div className="um-form-group">
            <label>
              <Ico n="envelope" size={12} /> Email{" "}
              <span className="um-req">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="nama@pelindo.co.id"
              className={errors.email ? "um-input-error" : ""}
            />
            {errors.email && <span className="um-error">{errors.email}</span>}
          </div>
          <div className="um-form-row">
            <div className="um-form-group">
              <label>
                <Ico n="lock" size={12} />{" "}
                {isEdit ? (
                  "Password Baru (kosongkan jika tidak diubah)"
                ) : (
                  <>
                    <span>Password</span> <span className="um-req">*</span>
                  </>
                )}
              </label>
              <div className="um-pass-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Min. 8 karakter"
                  className={errors.password ? "um-input-error" : ""}
                />
                <button
                  type="button"
                  className="um-pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  <Ico n={showPass ? "eyeSlash" : "eye"} size={14} />
                </button>
              </div>
              {errors.password && (
                <span className="um-error">{errors.password}</span>
              )}
            </div>
            <div className="um-form-group">
              <label>
                <Ico n="lock" size={12} /> Konfirmasi Password{" "}
                {!isEdit && <span className="um-req">*</span>}
              </label>
              <div className="um-pass-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm_password}
                  onChange={(e) =>
                    setForm({ ...form, confirm_password: e.target.value })
                  }
                  placeholder="Ulangi password"
                  className={errors.confirm_password ? "um-input-error" : ""}
                />
                <button
                  type="button"
                  className="um-pass-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <Ico n={showConfirm ? "eyeSlash" : "eye"} size={14} />
                </button>
              </div>
              {errors.confirm_password && (
                <span className="um-error">{errors.confirm_password}</span>
              )}
            </div>
          </div>
          <div className="um-form-group">
            <label>Status Akun</label>
            <div className="um-status-toggle">
              <button
                type="button"
                className={`um-status-btn ${form.is_active ? "active-green" : ""}`}
                onClick={() => setForm({ ...form, is_active: true })}
              >
                <Ico n="userCheck" size={13} /> Aktif
              </button>
              <button
                type="button"
                className={`um-status-btn ${!form.is_active ? "active-red" : ""}`}
                onClick={() => setForm({ ...form, is_active: false })}
              >
                <Ico n="userSlash" size={13} /> Nonaktif
              </button>
            </div>
          </div>
        </div>
        <div className="um-modal-footer">
          <button className="um-btn um-btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button className="um-btn um-btn-primary" onClick={handleSave}>
            <Ico n="check" size={13} />{" "}
            {isEdit ? "Simpan Perubahan" : "Buat User"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: Detail User ───────────────────────────────────────
function DetailUserModal({ user, onClose, onEdit }) {
  if (!user) return null;
  const rc = roleConfig[user.role_code];
  return (
    <div className="um-overlay" onClick={onClose}>
      <div className="um-modal" onClick={(e) => e.stopPropagation()}>
        <div className="um-modal-header">
          <h2>
            <Ico n="eye" size={15} /> Detail User
          </h2>
          <button className="um-modal-close" onClick={onClose}>
            <Ico n="times" size={14} />
          </button>
        </div>
        <div className="um-modal-body">
          <div className="um-detail-profile">
            <div
              className={`um-avatar um-avatar--lg um-avatar--${user.role_code === "superadmin" ? "purple" : "blue"}`}
            >
              {getInitials(user.name)}
            </div>
            <div>
              <div className="um-detail-name">{user.name}</div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginTop: 6,
                }}
              >
                <span
                  className="um-role-badge"
                  style={{ color: rc.color, background: rc.bg }}
                >
                  <Ico n={rc.iconName} size={12} /> {rc.label}
                </span>
                <span
                  className={`um-status-badge um-status-badge--${user.is_active ? "aktif" : "nonaktif"}`}
                >
                  <Ico
                    n={user.is_active ? "userCheck" : "userSlash"}
                    size={12}
                  />{" "}
                  {user.is_active ? "Aktif" : "Nonaktif"}
                </span>
              </div>
            </div>
          </div>
          <div className="um-detail-grid">
            <div className="um-detail-item">
              <span className="um-detail-label">NIP</span>
              <span className="um-detail-val">
                <code>{user.nip || "—"}</code>
              </span>
            </div>
            <div className="um-detail-item">
              <span className="um-detail-label">Username</span>
              <span className="um-detail-val">
                <code>@{user.username}</code>
              </span>
            </div>
            <div className="um-detail-item">
              <span className="um-detail-label">Email</span>
              <span className="um-detail-val">{user.email}</span>
            </div>
            <div className="um-detail-item">
              <span className="um-detail-label">No. Telepon</span>
              <span className="um-detail-val">{user.phone || "—"}</span>
            </div>
            <div className="um-detail-item">
              <span className="um-detail-label">Entitas</span>
              <span className="um-detail-val">
                {getEntityName(user.entity_code)}
              </span>
            </div>
            <div className="um-detail-item">
              <span className="um-detail-label">Cabang</span>
              <span className="um-detail-val">
                {getBranchName(user.branch_code)}
              </span>
            </div>
            <div className="um-detail-item">
              <span className="um-detail-label">Tgl Dibuat</span>
              <span className="um-detail-val">{fmt(user.created_at)}</span>
            </div>
            <div className="um-detail-item">
              <span className="um-detail-label">Login Terakhir</span>
              <span className="um-detail-val">{user.last_login}</span>
            </div>
          </div>
        </div>
        <div className="um-modal-footer">
          <button className="um-btn um-btn-secondary" onClick={onClose}>
            Tutup
          </button>
          <button
            className="um-btn um-btn-primary"
            onClick={() => {
              onEdit(user);
              onClose();
            }}
          >
            <Ico n="edit" size={13} /> Edit User
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: Hapus ─────────────────────────────────────────────
function DeleteModal({ user, onClose, onConfirm }) {
  if (!user) return null;
  return (
    <div className="um-overlay" onClick={onClose}>
      <div
        className="um-modal um-modal--sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="um-modal-body"
          style={{ alignItems: "center", textAlign: "center", paddingTop: 32 }}
        >
          <div className="um-delete-icon">
            <Ico n="trash" size={22} />
          </div>
          <h3 className="um-delete-title">Hapus User?</h3>
          <p className="um-delete-desc">
            User <strong>{user.name}</strong> akan dihapus permanen. Tindakan
            ini tidak dapat dibatalkan.
          </p>
        </div>
        <div className="um-modal-footer" style={{ justifyContent: "center" }}>
          <button className="um-btn um-btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button
            className="um-btn um-btn-danger"
            onClick={() => {
              onConfirm(user.id);
              onClose();
            }}
          >
            <Ico n="trash" size={13} /> Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: Reset Password ────────────────────────────────────
function ResetPassModal({ user, onClose }) {
  const [done, setDone] = useState(false);
  if (!user) return null;
  return (
    <div className="um-overlay" onClick={onClose}>
      <div
        className="um-modal um-modal--sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="um-modal-header">
          <h2>
            <Ico n="key" size={15} /> Reset Password
          </h2>
          <button className="um-modal-close" onClick={onClose}>
            <Ico n="times" size={14} />
          </button>
        </div>
        <div
          className="um-modal-body"
          style={{ alignItems: "center", textAlign: "center" }}
        >
          {done ? (
            <>
              <div className="um-reset-success">
                <Ico n="check" size={22} />
              </div>
              <p>
                Password untuk <strong>{user.name}</strong> berhasil direset.
                Link dikirim ke <strong>{user.email}</strong>.
              </p>
            </>
          ) : (
            <>
              <div className="um-reset-icon">
                <Ico n="key" size={22} />
              </div>
              <p>
                Reset password untuk <strong>{user.name}</strong>? Link reset
                dikirim ke <strong>{user.email}</strong>.
              </p>
            </>
          )}
        </div>
        <div className="um-modal-footer" style={{ justifyContent: "center" }}>
          {done ? (
            <button className="um-btn um-btn-primary" onClick={onClose}>
              Selesai
            </button>
          ) : (
            <>
              <button className="um-btn um-btn-secondary" onClick={onClose}>
                Batal
              </button>
              <button
                className="um-btn um-btn-warning"
                onClick={() => setDone(true)}
              >
                <Ico n="key" size={13} /> Kirim Link Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── KOMPONEN UTAMA ───────────────────────────────────────────
const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("semua");
  const [filterEntity, setFilterEntity] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [modal, setModal] = useState(null);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.nip && u.nip.includes(q));
    const matchRole = filterRole === "semua" || u.role_code === filterRole;
    const matchEntity =
      filterEntity === "semua" || u.entity_code === filterEntity;
    const matchStatus =
      filterStatus === "semua" ||
      (filterStatus === "aktif" ? u.is_active : !u.is_active);
    return matchSearch && matchRole && matchEntity && matchStatus;
  });

  const stats = {
    total: users.length,
    superadmin: users.filter((u) => u.role_code === "superadmin").length,
    aktif: users.filter((u) => u.is_active).length,
    nonaktif: users.filter((u) => !u.is_active).length,
  };

  const handleSave = (saved) => {
    if (users.find((u) => u.id === saved.id))
      setUsers(users.map((u) => (u.id === saved.id ? saved : u)));
    else setUsers([saved, ...users]);
  };
  const handleDelete = (id) => setUsers(users.filter((u) => u.id !== id));
  const handleToggle = (id) =>
    setUsers(
      users.map((u) => (u.id === id ? { ...u, is_active: !u.is_active } : u)),
    );

  return (
    <div className="um-root">
      <style>{css}</style>
      <div className="um-header">
        <div>
          <h1 className="um-title">User Management</h1>
          <p className="um-subtitle">
            Kelola akun dan hak akses pengguna sistem PT Pelindo Multi Terminal
          </p>
        </div>
        <button
          className="um-btn um-btn-primary um-btn-lg"
          onClick={() => setModal({ type: "form", user: null })}
        >
          <Ico n="plus" size={14} /> Tambah User
        </button>
      </div>

      <div className="um-stats">
        <div className="um-stat-card">
          <div className="um-stat-icon um-stat-icon--blue">
            <Ico n="user" size={18} />
          </div>
          <div>
            <div className="um-stat-num">{stats.total}</div>
            <div className="um-stat-label">Total User</div>
          </div>
        </div>
        <div className="um-stat-card">
          <div className="um-stat-icon um-stat-icon--purple">
            <Ico n="shield" size={18} />
          </div>
          <div>
            <div className="um-stat-num">{stats.superadmin}</div>
            <div className="um-stat-label">Super Admin</div>
          </div>
        </div>
        <div className="um-stat-card">
          <div className="um-stat-icon um-stat-icon--green">
            <Ico n="userCheck" size={18} />
          </div>
          <div>
            <div className="um-stat-num">{stats.aktif}</div>
            <div className="um-stat-label">Akun Aktif</div>
          </div>
        </div>
        <div className="um-stat-card">
          <div className="um-stat-icon um-stat-icon--gray">
            <Ico n="userSlash" size={18} />
          </div>
          <div>
            <div className="um-stat-num">{stats.nonaktif}</div>
            <div className="um-stat-label">Akun Nonaktif</div>
          </div>
        </div>
      </div>

      <div className="um-toolbar">
        <div className="um-search-wrap">
          <Ico n="search" size={14} />
          <input
            placeholder="Cari nama, NIP, username, atau email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="um-filter-wrap">
          <Ico n="shield" size={13} />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="semua">Semua Role</option>
            <option value="superadmin">Super Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="um-filter-wrap">
          <Ico n="building" size={13} />
          <select
            value={filterEntity}
            onChange={(e) => setFilterEntity(e.target.value)}
          >
            <option value="semua">Semua Entitas</option>
            {entityList.map((e) => (
              <option key={e.entity_code} value={e.entity_code}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className="um-filter-wrap">
          <Ico n="filter" size={13} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="semua">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
        </div>
        <div className="um-count">{filtered.length} user</div>
      </div>

      <div className="um-table-wrap">
        <table className="um-table">
          <thead>
            <tr>
              <th>User</th>
              <th>NIP</th>
              <th>Username</th>
              <th>Entitas / Cabang</th>
              <th>Role</th>
              <th>Status</th>
              <th>Login Terakhir</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="um-empty">
                  Tidak ada user yang cocok
                </td>
              </tr>
            ) : (
              filtered.map((u) => {
                const rc = roleConfig[u.role_code];
                return (
                  <tr key={u.id}>
                    <td>
                      <div className="um-user-cell">
                        <div
                          className={`um-avatar um-avatar--${u.role_code === "superadmin" ? "purple" : "blue"}`}
                        >
                          {getInitials(u.name)}
                        </div>
                        <div>
                          <div className="um-user-name">{u.name}</div>
                          <div className="um-user-email">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <code className="um-username">{u.nip || "—"}</code>
                    </td>
                    <td>
                      <code className="um-username">@{u.username}</code>
                    </td>
                    <td>
                      <div className="um-entity-cell">
                        <span className="um-entity-code">{u.entity_code}</span>
                        <span className="um-entity-name">
                          {getBranchName(u.branch_code)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="um-role-badge"
                        style={{ color: rc.color, background: rc.bg }}
                      >
                        <Ico n={rc.iconName} size={12} /> {rc.label}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`um-status-toggle-btn um-status-toggle-btn--${u.is_active ? "aktif" : "nonaktif"}`}
                        onClick={() => handleToggle(u.id)}
                        title="Klik untuk toggle"
                      >
                        <Ico
                          n={u.is_active ? "userCheck" : "userSlash"}
                          size={12}
                        />{" "}
                        {u.is_active ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="um-last-login">{u.last_login}</td>
                    <td>
                      <div className="um-actions">
                        {/* Tombol aksi — inline SVG langsung tanpa komponen */}
                        <button
                          className="um-action-btn um-action-btn--view"
                          title="Detail"
                          onClick={() => setModal({ type: "detail", user: u })}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button
                          className="um-action-btn um-action-btn--edit"
                          title="Edit"
                          onClick={() => setModal({ type: "form", user: u })}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          className="um-action-btn um-action-btn--key"
                          title="Reset Password"
                          onClick={() => setModal({ type: "reset", user: u })}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                          </svg>
                        </button>
                        <button
                          className="um-action-btn um-action-btn--del"
                          title="Hapus"
                          onClick={() => setModal({ type: "delete", user: u })}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {modal?.type === "form" && (
        <UserFormModal
          user={modal.user}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {modal?.type === "detail" && (
        <DetailUserModal
          user={modal.user}
          onClose={() => setModal(null)}
          onEdit={(u) => setModal({ type: "form", user: u })}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          user={modal.user}
          onClose={() => setModal(null)}
          onConfirm={handleDelete}
        />
      )}
      {modal?.type === "reset" && (
        <ResetPassModal user={modal.user} onClose={() => setModal(null)} />
      )}
    </div>
  );
};

export default UserManagement;
