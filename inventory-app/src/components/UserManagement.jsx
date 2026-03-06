import React, { useState, useRef, useCallback } from "react";

// ─── INLINE SVG ICONS ─────────────────────────────────────────
const SVG = {
  search: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  plus: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>),
  edit: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>),
  trash: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>),
  eye: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
  eyeSlash: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>),
  shield: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
  user: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
  times: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  key: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>),
  filter: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>),
  userCheck: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>),
  userSlash: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="23" y1="11" x2="17" y2="17" /><line x1="17" y1="11" x2="23" y2="17" /></svg>),
  building: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="1" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>),
  idCard: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" /><circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" /><line x1="12" y1="10" x2="20" y2="10" /><line x1="12" y1="14" x2="20" y2="14" /></svg>),
  phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" /></svg>),
  mapPin: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
  lock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
  envelope: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
  activity: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
  clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  database: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>),
  globe: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>),
  chevronDown: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>),
  chevronUp: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>),
  diff: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>),
};

function Ico({ n, size = 14, style = {} }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:size, height:size, flexShrink:0, ...style }}>
      {React.cloneElement(SVG[n], { width:size, height:size, style:{ display:"block" } })}
    </span>
  );
}

// ─── MASTER DATA (hierarki: Entitas → Branch → Divisi) ───────
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
// Divisi terikat ke branch
const divisionList = [
  { division_code: "PMT-JKT-OPS",  branch_code: "PMT-JKT", entity_code: "PMT", name: "Operasional" },
  { division_code: "PMT-JKT-FIN",  branch_code: "PMT-JKT", entity_code: "PMT", name: "Keuangan" },
  { division_code: "PMT-JKT-IT",   branch_code: "PMT-JKT", entity_code: "PMT", name: "Teknologi Informasi" },
  { division_code: "PMT-JKT-HRD",  branch_code: "PMT-JKT", entity_code: "PMT", name: "HRD" },
  { division_code: "PMT-SBY-OPS",  branch_code: "PMT-SBY", entity_code: "PMT", name: "Operasional" },
  { division_code: "PMT-SBY-FIN",  branch_code: "PMT-SBY", entity_code: "PMT", name: "Keuangan" },
  { division_code: "PMT-MDN-OPS",  branch_code: "PMT-MDN", entity_code: "PMT", name: "Operasional" },
  { division_code: "PTP-JKT-OPS",  branch_code: "PTP-JKT", entity_code: "PTP", name: "Operasional" },
  { division_code: "PTP-JKT-FIN",  branch_code: "PTP-JKT", entity_code: "PTP", name: "Keuangan" },
  { division_code: "PTP-JKT-HRD",  branch_code: "PTP-JKT", entity_code: "PTP", name: "HRD" },
  { division_code: "IKT-JKT-OPS",  branch_code: "IKT-JKT", entity_code: "IKT", name: "Operasional" },
  { division_code: "IKT-JKT-IT",   branch_code: "IKT-JKT", entity_code: "IKT", name: "Teknologi Informasi" },
];
const roleConfig = {
  superadmin: { label: "Super Admin", color: "#7c3aed", bg: "#ede9fe", iconName: "shield" },
  user: { label: "User", color: "#0891b2", bg: "#ecfeff", iconName: "user" },
};

// ─── ACTIVITY LOG CONFIG ──────────────────────────────────────
// Sesuai kolom action_type di tabel activity_logs
// action_type — semua aksi penting yang dilakukan user di sistem
const ACTION_CONFIG = {
  LOGIN:               { label: "Login",               color: "#16a34a", bg: "#dcfce7" },
  LOGOUT:              { label: "Logout",              color: "#64748b", bg: "#f1f5f9" },
  REGISTER:            { label: "Buat Akun",           color: "#0891b2", bg: "#ecfeff" },
  DELETE_ACCOUNT:      { label: "Hapus Akun",          color: "#dc2626", bg: "#fee2e2" },
  CHANGE_PASSWORD:     { label: "Ubah Password",       color: "#d97706", bg: "#fef3c7" },
  UPDATE_PROFILE:      { label: "Ubah Profil",         color: "#2563eb", bg: "#dbeafe" },
  BORROW_ASSET:        { label: "Peminjaman Aset",     color: "#7c3aed", bg: "#ede9fe" },
  RETURN_ASSET:        { label: "Pengembalian Aset",   color: "#0f766e", bg: "#ccfbf1" },
};

// Simulasi user yang sedang login (di production ambil dari auth context)
const CURRENT_USER_IP = "192.168.1.1";
const CURRENT_USER_ID = 1; // Joy Valeda Silalahi (superadmin yang sedang login)

// ─── MOCK DATA ────────────────────────────────────────────────
const mockUsers = [
  { id:1, name:"Joy Valeda Silalahi",  nip:"19900101001", username:"joy.silalahi",   email:"joy.silalahi@pelindo.co.id",   phone:"081234567890", role_code:"superadmin", entity_code:"PMT", branch_code:"PMT-JKT", division_code:"PMT-JKT-IT",  is_active:true,  created_at:"2025-01-10", last_login:"2026-03-04 08:32" },
  { id:2, name:"Dina Marlina Siagian", nip:"19920202002", username:"dina.siagian",   email:"dina.siagian@pelindo.co.id",   phone:"081298765432", role_code:"superadmin", entity_code:"PMT", branch_code:"PMT-JKT", division_code:"PMT-JKT-HRD", is_active:true,  created_at:"2025-01-10", last_login:"2026-03-04 09:15" },
  { id:3, name:"Andi Pratama",         nip:"19950303003", username:"andi.pratama",   email:"andi.pratama@pelindo.co.id",   phone:"082112345678", role_code:"user",       entity_code:"PMT", branch_code:"PMT-SBY", division_code:"PMT-SBY-OPS", is_active:true,  created_at:"2025-03-15", last_login:"2026-03-03 14:22" },
  { id:4, name:"Sari Dewi",            nip:"19970404004", username:"sari.dewi",      email:"sari.dewi@pelindo.co.id",      phone:"085787654321", role_code:"user",       entity_code:"PTP", branch_code:"PTP-JKT", division_code:"PTP-JKT-FIN", is_active:true,  created_at:"2025-04-01", last_login:"2026-03-02 10:05" },
  { id:5, name:"Budi Santoso",         nip:"19880505005", username:"budi.santoso",   email:"budi.santoso@pelindo.co.id",   phone:"087890123456", role_code:"user",       entity_code:"PMT", branch_code:"PMT-MDN", division_code:"PMT-MDN-OPS", is_active:false, created_at:"2025-05-20", last_login:"2026-01-15 16:40" },
  { id:6, name:"Rini Handayani",       nip:"19991212006", username:"rini.handayani", email:"rini.handayani@pelindo.co.id", phone:"089912345678", role_code:"user",       entity_code:"IKT", branch_code:"IKT-JKT", division_code:"IKT-JKT-OPS", is_active:true,  created_at:"2025-06-10", last_login:"2026-03-03 08:55" },
];

