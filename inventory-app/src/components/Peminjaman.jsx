import React, { useState, useMemo, useRef, useEffect } from "react";
import { userAPI, barangAPI, transactionAPI, budgetAPI } from "../services/api";
import LogoPelindo from "../pictures/pelindo2.png";
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
  Info: () => (
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Database: () => (
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Calendar: () => (
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
};

const LOGGED_IN_ADMIN_ID = 1;

const conditionConfig = {
  BAIK: { label: "Baik", color: "#16a34a", bg: "#dcfce7" },
  RUSAK: { label: "Rusak", color: "#dc2626", bg: "#fee2e2" },
  HILANG: { label: "Hilang", color: "#475569", bg: "#e2e8f0" },
  DIPERBAIKI: { label: "Diperbaiki", color: "#2563eb", bg: "#dbeafe" },
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

let mockPekerjaan = [
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

let mockAssets = [
  {
    code: "SPMT-LPT-X1-001",
    name: "Laptop Lenovo ThinkPad X1",
    zone: "Ruang IT",
    pekerjaan_kode: "2540011-C",
    status_id: 2,
    owner_id: 3,
  },
  {
    code: "SPMT-LPT-X1-002",
    name: "Laptop Lenovo ThinkPad X1",
    zone: "Gudang",
    pekerjaan_kode: "2540011-C",
    status_id: 1,
  },

  {
    code: "SPMT-LPT-DL-001",
    name: "Laptop Dell Latitude 5420",
    zone: "Terminal 1",
    pekerjaan_kode: "2440020-A",
    status_id: 1,
  },
  {
    code: "SPMT-LPT-DL-002",
    name: "Laptop Dell Latitude 5420",
    zone: "Gudang",
    pekerjaan_kode: "2440020-A",
    status_id: 1,
  },

  {
    code: "SPMT-LPT-HP-001",
    name: "Laptop HP EliteBook 840",
    zone: "Terminal 2",
    pekerjaan_kode: "2440020-A",
    status_id: 1,
  },
  {
    code: "SPMT-LPT-HP-002",
    name: "Laptop HP EliteBook 840",
    zone: "Gudang",
    pekerjaan_kode: "2440020-A",
    status_id: 1,
  },

  {
    code: "SPMT-PC-HP-001",
    name: "PC Desktop HP EliteDesk",
    zone: "Ruang Admin",
    pekerjaan_kode: "2440020-B",
    status_id: 2,
    owner_id: 2,
  },
  {
    code: "SPMT-PC-HP-002",
    name: "PC Desktop HP EliteDesk",
    zone: "Gudang",
    pekerjaan_kode: "2440020-B",
    status_id: 1,
  },

  {
    code: "SPMT-PC-DL-001",
    name: "PC Desktop Dell OptiPlex",
    zone: "Terminal 1",
    pekerjaan_kode: "2440020-B",
    status_id: 1,
  },
  {
    code: "SPMT-PC-DL-002",
    name: "PC Desktop Dell OptiPlex",
    zone: "Gudang",
    pekerjaan_kode: "2440020-B",
    status_id: 1,
  },

  {
    code: "SPMT-SRV-HP-001",
    name: "Server HP ProLiant DL380",
    zone: "Data Center",
    pekerjaan_kode: "2540011-C",
    status_id: 1,
  },
  {
    code: "SPMT-SRV-HP-002",
    name: "Server HP ProLiant DL380",
    zone: "Gudang",
    pekerjaan_kode: "2540011-C",
    status_id: 1,
  },

  {
    code: "SPMT-SWT-CS-001",
    name: "Switch Cisco Catalyst 9300",
    zone: "Ruang Network",
    pekerjaan_kode: "2540011-C",
    status_id: 2,
    owner_id: 1,
  },
  {
    code: "SPMT-SWT-CS-002",
    name: "Switch Cisco Catalyst 9300",
    zone: "Gudang",
    pekerjaan_kode: "2540011-C",
    status_id: 1,
  },

  {
    code: "SPMT-RTR-MT-001",
    name: "Router Mikrotik CCR2004",
    zone: "Ruang Network",
    pekerjaan_kode: "2540012-A",
    status_id: 1,
  },
  {
    code: "SPMT-RTR-MT-002",
    name: "Router Mikrotik CCR2004",
    zone: "Gudang",
    pekerjaan_kode: "2540012-A",
    status_id: 1,
  },

  {
    code: "SPMT-UPS-AP-001",
    name: "UPS APC Smart-UPS 3000",
    zone: "Data Center",
    pekerjaan_kode: "2540011-D",
    status_id: 1,
  },
  {
    code: "SPMT-UPS-AP-002",
    name: "UPS APC Smart-UPS 3000",
    zone: "Gudang",
    pekerjaan_kode: "2540011-D",
    status_id: 1,
  },

  {
    code: "SPMT-NET-AP-001",
    name: "Access Point Ubiquiti UniFi",
    zone: "Terminal 1",
    pekerjaan_kode: "2540011-A",
    status_id: 1,
  },
  {
    code: "SPMT-NET-AP-002",
    name: "Access Point Ubiquiti UniFi",
    zone: "Gudang",
    pekerjaan_kode: "2540011-A",
    status_id: 1,
  },

  {
    code: "SPMT-NET-CV-001",
    name: "CCTV Hikvision DS-2CD",
    zone: "Gate Area",
    pekerjaan_kode: "2540011-D",
    status_id: 1,
  },
  {
    code: "SPMT-NET-CV-002",
    name: "CCTV Hikvision DS-2CD",
    zone: "Gudang",
    pekerjaan_kode: "2540011-D",
    status_id: 1,
  },

  {
    code: "SPMT-NET-PA-001",
    name: "Public Announcer Bosch Praesideo",
    zone: "Terminal 2",
    pekerjaan_kode: "2540011-B",
    status_id: 1,
  },
  {
    code: "SPMT-NET-PA-002",
    name: "Public Announcer Bosch Praesideo",
    zone: "Gudang",
    pekerjaan_kode: "2540011-B",
    status_id: 1,
  },

  {
    code: "SPMT-NET-RD-001",
    name: "Radio Point-To-Point Ubiquiti",
    zone: "Ruang Network",
    pekerjaan_kode: "2440020-B",
    status_id: 1,
  },
  {
    code: "SPMT-NET-RD-002",
    name: "Radio Point-To-Point Ubiquiti",
    zone: "Gudang",
    pekerjaan_kode: "2440020-B",
    status_id: 1,
  },

  {
    code: "SPMT-NET-FW-001",
    name: "Firewall Fortinet FortiGate",
    zone: "Data Center",
    pekerjaan_kode: "2540010-A",
    status_id: 1,
  },
  {
    code: "SPMT-NET-FW-002",
    name: "Firewall Fortinet FortiGate",
    zone: "Gudang",
    pekerjaan_kode: "2540010-A",
    status_id: 1,
  },
];

let mockUsers = [
  {
    id: 1,
    name: "Joy Silalahi",
    branch: "Jakarta",
    jabatan: "Admin",
  },
  {
    id: 2,
    name: "Budi Santoso",
    branch: "Jakarta",
    jabatan: "User",
  },
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
    condition: "BAIK",
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
    condition: "BAIK",
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
    condition: "BAIK",
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
    condition: "BAIK",
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
    condition: "BAIK",
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
    return_condition: "BAIK",
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
    return_condition: "RUSAK",
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
    return_condition: "BAIK",
    return_notes: "",
    attachment: "ba_kembali_lpt01.pdf",
  },
];

const getUser = (id) =>
  mockUsers.find((u) => u.id === id) || { name: "—", branch: "", jabatan: "" };

const isITorAdmin = (userId) => {
  const u = getUser(userId);
  const j = (u.jabatan || "").toLowerCase();
  return j.includes("it") || j.includes("admin");
};
const getAsset = (code) => mockAssets.find((a) => a.code === code);
const getPekerjaan = (kode) => {
  if (!kode) return null;
  return mockPekerjaan.find(
    (p) => String(p.kode) === String(kode) || String(p.id) === String(kode)
  );
};
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

const generateBAST = (itemOrItems, type = "borrow", assetsList = []) => {
  // Support both single item and array of items
  const items = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
  
  // Enrich each item with asset specs
  const enrichedItems = items.map(item => {
    let fullItem = { ...item };
    const found = assetsList.find(a => a.code === (item.code || item.asset_code));
    if (found) {
      fullItem.specs = found.specs || [];
      fullItem.customSpecs = found.customSpecs || [];
      if (!fullItem.category) fullItem.category = found.category || "";
      fullItem.serialNumber = found.serialNumber || "-";
    }
    return fullItem;
  });

  const firstItem = enrichedItems[0];
  const isBorrow = type === "borrow";
  const giver = getUser(firstItem.giver_id);
  const receiver = getUser(firstItem.receiver_id);
  const nomorBAST = firstItem.bast_number || genNomorBAST(firstItem.id, isBorrow ? firstItem.borrow_date : firstItem.return_date);
  const tglDokumen = fmtDate(isBorrow ? firstItem.borrow_date : firstItem.return_date);
  
  // Build table rows for ALL items
  const tableRows = enrichedItems.map((item, idx) => {
    let rawCond = isBorrow ? item.condition : item.return_condition;
    rawCond = (rawCond || "").toUpperCase();
    if (rawCond === "GOOD") rawCond = "BAIK";
    if (rawCond === "MINOR_DAMAGE" || rawCond === "DAMAGED") rawCond = "RUSAK";
    if (rawCond === "MISSING") rawCond = "HILANG";
    const kondisi = conditionConfig[rawCond];
    const pekerjaan = item.pekerjaan || getPekerjaan(item.pekerjaan_kode);
    return `<tr>
        <td class="center">${idx + 1}</td>
        <td>
          ${item.name}
          ${pekerjaan || item.category || (item.specs && item.specs.length > 0) || (item.customSpecs && item.customSpecs.length > 0) ? `
          <br/>Spesifikasi :
          <ul>
            ${item.category ? `<li>Kategori: ${item.category}</li>` : ''}
            ${pekerjaan ? `<li>Tahun Pengadaan: ${pekerjaan.tahun_pengadaan || pekerjaan.tahun || "-"}</li>` : ''}
            ${(item.specs || []).map(s => `<li>${s.spec_label}: ${s.value} ${s.default_unit || ''}</li>`).join('')}
            ${(item.customSpecs || []).map(s => `<li>${s.spec_label}: ${s.value} ${s.default_unit || ''}</li>`).join('')}
          </ul>` : ''}
        </td>
        <td class="center">${item.serialNumber || item.code}</td>
      </tr>`;
  }).join('');
  const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><style>*{margin:0;padding:0;box-sizing:border-box;}@page{size:A4;margin:0;}body{font-family:Arial,Helvetica,sans-serif;font-size:11pt;color:#000;background:#fff;padding:0.5cm 1.5cm;}.kop{display:flex;justify-content:flex-end;margin-bottom:10px;}.kop-logo{width:250px;}.judul-doc{text-align:center;margin-bottom:10px;}.judul-doc h2{font-size:12pt;font-weight:bold;text-decoration:underline;margin-bottom:2px;}.nomor-doc{text-align:center;font-size:11pt;margin-bottom:10px;}.subjudul{text-align:center;font-size:11pt;margin-bottom:15px;}.intro{margin-bottom:15px;line-height:1.5;text-align:justify;}.detail-pihak{width:100%;border-collapse:collapse;margin-bottom:15px;}.detail-pihak td{vertical-align:top;padding:2px 0;line-height:1.5;}.detail-pihak td.num{width:4%;text-align:left;}.detail-pihak td.name{width:26%;}.detail-pihak td.colon{width:2%;text-align:center;}.detail-pihak td.desc{width:68%;text-align:justify;}.pernyataan-tengah{text-align:center;margin:15px 0;}.tabel-aset{width:100%;border-collapse:collapse;margin-bottom:15px;}.tabel-aset th,.tabel-aset td{border:1px solid #000;padding:4px 6px;font-size:10pt;vertical-align:top;}.tabel-aset th{font-weight:bold;text-align:center;background-color:#e2e2e2;}.tabel-aset td.center{text-align:center;}.tabel-aset ul{margin:5px 0 0 20px;padding:0;list-style-type:disc;}.ketentuan{margin-bottom:20px;line-height:1.4;text-align:justify;}.ketentuan>ol{margin:10px 0 10px 25px;padding:0;}.ketentuan>ol>li{margin-bottom:5px;padding-left:5px;}.ketentuan>ol>li>ul{margin:5px 0 0 20px;padding:0;list-style-type:disc;}.ketentuan>ol>li>ul>li{margin-bottom:3px;}.penutup{margin-bottom:25px;line-height:1.4;text-align:justify;}.ttd-section{display:flex;justify-content:space-between;margin-top:15px;}.ttd-box{width:45%;text-align:center;}.ttd-box .ttd-label{font-weight:normal;margin-bottom:70px;line-height:1.4;}.ttd-box .ttd-nama{font-weight:bold;}@media print{body{padding:0.5cm 1.5cm;}.no-print{display:none!important;}}</style></head><body>
<table style="width: 100%; border: none; border-collapse: collapse;">
  <thead style="display: table-header-group;">
    <tr>
      <td style="border: none; padding: 0;">
        <div class="kop" style="margin-bottom: 10px;">
    <div class="kop-logo" id="logo-container">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAG4CAYAAADbvJU8AAAQAElEQVR4AezdB4AcZfnH8d87eyWNTkKzABYgBSlWBAmK1DTABERSAA2QS0JV/yrKqSiKSsndJRAVkgACCQRSARGxgBVUIKGp9JrQIcm1nff/zCGaXPYud7uzu7O73837ZvdmZ973eT+zNzfzzO5sIG4IIIAAAggggAACCCCAAAIIIFDuAiIBUParmAEigAACCCCAAAIIIIAAAgggIBIAvAgQQAABBBBAAAEEEEAAAQQQKHsBGyDvADAECgIIIIAAAggggAACCCCAAALlLBCNjQRApEBFAAEEEEAAAQQQQAABBBBAoHwFOkZGAqCDgf8QQAABBBBAAAEEEEAAAQQQKFeBt8dFAuBtB/5HAAEEEEAAAQQQQAABBBBAoDwF/jMqEgD/geAOAQQQQAABBBBAAAEEEEAAgXIUeGdMJADekeAeAQQQQAABBBBAAAEEEEAAgfIT+O+ISAD8l4IHCCCAAAIIIIAAAggggAACCJSbwP/GQwLgfxY8QgABBBBAAAEEEEAAAQQQQKC8BNYbDQmA9TB4iAACCCCAAAIIIIAAAggggEA5Caw/FhIA62vwGAEEEEAAAQQQQAABBBBAAIHyEdhgJCQANuDgBwQQQAABBBBAAAEEEEAAAQTKRWDDcZAA2NCDnxBAAAEEEEAAAQQQQAABBBAoD4FOoyAB0AmEHxFAAAEEEEAAAQQQQAABBBAoB4HOYyAB0FmEnxFAAAEEEEAAAQQQQAABBBAofYGNRkACYCMSJiCAAAIIIIAAAggggAACCCBQ6gIbx08CYGMTpiCAAAIIIIAAAggggAACCCBQ2gIZoicBkAGFSQgggAACCCCAAAIIIIAAAgiUskCm2EkAZFJhGgIIIIAAAggggAACCCCAAAKlK5AxchIAGVmYiAACCCCAAAIIIIAAAggggECpCmSOmwRAZhemIoAAAggggAACCCCAAAIIIFCaAl1ETQKgCxgmI4AAAggggAACCCCAAAIIIFCKAl3FTAKgKxmmI4AAAggggAACCCCAAAIIIFB6Al1GTAKgSxqeQAABBBBAAAEEEEAAAQQQQKDUBLqOlwRA1zY8gwACCCCAAAIIIIAAAggggEBpCXQTLQmAbnB4CgEEEEAAAQQQQAABBBBAAIFSEuguVhIA3enwHAIIIIAAAggggAACCCCAAAKlI9BtpCQAuuXhSQQQQAABBBBAAAEEEEAAAQRKRaD7OEkAdO/DswgggAACCCCAAAIIIIAAAgiUhsAmoiQBsAkgnkYAAQQQQAABBBBAAAEEEECgFAQ2FSMJgE0J8TwCCCCAAAIIIIAAAggggAACyRfYZIQkADZJxAwIIIAAAggggAACCCCAAAIIJF1g0/GRANi0EXMggAACCCCAAAIIIIAAAgggkGyBHkRHAqAHSMyCAAIIIIAAAggggAACCCCAQJIFehIbCYCeKDEPAggggAACCCCAAAIIIIAAAskV6FFkJAB6xMRMCCCAAAIIIIAAAggggAACCCRVoGdxkQDomRNzIYAAAggggAACCCCAAAIIIJBMgR5GRQKgh1DMhgACCCCAAAIIIIAAAggggEASBXoaEwmAnkoxHwIIIIAAAggggAACCCCAAALJE+hxRCQAekzFjAgggAACCCCAAAIIIIAAAggkTaDn8ZAA6LkVcyKAAAIIIIAAAggggAACCCCQLIFeREMCoBdYzIoAAggggAACCCCAAAIIIIBAkgR6EwsJgN5oMS8CCCCAAAIIIIAAAggggAACyRHoVSQkAHrFxcwIIIAAAggggAACCCCAAAIIJEWgd3GQAOidF3MjgAACCCCAAAIIIIAAAgggkAyBXkZBAqCXYMyOAAIIIIAAAggggAACCCCAQBIEehsDCYDeijE/AggggAACCCCAAAIIIIAAAsUX6HUEJAB6TcYCCCCAAAIIIIAAAggggAACCBRboPf9kwDovRlLIIAAAggggAACCCCAAAIIIFBcgSx6JwGQBRqLIIAAAggggAACCCCAAAIIIFBMgWz6JgGQjRrLIIAAAggggAACCCCAAAIIIFA8gax6JgGQFRsLIYAAAggggAACCCCAAAIIIFAsgez6JQGQnRtLIYAAAggggAACCCCAAAIIIFAcgSx7JQGQJRyLIYAAAggggAACCCCAAAIIIFAMgWz7JAGQrRzLIYAAAggggAACCCCAAAIIIFB4gax7JAGQNR0LIoAAAggggAACCCCAAAIIIFBogez7IwGQvR1LIoAAAggggAACCCCAAAIIIFBYgRx6IwGQAx6LIoAAAggggAACCCCAAAIIIFBIgVz6IgGQix7LIoAAAggggAACCCCAAAIIIFA4gZx6IgGQEx8LI4AAAggg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CCCAAAIIIIAAAgggUEQBus5GgARANmosgwACCCCAAAIIIIAAAgggUDwBes5KgARAVmwshAACCCCAAAIIIIAAAgggUCwB+s1OgARAdm4shQACCCCAAAIIIIAAAgggUBwBes1SgARAlnAshgACCCCAAAIIIIAAAgggUAwB+sxWgARAtnIshwACCCCAAAIIIIAAAgggUHgBesxagARA1nQsiAACCCCAAAIIIIAAAgggUGgB+stegARA9nYsiQACCCCAAAIIIIAAAgggUFgBestBgARADngsigACCCCAAAIIIIAAAgggUEgB+spFgARALnosiwACCCCAAAIIIIAAAgggUDgBespJgARATnwsjAACCCCAAAIIIIAAAgggUCgB+slNgARAbn4sjQACCCCAAAIIIIAAAgggUBgBeslRgARAjoAsjgACCCCAAAIIIIAAAgggUAgB+shVgARAroIsjwACCCCAAAIIIIAAAgggkH8BeshZgARAzoQ0gAACCCCAAAIIIIAAAgggkG8B2s9dgARA7oa0gAACCCCAAAIIIIAAAgggkF8BWo9BgARADIg0gQACCCCAAAIIIIAAAgggkE8B2o5DgARAHIq0gQACCCCAAAIIIIAAAgggkD8BWo5FgARALIw0ggACCCCAAAIIIPLJLlMAAAvMSURBVIAAAgggkC8B2o1HgARAPI60ggACCCCAAAIIIIAAAgggkB8BWo1JgARATJA0gwACCCCAAAIIIIAAAgggkA8B2oxLgARAXJK0gwACCCCAAAIIIIAAAgggEL8ALcYmQAIgNkoaQgABBBBAAAEEEEAAAQQQiFuA9uITIAEQnyUtIYAAAggggAACCCCAAAIIxCtAazEKkACIEZOmEEAAAQQQQAABBBBAAAEE4hSgrTgFSADEqUlbCCCAAAIIIIAAAggggAAC8QnQUqwCJABi5aQxBBBAAAEEEEAAAQQQQACBuARoJ14BEgDxetIaAggggAACCCCAAAIIIIBAPAK0ErMACYCYQWkOAQQQQAABBBBAAAEEEEAgDgHaiFuABEDcorSHAAIIIIAAAggggAACCCCQuwAtxC5AAiB2UhpEAAEEEEAAAQQQQAABBBDIVYDl4xcgARC/KS0igAACCCCAAAIIIIAAAgjkJsDSeRAgAZAHVJpEAAEEEEAAAQQQQAABBBDIRYBl8yFAAiAfqrSJ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" alt="Logo Pelindo" style="width:100%; height:auto; display:block;" />
    </div>
  </div>
      </td>
    </tr>
  </thead>
  <tbody style="display: table-row-group;">
    <tr>
      <td style="border: none; padding: 0;">
  <div class="judul-doc">
    <h2>BERITA ACARA</h2>
    <div class="nomor-doc">Nomor: ${nomorBAST}</div>
  </div>
  <div class="subjudul">
    TENTANG<br/>
    SERAH TERIMA PERANGKAT KERJA A.N. ${receiver.name.toUpperCase()}
  </div>
  <div class="intro">
    Pada hari ini, ${tglDokumen}, yang bertanda tangan di bawah ini:
  </div>
  <table class="detail-pihak">
    <tr>
      <td class="num">1.</td>
      <td class="name">${giver.name.toUpperCase()}</td>
      <td class="colon">:</td>
      <td class="desc">${giver.jabatan || 'Officer Infrastruktur dan Solusi Teknologi Informasi'} ${giver.branch || 'PT. Pelindo Multi Terminal'} Kantor Pusat, yang berkedudukan di Jalan Lingkar Pelabuhan No. 1 Belawan, Sumatera Utara, untuk selanjutnya disebut sebagai <strong>Pihak Pertama</strong>.</td>
    </tr>
    <tr>
      <td class="num">2.</td>
      <td class="name">${receiver.name.toUpperCase()}</td>
      <td class="colon">:</td>
      <td class="desc">${receiver.jabatan || 'Officer Perencanaan SDM dan Organisasi'} ${receiver.branch || 'PT. Pelindo Multi Terminal'} Kantor Pusat, yang berkedudukan di Jalan Lingkar Pelabuhan No. 1 Belawan, Sumatera Utara, untuk selanjutnya disebut sebagai <strong>Pihak Kedua</strong>.</td>
    </tr>
  </table>
  
  <div class="pernyataan-tengah">
    ----------------------- masing &ndash; masing menyatakan bahwa -----------------------
  </div>
  
  <div class="intro">
    <strong>Pihak Pertama</strong> dengan ini menyerahkan Perangkat Kerja kepada <strong>Pihak Kedua</strong>, dengan rincian sebagai berikut:
  </div>

  <table class="tabel-aset">
    <thead>
      <tr>
        <th style="width:6%">No</th>
        <th>Nama Perangkat</th>
        <th style="width:30%">Serial Number</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>

  <div class="ketentuan">
    <strong>Pihak Kedua</strong> dengan ini menyatakan telah menerima Perangkat Kerja dari <strong>Pihak Pertama</strong> dengan spesifikasi sebagaimana tersebut di atas dalam keadaan baik dan berfungsi sebagaimana mestinya, dengan ketentuan:
    <ol type="a">
      <li>
        <strong>Pihak Kedua</strong> diwajibkan mengembalikan perangkat kerja dimaksud kepada <strong>Pihak Pertama</strong> apabila <strong>Pihak Kedua</strong>:
        <ul>
          <li>Mutasi ke Cabang Pelabuhan lainnya;</li>
          <li>Berganti jabatan atau tidak menjabat lagi dari jabatan sewaktu dibuatnya berita acara ini;</li>
          <li>Menjalani Masa Persiapan Pensiun (MPP);</li>
          <li>Menjalani masa Pensiun;</li>
          <li>Kerusakan dan kehilangan perangkat kerja menjadi tanggung jawab pengguna.</li>
        </ul>
      </li>
      <li><strong>Pihak Kedua</strong> bertanggung jawab untuk menjaga perangkat yang diserahkan dari kerusakan dan kehilangan, serta kebutuhan aksesorinya;</li>
      <li><strong>Pihak Kedua</strong> tidak dibenarkan untuk memindahkan dan/atau mengalihkan perangkat perlengkapan kerja dimaksud kepada pihak lainnya yang tidak sesuai dengan peruntukannya tanpa sepengetahuan <strong>Pihak Pertama</strong>.</li>
    </ol>
  </div>

  <div class="penutup">
    Demikian Berita Acara Serah Terima ini dibuat dengan sebenar-benarnya dan penuh rasa tanggung jawab oleh kedua belah pihak untuk dapat dipergunakan dan dijalankan sebagaimana mestinya.
  </div>

  <div class="ttd-section" style="page-break-inside: avoid; break-inside: avoid;">
    <div class="ttd-box">
      <div class="ttd-label">
        <strong>PIHAK PERTAMA</strong><br/>
        ${giver.jabatan ? giver.jabatan.toUpperCase() : "OFFICER INFRASTRUKTUR DAN SOLUSI TEKNOLOGI INFORMASI"}<br/>
        PT PELINDO MULTI TERMINAL
      </div>
      <div class="ttd-nama">${giver.name.toUpperCase()}</div>
    </div>
    <div class="ttd-box">
      <div class="ttd-label">
        <strong>PIHAK KEDUA</strong><br/>
        ${receiver.jabatan ? receiver.jabatan.toUpperCase() : "OFFICER PERENCANAAN SDM DAN ORGANISASI"}<br/>
        PT PELINDO MULTI TERMINAL
      </div>
      <div class="ttd-nama">${receiver.name.toUpperCase()}</div>
    </div>
  </div>
      </td>
    </tr>
  </tbody>
</table>
  
  <div class="no-print" style="margin-top:40px;text-align:center;">
    <button onclick="window.print()" style="padding:10px 28px;background:#003675;color:white;border:none;border-radius:8px;font-size:13pt;cursor:pointer;font-family:inherit;box-shadow:0 4px 6px rgba(0,0,0,0.1);">Cetak / Simpan PDF</button>
  </div>
</body></html>`;
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
    boxSizing: "border-box",
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
    overflow: "visible",
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
    boxShadow: "0 8px 24px rgba(0,0,0,.12)",
    zIndex: 9999,
    maxHeight: 160,
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
  // Gunakan o.label (selalu string) untuk filter — renderLabel bisa mengembalikan JSX
  const filtered = options.filter((o) =>
    String(o.label || "").toLowerCase().includes(query.toLowerCase()),
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
          cursor: disabled || selected ? "default" : "pointer",
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
function BorrowDetailPage({ data, assets, onBack, onEdit, onReturn }) {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  if (!data) return null;

  const { date, giver_id, receiver_id, items = [] } = data;
  const giver = getUser(giver_id);
  const receiver = getUser(receiver_id);
  const bastNo = data.bast_number || `BAST/${new Date(date).getFullYear()}/${(data.id || 0).toString().padStart(3, "0")}`;

  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderModal = () => {
    if (!selectedItem) return null;
    const pkj = selectedItem.pekerjaan || getPekerjaan(selectedItem.pekerjaan_kode);
    const assetPrice = selectedItem.price || 0;
    const rawCond = (selectedItem.return_condition || selectedItem.condition || "BAIK").toUpperCase();
    let condKey = rawCond;
    if (condKey === "GOOD") condKey = "BAIK";
    if (condKey === "MINOR_DAMAGE" || condKey === "DAMAGED") condKey = "RUSAK";
    if (condKey === "MISSING") condKey = "HILANG";

    const rows = [
      {
        l: "Nama Barang",
        v: selectedItem.name,
        i: <Icon.Laptop />,
        b: true,
        c1: "#eff6ff",
        c2: "#2563eb",
      },
      {
        l: "Serial Number",
        v: selectedItem.code,
        i: <Icon.Info />,
        c: true,
        c1: "#f1f5f9",
        c2: "#475569",
      },
      {
        l: "Nama Pekerjaan",
        v: pkj?.nama || "Tidak ada pekerjaan",
        i: <Icon.Briefcase />,
        c1: "#fffbeb",
        c2: "#d97706",
      },
      {
        l: "Tahun Pengadaan",
        v: pkj?.tahun_pengadaan || pkj?.tahun || selectedItem.tahun_pengadaan || "—",
        i: <Icon.Calendar />,
        c1: "#f0fdf4",
        c2: "#16a34a",
      },
      {
        l: "Keterangan",
        v: selectedItem.notes || "Tidak ada catatan",
        i: <Icon.FileText />,
        c1: "#fdf4ff",
        c2: "#a21caf",
      },
      {
        l: "Kondisi",
        v: (
          <span
            style={{
              color: conditionConfig[condKey]?.color,
              fontWeight: 800,
            }}
          >
            {conditionConfig[condKey]?.label || condKey}
          </span>
        ),
        i: <Icon.CheckCircle />,
        c1: conditionConfig[condKey]?.bg || "#f1f5f9",
        c2: conditionConfig[condKey]?.color || "#475569",
      },
      {
        l: "Jenis Anggaran",
        v: (
          <span
            style={{
              ...S.pill,
              background: pkj?.jenis === "Capex" ? "#eff6ff" : "#f0fdf4",
              color: pkj?.jenis === "Capex" ? "#2563eb" : "#16a34a",
              padding: "2px 10px",
            }}
          >
            {pkj?.jenis || "Capex"}
          </span>
        ),
        i: <Icon.Briefcase />,
        c1: pkj?.jenis === "Capex" ? "#eff6ff" : "#f0fdf4",
        c2: pkj?.jenis === "Capex" ? "#2563eb" : "#16a34a",
      },
      {
        l: "Nilai Barang",
        v: (
          <span style={{ fontWeight: 800, color: "#0f172a", fontSize: "1rem" }}>
            Rp {assetPrice.toLocaleString("id-ID")}
          </span>
        ),
        i: <Icon.Database />,
        c1: "#ecfdf5",
        c2: "#10b981",
      },
    ];

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          animation: "fadeIn 0.2s ease",
        }}
        onClick={() => setSelectedItem(null)}
      >
        <div
          style={{
            background: "#fff",
            width: "100%",
            maxWidth: 480,
            borderRadius: 24,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* COLORFUL HEADER */}
          <div
            style={{
              padding: "1.5rem 1.75rem",
              background: "linear-gradient(135deg, #003675 0%, #005bb7 100%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
              }}
            />
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Informasi Detail Barang
              </h3>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: ".72rem",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 500,
                }}
              >
                ID Transaksi: #{data.id || "000"}
              </p>
            </div>
            <button
              style={{
                border: "none",
                background: "rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: 8,
                cursor: "pointer",
                color: "#fff",
                display: "flex",
              }}
              onClick={() => setSelectedItem(null)}
            >
              <Icon.Times />
            </button>
          </div>

          <div
            style={{
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "10px 0",
                  borderBottom:
                    i === rows.length - 1 ? "none" : "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: row.c1,
                    color: row.c2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {React.cloneElement(row.i, { width: 16, height: 16 })}
                </div>

                <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                  <div
                    style={{
                      width: 130,
                      fontSize: ".72rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: ".02em",
                    }}
                  >
                    {row.l}
                  </div>

                  <div style={{ color: "#cbd5e1", marginRight: "1rem" }}>:</div>

                  <div
                    style={{
                      flex: 1,
                      fontSize: row.b ? ".9rem" : ".85rem",
                      fontWeight: row.b ? 800 : 600,
                      color: "#1e293b",
                      fontFamily: row.c ? "monospace" : "inherit",
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                    }}
                  >
                    {row.v}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "1.25rem 1.75rem",
              background: "#f8fafc",
              borderTop: "1px solid #f1f5f9",
              textAlign: "right",
            }}
          >
            <button
              style={{
                ...S.btnBlue,
                padding: "10px 32px",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
              }}
              onClick={() => setSelectedItem(null)}
            >
              Tutup Detail
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      {renderModal()}

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
          / Detail Berita Acara Serah Terima
        </span>
      </div>

      <div style={S.page}>
        {/* SUMMARY CARD */}
        <div
          style={{
            padding: "1.5rem",
            background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
            borderBottom: "1px solid #e2e8f0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: ".65rem",
                fontWeight: 800,
                color: "#64748b",
                textTransform: "uppercase",
                marginBottom: 5,
              }}
            >
              Nomor BAST
            </div>
            <code
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                color: "#1e293b",
                background: "#fff",
                padding: "4px 10px",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
              }}
            >
              {bastNo}
            </code>
            <div style={{ fontSize: ".7rem", color: "#64748b", marginTop: 8 }}>
              Tanggal: <strong>{fmtDateShort(date)}</strong>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: ".65rem",
                fontWeight: 800,
                color: "#64748b",
                textTransform: "uppercase",
                marginBottom: 5,
              }}
            >
              Pihak Pertama (Pemberi)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  ...S.avatar,
                  width: 32,
                  height: 32,
                  background: "#fff",
                  color: "#64748b",
                  border: "1px solid #e2e8f0",
                }}
              >
                {giver.name.charAt(0)}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#1e293b",
                    fontSize: ".85rem",
                  }}
                >
                  {giver.name}
                </div>
                <div style={{ fontSize: ".7rem", color: "#64748b" }}>
                  NIP/ID: {giver.nip || "-"} / {giver.id}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: ".65rem",
                fontWeight: 800,
                color: "#64748b",
                textTransform: "uppercase",
                marginBottom: 5,
              }}
            >
              Pihak Kedua (Penerima)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  ...S.avatar,
                  width: 32,
                  height: 32,
                  background: "#2563eb",
                  color: "#fff",
                }}
              >
                {receiver.name.charAt(0)}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#1e293b",
                    fontSize: ".85rem",
                  }}
                >
                  {receiver.name}
                </div>
                <div style={{ fontSize: ".7rem", color: "#64748b" }}>
                  NIP/ID: {receiver.nip || "-"} / {receiver.id}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <button
              style={{ ...S.btnGhost, padding: "8px 12px" }}
              onClick={() => generateBAST(items, "borrow", assets)}
            >
              <Icon.Printer /> Cetak BAST
            </button>
          </div>
        </div>

        {/* ITEM TABLE */}
        <div style={{ padding: "0" }}>
          <div
            style={{
              padding: "12px 1.5rem",
              background: "#fff",
              borderBottom: "2px solid #f1f5f9",
              fontWeight: 800,
              fontSize: ".7rem",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon.Briefcase /> DAFTAR BARANG DALAM BERITA ACARA ({items.length})
          </div>
          <table style={S.table}>
            <thead style={S.thead}>
              <tr>
                <th style={{ ...S.th, width: 40, textAlign: "center" }}>No</th>
                <th style={{ ...S.th, width: 150 }}>ID Barang</th>
                <th style={S.th}>Nama Barang</th>
                <th style={{ ...S.th, width: 120, textAlign: "center" }}>
                  Kondisi
                </th>
                <th style={S.th}>Keterangan</th>
                <th style={{ ...S.th, width: 100, textAlign: "center" }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((it, idx) => {
                const realIdx = (currentPage - 1) * itemsPerPage + idx + 1;
                return (
                  <tr key={it.id} style={S.tr}>
                    <td
                      style={{
                        ...S.td,
                        textAlign: "center",
                        color: "#94a3b8",
                        fontWeight: 700,
                      }}
                    >
                      {realIdx}
                    </td>
                    <td style={S.td}>
                      <code style={{ ...S.code, fontSize: ".7rem" }}>
                        {it.code || it.asset_code}
                      </code>
                    </td>
                    <td style={S.td}>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#1e293b",
                          fontSize: ".8rem",
                        }}
                      >
                        {it.name}
                      </div>
                    </td>
                    <td style={{ ...S.td, textAlign: "center" }}>
                      {(() => {
                        const rawCond = (it.return_condition || it.condition || "BAIK").toUpperCase();
                        // Map GOOD to BAIK, MINOR_DAMAGE to RUSAK etc if needed, but conditionConfig should handle it
                        // Since in mockData condition might be "GOOD", let's map it if it's not in config
                        let condKey = rawCond;
                        if (condKey === "GOOD") condKey = "BAIK";
                        if (condKey === "MINOR_DAMAGE" || condKey === "DAMAGED") condKey = "RUSAK";
                        if (condKey === "MISSING") condKey = "HILANG";

                        const c = conditionConfig[condKey] || conditionConfig.BAIK;
                        return (
                          <span
                            style={{
                              fontSize: ".65rem",
                              fontWeight: 800,
                              padding: "2px 10px",
                              borderRadius: "6px",
                              background: c.bg,
                              color: c.color,
                              border: `1px solid ${c.color}40`,
                            }}
                          >
                            {(c.label || rawCond).toUpperCase()}
                          </span>
                        );
                      })()}
                    </td>
                    <td
                      style={{ ...S.td, fontSize: ".75rem", color: "#475569" }}
                    >
                      {it.notes || "—"}
                    </td>
                    <td style={{ ...S.td, textAlign: "center" }}>
                      <button
                        style={{
                          ...S.btnGhostSm,
                          color: "#2563eb",
                          borderColor: "#dbeafe",
                        }}
                        onClick={() => setSelectedItem(it)}
                      >
                        <Icon.Eye /> Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div
              style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fff",
              }}
            >
              <div style={{ fontSize: ".74rem", color: "#64748b" }}>
                Menampilkan <strong>{paginatedItems.length}</strong> dari{" "}
                <strong>{items.length}</strong> barang
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
              >
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  style={{
                    ...S.iconBtn,
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                    background: currentPage === 1 ? "#f8fafc" : "#fff",
                    opacity: currentPage === 1 ? 0.4 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    padding: "6px 14px",
                  }}
                >
                  <Icon.ArrowLeft /> Prev
                </button>
                <div
                  style={{
                    fontSize: ".74rem",
                    fontWeight: 700,
                    color: "#1e293b",
                    background: "#f1f5f9",
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "1px solid #e2e8f0",
                  }}
                >
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  style={{
                    ...S.iconBtn,
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                    background: currentPage === totalPages ? "#f8fafc" : "#fff",
                    opacity: currentPage === totalPages ? 0.4 : 1,
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    padding: "6px 14px",
                  }}
                >
                  Next <Icon.ArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          ...S.btnRow,
          marginTop: "1.5rem",
          justifyContent: "flex-start",
        }}
      >
        <button style={S.btnGhost} onClick={onBack}>
          <Icon.ArrowLeft /> Kembali ke Daftar
        </button>
      </div>
    </div>
  );
}

// ─── PAGE: RETURN DETAIL ──────────────────────────────────────
function ReturnDetailPage({ item, assets, borrows, returns, onBack, onViewHistory }) {
  if (!item) return null;
  const giver = getUser(item.giver_id);
  const receiver = getUser(item.receiver_id);
  const performer = getUser(item.performed_by_id);
  let condKey = (item.return_condition || "").toUpperCase();
  if (condKey === "GOOD") condKey = "BAIK";
  if (condKey === "MINOR_DAMAGE" || condKey === "DAMAGED") condKey = "RUSAK";
  if (condKey === "MISSING") condKey = "HILANG";
  const cond = conditionConfig[condKey];
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
              onClick={() => generateBAST(item, "return", assets)}
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
                  const rawCond = h.is_returned ? h.return_condition : h.condition;
                  const condKey = (rawCond || "").toUpperCase();
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
function BorrowFormPage({ borrow, borrows, returns, assets, onBack, onSave, setNav }) {
  const [pihak1, setPihak1] = useState({ id: "", locked: false }); // Pemberi
  const [pihak2, setPihak2] = useState({ id: "", locked: false }); // Penerima

  // Backdate: "now" atau tanggal tertentu
  const nowISO = () => new Date().toISOString().slice(0, 16);
  const [backdateMode, setBackdateMode] = useState("now"); // "now" | "custom"
  const [backdateValue, setBackdateValue] = useState(nowISO());

  const [assetSearchQuery, setAssetSearchQuery] = useState("");
  const [baDraft, setBaDraft] = useState([]);

  // Ambil branch admin yang sedang login dari localStorage
  // Login response menyimpan data user langsung dari model (branches_code)
  // sementara userAPI.getAll() via formatUser() mengembalikan branch_code
  const loggedInUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); } catch { return {}; }
  }, []);
  // Handle semua kemungkinan field name untuk branch
  const loggedInBranch = useMemo(() =>
    loggedInUser.branches_code ||
    loggedInUser.branch_code ||
    loggedInUser.branch ||
    null
  , [loggedInUser]);

  // Helper: apakah seorang user adalah admin/superadmin?
  const isAdmin = (u) => {
    const role = (u.jabatan || u.role_code || "").toLowerCase();
    return role.includes("admin") || role.includes("superadmin");
  };

  // Helper: ambil branch dari object user mockUsers (bisa field 'branch' atau 'branch_code')
  const getUserBranch = (u) => u.branch || u.branch_code || u.branches_code || "";

  // Pihak 1 (Pemberi): hanya user dari branch yang sama dengan admin login
  const userOptions1 = useMemo(() => mockUsers
    .filter((u) => {
      if (String(u.id) === String(pihak2.id)) return false;
      // Jika tidak ada info branch login, tampilkan semua (fallback untuk superadmin)
      if (!loggedInBranch) return true;
      return getUserBranch(u) === loggedInBranch;
    })
    .map((u) => ({ value: u.id, label: u.name, sub: getUserBranch(u) }))
  , [pihak2.id, loggedInBranch]);

  // Pihak 2 (Penerima):
  //   ✅ User dari branch yang sama
  //   ✅ Admin/Superadmin dari branch lain (untuk serah terima antar cabang resmi)
  //   ❌ User biasa dari branch lain (tidak ditampilkan)
  const userOptions2 = useMemo(() => mockUsers
    .filter((u) => {
      if (String(u.id) === String(pihak1.id)) return false;
      if (!loggedInBranch) return true;
      const uBranch = getUserBranch(u);
      const sameBranch = uBranch === loggedInBranch;
      const crossBranchAdmin = uBranch !== loggedInBranch && isAdmin(u);
      return sameBranch || crossBranchAdmin;
    })
    .map((u) => ({
      value: u.id,
      label: u.name,
      sub: getUserBranch(u),
    }))
  , [pihak1.id, loggedInBranch]);

  const assetResults = useMemo(() => {
    if (!pihak1.id) return [];

    const p1User = mockUsers.find(u => u.id === Number(pihak1.id));
    const p2User = mockUsers.find(u => u.id === Number(pihak2.id));

    const isP1Admin = p1User && (p1User.jabatan === 'admin' || p1User.jabatan === 'superadmin');
    const isP2Admin = p2User && (p2User.jabatan === 'admin' || p2User.jabatan === 'superadmin');

    // [1] Barang yang sedang dipegang / dipinjam oleh pemberi (pihak1)
    const giverAssets = assets.filter((a) => {
      if (isP1Admin) {
        return (a.owner_id === `GUDANG_${p1User?.branch}` && a.status_id === 1 && (a.kondisi || "").toUpperCase() === "BAIK") || a.owner_id === Number(pihak1.id);
      }
      return a.owner_id === Number(pihak1.id);
    });

    // [2] Semua barang IT/admin yang belum dipinjam siapapun
    //     Hanya tambahkan jika kondisinya BAIK dan Penerima BUKAN admin.
    const adminFreeAssets =
      !isP1Admin && !isP2Admin
        ? assets.filter((a) => a.owner_id === `GUDANG_${p1User?.branch}` && a.status_id === 1 && (a.kondisi || "").toUpperCase() === "BAIK")
        : [];

    // Gabungkan dan hilangkan duplikat berdasarkan serial number (code)
    const seenCodes = new Set();
    let resultAssets = [];
    for (const a of [...giverAssets, ...adminFreeAssets]) {
      if (!seenCodes.has(a.code)) {
        seenCodes.add(a.code);
        resultAssets.push(a);
      }
    }

    if (assetSearchQuery) {
      resultAssets = resultAssets.filter(
        (a) =>
          a.name.toLowerCase().includes(assetSearchQuery.toLowerCase()) ||
          a.code.toLowerCase().includes(assetSearchQuery.toLowerCase()),
      );
    }
    return resultAssets;
  }, [pihak1.id, assets, assetSearchQuery]);

  // Deteksi BAST antar cabang ke user non-admin
  const p2UserObj = pihak2.id ? mockUsers.find(u => u.id === Number(pihak2.id)) : null;
  const p1UserObj = pihak1.id ? mockUsers.find(u => u.id === Number(pihak1.id)) : null;
  const isP2AdminRole = p2UserObj && (
    (p2UserObj.jabatan || "").toLowerCase().includes('admin') ||
    (p2UserObj.jabatan || "").toLowerCase().includes('superadmin')
  );
  const isCrossBranch = p1UserObj && p2UserObj && p1UserObj.branch !== p2UserObj.branch;
  const isCrossBranchToNonAdmin = isCrossBranch && !isP2AdminRole;

  const addToDraft = (item) => {
    if (!pihak1.id || !pihak2.id) {
      alert("Pilih Pemberi dan Penerima terlebih dahulu.");
      return;
    }
    if (isCrossBranchToNonAdmin) {
      alert("Akses Ditolak: Anda tidak memiliki akses untuk memberikan barang ke user di cabang lain. Serah terima antar cabang hanya dapat dilakukan ke sesama Admin IT.");
      return;
    }
    if (baDraft.find((d) => d.item.code === item.code)) {
      alert("Barang ini sudah ada di daftar Berita Acara.");
      return;
    }
    setBaDraft([
      ...baDraft,
      { item, condition: item.kondisi || "BAIK", notes: "" },
    ]);
  };

  const updateDraftItem = (code, field, value) => {
    setBaDraft((prev) =>
      prev.map((d) => (d.item.code === code ? { ...d, [field]: value } : d)),
    );
  };

  const removeFromDraft = (code) => {
    setBaDraft(baDraft.filter((d) => d.item.code !== code));
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
        user: p1.name,
      });
      // Baris untuk Penerima
      rows.push({
        key: d.item.code + "-receiver",
        name: d.item.name,
        sn: d.item.code,
        status: "diterima",
        user: p2.name,
      });
    });
    return rows;
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) return;
    if (baDraft.length === 0) {
      alert("Tambahkan minimal satu barang ke daftar Berita Acara.");
      return;
    }
    setIsSaving(true);
    const finalDate =
      backdateMode === "now"
        ? new Date().toISOString()
        : new Date(backdateValue).toISOString();

    try {
      const returnItems = [];
      const borrowItems = [];

      baDraft.forEach((d) => {
        const p2User = mockUsers.find(u => u.id === Number(pihak2.id));
        const isP2Admin = p2User && (p2User.jabatan === 'admin' || p2User.jabatan === 'superadmin');
        const isReturn = isP2Admin || Number(pihak2.id) === d.item.previous_giver_id;

        if (isReturn) {
          returnItems.push({
              code: d.item.code,
              return_condition: d.condition,
              return_notes: d.notes || "",
          });
        } else {
          borrowItems.push({
            kd_barang: d.item.code,
            condition: d.condition,
            notes: d.notes || "",
          });
        }
      });

      if (returnItems.length > 0) {
        await transactionAPI.returnAsset({
          giver_id: Number(pihak1.id),
          receiver_id: Number(pihak2.id),
          return_date: finalDate,
          items: returnItems
        });
      }

      if (borrowItems.length > 0) {
        const payload = {
          giver_id: Number(pihak1.id),
          receiver_id: Number(pihak2.id),
          transaction_date: finalDate,
          items: borrowItems,
        };

        const res = await transactionAPI.create(payload);
        if (!res.data || !res.data.success) {
          throw new Error(res.data?.message || "Gagal menyimpan BAST");
        }
      }

      alert("Berhasil menyimpan Berita Acara Serah Terima (BAST).");
      if (onSave) {
        onSave();
      }
      setIsSaving(false);
      onBack();
    } catch (err) {
      console.error("Error saving BAST:", err);
      alert("Terjadi kesalahan saat menyimpan BAST ke database: " + (err.message || ""));
      setIsSaving(false);
    }
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

        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* ── SECTION 1: USER SELECTION ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              background: "#f8fafc",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Pemberi (Pihak 1) */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              <label
                style={{
                  ...S.flabel,
                  marginBottom: 0,
                  minWidth: "180px",
                  fontSize: ".75rem",
                }}
              >
                User Pemberi [Pihak 1]
              </label>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <SearchCombobox
                    options={userOptions1}
                    value={pihak1.id}
                    onChange={(id) => {
                      setPihak1({ ...pihak1, id });
                      setBaDraft([]);
                    }}
                    disabled={pihak1.locked}
                    placeholder="Pilih pemberi aset (branch Anda)..."
                    renderLabel={(o) => o.label}
                    renderSub={(o) => o.sub}
                  />
                </div>
                <button
                  onClick={() =>
                    setPihak1({ ...pihak1, locked: !pihak1.locked })
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1.5px solid #e2e8f0",
                    background: pihak1.locked ? "#fef3c7" : "#fff",
                    color: pihak1.locked ? "#d97706" : "#64748b",
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  {pihak1.locked ? <Icon.Lock /> : <Icon.Unlock />}
                </button>
              </div>
            </div>

            {/* Penerima (Pihak 2) */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              <label
                style={{
                  ...S.flabel,
                  marginBottom: 0,
                  minWidth: "180px",
                  fontSize: ".75rem",
                }}
              >
                User Penerima [Pihak 2]
              </label>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
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
                    renderLabel={(o) => (
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {o.label}
                        {o.isCross && (
                          <span style={{
                            fontSize: ".6rem", fontWeight: 800,
                            background: "#fef3c7", color: "#d97706",
                            border: "1px solid #fcd34d", borderRadius: 4,
                            padding: "1px 5px", whiteSpace: "nowrap", flexShrink: 0,
                          }}>
                            Cross-Branch
                          </span>
                        )}
                      </span>
                    )}
                    renderSub={(o) => o.sub}
                  />
                </div>
                <button
                  onClick={() =>
                    setPihak2({ ...pihak2, locked: !pihak2.locked })
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1.5px solid #e2e8f0",
                    background: pihak2.locked ? "#fef3c7" : "#fff",
                    color: pihak2.locked ? "#d97706" : "#64748b",
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  {pihak2.locked ? <Icon.Lock /> : <Icon.Unlock />}
                </button>
              </div>
            </div>

            {/* --- Tanggal Serah Terima (Backdate) --- */}
            {pihak1.id && (
              <div
                style={{
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  flexWrap: "wrap",
                }}
              >
                <label
                  style={{
                    fontSize: ".72rem",
                    fontWeight: 700,
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: ".04em",
                    margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
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
                      if (el) {
                        try {
                          el.showPicker();
                        } catch {
                          el.click();
                        }
                      }
                    }}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "7px",
                      border: "1.5px solid",
                      borderColor:
                        backdateMode === "custom" ? "#7c3aed" : "#cbd5e1",
                      background:
                        backdateMode === "custom" ? "#f3e8ff" : "#fff",
                      color: backdateMode === "custom" ? "#7c3aed" : "#94a3b8",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all .15s",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </button>
                  <input
                    id="bast-backdate-input"
                    type="datetime-local"
                    value={backdateValue}
                    max={nowISO()}
                    onChange={(e) => {
                      setBackdateValue(e.target.value);
                      setBackdateMode("custom");
                    }}
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
                <span
                  style={{
                    fontSize: ".73rem",
                    color: backdateMode === "custom" ? "#7c3aed" : "#16a34a",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {backdateMode === "now"
                    ? "Sekarang (" +
                    new Date().toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    }) +
                    ")"
                    : new Date(backdateValue).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>

                {backdateMode === "custom" && (
                  <button
                    onClick={() => {
                      setBackdateMode("now");
                      setBackdateValue(nowISO());
                    }}
                    style={{
                      fontSize: ".65rem",
                      color: "#2563eb",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: 0,
                    }}
                  >
                    Reset ke Sekarang
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── SECTION 2: DAFTAR BARANG MILIK PEMBERI ── */}
          {pihak1.id && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  ...S.fg,
                  background: "#eff6ff",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #bfdbfe",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <label
                    style={{ ...S.flabel, marginBottom: 0, color: "#1e40af" }}
                  >
                    Daftar Barang Milik:{" "}
                    <strong>{getUser(Number(pihak1.id)).name}</strong>
                  </label>
                  <div
                    style={{
                      fontSize: ".65rem",
                      color: "#60a5fa",
                      fontWeight: 600,
                    }}
                  >
                    {assetResults.length} barang ditemukan
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8",
                    }}
                  >
                    <Icon.Search />
                  </div>
                  <input
                    type="text"
                    value={assetSearchQuery}
                    onChange={(e) => setAssetSearchQuery(e.target.value)}
                    placeholder="Cari nama atau kode barang di list ini..."
                    style={{
                      ...S.finput,
                      paddingLeft: "35px",
                      fontSize: ".75rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ ...S.tableCard }}>
                <div
                  style={{
                    padding: "10px 15px",
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                    fontWeight: 700,
                    fontSize: ".7rem",
                  }}
                >
                  HASIL PENCARIAN BARANG
                </div>
                <table style={S.table}>
                  <thead style={S.thead}>
                    <tr>
                      <th style={{ ...S.th, width: 40 }}>No</th>
                      <th style={S.th}>ID Barang</th>
                      <th style={S.th}>Nama Barang</th>
                      <th style={S.th}>Pemilik</th>
                      <th style={{ ...S.th, width: 60 }}>CP/OP</th>
                      <th style={S.th}>Nama Pekerjaan</th>
                      <th style={{ ...S.th, width: 100 }}>Thn Pengadaan</th>
                      <th style={{ ...S.th, width: 80 }}>Kondisi</th>
                      <th style={{ ...S.th, width: 80 }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetResults.length === 0 || isCrossBranchToNonAdmin ? (
                      <tr>
                        <td
                          colSpan="9"
                          style={{
                            ...S.td,
                            textAlign: "center",
                            color: "#94a3b8",
                            padding: "2rem",
                          }}
                        >
                          {isCrossBranchToNonAdmin
                            ? `Akses Ditolak: Anda tidak memiliki akses untuk memberikan barang ke user di cabang lain. Serah terima antar cabang hanya dapat dilakukan ke sesama Admin IT.`
                            : assetSearchQuery
                            ? "Tidak ada barang yang cocok dengan pencarian."
                            : (() => {
                              const p1 = mockUsers.find((u) => String(u.id) === String(pihak1.id));
                              const p1IsAdmin = p1 && (p1.jabatan === 'admin' || p1.jabatan === 'superadmin');
                              const loggedInUserStr = localStorage.getItem("user");
                              const loggedInUser = loggedInUserStr ? JSON.parse(loggedInUserStr) : null;
                              const loggedBranch = loggedInUser?.branch_code || loggedInUser?.branches_code || "Jakarta";

                              if (p1IsAdmin && p1.branch !== loggedBranch && p1.branch) {
                                return `Sistem Isolasi Data Aktif: Anda tidak memiliki hak akses untuk melihat atau menarik barang dari Gudang ${p1.branch}.`;
                              }
                              return "User ini tidak memiliki barang untuk diserahterimakan.";
                            })()}
                        </td>
                      </tr>
                    ) : (
                      assetResults.map((item, idx) => {
                        const pkj = getPekerjaan(item.pekerjaan_kode);
                        const isInDraft = baDraft.some(
                          (d) => d.item.code === item.code,
                        );

                        // Dummy data if not present in mockAssets
                        const thnPengadaan = item.tahun_pengadaan || "2023";
                        const kondisi = item.kondisi || "BAIK";

                        return (
                          <tr
                            key={item.code}
                            style={{
                              ...S.tr,
                              background: isInDraft ? "#f0fdf4" : undefined,
                              opacity: isInDraft ? 0.6 : 1,
                              cursor: "default", // Non-clickable row
                            }}
                          >
                            <td style={{ ...S.td, textAlign: "center" }}>
                              {idx + 1}
                            </td>
                            <td style={S.td}>
                              <code style={S.code}>{item.code}</code>
                            </td>
                            <td
                              style={{
                                ...S.td,
                                fontWeight: 700,
                                fontSize: ".7rem",
                                color: "#1e293b",
                              }}
                            >
                              {item.name}
                            </td>
                            <td style={{ ...S.td, fontSize: ".7rem", color: "#475569" }}>
                              {(() => {
                                if (!item.owner_id || String(item.owner_id).startsWith("GUDANG_")) {
                                  return <span style={{ color: "#3b82f6", fontWeight: 600 }}>Admin IT</span>;
                                }
                                const ownerUser = mockUsers.find((u) => u.id === item.owner_id);
                                return ownerUser ? <span style={{ fontWeight: 600 }}>{ownerUser.name}</span> : "Unknown";
                              })()}
                            </td>
                            <td style={{ ...S.td, textAlign: "center" }}>
                              {pkj?.jenis ? (
                                <span
                                  style={{
                                    ...S.pill,
                                    background:
                                      pkj.jenis === "Capex"
                                        ? "#eff6ff"
                                        : "#f0fdf4",
                                    color:
                                      pkj.jenis === "Capex"
                                        ? "#2563eb"
                                        : "#16a34a",
                                  }}
                                >
                                  {pkj.jenis === "Capex" ? "CP" : "OP"}
                                </span>
                              ) : (
                                <span style={{ color: "#94a3b8" }}>—</span>
                              )}
                            </td>
                            <td
                              style={{
                                ...S.td,
                                maxWidth: "250px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              title={pkj?.nama}
                            >
                              {pkj?.nama || "—"}
                            </td>
                            <td style={{ ...S.td, textAlign: "center" }}>
                              {thnPengadaan}
                            </td>
                            <td style={{ ...S.td, textAlign: "center" }}>
                              <span
                                style={{
                                  fontSize: ".65rem",
                                  fontWeight: 700,
                                  color: conditionConfig[kondisi?.toUpperCase()]?.color || "#475569",
                                  background: conditionConfig[kondisi?.toUpperCase()]?.bg || "#f1f5f9",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                }}
                              >
                                {conditionConfig[kondisi?.toUpperCase()]?.label || kondisi}
                              </span>
                            </td>
                            <td style={S.td}>
                              {isInDraft ? (
                                <span
                                  style={{
                                    fontSize: ".65rem",
                                    color: "#16a34a",
                                    fontWeight: 700,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 3,
                                  }}
                                >
                                  <Icon.Check /> Dipilih
                                </span>
                              ) : (
                                <button
                                  onClick={() => addToDraft(item)}
                                  disabled={!pihak2.id}
                                  title={
                                    !pihak2.id
                                      ? "Pilih Penerima dulu"
                                      : "Pilih Barang"
                                  }
                                  style={{
                                    padding: "5px 12px",
                                    borderRadius: "6px",
                                    background: pihak2.id
                                      ? "#eff6ff"
                                      : "#f8fafc",
                                    border: "1.5px solid",
                                    borderColor: pihak2.id
                                      ? "#2563eb"
                                      : "#e2e8f0",
                                    color: pihak2.id ? "#2563eb" : "#cbd5e1",
                                    cursor: pihak2.id
                                      ? "pointer"
                                      : "not-allowed",
                                    fontSize: ".7rem",
                                    fontWeight: 700,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    transition: "all .15s",
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
            <div
              style={{
                ...S.tableCard,
                animation: "fadeIn 0.2s ease-in",
                border: "2px solid #2563eb",
              }}
            >
              <div
                style={{
                  padding: "10px 15px",
                  background: "#eff6ff",
                  borderBottom: "2px solid #2563eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 800,
                    color: "#1e293b",
                  }}
                >
                  TABEL BERITA ACARA (PREVIEW)
                </div>
                <button
                  onClick={() => setBaDraft([])}
                  style={{
                    fontSize: ".65rem",
                    color: "#ef4444",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Reset Semua
                </button>
              </div>
              <table style={S.table}>
                <thead style={{ ...S.thead, background: "#f8fafc" }}>
                  <tr>
                    <th style={{ ...S.th, width: 30 }}>No</th>
                    <th style={{ ...S.th, width: 110 }}>No.BAST</th>
                    <th style={{ ...S.th, width: 80 }}>Tgl BAST</th>
                    <th style={S.th}>Barang / ID Barang</th>
                    <th style={S.th}>Pemberi / Penerima</th>
                    <th style={{ ...S.th, width: 110 }}>Kondisi</th>
                    <th style={S.th}>Keterangan (Notes)</th>
                    <th style={{ ...S.th, width: 50 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {baDraft.map((d, i) => {
                    const bastNo = `BAST/${new Date().getFullYear()}/${((borrows?.length || 0) + 1 + i).toString().padStart(3, "0")}`;
                    const p1 = getUser(Number(pihak1.id));
                    const p2 = getUser(Number(pihak2.id));
                    const bastDate =
                      backdateMode === "now"
                        ? fmtDateShort(new Date().toISOString())
                        : fmtDateShort(backdateValue);

                    return (
                      <tr key={d.item.code} style={S.tr}>
                        <td
                          style={{
                            ...S.td,
                            textAlign: "center",
                            color: "#94a3b8",
                          }}
                        >
                          {i + 1}
                        </td>
                        <td style={S.td}>
                          <code
                            style={{
                              ...S.code,
                              color: "#1e293b",
                              background: "#f1f5f9",
                              fontSize: ".65rem",
                            }}
                          >
                            {bastNo}
                          </code>
                        </td>
                        <td
                          style={{
                            ...S.td,
                            fontSize: ".65rem",
                            color: "#64748b",
                          }}
                        >
                          {bastDate}
                        </td>
                        <td style={S.td}>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#2563eb",
                              fontSize: ".75rem",
                            }}
                          >
                            {d.item.name}
                          </div>
                          <code style={{ fontSize: ".6rem", color: "#64748b" }}>
                            {d.item.asset_code || d.item.code}
                          </code>
                        </td>
                        <td style={S.td}>
                          <div style={{ fontSize: ".7rem", color: "#64748b" }}>
                            P:{" "}
                            <strong style={{ color: "#1e293b" }}>
                              {p1.name}
                            </strong>
                          </div>
                          <div style={{ fontSize: ".7rem", color: "#64748b" }}>
                            R:{" "}
                            <strong style={{ color: "#1e293b" }}>
                              {p2.name}
                            </strong>
                          </div>
                        </td>
                        <td style={S.td}>
                          <select
                            value={d.condition || "BAIK"}
                            onChange={(e) =>
                              updateDraftItem(
                                d.item.code,
                                "condition",
                                e.target.value,
                              )
                            }
                            style={{
                              ...S.finput,
                              padding: "4px 8px",
                              fontSize: ".7rem",
                              height: "auto",
                            }}
                          >
                            <option value="BAIK">BAIK</option>
                            <option value="RUSAK">RUSAK</option>
                            <option value="HILANG">HILANG</option>
                          </select>
                        </td>
                        <td style={S.td}>
                          <input
                            type="text"
                            value={d.notes || ""}
                            onChange={(e) =>
                              updateDraftItem(
                                d.item.code,
                                "notes",
                                e.target.value,
                              )
                            }
                            placeholder='Contoh: "Terbentur meja"'
                            style={{
                              ...S.finput,
                              padding: "4px 8px",
                              fontSize: ".7rem",
                              height: "auto",
                            }}
                          />
                        </td>
                        <td style={{ ...S.td, textAlign: "center" }}>
                          <button
                            onClick={() => removeFromDraft(d.item.code)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#ef4444",
                              cursor: "pointer",
                            }}
                          >
                            <Icon.Trash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Dynamic Automated Narrative Section */}
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  borderTop: "2px solid #2563eb",
                  marginTop: "1px",
                }}
              >
                <div
                  style={{
                    fontSize: ".7rem",
                    fontWeight: 800,
                    color: "#64748b",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Icon.Edit /> Draft Narasi Berita Acara (Otomatis):
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    background: "#fff",
                    padding: "1.5rem",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
                  }}
                >
                  {baDraft.map((d, i) => {
                    const p1Name = getUser(Number(pihak1.id)).name || "—";
                    const p2Name = getUser(Number(pihak2.id)).name || "—";
                    const condText = (d.condition || "BAIK").toLowerCase();
                    const notesText = d.notes
                      ? ` dengan keterangan: "${d.notes}"`
                      : "";

                    return (
                      <div
                        key={i}
                        style={{
                          fontSize: ".8rem",
                          color: "#1e293b",
                          lineHeight: 1.6,
                          display: "flex",
                          gap: "12px",
                          paddingBottom: i === baDraft.length - 1 ? 0 : "12px",
                          borderBottom:
                            i === baDraft.length - 1
                              ? "none"
                              : "1px dashed #e2e8f0",
                        }}
                      >
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            background: "#eff6ff",
                            color: "#2563eb",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: ".65rem",
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </span>
                        <span>
                          Pihak Pertama (<strong>{p1Name}</strong>) menyerahkan
                          barang <strong>{d.item.name}</strong> dengan nomor
                          seri <code>{d.item.code}</code> kepada Pihak Kedua (
                          <strong>{p2Name}</strong>) dalam kondisi{" "}
                          <strong>{condText.toUpperCase()}</strong>
                          {notesText}.
                        </span>
                      </div>
                    );
                  })}

                  <div
                    style={{
                      marginTop: "8px",
                      paddingTop: "12px",
                      borderTop: "2px solid #f1f5f9",
                      fontSize: ".75rem",
                      fontStyle: "italic",
                      color: "#64748b",
                    }}
                  >
                    Demikian Berita Acara ini dibuat untuk dapat dipergunakan
                    sebagaimana mestinya.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={S.btnRow}>
          <button style={S.btnGhost} onClick={onBack}>
            Batal
          </button>
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
    borrows
      .filter((b) => !b.is_returned)
      .forEach((b) => {
        if (!userMap[b.receiver_id]) {
          userMap[b.receiver_id] = {
            user: getUser(b.receiver_id),
            count: 0,
          };
        }
        userMap[b.receiver_id].count++;
      });
    return Object.values(userMap).sort((a, b) => b.count - a.count);
  }, [borrows]);

  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      <div
        style={{
          ...S.pageHeader,
          background: "transparent",
          padding: "0 0 1.5rem 0",
        }}
      >
        <button style={S.backBtn} onClick={onBack}>
          <Icon.ArrowLeft /> Kembali
        </button>
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
              <th style={{ ...S.th, width: 140, textAlign: "center" }}>
                Jumlah Aset
              </th>
              <th style={{ ...S.th, textAlign: "center", width: 100 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activeReceivers.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    ...S.td,
                    textAlign: "center",
                    padding: "3rem",
                    color: "#94a3b8",
                  }}
                >
                  Tidak ada data user penerima aktif.
                </td>
              </tr>
            ) : (
              activeReceivers.map((item, idx) => (
                <tr
                  key={item.user.id}
                  style={S.tr}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#f8fafc")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td
                    style={{
                      ...S.td,
                      textAlign: "center",
                      color: "#94a3b8",
                      fontWeight: 700,
                    }}
                  >
                    {idx + 1}
                  </td>
                  <td style={S.td}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div
                        style={{
                          ...S.avatar,
                          background: "#f1f5f9",
                          color: "#64748b",
                        }}
                      >
                        {item.user.name.charAt(0)}
                      </div>
                      <div style={S.assetName}>{item.user.name}</div>
                    </div>
                  </td>
                  <td style={S.td}>
                    <code style={S.code}>{item.user.nip || "—"} / {item.user.id}</code>
                  </td>
                  <td style={S.td}>{item.user.branch}</td>
                  <td style={{ ...S.td, textAlign: "center" }}>
                    <span
                      style={{
                        ...S.pill,
                        background: "#eff6ff",
                        color: "#2563eb",
                      }}
                    >
                      {item.count} Perangkat
                    </span>
                  </td>
                  <td style={{ ...S.td, textAlign: "center" }}>
                    <button
                      onClick={() => onDetail(item.user)}
                      style={{
                        ...S.iconBtn,
                        color: "#2563eb",
                        margin: "0 auto",
                      }}
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
    const activeBorrows = borrows.filter(
      (b) => !b.is_returned && b.receiver_id === user.id,
    );
    return activeBorrows.map((b) => ({
      ...b,
      pkj: getPekerjaan(b.pekerjaan_kode),
      asset: getAsset(b.code),
    }));
  }, [user, borrows]);

  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      <div
        style={{
          ...S.pageHeader,
          background: "transparent",
          padding: "0 0 1.5rem 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button style={S.backBtn} onClick={onBack}>
            <Icon.ArrowLeft /> Kembali
          </button>
          <div>
            <h2 style={S.pageTitle}>{user.name}</h2>
            <p style={S.muted}>
              {user.nip || "—"} / {user.id} • {user.branch}
            </p>
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
              <th style={{ ...S.th, width: 90, textAlign: "center" }}>
                Thn Pengadaan
              </th>
              <th style={{ ...S.th, width: 80, textAlign: "center" }}>
                Kondisi
              </th>
            </tr>
          </thead>
          <tbody>
            {userAssets.map((item, idx) => (
              <tr key={idx} style={S.tr}>
                <td
                  style={{
                    ...S.td,
                    textAlign: "center",
                    color: "#94a3b8",
                    fontWeight: 700,
                  }}
                >
                  {idx + 1}
                </td>
                <td style={S.td}>
                  <div style={{ fontWeight: 600, color: "#1e293b" }}>
                    {item.asset?.name || item.name}
                  </div>
                </td>
                <td style={S.td}>
                  <code style={S.code}>{item.code}</code>
                </td>
                <td style={{ ...S.td, textAlign: "center" }}>
                  <span
                    style={{
                      ...S.pill,
                      background:
                        item.pkj?.jenis === "Capex" ? "#eff6ff" : "#f0fdf4",
                      color:
                        item.pkj?.jenis === "Capex" ? "#2563eb" : "#16a34a",
                    }}
                  >
                    {item.pkj?.jenis === "Capex" ? "CP" : "OP"}
                  </span>
                </td>
                <td style={{ ...S.td, maxWidth: "300px" }}>
                  <div
                    style={{
                      fontSize: ".75rem",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={item.pkj?.nama}
                  >
                    {item.pkj?.nama || "—"}
                  </div>
                </td>
                <td
                  style={{
                    ...S.td,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#64748b",
                  }}
                >
                  {item.asset?.tahun_pengadaan || "2023"}
                </td>
                <td style={{ ...S.td, textAlign: "center" }}>
                  {(() => {
                    const rawCond = (item.return_condition || item.condition || "").toUpperCase() || "BAIK";
                    let condKey = rawCond;
                    if (condKey === "GOOD") condKey = "BAIK";
                    if (condKey === "MINOR_DAMAGE" || condKey === "DAMAGED") condKey = "RUSAK";
                    if (condKey === "MISSING") condKey = "HILANG";

                    const cond = conditionConfig[condKey];
                    return (
                      <span
                        style={{
                          fontSize: ".68rem",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: cond?.bg || "#f1f5f9",
                          color: cond?.color || "#475569",
                          border: cond?.color ? `1px solid ${cond.color}40` : "none"
                        }}
                      >
                        {(cond?.label || rawCond).toUpperCase()}
                      </span>
                    );
                  })()}
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
function ReturnFormPage({ borrow, assets, onBack, onSave }) {
  if (!borrow) return null;
  const giver = getUser(borrow.giver_id);
  const receiver = getUser(borrow.receiver_id);
  const pekerjaan = getPekerjaan(borrow.pekerjaan_kode);
  const [form, setForm] = useState({
    return_date: new Date().toISOString().slice(0, 16),
    return_condition: "BAIK",
    return_notes: "",
    attachmentFile: null,
  });

  const handleSave = async () => {
    try {
      const payload = {
        code: borrow.code, // serial_number
        giver_id: Number(borrow.receiver_id), // receiver is now the giver returning the asset
        receiver_id: Number(borrow.giver_id), // giver is now the receiver getting back the asset
        return_date: form.return_date,
        return_condition: form.return_condition,
        return_notes: form.return_notes || "",
      };

      const res = await transactionAPI.returnAsset(payload);
      if (res.data && res.data.success) {
        alert("Pengembalian barang berhasil dicatat.");
        if (onSave) {
          onSave();
        }
        onBack();
      } else {
        alert(
          "Gagal mencatat pengembalian: " +
          (res.data.message || "Unknown error"),
        );
      }
    } catch (err) {
      console.error("Error returning asset:", err);
      alert(
        "Terjadi kesalahan saat menyimpan pengembalian barang ke database.",
      );
    }
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
      assets
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
function DeleteModal({ item, onBack, onConfirm }) {
  if (!item) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onBack}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: 400,
          borderRadius: 24,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
          padding: "2rem",
          animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
        <div style={{ ...S.btnRow, justifyContent: "center", marginTop: "1.5rem" }}>
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

// ─── PAGE: AVAILABLE ASSET LIST ────────────────────────────────
function AvailableAssetListPage({ borrows, returns = [], assets, onBack }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allAvailableAssets = useMemo(() => {
    const activeBorrows = borrows.filter(b => !b.is_returned);
    const borrowedSNs = new Set(activeBorrows.map(b => b.code));

    // Sort transactions by date descending to find the latest condition
    const allTxs = [...borrows, ...returns].sort((a, b) => {
      const d1 = new Date(a.return_date || a.borrow_date || a.transaction_date || 0);
      const d2 = new Date(b.return_date || b.borrow_date || b.transaction_date || 0);
      return d2 - d1;
    });

    return assets
      .filter(a => !borrowedSNs.has(a.code))
      .filter(a => {
        // Use backend condition which already incorporates the latest transaction (including MAINTENANCE)
        let latestCond = a.kondisi || a.condition || "BAIK";

        const st = latestCond.toUpperCase();
        return st === "BAIK" || st === "GOOD";
      })
      .map(a => ({
        ...a,
        pkj: getPekerjaan(a.pekerjaan_kode),
      }));
  }, [borrows, returns, assets]);

  const filteredAssets = useMemo(() => {
    const q = search.toLowerCase();
    return allAvailableAssets.filter(
      (a) =>
        (a.code || "").toLowerCase().includes(q) || (a.name || "").toLowerCase().includes(q),
    );
  }, [allAvailableAssets, search]);

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage) || 1;
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset to page 1 on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
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
          / Daftar Barang Available
        </span>
      </div>

      <div style={S.page}>
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h2 style={S.pageTitle}>
              <Icon.CheckCircle /> Barang Ready / Available
            </h2>
            <p style={{ fontSize: ".7rem", color: "#64748b", marginTop: 4 }}>
              Daftar stok barang yang siap didistribusikan
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <div style={{ ...S.searchWrap, width: 240, flex: "none" }}>
              <Icon.Search />
              <input
                placeholder="Cari SN atau Nama..."
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
                    display: "flex",
                  }}
                  onClick={() => setSearch("")}
                >
                  <Icon.Times />
                </button>
              )}
            </div>
            <div style={S.countBadge}>
              Total: <strong>{filteredAssets.length} Item</strong>
            </div>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead style={S.thead}>
              <tr>
                <th style={{ ...S.th, width: 40, textAlign: "center" }}>No</th>
                <th style={{ ...S.th, width: 140 }}>SN / Kode</th>
                <th style={S.th}>Nama Barang</th>
                <th style={{ ...S.th, width: 80, textAlign: "center" }}>
                  CP/OP
                </th>
                <th style={S.th}>Referensi Pengadaan</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssets.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      ...S.td,
                      textAlign: "center",
                      padding: "3rem",
                      color: "#94a3b8",
                    }}
                  >
                    {search
                      ? "Barang tidak ditemukan."
                      : "Semua barang sedang dipinjam."}
                  </td>
                </tr>
              ) : (
                paginatedAssets.map((item, idx) => {
                  const thn = item.pkj?.tahun_pengadaan || item.pkj?.tahun || item.tahun_pengadaan || "2024";
                  const realIdx = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <tr key={item.code} style={S.tr}>
                      <td
                        style={{
                          ...S.td,
                          textAlign: "center",
                          color: "#94a3b8",
                          fontWeight: 700,
                        }}
                      >
                        {realIdx}
                      </td>
                      <td style={S.td}>
                        <code style={S.code}>{item.code}</code>
                      </td>
                      <td style={S.td}>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>
                          {item.name}
                        </div>
                      </td>
                      <td style={{ ...S.td, textAlign: "center" }}>
                        {item.pkj?.jenis ? (
                          <span
                            style={{
                              ...S.pill,
                              background:
                                item.pkj.jenis === "Capex"
                                  ? "#eff6ff"
                                  : "#f0fdf4",
                              color:
                                item.pkj.jenis === "Capex"
                                  ? "#2563eb"
                                  : "#16a34a",
                            }}
                          >
                            {item.pkj.jenis === "Capex" ? "CP" : "OP"} {thn}
                          </span>
                        ) : (
                          <span style={{ color: "#94a3b8" }}>—</span>
                        )}
                      </td>
                      <td style={S.td}>
                        <div
                          style={{
                            fontSize: ".72rem",
                            color: "#64748b",
                            maxWidth: 300,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={item.pkj?.nama}
                        >
                          {item.pkj?.nama || "—"}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: ".74rem", color: "#64748b" }}>
            Menampilkan <strong>{paginatedAssets.length}</strong> dari{" "}
            <strong>{filteredAssets.length}</strong> item
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              style={{
                ...S.iconBtn,
                color: "#475569",
                border: "1px solid #e2e8f0",
                background: currentPage === 1 ? "#f8fafc" : "#fff",
                opacity: currentPage === 1 ? 0.4 : 1,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                padding: "6px 14px",
              }}
            >
              <Icon.ArrowLeft /> Prev
            </button>
            <div
              style={{
                fontSize: ".74rem",
                fontWeight: 700,
                color: "#1e293b",
                background: "#f1f5f9",
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #e2e8f0",
              }}
            >
              Page {currentPage} of {totalPages}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              style={{
                ...S.iconBtn,
                color: "#475569",
                border: "1px solid #e2e8f0",
                background: currentPage === totalPages ? "#f8fafc" : "#fff",
                opacity: currentPage === totalPages ? 0.4 : 1,
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                padding: "6px 14px",
              }}
            >
              Next <Icon.ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────
export default function Peminjaman() {
  const [borrows, setBorrows] = useState(() => JSON.parse(sessionStorage.getItem('SWR_AdminBorrows')) || []);
  const [returns, setReturns] = useState(() => JSON.parse(sessionStorage.getItem('SWR_AdminReturns')) || []);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("semua");
  const [filterMonth, setFilterMonth] = useState("semua");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterPekerjaan, setFilterPekerjaan] = useState("semua");
  const [nav, setNav] = useState(null);
  const [openCats, setOpenCats] = useState({});
  const [usersState, setUsersState] = useState(() => JSON.parse(sessionStorage.getItem('SWR_AdminUsers')) || mockUsers);
  const [assetsState, setAssetsState] = useState(() => JSON.parse(sessionStorage.getItem('SWR_AdminAssets')) || []);
  const [pekerjaanState, setPekerjaanState] = useState(() => JSON.parse(sessionStorage.getItem('SWR_AdminPekerjaan')) || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterYear, filterMonth]);

  if (usersState && usersState.length > 0) {
    mockUsers = usersState;
  }
  if (assetsState && assetsState.length > 0) {
    mockAssets = assetsState;
  }
  if (pekerjaanState && pekerjaanState.length > 0) {
    mockPekerjaan = pekerjaanState;
  }

  // Load BAST data from database on mount
  const loadData = async () => {
    try {
      // Fetch all required data concurrently for maximum speed
      const [projRes, txRes, userRes, barangRes] = await Promise.all([
        budgetAPI.getProjects().catch(e => { console.error("Error projects:", e); return { data: null }; }),
        transactionAPI.getAll().catch(e => { console.error("Error transactions:", e); return { data: null }; }),
        userAPI.getAll().catch(e => { console.error("Error users:", e); return { data: null }; }),
        barangAPI.getAll().catch(e => { console.error("Error assets:", e); return { data: null }; })
      ]);

      const dbProjects = {};
      if (projRes.data && projRes.data.success && Array.isArray(projRes.data.data)) {
        projRes.data.data.forEach(p => {
          dbProjects[String(p.kode)] = {
            id: p.id, kode: String(p.kode), nama: p.nama,
            no_anggaran: p.no_anggaran, jenis: p.jenis,
            tahun: p.tahun, tahun_pengadaan: p.tahun_pengadaan,
          };
        });
      }

      let fetchedBorrows = [];
      if (txRes.data && txRes.data.success) {
        fetchedBorrows = txRes.data.borrows || [];
        setBorrows(fetchedBorrows);
        setReturns(txRes.data.returns || []);
        sessionStorage.setItem('SWR_AdminBorrows', JSON.stringify(fetchedBorrows));
        sessionStorage.setItem('SWR_AdminReturns', JSON.stringify(txRes.data.returns || []));

        [...(txRes.data.borrows || []), ...(txRes.data.returns || [])].forEach((tx) => {
          if (tx.pekerjaan && tx.pekerjaan.kode && !dbProjects[String(tx.pekerjaan.kode)]) {
            dbProjects[String(tx.pekerjaan.kode)] = {
              id: tx.pekerjaan.id, kode: String(tx.pekerjaan.kode),
              nama: tx.pekerjaan.nama, no_anggaran: tx.pekerjaan.no_anggaran,
              jenis: tx.pekerjaan.jenis, tahun: tx.pekerjaan.tahun_pengadaan,
              tahun_pengadaan: tx.pekerjaan.tahun_pengadaan,
            };
          }
        });
      }
      setPekerjaanState(Object.values(dbProjects));
      sessionStorage.setItem('SWR_AdminPekerjaan', JSON.stringify(Object.values(dbProjects)));

      if (userRes.data && userRes.data.success && userRes.data.data) {
        const mappedUsers = userRes.data.data.map((u) => ({
          id: u.id, name: u.name, branch: u.branch_code || "Jakarta",
          jabatan: u.role_code || "User", nip: u.nip,
        }));
        setUsersState(mappedUsers);
        sessionStorage.setItem('SWR_AdminUsers', JSON.stringify(mappedUsers));
      }

      if (barangRes.data && Array.isArray(barangRes.data)) {
        const flattened = [];
        const activeBorrowsMap = new Map();
        fetchedBorrows.forEach((b) => {
          if (!b.is_returned) activeBorrowsMap.set(b.code, b);
        });

        barangRes.data.forEach((item) => {
          if (item.units && Array.isArray(item.units)) {
            item.units.forEach((u) => {
              const activeBorrow = activeBorrowsMap.get(u.kd_barang || u.serialNumber);
              flattened.push({
                code: u.kd_barang || u.serialNumber,
                serialNumber: u.serialNumber || "-",
                asset_code: item.id,
                name: item.name || "-",
                category: item.category || "",
                specs: item.specs || [],
                customSpecs: item.customSpecs || [],
                zone: u.location || "Gudang",
                pekerjaan_kode: u.id_pekerjaan || item.id_pekerjaan || "-",
                tahun_pengadaan: item.tahun_pengadaan || "-",
                kondisi: u.condition || "BAIK",
                status_id: activeBorrow ? 2 : 1,
                owner_id: activeBorrow ? activeBorrow.receiver_id : `GUDANG_${item.branch}`,
                previous_giver_id: activeBorrow ? activeBorrow.giver_id : null,
              });
            });
          }
        });
        setAssetsState(flattened);
        sessionStorage.setItem('SWR_AdminAssets', JSON.stringify(flattened));
      }
    } catch (err) {
      console.error("Error loading Peminjaman data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeBorrows = borrows.filter((b) => !b.is_returned);
  const allTransactions = [...borrows, ...returns];

  const availableYears = useMemo(() => {
    const years = new Set(allTransactions.map(b => {
      const dStr = b.return_date || b.borrow_date || "";
      return dStr ? dStr.substring(0, 4) : "";
    }).filter(y => y));
    return Array.from(years).sort().reverse();
  }, [allTransactions]);

  const availableMonths = [
    { v: "01", l: "Jan" }, { v: "02", l: "Feb" }, { v: "03", l: "Mar" },
    { v: "04", l: "Apr" }, { v: "05", l: "Mei" }, { v: "06", l: "Jun" },
    { v: "07", l: "Jul" }, { v: "08", l: "Agu" }, { v: "09", l: "Sep" },
    { v: "10", l: "Okt" }, { v: "11", l: "Nov" }, { v: "12", l: "Des" }
  ];

  const displayWaktu = filterYear === "semua" ? "Tanggal/Bulan" : 
    (filterMonth === "semua" ? `Tahun ${filterYear}` : `${availableMonths.find(m => m.v === filterMonth)?.l} ${filterYear}`);

  const filteredBorrows = allTransactions.filter((b) => {
    const q = search.toLowerCase();
    const giverObj = mockUsers.find(u => u.id === Number(b.giver_id)) || { name: "" };
    const receiverObj = mockUsers.find(u => u.id === Number(b.receiver_id)) || { name: "" };
    const bastStr = b.bast_number ? b.bast_number.toLowerCase() : "";

    const ms =
      (b.code || "").toLowerCase().includes(q) ||
      (b.name || "").toLowerCase().includes(q) ||
      (b.to_zone || "").toLowerCase().includes(q) ||
      bastStr.includes(q) ||
      (giverObj.name || "").toLowerCase().includes(q) ||
      (receiverObj.name || "").toLowerCase().includes(q);
    
    const dStr = b.return_date || b.borrow_date || "";
    const matchYear = filterYear === "semua" || dStr.startsWith(filterYear);
    const matchMonth = filterMonth === "semua" || (dStr && dStr.substring(5, 7) === filterMonth);
    
    return ms && matchYear && matchMonth;
  });

  const groupedTransactions = useMemo(() => {
    const groups = { };
    filteredBorrows.forEach((b) => {
      const dStr = b.return_date || b.borrow_date || "";
      const dateKey = dStr.includes("T")
      ? dStr.split("T")[0]
      : dStr.split(" ")[0] || "unknown";
      const key = b.bast_number || `${b.id}_${dateKey}`;
      if (!groups[key]) {
        groups[key] = {
          id: b.id,
          date: dStr || new Date().toISOString(),
          bast_number: b.bast_number || "",
          giver_id: b.giver_id,
          receiver_id: b.receiver_id,
          items: [],
          pekerjaan_kode: b.pekerjaan_kode,
          type: b.return_date ? "return" : "borrow",
        };
      }
      groups[key].items.push(b);
    });
    return Object.values(groups).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filteredBorrows]);

  const overdueCount = activeBorrows.filter((b) =>
    isOverdue(b.due_date),
  ).length;
  const handleSaveBorrow = () => {
    loadData();
  };
  const handleReturn = () => {
    loadData();
  };
  const handleDelete = async (id) => {
    try {
      const res = await transactionAPI.delete(id);
      if (res.data && res.data.success) {
        alert("Berhasil menghapus data transaksi.");
        loadData();
      } else {
        alert("Gagal menghapus data transaksi.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };
  const goBack = () => setNav(null);

  // ─── PAGE SWITCHER ──────────────────────────────────────────
  if (nav?.page === "borrow-detail")
    return (
      <div style={S.root}>
        <BorrowDetailPage
          data={nav.data}
          assets={assetsState}
          onBack={goBack}
          onEdit={(d) => setNav({ page: "borrow-form", data: d })}
          onReturn={(d) => setNav({ page: "return-form", data: d })}
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
          assets={assetsState}
          onBack={goBack}
          onSave={handleSaveBorrow}
          setNav={setNav}
        />
      </div>
    );

  if (nav?.page === "return-form")
    return (
      <div style={S.root}>
        <ReturnFormPage
          borrow={nav.data}
          assets={assetsState}
          onBack={goBack}
          onSave={handleReturn}
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

  if (nav?.page === "available-asset-list")
    return (
      <div style={S.root}>
        <AvailableAssetListPage borrows={borrows} returns={returns} assets={assetsState} onBack={goBack} />
      </div>
    );

  return (
    <div style={S.root}>
      <div style={S.header}>
        <div>
          <h1 style={S.title}>BAST Barang</h1>
          <p style={S.subtitle}>
            Kelola pencatatan BAST barang IT — peminjaman dan pengembalian per
            kategori
          </p>
        </div>
        <button
          style={{ ...S.btnBlue, padding: ".5rem 1.2rem", fontSize: ".84rem" }}
          onClick={() => setNav({ page: "borrow-form", data: null })}
        >
          <Icon.Plus /> Catat Serah Terima
        </button>
      </div>

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
            n: mockAssets.filter((a) => {
              const activeBorrow = activeBorrows.find((b) => b.code === a.code);
              const isAvailable = !activeBorrow || isITorAdmin(activeBorrow.receiver_id);
              const isGood = (a.kondisi || "").toUpperCase() === "BAIK";
              return isAvailable && isGood;
            }).length,
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
              cursor: s.onClick ? "pointer" : "default",
              transition: "all 0.2s ease",
              background: s.onClick ? `${s.c}08` : "#fff",
              border: s.onClick ? `1.5px solid ${s.c}20` : S.statCard.border,
            }}
            onMouseOver={(e) => {
              if (s.onClick) {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 20px -5px ${s.c}30`;
                e.currentTarget.style.background = `${s.c}15`;
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
                <div style={S.statN}>{s.n}</div>
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
            placeholder="Cari No. BAST, penerima, atau pemberi"
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
        <div style={{ position: "relative" }}>
          <div 
            style={{ ...S.filterWrap, cursor: "pointer", paddingRight: "1rem" }}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Icon.History />
            <span style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 600, minWidth: "110px", display: "inline-block" }}>
              {displayWaktu}
            </span>
          </div>

          {showDatePicker && (
            <div style={{
              position: "absolute", top: "110%", left: 0, background: "#fff", 
              border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1rem",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", zIndex: 100, width: "260px"
            }}>
               <div style={{ fontWeight: 600, fontSize: "0.8rem", marginBottom: "8px", color: "#1e293b" }}>Pilih Tahun</div>
               <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                  <button 
                    onClick={() => { setFilterYear("semua"); setFilterMonth("semua"); }}
                    style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", border: filterYear === "semua" ? "1px solid #2563eb" : "1px solid #e2e8f0", background: filterYear === "semua" ? "#eff6ff" : "#fff", color: filterYear === "semua" ? "#2563eb" : "#475569", cursor: "pointer" }}
                  >Semua</button>
                  {availableYears.map(y => (
                    <button 
                      key={y} onClick={() => { setFilterYear(y); if(filterMonth !== "semua") setFilterMonth("semua"); }}
                      style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", border: filterYear === y ? "1px solid #2563eb" : "1px solid #e2e8f0", background: filterYear === y ? "#eff6ff" : "#fff", color: filterYear === y ? "#2563eb" : "#475569", cursor: "pointer" }}
                    >{y}</button>
                  ))}
               </div>

               {filterYear !== "semua" && (
                 <>
                   <div style={{ fontWeight: 600, fontSize: "0.8rem", marginBottom: "8px", color: "#1e293b" }}>Pilih Bulan</div>
                   <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                      <button 
                        onClick={() => setFilterMonth("semua")}
                        style={{ padding: "4px", borderRadius: "4px", fontSize: "0.75rem", border: filterMonth === "semua" ? "1px solid #2563eb" : "1px solid #e2e8f0", background: filterMonth === "semua" ? "#eff6ff" : "#fff", color: filterMonth === "semua" ? "#2563eb" : "#475569", cursor: "pointer" }}
                      >Semua</button>
                      {availableMonths.map(m => (
                        <button 
                          key={m.v} onClick={() => setFilterMonth(m.v)}
                          style={{ padding: "4px", borderRadius: "4px", fontSize: "0.75rem", border: filterMonth === m.v ? "1px solid #2563eb" : "1px solid #e2e8f0", background: filterMonth === m.v ? "#eff6ff" : "#fff", color: filterMonth === m.v ? "#2563eb" : "#475569", cursor: "pointer" }}
                        >{m.l}</button>
                      ))}
                   </div>
                 </>
               )}
               
               <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
                 <button onClick={() => setShowDatePicker(false)} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer", fontWeight: 600 }}>Terapkan</button>
               </div>
            </div>
          )}
        </div>
        <div style={S.countBadge}>{filteredBorrows.length} barang</div>
      </div>

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
                  <td
                    colSpan="7"
                    style={{
                      ...S.td,
                      textAlign: "center",
                      padding: "3rem",
                      color: "#94a3b8",
                    }}
                  >
                    Tidak ada data serah terima yang ditemukan.
                  </td>
                </tr>
              ) : (
                (() => {
                  const totalPages = Math.ceil(groupedTransactions.length / itemsPerPage) || 1;
                  const paginatedTransactions = groupedTransactions.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  );
                  return paginatedTransactions.map((tx, idx) => {
                    const giver = getUser(tx.giver_id);
                    const receiver = getUser(tx.receiver_id);
                    const bastNo = tx.bast_number || `BAST/${new Date(tx.date).getFullYear()}/${(tx.id || 0).toString().padStart(3, "0")}`;
                    return (
                      <tr
                        key={idx}
                        style={S.tr}
                        onClick={() =>
                          setNav({ page: "borrow-detail", data: tx })
                        }
                      >
                        <td style={{ ...S.td, textAlign: "center" }}>
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        <td style={S.td}>
                          <code
                            style={{
                              ...S.code,
                              color: "#1e293b",
                              background: "#f1f5f9",
                            }}
                          >
                            {bastNo}
                          </code>
                        </td>
                        <td style={S.td}>{fmtDateShort(tx.date)}</td>
                        <td style={S.td}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <div
                              style={{
                                ...S.avatar,
                                background: "#f1f5f9",
                                color: "#64748b",
                              }}
                            >
                              {giver.name.charAt(0)}
                            </div>
                            <span style={{ fontWeight: 600 }}>{giver.name}</span>
                          </div>
                        </td>
                        <td style={S.td}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
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
                            <span style={{ fontWeight: 600 }}>
                              {receiver.name}
                            </span>
                          </div>
                        </td>
                        <td style={{ ...S.td, textAlign: "center" }}>
                          <span
                            style={{
                              background: "#f1f5f9",
                              color: "#64748b",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontWeight: 700,
                              fontSize: ".7rem",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {tx.items.length} Item
                          </span>
                        </td>
                        <td
                          style={{ ...S.td, textAlign: "center" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div style={S.actionRow}>
                            <button
                              style={{ ...S.iconBtn, color: "#2563eb" }}
                              title="Detail"
                              onClick={() =>
                                setNav({ page: "borrow-detail", data: tx })
                              }
                            >
                              <Icon.Eye />
                            </button>
                            <button
                              style={{ ...S.iconBtn, color: "#7c3aed" }}
                              title="Cetak BAST"
                              onClick={() => generateBAST(tx.items, tx.type || "borrow", assetsState)}
                            >
                              <Icon.Printer />
                            </button>
                            <button
                              style={{ ...S.iconBtn, color: "#dc2626" }}
                              title="Hapus"
                              onClick={() =>
                                setNav({ page: "delete", data: tx.items[0] })
                              }
                            >
                              <Icon.Trash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  });
                })()
              )}
            </tbody>
          </table>
        </div>
        {/* ── PAGINATION ── */}
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: ".74rem", color: "#64748b" }}>
            Menampilkan <strong>{Math.min(groupedTransactions.length, (currentPage - 1) * itemsPerPage + 1)}</strong> - <strong>{Math.min(groupedTransactions.length, currentPage * itemsPerPage)}</strong> dari{" "}
            <strong>{groupedTransactions.length}</strong> BAST
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              style={{
                ...S.iconBtn,
                color: "#475569",
                border: "1px solid #e2e8f0",
                background: currentPage === 1 ? "#f8fafc" : "#fff",
                opacity: currentPage === 1 ? 0.4 : 1,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                padding: "6px 14px",
              }}
            >
              <Icon.ArrowLeft /> Prev
            </button>
            <div
              style={{
                fontSize: ".74rem",
                fontWeight: 700,
                color: "#1e293b",
                background: "#f1f5f9",
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #e2e8f0",
              }}
            >
              Page {currentPage} of {Math.ceil(groupedTransactions.length / itemsPerPage) || 1}
            </div>
            <button
              disabled={currentPage === (Math.ceil(groupedTransactions.length / itemsPerPage) || 1)}
              onClick={() => setCurrentPage((p) => p + 1)}
              style={{
                ...S.iconBtn,
                color: "#475569",
                border: "1px solid #e2e8f0",
                background: currentPage === (Math.ceil(groupedTransactions.length / itemsPerPage) || 1) ? "#f8fafc" : "#fff",
                opacity: currentPage === (Math.ceil(groupedTransactions.length / itemsPerPage) || 1) ? 0.4 : 1,
                cursor: currentPage === (Math.ceil(groupedTransactions.length / itemsPerPage) || 1) ? "not-allowed" : "pointer",
                padding: "6px 14px",
              }}
            >
              Next <Icon.ArrowRight />
            </button>
          </div>
        </div>
      </div>
      {nav?.page === "delete" && (
        <DeleteModal item={nav.data} onBack={goBack} onConfirm={handleDelete} />
      )}
    </div>
  );
}
