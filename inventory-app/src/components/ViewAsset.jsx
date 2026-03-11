import React, { useState, useMemo, useRef, useEffect } from "react";
import "./ViewAsset.css";

// ── CAPEX ANGGARAN MASTER (thn_anggaran → nm_anggaran → pekerjaan) ─────
const CAPEX_ANGGARAN = [
  {
    kd_anggaran: "2440015",
    nm_anggaran: "Implementasi dan Standarisasi IT Infrastruktur",
    thn_anggaran: 2024,
    pekerjaan: [
      {
        id_pekerjaan: 1,
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Planning & Control, CCTV dan SD-WAN Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 2,
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 3,
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System dan Planning & Control Branch Balikpapan dan Bagendang) PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 4,
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System Branch Makassar) PT Pelindo Multi Terminal",
      },
    ],
  },
  {
    kd_anggaran: "2440014",
    nm_anggaran: "Penyediaan Network di Branch SPMT",
    thn_anggaran: 2024,
    pekerjaan: [
      {
        id_pekerjaan: 5,
        nm_pekerjaan:
          "Penyediaan Network di Branch SPMT (Malahayati, Lhokseumawe, Lembar, Parepare dan Garongkong)",
      },
    ],
  },
  {
    kd_anggaran: "2440013",
    nm_anggaran: "Penyiapan Infrastruktur IT",
    thn_anggaran: 2024,
    pekerjaan: [
      {
        id_pekerjaan: 6,
        nm_pekerjaan:
          "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
      },
    ],
  },
  {
    kd_anggaran: "2440020",
    nm_anggaran:
      "Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC Transformasi pada Branch SPMT)",
    thn_anggaran: 2025,
    pekerjaan: [
      {
        id_pekerjaan: 7,
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System Transformasi pada Branch (Jamrud Nilam Mirah, Tanjung Wangi, Trisakti, Dumai, Belawan) PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 8,
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Planning and Control Transformasi pada Branch (Jamrud Nilam Mirah, Tanjung Wangi, Trisakti, Dumai, Belawan dan Kantor Pusat) PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 9,
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Transformasi PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 10,
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System dan Planning and Control (Public Announcer, Kelengkapan Gate dan Radio Point To Point) PT Pelindo Multi Terminal",
      },
    ],
  },
  {
    kd_anggaran: "2540011",
    nm_anggaran: "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    thn_anggaran: 2025,
    pekerjaan: [
      {
        id_pekerjaan: 11,
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Roro pada Branch (Lembar Gilimas, Tanjung Wangi, Tanjung Emas, Sibolga, Balikpapan, Parepare dan Tanjung Balai Karimun) PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 12,
        nm_pekerjaan:
          "Penyediaan Kebutuhan Public Announcer Pendukung Transformasi dan Digitalisasi Branch (Balikpapan, Belawan, Dumai, Trisakti, Makassar, Parepare, Garongkong, Sibolga, Tanjung Emas, Tanjung Intan dan Gresik) PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 13,
        nm_pekerjaan:
          "Penyediaan Kebutuhan Perangkat Jaringan, Security Information and Management (SIEM) dan Perangkat Pendukung Gate System PT Pelindo Multi Terminal",
      },
      {
        id_pekerjaan: 14,
        nm_pekerjaan:
          "Penyediaan Kebutuhan Transformasi dan Digitalisasi (CCTV dan Public Announcer Traffic Monitoring pada Gate) Branch Belawan, Dumai, Malahayati, Lhokseumawe, Lembar, Jamrud Nilam Mirah, Makassar, Balikpapan, Bumiharjo Bagendang, Tanjung Pinang, Sibolga, Tanjung Emas, Parepare, Trisakti dan Gresik PT Pelindo Multi Terminal",
      },
    ],
  },
  {
    kd_anggaran: "2540012",
    nm_anggaran:
      "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    thn_anggaran: 2025,
    pekerjaan: [
      {
        id_pekerjaan: 15,
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Perangkat Network Branch Tanjung Balai Karimun Terminal Selat Panjang PT Pelindo Multi Terminal",
      },
    ],
  },
  {
    kd_anggaran: "2540010",
    nm_anggaran: "Penyiapan Infrastruktur IT pada Kegiatan Roro",
    thn_anggaran: 2025,
    pekerjaan: [
      {
        id_pekerjaan: 16,
        nm_pekerjaan:
          "Penyiapan Infrastruktur Gate System Pendukung Kegiatan RoRo pada Branch Tanjung Emas PT Pelindo Multi Terminal",
      },
    ],
  },
];

// ── OPEX ANGGARAN (thn_anggaran → nm_anggaran, tanpa pekerjaan) ───
const OPEX_ANGGARAN = [
  {
    kd_anggaran: "OPEX-5030",
    nm_anggaran: "Beban Pemeliharaan Software",
    kd_akun: "5030905000",
    thn_anggaran: 2024,
    id_pekerjaan: "OPEX-1",
  },
  {
    kd_anggaran: "OPEX-5021A",
    nm_anggaran: "Beban Jaringan dan Koneksi Data",
    kd_akun: "5021300000",
    thn_anggaran: 2024,
    id_pekerjaan: "OPEX-2",
  },
  {
    kd_anggaran: "OPEX-5021B",
    nm_anggaran: "Beban Perlengkapan Kantor",
    kd_akun: "5021200000",
    thn_anggaran: 2024,
    id_pekerjaan: "OPEX-3",
  },
  {
    kd_anggaran: "OPEX-5081",
    nm_anggaran: "Beban Jasa Konsultan",
    kd_akun: "5081500000",
    thn_anggaran: 2024,
    id_pekerjaan: "OPEX-4",
  },
  {
    kd_anggaran: "OPEX-5060",
    nm_anggaran: "Beban Sumber Daya Pihak Ketiga Peralatan",
    kd_akun: "5060700000",
    thn_anggaran: 2024,
    id_pekerjaan: "OPEX-5",
  },
  {
    kd_anggaran: "OPEX-5030B",
    nm_anggaran: "Beban Pemeliharaan Software",
    kd_akun: "5030905000",
    thn_anggaran: 2025,
    id_pekerjaan: "OPEX-1",
  },
  {
    kd_anggaran: "OPEX-5021C",
    nm_anggaran: "Beban Jaringan dan Koneksi Data",
    kd_akun: "5021300000",
    thn_anggaran: 2025,
    id_pekerjaan: "OPEX-2",
  },
  {
    kd_anggaran: "OPEX-5021D",
    nm_anggaran: "Beban Perlengkapan Kantor",
    kd_akun: "5021200000",
    thn_anggaran: 2025,
    id_pekerjaan: "OPEX-3",
  },
  {
    kd_anggaran: "OPEX-5081B",
    nm_anggaran: "Beban Jasa Konsultan",
    kd_akun: "5081500000",
    thn_anggaran: 2025,
    id_pekerjaan: "OPEX-4",
  },
  {
    kd_anggaran: "OPEX-5060B",
    nm_anggaran: "Beban Sumber Daya Pihak Ketiga Peralatan",
    kd_akun: "5060700000",
    thn_anggaran: 2025,
    id_pekerjaan: "OPEX-5",
  },
];

// ── DERIVED FLAT LIST (for lookup/table/export) ───────────────────
const ALL_PROJECTS = [
  ...CAPEX_ANGGARAN.flatMap((a) =>
    a.pekerjaan.map((p) => ({
      ...p,
      jenis: "CAPEX",
      kd_anggaran: a.kd_anggaran,
      nm_anggaran: a.nm_anggaran,
      thn_anggaran: a.thn_anggaran,
    })),
  ),
  ...OPEX_ANGGARAN.map((o) => ({
    id_pekerjaan: o.id_pekerjaan,
    nm_pekerjaan: o.nm_anggaran,
    jenis: "OPEX",
    kd_anggaran: o.kd_anggaran,
    nm_anggaran: o.nm_anggaran,
    thn_anggaran: o.thn_anggaran,
    kd_akun: o.kd_akun,
  })),
];

// ── UNIFIED TAHUN LIST (CAPEX + OPEX) ────────────────────────────
const ALL_TAHUN_LIST = [
  ...new Set([
    ...CAPEX_ANGGARAN.map((a) => a.thn_anggaran),
    ...OPEX_ANGGARAN.map((o) => o.thn_anggaran),
  ]),
].sort();

// ── GET ANGGARAN BY TAHUN (CAPEX + OPEX combined) ────────────────
const getAnggaranByTahun = (thn) => {
  const capex = CAPEX_ANGGARAN.filter(
    (a) => String(a.thn_anggaran) === String(thn),
  ).map((a) => ({ ...a, jenis: "CAPEX" }));
  const opex = OPEX_ANGGARAN.filter(
    (o) => String(o.thn_anggaran) === String(thn),
  ).map((o) => ({
    kd_anggaran: o.kd_anggaran,
    nm_anggaran: o.nm_anggaran,
    thn_anggaran: o.thn_anggaran,
    jenis: "OPEX",
    id_pekerjaan: o.id_pekerjaan,
    kd_akun: o.kd_akun,
  }));
  return [...capex, ...opex];
};

// ── CAPEX_TAHUN_LIST kept for backward compat ─────────────────────
const CAPEX_TAHUN_LIST = [
  ...new Set(CAPEX_ANGGARAN.map((a) => a.thn_anggaran)),
].sort();

const getProjectById = (id) =>
  ALL_PROJECTS.find((p) => String(p.id_pekerjaan) === String(id)) || null;

const getProjectName = (id) => {
  const p = getProjectById(id);
  return p ? p.nm_pekerjaan : "—";
};

const MOCK_ALL_BORROWS = [
  {
    id: 1,
    code: "SPMT-BLW-LPG-DMG-01",
    name: "CCTV Hikvision BL 01",
    borrow_date: "2026-01-10T09:00:00",
    due_date: "2026-02-10",
    performed_by_id: 3,
    performed_by_name: "Andi Pratama",
    performed_by_branch: "Surabaya",
    from_zone: "Lapangan",
    to_zone: "Terminal 2",
    reason: "Pemindahan sementara",
    condition: "GOOD",
    is_returned: true,
    return_date: "2026-02-08T14:00:00",
    return_condition: "GOOD",
    return_notes: "Kondisi baik",
  },
  {
    id: 2,
    code: "SPMT-BLW-LPG-DMG-01",
    name: "CCTV Hikvision BL 01",
    borrow_date: "2026-02-20T10:00:00",
    due_date: "2026-03-20",
    performed_by_id: 1,
    performed_by_name: "Joy Valeda Silalahi",
    performed_by_branch: "Jakarta",
    from_zone: "Lapangan",
    to_zone: "Ruang Network",
    reason: "Kalibrasi ulang",
    condition: "GOOD",
    is_returned: false,
    return_date: null,
    return_condition: null,
    return_notes: null,
  },
  {
    id: 3,
    code: "SPMT-LHK-DTC-PKR-01",
    name: "Server Dell PowerEdge R740",
    borrow_date: "2025-10-01T08:00:00",
    due_date: "2025-11-01",
    performed_by_id: 2,
    performed_by_name: "Dina Marlina Siagian",
    performed_by_branch: "Jakarta",
    from_zone: "Data Center",
    to_zone: "Ruang IT Sementara",
    reason: "Migrasi data",
    condition: "GOOD",
    is_returned: true,
    return_date: "2025-10-28T16:00:00",
    return_condition: "GOOD",
    return_notes: "",
  },
  {
    id: 4,
    code: "SPMT-BLW-LPG-PKR-01",
    name: "Toyota Hilux Pickup",
    borrow_date: "2026-01-05T07:00:00",
    due_date: "2026-01-20",
    performed_by_id: 5,
    performed_by_name: "Rini Handayani",
    performed_by_branch: "Medan",
    from_zone: "Lapangan",
    to_zone: "Luar Kota",
    reason: "Dinas luar kota",
    condition: "GOOD",
    is_returned: true,
    return_date: "2026-01-19T17:00:00",
    return_condition: "GOOD",
    return_notes: "Kondisi baik, BBM full",
  },
  {
    id: 5,
    code: "SPMT-BLW-LPG-PKR-01",
    name: "Toyota Hilux Pickup",
    borrow_date: "2026-02-15T08:00:00",
    due_date: "2026-03-01",
    performed_by_id: 4,
    performed_by_name: "Sari Dewi",
    performed_by_branch: "Jakarta",
    from_zone: "Lapangan",
    to_zone: "Terminal 3",
    reason: "Operasional harian",
    condition: "GOOD",
    is_returned: false,
    return_date: null,
    return_condition: null,
    return_notes: null,
  },
];