// Mock initial logs — aktivitas nyata tiap user di sistem
// REGISTER = hanya saat user pertama kali membuat AKUNNYA SENDIRI (bukan admin buat akun orang lain)
// log_id | user_id | action_type | table_name | record_id | old_value | new_value | ip_address | created_at
const mockLogs = [
  // Saat pertama kali daftar — masing-masing user mendaftarkan akunnya sendiri
  { log_id:1,  user_id:3, action_type:"REGISTER",        table_name:"users",       record_id:3,    old_value:null, new_value:JSON.stringify({username:"andi.pratama",  email:"andi.pratama@pelindo.co.id"}),  ip_address:"192.168.1.10", created_at:"2025-03-15T08:00:00" },
  { log_id:2,  user_id:4, action_type:"REGISTER",        table_name:"users",       record_id:4,    old_value:null, new_value:JSON.stringify({username:"sari.dewi",     email:"sari.dewi@pelindo.co.id"}),     ip_address:"192.168.1.25", created_at:"2025-04-01T09:00:00" },
  { log_id:3,  user_id:6, action_type:"REGISTER",        table_name:"users",       record_id:6,    old_value:null, new_value:JSON.stringify({username:"rini.handayani",email:"rini.handayani@pelindo.co.id"}),ip_address:"192.168.1.30", created_at:"2025-06-10T09:00:00" },

  // Joy Valeda — login, logout
  { log_id:4,  user_id:1, action_type:"LOGIN",           table_name:"auth",        record_id:1,    old_value:null, new_value:JSON.stringify({username:"joy.silalahi",  device:"Chrome/Windows"}),             ip_address:"192.168.1.1",  created_at:"2026-03-04T08:32:00" },
  { log_id:5,  user_id:1, action_type:"LOGOUT",          table_name:"auth",        record_id:1,    old_value:null, new_value:JSON.stringify({session_duration:"25m 10s"}),                                    ip_address:"192.168.1.1",  created_at:"2026-03-04T08:57:00" },

  // Andi Pratama — login, pinjam aset, ubah profil (no. HP), logout
  { log_id:6,  user_id:3, action_type:"LOGIN",           table_name:"auth",        record_id:3,    old_value:null, new_value:JSON.stringify({username:"andi.pratama",  device:"Chrome/Windows"}),             ip_address:"192.168.1.10", created_at:"2026-03-04T07:55:00" },
  { log_id:7,  user_id:3, action_type:"BORROW_ASSET",    table_name:"asset_loans", record_id:101,  old_value:null, new_value:JSON.stringify({asset_name:"Laptop Dell XPS 13", loan_date:"2026-03-04", due_date:"2026-03-11"}), ip_address:"192.168.1.10", created_at:"2026-03-04T08:05:00" },
  { log_id:8,  user_id:3, action_type:"UPDATE_PROFILE",  table_name:"users",       record_id:3,    old_value:JSON.stringify({phone:"082100000000"}), new_value:JSON.stringify({phone:"082112345678"}),       ip_address:"192.168.1.10", created_at:"2026-03-04T08:15:00" },
  { log_id:9,  user_id:3, action_type:"LOGOUT",          table_name:"auth",        record_id:3,    old_value:null, new_value:JSON.stringify({session_duration:"30m 22s"}),                                    ip_address:"192.168.1.10", created_at:"2026-03-04T08:25:22" },

  // Sari Dewi — login, kembalikan aset, ganti password, logout
  { log_id:10, user_id:4, action_type:"LOGIN",           table_name:"auth",        record_id:4,    old_value:null, new_value:JSON.stringify({username:"sari.dewi",     device:"Safari/MacOS"}),               ip_address:"192.168.1.25", created_at:"2026-03-04T08:30:00" },
  { log_id:11, user_id:4, action_type:"RETURN_ASSET",    table_name:"asset_loans", record_id:98,   old_value:JSON.stringify({status:"borrowed", asset_name:"Proyektor Epson EB-X51"}), new_value:JSON.stringify({status:"returned", return_date:"2026-03-04"}), ip_address:"192.168.1.25", created_at:"2026-03-04T08:45:00" },
  { log_id:12, user_id:4, action_type:"CHANGE_PASSWORD", table_name:"users",       record_id:4,    old_value:null, new_value:JSON.stringify({action:"password_updated"}),                                     ip_address:"192.168.1.25", created_at:"2026-03-04T08:50:00" },
  { log_id:13, user_id:4, action_type:"LOGOUT",          table_name:"auth",        record_id:4,    old_value:null, new_value:JSON.stringify({session_duration:"22m 05s"}),                                    ip_address:"192.168.1.25", created_at:"2026-03-04T08:52:05" },

  // Rini Handayani — login, pinjam aset, ubah profil (username), logout
  { log_id:14, user_id:6, action_type:"LOGIN",           table_name:"auth",        record_id:6,    old_value:null, new_value:JSON.stringify({username:"rini.handayani",device:"Firefox/Linux"}),              ip_address:"192.168.1.30", created_at:"2026-03-03T08:55:00" },
  { log_id:15, user_id:6, action_type:"BORROW_ASSET",    table_name:"asset_loans", record_id:102,  old_value:null, new_value:JSON.stringify({asset_name:"Kamera Canon EOS M50", loan_date:"2026-03-03", due_date:"2026-03-10"}), ip_address:"192.168.1.30", created_at:"2026-03-03T09:05:00" },
  { log_id:16, user_id:6, action_type:"UPDATE_PROFILE",  table_name:"users",       record_id:6,    old_value:JSON.stringify({username:"rini.h"}), new_value:JSON.stringify({username:"rini.handayani"}),      ip_address:"192.168.1.30", created_at:"2026-03-03T09:30:00" },
  { log_id:17, user_id:6, action_type:"LOGOUT",          table_name:"auth",        record_id:6,    old_value:null, new_value:JSON.stringify({session_duration:"1j 05m"}),                                     ip_address:"192.168.1.30", created_at:"2026-03-03T10:00:00" },

  // Dina Marlina — login, hapus akunnya sendiri (resign), logout
  { log_id:18, user_id:2, action_type:"LOGIN",           table_name:"auth",        record_id:2,    old_value:null, new_value:JSON.stringify({username:"dina.siagian",  device:"Edge/Windows"}),               ip_address:"192.168.1.2",  created_at:"2026-03-03T09:00:00" },
  { log_id:19, user_id:2, action_type:"DELETE_ACCOUNT",  table_name:"users",       record_id:2,    old_value:JSON.stringify({name:"Dina Marlina Siagian", reason:"resign"}), new_value:null,                  ip_address:"192.168.1.2",  created_at:"2026-03-03T09:10:00" },
];

const fmt = (d) => d ? new Date(d).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"}) : "—";
const getInitials = (name) => name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
const getEntityName = (code) => entityList.find(e=>e.entity_code===code)?.name||code;
const getBranchName = (code) => branchList.find(b=>b.branch_code===code)?.name||code;
const getDivisionName = (code) => divisionList.find(d=>d.division_code===code)?.name||code;

// ─── CSS ─────────────────────────────────────────────────────
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
  --r:12px;--sh:0 1px 4px rgba(0,0,0,.06);--sh-md:0 4px 16px rgba(0,0,0,.1);
}
.um-root{padding:2rem;max-width:1400px;margin:0 auto;font-family:"Plus Jakarta Sans","Inter",sans-serif;background:var(--bg);min-height:100vh;}
.um-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.75rem;flex-wrap:wrap;gap:1rem;}
.um-title{font-size:1.7rem;font-weight:800;color:var(--slate);margin:0 0 4px;letter-spacing:-.02em;}
.um-subtitle{font-size:.875rem;color:var(--slate-6);margin:0;}

