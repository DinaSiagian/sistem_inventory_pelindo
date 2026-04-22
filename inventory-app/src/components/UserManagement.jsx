import React, { useState, useRef, useCallback, useEffect } from "react";
import { masterDataAPI, userAPI, logAPI } from "../services/api";

// ─── INLINE SVG ICONS ─────────────────────────────────────────
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
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
      <line x1="12" y1="10" x2="20" y2="10" />
      <line x1="12" y1="14" x2="20" y2="14" />
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
  activity: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  clock: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  database: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  globe: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  chevronDown: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  chevronUp: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  diff: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  ),
  arrowLeft: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  moreVertical: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  ),
  sitemap: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <rect x="1" y="16" width="6" height="4" rx="1" />
      <rect x="9" y="16" width="6" height="4" rx="1" />
      <rect x="17" y="16" width="6" height="4" rx="1" />
      <path d="M4 16v-4h16v4" />
      <line x1="12" y1="6" x2="12" y2="12" />
    </svg>
  ),
  layers: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  settings: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

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

// ─── PAGINATION COMPONENT ─────────────────────────────────────
function Pagination({
  page,
  totalPages,
  total,
  perPage,
  onPageChange,
  accentColor = "#2563eb",
  accentBg = "#dbeafe",
  accentRing = "rgba(37,99,235,.08)",
}) {
  if (totalPages <= 1) return null;
  const from = Math.min((page - 1) * perPage + 1, total);
  const to = Math.min(page * perPage, total);

  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    )
      pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const btnStyle = (active) => ({
    minWidth: 28,
    height: 28,
    borderRadius: 6,
    border: `1.5px solid ${active ? accentColor : "#e2e8f0"}`,
    background: active ? accentColor : "#fff",
    cursor: active ? "default" : "pointer",
    fontSize: ".72rem",
    fontWeight: 600,
    color: active ? "#fff" : "#64748b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5px",
    fontFamily: "inherit",
    transition: "all .12s",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: ".6rem .9rem",
        borderTop: "1px solid #f1f5f9",
        background: "#fafbff",
        flexWrap: "wrap",
        gap: ".4rem",
      }}
    >
      <span style={{ fontSize: ".72rem", color: "#64748b" }}>
        {from}–{to} dari {total} data
      </span>
      <div style={{ display: "flex", gap: ".3rem", alignItems: "center" }}>
        <button
          style={{
            ...btnStyle(false),
            opacity: page === 1 ? 0.4 : 1,
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
          onClick={() => page > 1 && onPageChange(page - 1)}
          disabled={page === 1}
        >
          ‹
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`e${i}`}
              style={{ fontSize: ".72rem", color: "#94a3b8", padding: "0 2px" }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              style={btnStyle(p === page)}
              onClick={() => p !== page && onPageChange(p)}
            >
              {p}
            </button>
          ),
        )}
        <button
          style={{
            ...btnStyle(false),
            opacity: page === totalPages ? 0.4 : 1,
            cursor: page === totalPages ? "not-allowed" : "pointer",
          }}
          onClick={() => page < totalPages && onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
}

// ─── MASTER DATA (state-managed) ──────────────────────────────
const roleConfig = {
  admin: {
    label: "Administrator",
    color: "#7c3aed",
    bg: "#ede9fe",
    iconName: "shield",
  },
  superadmin: {
    label: "Super Admin",
    color: "#7c3aed",
    bg: "#ede9fe",
    iconName: "shield",
  },
  user: { label: "User", color: "#0891b2", bg: "#ecfeff", iconName: "user" },
};
const ACTION_CONFIG = {
  LOGIN: { label: "Login", color: "#16a34a", bg: "#dcfce7" },
  LOGOUT: { label: "Logout", color: "#64748b", bg: "#f1f5f9" },
  REGISTER: { label: "Buat Akun", color: "#0891b2", bg: "#ecfeff" },
  DELETE_ACCOUNT: { label: "Hapus Akun", color: "#dc2626", bg: "#fee2e2" },
  CHANGE_PASSWORD: { label: "Ubah Password", color: "#d97706", bg: "#fef3c7" },
  UPDATE_PROFILE: { label: "Ubah Profil", color: "#2563eb", bg: "#dbeafe" },
  BORROW_ASSET: { label: "Peminjaman Aset", color: "#7c3aed", bg: "#ede9fe" },
  RETURN_ASSET: { label: "Pengembalian Aset", color: "#0f766e", bg: "#ccfbf1" },
};

const fmt = (d) =>
  d
    ? new Date(d).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// ─── CSS ──────────────────────────────────────────────────────
const css = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");
*{box-sizing:border-box;}
:root{
  --blue:#2563eb;--blue-dk:#1d4ed8;--blue-lt:#eff6ff;
  --green:#16a34a;--green-lt:#dcfce7;
  --red:#dc2626;--red-lt:#fee2e2;
  --purple:#7c3aed;--purple-lt:#ede9fe;
  --warn:#d97706;--warn-lt:#fef3c7;
  --teal:#0f766e;--teal-dk:#0d9488;--teal-lt:#f0fdf4;--teal-ring:#99f6e4;
  --indigo:#4338ca;--indigo-lt:#eef2ff;
  --orange:#ea580c;--orange-lt:#fff7ed;
  --slate:#0f172a;--slate-6:#64748b;--slate-4:#94a3b8;
  --border:#e2e8f0;--bg:#f8fafc;
  --r:10px;--sh:0 1px 3px rgba(0,0,0,.05);--sh-md:0 3px 12px rgba(0,0,0,.09);
}

/* ── ROOT ── */
.um-root{padding:1rem 1.25rem;max-width:1400px;margin:0 auto;font-family:"Plus Jakarta Sans","Inter",sans-serif;background:var(--bg);min-height:100vh;}

/* ── PAGE HEADER ── */
.um-page-header{display:flex;align-items:center;gap:.65rem;margin-bottom:0.9rem;flex-wrap:wrap;}
.um-back-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.38rem .75rem;border-radius:8px;border:1.5px solid var(--border);background:#fff;color:var(--slate-6);cursor:pointer;font-size:.78rem;font-weight:600;font-family:inherit;transition:all .15s;}
.um-back-btn:hover{background:var(--bg);color:var(--slate);}
.um-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.9rem;flex-wrap:wrap;gap:.6rem;}
.um-title{font-size:1.25rem;font-weight:800;color:var(--slate);margin:0 0 2px;letter-spacing:-.02em;}
.um-subtitle{font-size:.775rem;color:var(--slate-6);margin:0;}

