import React, { useState, useMemo, useEffect, useRef } from "react";

// ── Icons ──────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, style, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    {Array.isArray(d) ? (
      d.map((dd, i) => <path key={i} d={dd} />)
    ) : (
      <path d={d} />
    )}
  </svg>
);

const I = {
  briefcase:
    "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  monitor:
    "M20 3H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 21h8M12 17v4",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  search: "m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  chevDown: "m6 9 6 6 6-6",
  chevUp: "m18 15-6-6-6 6",
  plus: "M5 12h14M12 5v14",
  x: "M18 6 6 18M6 6l12 12",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:
    "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  check: "M20 6 9 17l-5-5",
  package:
    "M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12",
  warning:
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0-3.42 0zM12 9v4M12 17h.01",
  calendar:
    "M8 2v4M16 2v4M3 10h18M21 8H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z",
  fileText:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  arrowLeft: "m12 19-7-7 7-7M19 12H5",
  database:
    "M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zM2 12c0 2.76 4.48 5 10 5s10-2.24 10-5M2 7c0 2.76 4.48 5 10 5s10-2.24 10-5",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01",
  checkCirc: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
};

// ── Helpers ──────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
const newId = () =>
  `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ── Mock asset database (for auto-fill) ──────────────────────────
const ASSET_DB = {
  "SPMT-KPT-DTC-SRV-01": {
    name: "Server Rack Kantor Pusat — Rack 1",
    brand: "Dell",
    model: "PowerEdge R750",
    category: "Server",
    location: "Kantor Pusat",
  },
  "SPMT-KPT-DTC-SRV-02": {
    name: "Server Rack Kantor Pusat — Rack 2",
    brand: "Dell",
    model: "PowerEdge R750",
    category: "Server",
    location: "Kantor Pusat",
  },
  "SPMT-KPT-DTC-PKR-01": {
    name: "Core Switch Data Center Kantor Pusat",
    brand: "Cisco",
    model: "Nexus 9300-48S",
    category: "Network",
    location: "Kantor Pusat",
  },
  "SPMT-PLT-GDG-PKR-01": {
    name: "Access Switch Pelindo Tower — Lantai 1-5",
    brand: "Cisco",
    model: "Catalyst 9200L-24P",
    category: "Network",
    location: "Pelindo Tower",
  },
  "SPMT-PLP-GDG-PKR-01": {
    name: "Access Switch Pelindo Place",
    brand: "Cisco",
    model: "Catalyst 9200L-24P",
    category: "Network",
    location: "Pelindo Place",
  },
  "SPMT-KPT-DTC-PKR-02": {
    name: "Firewall Data Center Kantor Pusat",
    brand: "Fortinet",
    model: "FortiGate 200F",
    category: "Security",
    location: "Kantor Pusat",
  },
  "SPMT-TJE-DTC-PKR-01": {
    name: "Core Switch Tanjung Emas",
    brand: "Cisco",
    model: "Catalyst 9300-24P",
    category: "Network",
    location: "Tanjung Emas",
  },
  "SPMT-GRK-DTC-PKR-01": {
    name: "Core Switch Gresik",
    brand: "Cisco",
    model: "Catalyst 9300-24P",
    category: "Network",
    location: "Gresik",
  },
  "SPMT-MLH-DTC-PKR-02": {
    name: "Core Switch Malahayati",
    brand: "Cisco",
    model: "Catalyst 9300-48P",
    category: "Network",
    location: "Malahayati",
  },
  "SPMT-LHK-DTC-PKR-02": {
    name: "Core Switch Lhokseumawe",
    brand: "Cisco",
    model: "Catalyst 9300-48P",
    category: "Network",
    location: "Lhokseumawe",
  },
  "SPMT-TBK-DTC-PKR-01": {
    name: "Core Switch Tanjung Balai Karimun",
    brand: "Cisco",
    model: "Catalyst 9300-24P",
    category: "Network",
    location: "Tanjung Balai Karimun",
  },
  "SPMT-TBK-DTC-PKR-02": {
    name: "Firewall UTM Tanjung Balai Karimun",
    brand: "Fortinet",
    model: "FortiGate 100F",
    category: "Security",
    location: "Tanjung Balai Karimun",
  },
};
const SN_DB = {
  "DELL-KPT-SRV-001": "SPMT-KPT-DTC-SRV-01",
  "DELL-KPT-SRV-002": "SPMT-KPT-DTC-SRV-02",
  "CSC-KPT-CSW-001": "SPMT-KPT-DTC-PKR-01",
  "CSC-PLT-ASW-001": "SPMT-PLT-GDG-PKR-01",
  "CSC-PLP-ASW-001": "SPMT-PLP-GDG-PKR-01",
  "FGT-KPT-FWL-001": "SPMT-KPT-DTC-PKR-02",
  "CSC-TJE-CSW-001": "SPMT-TJE-DTC-PKR-01",
  "CSC-GRK-CSW-001": "SPMT-GRK-DTC-PKR-01",
  "CSC-MLH-CSW-001": "SPMT-MLH-DTC-PKR-02",
  "CSC-LHK-CSW-001": "SPMT-LHK-DTC-PKR-02",
  "CSC-TBK-CSW-001": "SPMT-TBK-DTC-PKR-01",
  "FGT-TBK-FWL-001": "SPMT-TBK-DTC-PKR-02",
};

// ── Mock budget_masters data ──────────────────────────────────────
const BUDGET_MASTERS = [
  {
    kd_anggaran_master: "5030905000",
    nm_anggaran_master: "Beban Pemeliharaan Software",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5021300000",
    nm_anggaran_master: "Beban Jaringan dan Koneksi Data",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5021200000",
    nm_anggaran_master: "Beban Perlengkapan Kantor",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5030100000",
    nm_anggaran_master: "Beban Pemeliharaan Hardware",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5040200000",
    nm_anggaran_master: "Beban Jasa Konsultan IT",
    tipe_anggaran_master: "OPEX",
  },
];

// ── Mock Data ────────────────────────────────────────────────────
const INIT_CAPEX = [
  {
    id: "CAP-2440013",
    kode: "2440013",
    nama: "Penyiapan Infrastruktur IT Kantor Pusat & Branch",
    pagu: 0,
    thnAwal: 2024,
    thnAkhir: 2024,
    thnAnggaran: 2024,
    type: "capex",
    projects: [
      {
        id: "PKJ-2440013-001",
        nm_pekerjaan:
          "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
        nilai_rab: 0,
        nilai_kontrak: 2650000000,
        no_pr: "",
        no_po: "8260000074",
        no_kontrak: "SI.01/10/9/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-09-10",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "2024-09-06",
        tgl_bamk: "2024-09-06",
        assets: [
          {
            id: newId(),
            asset_code: "SPMT-KPT-DTC-SRV-01",
            serial_number: "DELL-KPT-SRV-001",
            name: "Server Rack Kantor Pusat — Rack 1",
            brand: "Dell",
            model: "PowerEdge R750",
            category: "Server",
            location: "Kantor Pusat",
            procurement_date: "2024-09-10",
            acquisition_value: 450000000,
          },
          {
            id: newId(),
            asset_code: "SPMT-KPT-DTC-SRV-02",
            serial_number: "DELL-KPT-SRV-002",
            name: "Server Rack Kantor Pusat — Rack 2",
            brand: "Dell",
            model: "PowerEdge R750",
            category: "Server",
            location: "Kantor Pusat",
            procurement_date: "2024-09-10",
            acquisition_value: 450000000,
          },
        ],
      },
    ],
  },
  {
    id: "CAP-2440014",
    kode: "2440014",
    nama: "Penyediaan Network di Branch SPMT",
    pagu: 3200000000,
    thnAwal: 2024,
    thnAkhir: 2024,
    thnAnggaran: 2024,
    type: "capex",
    projects: [
      {
        id: "PKJ-2440014-001",
        nm_pekerjaan:
          "Penyediaan Network di Branch SPMT (Malahayati, Lhokseumawe, Lembar, Parepare dan Garongkong)",
        nilai_rab: 1600000000,
        nilai_kontrak: 1500000000,
        no_pr: "",
        no_po: "6440000025",
        no_kontrak: "SI.01/15/8/5/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-15",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "2024-08-02",
        tgl_bamk: "2024-08-09",
        assets: [
          {
            id: newId(),
            asset_code: "SPMT-MLH-DTC-PKR-02",
            serial_number: "CSC-MLH-CSW-001",
            name: "Core Switch Malahayati",
            brand: "Cisco",
            model: "Catalyst 9300-48P",
            category: "Network",
            location: "Malahayati",
            procurement_date: "2024-08-15",
            acquisition_value: 320000000,
          },
        ],
      },
    ],
  },
  {
    id: "CAP-2440015",
    kode: "2440015",
    nama: "Implementasi dan Standarisasi IT Infrastruktur",
    pagu: 5800000000,
    thnAwal: 2024,
    thnAkhir: 2024,
    thnAnggaran: 2024,
    type: "capex",
    projects: [
      {
        id: "PKJ-2440015-001",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Planning & Control, CCTV dan SD-WAN Branch) PT Pelindo Multi Terminal",
        nilai_rab: 1250000000,
        nilai_kontrak: 1200000000,
        no_pr: "",
        no_po: "6440000026",
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-12",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "2024-08-02",
        tgl_bamk: "2024-08-06",
        assets: [],
      },
    ],
  },
  {
    id: "CAP-2540011",
    kode: "2540011",
    nama: "Transformasi dan Digitalisasi Operasional",
    pagu: 12000000000,
    thnAwal: 2025,
    thnAkhir: 2027,
    thnAnggaran: 2025,
    type: "capex",
    projects: [
      {
        id: "PKJ-2540011-001",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Roro pada Branch PT Pelindo Multi Terminal",
        nilai_rab: 4200000000,
        nilai_kontrak: 3950000000,
        no_pr: "8260000711",
        no_po: "6440000822",
        no_kontrak: "SI.01/7/7/4/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-07-07",
        durasi_kontrak: 120,
        no_sp3: "PD.05.01/30/6/3/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-06-30",
        tgl_bamk: "2025-07-01",
        assets: [],
      },
    ],
  },
  {
    id: "CAP-2540012",
    kode: "2540012",
    nama: "Pengembangan Infrastruktur Jaringan",
    pagu: 4500000000,
    thnAwal: 2025,
    thnAkhir: 2028,
    thnAnggaran: 2025,
    type: "capex",
    projects: [
      {
        id: "PKJ-2540012-001",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Perangkat Network Branch Tanjung Balai Karimun Terminal Selat Panjang PT Pelindo Multi Terminal",
        nilai_rab: 850000000,
        nilai_kontrak: 810000000,
        no_pr: "8260000734",
        no_po: "6430001555",
        no_kontrak: "PD.01/24/7/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-07-24",
        durasi_kontrak: 60,
        no_sp3: "PD.01/22/7/1/PGDN/DSDM/PLMT-25",
        tgl_sp3: "2025-07-22",
        tgl_bamk: "2025-08-01",
        assets: [
          {
            id: newId(),
            asset_code: "SPMT-TBK-DTC-PKR-01",
            serial_number: "CSC-TBK-CSW-001",
            name: "Core Switch Tanjung Balai Karimun",
            brand: "Cisco",
            model: "Catalyst 9300-24P",
            category: "Network",
            location: "Tanjung Balai Karimun",
            procurement_date: "2025-07-24",
            acquisition_value: 270000000,
          },
        ],
      },
    ],
  },
];

// OPEX data — field disesuaikan dengan budget_annual_opex + budget_masters
const INIT_OPEX = [
  {
    id: "OPX-1",
    // budget_annual_opex.kd_anggaran_master → relasi ke budget_masters
    kd_anggaran_master: "5030905000",
    // budget_masters.nm_anggaran_master (ditampilkan sebagai nama)
    nama: "Beban Pemeliharaan Software",
    // budget_annual_opex.thn_anggaran
    thn_anggaran: 2026,
    // budget_annual_opex.nilai_anggaran_tahunan (pagu)
    nilai_anggaran_tahunan: 350000000,
    type: "opex",
    transaksi: [
      {
        id: newId(),
        tanggal: "2026-02-10",
        keterangan: "Lisensi Antivirus Kaspersky",
        no_invoice: "INV/2026/015",
        aset: "",
        lampiran: "",
        jumlah: 8500000,
      },
      {
        id: newId(),
        tanggal: "2026-01-15",
        keterangan: "Pembayaran Lisensi Microsoft Office 365",
        no_invoice: "INV/2026/001",
        aset: "AST-OPX-0001",
        lampiran: "",
        jumlah: 15000000,
      },
    ],
  },
  {
    id: "OPX-2",
    kd_anggaran_master: "5021300000",
    nama: "Beban Jaringan dan Koneksi Data",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 288000000,
    type: "opex",
    transaksi: [
      {
        id: newId(),
        tanggal: "2026-01-05",
        keterangan: "Tagihan MPLS Januari 2026",
        no_invoice: "INV/2026/002",
        aset: "",
        lampiran: "",
        jumlah: 24000000,
      },
    ],
  },
  {
    id: "OPX-3",
    kd_anggaran_master: "5021200000",
    nama: "Beban Perlengkapan Kantor",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 120000000,
    type: "opex",
    transaksi: [],
  },
];

// ── CSS ──────────────────────────────────────────────────────────
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap");
:root {
  --blue:#1d4ed8;--blue-lt:#dbeafe;--blue-md:#93c5fd;
  --amber:#d97706;--amber-lt:#fef3c7;
  --green:#15803d;--green-lt:#dcfce7;
  --red:#dc2626;--red-lt:#fee2e2;
  --warn:#b45309;--warn-lt:#fef9c3;
  --ink:#0f172a;--ink2:#475569;--ink3:#94a3b8;
  --border:#e2e8f0;--surface:#fff;--bg:#f1f5f9;--bg2:#f8fafc;
  --font:"Plus Jakarta Sans",system-ui,sans-serif;
  --mono:"JetBrains Mono","Courier New",monospace;
  --shadow-sm:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
  --shadow-md:0 4px 12px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.04);
  --shadow-lg:0 12px 40px rgba(0,0,0,.14);
  --r-sm:6px;--r-md:10px;--r-lg:14px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font);background:var(--bg);color:var(--ink);font-size:14px}

/* ── PAGE ── */
.pg{padding:2rem 2.25rem;min-height:100vh}
.pg-header{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem}
.pg-title h1{font-size:1.55rem;font-weight:800;letter-spacing:-.5px}
.pg-title p{color:var(--ink3);font-size:.82rem;margin-top:4px}
.pg-header-right{display:flex;flex-direction:column;align-items:flex-end;gap:10px}

/* ── YEAR PILLS ── */
.year-wrap{display:flex;flex-direction:column;align-items:flex-end;gap:4px}
.year-label{font-size:.68rem;color:var(--ink3);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.year-pills{display:flex;background:white;border-radius:12px;padding:3px;gap:3px;box-shadow:0 2px 8px rgba(0,0,0,.07);border:1px solid var(--border)}
.year-pill{padding:6px 14px;border-radius:8px;border:none;cursor:pointer;font-size:.82rem;font-weight:500;background:transparent;color:var(--ink3);transition:all .2s;font-family:var(--font)}
.year-pill:hover:not(.active){background:var(--bg);color:var(--ink2)}
.year-pill.active{font-weight:700;background:linear-gradient(135deg,#1d4ed8,#2563eb);color:white;box-shadow:0 2px 8px rgba(29,78,216,.3);transform:translateY(-1px)}

/* ── TYPE TABS ── */
.type-tabs{display:flex;gap:3px;background:var(--surface);padding:3px;border-radius:var(--r-md);border:1px solid var(--border);box-shadow:var(--shadow-sm)}
.type-tab{display:flex;align-items:center;gap:5px;padding:6px 16px;border:none;background:transparent;border-radius:var(--r-sm);font-family:var(--font);font-size:.8rem;font-weight:700;color:var(--ink3);cursor:pointer;transition:all .2s}
.type-tab:hover{background:var(--bg);color:var(--ink2)}
.type-tab.active{background:var(--blue);color:#fff;box-shadow:0 2px 8px rgba(29,78,216,.3)}
.type-tab.all.active{background:linear-gradient(135deg,#1d4ed8,#7c3aed)}

/* ── FILTER BAR ── */
.filter-bar{display:flex;align-items:center;gap:10px;margin-bottom:1.25rem;flex-wrap:wrap}
.filter-section{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-md);padding:7px 12px;box-shadow:var(--shadow-sm)}
.filter-section label{font-size:.67rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink3);white-space:nowrap;display:flex;align-items:center;gap:5px}
.filter-select{border:none;background:transparent;font-family:var(--font);font-size:.8rem;color:var(--ink);outline:none;cursor:pointer;min-width:160px}
.filter-search{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-md);padding:7px 12px;box-shadow:var(--shadow-sm);flex:1;max-width:360px}
.filter-search:focus-within{border-color:var(--blue)}
.filter-search input{border:none;background:transparent;font-family:var(--font);font-size:.8rem;color:var(--ink);outline:none;flex:1}

/* ── TABLE ── */
.tbl-wrap{background:var(--surface);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--shadow-sm);overflow:hidden}
.tbl-header{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.5rem;border-bottom:1px solid var(--border);gap:1rem;flex-wrap:wrap}
.tbl-header h2{font-size:.95rem;font-weight:700}
.tbl-count{font-size:.75rem;color:var(--ink3);font-weight:500;margin-top:2px}
.tbl-scroll{overflow-x:auto}
.tbl{width:100%;border-collapse:collapse;font-size:.83rem}
.tbl thead th{background:var(--bg2);padding:11px 16px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--ink3);border-bottom:1px solid var(--border);white-space:nowrap}
.tbl td{padding:14px 16px;border-bottom:1px solid var(--border);vertical-align:middle}
.tbl tbody tr:last-child td{border-bottom:none}
.tbl-row{cursor:default;transition:background .15s}
.tbl-row:hover{background:#f8faff}
.tbl-empty{text-align:center;padding:3.5rem;color:var(--ink3);font-size:.85rem}

/* ── TYPE BADGE ── */
.type-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:4px;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.3px}
.type-badge.capex{background:#dbeafe;color:#1e40af}
.type-badge.opex{background:#d1fae5;color:#065f46}

/* ── CODE ── */
.code{font-family:var(--mono);font-size:.73rem;background:var(--bg);color:var(--ink2);padding:2px 7px;border-radius:4px;border:1px solid var(--border)}

/* ── ACTION BTNS ── */
.act-btns{display:flex;gap:5px;justify-content:flex-end;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:var(--r-sm);font-family:var(--font);font-size:.72rem;font-weight:700;cursor:pointer;border:none;transition:all .2s;white-space:nowrap}
.btn-view{background:var(--bg2);color:var(--ink2);border:1px solid var(--border)}
.btn-view:hover{background:var(--blue-lt);border-color:var(--blue);color:var(--blue)}
.btn-edit{background:var(--amber-lt);color:var(--amber);border:1px solid #fcd34d}
.btn-edit:hover{background:#fef08a;border-color:#f59e0b}
.btn-asset{background:var(--blue-lt);color:var(--blue);border:1px solid var(--blue-md)}
.btn-asset:hover{background:#bfdbfe}
.btn-delete{background:var(--red-lt);color:var(--red);border:1px solid #fca5a5}
.btn-delete:hover{background:#fecaca}
.btn-save{background:linear-gradient(135deg,var(--blue),#3b82f6);color:white;box-shadow:0 2px 8px rgba(29,78,216,.25)}
.btn-save:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(29,78,216,.4)}
.btn-cancel{background:white;color:var(--ink2);border:1px solid var(--border)}
.btn-cancel:hover{background:var(--bg)}
.btn-add{background:linear-gradient(135deg,var(--blue),#3b82f6);color:white;font-size:.75rem;padding:7px 14px;box-shadow:0 2px 8px rgba(29,78,216,.2)}
.btn-add:hover{transform:translateY(-1px)}
.btn-add-sm{background:linear-gradient(135deg,var(--blue),#3b82f6);color:white;font-size:.68rem;padding:4px 10px;box-shadow:0 1px 5px rgba(29,78,216,.2)}
.btn-add-sm:hover{transform:translateY(-1px)}
.btn-danger-sm{background:var(--red-lt);color:var(--red);border:1px solid #fca5a5;font-size:.68rem;padding:4px 10px}
.btn-danger-sm:hover{background:#fecaca}

/* ── INLINE EDIT ROW ── */
.edit-drawer>td{padding:0;border-bottom:2px solid var(--blue)}
.edit-panel{background:#f0f7ff;border-left:4px solid var(--blue);padding:1.4rem 1.6rem;animation:slideIn .2s ease-out}
.edit-panel-hdr{display:flex;align-items:center;gap:10px;margin-bottom:1.2rem;padding-bottom:.9rem;border-bottom:1px solid #c7d2fe}
.edit-panel-hdr h3{font-size:.9rem;font-weight:800;flex:1;color:var(--ink)}
.edit-section{margin-bottom:1.4rem}
.edit-section-title{display:flex;align-items:center;gap:7px;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--blue);margin-bottom:.8rem;padding-bottom:5px;border-bottom:1px solid #dbeafe}
.edit-grid{display:grid;gap:.8rem}
.g3{grid-template-columns:repeat(3,1fr)}
.g2{grid-template-columns:repeat(2,1fr)}
.g1{grid-template-columns:1fr}
.full{grid-column:1/-1}
.edit-field{display:flex;flex-direction:column;gap:5px}
.edit-field label{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink2)}
.edit-field input,.edit-field textarea,.edit-field select{padding:8px 10px;border:1px solid var(--border);border-radius:7px;font-family:var(--font);font-size:.82rem;color:var(--ink);outline:none;transition:all .2s;background:white}
.edit-field input:focus,.edit-field textarea:focus,.edit-field select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(29,78,216,.1)}
.edit-field input[readonly]{background:#f8fafc;color:var(--ink3)}
.edit-field textarea{resize:vertical;min-height:52px}
.edit-hint{font-size:.7rem;color:var(--green);font-weight:600;margin-top:2px}
.edit-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:1rem;padding-top:.9rem;border-top:1px solid #c7d2fe}

/* ── ASSET PAGE ── */
.asset-page{animation:slideIn .2s ease-out}
.asset-page-hdr{display:flex;align-items:center;gap:12px;margin-bottom:1.5rem}
.asset-page-hdr h2{font-size:1.2rem;font-weight:800;flex:1}
.asset-page-hdr p{font-size:.8rem;color:var(--ink3);margin-top:2px}
.asset-context{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-md);padding:1rem 1.2rem;margin-bottom:1.25rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.8rem}
.asset-ctx-item{display:flex;flex-direction:column;gap:3px}
.asset-ctx-item span{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink3)}
.asset-ctx-item strong{font-size:.82rem;font-weight:700;color:var(--ink)}
.asset-list{display:flex;flex-direction:column;gap:10px}
.asset-card{background:white;border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden}
.asset-card-hdr{display:flex;align-items:center;gap:8px;padding:9px 14px;background:var(--bg2);border-bottom:1px solid var(--border)}
.asset-card-hdr .num{font-size:.7rem;font-weight:700;color:var(--ink3)}
.asset-card-hdr .title{font-size:.78rem;font-weight:700;color:var(--ink);flex:1}
.asset-card-body{padding:12px 14px}
.autofill-banner{display:flex;align-items:center;gap:7px;background:#f0fdf4;border:1px solid #86efac;border-radius:var(--r-sm);padding:7px 12px;font-size:.75rem;color:var(--green);font-weight:600;margin-bottom:10px}
.autofill-field{background:#f0fdf4!important;border-color:#86efac!important}

/* ── MODAL CONFIRM ── */
.overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:9000;padding:20px;animation:fadeOvl .2s ease}
.confirm-box{background:white;border-radius:16px;padding:28px 24px;max-width:360px;width:100%;box-shadow:var(--shadow-lg);display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;animation:modalUp .22s cubic-bezier(.16,1,.3,1)}
.confirm-icon{width:50px;height:50px;background:#fff7ed;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#f97316}
.confirm-msg{font-size:.9rem;color:var(--ink);font-weight:500;line-height:1.5}
.confirm-actions{display:flex;gap:10px}

/* ── TOAST ── */
.toast{position:fixed;bottom:24px;right:24px;background:var(--green);color:white;padding:12px 20px;border-radius:12px;font-size:.82rem;font-weight:600;box-shadow:var(--shadow-lg);display:flex;align-items:center;gap:8px;z-index:9999;animation:toastIn .3s cubic-bezier(.16,1,.3,1)}

/* ── PILL / BADGE ── */
.pill{display:inline-flex;align-items:center;padding:2px 9px;border-radius:99px;font-size:.68rem;font-weight:700}
.pill.blue{background:var(--blue-lt);color:var(--blue)}
.pill.green{background:var(--green-lt);color:var(--green)}
.pill.amber{background:var(--amber-lt);color:var(--amber)}

/* ── PROJECT LIST HEADER ── */
.pl-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.1rem;flex-wrap:wrap;gap:.75rem}
.pl-header h2{font-size:1rem;font-weight:800;color:var(--ink)}
.pl-count{font-size:.78rem;color:var(--ink3);font-weight:500;margin-top:2px}
.pl-empty{background:var(--surface);border:2px dashed var(--border);border-radius:var(--r-lg);text-align:center;padding:4rem;color:var(--ink3);font-size:.88rem}

/* ── PROJECT CARDS STACK ── */
.pl-stack{display:flex;flex-direction:column;gap:1rem}

/* Individual card */
.pj-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-sm);overflow:hidden;transition:box-shadow .2s,transform .15s}
.pj-card:hover{box-shadow:var(--shadow-md);transform:translateY(-1px)}
.pj-card--editing{border-color:var(--blue);box-shadow:0 0 0 3px rgba(29,78,216,.1)}

/* Card header strip */
.pj-hdr{display:flex;align-items:flex-start;justify-content:space-between;gap:1.25rem;padding:1.1rem 1.4rem 1rem;border-bottom:1px solid var(--border)}
.pj-hdr-left{display:flex;flex-direction:column;gap:7px;flex:1;min-width:0}
.pj-badges{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.pj-name{font-size:.95rem;font-weight:700;color:#1e3a8a;line-height:1.55;margin:0}
.pj-hdr-right{display:flex;gap:6px;align-items:flex-start;flex-shrink:0}

/* Card body: info grid */
.pj-body{display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:0}
.pj-info{display:flex;flex-direction:column;gap:5px;padding:1rem 1.4rem;border-right:1px solid var(--border)}
.pj-info:last-child{border-right:none}
.pj-info-label{font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.55px;color:var(--ink3);display:flex;align-items:center;gap:4px}
.pj-info-val{font-size:.85rem;font-weight:600;color:var(--ink);line-height:1.4}
.pj-info-sub{font-size:.72rem;color:var(--ink3);margin-top:1px}
.pj-info-empty{font-size:.85rem;color:var(--ink3)}
.pj-nilai-big{font-size:1rem;font-weight:800;color:var(--red)}

/* Aset chip inside card */
.pj-aset-chip{display:inline-flex;align-items:center;gap:5px;background:var(--blue-lt);color:var(--blue);border-radius:8px;padding:4px 10px;font-size:.78rem;font-weight:700}
.pj-aset-chip.empty{background:var(--bg2);color:var(--ink3)}

/* Edit panel inside card */
.pj-edit-wrap{border-top:2px solid var(--blue);background:#f0f7ff;animation:slideIn .2s ease-out}

/* ── OPEX CARD ── */
.opex-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-sm);overflow:hidden;transition:box-shadow .2s,transform .15s}
.opex-card:hover{box-shadow:var(--shadow-md);transform:translateY(-1px)}
.opex-hdr{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.4rem;border-bottom:1px solid var(--border);cursor:pointer;user-select:none}
.opex-hdr-left{display:flex;flex-direction:column;gap:5px;flex:1;min-width:0}
.opex-title{font-size:.93rem;font-weight:700;color:var(--ink);line-height:1.4}
.opex-meta{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.opex-hdr-right{display:flex;gap:6px;align-items:center;flex-shrink:0}
.opex-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-bottom:1px solid var(--border)}
.opex-stat{display:flex;flex-direction:column;gap:4px;padding:.85rem 1.4rem;border-right:1px solid var(--border)}
.opex-stat:last-child{border-right:none}
.opex-stat-label{font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.55px;color:var(--ink3)}
.opex-stat-val{font-size:.95rem;font-weight:800}
.opex-stat-sub{font-size:.7rem;color:var(--ink3);margin-top:1px}
.opex-progbar{height:4px;background:var(--border);border-radius:99px;overflow:hidden;margin-top:5px}
.opex-progbar-fill{height:100%;border-radius:99px;background:var(--green);transition:width .4s ease}
/* Riwayat realisasi section */
.opex-body{animation:slideIn .18s ease-out}
.opex-body-hdr{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1.4rem;background:var(--bg2);border-bottom:1px solid var(--border)}
.opex-body-hdr span{font-size:.75rem;font-weight:700;color:var(--ink2);display:flex;align-items:center;gap:6px}
.rlz-tbl{width:100%;border-collapse:collapse;font-size:.8rem}
.rlz-tbl th{background:var(--bg2);padding:8px 14px;text-align:left;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink3);border-bottom:1px solid var(--border);white-space:nowrap}
.rlz-tbl th:last-child{text-align:right}
.rlz-tbl td{padding:10px 14px;border-bottom:1px solid var(--border);vertical-align:middle}
.rlz-tbl tbody tr:last-child td{border-bottom:none}
.rlz-tbl tbody tr:hover{background:#fafbff}
.rlz-jumlah{font-weight:700;color:var(--red);text-align:right}
.rlz-empty{text-align:center;padding:2.5rem;color:var(--ink3);font-size:.82rem}
/* ── REALISASI PAGE ── */
.rlz-page{animation:slideIn .2s ease-out}
.rlz-page-hdr{display:flex;align-items:center;gap:12px;margin-bottom:1.5rem}
.rlz-page-hdr h2{font-size:1.2rem;font-weight:800;flex:1}
.rlz-page-hdr p{font-size:.8rem;color:var(--ink3);margin-top:2px}
.rlz-form-card{background:white;border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden;margin-bottom:1.25rem}
.rlz-form-card-hdr{display:flex;align-items:center;gap:8px;padding:10px 16px;background:var(--bg2);border-bottom:1px solid var(--border)}
.rlz-form-card-hdr span{font-size:.78rem;font-weight:700;color:var(--ink);flex:1}
.rlz-form-body{padding:1.25rem 1.4rem}
.rlz-field{display:flex;flex-direction:column;gap:5px}
.rlz-field label{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink2)}
.rlz-field input,.rlz-field textarea,.rlz-field select{padding:8px 10px;border:1px solid var(--border);border-radius:7px;font-family:var(--font);font-size:.82rem;color:var(--ink);outline:none;transition:all .2s;background:white}
.rlz-field input:focus,.rlz-field textarea:focus,.rlz-field select:focus{border-color:var(--green);box-shadow:0 0 0 3px rgba(21,128,61,.1)}
.rlz-field textarea{resize:vertical;min-height:52px}
.rlz-dropzone{border:2px dashed var(--border);border-radius:8px;padding:18px 14px;text-align:center;cursor:pointer;background:var(--bg2);transition:all .2s}
.rlz-dropzone:hover,.rlz-dropzone.drag-over{border-color:var(--green);background:#f0fdf4}
.rlz-file-preview{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #86efac;border-radius:8px;background:#f0fdf4}

/* ── OPEX EDIT PANEL ── */
.opex-edit-wrap{border-top:2px solid var(--green);background:#f0fdf4;animation:slideIn .2s ease-out}
.opex-edit-panel{background:#f0fdf4;border-left:4px solid var(--green);padding:1.4rem 1.6rem}
.opex-edit-panel .edit-section-title{color:var(--green);border-color:#bbf7d0}
.opex-edit-panel .edit-field input:focus,
.opex-edit-panel .edit-field select:focus,
.opex-edit-panel .edit-field textarea:focus{border-color:var(--green);box-shadow:0 0 0 3px rgba(21,128,61,.1)}
.opex-edit-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:1rem;padding-top:.9rem;border-top:1px solid #bbf7d0}
.btn-save-green{background:linear-gradient(135deg,var(--green),#16a34a);color:white;box-shadow:0 2px 8px rgba(21,128,61,.25)}
.btn-save-green:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(21,128,61,.4)}

@media(max-width:900px){.opex-stats{grid-template-columns:1fr}}

@media(max-width:900px){
  .pj-body{grid-template-columns:1fr 1fr}
  .pj-info{border-bottom:1px solid var(--border)}
  .pj-info:nth-child(even){border-right:none}
}

/* ── SECTION DIVIDER ── */
.sec-divider{height:1px;background:var(--border);margin:1.2rem 0}

/* ── SUMMARY CARDS ── */
.summary-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem}
.sum-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:1.25rem 1.4rem;display:flex;align-items:center;gap:1rem;box-shadow:var(--shadow-sm);transition:box-shadow .2s}
.sum-card:hover{box-shadow:var(--shadow-md)}
.sum-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sum-icon.blue{background:var(--blue-lt);color:var(--blue)}
.sum-icon.green{background:var(--green-lt);color:var(--green)}
.sum-icon.amber{background:var(--amber-lt);color:var(--amber)}
.sum-body{flex:1;min-width:0}
.sum-label{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--ink3);margin-bottom:4px}
.sum-value{font-size:1.05rem;font-weight:800;color:var(--ink);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sum-sub{font-size:.7rem;color:var(--ink3);margin-top:4px;font-weight:500}
@media(max-width:768px){.summary-row{grid-template-columns:1fr}}

/* ── ANIMATIONS ── */
@keyframes slideIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeOvl{from{opacity:0}to{opacity:1}}
@keyframes modalUp{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes toastIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .pg{padding:1rem}
  .pg-header{flex-direction:column;align-items:flex-start}
  .pg-header-right{align-items:flex-start}
  .g3{grid-template-columns:1fr}
  .g2{grid-template-columns:1fr}
  .act-btns{flex-wrap:wrap}
}
`;