// Default placeholder images by category (Unsplash)
const CATEGORY_IMAGES = {
  "IT Equipment":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  Kendaraan:
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
  "Alat Berat":
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
  Furniture:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
};

const conditionConfig = {
  GOOD: { label: "Baik", color: "#16a34a", bg: "#dcfce7" },
  MINOR_DAMAGE: { label: "Rusak Ringan", color: "#d97706", bg: "#fef3c7" },
  DAMAGED: { label: "Rusak Berat", color: "#dc2626", bg: "#fee2e2" },
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
const ITEMS_PER_PAGE = 8;

// ── CODE128 BARCODE ───────────────────────────────────────────────────────────
const C128 = {
  S_B: 104,
  STOP: 106,
  CH: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  P: [
    "11011001100",
    "11001101100",
    "11001100110",
    "10010011000",
    "10010001100",
    "10001001100",
    "10011001000",
    "10011000100",
    "10001100100",
    "11001001000",
    "11001000100",
    "11000100100",
    "10110011100",
    "10011011100",
    "10011001110",
    "10111001100",
    "10011101100",
    "10011100110",
    "11001110010",
    "11001011100",
    "11001001110",
    "11011100100",
    "11001110100",
    "11101101110",
    "11101001100",
    "11100101100",
    "11100100110",
    "11101100100",
    "11100110100",
    "11100110010",
    "11011011000",
    "11011000110",
    "11000110110",
    "10100011000",
    "10001011000",
    "10001000110",
    "10110001000",
    "10001101000",
    "10001100010",
    "11010001000",
    "11000101000",
    "11000100010",
    "10110111000",
    "10110001110",
    "10001101110",
    "10111011000",
    "10111000110",
    "10001110110",
    "11101110110",
    "11010001110",
    "11000101110",
    "11011101000",
    "11011100010",
    "11011101110",
    "11101011000",
    "11101000110",
    "11100010110",
    "11101101000",
    "11101100010",
    "11100011010",
    "11101111010",
    "11001000010",
    "11110001010",
    "10100110000",
    "10100001100",
    "10010110000",
    "10010000110",
    "10000101100",
    "10000100110",
    "10110010000",
    "10110000100",
    "10011010000",
    "10011000010",
    "10000110100",
    "10000110010",
    "11000010010",
    "11001010000",
    "11110111010",
    "11000010100",
    "10001111010",
    "10100111100",
    "10010111100",
    "10010011110",
    "10111100100",
    "10011110100",
    "10011110010",
    "11110100100",
    "11110010100",
    "11110010010",
    "11110110110",
    "11011110110",
    "11110110110",
    "10101111000",
    "10100011110",
    "10001011110",
    "10111101000",
    "10111100010",
    "11110101000",
    "11110100010",
    "10111011110",
    "10111101110",
    "11101011110",
    "11110101110",
    "11010000100",
    "11010010000",
    "11010011100",
    "1100011101011",
  ],
  encode(text) {
    let codes = [this.S_B],
      cs = this.S_B;
    for (let i = 0; i < text.length; i++) {
      const idx = this.CH.indexOf(text[i]);
      if (idx < 0) continue;
      codes.push(idx);
      cs += idx * (i + 1);
    }
    codes.push(cs % 103);
    codes.push(this.STOP);
    return codes.map((c) => this.P[c]).join("") + "11";
  },
};

function BarcodeCanvas({ value, width = 340, height = 64 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !value) return;
    const canvas = ref.current,
      ctx = canvas.getContext("2d");
    const bars = C128.encode(value);
    const bw = Math.max(1, Math.floor(width / bars.length));
    canvas.width = bw * bars.length;
    canvas.height = height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    for (let i = 0; i < bars.length; i++)
      if (bars[i] === "1") ctx.fillRect(i * bw, 0, bw, height);
  }, [value, width, height]);
  return (
    <canvas
      ref={ref}
      style={{
        display: "block",
        maxWidth: "100%",
        imageRendering: "pixelated",
      }}
    />
  );
}

