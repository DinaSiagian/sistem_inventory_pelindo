import React, { useState, useMemo, useEffect, useRef } from "react";

const Icon = ({ d, size = 16, style, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
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
    "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  monitor:
    "M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4M9 17l3 3 3-3M12 17v3",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevDown: "m6 9 6 6 6-6",
  chevUp: "m18 15-6-6-6 6",
  chevLeft: "m15 18-6-6 6-6",
  chevRight: "m9 18 6-6-6-6",
  plus: "M5 12h14M12 5v14",
  x: "M18 6 6 18M6 6l12 12",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:
    "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  check: "M20 6 9 17l-5-5",
  package:
    "M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12",
  warning:
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0-3.42 0zM12 9v4M12 17h.01",
  calendar:
    "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  fileText:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  arrowLeft: "m12 19-7-7 7-7M19 12H5",
  database:
    "M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zM2 12c0 2.76 4.48 5 10 5s10-2.24 10-5M2 7c0 2.76 4.48 5 10 5s10-2.24 10-5",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01",
  checkCirc: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  mapPin:
    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  hash: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  clock:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  image:
    "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-6 6.17a2.5 2.5 0 1 1-3.5 0 2.5 2.5 0 0 1 3.5 0zM11.5 14H10v4h1.5a1.5 1.5 0 1 0 0-3zm6 0h-1v4h1a2 2 0 1 0 0-4zm-3.5 0h-1v4h1a2 2 0 1 0 0-4zm-6.5-6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  table:
    "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  fileExcel:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M8 13l2.5 4M13.5 13 11 17M8 17l2.5-4M13.5 17 11 13",
};

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

function pctColor(p) {
  if (p >= 100) return "#ef4444";
  if (p >= 80) return "#f59e0b";
  if (p >= 50) return "#3b82f6";
  return "#22c55e";
}
function pctMeta(p) {
  if (p >= 100)
    return {
      label: "Over Budget",
      bg: "#fef2f2",
      fg: "#dc2626",
      border: "#fecaca",
    };
  if (p >= 80)
    return {
      label: "Near Limit",
      bg: "#fffbeb",
      fg: "#d97706",
      border: "#fde68a",
    };
  if (p >= 50)
    return {
      label: "On Track",
      bg: "#eff6ff",
      fg: "#2563eb",
      border: "#bfdbfe",
    };
  return { label: "Healthy", bg: "#f0fdf4", fg: "#16a34a", border: "#bbf7d0" };
}

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
  "SPMT-MLH-DTC-PKR-02": {
    name: "Core Switch Malahayati",
    brand: "Cisco",
    model: "Catalyst 9300-48P",
    category: "Network",
    location: "Malahayati",
  },
  "SPMT-TBK-DTC-PKR-01": {
    name: "Core Switch Tanjung Balai Karimun",
    brand: "Cisco",
    model: "Catalyst 9300-24P",
    category: "Network",
    location: "Tanjung Balai Karimun",
  },
  "SPMT-KPT-DTC-PKR-02": {
    name: "Firewall Data Center Kantor Pusat",
    brand: "Fortinet",
    model: "FortiGate 200F",
    category: "Security",
    location: "Kantor Pusat",
  },
};
const SN_DB = {
  "DELL-KPT-SRV-001": "SPMT-KPT-DTC-SRV-01",
  "DELL-KPT-SRV-002": "SPMT-KPT-DTC-SRV-02",
  "CSC-MLH-CSW-001": "SPMT-MLH-DTC-PKR-02",
  "CSC-TBK-CSW-001": "SPMT-TBK-DTC-PKR-01",
  "FGT-KPT-FWL-001": "SPMT-KPT-DTC-PKR-02",
};

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
    kd_anggaran_master: "5081500000",
    nm_anggaran_master: "Beban Jasa Konsultan",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5060700000",
    nm_anggaran_master: "Beban Sumber Daya Pihak Ketiga Peralatan",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5900100000",
    nm_anggaran_master: "Beban Investasi",
    tipe_anggaran_master: "OPEX",
  },
];

const CAPEX_BUDGETS = [
  {
    kode: "2440013",
    nama: "Penyiapan Infrastruktur IT Kantor Pusat & Branch",
    thnAnggaran: 2024,
  },
  {
    kode: "2440014",
    nama: "Penyediaan Network di Branch SPMT",
    thnAnggaran: 2024,
  },
  {
    kode: "2440015",
    nama: "Implementasi dan Standarisasi IT Infrastruktur",
    thnAnggaran: 2024,
  },
  {
    kode: "2440020",
    nama: "Revisi Capex (Pemeliharaan Infrastruktur)",
    thnAnggaran: 2024,
  },
  {
    kode: "2540011",
    nama: "Penyediaan Kebutuhan Perangkat Jaringan, SIEM & Gate System",
    thnAnggaran: 2025,
  },
  {
    kode: "2540012",
    nama: "Penyediaan Kebutuhan Transformasi dan Digitalisasi Terminal",
    thnAnggaran: 2025,
  },
  {
    kode: "2540013",
    nama: "Pengadaan Perangkat End User Computing (EUC)",
    thnAnggaran: 2025,
  },
];

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
        nm_pekerjaan: "Penyiapan Infrastruktur IT PT Pelindo Multi Terminal",
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
            image: null,
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
            image: null,
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
        nm_pekerjaan: "Penyediaan Network di Branch SPMT",
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
            image: null,
          },
        ],
      },
    ],
  },
  {
    id: "CAP-2440015",
    kode: "2440015",
    nama: "Implementasi dan Standarisasi IT Infrastruktur",
    pagu: 1500000000,
    thnAwal: 2024,
    thnAkhir: 2024,
    thnAnggaran: 2024,
    type: "capex",
    projects: [
      {
        id: "PKJ-2440015-001",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Planning & Control, CCTV dan SD-WAN Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_rab: 0,
        nilai_kontrak: 1250000000,
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
      {
        id: "PKJ-2440015-002",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong)",
        nilai_rab: 0,
        nilai_kontrak: 850000000,
        no_pr: "",
        no_po: "6440000027",
        no_kontrak: "SI.01/14/8/3/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-14",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "2024-08-05",
        tgl_bamk: "2024-08-10",
        assets: [],
      },
    ],
  },
  {
    id: "CAP-2440020",
    kode: "2440020",
    nama: "Revisi Capex (Pemeliharaan Infrastruktur)",
    pagu: 500000000,
    thnAwal: 2024,
    thnAkhir: 2024,
    thnAnggaran: 2024,
    type: "capex",
    projects: [],
  },
  {
    id: "CAP-2540011",
    kode: "2540011",
    nama: "Penyediaan Kebutuhan Perangkat Jaringan, SIEM & Gate System",
    pagu: 4500000000,
    thnAwal: 2025,
    thnAkhir: 2025,
    thnAnggaran: 2025,
    type: "capex",
    projects: [
      {
        id: "PKJ-2540011-001",
        nm_pekerjaan:
          "Penyediaan Kebutuhan Perangkat Jaringan, Security Information and Management (SIEM) dan Perangkat Pendukung Gate System PT Pelindo Multi Terminal",
        nilai_rab: 0,
        nilai_kontrak: 4200000000,
        no_pr: "8260001121",
        no_po: "6440000839",
        no_kontrak: "PD.01/28/10/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-10-28",
        durasi_kontrak: 60,
        no_sp3: "PD.01/23/10/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-10-23",
        tgl_bamk: "2025-10-02",
        assets: [],
      },
    ],
  },
  {
    id: "CAP-2540012",
    kode: "2540012",
    nama: "Penyediaan Kebutuhan Transformasi dan Digitalisasi Terminal",
    pagu: 3500000000,
    thnAwal: 2025,
    thnAkhir: 2025,
    thnAnggaran: 2025,
    type: "capex",
    projects: [
      {
        id: "PKJ-2540012-001",
        nm_pekerjaan:
          "Penyediaan Kebutuhan Transformasi dan Digitalisasi (CCTV dan Public Announcer Traffic Monitoring pada Gate) Branch Belawan, Dumai, Malahayati, Lhokseumawe",
        nilai_rab: 0,
        nilai_kontrak: 3100000000,
        no_pr: "8260001150",
        no_po: "6440000850",
        no_kontrak: "PD.02/15/11/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-11-15",
        durasi_kontrak: 90,
        no_sp3: "PD.02/10/11/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-11-10",
        tgl_bamk: "2025-11-01",
        assets: [],
      },
    ],
  },
  {
    id: "CAP-2540013",
    kode: "2540013",
    nama: "Pengadaan Perangkat End User Computing (EUC)",
    pagu: 1500000000,
    thnAwal: 2025,
    thnAkhir: 2025,
    thnAnggaran: 2025,
    type: "capex",
    projects: [
      {
        id: "PKJ-2540013-001",
        nm_pekerjaan:
          "Pengadaan Laptop, PC Desktop, dan Perangkat Peripheral untuk Kantor Pusat dan Branch Baru",
        nilai_rab: 1400000000,
        nilai_kontrak: 1350000000,
        no_pr: "8260001201",
        no_po: "6440000912",
        no_kontrak: "PD.03/05/03/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-03-05",
        durasi_kontrak: 45,
        no_sp3: "PD.03/01/03/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-03-01",
        tgl_bamk: "2025-02-20",
        assets: [],
      },
    ],
  },
];

