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
  trendUp: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  wallet:
    "M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M3 5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2M21 12a2 2 0 0 1 0 4h-4a2 2 0 0 1 0-4h4z",
  trendingUp: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
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
  return p >= 100
    ? "#ef4444"
    : p >= 80
      ? "#f59e0b"
      : p >= 50
        ? "#3b82f6"
        : "#22c55e";
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
  "CCTV-24BLW-001": {
    name: "CCTV Hikvision DS-2CD2143G2-I",
    brand: "Hikvision",
    model: "DS-2CD2143G2-I",
    category: "CCTV",
  },
  "ALAT-25DMI-001": {
    name: "Excavator CAT 336",
    brand: "CAT",
    model: "336",
    category: "Alat Berat",
  },
  "SRV-25LHK-001": {
    name: "Server Dell PowerEdge R740",
    brand: "Dell",
    model: "R740",
    category: "Server",
  },
  "KND-24BLW-001": {
    name: "Toyota Hilux Pickup",
    brand: "Toyota",
    model: "Hilux Pickup",
    category: "Kendaraan",
  },
  "FURN-26TJP-001": {
    name: "Meja Kerja Direktori",
    brand: "Generic",
    model: "Meja Kerja Direktori",
    category: "Furniture",
  },
  "SWT-25MLH-001": {
    name: "Switch Cisco Catalyst 9300L",
    brand: "Cisco",
    model: "Catalyst 9300L",
    category: "Switch",
  },
};