/* STATS */
.um-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;}
@media(max-width:900px){.um-stats{grid-template-columns:repeat(2,1fr);}}
.um-stat-card{background:#fff;border-radius:var(--r);border:1px solid var(--border);padding:1.1rem 1.25rem;display:flex;align-items:center;gap:1rem;box-shadow:var(--sh);transition:box-shadow .2s,transform .2s;}
.um-stat-card:hover{box-shadow:var(--sh-md);transform:translateY(-1px);}
.um-stat-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.um-stat-icon--blue{background:#dbeafe;color:#2563eb;}.um-stat-icon--purple{background:#ede9fe;color:#7c3aed;}
.um-stat-icon--green{background:#dcfce7;color:#16a34a;}.um-stat-icon--gray{background:#f1f5f9;color:#64748b;}
.um-stat-num{font-size:1.6rem;font-weight:800;color:var(--slate);line-height:1;}
.um-stat-label{font-size:.77rem;color:var(--slate-6);margin-top:3px;}

/* TOOLBAR */
.um-toolbar{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap;}
.um-search-wrap{flex:1;min-width:260px;display:flex;align-items:center;gap:.55rem;background:#fff;border:1.5px solid var(--border);border-radius:10px;padding:.55rem .9rem;transition:border-color .15s;}
.um-search-wrap:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.08);}
.um-search-wrap input{border:none;outline:none;font-size:.875rem;flex:1;color:var(--slate);background:#fff;font-family:inherit;}
.um-filter-wrap{display:flex;align-items:center;gap:.45rem;background:#fff;border:1.5px solid var(--border);border-radius:10px;padding:.5rem .85rem;}
.um-filter-wrap select{border:none;outline:none;font-size:.845rem;color:#334155;background:#fff;cursor:pointer;font-family:inherit;}
.um-count{font-size:.82rem;font-weight:600;color:var(--slate-6);background:#fff;border:1px solid var(--border);border-radius:8px;padding:.4rem .8rem;white-space:nowrap;}
.um-filter-disabled{opacity:.5;pointer-events:none;}
.um-filter-chips{display:flex;gap:.35rem;flex-wrap:wrap;align-items:center;}
.um-chip{display:inline-flex;align-items:center;gap:.3rem;background:#dbeafe;color:#1d4ed8;border-radius:99px;padding:2px 10px 2px 10px;font-size:.74rem;font-weight:600;white-space:nowrap;}
.um-chip button{background:none;border:none;cursor:pointer;color:#1d4ed8;font-size:.85rem;padding:0;line-height:1;margin-left:2px;opacity:.7;}
.um-chip button:hover{opacity:1;}

/* TABLE */
.um-table-wrap{background:#fff;border-radius:14px;border:1px solid var(--border);overflow-x:auto;box-shadow:var(--sh);}
.um-table{width:100%;border-collapse:collapse;font-size:.835rem;}
.um-table thead tr{background:linear-gradient(135deg,#1e3a8a,var(--blue));}
.um-table thead th{color:#fff;padding:.8rem 1rem;text-align:left;font-weight:600;font-size:.78rem;white-space:nowrap;}
.um-table tbody tr{border-bottom:1px solid #f1f5f9;transition:background .12s;}
.um-table tbody tr:last-child{border-bottom:none;}
.um-table tbody tr:hover{background:#fafbff;}
.um-table tbody td{padding:.8rem 1rem;vertical-align:middle;}
.um-empty{text-align:center;color:var(--slate-4);padding:3rem!important;}

/* USER CELL */
.um-user-cell{display:flex;align-items:center;gap:.65rem;}
.um-avatar{width:34px;height:34px;border-radius:50%;font-weight:700;font-size:.8rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.um-avatar--blue{background:#dbeafe;color:#1d4ed8;}.um-avatar--purple{background:#ede9fe;color:#7c3aed;}
.um-avatar--lg{width:48px;height:48px;font-size:1rem;border-radius:12px;}
.um-user-name{font-size:.84rem;font-weight:600;color:#1e293b;}
.um-user-email{font-size:.74rem;color:var(--slate-6);}
.um-username{font-family:"Courier New",monospace;font-size:.77rem;font-weight:700;color:var(--blue);background:var(--blue-lt);padding:2px 7px;border-radius:5px;white-space:nowrap;}
.um-entity-cell{display:flex;flex-direction:column;gap:2px;}
.um-entity-code{font-size:.73rem;font-weight:700;color:#7c3aed;background:#ede9fe;padding:1px 6px;border-radius:4px;width:fit-content;}
.um-entity-name{font-size:.78rem;color:var(--slate-6);}
.um-role-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;font-size:.76rem;font-weight:600;white-space:nowrap;}
.um-status-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;font-size:.76rem;font-weight:600;}
.um-status-badge--aktif{background:var(--green-lt);color:var(--green);}.um-status-badge--nonaktif{background:#f1f5f9;color:var(--slate-6);}
.um-status-toggle-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:99px;font-size:.76rem;font-weight:600;border:none;cursor:pointer;font-family:inherit;transition:all .15s;}
.um-status-toggle-btn--aktif{background:var(--green-lt);color:var(--green);}
.um-status-toggle-btn--nonaktif{background:#f1f5f9;color:var(--slate-6);}
.um-status-toggle-btn:hover{filter:brightness(.9);}
.um-last-login{font-size:.79rem;color:var(--slate-6);white-space:nowrap;}

/* ACTION BUTTONS */
.um-actions{display:flex;gap:.3rem;}
.um-action-btn{width:30px;height:30px;border-radius:7px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:all .15s;flex-shrink:0;}
.um-action-btn svg{width:14px;height:14px;display:block;flex-shrink:0;}
.um-action-btn--view{background:#dbeafe;color:#1d4ed8;}.um-action-btn--edit{background:#dcfce7;color:#15803d;}
.um-action-btn--key{background:#fef3c7;color:#d97706;}.um-action-btn--del{background:#fee2e2;color:#b91c1c;}
.um-action-btn:hover{filter:brightness(.88);transform:scale(1.1);}

/* BUTTONS */
.um-btn{display:inline-flex;align-items:center;gap:.4rem;padding:.52rem 1.15rem;border-radius:10px;font-size:.855rem;font-weight:600;border:none;cursor:pointer;transition:all .18s;font-family:inherit;}
.um-btn-lg{padding:.65rem 1.35rem;font-size:.9rem;}
.um-btn-primary{background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#fff;box-shadow:0 2px 8px rgba(37,99,235,.25);}
.um-btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px);}
.um-btn-secondary{background:var(--bg);color:#475569;border:1.5px solid var(--border);}
.um-btn-secondary:hover{background:#e9eef5;}
.um-btn-danger{background:linear-gradient(135deg,#b91c1c,#dc2626);color:#fff;}
.um-btn-warning{background:linear-gradient(135deg,#b45309,#d97706);color:#fff;}

/* MODAL */
.um-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;}
.um-modal{background:#fff;border-radius:18px;width:100%;max-width:520px;max-height:92vh;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.2);overflow:hidden;}
.um-modal--form{max-width:600px;}.um-modal--sm{max-width:400px;}
.um-modal-header{padding:1.15rem 1.5rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);border-top:3px solid var(--blue);background:#fff;}
.um-modal-header h2{font-size:1rem;font-weight:700;color:var(--slate);display:flex;align-items:center;gap:.55rem;margin:0;}
.um-modal-close{background:none;border:none;cursor:pointer;color:var(--slate-4);padding:.15rem;border-radius:6px;display:flex;align-items:center;}
.um-modal-close:hover{background:var(--bg);}
.um-modal-body{padding:1.3rem 1.5rem;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:1rem;background:#fff;}
.um-modal-footer{padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;gap:.6rem;justify-content:flex-end;background:#fff;}

/* FORM */
.um-form-row{display:grid;grid-template-columns:1fr 1fr;gap:.85rem;}
@media(max-width:520px){.um-form-row{grid-template-columns:1fr;}}
.um-form-group{display:flex;flex-direction:column;gap:.35rem;}
.um-form-group label{font-size:.81rem;font-weight:600;color:#475569;display:flex;align-items:center;gap:4px;}
.um-form-group input,.um-form-group select{padding:.52rem .8rem;border-radius:9px;border:1.5px solid var(--border);font-size:.845rem;outline:none;transition:border .15s,box-shadow .15s;font-family:inherit;background:#fff!important;color:var(--slate)!important;}
.um-form-group input:focus,.um-form-group select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.09);}
.um-input-error{border-color:var(--red)!important;}
.um-error{font-size:.74rem;color:var(--red);}
.um-hint{font-size:.74rem;color:var(--slate-4);}
.um-req{color:var(--red);}
.um-pass-wrap{position:relative;}
.um-pass-wrap input{width:100%;padding-right:2.5rem;}
.um-pass-toggle{position:absolute;right:.6rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--slate-4);display:flex;align-items:center;padding:0;}
.um-pass-toggle:hover{color:var(--slate-6);}
.um-pass-toggle svg{width:14px;height:14px;display:block;}
.um-role-options{display:flex;gap:.5rem;flex-wrap:wrap;}
.um-role-opt{display:flex;align-items:center;gap:.45rem;padding:.42rem .9rem;border-radius:99px;border:1.5px solid var(--border);cursor:pointer;font-size:.81rem;font-weight:600;color:var(--slate-6);background:#fff;transition:all .14s;}
.um-role-opt input[type="radio"]{display:none;}
.um-role-opt.active{font-weight:700;}
.um-role-opt svg{width:13px;height:13px;display:block;}
.um-status-toggle{display:flex;gap:.5rem;}
.um-status-btn{display:inline-flex;align-items:center;gap:.4rem;padding:.42rem .9rem;border-radius:99px;border:1.5px solid var(--border);cursor:pointer;font-size:.81rem;font-weight:600;background:#fff;color:var(--slate-6);font-family:inherit;transition:all .14s;}
.um-status-btn.active-green{background:var(--green-lt);color:var(--green);border-color:var(--green);}
.um-status-btn.active-red{background:var(--red-lt);color:var(--red);border-color:var(--red);}
.um-status-btn svg{width:13px;height:13px;display:block;}

/* DETAIL */
.um-detail-profile{display:flex;align-items:center;gap:1rem;padding:1rem;background:var(--bg);border:1px solid var(--border);border-radius:12px;}
.um-detail-name{font-size:1rem;font-weight:700;color:var(--slate);}
.um-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:.8rem 1.5rem;}
.um-detail-item{display:flex;flex-direction:column;gap:3px;}
.um-detail-label{font-size:.73rem;font-weight:700;color:var(--slate-4);text-transform:uppercase;letter-spacing:.04em;}
.um-detail-val{font-size:.84rem;color:var(--slate);}

/* DELETE / RESET */
.um-delete-icon{width:52px;height:52px;border-radius:50%;background:var(--red-lt);color:var(--red);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;}
.um-delete-icon svg{width:22px;height:22px;}
.um-delete-title{font-size:1.05rem;font-weight:700;color:var(--slate);margin:0 0 .5rem;}
.um-delete-desc{font-size:.86rem;color:var(--slate-6);margin:0;}
.um-reset-icon{width:52px;height:52px;border-radius:50%;background:var(--warn-lt);color:var(--warn);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;}
.um-reset-icon svg{width:22px;height:22px;}
.um-reset-success{width:52px;height:52px;border-radius:50%;background:var(--green-lt);color:var(--green);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;}
.um-reset-success svg{width:22px;height:22px;}

/* ═══════════════════════════════════════
   ACTIVITY LOG SECTION
   ═══════════════════════════════════════ */
.al-section{margin-top:1.5rem;border-radius:14px;border:1px solid var(--teal-ring);overflow:hidden;box-shadow:var(--sh);}

/* Header collapsible */
.al-header{background:linear-gradient(135deg,var(--teal-lt),#ecfeff);padding:.9rem 1.25rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;border-bottom:1px solid var(--teal-ring);transition:background .15s;}
.al-header:hover{background:linear-gradient(135deg,#d1fae5,#cffafe);}
.al-header-left{display:flex;align-items:center;gap:.65rem;}
.al-header-title{font-size:.92rem;font-weight:700;color:var(--teal);}
.al-header-count{font-size:.74rem;font-weight:600;color:#0d9488;background:#fff;border:1px solid var(--teal-ring);border-radius:99px;padding:1px 9px;}

.al-body{background:#fff;}

/* Toolbar */
.al-toolbar{display:flex;align-items:center;gap:.65rem;padding:.9rem 1.1rem;border-bottom:1px solid #f0fdf4;flex-wrap:wrap;}
.al-search-wrap{flex:1;min-width:200px;display:flex;align-items:center;gap:.45rem;background:var(--bg);border:1.5px solid var(--border);border-radius:9px;padding:.45rem .8rem;transition:border-color .15s;}
.al-search-wrap:focus-within{border-color:#14b8a6;box-shadow:0 0 0 3px rgba(20,184,166,.1);}
.al-search-wrap input{border:none;outline:none;font-size:.82rem;flex:1;color:var(--slate);background:transparent;font-family:inherit;}
.al-filter-wrap{display:flex;align-items:center;gap:.4rem;background:var(--bg);border:1.5px solid var(--border);border-radius:9px;padding:.42rem .75rem;}
.al-filter-wrap select{border:none;outline:none;font-size:.8rem;color:#334155;background:transparent;cursor:pointer;font-family:inherit;}

/* Table */
.al-table-wrap{overflow-x:auto;}
.al-table{width:100%;border-collapse:collapse;font-size:.815rem;}
.al-table thead tr{background:linear-gradient(135deg,var(--teal),var(--teal-dk));}
.al-table thead th{color:#fff;padding:.7rem 1rem;text-align:left;font-weight:600;font-size:.76rem;white-space:nowrap;}
.al-table tbody tr{border-bottom:1px solid #f0fdf4;transition:background .12s;}
.al-table tbody tr:last-child{border-bottom:none;}
.al-table tbody tr:hover{background:#f0fdf4;}
.al-table tbody td{padding:.72rem 1rem;vertical-align:middle;}
.al-empty{text-align:center;color:var(--slate-4);padding:2.5rem!important;}

/* Cells */
.al-timestamp-date{font-size:.79rem;font-weight:600;color:#334155;}
.al-timestamp-time{font-size:.72rem;color:var(--slate-4);}
.al-user-cell{display:flex;align-items:center;gap:.5rem;}
.al-action-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:99px;font-size:.74rem;font-weight:700;white-space:nowrap;}
.al-table-name{font-family:"Courier New",monospace;font-size:.76rem;font-weight:600;color:var(--teal);background:var(--teal-lt);padding:2px 6px;border-radius:4px;}
.al-record-id{font-family:"Courier New",monospace;font-size:.76rem;color:var(--slate-4);}
.al-ip{font-family:"Courier New",monospace;font-size:.76rem;color:var(--slate-6);background:#f8fafc;padding:2px 6px;border-radius:4px;border:1px solid var(--border);}

/* Diff button */
.al-diff-btn{background:none;border:1.5px solid var(--border);border-radius:7px;padding:3px 8px;cursor:pointer;font-size:.73rem;color:var(--slate-6);display:inline-flex;align-items:center;gap:3px;transition:all .12s;font-family:inherit;}
.al-diff-btn:hover{border-color:#14b8a6;color:var(--teal);background:var(--teal-lt);}
.al-diff-btn svg{width:12px;height:12px;}

/* Pagination */
.al-pagination{display:flex;align-items:center;justify-content:space-between;padding:.8rem 1.1rem;border-top:1px solid #f0fdf4;background:#fafffe;flex-wrap:wrap;gap:.5rem;}
.al-page-info{font-size:.78rem;color:var(--slate-6);}
.al-page-btns{display:flex;gap:.35rem;}
.al-page-btn{min-width:28px;height:28px;border-radius:7px;border:1.5px solid var(--border);background:#fff;cursor:pointer;font-size:.78rem;font-weight:600;color:var(--slate-6);display:flex;align-items:center;justify-content:center;transition:all .12s;font-family:inherit;padding:0 6px;}
.al-page-btn:hover:not(:disabled){border-color:#14b8a6;color:var(--teal);background:var(--teal-lt);}
.al-page-btn.active{background:var(--teal);border-color:var(--teal);color:#fff;}
.al-page-btn:disabled{opacity:.4;cursor:not-allowed;}

/* Diff Popover */
.al-diff-overlay{position:fixed;inset:0;z-index:1999;}
.al-diff-popover{position:fixed;z-index:2000;background:#fff;border:1px solid var(--border);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.14);padding:1rem 1.1rem;min-width:320px;max-width:480px;}
.al-diff-title{font-size:.8rem;font-weight:700;color:var(--slate);margin-bottom:.65rem;display:flex;align-items:center;gap:.4rem;}
.al-diff-cols{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;}
.al-diff-col{display:flex;flex-direction:column;gap:.3rem;}
.al-diff-col-label{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:2px 8px;border-radius:4px;width:fit-content;}
.al-diff-col-label--old{background:var(--red-lt);color:#b91c1c;}
.al-diff-col-label--new{background:var(--green-lt);color:#15803d;}
.al-diff-content{background:#f8fafc;border-radius:8px;padding:.5rem .65rem;font-family:"Courier New",monospace;font-size:.72rem;color:#334155;white-space:pre-wrap;word-break:break-all;max-height:150px;overflow-y:auto;border:1px solid var(--border);}
.al-diff-null{font-style:italic;color:var(--slate-4);}
`;

// ─── MODAL: Form ──────────────────────────────────────────────
function UserFormModal({ user, onClose, onSave }) {
  const isEdit = !!user;
  const [form, setForm] = useState(
    user ? { name:user.name, nip:user.nip||"", username:user.username, email:user.email, phone:user.phone||"", role_code:user.role_code, entity_code:user.entity_code, branch_code:user.branch_code||"", division_code:user.division_code||"", is_active:user.is_active, password:"", confirm_password:"" }
         : { name:"", nip:"", username:"", email:"", phone:"", role_code:"user", entity_code:"", branch_code:"", division_code:"", is_active:true, password:"", confirm_password:"" }
  );
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const filteredBranches = branchList.filter(b => b.entity_code === form.entity_code);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Wajib diisi";
    if (!form.nip.trim()) e.nip = "Wajib diisi";
    if (!form.username.trim()) e.username = "Wajib diisi";
    if (!form.email.trim()) e.email = "Wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid";
    if (!form.phone.trim()) e.phone = "Wajib diisi";
    if (!form.entity_code) e.entity_code = "Wajib dipilih";
    if (!form.branch_code) e.branch_code = "Wajib dipilih";
    if (!form.division_code) e.division_code = "Wajib dipilih";
    if (!isEdit && !form.password) e.password = "Wajib diisi";
    if (form.password && form.password.length < 8) e.password = "Minimal 8 karakter";
    if (form.password && form.password !== form.confirm_password) e.confirm_password = "Password tidak cocok";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ ...user, ...form, id:user?.id||Date.now(), created_at:user?.created_at||new Date().toISOString().split("T")[0], last_login:user?.last_login||"—" });
    onClose();
  };

  return (
    <div className="um-overlay" onClick={onClose}>
      <div className="um-modal um-modal--form" onClick={e=>e.stopPropagation()}>
        <div className="um-modal-header">
          <h2><Ico n={isEdit?"edit":"plus"} size={15}/> {isEdit?"Edit User":"Tambah User Baru"}</h2>
          <button className="um-modal-close" onClick={onClose}><Ico n="times" size={14}/></button>
        </div>
        <div className="um-modal-body">
          <div className="um-form-group">
            <label><Ico n="user" size={12}/> Nama Lengkap <span className="um-req">*</span></label>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Joy Valeda Silalahi" className={errors.name?"um-input-error":""}/>
            {errors.name && <span className="um-error">{errors.name}</span>}
          </div>
          <div className="um-form-row">
            <div className="um-form-group">
              <label><Ico n="idCard" size={12}/> NIP <span className="um-req">*</span></label>
              <input value={form.nip} onChange={e=>setForm({...form,nip:e.target.value})} placeholder="NIP" className={errors.nip?"um-input-error":""}/>
              {errors.nip && <span className="um-error">{errors.nip}</span>}
            </div>
            <div className="um-form-group">
              <label><Ico n="user" size={12}/> Username <span className="um-req">*</span></label>
              <input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="joy.silalahi" className={errors.username?"um-input-error":""}/>
              {errors.username && <span className="um-error">{errors.username}</span>}
            </div>
          </div>
          <div className="um-form-group">
            <label><Ico n="phone" size={12}/> No. Telepon <span className="um-req">*</span></label>
            <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="08xxxxxxxxxx" className={errors.phone?"um-input-error":""}/>
            {errors.phone && <span className="um-error">{errors.phone}</span>}
          </div>
          <div className="um-form-group">
            <label><Ico n="shield" size={12}/> Role / Peran <span className="um-req">*</span></label>
            <div className="um-role-options">
              {Object.entries(roleConfig).map(([val,cfg]) => (
                <label key={val} className={`um-role-opt ${form.role_code===val?"active":""}`} style={form.role_code===val?{borderColor:cfg.color,background:cfg.bg,color:cfg.color}:{}}>
                  <input type="radio" name="role" value={val} checked={form.role_code===val} onChange={()=>setForm({...form,role_code:val})}/>
                  <Ico n={cfg.iconName} size={13}/> {cfg.label}
                </label>
              ))}
            </div>
          </div>
          <div className="um-form-group">
            <label><Ico n="building" size={12}/> Entitas <span className="um-req">*</span></label>
            <select value={form.entity_code} onChange={e=>setForm({...form,entity_code:e.target.value,branch_code:"",division_code:""})} className={errors.entity_code?"um-input-error":""}>
              <option value="">-- Pilih Entitas --</option>
              {entityList.map(e=><option key={e.entity_code} value={e.entity_code}>{e.entity_code} — {e.name}</option>)}
            </select>
            {errors.entity_code && <span className="um-error">{errors.entity_code}</span>}
          </div>
          <div className="um-form-group">
            <label><Ico n="mapPin" size={12}/> Cabang / Branch <span className="um-req">*</span></label>
            <select value={form.branch_code} onChange={e=>setForm({...form,branch_code:e.target.value,division_code:""})} className={errors.branch_code?"um-input-error":""} disabled={!form.entity_code}>
              <option value="">-- Pilih Cabang --</option>
              {filteredBranches.map(b=><option key={b.branch_code} value={b.branch_code}>{b.name}</option>)}
            </select>
            {!form.entity_code && <span className="um-hint">Pilih entitas terlebih dahulu</span>}
            {errors.branch_code && <span className="um-error">{errors.branch_code}</span>}
          </div>
          <div className="um-form-group">
            <label><Ico n="idCard" size={12}/> Divisi <span className="um-req">*</span></label>
            <select value={form.division_code} onChange={e=>setForm({...form,division_code:e.target.value})} className={errors.division_code?"um-input-error":""} disabled={!form.branch_code}>
              <option value="">-- Pilih Divisi --</option>
              {divisionList.filter(d=>d.branch_code===form.branch_code).map(d=><option key={d.division_code} value={d.division_code}>{d.name}</option>)}
            </select>
            {!form.branch_code && <span className="um-hint">Pilih branch terlebih dahulu</span>}
            {errors.division_code && <span className="um-error">{errors.division_code}</span>}
          </div>
          <div className="um-form-group">
            <label><Ico n="envelope" size={12}/> Email <span className="um-req">*</span></label>
            <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="nama@pelindo.co.id" className={errors.email?"um-input-error":""}/>
            {errors.email && <span className="um-error">{errors.email}</span>}
          </div>
          <div className="um-form-row">
            <div className="um-form-group">
              <label><Ico n="lock" size={12}/> {isEdit?"Password Baru (kosongkan jika tidak diubah)":<><span>Password</span> <span className="um-req">*</span></>}</label>
              <div className="um-pass-wrap">
                <input type={showPass?"text":"password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Min. 8 karakter" className={errors.password?"um-input-error":""}/>
                <button type="button" className="um-pass-toggle" onClick={()=>setShowPass(!showPass)}><Ico n={showPass?"eyeSlash":"eye"} size={14}/></button>
              </div>
              {errors.password && <span className="um-error">{errors.password}</span>}
            </div>
            <div className="um-form-group">
              <label><Ico n="lock" size={12}/> Konfirmasi Password {!isEdit && <span className="um-req">*</span>}</label>
              <div className="um-pass-wrap">
                <input type={showConfirm?"text":"password"} value={form.confirm_password} onChange={e=>setForm({...form,confirm_password:e.target.value})} placeholder="Ulangi password" className={errors.confirm_password?"um-input-error":""}/>
                <button type="button" className="um-pass-toggle" onClick={()=>setShowConfirm(!showConfirm)}><Ico n={showConfirm?"eyeSlash":"eye"} size={14}/></button>
              </div>
              {errors.confirm_password && <span className="um-error">{errors.confirm_password}</span>}
            </div>
          </div>
          <div className="um-form-group">
            <label>Status Akun</label>
            <div className="um-status-toggle">
              <button type="button" className={`um-status-btn ${form.is_active?"active-green":""}`} onClick={()=>setForm({...form,is_active:true})}><Ico n="userCheck" size={13}/> Aktif</button>
              <button type="button" className={`um-status-btn ${!form.is_active?"active-red":""}`} onClick={()=>setForm({...form,is_active:false})}><Ico n="userSlash" size={13}/> Nonaktif</button>
            </div>
          </div>
        </div>
        <div className="um-modal-footer">
          <button className="um-btn um-btn-secondary" onClick={onClose}>Batal</button>
          <button className="um-btn um-btn-primary" onClick={handleSave}><Ico n="check" size={13}/> {isEdit?"Simpan Perubahan":"Buat User"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: Detail ────────────────────────────────────────────
function DetailUserModal({ user, onClose, onEdit }) {
  if (!user) return null;
  const rc = roleConfig[user.role_code];
  return (
    <div className="um-overlay" onClick={onClose}>
      <div className="um-modal" onClick={e=>e.stopPropagation()}>
        <div className="um-modal-header">
          <h2><Ico n="eye" size={15}/> Detail User</h2>
          <button className="um-modal-close" onClick={onClose}><Ico n="times" size={14}/></button>
        </div>
        <div className="um-modal-body">
          <div className="um-detail-profile">
            <div className={`um-avatar um-avatar--lg um-avatar--${user.role_code==="superadmin"?"purple":"blue"}`}>{getInitials(user.name)}</div>
            <div>
              <div className="um-detail-name">{user.name}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:6}}>
                <span className="um-role-badge" style={{color:rc.color,background:rc.bg}}><Ico n={rc.iconName} size={12}/> {rc.label}</span>
                <span className={`um-status-badge um-status-badge--${user.is_active?"aktif":"nonaktif"}`}><Ico n={user.is_active?"userCheck":"userSlash"} size={12}/> {user.is_active?"Aktif":"Nonaktif"}</span>
              </div>
            </div>
          </div>
          <div className="um-detail-grid">
            <div className="um-detail-item"><span className="um-detail-label">NIP</span><span className="um-detail-val"><code>{user.nip||"—"}</code></span></div>
            <div className="um-detail-item"><span className="um-detail-label">Username</span><span className="um-detail-val"><code>@{user.username}</code></span></div>
            <div className="um-detail-item"><span className="um-detail-label">Email</span><span className="um-detail-val">{user.email}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">No. Telepon</span><span className="um-detail-val">{user.phone||"—"}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Entitas</span><span className="um-detail-val">{getEntityName(user.entity_code)}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Branch</span><span className="um-detail-val">{getBranchName(user.branch_code)}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Divisi</span><span className="um-detail-val">{getDivisionName(user.division_code)||"—"}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Tgl Dibuat</span><span className="um-detail-val">{fmt(user.created_at)}</span></div>
            <div className="um-detail-item"><span className="um-detail-label">Login Terakhir</span><span className="um-detail-val">{user.last_login}</span></div>
          </div>
        </div>
        <div className="um-modal-footer">
          <button className="um-btn um-btn-secondary" onClick={onClose}>Tutup</button>
          <button className="um-btn um-btn-primary" onClick={()=>{onEdit(user);onClose();}}><Ico n="edit" size={13}/> Edit User</button>
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
      <div className="um-modal um-modal--sm" onClick={e=>e.stopPropagation()}>
        <div className="um-modal-body" style={{alignItems:"center",textAlign:"center",paddingTop:32}}>
          <div className="um-delete-icon"><Ico n="trash" size={22}/></div>
          <h3 className="um-delete-title">Hapus User?</h3>
          <p className="um-delete-desc">User <strong>{user.name}</strong> akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.</p>
        </div>
        <div className="um-modal-footer" style={{justifyContent:"center"}}>
          <button className="um-btn um-btn-secondary" onClick={onClose}>Batal</button>
          <button className="um-btn um-btn-danger" onClick={()=>{onConfirm(user.id);onClose();}}><Ico n="trash" size={13}/> Ya, Hapus</button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: Reset Password ────────────────────────────────────
function ResetPassModal({ user, onClose, onDone }) {
  const [done, setDone] = useState(false);
  if (!user) return null;
  const handleSend = () => { setDone(true); onDone && onDone(user); };
  return (
    <div className="um-overlay" onClick={onClose}>
      <div className="um-modal um-modal--sm" onClick={e=>e.stopPropagation()}>
        <div className="um-modal-header">
          <h2><Ico n="key" size={15}/> Reset Password</h2>
          <button className="um-modal-close" onClick={onClose}><Ico n="times" size={14}/></button>
        </div>
        <div className="um-modal-body" style={{alignItems:"center",textAlign:"center"}}>
          {done ? (
            <><div className="um-reset-success"><Ico n="check" size={22}/></div><p>Password untuk <strong>{user.name}</strong> berhasil direset. Link dikirim ke <strong>{user.email}</strong>.</p></>
          ) : (
            <><div className="um-reset-icon"><Ico n="key" size={22}/></div><p>Reset password untuk <strong>{user.name}</strong>? Link reset dikirim ke <strong>{user.email}</strong>.</p></>
          )}
        </div>
        <div className="um-modal-footer" style={{justifyContent:"center"}}>
          {done ? <button className="um-btn um-btn-primary" onClick={onClose}>Selesai</button>
                : <><button className="um-btn um-btn-secondary" onClick={onClose}>Batal</button><button className="um-btn um-btn-warning" onClick={handleSend}><Ico n="key" size={13}/> Kirim Link Reset</button></>}
        </div>
      </div>
    </div>
  );
}

// ─── DIFF POPOVER ─────────────────────────────────────────────
function DiffPopover({ log, rect, onClose }) {
  const ref = useRef(null);
  React.useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const fmt = v => {
    if (v === null || v === undefined) return null;
    try { return JSON.stringify(JSON.parse(v), null, 2); } catch { return String(v); }
  };

  const oldStr = fmt(log.old_value);
  const newStr = fmt(log.new_value);

  const top = Math.min((rect?.bottom || 100) + 6, window.innerHeight - 280);
  const left = Math.min(rect?.left || 100, window.innerWidth - 500);

  return (
    <>
      <div className="al-diff-overlay" onClick={onClose}/>
      <div className="al-diff-popover" ref={ref} style={{top, left}}>
        <div className="al-diff-title"><Ico n="diff" size={13}/> Perubahan Data — Record ID #{log.record_id}</div>
        <div className="al-diff-cols">
          <div className="al-diff-col">
            <span className="al-diff-col-label al-diff-col-label--old">Sebelum (old_value)</span>
            <div className="al-diff-content">{oldStr ? oldStr : <span className="al-diff-null">— null —</span>}</div>
          </div>
          <div className="al-diff-col">
            <span className="al-diff-col-label al-diff-col-label--new">Sesudah (new_value)</span>
            <div className="al-diff-content">{newStr ? newStr : <span className="al-diff-null">— null —</span>}</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── ACTIVITY LOG SECTION ─────────────────────────────────────
const LOGS_PER_PAGE = 8;

function ActivityLogSection({ logs, users }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("semua");
  const [page, setPage] = useState(1);
  const [diff, setDiff] = useState(null); // { log, rect }

  const getUserById = id => users.find(u => u.id === id);

  const filtered = [...logs]
    .filter(log => {
      const user = getUserById(log.user_id);
      const q = search.toLowerCase();
      const matchQ = (user?.name||"").toLowerCase().includes(q)
        || log.action_type.toLowerCase().includes(q)
        || log.table_name.toLowerCase().includes(q)
        || (log.ip_address||"").includes(q);
      const matchA = filterAction === "semua" || log.action_type === filterAction;
      return matchQ && matchA;
    })
    .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));

  const totalPages = Math.max(1, Math.ceil(filtered.length / LOGS_PER_PAGE));
  const paginated = filtered.slice((page-1)*LOGS_PER_PAGE, page*LOGS_PER_PAGE);

  React.useEffect(() => { setPage(1); }, [search, filterAction]);

  return (
    <div className="al-section">
      {/* ── Collapsible Header ── */}
      <div className="al-header" onClick={() => setOpen(o => !o)}>
        <div className="al-header-left">
          <Ico n="activity" size={16} style={{color:"#0f766e"}}/>
          <span className="al-header-title">Log Aktivitas Pengguna</span>
          <span className="al-header-count">{logs.length} entri</span>
        </div>
        <Ico n={open?"chevronUp":"chevronDown"} size={15} style={{color:"#0f766e"}}/>
      </div>

      {open && (
        <div className="al-body">
          {/* Toolbar */}
          <div className="al-toolbar">
            <div className="al-search-wrap">
              <Ico n="search" size={13} style={{color:"#94a3b8"}}/>
              <input placeholder="Cari pegawai, aksi, tabel, IP…" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            <div className="al-filter-wrap">
              <Ico n="filter" size={12} style={{color:"#94a3b8"}}/>
              <select value={filterAction} onChange={e=>setFilterAction(e.target.value)}>
                <option value="semua">Semua Aksi</option>
                {Object.entries(ACTION_CONFIG).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <span style={{fontSize:".78rem",color:"#64748b",marginLeft:"auto"}}>{filtered.length} log ditemukan</span>
          </div>

          {/* Table */}
          <div className="al-table-wrap">
            <table className="al-table">
              <thead>
                <tr>
                  <th><Ico n="clock" size={11} style={{verticalAlign:"middle",marginRight:4}}/> Waktu</th>
                  <th><Ico n="user" size={11} style={{verticalAlign:"middle",marginRight:4}}/> Pegawai</th>
                  <th><Ico n="activity" size={11} style={{verticalAlign:"middle",marginRight:4}}/> Aksi</th>
                  <th><Ico n="database" size={11} style={{verticalAlign:"middle",marginRight:4}}/> Tabel</th>
                  <th>Record ID</th>
                  <th>Perubahan</th>
                  <th><Ico n="globe" size={11} style={{verticalAlign:"middle",marginRight:4}}/> IP Address</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="al-empty">Tidak ada log yang cocok</td></tr>
                ) : paginated.map(log => {
                  const user = getUserById(log.user_id);
                  const ac = ACTION_CONFIG[log.action_type] || {label:log.action_type, color:"#64748b", bg:"#f1f5f9"};
                  const d = new Date(log.created_at);
                  const dateStr = d.toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"});
                  const timeStr = d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
                  const hasDiff = log.old_value !== null || log.new_value !== null;
                  return (
                    <tr key={log.log_id}>
                      <td>
                        <div className="al-timestamp-date">{dateStr}</div>
                        <div className="al-timestamp-time">{timeStr}</div>
                      </td>
                      <td>
                        {user ? (
                          <div className="al-user-cell">
                            <div className={`um-avatar um-avatar--${user.role_code==="superadmin"?"purple":"blue"}`} style={{width:28,height:28,fontSize:".7rem"}}>{getInitials(user.name)}</div>
                            <div>
                              <div style={{fontSize:".8rem",fontWeight:600,color:"#1e293b"}}>{user.name}</div>
                              <div style={{fontSize:".7rem",color:"#94a3b8"}}>ID #{log.user_id}</div>
                            </div>
                          </div>
                        ) : <span style={{fontSize:".78rem",color:"#94a3b8"}}>ID #{log.user_id}</span>}
                      </td>
                      <td>
                        <span className="al-action-badge" style={{color:ac.color,background:ac.bg}}>{ac.label}</span>
                      </td>
                      <td><span className="al-table-name">{log.table_name}</span></td>
                      <td><span className="al-record-id">#{log.record_id}</span></td>
                      <td>
                        {hasDiff
                          ? <button className="al-diff-btn" onClick={e=>setDiff({log,rect:e.currentTarget.getBoundingClientRect()})}>
                              <Ico n="diff" size={12}/> Lihat
                            </button>
                          : <span style={{fontSize:".73rem",color:"#cbd5e1"}}>—</span>}
                      </td>
                      <td><span className="al-ip">{log.ip_address||"—"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="al-pagination">
              <span className="al-page-info">
                {Math.min((page-1)*LOGS_PER_PAGE+1, filtered.length)}–{Math.min(page*LOGS_PER_PAGE, filtered.length)} dari {filtered.length} log
              </span>
              <div className="al-page-btns">
                <button className="al-page-btn" onClick={()=>setPage(p=>p-1)} disabled={page===1}>‹</button>
                {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
                  <button key={p} className={`al-page-btn ${p===page?"active":""}`} onClick={()=>setPage(p)}>{p}</button>
                ))}
                <button className="al-page-btn" onClick={()=>setPage(p=>p+1)} disabled={page===totalPages}>›</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Diff Popover */}
      {diff && <DiffPopover log={diff.log} rect={diff.rect} onClose={()=>setDiff(null)}/>}
    </div>
  );
}

// ─── KOMPONEN UTAMA ───────────────────────────────────────────
const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [logs, setLogs] = useState(mockLogs);
  const logIdRef = useRef(mockLogs.length + 1);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("semua");
  const [filterEntity, setFilterEntity] = useState("semua");
  const [filterBranch, setFilterBranch] = useState("semua");
  const [filterDivision, setFilterDivision] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [modal, setModal] = useState(null);

  // Cascade: branch dan divisi yang tersedia berdasarkan filter entitas/branch aktif
  const availableBranches = filterEntity === "semua"
    ? branchList
    : branchList.filter(b => b.entity_code === filterEntity);

  const availableDivisions = filterBranch === "semua"
    ? (filterEntity === "semua" ? divisionList : divisionList.filter(d => d.entity_code === filterEntity))
    : divisionList.filter(d => d.branch_code === filterBranch);

  // Reset cascade saat entitas berubah
  const handleFilterEntity = (val) => {
    setFilterEntity(val);
    setFilterBranch("semua");
    setFilterDivision("semua");
  };
  // Reset divisi saat branch berubah
  const handleFilterBranch = (val) => {
    setFilterBranch(val);
    setFilterDivision("semua");
  };

  // ── Pencatatan log non-blocking dengan queueMicrotask ──────
  // Setiap aksi user di halaman ini dicatat ke activity_logs.
  // Di production: ganti queueMicrotask dengan POST /api/activity-logs
  const recordActivity = useCallback(({ action_type, table_name = "users", record_id = null, old_value = null, new_value = null }) => {
    const entry = {
      log_id: logIdRef.current++,
      user_id: CURRENT_USER_ID,           // FK → users.id (user yang sedang login)
      action_type,                         // varchar 255
      table_name,                          // varchar 100 — modul/tabel yang diakses
      record_id,                           // bigint — ID record yang dilihat/diubah
      old_value: old_value ? (typeof old_value === "string" ? old_value : JSON.stringify(old_value)) : null,
      new_value: new_value ? (typeof new_value === "string" ? new_value : JSON.stringify(new_value)) : null,
      ip_address: CURRENT_USER_IP,         // varchar 255
      created_at: new Date().toISOString(), // timestamp default now()
    };
    queueMicrotask(() => setLogs(prev => [entry, ...prev]));
  }, []);

  // Catat VIEW_USER_MANAGEMENT saat halaman pertama kali dibuka
  React.useEffect(() => {
    recordActivity({ action_type:"VIEW_USER_MANAGEMENT", table_name:"users" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (u.name.toLowerCase().includes(q)||u.username.toLowerCase().includes(q)||u.email.toLowerCase().includes(q)||(u.nip&&u.nip.includes(q)))
      && (filterRole==="semua"||u.role_code===filterRole)
      && (filterEntity==="semua"||u.entity_code===filterEntity)
      && (filterBranch==="semua"||u.branch_code===filterBranch)
      && (filterDivision==="semua"||u.division_code===filterDivision)
      && (filterStatus==="semua"||(filterStatus==="aktif"?u.is_active:!u.is_active));
  });

  const stats = {
    total: users.length,
    superadmin: users.filter(u=>u.role_code==="superadmin").length,
    aktif: users.filter(u=>u.is_active).length,
    nonaktif: users.filter(u=>!u.is_active).length,
  };

  // ── Handlers dengan auto-log ──────────────────────────────
  const handleSave = saved => {
    const existing = users.find(u => u.id === saved.id);
    if (existing) {
      setUsers(users.map(u => u.id === saved.id ? saved : u));
    } else {
      setUsers([saved, ...users]);
    }
  };

  const handleDelete = id => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleToggle = id => {
    setUsers(users.map(u => u.id === id ? {...u, is_active:!u.is_active} : u));
  };

  const handleResetDone = _user => {};

  return (
    <div className="um-root">
      <style>{css}</style>
      <div className="um-header">
        <div>
          <h1 className="um-title">User Management</h1>
          <p className="um-subtitle">Kelola akun dan hak akses pengguna sistem PT Pelindo Multi Terminal</p>
        </div>
        <button className="um-btn um-btn-primary um-btn-lg" onClick={()=>setModal({type:"form",user:null})}>
          <Ico n="plus" size={14}/> Tambah User
        </button>
      </div>

      <div className="um-stats">
        {[
          {icon:"user",   color:"blue",   num:stats.total,      label:"Total User"},
          {icon:"shield", color:"purple", num:stats.superadmin, label:"Super Admin"},
          {icon:"userCheck",color:"green",num:stats.aktif,      label:"Akun Aktif"},
          {icon:"userSlash",color:"gray", num:stats.nonaktif,   label:"Akun Nonaktif"},
        ].map(s=>(
          <div key={s.label} className="um-stat-card">
            <div className={`um-stat-icon um-stat-icon--${s.color}`}><Ico n={s.icon} size={18}/></div>
            <div><div className="um-stat-num">{s.num}</div><div className="um-stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>

      <div className="um-toolbar">
        <div className="um-search-wrap">
          <Ico n="search" size={14}/>
          <input placeholder="Cari nama, NIP, username, atau email…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {/* Filter Role */}
        <div className="um-filter-wrap">
          <Ico n="shield" size={13}/>
          <select value={filterRole} onChange={e=>setFilterRole(e.target.value)}>
            <option value="semua">Semua Role</option>
            <option value="superadmin">Super Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        {/* Filter Entitas — cascade root */}
        <div className="um-filter-wrap">
          <Ico n="building" size={13}/>
          <select value={filterEntity} onChange={e=>handleFilterEntity(e.target.value)}>
            <option value="semua">Semua Entitas</option>
            {entityList.map(e=><option key={e.entity_code} value={e.entity_code}>{e.entity_code} — {e.name}</option>)}
          </select>
        </div>
        {/* Filter Branch — hanya tampil setelah entitas dipilih */}
        <div className={`um-filter-wrap ${filterEntity==="semua"?"um-filter-disabled":""}`}>
          <Ico n="mapPin" size={13}/>
          <select value={filterBranch} onChange={e=>handleFilterBranch(e.target.value)} disabled={filterEntity==="semua"}>
            <option value="semua">{filterEntity==="semua"?"Pilih entitas dulu":"Semua Branch"}</option>
            {availableBranches.map(b=><option key={b.branch_code} value={b.branch_code}>{b.name}</option>)}
          </select>
        </div>
        {/* Filter Divisi — hanya tampil setelah branch dipilih */}
        <div className={`um-filter-wrap ${filterBranch==="semua"?"um-filter-disabled":""}`}>
          <Ico n="idCard" size={13}/>
          <select value={filterDivision} onChange={e=>setFilterDivision(e.target.value)} disabled={filterBranch==="semua"}>
            <option value="semua">{filterBranch==="semua"?"Pilih branch dulu":"Semua Divisi"}</option>
            {availableDivisions.map(d=><option key={d.division_code} value={d.division_code}>{d.name}</option>)}
          </select>
        </div>
        {/* Filter Status */}
        <div className="um-filter-wrap">
          <Ico n="filter" size={13}/>
          <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
            <option value="semua">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
        </div>
        {/* Active filter chips */}
        {(filterEntity!=="semua"||filterBranch!=="semua"||filterDivision!=="semua") && (
          <div className="um-filter-chips">
            {filterEntity!=="semua" && <span className="um-chip">{filterEntity} <button onClick={()=>handleFilterEntity("semua")}>×</button></span>}
            {filterBranch!=="semua" && <span className="um-chip">{getBranchName(filterBranch)} <button onClick={()=>handleFilterBranch("semua")}>×</button></span>}
            {filterDivision!=="semua" && <span className="um-chip">{getDivisionName(filterDivision)} <button onClick={()=>setFilterDivision("semua")}>×</button></span>}
          </div>
        )}
        <div className="um-count">{filtered.length} user</div>
      </div>

      <div className="um-table-wrap">
        <table className="um-table">
          <thead>
            <tr><th>User</th><th>NIP</th><th>Username</th><th>Entitas</th><th>Branch / Divisi</th><th>Role</th><th>Status</th><th>Login Terakhir</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} className="um-empty">Tidak ada user yang cocok</td></tr>
            ) : filtered.map(u => {
              const rc = roleConfig[u.role_code];
              return (
                <tr key={u.id}>
                  <td>
                    <div className="um-user-cell">
                      <div className={`um-avatar um-avatar--${u.role_code==="superadmin"?"purple":"blue"}`}>{getInitials(u.name)}</div>
                      <div><div className="um-user-name">{u.name}</div><div className="um-user-email">{u.email}</div></div>
                    </div>
                  </td>
                  <td><code className="um-username">{u.nip||"—"}</code></td>
                  <td><code className="um-username">@{u.username}</code></td>
                  <td>
                    <div className="um-entity-cell">
                      <span className="um-entity-code">{u.entity_code}</span>
                      <span className="um-entity-name" style={{fontSize:".73rem"}}>{getEntityName(u.entity_code)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="um-entity-cell">
                      <span className="um-entity-code" style={{color:"#0f766e",background:"#ccfbf1"}}>{getBranchName(u.branch_code)}</span>
                      <span className="um-entity-name" style={{fontSize:".73rem",color:"#64748b"}}>{getDivisionName(u.division_code)||"—"}</span>
                    </div>
                  </td>
                  <td><span className="um-role-badge" style={{color:rc.color,background:rc.bg}}><Ico n={rc.iconName} size={12}/> {rc.label}</span></td>
                  <td>
                    <button className={`um-status-toggle-btn um-status-toggle-btn--${u.is_active?"aktif":"nonaktif"}`} onClick={()=>handleToggle(u.id)} title="Klik untuk toggle">
                      <Ico n={u.is_active?"userCheck":"userSlash"} size={12}/> {u.is_active?"Aktif":"Nonaktif"}
                    </button>
                  </td>
                  <td className="um-last-login">{u.last_login}</td>
                  <td>
                    <div className="um-actions">
                      <button className="um-action-btn um-action-btn--view" title="Detail" onClick={()=>{ setModal({type:"detail",user:u}); recordActivity({action_type:"VIEW_USER_DETAIL",table_name:"users",record_id:u.id,old_value:null,new_value:JSON.stringify({viewed_user:u.username})}); }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button className="um-action-btn um-action-btn--edit" title="Edit" onClick={()=>setModal({type:"form",user:u})}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="um-action-btn um-action-btn--key" title="Reset Password" onClick={()=>setModal({type:"reset",user:u})}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                      </button>
                      <button className="um-action-btn um-action-btn--del" title="Hapus" onClick={()=>setModal({type:"delete",user:u})}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ══ ACTIVITY LOG ══ */}
      <ActivityLogSection logs={logs} users={users}/>

      {modal?.type==="form"   && <UserFormModal   user={modal.user} onClose={()=>setModal(null)} onSave={handleSave}/>}
      {modal?.type==="detail" && <DetailUserModal user={modal.user} onClose={()=>setModal(null)} onEdit={u=>setModal({type:"form",user:u})}/>}
      {modal?.type==="delete" && <DeleteModal     user={modal.user} onClose={()=>setModal(null)} onConfirm={handleDelete}/>}
      {modal?.type==="reset"  && <ResetPassModal  user={modal.user} onClose={()=>setModal(null)} onDone={handleResetDone}/>}
    </div>
  );
};

export default UserManagement;