const INIT_OPEX = [
  {
    id: "OPX-1",
    kd_anggaran_master: "5030905000",
    nama: "Beban Pemeliharaan Software",
    thn_anggaran: 2026,
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
  {
    id: "OPX-4",
    kd_anggaran_master: "5081500000",
    nama: "Beban Jasa Konsultan",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 800000000,
    type: "opex",
    transaksi: [
      {
        id: newId(),
        tanggal: "2026-03-01",
        keterangan: "Konsultan IT Masterplan Tahap 1",
        no_invoice: "INV/2026/045",
        aset: "",
        lampiran: "",
        jumlah: 150000000,
      },
    ],
  },
  {
    id: "OPX-5",
    kd_anggaran_master: "5060700000",
    nama: "Beban Sumber Daya Pihak Ketiga Peralatan",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 900000000,
    type: "opex",
    transaksi: [],
  },
  {
    id: "OPX-6",
    kd_anggaran_master: "5030905000",
    nama: "Beban Pemeliharaan Hardware",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 450000000,
    type: "opex",
    transaksi: [
      {
        id: newId(),
        tanggal: "2026-02-20",
        keterangan: "Maintenance Server Dell R750",
        no_invoice: "INV/2026/033",
        aset: "SPMT-KPT-DTC-SRV-01",
        lampiran: "",
        jumlah: 25000000,
      },
    ],
  },
  {
    id: "OPX-7",
    kd_anggaran_master: "5900100000",
    nama: "Beban Investasi",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 300000000,
    type: "opex",
    transaksi: [],
  },
];

// ══════════════════════════════════════════════════════════════════
// EXPORT EXCEL HELPER
// ══════════════════════════════════════════════════════════════════
function exportAssetsToExcel(assets, projectName, contractNo) {
  const rows = [
    [
      "No",
      "Nama Aset",
      "Merek",
      "Model",
      "Kode Aset",
      "Serial Number",
      "Kategori",
      "Lokasi",
      "Tgl. Pengadaan",
      "Nilai Perolehan (IDR)",
    ],
  ];
  assets.forEach((a, i) => {
    rows.push([
      i + 1,
      a.name || "",
      a.brand || "",
      a.model || "",
      a.asset_code || "",
      a.serial_number || "",
      a.category || "",
      a.location || "",
      a.procurement_date
        ? new Date(a.procurement_date).toLocaleDateString("id-ID")
        : "",
      a.acquisition_value || 0,
    ]);
  });
  const totalRow = [
    "",
    "TOTAL",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    assets.reduce((s, a) => s + (a.acquisition_value || 0), 0),
  ];
  rows.push(totalRow);

  let csv = "";
  rows.forEach((row) => {
    csv +=
      row
        .map((cell) => {
          const s = String(cell).replace(/"/g, '""');
          return s.includes(",") || s.includes("\n") || s.includes('"')
            ? `"${s}"`
            : s;
        })
        .join(",") + "\r\n";
  });

  // Build an actual Excel XML (SpreadsheetML) for better compatibility
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const colWidths = [6, 35, 18, 22, 24, 22, 14, 20, 16, 24];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:x="urn:schemas-microsoft-com:office:excel">
<Styles>
  <Style ss:ID="header"><Font ss:Bold="1"/><Interior ss:Color="#2563EB" ss:Pattern="Solid"/><Font ss:Color="#FFFFFF" ss:Bold="1"/></Style>
  <Style ss:ID="total"><Font ss:Bold="1"/><Interior ss:Color="#EFF6FF" ss:Pattern="Solid"/></Style>
  <Style ss:ID="num"><NumberFormat ss:Format="#,##0"/></Style>
  <Style ss:ID="numtotal"><NumberFormat ss:Format="#,##0"/><Font ss:Bold="1"/><Interior ss:Color="#EFF6FF" ss:Pattern="Solid"/></Style>
  <Style ss:ID="info"><Interior ss:Color="#F0F9FF" ss:Pattern="Solid"/></Style>
</Styles>
<Worksheet ss:Name="Daftar Aset">
<Table>
${colWidths.map((w) => `<Column ss:Width="${w * 7}"/>`).join("\n")}
<Row><Cell ss:MergeAcross="9" ss:StyleID="info"><Data ss:Type="String">Pekerjaan: ${esc(projectName)}</Data></Cell></Row>
<Row><Cell ss:MergeAcross="9" ss:StyleID="info"><Data ss:Type="String">No. Kontrak: ${esc(contractNo || "—")}</Data></Cell></Row>
<Row/>
<Row>
${rows[0].map((h) => `<Cell ss:StyleID="header"><Data ss:Type="String">${esc(h)}</Data></Cell>`).join("\n")}
</Row>
${rows
  .slice(1, -1)
  .map(
    (row) => `<Row>
${row
  .map((cell, ci) => {
    if (ci === 9)
      return `<Cell ss:StyleID="num"><Data ss:Type="Number">${Number(cell) || 0}</Data></Cell>`;
    if (ci === 0)
      return `<Cell><Data ss:Type="Number">${Number(cell)}</Data></Cell>`;
    return `<Cell><Data ss:Type="String">${esc(cell)}</Data></Cell>`;
  })
  .join("\n")}
</Row>`,
  )
  .join("\n")}
<Row>
${totalRow
  .map((cell, ci) => {
    if (ci === 9)
      return `<Cell ss:StyleID="numtotal"><Data ss:Type="Number">${Number(cell) || 0}</Data></Cell>`;
    return `<Cell ss:StyleID="total"><Data ss:Type="String">${esc(cell)}</Data></Cell>`;
  })
  .join("\n")}
</Row>
</Table>
</Worksheet>
</Workbook>`;

  const blob = new Blob([xml], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeName = (contractNo || "aset").replace(/[/\\:*?"<>|]/g, "-");
  a.download = `Daftar_Aset_${safeName}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");

:root {
  --blue: #2563eb; --blue-lt: #eff6ff; --blue-mid: #dbeafe;
  --green: #16a34a; --green-lt: #f0fdf4; --green-mid: #dcfce7;
  --amber: #d97706; --amber-lt: #fffbeb; 
  --red: #dc2626; --red-lt: #fef2f2;
  --ink: #111827; --ink2: #374151; --ink3: #6b7280; --ink4: #9ca3af;
  --border: #e5e7eb; --border-lt: #f3f4f6;
  --surf: #ffffff; --bg: #f9fafb;
  --mono: "JetBrains Mono", "Courier New", monospace;
  --r: 8px; --r-lg: 12px;
  --sh: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
  --sh-md: 0 4px 12px rgba(0,0,0,.08);
  --sh-lg: 0 20px 48px rgba(0,0,0,.14);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
  background: var(--bg);
  color: var(--ink);
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

.root { padding: 2rem 2.5rem; min-height: 100vh; max-width: 1400px; margin: 0 auto; }

.hdr { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.hdr h1 { font-size: 1.4rem; font-weight: 800; letter-spacing: -.5px; color: var(--ink); }
.hdr p { font-size: .8rem; color: var(--ink4); margin-top: 4px; font-weight: 500; }
.hdr-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

.yr-row { display: flex; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 4px; gap: 2px; box-shadow: var(--sh); }
.yr-btn { padding: 6px 14px; border-radius: 6px; border: none; cursor: pointer; font-family: inherit; font-size: .75rem; font-weight: 600; background: transparent; color: var(--ink3); transition: all .15s; }
.yr-btn:hover:not(.on) { background: var(--bg); color: var(--ink2); }
.yr-btn.on { background: var(--blue); color: #fff; font-weight: 700; box-shadow: 0 2px 6px rgba(37,99,235,0.2); }

.type-tabs { display: flex; gap: 2px; background: var(--surf); padding: 4px; border-radius: var(--r); border: 1px solid var(--border); box-shadow: var(--sh); }
.type-tab { display: flex; align-items: center; gap: 6px; padding: 6px 16px; border: none; background: transparent; border-radius: 6px; font-family: inherit; font-size: .75rem; font-weight: 600; color: var(--ink3); cursor: pointer; transition: all .15s; }
.type-tab:hover:not(.on) { background: var(--bg); color: var(--ink2); }
.type-tab.on { background: var(--blue); color: #fff; box-shadow: 0 2px 6px rgba(37,99,235,0.2); }
.type-tab.on.all { background: var(--ink); box-shadow: 0 2px 6px rgba(15,23,42,0.2); }

.kpi-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
.kpi { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 1.25rem; display: flex; gap: 16px; align-items: center; box-shadow: var(--sh); transition: transform 0.2s; }
.kpi:hover { transform: translateY(-2px); box-shadow: var(--sh-md); }
.kpi-ico { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi.blue .kpi-ico { background: var(--blue-lt); color: var(--blue); }
.kpi.amber .kpi-ico { background: var(--amber-lt); color: var(--amber); }
.kpi.green .kpi-ico { background: var(--green-lt); color: var(--green); }
.kpi-body { flex: 1; min-width: 0; }
.kpi-lbl { font-size: .7rem; color: var(--ink3); font-weight: 600; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
.kpi-val { font-size: 1.2rem; font-weight: 800; color: var(--ink); line-height: 1; }
.kpi-sub { font-size: .7rem; color: var(--ink4); margin-top: 6px; }
.kpi-bar { height: 4px; background: var(--border-lt); border-radius: 99px; overflow: hidden; margin-top: 8px; }
.kpi-bar-fill { height: 100%; border-radius: 99px; transition: width .6s ease; }

.toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.flt-box, .srch { display: flex; align-items: center; gap: 8px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 8px 12px; box-shadow: var(--sh); transition: border-color .2s; }
.flt-box:focus-within, .srch:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.flt-box svg, .srch svg { color: var(--ink4); flex-shrink: 0; }
.flt-select, .srch input { border: none; background: transparent; font-family: inherit; font-size: .8rem; color: var(--ink); outline: none; }
.flt-select { cursor: pointer; min-width: 180px; font-weight: 500; }
.srch { flex: 1; max-width: 380px; }
.srch input { flex: 1; }

.opex-toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.opex-flt-box { display: flex; align-items: center; gap: 8px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 8px 12px; box-shadow: var(--sh); transition: border-color .2s; }
.opex-flt-box:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(22,163,74,.1); }
.opex-flt-box svg { color: var(--ink4); flex-shrink: 0; }
.opex-flt-select { border: none; background: transparent; font-family: inherit; font-size: .8rem; color: var(--ink); outline: none; cursor: pointer; font-weight: 500; min-width: 300px; }
.opex-srch { display: flex; align-items: center; gap: 8px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 8px 12px; box-shadow: var(--sh); flex: 1; max-width: 340px; transition: border-color .2s; }
.opex-srch:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(22,163,74,.1); }
.opex-srch svg { color: var(--ink4); flex-shrink: 0; }
.opex-srch input { border: none; background: transparent; font-family: inherit; font-size: .8rem; color: var(--ink); outline: none; flex: 1; }
.opex-filter-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: var(--green-lt); border: 1px solid var(--green-mid); border-radius: 99px; font-size: 0.7rem; font-weight: 700; color: var(--green); }
.opex-filter-badge button { background: none; border: none; cursor: pointer; color: var(--green); display: flex; align-items: center; padding: 0; transition: color .15s; }
.opex-filter-badge button:hover { color: var(--red); }

.section-label { display: flex; align-items: center; gap: 12px; margin: 1.5rem 0 1rem; }
.section-label-line { flex: 1; height: 1px; background: var(--border); }
.section-label-pill { display: flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 99px; font-size: .75rem; font-weight: 700; border: 1px solid transparent; }
.section-label-pill.capex { background: var(--blue-lt); color: var(--blue); border-color: var(--blue-mid); }
.section-label-pill.opex { background: var(--green-lt); color: var(--green); border-color: var(--green-mid); }
.section-count { font-size: .75rem; color: var(--ink4); font-weight: 500; }

.card-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.empty { background: var(--surf); border: 1.5px dashed var(--border); border-radius: var(--r-lg); text-align: center; padding: 3rem; color: var(--ink4); font-size: .85rem; font-weight: 500; }

.jcard { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--sh); transition: transform .15s, box-shadow .15s; }
.jcard:hover { transform: translateY(-1px); box-shadow: var(--sh-md); }
.jcard.open-cap { border-color: var(--blue-mid); }
.jcard.open-opx { border-color: var(--green-mid); }

.jcard-inner { display: flex; }
.jcard-accent { width: 3px; flex-shrink: 0; }
.jcard-accent.cap { background: var(--blue); }
.jcard-accent.opx { background: var(--green); }
.jcard-content { flex: 1; min-width: 0; }

.jcard-top { display: grid; grid-template-columns: 2.2fr 1.3fr 2.5fr auto; align-items: center; gap: 16px; padding: 14px 20px; cursor: pointer; transition: background .15s; }
.jcard-top:hover { background: var(--bg); }
.jcard.open-cap .jcard-top { background: #f8faff; }
.jcard.open-opx .jcard-top { background: #f7fef9; }

.jc-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.jc-tags { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.badge { font-size: 0.65rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.badge.capex { background: var(--blue-lt); color: var(--blue); }
.badge.opex { background: var(--green-lt); color: var(--green); }
.code-tag { font-family: var(--mono); font-size: 0.7rem; color: var(--ink3); background: var(--border-lt); border: 1px solid var(--border); padding: 1px 6px; border-radius: 4px; }
.yr-tag { font-size: 0.7rem; font-weight: 600; color: var(--ink3); background: var(--border-lt); border: 1px solid var(--border); padding: 1px 6px; border-radius: 4px; }
.jc-title { font-size: 0.85rem; font-weight: 700; color: var(--ink); line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.jc-meta { display: flex; flex-direction: column; gap: 4px; font-size: 0.75rem; color: var(--ink3); font-weight: 500; }
.jc-meta span { display: flex; align-items: center; gap: 6px; }

.jc-fin { display: flex; align-items: center; justify-content: flex-end; gap: 20px; }
.amt-blk { display: flex; flex-direction: column; gap: 2px; text-align: right; }
.amt-lbl { font-size: 0.65rem; color: var(--ink4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.amt-val { font-size: 0.9rem; font-weight: 800; }
.amt-val.blue { color: var(--blue); }
.amt-val.amber { color: var(--amber); }
.amt-val.red { color: var(--red); }
.amt-val.green { color: var(--green); }
.fin-div { width: 1px; height: 28px; background: var(--border); }

.jc-actions { display: flex; align-items: center; gap: 16px; justify-content: flex-end; }
.ring-wrap { display: flex; align-items: center; gap: 8px; }
.ring { position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.ring svg { position: absolute; top: 0; left: 0; transform: rotate(-90deg); width: 100%; height: 100%; }
.ring-lbl { font-size: 0.7rem; font-weight: 800; color: var(--ink); z-index: 1; }
.status-pill { font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 99px; border: 1px solid transparent; }

.act-btns { display: flex; gap: 4px; }
.abtn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); font-family: inherit; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all .15s; background: var(--surf); color: var(--ink3); }
.abtn:hover { background: var(--bg); border-color: #cbd5e1; color: var(--ink2); }
.abtn.blue { background: var(--blue-lt); border-color: var(--blue-mid); color: var(--blue); }
.abtn.blue:hover { background: var(--blue-mid); color: #1d4ed8; }
.abtn.green { background: var(--green-lt); border-color: var(--green-mid); color: var(--green); }
.abtn.green:hover { background: var(--green-mid); color: #15803d; }
.abtn.excel { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }
.abtn.excel:hover { background: #dcfce7; color: #14532d; }
.abtn.del { padding: 6px 8px; }
.abtn.del:hover { background: var(--red-lt); border-color: #fca5a5; color: var(--red); }
.chev { color: var(--ink4); padding: 4px; border-radius: 50%; display: flex; transition: background 0.15s; }
.jcard-top:hover .chev { background: var(--border); color: var(--ink2); }

.jcard-detail { padding: 20px; background: var(--bg); border-top: 1px dashed var(--border); animation: slideDown .15s ease-out; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.d-panel { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 16px; box-shadow: var(--sh); }
.d-title { font-size: 0.75rem; font-weight: 800; color: var(--ink2); margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-lt); padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;}
.d-rows { display: flex; flex-direction: column; gap: 6px; }
.d-row { display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.8rem; }
.d-row .lbl { color: var(--ink4); font-weight: 500; }
.d-row .val { color: var(--ink); font-weight: 600; text-align: right; }
.d-row code { font-family: var(--mono); font-size: 0.75rem; color: var(--blue); background: var(--blue-lt); padding: 2px 6px; border-radius: 4px; }
.d-empty { font-size: 0.8rem; color: var(--ink4); text-align: center; padding: 16px; background: var(--bg); border-radius: 8px; border: 1px dashed var(--border); }
.inline-link { font-size: 0.75rem; font-weight: 700; color: var(--blue); background: none; border: none; cursor: pointer; padding: 0; display: inline-flex; align-items: center; gap: 4px; transition: color .15s; }
.inline-link:hover { color: #1e40af; text-decoration: underline; }

.ai-list, .ri-list { display: flex; flex-direction: column; gap: 6px; }
.ai-item, .ri-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--surf); border: 1px solid var(--border); border-radius: 8px; box-shadow: var(--sh); }
.ai-info, .ri-info { display: flex; align-items: center; gap: 10px; }
.a-code, .r-id { font-family: var(--mono); font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; white-space: nowrap; }
.a-code { background: var(--blue-lt); color: var(--blue); }
.r-id { background: var(--amber-lt); color: var(--amber); }
.a-name, .r-ket { font-size: 0.8rem; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
.a-loc, .r-date { font-size: 0.7rem; color: var(--ink4); display: flex; align-items: center; gap: 4px; font-weight: 500; }
.a-val { font-size: 0.85rem; font-weight: 800; color: var(--blue); }
.r-val { font-size: 0.85rem; font-weight: 800; color: var(--amber); }

.panel-total { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 8px; margin-top: 6px; }
.panel-total.blue { background: var(--blue-lt); border: 1px solid var(--blue-mid); color: var(--blue); }
.panel-total.amber { background: var(--amber-lt); border: 1px solid #fde68a; color: var(--amber); }
.panel-total span { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.panel-total strong { font-size: 0.95rem; font-weight: 800; }

.overlay { position: fixed; inset: 0; background: rgba(15,23,42,.5); display: flex; align-items: center; justify-content: center; z-index: 900; backdrop-filter: blur(2px); padding: 20px; animation: fadeOvl .15s ease; }
.mbox { background: var(--surf); border-radius: var(--r-lg); width: 100%; max-width: 600px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--sh-lg); animation: modalUp .2s cubic-bezier(.16,1,.3,1); }
.mbox.wide { max-width: 720px; }
.mhd { display: flex; align-items: flex-start; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
.mhd-left { display: flex; align-items: center; gap: 12px; }
.m-ico { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.m-ico.blue { background: var(--blue-lt); color: var(--blue); }
.m-ico.green { background: var(--green-lt); color: var(--green); }
.m-ico.amber { background: var(--amber-lt); color: var(--amber); }
.mhd h3 { font-size: 0.95rem; font-weight: 800; color: var(--ink); }
.mhd p { font-size: 0.75rem; color: var(--ink4); font-weight: 500; }
.m-close { width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border); background: var(--border-lt); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--ink2); transition: all .15s; flex-shrink: 0; }
.m-close:hover { background: var(--red-lt); border-color: #fca5a5; color: var(--red); }
.mbody { padding: 20px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; flex: 1; }
.mfoot { display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 16px 20px; border-top: 1px solid var(--border); flex-shrink: 0; background: var(--bg); }

.btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-family: inherit; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: none; transition: all .15s; white-space: nowrap; }
.btn-outline { background: var(--surf); border: 1px solid var(--border); color: var(--ink2); }
.btn-outline:hover { background: var(--bg); border-color: #cbd5e1; }
.btn-prim { background: var(--blue); color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.2); }
.btn-prim:hover { background: #1d4ed8; }
.btn-green { background: var(--green); color: #fff; box-shadow: 0 2px 8px rgba(22,163,74,.2); }
.btn-green:hover { background: #15803d; }
.btn-excel { background: #166534; color: #fff; box-shadow: 0 2px 8px rgba(22,101,52,.25); }
.btn-excel:hover { background: #14532d; }

.pagination-bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 4px; margin-bottom: 24px; flex-wrap: wrap; gap: 8px; }
.pagination-info { font-size: 0.75rem; color: var(--ink4); font-weight: 500; }
.pagination-controls { display: flex; align-items: center; gap: 4px; }
.pg-btn { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 6px; border: 1px solid var(--border); background: var(--surf); color: var(--ink3); font-family: inherit; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all .15s; }
.pg-btn:hover:not(:disabled):not(.active) { background: var(--bg); border-color: #cbd5e1; color: var(--ink2); }
.pg-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: 0 2px 6px rgba(37,99,235,.2); }
.pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.asset-page { animation: fadeUp .15s ease-out; }
.asset-page-hdr { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.asset-page-hdr-left { display: flex; align-items: center; gap: 16px; }
.asset-page-hdr-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.asset-ctx-banner { background: var(--surf); border: 1px solid var(--border); border-left: 4px solid var(--blue); border-radius: var(--r-lg); padding: 14px 20px; margin-bottom: 20px; display: flex; gap: 32px; flex-wrap: wrap; box-shadow: var(--sh); }
.asset-ctx-banner.opex-theme { border-left-color: var(--green); }
.asset-ctx-item { display: flex; flex-direction: column; gap: 3px; }
.asset-ctx-item span { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--ink4); letter-spacing: 0.5px; }
.asset-ctx-item strong { font-size: 0.88rem; font-weight: 700; color: var(--ink); }

.asset-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.asset-toolbar-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.asset-toolbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.at-filter { display: flex; align-items: center; gap: 8px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 7px 12px; box-shadow: var(--sh); transition: border-color .2s; }
.at-filter:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.at-filter svg { color: var(--ink4); flex-shrink: 0; }
.at-filter input, .at-filter select { border: none; background: transparent; font-family: inherit; font-size: 0.78rem; color: var(--ink); outline: none; font-weight: 500; }
.at-filter select { cursor: pointer; min-width: 130px; }
.at-filter input { min-width: 220px; }

.asset-table-wrap { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--sh); overflow: hidden; }
.asset-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.asset-table thead tr { background: var(--bg); border-bottom: 2px solid var(--border); }
.asset-table thead th { padding: 11px 14px; text-align: left; font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--ink3); white-space: nowrap; border-right: 1px solid var(--border-lt); }
.asset-table thead th:last-child { border-right: none; }
.asset-table thead th.th-no { width: 44px; text-align: center; }
.asset-table thead th.th-actions { width: 80px; text-align: center; }

.asset-table tbody tr { border-bottom: 1px solid var(--border-lt); transition: background .12s; }
.asset-table tbody tr:last-child { border-bottom: none; }
.asset-table tbody tr:hover { background: #f8faff; }
.asset-table.opex-table tbody tr:hover { background: #f7fef9; }

.asset-table tbody td { padding: 11px 14px; vertical-align: middle; border-right: 1px solid var(--border-lt); }
.asset-table tbody td:last-child { border-right: none; }

.td-no { text-align: center; font-size: 0.7rem; font-weight: 700; color: var(--ink4); background: var(--bg); }
.td-asset-name { display: flex; align-items: center; gap: 10px; }
.td-thumb { width: 36px; height: 36px; border-radius: 6px; overflow: hidden; border: 1px solid var(--border); flex-shrink: 0; background: var(--bg); display: flex; align-items: center; justify-content: center; }
.td-thumb img { width: 100%; height: 100%; object-fit: cover; }
.td-thumb-empty { color: var(--ink4); }
.td-name-block { display: flex; flex-direction: column; gap: 3px; }
.td-name-text { font-size: 0.82rem; font-weight: 700; color: var(--ink); line-height: 1.3; }
.td-name-sub { font-size: 0.7rem; color: var(--ink4); font-weight: 500; }

.td-code { font-family: var(--mono); font-size: 0.72rem; font-weight: 700; background: var(--blue-lt); color: var(--blue); padding: 3px 8px; border-radius: 5px; white-space: nowrap; display: inline-block; }
.td-sn { font-family: var(--mono); font-size: 0.7rem; color: var(--ink3); font-weight: 600; }

.cat-pill { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 800; white-space: nowrap; }
.cat-pill.Server { background: #ede9fe; color: #6d28d9; }
.cat-pill.Network { background: #dbeafe; color: #1d4ed8; }
.cat-pill.Security { background: #fef3c7; color: #b45309; }
.cat-pill.default { background: var(--border-lt); color: var(--ink3); }

.td-loc { display: flex; align-items: center; gap: 5px; font-size: 0.78rem; color: var(--ink2); font-weight: 500; }
.td-date { font-size: 0.78rem; color: var(--ink3); font-weight: 500; }
.td-value { font-size: 0.85rem; font-weight: 800; color: var(--blue); white-space: nowrap; }

.td-actions { text-align: center; }
.td-act-row { display: flex; align-items: center; justify-content: center; gap: 4px; }

.asset-table tfoot tr { background: var(--blue-lt); border-top: 2px solid var(--blue-mid); }
.asset-table tfoot td { padding: 10px 14px; font-size: 0.78rem; font-weight: 700; color: var(--blue); }
.asset-table tfoot .tfoot-total { font-size: 0.9rem; font-weight: 800; }

.asset-table.opex-table tfoot tr { background: var(--green-lt); border-top-color: var(--green-mid); }
.asset-table.opex-table tfoot td { color: var(--green); }

.table-empty-row td { text-align: center; padding: 48px 24px !important; color: var(--ink4); }
.table-empty-inner { display: flex; flex-direction: column; align-items: center; gap: 10px; }

.asset-summary-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; background: var(--bg); border-top: 1px solid var(--border); flex-wrap: wrap; gap: 12px; }
.asset-summary-stat { display: flex; align-items: center; gap: 8px; }
.asset-summary-stat span { font-size: 0.75rem; color: var(--ink4); font-weight: 500; }
.asset-summary-stat strong { font-size: 0.85rem; font-weight: 800; color: var(--ink); }

.subpage { animation: fadeUp .15s ease-out; max-width: 900px; margin: 0 auto; }
.subpage-hdr { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.subpage-hdr h2 { font-size: 1.25rem; font-weight: 800; flex: 1; letter-spacing: -0.5px; }
.ctx-card { background: var(--surf); border: 1px solid var(--border); border-left: 4px solid var(--blue); border-radius: var(--r-lg); padding: 16px 20px; margin-bottom: 24px; display: flex; gap: 24px; flex-wrap: wrap; box-shadow: var(--sh); }
.ctx-item { display: flex; flex-direction: column; gap: 4px; }
.ctx-item span { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--ink4); letter-spacing: 0.5px; }
.ctx-item strong { font-size: 0.9rem; font-weight: 700; color: var(--ink); }

.sec-card { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--sh); overflow: hidden; margin-bottom: 20px; }
.sec-card-hdr { display: flex; align-items: center; gap: 12px; padding: 14px 20px; background: var(--bg); border-bottom: 1px solid var(--border); }
.sec-card-hdr h3 { font-size: 0.9rem; font-weight: 800; color: var(--ink); }
.sec-card-body { padding: 20px; }

/* ── HORIZONTAL FORM FIELDS ── */
.hfld { display: flex; align-items: flex-start; gap: 0; border-bottom: 1px solid var(--border-lt); padding: 10px 0; }
.hfld:last-child { border-bottom: none; }
.hfld-label { width: 200px; min-width: 200px; font-size: 0.75rem; font-weight: 700; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.5px; padding-top: 10px; padding-right: 16px; flex-shrink: 0; line-height: 1.4; }
.hfld-label .req { color: var(--red); margin-left: 2px; }
.hfld-input { flex: 1; }
.hfld input, .hfld textarea, .hfld select { width: 100%; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 0.85rem; color: var(--ink); outline: none; transition: all .15s; background: var(--surf); font-weight: 500; }
.hfld input:focus, .hfld textarea:focus, .hfld select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.hfld textarea { resize: vertical; min-height: 72px; }
.hfld select { cursor: pointer; }
.hfld-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
.hfld-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 16px; }
.hfld-hint { font-size: 0.7rem; color: var(--ink4); margin-top: 4px; }

/* ── ASSET ENTRY HORIZONTAL FIELDS ── */
.aefld {
  display: flex;
  align-items: flex-start;
  gap: 0;
  border-bottom: 1px solid var(--border-lt);
  padding: 8px 0;
}
.aefld:last-child { border-bottom: none; }
.aefld-label {
  width: 180px;
  min-width: 180px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--ink3);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding-top: 9px;
  padding-right: 14px;
  flex-shrink: 0;
  line-height: 1.4;
}
.aefld-label .req { color: var(--red); margin-left: 2px; }
.aefld-input { flex: 1; }
.aefld input, .aefld select { width: 100%; padding: 8px 11px; border: 1px solid #cbd5e1; border-radius: 7px; font-family: inherit; font-size: 0.83rem; color: var(--ink); outline: none; transition: all .15s; background: var(--surf); font-weight: 500; }
.aefld input:focus, .aefld select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.aefld-hint { font-size: 0.68rem; color: var(--ink4); margin-top: 3px; }

/* Legacy edit-grid kept for backward compat */
.edit-grid { display: grid; gap: 16px; }
.g3 { grid-template-columns: repeat(3,1fr); }
.g2 { grid-template-columns: repeat(2,1fr); }
.g1 { grid-template-columns: 1fr; }
.edit-fld { display: flex; flex-direction: column; gap: 6px; }
.edit-fld label { font-size: 0.7rem; font-weight: 700; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.5px;}
.edit-fld input, .edit-fld textarea, .edit-fld select { padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 0.85rem; color: var(--ink); outline: none; transition: all .15s; background: var(--surf); font-weight: 500; }
.edit-fld input:focus, .edit-fld textarea:focus, .edit-fld select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }

.edit-footer { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: var(--sh-md); margin-top: 24px; position: sticky; bottom: 24px; z-index: 10; }

.acard { background: var(--surf); border: 1px solid var(--border); border-left: 5px solid var(--blue); border-radius: var(--r-lg); overflow: hidden; margin-bottom: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.03); transition: box-shadow 0.2s; }
.acard:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
.acard-hdr { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--bg); border-bottom: 1px solid var(--border); }
.acard-body { padding: 24px; }
.asset-number-badge { background: var(--ink); color: #fff; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px; }

.acard-image-section { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px; border-bottom: 1px dashed var(--border); padding-bottom: 20px; }
.acard-image-box { width: 120px; height: 120px; border-radius: 8px; border: 1.5px dashed #cbd5e1; background: var(--bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; overflow: hidden; cursor: pointer; transition: all .15s; }
.acard-image-box:hover { border-color: var(--blue); background: var(--blue-lt); }
.acard-image-preview-container { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.acard-image-preview { max-width: 100%; max-height: 100%; object-fit: contain; }
.acard-image-upload-trigger { color: var(--ink4); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; font-size: 0.7rem; font-weight: 600; text-align: center; }
.acard-image-upload-trigger:hover { color: var(--blue); }
.abtn.clear { padding: 4px 8px; background: rgba(255,255,255,.8); color: var(--ink2); border: 1px solid var(--border); border-radius: 6px; font-size: 0.65rem; position: absolute; top: 6px; right: 6px; z-index: 2; }
.abtn.clear:hover { background: #fff; color: var(--red); border-color: #fca5a5; }

.toast { position: fixed; bottom: 24px; right: 24px; background: var(--ink); color: #fff; padding: 12px 20px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; box-shadow: var(--sh-lg); display: flex; align-items: center; gap: 8px; z-index: 9999; animation: toastIn .2s ease; }
.cbox { background: var(--surf); border-radius: 16px; padding: 24px; max-width: 320px; width: 100%; box-shadow: var(--sh-lg); display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; animation: modalUp .2s ease; }

/* ── MODAL TAMBAH PEKERJAAN ── */
.add-modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,.55); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(3px); padding: 20px; animation: fadeOvl .15s ease; }
.add-modal-box { background: var(--surf); border-radius: 16px; width: 100%; max-width: 680px; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--sh-lg); animation: modalUp .22s cubic-bezier(.16,1,.3,1); }
.add-modal-hdr { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--bg); }
.add-modal-hdr-left { display: flex; align-items: center; gap: 12px; }
.add-modal-ico { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.add-modal-ico.blue { background: var(--blue-lt); color: var(--blue); }
.add-modal-ico.green { background: var(--green-lt); color: var(--green); }
.add-modal-hdr h3 { font-size: 1rem; font-weight: 800; color: var(--ink); margin: 0; }
.add-modal-hdr p { font-size: 0.75rem; color: var(--ink4); font-weight: 500; margin: 2px 0 0; }

.add-modal-body { flex: 1; overflow-y: auto; padding: 0; }
.add-modal-section { border-bottom: 1px solid var(--border); }
.add-modal-section-hdr { display: flex; align-items: center; gap: 10px; padding: 12px 24px; background: var(--border-lt); font-size: 0.72rem; font-weight: 800; color: var(--ink2); text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1px solid var(--border); }
.add-modal-section-body { padding: 4px 24px 8px; }

.mhfld { display: flex; align-items: flex-start; padding: 9px 0; gap: 0; border-bottom: 1px solid var(--border-lt); }
.mhfld:last-child { border-bottom: none; }
.mhfld-lbl { width: 190px; min-width: 190px; font-size: 0.72rem; font-weight: 700; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.4px; padding-top: 10px; padding-right: 12px; flex-shrink: 0; line-height: 1.4; }
.mhfld-lbl .req { color: var(--red); margin-left: 2px; }
.mhfld-inp { flex: 1; }
.mhfld input, .mhfld textarea, .mhfld select { width: 100%; padding: 8px 11px; border: 1px solid #cbd5e1; border-radius: 7px; font-family: inherit; font-size: 0.83rem; color: var(--ink); outline: none; transition: all .15s; background: var(--surf); font-weight: 500; }
.mhfld input:focus, .mhfld textarea:focus, .mhfld select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.mhfld.green input:focus, .mhfld.green textarea:focus, .mhfld.green select:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(22,163,74,.1); }
.mhfld textarea { resize: vertical; min-height: 64px; }
.mhfld select { cursor: pointer; }
.mhfld-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.add-modal-foot { display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding: 14px 24px; border-top: 1px solid var(--border); flex-shrink: 0; background: var(--bg); }
.req-note { font-size: 0.7rem; color: var(--ink4); padding: 8px 24px 4px; font-style: italic; }

@keyframes slideDown { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeOvl { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalUp { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

@media(max-width:1024px) {
  .jcard-top { grid-template-columns: 1fr; gap: 12px; }
  .jc-fin { justify-content: flex-start; }
  .jc-actions { justify-content: flex-start; flex-wrap: wrap; }
  .fin-div { display: none; }
  .asset-table { font-size: 0.75rem; }
  .asset-table thead th, .asset-table tbody td { padding: 9px 10px; }
}
@media(max-width:900px) {
  .root { padding: 24px 20px 80px; }
  .hdr { flex-direction: column; align-items: stretch; }
  .kpi-strip { grid-template-columns: 1fr; }
  .detail-grid { grid-template-columns: 1fr; }
  .g3 { grid-template-columns: 1fr; }
  .g2 { grid-template-columns: 1fr; }
  .ctx-card { grid-template-columns: 1fr 1fr; }
  .opex-flt-select { min-width: 200px; }
  .mhfld-lbl { width: 140px; min-width: 140px; }
  .hfld-label { width: 160px; min-width: 160px; }
  .aefld-label { width: 140px; min-width: 140px; }
}
`;

const PAGE_SIZE = 5;

function Pagination({ total, page, onPage, label }) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;
  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  return (
    <div className="pagination-bar">
      <span className="pagination-info">
        Menampilkan {start}–{end} dari {total} {label}
      </span>
      <div className="pagination-controls">
        <button
          className="pg-btn"
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
        >
          <Icon d={I.chevLeft} size={13} />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              style={{
                padding: "0 4px",
                color: "var(--ink4)",
                fontSize: "0.75rem",
              }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              className={`pg-btn ${page === p ? "active" : ""}`}
              onClick={() => onPage(p)}
            >
              {p}
            </button>
          ),
        )}
        <button
          className="pg-btn"
          disabled={page === totalPages}
          onClick={() => onPage(page + 1)}
        >
          <Icon d={I.chevRight} size={13} />
        </button>
      </div>
    </div>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <Icon d={I.check} size={14} />
      {msg}
    </div>
  );
}

function Confirm({ msg, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="cbox" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            width: 48,
            height: 48,
            background: "#fff7ed",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ea580c",
          }}
        >
          <Icon d={I.warning} size={24} />
        </div>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)" }}>
          {msg}
        </p>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button
            className="btn btn-outline"
            style={{ flex: 1, justifyContent: "center" }}
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="btn"
            style={{
              flex: 1,
              justifyContent: "center",
              background: "var(--red)",
              color: "#fff",
            }}
            onClick={onConfirm}
          >
            <Icon d={I.trash} size={14} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function CatPill({ cat }) {
  const cls =
    cat === "Server"
      ? "Server"
      : cat === "Network"
        ? "Network"
        : cat === "Security"
          ? "Security"
          : "default";
  return <span className={`cat-pill ${cls}`}>{cat || "—"}</span>;
}

function PctRing({ pct }) {
  const meta = pctMeta(pct);
  const r = 16,
    circ = 2 * Math.PI * r;
  const filled = (Math.min(pct, 100) / 100) * circ;
  return (
    <div className="ring-wrap">
      <div className="ring">
        <svg width="36" height="36" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="4"
          />
          <circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            stroke={pctColor(pct)}
            strokeWidth="4"
            strokeDasharray={`${filled} ${circ}`}
            strokeDashoffset={circ * 0.25}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray .5s ease" }}
          />
        </svg>
        <span className="ring-lbl">{pct}%</span>
      </div>
      <span
        className="status-pill"
        style={{
          background: meta.bg,
          color: meta.fg,
          borderColor: meta.border,
        }}
      >
        {meta.label}
      </span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// FIX 1: MODAL TAMBAH CAPEX — Tgl BAMK dipindah ke bawah Tgl SP3
// ══════════════════════════════════════════════════════════════════
function TambahCapexModal({ capexData, onClose, onSave }) {
  const [form, setForm] = useState({
    anggaranId: capexData[0]?.id || "",
    nm_pekerjaan: "",
    nilai_rab: "",
    nilai_kontrak: "",
    no_pr: "",
    no_po: "",
    no_kontrak: "",
    tgl_kontrak: "",
    durasi_kontrak: "",
    no_sp3: "",
    tgl_sp3: "",
    tgl_bamk: "",
  });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const anggaranPilihan = capexData.find((a) => a.id === form.anggaranId);

  const handleSave = () => {
    if (!form.nm_pekerjaan || !form.anggaranId) return;
    const newProj = {
      id: `PKJ-${Date.now()}`,
      nm_pekerjaan: form.nm_pekerjaan,
      nilai_rab: parseFloat(form.nilai_rab) || 0,
      nilai_kontrak: parseFloat(form.nilai_kontrak) || 0,
      no_pr: form.no_pr,
      no_po: form.no_po,
      no_kontrak: form.no_kontrak,
      tgl_kontrak: form.tgl_kontrak,
      durasi_kontrak: parseInt(form.durasi_kontrak) || 0,
      no_sp3: form.no_sp3,
      tgl_sp3: form.tgl_sp3,
      tgl_bamk: form.tgl_bamk,
      assets: [],
    };
    onSave(form.anggaranId, newProj);
  };

  return (
    <div className="add-modal-overlay" onClick={onClose}>
      <div className="add-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="add-modal-hdr">
          <div className="add-modal-hdr-left">
            <div className="add-modal-ico blue">
              <Icon d={I.briefcase} size={18} />
            </div>
            <div>
              <h3>Tambah Pekerjaan CAPEX</h3>
              <p>Isi semua informasi pekerjaan baru di bawah ini</p>
            </div>
          </div>
          <button className="m-close" onClick={onClose}>
            <Icon d={I.x} size={14} />
          </button>
        </div>

        <div className="add-modal-body">
          <p className="req-note">
            Kolom bertanda <span style={{ color: "var(--red)" }}>*</span> wajib
            diisi
          </p>

          <div className="add-modal-section">
            <div className="add-modal-section-hdr">
              <Icon d={I.database} size={13} /> Pos Anggaran CAPEX
            </div>
            <div className="add-modal-section-body">
              <div className="mhfld">
                <div className="mhfld-lbl">
                  Pos Anggaran<span className="req">*</span>
                </div>
                <div className="mhfld-inp">
                  <select
                    value={form.anggaranId}
                    onChange={(e) => up("anggaranId", e.target.value)}
                  >
                    <option value="">— Pilih Pos Anggaran —</option>
                    {capexData.map((a) => (
                      <option key={a.id} value={a.id}>
                        [{a.kode}] {a.thnAnggaran} —{" "}
                        {a.nama.length > 50
                          ? a.nama.substring(0, 50) + "..."
                          : a.nama}
                      </option>
                    ))}
                  </select>
                  {anggaranPilihan && (
                    <div
                      style={{
                        marginTop: 6,
                        padding: "8px 10px",
                        background: "var(--blue-lt)",
                        borderRadius: 6,
                        border: "1px solid var(--blue-mid)",
                        fontSize: "0.75rem",
                      }}
                    >
                      <div
                        style={{ display: "flex", gap: 20, flexWrap: "wrap" }}
                      >
                        <span>
                          <b style={{ color: "var(--ink3)" }}>Kode:</b>{" "}
                          <code
                            style={{
                              fontFamily: "var(--mono)",
                              color: "var(--blue)",
                            }}
                          >
                            {anggaranPilihan.kode}
                          </code>
                        </span>
                        <span>
                          <b style={{ color: "var(--ink3)" }}>Tahun:</b>{" "}
                          {anggaranPilihan.thnAnggaran}
                        </span>
                        {anggaranPilihan.pagu > 0 && (
                          <span>
                            <b style={{ color: "var(--ink3)" }}>Pagu:</b>{" "}
                            <b style={{ color: "var(--blue)" }}>
                              {fmt(anggaranPilihan.pagu)}
                            </b>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="add-modal-section">
            <div className="add-modal-section-hdr">
              <Icon d={I.fileText} size={13} /> Informasi Pekerjaan
            </div>
            <div className="add-modal-section-body">
              <div className="mhfld">
                <div className="mhfld-lbl">
                  Nama Pekerjaan<span className="req">*</span>
                </div>
                <div className="mhfld-inp">
                  <textarea
                    placeholder="Deskripsi lengkap nama pekerjaan..."
                    value={form.nm_pekerjaan}
                    onChange={(e) => up("nm_pekerjaan", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div className="mhfld">
                <div className="mhfld-lbl">Nilai RAB (IDR)</div>
                <div className="mhfld-inp">
                  <div className="mhfld-2col">
                    <input
                      type="number"
                      placeholder="0"
                      value={form.nilai_rab}
                      onChange={(e) => up("nilai_rab", e.target.value)}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {form.nilai_rab > 0 && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--ink3)",
                            fontWeight: 600,
                          }}
                        >
                          {fmt(parseFloat(form.nilai_rab) || 0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mhfld">
                <div className="mhfld-lbl">Nilai Kontrak (IDR)</div>
                <div className="mhfld-inp">
                  <div className="mhfld-2col">
                    <input
                      type="number"
                      placeholder="0"
                      value={form.nilai_kontrak}
                      onChange={(e) => up("nilai_kontrak", e.target.value)}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {form.nilai_kontrak > 0 && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--red)",
                            fontWeight: 600,
                          }}
                        >
                          {fmt(parseFloat(form.nilai_kontrak) || 0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mhfld">
                <div className="mhfld-lbl">Durasi Kontrak</div>
                <div className="mhfld-inp">
                  <div className="mhfld-2col">
                    <input
                      type="number"
                      placeholder="Jumlah hari"
                      value={form.durasi_kontrak}
                      onChange={(e) => up("durasi_kontrak", e.target.value)}
                    />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{ fontSize: "0.78rem", color: "var(--ink3)" }}
                      >
                        hari kerja
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="add-modal-section">
            <div className="add-modal-section-hdr">
              <Icon d={I.tag} size={13} /> Referensi Dokumen
            </div>
            <div className="add-modal-section-body">
              <div className="mhfld">
                <div className="mhfld-lbl">No. PR</div>
                <div className="mhfld-inp">
                  <input
                    placeholder="cth. 8260001121"
                    value={form.no_pr}
                    onChange={(e) => up("no_pr", e.target.value)}
                  />
                </div>
              </div>
              <div className="mhfld">
                <div className="mhfld-lbl">No. PO</div>
                <div className="mhfld-inp">
                  <input
                    placeholder="cth. 6440000839"
                    value={form.no_po}
                    onChange={(e) => up("no_po", e.target.value)}
                  />
                </div>
              </div>
              <div className="mhfld">
                <div className="mhfld-lbl">No. Kontrak</div>
                <div className="mhfld-inp">
                  <input
                    placeholder="cth. SI.01/10/9/2/PPTI/TEKI/PLMT-24"
                    value={form.no_kontrak}
                    onChange={(e) => up("no_kontrak", e.target.value)}
                  />
                </div>
              </div>
              <div className="mhfld">
                <div className="mhfld-lbl">Tanggal Kontrak</div>
                <div className="mhfld-inp">
                  <input
                    type="date"
                    value={form.tgl_kontrak}
                    onChange={(e) => up("tgl_kontrak", e.target.value)}
                  />
                </div>
              </div>
              <div className="mhfld">
                <div className="mhfld-lbl">No. SP3</div>
                <div className="mhfld-inp">
                  <input
                    placeholder="Nomor SP3"
                    value={form.no_sp3}
                    onChange={(e) => up("no_sp3", e.target.value)}
                  />
                </div>
              </div>
              {/* ── FIX 1: Tgl SP3 dan Tgl BAMK vertikal (tidak sejajar) ── */}
              <div className="mhfld">
                <div className="mhfld-lbl">Tanggal SP3</div>
                <div className="mhfld-inp">
                  <input
                    type="date"
                    value={form.tgl_sp3}
                    onChange={(e) => up("tgl_sp3", e.target.value)}
                  />
                </div>
              </div>
              <div className="mhfld">
                <div className="mhfld-lbl">Tanggal BAMK</div>
                <div className="mhfld-inp">
                  <input
                    type="date"
                    value={form.tgl_bamk}
                    onChange={(e) => up("tgl_bamk", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="add-modal-foot">
          <button className="btn btn-outline" onClick={onClose}>
            Batal
          </button>
          <button
            className="btn btn-prim"
            style={{
              opacity: !form.nm_pekerjaan || !form.anggaranId ? 0.5 : 1,
            }}
            onClick={handleSave}
          >
            <Icon d={I.save} size={13} /> Simpan Pekerjaan
          </button>
        </div>
      </div>
    </div>
  );
}

function TambahOpexModal({ onClose, onSave }) {
  const currentYear = new Date().getFullYear();
  const [form, setForm] = useState({
    kd_anggaran_master: "",
    nama: "",
    thn_anggaran: String(currentYear),
    nilai_anggaran_tahunan: "",
  });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleMaster = (kd) => {
    const m = BUDGET_MASTERS.find((x) => x.kd_anggaran_master === kd);
    setForm((f) => ({
      ...f,
      kd_anggaran_master: kd,
      nama: m ? m.nm_anggaran_master : f.nama,
    }));
  };
  const handleSave = () => {
    if (!form.nama || !form.thn_anggaran) return;
    onSave({
      id: `OPX-${Date.now()}`,
      kd_anggaran_master: form.kd_anggaran_master,
      nama: form.nama,
      thn_anggaran: parseInt(form.thn_anggaran) || currentYear,
      nilai_anggaran_tahunan: parseFloat(form.nilai_anggaran_tahunan) || 0,
      type: "opex",
      transaksi: [],
    });
  };
  return (
    <div className="add-modal-overlay" onClick={onClose}>
      <div className="add-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="add-modal-hdr">
          <div className="add-modal-hdr-left">
            <div className="add-modal-ico green">
              <Icon d={I.monitor} size={18} />
            </div>
            <div>
              <h3>Tambah Pos Anggaran OPEX</h3>
              <p>Isi informasi pos anggaran OPEX baru</p>
            </div>
          </div>
          <button className="m-close" onClick={onClose}>
            <Icon d={I.x} size={14} />
          </button>
        </div>
        <div className="add-modal-body">
          <p className="req-note">
            Kolom bertanda <span style={{ color: "var(--red)" }}>*</span> wajib
            diisi
          </p>
          <div className="add-modal-section">
            <div
              className="add-modal-section-hdr"
              style={{ color: "var(--green)" }}
            >
              <Icon d={I.database} size={13} /> Informasi Pos Anggaran
            </div>
            <div className="add-modal-section-body">
              <div className="mhfld green">
                <div className="mhfld-lbl">Kode Master Anggaran</div>
                <div className="mhfld-inp">
                  <select
                    value={form.kd_anggaran_master}
                    onChange={(e) => handleMaster(e.target.value)}
                  >
                    <option value="">— Pilih Kode Master (Opsional) —</option>
                    {BUDGET_MASTERS.map((m) => (
                      <option
                        key={m.kd_anggaran_master}
                        value={m.kd_anggaran_master}
                      >
                        {m.kd_anggaran_master} — {m.nm_anggaran_master}
                      </option>
                    ))}
                  </select>
                  {form.kd_anggaran_master && (
                    <div
                      style={{
                        marginTop: 6,
                        padding: "6px 10px",
                        background: "var(--green-lt)",
                        borderRadius: 6,
                        border: "1px solid var(--green-mid)",
                        fontSize: "0.74rem",
                      }}
                    >
                      <span style={{ color: "var(--ink3)" }}>
                        Kode terpilih:{" "}
                      </span>
                      <code
                        style={{
                          fontFamily: "var(--mono)",
                          color: "var(--green)",
                          fontWeight: 700,
                        }}
                      >
                        {form.kd_anggaran_master}
                      </code>
                    </div>
                  )}
                </div>
              </div>
              <div className="mhfld green">
                <div className="mhfld-lbl">
                  Nama Pos Anggaran<span className="req">*</span>
                </div>
                <div className="mhfld-inp">
                  <input
                    placeholder="Nama pos anggaran OPEX..."
                    value={form.nama}
                    onChange={(e) => up("nama", e.target.value)}
                  />
                </div>
              </div>
              <div className="mhfld green">
                <div className="mhfld-lbl">
                  Tahun Anggaran<span className="req">*</span>
                </div>
                <div className="mhfld-inp">
                  <div className="mhfld-2col">
                    <input
                      type="number"
                      placeholder="cth. 2026"
                      value={form.thn_anggaran}
                      onChange={(e) => up("thn_anggaran", e.target.value)}
                      min="2020"
                      max="2030"
                    />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{ fontSize: "0.75rem", color: "var(--ink4)" }}
                      >
                        Tahun anggaran berlaku
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mhfld green">
                <div className="mhfld-lbl">Nilai Anggaran Tahunan (IDR)</div>
                <div className="mhfld-inp">
                  <div className="mhfld-2col">
                    <input
                      type="number"
                      placeholder="0"
                      value={form.nilai_anggaran_tahunan}
                      onChange={(e) =>
                        up("nilai_anggaran_tahunan", e.target.value)
                      }
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {form.nilai_anggaran_tahunan > 0 && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--green)",
                            fontWeight: 700,
                          }}
                        >
                          {fmt(parseFloat(form.nilai_anggaran_tahunan) || 0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="add-modal-foot">
          <button className="btn btn-outline" onClick={onClose}>
            Batal
          </button>
          <button
            className="btn btn-green"
            style={{ opacity: !form.nama || !form.thn_anggaran ? 0.5 : 1 }}
            onClick={handleSave}
          >
            <Icon d={I.save} size={13} /> Simpan Pos Anggaran
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// FIX 3: ASSET TABLE PAGE — tambah tombol Export Excel
// ══════════════════════════════════════════════════════════════════
function AssetTablePage({
  project,
  anggaran,
  onBack,
  onEntryNew,
  onSaveAssets,
  showToast,
}) {
  const [searchQ, setSearchQ] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [locFilter, setLocFilter] = useState("all");
  const [confirm, setConfirm] = useState(null);
  const assets = project.assets || [];
  const cats = useMemo(
    () => [
      "all",
      ...Array.from(new Set(assets.map((a) => a.category).filter(Boolean))),
    ],
    [assets],
  );
  const locs = useMemo(
    () => [
      "all",
      ...Array.from(new Set(assets.map((a) => a.location).filter(Boolean))),
    ],
    [assets],
  );
  const filtered = useMemo(
    () =>
      assets.filter((a) => {
        if (catFilter !== "all" && a.category !== catFilter) return false;
        if (locFilter !== "all" && a.location !== locFilter) return false;
        if (searchQ) {
          const q = searchQ.toLowerCase();
          return (
            a.name?.toLowerCase().includes(q) ||
            a.asset_code?.toLowerCase().includes(q) ||
            a.serial_number?.toLowerCase().includes(q) ||
            a.brand?.toLowerCase().includes(q) ||
            a.model?.toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [assets, catFilter, locFilter, searchQ],
  );

  const totalFiltered = filtered.reduce(
    (s, a) => s + (a.acquisition_value || 0),
    0,
  );
  const totalAll = assets.reduce((s, a) => s + (a.acquisition_value || 0), 0);
  const pct =
    project.nilai_kontrak > 0
      ? Math.round((totalAll / project.nilai_kontrak) * 100)
      : 0;

  const deleteAsset = (id) =>
    setConfirm({
      msg: "Hapus aset ini dari daftar pekerjaan?",
      onConfirm: () => {
        onSaveAssets(
          project.id,
          assets.filter((a) => a.id !== id),
        );
        showToast("Aset dihapus");
        setConfirm(null);
      },
    });

  const handleExport = () => {
    if (filtered.length === 0) {
      showToast("Tidak ada data untuk diekspor");
      return;
    }
    exportAssetsToExcel(filtered, project.nm_pekerjaan, project.no_kontrak);
    showToast(`${filtered.length} aset berhasil diekspor ke Excel`);
  };

  return (
    <div className="asset-page">
      <div className="asset-page-hdr">
        <div className="asset-page-hdr-left">
          <button className="btn btn-outline" onClick={onBack}>
            <Icon d={I.arrowLeft} size={12} /> Kembali
          </button>
          <div>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "var(--ink)",
                marginBottom: 3,
              }}
            >
              Daftar Aset Pekerjaan
            </h2>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--ink4)",
                fontWeight: 500,
              }}
            >
              {assets.length} aset terdaftar ·{" "}
              {project.nm_pekerjaan?.substring(0, 55)}
              {project.nm_pekerjaan?.length > 55 ? "…" : ""}
            </p>
          </div>
        </div>
        <div className="asset-page-hdr-right">
          {/* ── FIX 3: Tombol Export Excel ── */}
          <button className="btn btn-excel" onClick={handleExport}>
            <Icon d={I.download} size={13} /> Export Excel
          </button>
          <button className="btn btn-prim" onClick={onEntryNew}>
            <Icon d={I.plus} size={13} /> Entry Aset Baru
          </button>
        </div>
      </div>
      <div className="asset-ctx-banner">
        <div className="asset-ctx-item">
          <span>Pekerjaan</span>
          <strong style={{ maxWidth: 260 }}>
            {project.nm_pekerjaan?.substring(0, 48)}
            {project.nm_pekerjaan?.length > 48 ? "…" : ""}
          </strong>
        </div>
        <div className="asset-ctx-item">
          <span>No. Kontrak</span>
          <strong>
            <code style={{ fontFamily: "var(--mono)", fontSize: "0.82rem" }}>
              {project.no_kontrak || "—"}
            </code>
          </strong>
        </div>
        <div className="asset-ctx-item">
          <span>Nilai Kontrak</span>
          <strong style={{ color: "var(--red)" }}>
            {project.nilai_kontrak > 0 ? fmt(project.nilai_kontrak) : "—"}
          </strong>
        </div>
        <div className="asset-ctx-item">
          <span>Total Nilai Aset</span>
          <strong style={{ color: "var(--blue)" }}>{fmt(totalAll)}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Serapan Aset</span>
          <strong style={{ color: pctColor(pct) }}>{pct}%</strong>
        </div>
      </div>
      <div className="asset-toolbar">
        <div className="asset-toolbar-left">
          <div className="at-filter">
            <Icon d={I.search} size={13} />
            <input
              placeholder="Cari nama, kode, S/N, merek…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </div>
        <div className="asset-toolbar-right">
          <div className="at-filter">
            <Icon d={I.filter} size={13} />
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              <option value="all">Semua Kategori</option>
              {cats
                .filter((c) => c !== "all")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
          <div className="at-filter">
            <Icon d={I.mapPin} size={13} />
            <select
              value={locFilter}
              onChange={(e) => setLocFilter(e.target.value)}
            >
              <option value="all">Semua Lokasi</option>
              {locs
                .filter((l) => l !== "all")
                .map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="asset-table-wrap">
        <table className="asset-table">
          <thead>
            <tr>
              <th className="th-no">No</th>
              <th>Nama Aset</th>
              <th>Kode Aset</th>
              <th>Serial Number</th>
              <th>Kategori</th>
              <th>Lokasi</th>
              <th>Tgl. Pengadaan</th>
              <th>Nilai Perolehan</th>
              <th className="th-actions">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="table-empty-row">
                <td colSpan={9}>
                  <div className="table-empty-inner">
                    <Icon d={I.package} size={36} style={{ opacity: 0.2 }} />
                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {assets.length === 0
                        ? "Belum ada aset terdaftar."
                        : "Tidak ada aset yang cocok."}
                    </span>
                    {assets.length === 0 && (
                      <button
                        className="btn btn-prim"
                        style={{ marginTop: 4 }}
                        onClick={onEntryNew}
                      >
                        <Icon d={I.plus} size={12} /> Tambah Aset Pertama
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((a, i) => (
                <tr key={a.id}>
                  <td className="td-no">{i + 1}</td>
                  <td>
                    <div className="td-asset-name">
                      <div className="td-thumb">
                        {a.image ? (
                          <img src={a.image} alt={a.name} />
                        ) : (
                          <div className="td-thumb-empty">
                            <Icon d={I.image} size={16} />
                          </div>
                        )}
                      </div>
                      <div className="td-name-block">
                        <span className="td-name-text">{a.name || "—"}</span>
                        <span className="td-name-sub">
                          {[a.brand, a.model].filter(Boolean).join(" · ") ||
                            "—"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="td-code">{a.asset_code || "—"}</span>
                  </td>
                  <td>
                    <span className="td-sn">{a.serial_number || "—"}</span>
                  </td>
                  <td>
                    <CatPill cat={a.category} />
                  </td>
                  <td>
                    <div className="td-loc">
                      <Icon
                        d={I.mapPin}
                        size={11}
                        style={{ color: "var(--ink4)", flexShrink: 0 }}
                      />
                      {a.location || "—"}
                    </div>
                  </td>
                  <td>
                    <span className="td-date">
                      {fmtDate(a.procurement_date)}
                    </span>
                  </td>
                  <td>
                    <span className="td-value">{fmt(a.acquisition_value)}</span>
                  </td>
                  <td className="td-actions">
                    <div className="td-act-row">
                      <button
                        className="abtn del"
                        onClick={() => deleteAsset(a.id)}
                      >
                        <Icon d={I.trash} size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {filtered.length > 0 && (
            <tfoot>
              <tr>
                <td
                  colSpan={7}
                  style={{
                    fontWeight: 700,
                    color: "var(--blue)",
                    fontSize: "0.75rem",
                  }}
                >
                  Total {filtered.length} aset
                </td>
                <td className="tfoot-total">{fmt(totalFiltered)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
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

function RealisasiTablePage({
  ang,
  onBack,
  onEntryNew,
  onEditRow,
  onDeleteRow,
  showToast,
}) {
  const [searchQ, setSearchQ] = useState("");
  const transactions = ang.transaksi || [];
  const filtered = useMemo(
    () =>
      transactions.filter((t) => {
        if (searchQ) {
          const q = searchQ.toLowerCase();
          return (
            t.keterangan?.toLowerCase().includes(q) ||
            t.no_invoice?.toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [transactions, searchQ],
  );
  const totalFiltered = filtered.reduce((s, t) => s + (t.jumlah || 0), 0);
  const totalAll = transactions.reduce((s, t) => s + (t.jumlah || 0), 0);
  const pagu = ang.nilai_anggaran_tahunan || 0;
  const sisa = pagu - totalAll;
  const pct = pagu > 0 ? Math.round((totalAll / pagu) * 100) : 0;

  return (
    <div className="asset-page">
      <div className="asset-page-hdr">
        <div className="asset-page-hdr-left">
          <button className="btn btn-outline" onClick={onBack}>
            <Icon d={I.arrowLeft} size={12} /> Kembali
          </button>
          <div>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "var(--ink)",
                marginBottom: 3,
              }}
            >
              Riwayat Realisasi OPEX
            </h2>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--ink4)",
                fontWeight: 500,
              }}
            >
              {transactions.length} transaksi · {ang.nama?.substring(0, 55)}
            </p>
          </div>
        </div>
        <div className="asset-page-hdr-right">
          <button className="btn btn-green" onClick={onEntryNew}>
            <Icon d={I.plus} size={13} /> Entry Transaksi Baru
          </button>
        </div>
      </div>
      <div className="asset-ctx-banner opex-theme">
        <div className="asset-ctx-item">
          <span>Pos Anggaran</span>
          <strong>{ang.nama?.substring(0, 48)}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Kode Master</span>
          <strong>
            <code style={{ fontFamily: "var(--mono)", fontSize: "0.82rem" }}>
              {ang.kd_anggaran_master || "—"}
            </code>
          </strong>
        </div>
        <div className="asset-ctx-item">
          <span>Pagu Anggaran</span>
          <strong style={{ color: "var(--blue)" }}>
            {pagu > 0 ? fmt(pagu) : "—"}
          </strong>
        </div>
        <div className="asset-ctx-item">
          <span>Total Realisasi</span>
          <strong style={{ color: "var(--amber)" }}>{fmt(totalAll)}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Sisa Anggaran</span>
          <strong style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>
            {fmt(Math.abs(sisa))} {sisa < 0 && "(melebihi)"}
          </strong>
        </div>
      </div>
      <div className="asset-toolbar">
        <div className="asset-toolbar-left">
          <div className="at-filter">
            <Icon d={I.search} size={13} />
            <input
              placeholder="Cari keterangan atau no. invoice…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="asset-table-wrap">
        <table className="asset-table opex-table">
          <thead>
            <tr>
              <th className="th-no">No</th>
              <th>Tanggal</th>
              <th>No. Invoice</th>
              <th>Keterangan Realisasi</th>
              <th>Lampiran</th>
              <th>Jumlah (IDR)</th>
              <th className="th-actions">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="table-empty-row">
                <td colSpan={7}>
                  <div className="table-empty-inner">
                    <Icon d={I.fileText} size={36} style={{ opacity: 0.2 }} />
                    <span style={{ fontWeight: 600 }}>
                      {transactions.length === 0
                        ? "Belum ada riwayat realisasi."
                        : "Tidak ada transaksi yang cocok."}
                    </span>
                    {transactions.length === 0 && (
                      <button
                        className="btn btn-green"
                        style={{ marginTop: 4 }}
                        onClick={onEntryNew}
                      >
                        <Icon d={I.plus} size={12} /> Tambah Transaksi Pertama
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((t, i) => (
                <tr key={t.id}>
                  <td className="td-no">{i + 1}</td>
                  <td>
                    <span className="td-date">{fmtDate(t.tanggal)}</span>
                  </td>
                  <td>
                    <span className="td-sn" style={{ color: "var(--ink)" }}>
                      {t.no_invoice || "—"}
                    </span>
                  </td>
                  <td>
                    <span className="td-name-text">{t.keterangan || "—"}</span>
                  </td>
                  <td>
                    {t.lampiran ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "0.7rem",
                          color: "var(--ink3)",
                        }}
                      >
                        <Icon d={I.fileText} size={11} />
                        {t.lampiran}
                      </span>
                    ) : (
                      <span style={{ color: "var(--ink4)" }}>—</span>
                    )}
                  </td>
                  <td>
                    <span
                      className="td-value"
                      style={{ color: "var(--amber)" }}
                    >
                      {fmt(t.jumlah)}
                    </span>
                  </td>
                  <td className="td-actions">
                    <div className="td-act-row">
                      <button className="abtn" onClick={() => onEditRow(t)}>
                        <Icon d={I.edit} size={11} />
                      </button>
                      <button
                        className="abtn del"
                        onClick={() => onDeleteRow(t.id)}
                      >
                        <Icon d={I.trash} size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {filtered.length > 0 && (
            <tfoot>
              <tr>
                <td
                  colSpan={5}
                  style={{ fontWeight: 700, fontSize: "0.75rem" }}
                >
                  Total {filtered.length} transaksi
                </td>
                <td className="tfoot-total">{fmt(totalFiltered)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

function CapexCard({ proj, onEdit, onAssetTable, onAssetEntry, onDelete }) {
  const [open, setOpen] = useState(false);
  const assets = proj.assets || [];
  const assetTotal = assets.reduce((s, a) => s + (a.acquisition_value || 0), 0);
  const pct =
    proj.nilai_kontrak > 0
      ? Math.round((assetTotal / proj.nilai_kontrak) * 100)
      : 0;

  return (
    <div className={`jcard ${open ? "open-cap" : ""}`}>
      <div className="jcard-inner">
        <div className="jcard-accent cap" />
        <div className="jcard-content">
          <div className="jcard-top" onClick={() => setOpen((v) => !v)}>
            <div className="jc-info">
              <div className="jc-tags">
                <span className="badge capex">CAPEX</span>
                <span className="yr-tag">{proj._thn}</span>
                <code className="code-tag">{proj._angKode}</code>
              </div>
              <p className="jc-title">{proj.nm_pekerjaan}</p>
            </div>
            <div className="jc-meta">
              <span>
                <Icon d={I.calendar} size={12} />
                {fmtDate(proj.tgl_kontrak)}
              </span>
              {proj.durasi_kontrak > 0 && (
                <span>
                  <Icon d={I.clock} size={12} />
                  {proj.durasi_kontrak} hari kerja
                </span>
              )}
            </div>
            <div className="jc-fin">
              <div className="amt-blk">
                <span className="amt-lbl">Nilai Kontrak</span>
                <span className="amt-val red">{fmt(proj.nilai_kontrak)}</span>
              </div>
              <div className="fin-div" />
              <div className="amt-blk">
                <span className="amt-lbl">Aset Tercatat</span>
                <span className="amt-val blue">{fmt(assetTotal)}</span>
              </div>
            </div>
            <div className="jc-actions">
              <PctRing pct={pct} />
              <div className="act-btns" onClick={(e) => e.stopPropagation()}>
                <button className="abtn" onClick={() => onEdit(proj)}>
                  <Icon d={I.edit} size={12} /> Edit
                </button>
                <button
                  className="abtn blue"
                  onClick={() => onAssetTable(proj)}
                >
                  <Icon d={I.table} size={12} />
                  {assets.length > 0 ? `${assets.length} Aset` : "Lihat Aset"}
                </button>
                <button className="abtn del" onClick={() => onDelete(proj)}>
                  <Icon d={I.trash} size={12} />
                </button>
              </div>
              <div className="chev">
                <Icon d={open ? I.chevUp : I.chevDown} size={14} />
              </div>
            </div>
          </div>
          {open && (
            <div className="jcard-detail">
              <div className="detail-grid">
                <div className="d-panel">
                  <div className="d-title">Informasi Kontrak</div>
                  <div className="d-rows">
                    {proj.no_kontrak && (
                      <div className="d-row">
                        <span className="lbl">No. Kontrak</span>
                        <span className="val">
                          <code>{proj.no_kontrak}</code>
                        </span>
                      </div>
                    )}
                    {proj.no_po && (
                      <div className="d-row">
                        <span className="lbl">No. PO</span>
                        <span className="val">
                          <code>{proj.no_po}</code>
                        </span>
                      </div>
                    )}
                    {proj.no_pr && (
                      <div className="d-row">
                        <span className="lbl">No. PR</span>
                        <span className="val">
                          <code>{proj.no_pr}</code>
                        </span>
                      </div>
                    )}
                    {proj.tgl_kontrak && (
                      <div className="d-row">
                        <span className="lbl">Tgl. Kontrak</span>
                        <span className="val">{fmtDate(proj.tgl_kontrak)}</span>
                      </div>
                    )}
                    {proj.durasi_kontrak > 0 && (
                      <div className="d-row">
                        <span className="lbl">Durasi</span>
                        <span className="val">{proj.durasi_kontrak} hari</span>
                      </div>
                    )}
                    {proj.tgl_sp3 && (
                      <div className="d-row">
                        <span className="lbl">Tgl. SP3</span>
                        <span className="val">{fmtDate(proj.tgl_sp3)}</span>
                      </div>
                    )}
                    {proj.tgl_bamk && (
                      <div className="d-row">
                        <span className="lbl">BAMK</span>
                        <span className="val">{fmtDate(proj.tgl_bamk)}</span>
                      </div>
                    )}
                    {proj.nilai_rab > 0 && (
                      <div className="d-row">
                        <span className="lbl">Nilai RAB</span>
                        <span className="val">{fmt(proj.nilai_rab)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-panel">
                  <div className="d-title">
                    Aset Tercatat
                    <button
                      className="inline-link"
                      onClick={() => onAssetTable(proj)}
                    >
                      <Icon d={I.eye} size={11} /> Lihat & Edit Aset →
                    </button>
                  </div>
                  {assets.length === 0 ? (
                    <div className="d-empty">
                      Belum ada aset.
                      <div style={{ marginTop: 10 }}>
                        <button
                          className="btn btn-prim"
                          style={{ fontSize: "0.75rem", padding: "6px 14px" }}
                          onClick={() => onAssetEntry(proj)}
                        >
                          <Icon d={I.plus} size={11} /> Entry Aset Baru
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ai-list">
                      {assets.slice(0, 3).map((a) => (
                        <div key={a.id} className="ai-item">
                          <div className="ai-info">
                            <code className="a-code">{a.asset_code}</code>
                            <div>
                              <p className="a-name">{a.name}</p>
                              <p className="a-loc">
                                <Icon d={I.mapPin} size={10} />
                                {a.location}
                              </p>
                            </div>
                          </div>
                          <span className="a-val">
                            {fmt(a.acquisition_value)}
                          </span>
                        </div>
                      ))}
                      {assets.length > 3 && (
                        <div style={{ textAlign: "center", paddingTop: 4 }}>
                          <button
                            className="inline-link"
                            onClick={() => onAssetTable(proj)}
                          >
                            + {assets.length - 3} aset lainnya →
                          </button>
                        </div>
                      )}
                      <div className="panel-total blue">
                        <span>Total Nilai</span>
                        <strong>{fmt(assetTotal)}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OpexCard({
  ang,
  onSaveOpex,
  showToast,
  onDelete,
  onRealisasiTable,
  onRealisasiEntry,
}) {
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const totalReal = (ang.transaksi || []).reduce(
    (s, t) => s + (t.jumlah || 0),
    0,
  );
  const pagu = ang.nilai_anggaran_tahunan || 0;
  const sisa = pagu - totalReal;
  const pct = pagu > 0 ? Math.round((totalReal / pagu) * 100) : 0;
  const masterInfo = BUDGET_MASTERS.find(
    (m) => m.kd_anggaran_master === ang.kd_anggaran_master,
  );

  return (
    <div className={`jcard ${open ? "open-opx" : ""}`}>
      <div className="jcard-inner">
        <div className="jcard-accent opx" />
        <div className="jcard-content">
          <div className="jcard-top" onClick={() => setOpen((v) => !v)}>
            <div className="jc-info">
              <div className="jc-tags">
                <span className="badge opex">OPEX</span>
                <span className="yr-tag">Thn {ang.thn_anggaran}</span>
                <code className="code-tag">{ang.kd_anggaran_master}</code>
              </div>
              <p className="jc-title">{ang.nama}</p>
            </div>
            <div className="jc-meta">
              <span>
                <Icon d={I.database} size={12} />
                {masterInfo?.nm_anggaran_master || ang.nama}
              </span>
            </div>
            <div className="jc-fin">
              <div className="amt-blk">
                <span className="amt-lbl">Pagu Anggaran</span>
                <span className="amt-val blue">{fmt(pagu)}</span>
              </div>
              <div className="fin-div" />
              <div className="amt-blk">
                <span className="amt-lbl">Realisasi</span>
                <span className="amt-val amber">{fmt(totalReal)}</span>
              </div>
              <div className="fin-div" />
              <div className="amt-blk">
                <span className="amt-lbl">Sisa</span>
                <span className={`amt-val ${sisa >= 0 ? "green" : "red"}`}>
                  {fmt(Math.abs(sisa))}
                </span>
              </div>
            </div>
            <div className="jc-actions">
              <PctRing pct={pct} />
              <div className="act-btns" onClick={(e) => e.stopPropagation()}>
                <button
                  className={`abtn ${showEdit ? "del" : ""}`}
                  onClick={() => {
                    setShowEdit((v) => !v);
                    if (!showEdit) setOpen(true);
                  }}
                >
                  <Icon d={showEdit ? I.x : I.edit} size={12} />
                  {showEdit ? "Tutup" : "Edit"}
                </button>
                <button
                  className="abtn green"
                  onClick={() => onRealisasiTable(ang)}
                >
                  <Icon d={I.table} size={12} />
                  {ang.transaksi?.length > 0
                    ? `${ang.transaksi.length} Transaksi`
                    : "Lihat Riwayat"}
                </button>
                <button className="abtn del" onClick={() => onDelete(ang.id)}>
                  <Icon d={I.trash} size={12} />
                </button>
              </div>
              <div className="chev">
                <Icon d={open ? I.chevUp : I.chevDown} size={14} />
              </div>
            </div>
          </div>
          {showEdit && (
            <EditOpexInline
              ang={ang}
              onSave={(u) => {
                onSaveOpex(ang.id, u);
                showToast("Pos diperbarui");
                setShowEdit(false);
              }}
              onCancel={() => setShowEdit(false)}
            />
          )}
          {open && (
            <div className="jcard-detail">
              <div className="detail-grid">
                <div className="d-panel">
                  <div className="d-title">Ringkasan Dana</div>
                  <div className="d-rows">
                    <div className="d-row">
                      <span className="lbl">Kode Master</span>
                      <span className="val">
                        <code>{ang.kd_anggaran_master}</code>
                      </span>
                    </div>
                    <div className="d-row">
                      <span className="lbl">Tahun Anggaran</span>
                      <span className="val">{ang.thn_anggaran}</span>
                    </div>
                    <div className="d-row">
                      <span className="lbl">Total Anggaran (Pagu)</span>
                      <span className="val blue">{fmt(pagu)}</span>
                    </div>
                    <div className="d-row">
                      <span className="lbl">Total Realisasi</span>
                      <span className="val amber">{fmt(totalReal)}</span>
                    </div>
                    <div className="d-row">
                      <span className="lbl">Sisa Anggaran</span>
                      <span className={`val ${sisa >= 0 ? "green" : "red"}`}>
                        {fmt(Math.abs(sisa))} {sisa < 0 && "(melebihi)"}
                      </span>
                    </div>
                    <div className="d-row">
                      <span className="lbl">Persentase Serapan</span>
                      <span className="val">{pct}%</span>
                    </div>
                  </div>
                </div>
                <div className="d-panel">
                  <div className="d-title">
                    Riwayat Realisasi
                    <button
                      className="inline-link"
                      onClick={() => onRealisasiTable(ang)}
                    >
                      <Icon d={I.eye} size={11} /> Lihat & Edit →
                    </button>
                  </div>
                  {!ang.transaksi || ang.transaksi.length === 0 ? (
                    <div className="d-empty">
                      Belum ada realisasi.
                      <div style={{ marginTop: 10 }}>
                        <button
                          className="btn btn-green"
                          style={{ fontSize: "0.75rem", padding: "6px 14px" }}
                          onClick={() => onRealisasiEntry(ang)}
                        >
                          <Icon d={I.plus} size={11} /> Entry Transaksi Baru
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ri-list">
                      {ang.transaksi.slice(0, 3).map((t) => (
                        <div key={t.id} className="ri-item">
                          <div className="ri-info">
                            <span className="r-id">{t.no_invoice || "—"}</span>
                            <div>
                              <p className="r-ket">{t.keterangan}</p>
                              <p className="r-date">{fmtDate(t.tanggal)}</p>
                            </div>
                          </div>
                          <span className="r-val">{fmt(t.jumlah)}</span>
                        </div>
                      ))}
                      {ang.transaksi.length > 3 && (
                        <div style={{ textAlign: "center", paddingTop: 4 }}>
                          <button
                            className="inline-link"
                            onClick={() => onRealisasiTable(ang)}
                          >
                            + {ang.transaksi.length - 3} lainnya →
                          </button>
                        </div>
                      )}
                      <div className="panel-total amber">
                        <span>Total Realisasi</span>
                        <strong>{fmt(totalReal)}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EditOpexInline({ ang, onSave, onCancel }) {
  const [form, setForm] = useState({
    kd_anggaran_master: ang.kd_anggaran_master || "",
    nama: ang.nama || "",
    thn_anggaran: ang.thn_anggaran || new Date().getFullYear(),
    nilai_anggaran_tahunan: ang.nilai_anggaran_tahunan || 0,
  });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleMaster = (kd) => {
    const m = BUDGET_MASTERS.find((x) => x.kd_anggaran_master === kd);
    setForm((f) => ({
      ...f,
      kd_anggaran_master: kd,
      nama: m ? m.nm_anggaran_master : f.nama,
    }));
  };
  return (
    <div
      style={{
        background: "var(--green-lt)",
        borderTop: "1px solid var(--green-mid)",
        borderBottom: "1px solid var(--green-mid)",
        padding: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px 8px",
          borderBottom: "1px solid var(--green-mid)",
        }}
      >
        <h3
          style={{
            fontSize: "0.82rem",
            fontWeight: 800,
            color: "var(--green)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon d={I.edit} size={12} /> Edit Pos OPEX
        </h3>
        <button
          className="btn btn-outline"
          style={{ padding: "4px 10px", fontSize: "0.75rem" }}
          onClick={onCancel}
        >
          <Icon d={I.x} size={10} /> Tutup
        </button>
      </div>
      <div style={{ padding: "4px 20px 8px" }}>
        <div className="mhfld green">
          <div className="mhfld-lbl">Kode Anggaran Master</div>
          <div className="mhfld-inp">
            <select
              value={form.kd_anggaran_master}
              onChange={(e) => handleMaster(e.target.value)}
            >
              <option value="">— Pilih —</option>
              {BUDGET_MASTERS.map((m) => (
                <option key={m.kd_anggaran_master} value={m.kd_anggaran_master}>
                  {m.kd_anggaran_master} — {m.nm_anggaran_master}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mhfld green">
          <div className="mhfld-lbl">Nama Pos Anggaran</div>
          <div className="mhfld-inp">
            <input
              value={form.nama}
              onChange={(e) => up("nama", e.target.value)}
            />
          </div>
        </div>
        <div className="mhfld green">
          <div className="mhfld-lbl">Tahun Anggaran</div>
          <div className="mhfld-inp">
            <div className="mhfld-2col">
              <input
                type="number"
                value={form.thn_anggaran}
                onChange={(e) => up("thn_anggaran", e.target.value)}
              />
              <input
                type="number"
                placeholder="Nilai Anggaran Tahunan (IDR)"
                value={form.nilai_anggaran_tahunan || ""}
                onChange={(e) => up("nilai_anggaran_tahunan", e.target.value)}
              />
            </div>
            <div
              style={{ fontSize: "0.7rem", color: "var(--ink4)", marginTop: 3 }}
            >
              Kolom kedua: Nilai Anggaran Tahunan (IDR)
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px 20px 14px",
        }}
      >
        <button
          className="btn btn-green"
          onClick={() =>
            onSave({
              kd_anggaran_master: form.kd_anggaran_master,
              nama: form.nama,
              thn_anggaran:
                parseInt(form.thn_anggaran) || new Date().getFullYear(),
              nilai_anggaran_tahunan:
                parseFloat(form.nilai_anggaran_tahunan) || 0,
            })
          }
        >
          <Icon d={I.save} size={12} /> Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

function EditProjectPage({ project, anggaran, onBack, onSave, showToast }) {
  const [form, setForm] = useState({ ...project });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSave = () => {
    onSave(project.id, {
      ...form,
      nilai_rab: parseFloat(form.nilai_rab) || 0,
      nilai_kontrak: parseFloat(form.nilai_kontrak) || 0,
      durasi_kontrak: parseInt(form.durasi_kontrak) || 0,
    });
    showToast("Pekerjaan berhasil diperbarui");
    onBack();
  };
  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}>
          <Icon d={I.arrowLeft} size={12} /> Kembali
        </button>
        <div style={{ flex: 1 }}>
          <h2>Edit Pekerjaan CAPEX</h2>
        </div>
      </div>
      <div className="ctx-card">
        <div className="ctx-item">
          <span>Anggaran</span>
          <strong>{anggaran?.nama || "—"}</strong>
        </div>
        <div className="ctx-item">
          <span>Kode</span>
          <strong>
            <code>{anggaran?.kode}</code>
          </strong>
        </div>
        <div className="ctx-item">
          <span>Tahun</span>
          <strong>{anggaran?.thnAnggaran}</strong>
        </div>
        {anggaran?.pagu > 0 && (
          <div className="ctx-item">
            <span>Pagu</span>
            <strong style={{ color: "var(--blue)" }}>
              {fmt(anggaran.pagu)}
            </strong>
          </div>
        )}
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <h3>Informasi Pekerjaan</h3>
        </div>
        <div className="sec-card-body">
          <div className="hfld">
            <div className="hfld-label">
              Nama Pekerjaan<span className="req">*</span>
            </div>
            <div className="hfld-input">
              <textarea
                rows="2"
                value={form.nm_pekerjaan || ""}
                onChange={(e) => up("nm_pekerjaan", e.target.value)}
              />
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">Nilai RAB (IDR)</div>
            <div className="hfld-input">
              <input
                type="number"
                value={form.nilai_rab || ""}
                onChange={(e) => up("nilai_rab", e.target.value)}
              />
              {form.nilai_rab > 0 && (
                <div className="hfld-hint">
                  {fmt(parseFloat(form.nilai_rab))}
                </div>
              )}
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">Nilai Kontrak (IDR)</div>
            <div className="hfld-input">
              <input
                type="number"
                value={form.nilai_kontrak || ""}
                onChange={(e) => up("nilai_kontrak", e.target.value)}
              />
              {form.nilai_kontrak > 0 && (
                <div className="hfld-hint" style={{ color: "var(--red)" }}>
                  {fmt(parseFloat(form.nilai_kontrak))}
                </div>
              )}
            </div>
          </div>
          <div className="hfld" style={{ borderBottom: "none" }}>
            <div className="hfld-label">Durasi Kontrak</div>
            <div className="hfld-input">
              <input
                type="number"
                value={form.durasi_kontrak || ""}
                onChange={(e) => up("durasi_kontrak", e.target.value)}
                placeholder="Jumlah hari"
              />
              <div className="hfld-hint">hari kerja</div>
            </div>
          </div>
        </div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <h3>Referensi Dokumen</h3>
        </div>
        <div className="sec-card-body">
          <div className="hfld">
            <div className="hfld-label">No. PR</div>
            <div className="hfld-input">
              <input
                value={form.no_pr || ""}
                onChange={(e) => up("no_pr", e.target.value)}
              />
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">No. PO</div>
            <div className="hfld-input">
              <input
                value={form.no_po || ""}
                onChange={(e) => up("no_po", e.target.value)}
              />
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">No. Kontrak</div>
            <div className="hfld-input">
              <input
                value={form.no_kontrak || ""}
                onChange={(e) => up("no_kontrak", e.target.value)}
              />
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">Tgl. Kontrak</div>
            <div className="hfld-input">
              <input
                type="date"
                value={form.tgl_kontrak || ""}
                onChange={(e) => up("tgl_kontrak", e.target.value)}
              />
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">No. SP3</div>
            <div className="hfld-input">
              <input
                value={form.no_sp3 || ""}
                onChange={(e) => up("no_sp3", e.target.value)}
              />
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">Tgl. SP3</div>
            <div className="hfld-input">
              <input
                type="date"
                value={form.tgl_sp3 || ""}
                onChange={(e) => up("tgl_sp3", e.target.value)}
              />
            </div>
          </div>
          <div className="hfld" style={{ borderBottom: "none" }}>
            <div className="hfld-label">Tgl. BAMK</div>
            <div className="hfld-input">
              <input
                type="date"
                value={form.tgl_bamk || ""}
                onChange={(e) => up("tgl_bamk", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="edit-footer">
        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>
            Menyimpan perubahan pekerjaan
          </span>
          <strong style={{ fontSize: "0.82rem", display: "block" }}>
            Pastikan semua nilai sudah benar.
          </strong>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-outline" onClick={onBack}>
            Batal
          </button>
          <button className="btn btn-prim" onClick={handleSave}>
            <Icon d={I.save} size={12} /> Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// FIX 2: ASSET ENTRY PAGE — form input aset jadi horizontal
// ══════════════════════════════════════════════════════════════════
function AssetEntryPage({ project, anggaran, onBack, onSave, showToast }) {
  const [assets, setAssets] = useState(
    (project.assets || []).map((a) => ({
      ...a,
      _af: false,
      image: a.image || null,
    })),
  );
  const [confirm, setConfirm] = useState(null);
  const fileInputRef = useRef(null);
  const [activeAssetId, setActiveAssetId] = useState(null);

  const add = () =>
    setAssets((p) => [
      ...p,
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
        image: null,
        _new: true,
        _af: false,
      },
    ]);
  const upd = (id, k, v) =>
    setAssets((p) => p.map((a) => (a.id === id ? { ...a, [k]: v } : a)));
  const remove = (id) => setAssets((p) => p.filter((a) => a.id !== id));

  const handleFileRead = (id, file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      upd(id, "image", e.target.result);
    };
  };
  const triggerImageUpload = (id) => {
    setActiveAssetId(id);
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/") && activeAssetId)
      handleFileRead(activeAssetId, file);
    setActiveAssetId(null);
    e.target.value = null;
  };

  const tryAF = (id, k, v) =>
    setAssets((p) =>
      p.map((a) => {
        if (a.id !== id) return a;
        let u = { ...a, [k]: v, _af: false };
        let lk = null;
        if (k === "asset_code" && v) lk = ASSET_DB[v.trim()];
        else if (k === "serial_number" && v) {
          const c = SN_DB[v.trim()];
          if (c) {
            lk = ASSET_DB[c];
            u.asset_code = c;
          }
        }
        if (lk)
          u = {
            ...u,
            name: lk.name,
            brand: lk.brand,
            model: lk.model,
            category: lk.category,
            location: lk.location,
            _af: true,
          };
        return u;
      }),
    );

  const total = assets.reduce(
    (s, a) => s + (parseFloat(a.acquisition_value) || 0),
    0,
  );
  const save = () => {
    const cl = assets.map(({ _new, _af, ...a }) => ({
      ...a,
      acquisition_value: parseFloat(a.acquisition_value) || 0,
    }));
    onSave(project.id, cl);
    showToast(`${cl.length} aset disimpan`);
    onBack();
  };

  return (
    <div className="subpage">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}>
          <Icon d={I.arrowLeft} size={12} /> Kembali
        </button>
        <div style={{ flex: 1 }}>
          <h2>Kelola Aset Pekerjaan</h2>
        </div>
      </div>
      <div className="ctx-card">
        <div className="ctx-item">
          <span>Pekerjaan</span>
          <strong>{project.nm_pekerjaan?.substring(0, 40)}...</strong>
        </div>
        <div className="ctx-item">
          <span>No. Kontrak</span>
          <strong>{project.no_kontrak || "—"}</strong>
        </div>
        <div className="ctx-item">
          <span>Nilai Kontrak</span>
          <strong style={{ color: "var(--red)" }}>
            {project.nilai_kontrak > 0 ? fmt(project.nilai_kontrak) : "—"}
          </strong>
        </div>
        <div className="ctx-item">
          <span>Total Nilai Aset</span>
          <strong style={{ color: "var(--blue)" }}>{fmt(total)}</strong>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: "0.95rem", fontWeight: 800 }}>
          Daftar Aset
        </span>
        <button className="btn btn-prim" onClick={add}>
          <Icon d={I.plus} size={12} /> Tambah Aset Baru
        </button>
      </div>
      {assets.length === 0 && (
        <div className="empty">Belum ada aset ditambahkan.</div>
      )}
      {assets.map((a, i) => (
        <div key={a.id} className="acard">
          <div className="acard-hdr">
            <span className="asset-number-badge">ASET #{i + 1}</span>
            {a._new && (
              <span
                style={{
                  background: "var(--green-mid)",
                  color: "var(--green)",
                  borderRadius: 99,
                  padding: "2px 8px",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                }}
              >
                Baru
              </span>
            )}
            {a._af && (
              <span
                style={{
                  background: "var(--green-lt)",
                  color: "var(--green)",
                  border: "1px solid var(--green-mid)",
                  borderRadius: 99,
                  padding: "2px 8px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Icon d={I.checkCirc} size={10} /> Auto-filled
              </span>
            )}
            <button
              className="abtn del"
              style={{ marginLeft: "auto" }}
              onClick={() =>
                setConfirm({
                  msg: `Hapus aset "#${i + 1}"?`,
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
          <div className="acard-body">
            {/* Foto aset */}
            <div className="acard-image-section">
              <div
                className="acard-image-box"
                onClick={() => triggerImageUpload(a.id)}
              >
                {a.image ? (
                  <div className="acard-image-preview-container">
                    <img
                      src={a.image}
                      alt="Preview"
                      className="acard-image-preview"
                    />
                    <button
                      className="abtn clear"
                      onClick={(e) => {
                        e.stopPropagation();
                        upd(a.id, "image", null);
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <div className="acard-image-upload-trigger">
                    <Icon d={I.image} size={24} />
                    <span>Unggah Foto</span>
                  </div>
                )}
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  Dokumentasi Fisik Aset
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ink4)",
                    lineHeight: 1.4,
                  }}
                >
                  Ketuk kotak di sebelah kiri untuk mengunggah foto fisik aset.
                  Mendukung JPG, PNG (maks. 5MB).
                </p>
              </div>
            </div>

            {/* ── FIX 2: Form input horizontal (label : input) ── */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="aefld">
                <div className="aefld-label">
                  Kode Aset<span className="req">*</span>
                </div>
                <div className="aefld-input">
                  <input
                    value={a.asset_code}
                    onChange={(e) => tryAF(a.id, "asset_code", e.target.value)}
                    placeholder="cth. SPMT-KPT-DTC-SRV-01"
                  />
                  <div className="aefld-hint">
                    Ketik kode untuk auto-fill data aset
                  </div>
                </div>
              </div>
              <div className="aefld">
                <div className="aefld-label">Serial Number</div>
                <div className="aefld-input">
                  <input
                    value={a.serial_number || ""}
                    onChange={(e) =>
                      tryAF(a.id, "serial_number", e.target.value)
                    }
                    placeholder="cth. DELL-KPT-SRV-001"
                  />
                </div>
              </div>
              <div className="aefld">
                <div className="aefld-label">
                  Nama Aset<span className="req">*</span>
                </div>
                <div className="aefld-input">
                  <input
                    value={a.name}
                    onChange={(e) => upd(a.id, "name", e.target.value)}
                    placeholder="Nama lengkap aset"
                  />
                </div>
              </div>
              <div className="aefld">
                <div className="aefld-label">Merek</div>
                <div className="aefld-input">
                  <input
                    value={a.brand || ""}
                    onChange={(e) => upd(a.id, "brand", e.target.value)}
                    placeholder="cth. Dell, Cisco, HP"
                  />
                </div>
              </div>
              <div className="aefld">
                <div className="aefld-label">Model / Tipe</div>
                <div className="aefld-input">
                  <input
                    value={a.model || ""}
                    onChange={(e) => upd(a.id, "model", e.target.value)}
                    placeholder="cth. PowerEdge R750"
                  />
                </div>
              </div>
              <div className="aefld">
                <div className="aefld-label">Kategori</div>
                <div className="aefld-input">
                  <input
                    value={a.category || ""}
                    onChange={(e) => upd(a.id, "category", e.target.value)}
                    placeholder="cth. Server, Network, Security"
                  />
                </div>
              </div>
              <div className="aefld">
                <div className="aefld-label">Lokasi</div>
                <div className="aefld-input">
                  <input
                    value={a.location || ""}
                    onChange={(e) => upd(a.id, "location", e.target.value)}
                    placeholder="cth. Kantor Pusat, Malahayati"
                  />
                </div>
              </div>
              <div className="aefld">
                <div className="aefld-label">Tgl. Pengadaan</div>
                <div className="aefld-input">
                  <input
                    type="date"
                    value={a.procurement_date || ""}
                    onChange={(e) =>
                      upd(a.id, "procurement_date", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="aefld" style={{ borderBottom: "none" }}>
                <div className="aefld-label">Nilai Perolehan (IDR)</div>
                <div className="aefld-input">
                  <input
                    type="number"
                    value={a.acquisition_value || ""}
                    onChange={(e) =>
                      upd(a.id, "acquisition_value", e.target.value)
                    }
                    placeholder="0"
                  />
                  {parseFloat(a.acquisition_value) > 0 && (
                    <div
                      className="aefld-hint"
                      style={{ color: "var(--blue)", fontWeight: 600 }}
                    >
                      {fmt(parseFloat(a.acquisition_value))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {assets.length > 0 && (
        <div className="edit-footer">
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>
              Total Nilai Semua Aset
            </span>
            <strong style={{ color: "var(--blue)", display: "block" }}>
              {fmt(total)}
            </strong>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-outline" onClick={onBack}>
              Batal
            </button>
            <button className="btn btn-prim" onClick={save}>
              <Icon d={I.save} size={14} /> Simpan Data Aset
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

function RealisasiPage({ ang, editData, onBack, onSave, showToast }) {
  const isEdit = !!editData;
  const [form, setForm] = useState(
    isEdit
      ? { ...editData, jumlah: editData.jumlah || "" }
      : {
          tanggal: "",
          keterangan: "",
          no_invoice: "",
          aset: "",
          lampiran: "",
          jumlah: "",
        },
  );
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const pagu = ang.nilai_anggaran_tahunan || 0;
  const prev = (ang.transaksi || [])
    .filter((t) => !isEdit || t.id !== editData.id)
    .reduce((s, t) => s + (t.jumlah || 0), 0);
  const jumlah = parseFloat(String(form.jumlah).replace(/[^\d.]/g, "")) || 0;
  const sisa = pagu - prev - jumlah;
  const save = () => {
    if (!form.tanggal || !form.keterangan || !form.jumlah) return;
    const j = parseFloat(String(form.jumlah).replace(/[^\d.]/g, "")) || 0;
    const list = isEdit
      ? ang.transaksi.map((t) =>
          t.id === editData.id ? { ...form, jumlah: j, id: editData.id } : t,
        )
      : [...(ang.transaksi || []), { ...form, jumlah: j, id: newId() }];
    onSave(ang.id, list);
    showToast(isEdit ? "Realisasi diperbarui" : "Realisasi ditambahkan");
    onBack();
  };
  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}>
          <Icon d={I.arrowLeft} size={14} /> Kembali
        </button>
        <div style={{ flex: 1 }}>
          <h2>{isEdit ? "Edit Realisasi" : "Tambah Realisasi"}</h2>
        </div>
      </div>
      <div
        className="ctx-card"
        style={{
          borderColor: "var(--green)",
          background: "var(--green-lt)",
          borderLeft: "4px solid var(--green)",
        }}
      >
        <div className="ctx-item">
          <span>Pos Anggaran</span>
          <strong style={{ color: "var(--ink)" }}>{ang.nama}</strong>
        </div>
        <div className="ctx-item">
          <span>Pagu</span>
          <strong style={{ color: "var(--blue)" }}>{fmt(pagu)}</strong>
        </div>
        <div className="ctx-item">
          <span>Sisa Setelah Input</span>
          <strong className={sisa >= 0 ? "green" : "red"}>
            {fmt(Math.abs(sisa))} {sisa < 0 && "(melebihi)"}
          </strong>
        </div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
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
            <Icon d={isEdit ? I.edit : I.plus} size={14} />
          </div>
          <div>
            <h3>{isEdit ? "Edit Transaksi" : "Data Transaksi"}</h3>
          </div>
        </div>
        <div className="sec-card-body">
          <div className="hfld">
            <div className="hfld-label">
              Tanggal<span className="req">*</span>
            </div>
            <div className="hfld-input">
              <input
                type="date"
                value={form.tanggal}
                onChange={(e) => up("tanggal", e.target.value)}
              />
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">
              Keterangan<span className="req">*</span>
            </div>
            <div className="hfld-input">
              <input
                value={form.keterangan}
                onChange={(e) => up("keterangan", e.target.value)}
                placeholder="Deskripsi realisasi..."
              />
            </div>
          </div>
          <div className="hfld">
            <div className="hfld-label">No. Invoice</div>
            <div className="hfld-input">
              <input
                value={form.no_invoice}
                onChange={(e) => up("no_invoice", e.target.value)}
                placeholder="cth. INV/2026/001"
              />
            </div>
          </div>
          <div className="hfld" style={{ borderBottom: "none" }}>
            <div className="hfld-label">
              Jumlah (IDR)<span className="req">*</span>
            </div>
            <div className="hfld-input">
              <input
                type="number"
                value={form.jumlah}
                onChange={(e) => up("jumlah", e.target.value)}
                placeholder="0"
              />
              {jumlah > 0 && (
                <div className="hfld-hint" style={{ color: "var(--green)" }}>
                  {fmt(jumlah)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="edit-footer">
        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>
            Jumlah Transaksi Input
          </span>
          <div
            style={{ fontSize: "1rem", fontWeight: 800, color: "var(--green)" }}
          >
            {fmt(jumlah)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-outline" onClick={onBack}>
            Batal
          </button>
          <button
            className="btn btn-green"
            style={{
              opacity:
                !form.tanggal || !form.keterangan || !form.jumlah ? 0.5 : 1,
            }}
            onClick={save}
          >
            <Icon d={I.save} size={12} /> {isEdit ? "Perbarui" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function BudgetManagement() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [tahun, setTahun] = useState("all");
  const [angFilter, setAngFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [opexKdFilter, setOpexKdFilter] = useState("all");
  const [opexSearch, setOpexSearch] = useState("");
  const [page, setPage] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [capexData, setCapexData] = useState(INIT_CAPEX);
  const [opexData, setOpexData] = useState(INIT_OPEX);
  const [capexPage, setCapexPage] = useState(1);
  const [opexPage, setOpexPage] = useState(1);
  const [showAddCapex, setShowAddCapex] = useState(false);
  const [showAddOpex, setShowAddOpex] = useState(false);

  const showToast = (msg) => setToast(msg);
  const currentYear = new Date().getFullYear();
  const yearOpts = [
    "all",
    String(currentYear - 3),
    String(currentYear - 2),
    String(currentYear - 1),
    String(currentYear),
  ];

  const allProjects = useMemo(
    () =>
      capexData.flatMap((ang) =>
        ang.projects.map((p) => ({
          ...p,
          _angId: ang.id,
          _angNama: ang.nama,
          _angKode: ang.kode,
          _thn: ang.thnAnggaran,
        })),
      ),
    [capexData],
  );

  const filteredOpex = useMemo(
    () =>
      opexData.filter((ang) => {
        if (tahun !== "all" && String(ang.thn_anggaran) !== tahun) return false;
        if (opexKdFilter !== "all" && ang.kd_anggaran_master !== opexKdFilter)
          return false;
        if (
          opexSearch &&
          !ang.nama?.toLowerCase().includes(opexSearch.toLowerCase()) &&
          !ang.kd_anggaran_master
            ?.toLowerCase()
            .includes(opexSearch.toLowerCase())
        )
          return false;
        return true;
      }),
    [opexData, tahun, opexKdFilter, opexSearch],
  );

  const activeKdList = useMemo(() => {
    const allKd = opexData
      .filter((a) => tahun === "all" || String(a.thn_anggaran) === tahun)
      .map((a) => a.kd_anggaran_master);
    const unique = Array.from(new Set(allKd));
    return BUDGET_MASTERS.filter((m) => unique.includes(m.kd_anggaran_master));
  }, [opexData, tahun]);

  const angList = useMemo(() => {
    const f = allProjects.filter(
      (p) => tahun === "all" || String(p._thn) === tahun,
    );
    const m = new Map();
    f.forEach((p) => {
      if (!m.has(p._angId)) m.set(p._angId, { id: p._angId, nama: p._angNama });
    });
    return Array.from(m.values());
  }, [allProjects, tahun]);

  const filteredProjects = useMemo(() => {
    if (typeFilter === "opex") return [];
    return allProjects.filter((p) => {
      if (tahun !== "all" && String(p._thn) !== tahun) return false;
      if (angFilter !== "all" && p._angId !== angFilter) return false;
      if (
        search &&
        !p.nm_pekerjaan?.toLowerCase().includes(search.toLowerCase()) &&
        !p.no_kontrak?.toLowerCase().includes(search.toLowerCase()) &&
        !p._angNama?.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [allProjects, typeFilter, tahun, angFilter, search]);

  useEffect(() => {
    setAngFilter("all");
    setOpexKdFilter("all");
    setOpexSearch("");
    setCapexPage(1);
    setOpexPage(1);
  }, [typeFilter, tahun]);
  useEffect(() => {
    setCapexPage(1);
  }, [search, angFilter]);
  useEffect(() => {
    setOpexPage(1);
  }, [opexKdFilter, opexSearch]);

  const paginatedCapex = useMemo(() => {
    const start = (capexPage - 1) * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, capexPage]);
  const paginatedOpex = useMemo(() => {
    const start = (opexPage - 1) * PAGE_SIZE;
    return filteredOpex.slice(start, start + PAGE_SIZE);
  }, [filteredOpex, opexPage]);

  const stats = useMemo(() => {
    const cb = allProjects.filter(
      (p) => tahun === "all" || String(p._thn) === tahun,
    );
    const paguCap = capexData
      .filter((a) => tahun === "all" || String(a.thnAnggaran) === tahun)
      .reduce((s, a) => s + (a.pagu || 0), 0);
    const paguOpx = filteredOpex.reduce(
      (s, a) => s + (a.nilai_anggaran_tahunan || 0),
      0,
    );
    const pagu =
      typeFilter === "opex"
        ? paguOpx
        : typeFilter === "capex"
          ? paguCap
          : paguCap + paguOpx;
    const kontrak = cb.reduce((s, p) => s + (p.nilai_kontrak || 0), 0);
    const aset = cb.reduce(
      (s, p) =>
        s +
        (p.assets || []).reduce((ss, a) => ss + (a.acquisition_value || 0), 0),
      0,
    );
    return { pagu, kontrak, aset, count: cb.length };
  }, [allProjects, filteredOpex, capexData, typeFilter, tahun]);

  const getAng = (id) => capexData.find((a) => a.id === id);
  const getLatestProject = (projId) => {
    for (const ang of capexData) {
      const p = ang.projects.find((pr) => pr.id === projId);
      if (p)
        return {
          ...p,
          _angId: ang.id,
          _angNama: ang.nama,
          _angKode: ang.kode,
          _thn: ang.thnAnggaran,
        };
    }
    return null;
  };

  const saveOpexTrx = (id, trx) =>
    setOpexData((p) =>
      p.map((a) => (a.id === id ? { ...a, transaksi: trx } : a)),
    );
  const saveOpexData = (id, u) =>
    setOpexData((p) => p.map((a) => (a.id === id ? { ...a, ...u } : a)));
  const deleteOpex = (id) =>
    setConfirm({
      msg: "Hapus pos anggaran OPEX ini beserta semua transaksinya?",
      onConfirm: () => {
        setOpexData((p) => p.filter((a) => a.id !== id));
        showToast("Pos anggaran dihapus");
        setConfirm(null);
      },
    });
  const saveProject = (id, u) =>
    setCapexData((p) =>
      p.map((ang) => ({
        ...ang,
        projects: ang.projects.map((pr) =>
          pr.id === id ? { ...pr, ...u } : pr,
        ),
      })),
    );
  const saveAssets = (id, assets) =>
    setCapexData((p) =>
      p.map((ang) => ({
        ...ang,
        projects: ang.projects.map((pr) =>
          pr.id === id ? { ...pr, assets } : pr,
        ),
      })),
    );
  const deleteProject = (id, angId) => {
    setCapexData((p) =>
      p.map((ang) =>
        ang.id === angId
          ? { ...ang, projects: ang.projects.filter((pr) => pr.id !== id) }
          : ang,
      ),
    );
    showToast("Pekerjaan dihapus");
  };

  const handleAddCapex = (angId, newProj) => {
    setCapexData((p) =>
      p.map((ang) =>
        ang.id === angId
          ? { ...ang, projects: [...ang.projects, newProj] }
          : ang,
      ),
    );
    setShowAddCapex(false);
    showToast("Pekerjaan CAPEX berhasil ditambahkan");
  };
  const handleAddOpex = (newOpex) => {
    setOpexData((p) => [...p, newOpex]);
    setShowAddOpex(false);
    showToast("Pos anggaran OPEX berhasil ditambahkan");
  };

  // ── PAGE ROUTING ──
  if (page?.type === "editProject") {
    return (
      <>
        <style>{CSS}</style>
        <div className="root">
          {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
          <EditProjectPage
            project={page.project}
            anggaran={page.anggaran}
            onBack={() => setPage(null)}
            onSave={saveProject}
            showToast={showToast}
          />
        </div>
      </>
    );
  }
  if (page?.type === "assetTable") {
    const latestProject = getLatestProject(page.projectId) || page.project;
    return (
      <>
        <style>{CSS}</style>
        <div className="root">
          {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
          <AssetTablePage
            project={latestProject}
            anggaran={page.anggaran}
            onBack={() => setPage(null)}
            onEntryNew={() =>
              setPage({
                type: "asset",
                projectId: page.projectId,
                project: latestProject,
                anggaran: page.anggaran,
                returnToTable: true,
              })
            }
            onSaveAssets={saveAssets}
            showToast={showToast}
          />
        </div>
      </>
    );
  }
  if (page?.type === "asset") {
    const latestProject = getLatestProject(page.projectId) || page.project;
    return (
      <>
        <style>{CSS}</style>
        <div className="root">
          {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
          <AssetEntryPage
            project={latestProject}
            anggaran={page.anggaran}
            onBack={() => {
              if (page.returnToTable) {
                setPage({
                  type: "assetTable",
                  projectId: page.projectId,
                  project: latestProject,
                  anggaran: page.anggaran,
                });
              } else {
                setPage(null);
              }
            }}
            onSave={(id, assets) => {
              saveAssets(id, assets);
            }}
            showToast={showToast}
          />
        </div>
      </>
    );
  }
  if (page?.type === "realisasiTable") {
    const angNow = opexData.find((a) => a.id === page.ang.id) || page.ang;
    return (
      <>
        <style>{CSS}</style>
        <div className="root">
          {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
          <RealisasiTablePage
            ang={angNow}
            onBack={() => setPage(null)}
            onEntryNew={() =>
              setPage({
                type: "realisasi",
                ang: angNow,
                editData: null,
                returnToTable: true,
              })
            }
            onEditRow={(t) =>
              setPage({
                type: "realisasi",
                ang: angNow,
                editData: t,
                returnToTable: true,
              })
            }
            onDeleteRow={(id) =>
              setConfirm({
                msg: "Hapus transaksi realisasi ini?",
                onConfirm: () => {
                  saveOpexTrx(
                    angNow.id,
                    angNow.transaksi.filter((trx) => trx.id !== id),
                  );
                  showToast("Transaksi dihapus");
                  setConfirm(null);
                },
              })
            }
            showToast={showToast}
          />
          {confirm && (
            <Confirm
              msg={confirm.msg}
              onConfirm={confirm.onConfirm}
              onCancel={() => setConfirm(null)}
            />
          )}
        </div>
      </>
    );
  }
  if (page?.type === "realisasi") {
    const angNow = opexData.find((a) => a.id === page.ang.id) || page.ang;
    return (
      <>
        <style>{CSS}</style>
        <div className="root">
          {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
          <RealisasiPage
            ang={angNow}
            editData={page.editData}
            onBack={() => {
              if (page.returnToTable) {
                setPage({ type: "realisasiTable", ang: angNow });
              } else {
                setPage(null);
              }
            }}
            onSave={saveOpexTrx}
            showToast={showToast}
          />
        </div>
      </>
    );
  }

  const showCapex = typeFilter !== "opex";
  const showOpex = typeFilter !== "capex";
  const showBoth = typeFilter === "all";
  const activeOpexFilter = BUDGET_MASTERS.find(
    (m) => m.kd_anggaran_master === opexKdFilter,
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="root">
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
        <div className="hdr">
          <div>
            <h1>Anggaran &amp; Pekerjaan</h1>
            <p>Monitoring CAPEX &amp; OPEX berdasarkan anggaran</p>
          </div>
          <div className="hdr-right">
            <div className="yr-row">
              {yearOpts.map((y) => (
                <button
                  key={y}
                  className={`yr-btn ${tahun === y ? "on" : ""}`}
                  onClick={() => setTahun(y)}
                >
                  {y === "all" ? "Semua Tahun" : y}
                </button>
              ))}
            </div>
            <div className="type-tabs">
              <button
                className={`type-tab all ${typeFilter === "all" ? "on" : ""}`}
                onClick={() => setTypeFilter("all")}
              >
                <Icon d={I.layers} size={14} /> Semua
              </button>
              <button
                className={`type-tab ${typeFilter === "capex" ? "on" : ""}`}
                onClick={() => setTypeFilter("capex")}
              >
                <Icon d={I.briefcase} size={14} /> CAPEX
              </button>
              <button
                className={`type-tab ${typeFilter === "opex" ? "on" : ""}`}
                onClick={() => setTypeFilter("opex")}
              >
                <Icon d={I.monitor} size={14} /> OPEX
              </button>
            </div>
          </div>
        </div>

        <div className="kpi-strip">
          <div className="kpi blue">
            <div className="kpi-ico">
              <Icon d={I.briefcase} size={20} />
            </div>
            <div className="kpi-body">
              <div className="kpi-lbl">Total Anggaran</div>
              <div className="kpi-val">{fmt(stats.pagu)}</div>
              <div className="kpi-sub">{stats.count} pekerjaan terdaftar</div>
            </div>
          </div>
          <div className="kpi amber">
            <div className="kpi-ico">
              <Icon d={I.fileText} size={20} />
            </div>
            <div className="kpi-body">
              <div className="kpi-lbl">Realisasi Kontrak</div>
              <div className="kpi-val">{fmt(stats.kontrak)}</div>
              <div className="kpi-bar">
                <div
                  className="kpi-bar-fill"
                  style={{
                    width: `${stats.pagu > 0 ? Math.min((stats.kontrak / stats.pagu) * 100, 100) : 0}%`,
                    background: "var(--amber)",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="kpi green">
            <div className="kpi-ico">
              <Icon d={I.package} size={20} />
            </div>
            <div className="kpi-body">
              <div className="kpi-lbl">Nilai Aset Tercatat</div>
              <div className="kpi-val">{fmt(stats.aset)}</div>
              <div className="kpi-bar">
                <div
                  className="kpi-bar-fill"
                  style={{
                    width: `${stats.kontrak > 0 ? Math.min((stats.aset / stats.kontrak) * 100, 100) : 0}%`,
                    background: "var(--green)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {showCapex && (
          <div className="toolbar">
            <div className="flt-box">
              <Icon d={I.filter} size={14} />
              <select
                className="flt-select"
                value={angFilter}
                onChange={(e) => setAngFilter(e.target.value)}
              >
                <option value="all">Semua Kategori Anggaran</option>
                {angList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nama.length > 42
                      ? a.nama.substring(0, 42) + "..."
                      : a.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="srch">
              <Icon d={I.search} size={14} />
              <input
                placeholder="Cari berdasarkan nama pekerjaan atau nomor kontrak..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="btn btn-prim"
              style={{ marginLeft: "auto" }}
              onClick={() => setShowAddCapex(true)}
            >
              <Icon d={I.plus} size={14} /> Tambah Pekerjaan CAPEX
            </button>
          </div>
        )}

        {showCapex && (
          <>
            {showBoth && (
              <div className="section-label">
                <div className="section-label-line" />
                <div className="section-label-pill capex">
                  <Icon d={I.briefcase} size={12} /> CAPEX
                </div>
                <span className="section-count">
                  {filteredProjects.length} pekerjaan
                </span>
                <div className="section-label-line" />
              </div>
            )}
            {!showBoth && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Icon
                    d={I.briefcase}
                    size={16}
                    style={{ color: "var(--blue)" }}
                  />{" "}
                  Daftar Pekerjaan CAPEX
                </div>
              </div>
            )}
            {filteredProjects.length === 0 ? (
              <div className="empty">
                Tidak ada pekerjaan CAPEX yang cocok dengan filter.
                <div style={{ marginTop: 12 }}>
                  <button
                    className="btn btn-prim"
                    onClick={() => setShowAddCapex(true)}
                  >
                    <Icon d={I.plus} size={13} /> Tambah Pekerjaan CAPEX Pertama
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="card-list">
                  {paginatedCapex.map((proj) => (
                    <CapexCard
                      key={proj.id}
                      proj={proj}
                      onEdit={(p) => {
                        const a = getAng(p._angId);
                        setPage({
                          type: "editProject",
                          project: p,
                          anggaran: a,
                        });
                      }}
                      onAssetTable={(p) => {
                        const a = getAng(p._angId);
                        setPage({
                          type: "assetTable",
                          projectId: p.id,
                          project: p,
                          anggaran: a,
                        });
                      }}
                      onAssetEntry={(p) => {
                        const a = getAng(p._angId);
                        setPage({
                          type: "asset",
                          projectId: p.id,
                          project: p,
                          anggaran: a,
                          returnToTable: false,
                        });
                      }}
                      onDelete={(p) =>
                        setConfirm({
                          msg: `Hapus pekerjaan ini beserta datanya?`,
                          onConfirm: () => {
                            deleteProject(p.id, p._angId);
                            setConfirm(null);
                          },
                        })
                      }
                    />
                  ))}
                </div>
                <Pagination
                  total={filteredProjects.length}
                  page={capexPage}
                  onPage={setCapexPage}
                  label="pekerjaan"
                />
              </>
            )}
          </>
        )}

        {showOpex && (
          <>
            {showBoth && (
              <div className="section-label" style={{ marginTop: "16px" }}>
                <div className="section-label-line" />
                <div className="section-label-pill opex">
                  <Icon d={I.monitor} size={12} /> OPEX
                </div>
                <span className="section-count">
                  {filteredOpex.length} pos anggaran
                </span>
                <div className="section-label-line" />
              </div>
            )}
            {!showBoth && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Icon
                    d={I.monitor}
                    size={16}
                    style={{ color: "var(--green)" }}
                  />{" "}
                  Pos Anggaran OPEX
                </div>
              </div>
            )}
            <div className="opex-toolbar">
              <div className="opex-flt-box">
                <Icon d={I.hash} size={14} />
                <select
                  className="opex-flt-select"
                  value={opexKdFilter}
                  onChange={(e) => {
                    setOpexKdFilter(e.target.value);
                    setOpexPage(1);
                  }}
                >
                  <option value="all">Semua Pos Anggaran</option>
                  {BUDGET_MASTERS.map((m) => (
                    <option
                      key={m.kd_anggaran_master}
                      value={m.kd_anggaran_master}
                      disabled={
                        !activeKdList.some(
                          (a) => a.kd_anggaran_master === m.kd_anggaran_master,
                        )
                      }
                      style={{
                        color: activeKdList.some(
                          (a) => a.kd_anggaran_master === m.kd_anggaran_master,
                        )
                          ? "inherit"
                          : "#9ca3af",
                      }}
                    >
                      {m.kd_anggaran_master} — {m.nm_anggaran_master}
                    </option>
                  ))}
                </select>
              </div>
              <div className="opex-srch">
                <Icon d={I.search} size={14} />
                <input
                  placeholder="Cari nama pos anggaran..."
                  value={opexSearch}
                  onChange={(e) => {
                    setOpexSearch(e.target.value);
                    setOpexPage(1);
                  }}
                />
              </div>
              {opexKdFilter !== "all" && activeOpexFilter && (
                <div className="opex-filter-badge">
                  <Icon d={I.filter} size={11} />
                  {activeOpexFilter.kd_anggaran_master} —{" "}
                  {activeOpexFilter.nm_anggaran_master}
                  <button
                    onClick={() => {
                      setOpexKdFilter("all");
                      setOpexPage(1);
                    }}
                    title="Hapus filter"
                  >
                    <Icon d={I.x} size={11} />
                  </button>
                </div>
              )}
              <button
                className="btn btn-green"
                style={{ marginLeft: "auto" }}
                onClick={() => setShowAddOpex(true)}
              >
                <Icon d={I.plus} size={14} /> Tambah Pos OPEX
              </button>
            </div>
            {filteredOpex.length === 0 ? (
              <div className="empty">
                Tidak ada pos anggaran OPEX yang cocok.
                <div style={{ marginTop: 12 }}>
                  <button
                    className="btn btn-green"
                    onClick={() => setShowAddOpex(true)}
                  >
                    <Icon d={I.plus} size={13} /> Tambah Pos OPEX Pertama
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="card-list">
                  {paginatedOpex.map((ang) => (
                    <OpexCard
                      key={ang.id}
                      ang={ang}
                      onSaveOpex={saveOpexData}
                      showToast={showToast}
                      onDelete={deleteOpex}
                      onRealisasiTable={(a) =>
                        setPage({ type: "realisasiTable", ang: a })
                      }
                      onRealisasiEntry={(a) =>
                        setPage({
                          type: "realisasi",
                          ang: a,
                          editData: null,
                          returnToTable: false,
                        })
                      }
                    />
                  ))}
                </div>
                <Pagination
                  total={filteredOpex.length}
                  page={opexPage}
                  onPage={setOpexPage}
                  label="pos anggaran"
                />
              </>
            )}
          </>
        )}
      </div>

      {confirm && (
        <Confirm
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      {showAddCapex && (
        <TambahCapexModal
          capexData={capexData}
          onClose={() => setShowAddCapex(false)}
          onSave={handleAddCapex}
        />
      )}
      {showAddOpex && (
        <TambahOpexModal
          onClose={() => setShowAddOpex(false)}
          onSave={handleAddOpex}
        />
      )}
    </>
  );
}
