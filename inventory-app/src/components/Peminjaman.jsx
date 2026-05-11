import React, { useState, useMemo, useRef, useEffect } from "react";

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
  Lock: () => (
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Unlock: () => (
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
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
  ChevronRight: () => (
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
      <polyline points="9 18 15 12 9 6" />
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
  ArrowLeft: () => (
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
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
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
};

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
  { code: "SPMT-LPT-X1-001", name: "Laptop Lenovo ThinkPad X1", zone: "Ruang IT", pekerjaan_kode: "2540011-C", status_id: 2, owner_id: 3 },
  { code: "SPMT-LPT-X1-002", name: "Laptop Lenovo ThinkPad X1", zone: "Gudang", pekerjaan_kode: "2540011-C", status_id: 1 },

  { code: "SPMT-LPT-DL-001", name: "Laptop Dell Latitude 5420", zone: "Terminal 1", pekerjaan_kode: "2440020-A", status_id: 1 },
  { code: "SPMT-LPT-DL-002", name: "Laptop Dell Latitude 5420", zone: "Gudang", pekerjaan_kode: "2440020-A", status_id: 1 },

  { code: "SPMT-LPT-HP-001", name: "Laptop HP EliteBook 840", zone: "Terminal 2", pekerjaan_kode: "2440020-A", status_id: 1 },
  { code: "SPMT-LPT-HP-002", name: "Laptop HP EliteBook 840", zone: "Gudang", pekerjaan_kode: "2440020-A", status_id: 1 },

  { code: "SPMT-PC-HP-001", name: "PC Desktop HP EliteDesk", zone: "Ruang Admin", pekerjaan_kode: "2440020-B", status_id: 2, owner_id: 2 },
  { code: "SPMT-PC-HP-002", name: "PC Desktop HP EliteDesk", zone: "Gudang", pekerjaan_kode: "2440020-B", status_id: 1 },

  { code: "SPMT-PC-DL-001", name: "PC Desktop Dell OptiPlex", zone: "Terminal 1", pekerjaan_kode: "2440020-B", status_id: 1 },
  { code: "SPMT-PC-DL-002", name: "PC Desktop Dell OptiPlex", zone: "Gudang", pekerjaan_kode: "2440020-B", status_id: 1 },

  { code: "SPMT-SRV-HP-001", name: "Server HP ProLiant DL380", zone: "Data Center", pekerjaan_kode: "2540011-C", status_id: 1 },
  { code: "SPMT-SRV-HP-002", name: "Server HP ProLiant DL380", zone: "Gudang", pekerjaan_kode: "2540011-C", status_id: 1 },

  { code: "SPMT-SWT-CS-001", name: "Switch Cisco Catalyst 9300", zone: "Ruang Network", pekerjaan_kode: "2540011-C", status_id: 2, owner_id: 1 },
  { code: "SPMT-SWT-CS-002", name: "Switch Cisco Catalyst 9300", zone: "Gudang", pekerjaan_kode: "2540011-C", status_id: 1 },

  { code: "SPMT-RTR-MT-001", name: "Router Mikrotik CCR2004", zone: "Ruang Network", pekerjaan_kode: "2540012-A", status_id: 1 },
  { code: "SPMT-RTR-MT-002", name: "Router Mikrotik CCR2004", zone: "Gudang", pekerjaan_kode: "2540012-A", status_id: 1 },

  { code: "SPMT-UPS-AP-001", name: "UPS APC Smart-UPS 3000", zone: "Data Center", pekerjaan_kode: "2540011-D", status_id: 1 },
  { code: "SPMT-UPS-AP-002", name: "UPS APC Smart-UPS 3000", zone: "Gudang", pekerjaan_kode: "2540011-D", status_id: 1 },

  { code: "SPMT-NET-AP-001", name: "Access Point Ubiquiti UniFi", zone: "Terminal 1", pekerjaan_kode: "2540011-A", status_id: 1 },
  { code: "SPMT-NET-AP-002", name: "Access Point Ubiquiti UniFi", zone: "Gudang", pekerjaan_kode: "2540011-A", status_id: 1 },

  { code: "SPMT-NET-CV-001", name: "CCTV Hikvision DS-2CD", zone: "Gate Area", pekerjaan_kode: "2540011-D", status_id: 1 },
  { code: "SPMT-NET-CV-002", name: "CCTV Hikvision DS-2CD", zone: "Gudang", pekerjaan_kode: "2540011-D", status_id: 1 },

  { code: "SPMT-NET-PA-001", name: "Public Announcer Bosch Praesideo", zone: "Terminal 2", pekerjaan_kode: "2540011-B", status_id: 1 },
  { code: "SPMT-NET-PA-002", name: "Public Announcer Bosch Praesideo", zone: "Gudang", pekerjaan_kode: "2540011-B", status_id: 1 },

  { code: "SPMT-NET-RD-001", name: "Radio Point-To-Point Ubiquiti", zone: "Ruang Network", pekerjaan_kode: "2440020-B", status_id: 1 },
  { code: "SPMT-NET-RD-002", name: "Radio Point-To-Point Ubiquiti", zone: "Gudang", pekerjaan_kode: "2440020-B", status_id: 1 },

  { code: "SPMT-NET-FW-001", name: "Firewall Fortinet FortiGate", zone: "Data Center", pekerjaan_kode: "2540010-A", status_id: 1 },
  { code: "SPMT-NET-FW-002", name: "Firewall Fortinet FortiGate", zone: "Gudang", pekerjaan_kode: "2540010-A", status_id: 1 },
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
    code: "SPMT-LPT-X1-001",
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
    code: "SPMT-LPT-HP-001",
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
    code: "SPMT-PC-HP-001",
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
    code: "SPMT-SWT-CS-001",
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
    code: "SPMT-LPT-DL-001",
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
    code: "SPMT-PC-DL-001",
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
    code: "SPMT-UPS-AP-001",
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
    code: "SPMT-LPT-X1-001",
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

const generateBAST = (item, type = "borrow") => {
  const isBorrow = type === "borrow";
  const giver = getUser(item.giver_id);
  const receiver = getUser(item.receiver_id);
  const nomorBAST = genNomorBAST(item.id, item.borrow_date);
  const tglDokumen = fmtDate(isBorrow ? item.borrow_date : item.return_date);
  const kondisi =
    conditionConfig[isBorrow ? item.condition : item.return_condition];
  const pekerjaan = getPekerjaan(item.pekerjaan_kode);
  const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Times New Roman',Times,serif;font-size:12pt;color:#000;background:#fff;padding:40px 50px;}.kop{display:flex;align-items:center;gap:20px;border-bottom:3px double #000;padding-bottom:14px;margin-bottom:20px;}.kop-logo{width:70px;height:70px;background:#003675;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:11pt;text-align:center;padding:8px;flex-shrink:0;}.kop-text h1{font-size:14pt;font-weight:bold;letter-spacing:1px;text-transform:uppercase;}.kop-text p{font-size:10pt;color:#333;}.judul-doc{text-align:center;margin:24px 0 6px;}.judul-doc h2{font-size:14pt;font-weight:bold;text-transform:uppercase;letter-spacing:2px;text-decoration:underline;}.nomor-doc{text-align:center;font-size:11pt;margin-bottom:20px;color:#333;}.intro{margin-bottom:18px;line-height:1.8;text-align:justify;}.section-title{font-weight:bold;font-size:11pt;margin:18px 0 8px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #999;padding-bottom:4px;}table.detail{width:100%;border-collapse:collapse;margin-bottom:16px;}table.detail td{padding:6px 8px;font-size:11pt;vertical-align:top;}table.detail td:first-child{width:38%;font-weight:500;}table.detail td:nth-child(2){width:4%;text-align:center;}table.asset-table{width:100%;border-collapse:collapse;margin-bottom:20px;}table.asset-table th{background:#003675;color:white;padding:8px 10px;font-size:10.5pt;font-weight:bold;border:1px solid #003675;}table.asset-table td{border:1px solid #ccc;padding:7px 10px;font-size:11pt;}table.asset-table tr:nth-child(even) td{background:#f4f7fb;}.kondisi-badge{display:inline-block;padding:2px 10px;border-radius:4px;font-weight:bold;font-size:10.5pt;background:${kondisi?.bg};color:${kondisi?.color};border:1px solid ${kondisi?.color};}.pernyataan{margin:18px 0;line-height:1.9;text-align:justify;font-size:11pt;}.ttd-section{display:flex;justify-content:space-between;margin-top:40px;gap:20px;}.ttd-box{flex:1;text-align:center;}.ttd-box .ttd-label{font-weight:bold;font-size:11pt;margin-bottom:4px;}.ttd-box .ttd-role{font-size:10pt;color:#555;margin-bottom:70px;}.ttd-box .ttd-nama{font-weight:bold;font-size:11pt;border-top:1.5px solid #000;padding-top:6px;}.ttd-box .ttd-jabatan{font-size:10pt;color:#444;}.footer-note{margin-top:28px;padding:10px 14px;background:#f8fafc;border-left:4px solid #003675;font-size:10pt;color:#555;line-height:1.6;}@media print{body{padding:20px 30px;}.no-print{display:none!important;}}</style></head><body><div class="kop"><div class="kop-logo">PELINDO</div><div class="kop-text"><h1>PT Pelabuhan Indonesia (Persero)</h1><p>Divisi Teknologi Informasi — Asset Management System</p><p>Jl. Medan Merdeka Timur No.16, Jakarta Pusat 10110</p></div></div><div class="judul-doc"><h2>Berita Acara Serah Terima Aset</h2><p style="font-size:11pt;margin-top:4px;font-style:italic;color:#555;">${isBorrow ? "Peminjaman / Pengeluaran Aset IT" : "Pengembalian Aset IT"}</p></div><div class="nomor-doc">Nomor: ${nomorBAST}</div><div class="intro">Pada hari ini, <strong>${tglDokumen}</strong>, yang bertanda tangan di bawah ini telah melaksanakan serah terima aset teknologi informasi milik PT Pelabuhan Indonesia (Persero), dengan rincian sebagai berikut:</div>${pekerjaan ? `<div class="section-title">Referensi Pekerjaan</div><table class="detail"><tr><td>No. Anggaran</td><td>:</td><td><strong>${pekerjaan.no_anggaran}</strong></td></tr><tr><td>Jenis Anggaran</td><td>:</td><td>${pekerjaan.jenis}</td></tr><tr><td>Nama Pekerjaan</td><td>:</td><td>${pekerjaan.nama}</td></tr></table>` : ""}<div class="section-title">Pihak yang Terlibat</div><table class="detail"><tr><td>Pihak Pemberi / Penyerah</td><td>:</td><td><strong>${giver.name}</strong> &nbsp;|&nbsp; ${giver.jabatan} &nbsp;|&nbsp; ${giver.branch}</td></tr><tr><td>Pihak Penerima</td><td>:</td><td><strong>${receiver.name}</strong> &nbsp;|&nbsp; ${receiver.jabatan} &nbsp;|&nbsp; ${receiver.branch}</td></tr><tr><td>Dicatat oleh (Admin IT)</td><td>:</td><td>${getUser(item.performed_by_id).name} &nbsp;|&nbsp; ${getUser(item.performed_by_id).jabatan}</td></tr></table><div class="section-title">Detail Transaksi</div><table class="detail"><tr><td>Tanggal Serah Terima</td><td>:</td><td>${tglDokumen}</td></tr>${isBorrow ? `<tr><td>Jatuh Tempo Pengembalian</td><td>:</td><td>${fmtDate(item.due_date)}</td></tr>` : `<tr><td>Tanggal Pengembalian</td><td>:</td><td>${fmtDate(item.return_date)}</td></tr>`}<tr><td>Lokasi Asal</td><td>:</td><td>${item.from_zone}</td></tr><tr><td>Lokasi Tujuan</td><td>:</td><td>${item.to_zone}</td></tr><tr><td>Tujuan / Keperluan</td><td>:</td><td>${item.reason || "-"}</td></tr>${!isBorrow && item.return_notes ? `<tr><td>Catatan Pengembalian</td><td>:</td><td>${item.return_notes}</td></tr>` : ""}</table><div class="section-title">Data Aset yang Diserahterimakan</div><table class="asset-table"><thead><tr><th>No.</th><th>Kode Aset</th><th>Nama / Deskripsi Aset</th><th>Kondisi</th></tr></thead><tbody><tr><td style="text-align:center">1</td><td style="font-family:monospace;font-weight:bold">${item.code}</td><td>${item.name}</td><td><span class="kondisi-badge">${kondisi?.label || "-"}</span></td></tr></tbody></table><div class="pernyataan">Dengan ditandatanganinya dokumen ini, kedua belah pihak menyatakan telah menerima dan menyerahkan aset tersebut di atas dalam kondisi yang tercantum, dan bertanggung jawab atas pemeliharaan dan keamanan aset selama berada dalam penguasaannya. ${isBorrow ? `Pihak penerima wajib mengembalikan aset paling lambat pada tanggal <strong>${fmtDate(item.due_date)}</strong>.` : `Aset dinyatakan telah dikembalikan kepada pihak pemberi dalam kondisi <strong>${kondisi?.label}</strong>.`}</div><div class="ttd-section"><div class="ttd-box"><div class="ttd-label">Pihak Pemberi / Penyerah</div><div class="ttd-role">(Menyerahkan Aset)</div><div class="ttd-nama">${giver.name}</div><div class="ttd-jabatan">${giver.jabatan} — ${giver.branch}</div></div><div class="ttd-box"><div class="ttd-label">Pihak Penerima</div><div class="ttd-role">(Menerima Aset)</div><div class="ttd-nama">${receiver.name}</div><div class="ttd-jabatan">${receiver.jabatan} — ${receiver.branch}</div></div><div class="ttd-box"><div class="ttd-label">Mengetahui</div><div class="ttd-role">(Admin IT / Sistem)</div><div class="ttd-nama">${getUser(item.performed_by_id).name}</div><div class="ttd-jabatan">${getUser(item.performed_by_id).jabatan}</div></div></div><div class="footer-note"><strong>Catatan:</strong> Dokumen ini digenerate secara otomatis oleh sistem Asset Management PT Pelabuhan Indonesia (Persero). Nomor referensi: <strong>${nomorBAST}</strong>. Harap simpan dokumen ini sebagai bukti serah terima resmi.</div><div class="no-print" style="margin-top:24px;text-align:center;"><button onclick="window.print()" style="padding:10px 28px;background:#003675;color:white;border:none;border-radius:8px;font-size:13pt;cursor:pointer;font-family:inherit;">Cetak / Simpan PDF</button></div></body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

// ─── CSS ───────────────────────────────────────────────────────
const S = {
  root: {
    padding: "1.5rem",
    maxWidth: 1300,
    margin: "0 auto",
    fontFamily: "'Inter','Plus Jakarta Sans',sans-serif",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.25rem",
    flexWrap: "wrap",
    gap: ".75rem",
  },
  title: {
    fontSize: "1.35rem",
    fontWeight: 800,
    color: "#0f172a",
    margin: "0 0 3px",
    letterSpacing: "-0.02em",
  },
  subtitle: { fontSize: "0.78rem", color: "#64748b", margin: 0 },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: ".75rem",
    marginBottom: "1.1rem",
  },
  statCard: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    padding: ".85rem 1rem",
    display: "flex",
    alignItems: "center",
    gap: ".75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  statCardWarn: { border: "1px solid #fca5a5", background: "#fff5f5" },
  statIco: {
    width: 36,
    height: 36,
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statN: {
    fontSize: "1.35rem",
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1,
  },
  statL: { fontSize: "0.7rem", color: "#64748b", marginTop: 2 },
  subNav: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    background: "#f1f5f9",
    borderRadius: 10,
    padding: 3,
    width: "fit-content",
    marginBottom: ".85rem",
  },
  subNavBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".4rem",
    padding: ".42rem 1rem",
    borderRadius: 8,
    border: "none",
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "#64748b",
    cursor: "pointer",
    background: "transparent",
    fontFamily: "inherit",
    transition: "all .15s",
    whiteSpace: "nowrap",
  },
  subNavBtnActive: {
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  subNavBtnBlue: { color: "#2563eb" },
  subNavBtnGreen: { color: "#16a34a" },
  tabBadge: {
    fontSize: "0.65rem",
    fontWeight: 700,
    background: "#e2e8f0",
    color: "#64748b",
    padding: "1px 6px",
    borderRadius: 99,
    minWidth: 18,
    textAlign: "center",
  },
  tabBadgeGreen: { background: "#dcfce7", color: "#16a34a" },
  tabBadgeWarn: { background: "#fee2e2", color: "#dc2626" },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: ".6rem",
    marginBottom: ".85rem",
    flexWrap: "wrap",
  },
  searchWrap: {
    flex: 1,
    minWidth: 220,
    display: "flex",
    alignItems: "center",
    gap: ".45rem",
    background: "#fff",
    border: "1.5px solid #e2e8f0",
    borderRadius: 9,
    padding: ".45rem .8rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: ".78rem",
    flex: 1,
    color: "#0f172a",
    background: "#fff",
    fontFamily: "inherit",
  },
  filterWrap: {
    display: "flex",
    alignItems: "center",
    gap: ".4rem",
    background: "#fff",
    border: "1.5px solid #e2e8f0",
    borderRadius: 9,
    padding: ".42rem .75rem",
  },
  filterSelect: {
    border: "none",
    outline: "none",
    fontSize: ".78rem",
    color: "#334155",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  countBadge: {
    fontSize: ".74rem",
    fontWeight: 600,
    color: "#64748b",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 7,
    padding: ".35rem .7rem",
    whiteSpace: "nowrap",
  },
  tableCard: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: ".78rem" },
  thead: { background: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  theadGreen: { background: "#f0fdf4" },
  th: {
    padding: ".7rem 1rem",
    textAlign: "left",
    fontWeight: 700,
    fontSize: ".68rem",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: ".04em",
    whiteSpace: "nowrap",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
    cursor: "pointer",
    transition: "background .1s",
  },
  trOver: { background: "#fff8f8" },
  td: { padding: ".65rem 1rem", verticalAlign: "middle" },
  code: {
    fontFamily: "'Courier New',monospace",
    fontSize: ".68rem",
    fontWeight: 700,
    color: "#2563eb",
    background: "#eff6ff",
    padding: "1px 5px",
    borderRadius: 4,
    whiteSpace: "nowrap",
  },
  assetName: {
    fontSize: ".75rem",
    fontWeight: 600,
    color: "#1e293b",
    marginTop: 2,
  },
  muted: { fontSize: ".68rem", color: "#94a3b8" },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 8px",
    borderRadius: 99,
    fontSize: ".67rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  overduePill: {
    fontSize: ".63rem",
    fontWeight: 700,
    background: "#fee2e2",
    color: "#dc2626",
    padding: "1px 6px",
    borderRadius: 99,
    whiteSpace: "nowrap",
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    fontWeight: 700,
    fontSize: ".65rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  locFlow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: ".74rem",
  },
  actionRow: { display: "flex", alignItems: "center", gap: 4 },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 6px",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    fontSize: ".7rem",
    fontWeight: 600,
    gap: 4,
    transition: "background .12s, color .12s",
    fontFamily: "inherit",
  },
  page: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  pageHeader: {
    padding: "1rem 1.25rem",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  pageTitle: {
    fontSize: ".9rem",
    fontWeight: 700,
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".4rem",
    padding: ".4rem .85rem",
    borderRadius: 8,
    border: "1.5px solid #e2e8f0",
    fontSize: ".78rem",
    fontWeight: 600,
    color: "#475569",
    background: "#f8fafc",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background .13s",
  },
  sectionLabel: {
    fontSize: ".63rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: ".06em",
    color: "#94a3b8",
    marginBottom: 8,
  },
  hRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 0,
    borderBottom: "1px solid #f8fafc",
    padding: ".42rem 0",
    minHeight: 32,
  },
  hRowLast: { borderBottom: "none" },
  hLbl: {
    flexShrink: 0,
    width: 170,
    fontSize: ".72rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: ".04em",
    paddingTop: 2,
    paddingRight: 10,
  },
  hColon: {
    flexShrink: 0,
    fontSize: ".72rem",
    color: "#cbd5e1",
    marginRight: 10,
    paddingTop: 2,
  },
  hVal: {
    flex: 1,
    fontSize: ".8rem",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: ".6rem",
    padding: "1rem 1.25rem",
    borderBottom: "1px solid #f1f5f9",
  },
  frow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" },
  fhRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 0,
    padding: ".35rem 0",
    borderBottom: "1px solid #f8fafc",
  },
  fhLbl: {
    flexShrink: 0,
    width: 160,
    fontSize: ".72rem",
    fontWeight: 700,
    color: "#475569",
    paddingTop: 8,
    paddingRight: 10,
  },
  fhColon: {
    flexShrink: 0,
    fontSize: ".72rem",
    color: "#cbd5e1",
    marginRight: 10,
    paddingTop: 8,
  },
  fhCtrl: { flex: 1 },
  fg: { display: "flex", flexDirection: "column", gap: ".25rem" },
  flabel: { fontSize: ".73rem", fontWeight: 600, color: "#475569" },
  finput: {
    padding: ".45rem .7rem",
    borderRadius: 8,
    border: "1.5px solid #e2e8f0",
    fontSize: ".78rem",
    outline: "none",
    fontFamily: "inherit",
    background: "#fff",
    color: "#0f172a",
    width: "100%",
    boxSizing: "border-box",
  },
  finputRo: {
    background: "#f8fafc",
    color: "#64748b",
    cursor: "default",
    border: "1.5px solid #e2e8f0",
  },
  ferr: { fontSize: ".67rem", color: "#dc2626" },
  chips: { display: "flex", gap: ".4rem", flexWrap: "wrap" },
  chip: {
    display: "flex",
    alignItems: "center",
    padding: ".32rem .75rem",
    borderRadius: 99,
    border: "1.5px solid #e2e8f0",
    cursor: "pointer",
    fontSize: ".74rem",
    fontWeight: 600,
    color: "#64748b",
    background: "#fff",
    fontFamily: "inherit",
    transition: "all .13s",
  },
  btnBlue: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".35rem",
    padding: ".45rem 1rem",
    borderRadius: 9,
    fontSize: ".78rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    background: "#2563eb",
    color: "#fff",
    fontFamily: "inherit",
    transition: "all .15s",
  },
  btnGreen: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".35rem",
    padding: ".45rem 1rem",
    borderRadius: 9,
    fontSize: ".78rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    background: "#16a34a",
    color: "#fff",
    fontFamily: "inherit",
    transition: "all .15s",
  },
  btnPurple: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".35rem",
    padding: ".45rem 1rem",
    borderRadius: 9,
    fontSize: ".78rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    background: "#7c3aed",
    color: "#fff",
    fontFamily: "inherit",
    transition: "all .15s",
  },
  btnRed: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".35rem",
    padding: ".45rem 1rem",
    borderRadius: 9,
    fontSize: ".78rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    background: "#dc2626",
    color: "#fff",
    fontFamily: "inherit",
    transition: "all .15s",
  },
  btnGhost: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".35rem",
    padding: ".45rem 1rem",
    borderRadius: 9,
    fontSize: ".78rem",
    fontWeight: 600,
    border: "1.5px solid #e2e8f0",
    cursor: "pointer",
    background: "#f8fafc",
    color: "#475569",
    fontFamily: "inherit",
    transition: "all .15s",
  },
  btnGhostSm: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".3rem",
    padding: ".32rem .75rem",
    borderRadius: 7,
    fontSize: ".73rem",
    fontWeight: 600,
    border: "1.5px solid #e2e8f0",
    cursor: "pointer",
    background: "#f8fafc",
    color: "#475569",
    fontFamily: "inherit",
    transition: "all .15s",
  },
  btnRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "1rem 1.25rem",
    borderTop: "1px solid #f1f5f9",
    flexWrap: "wrap",
  },
  catHdr: {
    display: "flex",
    alignItems: "center",
    gap: ".6rem",
    padding: ".65rem 1rem",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    cursor: "pointer",
    border: "none",
    width: "100%",
    fontFamily: "inherit",
    justifyContent: "space-between",
  },
  catIco: {
    width: 26,
    height: 26,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  catLbl: { fontSize: ".8rem", fontWeight: 700, color: "#0f172a" },
  catCnt: {
    fontSize: ".66rem",
    fontWeight: 700,
    background: "#e2e8f0",
    color: "#64748b",
    padding: "1px 7px",
    borderRadius: 99,
  },
  pkjBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    fontSize: ".65rem",
    fontWeight: 700,
    color: "#0891b2",
    background: "#ecfeff",
    border: "1px solid #a5f3fc",
    borderRadius: 4,
    padding: "1px 5px",
    whiteSpace: "nowrap",
  },
  pkjInfoName: {
    fontSize: ".78rem",
    fontWeight: 600,
    color: "#0e7490",
    lineHeight: 1.4,
  },
  pkjInfoMeta: { fontSize: ".68rem", color: "#0891b2", marginTop: 3 },
  retInfoCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 9,
    padding: ".75rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    margin: "0 1.25rem",
  },
  histPill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 9px",
    borderRadius: 20,
    fontSize: ".68rem",
    fontWeight: 700,
  },
  deleteBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem 1.25rem 1.25rem",
  },
  deleteIco: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "#fee2e2",
    color: "#dc2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  deleteTitle: {
    fontSize: ".95rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 6,
  },
  deleteDesc: { fontSize: ".78rem", color: "#64748b" },
  fileZone: {
    border: "2px dashed #e2e8f0",
    borderRadius: 9,
    padding: "1.1rem .85rem",
    textAlign: "center",
    cursor: "pointer",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: ".4rem",
  },
  filePreview: {
    display: "flex",
    alignItems: "center",
    gap: ".5rem",
    padding: ".5rem .75rem",
    background: "#eff6ff",
    borderRadius: 8,
    border: "1.5px solid #bfdbfe",
  },
  pkjList: {
    display: "flex",
    flexDirection: "column",
    gap: ".3rem",
    maxHeight: 220,
    overflowY: "auto",
  },
  pkjItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: ".5rem",
    padding: ".55rem .8rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    cursor: "pointer",
    background: "#fff",
    fontFamily: "inherit",
    width: "100%",
    textAlign: "left",
    transition: "all .13s",
  },
  pkjItemActive: {
    borderColor: "#2563eb",
    background: "#eff6ff",
    boxShadow: "0 0 0 2px rgba(37,99,235,.1)",
  },
  comboWrap: { position: "relative" },
  comboInput: {
    display: "flex",
    alignItems: "center",
    gap: ".4rem",
    padding: ".45rem .7rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    background: "#fff",
    cursor: "pointer",
    minHeight: 34,
  },
  comboDropdown: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    background: "#fff",
    border: "1.5px solid #e2e8f0",
    borderRadius: 9,
    boxShadow: "0 8px 24px rgba(0,0,0,.1)",
    zIndex: 200,
    maxHeight: 220,
    overflowY: "auto",
  },
  comboItem: {
    padding: ".45rem .75rem",
    cursor: "pointer",
    fontSize: ".77rem",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    gap: ".4rem",
    border: "none",
    background: "transparent",
    width: "100%",
    textAlign: "left",
    fontFamily: "inherit",
    transition: "background .1s",
  },
  comboTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "#eff6ff",
    color: "#2563eb",
    borderRadius: 5,
    padding: "1px 7px",
    fontSize: ".73rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  detailItem: { display: "flex", flexDirection: "column", gap: 3 },
  detailLbl: {
    fontSize: ".65rem",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: ".04em",
  },
  detailVal: { fontSize: ".8rem", color: "#0f172a" },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem 1.5rem",
    padding: "1rem 1.25rem",
  },
};

