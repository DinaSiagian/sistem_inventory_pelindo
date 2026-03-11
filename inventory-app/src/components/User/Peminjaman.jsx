import React, { useState, useMemo, useRef, useEffect } from "react";

// ─── INLINE SVG ICONS ─────────────────────────────────────────
const Icon = {
  Search: () => (
    <svg
      width="13"
      height="13"
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
      width="13"
      height="13"
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
      width="12"
      height="12"
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
      width="12"
      height="12"
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
      width="12"
      height="12"
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
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: () => (
    <svg
      width="13"
      height="13"
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
      width="13"
      height="13"
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
      width="12"
      height="12"
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
      width="12"
      height="12"
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
      width="13"
      height="13"
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
      width="13"
      height="13"
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
      width="11"
      height="11"
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
      width="11"
      height="11"
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
      width="11"
      height="11"
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
      width="11"
      height="11"
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
      width="14"
      height="14"
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
      width="14"
      height="14"
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
      width="14"
      height="14"
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
      width="14"
      height="14"
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
      width="14"
      height="14"
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
      width="13"
      height="13"
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
      width="13"
      height="13"
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
  Upload: () => (
    <svg
      width="20"
      height="20"
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
      width="14"
      height="14"
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
  ArrowRight: () => (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ClipboardEmpty: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  Dots: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  ),
  Download: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Printer: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
  UserArrow: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="19 8 21 10 19 12" />
      <line x1="15" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" />
    </svg>
  ),
  Tag: () => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
};

// ─── CONFIG & MOCK DATA ────────────────────────────────────────
const LOGGED_IN_ADMIN_ID = 1;

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

const mockPekerjaan = [
  {
    kode: "2440020-A",
    no_anggaran: "2440020",
    jenis: "Capex",
    nama: "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Transformasi PT Pelindo Multi Terminal",
  },
  {
    kode: "2440020-B",
    no_anggaran: "2440020",
    jenis: "Capex",
    nama: "Pemenuhan Kebutuhan Gate System dan Planning and Control (Public Announcer, Kelengkapan Gate dan Radio Point To Point) PT Pelindo Multi Terminal",
  },
  {
    kode: "2540011-A",
    no_anggaran: "2540011",
    jenis: "Capex",
    nama: "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Roro pada Branch (Lembar Gilimas, Tanjung Wangi, Tanjung Emas, Sibolga, Balikpapan, Parepare dan Tanjung Balai Karimun) PT Pelindo Multi Terminal",
  },
  {
    kode: "2540011-B",
    no_anggaran: "2540011",
    jenis: "Capex",
    nama: "Penyediaan Kebutuhan Public Announcer Pendukung Transformasi dan Digitalisasi Branch (Balikpapan, Belawan, Dumai, Trisakti, Makassar, Parepare, Garongkong, Sibolga, Tanjung Emas, Tanjung Intan dan Gresik) PT Pelindo Multi Terminal",
  },
  {
    kode: "2540011-C",
    no_anggaran: "2540011",
    jenis: "Capex",
    nama: "Penyediaan Kebutuhan Perangkat Jaringan, Security Information and Management (SIEM) dan Perangkat Pendukung Gate System PT Pelindo Multi Terminal",
  },
  {
    kode: "2540011-D",
    no_anggaran: "2540011",
    jenis: "Capex",
    nama: "Penyediaan Kebutuhan Transformasi dan Digitalisasi (CCTV dan Public Announcer Traffic Monitoring pada Gate) Branch Belawan, Dumai, Malahayati, Lhokseumawe, Lembar, Jamrud Nilam Mirah, Makassar, Balikpapan, Bumiharjo Bagendang, Tanjung Pinang, Sibolga, Tanjung Emas, Parepare, Trisakti dan Gresik PT Pelindo Multi Terminal",
  },
  {
    kode: "2540012-A",
    no_anggaran: "2540012",
    jenis: "Capex",
    nama: "Pemenuhan Kebutuhan Perangkat Network Branch Tanjung Balai Karimun Terminal Selat Panjang PT Pelindo Multi Terminal",
  },
  {
    kode: "2540010-A",
    no_anggaran: "2540010",
    jenis: "Capex",
    nama: "Penyiapan Infrastruktur Gate System Pendukung Kegiatan RoRo pada Branch Tanjung Emas PT Pelindo Multi Terminal",
  },
];

const mockAssets = [
  {
    code: "SPMT-LPT-01",
    name: "Laptop Lenovo ThinkPad X1",
    zone: "Ruang IT",
    pekerjaan_kode: "2540011-C",
  },
  {
    code: "SPMT-LPT-02",
    name: "Laptop Dell Latitude 5420",
    zone: "Terminal 1",
    pekerjaan_kode: "2440020-A",
  },
  {
    code: "SPMT-LPT-03",
    name: "Laptop HP EliteBook 840",
    zone: "Terminal 2",
    pekerjaan_kode: "2440020-A",
  },
  {
    code: "SPMT-PC-01",
    name: "PC Desktop HP EliteDesk",
    zone: "Ruang Admin",
    pekerjaan_kode: "2440020-B",
  },
  {
    code: "SPMT-PC-02",
    name: "PC Desktop Dell OptiPlex",
    zone: "Terminal 1",
    pekerjaan_kode: "2440020-B",
  },
  {
    code: "SPMT-SRV-01",
    name: "Server HP ProLiant DL380",
    zone: "Data Center",
    pekerjaan_kode: "2540011-C",
  },
  {
    code: "SPMT-SWT-01",
    name: "Switch Cisco Catalyst 9300",
    zone: "Ruang Network",
    pekerjaan_kode: "2540011-C",
  },
  {
    code: "SPMT-RTR-01",
    name: "Router Mikrotik CCR2004",
    zone: "Ruang Network",
    pekerjaan_kode: "2540012-A",
  },
  {
    code: "SPMT-UPS-01",
    name: "UPS APC Smart-UPS 3000",
    zone: "Data Center",
    pekerjaan_kode: "2540011-D",
  },
  {
    code: "SPMT-NET-01",
    name: "Access Point Ubiquiti UniFi",
    zone: "Terminal 1",
    pekerjaan_kode: "2540011-A",
  },
  {
    code: "SPMT-NET-02",
    name: "CCTV Hikvision DS-2CD",
    zone: "Gate Area",
    pekerjaan_kode: "2540011-D",
  },
  {
    code: "SPMT-NET-03",
    name: "Public Announcer Bosch Praesideo",
    zone: "Terminal 2",
    pekerjaan_kode: "2540011-B",
  },
  {
    code: "SPMT-NET-04",
    name: "Radio Point-To-Point Ubiquiti",
    zone: "Ruang Network",
    pekerjaan_kode: "2440020-B",
  },
  {
    code: "SPMT-NET-05",
    name: "Firewall Fortinet FortiGate",
    zone: "Data Center",
    pekerjaan_kode: "2540010-A",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "Joy Valeda Silalahi",
    branch: "Jakarta",
    jabatan: "Super Admin",
  },
  {
    id: 2,
    name: "Dina Marlina Siagian",
    branch: "Jakarta",
    jabatan: "Staff IT",
  },
  { id: 3, name: "Andi Pratama", branch: "Surabaya", jabatan: "IT Support" },
  { id: 4, name: "Sari Dewi", branch: "Jakarta", jabatan: "Staff Operasional" },
  { id: 5, name: "Rini Handayani", branch: "Medan", jabatan: "Manager IT" },
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
    pekerjaan_kode: "2540011-C",
    code: "SPMT-LPT-01",
    name: "Laptop Lenovo ThinkPad X1",
    borrow_date: "2026-02-10T09:00:00",
    due_date: "2026-03-10",
    performed_by_id: 1,
    giver_id: 2,
    receiver_id: 3,
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
    pekerjaan_kode: "2440020-A",
    code: "SPMT-LPT-03",
    name: "Laptop HP EliteBook 840",
    borrow_date: "2026-02-20T10:00:00",
    due_date: "2026-03-05",
    performed_by_id: 1,
    giver_id: 1,
    receiver_id: 4,
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
    pekerjaan_kode: "2440020-B",
    code: "SPMT-PC-01",
    name: "PC Desktop HP EliteDesk",
    borrow_date: "2026-01-15T08:00:00",
    due_date: "2026-02-15",
    performed_by_id: 1,
    giver_id: 2,
    receiver_id: 2,
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
    pekerjaan_kode: "2540011-C",
    code: "SPMT-SWT-01",
    name: "Switch Cisco Catalyst 9300",
    borrow_date: "2026-02-28T14:00:00",
    due_date: "2026-03-28",
    performed_by_id: 1,
    giver_id: 5,
    receiver_id: 1,
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
    pekerjaan_kode: "2440020-A",
    code: "SPMT-LPT-02",
    name: "Laptop Dell Latitude 5420",
    borrow_date: "2026-03-01T11:00:00",
    due_date: "2026-04-01",
    performed_by_id: 1,
    giver_id: 1,
    receiver_id: 5,
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
    original_id: 3,
    pekerjaan_kode: "2440020-B",
    code: "SPMT-PC-02",
    name: "PC Desktop Dell OptiPlex",
    borrow_date: "2025-11-01T09:00:00",
    return_date: "2025-12-01T14:30:00",
    performed_by_id: 1,
    giver_id: 2,
    receiver_id: 2,
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
    pekerjaan_kode: "2540011-D",
    code: "SPMT-UPS-01",
    name: "UPS APC Smart-UPS 3000",
    borrow_date: "2025-10-05T08:00:00",
    return_date: "2025-11-05T10:00:00",
    performed_by_id: 1,
    giver_id: 3,
    receiver_id: 3,
    from_zone: "Data Center",
    to_zone: "Terminal 2",
    reason: "Backup power darurat",
    return_condition: "MINOR_DAMAGE",
    return_notes: "Terdapat goresan pada casing",
    attachment: null,
  },
  {
    id: 103,
    original_id: 1,
    pekerjaan_kode: "2540011-C",
    code: "SPMT-LPT-01",
    name: "Laptop Lenovo ThinkPad X1",
    borrow_date: "2025-09-10T09:00:00",
    return_date: "2025-10-10T16:00:00",
    performed_by_id: 1,
    giver_id: 1,
    receiver_id: 1,
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
  mockUsers.find((u) => u.id === id) || { name: "—", branch: "", jabatan: "" };
const getAsset = (code) => mockAssets.find((a) => a.code === code);
const getPekerjaan = (kode) => mockPekerjaan.find((p) => p.kode === kode);
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";
const fmtDateShort = (d) =>
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
const genNomorBAST = (id, date) => {
  const d = new Date(date);
  return `BAST-IT/${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(id).padStart(4, "0")}`;
};

// ─── BAST PDF GENERATOR ─────────────────────────────────────────
const generateBAST = (item, type = "borrow") => {
  const isBorrow = type === "borrow";
  const giver = getUser(item.giver_id);
  const receiver = getUser(item.receiver_id);
  const nomorBAST = genNomorBAST(item.id, item.borrow_date);
  const tglDokumen = fmtDate(isBorrow ? item.borrow_date : item.return_date);
  const kondisi =
    conditionConfig[isBorrow ? item.condition : item.return_condition];
  const pekerjaan = getPekerjaan(item.pekerjaan_kode);

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; color: #000; background: #fff; padding: 40px 50px; }
  .kop { display: flex; align-items: center; gap: 20px; border-bottom: 3px double #000; padding-bottom: 14px; margin-bottom: 20px; }
  .kop-logo { width: 70px; height: 70px; background: #003675; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11pt; text-align: center; padding: 8px; flex-shrink: 0; }
  .kop-text h1 { font-size: 14pt; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
  .kop-text p { font-size: 10pt; color: #333; }
  .judul-doc { text-align: center; margin: 24px 0 6px; }
  .judul-doc h2 { font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-decoration: underline; }
  .nomor-doc { text-align: center; font-size: 11pt; margin-bottom: 20px; color: #333; }
  .intro { margin-bottom: 18px; line-height: 1.8; text-align: justify; }
  .section-title { font-weight: bold; font-size: 11pt; margin: 18px 0 8px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #999; padding-bottom: 4px; }
  table.detail { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  table.detail td { padding: 6px 8px; font-size: 11pt; vertical-align: top; }
  table.detail td:first-child { width: 38%; font-weight: 500; }
  table.detail td:nth-child(2) { width: 4%; text-align: center; }
  table.asset-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  table.asset-table th { background: #003675; color: white; padding: 8px 10px; font-size: 10.5pt; font-weight: bold; border: 1px solid #003675; }
  table.asset-table td { border: 1px solid #ccc; padding: 7px 10px; font-size: 11pt; }
  table.asset-table tr:nth-child(even) td { background: #f4f7fb; }
  .kondisi-badge { display: inline-block; padding: 2px 10px; border-radius: 4px; font-weight: bold; font-size: 10.5pt; background: ${kondisi?.bg}; color: ${kondisi?.color}; border: 1px solid ${kondisi?.color}; }
  .pernyataan { margin: 18px 0; line-height: 1.9; text-align: justify; font-size: 11pt; }
  .ttd-section { display: flex; justify-content: space-between; margin-top: 40px; gap: 20px; }
  .ttd-box { flex: 1; text-align: center; }
  .ttd-box .ttd-label { font-weight: bold; font-size: 11pt; margin-bottom: 4px; }
  .ttd-box .ttd-role { font-size: 10pt; color: #555; margin-bottom: 70px; }
  .ttd-box .ttd-nama { font-weight: bold; font-size: 11pt; border-top: 1.5px solid #000; padding-top: 6px; }
  .ttd-box .ttd-jabatan { font-size: 10pt; color: #444; }
  .footer-note { margin-top: 28px; padding: 10px 14px; background: #f8fafc; border-left: 4px solid #003675; font-size: 10pt; color: #555; line-height: 1.6; }
  @media print { body { padding: 20px 30px; } .no-print { display: none !important; } }
</style>
</head>
<body>
<div class="kop">
  <div class="kop-logo">PELINDO</div>
  <div class="kop-text">
    <h1>PT Pelabuhan Indonesia (Persero)</h1>
    <p>Divisi Teknologi Informasi — Asset Management System</p>
    <p>Jl. Medan Merdeka Timur No.16, Jakarta Pusat 10110</p>
  </div>
</div>
<div class="judul-doc">
  <h2>Berita Acara Serah Terima Aset</h2>
  <p style="font-size:11pt; margin-top:4px; font-style:italic; color:#555;">${isBorrow ? "Peminjaman / Pengeluaran Aset IT" : "Pengembalian Aset IT"}</p>
</div>
<div class="nomor-doc">Nomor: ${nomorBAST}</div>
<div class="intro">Pada hari ini, <strong>${tglDokumen}</strong>, yang bertanda tangan di bawah ini telah melaksanakan serah terima aset teknologi informasi milik PT Pelabuhan Indonesia (Persero), dengan rincian sebagai berikut:</div>
${pekerjaan ? `<div class="section-title">Referensi Pekerjaan</div><table class="detail"><tr><td>No. Anggaran</td><td>:</td><td><strong>${pekerjaan.no_anggaran}</strong></td></tr><tr><td>Jenis Anggaran</td><td>:</td><td>${pekerjaan.jenis}</td></tr><tr><td>Nama Pekerjaan</td><td>:</td><td>${pekerjaan.nama}</td></tr></table>` : ""}
<div class="section-title">Pihak yang Terlibat</div>
<table class="detail">
  <tr><td>Pihak Pemberi / Penyerah</td><td>:</td><td><strong>${giver.name}</strong> &nbsp;|&nbsp; ${giver.jabatan} &nbsp;|&nbsp; ${giver.branch}</td></tr>
  <tr><td>Pihak Penerima</td><td>:</td><td><strong>${receiver.name}</strong> &nbsp;|&nbsp; ${receiver.jabatan} &nbsp;|&nbsp; ${receiver.branch}</td></tr>
  <tr><td>Dicatat oleh (Admin IT)</td><td>:</td><td>${getUser(item.performed_by_id).name} &nbsp;|&nbsp; ${getUser(item.performed_by_id).jabatan}</td></tr>
</table>
<div class="section-title">Detail Transaksi</div>
<table class="detail">
  <tr><td>Tanggal Serah Terima</td><td>:</td><td>${tglDokumen}</td></tr>
  ${isBorrow ? `<tr><td>Jatuh Tempo Pengembalian</td><td>:</td><td>${fmtDate(item.due_date)}</td></tr>` : `<tr><td>Tanggal Pengembalian</td><td>:</td><td>${fmtDate(item.return_date)}</td></tr>`}
  <tr><td>Lokasi Asal</td><td>:</td><td>${item.from_zone}</td></tr>
  <tr><td>Lokasi Tujuan</td><td>:</td><td>${item.to_zone}</td></tr>
  <tr><td>Tujuan / Keperluan</td><td>:</td><td>${item.reason || "-"}</td></tr>
  ${!isBorrow && item.return_notes ? `<tr><td>Catatan Pengembalian</td><td>:</td><td>${item.return_notes}</td></tr>` : ""}
</table>
<div class="section-title">Data Aset yang Diserahterimakan</div>
<table class="asset-table">
  <thead><tr><th>No.</th><th>Kode Aset</th><th>Nama / Deskripsi Aset</th><th>Kondisi</th></tr></thead>
  <tbody><tr><td style="text-align:center">1</td><td style="font-family:monospace; font-weight:bold">${item.code}</td><td>${item.name}</td><td><span class="kondisi-badge">${kondisi?.label || "-"}</span></td></tr></tbody>
</table>
<div class="pernyataan">Dengan ditandatanganinya dokumen ini, kedua belah pihak menyatakan telah menerima dan menyerahkan aset tersebut di atas dalam kondisi yang tercantum, dan bertanggung jawab atas pemeliharaan dan keamanan aset selama berada dalam penguasaannya. ${isBorrow ? `Pihak penerima wajib mengembalikan aset paling lambat pada tanggal <strong>${fmtDate(item.due_date)}</strong>.` : `Aset dinyatakan telah dikembalikan kepada pihak pemberi dalam kondisi <strong>${kondisi?.label}</strong>.`}</div>
<div class="ttd-section">
  <div class="ttd-box"><div class="ttd-label">Pihak Pemberi / Penyerah</div><div class="ttd-role">(Menyerahkan Aset)</div><div class="ttd-nama">${giver.name}</div><div class="ttd-jabatan">${giver.jabatan} — ${giver.branch}</div></div>
  <div class="ttd-box"><div class="ttd-label">Pihak Penerima</div><div class="ttd-role">(Menerima Aset)</div><div class="ttd-nama">${receiver.name}</div><div class="ttd-jabatan">${receiver.jabatan} — ${receiver.branch}</div></div>
  <div class="ttd-box"><div class="ttd-label">Mengetahui</div><div class="ttd-role">(Admin IT / Sistem)</div><div class="ttd-nama">${getUser(item.performed_by_id).name}</div><div class="ttd-jabatan">${getUser(item.performed_by_id).jabatan}</div></div>
</div>
<div class="footer-note"><strong>Catatan:</strong> Dokumen ini digenerate secara otomatis oleh sistem Asset Management PT Pelabuhan Indonesia (Persero). Nomor referensi: <strong>${nomorBAST}</strong>. Harap simpan dokumen ini sebagai bukti serah terima resmi.</div>
<div class="no-print" style="margin-top:24px; text-align:center;"><button onclick="window.print()" style="padding:10px 28px; background:#003675; color:white; border:none; border-radius:8px; font-size:13pt; cursor:pointer; font-family:inherit;">🖨️ Cetak / Simpan PDF</button></div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

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
.pjm-root { padding: 1.5rem; max-width: 1420px; margin: 0 auto; font-family: "Plus Jakarta Sans","Inter",sans-serif; background: var(--bg); min-height: 100vh; }
.pjm-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: .75rem; }
.pjm-title { font-size: 1.45rem; font-weight: 800; color: var(--slate); margin: 0 0 3px; letter-spacing: -0.02em; }
.pjm-subtitle { font-size: 0.8rem; color: var(--slate-6); margin: 0; }
.pjm-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: .75rem; margin-bottom: 1.1rem; }
@media(max-width:900px){.pjm-stats{grid-template-columns:repeat(2,1fr);}}
.pjm-stat-card { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: .85rem 1rem; display: flex; align-items: center; gap: .75rem; box-shadow: var(--shadow); transition: box-shadow .2s,transform .2s; }
.pjm-stat-card:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }
.pjm-stat-card--warn { border-color: #fca5a5; background: #fff5f5; }
.pjm-stat-ico { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: .9rem; flex-shrink: 0; }
.pjm-stat-n { font-size: 1.4rem; font-weight: 800; color: var(--slate); line-height: 1; }
.pjm-stat-l { font-size: 0.72rem; color: var(--slate-6); margin-top: 2px; }
.pjm-tab-sw { display: flex; gap: 0; margin-bottom: .85rem; background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 3px; width: fit-content; box-shadow: var(--shadow); }
.pjm-tsb { display: inline-flex; align-items: center; gap: .4rem; padding: .45rem 1rem; border-radius: 8px; border: none; font-size: 0.8rem; font-weight: 600; color: var(--slate-6); cursor: pointer; background: transparent; transition: all .18s; font-family: inherit; }
.pjm-tsb:hover { color: var(--slate); background: var(--bg); }
.pjm-tsb--blue { background: var(--blue-lt) !important; color: var(--blue) !important; }
.pjm-tsb--green { background: var(--green-lt) !important; color: var(--green) !important; }
.pjm-tsbadge { font-size: 0.67rem; font-weight: 700; background: var(--border); color: var(--slate-6); padding: 1px 6px; border-radius: 99px; min-width: 18px; text-align: center; }
.pjm-tsbadge--green { background: var(--green-lt); color: var(--green); }
.pjm-tsbadge--warn { background: var(--red-lt); color: var(--red); }
.pjm-toolbar { display: flex; align-items: center; gap: .6rem; margin-bottom: .85rem; flex-wrap: wrap; }
.pjm-search-wrap { flex: 1; min-width: 220px; display: flex; align-items: center; gap: .45rem; background: #fff; border: 1.5px solid var(--border); border-radius: 9px; padding: .45rem .8rem; transition: border-color .15s; }
.pjm-search-wrap:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.08); }
.pjm-search-wrap svg { color: var(--slate-4); flex-shrink: 0; }
.pjm-search-wrap input { border: none; outline: none; font-size: .8rem; flex: 1; color: var(--slate); background: #fff; font-family: inherit; }
.pjm-search-clear { background: none; border: none; cursor: pointer; color: var(--slate-4); padding: 0; display: flex; align-items: center; }
.pjm-filter-wrap { display: flex; align-items: center; gap: .4rem; background: #fff; border: 1.5px solid var(--border); border-radius: 9px; padding: .42rem .75rem; }
.pjm-filter-wrap svg { color: var(--slate-4); }
.pjm-filter-wrap select { border: none; outline: none; font-size: .78rem; color: #334155; background: #fff; cursor: pointer; font-family: inherit; }
.pjm-count-badge { font-size: .76rem; font-weight: 600; color: var(--slate-6); background: #fff; border: 1px solid var(--border); border-radius: 7px; padding: .35rem .7rem; white-space: nowrap; }
.pjm-groups { display: flex; flex-direction: column; gap: .7rem; }
.pjm-cat-group { background: #fff; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow); transition: box-shadow .2s; }
.pjm-cat-group:hover { box-shadow: var(--shadow-md); }
.pjm-cat-hdr { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: .7rem 1rem; background: #fff; border: none; cursor: pointer; font-family: inherit; transition: background .15s; }
.pjm-cat-hdr:hover { background: var(--bg); }
.pjm-cat-left { display: flex; align-items: center; gap: .6rem; }
.pjm-cat-ico { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pjm-cat-lbl { font-size: .82rem; font-weight: 700; color: var(--slate); }
.pjm-cat-cnt { font-size: .68rem; font-weight: 700; background: var(--bg); color: var(--slate-6); border: 1px solid var(--border); padding: 1px 7px; border-radius: 99px; }
.pjm-cat-chev { color: var(--slate-4); display: flex; }
.pjm-cat-body { border-top: 1px solid var(--border); overflow-x: auto; }
.pjm-table-wrap { background: #fff; border-radius: 12px; border: 1px solid var(--border); overflow-x: auto; box-shadow: var(--shadow); }

/* ── COMPACT TABLE ── */
.pjm-table { width: 100%; border-collapse: collapse; font-size: .76rem; table-layout: fixed; }
.pjm-table thead tr { background: linear-gradient(135deg,#1e3a8a,var(--blue)); }
.pjm-table--ret thead tr { background: linear-gradient(135deg,#14532d,var(--green)); }
.pjm-table thead th { color: #fff; padding: .6rem .75rem; text-align: left; font-weight: 600; font-size: .7rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pjm-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background .12s; }
.pjm-table tbody tr:last-child { border-bottom: none; }
.pjm-table tbody tr:hover { background: #fafbff; }
.pjm-table tbody td { padding: .6rem .75rem; vertical-align: middle; overflow: hidden; }
.pjm-row--over { background: #fff8f8 !important; }
.pjm-row--over:hover { background: #fff1f1 !important; }

/* Column widths for borrow table */
.pjm-table--borrow th:nth-child(1), .pjm-table--borrow td:nth-child(1) { width: 14%; }
.pjm-table--borrow th:nth-child(2), .pjm-table--borrow td:nth-child(2) { width: 16%; }
.pjm-table--borrow th:nth-child(3), .pjm-table--borrow td:nth-child(3) { width: 22%; }
.pjm-table--borrow th:nth-child(4), .pjm-table--borrow td:nth-child(4) { width: 14%; }
.pjm-table--borrow th:nth-child(5), .pjm-table--borrow td:nth-child(5) { width: 10%; }
.pjm-table--borrow th:nth-child(6), .pjm-table--borrow td:nth-child(6) { width: 10%; }
.pjm-table--borrow th:nth-child(7), .pjm-table--borrow td:nth-child(7) { width: 7%; }
.pjm-table--borrow th:nth-child(8), .pjm-table--borrow td:nth-child(8) { width: 9%; }
.pjm-table--borrow th:nth-child(9), .pjm-table--borrow td:nth-child(9) { width: 5%; }

/* Column widths for return table */
.pjm-table--ret th:nth-child(1), .pjm-table--ret td:nth-child(1) { width: 12%; }
.pjm-table--ret th:nth-child(2), .pjm-table--ret td:nth-child(2) { width: 14%; }
.pjm-table--ret th:nth-child(3), .pjm-table--ret td:nth-child(3) { width: 20%; }
.pjm-table--ret th:nth-child(4), .pjm-table--ret td:nth-child(4) { width: 13%; }
.pjm-table--ret th:nth-child(5), .pjm-table--ret td:nth-child(5) { width: 9%; }
.pjm-table--ret th:nth-child(6), .pjm-table--ret td:nth-child(6) { width: 9%; }
.pjm-table--ret th:nth-child(7), .pjm-table--ret td:nth-child(7) { width: 7%; }
.pjm-table--ret th:nth-child(8), .pjm-table--ret td:nth-child(8) { width: 9%; }
.pjm-table--ret th:nth-child(9), .pjm-table--ret td:nth-child(9) { width: 9%; }
.pjm-table--ret th:nth-child(10), .pjm-table--ret td:nth-child(10) { width: 5%; }

.pjm-ctag { font-family: "Courier New",monospace; font-size: .69rem; font-weight: 700; color: var(--blue); background: var(--blue-lt); padding: 1px 5px; border-radius: 4px; white-space: nowrap; }
.pjm-asub { font-size: .69rem; color: var(--slate-6); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pjm-td-date { font-size: .73rem; color: var(--slate-6); white-space: nowrap; }
.pjm-td-date--green { color: var(--green); font-weight: 600; }
.pjm-td-notes { font-size: .72rem; color: var(--slate-6); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 120px; }
.pjm-ucell { display: flex; align-items: center; gap: .5rem; }
.pjm-uav { width: 24px; height: 24px; border-radius: 50%; background: var(--blue-lt); color: var(--blue); font-weight: 700; font-size: .72rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pjm-uav--green { background: var(--green-lt); color: var(--green); }
.pjm-uav--orange { background: #fef3c7; color: #d97706; }
.pjm-uname { font-size: .75rem; font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pjm-ubranch { font-size: .68rem; color: var(--slate-6); }
.pjm-user-flow { display: flex; align-items: center; gap: 4px; flex-wrap: nowrap; }
.pjm-user-mini { display: flex; align-items: center; gap: 4px; min-width: 0; }
.pjm-user-mini-av { width: 20px; height: 20px; border-radius: 50%; font-size: .64rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pjm-user-mini-name { font-size: .71rem; font-weight: 600; color: var(--slate); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 70px; }
.pjm-user-flow-arr { color: var(--slate-4); display: flex; flex-shrink: 0; }
.pjm-loc-flow { display: flex; align-items: center; gap: .25rem; font-size: .72rem; }
.pjm-loc-f { color: var(--slate-6); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60px; }
.pjm-loc-arr { color: var(--slate-4); display: flex; flex-shrink: 0; }
.pjm-loc-t { color: var(--blue); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60px; }
.pjm-due { font-size: .72rem; color: var(--slate-6); display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; }
.pjm-due--over { color: var(--red); font-weight: 700; }
.pjm-cond-sm { display: inline-flex; align-items: center; padding: 2px 7px; border-radius: 99px; font-size: .68rem; font-weight: 600; white-space: nowrap; }
.pjm-attach-sm { display: inline-flex; align-items: center; gap: 3px; font-size: .68rem; color: var(--blue); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
.pjm-overdue-pill { font-size: .65rem; font-weight: 700; background: var(--red-lt); color: var(--red); padding: 1px 6px; border-radius: 99px; white-space: nowrap; }
.pjm-bast-gen-btn { display: inline-flex; align-items: center; gap: 3px; font-size: .67rem; font-weight: 700; color: #7c3aed; background: #f3e8ff; border: 1px solid #c4b5fd; border-radius: 5px; padding: 2px 6px; cursor: pointer; transition: all .15s; white-space: nowrap; font-family: inherit; }
.pjm-bast-gen-btn:hover { background: #ede9fe; border-color: #a78bfa; }
.pjm-pkj-badge { display: inline-flex; align-items: center; gap: 3px; font-size: .66rem; font-weight: 700; color: #0891b2; background: #ecfeff; border: 1px solid #a5f3fc; border-radius: 4px; padding: 1px 5px; white-space: nowrap; }
.pjm-pkj-name-sm { font-size: .67rem; color: var(--slate-6); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1.3; }

/* ── ACTION DOTS DROPDOWN — FIXED POSITION ── */
.pjm-action-wrap { position: relative; display: inline-block; }
.pjm-dot-btn { background: transparent; border: none; color: var(--slate-4); cursor: pointer; padding: 4px 6px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: background .15s, color .15s; line-height: 1; }
.pjm-dot-btn:hover { background: var(--bg); color: #334155; }
.pjm-dot-dropdown-fixed { position: fixed; background: #fff; border: 1px solid var(--border); border-radius: 11px; box-shadow: 0 12px 32px -6px rgba(0,0,0,0.18); z-index: 9999; min-width: 190px; padding: 4px; animation: pjmDropIn 0.13s ease-out; }
@keyframes pjmDropIn { from { opacity: 0; transform: translateY(-6px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
.pjm-dot-dropdown-fixed button { width: 100%; background: none; border: none; padding: 8px 12px; text-align: left; font-size: 0.775rem; font-weight: 600; color: #334155; cursor: pointer; border-radius: 7px; display: flex; align-items: center; gap: 8px; transition: background .12s, color .12s; font-family: inherit; }
.pjm-dot-dropdown-fixed button:hover { background: var(--bg); color: var(--slate); }
.pjm-dot-dropdown-fixed button.dd-ret:hover { background: #d1fae5; color: #065f46; }
.pjm-dot-dropdown-fixed button.dd-hist:hover { background: #f3e8ff; color: #6d28d9; }
.pjm-dot-dropdown-fixed button.dd-bast:hover { background: #f3e8ff; color: #6d28d9; }
.pjm-dot-dropdown-fixed button.dd-del { color: var(--red); }
.pjm-dot-dropdown-fixed button.dd-del:hover { background: var(--red-lt); }
.pjm-dot-dropdown-fixed hr { border: none; border-top: 1px solid var(--border); margin: 3px 4px; }

.pjm-btn { display: inline-flex; align-items: center; gap: .35rem; padding: .45rem 1rem; border-radius: 9px; font-size: .8rem; font-weight: 600; border: none; cursor: pointer; transition: all .18s; font-family: inherit; }
.pjm-btn-lg { padding: .55rem 1.2rem; font-size: .84rem; }
.pjm-btn-blue { background: linear-gradient(135deg,var(--blue-dk),var(--blue)); color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.25); }
.pjm-btn-blue:hover { filter: brightness(1.1); transform: translateY(-1px); }
.pjm-btn-green { background: linear-gradient(135deg,var(--green-dk),var(--green)); color: #fff; box-shadow: 0 2px 8px rgba(22,163,74,.25); }
.pjm-btn-green:hover { filter: brightness(1.1); transform: translateY(-1px); }
.pjm-btn-red { background: linear-gradient(135deg,#b91c1c,var(--red)); color: #fff; }
.pjm-btn-ghost { background: var(--bg); color: #475569; border: 1.5px solid var(--border); }
.pjm-btn-ghost:hover { background: #e9eef5; }
.pjm-btn-purple { background: linear-gradient(135deg,#6d28d9,#7c3aed); color: #fff; box-shadow: 0 2px 8px rgba(124,58,237,.25); }
.pjm-btn-purple:hover { filter: brightness(1.1); transform: translateY(-1px); }
.pjm-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .75rem; padding: 3rem 1rem; background: #fff; border-radius: 12px; border: 1px solid var(--border); color: var(--slate-4); font-size: .85rem; box-shadow: var(--shadow); }
.pjm-empty-ico { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.pjm-empty-ico--blue { background: var(--blue-lt); color: var(--blue); }
.pjm-empty-ico--green { background: var(--green-lt); color: var(--green); }
.pjm-overlay { position: fixed; inset: 0; background: rgba(15,23,42,.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }

/* ── MODAL ── */
.pjm-modal { background: #fff; border-radius: 16px; width: 100%; max-width: 500px; max-height: 92vh; display: flex; flex-direction: column; box-shadow: 0 24px 64px rgba(0,0,0,.2); overflow: hidden; }
.pjm-modal--form { max-width: 600px; }
.pjm-modal--sm { max-width: 380px; }
.pjm-modal--hist { max-width: 640px; }
.pjm-modal-header { padding: .9rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); background: #fff; }
.pjm-mh--blue { border-top: 3px solid var(--blue); }
.pjm-mh--green { border-top: 3px solid var(--green); }
.pjm-mh--purple { border-top: 3px solid #7c3aed; }
.pjm-modal-header h2 { font-size: .88rem; font-weight: 700; color: var(--slate); display: flex; align-items: center; gap: .45rem; margin: 0; }
.pjm-mh-ico { width: 24px; height: 24px; border-radius: 6px; background: var(--blue-lt); color: var(--blue); display: flex; align-items: center; justify-content: center; }
.pjm-mh-ico--green { background: var(--green-lt); color: var(--green); }
.pjm-mh-ico--purple { background: #f3e8ff; color: #7c3aed; }
.pjm-modal-close { background: none; border: none; cursor: pointer; color: var(--slate-4); padding: .15rem; border-radius: 5px; display: flex; align-items: center; }
.pjm-modal-close:hover { background: var(--bg); color: var(--slate-6); }
.pjm-modal-body { padding: 1rem 1.25rem; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: .8rem; background: #fff; }
.pjm-modal-footer { padding: .75rem 1.25rem; border-top: 1px solid var(--border); display: flex; gap: .5rem; justify-content: flex-end; background: #fff; }
.pjm-frow { display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; }
@media(max-width:520px){.pjm-frow{grid-template-columns:1fr;}}
.pjm-fg { display: flex; flex-direction: column; gap: .28rem; }
.pjm-fg label { font-size: .75rem; font-weight: 600; color: #475569; }
.pjm-fg input,.pjm-fg select,.pjm-fg textarea { padding: .45rem .7rem; border-radius: 8px; border: 1.5px solid var(--border); font-size: .78rem; outline: none; transition: border .15s,box-shadow .15s; font-family: inherit; background: #fff !important; color: var(--slate) !important; -webkit-appearance: auto; appearance: auto; }
.pjm-fg input:focus,.pjm-fg select:focus,.pjm-fg textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.09); }
.pjm-fg textarea { resize: vertical; }
.pjm-input-ro { background: #f8fafc !important; color: var(--slate-6) !important; cursor: default !important; border-color: var(--border) !important; }
.pjm-err-input { border-color: var(--red) !important; }
.pjm-ferr { font-size: .68rem; color: var(--red); }
.pjm-req { color: var(--red); }
.pjm-field-hint { font-size: .69rem; color: var(--slate-6); display: inline-flex; align-items: center; gap: 3px; }
.pjm-chips { display: flex; gap: .4rem; flex-wrap: wrap; }
.pjm-chip { display: flex; align-items: center; padding: .35rem .8rem; border-radius: 99px; border: 1.5px solid var(--border); cursor: pointer; font-size: .75rem; font-weight: 600; color: var(--slate-6); background: #fff; transition: all .14s; font-family: inherit; }
.pjm-chip:hover { border-color: #cbd5e1; background: var(--bg); }
.pjm-chip--on { font-weight: 700; }
.pjm-ret-info-card { background: var(--bg); border: 1px solid var(--border); border-radius: 9px; padding: .75rem .9rem; display: flex; flex-direction: column; gap: .4rem; }
.pjm-ric-row { display: flex; align-items: center; gap: .6rem; font-size: .77rem; }
.pjm-ric-lbl { font-size: .68rem; font-weight: 700; color: var(--slate-4); text-transform: uppercase; letter-spacing: .04em; min-width: 100px; }
.pjm-text-blue { color: var(--blue); font-weight: 600; }
.pjm-text-green { color: var(--green); font-weight: 600; }
.pjm-form-section { display: flex; align-items: center; gap: 8px; margin: 3px 0; }
.pjm-form-section-label { font-size: .67rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; }
.pjm-form-section-line { flex: 1; height: 1px; background: var(--border); }
.pjm-bast-note { display: flex; align-items: flex-start; gap: 8px; padding: 8px 12px; background: #f3e8ff; border: 1px solid #c4b5fd; border-radius: 9px; font-size: .75rem; color: #5b21b6; }
.pjm-bast-note-icon { font-size: .9rem; flex-shrink: 0; margin-top: 1px; }

/* ── DETAIL MODAL ── */
.pjm-detail-banner { display: flex; align-items: center; gap: .75rem; padding: .75rem .9rem; border-radius: 10px; background: var(--bg); border: 1px solid var(--border); }
.pjm-db-cat { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pjm-db-name { font-size: .82rem; font-weight: 600; color: var(--slate); margin-top: 2px; }
.pjm-db-info { flex: 1; }
.pjm-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .6rem 1.2rem; }
.pjm-dgi { display: flex; flex-direction: column; gap: 2px; }
.pjm-dgi--full { grid-column: 1/-1; }
.pjm-dgi-lbl { font-size: .66rem; font-weight: 700; color: var(--slate-4); text-transform: uppercase; letter-spacing: .04em; }
.pjm-dgi-val { font-size: .79rem; color: var(--slate); }
.pjm-text-danger { color: var(--red); font-weight: 700; }
.pjm-text-muted { color: var(--slate-4); }
.pjm-del-ico { width: 46px; height: 46px; border-radius: 50%; background: var(--red-lt); color: var(--red); display: flex; align-items: center; justify-content: center; margin: 0 auto .75rem; }
.pjm-del-title { font-size: .96rem; font-weight: 700; color: var(--slate); margin: 0 0 .4rem; }
.pjm-del-desc { font-size: .8rem; color: var(--slate-6); margin: 0; }

/* ── PEKERJAAN SELECTOR ── */
.pjm-pkj-list { display: flex; flex-direction: column; gap: .35rem; max-height: 260px; overflow-y: auto; }
.pjm-pkj-item { display: flex; align-items: flex-start; gap: .6rem; padding: .6rem .85rem; border: 1.5px solid var(--border); border-radius: 9px; cursor: pointer; background: #fff; transition: all .15s; text-align: left; font-family: inherit; width: 100%; }
.pjm-pkj-item:hover { border-color: #93c5fd; background: #f0f7ff; }
.pjm-pkj-item--active { border-color: var(--blue) !important; background: var(--blue-lt) !important; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.pjm-pkj-no { font-size: .67rem; font-weight: 800; color: #0891b2; background: #ecfeff; border: 1px solid #a5f3fc; border-radius: 4px; padding: 1px 6px; white-space: nowrap; flex-shrink: 0; margin-top: 2px; }
.pjm-pkj-jenis { font-size: .65rem; font-weight: 700; padding: 1px 6px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; margin-top: 2px; }
.pjm-pkj-jenis--capex { background: #fef3c7; color: #d97706; border: 1px solid #fcd34d; }
.pjm-pkj-jenis--opex { background: #ede9fe; color: #7c3aed; border: 1px solid #c4b5fd; }
.pjm-pkj-nama { font-size: .77rem; font-weight: 600; color: var(--slate); line-height: 1.4; flex: 1; }
.pjm-pkj-nama-active { color: var(--blue-dk); }
.pjm-pkj-check { width: 16px; height: 16px; border-radius: 50%; background: var(--blue); color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.pjm-pkj-selected-card { display: flex; align-items: flex-start; gap: .6rem; padding: .65rem .9rem; border: 1.5px solid var(--blue); border-radius: 9px; background: var(--blue-lt); }
.pjm-pkj-selected-info { flex: 1; }
.pjm-pkj-selected-name { font-size: .78rem; font-weight: 600; color: var(--blue-dk); line-height: 1.4; }
.pjm-pkj-selected-meta { font-size: .69rem; color: var(--slate-6); margin-top: 3px; display: flex; gap: 7px; }
.pjm-pkj-change-btn { background: none; border: none; cursor: pointer; color: var(--blue); font-size: .71rem; font-weight: 700; padding: 2px 5px; border-radius: 4px; white-space: nowrap; transition: background .15s; font-family: inherit; }
.pjm-pkj-change-btn:hover { background: #bfdbfe; }
.pjm-pkj-aset-cnt { font-size: .65rem; font-weight: 700; background: var(--bg); color: var(--slate-6); border: 1px solid var(--border); padding: 1px 5px; border-radius: 99px; margin-top: 2px; white-space: nowrap; }

/* ── COMBO ── */
.pjm-combo { position: relative; }
.pjm-combo-input-wrap { display: flex; align-items: center; gap: .4rem; padding: .45rem .7rem; border: 1.5px solid var(--border); border-radius: 8px; background: #fff; cursor: pointer; transition: border .15s,box-shadow .15s; min-height: 34px; }
.pjm-combo-input-wrap:focus-within,.pjm-combo-input-wrap.open { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.09); }
.pjm-combo-input-wrap.pjm-err-border { border-color: var(--red) !important; }
.pjm-combo-input-wrap input { border: none !important; outline: none !important; box-shadow: none !important; padding: 0 !important; font-size: .78rem; flex: 1; background: #fff !important; color: var(--slate) !important; font-family: inherit; min-width: 0; }
.pjm-combo-selected-tag { display: inline-flex; align-items: center; gap: 4px; background: var(--blue-lt); color: var(--blue); border-radius: 5px; padding: 1px 7px; font-size: .74rem; font-weight: 600; white-space: nowrap; }
.pjm-combo-selected-tag button { background: none; border: none; cursor: pointer; color: var(--blue); padding: 0; display: flex; align-items: center; }
.pjm-combo-arrow { color: var(--slate-4); display: flex; flex-shrink: 0; transition: transform .15s; }
.pjm-combo-arrow.open { transform: rotate(180deg); }
.pjm-combo-dropdown { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #fff; border: 1.5px solid var(--border); border-radius: 9px; box-shadow: 0 8px 24px rgba(0,0,0,.12); z-index: 200; max-height: 240px; overflow-y: auto; }
.pjm-combo-search-box { padding: .45rem .65rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: .4rem; position: sticky; top: 0; background: #fff; }
.pjm-combo-search-box input { border: none; outline: none; font-size: .78rem; flex: 1; color: var(--slate); font-family: inherit; background: #fff; }
.pjm-combo-item { padding: .48rem .75rem; cursor: pointer; font-size: .78rem; color: var(--slate); display: flex; align-items: center; gap: .4rem; transition: background .1s; border: none; background: transparent; width: 100%; text-align: left; font-family: inherit; }
.pjm-combo-item:hover { background: var(--bg); }
.pjm-combo-item.selected { background: var(--blue-lt); color: var(--blue); font-weight: 600; }
.pjm-combo-item-sub { font-size: .69rem; color: var(--slate-4); margin-left: auto; }
.pjm-combo-empty { padding: .85rem; text-align: center; font-size: .77rem; color: var(--slate-4); }
.pjm-combo-item--disabled { opacity: .45; cursor: not-allowed; pointer-events: none; }

/* File upload */
.pjm-file-zone { border: 2px dashed var(--border); border-radius: 9px; padding: 1.2rem .85rem; text-align: center; cursor: pointer; transition: all .15s; background: #fff; display: flex; flex-direction: column; align-items: center; gap: .4rem; }
.pjm-file-zone:hover,.pjm-file-zone.drag { border-color: var(--blue); background: var(--blue-lt); }
.pjm-file-zone-ico { color: var(--blue); }
.pjm-file-zone-txt { font-size: .77rem; font-weight: 600; color: var(--blue); }
.pjm-file-zone-sub { font-size: .69rem; color: var(--slate-4); }
.pjm-file-preview { display: flex; align-items: center; gap: .5rem; padding: .5rem .75rem; background: var(--blue-lt); border-radius: 8px; border: 1.5px solid #bfdbfe; }
.pjm-file-preview-name { font-size: .77rem; font-weight: 600; color: var(--blue); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pjm-file-preview-size { font-size: .69rem; color: var(--slate-6); }
.pjm-file-preview-del { background: none; border: none; cursor: pointer; color: var(--slate-4); padding: 0; display: flex; align-items: center; }
.pjm-file-preview-del:hover { color: var(--red); }

/* History modal */
.pjm-hist-header-info { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #f8fafc; border-radius: 9px; border: 1px solid var(--border); }
.pjm-hist-code { font-family: "Courier New",monospace; font-size: .72rem; font-weight: 700; color: var(--blue); background: var(--blue-lt); padding: 2px 7px; border-radius: 4px; }
.pjm-hist-name { font-size: .82rem; font-weight: 600; color: var(--slate); }
.pjm-hist-summary { display: flex; gap: 6px; flex-wrap: wrap; }
.pjm-hist-pill { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 20px; font-size: .7rem; font-weight: 700; }
.pjm-hist-pill--total { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.pjm-hist-pill--done { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
.pjm-hist-pill--active { background: #fef9c3; color: #92400e; border: 1px solid #fde68a; }
.pjm-hist-table-wrap { overflow-x: auto; border-radius: 9px; border: 1px solid var(--border); }
.pjm-hist-table { width: 100%; border-collapse: collapse; font-size: .76rem; }
.pjm-hist-table thead tr { background: linear-gradient(135deg,#4c1d95,#7c3aed); }
.pjm-hist-table thead th { color: #fff; padding: .6rem .85rem; text-align: left; font-weight: 600; font-size: .7rem; white-space: nowrap; }
.pjm-hist-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background .12s; }
.pjm-hist-table tbody tr:last-child { border-bottom: none; }
.pjm-hist-table tbody tr:hover { background: #fafbff; }
.pjm-hist-table tbody tr.pjm-hist-row--active { background: #fffbeb; }
.pjm-hist-table tbody tr.pjm-hist-row--active:hover { background: #fef3c7; }
.pjm-hist-table tbody td { padding: .6rem .85rem; vertical-align: middle; }
.pjm-hist-num { font-family: "Courier New",monospace; font-size: .68rem; font-weight: 700; color: var(--slate-4); text-align: center; }
.pjm-hist-user { display: flex; align-items: center; gap: 6px; }
.pjm-hist-av { width: 22px; height: 22px; border-radius: 50%; background: #dbeafe; color: #2563eb; font-weight: 700; font-size: .72rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pjm-hist-uname { font-size: .75rem; font-weight: 600; color: #1e293b; white-space: nowrap; }
.pjm-hist-ubranch { font-size: .67rem; color: var(--slate-6); }
.pjm-hist-loc { display: flex; align-items: center; gap: 3px; font-size: .73rem; white-space: nowrap; }
.pjm-hist-loc-from { color: var(--slate-6); }
.pjm-hist-loc-arr { color: var(--slate-4); display: flex; }
.pjm-hist-loc-to { color: var(--blue); font-weight: 600; }
.pjm-hist-date { font-size: .73rem; color: var(--slate-6); white-space: nowrap; }
.pjm-hist-date-ret { color: var(--green); font-weight: 600; }
.pjm-hist-no-ret { color: var(--warn); font-weight: 600; font-size: .71rem; }
.pjm-hist-cond { display: inline-flex; align-items: center; padding: 1px 7px; border-radius: 20px; font-size: .68rem; font-weight: 700; white-space: nowrap; }
.pjm-hist-status { display: inline-flex; align-items: center; padding: 1px 7px; border-radius: 20px; font-size: .67rem; font-weight: 700; white-space: nowrap; text-transform: uppercase; letter-spacing: .4px; }
.pjm-hist-status--done { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
.pjm-hist-status--active { background: #fef9c3; color: #92400e; border: 1px solid #fde68a; }
.pjm-hist-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 2.5rem 1rem; color: var(--slate-4); text-align: center; }
.pjm-hist-empty-title { font-size: .85rem; font-weight: 700; color: #475569; }
.pjm-hist-empty-sub { font-size: .77rem; }

/* Pekerjaan info box */
.pjm-pkj-info-box { display: flex; align-items: flex-start; gap: .5rem; padding: .55rem .85rem; background: #ecfeff; border: 1px solid #a5f3fc; border-radius: 9px; }
.pjm-pkj-info-lbl { font-size: .63rem; font-weight: 800; color: #0891b2; text-transform: uppercase; letter-spacing: .04em; }
.pjm-pkj-info-name { font-size: .77rem; font-weight: 600; color: #0e7490; line-height: 1.4; }
.pjm-pkj-info-meta { font-size: .67rem; color: #0891b2; margin-top: 2px; }
`;

// ─── ACTION DROPDOWN — FIXED POSITION (menghindari overflow:hidden terpotong) ──
function ActionDropdown({ id, activeId, setActiveId, items }) {
  const btnRef = useRef(null);
  const dropRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    if (activeId !== id) return;
    const handler = (e) => {
      const clickedBtn = btnRef.current && btnRef.current.contains(e.target);
      const clickedDrop = dropRef.current && dropRef.current.contains(e.target);
      if (!clickedBtn && !clickedDrop) {
        setActiveId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeId, id, setActiveId]);

  // Tutup dropdown saat scroll
  useEffect(() => {
    if (activeId !== id) return;
    const handler = () => setActiveId(null);
    window.addEventListener("scroll", handler, true);
    return () => window.removeEventListener("scroll", handler, true);
  }, [activeId, id, setActiveId]);

  const isOpen = activeId === id;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
      setActiveId(id);
    } else {
      setActiveId(null);
    }
  };

  return (
    <div className="pjm-action-wrap">
      <button ref={btnRef} className="pjm-dot-btn" onClick={handleToggle}>
        <Icon.Dots />
      </button>
      {isOpen && (
        <div
          ref={dropRef}
          className="pjm-dot-dropdown-fixed"
          style={{ top: pos.top, right: pos.right }}
        >
          {items.map((item, idx) => {
            if (item.type === "divider") return <hr key={idx} />;
            return (
              <button
                key={idx}
                className={item.className || ""}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                  setActiveId(null);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── SEARCHABLE COMBOBOX ───────────────────────────────────────
function SearchCombobox({
  options,
  value,
  onChange,
  placeholder,
  renderLabel,
  renderSub,
  hasError,
  disabled,
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
    <div
      className="pjm-combo"
      ref={ref}
      style={disabled ? { opacity: 0.55, pointerEvents: "none" } : {}}
    >
      <div
        className={`pjm-combo-input-wrap ${open ? "open" : ""} ${hasError ? "pjm-err-border" : ""}`}
        onClick={() => !disabled && setOpen(!open)}
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
                  fontSize: ".69rem",
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
                className={`pjm-combo-item ${String(o.value) === String(value) ? "selected" : ""} ${o.disabled ? "pjm-combo-item--disabled" : ""}`}
                onClick={() => {
                  if (!o.disabled) {
                    onChange(o.value);
                    setOpen(false);
                    setQuery("");
                  }
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

// ─── PDF UPLOAD ────────────────────────────────────────────────
function PdfUpload({ value, onChange }) {
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
    <div style={{ display: "flex", flexDirection: "column", gap: ".28rem" }}>
      <label
        style={{
          fontSize: ".75rem",
          fontWeight: 600,
          color: "#475569",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Icon.Paperclip /> Lampiran BAST (PDF) &nbsp;
        <span
          style={{
            fontSize: ".67rem",
            color: "var(--slate-4)",
            fontWeight: 400,
          }}
        >
          — Opsional
        </span>
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
          <span className="pjm-file-zone-txt">Klik atau drag & drop PDF</span>
          <span className="pjm-file-zone-sub">Maks. 10 MB</span>
        </div>
      )}
    </div>
  );
}

// ─── USER FLOW CELL ────────────────────────────────────────────
function UserFlowCell({ giverId, receiverId, colorScheme = "blue" }) {
  const giver = getUser(giverId);
  const receiver = getUser(receiverId);
  return (
    <div className="pjm-user-flow">
      <div className="pjm-user-mini">
        <div
          className="pjm-user-mini-av"
          style={{ background: "#fef3c7", color: "#d97706" }}
        >
          {giver.name.charAt(0)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="pjm-user-mini-name">{giver.name}</div>
          <div style={{ fontSize: ".63rem", color: "#94a3b8" }}>Pemberi</div>
        </div>
      </div>
      <span className="pjm-user-flow-arr">
        <Icon.ArrowRight />
      </span>
      <div className="pjm-user-mini">
        <div
          className="pjm-user-mini-av"
          style={{
            background: colorScheme === "green" ? "#dcfce7" : "#dbeafe",
            color: colorScheme === "green" ? "#16a34a" : "#2563eb",
          }}
        >
          {receiver.name.charAt(0)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="pjm-user-mini-name">{receiver.name}</div>
          <div style={{ fontSize: ".63rem", color: "#94a3b8" }}>Penerima</div>
        </div>
      </div>
    </div>
  );
}

// ─── PEKERJAAN SELECTOR ────────────────────────────────────────
function PekerjaanSelector({ value, onChange, error }) {
  const [search, setSearch] = useState("");
  const selected = mockPekerjaan.find((p) => p.kode === value);
  const filtered = mockPekerjaan.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.no_anggaran.includes(search) ||
      p.kode.toLowerCase().includes(search.toLowerCase()),
  );
  const getAssetCount = (kode) =>
    mockAssets.filter((a) => a.pekerjaan_kode === kode).length;

  if (selected) {
    return (
      <div className="pjm-pkj-selected-card">
        <span
          style={{
            color: "#0891b2",
            display: "flex",
            marginTop: 2,
            flexShrink: 0,
          }}
        >
          <Icon.Briefcase />
        </span>
        <div className="pjm-pkj-selected-info">
          <div className="pjm-pkj-selected-name">{selected.nama}</div>
          <div className="pjm-pkj-selected-meta">
            <span style={{ fontWeight: 700, color: "#0891b2" }}>
              {selected.no_anggaran}
            </span>
            <span>·</span>
            <span
              className={`pjm-pkj-jenis pjm-pkj-jenis--${selected.jenis.toLowerCase()}`}
            >
              {selected.jenis}
            </span>
            <span>·</span>
            <span>{getAssetCount(selected.kode)} aset</span>
          </div>
        </div>
        <button
          type="button"
          className="pjm-pkj-change-btn"
          onClick={() => onChange("")}
        >
          Ganti
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
      <div className="pjm-search-wrap" style={{ minWidth: "unset" }}>
        <Icon.Search />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama pekerjaan atau nomor anggaran..."
          style={{
            border: "none",
            outline: "none",
            fontSize: ".78rem",
            flex: 1,
            background: "transparent",
            fontFamily: "inherit",
          }}
        />
        {search && (
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--slate-4)",
              padding: 0,
              display: "flex",
            }}
            onClick={() => setSearch("")}
          >
            <Icon.Times />
          </button>
        )}
      </div>
      {error && <span className="pjm-ferr">{error}</span>}
      <div className="pjm-pkj-list">
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "1.2rem",
              color: "var(--slate-4)",
              fontSize: ".78rem",
            }}
          >
            Tidak ada pekerjaan ditemukan
          </div>
        ) : (
          filtered.map((p) => {
            const cnt = getAssetCount(p.kode);
            return (
              <button
                key={p.kode}
                type="button"
                className={`pjm-pkj-item ${value === p.kode ? "pjm-pkj-item--active" : ""}`}
                onClick={() => onChange(p.kode)}
              >
                <span className="pjm-pkj-no">{p.no_anggaran}</span>
                <span
                  className={`pjm-pkj-jenis pjm-pkj-jenis--${p.jenis.toLowerCase()}`}
                >
                  {p.jenis}
                </span>
                <span
                  className={`pjm-pkj-nama ${value === p.kode ? "pjm-pkj-nama-active" : ""}`}
                >
                  {p.nama}
                </span>
                <span className="pjm-pkj-aset-cnt">{cnt}</span>
                {value === p.kode && (
                  <span className="pjm-pkj-check">
                    <Icon.Check />
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── ASSET HISTORY MODAL ──────────────────────────────────────
function AssetHistoryModal({
  assetCode,
  assetName,
  borrows,
  returns,
  onClose,
}) {
  const allHistory = useMemo(() => {
    const active = borrows
      .filter((b) => b.code === assetCode)
      .map((b) => ({ ...b, source: "borrow", is_returned: false }));
    const returned = returns
      .filter((r) => r.code === assetCode)
      .map((r) => ({ ...r, source: "return", is_returned: true }));
    return [...active, ...returned].sort(
      (a, b) => new Date(b.borrow_date) - new Date(a.borrow_date),
    );
  }, [assetCode, borrows, returns]);
  const activeCount = allHistory.filter((h) => !h.is_returned).length;
  const doneCount = allHistory.filter((h) => h.is_returned).length;

  return (
    <div className="pjm-overlay" onClick={onClose}>
      <div
        className="pjm-modal pjm-modal--hist"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pjm-modal-header pjm-mh--purple">
          <h2>
            <span className="pjm-mh-ico pjm-mh-ico--purple">
              <Icon.History />
            </span>
            Riwayat Serah Terima
          </h2>
          <button className="pjm-modal-close" onClick={onClose}>
            <Icon.Times />
          </button>
        </div>
        <div className="pjm-modal-body">
          <div className="pjm-hist-header-info">
            <code className="pjm-hist-code">{assetCode}</code>
            <span className="pjm-hist-name">{assetName}</span>
          </div>
          <div className="pjm-hist-summary">
            <span className="pjm-hist-pill pjm-hist-pill--total">
              {allHistory.length}x Total
            </span>
            <span className="pjm-hist-pill pjm-hist-pill--done">
              {doneCount}x Selesai
            </span>
            {activeCount > 0 && (
              <span className="pjm-hist-pill pjm-hist-pill--active">
                {activeCount}x Aktif
              </span>
            )}
          </div>
          {allHistory.length === 0 ? (
            <div className="pjm-hist-empty">
              <span style={{ color: "#cbd5e1" }}>
                <Icon.ClipboardEmpty />
              </span>
              <span className="pjm-hist-empty-title">Belum Ada Riwayat</span>
              <span className="pjm-hist-empty-sub">
                Aset ini belum pernah diserahterimakan.
              </span>
            </div>
          ) : (
            <div className="pjm-hist-table-wrap">
              <table className="pjm-hist-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pemberi → Penerima</th>
                    <th>Dari → Ke</th>
                    <th>Tgl Pinjam</th>
                    <th>Tgl Kembali</th>
                    <th>Kondisi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allHistory.map((h, idx) => {
                    const giver = getUser(h.giver_id);
                    const receiver = getUser(h.receiver_id);
                    const condKey = h.is_returned
                      ? h.return_condition
                      : h.condition;
                    const cond = conditionConfig[condKey];
                    return (
                      <tr
                        key={`${h.id}-${h.source}`}
                        className={!h.is_returned ? "pjm-hist-row--active" : ""}
                      >
                        <td className="pjm-hist-num">
                          {allHistory.length - idx}
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <div className="pjm-hist-user">
                              <div
                                className="pjm-hist-av"
                                style={{
                                  background: "#fef3c7",
                                  color: "#d97706",
                                }}
                              >
                                {giver.name.charAt(0)}
                              </div>
                              <div>
                                <div className="pjm-hist-uname">
                                  {giver.name}
                                </div>
                                <div className="pjm-hist-ubranch">Pemberi</div>
                              </div>
                            </div>
                            <span style={{ color: "#94a3b8", display: "flex" }}>
                              <Icon.ArrowRight />
                            </span>
                            <div className="pjm-hist-user">
                              <div className="pjm-hist-av">
                                {receiver.name.charAt(0)}
                              </div>
                              <div>
                                <div className="pjm-hist-uname">
                                  {receiver.name}
                                </div>
                                <div className="pjm-hist-ubranch">Penerima</div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="pjm-hist-loc">
                            <span className="pjm-hist-loc-from">
                              {h.from_zone}
                            </span>
                            <span className="pjm-hist-loc-arr">
                              <Icon.ArrowRight />
                            </span>
                            <span className="pjm-hist-loc-to">{h.to_zone}</span>
                          </div>
                        </td>
                        <td className="pjm-hist-date">
                          {fmtDateShort(h.borrow_date)}
                        </td>
                        <td className="pjm-hist-date">
                          {h.is_returned ? (
                            <span className="pjm-hist-date-ret">
                              {fmtDateShort(h.return_date)}
                            </span>
                          ) : (
                            <span className="pjm-hist-no-ret">
                              Belum kembali
                            </span>
                          )}
                        </td>
                        <td>
                          {cond && (
                            <span
                              className="pjm-hist-cond"
                              style={{ background: cond.bg, color: cond.color }}
                            >
                              {cond.label}
                            </span>
                          )}
                        </td>
                        <td>
                          {h.is_returned ? (
                            <span className="pjm-hist-status pjm-hist-status--done">
                              Selesai
                            </span>
                          ) : (
                            <span className="pjm-hist-status pjm-hist-status--active">
                              Aktif
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="pjm-modal-footer">
          <button className="pjm-btn pjm-btn-ghost" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BORROW FORM ──────────────────────────────────────────────
function BorrowFormModal({ borrow, onClose, onSave }) {
  const isEdit = !!borrow;
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 7);

  const [form, setForm] = useState(
    borrow
      ? {
          ...borrow,
          attachmentFile: borrow.attachment
            ? { name: borrow.attachment }
            : null,
        }
      : {
          pekerjaan_kode: "",
          code: "",
          borrow_date: new Date().toISOString().slice(0, 16),
          due_date: defaultDueDate.toISOString().slice(0, 10),
          giver_id: "",
          receiver_id: "",
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

  const availableAssets = form.pekerjaan_kode
    ? mockAssets.filter((a) => a.pekerjaan_kode === form.pekerjaan_kode)
    : [];
  const assetOptions = availableAssets.map((a) => ({
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

  const handlePekerjaanChange = (kode) =>
    setForm((f) => ({
      ...f,
      pekerjaan_kode: kode,
      code: "",
      from_zone: "",
      name: "",
    }));
  const handleAssetChange = (code) => {
    const asset = getAsset(code);
    setForm((f) => ({
      ...f,
      code,
      from_zone: asset?.zone || "",
      name: asset?.name || "",
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.pekerjaan_kode) e.pekerjaan_kode = "Wajib pilih pekerjaan";
    if (!form.code) e.code = "Wajib dipilih";
    if (!form.giver_id) e.giver_id = "Wajib diisi";
    if (!form.receiver_id) e.receiver_id = "Wajib diisi";
    if (!form.to_zone) e.to_zone = "Wajib diisi";
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
      giver_id: parseInt(form.giver_id),
      receiver_id: parseInt(form.receiver_id),
      borrower_id: parseInt(form.receiver_id),
      performed_by_id: LOGGED_IN_ADMIN_ID,
      attachment: form.attachmentFile?.name || null,
    });
    onClose();
  };

  const handleGenerateBAST = () => {
    if (!form.giver_id || !form.receiver_id || !form.code) {
      alert(
        "Lengkapi data Aset, User Pemberi, dan User Penerima terlebih dahulu.",
      );
      return;
    }
    const asset = getAsset(form.code);
    generateBAST(
      {
        ...form,
        id: borrow?.id || Date.now(),
        name: asset?.name || form.code,
        giver_id: parseInt(form.giver_id),
        receiver_id: parseInt(form.receiver_id),
        performed_by_id: LOGGED_IN_ADMIN_ID,
      },
      "borrow",
    );
  };

  const selectedPekerjaan = mockPekerjaan.find(
    (p) => p.kode === form.pekerjaan_kode,
  );

  const stepNum = (n, active) => (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: active ? undefined : "var(--slate-4)",
        color: "white",
        fontSize: ".6rem",
        fontWeight: 800,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {n}
    </span>
  );

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
            {isEdit ? "Edit Serah Terima" : "Catat Serah Terima"}
          </h2>
          <button className="pjm-modal-close" onClick={onClose}>
            <Icon.Times />
          </button>
        </div>
        <div className="pjm-modal-body">
          <div className="pjm-form-section">
            <span
              className="pjm-form-section-label"
              style={{ color: "#0891b2" }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                {stepNum(1, true)} Pilih Pekerjaan
              </span>
            </span>
            <div className="pjm-form-section-line" />
          </div>
          <div className="pjm-fg">
            <label>
              Pekerjaan / Program Anggaran <span className="pjm-req">*</span>
            </label>
            <PekerjaanSelector
              value={form.pekerjaan_kode}
              onChange={handlePekerjaanChange}
              error={errors.pekerjaan_kode}
            />
          </div>

          <div className="pjm-form-section">
            <span
              className="pjm-form-section-label"
              style={{
                color: form.pekerjaan_kode ? "var(--blue)" : "var(--slate-4)",
              }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                {stepNum(2, !!form.pekerjaan_kode)} Pilih Aset
              </span>
            </span>
            <div className="pjm-form-section-line" />
          </div>
          <div className="pjm-fg">
            <label>
              Aset <span className="pjm-req">*</span>
              {selectedPekerjaan && (
                <span
                  style={{
                    marginLeft: 5,
                    fontSize: ".67rem",
                    fontWeight: 600,
                    color: "#0891b2",
                  }}
                >
                  — {availableAssets.length} aset tersedia
                </span>
              )}
            </label>
            {!form.pekerjaan_kode ? (
              <div
                style={{
                  padding: ".6rem .85rem",
                  background: "#f8fafc",
                  border: "1.5px dashed var(--border)",
                  borderRadius: 8,
                  fontSize: ".77rem",
                  color: "var(--slate-4)",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <Icon.ArrowRight />
                Pilih pekerjaan terlebih dahulu
              </div>
            ) : (
              <>
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
                    <Icon.MapPin /> Lokasi:{" "}
                    <strong>{getAsset(form.code)?.zone}</strong>
                  </span>
                )}
                {errors.code && <span className="pjm-ferr">{errors.code}</span>}
              </>
            )}
          </div>

          <div className="pjm-form-section">
            <span
              className="pjm-form-section-label"
              style={{ color: form.code ? "#d97706" : "var(--slate-4)" }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                {stepNum(3, !!form.code)} Pihak yang Terlibat
              </span>
            </span>
            <div className="pjm-form-section-line" />
          </div>
          <div className="pjm-frow">
            <div className="pjm-fg">
              <label>
                User Pemberi <span className="pjm-req">*</span>
              </label>
              <SearchCombobox
                options={userOptions}
                value={form.giver_id}
                onChange={(val) => setForm({ ...form, giver_id: val })}
                placeholder="Pilih pemberi..."
                renderLabel={(o) => o.label}
                renderSub={(o) => o.sub}
                hasError={!!errors.giver_id}
              />
              {errors.giver_id && (
                <span className="pjm-ferr">{errors.giver_id}</span>
              )}
            </div>
            <div className="pjm-fg">
              <label>
                User Penerima <span className="pjm-req">*</span>
              </label>
              <SearchCombobox
                options={userOptions}
                value={form.receiver_id}
                onChange={(val) => setForm({ ...form, receiver_id: val })}
                placeholder="Pilih penerima..."
                renderLabel={(o) => o.label}
                renderSub={(o) => o.sub}
                hasError={!!errors.receiver_id}
              />
              {errors.receiver_id && (
                <span className="pjm-ferr">{errors.receiver_id}</span>
              )}
            </div>
          </div>

          <div className="pjm-form-section">
            <span
              className="pjm-form-section-label"
              style={{ color: "var(--slate-6)" }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                {stepNum(4, false)} Waktu & Lokasi
              </span>
            </span>
            <div className="pjm-form-section-line" />
          </div>
          <div className="pjm-frow">
            <div className="pjm-fg">
              <label>Waktu Serah Terima</label>
              <input
                type="datetime-local"
                value={form.borrow_date}
                className="pjm-input-ro"
                readOnly
              />
            </div>
            <div className="pjm-fg">
              <label>
                Jatuh Tempo <span className="pjm-req">*</span>
              </label>
              <input
                type="date"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              />
            </div>
          </div>
          <div className="pjm-frow">
            <div className="pjm-fg">
              <label>Dari Lokasi</label>
              <input
                value={form.from_zone}
                readOnly
                className="pjm-input-ro"
                placeholder="Dari aset"
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
            <label>Keperluan / Catatan</label>
            <input
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Cth: Dipinjam untuk operasional proyek"
            />
          </div>

          <div className="pjm-form-section">
            <span
              className="pjm-form-section-label"
              style={{ color: "var(--slate-6)" }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                {stepNum(5, false)} Kondisi & BAST
              </span>
            </span>
            <div className="pjm-form-section-line" />
          </div>
          <div className="pjm-fg">
            <label>Kondisi Aset Saat Keluar</label>
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
          <PdfUpload
            value={form.attachmentFile}
            onChange={(f) => setForm({ ...form, attachmentFile: f })}
          />
          {!form.attachmentFile && (
            <div className="pjm-bast-note">
              <span className="pjm-bast-note-icon">✨</span>
              <div>
                <strong>Tidak punya file BAST?</strong> Klik Generate BAST untuk
                membuat dokumen otomatis.
              </div>
            </div>
          )}
        </div>
        <div className="pjm-modal-footer">
          <button className="pjm-btn pjm-btn-ghost" onClick={onClose}>
            Batal
          </button>
          {!form.attachmentFile && (
            <button
              className="pjm-btn pjm-btn-purple"
              onClick={handleGenerateBAST}
            >
              <Icon.Printer /> Generate BAST
            </button>
          )}
          <button className="pjm-btn pjm-btn-blue" onClick={handleSave}>
            <Icon.Check /> Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── RETURN FORM ──────────────────────────────────────────────
function ReturnFormModal({ borrow, onClose, onSave }) {
  if (!borrow) return null;
  const giver = getUser(borrow.giver_id);
  const receiver = getUser(borrow.receiver_id);
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
      pekerjaan_kode: borrow.pekerjaan_kode,
      code: borrow.code,
      name: borrow.name,
      borrow_date: borrow.borrow_date,
      return_date: form.return_date,
      performed_by_id: LOGGED_IN_ADMIN_ID,
      giver_id: borrow.receiver_id,
      receiver_id: borrow.giver_id,
      borrower_id: borrow.receiver_id,
      from_zone: borrow.from_zone,
      to_zone: borrow.to_zone,
      reason: borrow.reason,
      return_condition: form.return_condition,
      return_notes: form.return_notes,
      attachment: form.attachmentFile?.name || null,
    });
    onClose();
  };

  const handleGenerateBAST = () =>
    generateBAST(
      {
        ...borrow,
        giver_id: borrow.receiver_id,
        receiver_id: borrow.giver_id,
        return_date: form.return_date,
        return_condition: form.return_condition,
        return_notes: form.return_notes,
      },
      "return",
    );

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
          {borrow.pekerjaan_kode &&
            (() => {
              const pkj = getPekerjaan(borrow.pekerjaan_kode);
              return pkj ? (
                <div className="pjm-pkj-info-box">
                  <span
                    style={{
                      color: "#0891b2",
                      display: "flex",
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    <Icon.Briefcase />
                  </span>
                  <div>
                    <div className="pjm-pkj-info-lbl">Pekerjaan</div>
                    <div className="pjm-pkj-info-name">{pkj.nama}</div>
                    <div className="pjm-pkj-info-meta">
                      {pkj.no_anggaran} · {pkj.jenis}
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          <div className="pjm-ret-info-card">
            <div className="pjm-ric-row">
              <span className="pjm-ric-lbl">Aset</span>
              <span>
                <code className="pjm-ctag">{borrow.code}</code> {borrow.name}
              </span>
            </div>
            <div className="pjm-ric-row">
              <span className="pjm-ric-lbl">Dikembalikan oleh</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#dbeafe",
                    color: "#2563eb",
                    fontSize: ".65rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {receiver.name.charAt(0)}
                </span>
                <strong>{receiver.name}</strong>
              </span>
            </div>
            <div className="pjm-ric-row">
              <span className="pjm-ric-lbl">Dikembalikan ke</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fef3c7",
                    color: "#d97706",
                    fontSize: ".65rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {giver.name.charAt(0)}
                </span>
                <span className="pjm-text-green">{giver.name}</span>
              </span>
            </div>
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
          />
          {!form.attachmentFile && (
            <div className="pjm-bast-note">
              <span className="pjm-bast-note-icon">✨</span>
              <div>
                <strong>Generate BAST Pengembalian</strong> — Klik tombol di
                bawah untuk membuat dokumen otomatis.
              </div>
            </div>
          )}
        </div>
        <div className="pjm-modal-footer">
          <button className="pjm-btn pjm-btn-ghost" onClick={onClose}>
            Batal
          </button>
          {!form.attachmentFile && (
            <button
              className="pjm-btn pjm-btn-purple"
              onClick={handleGenerateBAST}
            >
              <Icon.Printer /> Generate BAST
            </button>
          )}
          <button className="pjm-btn pjm-btn-green" onClick={handleSave}>
            <Icon.Undo /> Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────
function DetailModal({
  item,
  itemType,
  onClose,
  onEdit,
  onReturn,
  onViewHistory,
  borrows,
  returns,
}) {
  if (!item) return null;
  const isBorrow = itemType === "borrow";
  const giver = getUser(item.giver_id);
  const receiver = getUser(item.receiver_id);
  const cond =
    conditionConfig[isBorrow ? item.condition : item.return_condition];
  const overdue = isBorrow && isOverdue(item.due_date);
  const cat = assetCategories[getCategory(item.code)];
  const histCount = [
    ...borrows.filter((b) => b.code === item.code),
    ...returns.filter((r) => r.code === item.code),
  ].length;
  const pekerjaan = getPekerjaan(item.pekerjaan_kode);

  const uAvatar = (name, bg, color) => (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: bg,
        color,
        fontSize: ".62rem",
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {name.charAt(0)}
    </span>
  );

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
            {isBorrow ? "Detail Serah Terima" : "Detail Pengembalian"}
          </h2>
          <button className="pjm-modal-close" onClick={onClose}>
            <Icon.Times />
          </button>
        </div>
        <div className="pjm-modal-body">
          {pekerjaan && (
            <div className="pjm-pkj-info-box">
              <span
                style={{
                  color: "#0891b2",
                  display: "flex",
                  marginTop: 2,
                  flexShrink: 0,
                }}
              >
                <Icon.Briefcase />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="pjm-pkj-info-lbl">Pekerjaan / Anggaran</div>
                <div className="pjm-pkj-info-name">{pekerjaan.nama}</div>
                <div className="pjm-pkj-info-meta">
                  {pekerjaan.no_anggaran} · {pekerjaan.jenis}
                </div>
              </div>
            </div>
          )}
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
              <span className="pjm-dgi-lbl">Tgl Serah Terima</span>
              <span className="pjm-dgi-val">{fmtDT(item.borrow_date)}</span>
            </div>
            {isBorrow ? (
              <div className="pjm-dgi">
                <span className="pjm-dgi-lbl">Jatuh Tempo</span>
                <span
                  className={`pjm-dgi-val ${overdue ? "pjm-text-danger" : ""}`}
                >
                  {fmtDate(item.due_date)}
                </span>
              </div>
            ) : (
              <div className="pjm-dgi">
                <span className="pjm-dgi-lbl">Tgl Dikembalikan</span>
                <span className="pjm-dgi-val pjm-text-green">
                  {fmtDT(item.return_date)}
                </span>
              </div>
            )}
            <div className="pjm-dgi">
              <span className="pjm-dgi-lbl">User Pemberi</span>
              <span
                className="pjm-dgi-val"
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                {uAvatar(giver.name, "#fef3c7", "#d97706")} {giver.name}{" "}
                <span className="pjm-text-muted" style={{ fontSize: ".72rem" }}>
                  · {giver.branch}
                </span>
              </span>
            </div>
            <div className="pjm-dgi">
              <span className="pjm-dgi-lbl">User Penerima</span>
              <span
                className="pjm-dgi-val"
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                {uAvatar(receiver.name, "#dbeafe", "#2563eb")} {receiver.name}{" "}
                <span className="pjm-text-muted" style={{ fontSize: ".72rem" }}>
                  · {receiver.branch}
                </span>
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
              <span className="pjm-dgi-lbl">Lokasi</span>
              <span className="pjm-dgi-val">
                {item.from_zone} →{" "}
                <span className="pjm-text-blue">{item.to_zone}</span>
              </span>
            </div>
            {item.reason && (
              <div className="pjm-dgi pjm-dgi--full">
                <span className="pjm-dgi-lbl">Alasan</span>
                <span className="pjm-dgi-val">{item.reason}</span>
              </div>
            )}
            {(isBorrow ? item.notes : item.return_notes) && (
              <div className="pjm-dgi pjm-dgi--full">
                <span className="pjm-dgi-lbl">Catatan</span>
                <span className="pjm-dgi-val">
                  {isBorrow ? item.notes : item.return_notes}
                </span>
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
          <button
            className="pjm-btn pjm-btn-ghost"
            style={{ color: "#7c3aed", borderColor: "#c4b5fd" }}
            onClick={() => {
              onViewHistory(item);
              onClose();
            }}
          >
            <Icon.History /> Riwayat ({histCount})
          </button>
          <button
            className="pjm-btn pjm-btn-purple"
            onClick={() => generateBAST(item, isBorrow ? "borrow" : "return")}
          >
            <Icon.Printer /> BAST
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
              <Icon.Undo /> Catat Kembali
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
          style={{ alignItems: "center", textAlign: "center", paddingTop: 28 }}
        >
          <div className="pjm-del-ico">
            <Icon.Trash />
          </div>
          <h3 className="pjm-del-title">Hapus Serah Terima?</h3>
          <p className="pjm-del-desc">
            Data serah terima <strong>{item.code}</strong> akan dihapus
            permanen.
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
function CategoryGroup({
  catKey,
  items,
  onView,
  onEdit,
  onReturn,
  onDelete,
  onViewHistory,
}) {
  const [open, setOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
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
          <table className="pjm-table pjm-table--borrow">
            <thead>
              <tr>
                <th>Aset</th>
                <th>Pekerjaan</th>
                <th>Pemberi → Penerima</th>
                <th>Dari → Ke</th>
                <th>Tgl ST</th>
                <th>Jatuh Tempo</th>
                <th>Kondisi</th>
                <th>BAST</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => {
                const cond = conditionConfig[b.condition];
                const over = isOverdue(b.due_date);
                const pkj = getPekerjaan(b.pekerjaan_kode);
                return (
                  <tr key={b.id} className={over ? "pjm-row--over" : ""}>
                    <td>
                      <code className="pjm-ctag">{b.code}</code>
                      <div className="pjm-asub">{b.name}</div>
                    </td>
                    <td>
                      {pkj ? (
                        <>
                          <div className="pjm-pkj-badge">
                            <Icon.Tag />
                            {pkj.no_anggaran}
                          </div>
                          <div className="pjm-pkj-name-sm">
                            {pkj.nama.length > 45
                              ? pkj.nama.slice(0, 45) + "…"
                              : pkj.nama}
                          </div>
                        </>
                      ) : (
                        <span className="pjm-text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <UserFlowCell
                        giverId={b.giver_id}
                        receiverId={b.receiver_id}
                      />
                    </td>
                    <td>
                      <div className="pjm-loc-flow">
                        <span className="pjm-loc-f">{b.from_zone}</span>
                        <span className="pjm-loc-arr">
                          <Icon.ArrowRight />
                        </span>
                        <span className="pjm-loc-t">{b.to_zone}</span>
                      </div>
                    </td>
                    <td className="pjm-td-date">
                      {fmtDateShort(b.borrow_date)}
                    </td>
                    <td>
                      <span
                        className={`pjm-due ${over ? "pjm-due--over" : ""}`}
                      >
                        {over && <Icon.Clock />}
                        {fmtDateShort(b.due_date)}
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
                        <button
                          className="pjm-bast-gen-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            generateBAST(b, "borrow");
                          }}
                        >
                          <Icon.Printer /> Gen
                        </button>
                      )}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <ActionDropdown
                        id={b.id}
                        activeId={activeDropdown}
                        setActiveId={setActiveDropdown}
                        items={[
                          {
                            icon: <Icon.Eye />,
                            label: "Lihat Detail",
                            onClick: () => onView(b),
                          },
                          {
                            icon: <Icon.Edit />,
                            label: "Edit",
                            onClick: () => onEdit(b),
                          },
                          {
                            icon: <Icon.Undo />,
                            label: "Catat Pengembalian",
                            className: "dd-ret",
                            onClick: () => onReturn(b),
                          },
                          {
                            icon: <Icon.Printer />,
                            label: "Generate BAST",
                            className: "dd-bast",
                            onClick: () => generateBAST(b, "borrow"),
                          },
                          {
                            icon: <Icon.History />,
                            label: "Riwayat Aset",
                            className: "dd-hist",
                            onClick: () => onViewHistory(b),
                          },
                          { type: "divider" },
                          {
                            icon: <Icon.Trash />,
                            label: "Hapus",
                            className: "dd-del",
                            onClick: () => onDelete(b),
                          },
                        ]}
                      />
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
  const [filterPekerjaan, setFilterPekerjaan] = useState("semua");
  const [modal, setModal] = useState(null);
  const [historyModal, setHistoryModal] = useState(null);
  const [activeReturnDropdown, setActiveReturnDropdown] = useState(null);

  const activeBorrows = borrows.filter((b) => !b.is_returned);
  const filteredBorrows = activeBorrows.filter((b) => {
    const q = search.toLowerCase();
    const ms =
      b.code.toLowerCase().includes(q) ||
      b.name.toLowerCase().includes(q) ||
      b.to_zone.toLowerCase().includes(q);
    const mu = filterUser === "semua" || b.receiver_id === parseInt(filterUser);
    const mp =
      filterPekerjaan === "semua" || b.pekerjaan_kode === filterPekerjaan;
    return ms && mu && mp;
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
  const handleViewHistory = (item) =>
    setHistoryModal({ code: item.code, name: item.name });

  return (
    <div className="pjm-root">
      <style>{styles}</style>

      {/* HEADER */}
      <div className="pjm-header">
        <div>
          <h1 className="pjm-title">BAST Aset</h1>
          <p className="pjm-subtitle">
            Kelola pencatatan BAST aset IT — peminjaman dan pengembalian per
            kategori
          </p>
        </div>
        <button
          className="pjm-btn pjm-btn-blue pjm-btn-lg"
          onClick={() => setModal({ type: "borrow-form", data: null })}
        >
          <Icon.Plus /> Catat Serah Terima
        </button>
      </div>

      {/* STATS */}
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
              {[...new Set(activeBorrows.map((b) => b.receiver_id))].length}
            </div>
            <div className="pjm-stat-l">Penerima Aktif</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="pjm-tab-sw">
        <button
          className={`pjm-tsb ${activeTab === "borrow" ? "pjm-tsb--blue" : ""}`}
          onClick={() => {
            setActiveTab("borrow");
            setSearch("");
          }}
        >
          <Icon.Exchange /> Daftar Serah Terima
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

      {/* TOOLBAR */}
      <div className="pjm-toolbar">
        <div className="pjm-search-wrap">
          <Icon.Search />
          <input
            placeholder={
              activeTab === "borrow"
                ? "Cari kode, nama aset, atau lokasi…"
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
          <>
            <div className="pjm-filter-wrap">
              <Icon.Briefcase />
              <select
                value={filterPekerjaan}
                onChange={(e) => setFilterPekerjaan(e.target.value)}
              >
                <option value="semua">Semua Pekerjaan</option>
                {mockPekerjaan.map((p) => (
                  <option key={p.kode} value={p.kode}>
                    {p.no_anggaran} — {p.nama.slice(0, 40)}…
                  </option>
                ))}
              </select>
            </div>
            <div className="pjm-filter-wrap">
              <Icon.User />
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              >
                <option value="semua">Semua Penerima</option>
                {mockUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="pjm-count-badge">
          {activeTab === "borrow"
            ? `${filteredBorrows.length} aset`
            : `${filteredReturns.length} pengembalian`}
        </div>
      </div>

      {/* BORROW TAB */}
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
                  onViewHistory={handleViewHistory}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* RETURN TAB */}
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
                    <th>Pekerjaan</th>
                    <th>Pemberi → Penerima</th>
                    <th>Dari → Ke</th>
                    <th>Tgl Pinjam</th>
                    <th>Tgl Kembali</th>
                    <th>Kondisi</th>
                    <th>Catatan</th>
                    <th>BAST</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReturns.map((r) => {
                    const cond = conditionConfig[r.return_condition];
                    const pkj = getPekerjaan(r.pekerjaan_kode);
                    return (
                      <tr key={r.id}>
                        <td>
                          <code className="pjm-ctag">{r.code}</code>
                          <div className="pjm-asub">{r.name}</div>
                        </td>
                        <td>
                          {pkj ? (
                            <>
                              <div className="pjm-pkj-badge">
                                <Icon.Tag />
                                {pkj.no_anggaran}
                              </div>
                              <div className="pjm-pkj-name-sm">
                                {pkj.nama.length > 40
                                  ? pkj.nama.slice(0, 40) + "…"
                                  : pkj.nama}
                              </div>
                            </>
                          ) : (
                            <span className="pjm-text-muted">—</span>
                          )}
                        </td>
                        <td>
                          <UserFlowCell
                            giverId={r.giver_id}
                            receiverId={r.receiver_id}
                            colorScheme="green"
                          />
                        </td>
                        <td>
                          <div className="pjm-loc-flow">
                            <span className="pjm-loc-f">{r.from_zone}</span>
                            <span className="pjm-loc-arr">
                              <Icon.ArrowRight />
                            </span>
                            <span className="pjm-loc-t">{r.to_zone}</span>
                          </div>
                        </td>
                        <td className="pjm-td-date">
                          {fmtDateShort(r.borrow_date)}
                        </td>
                        <td className="pjm-td-date pjm-td-date--green">
                          {fmtDateShort(r.return_date)}
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
                            <button
                              className="pjm-bast-gen-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                generateBAST(r, "return");
                              }}
                            >
                              <Icon.Printer /> Gen
                            </button>
                          )}
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <ActionDropdown
                            id={r.id}
                            activeId={activeReturnDropdown}
                            setActiveId={setActiveReturnDropdown}
                            items={[
                              {
                                icon: <Icon.Eye />,
                                label: "Lihat Detail",
                                onClick: () =>
                                  setModal({
                                    type: "detail",
                                    data: r,
                                    itemType: "return",
                                  }),
                              },
                              {
                                icon: <Icon.Printer />,
                                label: "Generate BAST",
                                className: "dd-bast",
                                onClick: () => generateBAST(r, "return"),
                              },
                              {
                                icon: <Icon.History />,
                                label: "Riwayat Aset",
                                className: "dd-hist",
                                onClick: () => handleViewHistory(r),
                              },
                            ]}
                          />
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

      {/* MODALS */}
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
          onViewHistory={handleViewHistory}
          borrows={borrows}
          returns={returns}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          item={modal.data}
          onClose={() => setModal(null)}
          onConfirm={handleDelete}
        />
      )}
      {historyModal && (
        <AssetHistoryModal
          assetCode={historyModal.code}
          assetName={historyModal.name}
          borrows={borrows}
          returns={returns}
          onClose={() => setHistoryModal(null)}
        />
      )}
    </div>
  );
}