/* ── STATS ── */
.um-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:.65rem;margin-bottom:.9rem;}
@media(max-width:900px){.um-stats{grid-template-columns:repeat(2,1fr);}}
.um-stat-card{background:#fff;border-radius:var(--r);border:1px solid var(--border);padding:.7rem .9rem;display:flex;align-items:center;gap:.65rem;box-shadow:var(--sh);transition:box-shadow .2s,transform .2s;}
.um-stat-card:hover{box-shadow:var(--sh-md);transform:translateY(-1px);}
.um-stat-icon{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.um-stat-icon--blue{background:#dbeafe;color:#2563eb;}.um-stat-icon--purple{background:#ede9fe;color:#7c3aed;}
.um-stat-icon--green{background:#dcfce7;color:#16a34a;}.um-stat-icon--gray{background:#f1f5f9;color:#64748b;}
.um-stat-num{font-size:1.3rem;font-weight:800;color:var(--slate);line-height:1;}
.um-stat-label{font-size:.7rem;color:var(--slate-6);margin-top:2px;}

/* ── TOOLBAR ── */
.um-toolbar{display:flex;align-items:center;gap:.5rem;margin-bottom:.7rem;flex-wrap:wrap;}
.um-search-wrap{flex:1;min-width:200px;display:flex;align-items:center;gap:.45rem;background:#fff;border:1.5px solid var(--border);border-radius:8px;padding:.4rem .75rem;transition:border-color .15s;}
.um-search-wrap:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.08);}
.um-search-wrap input{border:none;outline:none;font-size:.8rem;flex:1;color:var(--slate);background:#fff;font-family:inherit;}
.um-filter-wrap{display:flex;align-items:center;gap:.35rem;background:#fff;border:1.5px solid var(--border);border-radius:8px;padding:.38rem .7rem;}
.um-filter-wrap select{border:none;outline:none;font-size:.775rem;color:#334155;background:#fff;cursor:pointer;font-family:inherit;}
.um-count{font-size:.75rem;font-weight:600;color:var(--slate-6);background:#fff;border:1px solid var(--border);border-radius:7px;padding:.32rem .65rem;white-space:nowrap;}
.um-filter-disabled{opacity:.5;pointer-events:none;}
.um-filter-chips{display:flex;gap:.3rem;flex-wrap:wrap;align-items:center;}
.um-chip{display:inline-flex;align-items:center;gap:.3rem;background:#dbeafe;color:#1d4ed8;border-radius:99px;padding:1px 8px;font-size:.68rem;font-weight:600;white-space:nowrap;}
.um-chip button{background:none;border:none;cursor:pointer;color:#1d4ed8;font-size:.85rem;padding:0;line-height:1;margin-left:2px;opacity:.7;}
.um-chip button:hover{opacity:1;}

/* ── TABLE ── */
.um-table-wrap{background:#fff;border-radius:12px;border:1px solid var(--border);overflow-x:auto;box-shadow:var(--sh);}
.um-table{width:100%;border-collapse:collapse;font-size:.775rem;}
.um-table thead tr{background:linear-gradient(135deg,#1e3a8a,var(--blue));}
.um-table thead th{color:#fff;padding:.55rem .8rem;text-align:left;font-weight:600;font-size:.72rem;white-space:nowrap;}
.um-table tbody tr{border-bottom:1px solid #f1f5f9;transition:background .12s;}
.um-table tbody tr:last-child{border-bottom:none;}
.um-table tbody tr:hover{background:#fafbff;}
.um-table tbody td{padding:.55rem .8rem;vertical-align:middle;}
.um-empty{text-align:center;color:var(--slate-4);padding:2rem!important;}

/* ── USER CELL ── */
.um-user-cell{display:flex;align-items:center;gap:.5rem;}
.um-avatar{width:28px;height:28px;border-radius:50%;font-weight:700;font-size:.7rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.um-avatar--blue{background:#dbeafe;color:#1d4ed8;}.um-avatar--purple{background:#ede9fe;color:#7c3aed;}
.um-avatar--lg{width:42px;height:42px;font-size:.9rem;border-radius:10px;}
.um-user-name{font-size:.775rem;font-weight:600;color:#1e293b;}
.um-user-email{font-size:.68rem;color:var(--slate-6);}
.um-username{font-family:"Courier New",monospace;font-size:.7rem;font-weight:700;color:var(--blue);background:var(--blue-lt);padding:1px 6px;border-radius:4px;white-space:nowrap;}
.um-entity-cell{display:flex;flex-direction:column;gap:1px;}
.um-entity-code{font-size:.67rem;font-weight:700;color:#7c3aed;background:#ede9fe;padding:1px 5px;border-radius:3px;width:fit-content;}
.um-entity-name{font-size:.7rem;color:var(--slate-6);}
.um-role-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:99px;font-size:.69rem;font-weight:600;white-space:nowrap;}
.um-status-toggle-btn{display:inline-flex;align-items:center;gap:4px;padding:2px 9px;border-radius:99px;font-size:.69rem;font-weight:600;border:none;cursor:pointer;font-family:inherit;transition:all .15s;}
.um-status-toggle-btn--aktif{background:var(--green-lt);color:var(--green);}
.um-status-toggle-btn--nonaktif{background:#f1f5f9;color:var(--slate-6);}
.um-status-toggle-btn:hover{filter:brightness(.9);}
.um-last-login{font-size:.72rem;color:var(--slate-6);white-space:nowrap;}

/* ── DROPDOWN ACTIONS ── */
.um-dd-wrap{position:relative;}
.um-dd-btn{width:28px;height:28px;border-radius:7px;border:1.5px solid var(--border);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--slate-6);transition:all .15s;}
.um-dd-btn:hover{background:var(--bg);border-color:var(--slate-4);}
.um-dd-menu{position:absolute;right:0;top:calc(100% + 4px);background:#fff;border:1.5px solid var(--border);border-radius:10px;box-shadow:var(--sh-md);min-width:155px;z-index:200;overflow:hidden;}
.um-dd-item{display:flex;align-items:center;gap:.5rem;padding:.48rem .75rem;font-size:.775rem;font-weight:500;cursor:pointer;color:var(--slate);transition:background .1s;}
.um-dd-item:hover{background:#f8fafc;}
.um-dd-item--danger{color:var(--red);}
.um-dd-item--danger:hover{background:var(--red-lt);}
.um-dd-sep{height:1px;background:var(--border);margin:.2rem 0;}

/* ── BUTTONS ── */
.um-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.42rem .9rem;border-radius:8px;font-size:.8rem;font-weight:600;border:none;cursor:pointer;transition:all .18s;font-family:inherit;}
.um-btn-lg{padding:.5rem 1.1rem;font-size:.84rem;}
.um-btn-primary{background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#fff;box-shadow:0 2px 6px rgba(37,99,235,.22);}
.um-btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px);}
.um-btn-secondary{background:var(--bg);color:#475569;border:1.5px solid var(--border);}
.um-btn-secondary:hover{background:#e9eef5;}
.um-btn-danger{background:linear-gradient(135deg,#b91c1c,#dc2626);color:#fff;}
.um-btn-warning{background:linear-gradient(135deg,#b45309,#d97706);color:#fff;}

/* ── DETAIL PAGE ── */
.um-detail-root{padding:1rem 1.25rem;max-width:1400px;margin:0 auto;font-family:"Plus Jakarta Sans","Inter",sans-serif;background:var(--bg);min-height:100vh;}
.um-detail-card{background:#fff;border-radius:12px;border:1px solid var(--border);box-shadow:var(--sh);margin-bottom:.9rem;}
.um-detail-card-header{padding:.8rem 1.1rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.5rem;font-size:.82rem;font-weight:700;color:var(--slate);}
.um-detail-card-body{padding:1rem 1.1rem;}
.um-detail-profile{display:flex;align-items:center;gap:.85rem;padding:.85rem;background:var(--bg);border:1px solid var(--border);border-radius:10px;margin-bottom:1rem;}
.um-detail-name{font-size:.92rem;font-weight:700;color:var(--slate);}
.um-detail-badges{display:flex;gap:7px;flex-wrap:wrap;margin-top:5px;}
.um-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:.65rem 1.25rem;}
@media(max-width:600px){.um-detail-grid{grid-template-columns:1fr;}}
.um-detail-item{display:flex;flex-direction:column;gap:2px;}
.um-detail-label{font-size:.67rem;font-weight:700;color:var(--slate-4);text-transform:uppercase;letter-spacing:.04em;}
.um-detail-val{font-size:.78rem;color:var(--slate);}
.um-detail-actions{display:flex;gap:.5rem;flex-wrap:wrap;padding:.8rem 1.1rem;border-top:1px solid var(--border);}

/* ── FORM PAGE ── */
.um-form-root{padding:1rem 1.25rem;max-width:660px;margin:0 auto;font-family:"Plus Jakarta Sans","Inter",sans-serif;background:var(--bg);min-height:100vh;}
.um-form-card{background:#fff;border-radius:12px;border:1px solid var(--border);box-shadow:var(--sh);padding:1.25rem;display:flex;flex-direction:column;gap:.8rem;}
.um-form-row{display:grid;grid-template-columns:1fr 1fr;gap:.7rem;}
@media(max-width:520px){.um-form-row{grid-template-columns:1fr;}}
.um-form-group{display:flex;flex-direction:column;gap:.28rem;}
.um-form-group label{font-size:.75rem;font-weight:600;color:#475569;display:flex;align-items:center;gap:4px;}
.um-form-group input,.um-form-group select{padding:.42rem .7rem;border-radius:8px;border:1.5px solid var(--border);font-size:.8rem;outline:none;transition:border .15s,box-shadow .15s;font-family:inherit;background:#fff!important;color:var(--slate)!important;}
.um-form-group input:focus,.um-form-group select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.09);}
.um-input-error{border-color:var(--red)!important;}
.um-error{font-size:.7rem;color:var(--red);}
.um-hint{font-size:.7rem;color:var(--slate-4);}
.um-req{color:var(--red);}
.um-pass-wrap{position:relative;}
.um-pass-wrap input{width:100%;padding-right:2.3rem;}
.um-pass-toggle{position:absolute;right:.55rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--slate-4);display:flex;align-items:center;padding:0;}
.um-pass-toggle:hover{color:var(--slate-6);}
.um-pass-toggle svg{width:13px;height:13px;display:block;}
.um-role-options{display:flex;gap:.4rem;flex-wrap:wrap;}
.um-role-opt{display:flex;align-items:center;gap:.4rem;padding:.35rem .75rem;border-radius:99px;border:1.5px solid var(--border);cursor:pointer;font-size:.76rem;font-weight:600;color:var(--slate-6);background:#fff;transition:all .14s;}
.um-role-opt input[type="radio"]{display:none;}
.um-role-opt.active{font-weight:700;}
.um-role-opt svg{width:12px;height:12px;display:block;}
.um-status-toggle{display:flex;gap:.4rem;}
.um-status-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.35rem .75rem;border-radius:99px;border:1.5px solid var(--border);cursor:pointer;font-size:.76rem;font-weight:600;background:#fff;color:var(--slate-6);font-family:inherit;transition:all .14rem;}
.um-status-btn.active-green{background:var(--green-lt);color:var(--green);border-color:var(--green);}
.um-status-btn.active-red{background:var(--red-lt);color:var(--red);border-color:var(--red);}
.um-status-btn svg{width:12px;height:12px;display:block;}
.um-form-footer{display:flex;gap:.5rem;justify-content:flex-end;padding-top:.5rem;border-top:1px solid var(--border);}

/* ── CONFIRM PAGE (reset / delete) ── */
.um-confirm-root{padding:1rem 1.25rem;max-width:440px;margin:0 auto;font-family:"Plus Jakarta Sans","Inter",sans-serif;background:var(--bg);min-height:100vh;}
.um-confirm-card{background:#fff;border-radius:12px;border:1px solid var(--border);box-shadow:var(--sh);padding:2rem 1.5rem;text-align:center;}
.um-confirm-icon{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;}
.um-confirm-icon--warn{background:var(--warn-lt);color:var(--warn);}
.um-confirm-icon--danger{background:var(--red-lt);color:var(--red);}
.um-confirm-icon--success{background:var(--green-lt);color:var(--green);}
.um-confirm-title{font-size:1rem;font-weight:700;color:var(--slate);margin-bottom:.4rem;}
.um-confirm-desc{font-size:.8rem;color:var(--slate-6);line-height:1.6;}
.um-confirm-footer{display:flex;gap:.5rem;justify-content:center;margin-top:1.25rem;}

/* ── ACTIVITY LOG ── */
.al-section{margin-top:1rem;border-radius:12px;border:1px solid var(--teal-ring);overflow:hidden;box-shadow:var(--sh);}
.al-header{background:linear-gradient(135deg,var(--teal-lt),#ecfeff);padding:.65rem 1rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;border-bottom:1px solid var(--teal-ring);transition:background .15s;}
.al-header:hover{background:linear-gradient(135deg,#d1fae5,#cffafe);}
.al-header-left{display:flex;align-items:center;gap:.55rem;}
.al-header-title{font-size:.84rem;font-weight:700;color:var(--teal);}
.al-header-count{font-size:.68rem;font-weight:600;color:#0d9488;background:#fff;border:1px solid var(--teal-ring);border-radius:99px;padding:1px 8px;}
.al-body{background:#fff;}
.al-toolbar{display:flex;align-items:center;gap:.55rem;padding:.7rem .9rem;border-bottom:1px solid #f0fdf4;flex-wrap:wrap;}
.al-search-wrap{flex:1;min-width:180px;display:flex;align-items:center;gap:.4rem;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:.38rem .7rem;transition:border-color .15s;}
.al-search-wrap:focus-within{border-color:#14b8a6;box-shadow:0 0 0 3px rgba(20,184,166,.1);}
.al-search-wrap input{border:none;outline:none;font-size:.775rem;flex:1;color:var(--slate);background:transparent;font-family:inherit;}
.al-filter-wrap{display:flex;align-items:center;gap:.35rem;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:.36rem .65rem;}
.al-filter-wrap select{border:none;outline:none;font-size:.75rem;color:#334155;background:transparent;cursor:pointer;font-family:inherit;}
.al-table-wrap{overflow-x:auto;}
.al-table{width:100%;border-collapse:collapse;font-size:.755rem;}
.al-table thead tr{background:linear-gradient(135deg,var(--teal),var(--teal-dk));}
.al-table thead th{color:#fff;padding:.5rem .8rem;text-align:left;font-weight:600;font-size:.7rem;white-space:nowrap;}
.al-table tbody tr{border-bottom:1px solid #f0fdf4;transition:background .12s;}
.al-table tbody tr:last-child{border-bottom:none;}
.al-table tbody tr:hover{background:#f0fdf4;}
.al-table tbody td{padding:.5rem .8rem;vertical-align:middle;}
.al-empty{text-align:center;color:var(--slate-4);padding:2rem!important;}
.al-timestamp-date{font-size:.72rem;font-weight:600;color:#334155;}
.al-timestamp-time{font-size:.66rem;color:var(--slate-4);}
.al-user-cell{display:flex;align-items:center;gap:.45rem;}
.al-action-badge{display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:99px;font-size:.68rem;font-weight:700;white-space:nowrap;}
.al-table-name{font-family:"Courier New",monospace;font-size:.7rem;font-weight:600;color:var(--teal);background:var(--teal-lt);padding:1px 5px;border-radius:3px;}
.al-record-id{font-family:"Courier New",monospace;font-size:.7rem;color:var(--slate-4);}
.al-ip{font-family:"Courier New",monospace;font-size:.7rem;color:var(--slate-6);background:#f8fafc;padding:1px 5px;border-radius:3px;border:1px solid var(--border);}
.al-diff-btn{background:none;border:1.5px solid var(--border);border-radius:6px;padding:2px 6px;cursor:pointer;font-size:.67rem;color:var(--slate-6);display:inline-flex;align-items:center;gap:3px;transition:all .12s;font-family:inherit;}
.al-diff-btn:hover{border-color:#14b8a6;color:var(--teal);background:var(--teal-lt);}
.al-diff-btn svg{width:11px;height:11px;}
.al-pagination{display:flex;align-items:center;justify-content:space-between;padding:.6rem .9rem;border-top:1px solid #f0fdf4;background:#fafffe;flex-wrap:wrap;gap:.4rem;}
.al-page-info{font-size:.72rem;color:var(--slate-6);}
.al-page-btns{display:flex;gap:.3rem;}
.al-page-btn{min-width:26px;height:26px;border-radius:6px;border:1.5px solid var(--border);background:#fff;cursor:pointer;font-size:.72rem;font-weight:600;color:var(--slate-6);display:flex;align-items:center;justify-content:center;transition:all .12s;font-family:inherit;padding:0 5px;}
.al-page-btn:hover:not(:disabled){border-color:#14b8a6;color:var(--teal);background:var(--teal-lt);}
.al-page-btn.active{background:var(--teal);border-color:var(--teal);color:#fff;}
.al-page-btn:disabled{opacity:.4;cursor:not-allowed;}
.al-diff-overlay{position:fixed;inset:0;z-index:1999;}
.al-diff-popover{position:fixed;z-index:2000;background:#fff;border:1px solid var(--border);border-radius:11px;box-shadow:0 8px 32px rgba(0,0,0,.14);padding:.85rem .95rem;min-width:300px;max-width:460px;}
.al-diff-title{font-size:.75rem;font-weight:700;color:var(--slate);margin-bottom:.55rem;display:flex;align-items:center;gap:.35rem;}
.al-diff-cols{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;}
.al-diff-col{display:flex;flex-direction:column;gap:.25rem;}
.al-diff-col-label{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:1px 7px;border-radius:3px;width:fit-content;}
.al-diff-col-label--old{background:var(--red-lt);color:#b91c1c;}
.al-diff-col-label--new{background:var(--green-lt);color:#15803d;}
.al-diff-content{background:#f8fafc;border-radius:7px;padding:.4rem .55rem;font-family:"Courier New",monospace;font-size:.68rem;color:#334155;white-space:pre-wrap;word-break:break-all;max-height:130px;overflow-y:auto;border:1px solid var(--border);}
.al-diff-null{font-style:italic;color:var(--slate-4);}

/* ── MASTER DATA MANAGEMENT SECTIONS ── */
.md-section{margin-top:1rem;border-radius:12px;overflow:hidden;box-shadow:var(--sh);}
.md-section--entity{border:1px solid #c7d2fe;}
.md-section--branch{border:1px solid #bfdbfe;}
.md-section--division{border:1px solid #bbf7d0;}

.md-header{padding:.65rem 1rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;transition:background .15s;}
.md-header--entity{background:linear-gradient(135deg,#eef2ff,#e0e7ff);border-bottom:1px solid #c7d2fe;}
.md-header--entity:hover{background:linear-gradient(135deg,#e0e7ff,#c7d2fe);}
.md-header--branch{background:linear-gradient(135deg,#eff6ff,#dbeafe);border-bottom:1px solid #bfdbfe;}
.md-header--branch:hover{background:linear-gradient(135deg,#dbeafe,#bfdbfe);}
.md-header--division{background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-bottom:1px solid #bbf7d0;}
.md-header--division:hover{background:linear-gradient(135deg,#dcfce7,#bbf7d0);}

.md-header-left{display:flex;align-items:center;gap:.55rem;}
.md-header-title--entity{font-size:.84rem;font-weight:700;color:var(--indigo);}
.md-header-title--branch{font-size:.84rem;font-weight:700;color:var(--blue-dk);}
.md-header-title--division{font-size:.84rem;font-weight:700;color:var(--green);}
.md-header-count--entity{font-size:.68rem;font-weight:600;color:var(--indigo);background:#fff;border:1px solid #c7d2fe;border-radius:99px;padding:1px 8px;}
.md-header-count--branch{font-size:.68rem;font-weight:600;color:var(--blue-dk);background:#fff;border:1px solid #bfdbfe;border-radius:99px;padding:1px 8px;}
.md-header-count--division{font-size:.68rem;font-weight:600;color:var(--green);background:#fff;border:1px solid #bbf7d0;border-radius:99px;padding:1px 8px;}

.md-body{background:#fff;}
.md-toolbar{display:flex;align-items:center;gap:.55rem;padding:.65rem .9rem;flex-wrap:wrap;}
.md-toolbar--entity{border-bottom:1px solid #eef2ff;}
.md-toolbar--branch{border-bottom:1px solid #eff6ff;}
.md-toolbar--division{border-bottom:1px solid #f0fdf4;}

.md-search-wrap{flex:1;min-width:160px;display:flex;align-items:center;gap:.4rem;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:.36rem .65rem;transition:border-color .15s;}
.md-search-wrap input{border:none;outline:none;font-size:.775rem;flex:1;color:var(--slate);background:transparent;font-family:inherit;}
.md-search-wrap:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.08);}

.md-filter-wrap{display:flex;align-items:center;gap:.35rem;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:.34rem .6rem;}
.md-filter-wrap select{border:none;outline:none;font-size:.75rem;color:#334155;background:transparent;cursor:pointer;font-family:inherit;}

.md-add-btn{display:inline-flex;align-items:center;gap:.3rem;padding:.34rem .75rem;border-radius:8px;font-size:.75rem;font-weight:600;border:none;cursor:pointer;transition:all .15s;font-family:inherit;margin-left:auto;}
.md-add-btn--entity{background:var(--indigo-lt);color:var(--indigo);}
.md-add-btn--entity:hover{background:#c7d2fe;color:#3730a3;}
.md-add-btn--branch{background:var(--blue-lt);color:var(--blue-dk);}
.md-add-btn--branch:hover{background:#bfdbfe;color:#1e40af;}
.md-add-btn--division{background:var(--green-lt);color:var(--green);}
.md-add-btn--division:hover{background:#bbf7d0;color:#15803d;}

.md-table-wrap{overflow-x:auto;}
.md-table{width:100%;border-collapse:collapse;font-size:.765rem;}
.md-table--entity thead tr{background:linear-gradient(135deg,#3730a3,var(--indigo));}
.md-table--branch thead tr{background:linear-gradient(135deg,#1e40af,var(--blue));}
.md-table--division thead tr{background:linear-gradient(135deg,#15803d,var(--green));}
.md-table thead th{color:#fff;padding:.5rem .8rem;text-align:left;font-weight:600;font-size:.7rem;white-space:nowrap;}
.md-table tbody tr{border-bottom:1px solid #f8fafc;transition:background .12s;}
.md-table tbody tr:last-child{border-bottom:none;}
.md-table--entity tbody tr:hover{background:#eef2ff;}
.md-table--branch tbody tr:hover{background:#eff6ff;}
.md-table--division tbody tr:hover{background:#f0fdf4;}
.md-table tbody td{padding:.5rem .8rem;vertical-align:middle;}
.md-empty{text-align:center;color:var(--slate-4);padding:1.5rem!important;}

.md-code-badge{font-family:"Courier New",monospace;font-size:.7rem;font-weight:700;padding:2px 7px;border-radius:4px;}
.md-code-badge--entity{color:var(--indigo);background:var(--indigo-lt);}
.md-code-badge--branch{color:var(--blue-dk);background:var(--blue-lt);}
.md-code-badge--division{color:var(--green);background:var(--green-lt);}

.md-name-text{font-size:.78rem;font-weight:600;color:#1e293b;}
.md-parent-badge{font-size:.67rem;color:var(--slate-6);background:#f1f5f9;padding:1px 6px;border-radius:3px;font-family:"Courier New",monospace;}

.md-action-row{display:flex;gap:.3rem;align-items:center;}
.md-icon-btn{width:26px;height:26px;border-radius:6px;border:1.5px solid var(--border);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--slate-6);transition:all .14s;flex-shrink:0;}
.md-icon-btn--edit:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-lt);}
.md-icon-btn--del:hover{border-color:var(--red);color:var(--red);background:var(--red-lt);}

/* ── INLINE MODAL ── */
.md-modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.4);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;z-index:500;padding:1rem;}
.md-modal{background:#fff;border-radius:14px;width:100%;max-width:460px;box-shadow:0 12px 40px rgba(0,0,0,.15);overflow:hidden;}
.md-modal-header{padding:.85rem 1.1rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.md-modal-title{font-size:.88rem;font-weight:700;color:var(--slate);display:flex;align-items:center;gap:.4rem;}
.md-modal-close{background:none;border:none;cursor:pointer;color:var(--slate-4);border-radius:6px;padding:.2rem;display:flex;align-items:center;justify-content:center;}
.md-modal-close:hover{background:var(--bg);color:var(--slate-6);}
.md-modal-body{padding:1rem 1.1rem;display:flex;flex-direction:column;gap:.65rem;}
.md-modal-footer{padding:.8rem 1.1rem;border-top:1px solid var(--border);display:flex;gap:.45rem;justify-content:flex-end;}
.md-modal-field{display:flex;flex-direction:column;gap:.25rem;}
.md-modal-field label{font-size:.73rem;font-weight:600;color:#475569;display:flex;align-items:center;gap:4px;}

/* ── FIX: input & select warna putih di dalam modal master data ── */
.md-modal-field input,
.md-modal-field select {
  padding:.4rem .65rem;
  border-radius:8px;
  border:1.5px solid var(--border);
  font-size:.78rem;
  outline:none;
  transition:border .15s;
  font-family:inherit;
  background:#ffffff !important;
  color:#0f172a !important;
  -webkit-text-fill-color:#0f172a !important;
}
.md-modal-field input:focus,
.md-modal-field select:focus {
  border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(37,99,235,.08);
}
.md-modal-field input:disabled,
.md-modal-field select:disabled {
  background:#f8fafc !important;
  color:#94a3b8 !important;
  -webkit-text-fill-color:#94a3b8 !important;
  cursor:not-allowed;
}
.md-modal-field input::placeholder {
  color:#94a3b8 !important;
  -webkit-text-fill-color:#94a3b8 !important;
}

.md-modal-field-error{border-color:var(--red)!important;}
.md-modal-err{font-size:.7rem;color:var(--red);}
.md-del-confirm-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .65rem;}

/* ── MASTER SECTIONS WRAPPER ── */
.md-sections-wrapper{margin-top:1rem;}
.md-sections-header{display:flex;align-items:center;gap:.5rem;margin-bottom:.6rem;}
.md-sections-title{font-size:.82rem;font-weight:700;color:var(--slate-6);text-transform:uppercase;letter-spacing:.06em;}
`;

// ─── DIFF POPOVER ─────────────────────────────────────────────
function DiffPopover({ log, rect, onClose }) {
  const ref = useRef(null);
  React.useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  const fmtVal = (v) => {
    if (v === null || v === undefined) return null;
    try {
      return JSON.stringify(JSON.parse(v), null, 2);
    } catch {
      return String(v);
    }
  };
  const oldStr = fmtVal(log.old_value);
  const newStr = fmtVal(log.new_value);
  const top = Math.min((rect?.bottom || 100) + 6, window.innerHeight - 280);
  const left = Math.min(rect?.left || 100, window.innerWidth - 500);
  return (
    <>
      <div className="al-diff-overlay" onClick={onClose} />
      <div className="al-diff-popover" ref={ref} style={{ top, left }}>
        <div className="al-diff-title">
          <Ico n="diff" size={12} /> Perubahan Data — Record ID #{log.record_id}
        </div>
        <div className="al-diff-cols">
          <div className="al-diff-col">
            <span className="al-diff-col-label al-diff-col-label--old">
              Sebelum
            </span>
            <div className="al-diff-content">
              {oldStr ? oldStr : <span className="al-diff-null">— null —</span>}
            </div>
          </div>
          <div className="al-diff-col">
            <span className="al-diff-col-label al-diff-col-label--new">
              Sesudah
            </span>
            <div className="al-diff-content">
              {newStr ? newStr : <span className="al-diff-null">— null —</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── ACTIVITY LOG ─────────────────────────────────────────────
const LOGS_PER_PAGE = 5;
function ActivityLogSection({ logs, users }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("semua");
  const [page, setPage] = useState(1);
  const [diff, setDiff] = useState(null);
  const getUserById = (id) => users.find((u) => u.id === id);
  const filtered = [...logs]
    .filter((log) => {
      const user = getUserById(log.user_id);
      const q = search.toLowerCase();
      const matchQ =
        (user?.name || "").toLowerCase().includes(q) ||
        log.action_type.toLowerCase().includes(q) ||
        log.table_name.toLowerCase().includes(q) ||
        (log.ip_address || "").includes(q);
      const matchA =
        filterAction === "semua" || log.action_type === filterAction;
      return matchQ && matchA;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const totalPages = Math.max(1, Math.ceil(filtered.length / LOGS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * LOGS_PER_PAGE,
    page * LOGS_PER_PAGE,
  );
  React.useEffect(() => {
    setPage(1);
  }, [search, filterAction]);
  return (
    <div className="al-section">
      <div className="al-header" onClick={() => setOpen((o) => !o)}>
        <div className="al-header-left">
          <Ico n="activity" size={15} style={{ color: "#0f766e" }} />
          <span className="al-header-title">Log Aktivitas Pengguna</span>
          <span className="al-header-count">{logs.length} entri</span>
        </div>
        <Ico
          n={open ? "chevronUp" : "chevronDown"}
          size={14}
          style={{ color: "#0f766e" }}
        />
      </div>
      {open && (
        <div className="al-body">
          <div className="al-toolbar">
            <div className="al-search-wrap">
              <Ico n="search" size={12} style={{ color: "#94a3b8" }} />
              <input
                placeholder="Cari pegawai, aksi, tabel, IP…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="al-filter-wrap">
              <Ico n="filter" size={11} style={{ color: "#94a3b8" }} />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
              >
                <option value="semua">Semua Aksi</option>
                {Object.entries(ACTION_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <span
              style={{
                fontSize: ".72rem",
                color: "#64748b",
                marginLeft: "auto",
              }}
            >
              {filtered.length} log ditemukan
            </span>
          </div>
          <div className="al-table-wrap">
            <table className="al-table">
              <thead>
                <tr>
                  <th>
                    <Ico
                      n="clock"
                      size={10}
                      style={{ verticalAlign: "middle", marginRight: 3 }}
                    />{" "}
                    Waktu
                  </th>
                  <th>
                    <Ico
                      n="user"
                      size={10}
                      style={{ verticalAlign: "middle", marginRight: 3 }}
                    />{" "}
                    Pegawai
                  </th>
                  <th>
                    <Ico
                      n="activity"
                      size={10}
                      style={{ verticalAlign: "middle", marginRight: 3 }}
                    />{" "}
                    Aksi
                  </th>
                  <th>
                    <Ico
                      n="database"
                      size={10}
                      style={{ verticalAlign: "middle", marginRight: 3 }}
                    />{" "}
                    Tabel
                  </th>
                  <th>Record ID</th>
                  <th>Perubahan</th>
                  <th>
                    <Ico
                      n="globe"
                      size={10}
                      style={{ verticalAlign: "middle", marginRight: 3 }}
                    />{" "}
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="al-empty">
                      Tidak ada log yang cocok
                    </td>
                  </tr>
                ) : (
                  paginated.map((log) => {
                    const user = getUserById(log.user_id);
                    const ac = ACTION_CONFIG[log.action_type] || {
                      label: log.action_type,
                      color: "#64748b",
                      bg: "#f1f5f9",
                    };
                    const d = new Date(log.created_at);
                    const dateStr = d.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });
                    const timeStr = d.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    });
                    const hasDiff =
                      log.old_value !== null || log.new_value !== null;
                    return (
                      <tr key={log.log_id}>
                        <td>
                          <div className="al-timestamp-date">{dateStr}</div>
                          <div className="al-timestamp-time">{timeStr}</div>
                        </td>
                        <td>
                          {user ? (
                            <div className="al-user-cell">
                              <div
                                className={`um-avatar um-avatar--${user.role_code === "superadmin" ? "purple" : "blue"}`}
                                style={{
                                  width: 24,
                                  height: 24,
                                  fontSize: ".63rem",
                                }}
                              >
                                {getInitials(user.name)}
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontSize: ".74rem",
                                    fontWeight: 600,
                                    color: "#1e293b",
                                  }}
                                >
                                  {user.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: ".64rem",
                                    color: "#94a3b8",
                                  }}
                                >
                                  ID #{log.user_id}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span
                              style={{ fontSize: ".72rem", color: "#94a3b8" }}
                            >
                              ID #{log.user_id}
                            </span>
                          )}
                        </td>
                        <td>
                          <span
                            className="al-action-badge"
                            style={{ color: ac.color, background: ac.bg }}
                          >
                            {ac.label}
                          </span>
                        </td>
                        <td>
                          <span className="al-table-name">
                            {log.table_name}
                          </span>
                        </td>
                        <td>
                          <span className="al-record-id">#{log.record_id}</span>
                        </td>
                        <td>
                          {hasDiff ? (
                            <button
                              className="al-diff-btn"
                              onClick={(e) =>
                                setDiff({
                                  log,
                                  rect: e.currentTarget.getBoundingClientRect(),
                                })
                              }
                            >
                              <Ico n="diff" size={11} /> Lihat
                            </button>
                          ) : (
                            <span
                              style={{ fontSize: ".68rem", color: "#cbd5e1" }}
                            >
                              —
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="al-ip">{log.ip_address || "—"}</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            total={filtered.length}
            perPage={LOGS_PER_PAGE}
            onPageChange={setPage}
            accentColor="#0f766e"
            accentBg="#ccfbf1"
          />
        </div>
      )}
      {diff && (
        <DiffPopover
          log={diff.log}
          rect={diff.rect}
          onClose={() => setDiff(null)}
        />
      )}
    </div>
  );
}

// ─── MASTER DATA MODAL ────────────────────────────────────────
function MdModal({ title, iconName, iconColor, fields, onClose, onSave }) {
  const [form, setForm] = useState(() => {
    const init = {};
    fields.forEach((f) => {
      init[f.key] = f.defaultValue || "";
    });
    return init;
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    fields.forEach((f) => {
      if (f.required && !form[f.key]?.trim()) e[f.key] = "Wajib diisi";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
  };

  return (
    <div
      className="md-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="md-modal">
        <div className="md-modal-header">
          <div className="md-modal-title">
            <Ico n={iconName} size={13} style={{ color: iconColor }} />
            {title}
          </div>
          <button className="md-modal-close" onClick={onClose}>
            <Ico n="times" size={14} />
          </button>
        </div>
        <div className="md-modal-body">
          {fields.map((f) => (
            <div key={f.key} className="md-modal-field">
              <label>
                <Ico n={f.icon || "idCard"} size={11} /> {f.label}{" "}
                {f.required && <span style={{ color: "#dc2626" }}>*</span>}
              </label>
              {f.type === "select" ? (
                <select
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                  className={errors[f.key] ? "md-modal-field-error" : ""}
                  disabled={f.disabled}
                >
                  <option value="">{f.placeholder || "-- Pilih --"}</option>
                  {(f.options || []).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type || "text"}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                  placeholder={f.placeholder}
                  className={errors[f.key] ? "md-modal-field-error" : ""}
                  disabled={f.disabled}
                />
              )}
              {errors[f.key] && (
                <span className="md-modal-err">{errors[f.key]}</span>
              )}
              {f.hint && (
                <span style={{ fontSize: ".68rem", color: "#94a3b8" }}>
                  {f.hint}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="md-modal-footer">
          <button className="um-btn um-btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button className="um-btn um-btn-primary" onClick={handleSave}>
            <Ico n="check" size={12} /> Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DELETE CONFIRM MODAL ─────────────────────────────────────
function MdDeleteModal({ itemName, onClose, onConfirm }) {
  return (
    <div
      className="md-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="md-modal" style={{ maxWidth: 380 }}>
        <div
          className="md-modal-body"
          style={{ textAlign: "center", paddingTop: "1.25rem" }}
        >
          <div
            className="md-del-confirm-icon"
            style={{ background: "#fee2e2", color: "#dc2626" }}
          >
            <Ico n="trash" size={20} />
          </div>
          <div
            style={{
              fontSize: ".9rem",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: ".35rem",
            }}
          >
            Hapus Data?
          </div>
          <div style={{ fontSize: ".8rem", color: "#64748b" }}>
            <strong>{itemName}</strong> akan dihapus secara permanen.
          </div>
        </div>
        <div className="md-modal-footer" style={{ justifyContent: "center" }}>
          <button className="um-btn um-btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button
            className="um-btn um-btn-danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <Ico n="trash" size={12} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ENTITY MANAGEMENT SECTION ───────────────────────────────
const MD_PER_PAGE = 5;

function EntitySection({ entityList, setEntityList }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const filtered = entityList.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.entity_code.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / MD_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * MD_PER_PAGE,
    page * MD_PER_PAGE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search]);

  const handleAdd = async (form) => {
    try {
      const res = await masterDataAPI.addEntity({
        entity_code: form.entity_code.trim().toUpperCase(),
        name: form.name.trim(),
      });
      if (res.data?.success) {
        setEntityList((prev) => [...prev, res.data.data]);
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menambahkan entitas: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (form) => {
    try {
      const res = await masterDataAPI.updateEntity(modal.item.entity_code, {
        name: form.name.trim(),
      });
      if (res.data?.success) {
        setEntityList((prev) =>
          prev.map((e) =>
            e.entity_code === modal.item.entity_code ? res.data.data : e,
          ),
        );
        setModal(null);
      }
    } catch (err) {
      alert("Gagal memperbarui entitas: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (code) => {
    try {
      const res = await masterDataAPI.deleteEntity(code);
      if (res.data?.success) {
        setEntityList((prev) => prev.filter((e) => e.entity_code !== code));
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menghapus entitas: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="md-section md-section--entity">
      <div
        className="md-header md-header--entity"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="md-header-left">
          <Ico n="building" size={15} style={{ color: "#4338ca" }} />
          <span className="md-header-title--entity">Manajemen Entitas</span>
          <span className="md-header-count--entity">
            {entityList.length} entitas
          </span>
        </div>
        <Ico
          n={open ? "chevronUp" : "chevronDown"}
          size={14}
          style={{ color: "#4338ca" }}
        />
      </div>
      {open && (
        <div className="md-body">
          <div className={`md-toolbar md-toolbar--entity`}>
            <div className="md-search-wrap">
              <Ico n="search" size={12} style={{ color: "#94a3b8" }} />
              <input
                placeholder="Cari kode atau nama entitas…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </div>
            <span style={{ fontSize: ".72rem", color: "#64748b" }}>
              {filtered.length} ditemukan
            </span>
            <button
              className="md-add-btn md-add-btn--entity"
              onClick={() => setModal({ type: "add" })}
            >
              <Ico n="plus" size={12} /> Tambah Entitas
            </button>
          </div>
          <div className="md-table-wrap">
            <table className="md-table md-table--entity">
              <thead>
                <tr>
                  <th>Kode Entitas</th>
                  <th>Nama Entitas</th>
                  <th style={{ width: 70, textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="md-empty">
                      Tidak ada entitas ditemukan
                    </td>
                  </tr>
                ) : (
                  paginated.map((e) => (
                    <tr key={e.entity_code}>
                      <td>
                        <span className="md-code-badge md-code-badge--entity">
                          {e.entity_code}
                        </span>
                      </td>
                      <td>
                        <span className="md-name-text">{e.name}</span>
                      </td>
                      <td>
                        <div
                          className="md-action-row"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            className="md-icon-btn md-icon-btn--edit"
                            title="Edit"
                            onClick={() => setModal({ type: "edit", item: e })}
                          >
                            <Ico n="edit" size={11} />
                          </button>
                          <button
                            className="md-icon-btn md-icon-btn--del"
                            title="Hapus"
                            onClick={() =>
                              setModal({ type: "delete", item: e })
                            }
                          >
                            <Ico n="trash" size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            total={filtered.length}
            perPage={MD_PER_PAGE}
            onPageChange={setPage}
            accentColor="#4338ca"
            accentBg="#eef2ff"
          />
        </div>
      )}

      {modal?.type === "add" && (
        <MdModal
          title="Tambah Entitas Baru"
          iconName="building"
          iconColor="#4338ca"
          fields={[
            {
              key: "entity_code",
              label: "Kode Entitas",
              icon: "idCard",
              placeholder: "Contoh: PMT",
              required: true,
              hint: "Kode unik singkatan entitas (akan diubah ke UPPERCASE)",
            },
            {
              key: "name",
              label: "Nama Entitas",
              icon: "building",
              placeholder: "Contoh: PT Pelindo Multi Terminal",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleAdd}
        />
      )}
      {modal?.type === "edit" && (
        <MdModal
          title={`Edit Entitas — ${modal.item.entity_code}`}
          iconName="building"
          iconColor="#4338ca"
          fields={[
            {
              key: "entity_code",
              label: "Kode Entitas",
              icon: "idCard",
              defaultValue: modal.item.entity_code,
              placeholder: "Kode entitas",
              required: false,
              disabled: true,
              hint: "Kode entitas tidak dapat diubah",
            },
            {
              key: "name",
              label: "Nama Entitas",
              icon: "building",
              defaultValue: modal.item.name,
              placeholder: "Nama entitas",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleEdit}
        />
      )}
      {modal?.type === "delete" && (
        <MdDeleteModal
          itemName={`${modal.item.entity_code} — ${modal.item.name}`}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.item.entity_code)}
        />
      )}
    </div>
  );
}

// ─── BRANCH MANAGEMENT SECTION ────────────────────────────────
function BranchSection({ branchList, setBranchList, entityList }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterEntity, setFilterEntity] = useState("semua");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const filtered = branchList.filter((b) => {
    const q = search.toLowerCase();
    const matchQ =
      b.name.toLowerCase().includes(q) ||
      b.branch_code.toLowerCase().includes(q);
    const matchE = filterEntity === "semua" || b.entity_code === filterEntity;
    return matchQ && matchE;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / MD_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * MD_PER_PAGE,
    page * MD_PER_PAGE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, filterEntity]);

  const getEntityName = (code) =>
    entityList.find((e) => e.entity_code === code)?.name || code;

  const handleAdd = async (form) => {
    try {
      const code = form.branch_code.trim().toUpperCase();
      const res = await masterDataAPI.addBranch({
        branch_code: code,
        entity_code: form.entity_code,
        name: form.name.trim(),
        address: form.address,
        phone: form.phone,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        is_active: form.is_active === 'true' || form.is_active === true,
      });
      if (res.data?.success) {
        setBranchList((prev) => [...prev, res.data.data]);
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menambahkan cabang: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (form) => {
    try {
      const res = await masterDataAPI.updateBranch(modal.item.branch_code, {
        name: form.name.trim(),
        entity_code: form.entity_code,
        address: form.address,
        phone: form.phone,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        is_active: form.is_active === 'true' || form.is_active === true,
      });
      if (res.data?.success) {
        setBranchList((prev) =>
          prev.map((b) =>
            b.branch_code === modal.item.branch_code ? res.data.data : b,
          ),
        );
        setModal(null);
      }
    } catch (err) {
      alert("Gagal memperbarui cabang: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (code) => {
    try {
      const res = await masterDataAPI.deleteBranch(code);
      if (res.data?.success) {
        setBranchList((prev) => prev.filter((b) => b.branch_code !== code));
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menghapus cabang: " + (err.response?.data?.message || err.message));
    }
  };

  const entityOptions = entityList.map((e) => ({
    value: e.entity_code,
    label: `${e.entity_code} — ${e.name}`,
  }));

  return (
    <div className="md-section md-section--branch">
      <div
        className="md-header md-header--branch"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="md-header-left">
          <Ico n="mapPin" size={15} style={{ color: "#1d4ed8" }} />
          <span className="md-header-title--branch">
            Manajemen Cabang / Branch
          </span>
          <span className="md-header-count--branch">
            {branchList.length} cabang
          </span>
        </div>
        <Ico
          n={open ? "chevronUp" : "chevronDown"}
          size={14}
          style={{ color: "#1d4ed8" }}
        />
      </div>
      {open && (
        <div className="md-body">
          <div className={`md-toolbar md-toolbar--branch`}>
            <div className="md-search-wrap">
              <Ico n="search" size={12} style={{ color: "#94a3b8" }} />
              <input
                placeholder="Cari kode atau nama cabang…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="md-filter-wrap">
              <Ico n="building" size={11} style={{ color: "#94a3b8" }} />
              <select
                value={filterEntity}
                onChange={(e) => setFilterEntity(e.target.value)}
              >
                <option value="semua">Semua Entitas</option>
                {entityList.map((e) => (
                  <option key={e.entity_code} value={e.entity_code}>
                    {e.entity_code}
                  </option>
                ))}
              </select>
            </div>
            <span style={{ fontSize: ".72rem", color: "#64748b" }}>
              {filtered.length} ditemukan
            </span>
            <button
              className="md-add-btn md-add-btn--branch"
              onClick={() => setModal({ type: "add" })}
            >
              <Ico n="plus" size={12} /> Tambah Cabang
            </button>
          </div>
          <div className="md-table-wrap">
            <table className="md-table md-table--branch">
              <thead>
                <tr>
                  <th>Kode Cabang</th>
                  <th>Nama Cabang</th>
                  <th>Entitas</th>
                  <th style={{ width: 70, textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="md-empty">
                      Tidak ada cabang ditemukan
                    </td>
                  </tr>
                ) : (
                  paginated.map((b) => (
                    <tr key={b.branch_code}>
                      <td>
                        <span className="md-code-badge md-code-badge--branch">
                          {b.branch_code}
                        </span>
                      </td>
                      <td>
                        <span className="md-name-text">{b.name}</span>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <span
                            className="md-code-badge md-code-badge--entity"
                            style={{ width: "fit-content" }}
                          >
                            {b.entity_code}
                          </span>
                          <span
                            style={{ fontSize: ".67rem", color: "#64748b" }}
                          >
                            {getEntityName(b.entity_code)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          className="md-action-row"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            className="md-icon-btn md-icon-btn--edit"
                            title="Edit"
                            onClick={() => setModal({ type: "edit", item: b })}
                          >
                            <Ico n="edit" size={11} />
                          </button>
                          <button
                            className="md-icon-btn md-icon-btn--del"
                            title="Hapus"
                            onClick={() =>
                              setModal({ type: "delete", item: b })
                            }
                          >
                            <Ico n="trash" size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            total={filtered.length}
            perPage={MD_PER_PAGE}
            onPageChange={setPage}
            accentColor="#1d4ed8"
            accentBg="#dbeafe"
          />
        </div>
      )}

      {modal?.type === "add" && (
        <MdModal
          title="Tambah Cabang Baru"
          iconName="mapPin"
          iconColor="#1d4ed8"
          fields={[
            {
              key: "entity_code",
              label: "Entitas",
              icon: "building",
              type: "select",
              options: entityOptions,
              placeholder: "-- Pilih Entitas --",
              required: true,
            },
            {
              key: "branch_code",
              label: "Kode Cabang",
              icon: "idCard",
              placeholder: "Contoh: PMT-BDG",
              required: true,
              hint: "Kode unik cabang (akan diubah ke UPPERCASE)",
            },
            {
              key: "name",
              label: "Nama Cabang",
              icon: "mapPin",
              placeholder: "Contoh: Bandung",
              required: true,
            },
            {
              key: "address",
              label: "Alamat",
              icon: "mapPin",
              placeholder: "Alamat cabang",
              required: false,
            },
            {
              key: "phone",
              label: "No. Telepon",
              icon: "phone",
              placeholder: "08xxxxxxxxxx",
              required: false,
            },
            {
              key: "longitude",
              label: "Longitude",
              icon: "globe",
              type: "number",
              placeholder: "Contoh: 106.8229",
              required: false,
            },
            {
              key: "latitude",
              label: "Latitude",
              icon: "globe",
              type: "number",
              placeholder: "Contoh: -6.1944",
              required: false,
            },
            {
              key: "is_active",
              label: "Status Aktif",
              icon: "activity",
              type: "select",
              options: [
                 { value: "true", label: "Aktif" },
                 { value: "false", label: "Nonaktif" }
              ],
              defaultValue: "true",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleAdd}
        />
      )}
      {modal?.type === "edit" && (
        <MdModal
          title={`Edit Cabang — ${modal.item.branch_code}`}
          iconName="mapPin"
          iconColor="#1d4ed8"
          fields={[
            {
              key: "entity_code",
              label: "Entitas",
              icon: "building",
              type: "select",
              options: entityOptions,
              defaultValue: modal.item.entity_code,
              required: true,
            },
            {
              key: "branch_code",
              label: "Kode Cabang",
              icon: "idCard",
              defaultValue: modal.item.branch_code,
              required: false,
              disabled: true,
              hint: "Kode cabang tidak dapat diubah",
            },
            {
              key: "name",
              label: "Nama Cabang",
              icon: "mapPin",
              defaultValue: modal.item.name,
              placeholder: "Nama cabang",
              required: true,
            },
            {
              key: "address",
              label: "Alamat",
              icon: "mapPin",
              defaultValue: modal.item.address || "",
              placeholder: "Alamat cabang",
              required: false,
            },
            {
              key: "phone",
              label: "No. Telepon",
              icon: "phone",
              defaultValue: modal.item.phone || "",
              placeholder: "08xxxxxxxxxx",
              required: false,
            },
            {
              key: "longitude",
              label: "Longitude",
              icon: "globe",
              type: "number",
              defaultValue: modal.item.longitude || "",
              placeholder: "Contoh: 106.8229",
              required: false,
            },
            {
              key: "latitude",
              label: "Latitude",
              icon: "globe",
              type: "number",
              defaultValue: modal.item.latitude || "",
              placeholder: "Contoh: -6.1944",
              required: false,
            },
            {
              key: "is_active",
              label: "Status Aktif",
              icon: "activity",
              type: "select",
              options: [
                 { value: "true", label: "Aktif" },
                 { value: "false", label: "Nonaktif" }
              ],
              defaultValue: modal.item.is_active !== false ? "true" : "false",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleEdit}
        />
      )}
      {modal?.type === "delete" && (
        <MdDeleteModal
          itemName={`${modal.item.branch_code} — ${modal.item.name}`}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.item.branch_code)}
        />
      )}
    </div>
  );
}

// ─── DIVISION MANAGEMENT SECTION ─────────────────────────────
function DivisionSection({
  divisionList,
  setDivisionList,
  entityList,
  branchList,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterEntity, setFilterEntity] = useState("semua");
  const [filterBranch, setFilterBranch] = useState("semua");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const availableBranches =
    filterEntity === "semua"
      ? branchList
      : branchList.filter((b) => b.entity_code === filterEntity);

  const filtered = divisionList.filter((d) => {
    const q = search.toLowerCase();
    const matchQ =
      d.name.toLowerCase().includes(q) ||
      d.division_code.toLowerCase().includes(q);
    const matchE = filterEntity === "semua" || d.entity_code === filterEntity;
    const matchB = filterBranch === "semua" || d.branch_code === filterBranch;
    return matchQ && matchE && matchB;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / MD_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * MD_PER_PAGE,
    page * MD_PER_PAGE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, filterEntity, filterBranch]);

  const getEntityName = (code) =>
    entityList.find((e) => e.entity_code === code)?.name || code;
  const getBranchName = (code) =>
    branchList.find((b) => b.branch_code === code)?.name || code;

  const handleAdd = async (form) => {
    try {
      const code = form.division_code.trim().toUpperCase();
      const res = await masterDataAPI.addDivision({
        division_code: code,
        branch_code: form.branch_code,
        name: form.name.trim(),
      });
      if (res.data?.success) {
        setDivisionList((prev) => [...prev, res.data.data]);
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menambahkan divisi: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (form) => {
    try {
      const res = await masterDataAPI.updateDivision(modal.item.division_code, {
        name: form.name.trim(),
        branch_code: form.branch_code,
      });
      if (res.data?.success) {
        setDivisionList((prev) =>
          prev.map((d) =>
            d.division_code === modal.item.division_code ? res.data.data : d,
          ),
        );
        setModal(null);
      }
    } catch (err) {
      alert("Gagal memperbarui divisi: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (code) => {
    try {
      const res = await masterDataAPI.deleteDivision(code);
      if (res.data?.success) {
        setDivisionList((prev) => prev.filter((d) => d.division_code !== code));
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menghapus divisi: " + (err.response?.data?.message || err.message));
    }
  };

  const entityOptions = entityList.map((e) => ({
    value: e.entity_code,
    label: `${e.entity_code} — ${e.name}`,
  }));
  const branchOptions = branchList.map((b) => ({
    value: b.branch_code,
    label: `${b.branch_code} — ${b.name}`,
  }));
  const editBranchOptions = modal?.item
    ? branchList
        .filter(
          (b) =>
            b.entity_code ===
            branchList.find((x) => x.branch_code === modal.item.branch_code)
              ?.entity_code,
        )
        .map((b) => ({
          value: b.branch_code,
          label: `${b.branch_code} — ${b.name}`,
        }))
    : branchOptions;

  return (
    <div className="md-section md-section--division">
      <div
        className="md-header md-header--division"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="md-header-left">
          <Ico n="sitemap" size={15} style={{ color: "#15803d" }} />
          <span className="md-header-title--division">Manajemen Divisi</span>
          <span className="md-header-count--division">
            {divisionList.length} divisi
          </span>
        </div>
        <Ico
          n={open ? "chevronUp" : "chevronDown"}
          size={14}
          style={{ color: "#15803d" }}
        />
      </div>
      {open && (
        <div className="md-body">
          <div
            className={`md-toolbar md-toolbar--division`}
            style={{ flexWrap: "wrap", gap: ".4rem" }}
          >
            <div className="md-search-wrap">
              <Ico n="search" size={12} style={{ color: "#94a3b8" }} />
              <input
                placeholder="Cari kode atau nama divisi…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="md-filter-wrap">
              <Ico n="building" size={11} style={{ color: "#94a3b8" }} />
              <select
                value={filterEntity}
                onChange={(e) => {
                  setFilterEntity(e.target.value);
                  setFilterBranch("semua");
                }}
              >
                <option value="semua">Semua Entitas</option>
                {entityList.map((e) => (
                  <option key={e.entity_code} value={e.entity_code}>
                    {e.entity_code}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="md-filter-wrap"
              style={{
                opacity: filterEntity === "semua" ? 0.5 : 1,
                pointerEvents: filterEntity === "semua" ? "none" : "auto",
              }}
            >
              <Ico n="mapPin" size={11} style={{ color: "#94a3b8" }} />
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                disabled={filterEntity === "semua"}
              >
                <option value="semua">
                  {filterEntity === "semua"
                    ? "Pilih entitas dulu"
                    : "Semua Cabang"}
                </option>
                {availableBranches.map((b) => (
                  <option key={b.branch_code} value={b.branch_code}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <span style={{ fontSize: ".72rem", color: "#64748b" }}>
              {filtered.length} ditemukan
            </span>
            <button
              className="md-add-btn md-add-btn--division"
              onClick={() => setModal({ type: "add" })}
            >
              <Ico n="plus" size={12} /> Tambah Divisi
            </button>
          </div>
          <div className="md-table-wrap">
            <table className="md-table md-table--division">
              <thead>
                <tr>
                  <th>Kode Divisi</th>
                  <th>Nama Divisi</th>
                  <th>Cabang</th>
                  <th style={{ width: 70, textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="md-empty">
                      Tidak ada divisi ditemukan
                    </td>
                  </tr>
                ) : (
                  paginated.map((d) => (
                    <tr key={d.division_code}>
                      <td>
                        <span className="md-code-badge md-code-badge--division">
                          {d.division_code}
                        </span>
                      </td>
                      <td>
                        <span className="md-name-text">{d.name}</span>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <span
                            className="md-code-badge md-code-badge--branch"
                            style={{ width: "fit-content" }}
                          >
                            {d.branch_code}
                          </span>
                          <span
                            style={{ fontSize: ".67rem", color: "#64748b" }}
                          >
                            {getBranchName(d.branch_code)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          className="md-action-row"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            className="md-icon-btn md-icon-btn--edit"
                            title="Edit"
                            onClick={() => setModal({ type: "edit", item: d })}
                          >
                            <Ico n="edit" size={11} />
                          </button>
                          <button
                            className="md-icon-btn md-icon-btn--del"
                            title="Hapus"
                            onClick={() =>
                              setModal({ type: "delete", item: d })
                            }
                          >
                            <Ico n="trash" size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            total={filtered.length}
            perPage={MD_PER_PAGE}
            onPageChange={setPage}
            accentColor="#15803d"
            accentBg="#dcfce7"
          />
        </div>
      )}

      {modal?.type === "add" && (
        <MdModal
          title="Tambah Divisi Baru"
          iconName="sitemap"
          iconColor="#15803d"
          fields={[
            {
              key: "branch_code",
              label: "Cabang / Branch",
              icon: "mapPin",
              type: "select",
              options: branchOptions,
              placeholder: "-- Pilih Cabang --",
              required: true,
            },
            {
              key: "division_code",
              label: "Kode Divisi",
              icon: "idCard",
              placeholder: "Contoh: PMT-JKT-MKT",
              required: true,
              hint: "Kode unik divisi (akan diubah ke UPPERCASE)",
            },
            {
              key: "name",
              label: "Nama Divisi",
              icon: "sitemap",
              placeholder: "Contoh: Marketing",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleAdd}
        />
      )}
      {modal?.type === "edit" && (
        <MdModal
          title={`Edit Divisi — ${modal.item.division_code}`}
          iconName="sitemap"
          iconColor="#15803d"
          fields={[
            {
              key: "branch_code",
              label: "Cabang / Branch",
              icon: "mapPin",
              type: "select",
              options: editBranchOptions,
              defaultValue: modal.item.branch_code,
              required: true,
            },
            {
              key: "division_code",
              label: "Kode Divisi",
              icon: "idCard",
              defaultValue: modal.item.division_code,
              required: false,
              disabled: true,
              hint: "Kode divisi tidak dapat diubah",
            },
            {
              key: "name",
              label: "Nama Divisi",
              icon: "sitemap",
              defaultValue: modal.item.name,
              placeholder: "Nama divisi",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleEdit}
        />
      )}
      {modal?.type === "delete" && (
        <MdDeleteModal
          itemName={`${modal.item.division_code} — ${modal.item.name}`}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.item.division_code)}
        />
      )}
    </div>
  );
}

// ─── ROLE MANAGEMENT SECTION ───────────────────────────────
function RoleSection({ roleList, setRoleList }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const filtered = roleList.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role_code.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / MD_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * MD_PER_PAGE,
    page * MD_PER_PAGE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search]);

  const handleAdd = async (form) => {
    try {
      const res = await masterDataAPI.addRole({
        role_code: form.role_code.trim().toUpperCase(),
        name: form.name.trim(),
      });
      if (res.data?.success) {
        setRoleList((prev) => [...prev, res.data.data]);
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menambahkan role: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (form) => {
    try {
      const res = await masterDataAPI.updateRole(modal.item.role_code, {
        name: form.name.trim(),
      });
      if (res.data?.success) {
        setRoleList((prev) =>
          prev.map((e) =>
            e.role_code === modal.item.role_code ? res.data.data : e,
          ),
        );
        setModal(null);
      }
    } catch (err) {
      alert("Gagal memperbarui role: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (code) => {
    try {
      const res = await masterDataAPI.deleteRole(code);
      if (res.data?.success) {
        setRoleList((prev) => prev.filter((e) => e.role_code !== code));
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menghapus role: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="md-section md-section--role" style={{ borderLeft: "4px solid #f59e0b" }}>
      <div
        className="md-header md-header--role"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="md-header-left">
          <Ico n="shield" size={15} style={{ color: "#f59e0b" }} />
          <span className="md-header-title--role" style={{ color: "#b45309", fontWeight: 600 }}>Manajemen Role</span>
          <span className="md-header-count--role" style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: 600 }}>
            {roleList.length} role
          </span>
        </div>
        <Ico
          n={open ? "chevronUp" : "chevronDown"}
          size={14}
          style={{ color: "#f59e0b" }}
        />
      </div>
      {open && (
        <div className="md-body">
          <div className="md-toolbar" style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "12px" }}>
            <div className="md-search-wrap">
              <Ico n="search" size={12} style={{ color: "#94a3b8" }} />
              <input
                placeholder="Cari kode atau nama role…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span style={{ fontSize: ".72rem", color: "#64748b" }}>
              {filtered.length} ditemukan
            </span>
            <button
              className="md-add-btn md-add-btn--role"
              style={{ background: "#f59e0b", color: "#fff" }}
              onClick={() => setModal({ type: "add" })}
            >
              <Ico n="plus" size={12} /> Tambah Role
            </button>
          </div>
          <div className="md-table-wrap">
            <table className="md-table md-table--role">
              <thead>
                <tr>
                  <th>Kode Role</th>
                  <th>Nama Role</th>
                  <th style={{ width: 70, textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="md-empty">
                      Tidak ada role ditemukan
                    </td>
                  </tr>
                ) : (
                  paginated.map((e) => (
                    <tr key={e.role_code}>
                      <td>
                        <span className="md-code-badge md-code-badge--role" style={{ background: "#fef3c7", color: "#b45309" }}>
                          {e.role_code}
                        </span>
                      </td>
                      <td>
                        <span className="md-name-text">{e.name}</span>
                      </td>
                      <td>
                        <div
                          className="md-action-row"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            className="md-icon-btn md-icon-btn--edit"
                            title="Edit"
                            onClick={() => setModal({ type: "edit", item: e })}
                          >
                            <Ico n="edit" size={11} />
                          </button>
                          <button
                            className="md-icon-btn md-icon-btn--del"
                            title="Hapus"
                            onClick={() =>
                              setModal({ type: "delete", item: e })
                            }
                          >
                            <Ico n="trash" size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            total={filtered.length}
            perPage={MD_PER_PAGE}
            onPageChange={setPage}
            accentColor="#f59e0b"
            accentBg="#fef3c7"
          />
        </div>
      )}

      {modal?.type === "add" && (
        <MdModal
          title="Tambah Role Baru"
          iconName="shield"
          iconColor="#f59e0b"
          fields={[
            {
              key: "role_code",
              label: "Kode Role",
              icon: "idCard",
              placeholder: "Contoh: ADMIN",
              required: true,
              hint: "Kode unik role (akan diubah ke UPPERCASE)",
            },
            {
              key: "name",
              label: "Nama Role",
              icon: "shield",
              placeholder: "Contoh: Administrator",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleAdd}
        />
      )}
      {modal?.type === "edit" && (
        <MdModal
          title={`Edit Role — ${modal.item.role_code}`}
          iconName="shield"
          iconColor="#f59e0b"
          fields={[
            {
              key: "role_code",
              label: "Kode Role",
              icon: "idCard",
              defaultValue: modal.item.role_code,
              placeholder: "Kode role",
              required: false,
              disabled: true,
              hint: "Kode role tidak dapat diubah",
            },
            {
              key: "name",
              label: "Nama Role",
              icon: "shield",
              defaultValue: modal.item.name,
              placeholder: "Nama role",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleEdit}
        />
      )}
      {modal?.type === "delete" && (
        <MdDeleteModal
          itemName={`${modal.item.role_code} — ${modal.item.name}`}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.item.role_code)}
        />
      )}
    </div>
  );
}

      

function UserFormView({
  user,
  onBack,
  onSave,
  entityList,
  branchList,
  divisionList,
}) {
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
          division_code: user.division_code || "",
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
          division_code: "",
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
    if (!form.division_code) e.division_code = "Wajib dipilih";
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
    onBack();
  };
  return (
    <div className="um-form-root">
      <style>{css}</style>
      <div
        style={{
          marginBottom: ".9rem",
          display: "flex",
          alignItems: "center",
          gap: ".65rem",
        }}
      >
        <button className="um-back-btn" onClick={onBack}>
          <Ico n="arrowLeft" size={12} /> Kembali
        </button>
        <div>
          <h1 className="um-title">
            {isEdit ? "Edit User" : "Tambah User Baru"}
          </h1>
        </div>
      </div>
      <div className="um-form-card">
        <div className="um-form-group">
          <label>
            <Ico n="user" size={11} /> Nama Lengkap{" "}
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
              <Ico n="idCard" size={11} /> NIP <span className="um-req">*</span>
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
              <Ico n="user" size={11} /> Username{" "}
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
            <Ico n="phone" size={11} /> No. Telepon{" "}
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
            <Ico n="shield" size={11} /> Role / Peran{" "}
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
                <Ico n={cfg.iconName} size={12} /> {cfg.label}
              </label>
            ))}
          </div>
        </div>
        <div className="um-form-group">
          <label>
            <Ico n="building" size={11} /> Entitas{" "}
            <span className="um-req">*</span>
          </label>
          <select
            value={form.entity_code}
            onChange={(e) =>
              setForm({
                ...form,
                entity_code: e.target.value,
                branch_code: "",
                division_code: "",
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
            <Ico n="mapPin" size={11} /> Cabang / Branch{" "}
            <span className="um-req">*</span>
          </label>
          <select
            value={form.branch_code}
            onChange={(e) =>
              setForm({
                ...form,
                branch_code: e.target.value,
                division_code: "",
              })
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
            <Ico n="idCard" size={11} /> Divisi{" "}
            <span className="um-req">*</span>
          </label>
          <select
            value={form.division_code}
            onChange={(e) =>
              setForm({ ...form, division_code: e.target.value })
            }
            className={errors.division_code ? "um-input-error" : ""}
            disabled={!form.branch_code}
          >
            <option value="">-- Pilih Divisi --</option>
            {divisionList
              .filter((d) => d.branch_code === form.branch_code)
              .map((d) => (
                <option key={d.division_code} value={d.division_code}>
                  {d.name}
                </option>
              ))}
          </select>
          {!form.branch_code && (
            <span className="um-hint">Pilih branch terlebih dahulu</span>
          )}
          {errors.division_code && (
            <span className="um-error">{errors.division_code}</span>
          )}
        </div>
        <div className="um-form-group">
          <label>
            <Ico n="envelope" size={11} /> Email{" "}
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
              <Ico n="lock" size={11} />{" "}
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 8 karakter"
                className={errors.password ? "um-input-error" : ""}
              />
              <button
                type="button"
                className="um-pass-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                <Ico n={showPass ? "eyeSlash" : "eye"} size={13} />
              </button>
            </div>
            {errors.password && (
              <span className="um-error">{errors.password}</span>
            )}
          </div>
          <div className="um-form-group">
            <label>
              <Ico n="lock" size={11} /> Konfirmasi Password{" "}
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
                <Ico n={showConfirm ? "eyeSlash" : "eye"} size={13} />
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
              <Ico n="userCheck" size={12} /> Aktif
            </button>
            <button
              type="button"
              className={`um-status-btn ${!form.is_active ? "active-red" : ""}`}
              onClick={() => setForm({ ...form, is_active: false })}
            >
              <Ico n="userSlash" size={12} /> Nonaktif
            </button>
          </div>
        </div>
        <div className="um-form-footer">
          <button className="um-btn um-btn-secondary" onClick={onBack}>
            Batal
          </button>
          <button className="um-btn um-btn-primary" onClick={handleSave}>
            <Ico n="check" size={12} />{" "}
            {isEdit ? "Simpan Perubahan" : "Buat User"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ——— DETAIL VIEW ———
function DetailUserView({
  user,
  onBack,
  onEdit,
  onDelete,
  onReset,
  entityList,
  branchList,
  divisionList,
}) {
  if (!user) return null;
  const getEntityName = (code) =>
    entityList.find((e) => e.entity_code === code)?.name || code;
  const getBranchName = (code) =>
    branchList.find((b) => b.branch_code === code)?.name || code;
  const getDivisionName = (code) =>
    divisionList.find((d) => d.division_code === code)?.name || code;
  const rc = roleConfig[user.role_code] || roleConfig.user;
  return (
    <div className="um-detail-root">
      <style>{css}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: ".9rem",
          flexWrap: "wrap",
          gap: ".5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: ".65rem" }}>
          <button className="um-back-btn" onClick={onBack}>
            <Ico n="arrowLeft" size={12} /> Kembali
          </button>
          <h1 className="um-title">Detail User</h1>
        </div>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <button className="um-btn um-btn-warning" onClick={onReset}>
            <Ico n="key" size={12} /> Reset Password
          </button>
          <button className="um-btn um-btn-primary" onClick={onEdit}>
            <Ico n="edit" size={12} /> Edit User
          </button>
        </div>
      </div>
      <div className="um-detail-card">
        <div className="um-detail-card-header">
          <Ico n="user" size={13} /> Informasi Pengguna
        </div>
        <div className="um-detail-card-body">
          <div className="um-detail-profile">
            <div
              className={`um-avatar um-avatar--lg um-avatar--${user.role_code === "superadmin" ? "purple" : "blue"}`}
            >
              {getInitials(user.name)}
            </div>
            <div>
              <div className="um-detail-name">{user.name}</div>
              <div className="um-detail-badges">
                <span
                  className="um-role-badge"
                  style={{ color: rc.color, background: rc.bg }}
                >
                  <Ico n={rc.iconName} size={11} /> {rc.label}
                </span>
                <span
                  className="um-role-badge"
                  style={
                    user.is_active
                      ? { color: "#16a34a", background: "#dcfce7" }
                      : { color: "#64748b", background: "#f1f5f9" }
                  }
                >
                  <Ico
                    n={user.is_active ? "userCheck" : "userSlash"}
                    size={11}
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
              <span className="um-detail-label">Branch</span>
              <span className="um-detail-val">
                {getBranchName(user.branch_code)}
              </span>
            </div>
            <div className="um-detail-item">
              <span className="um-detail-label">Divisi</span>
              <span className="um-detail-val">
                {getDivisionName(user.division_code) || "—"}
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
        <div className="um-detail-actions">
          <button className="um-btn um-btn-danger" onClick={onDelete}>
            <Ico n="trash" size={12} /> Hapus User
          </button>
        </div>
      </div>
    </div>
  );
}

// ——— RESET VIEW ———
function ResetPassView({ user, onBack }) {
  const [done, setDone] = useState(false);
  if (!user) return null;
  return (
    <div className="um-confirm-root">
      <style>{css}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".65rem",
          marginBottom: ".9rem",
        }}
      >
        <button className="um-back-btn" onClick={onBack}>
          <Ico n="arrowLeft" size={12} /> Kembali
        </button>
        <h1 className="um-title">Reset Password</h1>
      </div>
      <div className="um-confirm-card">
        <div
          className={`um-confirm-icon ${done ? "um-confirm-icon--success" : "um-confirm-icon--warn"}`}
        >
          <Ico n={done ? "check" : "key"} size={22} />
        </div>
        <div className="um-confirm-title">
          {done ? "Password Berhasil Direset" : "Konfirmasi Reset Password"}
        </div>
        <div className="um-confirm-desc">
          {done ? (
            <>
              Link reset telah dikirim ke <strong>{user.email}</strong>.
            </>
          ) : (
            <>
              Reset password untuk <strong>{user.name}</strong>? Link reset akan
              dikirim ke <strong>{user.email}</strong>.
            </>
          )}
        </div>
        <div className="um-confirm-footer">
          {done ? (
            <button className="um-btn um-btn-primary" onClick={onBack}>
              <Ico n="check" size={12} /> Selesai
            </button>
          ) : (
            <>
              <button className="um-btn um-btn-secondary" onClick={onBack}>
                Batal
              </button>
              <button
                className="um-btn um-btn-warning"
                onClick={() => setDone(true)}
              >
                <Ico n="key" size={12} /> Kirim Link Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ——— DELETE VIEW ———
function DeleteUserView({ user, onBack, onConfirm }) {
  if (!user) return null;
  return (
    <div className="um-confirm-root">
      <style>{css}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".65rem",
          marginBottom: ".9rem",
        }}
      >
        <button className="um-back-btn" onClick={onBack}>
          <Ico n="arrowLeft" size={12} /> Kembali
        </button>
        <h1 className="um-title">Hapus User</h1>
      </div>
      <div className="um-confirm-card">
        <div className="um-confirm-icon um-confirm-icon--danger">
          <Ico n="trash" size={22} />
        </div>
        <div className="um-confirm-title">Hapus User?</div>
        <div className="um-confirm-desc">
          User <strong>{user.name}</strong> akan dihapus secara permanen.
          Tindakan ini tidak dapat dibatalkan.
        </div>
        <div className="um-confirm-footer">
          <button className="um-btn um-btn-secondary" onClick={onBack}>
            Batal
          </button>
          <button
            className="um-btn um-btn-danger"
            onClick={() => {
              onConfirm(user.id);
              onBack();
            }}
          >
            <Ico n="trash" size={12} /> Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ——— DROPDOWN COMPONENT ———
function ActionDropdown({ user, onDetail, onEdit, onReset, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  return (
    <div className="um-dd-wrap" ref={ref}>
      <button
        className="um-dd-btn"
        onClick={() => setOpen((o) => !o)}
        title="Aksi"
      >
        <Ico n="moreVertical" size={14} />
      </button>
      {open && (
        <div className="um-dd-menu">
          <div
            className="um-dd-item"
            onClick={() => {
              setOpen(false);
              onDetail(user);
            }}
          >
            <Ico n="eye" size={12} /> Detail
          </div>
          <div
            className="um-dd-item"
            onClick={() => {
              setOpen(false);
              onEdit(user);
            }}
          >
            <Ico n="edit" size={12} /> Edit
          </div>
          <div
            className="um-dd-item"
            onClick={() => {
              setOpen(false);
              onReset(user);
            }}
          >
            <Ico n="key" size={12} /> Reset Password
          </div>
          <div className="um-dd-sep" />
          <div
            className="um-dd-item um-dd-item--danger"
            onClick={() => {
              setOpen(false);
              onDelete(user);
            }}
          >
            <Ico n="trash" size={12} /> Hapus
          </div>
        </div>
      )}
    </div>
  );
}


// --- MAIN COMPONENT ---
const USERS_PER_PAGE = 5;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  const [entityList, setEntityList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entRes, brRes, divRes, roleRes, userRes, logRes] = await Promise.all([
          masterDataAPI.getEntities(),
          masterDataAPI.getBranches(),
          masterDataAPI.getDivisions(),
          masterDataAPI.getRoles(),
          userAPI.getAll(),
          logAPI.getAll(),
        ]);
        if (entRes.data?.success) setEntityList(entRes.data.data);
        if (brRes.data?.success) setBranchList(brRes.data.data);
        if (divRes.data?.success) setDivisionList(divRes.data.data);
        if (roleRes.data?.success) setRoleList(roleRes.data.data);
        if (userRes.data?.success) setUsers(userRes.data.data);
        if (logRes.data?.success) setLogs(logRes.data.data);
      } catch (err) {
        console.error("Gagal mengambil data", err);
      }
    };
    fetchData();
  }, []);

  const getEntityName = (code) =>
    entityList.find((e) => e.entity_code === code)?.name || code;
  const getBranchName = (code) =>
    branchList.find((b) => b.branch_code === code)?.name || code;
  const getDivisionName = (code) =>
    divisionList.find((d) => d.division_code === code)?.name || code;

  const [view, setView] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formUser, setFormUser] = useState(null);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("semua");
  const [filterEntity, setFilterEntity] = useState("semua");
  const [filterBranch, setFilterBranch] = useState("semua");
  const [filterDivision, setFilterDivision] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");

  const [userPage, setUserPage] = useState(1);

  const availableBranches =
    filterEntity === "semua"
      ? branchList
      : branchList.filter((b) => b.entity_code === filterEntity);
  const availableDivisions =
    filterBranch === "semua"
      ? filterEntity === "semua"
        ? divisionList
        : divisionList.filter((d) => d.entity_code === filterEntity)
      : divisionList.filter((d) => d.branch_code === filterBranch);

  const handleFilterEntity = (val) => {
    setFilterEntity(val);
    setFilterBranch("semua");
    setFilterDivision("semua");
  };
  const handleFilterBranch = (val) => {
    setFilterBranch(val);
    setFilterDivision("semua");
  };

  React.useEffect(() => {
    setUserPage(1);
  }, [search, filterRole, filterEntity, filterBranch, filterDivision, filterStatus]);

  const fetchLogs = async () => {
    try {
      const res = await logAPI.getAll();
      if (res.data?.success) setLogs(res.data.data);
    } catch (err) {
      console.error("Gagal refresh logs", err);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) || (u.nip && u.nip.includes(q))) &&
      (filterRole === "semua" || u.role_code === filterRole) &&
      (filterEntity === "semua" || u.entity_code === filterEntity) &&
      (filterBranch === "semua" || u.branch_code === filterBranch) &&
      (filterDivision === "semua" || u.division_code === filterDivision) &&
      (filterStatus === "semua" || (filterStatus === "aktif" ? u.is_active : !u.is_active))
    );
  });

  const userTotalPages = Math.max(1, Math.ceil(filtered.length / USERS_PER_PAGE));
  const paginatedUsers = filtered.slice((userPage - 1) * USERS_PER_PAGE, userPage * USERS_PER_PAGE);

  const stats = {
    total: users.length,
    superadmin: users.filter((u) => u.role_code === "superadmin" || u.role_code === "admin").length,
    aktif: users.filter((u) => u.is_active).length,
    nonaktif: users.filter((u) => !u.is_active).length,
  };

  const handleSave = async (saved) => {
    try {
      const existing = users.find((u) => u.id === saved.id);
      if (existing) {
        const payload = {
          name: saved.name, username: saved.username, email: saved.email,
          phone: saved.phone, nip: saved.nip, role_code: saved.role_code,
          entity_code: saved.entity_code, branch_code: saved.branch_code,
          division_code: saved.division_code || null, is_active: saved.is_active,
          ...(saved.password ? { password: saved.password } : {}),
        };
        const res = await userAPI.update(saved.id, payload);
        if (res.data?.success) {
          setUsers((prev) => prev.map((u) => (u.id === saved.id ? res.data.data : u)));
          fetchLogs();
        }
      } else {
        const payload = {
          name: saved.name, username: saved.username, email: saved.email,
          password: saved.password, phone: saved.phone, nip: saved.nip,
          role_code: saved.role_code, entity_code: saved.entity_code,
          branch_code: saved.branch_code, division_code: saved.division_code || null,
          is_active: saved.is_active,
        };
        const res = await userAPI.create(payload);
        if (res.data?.success) {
          setUsers((prev) => [res.data.data, ...prev]);
          recordActivity({ action_type: "REGISTER", table_name: "users", record_id: res.data.data.id, new_value: { username: res.data.data.username, email: res.data.data.email } });
        }
      }
    } catch (err) {
      alert("Gagal menyimpan user: " + (err.response?.data?.message || err.message));
    }
  };
  const handleDelete = async (id) => {
    try {
      const u = users.find((x) => x.id === id);
      const res = await userAPI.delete(id);
      if (res.data?.success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        fetchLogs();
      }
    } catch (err) {
      alert("Gagal menghapus user: " + (err.response?.data?.message || err.message));
    }
  };
  const handleToggle = async (id) => {
    try {
      const res = await userAPI.toggleStatus(id);
      if (res.data?.success) {
        setUsers((prev) => prev.map((u) => (u.id === id ? res.data.data : u)));
        fetchLogs();
      }
    } catch (err) {
      alert("Gagal mengubah status user: " + (err.response?.data?.message || err.message));
    }
  };

  const goDetail = (u) => {
    setSelectedUser(u);
    setView("detail");
  };
  const goEdit = (u) => {
    setFormUser(u);
    setView("form");
  };
  const goAdd = () => {
    setFormUser(null);
    setView("form");
  };
  const goReset = (u) => {
    setSelectedUser(u);
    setView("reset");
  };
  const goDelete = (u) => {
    setSelectedUser(u);
    setView("delete");
  };
  const goList = () => setView("list");
  const goDetailFromEdit = () => {
    setView("detail");
  };

  if (view === "form") {
    return (
      <UserFormView
        user={formUser}
        onBack={() => {
          formUser ? goDetailFromEdit() : goList();
        }}
        onSave={(saved) => {
          handleSave(saved);
          if (formUser) {
            setSelectedUser(saved);
          }
        }}
        entityList={entityList}
        branchList={branchList}
        divisionList={divisionList}
      />
    );
  }
  if (view === "detail" && selectedUser) {
    const liveUser =
      users.find((u) => u.id === selectedUser.id) || selectedUser;
    return (
      <DetailUserView
        user={liveUser}
        onBack={goList}
        onEdit={() => goEdit(liveUser)}
        onReset={() => goReset(liveUser)}
        onDelete={() => goDelete(liveUser)}
        entityList={entityList}
        branchList={branchList}
        divisionList={divisionList}
      />
    );
  }
  if (view === "reset" && selectedUser) {
    return (
      <ResetPassView user={selectedUser} onBack={() => setView("detail")} />
    );
  }
  if (view === "delete" && selectedUser) {
    return (
      <DeleteUserView
        user={selectedUser}
        onBack={() => setView("detail")}
        onConfirm={(id) => {
          handleDelete(id);
          setSelectedUser(null);
          setView("list");
        }}
      />
    );
  }

  // ── LIST VIEW ──
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
        <button className="um-btn um-btn-primary um-btn-lg" onClick={goAdd}>
          <Ico n="plus" size={13} /> Tambah User
        </button>
      </div>

      <div className="um-stats">
        {[
          {
            icon: "user",
            color: "blue",
            num: stats.total,
            label: "Total User",
          },
          {
            icon: "shield",
            color: "purple",
            num: stats.superadmin,
            label: "Super Admin",
          },
          {
            icon: "userCheck",
            color: "green",
            num: stats.aktif,
            label: "Akun Aktif",
          },
          {
            icon: "userSlash",
            color: "gray",
            num: stats.nonaktif,
            label: "Akun Nonaktif",
          },
        ].map((s) => (
          <div key={s.label} className="um-stat-card">
            <div className={`um-stat-icon um-stat-icon--${s.color}`}>
              <Ico n={s.icon} size={16} />
            </div>
            <div>
              <div className="um-stat-num">{s.num}</div>
              <div className="um-stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="um-toolbar">
        <div className="um-search-wrap">
          <Ico n="search" size={13} />
          <input
            placeholder="Cari nama, NIP, username, atau email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="um-filter-wrap">
          <Ico n="shield" size={12} />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="semua">Semua Role</option>
            <option value="admin">Administrator</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="um-filter-wrap">
          <Ico n="building" size={12} />
          <select
            value={filterEntity}
            onChange={(e) => handleFilterEntity(e.target.value)}
          >
            <option value="semua">Semua Entitas</option>
            {entityList.map((e) => (
              <option key={e.entity_code} value={e.entity_code}>
                {e.entity_code} — {e.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className={`um-filter-wrap ${filterEntity === "semua" ? "um-filter-disabled" : ""}`}
        >
          <Ico n="mapPin" size={12} />
          <select
            value={filterBranch}
            onChange={(e) => handleFilterBranch(e.target.value)}
            disabled={filterEntity === "semua"}
          >
            <option value="semua">
              {filterEntity === "semua" ? "Pilih entitas dulu" : "Semua Branch"}
            </option>
            {availableBranches.map((b) => (
              <option key={b.branch_code} value={b.branch_code}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className={`um-filter-wrap ${filterBranch === "semua" ? "um-filter-disabled" : ""}`}
        >
          <Ico n="idCard" size={12} />
          <select
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            disabled={filterBranch === "semua"}
          >
            <option value="semua">
              {filterBranch === "semua" ? "Pilih branch dulu" : "Semua Divisi"}
            </option>
            {availableDivisions.map((d) => (
              <option key={d.division_code} value={d.division_code}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="um-filter-wrap">
          <Ico n="filter" size={12} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="semua">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
        </div>
        {(filterEntity !== "semua" ||
          filterBranch !== "semua" ||
          filterDivision !== "semua") && (
          <div className="um-filter-chips">
            {filterEntity !== "semua" && (
              <span className="um-chip">
                {filterEntity}{" "}
                <button onClick={() => handleFilterEntity("semua")}>×</button>
              </span>
            )}
            {filterBranch !== "semua" && (
              <span className="um-chip">
                {getBranchName(filterBranch)}{" "}
                <button onClick={() => handleFilterBranch("semua")}>×</button>
              </span>
            )}
            {filterDivision !== "semua" && (
              <span className="um-chip">
                {getDivisionName(filterDivision)}{" "}
                <button onClick={() => setFilterDivision("semua")}>×</button>
              </span>
            )}
          </div>
        )}
        <div className="um-count">{filtered.length} user</div>
      </div>

      <div className="um-table-wrap">
        <table className="um-table">
          <thead>
            <tr>
              <th>User</th>
              <th>NIP</th>
              <th>Username</th>
              <th>Entitas</th>
              <th>Branch / Divisi</th>
              <th>Role</th>
              <th>Status</th>
              <th>Login Terakhir</th>
              <th style={{ width: 38, textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={9} className="um-empty">
                  Tidak ada user yang cocok
                </td>
              </tr>
            ) : (
              paginatedUsers.map((u) => {
                const rc = roleConfig[u.role_code] || roleConfig.user;
                const isAdmin = u.role_code === "superadmin" || u.role_code === "admin";
                return (
                  <tr key={u.id}>
                    <td>
                      <div className="um-user-cell">
                        <div
                          className={`um-avatar um-avatar--${isAdmin ? "purple" : "blue"}`}
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
                        <span
                          className="um-entity-name"
                          style={{ fontSize: ".67rem" }}
                        >
                          {getEntityName(u.entity_code)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="um-entity-cell">
                        <span
                          className="um-entity-code"
                          style={{ color: "#0f766e", background: "#ccfbf1" }}
                        >
                          {getBranchName(u.branch_code)}
                        </span>
                        <span
                          className="um-entity-name"
                          style={{ fontSize: ".67rem", color: "#64748b" }}
                        >
                          {getDivisionName(u.division_code) || "—"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="um-role-badge"
                        style={{ color: rc.color, background: rc.bg }}
                      >
                        <Ico n={rc.iconName} size={11} /> {rc.label}
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
                          size={11}
                        />{" "}
                        {u.is_active ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="um-last-login">{fmt(u.last_login)}</td>
                    <td style={{ textAlign: "center" }}>
                      <ActionDropdown
                        user={u}
                        onDetail={goDetail}
                        onEdit={goEdit}
                        onReset={goReset}
                        onDelete={goDelete}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <Pagination
          page={userPage}
          totalPages={userTotalPages}
          total={filtered.length}
          perPage={USERS_PER_PAGE}
          onPageChange={setUserPage}
        />
      </div>

      <div className="md-sections-wrapper">
        <div className="md-sections-header">
          <Ico n="settings" size={13} style={{ color: "#94a3b8" }} />
          <span className="md-sections-title">Manajemen Data Master</span>
        </div>
        <EntitySection entityList={entityList} setEntityList={setEntityList} />
        <div style={{ marginTop: ".6rem" }}>
          <BranchSection
            branchList={branchList}
            setBranchList={setBranchList}
            entityList={entityList}
          />
        </div>
        <div style={{ marginTop: ".6rem" }}>
          <DivisionSection
            divisionList={divisionList}
            setDivisionList={setDivisionList}
            entityList={entityList}
            branchList={branchList}
          />
        </div>
      </div>

      <ActivityLogSection logs={logs} users={users} />
    </div>
  );
};

export default UserManagement;