// ── Section title with blue styling ──────────────────────────
function SectionTitle({ n, label, active }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: active ? "#2563eb" : "#cbd5e1",
          color: "#fff",
          fontSize: ".6rem",
          fontWeight: 800,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {n}
      </span>
      <span
        style={{
          fontSize: ".68rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: ".06em",
          color: active ? "#1d4ed8" : "#94a3b8",
        }}
      >
        {label}
      </span>
      {active && (
        <span
          style={{ flex: 1, height: 1, background: "#bfdbfe", marginLeft: 4 }}
        />
      )}
    </div>
  );
}

// ── Horizontal field row (label : value) ──────────────────────
function HRow({ label, children, last }) {
  return (
    <div style={{ ...S.hRow, ...(last ? S.hRowLast : {}) }}>
      <span style={S.hLbl}>{label}</span>
      <span style={S.hColon}>:</span>
      <span style={S.hVal}>{children}</span>
    </div>
  );
}

// ── Horizontal form field row (label : input) ─────────────────
function FHRow({ label, required, children, last }) {
  return (
    <div style={{ ...S.fhRow, ...(last ? { borderBottom: "none" } : {}) }}>
      <span style={S.fhLbl}>
        {label}
        {required && <span style={{ color: "#dc2626", marginLeft: 2 }}>*</span>}
      </span>
      <span style={S.fhColon}>:</span>
      <div style={S.fhCtrl}>{children}</div>
    </div>
  );
}

