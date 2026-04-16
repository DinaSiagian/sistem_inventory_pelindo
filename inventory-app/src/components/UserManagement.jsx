import React, { useState, useRef, useCallback } from "react";

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

// ─── MASTER DATA ──────────────────────────────────────────────
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
const divisionList = [
  {
    division_code: "PMT-JKT-OPS",
    branch_code: "PMT-JKT",
    entity_code: "PMT",
    name: "Operasional",
  },
  {
    division_code: "PMT-JKT-FIN",
    branch_code: "PMT-JKT",
    entity_code: "PMT",
    name: "Keuangan",
  },
  {
    division_code: "PMT-JKT-IT",
    branch_code: "PMT-JKT",
    entity_code: "PMT",
    name: "Teknologi Informasi",
  },
  {
    division_code: "PMT-JKT-HRD",
    branch_code: "PMT-JKT",
    entity_code: "PMT",
    name: "HRD",
  },
  {
    division_code: "PMT-SBY-OPS",
    branch_code: "PMT-SBY",
    entity_code: "PMT",
    name: "Operasional",
  },
  {
    division_code: "PMT-SBY-FIN",
    branch_code: "PMT-SBY",
    entity_code: "PMT",
    name: "Keuangan",
  },
  {
    division_code: "PMT-MDN-OPS",
    branch_code: "PMT-MDN",
    entity_code: "PMT",
    name: "Operasional",
  },
  {
    division_code: "PTP-JKT-OPS",
    branch_code: "PTP-JKT",
    entity_code: "PTP",
    name: "Operasional",
  },
  {
    division_code: "PTP-JKT-FIN",
    branch_code: "PTP-JKT",
    entity_code: "PTP",
    name: "Keuangan",
  },
  {
    division_code: "PTP-JKT-HRD",
    branch_code: "PTP-JKT",
    entity_code: "PTP",
    name: "HRD",
  },
  {
    division_code: "IKT-JKT-OPS",
    branch_code: "IKT-JKT",
    entity_code: "IKT",
    name: "Operasional",
  },
  {
    division_code: "IKT-JKT-IT",
    branch_code: "IKT-JKT",
    entity_code: "IKT",
    name: "Teknologi Informasi",
  },
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

const CURRENT_USER_IP = "192.168.1.1";
const CURRENT_USER_ID = 1;

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
    division_code: "PMT-JKT-IT",
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
    division_code: "PMT-JKT-HRD",
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
    division_code: "PMT-SBY-OPS",
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
    division_code: "PTP-JKT-FIN",
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
    division_code: "PMT-MDN-OPS",
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
    division_code: "IKT-JKT-OPS",
    is_active: true,
    created_at: "2025-06-10",
    last_login: "2026-03-03 08:55",
  },
];