// ── Toast ────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <Icon d={I.check} size={15} />
      {msg}
    </div>
  );
}

// ── Confirm ──────────────────────────────────────────────────────
function Confirm({ msg, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <Icon d={I.warning} size={24} />
        </div>
        <p className="confirm-msg">{msg}</p>
        <div className="confirm-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            Batal
          </button>
          <button className="btn btn-delete" onClick={onConfirm}>
            <Icon d={I.trash} size={13} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Asset Entry Page ─────────────────────────────────────────────
function AssetEntryPage({ project, anggaran, onBack, onSave, showToast }) {
  const [assets, setAssets] = useState(
    (project.assets || []).map((a) => ({ ...a, _autofilled: false })),
  );
  const [confirm, setConfirm] = useState(null);

  const addAsset = () =>
    setAssets([
      ...assets,
      {
        id: newId(),
        asset_code: "",
        serial_number: "",
        name: "",
        brand: "",
        model: "",
        category: "",
        location: "",
        procurement_date: "",
        acquisition_value: "",
        _new: true,
        _autofilled: false,
      },
    ]);

  const update = (id, field, val) =>
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: val } : a)),
    );

  const tryAutofill = (id, field, val) => {
    setAssets((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        let updated = { ...a, [field]: val, _autofilled: false };
        let lookup = null;

        if (field === "asset_code" && val) {
          lookup = ASSET_DB[val.trim()];
        } else if (field === "serial_number" && val) {
          const code = SN_DB[val.trim()];
          if (code) {
            lookup = ASSET_DB[code];
            updated.asset_code = code;
          }
        }

        if (lookup) {
          updated = {
            ...updated,
            name: lookup.name,
            brand: lookup.brand,
            model: lookup.model,
            category: lookup.category,
            location: lookup.location,
            _autofilled: true,
          };
        }
        return updated;
      }),
    );
  };

  const remove = (id) => setAssets((prev) => prev.filter((a) => a.id !== id));

  const handleSave = () => {
    const cleaned = assets.map(({ _new, _autofilled, ...a }) => ({
      ...a,
      acquisition_value: parseFloat(a.acquisition_value) || 0,
    }));
    onSave(project.id, cleaned);
    showToast(`${cleaned.length} aset berhasil disimpan`);
    onBack();
  };

  const totalAset = assets.reduce(
    (s, a) => s + (parseFloat(a.acquisition_value) || 0),
    0,
  );

  return (
    <div className="asset-page">
      <div className="asset-page-hdr">
        <button
          className="btn btn-cancel"
          onClick={onBack}
          style={{ padding: "8px 14px", fontSize: ".8rem" }}
        >
          <Icon d={I.arrowLeft} size={14} /> Kembali
        </button>
        <div style={{ flex: 1 }}>
          <h2>
            <Icon
              d={I.package}
              size={18}
              style={{
                display: "inline",
                marginRight: 8,
                color: "var(--blue)",
              }}
            />
            Entry Aset Pekerjaan
          </h2>
          <p>{project.nm_pekerjaan?.substring(0, 80)}...</p>
        </div>
      </div>

      {/* Context bar */}
      <div className="asset-context">
        <div className="asset-ctx-item">
          <span>Anggaran</span>
          <strong>{anggaran.nama}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>No. Kontrak</span>
          <strong>{project.no_kontrak || "—"}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Nilai Kontrak</span>
          <strong style={{ color: "var(--red)" }}>
            {project.nilai_kontrak > 0 ? fmt(project.nilai_kontrak) : "—"}
          </strong>
        </div>
        <div className="asset-ctx-item">
          <span>Total Nilai Aset</span>
          <strong style={{ color: "var(--blue)" }}>{fmt(totalAset)}</strong>
        </div>
      </div>

      {/* Info autofill */}
      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "var(--r-sm)",
          padding: "9px 14px",
          marginBottom: "1rem",
          fontSize: ".78rem",
          color: "#1e40af",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Icon d={I.info} size={14} />
        <span>
          Masukkan <b>Kode Aset</b> atau <b>Serial Number</b> untuk mengisi
          otomatis field lainnya dari database inventaris.
        </span>
      </div>

      {/* Asset list */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: ".9rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--ink)" }}
          >
            Daftar Aset
          </span>
          <span className="pill blue">{assets.length} aset</span>
        </div>
        <button className="btn btn-add" onClick={addAsset}>
          <Icon d={I.plus} size={14} /> Tambah Aset
        </button>
      </div>

      <div className="asset-list">
        {assets.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem",
              color: "var(--ink3)",
              border: "2px dashed var(--border)",
              borderRadius: "var(--r-md)",
            }}
          >
            <Icon
              d={I.package}
              size={32}
              style={{ display: "block", margin: "0 auto 8px", opacity: 0.4 }}
            />
            <span style={{ fontSize: ".85rem" }}>
              Belum ada aset. Klik "+ Tambah Aset" untuk mulai.
            </span>
          </div>
        )}
        {assets.map((a, idx) => (
          <div key={a.id} className="asset-card">
            <div className="asset-card-hdr">
              <span className="num">Aset #{idx + 1}</span>
              {a._new && (
                <span className="pill green" style={{ fontSize: ".62rem" }}>
                  Baru
                </span>
              )}
              {a._autofilled && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: ".65rem",
                    background: "#f0fdf4",
                    color: "#15803d",
                    border: "1px solid #86efac",
                    borderRadius: 99,
                    padding: "2px 8px",
                    fontWeight: 700,
                  }}
                >
                  <Icon d={I.checkCirc} size={11} /> Auto-filled
                </span>
              )}
              <button
                className="btn btn-danger-sm"
                style={{ marginLeft: "auto" }}
                onClick={() =>
                  setConfirm({
                    msg: `Hapus aset "${a.name || a.asset_code || `#${idx + 1}`}"?`,
                    onConfirm: () => {
                      remove(a.id);
                      setConfirm(null);
                    },
                  })
                }
              >
                <Icon d={I.trash} size={12} /> Hapus
              </button>
            </div>
            <div className="asset-card-body">
              {a._autofilled && (
                <div className="autofill-banner">
                  <Icon d={I.checkCirc} size={14} />
                  Data aset ditemukan dan diisi otomatis dari database
                  inventaris!
                </div>
              )}
              <div className="edit-grid g3">
                <div className="edit-field">
                  <label>Kode Aset *</label>
                  <input
                    value={a.asset_code}
                    onChange={(e) =>
                      tryAutofill(a.id, "asset_code", e.target.value)
                    }
                    placeholder="SPMT-KPT-DTC-SRV-01"
                    className={a._autofilled ? "autofill-field" : ""}
                  />
                </div>
                <div className="edit-field">
                  <label>Serial Number</label>
                  <input
                    value={a.serial_number || ""}
                    onChange={(e) =>
                      tryAutofill(a.id, "serial_number", e.target.value)
                    }
                    placeholder="DELL-KPT-SRV-001"
                    className={a._autofilled ? "autofill-field" : ""}
                  />
                </div>
                <div className="edit-field">
                  <label>Tanggal Pengadaan</label>
                  <input
                    type="date"
                    value={a.procurement_date || ""}
                    onChange={(e) =>
                      update(a.id, "procurement_date", e.target.value)
                    }
                  />
                </div>
                <div className="edit-field full">
                  <label>Nama Aset *</label>
                  <input
                    value={a.name}
                    onChange={(e) => update(a.id, "name", e.target.value)}
                    placeholder="Nama aset lengkap"
                    className={a._autofilled ? "autofill-field" : ""}
                  />
                </div>
                <div className="edit-field">
                  <label>Merek</label>
                  <input
                    value={a.brand || ""}
                    onChange={(e) => update(a.id, "brand", e.target.value)}
                    placeholder="Dell, Cisco, ..."
                    className={a._autofilled ? "autofill-field" : ""}
                  />
                </div>
                <div className="edit-field">
                  <label>Model / Tipe</label>
                  <input
                    value={a.model || ""}
                    onChange={(e) => update(a.id, "model", e.target.value)}
                    placeholder="PowerEdge R750"
                    className={a._autofilled ? "autofill-field" : ""}
                  />
                </div>
                <div className="edit-field">
                  <label>Kategori</label>
                  <input
                    value={a.category || ""}
                    onChange={(e) => update(a.id, "category", e.target.value)}
                    placeholder="Server, Network, ..."
                    className={a._autofilled ? "autofill-field" : ""}
                  />
                </div>
                <div className="edit-field">
                  <label>Lokasi / Cabang</label>
                  <input
                    value={a.location || ""}
                    onChange={(e) => update(a.id, "location", e.target.value)}
                    placeholder="Kantor Pusat, Branch, ..."
                    className={a._autofilled ? "autofill-field" : ""}
                  />
                </div>
                <div className="edit-field">
                  <label>Nilai Perolehan (IDR)</label>
                  <input
                    type="number"
                    value={a.acquisition_value || ""}
                    onChange={(e) =>
                      update(a.id, "acquisition_value", e.target.value)
                    }
                    placeholder="0"
                  />
                  {a.acquisition_value > 0 && (
                    <span className="edit-hint">
                      ≈ {fmt(a.acquisition_value)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary & save */}
      {assets.length > 0 && (
        <div
          style={{
            marginTop: "1.2rem",
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-md)",
            padding: "1rem 1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: ".7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".5px",
                color: "var(--ink3)",
              }}
            >
              Total Nilai Aset
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "var(--blue)",
              }}
            >
              {fmt(totalAset)}
            </div>
          </div>
          {project.nilai_kontrak > 0 && (
            <div>
              <div
                style={{
                  fontSize: ".7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".5px",
                  color: "var(--ink3)",
                }}
              >
                Selisih vs Kontrak
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color:
                    totalAset <= project.nilai_kontrak
                      ? "var(--green)"
                      : "var(--red)",
                }}
              >
                {fmt(Math.abs(project.nilai_kontrak - totalAset))}
                <span
                  style={{
                    fontSize: ".72rem",
                    fontWeight: 500,
                    color: "var(--ink3)",
                    marginLeft: 6,
                  }}
                >
                  ({totalAset <= project.nilai_kontrak ? "sisa" : "melebihi"})
                </span>
              </div>
            </div>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button className="btn btn-cancel" onClick={onBack}>
              Batal
            </button>
            <button className="btn btn-save" onClick={handleSave}>
              <Icon d={I.save} size={14} /> Simpan Aset
            </button>
          </div>
        </div>
      )}

      {confirm && (
        <Confirm
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

// ── Realisasi Page (halaman penuh tambah/edit transaksi) ─────────
function RealisasiPage({ ang, editData, onBack, onSave, showToast }) {
  const isEdit = !!editData;
  const emptyForm = {
    tanggal: "",
    keterangan: "",
    no_invoice: "",
    aset: "",
    lampiran: "",
    jumlah: "",
  };
  const [form, setForm] = useState(
    isEdit ? { ...editData, jumlah: editData.jumlah || "" } : emptyForm,
  );
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // State untuk file lampiran (opsional)
  const [lampiranFile, setLampiranFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setLampiranFile(file);
      up("lampiran", file.name);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLampiranFile(file);
      up("lampiran", file.name);
    }
  };
  const handleRemoveFile = () => {
    setLampiranFile(null);
    up("lampiran", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const fmtFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const pagu = ang.nilai_anggaran_tahunan || 0;
  const totalSebelumnya = (ang.transaksi || [])
    .filter((t) => !isEdit || t.id !== editData.id)
    .reduce((s, t) => s + (t.jumlah || 0), 0);
  const jumlahInput =
    parseFloat(String(form.jumlah).replace(/[^\d.]/g, "")) || 0;
  const sisaSetelah = pagu - totalSebelumnya - jumlahInput;

  const handleSave = () => {
    if (!form.tanggal || !form.keterangan || !form.jumlah) return;
    const jumlah = parseFloat(String(form.jumlah).replace(/[^\d.]/g, "")) || 0;
    let newList;
    if (isEdit) {
      newList = ang.transaksi.map((t) =>
        t.id === editData.id ? { ...form, jumlah, id: editData.id } : t,
      );
    } else {
      newList = [...(ang.transaksi || []), { ...form, jumlah, id: newId() }];
    }
    onSave(ang.id, newList);
    showToast(
      isEdit
        ? "Transaksi realisasi diperbarui"
        : "Realisasi berhasil ditambahkan",
    );
    onBack();
  };

  return (
    <div className="rlz-page">
      <div className="rlz-page-hdr">
        <button
          className="btn btn-cancel"
          onClick={onBack}
          style={{ padding: "8px 14px", fontSize: ".8rem" }}
        >
          <Icon d={I.arrowLeft} size={14} /> Kembali
        </button>
        <div style={{ flex: 1 }}>
          <h2>
            <Icon
              d={I.fileText}
              size={18}
              style={{
                display: "inline",
                marginRight: 8,
                color: "var(--green)",
              }}
            />
            {isEdit ? "Edit Realisasi" : "Tambah Realisasi"}
          </h2>
          <p>
            {ang.nama} · Tahun Anggaran {ang.thn_anggaran}
          </p>
        </div>
      </div>

      {/* Context bar */}
      <div className="asset-context" style={{ marginBottom: "1.25rem" }}>
        <div className="asset-ctx-item">
          <span>Pos Anggaran</span>
          <strong>{ang.nama}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Kode Anggaran</span>
          <strong>
            <code className="code">{ang.kd_anggaran_master}</code>
          </strong>
        </div>
        <div className="asset-ctx-item">
          <span>Tahun Anggaran</span>
          <strong>{ang.thn_anggaran}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Nilai Anggaran Tahunan</span>
          <strong style={{ color: "var(--blue)" }}>{fmt(pagu)}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Sisa Setelah Input</span>
          <strong
            style={{ color: sisaSetelah >= 0 ? "var(--green)" : "var(--red)" }}
          >
            {fmt(Math.abs(sisaSetelah))}
            <span
              style={{
                fontSize: ".72rem",
                fontWeight: 500,
                color: "var(--ink3)",
                marginLeft: 4,
              }}
            >
              {sisaSetelah >= 0 ? "tersisa" : "melebihi"}
            </span>
          </strong>
        </div>
      </div>

      {/* Form card */}
      <div className="rlz-form-card">
        <div className="rlz-form-card-hdr">
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: "var(--green-lt)",
              color: "var(--green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon d={isEdit ? I.edit : I.plus} size={14} />
          </div>
          <span>
            {isEdit
              ? "Edit Data Transaksi Realisasi"
              : "Data Transaksi Realisasi Baru"}
          </span>
        </div>
        <div className="rlz-form-body">
          <div className="edit-grid g2" style={{ marginBottom: ".9rem" }}>
            <div className="rlz-field">
              <label>Tanggal Transaksi *</label>
              <input
                type="date"
                value={form.tanggal}
                onChange={(e) => up("tanggal", e.target.value)}
              />
            </div>
            <div className="rlz-field">
              <label>Keterangan *</label>
              <input
                value={form.keterangan}
                onChange={(e) => up("keterangan", e.target.value)}
                placeholder="Deskripsi transaksi realisasi..."
              />
            </div>
          </div>
          <div className="edit-grid g2" style={{ marginBottom: ".9rem" }}>
            <div className="rlz-field">
              <label>No. Invoice</label>
              <input
                value={form.no_invoice}
                onChange={(e) => up("no_invoice", e.target.value)}
                placeholder="INV/2026/001"
              />
            </div>
            <div className="rlz-field">
              <label>Jumlah (IDR) *</label>
              <input
                type="number"
                value={form.jumlah}
                onChange={(e) => up("jumlah", e.target.value)}
                placeholder="0"
              />
              {jumlahInput > 0 && (
                <span className="edit-hint">≈ {fmt(jumlahInput)}</span>
              )}
            </div>
          </div>
          <div className="edit-grid g2">
            <div className="rlz-field">
              <label>Aset Terkait</label>
              <input
                value={form.aset}
                onChange={(e) => up("aset", e.target.value)}
                placeholder="Kode aset (opsional)..."
              />
            </div>
            <div className="rlz-field">
              <label>
                Lampiran
                <span
                  style={{
                    fontSize: ".65rem",
                    fontWeight: 500,
                    color: "var(--ink3)",
                    marginLeft: 6,
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  opsional
                </span>
              </label>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {lampiranFile ? (
                /* Tampilan file sudah dipilih */
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    border: "1px solid #86efac",
                    borderRadius: 8,
                    background: "#f0fdf4",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 7,
                      flexShrink: 0,
                      background: "var(--green-lt)",
                      color: "var(--green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon d={I.fileText} size={17} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: ".82rem",
                        fontWeight: 700,
                        color: "var(--ink)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lampiranFile.name}
                    </div>
                    <div
                      style={{
                        fontSize: ".7rem",
                        color: "var(--ink3)",
                        marginTop: 2,
                      }}
                    >
                      {fmtFileSize(lampiranFile.size)}
                    </div>
                  </div>
                  <button
                    className="btn btn-danger-sm"
                    style={{ padding: "4px 8px", flexShrink: 0 }}
                    onClick={handleRemoveFile}
                    title="Hapus lampiran"
                  >
                    <Icon d={I.x} size={12} />
                  </button>
                </div>
              ) : (
                /* Drop zone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  style={{
                    border: `2px dashed ${dragOver ? "var(--green)" : "var(--border)"}`,
                    borderRadius: 8,
                    padding: "18px 14px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: dragOver ? "#f0fdf4" : "var(--bg2)",
                    transition: "all .2s",
                  }}
                >
                  <Icon
                    d={I.fileText}
                    size={22}
                    style={{
                      display: "block",
                      margin: "0 auto 7px",
                      color: dragOver ? "var(--green)" : "var(--ink3)",
                      opacity: dragOver ? 1 : 0.5,
                    }}
                  />
                  <div
                    style={{
                      fontSize: ".78rem",
                      color: dragOver ? "var(--green)" : "var(--ink2)",
                      fontWeight: 600,
                    }}
                  >
                    {dragOver
                      ? "Lepaskan file di sini"
                      : "Seret & lepas file, atau klik untuk pilih"}
                  </div>
                  <div
                    style={{
                      fontSize: ".68rem",
                      color: "var(--ink3)",
                      marginTop: 4,
                    }}
                  >
                    PDF, JPG, PNG, Excel, Word — maks. 10 MB
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer simpan */}
      <div
        style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-md)",
          padding: "1rem 1.4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div
            style={{
              fontSize: ".68rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".5px",
              color: "var(--ink3)",
            }}
          >
            Jumlah Transaksi
          </div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "var(--green)",
            }}
          >
            {fmt(jumlahInput)}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn btn-cancel" onClick={onBack}>
            Batal
          </button>
          <button
            className="btn btn-save-green"
            onClick={handleSave}
            style={{
              opacity:
                !form.tanggal || !form.keterangan || !form.jumlah ? 0.5 : 1,
            }}
          >
            <Icon d={I.save} size={14} />{" "}
            {isEdit ? "Perbarui Realisasi" : "Simpan Realisasi"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Edit Panel OPEX ──────────────────────────────────────────────
// Sesuai dengan tabel budget_annual_opex + relasi ke budget_masters
function EditOpexPanel({ ang, onSave, onCancel }) {
  const [form, setForm] = useState({
    kd_anggaran_master: ang.kd_anggaran_master || "",
    nama: ang.nama || "",
    thn_anggaran: ang.thn_anggaran || new Date().getFullYear(),
    nilai_anggaran_tahunan: ang.nilai_anggaran_tahunan || 0,
  });

  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Saat pilih kode anggaran master, nama otomatis terisi dari BUDGET_MASTERS
  const handleMasterChange = (kd) => {
    const master = BUDGET_MASTERS.find((m) => m.kd_anggaran_master === kd);
    setForm((f) => ({
      ...f,
      kd_anggaran_master: kd,
      nama: master ? master.nm_anggaran_master : f.nama,
    }));
  };

  const save = () => {
    onSave({
      kd_anggaran_master: form.kd_anggaran_master,
      nama: form.nama,
      thn_anggaran: parseInt(form.thn_anggaran) || new Date().getFullYear(),
      nilai_anggaran_tahunan: parseFloat(form.nilai_anggaran_tahunan) || 0,
    });
  };

  return (
    <div className="opex-edit-wrap">
      <div className="opex-edit-panel">
        <div className="edit-panel-hdr" style={{ borderColor: "#bbf7d0" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--green-lt)",
              color: "var(--green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon d={I.edit} size={15} />
          </div>
          <h3 style={{ color: "var(--green)" }}>Edit Pos Anggaran OPEX</h3>
          <button className="btn btn-cancel" onClick={onCancel}>
            <Icon d={I.x} size={13} /> Batal
          </button>
        </div>

        {/* Seksi 1: Referensi Anggaran Master */}
        <div className="edit-section">
          <div className="edit-section-title">
            <Icon d={I.database} size={13} /> Referensi Anggaran Master
          </div>
          <div className="edit-grid g2">
            <div className="edit-field">
              <label>Kode Anggaran Master *</label>
              <select
                value={form.kd_anggaran_master}
                onChange={(e) => handleMasterChange(e.target.value)}
              >
                <option value="">— Pilih Kode Anggaran —</option>
                {BUDGET_MASTERS.map((m) => (
                  <option
                    key={m.kd_anggaran_master}
                    value={m.kd_anggaran_master}
                  >
                    {m.kd_anggaran_master} — {m.nm_anggaran_master}
                  </option>
                ))}
              </select>
              <span
                style={{
                  fontSize: ".68rem",
                  color: "var(--ink3)",
                  marginTop: 2,
                }}
              >
                Berelasi ke tabel Anggaran Master (budget_masters)
              </span>
            </div>
            <div className="edit-field">
              <label>Nama Pos Anggaran *</label>
              <input
                value={form.nama}
                onChange={(e) => up("nama", e.target.value)}
                placeholder="Nama pos anggaran..."
              />
              <span
                style={{
                  fontSize: ".68rem",
                  color: "var(--ink3)",
                  marginTop: 2,
                }}
              >
                Terisi otomatis dari Anggaran Master, dapat diubah
              </span>
            </div>
          </div>
        </div>

        {/* Seksi 2: Detail Anggaran Tahunan */}
        <div className="edit-section">
          <div className="edit-section-title">
            <Icon d={I.calendar} size={13} /> Detail Anggaran Tahunan
          </div>
          <div className="edit-grid g2">
            <div className="edit-field">
              <label>Tahun Anggaran *</label>
              <input
                type="number"
                value={form.thn_anggaran}
                onChange={(e) => up("thn_anggaran", e.target.value)}
                placeholder="2026"
                min="2000"
                max="2099"
              />
            </div>
            <div className="edit-field">
              <label>Nilai Anggaran Tahunan (IDR) *</label>
              <input
                type="number"
                value={form.nilai_anggaran_tahunan || ""}
                onChange={(e) => up("nilai_anggaran_tahunan", e.target.value)}
                placeholder="0"
              />
              {form.nilai_anggaran_tahunan > 0 && (
                <span className="edit-hint">
                  ≈ {fmt(form.nilai_anggaran_tahunan)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="opex-edit-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            <Icon d={I.x} size={13} /> Batal
          </button>
          <button className="btn btn-save-green" onClick={save}>
            <Icon d={I.save} size={13} /> Simpan Anggaran OPEX
          </button>
        </div>
      </div>
    </div>
  );
}

// ── OPEX Card — riwayat realisasi per transaksi ─────────────────
function OpexCard({
  ang,
  onSave,
  onSaveOpex,
  showToast,
  onDelete,
  onOpenRealisasi,
}) {
  const [open, setOpen] = useState(false);
  const [showEditOpex, setShowEditOpex] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const totalRealisasi = (ang.transaksi || []).reduce(
    (s, t) => s + (t.jumlah || 0),
    0,
  );
  const pagu = ang.nilai_anggaran_tahunan || 0;
  const sisa = pagu - totalRealisasi;
  const pct = pagu > 0 ? Math.min((totalRealisasi / pagu) * 100, 100) : 0;
  const serapanColor =
    pct < 30 ? "var(--green)" : pct < 80 ? "var(--amber)" : "var(--red)";

  const deleteRow = (id) => {
    setConfirm({
      msg: "Hapus transaksi realisasi ini?",
      onConfirm: () => {
        onSave(
          ang.id,
          ang.transaksi.filter((t) => t.id !== id),
        );
        showToast("Transaksi dihapus");
        setConfirm(null);
      },
    });
  };

  const masterInfo = BUDGET_MASTERS.find(
    (m) => m.kd_anggaran_master === ang.kd_anggaran_master,
  );

  return (
    <div className="opex-card">
      {/* ── Header ── */}
      <div className="opex-hdr" onClick={() => setOpen((o) => !o)}>
        <div className="opex-hdr-left">
          <div className="opex-meta">
            <span className="type-badge opex">OPEX</span>
            <code className="code" style={{ fontSize: ".65rem" }}>
              {ang.kd_anggaran_master}
            </code>
            <span style={{ fontSize: ".72rem", color: "var(--ink3)" }}>
              Tahun Anggaran {ang.thn_anggaran}
            </span>
            {masterInfo && (
              <span
                style={{
                  fontSize: ".68rem",
                  color: "var(--ink3)",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "1px 7px",
                }}
              >
                {masterInfo.tipe_anggaran_master}
              </span>
            )}
          </div>
          <span className="opex-title">{ang.nama}</span>
        </div>
        <div className="opex-hdr-right" onClick={(e) => e.stopPropagation()}>
          <button
            className={`btn ${showEditOpex ? "btn-cancel" : "btn-edit"}`}
            onClick={() => {
              setShowEditOpex((v) => !v);
              if (!showEditOpex) setOpen(true);
            }}
          >
            <Icon d={showEditOpex ? I.x : I.edit} size={12} />
            {showEditOpex ? "Tutup" : "Edit"}
          </button>
          <button
            className="btn btn-add-sm"
            onClick={() => onOpenRealisasi(ang, null)}
          >
            <Icon d={I.plus} size={12} /> Tambah Realisasi
          </button>
          <button
            className="btn btn-delete"
            onClick={() => onDelete && onDelete(ang.id)}
          >
            <Icon d={I.trash} size={12} />
          </button>
          <Icon
            d={open ? I.chevUp : I.chevDown}
            size={16}
            style={{ color: "var(--ink3)", flexShrink: 0 }}
          />
        </div>
      </div>

      {/* ── Edit Panel OPEX ── */}
      {showEditOpex && (
        <EditOpexPanel
          ang={ang}
          onSave={(updated) => {
            onSaveOpex(ang.id, updated);
            showToast("Pos anggaran OPEX diperbarui");
            setShowEditOpex(false);
          }}
          onCancel={() => setShowEditOpex(false)}
        />
      )}

      {/* ── 3 summary stats ── */}
      <div className="opex-stats">
        <div className="opex-stat">
          <span className="opex-stat-label">Nilai Anggaran Tahunan</span>
          <span className="opex-stat-val" style={{ color: "var(--blue)" }}>
            {fmt(pagu)}
          </span>
          <span className="opex-stat-sub">Tahun {ang.thn_anggaran}</span>
        </div>
        <div className="opex-stat">
          <span className="opex-stat-label">Total Realisasi</span>
          <span className="opex-stat-val" style={{ color: "var(--red)" }}>
            {fmt(totalRealisasi)}
          </span>
          <span className="opex-stat-sub">{pct.toFixed(1)}% dari anggaran</span>
          <div className="opex-progbar">
            <div
              className="opex-progbar-fill"
              style={{ width: `${pct}%`, background: serapanColor }}
            />
          </div>
        </div>
        <div className="opex-stat">
          <span className="opex-stat-label">Sisa Anggaran</span>
          <span
            className="opex-stat-val"
            style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}
          >
            {fmt(Math.abs(sisa))}
          </span>
          <span className="opex-stat-sub">
            {sisa >= 0 ? "tersisa" : "melebihi anggaran"} ·{" "}
            {(ang.transaksi || []).length} transaksi
          </span>
        </div>
      </div>

      {/* ── Riwayat realisasi (collapsible) ── */}
      {open && (
        <div className="opex-body">
          <div className="opex-body-hdr">
            <span>
              <Icon d={I.calendar} size={13} /> Riwayat Realisasi{" "}
              <span className="pill green" style={{ marginLeft: 4 }}>
                {(ang.transaksi || []).length} Transaksi
              </span>
            </span>
          </div>
          <table className="rlz-tbl">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Keterangan</th>
                <th>No. Invoice</th>
                <th>Aset Terkait</th>
                <th>Lampiran</th>
                <th style={{ textAlign: "right" }}>Jumlah</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(ang.transaksi || []).length === 0 && (
                <tr>
                  <td colSpan="7" className="rlz-empty">
                    <Icon
                      d={I.fileText}
                      size={28}
                      style={{
                        display: "block",
                        margin: "0 auto 8px",
                        opacity: 0.3,
                      }}
                    />
                    Belum ada transaksi. Klik "+ Tambah Realisasi" untuk mulai.
                  </td>
                </tr>
              )}
              {(ang.transaksi || []).map((t) => (
                <tr key={t.id}>
                  <td
                    style={{
                      color: "var(--ink2)",
                      fontSize: ".78rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Icon
                      d={I.calendar}
                      size={11}
                      style={{ marginRight: 4, color: "var(--ink3)" }}
                    />
                    {fmtDate(t.tanggal)}
                  </td>
                  <td style={{ fontWeight: 500, color: "var(--ink)" }}>
                    {t.keterangan}
                  </td>
                  <td>
                    {t.no_invoice ? (
                      <code className="code" style={{ fontSize: ".68rem" }}>
                        {t.no_invoice}
                      </code>
                    ) : (
                      <span style={{ color: "var(--ink3)" }}>—</span>
                    )}
                  </td>
                  <td>
                    {t.aset ? (
                      <span
                        style={{
                          background: "var(--blue-lt)",
                          color: "var(--blue)",
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontSize: ".7rem",
                          fontWeight: 700,
                        }}
                      >
                        {t.aset}
                      </span>
                    ) : (
                      <span style={{ color: "var(--ink3)" }}>—</span>
                    )}
                  </td>
                  <td>
                    {t.lampiran ? (
                      <span
                        style={{
                          fontSize: ".75rem",
                          color: "var(--blue)",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {t.lampiran}
                      </span>
                    ) : (
                      <span style={{ color: "var(--ink3)" }}>—</span>
                    )}
                  </td>
                  <td className="rlz-jumlah">− {fmt(t.jumlah)}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        className="btn btn-edit"
                        style={{ padding: "4px 8px", fontSize: ".65rem" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRealisasi(ang, t);
                        }}
                      >
                        <Icon d={I.edit} size={11} />
                      </button>
                      <button
                        className="btn btn-delete"
                        style={{ padding: "4px 8px", fontSize: ".65rem" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteRow(t.id);
                        }}
                      >
                        <Icon d={I.trash} size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(ang.transaksi || []).length > 0 && (
                <tr style={{ background: "var(--bg2)" }}>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "right",
                      fontWeight: 700,
                      fontSize: ".78rem",
                      color: "var(--ink2)",
                      padding: "8px 14px",
                    }}
                  >
                    Total
                  </td>
                  <td
                    className="rlz-jumlah"
                    style={{ borderTop: "2px solid var(--border)" }}
                  >
                    {fmt(totalRealisasi)}
                  </td>
                  <td style={{ borderTop: "2px solid var(--border)" }}></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {confirm && (
        <Confirm
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

// ── Edit Panel — CAPEX only ──────────────────────────────────────
function EditProjectPanel({ project, onSave, onCancel, inCard }) {
  const [form, setForm] = useState({ ...project });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const save = () =>
    onSave({
      ...form,
      nilai_rab: parseFloat(form.nilai_rab) || 0,
      nilai_kontrak: parseFloat(form.nilai_kontrak) || 0,
      durasi_kontrak: parseInt(form.durasi_kontrak) || 0,
    });

  const inner = (
    <div className="edit-panel">
      <div className="edit-panel-hdr">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--blue-lt)",
            color: "var(--blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon d={I.edit} size={15} />
        </div>
        <h3>Edit Pekerjaan CAPEX</h3>
        <button className="btn btn-cancel" onClick={onCancel}>
          <Icon d={I.x} size={13} /> Batal
        </button>
      </div>
      <div className="edit-section">
        <div className="edit-section-title">
          <Icon d={I.fileText} size={13} /> Informasi Pekerjaan
        </div>
        <div className="edit-grid g1">
          <div className="edit-field full">
            <label>Nama Pekerjaan *</label>
            <textarea
              rows="3"
              value={form.nm_pekerjaan || ""}
              onChange={(e) => up("nm_pekerjaan", e.target.value)}
            />
          </div>
        </div>
        <div className="edit-grid g3" style={{ marginTop: ".8rem" }}>
          <div className="edit-field">
            <label>Nilai RAB (IDR)</label>
            <input
              type="number"
              value={form.nilai_rab || ""}
              onChange={(e) => up("nilai_rab", e.target.value)}
            />
            {form.nilai_rab > 0 && (
              <span className="edit-hint">≈ {fmt(form.nilai_rab)}</span>
            )}
          </div>
          <div className="edit-field">
            <label>Nilai Kontrak (IDR)</label>
            <input
              type="number"
              value={form.nilai_kontrak || ""}
              onChange={(e) => up("nilai_kontrak", e.target.value)}
            />
            {form.nilai_kontrak > 0 && (
              <span className="edit-hint">≈ {fmt(form.nilai_kontrak)}</span>
            )}
          </div>
          <div className="edit-field">
            <label>Durasi (Hari)</label>
            <input
              type="number"
              value={form.durasi_kontrak || ""}
              onChange={(e) => up("durasi_kontrak", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="edit-section">
        <div className="edit-section-title">
          <Icon d={I.fileText} size={13} /> Referensi Dokumen
        </div>
        <div className="edit-grid g3">
          <div className="edit-field">
            <label>No. PR</label>
            <input
              value={form.no_pr || ""}
              onChange={(e) => up("no_pr", e.target.value)}
              placeholder="8260000..."
            />
          </div>
          <div className="edit-field">
            <label>No. PO</label>
            <input
              value={form.no_po || ""}
              onChange={(e) => up("no_po", e.target.value)}
              placeholder="6440000..."
            />
          </div>
          <div className="edit-field">
            <label>No. Kontrak</label>
            <input
              value={form.no_kontrak || ""}
              onChange={(e) => up("no_kontrak", e.target.value)}
              placeholder="SI.01/..."
            />
          </div>
          <div className="edit-field">
            <label>Tanggal Kontrak</label>
            <input
              type="date"
              value={form.tgl_kontrak || ""}
              onChange={(e) => up("tgl_kontrak", e.target.value)}
            />
          </div>
          <div className="edit-field">
            <label>No. SP3</label>
            <input
              value={form.no_sp3 || ""}
              onChange={(e) => up("no_sp3", e.target.value)}
            />
          </div>
          <div className="edit-field">
            <label>Tanggal SP3</label>
            <input
              type="date"
              value={form.tgl_sp3 || ""}
              onChange={(e) => up("tgl_sp3", e.target.value)}
            />
          </div>
          <div className="edit-field">
            <label>Tanggal BAMK</label>
            <input
              type="date"
              value={form.tgl_bamk || ""}
              onChange={(e) => up("tgl_bamk", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="edit-actions">
        <button className="btn btn-cancel" onClick={onCancel}>
          <Icon d={I.x} size={13} /> Batal
        </button>
        <button className="btn btn-save" onClick={save}>
          <Icon d={I.save} size={13} /> Simpan Pekerjaan
        </button>
      </div>
    </div>
  );
  if (inCard) return inner;
  return (
    <tr className="edit-drawer">
      <td colSpan="8">{inner}</td>
    </tr>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function BudgetManagement() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [tahun, setTahun] = useState("all");
  const [anggaranFilter, setAnggaranFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [assetPage, setAssetPage] = useState(null);
  const [realisasiPage, setRealisasiPage] = useState(null); // { ang, editData }
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // Buka halaman tambah/edit realisasi OPEX
  // editData = null → tambah baru, editData = transaksi object → edit
  const handleOpenRealisasi = (ang, editData) => {
    setRealisasiPage({ ang, editData });
  };

  const [capexData, setCapexData] = useState(INIT_CAPEX);
  const [opexData, setOpexData] = useState(INIT_OPEX);

  const showToast = (msg) => setToast(msg);

  const currentYear = new Date().getFullYear();
  const yearOptions = [
    "all",
    String(currentYear - 3),
    String(currentYear - 2),
    String(currentYear - 1),
    String(currentYear),
  ];

  const allProjects = useMemo(() => {
    return capexData.flatMap((ang) =>
      ang.projects.map((p) => ({
        ...p,
        _angId: ang.id,
        _angNama: ang.nama,
        _angKode: ang.kode,
        _type: "capex",
        _thn: ang.thnAnggaran,
      })),
    );
  }, [capexData]);

  const filteredOpex = useMemo(() => {
    return opexData.filter((ang) => {
      if (tahun !== "all" && String(ang.thn_anggaran) !== tahun) return false;
      return true;
    });
  }, [opexData, tahun]);

  const tahunList = useMemo(() => {
    const s = new Set([
      ...capexData.map((a) => String(a.thnAnggaran)),
      ...opexData.map((a) => String(a.thn_anggaran)),
    ]);
    return Array.from(s).sort();
  }, [capexData, opexData]);

  const anggaranList = useMemo(() => {
    const filtered = allProjects.filter((p) => {
      if (tahun !== "all" && String(p._thn) !== tahun) return false;
      return true;
    });
    const map = new Map();
    filtered.forEach((p) => {
      if (!map.has(p._angId))
        map.set(p._angId, { id: p._angId, nama: p._angNama });
    });
    return Array.from(map.values());
  }, [allProjects, tahun]);

  const filteredProjects = useMemo(() => {
    if (typeFilter === "opex") return [];
    return allProjects.filter((p) => {
      if (tahun !== "all" && String(p._thn) !== tahun) return false;
      if (anggaranFilter !== "all" && p._angId !== anggaranFilter) return false;
      if (
        search &&
        !p.nm_pekerjaan?.toLowerCase().includes(search.toLowerCase()) &&
        !p.no_kontrak?.toLowerCase().includes(search.toLowerCase()) &&
        !p._angNama?.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [allProjects, typeFilter, tahun, anggaranFilter, search]);

  useEffect(() => {
    setAnggaranFilter("all");
  }, [typeFilter, tahun]);

  const summaryStats = useMemo(() => {
    const capexBase = allProjects.filter((p) => {
      if (tahun !== "all" && String(p._thn) !== tahun) return false;
      return true;
    });
    const opexBase = filteredOpex;
    const totalPaguCapex = capexData
      .filter((a) => tahun === "all" || String(a.thnAnggaran) === tahun)
      .reduce((s, a) => s + (a.pagu || 0), 0);
    const totalPaguOpex = opexBase.reduce(
      (s, a) => s + (a.nilai_anggaran_tahunan || 0),
      0,
    );
    const totalPagu =
      typeFilter === "opex"
        ? totalPaguOpex
        : typeFilter === "capex"
          ? totalPaguCapex
          : totalPaguCapex + totalPaguOpex;
    const totalKontrak = capexBase.reduce(
      (s, p) => s + (p.nilai_kontrak || 0),
      0,
    );
    const totalAset = capexBase.reduce(
      (s, p) =>
        s +
        (p.assets || []).reduce((ss, a) => ss + (a.acquisition_value || 0), 0),
      0,
    );
    const totalRealisasiOpex = opexBase.reduce(
      (s, a) =>
        s + (a.transaksi || []).reduce((ss, t) => ss + (t.jumlah || 0), 0),
      0,
    );
    return {
      totalPagu,
      totalKontrak,
      totalAset,
      totalRealisasiOpex,
      count: capexBase.length,
    };
  }, [allProjects, filteredOpex, capexData, typeFilter, tahun]);

  const getAnggaran = (angId, type) => {
    if (type === "capex") return capexData.find((a) => a.id === angId);
    return opexData.find((a) => a.id === angId);
  };

  const handleSaveOpexTransaksi = (angId, transaksi) => {
    setOpexData((prev) =>
      prev.map((a) => (a.id === angId ? { ...a, transaksi } : a)),
    );
  };

  // Handler edit data pos anggaran OPEX (kd_anggaran_master, nama, thn_anggaran, nilai_anggaran_tahunan)
  const handleSaveOpexData = (angId, updated) => {
    setOpexData((prev) =>
      prev.map((a) => (a.id === angId ? { ...a, ...updated } : a)),
    );
  };

  const handleDeleteOpex = (angId) => {
    setConfirm({
      msg: "Hapus pos anggaran OPEX ini beserta semua transaksinya?",
      onConfirm: () => {
        setOpexData((prev) => prev.filter((a) => a.id !== angId));
        showToast("Pos anggaran OPEX dihapus");
        setConfirm(null);
      },
    });
  };

  const handleSaveProject = (projId, updatedProj) => {
    setCapexData((prev) =>
      prev.map((ang) => ({
        ...ang,
        projects: ang.projects.map((p) =>
          p.id === projId ? { ...p, ...updatedProj } : p,
        ),
      })),
    );
    setEditingProject(null);
    showToast("Pekerjaan berhasil diperbarui");
  };

  const handleSaveAssets = (projId, assets) => {
    setCapexData((prev) =>
      prev.map((ang) => ({
        ...ang,
        projects: ang.projects.map((p) =>
          p.id === projId ? { ...p, assets } : p,
        ),
      })),
    );
  };

  const handleDeleteProject = (projId, angId, type) => {
    if (type === "capex")
      setCapexData((prev) =>
        prev.map((ang) =>
          ang.id === angId
            ? { ...ang, projects: ang.projects.filter((p) => p.id !== projId) }
            : ang,
        ),
      );
    showToast("Pekerjaan berhasil dihapus");
  };

  if (assetPage) {
    return (
      <>
        <style>{CSS}</style>
        <div className="pg">
          {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
          <AssetEntryPage
            project={assetPage.project}
            anggaran={assetPage.anggaran}
            onBack={() => setAssetPage(null)}
            onSave={handleSaveAssets}
            showToast={showToast}
          />
        </div>
      </>
    );
  }

  if (realisasiPage) {
    // Ambil data ang terbaru dari opexData (sudah bisa berubah)
    const angTerbaru =
      opexData.find((a) => a.id === realisasiPage.ang.id) || realisasiPage.ang;
    return (
      <>
        <style>{CSS}</style>
        <div className="pg">
          {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
          <RealisasiPage
            ang={angTerbaru}
            editData={realisasiPage.editData}
            onBack={() => setRealisasiPage(null)}
            onSave={handleSaveOpexTransaksi}
            showToast={showToast}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="pg">
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
        {confirm && (
          <Confirm
            msg={confirm.msg}
            onConfirm={confirm.onConfirm}
            onCancel={() => setConfirm(null)}
          />
        )}

        {/* Header */}
        <header className="pg-header">
          <div className="pg-title">
            <h1>Anggaran &amp; Pekerjaan</h1>
            <p>Monitoring list pekerjaan CAPEX / OPEX berdasarkan anggaran</p>
          </div>
          <div className="pg-header-right">
            <div className="year-wrap">
              <span className="year-label">Tahun Anggaran</span>
              <div className="year-pills">
                {yearOptions.map((y) => (
                  <button
                    key={y}
                    className={`year-pill ${tahun === y ? "active" : ""}`}
                    onClick={() => setTahun(y)}
                  >
                    {y === "all" ? "Semua" : y}
                  </button>
                ))}
              </div>
            </div>
            <div className="type-tabs">
              <button
                className={`type-tab all ${typeFilter === "all" ? "active" : ""}`}
                onClick={() => setTypeFilter("all")}
              >
                <Icon d={I.layers} size={14} /> Semua
              </button>
              <button
                className={`type-tab ${typeFilter === "capex" ? "active" : ""}`}
                onClick={() => setTypeFilter("capex")}
              >
                <Icon d={I.briefcase} size={14} /> CAPEX
              </button>
              <button
                className={`type-tab ${typeFilter === "opex" ? "active" : ""}`}
                onClick={() => setTypeFilter("opex")}
              >
                <Icon d={I.monitor} size={14} /> OPEX
              </button>
            </div>
          </div>
        </header>

        {/* Filter bar */}
        <div className="filter-bar">
          <div className="filter-section">
            <label>
              <Icon d={I.filter} size={12} /> Nama Anggaran
            </label>
            <select
              className="filter-select"
              value={anggaranFilter}
              onChange={(e) => setAnggaranFilter(e.target.value)}
            >
              <option value="all">Semua Anggaran</option>
              {anggaranList.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nama.length > 45
                    ? a.nama.substring(0, 45) + "..."
                    : a.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-search">
            <Icon d={I.search} size={15} />
            <input
              placeholder="Cari nama pekerjaan atau no. kontrak…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-row">
          <div className="sum-card">
            <div className="sum-icon blue">
              <Icon d={I.briefcase} size={20} />
            </div>
            <div className="sum-body">
              <div className="sum-label">Total Anggaran</div>
              <div className="sum-value">{fmt(summaryStats.totalPagu)}</div>
              <div className="sum-sub">{summaryStats.count} pekerjaan</div>
            </div>
          </div>
          <div className="sum-card">
            <div className="sum-icon amber">
              <Icon d={I.fileText} size={20} />
            </div>
            <div className="sum-body">
              <div className="sum-label">Total Realisasi Kontrak</div>
              <div className="sum-value">{fmt(summaryStats.totalKontrak)}</div>
              <div className="sum-sub">
                {summaryStats.totalPagu > 0
                  ? `${((summaryStats.totalKontrak / summaryStats.totalPagu) * 100).toFixed(1)}% dari anggaran`
                  : "—"}
              </div>
            </div>
          </div>
          <div className="sum-card">
            <div className="sum-icon green">
              <Icon d={I.package} size={20} />
            </div>
            <div className="sum-body">
              <div className="sum-label">Total Nilai Aset</div>
              <div className="sum-value">{fmt(summaryStats.totalAset)}</div>
              <div className="sum-sub">
                {summaryStats.totalKontrak > 0
                  ? `${((summaryStats.totalAset / summaryStats.totalKontrak) * 100).toFixed(1)}% dari kontrak`
                  : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* CAPEX Section */}
        {typeFilter !== "opex" && (
          <>
            <div className="pl-header">
              <div>
                <h2>Daftar Pekerjaan CAPEX</h2>
                <div className="pl-count">
                  {filteredProjects.length} pekerjaan ditemukan
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {tahun !== "all" && (
                  <span className="pill blue">Tahun {tahun}</span>
                )}
              </div>
            </div>

            {filteredProjects.length === 0 && (
              <div className="pl-empty">
                <Icon
                  d={I.search}
                  size={36}
                  style={{
                    opacity: 0.25,
                    display: "block",
                    margin: "0 auto 12px",
                  }}
                />
                Tidak ada pekerjaan CAPEX yang cocok dengan filter.
              </div>
            )}

            <div className="pl-stack">
              {filteredProjects.map((proj) => {
                const isEditing = editingProject === proj.id;
                const assetCount = (proj.assets || []).length;
                const assetTotal = (proj.assets || []).reduce(
                  (s, a) => s + (a.acquisition_value || 0),
                  0,
                );
                return (
                  <div
                    key={proj.id}
                    className={`pj-card${isEditing ? " pj-card--editing" : ""}`}
                  >
                    <div className="pj-hdr">
                      <div className="pj-hdr-left">
                        <div className="pj-badges">
                          <span className="type-badge capex">CAPEX</span>
                          <span
                            className="pill"
                            style={{
                              background: "var(--bg)",
                              color: "var(--ink3)",
                              fontSize: ".65rem",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {proj._thn}
                          </span>
                          <span
                            style={{ fontSize: ".72rem", color: "var(--ink3)" }}
                          >
                            {proj._angNama?.substring(0, 40)}
                            {proj._angNama?.length > 40 ? "…" : ""}
                          </span>
                          <code className="code" style={{ fontSize: ".65rem" }}>
                            {proj._angKode}
                          </code>
                        </div>
                        <p className="pj-name">{proj.nm_pekerjaan}</p>
                      </div>
                      <div className="pj-hdr-right">
                        <button
                          className={`btn ${isEditing ? "btn-cancel" : "btn-edit"}`}
                          onClick={() =>
                            setEditingProject(isEditing ? null : proj.id)
                          }
                        >
                          <Icon d={isEditing ? I.x : I.edit} size={13} />
                          {isEditing ? "Tutup" : "Edit"}
                        </button>
                        <button
                          className="btn btn-asset"
                          onClick={() => {
                            const ang = getAnggaran(proj._angId, proj._type);
                            setAssetPage({ project: proj, anggaran: ang });
                          }}
                        >
                          <Icon d={I.package} size={13} /> Entry Aset
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() =>
                            setConfirm({
                              msg: `Hapus pekerjaan "${proj.nm_pekerjaan?.substring(0, 40)}..."?`,
                              onConfirm: () => {
                                handleDeleteProject(
                                  proj.id,
                                  proj._angId,
                                  proj._type,
                                );
                                setConfirm(null);
                              },
                            })
                          }
                        >
                          <Icon d={I.trash} size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="pj-body">
                      <div className="pj-info">
                        <span className="pj-info-label">
                          <Icon d={I.briefcase} size={10} /> Nilai Kontrak
                        </span>
                        {proj.nilai_kontrak > 0 ? (
                          <span className="pj-nilai-big">
                            {fmt(proj.nilai_kontrak)}
                          </span>
                        ) : (
                          <span className="pj-info-empty">—</span>
                        )}
                        {proj.nilai_rab > 0 && (
                          <span className="pj-info-sub">
                            RAB: {fmt(proj.nilai_rab)}
                          </span>
                        )}
                      </div>
                      <div className="pj-info">
                        <span className="pj-info-label">
                          <Icon d={I.fileText} size={10} /> No. Kontrak
                        </span>
                        {proj.no_kontrak ? (
                          <code
                            className="code"
                            style={{
                              fontSize: ".72rem",
                              alignSelf: "flex-start",
                            }}
                          >
                            {proj.no_kontrak}
                          </code>
                        ) : (
                          <span className="pj-info-empty">—</span>
                        )}
                        {proj.no_po && (
                          <span className="pj-info-sub">PO: {proj.no_po}</span>
                        )}
                        {proj.no_pr && (
                          <span className="pj-info-sub">PR: {proj.no_pr}</span>
                        )}
                      </div>
                      <div className="pj-info">
                        <span className="pj-info-label">
                          <Icon d={I.calendar} size={10} /> Tanggal Kontrak
                        </span>
                        {proj.tgl_kontrak ? (
                          <span className="pj-info-val">
                            {fmtDate(proj.tgl_kontrak)}
                          </span>
                        ) : (
                          <span className="pj-info-empty">—</span>
                        )}
                        {proj.durasi_kontrak > 0 && (
                          <span className="pj-info-sub">
                            ⏱ {proj.durasi_kontrak} hari
                          </span>
                        )}
                        {proj.tgl_bamk && (
                          <span className="pj-info-sub">
                            BAMK: {fmtDate(proj.tgl_bamk)}
                          </span>
                        )}
                      </div>
                      <div className="pj-info">
                        <span className="pj-info-label">
                          <Icon d={I.package} size={10} /> Aset Tercatat
                        </span>
                        <span
                          className={`pj-aset-chip${assetCount === 0 ? " empty" : ""}`}
                        >
                          <Icon d={I.package} size={13} />
                          {assetCount} aset
                        </span>
                        {assetCount > 0 && (
                          <span
                            className="pj-info-sub"
                            style={{ color: "var(--blue)", fontWeight: 600 }}
                          >
                            {fmt(assetTotal)}
                          </span>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <div className="pj-edit-wrap">
                        <EditProjectPanel
                          project={proj}
                          onSave={(updated) =>
                            handleSaveProject(proj.id, updated)
                          }
                          onCancel={() => setEditingProject(null)}
                          inCard
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* OPEX Section */}
        {typeFilter !== "capex" && (
          <>
            {typeFilter === "all" && (
              <div
                className="sec-divider"
                style={{ margin: "1.75rem 0 1.25rem" }}
              />
            )}
            <div className="pl-header">
              <div>
                <h2>Pos Anggaran OPEX</h2>
                <div className="pl-count">
                  {filteredOpex.length} pos anggaran · klik untuk lihat riwayat
                  realisasi
                </div>
              </div>
              {tahun !== "all" && (
                <span className="pill green">Tahun Anggaran {tahun}</span>
              )}
            </div>

            {filteredOpex.length === 0 && (
              <div className="pl-empty">
                <Icon
                  d={I.search}
                  size={36}
                  style={{
                    opacity: 0.25,
                    display: "block",
                    margin: "0 auto 12px",
                  }}
                />
                Tidak ada pos anggaran OPEX untuk filter ini.
              </div>
            )}

            <div className="pl-stack">
              {filteredOpex.map((ang) => (
                <OpexCard
                  key={ang.id}
                  ang={ang}
                  onSave={handleSaveOpexTransaksi}
                  onSaveOpex={handleSaveOpexData}
                  showToast={showToast}
                  onDelete={handleDeleteOpex}
                  onOpenRealisasi={handleOpenRealisasi}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