// Searchable Combobox
function SearchCombobox({
  options,
  value,
  onChange,
  placeholder,
  renderLabel,
  renderSub,
  hasError,
  disabled,
  minChars = 0,
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
      style={S.comboWrap}
      ref={ref}
      {...(disabled
        ? { style: { ...S.comboWrap, opacity: 0.55, pointerEvents: "none" } }
        : {})}
    >
      <div
        style={{
          ...S.comboInput,
          ...(hasError ? { borderColor: "#dc2626" } : {}),
          cursor: (disabled || selected) ? "default" : "pointer",
        }}
        onClick={() => !disabled && !selected && setOpen(!open)}
      >
        <span style={{ color: "#94a3b8", display: "flex" }}>
          <Icon.Search />
        </span>
        {selected ? (
          <>
            <span style={S.comboTag}>
              {renderLabel(selected)}
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#2563eb",
                  padding: 0,
                  display: "flex",
                }}
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
                  fontSize: ".68rem",
                  color: "#94a3b8",
                  marginLeft: "auto",
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
            style={{
              border: "none",
              outline: "none",
              fontSize: ".78rem",
              flex: 1,
              background: "#fff",
              color: "#0f172a",
              fontFamily: "inherit",
            }}
          />
        )}
        <span style={{ color: "#94a3b8", display: "flex", flexShrink: 0 }}>
          <Icon.ChevronDown />
        </span>
      </div>
      {open && (
        <div style={S.comboDropdown}>
          {selected && (
            <div
              style={{
                padding: ".4rem .65rem",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
                position: "sticky",
                top: 0,
                background: "#fff",
              }}
            >
              <span style={{ color: "#94a3b8", display: "flex" }}>
                <Icon.Search />
              </span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik untuk mencari..."
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: ".78rem",
                  flex: 1,
                  fontFamily: "inherit",
                }}
              />
            </div>
          )}
          {query.length < minChars ? (
            <div
              style={{
                padding: ".85rem",
                textAlign: "center",
                fontSize: ".77rem",
                color: "#94a3b8",
              }}
            >
              Ketik minimal {minChars} karakter untuk mencari...
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: ".85rem",
                textAlign: "center",
                fontSize: ".77rem",
                color: "#94a3b8",
              }}
            >
              Tidak ada hasil untuk "{query}"
            </div>
          ) : (
            filtered.map((o) => (
              <button
                key={o.value}
                type="button"
                style={{
                  ...S.comboItem,
                  ...(String(o.value) === String(value)
                    ? {
                      background: "#eff6ff",
                      color: "#2563eb",
                      fontWeight: 600,
                    }
                    : {}),
                }}
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
                  <span
                    style={{
                      fontSize: ".68rem",
                      color: "#94a3b8",
                      marginLeft: "auto",
                    }}
                  >
                    {renderSub(o)}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// PekerjaanSelector
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
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: ".6rem",
          padding: ".6rem .85rem",
          border: "1.5px solid #2563eb",
          borderRadius: 9,
          background: "#eff6ff",
        }}
      >
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
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: ".77rem",
              fontWeight: 600,
              color: "#1d4ed8",
              lineHeight: 1.4,
            }}
          >
            {selected.nama}
          </div>
          <div
            style={{
              fontSize: ".68rem",
              color: "#64748b",
              marginTop: 3,
              display: "flex",
              gap: 7,
            }}
          >
            <span style={{ fontWeight: 700, color: "#0891b2" }}>
              {selected.no_anggaran}
            </span>
            <span>·</span>
            <span
              style={{
                background: "#fef3c7",
                color: "#d97706",
                border: "1px solid #fcd34d",
                borderRadius: 4,
                padding: "1px 5px",
                fontSize: ".63rem",
                fontWeight: 700,
              }}
            >
              {selected.jenis}
            </span>
            <span>·</span>
            <span>{getAssetCount(selected.kode)} aset</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange("")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#2563eb",
            fontSize: ".7rem",
            fontWeight: 700,
            padding: "2px 5px",
            borderRadius: 4,
            fontFamily: "inherit",
          }}
        >
          Ganti
        </button>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
      <div style={S.searchWrap}>
        <Icon.Search />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama pekerjaan atau nomor anggaran..."
          style={S.searchInput}
        />
        {search && (
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              padding: 0,
              display: "flex",
            }}
            onClick={() => setSearch("")}
          >
            <Icon.Times />
          </button>
        )}
      </div>
      {error && <span style={S.ferr}>{error}</span>}
      <div style={S.pkjList}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              color: "#94a3b8",
              fontSize: ".77rem",
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
                style={{
                  ...S.pkjItem,
                  ...(value === p.kode ? S.pkjItemActive : {}),
                }}
                onClick={() => onChange(p.kode)}
              >
                <span
                  style={{
                    fontSize: ".65rem",
                    fontWeight: 800,
                    color: "#0891b2",
                    background: "#ecfeff",
                    border: "1px solid #a5f3fc",
                    borderRadius: 4,
                    padding: "1px 6px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {p.no_anggaran}
                </span>
                <span
                  style={{
                    fontSize: ".63rem",
                    fontWeight: 700,
                    background: "#fef3c7",
                    color: "#d97706",
                    border: "1px solid #fcd34d",
                    borderRadius: 4,
                    padding: "1px 5px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {p.jenis}
                </span>
                <span
                  style={{
                    fontSize: ".77rem",
                    fontWeight: 600,
                    color: value === p.kode ? "#1d4ed8" : "#0f172a",
                    lineHeight: 1.4,
                    flex: 1,
                  }}
                >
                  {p.nama}
                </span>
                <span
                  style={{
                    fontSize: ".63rem",
                    fontWeight: 700,
                    background: "#f1f5f9",
                    color: "#64748b",
                    border: "1px solid #e2e8f0",
                    padding: "1px 5px",
                    borderRadius: 99,
                    whiteSpace: "nowrap",
                  }}
                >
                  {cnt}
                </span>
                {value === p.kode && (
                  <span
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                      background: "#2563eb",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
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

// PdfUpload
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
    <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
      <label
        style={{
          fontSize: ".73rem",
          fontWeight: 600,
          color: "#475569",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Icon.Paperclip /> Lampiran BAST (PDF){" "}
        <span style={{ fontSize: ".66rem", color: "#94a3b8", fontWeight: 400 }}>
          — Opsional
        </span>
      </label>
      {value ? (
        <div style={S.filePreview}>
          <span style={{ color: "#2563eb", display: "flex" }}>
            <Icon.FileText />
          </span>
          <span
            style={{
              fontSize: ".77rem",
              fontWeight: 600,
              color: "#2563eb",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value.name}
          </span>
          {value.size && (
            <span style={{ fontSize: ".68rem", color: "#64748b" }}>
              {fmtSize(value.size)}
            </span>
          )}
          <button
            type="button"
            onClick={() => onChange(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              padding: 0,
              display: "flex",
            }}
          >
            <Icon.Times />
          </button>
        </div>
      ) : (
        <div
          style={{
            ...S.fileZone,
            ...(drag ? { borderColor: "#2563eb", background: "#eff6ff" } : {}),
          }}
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
          <span style={{ color: "#2563eb" }}>
            <Icon.Upload />
          </span>
          <span
            style={{ fontSize: ".76rem", fontWeight: 600, color: "#2563eb" }}
          >
            Klik atau drag & drop PDF
          </span>
          <span style={{ fontSize: ".68rem", color: "#94a3b8" }}>
            Maks. 10 MB
          </span>
        </div>
      )}
    </div>
  );
}

// ─── PAGE: BORROW DETAIL ──────────────────────────────────────
function BorrowDetailPage({
  item,
  borrows,
  returns,
  onBack,
  onEdit,
  onReturn,
  onViewHistory,
}) {
  if (!item) return null;
  const giver = getUser(item.giver_id);
  const receiver = getUser(item.receiver_id);
  const performer = getUser(item.performed_by_id);
  const cond = conditionConfig[item.condition];
  const over = isOverdue(item.due_date);
  const cat = assetCategories[getCategory(item.code)];
  const pekerjaan = getPekerjaan(item.pekerjaan_kode);
  const histCount = [
    ...borrows.filter((b) => b.code === item.code),
    ...returns.filter((r) => r.code === item.code),
  ].length;
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button style={S.backBtn} onClick={onBack}>
          <Icon.ArrowLeft /> Kembali
        </button>
        <span style={{ fontSize: ".75rem", color: "#94a3b8" }}>
          / Detail Serah Terima
        </span>
      </div>
      <div style={S.page}>
        <div style={{ ...S.pageHeader, borderTop: "3px solid #2563eb" }}>
          <div style={S.pageTitle}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#eff6ff",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon.Exchange />
            </span>
            Detail Serah Terima
            {over && <span style={S.overduePill}>⚠ Terlambat</span>}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              style={{
                ...S.btnGhost,
                color: "#7c3aed",
                borderColor: "#c4b5fd",
              }}
              onClick={() => onViewHistory(item)}
            >
              <Icon.History /> Riwayat ({histCount})
            </button>
            <button
              style={{
                ...S.btnGhost,
                color: "#7c3aed",
                borderColor: "#c4b5fd",
              }}
              onClick={() => generateBAST(item, "borrow")}
            >
              <Icon.Printer /> BAST
            </button>
            <button style={S.btnGhost} onClick={() => onEdit(item)}>
              <Icon.Edit /> Edit
            </button>
            <button style={S.btnGreen} onClick={() => onReturn(item)}>
              <Icon.Undo /> Catat Kembali
            </button>
          </div>
        </div>
        {pekerjaan && (
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div style={S.sectionLabel}>Pekerjaan / Anggaran</div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: ".5rem",
                padding: ".6rem .9rem",
                background: "#ecfeff",
                border: "1px solid #a5f3fc",
                borderRadius: 9,
              }}
            >
              <span style={{ color: "#0891b2", display: "flex", marginTop: 2 }}>
                <Icon.Briefcase />
              </span>
              <div>
                <div style={S.pkjInfoName}>{pekerjaan.nama}</div>
                <div style={S.pkjInfoMeta}>
                  {pekerjaan.no_anggaran} · {pekerjaan.jenis}
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f1f5f9" }}
        >
          <div style={S.sectionLabel}>Informasi Aset</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".75rem",
              padding: ".75rem .9rem",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 9,
            }}
          >
            <div
              style={{
                ...S.catIco,
                background: cat.bg,
                color: cat.color,
                width: 34,
                height: 34,
                borderRadius: 9,
              }}
            >
              {cat.icon}
            </div>
            <div>
              <code style={S.code}>{item.code}</code>
              <div style={{ ...S.assetName, fontSize: ".85rem", marginTop: 3 }}>
                {item.name}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f1f5f9" }}
        >
          <div style={S.sectionLabel}>Detail Transaksi</div>
          <HRow label="Tanggal Serah Terima">{fmtDT(item.borrow_date)}</HRow>
          <HRow label="Jatuh Tempo">
            <span
              style={{ fontWeight: 700, color: over ? "#dc2626" : "#0f172a" }}
            >
              {fmtDate(item.due_date)}
            </span>
          </HRow>
          <HRow label="Dari Lokasi">{item.from_zone}</HRow>
          <HRow label="Ke Lokasi">
            <span style={{ color: "#2563eb", fontWeight: 600 }}>
              {item.to_zone}
            </span>
          </HRow>
          <HRow label="Kondisi Aset">
            {cond && (
              <span
                style={{ ...S.pill, background: cond.bg, color: cond.color }}
              >
                {cond.label}
              </span>
            )}
          </HRow>
          <HRow label="Nomor BAST">
            <span
              style={{
                fontFamily: "monospace",
                fontSize: ".75rem",
                color: "#7c3aed",
              }}
            >
              {genNomorBAST(item.id, item.borrow_date)}
            </span>
          </HRow>
          {item.reason && <HRow label="Alasan / Keperluan">{item.reason}</HRow>}
          {item.notes && <HRow label="Catatan">{item.notes}</HRow>}
          {item.attachment && (
            <HRow label="Lampiran" last>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#2563eb",
                }}
              >
                <Icon.Paperclip />
                {item.attachment}
              </span>
            </HRow>
          )}
        </div>
        <div style={{ padding: "1rem 1.25rem" }}>
          <div style={S.sectionLabel}>Pihak yang Terlibat</div>
          <table style={{ ...S.table, marginTop: 8 }}>
            <thead style={S.thead}>
              <tr>
                <th style={S.th}>Peran</th>
                <th style={S.th}>Nama</th>
                <th style={S.th}>Jabatan</th>
                <th style={S.th}>Cabang</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  peran: "Pemberi / Penyerah",
                  user: giver,
                  bg: "#fef3c7",
                  color: "#d97706",
                },
                {
                  peran: "Penerima",
                  user: receiver,
                  bg: "#dbeafe",
                  color: "#2563eb",
                },
                {
                  peran: "Dicatat oleh (Admin IT)",
                  user: performer,
                  bg: "#ede9fe",
                  color: "#7c3aed",
                },
              ].map((p) => (
                <tr key={p.peran} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ ...S.td, fontSize: ".74rem", color: "#64748b" }}>
                    {p.peran}
                  </td>
                  <td style={S.td}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <div
                        style={{
                          ...S.avatar,
                          background: p.bg,
                          color: p.color,
                        }}
                      >
                        {p.user.name.charAt(0)}
                      </div>
                      <span
                        style={{
                          fontSize: ".78rem",
                          fontWeight: 600,
                          color: "#0f172a",
                        }}
                      >
                        {p.user.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ ...S.td, fontSize: ".74rem", color: "#64748b" }}>
                    {p.user.jabatan}
                  </td>
                  <td style={{ ...S.td, fontSize: ".74rem", color: "#64748b" }}>
                    {p.user.branch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: RETURN DETAIL ──────────────────────────────────────
function ReturnDetailPage({ item, borrows, returns, onBack, onViewHistory }) {
  if (!item) return null;
  const giver = getUser(item.giver_id);
  const receiver = getUser(item.receiver_id);
  const performer = getUser(item.performed_by_id);
  const cond = conditionConfig[item.return_condition];
  const pekerjaan = getPekerjaan(item.pekerjaan_kode);
  const histCount = [
    ...borrows.filter((b) => b.code === item.code),
    ...returns.filter((r) => r.code === item.code),
  ].length;
  const cat = assetCategories[getCategory(item.code)];
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button style={S.backBtn} onClick={onBack}>
          <Icon.ArrowLeft /> Kembali
        </button>
        <span style={{ fontSize: ".75rem", color: "#94a3b8" }}>
          / Detail Pengembalian
        </span>
      </div>
      <div style={S.page}>
        <div style={{ ...S.pageHeader, borderTop: "3px solid #16a34a" }}>
          <div style={S.pageTitle}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#dcfce7",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon.CheckCircle />
            </span>
            Detail Pengembalian
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              style={{
                ...S.btnGhost,
                color: "#7c3aed",
                borderColor: "#c4b5fd",
              }}
              onClick={() => onViewHistory(item)}
            >
              <Icon.History /> Riwayat ({histCount})
            </button>
            <button
              style={{
                ...S.btnGhost,
                color: "#7c3aed",
                borderColor: "#c4b5fd",
              }}
              onClick={() => generateBAST(item, "return")}
            >
              <Icon.Printer /> BAST
            </button>
          </div>
        </div>
        {pekerjaan && (
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div style={S.sectionLabel}>Pekerjaan / Anggaran</div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: ".5rem",
                padding: ".6rem .9rem",
                background: "#ecfeff",
                border: "1px solid #a5f3fc",
                borderRadius: 9,
              }}
            >
              <span style={{ color: "#0891b2", display: "flex", marginTop: 2 }}>
                <Icon.Briefcase />
              </span>
              <div>
                <div style={S.pkjInfoName}>{pekerjaan.nama}</div>
                <div style={S.pkjInfoMeta}>
                  {pekerjaan.no_anggaran} · {pekerjaan.jenis}
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f1f5f9" }}
        >
          <div style={S.sectionLabel}>Informasi Aset</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".75rem",
              padding: ".75rem .9rem",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 9,
            }}
          >
            <div
              style={{
                ...S.catIco,
                background: cat.bg,
                color: cat.color,
                width: 34,
                height: 34,
                borderRadius: 9,
              }}
            >
              {cat.icon}
            </div>
            <div>
              <code style={S.code}>{item.code}</code>
              <div style={{ ...S.assetName, fontSize: ".85rem", marginTop: 3 }}>
                {item.name}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f1f5f9" }}
        >
          <div style={S.sectionLabel}>Detail Transaksi</div>
          <HRow label="Tanggal Dipinjam">{fmtDT(item.borrow_date)}</HRow>
          <HRow label="Tanggal Dikembalikan">
            <span style={{ color: "#16a34a", fontWeight: 600 }}>
              {fmtDT(item.return_date)}
            </span>
          </HRow>
          <HRow label="Dari Lokasi">{item.from_zone}</HRow>
          <HRow label="Ke Lokasi">
            <span style={{ color: "#2563eb", fontWeight: 600 }}>
              {item.to_zone}
            </span>
          </HRow>
          <HRow label="Kondisi Dikembalikan">
            {cond && (
              <span
                style={{ ...S.pill, background: cond.bg, color: cond.color }}
              >
                {cond.label}
              </span>
            )}
          </HRow>
          <HRow label="Nomor BAST">
            <span
              style={{
                fontFamily: "monospace",
                fontSize: ".75rem",
                color: "#7c3aed",
              }}
            >
              {genNomorBAST(item.id, item.borrow_date)}
            </span>
          </HRow>
          {item.reason && (
            <HRow label="Alasan / Keperluan Awal">{item.reason}</HRow>
          )}
          {item.return_notes && (
            <HRow label="Catatan Pengembalian">{item.return_notes}</HRow>
          )}
          {item.attachment && (
            <HRow label="Lampiran" last>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#2563eb",
                }}
              >
                <Icon.Paperclip />
                {item.attachment}
              </span>
            </HRow>
          )}
        </div>
        <div style={{ padding: "1rem 1.25rem" }}>
          <div style={S.sectionLabel}>Pihak yang Terlibat</div>
          <table style={{ ...S.table, marginTop: 8 }}>
            <thead style={S.thead}>
              <tr>
                <th style={S.th}>Peran</th>
                <th style={S.th}>Nama</th>
                <th style={S.th}>Jabatan</th>
                <th style={S.th}>Cabang</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  peran: "Pemberi / Penyerah",
                  user: giver,
                  bg: "#fef3c7",
                  color: "#d97706",
                },
                {
                  peran: "Penerima",
                  user: receiver,
                  bg: "#dbeafe",
                  color: "#2563eb",
                },
                {
                  peran: "Dicatat oleh (Admin IT)",
                  user: performer,
                  bg: "#ede9fe",
                  color: "#7c3aed",
                },
              ].map((p) => (
                <tr key={p.peran} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ ...S.td, fontSize: ".74rem", color: "#64748b" }}>
                    {p.peran}
                  </td>
                  <td style={S.td}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <div
                        style={{
                          ...S.avatar,
                          background: p.bg,
                          color: p.color,
                        }}
                      >
                        {p.user.name.charAt(0)}
                      </div>
                      <span
                        style={{
                          fontSize: ".78rem",
                          fontWeight: 600,
                          color: "#0f172a",
                        }}
                      >
                        {p.user.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ ...S.td, fontSize: ".74rem", color: "#64748b" }}>
                    {p.user.jabatan}
                  </td>
                  <td style={{ ...S.td, fontSize: ".74rem", color: "#64748b" }}>
                    {p.user.branch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: HISTORY ────────────────────────────────────────────
function HistoryPage({ assetCode, assetName, borrows, returns, onBack }) {
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
  const cat = assetCategories[getCategory(assetCode)];
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "1rem",
        }}
      >
        <button style={S.backBtn} onClick={onBack}>
          <Icon.ArrowLeft /> Kembali
        </button>
        <span style={{ fontSize: ".75rem", color: "#94a3b8" }}>
          / Riwayat Aset
        </span>
      </div>
      <div style={S.page}>
        <div style={{ ...S.pageHeader, borderTop: "3px solid #7c3aed" }}>
          <div style={S.pageTitle}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#f3e8ff",
                color: "#7c3aed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon.History />
            </span>
            Riwayat Serah Terima
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <span
              style={{
                ...S.histPill,
                background: "#eff6ff",
                color: "#1d4ed8",
                border: "1px solid #bfdbfe",
              }}
            >
              {allHistory.length}x Total
            </span>
            <span
              style={{
                ...S.histPill,
                background: "#dcfce7",
                color: "#15803d",
                border: "1px solid #bbf7d0",
              }}
            >
              {doneCount}x Selesai
            </span>
            {activeCount > 0 && (
              <span
                style={{
                  ...S.histPill,
                  background: "#fef9c3",
                  color: "#92400e",
                  border: "1px solid #fde68a",
                }}
              >
                {activeCount}x Aktif
              </span>
            )}
          </div>
        </div>
        <div
          style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f1f5f9" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".75rem",
              padding: ".75rem .9rem",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 9,
            }}
          >
            <div
              style={{
                ...S.catIco,
                background: cat.bg,
                color: cat.color,
                width: 32,
                height: 32,
                borderRadius: 8,
              }}
            >
              {cat.icon}
            </div>
            <div>
              <code style={S.code}>{assetCode}</code>
              <div style={{ ...S.assetName, marginTop: 3 }}>{assetName}</div>
            </div>
          </div>
        </div>
        {allHistory.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "3rem 1rem",
              color: "#94a3b8",
              gap: ".5rem",
            }}
          >
            <Icon.ClipboardEmpty />
            <span style={{ fontWeight: 700, color: "#475569" }}>
              Belum Ada Riwayat
            </span>
            <span style={{ fontSize: ".78rem" }}>
              Aset ini belum pernah diserahterimakan.
            </span>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={S.table}>
              <thead>
                <tr
                  style={{
                    background: "linear-gradient(135deg,#4c1d95,#7c3aed)",
                  }}
                >
                  {[
                    "#",
                    "Pemberi → Penerima",
                    "Dari → Ke",
                    "Tgl Pinjam",
                    "Tgl Kembali",
                    "Kondisi",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        ...S.th,
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: ".7rem",
                      }}
                    >
                      {h}
                    </th>
                  ))}
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
                      style={{
                        ...S.tr,
                        ...(!h.is_returned ? { background: "#fffbeb" } : {}),
                      }}
                    >
                      <td
                        style={{
                          ...S.td,
                          fontFamily: "monospace",
                          fontSize: ".68rem",
                          color: "#94a3b8",
                          textAlign: "center",
                        }}
                      >
                        {allHistory.length - idx}
                      </td>
                      <td style={S.td}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <div
                              style={{
                                ...S.avatar,
                                background: "#fef3c7",
                                color: "#d97706",
                              }}
                            >
                              {giver.name.charAt(0)}
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: ".73rem",
                                  fontWeight: 600,
                                  color: "#1e293b",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {giver.name}
                              </div>
                              <div
                                style={{ fontSize: ".63rem", color: "#94a3b8" }}
                              >
                                Pemberi
                              </div>
                            </div>
                          </div>
                          <span style={{ color: "#94a3b8", display: "flex" }}>
                            <Icon.ArrowRight />
                          </span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <div
                              style={{
                                ...S.avatar,
                                background: "#dbeafe",
                                color: "#2563eb",
                              }}
                            >
                              {receiver.name.charAt(0)}
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: ".73rem",
                                  fontWeight: 600,
                                  color: "#1e293b",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {receiver.name}
                              </div>
                              <div
                                style={{ fontSize: ".63rem", color: "#94a3b8" }}
                              >
                                Penerima
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={S.td}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: ".73rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span style={{ color: "#64748b" }}>
                            {h.from_zone}
                          </span>
                          <span style={{ color: "#94a3b8", display: "flex" }}>
                            <Icon.ArrowRight />
                          </span>
                          <span style={{ color: "#2563eb", fontWeight: 600 }}>
                            {h.to_zone}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          ...S.td,
                          fontSize: ".73rem",
                          color: "#64748b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fmtDateShort(h.borrow_date)}
                      </td>
                      <td style={{ ...S.td, whiteSpace: "nowrap" }}>
                        {h.is_returned ? (
                          <span
                            style={{
                              fontSize: ".73rem",
                              color: "#16a34a",
                              fontWeight: 600,
                            }}
                          >
                            {fmtDateShort(h.return_date)}
                          </span>
                        ) : (
                          <span
                            style={{
                              fontSize: ".71rem",
                              color: "#d97706",
                              fontWeight: 600,
                            }}
                          >
                            Belum kembali
                          </span>
                        )}
                      </td>
                      <td style={S.td}>
                        {cond && (
                          <span
                            style={{
                              ...S.pill,
                              background: cond.bg,
                              color: cond.color,
                            }}
                          >
                            {cond.label}
                          </span>
                        )}
                      </td>
                      <td style={S.td}>
                        {h.is_returned ? (
                          <span
                            style={{
                              ...S.pill,
                              background: "#dcfce7",
                              color: "#15803d",
                              border: "1px solid #bbf7d0",
                            }}
                          >
                            Selesai
                          </span>
                        ) : (
                          <span
                            style={{
                              ...S.pill,
                              background: "#fef9c3",
                              color: "#92400e",
                              border: "1px solid #fde68a",
                            }}
                          >
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
    </div>
  );
}