const SN_DB = {
  "SN-CCTV-001": "CCTV-24BLW-001",
  "SN-CCTV-002": "CCTV-24BLW-001",
  "SN-EXC-336-01": "ALAT-25DMI-001",
  "SN-EXC-336-02": "ALAT-25DMI-001",
  "SN-DELL-R740-01": "SRV-25LHK-001",
  "SN-DELL-R740-02": "SRV-25LHK-001",
  "BK 1234 ZZ": "KND-24BLW-001",
  "BK 5678 AA": "KND-24BLW-001",
  "SN-MEJA-001": "FURN-26TJP-001",
  "SN-MEJA-002": "FURN-26TJP-001",
  "SN-CISCO-9300-01": "SWT-25MLH-001",
  "SN-CISCO-9300-02": "SWT-25MLH-001",
};
const ENTITAS_LIST = [
  { name: "Pelindo Multi Terminal", code: "SPMT" },
  { name: "PT Pelabuhan Indonesia", code: "PTP" },
  { name: "Indonesia Kendaraan Terminal", code: "IKT" },
];
const BRANCH_BY_ENTITY = {
  SPMT: [
    { name: "Belawan", code: "BLW" },
    { name: "Gresik", code: "GRK" },
    { name: "Lembar Badas", code: "LBR" },
    { name: "Tanjung Intan", code: "TJI" },
    { name: "Dumai", code: "DMI" },
    { name: "Sibolga", code: "SBG" },
    { name: "Malahayati", code: "MLH" },
    { name: "Lhokseumawe", code: "LHK" },
    { name: "Tanjung Emas", code: "TJE" },
    { name: "Balikpapan", code: "BLP" },
    { name: "Makassar", code: "MKS" },
    { name: "Trisakti", code: "BJM" },
  ],
  PTP: [
    { name: "Banten", code: "BTN" },
    { name: "Tanjung Priok", code: "TJP" },
    { name: "Teluk Bayur", code: "TBR" },
    { name: "Palembang", code: "PLB" },
    { name: "Jambi", code: "JMB" },
  ],
  IKT: [{ name: "Jakarta", code: "JKT" }],
};
const ZONA_LIST = [
  { name: "Gedung", code: "GDG" },
  { name: "Lapangan", code: "LPG" },
  { name: "Data Center", code: "DTC" },
  { name: "Gudang", code: "GDN" },
];
const SUBZONA_LIST = [
  { name: "Dermaga", code: "DMG" },
  { name: "Parkir", code: "PKR" },
  { name: "Jalan", code: "JLN" },
  { name: "Taman/Parkir", code: "TPK" },
];
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
const mkAssets = () => [
  {
    id: "AST-SRV-25LHK-001",
    asset_code: "SRV-25LHK-001",
    name: "Server Dell PowerEdge R740",
    brand: "Dell",
    model: "R740",
    category: "Server",
    jumlah: 2,
    procurement_date: "2024-09-10",
    acquisition_value: 180000000,
    units: [
      { serialNumber: "SN-DELL-R740-01", location: "Data Center Lhokseumawe" },
      { serialNumber: "SN-DELL-R740-02", location: "Lantai 3 - Ruang Server Cadangan" },
    ],
    image: null,
  },
];
// ══════ INIT DATA ══════
const INIT_CAPEX = [
  {
    id: "CAP-2440013",
    kode: "2440013",
    nama: "Penyiapan Infrastruktur IT PT Pelindo Multi Terminal",
    nilai_kad: 5500000000,
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2026,
    type: "capex",
    assets: [
      ...mkAssets(),
      {
        id: newId(),
        asset_code: "SWT-25MLH-001",
        serial_number: "SN-CISCO-9300-01",
        name: "Switch Cisco Catalyst 9300L",
        brand: "Cisco",
        model: "Catalyst 9300L",
        category: "Switch",
        location: "Malahayati / DTC / PKR",
        procurement_date: "2025-05-15",
        acquisition_value: 45000000,
        image: null,
      },
    ],
    history_anggaran: [
      { id: "H1", tahun: 2024, nilai_rkap: 2000000000 },
      { id: "H2", tahun: 2025, nilai_rkap: 2000000000 },
      { id: "H3", tahun: 2026, nilai_rkap: 1500000000 },
    ],
    projects: [
      {
        id: "PKJ-2440013-001",
        nm_pekerjaan: "Pengadaan Server dan Network",
        nilai_rab: 2000000000,
        nilai_kontrak: 1950000000,
        no_kontrak: "SI.01/10/9/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-09-10",
        durasi_kontrak: 90,
      },
    ],
  },
  {
    id: "CAP-2440015",
    kode: "2440015",
    nama: "Implementasi dan Standarisasi IT Infrastruktur",
    nilai_kad: 2500000000,
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    type: "capex",
    assets: [
      {
        id: "AST-2440015-001",
        category: "CCTV",
        model: "DS-2CD2143G2-I",
        asset_code: "CCTV-24BLW-001",
        jumlah: 2,
        procurement_date: "2024-08-15",
        acquisition_value: 6000000,
        name: "CCTV Hikvision DS-2CD2143G2-I",
        id_pekerjaan: "PKJ-2440015-001",
        units: [
          { serialNumber: "SN-CCTV-001", location: "Area Dermaga - Tiang 1" },
          { serialNumber: "SN-CCTV-002", location: "Pos Security - Gerbang Utama" }
        ]
      },
    ],
    projects: [
      {
        id: "PKJ-2440015-001",
        nm_pekerjaan: "Pekerjaan Implementasi CCTV",
        nilai_rab: 1000000000,
        nilai_kontrak: 900000000,
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-12",
      },
    ],
  },
  {
    id: "CAP-2540011",
    kode: "2540011",
    nama: "Transformasi dan Digitalisasi Alat Berat",
    nilai_kad: 5000000000,
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    type: "capex",
    assets: [
      {
        id: "AST-2540011-001",
        category: "Alat Berat",
        model: "CAT 336",
        asset_code: "ALAT-25DMI-001",
        serial_number: "SN-EXC-336-01",
        branch: "Dumai",
        zona: "GDG",
        subzona: "DMG",
        location: "Dumai / GDG / DMG",
        procurement_date: "2025-01-20",
        acquisition_value: 1200000000,
        name: "Excavator CAT 336",
        id_pekerjaan: "PKJ-2540011-001"
      }
    ],
    projects: [
      {
        id: "PKJ-2540011-001",
        nm_pekerjaan: "Penyediaan Alat Berat Excavator",
        nilai_rab: 2000000000,
        nilai_kontrak: 1850000000,
        no_kontrak: "SI.05/01/2/PPTI/PLMT-25",
        tgl_kontrak: "2025-01-05",
      }
    ],
    history_anggaran: [
      { id: "H6", tahun: 2025, nilai_rkap: 2500000000 },
      { id: "H7", tahun: 2026, nilai_rkap: 2000000000 },
    ],
  },
  {
    id: "CAP-2440014",
    kode: "2440014",
    nama: "Penyediaan Network di Branch SPMT",
    nilai_kad: 3200000000,
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    type: "capex",
    assets: [],
    projects: [],
  },
  {
    id: "CAP-2440020",
    kode: "2440020",
    nama: "Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC Transformasi pada Branch SPMT)",
    nilai_kad: 1500000000,
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2025,
    type: "capex",
    assets: [],
    history_anggaran: [
      { id: "H4", tahun: 2024, nilai_rkap: 750000000 },
      { id: "H5", tahun: 2025, nilai_rkap: 750000000 },
    ],
    projects: [],
  },
  {
    id: "CAP-2540012",
    kode: "2540012",
    nama: "Pengembangan Sistem Manajemen Aset Pelindo (RKAP Lanjutan)",
    nilai_kad: 3500000000,
    thn_rkap_awal: 2026,
    thn_rkap_akhir: 2026,
    type: "capex",
    assets: [],
    projects: [],
  },
];
// ══════ DUMMY DATA OPEX (Disesuaikan dengan Permintaan) ══════
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
        id: "TRX-OPEX-001",
        tanggal: "2026-02-10",
        keterangan: "Lisensi Antivirus Kaspersky",
        no_invoice: "INV/2026/015",
        asset_code: "SPMT-KPT-SFT-KASP-01",
        category: "Software",
        model: "Kaspersky Endpoint",
        serial_number: "SN-KASP-001",
        location: "Kantor Pusat",
        jumlah: 8500000,
        acquisition_value: 8500000,
      },
      {
        id: "TRX-OPEX-002",
        tanggal: "2026-01-15",
        keterangan: "Pembayaran Lisensi Microsoft Office 365",
        no_invoice: "INV/2026/001",
        asset_code: "SPMT-KPT-SFT-O365-01",
        category: "Software",
        model: "Office 365 Business",
        serial_number: "SN-O365-001",
        location: "Kantor Pusat",
        jumlah: 15000000,
        acquisition_value: 15000000,
      },
      {
        id: "TRX-OPEX-003",
        tanggal: "2026-03-20",
        keterangan: "Langganan Adobe Creative Cloud Team",
        no_invoice: "INV/2026/077",
        asset_code: "SPMT-KPT-SFT-ADOB-01",
        category: "Software",
        model: "Creative Cloud All Apps",
        serial_number: "SN-ADOB-123",
        location: "Kantor Pusat",
        jumlah: 12500000,
        acquisition_value: 12500000,
      },
      {
        id: "TRX-OPEX-004",
        tanggal: "2026-04-05",
        keterangan: "Lisensi Zoom Business (10 Host)",
        no_invoice: "INV/2026/092",
        asset_code: "SPMT-KPT-SFT-ZOOM-01",
        category: "Software",
        model: "Zoom Business",
        serial_number: "SN-ZOOM-001",
        location: "Kantor Pusat",
        jumlah: 4500000,
        acquisition_value: 4500000,
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
        asset_code: "",
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
function exportAssetsToExcel(assets, projectName, contractNo) {
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const cols = [6, 35, 22, 20, 12, 18, 20];
  const headers = [
    "No",
    "Nama Barang",
    "Kode Barang",
    "Kategori",
    "Jumlah",
    "Harga Satuan",
    "Total",
  ];
  const rows = assets.map((a, i) => {
    const qty = a.jumlah || 1;
    const price = a.harga_satuan || a.acquisition_value || 0;
    const rowTotal = qty * price;
    return [
      i + 1,
      a.name || "",
      a.asset_code || "",
      a.category || "",
      qty,
      price,
      rowTotal,
    ];
  });
  const total = assets.reduce((s, a) => {
    const qty = a.jumlah || 1;
    const price = a.harga_satuan || a.acquisition_value || 0;
    return s + (qty * price);
  }, 0);
  const totalRow = ["", "TOTAL", "", "", "", "", total];
  const cellXml = (cell, ci, styleId) => {
    const isNum = ci === 0 || ci === 4 || ci === 5 || ci === 6;
    const sty = styleId || (isNum && ci !== 0 ? "num" : "");
    return `<Cell${sty ? ` ss:StyleID="${sty}"` : ""}><Data ss:Type="${isNum ? "Number" : "String"}">${isNum ? Number(cell) || 0 : esc(cell)}</Data></Cell>`;
  };
  const xml = `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><Styles><Style ss:ID="header"><Font ss:Bold="1"/><Interior ss:Color="#2563EB" ss:Pattern="Solid"/><Font ss:Color="#FFFFFF" ss:Bold="1"/></Style><Style ss:ID="total"><Font ss:Bold="1"/><Interior ss:Color="#EFF6FF" ss:Pattern="Solid"/></Style><Style ss:ID="num"><NumberFormat ss:Format="#,##0"/></Style><Style ss:ID="numtotal"><NumberFormat ss:Format="#,##0"/><Font ss:Bold="1"/><Interior ss:Color="#EFF6FF" ss:Pattern="Solid"/></Style><Style ss:ID="info"><Interior ss:Color="#F0F9FF" ss:Pattern="Solid"/></Style></Styles><Worksheet ss:Name="Daftar Barang"><Table>${cols.map((w) => `<Column ss:Width="${w * 7}"/>`).join("")}<Row><Cell ss:MergeAcross="6" ss:StyleID="info"><Data ss:Type="String">Pekerjaan: ${esc(projectName)}</Data></Cell></Row><Row><Cell ss:MergeAcross="6" ss:StyleID="info"><Data ss:Type="String">No. Kontrak: ${esc(contractNo || "-")}</Data></Cell></Row><Row/><Row>${headers.map((h) => `<Cell ss:StyleID="header"><Data ss:Type="String">${esc(h)}</Data></Cell>`).join("")}</Row>${rows.map((row) => `<Row>${row.map((cell, ci) => cellXml(cell, ci)).join("")}</Row>`).join("")}<Row>${totalRow.map((cell, ci) => cellXml(cell, ci, ci === 6 ? "numtotal" : "total")).join("")}</Row></Table></Worksheet></Workbook>`;
  const blob = new Blob([xml], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Daftar_Barang_${(contractNo || "barang").replace(/[/\\:*?"<>|]/g, "-")}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");
:root {
--blue:#2563eb;--blue-lt:#eff6ff;--blue-mid:#dbeafe;
--green:#16a34a;--green-lt:#f0fdf4;--green-mid:#dcfce7;
--amber:#d97706;--amber-lt:#fffbeb;
--red:#dc2626;--red-lt:#fef2f2;
--ink:#111827;--ink2:#374151;--ink3:#6b7280;--ink4:#9ca3af;
--border:#e5e7eb;--border-lt:#f3f4f6;
--surf:#ffffff;--bg:#f9fafb;
--mono:"JetBrains Mono","Courier New",monospace;
--r:8px;--r-lg:12px;
--sh:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
--sh-md:0 4px 12px rgba(0,0,0,.08);--sh-lg:0 20px 48px rgba(0,0,0,.14);
--div:rgba(0,0,0,0.08);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;background:var(--bg);color:var(--ink);font-size:13px;-webkit-font-smoothing:antialiased;line-height:1.5}
.root{padding:1.5rem 2rem;min-height:100vh;max-width:1400px;margin:0 auto}
.hdr{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.3rem;flex-wrap:wrap}
.hdr h1{font-size:1.3rem;font-weight:800;letter-spacing:-.5px}
.hdr p{font-size:.75rem;color:var(--ink4);margin-top:2px;font-weight:500}
.hdr-right{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.type-tabs{display:flex;gap:2px;background:var(--surf);padding:3px;border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh)}
.type-tab{display:flex;align-items:center;gap:6px;padding:5px 14px;border:none;background:transparent;border-radius:6px;font-family:inherit;font-size:.72rem;font-weight:600;color:var(--ink3);cursor:pointer;transition:all .15s}
.type-tab:hover:not(.on){background:var(--bg);color:var(--ink2)}
.type-tab.on{background:var(--blue);color:#fff;box-shadow:0 2px 6px rgba(37,99,235,0.2)}
.type-tab.on.all{background:var(--ink);box-shadow:0 2px 6px rgba(15,23,42,0.2)}
.kpi-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:24px}
.kpi{background:var(--surf);border:1px solid var(--border);border-radius:var(--r-lg);padding:1.25rem;display:flex;gap:16px;align-items:center;box-shadow:var(--sh);transition:transform 0.2s}
.kpi:hover{transform:translateY(-2px);box-shadow:var(--sh-md)}
.kpi-ico{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.kpi.blue .kpi-ico{background:var(--blue-lt);color:var(--blue)}
.kpi.amber .kpi-ico{background:var(--amber-lt);color:var(--amber)}
.kpi.green .kpi-ico{background:var(--green-lt);color:var(--green)}
.kpi-body{flex:1;min-width:0}
.kpi-lbl{font-size:.7rem;color:var(--ink3);font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
.kpi-val{font-size:1.2rem;font-weight:800;color:var(--ink);line-height:1}
.kpi-sub{font-size:.7rem;color:var(--ink4);margin-top:6px}
.kpi-bar{height:4px;background:var(--border-lt);border-radius:99px;overflow:hidden;margin-top:8px}
.kpi-bar-fill{height:100%;border-radius:99px;transition:width .6s ease}
.toolbar{display:flex;align-items:center;gap:9px;margin-bottom:14px;flex-wrap:wrap}
.flt-box,.srch{display:flex;align-items:center;gap:8px;background:var(--surf);border:1px solid var(--border);border-radius:var(--r);padding:7px 11px;box-shadow:var(--sh);transition:border-color .2s}
.flt-box:focus-within,.srch:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.flt-box svg,.srch svg{color:var(--ink4);flex-shrink:0}
.flt-select,.srch input{border:none;background:transparent;font-family:inherit;font-size:.8rem;color:var(--ink);outline:none}
.flt-select{cursor:pointer;font-weight:500}
.srch{flex:1;max-width:360px}
.srch input{flex:1}
.opex-toolbar{display:flex;align-items:center;gap:11px;margin-bottom:14px;flex-wrap:wrap}
.opex-flt-box{display:flex;align-items:center;gap:8px;background:var(--surf);border:1px solid var(--border);border-radius:var(--r);padding:7px 11px;box-shadow:var(--sh);transition:border-color .2s}
.opex-flt-box:focus-within{border-color:var(--green);box-shadow:0 0 0 3px rgba(22,163,74,.1)}
.opex-flt-box svg{color:var(--ink4);flex-shrink:0}
.opex-flt-select{border:none;background:transparent;font-family:inherit;font-size:.78rem;color:var(--ink);outline:none;cursor:pointer;font-weight:500}
.opex-srch{display:flex;align-items:center;gap:8px;background:var(--surf);border:1px solid var(--border);border-radius:var(--r);padding:7px 11px;box-shadow:var(--sh);flex:1;max-width:300px;transition:border-color .2s}
.opex-srch:focus-within{border-color:var(--green);box-shadow:0 0 0 3px rgba(22,163,74,.1)}
.opex-srch svg{color:var(--ink4);flex-shrink:0}
.opex-srch input{border:none;background:transparent;font-family:inherit;font-size:.78rem;color:var(--ink);outline:none;flex:1}
.opex-filter-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;background:var(--green-lt);border:1px solid var(--green-mid);border-radius:99px;font-size:0.7rem;font-weight:700;color:var(--green)}
.opex-filter-badge button{background:none;border:none;cursor:pointer;color:var(--green);display:flex;align-items:center;padding:0;transition:color .15s}
.opex-filter-badge button:hover{color:var(--red)}
.section-label{display:flex;align-items:center;gap:11px;margin:1.2rem 0 0.8rem}
.section-label-line{flex:1;height:1px;background:var(--border)}
.section-label-pill{display:flex;align-items:center;gap:6px;padding:3px 11px;border-radius:99px;font-size:.72rem;font-weight:700;border:1px solid transparent}
.section-label-pill.capex{background:var(--blue-lt);color:var(--blue);border-color:var(--blue-mid)}
.section-label-pill.opex{background:var(--green-lt);color:var(--green);border-color:var(--green-mid)}
.section-count{font-size:.72rem;color:var(--ink4);font-weight:500}
.card-list{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
.empty{background:var(--surf);border:1.5px dashed var(--border);border-radius:var(--r-lg);text-align:center;padding:2.5rem;color:var(--ink4);font-size:.82rem;font-weight:500}
.jcard{background:var(--surf);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--sh);transition:transform .15s,box-shadow .15s}
.jcard:hover{transform:translateY(-1px);box-shadow:var(--sh-md)}
.jcard.open-cap{border-color:var(--blue-mid)}.jcard.open-opx{border-color:var(--green-mid)}
.jcard-inner{display:flex}
.jcard-accent{width:3px;flex-shrink:0}
.jcard-accent.cap{background:var(--blue)}.jcard-accent.opx{background:var(--green)}
.jcard-content{flex:1;min-width:0}
.jcard-top{display:grid;grid-template-columns:2.2fr 1.3fr 2.5fr auto;align-items:center;gap:15px;padding:13px 18px;cursor:pointer;transition:background .15s}
.jcard-top:hover{background:var(--bg)}
.jcard.open-cap .jcard-top{background:#f8faff}.jcard.open-opx .jcard-top{background:#f7fef9}
.jc-info{display:flex;flex-direction:column;gap:4px;min-width:0}
.jc-tags{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.badge{font-size:0.65rem;font-weight:800;padding:2px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:0.5px}
.badge.capex{background:var(--blue-lt);color:var(--blue)}.badge.opex{background:var(--green-lt);color:var(--green)}
.code-tag{font-family:var(--mono);font-size:0.7rem;color:var(--ink3);background:var(--border-lt);border:1px solid var(--border);padding:1px 6px;border-radius:4px}
.yr-tag{font-size:0.7rem;font-weight:600;color:var(--ink3);background:var(--border-lt);border:1px solid var(--border);padding:1px 6px;border-radius:4px}
.jc-title{font-size:0.85rem;font-weight:700;color:var(--ink);line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.jc-meta{display:flex;flex-direction:column;gap:4px;font-size:0.75rem;color:var(--ink3);font-weight:500}
.jc-meta span{display:flex;align-items:center;gap:6px}
.jc-fin{display:flex;align-items:center;justify-content:flex-start;gap:24px}
.amt-blk{display:flex;flex-direction:column;gap:2px;text-align:left;min-width:140px}
.amt-lbl{font-size:0.65rem;color:var(--ink4);font-weight:600;text-transform:uppercase;letter-spacing:0.5px}
.amt-val{font-size:0.9rem;font-weight:800}
.amt-val.blue{color:var(--blue)}.amt-val.amber{color:var(--amber)}.amt-val.red{color:var(--red)}.amt-val.green{color:var(--green)}
.fin-div{width:1px;height:32px;background:var(--border);margin:0 4px}
.jc-actions{display:flex;align-items:center;gap:16px;justify-content:flex-end}
.ring-wrap{display:flex;align-items:center;gap:8px}
.ring{position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center}
.ring svg{position:absolute;top:0;left:0;transform:rotate(-90deg);width:100%;height:100%}
.ring-lbl{font-size:0.7rem;font-weight:800;color:var(--ink);z-index:1}
.status-pill{font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:99px;border:1px solid transparent}
.act-btns{display:flex;gap:4px}
.abtn{display:inline-flex;align-items:center;gap:4px;padding:6px 10px;border-radius:6px;border:1px solid var(--border);font-family:inherit;font-size:0.75rem;font-weight:600;cursor:pointer;transition:all .15s;background:var(--surf);color:var(--ink3)}
.abtn:hover{background:var(--bg);border-color:#cbd5e1;color:var(--ink2)}
.abtn.blue{background:var(--blue-lt);border-color:var(--blue-mid);color:var(--blue)}
.abtn.blue:hover{background:var(--blue-mid);color:#1d4ed8}
.abtn.green{background:var(--green-lt);border-color:var(--green-mid);color:var(--green)}
.abtn.green:hover{background:var(--green-mid);color:#15803d}
.abtn.excel{background:#f0fdf4;border-color:#bbf7d0;color:#166534}
.abtn.excel:hover{background:#dcfce7;color:#14532d}
.abtn.del{padding:6px 8px}
.abtn.del:hover{background:var(--red-lt);border-color:#fca5a5;color:var(--red)}
.chev{color:var(--ink4);padding:4px;border-radius:50%;display:flex;transition:background 0.15s}
.jcard-top:hover .chev{background:var(--border);color:var(--ink2)}
.jcard-detail{padding:20px;background:var(--bg);border-top:1px dashed var(--border);animation:slideDown .15s ease-out}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.d-panel{background:var(--surf);border:1px solid var(--border);border-radius:var(--r);padding:16px;box-shadow:var(--sh)}
.d-title{font-size:0.75rem;font-weight:800;color:var(--ink2);margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border-lt);padding-bottom:8px;text-transform:uppercase;letter-spacing:0.5px}
.d-rows{display:flex;flex-direction:column;gap:6px}
.d-row{display:flex;justify-content:space-between;align-items:flex-start;font-size:0.8rem}
.d-row .lbl{color:var(--ink4);font-weight:500}.d-row .val{color:var(--ink);font-weight:600;text-align:right}
.d-row code{font-family:var(--mono);font-size:0.75rem;color:var(--blue);background:var(--blue-lt);padding:2px 6px;border-radius:4px}
.d-empty{font-size:0.8rem;color:var(--ink4);text-align:center;padding:16px;background:var(--bg);border-radius:8px;border:1px dashed var(--border)}
.inline-link{font-size:0.75rem;font-weight:700;color:var(--blue);background:none;border:none;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:4px;transition:color .15s}
.inline-link:hover{color:#1e40af;text-decoration:underline}
.ai-list,.ri-list{display:flex;flex-direction:column;gap:6px}
.ai-item,.ri-item{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--surf);border:1px solid var(--border);border-radius:8px;box-shadow:var(--sh)}
.ai-info,.ri-info{display:flex;align-items:center;gap:10px}
.a-code,.r-id{font-family:var(--mono);font-size:0.7rem;font-weight:700;padding:2px 6px;border-radius:4px;white-space:nowrap}
.a-code{background:var(--blue-lt);color:var(--blue)}.r-id{background:var(--amber-lt);color:var(--amber)}
.a-name,.r-ket{font-size:0.8rem;font-weight:700;color:var(--ink);margin-bottom:2px}
.a-loc,.r-date{font-size:0.7rem;color:var(--ink4);display:flex;align-items:center;gap:4px;font-weight:500}
.a-val{font-size:0.85rem;font-weight:800;color:var(--blue)}.r-val{font-size:0.85rem;font-weight:800;color:var(--amber)}
.panel-total{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:8px;margin-top:6px}
.panel-total.blue{background:var(--blue-lt);border:1px solid var(--blue-mid);color:var(--blue)}
.panel-total.amber{background:var(--amber-lt);border:1px solid #fde68a;color:var(--amber)}
.panel-total span{font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.5px}
.panel-total strong{font-size:0.95rem;font-weight:800}
.overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:900;backdrop-filter:blur(2px);padding:20px;animation:fadeOvl .15s ease}
.mbox{background:var(--surf);border-radius:var(--r-lg);width:100%;max-width:600px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:var(--sh-lg);animation:modalUp .2s cubic-bezier(.16,1,.3,1)}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-family:inherit;font-size:0.8rem;font-weight:700;cursor:pointer;border:none;transition:all .15s;white-space:nowrap}
.btn-outline{background:var(--surf);border:1px solid var(--border);color:var(--ink2)}
.btn-outline:hover{background:var(--bg);border-color:#cbd5e1}
.btn-prim{background:var(--blue);color:#fff;box-shadow:0 2px 8px rgba(37,99,235,.2)}
.btn-prim:hover{background:#1d4ed8}
.btn-green{background:var(--green);color:#fff;box-shadow:0 2px 8px rgba(22,163,74,.2)}
.btn-green:hover{background:#15803d}
.btn-excel{background:#166534;color:#fff;box-shadow:0 2px 8px rgba(22,101,52,.25)}
.btn-excel:hover{background:#14532d}
.pagination-bar{display:flex;align-items:center;justify-content:space-between;padding:10px 4px;margin-bottom:24px;flex-wrap:wrap;gap:8px}
.pagination-info{font-size:0.75rem;color:var(--ink4);font-weight:500}
.pagination-controls{display:flex;align-items:center;gap:4px}
.pg-btn{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:6px;border:1px solid var(--border);background:var(--surf);color:var(--ink3);font-family:inherit;font-size:0.75rem;font-weight:600;cursor:pointer;transition:all .15s}
.pg-btn:hover:not(:disabled):not(.active){background:var(--bg);border-color:#cbd5e1;color:var(--ink2)}
.pg-btn.active{background:var(--blue);border-color:var(--blue);color:#fff;box-shadow:0 2px 6px rgba(37,99,235,.2)}
.pg-btn:disabled{opacity:0.4;cursor:not-allowed}
.asset-page{animation:fadeUp .15s ease-out}
.asset-page-hdr{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid var(--border);flex-wrap:wrap}
.asset-page-hdr-left{display:flex;align-items:center;gap:16px}
.asset-page-hdr-right{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.asset-ctx-banner{background:var(--surf);border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:var(--r-lg);padding:14px 20px;margin-bottom:20px;display:flex;gap:32px;flex-wrap:wrap;box-shadow:var(--sh)}
.asset-ctx-banner.opex-theme{border-left-color:var(--green)}
.asset-ctx-item{display:flex;flex-direction:column;gap:5px}.asset-ctx-item span{font-size:.62rem;font-weight:700;text-transform:uppercase;color:var(--ink4);letter-spacing:.6px}.asset-ctx-item strong{font-size:.92rem;font-weight:700;color:var(--ink);line-height:1.2}.asset-ctx-item strong.blue{color:var(--blue)}.asset-ctx-item strong.amber{color:var(--amber)}.asset-ctx-item strong.red{color:var(--red)}
.asset-ctx-divider{width:1px;height:28px;background:var(--div);align-self:center;margin:0 12px}
.asset-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.asset-toolbar-left,.asset-toolbar-right{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.at-filter{display:flex;align-items:center;gap:8px;background:var(--surf);border:1px solid var(--border);border-radius:var(--r);padding:7px 12px;box-shadow:var(--sh);transition:border-color .2s}
.at-filter:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.at-filter svg{color:var(--ink4);flex-shrink:0}
.at-filter input,.at-filter select{border:none;background:transparent;font-family:inherit;font-size:0.78rem;color:var(--ink);outline:none;font-weight:500}
.at-filter select{cursor:pointer;min-width:130px}.at-filter input{min-width:220px}
.asset-table-wrap{background:var(--surf);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--sh);overflow:hidden}
.asset-table{width:100%;border-collapse:collapse;font-size:0.8rem}
.asset-table thead tr{background:var(--bg);border-bottom:2px solid var(--border)}
.asset-table thead th{padding:11px 14px;text-align:left;font-size:0.68rem;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;color:var(--ink3);white-space:nowrap;border-right:1px solid var(--border-lt)}
.asset-table thead th:last-child{border-right:none}
.asset-table thead th.th-no{width:44px;text-align:center}
.asset-table thead th.th-actions{width:80px;text-align:center}
.asset-table tbody tr{border-bottom:1px solid var(--border-lt);transition:background .12s}
.asset-table tbody tr:last-child{border-bottom:none}
.asset-table tbody tr:hover{background:#f8faff}
.asset-table.opex-table tbody tr:hover{background:#f7fef9}
.asset-table tbody td{padding:11px 14px;vertical-align:middle;border-right:1px solid var(--border-lt)}
.asset-table tbody td:last-child{border-right:none}
.td-no{text-align:center;font-size:0.7rem;font-weight:700;color:var(--ink4);background:var(--bg)}
.td-asset-name{display:flex;align-items:center;gap:10px}
.td-thumb{width:36px;height:36px;border-radius:6px;overflow:hidden;border:1px solid var(--border);flex-shrink:0;background:var(--bg);display:flex;align-items:center;justify-content:center}
.td-thumb img{width:100%;height:100%;object-fit:cover}
.td-thumb-empty{color:var(--ink4)}
.td-name-block{display:flex;flex-direction:column;gap:3px}
.td-name-text{font-size:0.82rem;font-weight:700;color:var(--ink);line-height:1.3}
.td-name-sub{font-size:0.7rem;color:var(--ink4);font-weight:500}
.td-code{font-family:var(--mono);font-size:0.72rem;font-weight:700;background:var(--blue-lt);color:var(--blue);padding:3px 8px;border-radius:5px;white-space:nowrap;display:inline-block}
.td-sn{font-family:var(--mono);font-size:0.7rem;color:var(--ink3);font-weight:600}
.cat-pill{display:inline-flex;align-items:center;padding:2px 8px;border-radius:4px;font-size:0.65rem;font-weight:800;white-space:nowrap}
.cat-pill.Server{background:#ede9fe;color:#6d28d9}.cat-pill.Network{background:#dbeafe;color:#1d4ed8}
.cat-pill.Security{background:#fef3c7;color:#b45309}.cat-pill.default{background:var(--border-lt);color:var(--ink3)}
.td-loc{display:flex;align-items:center;gap:5px;font-size:0.78rem;color:var(--ink2);font-weight:500}
.td-date{font-size:0.78rem;color:var(--ink3);font-weight:500}
.td-value{font-size:0.85rem;font-weight:800;color:var(--blue);white-space:nowrap}
.td-actions{text-align:center}
.td-act-row{display:flex;align-items:center;justify-content:center;gap:4px}
.asset-table tfoot tr{background:var(--blue-lt);border-top:2px solid var(--blue-mid)}
.asset-table tfoot td{padding:10px 14px;font-size:0.78rem;font-weight:700;color:var(--blue)}
.asset-table tfoot .tfoot-total{font-size:0.9rem;font-weight:800}
.asset-table.opex-table tfoot tr{background:var(--green-lt);border-top-color:var(--green-mid)}
.asset-table.opex-table tfoot td{color:var(--green)}
.table-empty-row td{text-align:center;padding:48px 24px !important;color:var(--ink4)}
.table-empty-inner{display:flex;flex-direction:column;align-items:center;gap:10px}
.subpage{animation:fadeUp .15s ease-out;max-width:880px;margin:0 auto}
.subpage-hdr{display:flex;align-items:center;gap:15px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.subpage-hdr h2{font-size:1.18rem;font-weight:800;flex:1;letter-spacing:-0.5px}
.ctx-card{background:var(--surf);border:1px solid var(--border);border-left:4px solid var(--blue);border-radius:var(--r-lg);padding:15px 18px;margin-bottom:20px;display:flex;gap:22px;flex-wrap:wrap;box-shadow:var(--sh)}
.ctx-item{display:flex;flex-direction:column;gap:4px}
.ctx-item span{font-size:0.65rem;font-weight:800;text-transform:uppercase;color:var(--ink4);letter-spacing:0.5px}
.ctx-item strong{font-size:0.9rem;font-weight:700;color:var(--ink)}
.sec-card{background:var(--surf);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--sh);overflow:hidden;margin-bottom:14px}
.sec-card-hdr{display:flex;align-items:center;gap:11px;padding:12px 18px;background:var(--bg);border-bottom:1px solid var(--border)}
.sec-card-hdr h3{font-size:0.88rem;font-weight:800;color:var(--ink)}
.sec-card-body{padding:16px}
.hfld{display:flex;align-items:flex-start;gap:0;border-bottom:1px solid var(--border-lt);padding:8px 0}
.hfld:last-child{border-bottom:none}
.hfld-label{width:180px;min-width:180px;font-size:0.72rem;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:0.5px;padding-top:8px;padding-right:14px;flex-shrink:0;line-height:1.3}
.hfld-label .req,.aefld-label .req,.mhfld-lbl .req{color:var(--red);margin-left:2px}
.hfld-input{flex:1}
.hfld input,.hfld textarea,.hfld select{width:100%;padding:8px 11px;border:1px solid #cbd5e1;border-radius:7px;font-family:inherit;font-size:0.82rem;color:var(--ink);outline:none;transition:all .15s;background:var(--surf);font-weight:500}
.hfld input:focus,.hfld textarea:focus,.hfld select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.hfld textarea{resize:vertical;min-height:64px}
.hfld select{cursor:pointer}
.hfld-hint{font-size:0.68rem;color:var(--ink4);margin-top:3px}
.aefld{display:flex;align-items:flex-start;gap:0;border-bottom:1px solid var(--border-lt);padding:8px 0}
.aefld:last-child{border-bottom:none}
.aefld-label{width:180px;min-width:180px;font-size:0.72rem;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:0.4px;padding-top:9px;padding-right:14px;flex-shrink:0;line-height:1.4}
.aefld-input{flex:1}
.aefld input,.aefld select{width:100%;padding:8px 11px;border:1px solid #cbd5e1;border-radius:7px;font-family:inherit;font-size:0.83rem;color:var(--ink);outline:none;transition:all .15s;background:var(--surf);font-weight:500}
.aefld input:focus,.aefld select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.aefld-hint{font-size:0.68rem;color:var(--ink4);margin-top:3px}
.edit-footer{background:var(--surf);border:1px solid var(--border);border-radius:var(--r-lg);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:14px;box-shadow:var(--sh-md);margin-top:20px;position:sticky;bottom:24px;z-index:10}
.acard{background:var(--surf);border:1px solid var(--border);border-left:5px solid var(--blue);border-radius:var(--r-lg);overflow:hidden;margin-bottom:24px;box-shadow:0 4px 16px rgba(0,0,0,0.03);transition:box-shadow 0.2s}
.acard:hover{box-shadow:0 8px 24px rgba(0,0,0,0.06)}
.acard-hdr{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--bg);border-bottom:1px solid var(--border)}
.acard-body{padding:24px}
.asset-number-badge{background:var(--ink);color:#fff;font-size:0.7rem;font-weight:800;padding:4px 10px;border-radius:6px;letter-spacing:0.5px}
.acard-image-section{display:flex;align-items:flex-start;gap:20px;margin-bottom:20px;border-bottom:1px dashed var(--border);padding-bottom:20px}
.acard-image-box{width:120px;height:120px;border-radius:8px;border:1.5px dashed #cbd5e1;background:var(--bg);display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;overflow:hidden;cursor:pointer;transition:all .15s}
.acard-image-box:hover{border-color:var(--blue);background:var(--blue-lt)}
.acard-image-preview-container{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}
.acard-image-preview{max-width:100%;max-height:100%;object-fit:contain}
.acard-image-upload-trigger{color:var(--ink4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:0.7rem;font-weight:600;text-align:center}
.acard-image-upload-trigger:hover{color:var(--blue)}
.abtn.clear{padding:4px 8px;background:rgba(255,255,255,.8);color:var(--ink2);border:1px solid var(--border);border-radius:6px;font-size:0.65rem;position:absolute;top:6px;right:6px;z-index:2}
.abtn.clear:hover{background:#fff;color:var(--red);border-color:#fca5a5}
.toast{position:fixed;bottom:24px;right:24px;background:var(--ink);color:#fff;padding:12px 20px;border-radius:12px;font-size:0.85rem;font-weight:600;box-shadow:var(--sh-lg);display:flex;align-items:center;gap:8px;z-index:9999;animation:toastIn .2s ease}
.cbox{background:var(--surf);border-radius:16px;padding:24px;max-width:320px;width:100%;box-shadow:var(--sh-lg);display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center;animation:modalUp .2s ease}
.tambah-page{animation:fadeUp .15s ease-out;max-width:820px;margin:0 auto}
.tambah-page-hdr{display:flex;align-items:center;gap:15px;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.tambah-page-hdr-ico{width:40px;height:40px;border-radius:11px;background:var(--blue-lt);color:var(--blue);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.tambah-page-hdr-text h2{font-size:1.15rem;font-weight:800;letter-spacing:-0.5px;color:var(--ink)}
.tambah-page-hdr-text p{font-size:0.75rem;color:var(--ink4);margin-top:1px;font-weight:500}
.tambah-sec{background:var(--surf);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--sh);overflow:hidden;margin-bottom:12px}
.tambah-sec-hdr{display:flex;align-items:center;gap:9px;padding:9px 15px;background:var(--border-lt);border-bottom:1px solid var(--border);font-size:0.70rem;font-weight:800;color:var(--ink2);text-transform:uppercase;letter-spacing:0.5px}
.tambah-sec-body{padding:3px 15px 6px}
.tambah-fld{display:flex;align-items:center;padding:6px 0;gap:0;border-bottom:1px solid var(--border-lt)}
.tambah-fld:last-child{border-bottom:none}
.tambah-fld-lbl{width:170px;min-width:170px;font-size:.70rem;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:0.4px;padding-right:13px;flex-shrink:0;line-height:1.3}
.tambah-fld-lbl .req{color:var(--red);margin-left:2px}
.tambah-fld-inp{flex:1}
.tambah-fld input,.tambah-fld textarea,.tambah-fld select{width:100%;padding:6px 10px;border:1px solid #cbd5e1;border-radius:7px;font-family:inherit;font-size:0.81rem;color:var(--ink);outline:none;transition:all .15s;background:var(--surf);font-weight:500}
.tambah-fld input:focus,.tambah-fld textarea:focus,.tambah-fld select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.tambah-fld textarea{resize:vertical;min-height:56px}
.tambah-fld select{cursor:pointer}
.tambah-fld-hint{font-size:.66rem;color:var(--ink4);margin-top:2px}
.tambah-2col{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.anggaran-info-bar{display:flex;align-items:center;gap:0;background:var(--blue-lt);border:1px solid var(--blue-mid);border-radius:7px;overflow:hidden;flex-shrink:0}
.anggaran-info-bar .ai-item-s{display:flex;flex-direction:column;gap:0px;padding:5px 12px;border-right:1px solid var(--blue-mid);white-space:nowrap}
.anggaran-info-bar .ai-item-s:last-child{border-right:none}
.anggaran-info-bar .ai-lbl-s{font-size:0.58rem;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;color:#60a5fa}
.anggaran-info-bar .ai-val-s{font-size:0.76rem;font-weight:700;color:var(--ink)}
.anggaran-info-bar .ai-val-s.sisa-ok{color:var(--green)}
.anggaran-info-bar .ai-val-s.sisa-warn{color:var(--amber)}
.anggaran-info-bar .ai-val-s.sisa-over{color:var(--red)}
.opex-inline-preview{display:inline-flex;align-items:center;padding:6px 11px;background:var(--green-lt);border:1px solid var(--green-mid);border-radius:7px;font-size:0.78rem;font-weight:700;color:var(--green);white-space:nowrap;flex-shrink:0;min-width:fit-content}
.req-note-small{font-size:0.7rem;color:var(--ink4);padding:0 0 10px;font-style:italic}
.ang-card{background:var(--surf);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--sh);transition:transform .15s,box-shadow .15s;cursor:pointer}
.ang-card:hover{transform:translateY(-2px);box-shadow:var(--sh-md);border-color:var(--blue-mid)}
.ang-card-inner{display:flex}
.ang-card-accent{width:4px;flex-shrink:0;background:var(--blue)}
.ang-card-body{flex:1;min-width:0;padding:16px 18px;display:grid;grid-template-columns:2.5fr 1.5fr 2fr auto;align-items:center;gap:16px}
.ang-card-info{display:flex;flex-direction:column;gap:5px;min-width:0}
.ang-card-tags{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.ang-card-title{font-size:0.88rem;font-weight:700;color:var(--ink);line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.ang-card-meta{display:flex;flex-direction:column;gap:4px;font-size:0.75rem;color:var(--ink3);font-weight:500}
.ang-card-meta span{display:flex;align-items:center;gap:6px}
.ang-card-fin{display:flex;align-items:center;justify-content:flex-end;gap:18px}
.ang-card-actions{display:flex;align-items:center;gap:8px}
.ang-card-chevron{color:var(--blue);display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(--blue-lt);border:1px solid var(--blue-mid)}
.yr-tag.multi {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--blue-lt);
  color: var(--blue);
  border: 1px solid var(--blue-mid);
  padding: 2px 8px;
  transition: all 0.2s;
}
.yr-tag.multi:hover {
  background: var(--blue);
  color: #fff;
  border-color: var(--blue);
}
@keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeOvl{from{opacity:0}to{opacity:1}}
@keyframes modalUp{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes toastIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1024px){.jcard-top{grid-template-columns:1fr;gap:12px}.jc-fin{justify-content:flex-start}.jc-actions{justify-content:flex-start;flex-wrap:wrap}.fin-div{display:none}.asset-table{font-size:0.75rem}.asset-table thead th,.asset-table tbody td{padding:9px 10px}.ang-card-body{grid-template-columns:1fr;gap:12px}}
@media(max-width:900px){.root{padding:24px 20px 80px}.hdr{flex-direction:column;align-items:stretch}.kpi-strip{grid-template-columns:1fr}.detail-grid{grid-template-columns:1fr}.ctx-card{grid-template-columns:1fr 1fr}.opex-flt-select{min-width:200px}.tambah-fld-lbl{width:140px;min-width:140px}.hfld-label{width:160px;min-width:160px}.aefld-label{width:140px;min-width:140px}}
`;
const PAGE_SIZE = 5;
function Pagination({ total, page, onPage, label }) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;
  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1))
      pages.push(i);
    else if (pages[pages.length - 1] !== "...") pages.push("...");
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
              key={`e${i}`}
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
          disabled={page === Math.ceil(total / PAGE_SIZE)}
          onClick={() => onPage(page + 1)}
        >
          <Icon d={I.chevRight} size={13} />
        </button>
      </div>
    </div>
  );
}
function SmartLocationInput({ value, onChange, placeholder = "Pilih Branch / Zona / Subzona" }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const valStr = value || "";
  const parts = valStr.split(" / ");
  const currentPartIdx = parts.length - 1;
  const currentText = (parts[currentPartIdx] || "").trim();

  let options = [];
  let stepLabel = "";
  if (currentPartIdx === 0) {
    options = Object.values(BRANCH_BY_ENTITY).flat().map(b => b.name);
    stepLabel = "Pilih Branch";
  } else if (currentPartIdx === 1) {
    options = ZONA_LIST.map(z => z.name);
    stepLabel = "Pilih Zona";
  } else if (currentPartIdx === 2) {
    options = SUBZONA_LIST.map(s => s.name);
    stepLabel = "Pilih Subzona";
  }

  const filteredOptions = options.filter(o => o.toLowerCase().includes(currentText.toLowerCase()));

  const handleSelect = (opt) => {
    const newParts = [...parts];
    newParts[currentPartIdx] = opt;
    const nextVal = newParts.join(" / ") + (currentPartIdx < 2 ? " / " : "");
    onChange(nextVal);
    if (currentPartIdx >= 2) setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <input
        value={valStr}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #cbd5e1",
          borderRadius: 8,
          fontSize: "0.8rem",
          background: "#fcfdfe",
          color: "#111827",
          fontWeight: 500,
          outline: "none",
          transition: "all 0.2s"
        }}
        onFocusCapture={(e) => {
          e.target.style.borderColor = "var(--blue)";
          e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
        }}
        onBlurCapture={(e) => {
          e.target.style.borderColor = "#cbd5e1";
          e.target.style.boxShadow = "none";
        }}
      />
      {isOpen && filteredOptions.length > 0 && currentPartIdx <= 2 && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          marginTop: 6,
          zIndex: 100,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          maxHeight: 220,
          overflowY: "auto",
          animation: "slideDown 0.2s ease-out"
        }}>
          <div style={{ padding: "8px 12px", fontSize: "0.65rem", fontWeight: 800, color: "#64748b", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase", position: "sticky", top: 0, zIndex: 2 }}>
            {stepLabel}
          </div>
          {filteredOptions.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleSelect(opt)}
              style={{
                padding: "10px 12px",
                fontSize: "0.78rem",
                color: "#334155",
                cursor: "pointer",
                borderBottom: i === filteredOptions.length - 1 ? "none" : "1px solid #f1f5f9",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.background = "var(--blue-lt)"}
              onMouseLeave={(e) => e.target.style.background = "white"}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
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
    <div className="overlay" style={{ animation: "fadeOvl .2s" }}>
      <div className="cbox" style={{ animation: "modalUp .2s ease-out" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "var(--red-lt)",
            color: "var(--red)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <Icon d={I.warning} size={24} />
        </div>
        <p style={{ fontWeight: 700, color: "var(--ink)", textAlign: 'center' }}>{msg}</p>
        <div style={{ display: "flex", gap: 10, width: "100%" }}>
          <button className="btn btn-outline" onClick={onCancel} style={{ flex: 1, justifyContent: 'center' }}>
            Batal
          </button>
          <button className="btn btn-red" onClick={onConfirm} style={{ flex: 1, justifyContent: 'center' }}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
function CatPill({ cat }) {
  const cls = ["Server", "Network", "Security"].includes(cat) ? cat : "default";
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
function HFld({ label, req, children }) {
  return (
    <div className="hfld">
      <div className="hfld-label">
        {label}
        {req && <span className="req">*</span>}
      </div>
      <div className="hfld-input">{children}</div>
    </div>
  );
}
function AEFld({ label, req, children }) {
  return (
    <div className="aefld">
      <div className="aefld-label">
        {label}
        {req && <span className="req">*</span>}
      </div>
      <div className="aefld-input">{children}</div>
    </div>
  );
}
function TFld({ label, req, children }) {
  return (
    <div className="tambah-fld">
      <div className="tambah-fld-lbl">
        {label}
        {req && <span className="req">*</span>}
      </div>
      <div className="tambah-fld-inp">{children}</div>
    </div>
  );
}
function MHFld({ label, req, green, children }) {
  return (
    <div className={`tambah-fld${green ? " green" : ""}`}>
      <div className="tambah-fld-lbl">
        {label}
        {req && <span className="req">*</span>}
      </div>
      <div className="tambah-fld-inp">{children}</div>
    </div>
  );
}
function Breadcrumb({ items }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 16,
        flexWrap: "wrap",
      }}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <Icon
              d={I.chevRight}
              size={12}
              style={{ color: "var(--ink4)", flexShrink: 0 }}
            />
          )}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--blue)",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {item.icon && <Icon d={item.icon} size={12} />}
              {item.label}
            </button>
          ) : (
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--ink2)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {item.icon && (
                <Icon
                  d={item.icon}
                  size={12}
                  style={{ color: "var(--ink3)" }}
                />
              )}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
// ══════ TAMBAH PEKERJAAN PAGE ══════
function TambahPekerjaanPage({ anggaran, onBack, onSave }) {
  const [form, setForm] = useState({
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
  const totalKontrak = (anggaran.projects || []).reduce(
    (s, p) => s + (p.nilai_kontrak || 0),
    0,
  );
  const sisaAnggaran = anggaran.nilai_kad - totalKontrak;
  const sisaClass =
    sisaAnggaran > 0
      ? "sisa-ok"
      : sisaAnggaran === 0
        ? "sisa-warn"
        : "sisa-over";
  const handleSave = () => {
    if (!form.nm_pekerjaan) return;
    const nilaiKontrak = parseFloat(form.nilai_kontrak) || 0;
    if (nilaiKontrak > anggaran.nilai_kad) {
      alert(
        `Nilai Kontrak tidak boleh melebihi Nilai KAD (${fmt(anggaran.nilai_kad)})`,
      );
      return;
    }
    onSave({
      id: `PKJ-${Date.now()}`,
      nm_pekerjaan: form.nm_pekerjaan,
      nilai_rab: parseFloat(form.nilai_rab) || 0,
      nilai_kontrak: nilaiKontrak,
      no_pr: form.no_pr,
      no_po: form.no_po,
      no_kontrak: form.no_kontrak,
      tgl_kontrak: form.tgl_kontrak,
      durasi_kontrak: parseInt(form.durasi_kontrak) || 0,
      no_sp3: form.no_sp3,
      tgl_sp3: form.tgl_sp3,
      tgl_bamk: form.tgl_bamk,
    });
  };
  return (
    <div className="tambah-page">
      <div className="tambah-page-hdr">
        <button className="btn btn-outline" onClick={onBack}>
          <Icon d={I.arrowLeft} size={12} /> Kembali
        </button>
        <div className="tambah-page-hdr-ico">
          <Icon d={I.briefcase} size={20} />
        </div>
        <div className="tambah-page-hdr-text">
          <h2>Tambah Pekerjaan CAPEX</h2>
          <p>Pos Anggaran: {anggaran.nama}</p>
        </div>
      </div>
      <p className="req-note-small">
        Kolom bertanda <span style={{ color: "var(--red)" }}>*</span> wajib
        diisi
      </p>
      <div className="tambah-sec">
        <div className="tambah-sec-hdr">
          <Icon d={I.database} size={13} /> Pos Anggaran CAPEX
        </div>
        <div className="tambah-sec-body">
          <TFld label="Pos Anggaran">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                value={`[${anggaran.kode}] ${anggaran.thnAnggaran} — ${anggaran.nama}`}
                disabled
                style={{ flex: 1, opacity: 0.7 }}
              />
              {anggaran.nilai_kad > 0 && (
                <div className="anggaran-info-bar">
                  <div className="ai-item-s">
                    <span className="ai-lbl-s">Sisa Anggaran</span>
                    <span className={`ai-val-s ${sisaClass}`}>
                      {fmt(Math.abs(sisaAnggaran))}
                      {sisaAnggaran < 0 ? " (melebihi)" : ""}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </TFld>
        </div>
      </div>
      <div className="tambah-sec">
        <div className="tambah-sec-hdr">
          <Icon d={I.fileText} size={13} /> Informasi Pekerjaan
        </div>
        <div className="tambah-sec-body">
          <TFld label="Nama Pekerjaan" req>
            <textarea
              placeholder="Deskripsi lengkap nama pekerjaan..."
              value={form.nm_pekerjaan}
              onChange={(e) => up("nm_pekerjaan", e.target.value)}
              rows={2}
            />
          </TFld>
          <TFld label="Nilai RAB (IDR)">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                placeholder="0"
                value={form.nilai_rab}
                onChange={(e) => up("nilai_rab", e.target.value)}
                style={{ flex: 1 }}
              />
              {form.nilai_rab > 0 && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ink3)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {fmt(parseFloat(form.nilai_rab) || 0)}
                </span>
              )}
            </div>
          </TFld>
          <TFld label="Nilai Kontrak (IDR)">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                placeholder="0"
                value={form.nilai_kontrak}
                onChange={(e) => up("nilai_kontrak", e.target.value)}
                style={{ flex: 1 }}
              />
              {form.nilai_kontrak > 0 && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--red)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {fmt(parseFloat(form.nilai_kontrak) || 0)}
                </span>
              )}
            </div>
          </TFld>
          <TFld label="Durasi Kontrak">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                placeholder="Jumlah hari"
                value={form.durasi_kontrak}
                onChange={(e) => up("durasi_kontrak", e.target.value)}
                style={{ flex: 1 }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--ink3)",
                  whiteSpace: "nowrap",
                }}
              >
                hari kerja
              </span>
            </div>
          </TFld>
        </div>
      </div>
      <div className="tambah-sec">
        <div className="tambah-sec-hdr">
          <Icon d={I.tag} size={13} /> Referensi Dokumen
        </div>
        <div className="tambah-sec-body">
          {[
            ["No. PR", "no_pr", "cth. 8260001121"],
            ["No. PO", "no_po", "cth. 6440000839"],
            [
              "No. Kontrak",
              "no_kontrak",
              "cth. SI.01/10/9/2/PPTI/TEKI/PLMT-24",
            ],
            ["No. SP3", "no_sp3", "Nomor SP3"],
          ].map(([lbl, key, ph]) => (
            <TFld key={key} label={lbl}>
              <input
                placeholder={ph}
                value={form[key]}
                onChange={(e) => up(key, e.target.value)}
              />
            </TFld>
          ))}
          <TFld label="Tanggal Kontrak">
            <input
              type="date"
              value={form.tgl_kontrak}
              onChange={(e) => up("tgl_kontrak", e.target.value)}
            />
          </TFld>
          <TFld label="Tanggal SP3">
            <input
              type="date"
              value={form.tgl_sp3}
              onChange={(e) => up("tgl_sp3", e.target.value)}
            />
          </TFld>
          <TFld label="Tanggal BAMK">
            <input
              type="date"
              value={form.tgl_bamk}
              onChange={(e) => up("tgl_bamk", e.target.value)}
            />
          </TFld>
        </div>
      </div>
      <div className="edit-footer">
        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>
            Pekerjaan akan disimpan ke pos anggaran:
          </span>
          <strong
            style={{
              fontSize: "0.82rem",
              display: "block",
              color: "var(--ink)",
            }}
          >
            {anggaran.nama}
          </strong>
          {anggaran.nilai_kad === 0 && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--red)",
                marginTop: 4,
                display: "block",
              }}
            >
              ⚠️ Isi Nilai KAD terlebih dahulu
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-outline" onClick={onBack}>
            Batal
          </button>
          <button
            className="btn btn-prim"
            style={{
              opacity: !form.nm_pekerjaan || anggaran.nilai_kad === 0 ? 0.5 : 1,
              cursor:
                !form.nm_pekerjaan || anggaran.nilai_kad === 0
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={handleSave}
            disabled={!form.nm_pekerjaan || anggaran.nilai_kad === 0}
          >
            <Icon d={I.save} size={13} /> Simpan Pekerjaan
          </button>
        </div>
      </div>
    </div>
  );
}
// ══════ MODAL: TAMBAH OPEX ══════
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
  const nilaiPreview = parseFloat(form.nilai_anggaran_tahunan) || 0;
  return (
    <div className="overlay" onClick={onClose}>
      <div
        style={{
          background: "var(--surf)",
          borderRadius: "var(--r-lg)",
          width: "100%",
          maxWidth: 580,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "var(--sh-lg)",
          animation: "modalUp .2s cubic-bezier(.16,1,.3,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--green-lt)",
                color: "var(--green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon d={I.monitor} size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800 }}>
                Tambah Pos Anggaran OPEX
              </h3>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--ink4)",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                Isi informasi pos anggaran OPEX baru
              </p>
            </div>
          </div>
          <button
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid var(--border)",
              background: "var(--border-lt)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--ink2)",
            }}
            onClick={onClose}
          >
            <Icon d={I.x} size={14} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          <HFld label="Kode Master Anggaran">
            <select
              value={form.kd_anggaran_master}
              onChange={(e) => handleMaster(e.target.value)}
              style={{ borderColor: "var(--green)" }}
            >
              <option value="">— Pilih Kode Master (Opsional) —</option>
              {BUDGET_MASTERS.map((m) => (
                <option key={m.kd_anggaran_master} value={m.kd_anggaran_master}>
                  {m.kd_anggaran_master} — {m.nm_anggaran_master}
                </option>
              ))}
            </select>
          </HFld>
          <HFld label="Nama Pos Anggaran" req>
            <input
              placeholder="Nama pos anggaran OPEX..."
              value={form.nama}
              onChange={(e) => up("nama", e.target.value)}
            />
          </HFld>
          <HFld label="Tahun Anggaran" req>
            <input
              type="number"
              placeholder="cth. 2026"
              value={form.thn_anggaran}
              onChange={(e) => up("thn_anggaran", e.target.value)}
              min="2020"
              max="2030"
            />
          </HFld>
          <HFld label="Nilai Anggaran Tahunan (IDR)">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="number"
                placeholder="0"
                value={form.nilai_anggaran_tahunan}
                onChange={(e) => up("nilai_anggaran_tahunan", e.target.value)}
                style={{ flex: 1 }}
              />
              {nilaiPreview > 0 && (
                <span className="opex-inline-preview">{fmt(nilaiPreview)}</span>
              )}
            </div>
          </HFld>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 10,
            padding: "14px 24px",
            borderTop: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
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
// ══════ REALISASI TABLE PAGE (OPEX) ══════
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
      transactions.filter(
        (t) =>
          !searchQ ||
          t.keterangan?.toLowerCase().includes(searchQ.toLowerCase()) ||
          t.asset_code?.toLowerCase().includes(searchQ.toLowerCase()),
      ),
    [transactions, searchQ],
  );
  const totalFiltered = filtered.reduce(
    (s, t) => s + (parseFloat(t.jumlah || t.acquisition_value) || 0),
    0,
  );
  const totalAll = transactions.reduce(
    (s, t) => s + (parseFloat(t.jumlah || t.acquisition_value) || 0),
    0,
  );
  const pagu = ang.nilai_anggaran_tahunan || 0;
  const sisa = pagu - totalAll;
  return (
    <div className="asset-page">
      <Breadcrumb
        items={[
          { label: "Daftar Anggaran OPEX", onClick: onBack, icon: I.layers },
          { label: ang.nama, icon: I.monitor },
        ]}
      />
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
              Daftar Barang OPEX
            </h2>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--ink4)",
                fontWeight: 500,
              }}
            >
              {transactions.length} barang · {ang.nama}
            </p>
          </div>
        </div>
        <div className="asset-page-hdr-right">
          <button className="btn btn-green" onClick={onEntryNew}>
            <Icon d={I.plus} size={13} /> Entry Barang Baru
          </button>
        </div>
      </div>
      {/* Summary Card Perbaikan */}
      <div className="asset-ctx-banner opex-theme">
        {[
          ["Pos Anggaran", ang.nama],
          ["Kode Master", ang.kd_anggaran_master || "—", null, true],
          ["Pagu Anggaran", pagu > 0 ? fmt(pagu) : "—", "var(--blue)"],
          ["Total Realisasi", fmt(totalAll), "var(--amber)"],
          [
            "Sisa Anggaran",
            `${fmt(Math.max(0, sisa))}${sisa < 0 ? " (melebihi)" : ""}`,
            sisa >= 0 ? "var(--green)" : "var(--red)",
          ],
        ].map(([lbl, val, color, mono]) => (
          <div key={lbl} className="asset-ctx-item">
            <span>{lbl}</span>
            <strong style={color ? { color } : {}}>
              {mono ? (
                <code
                  style={{ fontFamily: "var(--mono)", fontSize: "0.82rem" }}
                >
                  {val}
                </code>
              ) : (
                val
              )}
            </strong>
          </div>
        ))}
      </div>
      <div className="asset-toolbar">
        <div className="asset-toolbar-left">
          <div className="at-filter">
            <Icon d={I.search} size={13} />
            <input
              placeholder="Cari keterangan atau kode barang..."
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
              <th>Nama / Keterangan</th>
              <th>Tipe Barang</th>
              <th>Kode Barang</th>
              <th>Serial Number</th>
              <th>Lokasi</th>
              <th>Tanggal</th>
              <th style={{ textAlign: "right" }}>Nilai (IDR)</th>
              <th className="th-actions">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="table-empty-row">
                <td colSpan={9}>
                  <div className="table-empty-inner">
                    <Icon d={I.package} size={36} style={{ opacity: 0.2 }} />
                    <span style={{ fontWeight: 600 }}>
                      {transactions.length === 0
                        ? "Belum ada barang/realisasi OPEX terdaftar."
                        : "Tidak ada data yang cocok."}
                    </span>
                    {transactions.length === 0 && (
                      <button
                        className="btn btn-green"
                        style={{ marginTop: 4 }}
                        onClick={onEntryNew}
                      >
                        <Icon d={I.plus} size={12} /> Entry Barang Pertama
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
                    <span className="td-name-text">{t.keterangan || "—"}</span>
                  </td>
                  <td>
                    <CatPill
                      cat={t.category || ASSET_DB[t.asset_code]?.category}
                    />
                  </td>
                  <td>
                    <span className="td-sn">{t.asset_code || "—"}</span>
                  </td>
                  <td>
                    <span className="td-sn">{t.serial_number || "—"}</span>
                  </td>
                  <td>
                    <div className="td-loc">
                      <Icon
                        d={I.mapPin}
                        size={11}
                        style={{ color: "var(--ink4)", flexShrink: 0 }}
                      />
                      {t.location || ASSET_DB[t.asset_code]?.location || "—"}
                    </div>
                  </td>
                  <td>
                    <span className="td-date">
                      {fmtDate(t.tanggal || t.procurement_date)}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      className="td-value"
                      style={{ color: "var(--amber)" }}
                    >
                      {fmt(t.jumlah || t.acquisition_value)}
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
                  colSpan={7}
                  style={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: "var(--green)",
                  }}
                >
                  Total {filtered.length} barang
                </td>
                <td
                  className="tfoot-total"
                  style={{ textAlign: "right", color: "var(--green)" }}
                >
                  {fmt(totalFiltered)}
                </td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
// ══════ REALISASI / ENTRY PAGE OPEX ══════
function RealisasiPage({ ang, editData, onBack, onSave, showToast }) {
  const isEdit = !!editData;

  const [form, setForm] = useState(() => {
    if (isEdit && editData) {
      const code = editData.asset_code || "";
      const dbInfo = ASSET_DB[code] || {};
      return {
        category: editData.category || dbInfo.category || "",
        model: editData.model || dbInfo.model || "",
        items: [{
          id: editData.id,
          serial_number: editData.serial_number || "",
          location: editData.location || [editData.branch, editData.zona, editData.subzona].filter(Boolean).join(" / "),
          asset_code: code
        }],
        acquisition_value: String(editData.acquisition_value ?? editData.jumlah ?? ""),
      };
    }
    return { category: "", model: "", items: [], acquisition_value: "" };
  });

  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleCat = (cat) => {
    up("category", cat);
    up("model", "");
    up("items", []);
  };
  const handleMod = (mod) => {
    up("model", mod);
    up("items", []);
  };

  const availCats = Array.from(new Set(Object.values(ASSET_DB).map(x => x.category).filter(Boolean)));
  const availMods = form.category ? Array.from(new Set(Object.values(ASSET_DB).filter(x => x.category === form.category).map(x => x.model))).filter(Boolean) : [];
  const availCodes = form.category && form.model ? Object.keys(ASSET_DB).filter(c => ASSET_DB[c].category === form.category && ASSET_DB[c].model === form.model) : [];
  const availSNs = Object.entries(SN_DB).filter(([sn, code]) => availCodes.includes(code)).map(([sn]) => sn);

  const handleQtyChange = (qty) => {
    const newItems = [...(form.items || [])];
    while (newItems.length < qty) {
      const idx = newItems.length;
      newItems.push({ id: `new-${Date.now()}-${idx}`, serial_number: "", location: "", asset_code: "" });
    }
    if (newItems.length > qty) newItems.length = qty;
    up("items", newItems);
  };

  const pagu = ang.nilai_anggaran_tahunan || 0;
  const prev = (ang.transaksi || []).filter((t) => !isEdit || t.id !== editData.id).reduce((s, t) => s + (parseFloat(t.jumlah || t.acquisition_value) || 0), 0);
  const amount = parseFloat(String(form.acquisition_value).replace(/[^\d.]/g, "")) || 0;
  const sisa = pagu - prev - amount * (form.items?.length || 0);

  const save = () => {
    if (!form.items?.length || !amount) {
      showToast("Lengkapi Quantity dan Nilai");
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const finalItems = form.items.map((item, index) => {
      const ac = item.asset_code || `ASSET-NEW-${Date.now()}-${index}`;
      const locStr = item.location || "";
      const p = locStr.split(" / ").map(s => s.trim());
      return {
        id: (isEdit && index === 0) ? editData.id : item.id || `new-${Date.now()}-${index}`,
        category: form.category,
        model: form.model,
        asset_code: ac,
        serial_number: item.serial_number,
        branch: p[0] || "",
        zona: p[1] || "",
        subzona: p[2] || "",
        location: locStr,
        procurement_date: today,
        tanggal: today,
        acquisition_value: amount,
        jumlah: amount,
        keterangan: ASSET_DB[ac]?.name || `${form.category} ${form.model}`,
        aset: ac,
      };
    });

    let list = [];
    if (isEdit) {
      // Replace the original item with the first of our new items, and append any additional new items
      const base = ang.transaksi.filter(t => t.id !== editData.id);
      list = [...base, ...finalItems];
    } else {
      list = [...(ang.transaksi || []), ...finalItems];
    }

    onSave(ang.id, list);
    showToast(isEdit ? "Barang OPEX diperbarui" : "Barang OPEX ditambahkan");
    onBack();
  };

  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}>
          <Icon d={I.arrowLeft} size={14} /> Kembali
        </button>
        <div style={{ flex: 1 }}>
          <h2>{isEdit ? "Edit Barang OPEX" : "Entry Barang OPEX Baru"}</h2>
        </div>
      </div>

      <div className="ctx-card" style={{ borderColor: "var(--green)", background: "var(--green-lt)", borderLeft: "4px solid var(--green)" }}>
        <div className="ctx-item">
          <span>Pos Anggaran</span>
          <strong style={{ color: "var(--ink)" }}>{ang.nama}</strong>
        </div>
        <div className="ctx-item">
          <span>Pagu Anggaran</span>
          <strong style={{ color: "var(--blue)" }}>{fmt(pagu)}</strong>
        </div>
        <div className="ctx-item">
          <span>Sisa Anggaran</span>
          <strong className={sisa >= 0 ? "green" : "red"} style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>
            {fmt(Math.max(0, sisa))}{sisa < 0 && " (melebihi)"}
          </strong>
        </div>
      </div>

      <div className="acard" style={{ borderLeftColor: "var(--green)" }}>
        <div className="acard-hdr" style={{ background: "var(--green-lt)" }}>
          <span className="asset-number-badge" style={{ background: "var(--green)" }}>DETAIL BARANG OPEX</span>
        </div>
        <div className="acard-body">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <AEFld label="Jenis Barang" req={true}>
              {isEdit ? (
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--ink)", padding: "4px 0" }}>{form.category}</div>
              ) : (
                <select value={form.category || ""} onChange={(e) => handleCat(e.target.value)}>
                  <option value="">— Pilih Jenis Barang —</option>
                  {availCats.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              )}
            </AEFld>

            {(form.category || isEdit) && (
              <AEFld label="Nama Barang" req={true}>
                {isEdit ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
                    <div style={{ width: 4, height: 20, background: "var(--green)", borderRadius: 2 }} />
                    <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.2px" }}>
                      {ASSET_DB[form.items?.[0]?.asset_code]?.name || form.model}
                    </span>
                  </div>
                ) : (
                  <select value={form.model || ""} onChange={(e) => handleMod(e.target.value)}>
                    <option value="">— Pilih Tipe —</option>
                    {availMods.map((mod) => <option key={mod} value={mod}>{mod}</option>)}
                  </select>
                )}
              </AEFld>
            )}

            {(form.model || isEdit) && (
              <AEFld label="Quantity" req={true}>
                <select
                  value={form.items?.length || 0}
                  onChange={(e) => handleQtyChange(parseInt(e.target.value) || 0)}
                  style={{ maxWidth: "200px" }}
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </AEFld>
            )}

            {form.items?.length > 0 && (
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {form.items.map((item, idx) => {
                    const used = form.items.map((it, i) => i !== idx ? it.serial_number : null).filter(Boolean);
                    const filteredSNs = availSNs.filter(sn => !used.includes(sn));

                    return (
                      <div key={idx} style={{ background: "white", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "16px", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <label style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", width: "130px", flexShrink: 0 }}>Serial Number {idx + 1}</label>
                            <div style={{ flex: 1 }}>
                              <SmartSNInput
                                value={item.serial_number}
                                options={filteredSNs}
                                onChange={(val) => {
                                  const newItems = [...form.items];
                                  newItems[idx].serial_number = val;
                                  newItems[idx].asset_code = Object.entries(SN_DB).find(([s, c]) => s === val)?.[1] || "";
                                  up("items", newItems);
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <label style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", width: "130px", flexShrink: 0 }}>Lokasi Penempatan</label>
                            <div style={{ flex: 1 }}>
                              <SmartLocationInput
                                value={item.location}
                                onChange={(v) => {
                                  const newItems = [...form.items];
                                  newItems[idx].location = v;
                                  up("items", newItems);
                                }}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => up("items", form.items.filter((_, i) => i !== idx))}
                            style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            title="Hapus baris"
                          >
                            <Icon d={I.trash} size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-outline"
                  style={{ width: "100%", padding: "8px", fontSize: "0.75rem", justifyContent: "center", borderStyle: "dashed" }}
                  onClick={() => {
                    const ac = availCodes[form.items.length] || "";
                    const sn = ac ? Object.entries(SN_DB).find(([s, c]) => s === ac)?.[0] || "" : "";
                    up("items", [...form.items, { id: `new-${Date.now()}-${form.items.length}`, serial_number: sn, location: "", asset_code: ac }]);
                  }}
                >
                  <Icon d={I.plus} size={12} /> Tambah Quantity
                </button>
              </div>
            )}

            <AEFld label="Nilai Perolehan (/unit)" req={true}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="number"
                  value={form.acquisition_value || ""}
                  onChange={(e) => up("acquisition_value", e.target.value)}
                  placeholder="0"
                  style={{ flex: 1 }}
                />
                {amount > 0 && (
                  <span className="aefld-hint" style={{ color: "var(--blue)", fontWeight: 600 }}>
                    {fmt(amount)}
                  </span>
                )}
              </div>
            </AEFld>
          </div>
        </div>
      </div>

      <div className="edit-footer">
        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>Total Nilai Input</span>
          <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--green)" }}>{fmt(amount * (form.items?.length || 0))}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-outline" onClick={onBack}>Batal</button>
          <button className="btn btn-green" onClick={save} disabled={!form.items?.length || !amount}>
            <Icon d={I.save} size={12} /> {isEdit ? "Perbarui" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
// ══════ OPEX CARD ══════
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
            <div className="jc-fin">
              <div className="amt-blk">
                <span className="amt-lbl">Pagu Anggaran</span>
                <span className="amt-val blue">{fmt(pagu)}</span>
              </div>
              <div className="fin-div" />
              <div className="amt-blk">
                <span className="amt-lbl">Total Realisasi</span>
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
                  className="abtn green"
                  onClick={() => onRealisasiTable(ang)}
                >
                  <Icon d={I.table} size={12} />
                  {ang.transaksi?.length > 0
                    ? `${ang.transaksi.length} Barang`
                    : "Barang"}
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
                    {[
                      ["Kode Master", ang.kd_anggaran_master, true],
                      ["Tahun Anggaran", ang.thn_anggaran],
                      ["Total Anggaran (Pagu)", fmt(pagu), false, "blue"],
                      ["Total Realisasi", fmt(totalReal), false, "amber"],
                      [
                        "Sisa Anggaran",
                        `${fmt(Math.max(0, sisa))}${sisa < 0 ? " (melebihi)" : ""}`,
                        false,
                        sisa >= 0 ? "green" : "red",
                      ],
                      ["Persentase Serapan", `${pct}%`],
                    ].map(([lbl, val, isCode, valClass]) => (
                      <div key={lbl} className="d-row">
                        <span className="lbl">{lbl}</span>
                        <span className={`val ${valClass || ""}`}>
                          {isCode ? <code>{val}</code> : val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Perbaikan Daftar Pekerjaan OPEX */}
                <div className="d-panel">
                  <div className="d-title">
                    Daftar Barang OPEX
                    <button
                      className="inline-link"
                      onClick={() => onRealisasiTable(ang)}
                    >
                      <Icon d={I.eye} size={11} /> Lihat & Edit →
                    </button>
                  </div>
                  {!ang.transaksi || ang.transaksi.length === 0 ? (
                    <div className="d-empty">
                      Belum ada barang/realisasi.
                      <div style={{ marginTop: 10 }}>
                        <button
                          className="btn btn-green"
                          style={{ fontSize: "0.75rem", padding: "6px 14px" }}
                          onClick={() => onRealisasiEntry(ang)}
                        >
                          <Icon d={I.plus} size={11} /> Tambah Barang Pertama
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ri-list">
                      {ang.transaksi.slice(0, 2).map((t) => (
                        <div key={t.id} className="ri-item">
                          <div className="ri-info">
                            <div>
                              <p className="r-ket">
                                {t.keterangan || "Barang OPEX"}
                              </p>
                              <p className="r-date">
                                <Icon
                                  d={I.calendar}
                                  size={10}
                                  style={{ marginRight: 4 }}
                                />
                                {fmtDate(t.tanggal)}
                              </p>
                            </div>
                          </div>
                          <span className="r-val">{fmt(t.jumlah)}</span>
                        </div>
                      ))}

                      <div className="panel-total amber">
                        <span>Total Pekerjaan</span>
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
// ══════ EDIT OPEX INLINE ══════
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
        <MHFld label="Kode Anggaran Master" green>
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
        </MHFld>
        <MHFld label="Nama Pos Anggaran" green>
          <input
            value={form.nama}
            onChange={(e) => up("nama", e.target.value)}
          />
        </MHFld>
        <MHFld label="Tahun Anggaran" green>
          <input
            type="number"
            value={form.thn_anggaran}
            onChange={(e) => up("thn_anggaran", e.target.value)}
          />
        </MHFld>
        <MHFld label="Nilai Anggaran Tahunan (IDR)" green>
          <input
            type="number"
            placeholder="Nilai Anggaran Tahunan (IDR)"
            value={form.nilai_anggaran_tahunan || ""}
            onChange={(e) => up("nilai_anggaran_tahunan", e.target.value)}
          />
        </MHFld>
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
// ══════ EDIT PROJECT PAGE ══════
function EditProjectPage({ project, anggaran, onBack, onSave, showToast }) {
  const [form, setForm] = useState({ ...project });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSave = () => {
    const nilaiKontrak = parseFloat(form.nilai_kontrak) || 0;
    if (nilaiKontrak > anggaran.nilai_kad) {
      showToast(
        `Nilai Kontrak tidak boleh melebihi Nilai KAD (${fmt(anggaran.nilai_kad)})`,
      );
      return;
    }
    onSave(project.id, {
      ...form,
      nilai_rab: parseFloat(form.nilai_rab) || 0,
      nilai_kontrak: nilaiKontrak,
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
        {[
          ["Anggaran", anggaran?.nama || "—"],
          ["Kode", anggaran?.kode, true],
          ["Tahun", anggaran?.thnAnggaran],
        ].map(([lbl, val, isCode]) => (
          <div key={lbl} className="ctx-item">
            <span>{lbl}</span>
            <strong>{isCode ? <code>{val}</code> : val}</strong>
          </div>
        ))}
        {anggaran?.nilai_kad > 0 && (
          <div className="ctx-item">
            <span>Nilai KAD</span>
            <strong style={{ color: "var(--blue)" }}>
              {fmt(anggaran.nilai_kad)}
            </strong>
          </div>
        )}
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <h3>Informasi Pekerjaan</h3>
        </div>
        <div className="sec-card-body">
          <HFld label="Nama Pekerjaan" req>
            <textarea
              rows="2"
              value={form.nm_pekerjaan || ""}
              onChange={(e) => up("nm_pekerjaan", e.target.value)}
            />
          </HFld>
          <HFld label="Nilai RAB (IDR)">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                value={form.nilai_rab || ""}
                onChange={(e) => up("nilai_rab", e.target.value)}
                style={{ flex: 1 }}
              />
              {form.nilai_rab > 0 && (
                <span className="hfld-hint" style={{ whiteSpace: "nowrap" }}>
                  {fmt(parseFloat(form.nilai_rab))}
                </span>
              )}
            </div>
          </HFld>
          <HFld label="Nilai Kontrak (IDR)">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                value={form.nilai_kontrak || ""}
                onChange={(e) => up("nilai_kontrak", e.target.value)}
                style={{ flex: 1 }}
              />
              {form.nilai_kontrak > 0 && (
                <span
                  className="hfld-hint"
                  style={{ color: "var(--red)", whiteSpace: "nowrap" }}
                >
                  {fmt(parseFloat(form.nilai_kontrak))}
                </span>
              )}
            </div>
          </HFld>
          <HFld label="Durasi Kontrak">
            <input
              type="number"
              value={form.durasi_kontrak || ""}
              onChange={(e) => up("durasi_kontrak", e.target.value)}
              placeholder="Jumlah hari"
            />
            <div className="hfld-hint">hari kerja</div>
          </HFld>
        </div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <h3>Referensi Dokumen</h3>
        </div>
        <div className="sec-card-body">
          {[
            ["No. PR", "no_pr"],
            ["No. PO", "no_po"],
            ["No. Kontrak", "no_kontrak"],
            ["No. SP3", "no_sp3"],
            ["Tgl. Kontrak", "tgl_kontrak", true],
            ["Tgl. SP3", "tgl_sp3", true],
          ].map(([lbl, key, isDate]) => (
            <HFld key={key} label={lbl}>
              <input
                type={isDate ? "date" : "text"}
                value={form[key] || ""}
                onChange={(e) => up(key, e.target.value)}
              />
            </HFld>
          ))}
          <HFld label="Tgl. BAMK">
            <input
              type="date"
              value={form.tgl_bamk || ""}
              onChange={(e) => up("tgl_bamk", e.target.value)}
            />
          </HFld>
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
// ══════ ASSET ENTRY PAGE (CAPEX) ══════
function AssetEntryPage({ anggaran, project, onBack, onSave, showToast }) {
  const [form, setForm] = useState({ category: "", model: "", items: [], acquisition_value: "" });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const amount = parseFloat(form.acquisition_value) || 0;
  const total = (form.items || []).length * amount;

  const availCodes = form.category && form.model
    ? Object.keys(ASSET_DB).filter(c => ASSET_DB[c].category === form.category && ASSET_DB[c].model === form.model)
    : [];
  const availSNs = Object.entries(SN_DB).filter(([sn, code]) => availCodes.includes(code)).map(([sn]) => sn);

  const handleQtyChange = (qty) => {
    const newItems = [...(form.items || [])];
    while (newItems.length < qty) {
      const idx = newItems.length;
      newItems.push({ id: `new-${Date.now()}-${idx}`, serial_number: "", location: "", asset_code: "" });
    }
    if (newItems.length > qty) newItems.length = qty;
    upd("items", newItems);
  };

  const save = () => {
    if (!form.items?.length || !form.acquisition_value) {
      showToast("Lengkapi data barang");
      return;
    }
    const amount = parseFloat(form.acquisition_value) || 0;
    const newAsset = {
      id: newId(),
      name: ASSET_DB[form.items[0]?.asset_code]?.name || `${form.category} ${form.model}`,
      category: form.category,
      model: form.model,
      jumlah: form.items.length,
      acquisition_value: amount,
      procurement_date: form.procurement_date || new Date().toISOString().split('T')[0],
      id_pekerjaan: project.id,
      units: form.items.map(it => ({
        serialNumber: it.serial_number,
        location: it.location
      })),
      asset_code: form.items[0]?.asset_code || ""
    };

    onSave(anggaran.id, [...(anggaran.assets || []), newAsset]);
    showToast("Barang baru berhasil ditambahkan");
    onBack();
  };

  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}>
          <Icon d={I.arrowLeft} size={14} /> Kembali
        </button>
        <div style={{ flex: 1 }}>
          <h2>Entry Barang Baru</h2>
        </div>
      </div>
      <div className="ctx-card">
        <div className="ctx-item">
          <span>Anggaran</span>
          <strong>{anggaran.nama?.substring(0, 40)}...</strong>
        </div>
        <div className="ctx-item">
          <span>Pekerjaan</span>
          <strong>{project?.nm_pekerjaan?.substring(0, 36) || "—"}</strong>
        </div>
        <div className="ctx-item">
          <span>Total Nilai Barang</span>
          <strong style={{ color: "var(--blue)" }}>{fmt(total)}</strong>
        </div>
      </div>
      <div className="acard">
        <div className="acard-hdr">
          <span className="asset-number-badge">BARANG BARU</span>
        </div>
        <div className="acard-body">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <AEFld label="Jenis Barang" req={true}>
              <select
                value={form.category || ""}
                onChange={(e) => {
                  upd("category", e.target.value);
                  upd("model", "");
                  upd("items", []);
                }}
              >
                <option value="">— Pilih Jenis Barang —</option>
                {Array.from(new Set(Object.values(ASSET_DB).map(x => x.category))).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </AEFld>
            {form.category && (
              <AEFld label="Nama Barang" req={true}>
                <select
                  value={form.model || ""}
                  onChange={(e) => {
                    upd("model", e.target.value);
                    upd("items", []);
                  }}
                >
                  <option value="">— Pilih Tipe —</option>
                  {Object.values(ASSET_DB)
                    .filter(x => x.category === form.category)
                    .map(m => (
                      <option key={m.model} value={m.model}>{m.name}</option>
                    ))}
                </select>
              </AEFld>
            )}

            {form.model && (
              <AEFld label="Quantity" req={true}>
                <select
                  value={form.items?.length || 0}
                  onChange={(e) => handleQtyChange(parseInt(e.target.value) || 0)}
                >
                  <option value={0}>— Pilih Quantity —</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </AEFld>
            )}

            {form.items?.length > 0 && (
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 12 }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {form.items.map((item, idx) => {
                    const used = form.items.map((it, i) => i !== idx ? it.serial_number : null).filter(Boolean);
                    const filteredSNs = availSNs.filter(sn => !used.includes(sn));

                    return (
                      <div key={idx} style={{ background: "white", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "16px", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <label style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", width: "130px", flexShrink: 0 }}>Serial Number {idx + 1}</label>
                            <div style={{ flex: 1 }}>
                              <SmartSNInput
                                value={item.serial_number}
                                options={filteredSNs}
                                onChange={(val) => {
                                  const newItems = [...form.items];
                                  newItems[idx].serial_number = val;
                                  newItems[idx].asset_code = Object.entries(SN_DB).find(([s, c]) => s === val)?.[1] || "";
                                  upd("items", newItems);
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <label style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", width: "130px", flexShrink: 0 }}>Lokasi Penempatan</label>
                            <div style={{ flex: 1 }}>
                              <SmartLocationInput
                                value={item.location}
                                onChange={(v) => {
                                  const newItems = [...form.items];
                                  newItems[idx].location = v;
                                  upd("items", newItems);
                                }}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => upd("items", form.items.filter((_, i) => i !== idx))}
                            style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            title="Hapus baris"
                          >
                            <Icon d={I.trash} size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-outline"
                  style={{ width: "100%", padding: "8px", fontSize: "0.75rem", justifyContent: "center", borderStyle: "dashed" }}
                  onClick={() => {
                    const ac = availCodes[form.items.length] || "";
                    const sn = ac ? Object.entries(SN_DB).find(([s, c]) => c === ac)?.[0] || "" : "";
                    upd("items", [...form.items, { id: newId() + form.items.length, serial_number: sn, location: "", asset_code: ac }]);
                  }}
                >
                  <Icon d={I.plus} size={12} /> Tambah Quantity
                </button>
              </div>
            )}

            <AEFld label="Nilai Perolehan (/unit)" req={true}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="number"
                  value={form.acquisition_value || ""}
                  onChange={(e) => upd("acquisition_value", e.target.value)}
                  placeholder="0"
                  style={{ flex: 1 }}
                />
                {parseFloat(form.acquisition_value) > 0 && (
                  <span className="aefld-hint" style={{ color: "var(--blue)", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {fmt(parseFloat(form.acquisition_value))}
                  </span>
                )}
              </div>
            </AEFld>
          </div>
        </div>
      </div>

      <div className="subpage-footer">
        <button className="btn btn-outline" onClick={onBack}>
          Batal
        </button>
        <button
          className="btn btn-green"
          onClick={save}
          disabled={!form.items?.length || !form.acquisition_value}
          style={{ opacity: (!form.items?.length || !form.acquisition_value) ? 0.5 : 1 }}
        >
          <Icon d={I.save} size={12} /> Simpan
        </button>
      </div>
    </div>
  );
}

function EditAssetPage({ anggaran, project, asset, onBack, onSave, showToast }) {
  const [form, setForm] = useState(() => {
    const code = asset.asset_code || "";
    const dbInfo = ASSET_DB[code] || {};
    const items = asset.units ? asset.units.map((u, i) => ({
      id: i === 0 ? asset.id : `unit-${i}`,
      serial_number: u.serialNumber || "",
      location: u.location || "",
      asset_code: code
    })) : [{
      id: asset.id,
      serial_number: asset.serial_number || "",
      location: asset.location || [asset.branch, asset.zona, asset.subzona].filter(Boolean).join(" / "),
      asset_code: code
    }];

    return {
      name: asset.name || dbInfo.name || "",
      category: asset.category || dbInfo.category || "",
      model: asset.model || dbInfo.model || "",
      items,
      procurement_date: asset.procurement_date || new Date().toISOString().split('T')[0],
      acquisition_value: String(asset.acquisition_value ?? ""),
    };
  });

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const amount = parseFloat(form.acquisition_value) || 0;
  const total = (form.items || []).length * amount;

  const availCodes = form.category && form.model
    ? Object.keys(ASSET_DB).filter(c => ASSET_DB[c].category === form.category && ASSET_DB[c].model === form.model)
    : [];
  const availSNs = Object.entries(SN_DB).filter(([sn, code]) => availCodes.includes(code)).map(([sn]) => sn);

  const handleQtyChange = (qty) => {
    const newItems = [...(form.items || [])];
    while (newItems.length < qty) {
      const idx = newItems.length;
      newItems.push({ id: `new-${Date.now()}-${idx}`, serial_number: "", location: "", asset_code: "" });
    }
    if (newItems.length > qty) newItems.length = qty;
    upd("items", newItems);
  };

  const save = () => {
    if (!form.items?.length || !form.acquisition_value) {
      showToast("Lengkapi data barang");
      return;
    }
    const consolidatedAsset = {
      ...asset,
      name: form.name,
      category: form.category,
      model: form.model,
      jumlah: form.items.length,
      acquisition_value: amount,
      procurement_date: form.procurement_date,
      units: form.items.map(it => ({
        serialNumber: it.serial_number,
        location: it.location
      })),
      asset_code: form.items[0]?.asset_code || asset.asset_code
    };

    const filteredAssets = (anggaran.assets || []).filter(a => a.id !== asset.id);
    onSave(anggaran.id, [...filteredAssets, consolidatedAsset]);
    showToast("Data barang berhasil diperbarui");
    onBack();
  };

  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}>
          <Icon d={I.arrowLeft} size={14} /> Kembali
        </button>
        <div style={{ flex: 1 }}>
          <h2>Edit Barang</h2>
        </div>
      </div>

      <div className="ctx-card">
        <div className="ctx-item">
          <span>Anggaran</span>
          <strong title={anggaran.nama}>{anggaran.nama?.substring(0, 40)}{anggaran.nama?.length > 40 ? '...' : ''}</strong>
        </div>
        <div className="ctx-item">
          <span>Pekerjaan</span>
          <strong title={project?.nm_pekerjaan}>{project?.nm_pekerjaan?.substring(0, 36) || "—"}{project?.nm_pekerjaan?.length > 36 ? '...' : ''}</strong>
        </div>
        <div className="ctx-item">
          <span>Total Nilai Barang</span>
          <strong style={{ color: "var(--blue)" }}>{fmt(total)}</strong>
        </div>
      </div>

      <div className="acard">
        <div className="acard-hdr">
          <span className="asset-number-badge">DETAIL BARANG</span>
        </div>
        <div className="acard-body">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <AEFld label="Jenis Barang" req={true}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0" }}>
                <Icon d={I.package} size={14} style={{ color: "var(--blue)" }} />
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink2)" }}>{form.category}</span>
              </div>
            </AEFld>

            <AEFld label="Nama Barang" req={true}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0" }}>
                <div style={{ width: 4, height: 20, background: "var(--blue)", borderRadius: 2 }} />
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.2px" }}>
                  {form.name}
                </span>
              </div>
            </AEFld>

            <AEFld label="Quantity" req={true}>
              <select
                value={form.items?.length || 0}
                onChange={(e) => handleQtyChange(parseInt(e.target.value) || 0)}
                style={{ maxWidth: "200px" }}
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </AEFld>

            {form.items?.length > 0 && (
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {form.items.map((item, idx) => {
                    const used = form.items.map((it, i) => i !== idx ? it.serial_number : null).filter(Boolean);
                    const filteredSNs = availSNs.filter(sn => !used.includes(sn));

                    return (
                      <div key={idx} style={{ background: "white", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "16px", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <label style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", width: "130px", flexShrink: 0 }}>Serial Number {idx + 1}</label>
                            <div style={{ flex: 1 }}>
                              <SmartSNInput
                                value={item.serial_number}
                                options={filteredSNs}
                                onChange={(val) => {
                                  const newItems = [...form.items];
                                  newItems[idx].serial_number = val;
                                  newItems[idx].asset_code = Object.entries(SN_DB).find(([s, c]) => s === val)?.[1] || "";
                                  upd("items", newItems);
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <label style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", width: "130px", flexShrink: 0 }}>Lokasi Penempatan</label>
                            <div style={{ flex: 1 }}>
                              <SmartLocationInput
                                value={item.location}
                                onChange={(v) => {
                                  const newItems = [...form.items];
                                  newItems[idx].location = v;
                                  upd("items", newItems);
                                }}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => upd("items", form.items.filter((_, i) => i !== idx))}
                            style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            title="Hapus baris"
                          >
                            <Icon d={I.trash} size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-outline"
                  style={{ width: "100%", padding: "8px", fontSize: "0.75rem", justifyContent: "center", borderStyle: "dashed" }}
                  onClick={() => {
                    const ac = availCodes[form.items.length] || "";
                    const sn = ac ? Object.entries(SN_DB).find(([s, c]) => c === ac)?.[0] || "" : "";
                    upd("items", [...form.items, { id: `new-${Date.now()}-${form.items.length}`, serial_number: sn, location: "", asset_code: ac }]);
                  }}
                >
                  <Icon d={I.plus} size={12} /> Tambah Quantity
                </button>
              </div>
            )}

            <AEFld label="Tgl. Pengadaan">
              <input
                type="date"
                value={form.procurement_date}
                onChange={(e) => upd("procurement_date", e.target.value)}
              />
            </AEFld>

            <AEFld label="Nilai Perolehan (/unit)" req={true}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="number"
                  value={form.acquisition_value}
                  onChange={(e) => upd("acquisition_value", e.target.value)}
                  placeholder="0"
                  style={{ flex: 1 }}
                />
                {amount > 0 && (
                  <span className="aefld-hint" style={{ color: "var(--blue)", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {fmt(amount)}
                  </span>
                )}
              </div>
            </AEFld>
          </div>
        </div>
      </div>

      <div className="subpage-footer" style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 12, background: "white", padding: 16, borderRadius: 12, border: "1px solid var(--border)", boxShadow: "var(--sh-md)" }}>
        <button className="btn btn-outline" onClick={onBack}>Batal</button>
        <button
          className="btn btn-green"
          onClick={save}
          disabled={!form.items?.length || !form.acquisition_value}
          style={{ opacity: (!form.items?.length || !form.acquisition_value) ? 0.5 : 1 }}
        >
          <Icon d={I.save} size={12} /> Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

// ══════ FIX: ASSET TABLE PAGE (CAPEX) ══════
function AssetTablePage({
  anggaran,
  project,
  onBack,
  onEntryNew,
  onEditAsset,
  onSaveAssets,
  showToast,
}) {
  const [searchQ, setSearchQ] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [confirm, setConfirm] = useState(null);
  const assets = anggaran.assets || [];

  const availableYears = useMemo(() => {
    const years = new Set();
    assets.forEach((a) => {
      if (a.procurement_date) {
        years.add(new Date(a.procurement_date).getFullYear());
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [assets]);

  const filtered = useMemo(
    () =>
      assets.filter((a) => {
        const matchSearch =
          !searchQ ||
          a.name?.toLowerCase().includes(searchQ.toLowerCase()) ||
          a.asset_code?.toLowerCase().includes(searchQ.toLowerCase());
        const matchYear =
          filterYear === "all" ||
          (a.procurement_date &&
            String(new Date(a.procurement_date).getFullYear()) === String(filterYear));
        return matchSearch && matchYear;
      }),
    [assets, searchQ, filterYear],
  );
  const total = filtered.reduce((s, a) => {
    const qty = a.jumlah || 1;
    const price = a.harga_satuan || a.acquisition_value || 0;
    return s + (qty * price);
  }, 0);

  const totalAllAssets = useMemo(() =>
    assets.reduce((s, a) => s + ((a.jumlah || 1) * (a.harga_satuan || a.acquisition_value || 0)), 0),
    [assets]
  );
  const totalQty = useMemo(() => assets.reduce((s, a) => s + (a.jumlah || 1), 0), [assets]);
  const filteredQty = useMemo(() => filtered.reduce((s, a) => s + (a.jumlah || 1), 0), [filtered]);
  const sisaProject = (project?.nilai_kontrak || 0) - totalAllAssets;
  const handleDelete = (id) => {
    setConfirm({
      msg: "Hapus barang ini?",
      onConfirm: () => {
        onSaveAssets(
          anggaran.id,
          assets.filter((a) => a.id !== id),
        );
        showToast("Barang dihapus");
        setConfirm(null);
      },
    });
  };
  return (
    <div className="asset-page">
      <Breadcrumb
        items={[
          {
            label: "Daftar Pekerjaan",
            onClick: () => onBack("anggaran"),
            icon: I.briefcase,
          },
          {
            label:
              project?.nm_pekerjaan?.substring(0, 30) + "..." || "Detail Barang",
            icon: I.package,
          },
        ]}
      />
      <div className="asset-page-hdr">
        <div className="asset-page-hdr-left">
          <button
            className="btn btn-outline"
            onClick={() => onBack("anggaran")}
          >
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
              Daftar Barang CAPEX
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{
                  color: "var(--ink3)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  fontFamily: "inherit"
                }}>
                  Total {totalQty} barang ·
                </span>
                <span style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--ink3)",
                  fontFamily: "inherit"
                }}>
                  {project?.nm_pekerjaan || anggaran.nama}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {/* Nilai Kontrak */}
                <div style={{ background: "var(--red-lt)", padding: "4px 12px", borderRadius: "8px", border: "1px solid #fee2e2", display: "flex", alignItems: "center", gap: "8px", boxShadow: "var(--sh)" }}>
                  <Icon d={I.briefcase} size={12} style={{ color: "var(--red)" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.6rem", color: "var(--ink4)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, fontFamily: "inherit" }}>Nilai Kontrak</span>
                    <strong style={{ fontSize: "0.85rem", color: "var(--red)", fontWeight: 800, fontFamily: "inherit" }}>{fmt(project?.nilai_kontrak)}</strong>
                  </div>
                </div>

                {/* Total Nilai Barang */}
                <div style={{ background: "var(--blue-lt)", padding: "4px 12px", borderRadius: "8px", border: "1px solid var(--blue-mid)", display: "flex", alignItems: "center", gap: "8px", boxShadow: "var(--sh)" }}>
                  <Icon d={I.trendingUp} size={12} style={{ color: "var(--blue)" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.6rem", color: "var(--ink4)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, fontFamily: "inherit" }}>Total Nilai Barang</span>
                    <strong style={{ fontSize: "0.85rem", color: "var(--blue)", fontWeight: 800, fontFamily: "inherit" }}>{fmt(totalAllAssets)}</strong>
                  </div>
                </div>

                {/* Sisa Anggaran */}
                <div style={{ background: sisaProject >= 0 ? "var(--green-lt)" : "var(--red-lt)", padding: "4px 12px", borderRadius: "8px", border: sisaProject >= 0 ? "1px solid var(--green-mid)" : "1px solid #fee2e2", display: "flex", alignItems: "center", gap: "8px", boxShadow: "var(--sh)" }}>
                  <Icon d={I.wallet} size={12} style={{ color: sisaProject >= 0 ? "var(--green)" : "var(--red)" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.6rem", color: "var(--ink4)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, fontFamily: "inherit" }}>Sisa Anggaran</span>
                    <strong style={{ fontSize: "0.85rem", color: sisaProject >= 0 ? "var(--green)" : "var(--red)", fontWeight: 800, fontFamily: "inherit" }}>{fmt(sisaProject)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="asset-toolbar" style={{ justifyContent: "flex-start", gap: 12 }}>
        <div className="at-filter">
          <Icon d={I.search} size={13} />
          <input
            placeholder="Cari nama atau kode barang..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>
        <div className="flt-box" style={{ background: "var(--blue-lt)", borderColor: "var(--blue-mid)", height: 32 }}>
          <Icon d={I.calendar} size={13} style={{ color: "var(--blue)" }} />
          <select
            className="flt-select"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            style={{ color: "var(--blue)", fontWeight: 700, border: "none", background: "transparent", outline: "none", fontSize: "0.75rem" }}
          >
            <option value="all">Semua Tahun</option>
            {availableYears.map((y) => (
              <option key={y} value={y}>
                Tahun {y}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-prim" onClick={onEntryNew}>
          <Icon d={I.plus} size={13} /> Entry Barang Baru
        </button>
      </div>
      <div className="asset-table-wrap">
        <table className="asset-table">
          <thead>
            <tr>
              <th className="th-no">No</th>
              <th>Nama Barang</th>
              <th>Kode Barang</th>
              <th>Kategori</th>
              <th style={{ textAlign: "center" }}>Jumlah</th>
              <th style={{ textAlign: "right" }}>Harga Satuan</th>
              <th style={{ textAlign: "right" }}>Total</th>
              <th className="th-actions">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="table-empty-row">
                <td colSpan={8}>
                  <div className="table-empty-inner">
                    <Icon d={I.package} size={36} style={{ opacity: 0.2 }} />
                    <span style={{ fontWeight: 600 }}>
                      {totalQty} barang terdaftar.
                    </span>
                    {assets.length === 0 && (
                      <button
                        className="btn btn-prim"
                        style={{ marginTop: 4 }}
                        onClick={onEntryNew}
                      >
                        <Icon d={I.plus} size={12} /> Tambah Barang Pertama
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((a, i) => {
                const qty = a.jumlah || 1;
                const price = a.harga_satuan || a.acquisition_value || 0;
                const rowTotal = qty * price;
                return (
                  <tr key={a.id}>
                    <td className="td-no">{i + 1}</td>
                    <td>
                      <span className="td-name-text">{a.name || "—"}</span>
                    </td>
                    <td>
                      <span className="td-code">{a.asset_code || "—"}</span>
                    </td>
                    <td>
                      <CatPill cat={a.category} />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span className="td-date" style={{ fontWeight: 700 }}>{qty}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className="td-date">{fmt(price)}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className="td-value">{fmt(rowTotal)}</span>
                    </td>
                    <td className="td-actions">
                      <div className="td-act-row">
                        <button className="abtn" onClick={() => onEditAsset(a)}>
                          <Icon d={I.edit} size={11} />
                        </button>
                        <button
                          className="abtn del"
                          onClick={() => handleDelete(a.id)}
                        >
                          <Icon d={I.trash} size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          {filtered.length > 0 && (
            <tfoot>
              <tr>
                <td
                  colSpan={6}
                  style={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: "var(--blue)",
                  }}
                >
                  Total {filteredQty} barang
                </td>
                <td
                  className="tfoot-total"
                  style={{ textAlign: "right", color: "var(--blue)" }}
                >
                  {fmt(total)}
                </td>
                <td />
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
// ══════ LEVEL 1: ANGGARAN CARD ══════
function AnggaranCard({ ang, onSelect, onShowRkap, onDelete }) {
  const assetTotal = (ang.assets || []).reduce(
    (s, a) => s + ((a.jumlah || 1) * (a.acquisition_value || 0)),
    0,
  );
  const nilaiKadBatas = ang.nilai_kad || 0;
  const serapan = ang.nilai_kad > 0 ? Math.round((assetTotal / ang.nilai_kad) * 100) : 0;
  const meta = pctMeta(serapan);
  const isMulti = ang.thn_rkap_awal !== ang.thn_rkap_akhir;

  return (
    <div className="ang-card" onClick={() => onSelect(ang)}>
      <div className="ang-card-inner">
        <div className="ang-card-accent" />
        <div className="ang-card-body">
          <div className="ang-card-info">
            <div className="ang-card-tags">
              <span className="badge capex">CAPEX</span>
              <span
                className={`yr-tag ${isMulti ? 'multi' : ''}`}
                onClick={(e) => {
                  if (isMulti) {
                    e.stopPropagation();
                    onShowRkap(ang);
                  }
                }}
              >
                {isMulti ? `${ang.thn_rkap_awal} — ${ang.thn_rkap_akhir}` : ang.thn_rkap_awal}
                {isMulti && <Icon d={I.chevRight} size={11} />}
              </span>
              <code className="code-tag">{ang.kode}</code>
            </div>
            <p className="ang-card-title">{ang.nama}</p>
          </div>

          <div className="ang-card-meta">
            <span><Icon d={I.briefcase} size={12} /> {ang.projects?.length || 0} pekerjaan</span>
            <span><Icon d={I.package} size={12} /> {(ang.assets || []).reduce((s, a) => s + (a.jumlah || 1), 0)} barang terdaftar</span>
          </div>

          <div className="ang-card-fin">
            <div className="amt-blk">
              <span className="amt-lbl">Nilai KAD</span>
              <span className="amt-val blue">{fmt(ang.nilai_kad)}</span>
            </div>
          </div>
        </div>

        <div className="ang-card-actions" style={{ padding: '0 18px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="ring-wrap">
              <div className="ring">
                <svg width="30" height="30" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke={pctColor(serapan)} strokeWidth="4"
                    strokeDasharray={`${(Math.min(serapan, 100) / 100) * 2 * Math.PI * 16} ${2 * Math.PI * 16}`}
                    strokeDashoffset={2 * Math.PI * 16 * 0.25} strokeLinecap="round" />
                </svg>
                <span className="ring-lbl" style={{ fontSize: '0.6rem' }}>{serapan}%</span>
              </div>
              <span className="status-pill" style={{ background: meta.bg, color: meta.fg, borderColor: meta.border, fontSize: '0.6rem', padding: '1px 6px' }}>
                {meta.label}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="abtn blue" onClick={(e) => { e.stopPropagation(); onSelect(ang); }}>
              Pekerjaan
            </button>
            <div className="ang-card-chevron">
              <Icon d={I.chevRight} size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// ══════ LEVEL 1.5: DETAIL RKAP TAHUNAN ══════
function RkapDetailPage({ anggaran, onBack }) {
  const totalRkap = (anggaran.history_anggaran || []).reduce((s, h) => s + (h.nilai_rkap || 0), 0);
  const diff = anggaran.nilai_kad - totalRkap;

  return (
    <div style={{ animation: "fadeUp .15s ease-out" }}>
      <Breadcrumb
        items={[
          { label: "Daftar Anggaran", onClick: onBack, icon: I.layers },
          {
            label: "Detail RKAP Tahunan",
            icon: I.calendar,
          },
        ]}
      />

      <div style={{ background: 'var(--surf)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', padding: '24px', boxShadow: 'var(--sh-sm)', marginBottom: 24 }}>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>{anggaran.nama}</h2>
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <span className="badge blue" style={{ fontSize: '0.68rem', fontWeight: 700 }}>{anggaran.kode}</span>
              <span className="badge capex" style={{ fontSize: '0.68rem', fontWeight: 700 }}>KAD: {fmt(anggaran.nilai_kad)}</span>
            </div>
          </div>
        </div>

        <div className="asset-table-wrap">
          <table className="asset-table">
            <thead>
              <tr>
                <th className="th-no">No</th>
                <th>Tahun Anggaran</th>
                <th style={{ textAlign: 'right' }}>Nilai RKAP</th>
                <th style={{ textAlign: 'center' }}>%</th>
              </tr>
            </thead>
            <tbody>
              {(anggaran.history_anggaran || []).map((h, i) => {
                const percent = (h.nilai_rkap / anggaran.nilai_kad) * 100;
                return (
                  <tr key={h.id}>
                    <td className="td-no">{i + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Icon d={I.calendar} size={13} style={{ color: "var(--blue)" }} />
                        <span style={{ fontWeight: 600 }}>Tahun Anggaran {h.tahun}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--blue)', fontFamily: 'var(--mono)' }}>
                      {fmt(h.nilai_rkap)}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 800, color: 'var(--ink2)' }}>
                      {percent.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--bg)', fontStyle: 'normal' }}>
                <td colSpan={2} style={{ textAlign: 'right', fontWeight: 800, color: 'var(--ink2)', padding: '12px' }}>TOTAL TERISI</td>
                <td style={{ textAlign: 'right', fontWeight: 900, color: 'var(--blue)', padding: '12px', fontSize: '0.95rem' }}>{fmt(totalRkap)}</td>
                <td style={{ textAlign: 'center', fontWeight: 800, color: 'var(--ink)', padding: '12px' }}>{((totalRkap / anggaran.nilai_kad) * 100).toFixed(1)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-prim" onClick={onBack}>
          Kembali ke Daftar
        </button>
      </div>
    </div>
  );
}
// ══════ LEVEL 2: DAFTAR PEKERJAAN (per Anggaran) ══════
function PekerjaanListPage({
  anggaran,
  capexData,
  onBack,
  onGoAssetTable,
  onGoAssetEntry,
  onGoEditProject,
  onAddPekerjaan,
  onDeleteProject,
  showToast,
  setCapexData,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState(null);
  const [filterDate, setFilterDate] = useState("all");
  const projects = anggaran.projects || [];
  const isMulti = anggaran.thn_rkap_awal !== anggaran.thn_rkap_akhir;

  const availableDates = useMemo(() => {
    const dates = new Set();
    projects.forEach((p) => {
      if (p.tgl_kontrak) dates.add(p.tgl_kontrak);
    });
    return Array.from(dates).sort();
  }, [projects]);

  const filteredByDate = useMemo(
    () =>
      filterDate === "all"
        ? projects
        : projects.filter((p) => p.tgl_kontrak === filterDate),
    [projects, filterDate],
  );
  const filtered = useMemo(
    () =>
      filteredByDate.filter(
        (p) =>
          !search ||
          p.nm_pekerjaan?.toLowerCase().includes(search.toLowerCase()) ||
          p.no_kontrak?.toLowerCase().includes(search.toLowerCase()),
      ),
    [filteredByDate, search],
  );
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );
  const assetCount = (anggaran.assets || []).length;
  const assetTotal = (anggaran.assets || []).reduce(
    (s, a) => s + (a.acquisition_value || 0),
    0,
  );
  const totalKontrak = filteredByDate.reduce((s, p) => s + (p.nilai_kontrak || 0), 0);
  const totalRab = filteredByDate.reduce((s, p) => s + (p.nilai_rab || 0), 0);
  const totalPercent = totalRab > 0 ? (totalKontrak / totalRab) * 100 : 0;

  return (
    <div style={{ animation: "fadeUp .15s ease-out" }}>
      <Breadcrumb
        items={[
          { label: "Daftar Anggaran", onClick: onBack, icon: I.layers },
          {
            label:
              (anggaran?.nama || "Detail Anggaran").substring(0, 35) +
              ((anggaran?.nama?.length || 0) > 35 ? "…" : ""),
            icon: I.briefcase,
          },
        ]}
      />

      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10, animation: "fadeUp .2s ease-out" }}>
        <code className="code-tag" style={{ fontSize: "0.78rem", color: "var(--blue)", background: "var(--blue-lt)", padding: "3px 8px", borderRadius: 5, fontWeight: 700 }}>
          {anggaran.kode}
        </code>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)" }}>
          {anggaran?.nama || "Nama Anggaran"}
        </h2>
      </div>

      <div
        style={{
          background: "var(--surf)",
          border: "1px solid var(--blue-mid)",
          borderLeft: "4px solid var(--blue)",
          borderRadius: "var(--r-lg)",
          padding: "18px 24px",
          marginBottom: 20,
          display: "flex",
          gap: 20,
          alignItems: "center",
          flexWrap: "wrap",
          boxShadow: "var(--sh)",
        }}
      >
        {[
          ["Tahun RKAP", isMulti ? `${anggaran?.thn_rkap_awal || '—'} — ${anggaran?.thn_rkap_akhir || '—'}` : (anggaran?.thn_rkap_awal || '—')],
          "DIV",
          ["Nilai KAD", fmt(anggaran?.nilai_kad || 0), false, "var(--blue)"],
          isMulti
            ? [
              "Nilai RKAP Per Tahun",
              (
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {(anggaran?.history_anggaran || []).map((h) => (
                    <div key={h.id || h.tahun} style={{ fontSize: "0.72rem", whiteSpace: "nowrap", color: "var(--ink2)" }}>
                      RKAP {h.tahun}: <span style={{ fontWeight: 800, color: "var(--blue)" }}>{fmt(h.nilai_rkap)}</span>
                    </div>
                  ))}
                </div>
              ),
            ]
            : ["Nilai RKAP", fmt(anggaran?.nilai_kad || 0), false, "var(--blue)"],
          "DIV",
          ["Nilai RAB", fmt(totalRab), false, "var(--amber)"],
          "DIV",
          ["Nilai Kontrak", fmt(totalKontrak), false, totalKontrak > (anggaran?.nilai_kad || 0) ? "var(--red)" : "var(--blue)"],
          ["% Kontrak", `${totalPercent.toFixed(1)}%`, false, "var(--ink2)"],
          "DIV",
          [
            "Total / Sisa",
            (
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span>{filteredByDate.length} Pos</span>
                <span style={{ fontSize: "0.82rem", color: "var(--amber)", fontWeight: 700 }}>
                  ({fmt((anggaran?.nilai_kad || 0) - totalKontrak)})
                </span>
              </div>
            ),
          ],
        ].map((item) => {
          if (item === "DIV") return <div key={Math.random()} className="asset-ctx-divider" />;
          if (!Array.isArray(item)) return null;
          const [lbl, val, isCode, color] = item;
          return (
            <div key={lbl} className="asset-ctx-item" style={{ gap: 4 }}>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.2px" }}>{lbl}</span>
              <strong className={color || ""} style={{ fontSize: "0.85rem", ...(color ? { color } : {}) }}>
                {isCode ? (
                  <code
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.78rem",
                      color: "var(--blue)",
                      background: "var(--blue-lt)",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    {val}
                  </code>
                ) : (
                  val
                )}
              </strong>
            </div>
          );
        })}
      </div>


      <div className="toolbar">
        <button className="btn btn-outline" onClick={onBack}>
          <Icon d={I.arrowLeft} size={13} /> Kembali
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink2)", whiteSpace: "nowrap" }}>
            {isMulti
              ? `Input Pekerjaan CAPEX Tahun ${anggaran.thn_rkap_awal} hingga ${anggaran.thn_rkap_akhir}`
              : `Input Pekerjaan CAPEX Tahun ${anggaran.thn_rkap_awal}`}
          </div>
          <div className="flt-box" style={{ background: "var(--blue-lt)", borderColor: "var(--blue-mid)" }}>
            <Icon d={I.calendar} size={13} style={{ color: "var(--blue)" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--blue)", marginRight: 4 }}>Pilih Tgl Kontrak:</span>
            <select
              className="flt-select"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{ color: "var(--blue)", fontWeight: 700, border: "none", background: "transparent", outline: "none", fontSize: "0.75rem", cursor: "pointer" }}
            >
              <option value="all">Semua Tanggal</option>
              {availableDates.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="srch">
          <Icon d={I.search} size={14} />
          <input
            placeholder="Cari nama pekerjaan..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <button
          className="btn btn-prim"
          onClick={onAddPekerjaan}
          disabled={anggaran.nilai_kad === 0}
          style={{
            opacity: anggaran.nilai_kad === 0 ? 0.5 : 1,
            cursor: anggaran.nilai_kad === 0 ? "not-allowed" : "pointer",
          }}
        >
          <Icon d={I.plus} size={14} /> Tambah Pekerjaan
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          {projects.length === 0
            ? anggaran.nilai_kad === 0
              ? "Silakan isi Nilai KAD terlebih dahulu sebelum menambahkan pekerjaan."
              : "Belum ada pekerjaan untuk anggaran ini."
            : "Tidak ada pekerjaan yang cocok dengan pencarian."}
          {projects.length === 0 && anggaran.nilai_kad > 0 && (
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-prim" onClick={onAddPekerjaan}>
                <Icon d={I.plus} size={13} /> Tambah Pekerjaan Pertama
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="asset-table-wrap">
            <table className="asset-table">
              <thead>
                <tr>
                  <th className="th-no">No</th>
                  <th>Nama Pekerjaan</th>
                  <th>No. Kontrak</th>
                  <th>Tgl. Kontrak</th>
                  <th style={{ textAlign: "right" }}>Nilai Kontrak</th>
                  <th style={{ textAlign: "right" }}>Nilai RAB</th>
                  <th style={{ textAlign: "center" }}>%</th>
                  <th className="th-actions">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr className="table-empty-row">
                    <td colSpan={8}>
                      <div className="table-empty-inner">
                        <Icon
                          d={I.fileText}
                          size={36}
                          style={{ opacity: 0.2 }}
                        />
                        <span style={{ fontWeight: 600 }}>
                          Tidak ada pekerjaan yang cocok.
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((proj, i) => {
                    const percent = proj.nilai_rab > 0 ? (proj.nilai_kontrak / proj.nilai_rab) * 100 : 0;
                    return (
                      <tr key={proj.id}>
                        <td className="td-no">
                          {(page - 1) * PAGE_SIZE + i + 1}
                        </td>
                        <td>
                          <span className="td-name-text">
                            {proj.nm_pekerjaan}
                          </span>
                        </td>
                        <td>
                          <span className="td-sn">
                            {proj.no_kontrak || "—"}
                          </span>
                        </td>
                        <td>
                          <span className="td-date">
                            {fmtDate(proj.tgl_kontrak)}
                          </span>
                        </td>
                        <td>
                          <span
                            className="td-value"
                            style={{ color: "var(--red)" }}
                          >
                            {fmt(proj.nilai_kontrak || 0)}
                          </span>
                        </td>
                        <td>
                          <span
                            className="td-value"
                            style={{ color: "var(--amber)" }}
                          >
                            {fmt(proj.nilai_rab || 0)}
                          </span>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            fontWeight: 800,
                            color: pctColor(percent)
                          }}
                        >
                          {percent.toFixed(1)}%
                        </td>
                        <td className="td-actions">
                          <div className="td-act-row">
                            <button
                              className="abtn"
                              onClick={() => onGoEditProject(proj, anggaran)}
                              title="Edit"
                            >
                              <Icon d={I.edit} size={11} />
                            </button>
                            <button
                              className="abtn blue"
                              onClick={() => onGoAssetTable(proj, anggaran)}
                              title="Lihat Aset"
                            >
                              <Icon d={I.table} size={11} />
                            </button>
                            <button
                              className="abtn del"
                              onClick={() =>
                                setConfirm({
                                  msg: "Hapus pekerjaan ini?",
                                  onConfirm: () => {
                                    onDeleteProject(proj.id, anggaran.id);
                                    setConfirm(null);
                                  },
                                })
                              }
                              title="Hapus"
                            >
                              <Icon d={I.trash} size={11} />
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
          <Pagination
            total={filtered.length}
            page={page}
            onPage={setPage}
            label="pekerjaan"
          />
        </>
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
// ══════ MAIN APP ══════
export default function BudgetManagement({ forcedType }) {
  const [typeFilter, setTypeFilter] = useState(forcedType || "all");
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
  const [showAddOpex, setShowAddOpex] = useState(false);
  const [capexLevel, setCapexLevel] = useState("list");
  const [selectedAnggaran, setSelectedAnggaran] = useState(null);
  const [capexAngPage, setCapexAngPage] = useState(1);
  const [capexAngSearch, setCapexAngSearch] = useState("");
  // REVISI: Mengganti single year filter dengan range filter (Dari - s/d)
  const [capexThnFrom, setCapexThnFrom] = useState("all");
  const [capexThnTo, setCapexThnTo] = useState("all");

  useEffect(() => {
    if (forcedType) setTypeFilter(forcedType);
  }, [forcedType]);
  const showToast = (msg) => setToast(msg);
  const yearOpts = useMemo(() => {
    const all = new Set();
    capexData.forEach((a) => {
      for (let y = a.thn_rkap_awal; y <= a.thn_rkap_akhir; y++) {
        all.add(y);
      }
    });
    opexData.forEach((a) => all.add(a.thn_anggaran));
    return ["all", ...Array.from(all).sort().map(String)];
  }, [capexData, opexData]);
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
    return BUDGET_MASTERS.filter((m) =>
      Array.from(new Set(allKd)).includes(m.kd_anggaran_master),
    );
  }, [opexData, tahun]);
  const filteredAnggaran = useMemo(
    () =>
      capexData.filter((a) => {
        if (!a || !a.id) return false;
        // REVISI: Filter berdasarkan range RKAP Awal & Akhir
        if (capexThnFrom !== "all" && String(a.thn_rkap_awal) !== capexThnFrom) return false;
        if (capexThnTo !== "all" && String(a.thn_rkap_akhir) !== capexThnTo) return false;
        if (
          capexAngSearch &&
          !a.nama?.toLowerCase().includes(capexAngSearch.toLowerCase()) &&
          !a.kode?.toLowerCase().includes(capexAngSearch.toLowerCase())
        )
          return false;
        const hasAssets = (a.assets || []).length > 0;
        if (hasAssets && (a.nilai_kad || 0) === 0) return false;
        return true;
      }),
    [capexData, capexThnFrom, capexThnTo, capexAngSearch],
  );
  const paginatedAnggaran = useMemo(
    () =>
      filteredAnggaran.slice(
        (capexAngPage - 1) * PAGE_SIZE,
        capexAngPage * PAGE_SIZE,
      ),
    [filteredAnggaran, capexAngPage],
  );
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
  useEffect(() => {
    setCapexAngPage(1);
  }, [capexAngSearch, capexThnFrom, capexThnTo]);
  const paginatedOpex = useMemo(() => {
    const s = (opexPage - 1) * PAGE_SIZE;
    return filteredOpex.slice(s, s + PAGE_SIZE);
  }, [filteredOpex, opexPage]);
  const getLatestAnggaran = (id) => capexData.find((a) => a.id === id);
  const kpiCards = useMemo(() => {
    const capexFiltered = capexData.filter((a) => {
      if (capexThnFrom !== "all" && String(a.thn_rkap_awal) !== capexThnFrom) return false;
      if (capexThnTo !== "all" && String(a.thn_rkap_akhir) !== capexThnTo) return false;
      const hasAssets = (a.assets || []).length > 0;
      if (hasAssets && a.nilai_kad === 0) return false;
      return true;
    });
    const opexFiltered = filteredOpex;
    const capexCount = capexFiltered.reduce(
      (s, a) => s + (a.projects || []).length,
      0,
    );
    const capexKad = capexFiltered.reduce((s, a) => s + (a.nilai_kad || 0), 0);
    const capexKontrak = capexFiltered.reduce((s, a) => {
      const hasAset = (a.assets || []).length > 0;
      return (
        s +
        (a.projects || []).reduce(
          (ss, p) => ss + (hasAset ? p.nilai_kontrak || 0 : 0),
          0,
        )
      );
    }, 0);
    const capexRab = capexFiltered.reduce(
      (s, a) =>
        s + (a?.projects || []).reduce((ss, p) => ss + (p?.nilai_rab || 0), 0),
      0,
    );
    const capexAset = capexFiltered.reduce(
      (s, a) =>
        s +
        (a.assets || []).reduce(
          (ss, ast) => ss + (ast.acquisition_value || 0),
          0,
        ),
      0,
    );
    const opexCount = opexFiltered.length;
    const opexPagu = opexFiltered.reduce(
      (s, a) => s + (a.nilai_anggaran_tahunan || 0),
      0,
    );
    const opexRealisasi = opexFiltered.reduce(
      (s, a) =>
        s + (a.transaksi || []).reduce((ts, t) => ts + (t.jumlah || 0), 0),
      0,
    );
    if (typeFilter === "capex")
      return [
        {
          cls: "blue",
          icon: I.layers,
          lbl: "Total Pos Anggaran CAPEX",
          val: filteredAnggaran.length,
        },
        {
          cls: "amber",
          icon: I.fileText,
          lbl: "Total Nilai KAD",
          val: fmt(capexKad),
          pct: "—",
        },
        {
          cls: "amber",
          icon: I.fileText,
          lbl: "Total Nilai Kontrak",
          val: fmt(capexKontrak),
          pct:
            capexKad > 0
              ? `${Math.round((capexKontrak / capexKad) * 100)}% dari KAD`
              : "—",
        },
      ];
    if (typeFilter === "opex")
      return [
        {
          cls: "blue",
          icon: I.monitor,
          lbl: "Total Pos Anggaran OPEX",
          val: opexCount,
        },
        {
          cls: "amber",
          icon: I.trendUp,
          lbl: "Total Nilai Pekerjaan",
          val: fmt(opexRealisasi),
        },
        {
          cls: "green",
          icon: I.wallet,
          lbl: "Total Pagu Anggaran",
          val: fmt(opexPagu),
        },
      ];
    return [
      {
        cls: "blue",
        icon: I.layers,
        lbl: "Total Anggaran & Pos OPEX",
        val: filteredAnggaran.length + opexCount,
      },
      {
        cls: "amber",
        icon: I.fileText,
        lbl: "Total Nilai Kontrak CAPEX",
        val: fmt(capexKontrak),
      },
      {
        cls: "green",
        icon: I.wallet,
        lbl: "Total Pagu Anggaran OPEX",
        val: fmt(opexPagu),
      },
    ];
  }, [capexData, filteredOpex, typeFilter, capexThnFrom, capexThnTo, filteredAnggaran]);
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
        projects: (ang.projects || []).map((pr) =>
          pr.id === id ? { ...pr, ...u } : pr,
        ),
      })),
    );
  const saveAssetsToAnggaran = (anggaranId, assets) => {
    setCapexData((p) =>
      p.map((ang) => (ang.id === anggaranId ? { ...ang, assets } : ang)),
    );
    setSelectedAnggaran((prev) =>
      prev?.id === anggaranId ? { ...prev, assets } : prev,
    );
    setPage((prev) => {
      if (!prev || !prev.data) return prev;
      if (prev.data.id === anggaranId) return { ...prev, data: { ...prev.data, assets } };
      if (prev.data.anggaran?.id === anggaranId) return { ...prev, data: { ...prev.data, anggaran: { ...prev.data.anggaran, assets } } };
      return prev;
    });
  };
  const deleteProject = (projId, angId) => {
    setCapexData((p) =>
      p.map((ang) =>
        ang.id === angId
          ? {
            ...ang,
            projects: (ang.projects || []).filter((pr) => pr.id !== projId),
          }
          : ang,
      ),
    );
    showToast("Pekerjaan dihapus");
  };
  const addProjectToAnggaran = (angId, proj) => {
    setCapexData((p) =>
      p.map((a) =>
        a.id === angId ? { ...a, projects: [...(a.projects || []), proj] } : a,
      ),
    );
    setSelectedAnggaran((prev) =>
      prev?.id === angId
        ? { ...prev, projects: [...(prev.projects || []), proj] }
        : prev,
    );
  };
  const deleteAnggaran = (id) =>
    setConfirm({
      msg: "Hapus anggaran CAPEX ini beserta semua pekerjaan dan barangnya?",
      onConfirm: () => {
        setCapexData((p) => p.filter((a) => a.id !== id));
        showToast("Anggaran dihapus");
        setConfirm(null);
      },
    });
  useEffect(() => {
    if (selectedAnggaran) {
      const latest = capexData.find((a) => a.id === selectedAnggaran.id);
      if (latest) setSelectedAnggaran(latest);
    }
  }, [capexData]);
  const sharedWrap = (children) => (
    <>
      <style>{CSS}</style>
      <div className="root">
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
        {children}
      </div>
    </>
  );
  if (page?.type === "editProject")
    return sharedWrap(
      <EditProjectPage
        project={page.project}
        anggaran={page.anggaran}
        onBack={() => setPage(null)}
        onSave={saveProject}
        showToast={showToast}
      />,
    );
  if (page?.type === "tambahPekerjaan")
    return sharedWrap(
      <TambahPekerjaanPage
        anggaran={page.anggaran}
        onBack={() => {
          setCapexLevel("pekerjaan");
          setPage(null);
        }}
        onSave={(proj) => {
          addProjectToAnggaran(page.anggaran.id, proj);
          setCapexLevel("pekerjaan");
          setPage(null);
          showToast("Pekerjaan CAPEX berhasil ditambahkan");
        }}
      />,
    );
  if (page?.type === "assetTable") {
    const latestAng = getLatestAnggaran(page.anggaranId) || page.anggaran;
    return sharedWrap(
      <AssetTablePage
        anggaran={latestAng}
        project={page.project}
        onBack={(level) => {
          if (level === "root") {
            setCapexLevel("list");
            setPage(null);
          } else if (level === "anggaran") {
            setCapexLevel("list");
            setSelectedAnggaran(latestAng);
            setPage(null);
          } else {
            setCapexLevel("pekerjaan");
            setPage(null);
          }
        }}
        onEntryNew={() => setPage({ ...page, type: "assetEntry" })}
        onEditAsset={(asset) => setPage({ ...page, type: "assetEdit", asset })}
        onSaveAssets={saveAssetsToAnggaran}
        showToast={showToast}
      />,
    );
  }
  if (page?.type === "assetEntry") {
    const latestAng = getLatestAnggaran(page.anggaranId) || page.anggaran;
    return sharedWrap(
      <AssetEntryPage
        anggaran={latestAng}
        project={page.project}
        onBack={() => setPage({ ...page, type: "assetTable" })}
        onSave={saveAssetsToAnggaran}
        showToast={showToast}
      />,
    );
  }
  if (page?.type === "assetEdit") {
    const latestAng = getLatestAnggaran(page.anggaranId) || page.anggaran;
    return sharedWrap(
      <EditAssetPage
        anggaran={latestAng}
        project={page.project}
        asset={page.asset}
        onBack={() => setPage({ ...page, type: "assetTable" })}
        onSave={saveAssetsToAnggaran}
        showToast={showToast}
      />,
    );
  }
  if (page?.type === "realisasiTable") {
    const angNow = opexData.find((a) => a.id === page.ang.id) || page.ang;
    return sharedWrap(
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
            msg: "Hapus pekerjaan ini?",
            onConfirm: () => {
              saveOpexTrx(
                angNow.id,
                angNow.transaksi.filter((trx) => trx.id !== id),
              );
              showToast("Pekerjaan dihapus");
              setConfirm(null);
            },
          })
        }
        showToast={showToast}
      />,
    );
  }
  if (page?.type === "realisasi") {
    const angNow = opexData.find((a) => a.id === page.ang.id) || page.ang;
    return sharedWrap(
      <RealisasiPage
        ang={angNow}
        editData={page.editData}
        onBack={() =>
          page.returnToTable
            ? setPage({ type: "realisasiTable", ang: angNow })
            : setPage(null)
        }
        onSave={saveOpexTrx}
        showToast={showToast}
      />,
    );
  }
  if (
    capexLevel === "pekerjaan" &&
    selectedAnggaran &&
    (typeFilter === "capex" || typeFilter === "all")
  ) {
    const latestAng =
      getLatestAnggaran(selectedAnggaran.id) || selectedAnggaran;
    return sharedWrap(
      <>
        <div className="hdr">
          <div>
            <h1>
              {forcedType === "capex"
                ? "Input Pekerjaan CAPEX"
                : "Anggaran & Pekerjaan"}
            </h1>
          </div>
        </div>
        <PekerjaanListPage
          anggaran={latestAng}
          capexData={capexData}
          onBack={() => {
            setCapexLevel("list");
            setSelectedAnggaran(null);
          }}
          onGoAssetTable={(proj, ang) =>
            setPage({
              type: "assetTable",
              project: proj,
              anggaran: ang,
              anggaranId: ang.id,
            })
          }
          onGoAssetEntry={(proj, ang) =>
            setPage({
              type: "assetEntry",
              project: proj,
              anggaran: ang,
              anggaranId: ang.id,
            })
          }
          onGoEditProject={(proj, ang) =>
            setPage({ type: "editProject", project: proj, anggaran: ang })
          }
          onAddPekerjaan={() =>
            setPage({ type: "tambahPekerjaan", anggaran: latestAng })
          }
          onDeleteProject={deleteProject}
          showToast={showToast}
          setCapexData={setCapexData}
        />
        {confirm && (
          <Confirm
            msg={confirm.msg}
            onConfirm={confirm.onConfirm}
            onCancel={() => setConfirm(null)}
          />
        )}
      </>,
    );
  }
  const showCapex = typeFilter !== "opex";
  const showOpex = typeFilter !== "capex";
  const showBoth = typeFilter === "all";
  const activeOpexFilter = BUDGET_MASTERS.find(
    (m) => m.kd_anggaran_master === opexKdFilter,
  );
  const headerTitle =
    forcedType === "capex"
      ? "Input Pekerjaan CAPEX"
      : forcedType === "opex"
        ? "Input Pekerjaan OPEX"
        : "Anggaran & Pekerjaan";
  const headerSubtitle =
    forcedType === "capex"
      ? "Pilih anggaran untuk melihat daftar pekerjaan"
      : forcedType === "opex"
        ? "Daftar dan realisasi anggaran OPEX"
        : "Monitoring CAPEX & OPEX berdasarkan anggaran";
  return (
    <>
      <style>{CSS}</style>
      <div className="root">
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
        {capexLevel === "list" && (
          <div className="hdr">
            <div>
              <h1>{headerTitle}</h1>
              <p>{headerSubtitle}</p>
            </div>
            {!forcedType && (
              <div className="hdr-right">
                <div className="type-tabs">
                  {[
                    ["all", "all", I.layers, "Semua"],
                    ["capex", "", I.briefcase, "CAPEX"],
                    ["opex", "", I.monitor, "OPEX"],
                  ].map(([val, cls, icon, lbl]) => (
                    <button
                      key={val}
                      className={`type-tab ${cls} ${typeFilter === val ? "on" : ""}`}
                      onClick={() => setTypeFilter(val)}
                    >
                      <Icon d={icon} size={14} /> {lbl}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {capexLevel === "list" && (
          <div className="kpi-strip">
            {kpiCards.map(({ cls, icon, lbl, val, pct }) => (
              <div key={lbl} className={`kpi ${cls}`}>
                <div className="kpi-ico">
                  <Icon d={icon} size={20} />
                </div>
                <div className="kpi-body">
                  <div className="kpi-lbl">{lbl}</div>
                  <div className="kpi-val">{val}</div>
                  {pct && (
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--ink4)",
                        marginTop: 4,
                      }}
                    >
                      {pct}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {showCapex && (
          <>
            {capexLevel === "list" && (
              <>
                {showBoth && (
                  <div className="section-label">
                    <div className="section-label-line" />
                    <div className="section-label-pill capex">
                      <Icon d={I.briefcase} size={12} /> CAPEX
                    </div>
                    <span className="section-count">
                      {filteredAnggaran.length} pos anggaran
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
                        d={I.layers}
                        size={16}
                        style={{ color: "var(--blue)" }}
                      />{" "}
                      Daftar Pos Anggaran CAPEX
                    </div>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--ink4)",
                        marginTop: 4,
                      }}
                    >
                      Pilih pos anggaran untuk melihat daftar pekerjaan
                    </p>
                  </div>
                )}
                <div className="toolbar" style={{ flexWrap: "wrap", gap: "8px" }}>
                  <div className="flt-box">
                    <Icon d={I.calendar} size={14} />
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink3)", marginRight: 4 }}>RKAP Dari</span>
                    <select
                      className="flt-select"
                      value={capexThnFrom}
                      onChange={(e) => {
                        const v = e.target.value;
                        setCapexThnFrom(v);
                        setCapexThnTo(v);
                        setCapexAngPage(1);
                      }}
                      style={{ maxWidth: 90 }}
                    >
                      <option value="all">Semua</option>
                      {yearOpts.filter((y) => y !== "all").map((y) => (<option key={y} value={y}>{y}</option>))}
                    </select>
                  </div>
                  <div className="flt-box">
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink3)", marginRight: 4 }}>s/d</span>
                    <select
                      className="flt-select"
                      value={capexThnTo}
                      onChange={(e) => { setCapexThnTo(e.target.value); setCapexAngPage(1); }}
                      style={{ maxWidth: 90 }}
                    >
                      <option value="all">Semua</option>
                      {yearOpts
                        .filter((y) => y !== "all" && (capexThnFrom === "all" || parseInt(y) >= parseInt(capexThnFrom)))
                        .map((y) => (<option key={y} value={y}>{y}</option>))}
                    </select>
                  </div>
                  <div className="srch">
                    <Icon d={I.search} size={14} />
                    <input placeholder="Cari nama atau kode anggaran..." value={capexAngSearch} onChange={(e) => { setCapexAngSearch(e.target.value); setCapexAngPage(1); }} />
                  </div>
                </div>
                {filteredAnggaran.length === 0 ? (
                  <div className="empty">
                    Tidak ada pos anggaran CAPEX yang cocok.
                  </div>
                ) : (
                  <>
                    <div className="card-list">
                      {paginatedAnggaran.map((ang) => (
                        <AnggaranCard
                          key={ang.id}
                          ang={ang}
                          onSelect={(a) => {
                            setSelectedAnggaran(a);
                            setCapexLevel("pekerjaan");
                          }}
                          onShowRkap={(a) => {
                            setSelectedAnggaran(a);
                            setCapexLevel("rkap_detail");
                          }}
                        />
                      ))}
                    </div>
                    <Pagination
                      total={filteredAnggaran.length}
                      page={capexAngPage}
                      onPage={setCapexAngPage}
                      label="pos anggaran"
                    />
                  </>
                )}
              </>
            )}
            {capexLevel === "rkap_detail" && selectedAnggaran && (
              <RkapDetailPage
                anggaran={selectedAnggaran}
                onBack={() => setCapexLevel("list")}
              />
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
                <Icon d={I.calendar} size={14} />
                <select
                  className="opex-flt-select"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  style={{ minWidth: 140 }}
                >
                  <option value="all">Semua Tahun</option>
                  {yearOpts
                    .filter((y) => y !== "all")
                    .map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                </select>
              </div>
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
                  {BUDGET_MASTERS.map((m) => {
                    const active = activeKdList.some(
                      (a) => a.kd_anggaran_master === m.kd_anggaran_master,
                    );
                    return (
                      <option
                        key={m.kd_anggaran_master}
                        value={m.kd_anggaran_master}
                        disabled={!active}
                        style={{ color: active ? "inherit" : "#9ca3af" }}
                      >
                        {m.kd_anggaran_master} — {m.nm_anggaran_master}
                      </option>
                    );
                  })}
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
      {showAddOpex && (
        <TambahOpexModal
          onClose={() => setShowAddOpex(false)}
          onSave={(newOpex) => {
            setOpexData((p) => [...p, newOpex]);
            setShowAddOpex(false);
            showToast("Pos anggaran OPEX berhasil ditambahkan");
          }}
        />
      )}
    </>
  );
}
function SmartSNInput({ value, onChange, options, placeholder = 'Pilih/Ketik SN' }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = (options || []).filter(o => (o || '').toLowerCase().includes((value || '').toLowerCase()));

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <input
        value={value || ''}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #cbd5e1',
          borderRadius: 8,
          fontSize: '0.85rem',
          background: '#fcfdfe',
          color: 'var(--ink)',
          fontWeight: 500,
          outline: 'none',
          transition: 'all 0.2s'
        }}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          marginTop: 6,
          zIndex: 100,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          maxHeight: 200,
          overflowY: 'auto'
        }}>
          {filteredOptions.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleSelect(opt)}
              style={{
                padding: '10px 12px',
                fontSize: '0.78rem',
                color: '#334155',
                cursor: 'pointer',
                borderBottom: i === filteredOptions.length - 1 ? 'none' : '1px solid #f1f5f9'
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
