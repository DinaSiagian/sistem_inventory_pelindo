import React, { useState, useMemo, useRef, useEffect } from "react";

// ─── INLINE SVG ICONS ─────────────────────────────────────────
const Icon = {
  Search: () => (
    <svg
      width="14"
      height="14"
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
  Plus: () => (
    <svg
      width="14"
      height="14"
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
  Edit: () => (
    <svg
      width="14"
      height="14"
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
  Trash: () => (
    <svg
      width="14"
      height="14"
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
  Eye: () => (
    <svg
      width="14"
      height="14"
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
  Times: () => (
    <svg
      width="12"
      height="12"
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
  Check: () => (
    <svg
      width="14"
      height="14"
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
  Exchange: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Undo: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
    </svg>
  ),
  History: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="12 8 12 12 14 14" />
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5-4v4h4" />
    </svg>
  ),
  Paperclip: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  User: () => (
    <svg
      width="14"
      height="14"
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
  MapPin: () => (
    <svg
      width="12"
      height="12"
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
  Clock: () => (
    <svg
      width="12"
      height="12"
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
  ChevronDown: () => (
    <svg
      width="12"
      height="12"
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
  ChevronUp: () => (
    <svg
      width="12"
      height="12"
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
  Laptop: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Server: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Desktop: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Network: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <path d="M5 16v-4h14v4" />
      <line x1="12" y1="8" x2="12" y2="12" />
    </svg>
  ),
  Bolt: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Filter: () => (
    <svg
      width="14"
      height="14"
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
  CheckCircle: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  StickyNote: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Upload: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  FileText: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

// ─── CONFIG ────────────────────────────────────────────────────
const conditionConfig = {
  GOOD: { label: "Baik", color: "#16a34a", bg: "#dcfce7" },
  MINOR_DAMAGE: { label: "Rusak Ringan", color: "#d97706", bg: "#fef3c7" },
  DAMAGED: { label: "Rusak Berat", color: "#dc2626", bg: "#fee2e2" },
};

const assetCategories = {
  LAPTOP: {
    label: "Laptop",
    icon: <Icon.Laptop />,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  SERVER: {
    label: "Server",
    icon: <Icon.Server />,
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  DESKTOP: {
    label: "PC Desktop",
    icon: <Icon.Desktop />,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  NETWORK: {
    label: "Perangkat Jaringan",
    icon: <Icon.Network />,
    color: "#059669",
    bg: "#d1fae5",
  },
  UPS: {
    label: "UPS / Power",
    icon: <Icon.Bolt />,
    color: "#d97706",
    bg: "#fef3c7",
  },
  OTHER: {
    label: "Lainnya",
    icon: <Icon.Exchange />,
    color: "#64748b",
    bg: "#f1f5f9",
  },
};

const getCategory = (code) => {
  const c = (code || "").toUpperCase();
  if (c.includes("LPT") || c.includes("NTB")) return "LAPTOP";
  if (c.includes("SRV")) return "SERVER";
  if (c.includes("PC") || c.includes("DSK")) return "DESKTOP";
  if (c.includes("SWT") || c.includes("RTR") || c.includes("NET"))
    return "NETWORK";
  if (c.includes("UPS")) return "UPS";
  return "OTHER";
};

// ─── MOCK DATA ─────────────────────────────────────────────────
const mockAssets = [
  { code: "SPMT-LPT-01", name: "Laptop Lenovo ThinkPad X1", zone: "Ruang IT" },
  {
    code: "SPMT-LPT-02",
    name: "Laptop Dell Latitude 5420",
    zone: "Terminal 1",
  },
  { code: "SPMT-LPT-03", name: "Laptop HP EliteBook 840", zone: "Terminal 2" },
  { code: "SPMT-PC-01", name: "PC Desktop HP EliteDesk", zone: "Ruang Admin" },
  { code: "SPMT-PC-02", name: "PC Desktop Dell OptiPlex", zone: "Terminal 1" },
  {
    code: "SPMT-SRV-01",
    name: "Server HP ProLiant DL380",
    zone: "Data Center",
  },
  {
    code: "SPMT-SWT-01",
    name: "Switch Cisco Catalyst 9300",
    zone: "Ruang Network",
  },
  {
    code: "SPMT-RTR-01",
    name: "Router Mikrotik CCR2004",
    zone: "Ruang Network",
  },
  { code: "SPMT-UPS-01", name: "UPS APC Smart-UPS 3000", zone: "Data Center" },
];

const mockUsers = [
  { id: 1, name: "Joy Valeda Silalahi", branch: "Jakarta" },
  { id: 2, name: "Dina Marlina Siagian", branch: "Jakarta" },
  { id: 3, name: "Andi Pratama", branch: "Surabaya" },
  { id: 4, name: "Sari Dewi", branch: "Jakarta" },
  { id: 5, name: "Rini Handayani", branch: "Medan" },
];

const mockSubzona = [
  "Ruang IT",
  "Terminal 1",
  "Terminal 2",
  "Terminal 3",
  "Ruang Admin",
  "Data Center",
  "Ruang Network",
  "Gudang",
  "Luar Kota / Dinas",
];

const initBorrows = [
  {
    id: 1,
    code: "SPMT-LPT-01",
    name: "Laptop Lenovo ThinkPad X1",
    borrow_date: "2026-02-10T09:00:00",
    due_date: "2026-03-10",
    performed_by_id: 3,
    from_zone: "Ruang IT",
    to_zone: "Terminal 2",
    reason: "Kebutuhan operasional proyek",
    condition: "GOOD",
    attachment: "ba_pinjam_lpt01.pdf",
    notes: "Dibawa ke lokasi proyek",
    is_returned: false,
  },
  {
    id: 2,
    code: "SPMT-LPT-03",
    name: "Laptop HP EliteBook 840",
    borrow_date: "2026-02-20T10:00:00",
    due_date: "2026-03-05",
    performed_by_id: 4,
    from_zone: "Terminal 2",
    to_zone: "Terminal 1",
    reason: "Rotasi aset antar terminal",
    condition: "GOOD",
    attachment: null,
    notes: "",
    is_returned: false,
  },
  {
    id: 3,
    code: "SPMT-PC-01",
    name: "PC Desktop HP EliteDesk",
    borrow_date: "2026-01-15T08:00:00",
    due_date: "2026-02-15",
    performed_by_id: 2,
    from_zone: "Ruang Admin",
    to_zone: "Terminal 3",
    reason: "Penggantian sementara unit rusak",
    condition: "GOOD",
    attachment: "ba_pinjam_pc01.pdf",
    notes: "Unit pengganti sementara",
    is_returned: false,
  },
  {
    id: 4,
    code: "SPMT-SWT-01",
    name: "Switch Cisco Catalyst 9300",
    borrow_date: "2026-02-28T14:00:00",
    due_date: "2026-03-28",
    performed_by_id: 1,
    from_zone: "Ruang Network",
    to_zone: "Data Center",
    reason: "Upgrade infrastruktur jaringan",
    condition: "GOOD",
    attachment: null,
    notes: "",
    is_returned: false,
  },
  {
    id: 5,
    code: "SPMT-LPT-02",
    name: "Laptop Dell Latitude 5420",
    borrow_date: "2026-03-01T11:00:00",
    due_date: "2026-04-01",
    performed_by_id: 5,
    from_zone: "Terminal 1",
    to_zone: "Medan - Kantor Cabang",
    reason: "Keperluan dinas luar kota",
    condition: "GOOD",
    attachment: "ba_pinjam_lpt02.pdf",
    notes: "",
    is_returned: false,
  },
];

const initReturns = [
  {
    id: 101,
    original_id: null,
    code: "SPMT-PC-02",
    name: "PC Desktop Dell OptiPlex",
    borrow_date: "2025-11-01T09:00:00",
    return_date: "2025-12-01T14:30:00",
    performed_by_id: 2,
    from_zone: "Ruang Admin",
    to_zone: "Terminal 1",
    reason: "Keperluan proyek",
    return_condition: "GOOD",
    return_notes: "Dikembalikan dalam kondisi baik",
    attachment: "ba_kembali_pc02.pdf",
  },
  {
    id: 102,
    original_id: null,
    code: "SPMT-UPS-01",
    name: "UPS APC Smart-UPS 3000",
    borrow_date: "2025-10-05T08:00:00",
    return_date: "2025-11-05T10:00:00",
    performed_by_id: 3,
    from_zone: "Data Center",
    to_zone: "Terminal 2",
    reason: "Backup power darurat",
    return_condition: "MINOR_DAMAGE",
    return_notes: "Terdapat goresan pada casing",
    attachment: null,
  },
  {
    id: 103,
    original_id: null,
    code: "SPMT-LPT-01",
    name: "Laptop Lenovo ThinkPad X1",
    borrow_date: "2025-09-10T09:00:00",
    return_date: "2025-10-10T16:00:00",
    performed_by_id: 1,
    from_zone: "Ruang IT",
    to_zone: "Terminal 3",
    reason: "Dinas luar kantor",
    return_condition: "GOOD",
    return_notes: "",
    attachment: "ba_kembali_lpt01.pdf",
  },
];

// ─── HELPERS ───────────────────────────────────────────────────
const getUser = (id) =>
  mockUsers.find((u) => u.id === id) || { name: "—", branch: "" };
const getAsset = (code) => mockAssets.find((a) => a.code === code);
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
const fmtDT = (d) =>
  d
    ? new Date(d).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
const isOverdue = (due) => due && new Date(due) < new Date();

// ─── STYLES ────────────────────────────────────────────────────
const styles = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");
:root {
  --blue: #2563eb; --blue-dk: #1d4ed8; --blue-lt: #eff6ff;
  --green: #16a34a; --green-dk: #15803d; --green-lt: #dcfce7;
  --red: #dc2626; --red-lt: #fee2e2;
  --warn: #d97706; --warn-lt: #fef3c7;
  --slate: #0f172a; --slate-6: #64748b; --slate-4: #94a3b8;
  --border: #e2e8f0; --bg: #f8fafc;
  --radius: 12px; --shadow: 0 1px 4px rgba(0,0,0,0.06); --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
}
* { box-sizing: border-box; }
.pjm-root { padding: 2rem; max-width: 1420px; margin: 0 auto; font-family: "Plus Jakarta Sans","Inter",sans-serif; background: var(--bg); min-height: 100vh; }
.pjm-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem; }
.pjm-title { font-size: 1.7rem; font-weight: 800; color: var(--slate); margin: 0 0 4px; letter-spacing: -0.02em; }
.pjm-subtitle { font-size: 0.875rem; color: var(--slate-6); margin: 0; }
.pjm-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; margin-bottom: 1.5rem; }
@media(max-width:900px){.pjm-stats{grid-template-columns:repeat(2,1fr);}}
.pjm-stat-card { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: 1.1rem 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--shadow); transition: box-shadow .2s,transform .2s; }
.pjm-stat-card:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }
.pjm-stat-card--warn { border-color: #fca5a5; background: #fff5f5; }
.pjm-stat-ico { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.pjm-stat-n { font-size: 1.6rem; font-weight: 800; color: var(--slate); line-height: 1; }
.pjm-stat-l { font-size: 0.77rem; color: var(--slate-6); margin-top: 3px; }
.pjm-tab-sw { display: flex; gap: 0; margin-bottom: 1rem; background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 4px; width: fit-content; box-shadow: var(--shadow); }
.pjm-tsb { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.55rem 1.25rem; border-radius: 9px; border: none; font-size: 0.855rem; font-weight: 600; color: var(--slate-6); cursor: pointer; background: transparent; transition: all .18s; font-family: inherit; }
.pjm-tsb:hover { color: var(--slate); background: var(--bg); }
.pjm-tsb--blue { background: var(--blue-lt) !important; color: var(--blue) !important; }
.pjm-tsb--green { background: var(--green-lt) !important; color: var(--green) !important; }
.pjm-tsbadge { font-size: 0.72rem; font-weight: 700; background: var(--border); color: var(--slate-6); padding: 2px 7px; border-radius: 99px; min-width: 20px; text-align: center; }
.pjm-tsbadge--green { background: var(--green-lt); color: var(--green); }
.pjm-tsbadge--warn { background: var(--red-lt); color: var(--red); }
.pjm-toolbar { display: flex; align-items: center; gap: .75rem; margin-bottom: 1rem; flex-wrap: wrap; }
.pjm-search-wrap { flex: 1; min-width: 260px; display: flex; align-items: center; gap: .55rem; background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: .55rem .9rem; transition: border-color .15s; }
.pjm-search-wrap:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.08); }
.pjm-search-wrap svg { color: var(--slate-4); flex-shrink: 0; }
.pjm-search-wrap input { border: none; outline: none; font-size: .875rem; flex: 1; color: var(--slate); background: #fff; font-family: inherit; }
.pjm-search-clear { background: none; border: none; cursor: pointer; color: var(--slate-4); padding: 0; display: flex; align-items: center; }
.pjm-filter-wrap { display: flex; align-items: center; gap: .45rem; background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: .5rem .85rem; }
.pjm-filter-wrap svg { color: var(--slate-4); }
.pjm-filter-wrap select { border: none; outline: none; font-size: .845rem; color: #334155; background: #fff; cursor: pointer; font-family: inherit; }
.pjm-count-badge { font-size: .82rem; font-weight: 600; color: var(--slate-6); background: #fff; border: 1px solid var(--border); border-radius: 8px; padding: .4rem .8rem; white-space: nowrap; }
.pjm-groups { display: flex; flex-direction: column; gap: .85rem; }
.pjm-cat-group { background: #fff; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: var(--shadow); transition: box-shadow .2s; }
.pjm-cat-group:hover { box-shadow: var(--shadow-md); }
.pjm-cat-hdr { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: .9rem 1.25rem; background: #fff; border: none; cursor: pointer; font-family: inherit; transition: background .15s; }
.pjm-cat-hdr:hover { background: var(--bg); }
.pjm-cat-left { display: flex; align-items: center; gap: .75rem; }
.pjm-cat-ico { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pjm-cat-lbl { font-size: .9rem; font-weight: 700; color: var(--slate); }
.pjm-cat-cnt { font-size: .73rem; font-weight: 700; background: var(--bg); color: var(--slate-6); border: 1px solid var(--border); padding: 2px 9px; border-radius: 99px; }
.pjm-cat-chev { color: var(--slate-4); display: flex; }
.pjm-cat-body { border-top: 1px solid var(--border); overflow-x: auto; }
.pjm-table-wrap { background: #fff; border-radius: 14px; border: 1px solid var(--border); overflow-x: auto; box-shadow: var(--shadow); }
.pjm-table { width: 100%; border-collapse: collapse; font-size: .835rem; }
.pjm-table thead tr { background: linear-gradient(135deg,#1e3a8a,var(--blue)); }
.pjm-table--ret thead tr { background: linear-gradient(135deg,#14532d,var(--green)); }
.pjm-table thead th { color: #fff; padding: .8rem 1rem; text-align: left; font-weight: 600; font-size: .78rem; white-space: nowrap; }
.pjm-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background .12s; }
.pjm-table tbody tr:last-child { border-bottom: none; }
.pjm-table tbody tr:hover { background: #fafbff; }
.pjm-table tbody td { padding: .8rem 1rem; vertical-align: middle; }
.pjm-row--over { background: #fff8f8 !important; }
.pjm-row--over:hover { background: #fff1f1 !important; }
.pjm-ctag { font-family: "Courier New",monospace; font-size: .77rem; font-weight: 700; color: var(--blue); background: var(--blue-lt); padding: 2px 7px; border-radius: 5px; white-space: nowrap; }
.pjm-asub { font-size: .76rem; color: var(--slate-6); margin-top: 3px; }
.pjm-td-date { font-size: .8rem; color: var(--slate-6); white-space: nowrap; }
.pjm-td-date--green { color: var(--green); font-weight: 600; }
.pjm-td-notes { font-size: .79rem; color: var(--slate-6); max-width: 200px; }
.pjm-ucell { display: flex; align-items: center; gap: .6rem; }
.pjm-uav { width: 30px; height: 30px; border-radius: 50%; background: var(--blue-lt); color: var(--blue); font-weight: 700; font-size: .82rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pjm-uav--green { background: var(--green-lt); color: var(--green); }
.pjm-uname { font-size: .82rem; font-weight: 600; color: #1e293b; }
.pjm-ubranch { font-size: .74rem; color: var(--slate-6); }
.pjm-loc-flow { display: flex; align-items: center; gap: .35rem; font-size: .79rem; flex-wrap: wrap; }
.pjm-loc-f { color: var(--slate-6); }
.pjm-loc-arr { color: var(--slate-4); display: flex; }
.pjm-loc-t { color: var(--blue); font-weight: 600; }
.pjm-due { font-size: .8rem; color: var(--slate-6); display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
.pjm-due--over { color: var(--red); font-weight: 700; }
.pjm-cond-sm { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 99px; font-size: .76rem; font-weight: 600; white-space: nowrap; }
.pjm-attach-sm { display: inline-flex; align-items: center; gap: 4px; font-size: .76rem; color: var(--blue); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pjm-overdue-pill { font-size: .72rem; font-weight: 700; background: var(--red-lt); color: var(--red); padding: 2px 8px; border-radius: 99px; }
.pjm-acts { display: flex; gap: .3rem; }
.pjm-act { width: 30px; height: 30px; border-radius: 7px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .15s; padding: 0; }
.pjm-act svg { width: 14px; height: 14px; flex-shrink: 0; display: block; }
.pjm-act--eye { background: #dbeafe; color: #1d4ed8; }
.pjm-act--edit { background: #dcfce7; color: #15803d; }
.pjm-act--ret { background: #d1fae5; color: #065f46; }
.pjm-act--del { background: #fee2e2; color: #b91c1c; }
.pjm-act:hover { filter: brightness(.88); transform: scale(1.1); }
.pjm-btn { display: inline-flex; align-items: center; gap: .4rem; padding: .52rem 1.15rem; border-radius: 10px; font-size: .855rem; font-weight: 600; border: none; cursor: pointer; transition: all .18s; font-family: inherit; }
.pjm-btn-lg { padding: .65rem 1.35rem; font-size: .9rem; }
.pjm-btn-blue { background: linear-gradient(135deg,var(--blue-dk),var(--blue)); color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.25); }
.pjm-btn-blue:hover { filter: brightness(1.1); transform: translateY(-1px); }
.pjm-btn-green { background: linear-gradient(135deg,var(--green-dk),var(--green)); color: #fff; box-shadow: 0 2px 8px rgba(22,163,74,.25); }
.pjm-btn-green:hover { filter: brightness(1.1); transform: translateY(-1px); }
.pjm-btn-red { background: linear-gradient(135deg,#b91c1c,var(--red)); color: #fff; }
.pjm-btn-ghost { background: var(--bg); color: #475569; border: 1.5px solid var(--border); }
.pjm-btn-ghost:hover { background: #e9eef5; }
.pjm-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .85rem; padding: 4rem 1rem; background: #fff; border-radius: 14px; border: 1px solid var(--border); color: var(--slate-4); font-size: .9rem; box-shadow: var(--shadow); }
.pjm-empty-ico { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
.pjm-empty-ico--blue { background: var(--blue-lt); color: var(--blue); }
.pjm-empty-ico--green { background: var(--green-lt); color: var(--green); }
.pjm-overlay { position: fixed; inset: 0; background: rgba(15,23,42,.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
.pjm-modal { background: #fff; border-radius: 18px; width: 100%; max-width: 520px; max-height: 92vh; display: flex; flex-direction: column; box-shadow: 0 24px 64px rgba(0,0,0,.2); overflow: hidden; }
.pjm-modal--form { max-width: 600px; }
.pjm-modal--sm { max-width: 400px; }
.pjm-modal-header { padding: 1.15rem 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); background: #fff; }
.pjm-mh--blue { border-top: 3px solid var(--blue); }
.pjm-mh--green { border-top: 3px solid var(--green); }
.pjm-modal-header h2 { font-size: 1rem; font-weight: 700; color: var(--slate); display: flex; align-items: center; gap: .55rem; margin: 0; }
.pjm-mh-ico { width: 28px; height: 28px; border-radius: 7px; background: var(--blue-lt); color: var(--blue); display: flex; align-items: center; justify-content: center; }
.pjm-mh-ico--green { background: var(--green-lt); color: var(--green); }
.pjm-modal-close { background: none; border: none; cursor: pointer; color: var(--slate-4); padding: .15rem; border-radius: 6px; display: flex; align-items: center; }
.pjm-modal-close:hover { background: var(--bg); color: var(--slate-6); }
.pjm-modal-body { padding: 1.3rem 1.5rem; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 1rem; background: #fff; }
.pjm-modal-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--border); display: flex; gap: .6rem; justify-content: flex-end; background: #fff; }
.pjm-frow { display: grid; grid-template-columns: 1fr 1fr; gap: .85rem; }
@media(max-width:520px){.pjm-frow{grid-template-columns:1fr;}}
.pjm-fg { display: flex; flex-direction: column; gap: .35rem; }
.pjm-fg label { font-size: .81rem; font-weight: 600; color: #475569; }
.pjm-fg input,.pjm-fg select,.pjm-fg textarea {
  padding: .52rem .8rem; border-radius: 9px; border: 1.5px solid var(--border);
  font-size: .845rem; outline: none; transition: border .15s,box-shadow .15s;
  font-family: inherit; background: #fff !important; color: var(--slate) !important;
  -webkit-appearance: auto; appearance: auto;
}
.pjm-fg input:focus,.pjm-fg select:focus,.pjm-fg textarea:focus {
  border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.09);
}
.pjm-fg textarea { resize: vertical; }
.pjm-input-ro { background: #f8fafc !important; color: var(--slate-6) !important; cursor: default !important; border-color: var(--border) !important; }
.pjm-err-input { border-color: var(--red) !important; }
.pjm-ferr { font-size: .74rem; color: var(--red); }
.pjm-req { color: var(--red); }
.pjm-field-hint { font-size: .76rem; color: var(--slate-6); display: inline-flex; align-items: center; gap: 4px; }
.pjm-chips { display: flex; gap: .5rem; flex-wrap: wrap; }
.pjm-chip { display: flex; align-items: center; padding: .42rem .9rem; border-radius: 99px; border: 1.5px solid var(--border); cursor: pointer; font-size: .81rem; font-weight: 600; color: var(--slate-6); background: #fff; transition: all .14s; font-family: inherit; }
.pjm-chip:hover { border-color: #cbd5e1; background: var(--bg); }
.pjm-chip--on { font-weight: 700; }
.pjm-ret-info-card { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: .9rem 1rem; display: flex; flex-direction: column; gap: .5rem; }
.pjm-ric-row { display: flex; align-items: center; gap: .75rem; font-size: .83rem; }
.pjm-ric-lbl { font-size: .74rem; font-weight: 700; color: var(--slate-4); text-transform: uppercase; letter-spacing: .04em; min-width: 110px; }
.pjm-text-blue { color: var(--blue); font-weight: 600; }
.pjm-text-green { color: var(--green); font-weight: 600; }
.pjm-detail-banner { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.1rem; border-radius: 12px; background: var(--bg); border: 1px solid var(--border); margin-bottom: .25rem; }
.pjm-db-cat { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pjm-db-name { font-size: .9rem; font-weight: 600; color: var(--slate); margin-top: 3px; }
.pjm-db-info { flex: 1; }
.pjm-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem 1.5rem; }
.pjm-dgi { display: flex; flex-direction: column; gap: 3px; }
.pjm-dgi--full { grid-column: 1/-1; }
.pjm-dgi-lbl { font-size: .73rem; font-weight: 700; color: var(--slate-4); text-transform: uppercase; letter-spacing: .04em; }
.pjm-text-danger { color: var(--red); font-weight: 700; }
.pjm-text-muted { color: var(--slate-4); }
.pjm-del-ico { width: 52px; height: 52px; border-radius: 50%; background: var(--red-lt); color: var(--red); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
.pjm-del-title { font-size: 1.05rem; font-weight: 700; color: var(--slate); margin: 0 0 .5rem; }
.pjm-del-desc { font-size: .86rem; color: var(--slate-6); margin: 0; }
/* Combo */
.pjm-combo { position: relative; }
.pjm-combo-input-wrap { display: flex; align-items: center; gap: .45rem; padding: .52rem .8rem; border: 1.5px solid var(--border); border-radius: 9px; background: #fff; cursor: pointer; transition: border .15s,box-shadow .15s; min-height: 38px; }
.pjm-combo-input-wrap:focus-within,.pjm-combo-input-wrap.open { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.09); }
.pjm-combo-input-wrap.pjm-err-border { border-color: var(--red) !important; }
.pjm-combo-input-wrap input { border: none !important; outline: none !important; box-shadow: none !important; padding: 0 !important; font-size: .845rem; flex: 1; background: #fff !important; color: var(--slate) !important; font-family: inherit; min-width: 0; }
.pjm-combo-selected-tag { display: inline-flex; align-items: center; gap: 5px; background: var(--blue-lt); color: var(--blue); border-radius: 6px; padding: 2px 8px; font-size: .8rem; font-weight: 600; white-space: nowrap; }
.pjm-combo-selected-tag button { background: none; border: none; cursor: pointer; color: var(--blue); padding: 0; display: flex; align-items: center; }
.pjm-combo-arrow { color: var(--slate-4); display: flex; flex-shrink: 0; transition: transform .15s; }
.pjm-combo-arrow.open { transform: rotate(180deg); }
.pjm-combo-dropdown { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #fff; border: 1.5px solid var(--border); border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,.12); z-index: 200; max-height: 260px; overflow-y: auto; }
.pjm-combo-search-box { padding: .55rem .75rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: .45rem; position: sticky; top: 0; background: #fff; }
.pjm-combo-search-box input { border: none; outline: none; font-size: .845rem; flex: 1; color: var(--slate); font-family: inherit; background: #fff; }
.pjm-combo-item { padding: .55rem .85rem; cursor: pointer; font-size: .845rem; color: var(--slate); display: flex; align-items: center; gap: .5rem; transition: background .1s; border: none; background: transparent; width: 100%; text-align: left; font-family: inherit; }
.pjm-combo-item:hover { background: var(--bg); }
.pjm-combo-item.selected { background: var(--blue-lt); color: var(--blue); font-weight: 600; }
.pjm-combo-item-sub { font-size: .75rem; color: var(--slate-4); margin-left: auto; }
.pjm-combo-empty { padding: 1rem; text-align: center; font-size: .83rem; color: var(--slate-4); }
/* File upload */
.pjm-file-zone { border: 2px dashed var(--border); border-radius: 10px; padding: 1.5rem 1rem; text-align: center; cursor: pointer; transition: all .15s; background: #fff; display: flex; flex-direction: column; align-items: center; gap: .5rem; }
.pjm-file-zone:hover,.pjm-file-zone.drag { border-color: var(--blue); background: var(--blue-lt); }
.pjm-file-zone-ico { color: var(--blue); }
.pjm-file-zone-txt { font-size: .82rem; font-weight: 600; color: var(--blue); }
.pjm-file-zone-sub { font-size: .74rem; color: var(--slate-4); }
.pjm-file-preview { display: flex; align-items: center; gap: .6rem; padding: .6rem .85rem; background: var(--blue-lt); border-radius: 9px; border: 1.5px solid #bfdbfe; }
.pjm-file-preview-name { font-size: .83rem; font-weight: 600; color: var(--blue); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pjm-file-preview-size { font-size: .74rem; color: var(--slate-6); }
.pjm-file-preview-del { background: none; border: none; cursor: pointer; color: var(--slate-4); padding: 0; display: flex; align-items: center; }
.pjm-file-preview-del:hover { color: var(--red); }
`;

// ─── SEARCHABLE COMBOBOX ───────────────────────────────────────
function SearchCombobox({
  options,
  value,
  onChange,
  placeholder,
  renderLabel,
  renderSub,
  hasError,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const filtered = options.filter((o) =>
    renderLabel(o).toLowerCase().includes(query.toLowerCase()),
  );
  const selected = options.find((o) => String(o.value) === String(value));
  return (
    <div className="pjm-combo" ref={ref}>
      <div
        className={`pjm-combo-input-wrap ${open ? "open" : ""} ${hasError ? "pjm-err-border" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span style={{ color: "var(--slate-4)", display: "flex" }}>
          <Icon.Search />
        </span>
        {selected ? (
          <>
            <span className="pjm-combo-selected-tag">
              {renderLabel(selected)}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  setQuery("");
                }}
              >
                <Icon.Times />
              </button>
            </span>
            {renderSub && (
              <span
                style={{
                  fontSize: ".74rem",
                  color: "#94a3b8",
                  marginLeft: "auto",
                  paddingRight: "4px",
                }}
              >
                {renderSub(selected)}
              </span>
            )}
          </>
        ) : (
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            placeholder={placeholder}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
        )}
        <span className={`pjm-combo-arrow ${open ? "open" : ""}`}>
          <Icon.ChevronDown />
        </span>
      </div>
      {open && (
        <div className="pjm-combo-dropdown">
          {selected && (
            <div className="pjm-combo-search-box">
              <span style={{ color: "var(--slate-4)", display: "flex" }}>
                <Icon.Search />
              </span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik untuk mencari..."
              />
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="pjm-combo-empty">
              Tidak ada hasil untuk "{query}"
            </div>
          ) : (
            filtered.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`pjm-combo-item ${String(o.value) === String(value) ? "selected" : ""}`}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <span style={{ flex: 1 }}>{renderLabel(o)}</span>
                {renderSub && (
                  <span className="pjm-combo-item-sub">{renderSub(o)}</span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── PDF FILE UPLOAD ───────────────────────────────────────────
function PdfUpload({ value, onChange, label = "Berita Acara (PDF)" }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);
  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Hanya file PDF yang diizinkan");
      return;
    }
    onChange({ name: file.name, size: file.size, file });
  };
  const fmtSize = (b) =>
    b < 1024 * 1024
      ? (b / 1024).toFixed(1) + " KB"
      : (b / (1024 * 1024)).toFixed(1) + " MB";
  return (
    <div className="pjm-fg">
      <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Icon.Paperclip /> {label}
      </label>
      {value ? (
        <div className="pjm-file-preview">
          <span style={{ color: "var(--blue)", display: "flex" }}>
            <Icon.FileText />
          </span>
          <span className="pjm-file-preview-name">{value.name}</span>
          {value.size && (
            <span className="pjm-file-preview-size">{fmtSize(value.size)}</span>
          )}
          <button
            type="button"
            className="pjm-file-preview-del"
            title="Hapus"
            onClick={() => onChange(null)}
          >
            <Icon.Times />
          </button>
        </div>
      ) : (
        <div
          className={`pjm-file-zone ${drag ? "drag" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <span className="pjm-file-zone-ico">
            <Icon.Upload />
          </span>
          <span className="pjm-file-zone-txt">
            Klik atau drag & drop file PDF
          </span>
          <span className="pjm-file-zone-sub">Maks. 10 MB · Format: PDF</span>
        </div>
      )}
    </div>
  );
}

// ─── BORROW FORM ───────────────────────────────────────────────
function BorrowFormModal({ borrow, onClose, onSave }) {
  const isEdit = !!borrow;
  const [form, setForm] = useState(
    borrow
      ? {
          ...borrow,
          attachmentFile: borrow.attachment
            ? { name: borrow.attachment }
            : null,
        }
      : {
          code: "",
          borrow_date: new Date().toISOString().slice(0, 16),
          due_date: "",
          performed_by_id: "",
          from_zone: "",
          to_zone: "",
          reason: "",
          condition: "GOOD",
          notes: "",
          attachment: "",
          attachmentFile: null,
          is_returned: false,
        },
  );
  const [errors, setErrors] = useState({});
  const assetOptions = mockAssets.map((a) => ({
    value: a.code,
    label: a.code,
    sub: a.name,
    zone: a.zone,
    fullName: a.name,
  }));
  const userOptions = mockUsers.map((u) => ({
    value: u.id,
    label: u.name,
    sub: u.branch,
  }));
  const handleAssetChange = (code) => {
    const asset = getAsset(code);
    setForm({
      ...form,
      code,
      from_zone: asset?.zone || "",
      name: asset?.name || "",
    });
  };
  const validate = () => {
    const e = {};
    if (!form.code) e.code = "Wajib dipilih";
    if (!form.borrow_date) e.borrow_date = "Wajib diisi";
    if (!form.due_date) e.due_date = "Wajib diisi";
    if (!form.performed_by_id) e.performed_by_id = "Wajib dipilih";
    if (!form.to_zone) e.to_zone = "Wajib diisi";
    if (!form.reason) e.reason = "Wajib diisi";
    setErrors(e);
    return !Object.keys(e).length;
  };
  const handleSave = () => {
    if (!validate()) return;
    const asset = getAsset(form.code);
    onSave({
      ...form,
      id: borrow?.id || Date.now(),
      name: asset?.name || form.code,
      performed_by_id: parseInt(form.performed_by_id),
      attachment: form.attachmentFile?.name || null,
    });
    onClose();
  };
  return (
    <div className="pjm-overlay" onClick={onClose}>
      <div
        className="pjm-modal pjm-modal--form"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pjm-modal-header pjm-mh--blue">
          <h2>
            <span className="pjm-mh-ico">
              <Icon.Exchange />
            </span>
            {isEdit ? "Edit Peminjaman" : "Catat Peminjaman"}
          </h2>
          <button className="pjm-modal-close" onClick={onClose}>
            <Icon.Times />
          </button>
        </div>
        <div className="pjm-modal-body">
          <div className="pjm-fg">
            <label>
              Kode Aset <span className="pjm-req">*</span>
            </label>
            <SearchCombobox
              options={assetOptions}
              value={form.code}
              onChange={handleAssetChange}
              placeholder="Cari kode atau nama aset..."
              renderLabel={(o) => `${o.label} — ${o.fullName}`}
              renderSub={(o) => o.zone}
              hasError={!!errors.code}
            />
            {form.code && (
              <span className="pjm-field-hint">
                <Icon.MapPin /> Lokasi saat ini:{" "}
                <strong>{getAsset(form.code)?.zone}</strong>
              </span>
            )}
            {errors.code && <span className="pjm-ferr">{errors.code}</span>}
          </div>
          <div className="pjm-frow">
            <div className="pjm-fg">
              <label>
                Tanggal Pinjam <span className="pjm-req">*</span>
              </label>
              <input
                type="datetime-local"
                value={form.borrow_date}
                onChange={(e) =>
                  setForm({ ...form, borrow_date: e.target.value })
                }
                className={errors.borrow_date ? "pjm-err-input" : ""}
              />
              {errors.borrow_date && (
                <span className="pjm-ferr">{errors.borrow_date}</span>
              )}
            </div>
            <div className="pjm-fg">
              <label>
                Jatuh Tempo <span className="pjm-req">*</span>
              </label>
              <input
                type="date"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                className={errors.due_date ? "pjm-err-input" : ""}
              />
              {errors.due_date && (
                <span className="pjm-ferr">{errors.due_date}</span>
              )}
            </div>
          </div>
          <div className="pjm-fg">
            <label>
              Peminjam <span className="pjm-req">*</span>
            </label>
            <SearchCombobox
              options={userOptions}
              value={form.performed_by_id}
              onChange={(val) => setForm({ ...form, performed_by_id: val })}
              placeholder="Cari nama atau cabang peminjam..."
              renderLabel={(o) => o.label}
              renderSub={(o) => o.sub}
              hasError={!!errors.performed_by_id}
            />
            {errors.performed_by_id && (
              <span className="pjm-ferr">{errors.performed_by_id}</span>
            )}
          </div>
          <div className="pjm-frow">
            <div className="pjm-fg">
              <label>Dari Lokasi</label>
              <input
                value={form.from_zone}
                readOnly
                className="pjm-input-ro"
                placeholder="Otomatis dari aset"
              />
            </div>
            <div className="pjm-fg">
              <label>
                Dibawa Ke <span className="pjm-req">*</span>
              </label>
              <select
                value={form.to_zone}
                onChange={(e) => setForm({ ...form, to_zone: e.target.value })}
                className={errors.to_zone ? "pjm-err-input" : ""}
              >
                <option value="">-- Pilih Tujuan --</option>
                {mockSubzona.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.to_zone && (
                <span className="pjm-ferr">{errors.to_zone}</span>
              )}
            </div>
          </div>
          <div className="pjm-fg">
            <label>
              Alasan Peminjaman <span className="pjm-req">*</span>
            </label>
            <input
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Kebutuhan operasional / proyek / dinas"
              className={errors.reason ? "pjm-err-input" : ""}
            />
            {errors.reason && <span className="pjm-ferr">{errors.reason}</span>}
          </div>
          <div className="pjm-fg">
            <label>Kondisi Saat Dipinjam</label>
            <div className="pjm-chips">
              {Object.entries(conditionConfig).map(([val, cfg]) => (
                <button
                  key={val}
                  type="button"
                  className={`pjm-chip ${form.condition === val ? "pjm-chip--on" : ""}`}
                  style={
                    form.condition === val
                      ? {
                          background: cfg.bg,
                          color: cfg.color,
                          borderColor: cfg.color,
                        }
                      : {}
                  }
                  onClick={() => setForm({ ...form, condition: val })}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
          <div className="pjm-fg">
            <label>Catatan</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              placeholder="Catatan tambahan..."
            />
          </div>
          <PdfUpload
            value={form.attachmentFile}
            onChange={(f) => setForm({ ...form, attachmentFile: f })}
            label="Berita Acara (PDF)"
          />
        </div>
        <div className="pjm-modal-footer">
          <button className="pjm-btn pjm-btn-ghost" onClick={onClose}>
            Batal
          </button>
          <button className="pjm-btn pjm-btn-blue" onClick={handleSave}>
            <Icon.Check /> {isEdit ? "Simpan Perubahan" : "Simpan Peminjaman"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── RETURN FORM ───────────────────────────────────────────────
function ReturnFormModal({ borrow, onClose, onSave }) {
  if (!borrow) return null;
  const [form, setForm] = useState({
    return_date: new Date().toISOString().slice(0, 16),
    return_condition: "GOOD",
    return_notes: "",
    attachmentFile: null,
  });
  const handleSave = () => {
    onSave({
      id: Date.now(),
      original_id: borrow.id,
      code: borrow.code,
      name: borrow.name,
      borrow_date: borrow.borrow_date,
      return_date: form.return_date,
      performed_by_id: borrow.performed_by_id,
      from_zone: borrow.from_zone,
      to_zone: borrow.to_zone,
      reason: borrow.reason,
      return_condition: form.return_condition,
      return_notes: form.return_notes,
      attachment: form.attachmentFile?.name || null,
    });
    onClose();
  };
  return (
    <div className="pjm-overlay" onClick={onClose}>
      <div
        className="pjm-modal pjm-modal--form"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pjm-modal-header pjm-mh--green">
          <h2>
            <span className="pjm-mh-ico pjm-mh-ico--green">
              <Icon.Undo />
            </span>
            Catat Pengembalian
          </h2>
          <button className="pjm-modal-close" onClick={onClose}>
            <Icon.Times />
          </button>
        </div>
        <div className="pjm-modal-body">
          <div className="pjm-ret-info-card">
            <div className="pjm-ric-row">
              <span className="pjm-ric-lbl">Aset</span>
              <span>
                <code className="pjm-ctag">{borrow.code}</code> {borrow.name}
              </span>
            </div>
            <div className="pjm-ric-row">
              <span className="pjm-ric-lbl">Peminjam</span>
              <span>{getUser(borrow.performed_by_id).name}</span>
            </div>
            <div className="pjm-ric-row">
              <span className="pjm-ric-lbl">Lokasi Pinjam</span>
              <span className="pjm-text-blue">{borrow.to_zone}</span>
            </div>
            <div className="pjm-ric-row">
              <span className="pjm-ric-lbl">Dikembalikan Ke</span>
              <span className="pjm-text-green">{borrow.from_zone}</span>
            </div>
          </div>
          <div className="pjm-fg">
            <label>
              Tanggal Pengembalian <span className="pjm-req">*</span>
            </label>
            <input
              type="datetime-local"
              value={form.return_date}
              onChange={(e) =>
                setForm({ ...form, return_date: e.target.value })
              }
            />
          </div>
          <div className="pjm-fg">
            <label>Kondisi Saat Dikembalikan</label>
            <div className="pjm-chips">
              {Object.entries(conditionConfig).map(([val, cfg]) => (
                <button
                  key={val}
                  type="button"
                  className={`pjm-chip ${form.return_condition === val ? "pjm-chip--on" : ""}`}
                  style={
                    form.return_condition === val
                      ? {
                          background: cfg.bg,
                          color: cfg.color,
                          borderColor: cfg.color,
                        }
                      : {}
                  }
                  onClick={() => setForm({ ...form, return_condition: val })}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
          <div className="pjm-fg">
            <label>Catatan Pengembalian</label>
            <textarea
              value={form.return_notes}
              onChange={(e) =>
                setForm({ ...form, return_notes: e.target.value })
              }
              rows={2}
              placeholder="Kondisi, kerusakan, atau catatan lainnya..."
            />
          </div>
          <PdfUpload
            value={form.attachmentFile}
            onChange={(f) => setForm({ ...form, attachmentFile: f })}
            label="Berita Acara Pengembalian (PDF)"
          />
        </div>
        <div className="pjm-modal-footer">
          <button className="pjm-btn pjm-btn-ghost" onClick={onClose}>
            Batal
          </button>
          <button className="pjm-btn pjm-btn-green" onClick={handleSave}>
            <Icon.Undo /> Konfirmasi Pengembalian
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL MODAL ──────────────────────────────────────────────
function DetailModal({ item, itemType, onClose, onEdit, onReturn }) {
  if (!item) return null;
  const isBorrow = itemType === "borrow";
  const user = getUser(item.performed_by_id);
  const cond =
    conditionConfig[isBorrow ? item.condition : item.return_condition];
  const overdue = isBorrow && isOverdue(item.due_date);
  const cat = assetCategories[getCategory(item.code)];
  return (
    <div className="pjm-overlay" onClick={onClose}>
      <div className="pjm-modal" onClick={(e) => e.stopPropagation()}>
        <div
          className={`pjm-modal-header ${isBorrow ? "pjm-mh--blue" : "pjm-mh--green"}`}
        >
          <h2>
            <span
              className={`pjm-mh-ico ${isBorrow ? "" : "pjm-mh-ico--green"}`}
            >
              {isBorrow ? <Icon.Exchange /> : <Icon.CheckCircle />}
            </span>
            {isBorrow ? "Detail Peminjaman" : "Detail Pengembalian"}
          </h2>
          <button className="pjm-modal-close" onClick={onClose}>
            <Icon.Times />
          </button>
        </div>
        <div className="pjm-modal-body">
          <div className="pjm-detail-banner">
            <div
              className="pjm-db-cat"
              style={{ background: cat.bg, color: cat.color }}
            >
              {cat.icon}
            </div>
            <div className="pjm-db-info">
              <code className="pjm-ctag">{item.code}</code>
              <div className="pjm-db-name">{item.name}</div>
              {overdue && <span className="pjm-overdue-pill">⚠ Terlambat</span>}
            </div>
          </div>
          <div className="pjm-detail-grid">
            <div className="pjm-dgi">
              <span className="pjm-dgi-lbl">Tgl Pinjam</span>
              <span>{fmtDT(item.borrow_date)}</span>
            </div>
            {isBorrow ? (
              <div className="pjm-dgi">
                <span className="pjm-dgi-lbl">Jatuh Tempo</span>
                <span className={overdue ? "pjm-text-danger" : ""}>
                  {fmtDate(item.due_date)}
                </span>
              </div>
            ) : (
              <div className="pjm-dgi">
                <span className="pjm-dgi-lbl">Tgl Dikembalikan</span>
                <span className="pjm-text-green">
                  {fmtDT(item.return_date)}
                </span>
              </div>
            )}
            <div className="pjm-dgi">
              <span className="pjm-dgi-lbl">Peminjam</span>
              <span>
                {user.name}{" "}
                <span className="pjm-text-muted">· {user.branch}</span>
              </span>
            </div>
            <div className="pjm-dgi">
              <span className="pjm-dgi-lbl">Kondisi</span>
              <span
                className="pjm-cond-sm"
                style={{ background: cond?.bg, color: cond?.color }}
              >
                {cond?.label}
              </span>
            </div>
            <div className="pjm-dgi">
              <span className="pjm-dgi-lbl">Dari Lokasi</span>
              <span>{item.from_zone}</span>
            </div>
            <div className="pjm-dgi">
              <span className="pjm-dgi-lbl">Ke Lokasi</span>
              <span className="pjm-text-blue">{item.to_zone}</span>
            </div>
            {item.reason && (
              <div className="pjm-dgi pjm-dgi--full">
                <span className="pjm-dgi-lbl">Alasan</span>
                <span>{item.reason}</span>
              </div>
            )}
            {(isBorrow ? item.notes : item.return_notes) && (
              <div className="pjm-dgi pjm-dgi--full">
                <span className="pjm-dgi-lbl">Catatan</span>
                <span>{isBorrow ? item.notes : item.return_notes}</span>
              </div>
            )}
            {item.attachment && (
              <div className="pjm-dgi pjm-dgi--full">
                <span className="pjm-dgi-lbl">Lampiran</span>
                <span className="pjm-attach-sm">
                  <Icon.Paperclip />
                  {item.attachment}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="pjm-modal-footer">
          <button className="pjm-btn pjm-btn-ghost" onClick={onClose}>
            Tutup
          </button>
          {isBorrow && (
            <button
              className="pjm-btn pjm-btn-ghost"
              onClick={() => {
                onEdit(item);
                onClose();
              }}
            >
              <Icon.Edit /> Edit
            </button>
          )}
          {isBorrow && (
            <button
              className="pjm-btn pjm-btn-green"
              onClick={() => {
                onReturn(item);
                onClose();
              }}
            >
              <Icon.Undo /> Catat Pengembalian
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DELETE CONFIRM ────────────────────────────────────────────
function DeleteModal({ item, onClose, onConfirm }) {
  if (!item) return null;
  return (
    <div className="pjm-overlay" onClick={onClose}>
      <div
        className="pjm-modal pjm-modal--sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pjm-modal-body"
          style={{ alignItems: "center", textAlign: "center", paddingTop: 32 }}
        >
          <div className="pjm-del-ico">
            <Icon.Trash />
          </div>
          <h3 className="pjm-del-title">Hapus Peminjaman?</h3>
          <p className="pjm-del-desc">
            Data peminjaman <strong>{item.code}</strong> akan dihapus permanen.
          </p>
        </div>
        <div className="pjm-modal-footer" style={{ justifyContent: "center" }}>
          <button className="pjm-btn pjm-btn-ghost" onClick={onClose}>
            Batal
          </button>
          <button
            className="pjm-btn pjm-btn-red"
            onClick={() => {
              onConfirm(item.id);
              onClose();
            }}
          >
            <Icon.Trash /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORY GROUP ────────────────────────────────────────────
function CategoryGroup({ catKey, items, onView, onEdit, onReturn, onDelete }) {
  const [open, setOpen] = useState(true);
  const cat = assetCategories[catKey];
  const overdueCount = items.filter((b) => isOverdue(b.due_date)).length;
  return (
    <div className="pjm-cat-group">
      <button className="pjm-cat-hdr" onClick={() => setOpen(!open)}>
        <div className="pjm-cat-left">
          <span
            className="pjm-cat-ico"
            style={{ background: cat.bg, color: cat.color }}
          >
            {cat.icon}
          </span>
          <span className="pjm-cat-lbl">{cat.label}</span>
          <span className="pjm-cat-cnt">{items.length}</span>
          {overdueCount > 0 && (
            <span className="pjm-overdue-pill">⚠ {overdueCount} terlambat</span>
          )}
        </div>
        <span className="pjm-cat-chev">
          {open ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
        </span>
      </button>
      {open && (
        <div className="pjm-cat-body">
          <table className="pjm-table">
            <thead>
              <tr>
                <th>Aset</th>
                <th>Peminjam</th>
                <th>Dari → Ke</th>
                <th>Tgl Pinjam</th>
                <th>Jatuh Tempo</th>
                <th>Kondisi</th>
                <th>Lampiran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => {
                const user = getUser(b.performed_by_id);
                const cond = conditionConfig[b.condition];
                const over = isOverdue(b.due_date);
                return (
                  <tr key={b.id} className={over ? "pjm-row--over" : ""}>
                    <td>
                      <code className="pjm-ctag">{b.code}</code>
                      <div className="pjm-asub">{b.name}</div>
                    </td>
                    <td>
                      <div className="pjm-ucell">
                        <div className="pjm-uav">{user.name.charAt(0)}</div>
                        <div>
                          <div className="pjm-uname">{user.name}</div>
                          <div className="pjm-ubranch">{user.branch}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="pjm-loc-flow">
                        <span className="pjm-loc-f">{b.from_zone}</span>
                        <span className="pjm-loc-arr">
                          <Icon.Exchange />
                        </span>
                        <span className="pjm-loc-t">{b.to_zone}</span>
                      </div>
                    </td>
                    <td className="pjm-td-date">{fmtDate(b.borrow_date)}</td>
                    <td>
                      <span
                        className={`pjm-due ${over ? "pjm-due--over" : ""}`}
                      >
                        {over && <Icon.Clock />}
                        {fmtDate(b.due_date)}
                      </span>
                    </td>
                    <td>
                      <span
                        className="pjm-cond-sm"
                        style={{ background: cond?.bg, color: cond?.color }}
                      >
                        {cond?.label}
                      </span>
                    </td>
                    <td>
                      {b.attachment ? (
                        <span className="pjm-attach-sm">
                          <Icon.Paperclip />
                          {b.attachment}
                        </span>
                      ) : (
                        <span className="pjm-text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <div className="pjm-acts">
                        <button
                          className="pjm-act pjm-act--eye"
                          title="Detail"
                          onClick={() => onView(b)}
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
                          className="pjm-act pjm-act--edit"
                          title="Edit"
                          onClick={() => onEdit(b)}
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
                          className="pjm-act pjm-act--ret"
                          title="Catat Pengembalian"
                          onClick={() => onReturn(b)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                          </svg>
                        </button>
                        <button
                          className="pjm-act pjm-act--del"
                          title="Hapus"
                          onClick={() => onDelete(b)}
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
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────
export default function Peminjaman() {
  const [borrows, setBorrows] = useState(initBorrows);
  const [returns, setReturns] = useState(initReturns);
  const [activeTab, setActiveTab] = useState("borrow");
  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState("semua");
  const [modal, setModal] = useState(null);

  const activeBorrows = borrows.filter((b) => !b.is_returned);
  const filteredBorrows = activeBorrows.filter((b) => {
    const q = search.toLowerCase();
    const ms =
      b.code.toLowerCase().includes(q) ||
      b.name.toLowerCase().includes(q) ||
      b.to_zone.toLowerCase().includes(q);
    const mu =
      filterUser === "semua" || b.performed_by_id === parseInt(filterUser);
    return ms && mu;
  });
  const filteredReturns = returns.filter((r) => {
    const q = search.toLowerCase();
    return r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
  });
  const groupedBorrows = useMemo(() => {
    const g = {};
    filteredBorrows.forEach((b) => {
      const cat = getCategory(b.code);
      if (!g[cat]) g[cat] = [];
      g[cat].push(b);
    });
    return g;
  }, [filteredBorrows]);
  const overdueCount = activeBorrows.filter((b) =>
    isOverdue(b.due_date),
  ).length;
  const handleSaveBorrow = (data) => {
    if (borrows.find((b) => b.id === data.id))
      setBorrows(borrows.map((b) => (b.id === data.id ? data : b)));
    else setBorrows([data, ...borrows]);
  };
  const handleReturn = (ret) => {
    setBorrows(
      borrows.map((b) =>
        b.id === ret.original_id ? { ...b, is_returned: true } : b,
      ),
    );
    setReturns([ret, ...returns]);
  };
  const handleDelete = (id) => setBorrows(borrows.filter((b) => b.id !== id));

  return (
    <div className="pjm-root">
      <style>{styles}</style>
      <div className="pjm-header">
        <div>
          <h1 className="pjm-title">Peminjaman & Pengembalian</h1>
          <p className="pjm-subtitle">
            Kelola pencatatan peminjaman dan pengembalian aset IT per kategori
          </p>
        </div>
        <button
          className="pjm-btn pjm-btn-blue pjm-btn-lg"
          onClick={() => setModal({ type: "borrow-form", data: null })}
        >
          <Icon.Plus /> Catat Peminjaman
        </button>
      </div>

      <div className="pjm-stats">
        <div className="pjm-stat-card">
          <div
            className="pjm-stat-ico"
            style={{ background: "#dbeafe", color: "#2563eb" }}
          >
            <Icon.Exchange />
          </div>
          <div>
            <div className="pjm-stat-n">{activeBorrows.length}</div>
            <div className="pjm-stat-l">Sedang Dipinjam</div>
          </div>
        </div>
        <div
          className={`pjm-stat-card ${overdueCount > 0 ? "pjm-stat-card--warn" : ""}`}
        >
          <div
            className="pjm-stat-ico"
            style={{
              background: overdueCount > 0 ? "#fee2e2" : "#f1f5f9",
              color: overdueCount > 0 ? "#dc2626" : "#94a3b8",
            }}
          >
            <Icon.Clock />
          </div>
          <div>
            <div
              className="pjm-stat-n"
              style={{ color: overdueCount > 0 ? "#dc2626" : undefined }}
            >
              {overdueCount}
            </div>
            <div className="pjm-stat-l">Terlambat Kembali</div>
          </div>
        </div>
        <div className="pjm-stat-card">
          <div
            className="pjm-stat-ico"
            style={{ background: "#dcfce7", color: "#16a34a" }}
          >
            <Icon.CheckCircle />
          </div>
          <div>
            <div className="pjm-stat-n">{returns.length}</div>
            <div className="pjm-stat-l">Sudah Dikembalikan</div>
          </div>
        </div>
        <div className="pjm-stat-card">
          <div
            className="pjm-stat-ico"
            style={{ background: "#ede9fe", color: "#7c3aed" }}
          >
            <Icon.User />
          </div>
          <div>
            <div className="pjm-stat-n">
              {[...new Set(activeBorrows.map((b) => b.performed_by_id))].length}
            </div>
            <div className="pjm-stat-l">Peminjam Aktif</div>
          </div>
        </div>
      </div>

      <div className="pjm-tab-sw">
        <button
          className={`pjm-tsb ${activeTab === "borrow" ? "pjm-tsb--blue" : ""}`}
          onClick={() => {
            setActiveTab("borrow");
            setSearch("");
          }}
        >
          <Icon.Exchange /> Daftar Peminjaman
          <span
            className={`pjm-tsbadge ${overdueCount > 0 && activeTab !== "borrow" ? "pjm-tsbadge--warn" : ""}`}
          >
            {activeBorrows.length}
          </span>
        </button>
        <button
          className={`pjm-tsb ${activeTab === "return" ? "pjm-tsb--green" : ""}`}
          onClick={() => {
            setActiveTab("return");
            setSearch("");
          }}
        >
          <Icon.History /> Riwayat Pengembalian
          <span className="pjm-tsbadge pjm-tsbadge--green">
            {returns.length}
          </span>
        </button>
      </div>

      <div className="pjm-toolbar">
        <div className="pjm-search-wrap">
          <Icon.Search />
          <input
            placeholder={
              activeTab === "borrow"
                ? "Cari kode, nama aset, atau lokasi tujuan…"
                : "Cari kode atau nama aset…"
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="pjm-search-clear" onClick={() => setSearch("")}>
              <Icon.Times />
            </button>
          )}
        </div>
        {activeTab === "borrow" && (
          <div className="pjm-filter-wrap">
            <Icon.User />
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
            >
              <option value="semua">Semua Peminjam</option>
              {mockUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="pjm-count-badge">
          {activeTab === "borrow"
            ? `${filteredBorrows.length} aset`
            : `${filteredReturns.length} pengembalian`}
        </div>
      </div>

      {activeTab === "borrow" && (
        <div>
          {Object.keys(groupedBorrows).length === 0 ? (
            <div className="pjm-empty">
              <div className="pjm-empty-ico pjm-empty-ico--blue">
                <Icon.Exchange />
              </div>
              <p>Tidak ada aset yang sedang dipinjam</p>
            </div>
          ) : (
            <div className="pjm-groups">
              {Object.entries(groupedBorrows).map(([catKey, items]) => (
                <CategoryGroup
                  key={catKey}
                  catKey={catKey}
                  items={items}
                  onView={(b) =>
                    setModal({ type: "detail", data: b, itemType: "borrow" })
                  }
                  onEdit={(b) => setModal({ type: "borrow-form", data: b })}
                  onReturn={(b) => setModal({ type: "return-form", data: b })}
                  onDelete={(b) => setModal({ type: "delete", data: b })}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "return" && (
        <div>
          {filteredReturns.length === 0 ? (
            <div className="pjm-empty">
              <div className="pjm-empty-ico pjm-empty-ico--green">
                <Icon.CheckCircle />
              </div>
              <p>Belum ada riwayat pengembalian</p>
            </div>
          ) : (
            <div className="pjm-table-wrap">
              <table className="pjm-table pjm-table--ret">
                <thead>
                  <tr>
                    <th>Aset</th>
                    <th>Peminjam</th>
                    <th>Dari → Ke</th>
                    <th>Tgl Pinjam</th>
                    <th>Tgl Dikembalikan</th>
                    <th>Kondisi Kembali</th>
                    <th>Catatan</th>
                    <th>Lampiran</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReturns.map((r) => {
                    const user = getUser(r.performed_by_id);
                    const cond = conditionConfig[r.return_condition];
                    return (
                      <tr key={r.id}>
                        <td>
                          <code className="pjm-ctag">{r.code}</code>
                          <div className="pjm-asub">{r.name}</div>
                        </td>
                        <td>
                          <div className="pjm-ucell">
                            <div className="pjm-uav pjm-uav--green">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="pjm-uname">{user.name}</div>
                              <div className="pjm-ubranch">{user.branch}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="pjm-loc-flow">
                            <span className="pjm-loc-f">{r.from_zone}</span>
                            <span className="pjm-loc-arr">
                              <Icon.Exchange />
                            </span>
                            <span className="pjm-loc-t">{r.to_zone}</span>
                          </div>
                        </td>
                        <td className="pjm-td-date">
                          {fmtDate(r.borrow_date)}
                        </td>
                        <td className="pjm-td-date pjm-td-date--green">
                          {fmtDate(r.return_date)}
                        </td>
                        <td>
                          <span
                            className="pjm-cond-sm"
                            style={{ background: cond?.bg, color: cond?.color }}
                          >
                            {cond?.label}
                          </span>
                        </td>
                        <td className="pjm-td-notes">
                          {r.return_notes || (
                            <span className="pjm-text-muted">—</span>
                          )}
                        </td>
                        <td>
                          {r.attachment ? (
                            <span className="pjm-attach-sm">
                              <Icon.Paperclip />
                              {r.attachment}
                            </span>
                          ) : (
                            <span className="pjm-text-muted">—</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="pjm-act pjm-act--eye"
                            title="Detail"
                            onClick={() =>
                              setModal({
                                type: "detail",
                                data: r,
                                itemType: "return",
                              })
                            }
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {modal?.type === "borrow-form" && (
        <BorrowFormModal
          borrow={modal.data}
          onClose={() => setModal(null)}
          onSave={handleSaveBorrow}
        />
      )}
      {modal?.type === "return-form" && (
        <ReturnFormModal
          borrow={modal.data}
          onClose={() => setModal(null)}
          onSave={handleReturn}
        />
      )}
      {modal?.type === "detail" && (
        <DetailModal
          item={modal.data}
          itemType={modal.itemType}
          onClose={() => setModal(null)}
          onEdit={(b) => setModal({ type: "borrow-form", data: b })}
          onReturn={(b) => setModal({ type: "return-form", data: b })}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          item={modal.data}
          onClose={() => setModal(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