// ── SVG ICONS ─────────────────────────────────────────────────────
const Icon = {
  Inventory: () => (
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
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Shield: () => (
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Layers: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  CheckRound: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 8 16 12 12 16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  Wrench: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Coins: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  ),
  Search: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Filter: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  Download: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  ChevronDown: ({ deg = 0 }) => (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ transform: `rotate(${deg}deg)`, transition: "transform .2s" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Eye: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Barcode: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14M21 5v14" />
    </svg>
  ),
  Edit: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
  Dots: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  ),
  Calendar: () => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  InfoCircle: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Times: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="1"
        x2="13"
        y2="13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="13"
        y1="1"
        x2="1"
        y2="13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  Save: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  Print: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
  Warn: () => (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  WarnSm: () => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  ),
  Tag: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Cogs: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  MapPin: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  LayersIcon: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Database: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  DatabaseSm: () => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Magic: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M15 4V2m0 14v-2M8 9H2m14 0h-2M13.8 6.2 12 4.4m3.8 9.4L14 12m-3.8-9.4L8.4 4.4m9.4 9.4-1.8-1.8" />
      <path d="m3 21 9-9" />
    </svg>
  ),
  BarcodeModal: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14M21 5v14" />
    </svg>
  ),
  QrCode: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="17" y="17" width="3" height="3" />
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
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  CheckSm: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#16a34a"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2" />
      <polyline points="9 12 11 14 15 10" stroke="#16a34a" />
    </svg>
  ),
  BoxOpen: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  SmallTrash: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
  History: () => (
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
      <polyline points="12 8 12 12 14 14" />
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5-4v4h4" />
    </svg>
  ),
  ArrowRight: () => (
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  User: () => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  ClipboardEmpty: () => (
    <svg
      width="36"
      height="36"
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
  Photo: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  PhotoSm: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Grid: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  List: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Upload: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  XCircle: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  RefreshCw: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
};

// ── PHOTO UPLOAD ──────────────────────────────────────────────────
function PhotoUpload({ value, onChange }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const handleFile = (file) => {
    if (!file) return;
    const allowed = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowed.includes(file.type)) {
      alert("Format tidak didukung. Gunakan PNG, JPG, atau JPEG.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) =>
      onChange({
        dataUrl: e.target.result,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    reader.readAsDataURL(file);
  };
  const formatSize = (bytes) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (value) {
    return (
      <div className="photo-preview-wrap">
        <img src={value.dataUrl} alt="preview" className="photo-preview-img" />
        <div className="photo-preview-overlay">
          <button
            type="button"
            className="photo-preview-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon.RefreshCw /> Ganti Foto
          </button>
          <button
            type="button"
            className="photo-preview-btn danger"
            onClick={() => onChange(null)}
          >
            <Icon.XCircle /> Hapus
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
        <div className="photo-preview-info">
          <span>{value.name}</span>
          <span className="photo-size-badge">{formatSize(value.size)}</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`photo-upload-zone ${dragOver ? "drag-over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <div className="photo-upload-icon">
        <Icon.Upload />
      </div>
      <div className="photo-upload-title">Upload Foto Aset</div>
      <div className="photo-upload-sub">
        Klik atau drag &amp; drop file di sini
      </div>
      <div className="photo-upload-formats">
        <span className="photo-format-badge">PNG</span>
        <span className="photo-format-badge">JPG</span>
        <span className="photo-format-badge">JPEG</span>
        <span className="photo-format-badge">Maks. 5MB</span>
      </div>
    </div>
  );
}

// ── BARCODE LABEL MODAL ───────────────────────────────────────────
function BarcodeLabelModal({ asset, onClose, fmt, fmtDate }) {
  const project = getProjectById(asset.id_pekerjaan);
  const handlePrint = () => {
    const w = window.open("", "_blank", "width=620,height=520");
    w.document
      .write(`<!DOCTYPE html><html><head><title>Label — ${asset.id}</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Courier New',monospace;background:#f0f0f0;display:flex;justify-content:center;padding:30px}.label{width:360px;background:#fff;border:2.5px solid #111;border-radius:10px;padding:18px 20px;box-shadow:0 4px 20px rgba(0,0,0,.15)}.lh{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid #111;padding-bottom:10px;margin-bottom:10px}.lbrand{font-size:16px;font-weight:900;letter-spacing:3px;color:#000}.lsub{font-size:8px;font-weight:700;color:#555;letter-spacing:1.5px;margin-top:2px}.lstatus{border:1.5px solid #000;border-radius:4px;padding:3px 8px;font-size:8px;font-weight:900;letter-spacing:1px;text-transform:uppercase}.lname{font-size:14px;font-weight:800;margin:8px 0 3px;color:#000;font-family:sans-serif}.lid{font-size:10px;font-weight:700;color:#444;letter-spacing:.5px;margin-bottom:10px}.lbar{text-align:center;border-top:1px dashed #ddd;border-bottom:1px dashed #ddd;padding:6px 0;margin:8px 0}.lmeta{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px;border-top:1px solid #eee;padding-top:8px}.mi label{display:block;font-size:7.5px;color:#888;text-transform:uppercase;letter-spacing:.4px;margin-bottom:1px}.mi span{font-size:9.5px;font-weight:700;color:#111}.lfoot{text-align:center;margin-top:10px;font-size:7px;color:#aaa;letter-spacing:.5px;border-top:1px dashed #ddd;padding-top:7px;text-transform:uppercase}@media print{body{background:#fff;padding:0}.label{box-shadow:none}}</style></head><body>
<div class="label"><div class="lh"><div><div class="lbrand">PELINDO</div><div class="lsub">ASSET MANAGEMENT SYSTEM</div></div><span class="lstatus">${asset.status}</span></div>
<div class="lname">${asset.name}</div><div class="lid">${asset.id}</div><div class="lbar" id="bw"></div>
<div class="lmeta"><div class="mi"><label>Entitas</label><span>${asset.entitas || "—"}</span></div><div class="mi"><label>Cabang</label><span>${asset.branch}</span></div><div class="mi"><label>Zona · Subzona</label><span>${asset.zona} · ${asset.subzona}</span></div><div class="mi"><label>Kategori</label><span>${asset.category}</span></div><div class="mi"><label>ID Pekerjaan</label><span>${asset.id_pekerjaan || "—"}</span></div><div class="mi"><label>Tgl Pengadaan</label><span>${fmtDate(asset.procurementDate)}</span></div></div>
<div class="lfoot">SCAN BARCODE UNTUK VERIFIKASI ASET · ${new Date().getFullYear()}</div></div>
<script>(function(){const CH=' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~';const P=["11011001100","11001101100","11001100110","10010011000","10010001100","10001001100","10011001000","10011000100","10001100100","11001001000","11001000100","11000100100","10110011100","10011011100","10011001110","10111001100","10011101100","10011100110","11001110010","11001011100","11001001110","11011100100","11001110100","11101101110","11101001100","11100101100","11100100110","11101100100","11100110100","11100110010","11011011000","11011000110","11000110110","10100011000","10001011000","10001000110","10110001000","10001101000","10001100010","11010001000","11000101000","11000100010","10110111000","10110001110","10001101110","10111011000","10111000110","10001110110","11101110110","11010001110","11000101110","11011101000","11011100010","11011101110","11101011000","11101000110","11100010110","11101101000","11101100010","11100011010","11101111010","11001000010","11110001010","10100110000","10100001100","10010110000","10010000110","10000101100","10000100110","10110010000","10110000100","10011010000","10011000010","10000110100","10000110010","11000010010","11001010000","11110111010","11000010100","10001111010","10100111100","10010111100","10010011110","10111100100","10011110100","10011110010","11110100100","11110010100","11110010010","11110110110","11011110110","11110110110","10101111000","10100011110","10001011110","10111101000","10111100010","11110101000","11110100010","10111011110","10111101110","11101011110","11110101110","11010000100","11010010000","11010011100","1100011101011"];
const t="${asset.id}";let c=[104],cs=104;for(let i=0;i<t.length;i++){const x=CH.indexOf(t[i]);if(x<0)continue;c.push(x);cs+=x*(i+1);}c.push(cs%103);c.push(106);
const bars=c.map(x=>P[x]).join('')+'11';const cv=document.createElement('canvas');const bw=Math.max(1,Math.floor(320/bars.length));cv.width=bw*bars.length;cv.height=60;cv.style.width='100%';cv.style.height='auto';const ctx=cv.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.width,cv.height);ctx.fillStyle='#000';for(let i=0;i<bars.length;i++){if(bars[i]==='1')ctx.fillRect(i*bw,0,bw,60);}document.getElementById('bw').appendChild(cv);setTimeout(()=>{window.print();},400);})();</script></body></html>`);
    w.document.close();
  };
  const sc = (s) =>
    s === "Tersedia"
      ? "tersedia"
      : s === "Dipinjam"
        ? "dipinjam"
        : "maintenance";
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content barcode-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>
            <Icon.BarcodeModal /> Label Barcode Aset
          </h3>
          <button className="close-btn" onClick={onClose}>
            <Icon.Times />
          </button>
        </div>
        <div className="barcode-modal-body">
          <div className="barcode-label-wrap">
            <div className="barcode-label-card">
              <div className="blc-header">
                <div>
                  <div className="blc-brand">PELINDO</div>
                  <div className="blc-sub">ASSET MANAGEMENT SYSTEM</div>
                </div>
                <span className={`status-badge ${sc(asset.status)}`}>
                  {asset.status}
                </span>
              </div>
              <div className="blc-name">{asset.name}</div>
              <div className="blc-id">{asset.id}</div>
              <div className="blc-barcode">
                <BarcodeCanvas value={asset.id} width={310} height={58} />
              </div>
              <div className="blc-meta">
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Entitas</span>
                  <span className="blc-meta-val">{asset.entitas || "—"}</span>
                </div>
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Cabang</span>
                  <span className="blc-meta-val">{asset.branch}</span>
                </div>
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Zona · Subzona</span>
                  <span className="blc-meta-val">
                    {asset.zona} · {asset.subzona}
                  </span>
                </div>
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Kategori</span>
                  <span className="blc-meta-val">{asset.category}</span>
                </div>
              </div>
              <div className="blc-footer">
                SCAN BARCODE UNTUK VERIFIKASI ASET
              </div>
            </div>
          </div>
          <div className="barcode-hint-row">
            <span className="barcode-hint-icon">
              <Icon.QrCode />
            </span>
            <span>
              Barcode Code128 — kompatibel dengan semua scanner industri standar
            </span>
          </div>
          <button className="btn-print" onClick={handlePrint}>
            <Icon.Print /> Cetak Label
          </button>
        </div>
      </div>
    </div>
  );
}

// ── HISTORY TAB ───────────────────────────────────────────────────
function AssetHistoryTab({ assetCode, allBorrows }) {
  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";
  const history = useMemo(
    () =>
      allBorrows
        .filter((b) => b.code === assetCode)
        .sort((a, b) => new Date(b.borrow_date) - new Date(a.borrow_date)),
    [assetCode, allBorrows],
  );
  if (history.length === 0)
    return (
      <div className="hist-empty">
        <span className="hist-empty-ico">
          <Icon.ClipboardEmpty />
        </span>
        <span className="hist-empty-title">Belum Ada Riwayat</span>
        <span className="hist-empty-sub">
          Aset ini belum pernah dipinjam sebelumnya.
        </span>
      </div>
    );
  return (
    <div className="hist-wrap">
      <div className="hist-summary-row">
        <span className="hist-summary-pill hist-pill-total">
          {history.length}x Transaksi
        </span>
        <span className="hist-summary-pill hist-pill-returned">
          {history.filter((h) => h.is_returned).length}x Dikembalikan
        </span>
        {history.some((h) => !h.is_returned) && (
          <span className="hist-summary-pill hist-pill-active">
            1 Sedang Dipinjam
          </span>
        )}
      </div>
      <div className="hist-table-wrap">
        <table className="hist-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Peminjam</th>
              <th>Lokasi</th>
              <th>Tgl Pinjam</th>
              <th>Tgl Kembali</th>
              <th>Kondisi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, idx) => {
              const cond =
                conditionConfig[
                  h.is_returned ? h.return_condition : h.condition
                ];
              return (
                <tr
                  key={h.id}
                  className={!h.is_returned ? "hist-row-active" : ""}
                >
                  <td className="hist-num">{history.length - idx}</td>
                  <td>
                    <div className="hist-user">
                      <div className="hist-avatar">
                        {h.performed_by_name.charAt(0)}
                      </div>
                      <div>
                        <div className="hist-uname">{h.performed_by_name}</div>
                        <div className="hist-ubranch">
                          {h.performed_by_branch}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="hist-loc">
                      <span className="hist-loc-from">{h.from_zone}</span>
                      <span className="hist-loc-arr">
                        <Icon.ArrowRight />
                      </span>
                      <span className="hist-loc-to">{h.to_zone}</span>
                    </div>
                  </td>
                  <td className="hist-date">{fmtDate(h.borrow_date)}</td>
                  <td className="hist-date">
                    {h.is_returned ? (
                      <span className="hist-date-ret">
                        {fmtDate(h.return_date)}
                      </span>
                    ) : (
                      <span className="hist-no-return">Belum kembali</span>
                    )}
                  </td>
                  <td>
                    {cond && (
                      <span
                        className="hist-cond"
                        style={{ background: cond.bg, color: cond.color }}
                      >
                        {cond.label}
                      </span>
                    )}
                  </td>
                  <td>
                    {h.is_returned ? (
                      <span className="hist-badge hist-badge-done">
                        Selesai
                      </span>
                    ) : (
                      <span className="hist-badge hist-badge-active">
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
    </div>
  );
}

// ── PROJECT BADGE ─────────────────────────────────────────────────
function ProjectBadge({ id_pekerjaan }) {
  const project = getProjectById(id_pekerjaan);
  if (!project)
    return <span className="project-badge project-badge--none">—</span>;
  const isOpex = String(id_pekerjaan).startsWith("OPEX");
  return (
    <span
      className={`project-badge ${isOpex ? "project-badge--opex" : "project-badge--capex"}`}
      title={project.nm_pekerjaan}
    >
      <Icon.Briefcase />
      {isOpex ? "OPEX" : `P-${id_pekerjaan}`}
    </span>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
const ViewAsset = () => {
  const [assets, setAssets] = useState([
    {
      id: "SPMT-BLW-LPG-DMG-01",
      name: "CCTV Hikvision BL 01",
      category: "IT Equipment",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Belawan",
      zona: "LPG",
      subzona: "DMG",
      value: 12000000,
      id_pekerjaan: 1,
      procurementDate: "2026-01-28",
      photo: null,
    },
    {
      id: "SPMT-DMI-GDG-DMG-01",
      name: "Excavator CAT 336",
      category: "Alat Berat",
      status: "Maintenance",
      entitas: "Pelindo Multi Terminal",
      branch: "Dumai",
      zona: "GDG",
      subzona: "DMG",
      value: 1200000000,
      id_pekerjaan: 3,
      procurementDate: "2025-06-15",
      photo: null,
    },
    {
      id: "SPMT-LHK-DTC-PKR-01",
      name: "Server Dell PowerEdge R740",
      category: "IT Equipment",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Lhokseumawe",
      zona: "DTC",
      subzona: "PKR",
      value: 180000000,
      id_pekerjaan: 5,
      procurementDate: "2025-03-22",
      photo: null,
    },
    {
      id: "SPMT-BLW-LPG-PKR-01",
      name: "Toyota Hilux Pickup",
      category: "Kendaraan",
      status: "Dipinjam",
      entitas: "Pelindo Multi Terminal",
      branch: "Belawan",
      zona: "LPG",
      subzona: "PKR",
      value: 350000000,
      id_pekerjaan: "OPEX-5",
      procurementDate: "2024-08-01",
      photo: null,
    },
    {
      id: "PTP-TJP-GDG-DMG-01",
      name: "Meja Kerja Direktori",
      category: "Furniture",
      status: "Tersedia",
      entitas: "PT Pelabuhan Indonesia",
      branch: "Tanjung Priok",
      zona: "GDG",
      subzona: "DMG",
      value: 8500000,
      id_pekerjaan: "OPEX-3",
      procurementDate: "2026-02-14",
      photo: null,
    },
    {
      id: "SPMT-MLH-DTC-PKR-01",
      name: "Cisco Switch Catalyst 2960X",
      category: "IT Equipment",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Malahayati",
      zona: "DTC",
      subzona: "PKR",
      value: 45000000,
      id_pekerjaan: 4,
      procurementDate: "2025-09-05",
      photo: null,
    },
    {
      id: "SPMT-DMI-LPG-JLN-01",
      name: "Mitsubishi Fuso Truk",
      category: "Kendaraan",
      status: "Maintenance",
      entitas: "Pelindo Multi Terminal",
      branch: "Dumai",
      zona: "LPG",
      subzona: "JLN",
      value: 620000000,
      id_pekerjaan: "OPEX-5",
      procurementDate: "2024-11-20",
      photo: null,
    },
    {
      id: "SPMT-BLW-LPG-DMG-02",
      name: "RTG Crane ZPMC",
      category: "Alat Berat",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Belawan",
      zona: "LPG",
      subzona: "DMG",
      value: 8500000000,
      id_pekerjaan: 6,
      procurementDate: "2023-04-10",
      photo: null,
    },
    {
      id: "PTP-JMB-GDG-DMG-01",
      name: "Kursi Ergonomis Kantor",
      category: "Furniture",
      status: "Tersedia",
      entitas: "PT Pelabuhan Indonesia",
      branch: "Jambi",
      zona: "GDG",
      subzona: "DMG",
      value: 3200000,
      id_pekerjaan: "OPEX-3",
      procurementDate: "2025-07-30",
      photo: null,
    },
    {
      id: "IKT-JKT-GDG-PKR-01",
      name: "CCTV Dahua JKT 01",
      category: "IT Equipment",
      status: "Tersedia",
      entitas: "Indonesia Kendaraan Terminal",
      branch: "Jakarta",
      zona: "GDG",
      subzona: "PKR",
      value: 12000000,
      id_pekerjaan: 1,
      procurementDate: "2026-01-28",
      photo: null,
    },
  ]);

  const [viewMode, setViewMode] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailTab, setDetailTab] = useState("info");
  const [editPhoto, setEditPhoto] = useState(null);
  const [editData, setEditData] = useState({});

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  // ── FILTER CASCADE: Anggaran → Pekerjaan ──
  const [filterAnggaran, setFilterAnggaran] = useState("");
  const [filterProject, setFilterProject] = useState("");

  const [formPhoto, setFormPhoto] = useState(null);
  const [formData, setFormData] = useState({
    assetId: "",
    name: "",
    entitas: "",
    entitasCode: "",
    branch: "",
    branchCode: "",
    zona: "",
    zonaCode: "",
    subzona: "",
    subzonaCode: "",
    nomorAset: "",
    category: "",
    status: "Tersedia",
    condition: "Baik",
    value: "",
    id_pekerjaan: "",
    thn_anggaran: "",
    kd_anggaran: "",
    procurementDate: "",
  });
  const [templateSpecs, setTemplateSpecs] = useState([]);
  const [customSpecs, setCustomSpecs] = useState([]);

  const availableBranches = formData.entitasCode
    ? BRANCH_BY_ENTITY[formData.entitasCode] || []
    : [];
  const dropdownRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const kpi = useMemo(
    () => ({
      total: assets.length,
      tersedia: assets.filter((a) => a.status === "Tersedia").length,
      maintenance: assets.filter((a) => a.status === "Maintenance").length,
      dipinjam: assets.filter((a) => a.status === "Dipinjam").length,
      totalNilai: assets.reduce((s, a) => s + (a.value || 0), 0),
    }),
    [assets],
  );

  // ── FILTERED LIST — now uses filterAnggaran + filterProject cascade ──
  const filtered = useMemo(
    () =>
      assets.filter((a) => {
        const q = search.toLowerCase();
        const proj = getProjectById(a.id_pekerjaan);
        return (
          (!q ||
            a.id.toLowerCase().includes(q) ||
            a.name.toLowerCase().includes(q) ||
            a.branch.toLowerCase().includes(q)) &&
          (!filterStatus || a.status === filterStatus) &&
          (!filterCategory || a.category === filterCategory) &&
          (!filterBranch || a.branch === filterBranch) &&
          // Filter by anggaran (match kd_anggaran of the asset's project)
          (!filterAnggaran || proj?.kd_anggaran === filterAnggaran) &&
          // Filter by specific pekerjaan (only active when CAPEX anggaran selected)
          (!filterProject || String(a.id_pekerjaan) === filterProject)
        );
      }),
    [
      assets,
      search,
      filterStatus,
      filterCategory,
      filterBranch,
      filterAnggaran,
      filterProject,
    ],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // ── count both anggaran & project as separate active filters ──
  const activeFiltersCount = [
    filterStatus,
    filterCategory,
    filterBranch,
    filterAnggaran,
    filterProject,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setFilterStatus("");
    setFilterCategory("");
    setFilterBranch("");
    setFilterAnggaran("");
    setFilterProject("");
    setCurrentPage(1);
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
  const statusClass = (s) =>
    s === "Tersedia"
      ? "tersedia"
      : s === "Dipinjam"
        ? "dipinjam"
        : "maintenance";
  const getAssetImage = (asset) =>
    asset.photo?.dataUrl || CATEGORY_IMAGES[asset.category] || null;

  const getNextNomor = (eCode, bCode, zCode, szCode) => {
    const prefix = `${eCode}-${bCode}-${zCode}-${szCode}-`;
    const nums = assets
      .filter((a) => a.id.startsWith(prefix))
      .map((a) => {
        const n = parseInt(a.id.slice(prefix.length), 10);
        return isNaN(n) ? 0 : n;
      });
    return String((nums.length > 0 ? Math.max(...nums) : 0) + 1).padStart(
      2,
      "0",
    );
  };

  const canGenerate = !!(
    formData.entitasCode &&
    formData.branchCode &&
    formData.zonaCode &&
    formData.subzonaCode
  );

  const handleGenerateCode = () => {
    if (!canGenerate) {
      alert("Lengkapi semua field lokasi!");
      return;
    }
    const { entitasCode, branchCode, zonaCode, subzonaCode } = formData;
    const nomorAuto = getNextNomor(
      entitasCode,
      branchCode,
      zonaCode,
      subzonaCode,
    );
    const generated = `${entitasCode}-${branchCode}-${zonaCode}-${subzonaCode}-${nomorAuto}`;
    setFormData((p) => ({ ...p, nomorAset: nomorAuto, assetId: generated }));
  };

  const handleEntitasChange = (e) => {
    const f = ENTITAS_LIST.find((en) => en.code === e.target.value);
    setFormData((p) => ({
      ...p,
      entitas: f?.name || "",
      entitasCode: f?.code || "",
      branch: "",
      branchCode: "",
      nomorAset: "",
      assetId: "",
    }));
  };
  const handleBranchChange = (e) => {
    const f = availableBranches.find((b) => b.code === e.target.value);
    setFormData((p) => ({
      ...p,
      branch: f?.name || "",
      branchCode: f?.code || "",
      nomorAset: "",
      assetId: "",
    }));
  };
  const handleZonaChange = (e) => {
    const f = ZONA_LIST.find((z) => z.code === e.target.value);
    setFormData((p) => ({
      ...p,
      zona: f?.name || "",
      zonaCode: f?.code || "",
      nomorAset: "",
      assetId: "",
    }));
  };
  const handleSubzonaChange = (e) => {
    const f = SUBZONA_LIST.find((s) => s.code === e.target.value);
    setFormData((p) => ({
      ...p,
      subzona: f?.name || "",
      subzonaCode: f?.code || "",
      nomorAset: "",
      assetId: "",
    }));
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData((p) => ({ ...p, category }));
    if (category === "IT Equipment")
      setTemplateSpecs([
        { key: "processor", label: "Processor (CPU)", value: "" },
        { key: "ram", label: "RAM Capacity", value: "" },
        { key: "storage", label: "Storage (SSD/HDD)", value: "" },
        { key: "os", label: "Operating System", value: "" },
      ]);
    else if (["Kendaraan", "Alat Berat"].includes(category))
      setTemplateSpecs([
        { key: "plat", label: "Plat Nomor / Lambung", value: "" },
        { key: "mesin", label: "Nomor Mesin", value: "" },
        { key: "tahun", label: "Tahun Pembuatan", value: "" },
        { key: "merk", label: "Merk / Brand", value: "" },
      ]);
    else if (category === "Furniture")
      setTemplateSpecs([
        { key: "material", label: "Bahan Material", value: "" },
        { key: "dimensi", label: "Dimensi (PxLxT)", value: "" },
        { key: "warna", label: "Warna Dominan", value: "" },
      ]);
    else setTemplateSpecs([]);
  };

  const resetForm = () => {
    setFormData({
      assetId: "",
      name: "",
      entitas: "",
      entitasCode: "",
      branch: "",
      branchCode: "",
      zona: "",
      zonaCode: "",
      subzona: "",
      subzonaCode: "",
      nomorAset: "",
      category: "",
      status: "Tersedia",
      condition: "Baik",
      value: "",
      id_pekerjaan: "",
      thn_anggaran: "",
      kd_anggaran: "",
      procurementDate: "",
    });
    setTemplateSpecs([]);
    setCustomSpecs([]);
    setFormPhoto(null);
  };

  const handleSave = () => {
    if (!formData.assetId) {
      alert("Mohon generate kode aset terlebih dahulu!");
      return;
    }
    const newAsset = {
      id: formData.assetId,
      name: formData.name,
      category: formData.category,
      status: formData.status,
      entitas: formData.entitas,
      branch: formData.branch,
      zona: formData.zonaCode,
      subzona: formData.subzonaCode,
      value: parseFloat(formData.value) || 0,
      id_pekerjaan:
        formData.id_pekerjaan ||
        (formData.kd_anggaran
          ? OPEX_ANGGARAN.find((o) => o.kd_anggaran === formData.kd_anggaran)
              ?.id_pekerjaan || null
          : null),
      procurementDate: formData.procurementDate,
      photo: formPhoto,
    };
    setAssets([newAsset, ...assets]);
    setShowModal(false);
    resetForm();
  };

  const handleDelete = () => {
    setAssets(assets.filter((a) => a.id !== selectedAsset.id));
    setShowDeleteConfirm(false);
    setSelectedAsset(null);
  };

  const openEditModal = (asset) => {
    setSelectedAsset(asset);
    const existingProj = ALL_PROJECTS.find(
      (p) => String(p.id_pekerjaan) === String(asset.id_pekerjaan),
    );
    setEditData({
      name: asset.name,
      category: asset.category,
      status: asset.status,
      value: asset.value,
      procurementDate: asset.procurementDate,
      entitas: asset.entitas,
      branch: asset.branch,
      zona: asset.zona,
      subzona: asset.subzona,
      id_pekerjaan: asset.id_pekerjaan || "",
      thn_anggaran: existingProj?.thn_anggaran
        ? String(existingProj.thn_anggaran)
        : "",
      kd_anggaran: existingProj?.kd_anggaran || "",
    });
    setEditPhoto(asset.photo || null);
    setShowDetailModal(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const resolvedId =
      editData.id_pekerjaan ||
      (editData.kd_anggaran
        ? OPEX_ANGGARAN.find((o) => o.kd_anggaran === editData.kd_anggaran)
            ?.id_pekerjaan || null
        : null);
    const saveData = { ...editData, id_pekerjaan: resolvedId };
    const updated = assets.map((a) =>
      a.id === selectedAsset.id
        ? {
            ...a,
            ...saveData,
            value: parseFloat(editData.value) || 0,
            photo: editPhoto,
          }
        : a,
    );
    setAssets(updated);
    setSelectedAsset((prev) => ({
      ...prev,
      ...saveData,
      value: parseFloat(editData.value) || 0,
      photo: editPhoto,
    }));
    setShowEditModal(false);
  };

  const handleExport = () => {
    const headers = [
      "ID Aset",
      "Nama",
      "Kategori",
      "Entitas",
      "Branch",
      "Zona",
      "Subzona",
      "Status",
      "ID Pekerjaan",
      "Nama Pekerjaan",
      "Nilai",
      "Tgl Pengadaan",
    ];
    const rows = filtered.map((a) => [
      a.id,
      a.name,
      a.category,
      a.entitas,
      a.branch,
      a.zona,
      a.subzona,
      a.status,
      a.id_pekerjaan || "",
      getProjectName(a.id_pekerjaan),
      a.value,
      a.procurementDate,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory-aset.csv";
    link.click();
  };

  const autoNomor = canGenerate
    ? getNextNomor(
        formData.entitasCode,
        formData.branchCode,
        formData.zonaCode,
        formData.subzonaCode,
      )
    : null;
  const codePreview = canGenerate
    ? `${formData.entitasCode}-${formData.branchCode}-${formData.zonaCode}-${formData.subzonaCode}-${autoNomor}`
    : null;
  const missingFields = [
    !formData.entitasCode && "Entitas",
    !formData.branchCode && "Cabang",
    !formData.zonaCode && "Zona",
    !formData.subzonaCode && "Sub Zona",
  ].filter(Boolean);
  const getHistoryCount = (id) =>
    MOCK_ALL_BORROWS.filter((b) => b.code === id).length;

  // ── Helper: get the CAPEX entry for the currently selected filter anggaran ──
  const filterAnggaranCapexEntry = filterAnggaran
    ? CAPEX_ANGGARAN.find((a) => a.kd_anggaran === filterAnggaran)
    : null;

  return (
    <>
      <div className="view-asset-wrapper">
        {/* HEADER */}
        <div className="view-header">
          <div className="view-header-left">
            <div className="view-header-icon">
              <Icon.Inventory />
            </div>
            <div>
              <h1 className="view-title">Inventory Aset</h1>
              <p className="view-subtitle">
                <Icon.Shield /> Super Admin Access · {assets.length} total aset
                terdaftar
              </p>
            </div>
          </div>
          <button className="add-asset-btn" onClick={() => setShowModal(true)}>
            <Icon.Plus /> Input Aset Baru
          </button>
        </div>

        {/* KPI */}
        <div className="kpi-grid">
          {[
            {
              cls: "kpi-total",
              icon: <Icon.Layers />,
              val: kpi.total,
              lbl: "Total Aset",
              glow: "blue",
            },
            {
              cls: "kpi-tersedia",
              icon: <Icon.CheckRound />,
              val: kpi.tersedia,
              lbl: "Tersedia",
              glow: "green",
            },
            {
              cls: "kpi-dipinjam",
              icon: <Icon.ArrowUpRight />,
              val: kpi.dipinjam,
              lbl: "Dipinjam",
              glow: "yellow",
            },
            {
              cls: "kpi-maintenance",
              icon: <Icon.Wrench />,
              val: kpi.maintenance,
              lbl: "Maintenance",
              glow: "red",
            },
            {
              cls: "kpi-nilai",
              icon: <Icon.Coins />,
              val: fmt(kpi.totalNilai),
              lbl: "Total Nilai Aset",
              glow: "cyan",
              sm: true,
            },
          ].map(({ cls, icon, val, lbl, glow, sm }) => (
            <div key={lbl} className={`kpi-card ${cls}`}>
              <div className="kpi-icon">{icon}</div>
              <div className="kpi-body">
                <div className={`kpi-val${sm ? " kpi-val--sm" : ""}`}>
                  {val}
                </div>
                <div className="kpi-lbl">{lbl}</div>
              </div>
              <div className={`kpi-glow kpi-glow--${glow}`} />
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="table-controls">
          <div className="search-box">
            <span className="search-icon">
              <Icon.Search />
            </span>
            <input
              type="text"
              placeholder="Cari ID aset, nama, atau branch..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="filter-actions">
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
              >
                <Icon.List /> Tabel
              </button>
              <button
                className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Icon.Grid /> Grid
              </button>
            </div>
            <button
              className={`control-btn ${showFilterPanel ? "active" : ""}`}
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Icon.Filter /> Filter
              {activeFiltersCount > 0 && (
                <span className="filter-badge">{activeFiltersCount}</span>
              )}
              <Icon.ChevronDown deg={showFilterPanel ? 180 : 0} />
            </button>
            <button className="control-btn" onClick={handleExport}>
              <Icon.Download /> Export CSV
            </button>
          </div>
        </div>

        {/* ── FILTER PANEL — CASCADE Anggaran → Pekerjaan ── */}
        {showFilterPanel && (
          <div className="filter-panel">
            <div className="filter-panel-grid">
              {/* Filter 1: Status */}
              <div className="filter-group">
                <label>Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Semua Status</option>
                  <option>Tersedia</option>
                  <option>Dipinjam</option>
                  <option>Maintenance</option>
                </select>
              </div>

              {/* Filter 2: Kategori */}
              <div className="filter-group">
                <label>Kategori</label>
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Semua Kategori</option>
                  <option>IT Equipment</option>
                  <option>Kendaraan</option>
                  <option>Alat Berat</option>
                  <option>Furniture</option>
                </select>
              </div>

              {/* Filter 3: Branch */}
              <div className="filter-group">
                <label>Branch</label>
                <select
                  value={filterBranch}
                  onChange={(e) => {
                    setFilterBranch(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Semua Branch</option>
                  {Object.values(BRANCH_BY_ENTITY)
                    .flat()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((b) => (
                      <option key={b.code} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Filter 4 + 5: Cascade Nama Anggaran → Nama Pekerjaan dalam satu kolom */}
              <div className="filter-group">
                <label>Nama Anggaran</label>
                {/* Step 1 — Nama Anggaran (tanpa cascade-step-label agar sejajar dengan filter lain) */}
                <select
                  value={filterAnggaran}
                  onChange={(e) => {
                    setFilterAnggaran(e.target.value);
                    setFilterProject("");
                    setCurrentPage(1);
                  }}
                  className={filterAnggaran ? "cascade-select--filled" : ""}
                >
                  <option value="">Semua Anggaran</option>
                  <optgroup label="CAPEX">
                    {CAPEX_ANGGARAN.map((a) => (
                      <option key={a.kd_anggaran} value={a.kd_anggaran}>
                        [{a.thn_anggaran}] {a.nm_anggaran}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="OPEX">
                    {OPEX_ANGGARAN.map((o) => (
                      <option key={o.kd_anggaran} value={o.kd_anggaran}>
                        [{o.thn_anggaran}] {o.nm_anggaran}
                      </option>
                    ))}
                  </optgroup>
                </select>

                {/* Step 2 — Nama Pekerjaan (hanya muncul jika anggaran CAPEX dipilih) */}
                {filterAnggaranCapexEntry && (
                  <div style={{ marginTop: 8 }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--cyan)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ opacity: 0.7 }}>↳</span>
                      Nama Pekerjaan
                      <span
                        style={{
                          background: "#e0f2fe",
                          color: "#0369a1",
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "1px 6px",
                          borderRadius: 20,
                          border: "1px solid #bae6fd",
                        }}
                      >
                        {filterAnggaranCapexEntry.pekerjaan.length}
                      </span>
                    </label>
                    <select
                      value={filterProject}
                      onChange={(e) => {
                        setFilterProject(e.target.value);
                        setCurrentPage(1);
                      }}
                      className={filterProject ? "cascade-select--filled" : ""}
                      style={{
                        padding: "9px 12px",
                        border: "1px solid var(--border)",
                        borderRadius: 9,
                        fontSize: 13,
                        color: "#334155",
                        background: "var(--white)",
                        outline: "none",
                        width: "100%",
                        fontFamily: "var(--font)",
                      }}
                    >
                      <option value="">Semua Pekerjaan</option>
                      {filterAnggaranCapexEntry.pekerjaan.map((p) => (
                        <option
                          key={p.id_pekerjaan}
                          value={String(p.id_pekerjaan)}
                        >
                          {p.nm_pekerjaan.length > 80
                            ? p.nm_pekerjaan.substring(0, 80) + "…"
                            : p.nm_pekerjaan}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <button className="filter-reset-btn" onClick={resetFilters}>
                <Icon.Times /> Reset Filter
              </button>
            )}
          </div>
        )}

        {/* TABLE / GRID */}
        <div className="table-container">
          <div className="table-info-bar">
            <span>
              Menampilkan <strong>{paginated.length}</strong> dari{" "}
              <strong>{filtered.length}</strong> aset
            </span>
            {activeFiltersCount > 0 && (
              <span className="filter-active-note">
                <Icon.WarnSm /> Filter aktif
              </span>
            )}
          </div>

          {viewMode === "grid" ? (
            <>
              {paginated.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <Icon.BoxOpen />
                  </div>
                  <div className="empty-state-title">
                    Tidak ada aset ditemukan
                  </div>
                  <div className="empty-state-sub">
                    Coba ubah kata kunci atau reset filter.
                  </div>
                </div>
              ) : (
                <div className="asset-card-grid">
                  {paginated.map((asset) => {
                    const imgSrc = getAssetImage(asset);
                    const project = getProjectById(asset.id_pekerjaan);
                    return (
                      <div
                        key={asset.id}
                        className="asset-card"
                        onClick={() => {
                          setSelectedAsset(asset);
                          setDetailTab("info");
                          setShowDetailModal(true);
                        }}
                      >
                        <div className="asset-card-img-wrap">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={asset.name}
                              className="asset-card-img"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          {!imgSrc && (
                            <div className="asset-card-img-placeholder">
                              <Icon.Photo />
                              <span>Tidak ada foto</span>
                            </div>
                          )}
                          {imgSrc && (
                            <div
                              className="asset-card-img-placeholder"
                              style={{ display: "none" }}
                            >
                              <Icon.Photo />
                              <span>Tidak ada foto</span>
                            </div>
                          )}
                          <div className="asset-card-status">
                            <span
                              className={`status-badge ${statusClass(asset.status)}`}
                            >
                              {asset.status}
                            </span>
                          </div>
                        </div>
                        <div className="asset-card-body">
                          <div className="asset-card-name">{asset.name}</div>
                          <code className="asset-card-id">{asset.id}</code>
                          <div className="asset-card-meta">
                            <span className="cat-badge">{asset.category}</span>
                            <ProjectBadge id_pekerjaan={asset.id_pekerjaan} />
                          </div>
                          {project && (
                            <div
                              className="asset-card-project"
                              title={project.nm_pekerjaan}
                            >
                              <Icon.Briefcase />
                              <span>
                                {project.nm_pekerjaan.length > 45
                                  ? project.nm_pekerjaan.substring(0, 45) + "…"
                                  : project.nm_pekerjaan}
                              </span>
                            </div>
                          )}
                          <div className="asset-card-loc">
                            <Icon.MapPin /> {asset.branch} · {asset.zona}/
                            {asset.subzona}
                          </div>
                        </div>
                        <div className="asset-card-footer">
                          <span className="asset-card-value">
                            {fmt(asset.value)}
                          </span>
                          <div
                            className="asset-card-actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="card-action-btn"
                              onClick={() => {
                                setSelectedAsset(asset);
                                setShowBarcodeModal(true);
                              }}
                            >
                              <Icon.Barcode />
                            </button>
                            <button
                              className="card-action-btn danger"
                              onClick={() => {
                                setSelectedAsset(asset);
                                setShowDeleteConfirm(true);
                              }}
                            >
                              <Icon.Trash />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <table className="asset-table">
              <thead>
                <tr>
                  <th>ID ASET</th>
                  <th>NAMA ASET</th>
                  <th>LOKASI</th>
                  <th>KATEGORI</th>
                  <th>TGL PENGADAAN</th>
                  <th>NAMA PEKERJAAN</th>
                  <th>NILAI</th>
                  <th>STATUS</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="9">
                      <div className="empty-state">
                        <div className="empty-state-icon">
                          <Icon.BoxOpen />
                        </div>
                        <div className="empty-state-title">
                          Tidak ada aset ditemukan
                        </div>
                        <div className="empty-state-sub">
                          {activeFiltersCount > 0 || search
                            ? "Coba ubah kata kunci atau reset filter."
                            : 'Belum ada aset. Klik "Input Aset Baru" untuk mulai.'}
                        </div>
                        {(activeFiltersCount > 0 || search) && (
                          <button
                            className="empty-reset-btn"
                            onClick={() => {
                              resetFilters();
                              setSearch("");
                            }}
                          >
                            Reset Pencarian & Filter
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((asset) => {
                    const imgSrc = getAssetImage(asset);
                    const project = getProjectById(asset.id_pekerjaan);
                    return (
                      <tr
                        key={asset.id}
                        className="asset-row"
                        onClick={() => {
                          setSelectedAsset(asset);
                          setDetailTab("info");
                          setShowDetailModal(true);
                        }}
                      >
                        <td>
                          <code className="asset-id-code">{asset.id}</code>
                        </td>
                        <td>
                          <div className="asset-thumb-cell">
                            {imgSrc ? (
                              <img
                                src={imgSrc}
                                alt={asset.name}
                                className="asset-thumb"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="asset-thumb-placeholder">
                                <Icon.PhotoSm />
                              </div>
                            )}
                            <div className="asset-name-wrap">
                              <div className="fw-bold">{asset.name}</div>
                              <div className="cat-badge-sm">
                                {asset.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="loc-text">{asset.branch}</div>
                          <div className="sub-loc-text">
                            {asset.zona} · {asset.subzona}
                          </div>
                        </td>
                        <td>
                          <span className="cat-badge">{asset.category}</span>
                        </td>
                        <td>
                          <div className="date-cell">
                            <Icon.Calendar />
                            {fmtDate(asset.procurementDate)}
                          </div>
                        </td>
                        <td>
                          <div className="project-cell">
                            <ProjectBadge id_pekerjaan={asset.id_pekerjaan} />
                            {project && (
                              <div
                                className="project-name-text"
                                title={project.nm_pekerjaan}
                              >
                                {project.nm_pekerjaan.length > 40
                                  ? project.nm_pekerjaan.substring(0, 40) + "…"
                                  : project.nm_pekerjaan}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="fw-bold">{fmt(asset.value)}</td>
                        <td>
                          <span
                            className={`status-badge ${statusClass(asset.status)}`}
                          >
                            {asset.status}
                          </span>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <div
                            className="action-wrap"
                            ref={
                              activeDropdown === asset.id ? dropdownRef : null
                            }
                          >
                            <button
                              className="action-dot-btn"
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === asset.id ? null : asset.id,
                                )
                              }
                            >
                              <Icon.Dots />
                            </button>
                            {activeDropdown === asset.id && (
                              <div className="action-dropdown">
                                <button
                                  onClick={() => {
                                    setSelectedAsset(asset);
                                    setDetailTab("info");
                                    setShowDetailModal(true);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <Icon.Eye /> Lihat Detail
                                </button>
                                <button
                                  className="action-history"
                                  onClick={() => {
                                    setSelectedAsset(asset);
                                    setDetailTab("history");
                                    setShowDetailModal(true);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <Icon.History /> Riwayat Pinjam
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedAsset(asset);
                                    setShowBarcodeModal(true);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <Icon.Barcode /> Cetak Barcode
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    openEditModal(asset);
                                  }}
                                >
                                  <Icon.Edit /> Edit Aset
                                </button>
                                <button
                                  className="action-delete"
                                  onClick={() => {
                                    setSelectedAsset(asset);
                                    setShowDeleteConfirm(true);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <Icon.Trash /> Hapus
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pg-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <Icon.ChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`pg-btn ${p === currentPage ? "pg-active" : ""}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="pg-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <Icon.ChevronRight />
              </button>
              <span className="pg-info">
                Halaman {currentPage} dari {totalPages}
              </span>
            </div>
          )}
        </div>

        {/* ── DETAIL MODAL ── */}
        {showDetailModal && selectedAsset && (
          <div
            className="modal-overlay"
            onClick={() => setShowDetailModal(false)}
          >
            <div
              className="modal-content detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="modal-header"
                style={{ position: "relative", zIndex: 10 }}
              >
                <h3>
                  <Icon.InfoCircle /> Detail Aset
                </h3>
                <button
                  className="close-btn"
                  onClick={() => setShowDetailModal(false)}
                  style={{ flexShrink: 0 }}
                >
                  <Icon.Times />
                </button>
              </div>
              <div className="detail-tab-bar">
                <button
                  className={`detail-tab-btn ${detailTab === "info" ? "detail-tab-btn--active" : ""}`}
                  onClick={() => setDetailTab("info")}
                >
                  <Icon.InfoCircle /> Informasi Aset
                </button>
                <button
                  className={`detail-tab-btn ${detailTab === "history" ? "detail-tab-btn--active detail-tab-btn--history" : ""}`}
                  onClick={() => setDetailTab("history")}
                >
                  <Icon.History /> Riwayat Peminjaman
                  {getHistoryCount(selectedAsset.id) > 0 && (
                    <span className="detail-tab-badge">
                      {getHistoryCount(selectedAsset.id)}
                    </span>
                  )}
                </button>
              </div>
              {detailTab === "info" && (
                <div className="detail-scroll">
                  <div className="detail-img-hero">
                    {(() => {
                      const imgSrc = getAssetImage(selectedAsset);
                      return imgSrc ? (
                        <>
                          <img
                            src={imgSrc}
                            alt={selectedAsset.name}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <div className="detail-img-overlay">
                            <div className="detail-img-overlay-name">
                              {selectedAsset.name}
                            </div>
                            <div className="detail-img-overlay-id">
                              {selectedAsset.id}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="detail-img-placeholder">
                          <Icon.Photo />
                          <span>Belum ada foto untuk aset ini</span>
                        </div>
                      );
                    })()}
                  </div>
                  <div className="detail-body">
                    <div className="detail-hero">
                      <div className="detail-hero-name">
                        {selectedAsset.name}
                      </div>
                      <span
                        className={`status-badge ${statusClass(selectedAsset.status)}`}
                      >
                        {selectedAsset.status}
                      </span>
                    </div>
                    <code className="detail-id">{selectedAsset.id}</code>
                    <div className="detail-barcode-strip">
                      <BarcodeCanvas
                        value={selectedAsset.id}
                        width={400}
                        height={40}
                      />
                    </div>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-lbl">Entitas</span>
                        <span className="detail-val">
                          {selectedAsset.entitas || "—"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-lbl">Branch</span>
                        <span className="detail-val">
                          {selectedAsset.branch}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-lbl">Kode Zona</span>
                        <span className="detail-val">{selectedAsset.zona}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-lbl">Kode Subzona</span>
                        <span className="detail-val">
                          {selectedAsset.subzona}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-lbl">Kategori</span>
                        <span className="detail-val">
                          {selectedAsset.category}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-lbl">Tgl Pengadaan</span>
                        <span className="detail-val">
                          {fmtDate(selectedAsset.procurementDate)}
                        </span>
                      </div>
                      <div className="detail-item detail-item--full">
                        <span className="detail-lbl">Pekerjaan / Anggaran</span>
                        <span className="detail-val">
                          {selectedAsset.id_pekerjaan ? (
                            <>
                              <ProjectBadge
                                id_pekerjaan={selectedAsset.id_pekerjaan}
                              />
                              <span
                                style={{
                                  fontSize: 11,
                                  color: "#475569",
                                  marginTop: 4,
                                  display: "block",
                                }}
                              >
                                {getProjectName(selectedAsset.id_pekerjaan)}
                              </span>
                            </>
                          ) : (
                            "—"
                          )}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-lbl">Nilai Aset</span>
                        <span className="detail-val detail-val--highlight">
                          {fmt(selectedAsset.value)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {detailTab === "history" && (
                <div className="detail-scroll">
                  <AssetHistoryTab
                    assetCode={selectedAsset.id}
                    allBorrows={MOCK_ALL_BORROWS}
                  />
                </div>
              )}
              <div className="modal-footer sticky-footer">
                <button
                  className="btn-cancel"
                  onClick={() => setShowDetailModal(false)}
                >
                  Tutup
                </button>
                <button
                  className="btn-barcode"
                  onClick={() => {
                    setShowDetailModal(false);
                    setShowBarcodeModal(true);
                  }}
                >
                  <Icon.Barcode /> Cetak Barcode
                </button>
                <button
                  className="btn-save"
                  onClick={() => openEditModal(selectedAsset)}
                >
                  <Icon.Edit /> Edit Aset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRM */}
        {showDeleteConfirm && selectedAsset && (
          <div className="modal-overlay">
            <div className="modal-content confirm-modal">
              <div className="confirm-icon">
                <Icon.Warn />
              </div>
              <h3>Hapus Aset?</h3>
              <p>
                Aset <strong>{selectedAsset.name}</strong> dengan ID{" "}
                <code>{selectedAsset.id}</code> akan dihapus permanen.
              </p>
              <div className="confirm-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Batal
                </button>
                <button className="btn-delete-confirm" onClick={handleDelete}>
                  <Icon.Trash /> Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BARCODE MODAL */}
        {showBarcodeModal && selectedAsset && (
          <BarcodeLabelModal
            asset={selectedAsset}
            onClose={() => setShowBarcodeModal(false)}
            fmt={fmt}
            fmtDate={fmtDate}
          />
        )}

        {/* ── EDIT MODAL ── */}
        {showEditModal && selectedAsset && (
          <div
            className="modal-overlay"
            onClick={() => setShowEditModal(false)}
          >
            <div
              className="modal-content large-modal"
              style={{ maxWidth: 640 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header modal-header--fancy">
                <div className="modal-header-left">
                  <div className="modal-header-icon">
                    <Icon.Edit />
                  </div>
                  <div>
                    <h3 className="modal-title">Edit Aset</h3>
                    <p className="modal-subtitle">
                      ID Aset: <strong>{selectedAsset.id}</strong> — Kode tidak
                      dapat diubah
                    </p>
                  </div>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  <Icon.Times />
                </button>
              </div>
              <div className="asset-form-scroll">
                {/* SECTION A */}
                <div className="form-section-card">
                  <div className="fsc-header">
                    <div className="fsc-step">A</div>
                    <div className="fsc-titles">
                      <h4 className="fsc-title">
                        <Icon.Tag /> Informasi Utama
                      </h4>
                      <p className="fsc-desc">
                        Nama, kategori, status, nilai, dan tanggal pengadaan
                      </p>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 14 }}>
                    <label>
                      Nama Aset <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      value={editData.name || ""}
                      onChange={(e) =>
                        setEditData((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Nama aset"
                    />
                  </div>
                  <div className="form-row" style={{ marginBottom: 14 }}>
                    <div className="form-group">
                      <label>
                        Kategori <span className="req">*</span>
                      </label>
                      <select
                        value={editData.category || ""}
                        onChange={(e) =>
                          setEditData((p) => ({
                            ...p,
                            category: e.target.value,
                          }))
                        }
                      >
                        <option value="">— Pilih Kategori —</option>
                        <option value="IT Equipment">IT Equipment</option>
                        <option value="Kendaraan">Kendaraan Operasional</option>
                        <option value="Alat Berat">Alat Berat (HMC/RTG)</option>
                        <option value="Furniture">Furniture</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tanggal Pengadaan</label>
                      <input
                        type="date"
                        value={editData.procurementDate || ""}
                        onChange={(e) =>
                          setEditData((p) => ({
                            ...p,
                            procurementDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="form-row-3">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={editData.status || "Tersedia"}
                        onChange={(e) =>
                          setEditData((p) => ({ ...p, status: e.target.value }))
                        }
                      >
                        <option>Tersedia</option>
                        <option>Dipinjam</option>
                        <option>Maintenance</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nilai Aset (IDR)</label>
                      <input
                        type="number"
                        value={editData.value || ""}
                        onChange={(e) =>
                          setEditData((p) => ({ ...p, value: e.target.value }))
                        }
                        placeholder="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nama Pekerjaan</label>
                      <div className="cascade-selects">
                        <div className="cascade-step">
                          <span className="cascade-step-label">
                            Tahun Anggaran
                          </span>
                          <select
                            value={editData.thn_anggaran || ""}
                            onChange={(e) =>
                              setEditData((p) => ({
                                ...p,
                                thn_anggaran: e.target.value,
                                kd_anggaran: "",
                                id_pekerjaan: "",
                              }))
                            }
                            className={
                              !editData.thn_anggaran
                                ? "inp--pending"
                                : "cascade-select--filled"
                            }
                          >
                            <option value="">— Pilih Tahun —</option>
                            {ALL_TAHUN_LIST.map((t) => (
                              <option key={t} value={String(t)}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        {editData.thn_anggaran &&
                          (() => {
                            const list = getAnggaranByTahun(
                              editData.thn_anggaran,
                            );
                            const capexList = list.filter(
                              (a) => a.jenis === "CAPEX",
                            );
                            const opexList = list.filter(
                              (a) => a.jenis === "OPEX",
                            );
                            return (
                              <div className="cascade-step">
                                <span className="cascade-step-label">
                                  Nama Anggaran
                                </span>
                                <select
                                  value={editData.kd_anggaran || ""}
                                  onChange={(e) =>
                                    setEditData((p) => ({
                                      ...p,
                                      kd_anggaran: e.target.value,
                                      id_pekerjaan: "",
                                    }))
                                  }
                                  className={
                                    !editData.kd_anggaran
                                      ? "inp--pending"
                                      : "cascade-select--filled"
                                  }
                                >
                                  <option value="">— Pilih Anggaran —</option>
                                  {capexList.length > 0 && (
                                    <optgroup label="CAPEX">
                                      {capexList.map((a) => (
                                        <option
                                          key={a.kd_anggaran}
                                          value={a.kd_anggaran}
                                        >
                                          {a.nm_anggaran}
                                        </option>
                                      ))}
                                    </optgroup>
                                  )}
                                  {opexList.length > 0 && (
                                    <optgroup label="OPEX">
                                      {opexList.map((a) => (
                                        <option
                                          key={a.kd_anggaran}
                                          value={a.kd_anggaran}
                                        >
                                          {a.nm_anggaran}
                                        </option>
                                      ))}
                                    </optgroup>
                                  )}
                                </select>
                              </div>
                            );
                          })()}
                        {editData.kd_anggaran &&
                          (() => {
                            const anggaranCapex = CAPEX_ANGGARAN.find(
                              (a) => a.kd_anggaran === editData.kd_anggaran,
                            );
                            if (!anggaranCapex) return null;
                            return (
                              <div className="cascade-step">
                                <span className="cascade-step-label">
                                  Nama Pekerjaan
                                </span>
                                <select
                                  value={editData.id_pekerjaan || ""}
                                  onChange={(e) =>
                                    setEditData((p) => ({
                                      ...p,
                                      id_pekerjaan: e.target.value,
                                    }))
                                  }
                                  className={
                                    !editData.id_pekerjaan
                                      ? "inp--pending"
                                      : "cascade-select--filled"
                                  }
                                >
                                  <option value="">— Pilih Pekerjaan —</option>
                                  {anggaranCapex.pekerjaan.map((p) => (
                                    <option
                                      key={p.id_pekerjaan}
                                      value={String(p.id_pekerjaan)}
                                    >
                                      {p.nm_pekerjaan}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            );
                          })()}
                      </div>
                    </div>
                  </div>
                  {editData.kd_anggaran &&
                    (() => {
                      const isCapex = !!CAPEX_ANGGARAN.find(
                        (a) => a.kd_anggaran === editData.kd_anggaran,
                      );
                      const opexEntry = !isCapex
                        ? OPEX_ANGGARAN.find(
                            (o) => o.kd_anggaran === editData.kd_anggaran,
                          )
                        : null;
                      if (isCapex && !editData.id_pekerjaan) return null;
                      const anggaran = isCapex
                        ? CAPEX_ANGGARAN.find(
                            (a) => a.kd_anggaran === editData.kd_anggaran,
                          )
                        : null;
                      return (
                        <div className="project-info-box project-info-box--full">
                          <Icon.Briefcase />
                          <div style={{ flex: 1 }}>
                            <div className="project-info-label">
                              {isCapex
                                ? "Pekerjaan Terpilih"
                                : "Anggaran Terpilih"}
                            </div>
                            <div className="project-info-meta">
                              <span className="pim-tag pim-tag--year">
                                📅 {editData.thn_anggaran}
                              </span>
                              {isCapex ? (
                                <>
                                  <span className="pim-tag pim-tag--kd">
                                    {editData.kd_anggaran}
                                  </span>
                                  <span className="pim-tag pim-tag--anggaran">
                                    {anggaran?.nm_anggaran}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="pim-tag pim-tag--opex">
                                    OPEX
                                  </span>
                                  <span className="pim-tag pim-tag--kd">
                                    {opexEntry?.kd_akun}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="project-info-name">
                              {isCapex
                                ? getProjectName(editData.id_pekerjaan)
                                : opexEntry?.nm_anggaran}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                </div>
                {/* SECTION B — Foto */}
                <div
                  className="form-section-card"
                  style={{
                    borderColor: editPhoto ? "#86efac" : undefined,
                    background: editPhoto ? "#f0fdf4" : undefined,
                  }}
                >
                  <div
                    className="fsc-header"
                    style={{ marginBottom: editPhoto ? 16 : 12 }}
                  >
                    <div className="fsc-step fsc-step--photo">B</div>
                    <div className="fsc-titles">
                      <h4 className="fsc-title">
                        <Icon.PhotoSm /> Foto Aset{" "}
                        <span className="optional-badge">Opsional</span>
                      </h4>
                      <p className="fsc-desc">Ganti atau hapus foto aset.</p>
                    </div>
                    {editPhoto && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          background: "#dcfce7",
                          border: "1px solid #86efac",
                          borderRadius: 8,
                          padding: "5px 10px",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#15803d",
                          flexShrink: 0,
                        }}
                      >
                        <Icon.Check /> Foto tersimpan
                      </div>
                    )}
                  </div>
                  <PhotoUpload value={editPhoto} onChange={setEditPhoto} />
                </div>
                {/* SECTION C — Lokasi */}
                <div className="form-section-card form-section-card--generate">
                  <div className="fsc-header">
                    <div className="fsc-step fsc-step--indigo">C</div>
                    <div className="fsc-titles">
                      <h4 className="fsc-title">
                        <Icon.MapPin /> Lokasi Aset
                      </h4>
                      <p className="fsc-desc">
                        Perbarui lokasi aset. Kode ID tidak akan berubah.
                      </p>
                    </div>
                  </div>
                  <div className="form-row" style={{ marginBottom: 14 }}>
                    <div className="form-group">
                      <label>Entitas</label>
                      <select
                        value={
                          ENTITAS_LIST.find((e) => e.name === editData.entitas)
                            ?.code || ""
                        }
                        onChange={(e) => {
                          const f = ENTITAS_LIST.find(
                            (x) => x.code === e.target.value,
                          );
                          setEditData((p) => ({
                            ...p,
                            entitas: f?.name || "",
                          }));
                        }}
                      >
                        <option value="">— Pilih Entitas —</option>
                        {ENTITAS_LIST.map((en) => (
                          <option key={en.code} value={en.code}>
                            {en.code} – {en.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Cabang</label>
                      <select
                        value={
                          Object.values(BRANCH_BY_ENTITY)
                            .flat()
                            .find((b) => b.name === editData.branch)?.code || ""
                        }
                        onChange={(e) => {
                          const f = Object.values(BRANCH_BY_ENTITY)
                            .flat()
                            .find((b) => b.code === e.target.value);
                          setEditData((p) => ({ ...p, branch: f?.name || "" }));
                        }}
                      >
                        <option value="">— Pilih Cabang —</option>
                        {Object.values(BRANCH_BY_ENTITY)
                          .flat()
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((b) => (
                            <option key={b.code} value={b.code}>
                              {b.code} – {b.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Zona</label>
                      <select
                        value={editData.zona || ""}
                        onChange={(e) =>
                          setEditData((p) => ({ ...p, zona: e.target.value }))
                        }
                      >
                        <option value="">— Pilih Zona —</option>
                        {ZONA_LIST.map((z) => (
                          <option key={z.code} value={z.code}>
                            {z.code} – {z.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Sub Zona</label>
                      <select
                        value={editData.subzona || ""}
                        onChange={(e) =>
                          setEditData((p) => ({
                            ...p,
                            subzona: e.target.value,
                          }))
                        }
                      >
                        <option value="">— Pilih Sub Zona —</option>
                        {SUBZONA_LIST.map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.code} – {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      padding: "10px 14px",
                      background: "#fef9c3",
                      border: "1px solid #fde047",
                      borderRadius: 9,
                      fontSize: 12,
                      color: "#854d0e",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Icon.WarnSm />{" "}
                    <span>
                      Kode Aset <strong>{selectedAsset.id}</strong> tidak
                      berubah meskipun lokasi diperbarui.
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer sticky-footer">
                <button
                  className="btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Batal
                </button>
                <button className="btn-save" onClick={handleSaveEdit}>
                  <Icon.Save /> Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── INPUT MODAL ── */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content large-modal">
              <div className="modal-header modal-header--fancy">
                <div className="modal-header-left">
                  <div className="modal-header-icon">
                    <Icon.Database />
                  </div>
                  <div>
                    <h3 className="modal-title">Input Data Aset</h3>
                    <p className="modal-subtitle">
                      Isi informasi aset lengkap — kode unik digenerate di akhir
                    </p>
                  </div>
                </div>
                <button
                  className="close-btn"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  <Icon.Times />
                </button>
              </div>
              <div className="form-step-bar">
                {[
                  "Informasi",
                  "Foto",
                  "Spesifikasi",
                  "Tambahan",
                  "Kode Aset",
                ].map((s, i) => (
                  <div key={s} className="form-step-item">
                    <div className="form-step-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="form-step-lbl">{s}</div>
                    {i < 4 && <div className="form-step-line" />}
                  </div>
                ))}
              </div>
              <form
                className="asset-form-scroll"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* SECTION 01 — Info */}
                <div className="form-section-card">
                  <div className="fsc-header">
                    <div className="fsc-step">01</div>
                    <div className="fsc-titles">
                      <h4 className="fsc-title">
                        <Icon.Tag /> Informasi Aset
                      </h4>
                      <p className="fsc-desc">
                        Nama, kategori, tanggal pengadaan, status, nilai, dan
                        pekerjaan terkait
                      </p>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label>
                      Nama Aset <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: CCTV Hikvision BL 01"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="form-row" style={{ marginBottom: 16 }}>
                    <div className="form-group">
                      <label>
                        Kategori <span className="req">*</span>
                      </label>
                      <select
                        onChange={handleCategoryChange}
                        value={formData.category}
                      >
                        <option value="">— Pilih Kategori —</option>
                        <option value="IT Equipment">IT Equipment</option>
                        <option value="Kendaraan">Kendaraan Operasional</option>
                        <option value="Alat Berat">Alat Berat (HMC/RTG)</option>
                        <option value="Furniture">Furniture</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tanggal Pengadaan</label>
                      <input
                        type="date"
                        value={formData.procurementDate}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            procurementDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="form-row-3">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, status: e.target.value }))
                        }
                      >
                        <option>Tersedia</option>
                        <option>Dipinjam</option>
                        <option>Maintenance</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nilai Aset (IDR)</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={formData.value}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, value: e.target.value }))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Nama Pekerjaan <span className="req">*</span>
                      </label>
                      <div className="cascade-selects">
                        <div className="cascade-step">
                          <span className="cascade-step-label">
                            Tahun Anggaran
                          </span>
                          <select
                            value={formData.thn_anggaran}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                thn_anggaran: e.target.value,
                                kd_anggaran: "",
                                id_pekerjaan: "",
                              }))
                            }
                            className={
                              !formData.thn_anggaran
                                ? "inp--pending"
                                : "cascade-select--filled"
                            }
                          >
                            <option value="">— Pilih Tahun —</option>
                            {ALL_TAHUN_LIST.map((t) => (
                              <option key={t} value={String(t)}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        {formData.thn_anggaran &&
                          (() => {
                            const list = getAnggaranByTahun(
                              formData.thn_anggaran,
                            );
                            const capexList = list.filter(
                              (a) => a.jenis === "CAPEX",
                            );
                            const opexList = list.filter(
                              (a) => a.jenis === "OPEX",
                            );
                            return (
                              <div className="cascade-step">
                                <span className="cascade-step-label">
                                  Nama Anggaran
                                </span>
                                <select
                                  value={formData.kd_anggaran}
                                  onChange={(e) =>
                                    setFormData((p) => ({
                                      ...p,
                                      kd_anggaran: e.target.value,
                                      id_pekerjaan: "",
                                    }))
                                  }
                                  className={
                                    !formData.kd_anggaran
                                      ? "inp--pending"
                                      : "cascade-select--filled"
                                  }
                                >
                                  <option value="">— Pilih Anggaran —</option>
                                  {capexList.length > 0 && (
                                    <optgroup label="CAPEX">
                                      {capexList.map((a) => (
                                        <option
                                          key={a.kd_anggaran}
                                          value={a.kd_anggaran}
                                        >
                                          {a.nm_anggaran}
                                        </option>
                                      ))}
                                    </optgroup>
                                  )}
                                  {opexList.length > 0 && (
                                    <optgroup label="OPEX">
                                      {opexList.map((a) => (
                                        <option
                                          key={a.kd_anggaran}
                                          value={a.kd_anggaran}
                                        >
                                          {a.nm_anggaran}
                                        </option>
                                      ))}
                                    </optgroup>
                                  )}
                                </select>
                              </div>
                            );
                          })()}
                        {formData.kd_anggaran &&
                          (() => {
                            const anggaranCapex = CAPEX_ANGGARAN.find(
                              (a) => a.kd_anggaran === formData.kd_anggaran,
                            );
                            if (!anggaranCapex) return null;
                            return (
                              <div className="cascade-step">
                                <span className="cascade-step-label">
                                  Nama Pekerjaan
                                </span>
                                <select
                                  value={formData.id_pekerjaan}
                                  onChange={(e) =>
                                    setFormData((p) => ({
                                      ...p,
                                      id_pekerjaan: e.target.value,
                                    }))
                                  }
                                  className={
                                    !formData.id_pekerjaan
                                      ? "inp--pending"
                                      : "cascade-select--filled"
                                  }
                                >
                                  <option value="">— Pilih Pekerjaan —</option>
                                  {anggaranCapex.pekerjaan.map((p) => (
                                    <option
                                      key={p.id_pekerjaan}
                                      value={String(p.id_pekerjaan)}
                                    >
                                      {p.nm_pekerjaan}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            );
                          })()}
                      </div>
                    </div>
                  </div>
                  {formData.kd_anggaran &&
                    (() => {
                      const isCapex = !!CAPEX_ANGGARAN.find(
                        (a) => a.kd_anggaran === formData.kd_anggaran,
                      );
                      const opexEntry = !isCapex
                        ? OPEX_ANGGARAN.find(
                            (o) => o.kd_anggaran === formData.kd_anggaran,
                          )
                        : null;
                      const anggaran = isCapex
                        ? CAPEX_ANGGARAN.find(
                            (a) => a.kd_anggaran === formData.kd_anggaran,
                          )
                        : null;
                      if (isCapex && !formData.id_pekerjaan) return null;
                      return (
                        <div className="project-info-box project-info-box--full">
                          <Icon.Briefcase />
                          <div style={{ flex: 1 }}>
                            <div className="project-info-label">
                              {isCapex
                                ? "Pekerjaan Terpilih"
                                : "Anggaran Terpilih"}
                            </div>
                            <div className="project-info-meta">
                              <span className="pim-tag pim-tag--year">
                                📅 {formData.thn_anggaran}
                              </span>
                              {isCapex ? (
                                <>
                                  <span className="pim-tag pim-tag--kd">
                                    {formData.kd_anggaran}
                                  </span>
                                  <span className="pim-tag pim-tag--anggaran">
                                    {anggaran?.nm_anggaran}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="pim-tag pim-tag--opex">
                                    OPEX
                                  </span>
                                  <span className="pim-tag pim-tag--kd">
                                    {opexEntry?.kd_akun}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="project-info-name">
                              {isCapex
                                ? getProjectName(formData.id_pekerjaan)
                                : opexEntry?.nm_anggaran}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                </div>

                {/* SECTION 02 — FOTO */}
                <div
                  className="form-section-card"
                  style={{
                    borderColor: formPhoto ? "#86efac" : undefined,
                    background: formPhoto ? "#f0fdf4" : undefined,
                  }}
                >
                  <div
                    className="fsc-header"
                    style={{ marginBottom: formPhoto ? 16 : 12 }}
                  >
                    <div className="fsc-step fsc-step--photo">02</div>
                    <div className="fsc-titles">
                      <h4 className="fsc-title">
                        <Icon.PhotoSm /> Foto Aset{" "}
                        <span className="optional-badge">Opsional</span>
                      </h4>
                      <p className="fsc-desc">
                        Upload foto aset dalam format PNG, JPG, atau JPEG (maks.
                        5MB)
                      </p>
                    </div>
                    {formPhoto && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          background: "#dcfce7",
                          border: "1px solid #86efac",
                          borderRadius: 8,
                          padding: "5px 10px",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#15803d",
                          flexShrink: 0,
                        }}
                      >
                        <Icon.Check /> Foto tersimpan
                      </div>
                    )}
                  </div>
                  <PhotoUpload value={formPhoto} onChange={setFormPhoto} />
                  {!formPhoto && formData.category && (
                    <div
                      style={{
                        marginTop: 10,
                        padding: "10px 14px",
                        background: "#f0f9ff",
                        border: "1px solid #bae6fd",
                        borderRadius: 9,
                        fontSize: 12,
                        color: "#0369a1",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Icon.InfoCircle />
                      <span>
                        Jika tidak diupload, foto default kategori{" "}
                        <strong>{formData.category}</strong> akan digunakan
                        sebagai gambar aset.
                      </span>
                    </div>
                  )}
                </div>

                {/* SECTION 03 — Spesifikasi */}
                <div className="form-section-card form-section-card--spec">
                  <div className="fsc-header">
                    <div className="fsc-step fsc-step--teal">03</div>
                    <div className="fsc-titles">
                      <h4 className="fsc-title">
                        <Icon.Cogs /> Spesifikasi Teknis
                      </h4>
                      <p className="fsc-desc">
                        Field muncul otomatis sesuai kategori yang dipilih di
                        atas
                      </p>
                    </div>
                  </div>
                  {!formData.category ? (
                    <div className="spec-empty-state">
                      <Icon.LayersIcon />
                      <span>
                        Pilih <strong>Kategori</strong> di section 01 untuk
                        memuat form spesifikasi
                      </span>
                    </div>
                  ) : (
                    <div className="form-grid-2">
                      {templateSpecs.map((spec, i) => (
                        <div className="form-group" key={i}>
                          <label>{spec.label}</label>
                          <input
                            type="text"
                            placeholder={`Isi ${spec.label}...`}
                            value={spec.value}
                            onChange={(e) => {
                              const n = [...templateSpecs];
                              n[i] = { ...n[i], value: e.target.value };
                              setTemplateSpecs(n);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SECTION 04 — Tambahan */}
                <div className="form-section-card">
                  <div
                    className="fsc-header"
                    style={{ marginBottom: customSpecs.length > 0 ? 16 : 0 }}
                  >
                    <div className="fsc-step fsc-step--gray">04</div>
                    <div className="fsc-titles">
                      <h4 className="fsc-title">
                        Spesifikasi Tambahan{" "}
                        <span className="optional-badge">Opsional</span>
                      </h4>
                      <p className="fsc-desc">
                        Tambahkan atribut unik yang tidak tersedia di template
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-small-add"
                      onClick={() =>
                        setCustomSpecs([...customSpecs, { key: "", value: "" }])
                      }
                      style={{ marginLeft: "auto", flexShrink: 0 }}
                    >
                      <Icon.Plus /> Tambah
                    </button>
                  </div>
                  {customSpecs.length === 0 && (
                    <div className="spec-empty-state">
                      <span className="spec-empty-icon">⚙</span>
                      <span>
                        Belum ada spesifikasi tambahan. Klik{" "}
                        <strong>+ Tambah</strong> untuk menambahkan.
                      </span>
                    </div>
                  )}
                  {customSpecs.map((spec, i) => (
                    <div className="custom-spec-row" key={i}>
                      <div className="spec-index">{i + 1}</div>
                      <div className="spec-input-wrap">
                        <input
                          type="text"
                          className="spec-input"
                          placeholder=" "
                          value={spec.key}
                          onChange={(e) => {
                            const n = [...customSpecs];
                            n[i] = { ...n[i], key: e.target.value };
                            setCustomSpecs(n);
                          }}
                        />
                        <label className="spec-float-label">Nama Atribut</label>
                      </div>
                      <div className="spec-divider">:</div>
                      <div className="spec-input-wrap spec-input-wrap--value">
                        <input
                          type="text"
                          className="spec-input"
                          placeholder=" "
                          value={spec.value}
                          onChange={(e) => {
                            const n = [...customSpecs];
                            n[i] = { ...n[i], value: e.target.value };
                            setCustomSpecs(n);
                          }}
                        />
                        <label className="spec-float-label">Nilai</label>
                      </div>
                      <button
                        type="button"
                        className="btn-trash spec-trash"
                        onClick={() => {
                          const n = [...customSpecs];
                          n.splice(i, 1);
                          setCustomSpecs(n);
                        }}
                        title="Hapus"
                      >
                        <Icon.SmallTrash />
                      </button>
                    </div>
                  ))}
                </div>

                {/* SECTION 05 — Kode Aset */}
                <div
                  className={`form-section-card form-section-card--generate ${formData.assetId ? "form-section-card--done" : ""}`}
                >
                  <div className="fsc-header">
                    <div className="fsc-step fsc-step--indigo">05</div>
                    <div className="fsc-titles">
                      <h4 className="fsc-title">
                        <Icon.MapPin /> Lokasi &amp; Kode Aset
                      </h4>
                      <p className="fsc-desc">
                        Pilih lokasi aset — kode unik akan digenerate dari
                        kombinasi data ini
                      </p>
                    </div>
                  </div>
                  <div className="form-row" style={{ marginBottom: 14 }}>
                    <div className="form-group">
                      <label>
                        Entitas <span className="req">*</span>
                      </label>
                      <select
                        value={formData.entitasCode}
                        onChange={handleEntitasChange}
                        className={!formData.entitasCode ? "inp--pending" : ""}
                      >
                        <option value="">— Pilih Entitas —</option>
                        {ENTITAS_LIST.map((en) => (
                          <option key={en.code} value={en.code}>
                            {en.code} – {en.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>
                        Cabang <span className="req">*</span>
                      </label>
                      <select
                        value={formData.branchCode}
                        onChange={handleBranchChange}
                        disabled={!formData.entitasCode}
                        className={
                          !formData.entitasCode
                            ? "inp--disabled"
                            : !formData.branchCode
                              ? "inp--pending"
                              : ""
                        }
                      >
                        <option value="">— Pilih Cabang —</option>
                        {availableBranches.map((b) => (
                          <option key={b.code} value={b.code}>
                            {b.code} – {b.name}
                          </option>
                        ))}
                      </select>
                      {!formData.entitasCode && (
                        <span className="field-hint fh--warn">
                          Pilih entitas terlebih dahulu
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-row" style={{ marginBottom: 14 }}>
                    <div className="form-group">
                      <label>
                        Zona <span className="req">*</span>
                      </label>
                      <select
                        value={formData.zonaCode}
                        onChange={handleZonaChange}
                        className={!formData.zonaCode ? "inp--pending" : ""}
                      >
                        <option value="">— Pilih Zona —</option>
                        {ZONA_LIST.map((z) => (
                          <option key={z.code} value={z.code}>
                            {z.code} – {z.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>
                        Sub Zona <span className="req">*</span>
                      </label>
                      <select
                        value={formData.subzonaCode}
                        onChange={handleSubzonaChange}
                        className={!formData.subzonaCode ? "inp--pending" : ""}
                      >
                        <option value="">— Pilih Sub Zona —</option>
                        {SUBZONA_LIST.map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.code} – {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {canGenerate && (
                    <div className="nomor-auto-box">
                      <div className="nomor-auto-left">
                        <div className="nomor-auto-label">
                          <span
                            style={{
                              marginRight: 6,
                              opacity: 0.6,
                              display: "flex",
                            }}
                          >
                            <Icon.DatabaseSm />
                          </span>
                          Nomor Aset (Auto)
                        </div>
                        <div className="nomor-auto-value">{autoNomor}</div>
                        <div className="nomor-auto-hint">
                          Dihitung otomatis berdasarkan jumlah aset terdaftar di
                          lokasi ini.
                        </div>
                      </div>
                      <div className="nomor-auto-badge">
                        <Icon.CheckSm />
                        <span>Auto</span>
                      </div>
                    </div>
                  )}
                  <div className="generate-divider">
                    <span>Generate Kode Aset</span>
                  </div>
                  {codePreview && (
                    <div className="code-segments">
                      {codePreview.split("-").map((seg, i, arr) => (
                        <React.Fragment key={i}>
                          <span className="code-seg">{seg}</span>
                          {i < arr.length - 1 && (
                            <span className="code-sep">·</span>
                          )}
                        </React.Fragment>
                      ))}
                      {!formData.assetId && (
                        <span className="code-seg-note">← preview</span>
                      )}
                    </div>
                  )}
                  <div className="input-group-generate">
                    <input
                      type="text"
                      readOnly
                      value={formData.assetId}
                      placeholder="Lengkapi semua field di atas, lalu klik Generate"
                      className="input-code"
                    />
                    <button
                      type="button"
                      className={`btn-generate ${!canGenerate ? "btn-generate--off" : ""}`}
                      onClick={handleGenerateCode}
                      disabled={!canGenerate}
                    >
                      <Icon.Magic /> Generate Kode
                    </button>
                  </div>
                  {!canGenerate && missingFields.length > 0 && (
                    <div className="missing-row">
                      <span className="missing-label">Belum diisi:</span>
                      {missingFields.map((f) => (
                        <span key={f} className="missing-pill">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                  {formData.assetId && (
                    <div className="barcode-result">
                      <div className="barcode-result-header">
                        <span className="barcode-result-icon">
                          <Icon.Check />
                        </span>
                        <span>
                          Kode berhasil digenerate — barcode Code128 siap untuk
                          dicetak
                        </span>
                      </div>
                      <div className="barcode-result-canvas">
                        <BarcodeCanvas
                          value={formData.assetId}
                          width={560}
                          height={60}
                        />
                        <div className="barcode-result-id">
                          {formData.assetId}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
              <div className="modal-footer sticky-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Batal
                </button>
                <button type="button" className="btn-save" onClick={handleSave}>
                  <Icon.Save /> Simpan Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAsset;