// ─── PAGE: CATAT SERAH TERIMA (REVISED) ──────────────────────
function BorrowFormPage({ borrow, borrows, onBack, onSave }) {
  const [pihak1, setPihak1] = useState({ id: "", locked: false }); // Pemberi
  const [pihak2, setPihak2] = useState({ id: "", locked: false }); // Penerima
  
  // Backdate: "now" atau tanggal tertentu
  const nowISO = () => new Date().toISOString().slice(0, 16);
  const [backdateMode, setBackdateMode] = useState("now"); // "now" | "custom"
  const [backdateValue, setBackdateValue] = useState(nowISO());

  const [assetSearchQuery, setAssetSearchQuery] = useState("");
  const [baDraft, setBaDraft] = useState([]);

  const userOptions1 = mockUsers
    .filter(u => String(u.id) !== String(pihak2.id))
    .map((u) => ({ value: u.id, label: u.name, sub: u.branch }));

  const userOptions2 = mockUsers
    .filter(u => String(u.id) !== String(pihak1.id))
    .map((u) => ({ value: u.id, label: u.name, sub: u.branch }));

  const assetResults = useMemo(() => {
    if (!pihak1.id) return [];
    // Tampilkan aset milik Pemberi (pihak1)
    let assets = mockAssets.filter(a => a.owner_id === Number(pihak1.id));
    
    if (assetSearchQuery) {
      assets = assets.filter(a => 
        a.name.toLowerCase().includes(assetSearchQuery.toLowerCase()) ||
        a.code.toLowerCase().includes(assetSearchQuery.toLowerCase())
      );
    }
    return assets;
  }, [pihak1.id, assetSearchQuery]);

  const addToDraft = (item) => {
    if (!pihak1.id || !pihak2.id) {
      alert("Pilih Pemberi dan Penerima terlebih dahulu.");
      return;
    }
    if (baDraft.find(d => d.item.code === item.code)) {
      alert("Barang ini sudah ada di daftar Berita Acara.");
      return;
    }
    setBaDraft([...baDraft, { item, actionStatus: "Diserahkan" }]);
  };

  const removeFromDraft = (code) => {
    setBaDraft(baDraft.filter(d => d.item.code !== code));
  };

  // Expand draft into 2 rows per item for the BA Table
  const getBATableRows = () => {
    const rows = [];
    baDraft.forEach((d) => {
      const p1 = getUser(Number(pihak1.id)); // Pemberi
      const p2 = getUser(Number(pihak2.id)); // Penerima
      
      // Baris untuk Pemberi
      rows.push({
        key: d.item.code + "-giver",
        name: d.item.name,
        sn: d.item.code,
        status: "kembalikan",
        user: p1.name
      });
      // Baris untuk Penerima
      rows.push({
        key: d.item.code + "-receiver",
        name: d.item.name,
        sn: d.item.code,
        status: "diterima",
        user: p2.name
      });
    });
    return rows;
  };

  const handleSave = () => {
    if (baDraft.length === 0) {
      alert("Tambahkan minimal satu barang ke daftar Berita Acara.");
      return;
    }
    const finalDate = backdateMode === "now" ? new Date().toISOString() : new Date(backdateValue).toISOString();
    alert(`Berhasil menyimpan Berita Acara (${new Date(finalDate).toLocaleString()}) untuk ${baDraft.length} barang.`);
    onBack();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button style={S.backBtn} onClick={onBack}>
          <Icon.ArrowLeft /> Kembali
        </button>
        <span style={{ fontSize: ".75rem", color: "#94a3b8" }}>
          / Catat Serah Terima
        </span>
      </div>

      <div style={S.page}>
        <div style={{ ...S.pageHeader, borderTop: "3px solid #2563eb" }}>
          <div style={S.pageTitle}>
            <Icon.Exchange /> Catat Serah Terima Baru
          </div>
        </div>

        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* ── SECTION 1: USER SELECTION ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", background: "#f8fafc", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            
            {/* Pemberi (Pihak 1) */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <label style={{ ...S.flabel, marginBottom: 0, minWidth: "180px", fontSize: ".75rem" }}>User Pemberi [Pihak 1]</label>
              <div style={{ flex: 1, display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <SearchCombobox
                    options={userOptions1}
                    value={pihak1.id}
                    onChange={(id) => {
                      setPihak1({ ...pihak1, id });
                      setBaDraft([]);
                    }}
                    disabled={pihak1.locked}
                    placeholder="Pilih pemberi aset..."
                    renderLabel={(o) => o.label}
                  />
                </div>
                <button
                  onClick={() => setPihak1({ ...pihak1, locked: !pihak1.locked })}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1.5px solid #e2e8f0",
                    background: pihak1.locked ? "#fef3c7" : "#fff",
                    color: pihak1.locked ? "#d97706" : "#64748b",
                    cursor: "pointer",
                    display: "flex"
                  }}
                >
                  {pihak1.locked ? <Icon.Lock /> : <Icon.Unlock />}
                </button>
              </div>
            </div>

            {/* Penerima (Pihak 2) */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <label style={{ ...S.flabel, marginBottom: 0, minWidth: "180px", fontSize: ".75rem" }}>User Penerima [Pihak 2]</label>
              <div style={{ flex: 1, display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <SearchCombobox
                    options={userOptions2}
                    value={pihak2.id}
                    onChange={(id) => {
                      setPihak2({ ...pihak2, id });
                      setBaDraft([]);
                    }}
                    disabled={pihak2.locked}
                    placeholder="Pilih penerima aset..."
                    renderLabel={(o) => o.label}
                  />
                </div>
                <button
                  onClick={() => setPihak2({ ...pihak2, locked: !pihak2.locked })}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1.5px solid #e2e8f0",
                    background: pihak2.locked ? "#fef3c7" : "#fff",
                    color: pihak2.locked ? "#d97706" : "#64748b",
                    cursor: "pointer",
                    display: "flex"
                  }}
                >
                  {pihak2.locked ? <Icon.Lock /> : <Icon.Unlock />}
                </button>
              </div>
            </div>

            {/* --- Tanggal Serah Terima (Backdate) --- */}
            {pihak1.id && (
              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1.1rem", display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                <label style={{ fontSize: ".72rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".04em", margin: 0, whiteSpace: "nowrap" }}>
                  Tanggal Serah Terima
                </label>

                {/* Tombol ikon Kalender */}
                <div style={{ position: "relative", display: "inline-flex" }}>
                  <button
                    type="button"
                    title="Pilih tanggal"
                    onClick={() => {
                      setBackdateMode("custom");
                      const el = document.getElementById("bast-backdate-input");
                      if (el) { try { el.showPicker(); } catch { el.click(); } }
                    }}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "7px",
                      border: "1.5px solid",
                      borderColor: backdateMode === "custom" ? "#7c3aed" : "#cbd5e1",
                      background: backdateMode === "custom" ? "#f3e8ff" : "#fff",
                      color: backdateMode === "custom" ? "#7c3aed" : "#94a3b8",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all .15s",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </button>
                  <input
                    id="bast-backdate-input"
                    type="datetime-local"
                    value={backdateValue}
                    max={nowISO()}
                    onChange={(e) => { setBackdateValue(e.target.value); setBackdateMode("custom"); }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      pointerEvents: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>

                {/* Preview tanggal */}
                <span style={{
                  fontSize: ".73rem",
                  color: backdateMode === "custom" ? "#7c3aed" : "#16a34a",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {backdateMode === "now"
                    ? "Sekarang (" + new Date().toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) + ")"
                    : new Date(backdateValue).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
                
                {backdateMode === "custom" && (
                  <button 
                    onClick={() => { setBackdateMode("now"); setBackdateValue(nowISO()); }}
                    style={{ fontSize: ".65rem", color: "#2563eb", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                  >
                    Reset ke Sekarang
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── SECTION 2: DAFTAR BARANG MILIK PEMBERI ── */}
          {pihak1.id && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ ...S.fg, background: "#eff6ff", padding: "10px", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <label style={{ ...S.flabel, marginBottom: 0, color: "#1e40af" }}>
                    Daftar Barang Milik: <strong>{getUser(Number(pihak1.id)).name}</strong>
                  </label>
                  <div style={{ fontSize: ".65rem", color: "#60a5fa", fontWeight: 600 }}>
                    {assetResults.length} barang ditemukan
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                    <Icon.Search />
                  </div>
                  <input 
                    type="text"
                    value={assetSearchQuery}
                    onChange={(e) => setAssetSearchQuery(e.target.value)}
                    placeholder="Cari nama atau kode barang di list ini..."
                    style={{ ...S.finput, paddingLeft: "35px", fontSize: ".75rem" }}
                  />
                </div>
              </div>

            <div style={{ ...S.tableCard }}>
              <div style={{ padding: "10px 15px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: ".7rem" }}>
                HASIL PENCARIAN BARANG
              </div>
              <table style={S.table}>
                <thead style={S.thead}>
                  <tr>
                    <th style={{ ...S.th, width: 40 }}>No</th>
                    <th style={S.th}>SN</th>
                    <th style={{ ...S.th, width: 60 }}>CP/OP</th>
                    <th style={S.th}>Nama Pekerjaan</th>
                    <th style={{ ...S.th, width: 100 }}>Thn Pengadaan</th>
                    <th style={{ ...S.th, width: 80 }}>Kondisi</th>
                    <th style={{ ...S.th, width: 80 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {assetResults.length === 0 ? (
                    <tr><td colSpan="6" style={{ ...S.td, textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                      {assetSearchQuery ? "Tidak ada barang yang cocok dengan pencarian." : "User ini tidak memiliki barang untuk diserahterimakan."}
                    </td></tr>
                  ) : (
                    assetResults.map((item, idx) => {
                      const pkj = mockPekerjaan.find(p => p.kode === item.pekerjaan_kode);
                      const isInDraft = baDraft.some(d => d.item.code === item.code);
                      
                      // Dummy data if not present in mockAssets
                      const thnPengadaan = item.tahun_pengadaan || "2023";
                      const kondisi = item.kondisi || "BAIK";

                      return (
                        <tr key={item.code} style={{
                          ...S.tr,
                          background: isInDraft ? "#f0fdf4" : undefined,
                          opacity: isInDraft ? 0.6 : 1,
                          cursor: "default", // Non-clickable row
                        }}>
                          <td style={{ ...S.td, textAlign: "center" }}>{idx + 1}</td>
                          <td style={S.td}><code style={S.code}>{item.code}</code></td>
                          <td style={{ ...S.td, textAlign: "center" }}>
                            <span style={{ 
                              ...S.pill, 
                              background: pkj?.jenis === "Capex" ? "#eff6ff" : "#f0fdf4", 
                              color: pkj?.jenis === "Capex" ? "#2563eb" : "#16a34a" 
                            }}>
                              {pkj?.jenis === "Capex" ? "CP" : "OP"}
                            </span>
                          </td>
                          <td style={{ ...S.td, maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={pkj?.nama}>
                            {pkj?.nama || "—"}
                          </td>
                          <td style={{ ...S.td, textAlign: "center" }}>{thnPengadaan}</td>
                          <td style={{ ...S.td, textAlign: "center" }}>
                            <span style={{ 
                              fontSize: ".65rem", 
                              fontWeight: 700, 
                              color: kondisi === "BAIK" ? "#16a34a" : "#e11d48",
                              background: kondisi === "BAIK" ? "#f0fdf4" : "#fff1f2",
                              padding: "2px 6px",
                              borderRadius: "4px"
                            }}>
                              {kondisi}
                            </span>
                          </td>
                          <td style={S.td}>
                            {isInDraft ? (
                              <span style={{ fontSize: ".65rem", color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                                <Icon.Check /> Dipilih
                              </span>
                            ) : (
                              <button
                                onClick={() => addToDraft(item)}
                                disabled={!pihak2.id}
                                title={!pihak2.id ? "Pilih Penerima dulu" : "Pilih Barang"}
                                style={{ 
                                  padding: "5px 12px", 
                                  borderRadius: "6px", 
                                  background: pihak2.id ? "#eff6ff" : "#f8fafc", 
                                  border: "1.5px solid",
                                  borderColor: pihak2.id ? "#2563eb" : "#e2e8f0",
                                  color: pihak2.id ? "#2563eb" : "#cbd5e1", 
                                  cursor: pihak2.id ? "pointer" : "not-allowed",
                                  fontSize: ".7rem",
                                  fontWeight: 700,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  transition: "all .15s"
                                }}
                              >
                                <Icon.Plus /> Pilih
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          )}

          {/* ── SECTION 3: TABEL BERITA ACARA (DRAFT) ── */}
          {baDraft.length > 0 && (
            <div style={{ ...S.tableCard, animation: "fadeIn 0.2s ease-in", border: "2px solid #2563eb" }}>
              <div style={{
                padding: "10px 15px",
                background: "#eff6ff",
                borderBottom: "2px solid #2563eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ fontSize: ".75rem", fontWeight: 800, color: "#1e293b" }}>
                  TABEL BERITA ACARA (PREVIEW)
                </div>
                <button onClick={() => setBaDraft([])} style={{ fontSize: ".65rem", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Reset Semua</button>
              </div>
              <table style={S.table}>
                <thead style={{ ...S.thead, background: "#f8fafc" }}>
                  <tr>
                    <th style={{ ...S.th, width: 40 }}>No</th>
                    <th style={S.th}>No.BAST</th>
                    <th style={S.th}>Tgl BAST</th>
                    <th style={S.th}>Pemberi</th>
                    <th style={S.th}>Penerima</th>
                    <th style={{ ...S.th, width: 100 }}>Jumlah Item</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={S.tr}>
                    <td style={{ ...S.td, textAlign: "center" }}>1</td>
                    <td style={S.td}>
                      <code style={{ ...S.code, color: "#1e293b", background: "#f1f5f9" }}>
                        BAST/{new Date().getFullYear()}/{((borrows?.length || 0) + 1).toString().padStart(3, '0')}
                      </code>
                    </td>
                    <td style={S.td}>
                      {backdateMode === "now" 
                        ? fmtDateShort(new Date().toISOString()) 
                        : fmtDateShort(backdateValue)}
                    </td>
                    <td style={{ ...S.td, fontWeight: 700 }}>{getUser(Number(pihak1.id)).name}</td>
                    <td style={{ ...S.td, fontWeight: 700 }}>{getUser(Number(pihak2.id)).name}</td>
                    <td style={{ ...S.td, textAlign: "center" }}>
                      <span style={{ 
                        background: "#eff6ff", 
                        color: "#2563eb", 
                        padding: "2px 10px", 
                        borderRadius: "12px", 
                        fontWeight: 800,
                        fontSize: ".75rem",
                        border: "1px solid #bfdbfe"
                      }}>
                        {baDraft.length} Item
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Official Narrative Summary */}
              <div style={{ padding: "1rem", background: "#f8fafc", borderTop: "2px solid #2563eb" }}>
                <div style={{ fontSize: ".7rem", fontWeight: 800, color: "#64748b", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Narasi Berita Acara:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {baDraft.map((d, i) => {
                    const p1Name = getUser(Number(pihak1.id)).name; // Pemberi
                    const p2Name = getUser(Number(pihak2.id)).name; // Penerima
                    
                    return (
                      <div key={i} style={{ fontSize: ".75rem", color: "#1e293b", lineHeight: 1.5, display: "flex", gap: "8px" }}>
                        <span style={{ color: "#2563eb", fontWeight: 700 }}>•</span>
                        <span>
                          Barang <strong>{d.item.name}</strong> ({d.item.code}) diserahkan dari <strong>{p1Name}</strong> (Pemberi) kepada <strong>{p2Name}</strong> (Penerima).
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        <div style={S.btnRow}>
          <button style={S.btnGhost} onClick={onBack}>Batal</button>
          <button style={S.btnBlue} onClick={handleSave}>
            <Icon.Check /> Simpan Berita Acara
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: USER RECEIVER LIST ──────────────────────────────
function UserReceiverListPage({ borrows, onBack, onDetail }) {
  const activeReceivers = useMemo(() => {
    const userMap = {};
    borrows.filter(b => !b.is_returned).forEach(b => {
      if (!userMap[b.receiver_id]) {
        userMap[b.receiver_id] = {
          user: getUser(b.receiver_id),
          count: 0
        };
      }
      userMap[b.receiver_id].count++;
    });
    return Object.values(userMap).sort((a, b) => b.count - a.count);
  }, [borrows]);

  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      <div style={{ ...S.pageHeader, background: "transparent", padding: "0 0 1.5rem 0" }}>
        <button style={S.backBtn} onClick={onBack}><Icon.ArrowLeft /> Kembali</button>
        <h2 style={S.pageTitle}>
          <Icon.User /> Daftar User Penerima Aset
        </h2>
      </div>

      <div style={S.page}>
        <table style={S.table}>
          <thead style={S.thead}>
            <tr>
              <th style={{ ...S.th, width: 40, textAlign: "center" }}>No</th>
              <th style={S.th}>Nama Personel</th>
              <th style={S.th}>NIP / ID</th>
              <th style={S.th}>Lokasi Kerja (Homebase)</th>
              <th style={{ ...S.th, width: 140, textAlign: "center" }}>Jumlah Aset</th>
              <th style={{ ...S.th, textAlign: "center", width: 100 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activeReceivers.length === 0 ? (
              <tr><td colSpan="6" style={{ ...S.td, textAlign: "center", padding: "3rem", color: "#94a3b8" }}>Tidak ada data user penerima aktif.</td></tr>
            ) : (
              activeReceivers.map((item, idx) => (
                <tr key={item.user.id} style={S.tr} onMouseOver={(e) => e.currentTarget.style.background = "#f8fafc"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ ...S.td, textAlign: "center", color: "#94a3b8", fontWeight: 700 }}>{idx + 1}</td>
                  <td style={S.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ ...S.avatar, background: "#f1f5f9", color: "#64748b" }}>{item.user.name.charAt(0)}</div>
                      <div style={S.assetName}>{item.user.name}</div>
                    </div>
                  </td>
                  <td style={S.td}><code style={S.code}>{item.user.nip || "—"}</code></td>
                  <td style={S.td}>{item.user.branch}</td>
                  <td style={{ ...S.td, textAlign: "center" }}>
                    <span style={{ ...S.pill, background: "#eff6ff", color: "#2563eb" }}>
                      {item.count} Perangkat
                    </span>
                  </td>
                  <td style={{ ...S.td, textAlign: "center" }}>
                    <button 
                      onClick={() => onDetail(item.user)}
                      style={{ ...S.iconBtn, color: "#2563eb", margin: "0 auto" }}
                    >
                      <Icon.Eye /> Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PAGE: USER ASSET DETAIL ──────────────────────────────
function UserAssetDetailPage({ user, borrows, onBack }) {
  const userAssets = useMemo(() => {
    const activeBorrows = borrows.filter(b => !b.is_returned && b.receiver_id === user.id);
    return activeBorrows.map(b => ({
      ...b,
      pkj: getPekerjaan(b.pekerjaan_kode),
      asset: getAsset(b.code)
    }));
  }, [user, borrows]);

  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      <div style={{ ...S.pageHeader, background: "transparent", padding: "0 0 1.5rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button style={S.backBtn} onClick={onBack}><Icon.ArrowLeft /> Kembali</button>
          <div>
            <h2 style={S.pageTitle}>{user.name}</h2>
            <p style={S.muted}>{user.nip} • {user.branch}</p>
          </div>
        </div>
        <div style={S.countBadge}>
          Total Aset IT: <strong>{userAssets.length} Item</strong>
        </div>
      </div>

      <div style={S.page}>
        <table style={S.table}>
          <thead style={S.thead}>
            <tr>
              <th style={{ ...S.th, width: 40, textAlign: "center" }}>No</th>
              <th style={S.th}>Nama Barang</th>
              <th style={{ ...S.th, width: 140 }}>SN</th>
              <th style={{ ...S.th, width: 60, textAlign: "center" }}>CP/OP</th>
              <th style={S.th}>Nama Pekerjaan</th>
              <th style={{ ...S.th, width: 90, textAlign: "center" }}>Thn Pengadaan</th>
              <th style={{ ...S.th, width: 80, textAlign: "center" }}>Kondisi</th>
            </tr>
          </thead>
          <tbody>
            {userAssets.map((item, idx) => (
              <tr key={idx} style={S.tr}>
                <td style={{ ...S.td, textAlign: "center", color: "#94a3b8", fontWeight: 700 }}>{idx + 1}</td>
                <td style={S.td}>
                  <div style={{ fontWeight: 600, color: "#1e293b" }}>{item.asset?.name || item.name}</div>
                </td>
                <td style={S.td}>
                  <code style={S.code}>{item.code}</code>
                </td>
                <td style={{ ...S.td, textAlign: "center" }}>
                  <span style={{ 
                    ...S.pill, 
                    background: item.pkj?.jenis === "Capex" ? "#eff6ff" : "#f0fdf4", 
                    color: item.pkj?.jenis === "Capex" ? "#2563eb" : "#16a34a" 
                  }}>
                    {item.pkj?.jenis === "Capex" ? "CP" : "OP"}
                  </span>
                </td>
                <td style={{ ...S.td, maxWidth: "300px" }}>
                  <div style={{ fontSize: ".75rem", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.pkj?.nama}>
                    {item.pkj?.nama || "—"}
                  </div>
                </td>
                <td style={{ ...S.td, textAlign: "center", fontWeight: 600, color: "#64748b" }}>
                  {item.asset?.tahun_pengadaan || "2023"}
                </td>
                <td style={{ ...S.td, textAlign: "center" }}>
                  <span style={{ 
                    fontSize: ".68rem", fontWeight: 800,
                    color: item.condition === "GOOD" ? "#16a34a" : "#dc2626"
                  }}>
                    {item.condition === "GOOD" ? "BAIK" : "RUSAK"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PAGE: RETURN FORM ────────────────────────────────────────
function ReturnFormPage({ borrow, onBack, onSave }) {
  if (!borrow) return null;
  const giver = getUser(borrow.giver_id);
  const receiver = getUser(borrow.receiver_id);
  const pekerjaan = getPekerjaan(borrow.pekerjaan_kode);
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
    onBack();
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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "1rem",
        }}
      >
        <button style={S.backBtn} onClick={onBack}>
          <Icon.ArrowLeft /> Batal
        </button>
        <span style={{ fontSize: ".75rem", color: "#94a3b8" }}>
          / Catat Pengembalian
        </span>
      </div>
      <div style={S.page}>
        <div style={{ ...S.pageHeader, borderTop: "3px solid #16a34a" }}>
          <div style={S.pageTitle}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#dcfce7",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon.Undo />
            </span>
            Catat Pengembalian Aset
          </div>
        </div>
        {pekerjaan && (
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: ".5rem",
                padding: ".6rem .9rem",
                background: "#ecfeff",
                border: "1px solid #a5f3fc",
                borderRadius: 9,
              }}
            >
              <span style={{ color: "#0891b2", display: "flex", marginTop: 2 }}>
                <Icon.Briefcase />
              </span>
              <div>
                <div
                  style={{
                    fontSize: ".65rem",
                    fontWeight: 800,
                    color: "#0891b2",
                    textTransform: "uppercase",
                    letterSpacing: ".04em",
                  }}
                >
                  Pekerjaan
                </div>
                <div style={S.pkjInfoName}>{pekerjaan.nama}</div>
                <div style={S.pkjInfoMeta}>
                  {pekerjaan.no_anggaran} · {pekerjaan.jenis}
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f1f5f9" }}
        >
          <div style={S.sectionLabel}>Informasi Peminjaman</div>
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 9,
              padding: ".75rem 1rem",
            }}
          >
            <HRow label="Aset">
              <code style={S.code}>{borrow.code}</code>
              <span style={{ fontSize: ".78rem" }}>{borrow.name}</span>
            </HRow>
            <HRow label="Dikembalikan oleh">
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    ...S.avatar,
                    background: "#dbeafe",
                    color: "#2563eb",
                  }}
                >
                  {receiver.name.charAt(0)}
                </div>
                <span style={{ fontWeight: 600, fontSize: ".78rem" }}>
                  {receiver.name}
                </span>
              </div>
            </HRow>
            <HRow label="Dikembalikan ke">
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    ...S.avatar,
                    background: "#fef3c7",
                    color: "#d97706",
                  }}
                >
                  {giver.name.charAt(0)}
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    color: "#16a34a",
                    fontSize: ".78rem",
                  }}
                >
                  {giver.name}
                </span>
              </div>
            </HRow>
            <HRow label="Dipinjam sejak" last>
              <span style={{ fontSize: ".78rem", color: "#64748b" }}>
                {fmtDate(borrow.borrow_date)}
              </span>
            </HRow>
          </div>
        </div>
        <div style={S.formSection}>
          <FHRow label="Kondisi Dikembalikan">
            <div style={S.chips}>
              {Object.entries(conditionConfig).map(([val, cfg]) => (
                <button
                  key={val}
                  type="button"
                  style={{
                    ...S.chip,
                    ...(form.return_condition === val
                      ? {
                        background: cfg.bg,
                        color: cfg.color,
                        borderColor: cfg.color,
                      }
                      : {}),
                  }}
                  onClick={() => setForm({ ...form, return_condition: val })}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </FHRow>
          <FHRow label="Tanggal Pengembalian">
            <input
              type="datetime-local"
              value={form.return_date}
              onChange={(e) =>
                setForm({ ...form, return_date: e.target.value })
              }
              style={S.finput}
            />
          </FHRow>
          <FHRow label="Catatan Pengembalian" last>
            <textarea
              value={form.return_notes}
              onChange={(e) =>
                setForm({ ...form, return_notes: e.target.value })
              }
              rows={3}
              placeholder="Kondisi, kerusakan, atau catatan lainnya..."
              style={{ ...S.finput, resize: "vertical" }}
            />
          </FHRow>
          <div style={{ marginTop: 8 }}>
            <PdfUpload
              value={form.attachmentFile}
              onChange={(f) => setForm({ ...form, attachmentFile: f })}
            />
          </div>
        </div>
        <div style={S.btnRow}>
          <button style={S.btnGhost} onClick={onBack}>
            Batal
          </button>
          {!form.attachmentFile && (
            <button style={S.btnPurple} onClick={handleGenerateBAST}>
              <Icon.Printer /> Generate BAST
            </button>
          )}
          <button style={S.btnGreen} onClick={handleSave}>
            <Icon.Undo /> Konfirmasi Pengembalian
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: DELETE CONFIRM ─────────────────────────────────────
function DeletePage({ item, onBack, onConfirm }) {
  if (!item) return null;
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "1rem",
        }}
      >
        <button style={S.backBtn} onClick={onBack}>
          <Icon.ArrowLeft /> Batal
        </button>
        <span style={{ fontSize: ".75rem", color: "#94a3b8" }}>
          / Hapus Serah Terima
        </span>
      </div>
      <div style={{ ...S.page, maxWidth: 480 }}>
        <div style={S.deleteBox}>
          <div style={S.deleteIco}>
            <Icon.Trash />
          </div>
          <h3 style={S.deleteTitle}>Hapus Serah Terima?</h3>
          <p style={S.deleteDesc}>
            Data serah terima <strong>{item.code}</strong> — {item.name} akan
            dihapus secara permanen dan tidak dapat dikembalikan.
          </p>
        </div>
        <div style={{ ...S.btnRow, justifyContent: "center" }}>
          <button style={S.btnGhost} onClick={onBack}>
            Batal
          </button>
          <button
            style={S.btnRed}
            onClick={() => {
              onConfirm(item.id);
              onBack();
            }}
          >
            <Icon.Trash /> Hapus Permanen
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────
export default function Peminjaman() {
  const [borrows, setBorrows] = useState(initBorrows);
  const [returns, setReturns] = useState(initReturns);
  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState("semua");
  const [filterPekerjaan, setFilterPekerjaan] = useState("semua");
  const [nav, setNav] = useState(null);
  const [openCats, setOpenCats] = useState({});


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

  // Grouping by "Transaction" (simulated BAST)
  const groupedTransactions = useMemo(() => {
    const groups = {};
    filteredBorrows.forEach((b) => {
      // Create a unique key for the transaction
      const dateKey = b.borrow_date.split('T')[0];
      const key = `${dateKey}_${b.giver_id}_${b.receiver_id}`;
      
      if (!groups[key]) {
        groups[key] = {
          id: b.id, // Use the first item's ID as transaction ref
          date: b.borrow_date,
          giver_id: b.giver_id,
          receiver_id: b.receiver_id,
          items: [],
          pekerjaan_kode: b.pekerjaan_kode,
        };
      }
      groups[key].items.push(b);
    });
    // Convert to array and sort by date desc
    return Object.values(groups).sort((a, b) => new Date(b.date) - new Date(a.date));
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
  const goBack = () => setNav(null);
  const toggleCat = (catKey) =>
    setOpenCats((o) => ({ ...o, [catKey]: !o[catKey] }));
  const isCatOpen = (catKey) => openCats[catKey] !== false;

  if (nav?.page === "borrow-detail")
    return (
      <div style={S.root}>
        <BorrowDetailPage
          item={nav.data}
          borrows={borrows}
          returns={returns}
          onBack={goBack}
          onEdit={(d) => setNav({ page: "borrow-form", data: d })}
          onReturn={(d) => setNav({ page: "return-form", data: d })}
          onViewHistory={(d) => setNav({ page: "history", data: d })}
        />
      </div>
    );

  if (nav?.page === "borrow-form")
    return (
      <div style={S.root}>
        <BorrowFormPage
          borrow={nav.data}
          borrows={borrows}
          returns={returns}
          onBack={goBack}
          onSave={handleSaveBorrow}
        />
      </div>
    );

  if (nav?.page === "user-receiver-list")
    return (
      <div style={S.root}>
        <UserReceiverListPage
          borrows={borrows}
          onBack={goBack}
          onDetail={(u) => setNav({ page: "user-asset-detail", data: u })}
        />
      </div>
    );

  if (nav?.page === "user-asset-detail")
    return (
      <div style={S.root}>
        <UserAssetDetailPage
          user={nav.data}
          borrows={borrows}
          onBack={() => setNav({ page: "user-receiver-list", data: null })}
        />
      </div>
    );

  if (nav?.page === "delete")
    return (
      <div style={S.root}>
        <DeletePage item={nav.data} onBack={goBack} onConfirm={handleDelete} />
      </div>
    );

  return (
    <div style={S.root}>
      {/* ── HEADER ── */}
      <div style={S.header}>
        <div>
          <h1 style={S.title}>BAST Aset</h1>
          <p style={S.subtitle}>
            Kelola pencatatan BAST aset IT — peminjaman dan pengembalian per kategori
          </p>
        </div>
        <button
          style={{ ...S.btnBlue, padding: ".5rem 1.2rem", fontSize: ".84rem" }}
          onClick={() => setNav({ page: "borrow-form", data: null })}
        >
          <Icon.Plus /> Catat Serah Terima
        </button>
      </div>

      {/* ── STATS ── */}
      <div style={S.statsGrid}>
        {[
          {
            ico: <Icon.FileText />,
            n: groupedTransactions.length,
            l: "Jumlah BAST",
            bg: "#eff6ff",
            c: "#2563eb",
          },
          {
            ico: <Icon.User />,
            n: [...new Set(activeBorrows.map((b) => b.receiver_id))].length,
            l: "Jumlah User Penerima",
            bg: "#f5f3ff",
            c: "#7c3aed",
            onClick: () => setNav({ page: "user-receiver-list", data: null }),
          },
          {
            ico: <Icon.CheckCircle />,
            n: mockAssets.length - activeBorrows.length,
            l: "Jumlah Barang Available",
            bg: "#ecfdf5",
            c: "#10b981",
            onClick: () => setNav({ page: "available-asset-list", data: null }),
          },
        ].map((s, i) => (
          <div
            key={i}
            onClick={s.onClick}
            style={{ 
              ...S.statCard, 
              ...(s.warn ? S.statCardWarn : {}),
              cursor: s.onClick ? "pointer" : "default",
              transition: "all 0.2s ease",
              background: s.onClick ? `${s.c}08` : "#fff", // Subtle tint for clickable cards
              border: s.onClick ? `1.5px solid ${s.c}20` : S.statCard.border,
            }}
            onMouseOver={(e) => {
              if (s.onClick) {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 20px -5px ${s.c}30`;
                e.currentTarget.style.background = `${s.c}15`; // Darker tint on hover
                e.currentTarget.style.borderColor = `${s.c}40`;
              }
            }}
            onMouseOut={(e) => {
              if (s.onClick) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                e.currentTarget.style.background = `${s.c}08`;
                e.currentTarget.style.borderColor = `${s.c}20`;
              }
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ ...S.statIco, background: s.bg, color: s.c }}>
                {s.ico}
              </div>
              <div>
                <div
                  style={{ ...S.statN, ...(s.warn ? { color: "#dc2626" } : {}) }}
                >
                  {s.n}
                </div>
                <div style={S.statL}>{s.l}</div>
              </div>
            </div>
          </div>
        ))}
      </div>



      <div style={S.toolbar}>
        <div style={S.searchWrap}>
          <Icon.Search />
          <input
            placeholder="Cari kode, nama aset, atau lokasi…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={S.searchInput}
          />
          {search && (
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#94a3b8",
                padding: 0,
                display: "flex",
              }}
              onClick={() => setSearch("")}
            >
              <Icon.Times />
            </button>
          )}
        </div>
        <>
          <div style={S.filterWrap}>
            <span style={{ color: "#94a3b8", display: "flex" }}>
              <Icon.Briefcase />
            </span>
            <select
              value={filterPekerjaan}
              onChange={(e) => setFilterPekerjaan(e.target.value)}
              style={S.filterSelect}
            >
              <option value="semua">Semua Pekerjaan</option>
              {mockPekerjaan.map((p) => (
                <option key={p.kode} value={p.kode}>
                  {p.no_anggaran} — {p.nama.slice(0, 40)}…
                </option>
              ))}
            </select>
          </div>
          <div style={S.filterWrap}>
            <span style={{ color: "#94a3b8", display: "flex" }}>
              <Icon.User />
            </span>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              style={S.filterSelect}
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
        <div style={S.countBadge}>{filteredBorrows.length} aset</div>
      </div>


      <div
        style={{ display: "flex", flexDirection: "column", gap: ".65rem" }}
      >
      <div style={{ ...S.page }}>
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead style={S.thead}>
              <tr>
                <th style={{ ...S.th, width: 40 }}>No</th>
                <th style={S.th}>No.BAST</th>
                <th style={S.th}>Tgl BAST</th>
                <th style={S.th}>Pemberi</th>
                <th style={S.th}>Penerima</th>
                <th style={{ ...S.th, width: 100 }}>Jumlah Item</th>
                <th style={{ ...S.th, textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {groupedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ ...S.td, textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
                    Tidak ada data serah terima yang ditemukan.
                  </td>
                </tr>
              ) : (
                groupedTransactions.map((tx, idx) => {
                  const giver = getUser(tx.giver_id);
                  const receiver = getUser(tx.receiver_id);
                  const bastNo = `BAST/${new Date(tx.date).getFullYear()}/${(borrows.length - idx).toString().padStart(3, '0')}`;
                  
                  return (
                    <tr key={idx} style={S.tr} onClick={() => setNav({ page: "borrow-detail", data: tx.items[0] })}>
                      <td style={{ ...S.td, textAlign: "center" }}>{idx + 1}</td>
                      <td style={S.td}>
                        <code style={{ ...S.code, color: "#1e293b", background: "#f1f5f9" }}>{bastNo}</code>
                      </td>
                      <td style={S.td}>{fmtDateShort(tx.date)}</td>
                      <td style={S.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ ...S.avatar, background: "#f1f5f9", color: "#64748b" }}>{giver.name.charAt(0)}</div>
                          <span style={{ fontWeight: 600 }}>{giver.name}</span>
                        </div>
                      </td>
                      <td style={S.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ ...S.avatar, background: "#dbeafe", color: "#2563eb" }}>{receiver.name.charAt(0)}</div>
                          <span style={{ fontWeight: 600 }}>{receiver.name}</span>
                        </div>
                      </td>
                      <td style={{ ...S.td, textAlign: "center" }}>
                        <span style={{ 
                          background: "#eff6ff", 
                          color: "#2563eb", 
                          padding: "2px 8px", 
                          borderRadius: "12px", 
                          fontWeight: 700, 
                          fontSize: ".7rem" 
                        }}>
                          {tx.items.length} Item
                        </span>
                      </td>
                      <td style={{ ...S.td, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                        <div style={S.actionRow}>
                          <button style={{ ...S.iconBtn, color: "#2563eb" }} title="Detail" onClick={() => setNav({ page: "borrow-detail", data: tx.items[0] })}>
                            <Icon.Eye />
                          </button>
                          <button style={{ ...S.iconBtn, color: "#7c3aed" }} title="Cetak BAST" onClick={() => generateBAST(tx.items[0], "borrow")}>
                            <Icon.Printer />
                          </button>
                          <button style={{ ...S.iconBtn, color: "#dc2626" }} title="Hapus" onClick={() => setNav({ page: "delete", data: tx.items[0] })}>
                            <Icon.Trash />
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
      </div>
      </div>

    </div>
  );
}