const mockLogs = [
  {
    log_id: 1,
    user_id: 3,
    action_type: "REGISTER",
    table_name: "users",
    record_id: 3,
    old_value: null,
    new_value: JSON.stringify({
      username: "andi.pratama",
      email: "andi.pratama@pelindo.co.id",
    }),
    ip_address: "192.168.1.10",
    created_at: "2025-03-15T08:00:00",
  },
  {
    log_id: 2,
    user_id: 4,
    action_type: "REGISTER",
    table_name: "users",
    record_id: 4,
    old_value: null,
    new_value: JSON.stringify({
      username: "sari.dewi",
      email: "sari.dewi@pelindo.co.id",
    }),
    ip_address: "192.168.1.25",
    created_at: "2025-04-01T09:00:00",
  },
  {
    log_id: 3,
    user_id: 6,
    action_type: "REGISTER",
    table_name: "users",
    record_id: 6,
    old_value: null,
    new_value: JSON.stringify({
      username: "rini.handayani",
      email: "rini.handayani@pelindo.co.id",
    }),
    ip_address: "192.168.1.30",
    created_at: "2025-06-10T09:00:00",
  },
  {
    log_id: 4,
    user_id: 1,
    action_type: "LOGIN",
    table_name: "auth",
    record_id: 1,
    old_value: null,
    new_value: JSON.stringify({
      username: "joy.silalahi",
      device: "Chrome/Windows",
    }),
    ip_address: "192.168.1.1",
    created_at: "2026-03-04T08:32:00",
  },
  {
    log_id: 5,
    user_id: 1,
    action_type: "LOGOUT",
    table_name: "auth",
    record_id: 1,
    old_value: null,
    new_value: JSON.stringify({ session_duration: "25m 10s" }),
    ip_address: "192.168.1.1",
    created_at: "2026-03-04T08:57:00",
  },
  {
    log_id: 6,
    user_id: 3,
    action_type: "LOGIN",
    table_name: "auth",
    record_id: 3,
    old_value: null,
    new_value: JSON.stringify({
      username: "andi.pratama",
      device: "Chrome/Windows",
    }),
    ip_address: "192.168.1.10",
    created_at: "2026-03-04T07:55:00",
  },
  {
    log_id: 7,
    user_id: 3,
    action_type: "BORROW_ASSET",
    table_name: "asset_loans",
    record_id: 101,
    old_value: null,
    new_value: JSON.stringify({
      asset_name: "Laptop Dell XPS 13",
      loan_date: "2026-03-04",
      due_date: "2026-03-11",
    }),
    ip_address: "192.168.1.10",
    created_at: "2026-03-04T08:05:00",
  },
  {
    log_id: 8,
    user_id: 3,
    action_type: "UPDATE_PROFILE",
    table_name: "users",
    record_id: 3,
    old_value: JSON.stringify({ phone: "082100000000" }),
    new_value: JSON.stringify({ phone: "082112345678" }),
    ip_address: "192.168.1.10",
    created_at: "2026-03-04T08:15:00",
  },
  {
    log_id: 9,
    user_id: 3,
    action_type: "LOGOUT",
    table_name: "auth",
    record_id: 3,
    old_value: null,
    new_value: JSON.stringify({ session_duration: "30m 22s" }),
    ip_address: "192.168.1.10",
    created_at: "2026-03-04T08:25:22",
  },
  {
    log_id: 10,
    user_id: 4,
    action_type: "LOGIN",
    table_name: "auth",
    record_id: 4,
    old_value: null,
    new_value: JSON.stringify({
      username: "sari.dewi",
      device: "Safari/MacOS",
    }),
    ip_address: "192.168.1.25",
    created_at: "2026-03-04T08:30:00",
  },
  {
    log_id: 11,
    user_id: 4,
    action_type: "RETURN_ASSET",
    table_name: "asset_loans",
    record_id: 98,
    old_value: JSON.stringify({
      status: "borrowed",
      asset_name: "Proyektor Epson EB-X51",
    }),
    new_value: JSON.stringify({
      status: "returned",
      return_date: "2026-03-04",
    }),
    ip_address: "192.168.1.25",
    created_at: "2026-03-04T08:45:00",
  },
  {
    log_id: 12,
    user_id: 4,
    action_type: "CHANGE_PASSWORD",
    table_name: "users",
    record_id: 4,
    old_value: null,
    new_value: JSON.stringify({ action: "password_updated" }),
    ip_address: "192.168.1.25",
    created_at: "2026-03-04T08:50:00",
  },
  {
    log_id: 13,
    user_id: 4,
    action_type: "LOGOUT",
    table_name: "auth",
    record_id: 4,
    old_value: null,
    new_value: JSON.stringify({ session_duration: "22m 05s" }),
    ip_address: "192.168.1.25",
    created_at: "2026-03-04T08:52:05",
  },
  {
    log_id: 14,
    user_id: 6,
    action_type: "LOGIN",
    table_name: "auth",
    record_id: 6,
    old_value: null,
    new_value: JSON.stringify({
      username: "rini.handayani",
      device: "Firefox/Linux",
    }),
    ip_address: "192.168.1.30",
    created_at: "2026-03-03T08:55:00",
  },
  {
    log_id: 15,
    user_id: 6,
    action_type: "BORROW_ASSET",
    table_name: "asset_loans",
    record_id: 102,
    old_value: null,
    new_value: JSON.stringify({
      asset_name: "Kamera Canon EOS M50",
      loan_date: "2026-03-03",
      due_date: "2026-03-10",
    }),
    ip_address: "192.168.1.30",
    created_at: "2026-03-03T09:05:00",
  },
  {
    log_id: 16,
    user_id: 6,
    action_type: "UPDATE_PROFILE",
    table_name: "users",
    record_id: 6,
    old_value: JSON.stringify({ username: "rini.h" }),
    new_value: JSON.stringify({ username: "rini.handayani" }),
    ip_address: "192.168.1.30",
    created_at: "2026-03-03T09:30:00",
  },
  {
    log_id: 17,
    user_id: 6,
    action_type: "LOGOUT",
    table_name: "auth",
    record_id: 6,
    old_value: null,
    new_value: JSON.stringify({ session_duration: "1j 05m" }),
    ip_address: "192.168.1.30",
    created_at: "2026-03-03T10:00:00",
  },
  {
    log_id: 18,
    user_id: 2,
    action_type: "LOGIN",
    table_name: "auth",
    record_id: 2,
    old_value: null,
    new_value: JSON.stringify({
      username: "dina.siagian",
      device: "Edge/Windows",
    }),
    ip_address: "192.168.1.2",
    created_at: "2026-03-03T09:00:00",
  },
  {
    log_id: 19,
    user_id: 2,
    action_type: "DELETE_ACCOUNT",
    table_name: "users",
    record_id: 2,
    old_value: JSON.stringify({
      name: "Dina Marlina Siagian",
      reason: "resign",
    }),
    new_value: null,
    ip_address: "192.168.1.2",
    created_at: "2026-03-03T09:10:00",
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
const getDivisionName = (code) =>
  divisionList.find((d) => d.division_code === code)?.name || code;

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
.um-status-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.35rem .75rem;border-radius:99px;border:1.5px solid var(--border);cursor:pointer;font-size:.76rem;font-weight:600;background:#fff;color:var(--slate-6);font-family:inherit;transition:all .14s;}
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
`;

// ─── HELPERS ──────────────────────────────────────────────────
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
const LOGS_PER_PAGE = 8;
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
          {totalPages > 1 && (
            <div className="al-pagination">
              <span className="al-page-info">
                {Math.min((page - 1) * LOGS_PER_PAGE + 1, filtered.length)}–
                {Math.min(page * LOGS_PER_PAGE, filtered.length)} dari{" "}
                {filtered.length} log
              </span>
              <div className="al-page-btns">
                <button
                  className="al-page-btn"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      className={`al-page-btn ${p === page ? "active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  className="al-page-btn"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                >
                  ›
                </button>
              </div>
            </div>
          )}
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

// ─── FORM VIEW ────────────────────────────────────────────────
function UserFormView({ user, onBack, onSave }) {
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

// ─── DETAIL VIEW ──────────────────────────────────────────────
function DetailUserView({ user, onBack, onEdit, onDelete, onReset }) {
  if (!user) return null;
  const rc = roleConfig[user.role_code];
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
                  className={`um-role-badge`}
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

// ─── RESET VIEW ───────────────────────────────────────────────
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

// ─── DELETE VIEW ──────────────────────────────────────────────
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

// ─── DROPDOWN COMPONENT ───────────────────────────────────────
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

// ─── MAIN COMPONENT ───────────────────────────────────────────
const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [logs, setLogs] = useState(mockLogs);
  const logIdRef = useRef(mockLogs.length + 1);

  // view: "list" | "detail" | "form" | "reset" | "delete"
  const [view, setView] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formUser, setFormUser] = useState(null); // null = tambah baru

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("semua");
  const [filterEntity, setFilterEntity] = useState("semua");
  const [filterBranch, setFilterBranch] = useState("semua");
  const [filterDivision, setFilterDivision] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");

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

  const recordActivity = useCallback(
    ({
      action_type,
      table_name = "users",
      record_id = null,
      old_value = null,
      new_value = null,
    }) => {
      const entry = {
        log_id: logIdRef.current++,
        user_id: CURRENT_USER_ID,
        action_type,
        table_name,
        record_id,
        old_value: old_value
          ? typeof old_value === "string"
            ? old_value
            : JSON.stringify(old_value)
          : null,
        new_value: new_value
          ? typeof new_value === "string"
            ? new_value
            : JSON.stringify(new_value)
          : null,
        ip_address: CURRENT_USER_IP,
        created_at: new Date().toISOString(),
      };
      queueMicrotask(() => setLogs((prev) => [entry, ...prev]));
    },
    [],
  );

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.nip && u.nip.includes(q))) &&
      (filterRole === "semua" || u.role_code === filterRole) &&
      (filterEntity === "semua" || u.entity_code === filterEntity) &&
      (filterBranch === "semua" || u.branch_code === filterBranch) &&
      (filterDivision === "semua" || u.division_code === filterDivision) &&
      (filterStatus === "semua" ||
        (filterStatus === "aktif" ? u.is_active : !u.is_active))
    );
  });

  const stats = {
    total: users.length,
    superadmin: users.filter((u) => u.role_code === "superadmin").length,
    aktif: users.filter((u) => u.is_active).length,
    nonaktif: users.filter((u) => !u.is_active).length,
  };

  const handleSave = (saved) => {
    const existing = users.find((u) => u.id === saved.id);
    if (existing) {
      setUsers(users.map((u) => (u.id === saved.id ? saved : u)));
      recordActivity({
        action_type: "UPDATE_PROFILE",
        table_name: "users",
        record_id: saved.id,
        old_value: { name: existing.name },
        new_value: { name: saved.name },
      });
    } else {
      setUsers([saved, ...users]);
      recordActivity({
        action_type: "REGISTER",
        table_name: "users",
        record_id: saved.id,
        new_value: { username: saved.username, email: saved.email },
      });
    }
  };
  const handleDelete = (id) => {
    const u = users.find((x) => x.id === id);
    recordActivity({
      action_type: "DELETE_ACCOUNT",
      table_name: "users",
      record_id: id,
      old_value: { name: u?.name },
    });
    setUsers(users.filter((u) => u.id !== id));
  };
  const handleToggle = (id) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, is_active: !u.is_active } : u)),
    );
  };

  // Navigation helpers
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

  // ── SUB-VIEWS ──
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
          />
        </div>
        <div className="um-filter-wrap">
          <Ico n="shield" size={12} />
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="um-empty">
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
                    <td className="um-last-login">{u.last_login}</td>
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
      </div>

      <ActivityLogSection logs={logs} users={users} />
    </div>
  );
};

export default UserManagement;
