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

const ALL_TAHUN_LIST = [
  ...new Set([
    ...CAPEX_ANGGARAN.map((a) => a.thn_anggaran),
    ...OPEX_ANGGARAN.map((o) => o.thn_anggaran),
  ]),
].sort();

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

const getProjectById = (id) =>
  ALL_PROJECTS.find((p) => String(p.id_pekerjaan) === String(id)) || null;

const getProjectName = (id) => {
  const p = getProjectById(id);
  return p ? p.nm_pekerjaan : "—";
};

const MOCK_ALL_BORROWS = [
  {
    id: 1,
    code: "CCTV-24BLW-001",
    serial_number: "SN-CCTV-001",
    name: "CCTV Hikvision PTZ",
    borrow_date: "2026-01-10T09:00:00",
    due_date: "2026-02-10",
    performed_by_id: 3,
    performed_by_name: "Andi Pratama",
    performed_by_branch: "Belawan",
    from_zone: "Gudang Utama",
    to_zone: "Area Dermaga - Tiang 1",
    reason: "Instalasi Baru",
    condition: "GOOD",
    is_returned: true,
    return_date: "2026-02-08T14:00:00",
    return_condition: "GOOD",
    return_notes: "Kondisi baik, ditarik untuk maintenance rutin.",
    returned_by_name: "Budi Santoso",
  },
  {
    id: 2,
    code: "CCTV-24BLW-001",
    serial_number: "SN-CCTV-001",
    name: "CCTV Hikvision PTZ",
    borrow_date: "2026-02-20T10:00:00",
    due_date: "2026-03-20",
    performed_by_id: 1,
    performed_by_name: "Joy Valeda Silalahi",
    performed_by_branch: "Belawan",
    from_zone: "Gudang Utama",
    to_zone: "Area Parkir Timur",
    reason: "Penggantian unit rusak sementara",
    condition: "GOOD",
    is_returned: false,
    return_date: null,
    return_condition: null,
    return_notes: null,
  },
  {
    id: 3,
    code: "CCTV-24BLW-001",
    serial_number: "SN-CCTV-002",
    name: "CCTV Hikvision PTZ",
    borrow_date: "2026-01-15T08:00:00",
    due_date: "2026-02-15",
    performed_by_id: 2,
    performed_by_name: "Dina Marlina Siagian",
    performed_by_branch: "Belawan",
    from_zone: "Gudang Utama",
    to_zone: "Pintu Masuk Utama",
    reason: "Instalasi Baru",
    condition: "GOOD",
    is_returned: true,
    return_date: "2026-02-10T16:00:00",
    return_condition: "MINOR_DAMAGE",
    return_notes: "Lensa sedikit berembun setelah hujan lebat.",
    returned_by_name: "Andi Pratama",
  },
  {
    id: 4,
    code: "KND-24BLW-001",
    serial_number: "BK 1234 ZZ",
    name: "Toyota Hilux Pickup",
    borrow_date: "2026-01-05T07:00:00",
    due_date: "2026-01-20",
    performed_by_id: 5,
    performed_by_name: "Rini Handayani",
    performed_by_branch: "Belawan",
    from_zone: "Pool Kendaraan",
    to_zone: "Luar Kota (Medan)",
    reason: "Dinas operasional",
    condition: "GOOD",
    is_returned: true,
    return_date: "2026-01-19T17:00:00",
    return_condition: "GOOD",
    return_notes: "Kondisi sangat baik, BBM full.",
    returned_by_name: "Rini Handayani",
  },
  {
    id: 5,
    code: "KND-24BLW-001",
    serial_number: "BK 1234 ZZ",
    name: "Toyota Hilux Pickup",
    borrow_date: "2026-02-15T08:00:00",
    due_date: "2026-03-01",
    performed_by_id: 4,
    performed_by_name: "Sari Dewi",
    performed_by_branch: "Belawan",
    from_zone: "Pool Kendaraan",
    to_zone: "Terminal Peti Kemas",
    reason: "Patroli rutin",
    condition: "GOOD",
    is_returned: false,
    return_date: null,
    return_condition: null,
    return_notes: null,
  },
  {
    id: 6,
    code: "KND-24BLW-001",
    serial_number: "BK 5678 AA",
    name: "Toyota Hilux Pickup",
    borrow_date: "2026-02-10T09:00:00",
    due_date: "2026-02-12",
    performed_by_id: 3,
    performed_by_name: "Andi Pratama",
    performed_by_branch: "Belawan",
    from_zone: "Pool Kendaraan",
    to_zone: "Workshop",
    reason: "Service rutin 10.000km",
    condition: "GOOD",
    is_returned: true,
    return_date: "2026-02-12T15:00:00",
    return_condition: "GOOD",
    return_notes: "Ganti oli dan filter, kondisi prima.",
    returned_by_name: "Andi Pratama",
  }
];

const CATEGORY_IMAGES = {
  Laptop:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  CCTV:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  Router:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  "PC Desktop":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  Server:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  Switch:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  Printer:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  Lainnya:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
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

const SPEC_UNIT_OPTIONS = [
  { group: "Penyimpanan", units: ["B", "KB", "MB", "GB", "TB"] },
  { group: "Memori", units: ["MB RAM", "GB RAM"] },
  { group: "Frekuensi", units: ["MHz", "GHz"] },
  { group: "Kecepatan", units: ["Mbps", "Gbps", "Kbps", "RPM"] },
  { group: "Daya", units: ["W", "kW", "VA"] },
  { group: "Dimensi", units: ["mm", "cm", "m", "inch"] },
  { group: "Berat", units: ["g", "kg", "ton"] },
  { group: "Tegangan", units: ["V", "mV", "kV"] },
  { group: "Suhu", units: ["°C", "°F"] },
  { group: "Waktu", units: ["detik", "menit", "jam", "hari", "tahun"] },
  { group: "Lainnya", units: ["unit", "pcs", "%", "-"] },
];

const SPEC_TEMPLATES_BY_CATEGORY = {
  Laptop: [
    { spec_label: "Processor", default_unit: "GHz", input_type: "text" },
    { spec_label: "RAM", default_unit: "GB RAM", input_type: "number" },
    { spec_label: "Storage", default_unit: "GB", input_type: "number" },
    { spec_label: "Resolusi Layar", default_unit: "inch", input_type: "text" },
  ],
  CCTV: [
    { spec_label: "Resolusi", default_unit: "MP", input_type: "text" },
    { spec_label: "Lensa", default_unit: "mm", input_type: "text" },
    { spec_label: "Jangkauan IR", default_unit: "m", input_type: "number" },
  ],
  Router: [
    { spec_label: "Kecepatan", default_unit: "Mbps", input_type: "number" },
    { spec_label: "Port", default_unit: "-", input_type: "text" },
    { spec_label: "Frekuensi", default_unit: "GHz", input_type: "text" },
  ],
  "PC Desktop": [
    { spec_label: "Processor", default_unit: "GHz", input_type: "text" },
    { spec_label: "RAM", default_unit: "GB RAM", input_type: "number" },
    { spec_label: "Storage", default_unit: "GB", input_type: "number" },
  ],
  Server: [
    { spec_label: "Processor", default_unit: "GHz", input_type: "text" },
    { spec_label: "RAM", default_unit: "GB", input_type: "number" },
    { spec_label: "Storage", default_unit: "TB", input_type: "number" },
    { spec_label: "Power Supply", default_unit: "W", input_type: "number" },
  ],
  Switch: [
    { spec_label: "Jumlah Port", default_unit: "-", input_type: "number" },
    { spec_label: "Kecepatan", default_unit: "Mbps", input_type: "number" },
    { spec_label: "Manageable", default_unit: "-", input_type: "text" },
  ],
  Printer: [
    { spec_label: "Tipe Printer", default_unit: "-", input_type: "text" },
    { spec_label: "Fungsi", default_unit: "-", input_type: "text" },
    { spec_label: "Konektivitas", default_unit: "-", input_type: "text" },
  ],
  Lainnya: [
    { spec_label: "Spesifikasi Utama", default_unit: "-", input_type: "text" },
    { spec_label: "Keterangan Tambahan", default_unit: "-", input_type: "text" }
  ],
  "IT Equipment": [
    {
      spec_label: "Processor (CPU)",
      default_unit: "GHz",
      input_type: "number",
    },
    { spec_label: "RAM", default_unit: "GB RAM", input_type: "number" },
    { spec_label: "Storage", default_unit: "GB", input_type: "number" },
    { spec_label: "Operating System", default_unit: "-", input_type: "text" },
    { spec_label: "Resolusi Layar", default_unit: "inch", input_type: "text" },
  ],
  Kendaraan: [
    { spec_label: "Plat Nomor", default_unit: "-", input_type: "text" },
    { spec_label: "Nomor Mesin", default_unit: "-", input_type: "text" },
    {
      spec_label: "Tahun Pembuatan",
      default_unit: "tahun",
      input_type: "number",
    },
    { spec_label: "Merk / Brand", default_unit: "-", input_type: "text" },
    { spec_label: "Kapasitas Mesin", default_unit: "cc", input_type: "number" },
  ],
  "Alat Berat": [
    { spec_label: "Plat / Lambung", default_unit: "-", input_type: "text" },
    { spec_label: "Nomor Mesin", default_unit: "-", input_type: "text" },
    {
      spec_label: "Tahun Pembuatan",
      default_unit: "tahun",
      input_type: "number",
    },
    {
      spec_label: "Kapasitas Angkat",
      default_unit: "ton",
      input_type: "number",
    },
    { spec_label: "Daya Mesin", default_unit: "kW", input_type: "number" },
  ],
  Furniture: [
    { spec_label: "Bahan Material", default_unit: "-", input_type: "text" },
    { spec_label: "Panjang", default_unit: "cm", input_type: "number" },
    { spec_label: "Lebar", default_unit: "cm", input_type: "number" },
    { spec_label: "Tinggi", default_unit: "cm", input_type: "number" },
    { spec_label: "Warna Dominan", default_unit: "-", input_type: "text" },
  ],
};

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
      width="16"
      height="16"
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
  Minus: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", position: "relative", zIndex: 1, flexShrink: 0 }}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", position: "relative", zIndex: 1, flexShrink: 0 }}
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
      style={{ display: "block" }}
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
      style={{ display: "block" }}
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
  Box: () => (
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  UserCheck: () => (
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
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

// ── REUSABLE MODERN TABLE COMPONENTS ─────────────────────────────
const ModernTable = ({ children }) => (
  <div
    style={{
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      overflow: "hidden",
      marginBottom: "24px",
      background: "#fff",
    }}
  >
    <table
      style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
    >
      <tbody>{children}</tbody>
    </table>
  </div>
);

const TableRow = ({ label, required, children, alignTop }) => (
  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
    <td
      style={{
        width: "28%",
        padding: "12px 16px",
        background: "#f8fafc",
        color: "#475569",
        fontSize: "13.5px",
        fontWeight: "600",
        verticalAlign: alignTop ? "top" : "middle",
        borderRight: "1px solid #f1f5f9",
      }}
    >
      {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
    </td>
    <td
      style={{
        padding: "12px 16px",
        verticalAlign: alignTop ? "top" : "middle",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {children}
      </div>
    </td>
  </tr>
);

// ── SHARED STYLES FOR FORMS ──────────────────────────────────────
const modernInputStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  width: "100%",
  fontSize: "13.5px",
  outline: "none",
  fontFamily: "var(--font)",
  color: "#0f172a",
  background: "#fff",
  transition: "border-color 0.2s ease",
};

const modernSelectStyle = {
  ...modernInputStyle,
  appearance: "none",
  background:
    "#fff url(\"data:image/svg+xml;utf8,<svg fill='%2364748b' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\") no-repeat right 10px center",
  backgroundSize: "20px",
  paddingRight: "36px",
};

// ── COMPONENT RIWAYAT PINJAM ──────────────────────────────────────
function AssetHistoryTab({ assetCode, allBorrows }) {
  const [snFilter, setSnFilter] = useState("all");

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

  const availableSNs = useMemo(() => {
    const sns = new Set();
    history.forEach(h => { if (h.serial_number) sns.add(h.serial_number); });
    return Array.from(sns);
  }, [history]);

  const allEvents = useMemo(() => {
    const events = [];
    history.forEach(h => {
      // Event Pinjam
      events.push({
        id: `${h.id}-borrow`,
        type: "PINJAM",
        serial_number: h.serial_number,
        date: h.borrow_date,
        person: h.performed_by_name,
        branch: h.performed_by_branch,
        location: `${h.from_zone} → ${h.to_zone}`,
        condition: h.condition,
        notes: h.reason,
        timestamp: new Date(h.borrow_date).getTime()
      });
      // Event Kembali
      if (h.is_returned) {
        events.push({
          id: `${h.id}-return`,
          type: "KEMBALI",
          serial_number: h.serial_number,
          date: h.return_date,
          person: h.returned_by_name || h.performed_by_name,
          branch: h.performed_by_branch,
          location: `${h.to_zone} → ${h.from_zone}`,
          condition: h.return_condition,
          notes: h.return_notes,
          timestamp: new Date(h.return_date).getTime()
        });
      }
    });
    return events.sort((a, b) => a.timestamp - b.timestamp);
  }, [history]);

  const filteredEvents = useMemo(() => {
    if (snFilter === "all") return allEvents;
    return allEvents.filter(e => e.serial_number === snFilter);
  }, [allEvents, snFilter]);

  if (history.length === 0)
    return (
      <div
        className="hist-empty"
        style={{
          padding: "40px 0",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
        }}
      >
        <span className="hist-empty-ico">
          <Icon.ClipboardEmpty />
        </span>
        <span className="hist-empty-title">Belum Ada Riwayat</span>
        <span className="hist-empty-sub">
          Barang ini belum pernah dipinjam sebelumnya.
        </span>
      </div>
    );

  return (
    <div
      className="hist-wrap"
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        className="hist-summary-row"
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "16px",
          background: "#f8fafc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <span className="hist-summary-pill hist-pill-total">
            {history.length}x Transaksi
          </span>
          <span className="hist-summary-pill hist-pill-returned">
            {history.filter((h) => h.is_returned).length}x Dikembalikan
          </span>
          {history.some((h) => !h.is_returned) && (
            <span className="hist-summary-pill hist-pill-active">
              {history.filter(h => !h.is_returned).length} Dipinjam
            </span>
          )}
        </div>

        {availableSNs.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Filter Unit:</span>
            <select
              value={snFilter}
              onChange={(e) => setSnFilter(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "12.5px",
                background: "#fff",
                color: "#1e293b",
                outline: "none"
              }}
            >
              <option value="all">Semua Unit</option>
              {availableSNs.map(sn => (
                <option key={sn} value={sn}>{sn}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="hist-table-wrap" style={{ overflowX: "auto" }}>
        <table
          className="hist-table"
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
            minWidth: "1000px"
          }}
        >
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#f7faffff", borderBottom: "1px solid #e2e8f0", width: "50px" }}>NO</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#f7faffff", borderBottom: "1px solid #e2e8f0" }}>AKSI</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#f7faffff", borderBottom: "1px solid #e2e8f0" }}>UNIT / SERIAL NUMBER</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#f7faffff", borderBottom: "1px solid #e2e8f0" }}>PEMINJAM</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#f7faffff", borderBottom: "1px solid #e2e8f0" }}>LOKASI</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#f7faffff", borderBottom: "1px solid #e2e8f0" }}>WAKTU</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#f7faffff", borderBottom: "1px solid #e2e8f0" }}>KONDISI</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#f7faffff", borderBottom: "1px solid #e2e8f0" }}>CATATAN</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((e, idx) => {
              const cond = conditionConfig[e.condition] || conditionConfig.GOOD;

              return (
                <tr
                  key={e.id}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    background: e.type === "PINJAM" ? "#f0fdf4" : "#fff",
                  }}
                >
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#94a3b8", fontWeight: "bold" }}>
                    {idx + 1}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: "bold",
                      background: e.type === "PINJAM" ? "#dbeafe" : "#f1f5f9",
                      color: e.type === "PINJAM" ? "#2563eb" : "#64748b",
                      border: e.type === "PINJAM" ? "1px solid #bfdbfe" : "1px solid #e2e8f0"
                    }}>
                      {e.type}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13.5px", color: "#1e293b", fontWeight: "600" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Icon.Box /> {e.serial_number || "—"}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%", background: "#e2e8f0",
                        color: "#475569", display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: "bold", fontSize: "11px"
                      }}>
                        {e.person.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b" }}>{e.person}</div>
                        <div style={{ fontSize: "10px", color: "#64748b" }}>{e.branch}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12.5px", color: "#475569" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Icon.MapPin /> {e.location}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#475569" }}>
                    {fmtDate(e.date)}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: cond.bg, color: cond.color, fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "4px" }}>
                      {cond.label}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#64748b", maxWidth: "250px", whiteSpace: "normal", lineHeight: "1.4" }}>
                    {e.notes || "—"}
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
      <div className="photo-preview-wrap" style={{ margin: 0 }}>
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
      style={{
        maxWidth: "400px",
        margin: 0,
        minHeight: "140px",
        padding: "20px",
      }}
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
      <div className="photo-upload-title">Upload Foto Barang</div>
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
      {isOpex ? "OPEX" : "CAPEX"}
    </span>
  );
}

// ── PAGE WRAPPER ──────────────────────────────────────────────────
// Dipindahkan ke luar komponen utama agar tidak re-render/hilang fokus saat mengetik
const PageWrapper = ({ title, onBack, children, actions }) => (
  <div
    className="view-asset-wrapper"
    style={{ animation: "fadeIn 0.25s ease" }}
  >
    <div
      className="view-header"
      style={{
        marginBottom: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "16px 24px",
        borderRadius: "16px",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        border: "1px solid #f1f5f9",
      }}
    >
      <div
        className="view-header-left"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "700",
            color: "#334155",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <Icon.ChevronLeft /> Kembali
        </button>
        <div>
          <h1
            className="view-title"
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            {title}
          </h1>
        </div>
      </div>
      {actions && <div style={{ display: "flex", gap: "12px" }}>{actions}</div>}
    </div>
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
        border: "1px solid #e2e8f0",
      }}
    >
      {children}
    </div>
  </div>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────
const ViewAsset = () => {
  const [assets, setAssets] = useState([
    {
      id: "CCTV-24BLW-001",
      name: "CCTV Hikvision DS-2CD2143G2-I",
      category: "CCTV",
      tipeAset: "Hikvision DS-2CD2143G2-I",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Belawan",
      zona: "LPG",
      subzona: "DMG",
      value: 6000000,
      id_pekerjaan: 1,
      quantity: 2,
      units: [
        { serialNumber: "SN-CCTV-001", location: "Area Dermaga - Tiang 1" },
        { serialNumber: "SN-CCTV-002", location: "Pos Security - Gerbang Utama" },
      ],
      photo: null,
      specs: [
        { spec_label: "Resolusi", value: "4", default_unit: "MP" },
        { spec_label: "Lensa", value: "2.8", default_unit: "mm" },
        { spec_label: "Night Vision", value: "30", default_unit: "m" },
        { spec_label: "IP Rating", value: "IP67", default_unit: "" },
      ],
      customSpecs: [],
    },
    {
      id: "ALAT-25DMI-001",
      name: "Excavator CAT 336",
      category: "Alat Berat",
      status: "Maintenance",
      entitas: "Pelindo Multi Terminal",
      branch: "Dumai",
      zona: "GDG",
      subzona: "DMG",
      value: 1200000000,
      id_pekerjaan: 3,
      quantity: 1,
      units: [
        { serialNumber: "SN-EXC-336-01", location: "Gudang Dumai - Sektor A" },
      ],
      photo: null,
      specs: [
        { spec_label: "Nomor Mesin", value: "C9.3B-2024", default_unit: "" },
        { spec_label: "Kapasitas Angkat", value: "36", default_unit: "ton" },
        { spec_label: "Daya Mesin", value: "270", default_unit: "kW" },
        { spec_label: "Tahun Pembuatan", value: "2025", default_unit: "tahun" },
      ],
      customSpecs: [{ spec_label: "Jam Kerja Saat Ini", value: "1240", default_unit: "jam" }],
    },
    {
      id: "SRV-25LHK-001",
      name: "Server Dell PowerEdge R740",
      category: "Server",
      tipeAset: "Dell PowerEdge R740",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Lhokseumawe",
      zona: "DTC",
      subzona: "PKR",
      value: 180000000,
      id_pekerjaan: 5,
      quantity: 2,
      units: [
        { serialNumber: "SN-DELL-R740-01", location: "Data Center Lhokseumawe" },
        { serialNumber: "SN-DELL-R740-02", location: "Lantai 3 - Ruang Server Cadangan" },
      ],
      photo: null,
      specs: [
        { spec_label: "Processor (CPU)", value: "2x Intel Xeon Gold 6230R", default_unit: "" },
        { spec_label: "RAM", value: "128", default_unit: "GB RAM" },
        { spec_label: "Storage", value: "4", default_unit: "TB" },
        { spec_label: "Operating System", value: "Windows Server 2022", default_unit: "" },
      ],
      customSpecs: [{ spec_label: "Slot GPU", value: "2x PCIe 3.0 x16", default_unit: "" }, { spec_label: "PSU", value: "750", default_unit: "W" }],
    },
    {
      id: "KND-24BLW-001",
      name: "Toyota Hilux Pickup",
      category: "Kendaraan",
      status: "Dipinjam",
      entitas: "Pelindo Multi Terminal",
      branch: "Belawan",
      zona: "LPG",
      subzona: "PKR",
      value: 350000000,
      id_pekerjaan: "OPEX-5",
      quantity: 1,
      units: [
        { serialNumber: "BK 1234 ZZ", location: "Pool Kendaraan Belawan" },
      ],
      photo: null,
      specs: [
        { spec_label: "Plat Nomor", value: "BK 1234 ZZ", default_unit: "" },
        { spec_label: "Nomor Mesin", value: "1GD-0045221", default_unit: "" },
        { spec_label: "Tahun Pembuatan", value: "2024", default_unit: "tahun" },
        { spec_label: "Kapasitas Mesin", value: "2755", default_unit: "cc" },
      ],
      customSpecs: [{ spec_label: "Warna", value: "Silver Metallic", default_unit: "" }],
    },
    {
      id: "FURN-26TJP-001",
      name: "Meja Kerja Direktori",
      category: "Furniture",
      status: "Tersedia",
      entitas: "PT Pelabuhan Indonesia",
      branch: "Tanjung Priok",
      zona: "GDG",
      subzona: "DMG",
      value: 8500000,
      id_pekerjaan: "OPEX-3",
      quantity: 2,
      units: [
        { serialNumber: "SN-MEJA-001", location: "Ruang Direksi - Lantai 2" },
        { serialNumber: "SN-MEJA-002", location: "Lantai 4 - Ruang Staff" },
      ],
      photo: null,
      specs: [
        { spec_label: "Bahan Material", value: "MDF + Veneer Kayu Jati", default_unit: "" },
        { spec_label: "Panjang", value: "180", default_unit: "cm" },
        { spec_label: "Lebar", value: "80", default_unit: "cm" },
        { spec_label: "Tinggi", value: "75", default_unit: "cm" },
        { spec_label: "Warna Dominan", value: "Cokelat Walnut", default_unit: "" },
      ],
      customSpecs: [],
    },
    {
      id: "SWT-25MLH-001",
      name: "Switch Cisco Catalyst 9300L",
      category: "Switch",
      tipeAset: "Cisco Catalyst 9300L",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Malahayati",
      zona: "DTC",
      subzona: "PKR",
      value: 45000000,
      id_pekerjaan: 4,
      quantity: 2,
      units: [
        { serialNumber: "SN-CISCO-9300-01", location: "Data Center Utama" },
        { serialNumber: "SN-CISCO-9300-02", location: "Lantai 2 - Ruang IT" },
      ],
      photo: null,
      specs: [
        { spec_label: "Processor (CPU)", value: "1.0", default_unit: "GHz" },
        { spec_label: "RAM", value: "256", default_unit: "MB RAM" },
        { spec_label: "Storage", value: "128", default_unit: "MB" },
        { spec_label: "Operating System", value: "Cisco IOS 15.2", default_unit: "" },
      ],
      customSpecs: [{ spec_label: "Jumlah Port", value: "48x GE + 4x SFP+", default_unit: "" }, { spec_label: "PoE Budget", value: "740", default_unit: "W" }],
    },
  ]);

  // Routing State
  const [currentView, setCurrentView] = useState("list");
  const [viewMode, setViewMode] = useState("table");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [barcodeReturnView, setBarcodeReturnView] = useState("list");

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailTab, setDetailTab] = useState("info");

  const [editPhoto, setEditPhoto] = useState(null);
  const [editData, setEditData] = useState({});
  const [editSpecsData, setEditSpecsData] = useState({
    specs: [],
    customSpecs: [],
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterAnggaran, setFilterAnggaran] = useState("");
  const [filterProject, setFilterProject] = useState("");

  const [formPhoto, setFormPhoto] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    assetId: "",
    cekEksisting: "",
    name: "",
    tipeAset: "",
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
    quantity: 1,
    units: [{ serialNumber: "", location: "" }],
  });
  const [templateSpecs, setTemplateSpecs] = useState([]);
  const [customSpecs, setCustomSpecs] = useState([]);
  const [isEditingUnit, setIsEditingUnit] = useState({});

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

  useEffect(() => {
    setIsEditingUnit({});
  }, [currentView]);

  // Pemetaan Prefix berdasarkan Kategori
  const CATEGORY_PREFIX = {
    "Laptop": "LAP",
    "CCTV": "CCTV",
    "Router": "RTR",
    "PC Desktop": "PC",
    "Server": "SRV",
    "Switch": "SWT",
    "Printer": "PRN",
    "Kendaraan": "KND",
    "Alat Berat": "ALAT",
    "Furniture": "FURN",
    "Lainnya": "BRG"
  };

  // Otomatis generate ID saat Kategori dan Nama Barang sudah diisi
  useEffect(() => {
    if (currentView === "add") {
      if (formData.category && formData.tipeAset) {
        const prefix = `${CATEGORY_PREFIX[formData.category] || "BRG"}-`;

        // Cari angka terbesar khusus untuk prefix kategori ini
        const maxId = assets.reduce((max, a) => {
          if (a.id.startsWith(prefix)) {
            const part = a.id.split("-").pop();
            const num = parseInt(part, 10);
            return isNaN(num) ? max : Math.max(max, num);
          }
          return max;
        }, 0);

        const nextId = `${prefix}${String(maxId + 1).padStart(4, "0")}`;

        // Hanya update jika ID belum ada atau prefix-nya berubah (ganti kategori)
        if (!formData.assetId || !formData.assetId.startsWith(prefix)) {
          setFormData((prev) => ({ ...prev, assetId: nextId }));
        }
      } else if (formData.assetId) {
        setFormData((prev) => ({ ...prev, assetId: "" }));
      }
    }
  }, [currentView, assets, formData.category, formData.tipeAset, formData.assetId]);

  const kpi = useMemo(
    () => ({
      total: assets.length,
      tersedia: assets.filter((a) => a.status === "Tersedia").length,
      maintenance: assets.filter((a) => a.status === "Maintenance").length,
      dipinjam: assets.filter((a) => a.status === "Dipinjam").length,
      totalNilai: assets.reduce((s, a) => s + ((a.value || 0) * (a.quantity || 1)), 0),
    }),
    [assets],
  );

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
          (!filterAnggaran || proj?.kd_anggaran === filterAnggaran) &&
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

  const canGenerate = true;

  const handleGenerateCode = () => {
    const prefix = "BRG-";
    const nums = assets
      .filter((a) => a.id.startsWith(prefix))
      .map((a) => {
        const n = parseInt(a.id.slice(prefix.length), 10);
        return isNaN(n) ? 0 : n;
      });
    const nextNum = String((nums.length > 0 ? Math.max(...nums) : 0) + 1).padStart(4, "0");
    const generated = `${prefix}${nextNum}`;
    setFormData((p) => ({ ...p, assetId: generated }));
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
    const tpl = SPEC_TEMPLATES_BY_CATEGORY[category] || [];
    setTemplateSpecs(tpl.map((t) => ({ ...t, value: "", _unitMode: "pick" })));
  };

  const resetForm = () => {
    setFormData({
      assetId: "",
      cekEksisting: "",
      name: "",
      tipeAset: "",
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
      quantity: 1,
      units: [{ serialNumber: "", location: "" }],
    });
    setTemplateSpecs([]);
    setCustomSpecs([]);
    setFormPhoto(null);
  };

  const handleQuantityChange = (val) => {
    const qty = Math.max(1, parseInt(val) || 1);
    setFormData((prev) => {
      let newUnits = [...prev.units];
      if (qty > newUnits.length) {
        for (let i = newUnits.length; i < qty; i++) {
          newUnits.push({ serialNumber: "", location: "" });
        }
      } else {
        newUnits = newUnits.slice(0, qty);
      }
      return { ...prev, quantity: qty, units: newUnits };
    });
  };

  const updateUnitField = (index, field, val) => {
    setFormData((prev) => {
      const newUnits = [...prev.units];
      newUnits[index] = { ...newUnits[index], [field]: val };
      return { ...prev, units: newUnits };
    });
  };

  const handleEditQuantityChange = (val) => {
    const qty = Math.max(1, parseInt(val) || 1);
    setEditData((prev) => {
      let newUnits = [...(prev.units || [])];
      if (qty > newUnits.length) {
        for (let i = newUnits.length; i < qty; i++) {
          newUnits.push({ serialNumber: "", location: "" });
        }
      } else {
        newUnits = newUnits.slice(0, qty);
      }
      return { ...prev, quantity: qty, units: newUnits };
    });
  };

  const updateEditUnitField = (index, field, val) => {
    setEditData((prev) => {
      const newUnits = [...(prev.units || [])];
      newUnits[index] = { ...newUnits[index], [field]: val };
      return { ...prev, units: newUnits };
    });
  };

  const handleSave = (goToBarcode = false) => {
    // ID akan di-generate otomatis jika masih kosong
    let startId = formData.assetId;
    const prefix = `${CATEGORY_PREFIX[formData.category] || "BRG"}-`;

    if (!startId) {
      const maxId = assets.reduce((max, a) => {
        if (a.id.startsWith(prefix)) {
          const part = a.id.split("-").pop();
          const num = parseInt(part, 10);
          return isNaN(num) ? max : Math.max(max, num);
        }
        return max;
      }, 0);
      startId = `${prefix}${String(maxId + 1).padStart(4, "0")}`;
    }

    const baseNum = parseInt(startId.split("-").pop(), 10);
    const idPrefix = startId.substring(0, startId.lastIndexOf("-") + 1);

    const groupedAsset = {
      id: startId,
      name: formData.name || formData.tipeAset || "-",
      category: formData.category,
      tipeAset: formData.tipeAset || formData.name || "-",
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
      quantity: formData.quantity,
      units: formData.units.map((unit) => ({
        serialNumber: unit.serialNumber,
        location: unit.location,
      })),
      photo: formPhoto,
      specs: templateSpecs.map(({ _unitMode, ...s }) => s),
      customSpecs: customSpecs.map(({ _unitMode, ...s }) => s),
    };

    setAssets([groupedAsset, ...assets]);
    if (goToBarcode) {
      setSelectedAsset(groupedAsset);
      setBarcodeReturnView("add");
      setCurrentView("barcode");
    } else {
      setCurrentView("list");
      resetForm();
    }
  };

  const handlePreviewBarcode = () => {
    const tempAsset = {
      id: formData.assetId,
      name: formData.tipeAset || formData.name || "-",
      category: formData.category,
      tipeAset: formData.tipeAset || formData.name || "-",
      status: formData.status,
      branch: formData.branch,
      zona: formData.zonaCode,
      subzona: formData.subzonaCode,
      units: formData.units.map((unit) => ({
        serialNumber: unit.serialNumber,
        location: unit.location,
      })),
      photo: formPhoto,
      specs: templateSpecs.map(({ _unitMode, ...s }) => s),
      customSpecs: customSpecs.map(({ _unitMode, ...s }) => s),
    };
    setSelectedAsset(tempAsset);
    setBarcodeReturnView("add");
    setCurrentView("barcode");
  };

  const handleDelete = () => {
    setAssets(assets.filter((a) => a.id !== selectedAsset.id));
    setCurrentView("list");
    setSelectedAsset(null);
  };

  const openEditPage = (asset) => {
    setSelectedAsset(asset);
    const existingProj = ALL_PROJECTS.find(
      (p) => String(p.id_pekerjaan) === String(asset.id_pekerjaan),
    );
    setEditData({
      name: asset.name,
      category: asset.category,
      status: asset.status,
      value: asset.value,
      entitas: asset.entitas,
      branch: asset.branch,
      zona: asset.zona,
      subzona: asset.subzona,
      id_pekerjaan: asset.id_pekerjaan || "",
      quantity: asset.quantity || (asset.units ? asset.units.length : 1),
      units: asset.units
        ? asset.units.map((u) => ({ ...u }))
        : [
          {
            serialNumber: asset.serialNumber || "",
            location: asset.unitLocation || "",
          },
        ],
      thn_anggaran: existingProj?.thn_anggaran
        ? String(existingProj.thn_anggaran)
        : "",
      kd_anggaran: existingProj?.kd_anggaran || "",
    });
    setEditPhoto(asset.photo || null);

    setEditSpecsData({
      specs: (asset.specs || []).map((s) => ({ ...s, _unitMode: "pick" })),
      customSpecs: (asset.customSpecs || []).map((s) => ({
        ...s,
        _unitMode: "pick",
      })),
    });

    setCurrentView("edit");
  };

  const handleSaveEdit = () => {
    const resolvedId =
      editData.id_pekerjaan ||
      (editData.kd_anggaran
        ? OPEX_ANGGARAN.find((o) => o.kd_anggaran === editData.kd_anggaran)
          ?.id_pekerjaan || null
        : null);
    const cleanSpecs = editSpecsData.specs.map(({ _unitMode, ...s }) => s);
    const cleanCustom = editSpecsData.customSpecs.map(
      ({ _unitMode, ...s }) => s,
    );

    const saveData = { ...editData, id_pekerjaan: resolvedId };
    const updated = assets.map((a) =>
      a.id === selectedAsset.id
        ? {
          ...a,
          ...saveData,
          value: parseFloat(editData.value) || 0,
          photo: editPhoto,
          specs: cleanSpecs,
          customSpecs: cleanCustom,
        }
        : a,
    );
    setAssets(updated);
    setSelectedAsset((prev) => ({
      ...prev,
      ...saveData,
      value: parseFloat(editData.value) || 0,
      photo: editPhoto,
      specs: cleanSpecs,
      customSpecs: cleanCustom,
    }));
    setCurrentView("list");
  };

  const handleExport = () => {
    const headers = [
      "ID Barang",
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

  const handlePrintBarcode = () => {
    const asset = selectedAsset;
    const units = asset.units && asset.units.length > 0 ? asset.units : [{ serialNumber: asset.id }];

    const w = window.open("", "_blank", "width=800,height=800");
    let html = `<!DOCTYPE html><html><head><title>Print Barcodes — ${asset.name}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Courier New',monospace;background:#fff;padding:20px}
  .label-container{display:flex;flex-direction:column;gap:30px;align-items:center}
  .label{width:360px;background:#fff;border:2.5px solid #111;border-radius:10px;padding:18px 20px;page-break-inside:avoid}
  .lh{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid #111;padding-bottom:10px;margin-bottom:10px}
  .lbrand{font-size:16px;font-weight:900;letter-spacing:3px;color:#000}
  .lsub{font-size:8px;font-weight:700;color:#555;letter-spacing:1.5px;margin-top:2px}
  .lstatus{border:1.5px solid #000;border-radius:4px;padding:3px 8px;font-size:8px;font-weight:900;letter-spacing:1px;text-transform:uppercase}
  .lname{font-size:14px;font-weight:800;margin:8px 0 3px;color:#000;font-family:sans-serif}
  .lid{font-size:10px;font-weight:700;color:#444;letter-spacing:.5px;margin-bottom:10px}
  .lbar{text-align:center;border-top:1px dashed #ddd;border-bottom:1px dashed #ddd;padding:6px 0;margin:8px 0}
  .lmeta{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px;border-top:1px solid #eee;padding-top:8px}
  .mi label{display:block;font-size:7.5px;color:#888;text-transform:uppercase;letter-spacing:.4px;margin-bottom:1px}
  .mi span{font-size:9.5px;font-weight:700;color:#111}
  .lfoot{text-align:center;margin-top:10px;font-size:7px;color:#aaa;letter-spacing:.5px;border-top:1px dashed #ddd;padding-top:7px;text-transform:uppercase}
  @media print{body{padding:0}.label{box-shadow:none;margin-bottom:20px}}
</style></head><body><div class="label-container">`;

    units.forEach((u) => {
      const barcodeVal = u.serialNumber || asset.id;
      const canvas = document.createElement("canvas");
      const bars = C128.encode(barcodeVal);
      const width = 340;
      const height = 64;
      const bw = Math.max(1, Math.floor(width / bars.length));
      canvas.width = bw * bars.length;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
      for (let i = 0; i < bars.length; i++) {
        if (bars[i] === "1") ctx.fillRect(i * bw, 0, bw, height);
      }
      const base64Barcode = canvas.toDataURL("image/png");

      html += `
<div class="label">
  <div class="lh"><div><div class="lbrand">PELINDO</div><div class="lsub">ASSET MANAGEMENT SYSTEM</div></div><span class="lstatus">${asset.status}</span></div>
  <div class="lname">${asset.name}</div>
  <div class="lid">${barcodeVal}</div>
  <div class="lbar"><img src="${base64Barcode}" style="width:100%;height:auto;image-rendering:pixelated;" /></div>
  <div class="lmeta">
    <div class="mi"><label>Entitas</label><span>${asset.entitas || "—"}</span></div>
    <div class="mi"><label>Cabang</label><span>${asset.branch}</span></div>
    <div class="mi"><label>Zona · Subz</label><span>${asset.zona}/${asset.subzona}</span></div>
    <div class="mi"><label>Aset ID</label><span>${asset.id}</span></div>
  </div>
  <div class="lfoot">SCAN UNTUK PEMINJAMAN · ${new Date().getFullYear()}</div>
</div>`;
    });

    html += `</div><script>setTimeout(()=>{window.print();window.close();},600);</script></body></html>`;
    w.document.write(html);
    w.document.close();
  };

  // ── RENDER LIST VIEW (TAMPILAN AWAL - TIDAK DIUBAH) ─────────────
  const renderListView = () => {
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
    const filterAnggaranCapexEntry = filterAnggaran
      ? CAPEX_ANGGARAN.find((a) => a.kd_anggaran === filterAnggaran)
      : null;

    return (
      <div className="view-asset-wrapper">
        <div className="view-header">
          <div className="view-header-left">
            <div className="view-header-icon">
              <Icon.Inventory />
            </div>
            <div>
              <h1 className="view-title">List Barang</h1>
              <p className="view-subtitle">
                <Icon.Shield /> Super Admin Access · {assets.length} total barang
                terdaftar
              </p>
            </div>
          </div>
          <button
            className="add-asset-btn"
            onClick={() => setCurrentView("add")}
          >
            <Icon.Plus /> Tambah Barang Baru
          </button>
        </div>

        <div className="kpi-grid">
          {[
            {
              cls: "kpi-total",
              icon: <Icon.Layers />,
              val: kpi.total,
              lbl: "Total Barang",
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
              lbl: "Total Nilai Barang",
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

        <div className="table-controls">
          <div className="search-box">
            <span className="search-icon">
              <Icon.Search />
            </span>
            <input
              type="text"
              placeholder="Cari ID barang, nama, atau branch..."
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

        {showFilterPanel && (
          <div className="filter-panel">
            <div className="filter-panel-grid">
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
              <div className="filter-group">
                <label>Nama Anggaran</label>
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
                      <span style={{ opacity: 0.7 }}>↳</span> Nama Pekerjaan
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
                          setCurrentView("detail");
                          setDetailTab("info");
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
                          <div className="asset-card-status" style={{ display: "none" }}>
                            <span
                              className={`status-badge ${statusClass(asset.status)}`}
                            >
                              {asset.status}
                            </span>
                          </div>
                        </div>
                        <div className="asset-card-body">
                          <code className="asset-card-id">{asset.id}</code>
                          <div className="asset-card-name">{asset.name}</div>
                          <div className="asset-card-meta">
                            <span className="cat-badge">{asset.category}</span>
                            <span 
                              style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                color: "#0f172a",
                                background: "#f1f5f9",
                                padding: "2px 8px",
                                borderRadius: "4px",
                              }}
                            >
                              {asset.quantity || (asset.units ? asset.units.length : 1)} Unit
                            </span>
                          </div>
                        </div>
                        <div className="asset-card-footer" style={{ flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                          <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "600" }}>HARGA SATUAN: {fmt(asset.value)}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                            <span className="asset-card-value">
                              {fmt(asset.value * (asset.quantity || 1))}
                            </span>
                            <div
                              className="asset-card-actions"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="card-action-btn"
                                onClick={() => {
                                  setSelectedAsset(asset);
                                  setCurrentView("barcode");
                                }}
                              >
                                <Icon.Barcode />
                              </button>
                              <button
                                className="card-action-btn danger"
                                onClick={() => {
                                  setSelectedAsset(asset);
                                  setCurrentView("delete");
                                }}
                              >
                                <Icon.Trash />
                              </button>
                            </div>
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
                  <th>ID BARANG</th>
                  <th>NAMA BARANG</th>
                  <th>KATEGORI</th>
                  <th>KUANTITAS</th>
                  <th>TOTAL NILAI</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        <div className="empty-state-icon">
                          <Icon.BoxOpen />
                        </div>
                        <div className="empty-state-title">
                          Tidak ada barang ditemukan
                        </div>
                        <div className="empty-state-sub">
                          {activeFiltersCount > 0 || search
                            ? "Coba ubah kata kunci atau reset filter."
                            : 'Belum ada barang. Klik "Tambah Barang Baru" untuk mulai.'}
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
                          setCurrentView("detail");
                          setDetailTab("info");
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
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="cat-badge">{asset.category}</span>
                        </td>
                        <td>
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "700",
                              color: "#0f172a",
                              background: "#f1f5f9",
                              padding: "4px 10px",
                              borderRadius: "6px",
                            }}
                          >
                            {asset.quantity || (asset.units ? asset.units.length : 1)}
                          </span>
                        </td>
                        <td className="fw-bold">{fmt(asset.value * (asset.quantity || 1))}</td>
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
                                    setCurrentView("detail");
                                    setDetailTab("info");
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <Icon.Eye /> Lihat Detail
                                </button>
                                <button
                                  className="action-history"
                                  onClick={() => {
                                    setSelectedAsset(asset);
                                    setCurrentView("detail");
                                    setDetailTab("history");
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <Icon.History /> Riwayat Pinjam
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedAsset(asset);
                                    setCurrentView("barcode");
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <Icon.Barcode /> Cetak Barcode
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    openEditPage(asset);
                                  }}
                                >
                                  <Icon.Edit /> Edit Barang
                                </button>
                                <button
                                  className="action-delete"
                                  onClick={() => {
                                    setSelectedAsset(asset);
                                    setCurrentView("delete");
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
      </div>
    );
  };

  // ── RENDER ADD PAGE ─────────────────────────────────────────────
  const renderAddPage = () => {
    const isAddValid =
      formData.category &&
      formData.tipeAset &&
      formData.units.every((u) => u.serialNumber.trim() !== "") &&
      templateSpecs.length > 0 &&
      templateSpecs.every((s) => s.value && s.value.toString().trim() !== "");

    return (
      <PageWrapper
        title="Input Data Barang Baru"
        onBack={() => setCurrentView("list")}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "15px",
              color: "#0f172a",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icon.Tag /> Informasi Utama
          </h3>
          <ModernTable>
            <TableRow label="Cek Eksisting (Opsional)">
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Ketik untuk mencari dari entry sebelumnya..."
                  value={formData.cekEksisting}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      const currentCat = formData.category;
                      setFormData((prev) => ({
                        assetId: "",
                        cekEksisting: "",
                        name: "",
                        tipeAset: "",
                        entitas: prev.entitas,
                        entitasCode: prev.entitasCode,
                        branch: prev.branch,
                        branchCode: prev.branchCode,
                        zona: prev.zona,
                        zonaCode: prev.zonaCode,
                        subzona: prev.subzona,
                        subzonaCode: prev.subzonaCode,
                        nomorAset: "",
                        category: currentCat || "",
                        status: "Tersedia",
                        condition: "Baik",
                        value: "",
                        id_pekerjaan: "",
                        thn_anggaran: "",
                        kd_anggaran: "",
                        quantity: 1,
                        units: [{ serialNumber: "", location: "" }],
                      }));
                      if (currentCat) {
                        const tpl = SPEC_TEMPLATES_BY_CATEGORY[currentCat] || [];
                        setTemplateSpecs(tpl.map((t) => ({ ...t, value: "", _unitMode: "pick" })));
                      } else {
                        setTemplateSpecs([]);
                      }
                      setCustomSpecs([]);
                      setFormPhoto(null);
                    } else {
                      setFormData((p) => ({ ...p, cekEksisting: val }));
                      setShowSuggestions(true);
                    }
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  style={modernInputStyle}
                />
                {showSuggestions && formData.cekEksisting && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      marginTop: "4px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 10,
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    {assets
                      .filter((a, index, self) =>
                        (a.name || a.tipeAset || "")
                          .toLowerCase()
                          .includes(formData.cekEksisting.toLowerCase()) &&
                        self.findIndex(t => (t.tipeAset || t.name) === (a.tipeAset || a.name)) === index
                      )
                      .map((a) => (
                        <div
                          key={a.id}
                          style={{
                            padding: "8px 12px",
                            cursor: "pointer",
                            borderBottom: "1px solid #f1f5f9",
                            fontSize: "14px",
                            color: "#334155",
                          }}
                          onMouseDown={() => {
                            const eCode = a.id ? a.id.split("-")[0] : "";
                            const bCode = a.id ? a.id.split("-")[1] : "";
                            const zCode = a.id ? a.id.split("-")[2] : "";
                            const szCode = a.id ? a.id.split("-")[3] : "";
                            const zonaName = ZONA_LIST.find((z) => z.code === zCode)?.name || "";
                            const subzonaName = SUBZONA_LIST.find((s) => s.code === szCode)?.name || "";

                            setFormData((p) => ({
                              ...p,
                              cekEksisting: a.tipeAset || a.name || "",
                              category: a.category || "",
                              tipeAset: a.tipeAset || a.name || "",
                              entitas: a.entitas || "",
                              entitasCode: eCode,
                              branch: a.branch || "",
                              branchCode: bCode,
                              zona: zonaName,
                              zonaCode: zCode,
                              subzona: subzonaName,
                              subzonaCode: szCode,
                              value: a.value || "",
                              id_pekerjaan: a.id_pekerjaan || "",
                              units: a.units && a.units.length > 0
                                ? a.units.map(u => ({ serialNumber: u.serialNumber, location: u.location }))
                                : [{ serialNumber: "", location: "" }],
                              quantity: a.quantity || (a.units ? a.units.length : 1),
                            }));
                            const tpl = a.specs
                              ? a.specs.map((t) => ({ ...t, _unitMode: "pick" }))
                              : (SPEC_TEMPLATES_BY_CATEGORY[a.category] || []).map(
                                (t) => ({ ...t, value: "", _unitMode: "pick" })
                              );
                            setTemplateSpecs(tpl);
                            setShowSuggestions(false);
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f8fafc")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          {a.tipeAset || a.name} - {a.category}
                        </div>
                      ))}
                    {assets.filter((a) =>
                      (a.name || a.tipeAset || "")
                        .toLowerCase()
                        .includes(formData.cekEksisting.toLowerCase())
                    ).length === 0 && (
                        <div
                          style={{
                            padding: "8px 12px",
                            fontSize: "14px",
                            color: "#94a3b8",
                          }}
                        >
                          Tidak ada data yang cocok
                        </div>
                      )}
                  </div>
                )}
              </div>
            </TableRow>
            <TableRow label="Kategori" required>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                style={modernSelectStyle}
              >
                <option value="">— Pilih Kategori —</option>
                <option value="Laptop">Laptop</option>
                <option value="CCTV">CCTV</option>
                <option value="Router">Router</option>
                <option value="PC Desktop">PC Desktop</option>
                <option value="Server">Server</option>
                <option value="Switch">Switch</option>
                <option value="Printer">Printer</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Alat Berat">Alat Berat</option>
                <option value="Furniture">Furniture</option>
                <option value="Lainnya">IT Lainnya</option>
              </select>
            </TableRow>
            <TableRow label="Nama Barang" required>
              <input
                type="text"
                placeholder="Contoh: ThinkPad T14, DS-2CD..."
                value={formData.tipeAset}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, tipeAset: e.target.value }))
                }
                style={modernInputStyle}
              />
            </TableRow>
            <TableRow label="ID Barang (Mulai)">
              <input
                type="text"
                readOnly
                value={formData.assetId}
                placeholder="ID akan dibuat otomatis oleh sistem"
                style={{
                  ...modernInputStyle,
                  flex: 1,
                  background: "#f8fafc",
                  color: "#64748b",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              />
            </TableRow>
            <TableRow label="Kuantitas">
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", background: "#f1f5f9", padding: "6px 14px", borderRadius: "8px" }}>
                {formData.quantity} Unit barang
              </div>
            </TableRow>
          </ModernTable>

          <h3
            style={{
              fontSize: "15px",
              color: "#0f172a",
              marginBottom: "10px",
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icon.Layers /> Informasi Unit ({formData.quantity} Unit)
          </h3>
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f8fafc" }}>
                <tr>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontSize: "12px",
                      color: "#64748b",
                      borderBottom: "1px solid #e2e8f0",
                      width: "60px",
                    }}
                  >
                    NO
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontSize: "12px",
                      color: "#64748b",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    SERIAL NUMBER
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: "#64748b",
                      borderBottom: "1px solid #e2e8f0",
                      width: "100px",
                    }}
                  >
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.units.map((unit, idx) => {
                  const isExisting = formData.cekEksisting && !isEditingUnit[idx];
                  return (
                    <tr key={idx}>
                      <td
                        style={{
                          padding: "12px",
                          fontSize: "14px",
                          borderBottom: "1px solid #f1f5f9",
                          textAlign: "center",
                          color: "#94a3b8",
                          fontWeight: "bold",
                        }}
                      >
                        {idx + 1}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Contoh: SN-123456"
                          value={unit.serialNumber}
                          readOnly={isExisting}
                          onChange={(e) =>
                            updateUnitField(idx, "serialNumber", e.target.value)
                          }
                          style={{
                            ...modernInputStyle,
                            padding: "8px 12px",
                            fontSize: "13px",
                            background: isExisting ? "#f8fafc" : "#fff",
                            color: isExisting ? "#64748b" : "#0f172a",
                            border: isExisting ? "1px solid #e2e8f0" : "1px solid #cbd5e1",
                            cursor: isExisting ? "not-allowed" : "text",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom: "1px solid #f1f5f9",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                          <button
                            type="button"
                            onClick={() => setIsEditingUnit(p => ({ ...p, [idx]: !p[idx] }))}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "6px",
                              border: isEditingUnit[idx] ? "1.5px solid #64748b" : "1px solid #e2e8f0",
                              background: isEditingUnit[idx] ? "#f1f5f9" : "#f8fafc",
                              color: "#64748b",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s",
                              padding: 0,
                            }}
                            title="Edit Serial Number"
                          >
                            <Icon.Edit />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newUnits = formData.units.filter((_, i) => i !== idx);
                              setFormData(p => ({ ...p, units: newUnits, quantity: newUnits.length }));
                            }}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "6px",
                              border: "1px solid #e2e8f0",
                              background: "#f8fafc",
                              color: "#64748b",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s",
                              padding: 0,
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = "#f1f5f9"; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
                            title="Hapus Unit"
                          >
                            <Icon.Trash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
            <button
              type="button"
              onClick={() => {
                const newUnits = [...formData.units, { serialNumber: "", location: "" }];
                const newIdx = newUnits.length - 1;
                setIsEditingUnit(p => ({ ...p, [newIdx]: true }));
                setFormData(p => ({ ...p, units: newUnits, quantity: newUnits.length }));
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#0369a1",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#e0f2fe"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "#f0f9ff"; }}
            >
              <Icon.Plus /> Tambah Unit
            </button>
          </div>

          <h3
            style={{
              fontSize: "15px",
              color: "#0f172a",
              marginBottom: "10px",
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icon.PhotoSm /> Foto Barang
          </h3>
          <ModernTable>
            <TableRow label="Upload Foto" alignTop>
              <PhotoUpload value={formPhoto} onChange={setFormPhoto} />
            </TableRow>
          </ModernTable>

          <h3
            style={{
              fontSize: "15px",
              color: "#0f172a",
              marginBottom: "10px",
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icon.Cogs /> Spesifikasi & Atribut Tambahan
          </h3>
          <ModernTable>
            {!formData.category ? (
              <tr>
                <td
                  colSpan="2"
                  style={{
                    padding: "16px",
                    color: "#94a3b8",
                    fontSize: "13.5px",
                    textAlign: "center",
                  }}
                >
                  Pilih kategori di atas untuk memuat form spesifikasi.
                </td>
              </tr>
            ) : (
              <>
                {templateSpecs.map((spec, i) => (
                  <TableRow label={spec.spec_label} key={i}>
                    <input
                      type={spec.input_type === "number" ? "number" : "text"}
                      placeholder="Isi nilai..."
                      value={spec.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTemplateSpecs((prev) =>
                          prev.map((s, idx) =>
                            idx === i ? { ...s, value: val } : s,
                          ),
                        );
                      }}
                      style={{ ...modernInputStyle, flex: 2 }}
                    />
                    {spec._unitMode !== "custom" ? (
                      <select
                        value={spec.default_unit}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTemplateSpecs((prev) =>
                            prev.map((s, idx) =>
                              idx === i
                                ? {
                                  ...s,
                                  default_unit:
                                    val === "__custom__" ? "" : val,
                                  _unitMode:
                                    val === "__custom__" ? "custom" : "pick",
                                }
                                : s,
                            ),
                          );
                        }}
                        style={{
                          ...modernSelectStyle,
                          flex: 1,
                          background: "#f8fafc",
                        }}
                      >
                        <option value="">Satuan</option>
                        {SPEC_UNIT_OPTIONS.map((g) => (
                          <optgroup key={g.group} label={g.group}>
                            {g.units.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                        <option value="__custom__">✏ Ketik baru...</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder="Satuan..."
                        value={spec.default_unit}
                        autoFocus
                        onChange={(e) => {
                          const val = e.target.value;
                          setTemplateSpecs((prev) =>
                            prev.map((s, idx) =>
                              idx === i ? { ...s, default_unit: val } : s,
                            ),
                          );
                        }}
                        onBlur={() => {
                          if (!spec.default_unit)
                            setTemplateSpecs((prev) =>
                              prev.map((s, idx) =>
                                idx === i ? { ...s, _unitMode: "pick" } : s,
                              ),
                            );
                        }}
                        style={{
                          ...modernInputStyle,
                          flex: 1,
                          background: "#f0f9ff",
                          borderColor: "#bae6fd",
                        }}
                      />
                    )}
                  </TableRow>
                ))}

                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "16px",
                      background: "#f8fafc",
                      borderTop: "1px solid #e2e8f0",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13.5px",
                          fontWeight: "600",
                          color: "#475569",
                        }}
                      >
                        Atribut Tambahan (Opsional)
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setCustomSpecs([
                            ...customSpecs,
                            {
                              spec_label: "",
                              value: "",
                              default_unit: "",
                              input_type: "text",
                              _unitMode: "pick",
                            },
                          ])
                        }
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background: "#eff6ff",
                          color: "#2563eb",
                          border: "1px solid #bfdbfe",
                          fontSize: "12px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        + Tambah Atribut
                      </button>
                    </div>
                  </td>
                </tr>
                {customSpecs.map((spec, i) => (
                  <TableRow
                    key={`custom-${i}`}
                    alignTop
                    label={
                      <input
                        type="text"
                        placeholder="Nama Atribut..."
                        value={spec.spec_label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomSpecs((prev) =>
                            prev.map((s, idx) =>
                              idx === i ? { ...s, spec_label: val } : s,
                            ),
                          );
                        }}
                        style={{
                          ...modernInputStyle,
                          background: "#fff",
                          border: "1px dashed #cbd5e1",
                          padding: "6px 10px",
                        }}
                      />
                    }
                  >
                    <input
                      type="text"
                      placeholder="Nilai..."
                      value={spec.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomSpecs((prev) =>
                          prev.map((s, idx) =>
                            idx === i ? { ...s, value: val } : s,
                          ),
                        );
                      }}
                      style={{ ...modernInputStyle, flex: 2 }}
                    />

                    {spec._unitMode !== "custom" ? (
                      <select
                        value={spec.default_unit}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomSpecs((prev) =>
                            prev.map((s, idx) =>
                              idx === i
                                ? {
                                  ...s,
                                  default_unit:
                                    val === "__custom__" ? "" : val,
                                  _unitMode:
                                    val === "__custom__" ? "custom" : "pick",
                                }
                                : s,
                            ),
                          );
                        }}
                        style={{
                          ...modernSelectStyle,
                          flex: 1,
                          background: "#f8fafc",
                        }}
                      >
                        <option value="">Satuan</option>
                        {SPEC_UNIT_OPTIONS.map((g) => (
                          <optgroup key={g.group} label={g.group}>
                            {g.units.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                        <option value="__custom__">✏ Ketik baru...</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder="Satuan..."
                        value={spec.default_unit}
                        autoFocus
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomSpecs((prev) =>
                            prev.map((s, idx) =>
                              idx === i ? { ...s, default_unit: val } : s,
                            ),
                          );
                        }}
                        onBlur={() => {
                          if (!spec.default_unit)
                            setCustomSpecs((prev) =>
                              prev.map((s, idx) =>
                                idx === i ? { ...s, _unitMode: "pick" } : s,
                              ),
                            );
                        }}
                        style={{
                          ...modernInputStyle,
                          flex: 1,
                          background: "#f0f9ff",
                          borderColor: "#bae6fd",
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const n = [...customSpecs];
                        n.splice(i, 1);
                        setCustomSpecs(n);
                      }}
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        color: "#dc2626",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon.Trash />
                    </button>
                  </TableRow>
                ))}
              </>
            )}
          </ModernTable>

          {/* Button Simpan di Bawah Kanan */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
              paddingBottom: "40px",
              gap: "12px"
            }}
          >
            <button
              disabled={!isAddValid}
              onClick={handlePreviewBarcode}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "bold",
                background: isAddValid ? "#fff" : "#f1f5f9",
                border: isAddValid ? "1.5px solid #2563eb" : "1.5px solid #cbd5e1",
                color: isAddValid ? "#2563eb" : "#94a3b8",
                borderRadius: "10px",
                cursor: isAddValid ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: isAddValid ? 1 : 0.7
              }}
            >
              <Icon.Barcode /> Cetak Barcode Unit
            </button>
            <button
              className="btn-save"
              disabled={!isAddValid}
              onClick={() => handleSave(false)}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: isAddValid ? "" : "#94a3b8",
                cursor: isAddValid ? "pointer" : "not-allowed",
                opacity: isAddValid ? 1 : 0.7
              }}
            >
              <Icon.Save /> Simpan Barang Baru
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  };

  // ── RENDER EDIT PAGE ────────────────────────────────────────────
  const renderEditPage = () => {
    return (
      <PageWrapper
        title="Edit Data Barang"
        onBack={() => setCurrentView("list")}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "15px",
              color: "#0f172a",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icon.Tag /> Informasi Utama
          </h3>
          <ModernTable>
            <TableRow label="ID Barang">
              <span
                style={{
                  padding: "4px 10px",
                  background: "#e2e8f0",
                  borderRadius: "6px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  color: "#334155",
                }}
              >
                {selectedAsset.id}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  marginLeft: "12px",
                }}
              >
                (Kode Tidak dapat diubah)
              </span>
            </TableRow>
            <TableRow label="Nama Barang" required>
              <input
                type="text"
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, name: e.target.value }))
                }
                style={modernInputStyle}
              />
            </TableRow>
            <TableRow label="Harga Satuan" required>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span style={{ position: "absolute", left: "12px", color: "#64748b", fontWeight: "bold", fontSize: "14px" }}>Rp</span>
                <input
                  type="text"
                  placeholder="0"
                  value={editData.value ? new Intl.NumberFormat('id-ID').format(editData.value) : ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setEditData((p) => ({ ...p, value: val }));
                  }}
                  style={{ ...modernInputStyle, paddingLeft: "40px" }}
                />
              </div>
            </TableRow>
            <TableRow label="Kuantitas">
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", background: "#f1f5f9", padding: "6px 14px", borderRadius: "8px" }}>
                {editData.quantity} Unit barang
              </div>
            </TableRow>
            <TableRow label="Kategori" required>
              <select
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, category: e.target.value }))
                }
                style={modernSelectStyle}
              >
                <option value="">— Pilih Kategori —</option>
                <option value="Laptop">Laptop</option>
                <option value="CCTV">CCTV</option>
                <option value="Router">Router</option>
                <option value="PC Desktop">PC Desktop</option>
                <option value="Server">Server</option>
                <option value="Switch">Switch</option>
                <option value="Printer">Printer</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Alat Berat">Alat Berat</option>
                <option value="Furniture">Furniture</option>
                <option value="Lainnya">IT Lainnya</option>
              </select>
            </TableRow>
            <TableRow label="Status">
              <select
                value={editData.status || "Tersedia"}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, status: e.target.value }))
                }
                style={modernSelectStyle}
              >
                <option>Tersedia</option>
                <option>Dipinjam</option>
                <option>Maintenance</option>
              </select>
            </TableRow>
            <TableRow label="Tahun Anggaran" required>
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
                style={modernSelectStyle}
              >
                <option value="">— Pilih Tahun —</option>
                {ALL_TAHUN_LIST.map((t) => (
                  <option key={t} value={String(t)}>
                    {t}
                  </option>
                ))}
              </select>
            </TableRow>
            {editData.thn_anggaran && (
              <TableRow label="Nama Anggaran" required>
                <select
                  value={editData.kd_anggaran || ""}
                  onChange={(e) =>
                    setEditData((p) => ({
                      ...p,
                      kd_anggaran: e.target.value,
                      id_pekerjaan: "",
                    }))
                  }
                  style={modernSelectStyle}
                >
                  <option value="">— Pilih Anggaran —</option>
                  {getAnggaranByTahun(editData.thn_anggaran).filter(
                    (a) => a.jenis === "CAPEX",
                  ).length > 0 && (
                      <optgroup label="CAPEX">
                        {getAnggaranByTahun(editData.thn_anggaran)
                          .filter((a) => a.jenis === "CAPEX")
                          .map((a) => (
                            <option key={a.kd_anggaran} value={a.kd_anggaran}>
                              {a.nm_anggaran}
                            </option>
                          ))}
                      </optgroup>
                    )}
                  {getAnggaranByTahun(editData.thn_anggaran).filter(
                    (a) => a.jenis === "OPEX",
                  ).length > 0 && (
                      <optgroup label="OPEX">
                        {getAnggaranByTahun(editData.thn_anggaran)
                          .filter((a) => a.jenis === "OPEX")
                          .map((a) => (
                            <option key={a.kd_anggaran} value={a.kd_anggaran}>
                              {a.nm_anggaran}
                            </option>
                          ))}
                      </optgroup>
                    )}
                </select>
              </TableRow>
            )}
            {editData.kd_anggaran &&
              CAPEX_ANGGARAN.find(
                (a) => a.kd_anggaran === editData.kd_anggaran,
              ) && (
                <TableRow label="Nama Pekerjaan" required>
                  <select
                    value={editData.id_pekerjaan || ""}
                    onChange={(e) =>
                      setEditData((p) => ({
                        ...p,
                        id_pekerjaan: e.target.value,
                      }))
                    }
                    style={modernSelectStyle}
                  >
                    <option value="">— Pilih Pekerjaan —</option>
                    {CAPEX_ANGGARAN.find(
                      (a) => a.kd_anggaran === editData.kd_anggaran,
                    ).pekerjaan.map((p) => (
                      <option
                        key={p.id_pekerjaan}
                        value={String(p.id_pekerjaan)}
                      >
                        {p.nm_pekerjaan}
                      </option>
                    ))}
                  </select>
                </TableRow>
              )}
          </ModernTable>

          <h3
            style={{
              fontSize: "15px",
              color: "#0f172a",
              marginBottom: "10px",
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icon.Layers /> Informasi Unit ({editData.quantity} Unit)
          </h3>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f8fafc" }}>
                <tr>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "12px",
                      color: "#64748b",
                      borderBottom: "1px solid #e2e8f0",
                      width: "50px",
                    }}
                  >
                    NO
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "12px",
                      color: "#64748b",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    SERIAL NUMBER
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: "#64748b",
                      borderBottom: "1px solid #e2e8f0",
                      width: "100px",
                    }}
                  >
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {(editData.units || []).map((unit, i) => {
                  const isReadOnly = !isEditingUnit[i];
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "14px",
                          borderBottom: "1px solid #f1f5f9",
                          color: "#94a3b8",
                          fontWeight: "bold",
                        }}
                      >
                        {i + 1}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "14px",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <input
                          type="text"
                          value={unit.serialNumber}
                          readOnly={isReadOnly}
                          onChange={(e) =>
                            updateEditUnitField(i, "serialNumber", e.target.value)
                          }
                          placeholder="Masukkan Serial Number..."
                          style={{
                            ...modernInputStyle,
                            background: isReadOnly ? "#f8fafc" : "#fff",
                            color: isReadOnly ? "#64748b" : "#0f172a",
                            border: isReadOnly ? "1px solid #e2e8f0" : "1px solid #cbd5e1",
                            cursor: isReadOnly ? "not-allowed" : "text",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid #f1f5f9",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                          <button
                            type="button"
                            onClick={() => setIsEditingUnit(p => ({ ...p, [i]: !p[i] }))}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "6px",
                              border: isEditingUnit[i] ? "1.5px solid #64748b" : "1px solid #e2e8f0",
                              background: isEditingUnit[i] ? "#f1f5f9" : "#f8fafc",
                              color: "#64748b",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s",
                              padding: 0,
                            }}
                            title="Edit Serial Number"
                          >
                            <Icon.Edit />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newUnits = editData.units.filter((_, idx) => idx !== i);
                              setEditData(p => ({ ...p, units: newUnits, quantity: newUnits.length }));
                            }}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "6px",
                              border: "1px solid #e2e8f0",
                              background: "#f8fafc",
                              color: "#64748b",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s",
                              padding: 0,
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = "#f1f5f9"; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
                            title="Hapus Unit"
                          >
                            <Icon.Trash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
            <button
              type="button"
              onClick={() => {
                const newUnits = [...(editData.units || []), { serialNumber: "", location: "" }];
                const newIdx = newUnits.length - 1;
                setIsEditingUnit(p => ({ ...p, [newIdx]: true }));
                setEditData(p => ({ ...p, units: newUnits, quantity: newUnits.length }));
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#0369a1",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#e0f2fe"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "#f0f9ff"; }}
            >
              <Icon.Plus /> Tambah Unit
            </button>
          </div>

          <h3
            style={{
              fontSize: "15px",
              color: "#0f172a",
              marginBottom: "10px",
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icon.PhotoSm /> Foto Barang
          </h3>
          <ModernTable>
            <TableRow label="Upload Foto" alignTop>
              <PhotoUpload value={editPhoto} onChange={setEditPhoto} />
            </TableRow>
          </ModernTable>

          <h3
            style={{
              fontSize: "15px",
              color: "#0f172a",
              marginBottom: "10px",
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icon.Cogs /> Spesifikasi & Atribut
          </h3>
          <ModernTable>
            {editSpecsData.specs.map((spec, i) => (
              <TableRow label={spec.spec_label} key={i}>
                <input
                  type="text"
                  placeholder="Isi nilai..."
                  value={spec.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditSpecsData((prev) => ({
                      ...prev,
                      specs: prev.specs.map((s, idx) =>
                        idx === i ? { ...s, value: val } : s,
                      ),
                    }));
                  }}
                  style={{ ...modernInputStyle, flex: 2 }}
                />
                {spec._unitMode !== "custom" ? (
                  <select
                    value={spec.default_unit}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditSpecsData((prev) => ({
                        ...prev,
                        specs: prev.specs.map((s, idx) =>
                          idx === i
                            ? {
                              ...s,
                              default_unit: val === "__custom__" ? "" : val,
                              _unitMode:
                                val === "__custom__" ? "custom" : "pick",
                            }
                            : s,
                        ),
                      }));
                    }}
                    style={{
                      ...modernSelectStyle,
                      flex: 1,
                      background: "#f8fafc",
                    }}
                  >
                    <option value="">Satuan</option>
                    {SPEC_UNIT_OPTIONS.map((g) => (
                      <optgroup key={g.group} label={g.group}>
                        {g.units.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="__custom__">✏ Ketik baru...</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Satuan..."
                    value={spec.default_unit}
                    autoFocus
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditSpecsData((prev) => ({
                        ...prev,
                        specs: prev.specs.map((s, idx) =>
                          idx === i ? { ...s, default_unit: val } : s,
                        ),
                      }));
                    }}
                    onBlur={() => {
                      if (!spec.default_unit)
                        setEditSpecsData((prev) => ({
                          ...prev,
                          specs: prev.specs.map((s, idx) =>
                            idx === i ? { ...s, _unitMode: "pick" } : s,
                          ),
                        }));
                    }}
                    style={{
                      ...modernInputStyle,
                      flex: 1,
                      background: "#f0f9ff",
                      borderColor: "#bae6fd",
                    }}
                  />
                )}
              </TableRow>
            ))}

            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "16px",
                  background: "#f8fafc",
                  borderTop: "1px solid #e2e8f0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    Atribut Tambahan
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditSpecsData((prev) => ({
                        ...prev,
                        customSpecs: [
                          ...prev.customSpecs,
                          {
                            spec_label: "",
                            value: "",
                            default_unit: "",
                            _unitMode: "pick",
                          },
                        ],
                      }))
                    }
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      fontSize: "12px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    + Tambah Atribut
                  </button>
                </div>
              </td>
            </tr>
            {editSpecsData.customSpecs.map((spec, i) => (
              <TableRow
                key={`custom-${i}`}
                alignTop
                label={
                  <input
                    type="text"
                    placeholder="Nama Atribut"
                    value={spec.spec_label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditSpecsData((prev) => ({
                        ...prev,
                        customSpecs: prev.customSpecs.map((s, idx) =>
                          idx === i ? { ...s, spec_label: val } : s,
                        ),
                      }));
                    }}
                    style={{
                      ...modernInputStyle,
                      background: "#fff",
                      border: "1px dashed #cbd5e1",
                      padding: "6px 10px",
                    }}
                  />
                }
              >
                <input
                  type="text"
                  placeholder="Nilai..."
                  value={spec.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditSpecsData((prev) => ({
                      ...prev,
                      customSpecs: prev.customSpecs.map((s, idx) =>
                        idx === i ? { ...s, value: val } : s,
                      ),
                    }));
                  }}
                  style={{ ...modernInputStyle, flex: 2 }}
                />

                {spec._unitMode !== "custom" ? (
                  <select
                    value={spec.default_unit}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditSpecsData((prev) => ({
                        ...prev,
                        customSpecs: prev.customSpecs.map((s, idx) =>
                          idx === i
                            ? {
                              ...s,
                              default_unit: val === "__custom__" ? "" : val,
                              _unitMode:
                                val === "__custom__" ? "custom" : "pick",
                            }
                            : s,
                        ),
                      }));
                    }}
                    style={{
                      ...modernSelectStyle,
                      flex: 1,
                      background: "#f8fafc",
                    }}
                  >
                    <option value="">Satuan</option>
                    {SPEC_UNIT_OPTIONS.map((g) => (
                      <optgroup key={g.group} label={g.group}>
                        {g.units.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="__custom__">✏ Ketik baru...</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Satuan..."
                    value={spec.default_unit}
                    autoFocus
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditSpecsData((prev) => ({
                        ...prev,
                        customSpecs: prev.customSpecs.map((s, idx) =>
                          idx === i ? { ...s, default_unit: val } : s,
                        ),
                      }));
                    }}
                    onBlur={() => {
                      if (!spec.default_unit)
                        setEditSpecsData((prev) => ({
                          ...prev,
                          customSpecs: prev.customSpecs.map((s, idx) =>
                            idx === i ? { ...s, _unitMode: "pick" } : s,
                          ),
                        }));
                    }}
                    style={{
                      ...modernInputStyle,
                      flex: 1,
                      background: "#f0f9ff",
                      borderColor: "#bae6fd",
                    }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    const n = [...editSpecsData.customSpecs];
                    n.splice(i, 1);
                    setEditSpecsData((prev) => ({ ...prev, customSpecs: n }));
                  }}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#dc2626",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon.Trash />
                </button>
              </TableRow>
            ))}
          </ModernTable>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
              paddingBottom: "40px",
            }}
          >
            <button
              className="btn-save"
              onClick={handleSaveEdit}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon.Save /> Simpan Perubahan
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  };

  // ── RENDER DETAIL PAGE ──────────────────────────────────────────
  const renderDetailPage = () => {
    const a = selectedAsset;
    if (!a) return null;

    const proj = getProjectById(a.id_pekerjaan);
    const isOpexProj = proj?.jenis === "OPEX";
    const history = MOCK_ALL_BORROWS.filter((b) => b.code === a.id).sort(
      (x, y) => new Date(y.borrow_date) - new Date(x.borrow_date),
    );

    return (
      <PageWrapper
        title="Detail Barang"
        onBack={() => setCurrentView("list")}
        actions={
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setCurrentView("barcode")}
              style={{
                padding: "8px 16px",
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s",
              }}
            >
              <Icon.Barcode /> Cetak Barcode
            </button>
            <button
              onClick={() => openEditPage(a)}
              style={{
                padding: "8px 16px",
                background: "#2563eb",
                border: "none",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s",
              }}
            >
              <Icon.Edit /> Edit Barang
            </button>
          </div>
        }
      >
        {/* TABS NATIVE */}
        <div
          style={{
            display: "flex",
            borderBottom: "2px solid #f1f5f9",
            marginBottom: "24px",
          }}
        >
          {[
            {
              key: "info",
              label: "Informasi Utama",
              icon: <Icon.InfoCircle />,
            },
            {
              key: "units",
              label: `Daftar Unit (${(a.units || []).length})`,
              icon: <Icon.Box />,
            },
            {
              key: "spec",
              label: `Spesifikasi (${(a.specs || []).length + (a.customSpecs || []).length})`,
              icon: <Icon.Cogs />,
            },
            {
              key: "history",
              label: `Riwayat Pinjam (${history.length})`,
              icon: <Icon.History />,
            },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setDetailTab(t.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                background: "transparent",
                border: "none",
                fontSize: "13.5px",
                fontWeight: detailTab === t.key ? "700" : "600",
                color: detailTab === t.key ? "#2563eb" : "#64748b",
                cursor: "pointer",
                borderBottom:
                  detailTab === t.key
                    ? "2px solid #2563eb"
                    : "2px solid transparent",
                marginBottom: "-2px",
                transition: "all 0.2s ease",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {detailTab === "info" && (
          <div style={{ maxWidth: "900px" }}>
            <h3
              style={{
                fontSize: "15px",
                color: "#0f172a",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon.Tag /> Identitas & Status
            </h3>
            <ModernTable>
              <TableRow label="ID Barang">
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  {a.id}
                </span>
              </TableRow>
              <TableRow label="Nama Barang">
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {a.name}
                </span>
              </TableRow>
              <TableRow label="Foto Barang" alignTop>
                {getAssetImage(a) ? (
                  <img
                    src={getAssetImage(a)}
                    alt={a.name}
                    style={{
                      width: "140px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                    Tidak ada foto
                  </span>
                )}
              </TableRow>
              <TableRow label="Kategori">
                <span
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  {a.category}
                </span>
              </TableRow>
              <TableRow label="Status">
                <span
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  {a.status}
                </span>
              </TableRow>
            </ModernTable>

            <h3
              style={{
                fontSize: "15px",
                color: "#0f172a",
                marginBottom: "10px",
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon.MapPin /> Lokasi & Administrasi
            </h3>
            <ModernTable>
              <TableRow label="Entitas">
                <span style={{ fontSize: "14px", color: "#334155" }}>
                  {a.entitas}
                </span>
              </TableRow>
              <TableRow label="Cabang / Lokasi">
                <span
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                    fontWeight: "600",
                  }}
                >
                  {a.branch}
                </span>{" "}
                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    marginLeft: "6px",
                  }}
                >
                  {" "}
                  (Zona: {a.zona} · Sub: {a.subzona})
                </span>
              </TableRow>
              <TableRow label="Tipe Anggaran">
                <span
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  {isOpexProj ? "OPEX" : "CAPEX"}
                </span>
              </TableRow>
              <TableRow label="Pekerjaan Terkait">
                <span
                  style={{
                    fontSize: "13.5px",
                    color: "#334155",
                    lineHeight: "1.5",
                  }}
                >
                  {proj ? proj.nm_pekerjaan : "—"}
                </span>
              </TableRow>
            </ModernTable>
          </div>
        )}

        {detailTab === "units" && (
          <div style={{ maxWidth: "900px" }}>
            <h3
              style={{
                fontSize: "15px",
                color: "#0f172a",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon.Layers /> Detail Unit & Status Terkini
            </h3>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#f8fafc" }}>
                  <tr>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#64748b", borderBottom: "1px solid #e2e8f0", width: "50px" }}>NO</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>SERIAL NUMBER</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>HARGA SATUAN</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>STATUS</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>LOKASI SAAT INI</th>
                  </tr>
                </thead>
                <tbody>
                  {(a.units || []).map((u, idx) => {
                    const activeBorrow = history.find(h => h.serial_number === u.serialNumber && !h.is_returned);
                    const status = activeBorrow ? "Dipinjam" : "Tersedia";
                    return (
                      <tr key={idx}>
                        <td style={{ padding: "12px 16px", fontSize: "14px", borderBottom: "1px solid #f1f5f9", color: "#94a3b8", fontWeight: "bold" }}>{idx + 1}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", borderBottom: "1px solid #f1f5f9", color: "#0f172a", fontWeight: "600" }}>{u.serialNumber}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", borderBottom: "1px solid #f1f5f9", color: "#475569" }}>{fmt(a.value)}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", borderBottom: "1px solid #f1f5f9" }}>
                          <span style={{
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            background: status === "Tersedia" ? "#dcfce7" : "#fee2e2",
                            color: status === "Tersedia" ? "#16a34a" : "#dc2626"
                          }}>
                            {status}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: "13.5px", borderBottom: "1px solid #f1f5f9", color: "#475569" }}>
                          {activeBorrow ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <Icon.ArrowUpRight /> {activeBorrow.to_zone}
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <Icon.MapPin /> {a.branch} ({a.zona})
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot style={{ background: "#f8fafc", borderTop: "2px solid #e2e8f0" }}>
                  <tr>
                    <td colSpan="4" style={{ padding: "12px 16px", textAlign: "right", fontSize: "13px", fontWeight: "800", color: "#64748b" }}>TOTAL NILAI KESELURUHAN ASET:</td>
                    <td style={{ padding: "12px 16px", fontSize: "16px", fontWeight: "900", color: "#16a34a" }}>{fmt(a.value * (a.quantity || 1))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {detailTab === "spec" && (
          <div style={{ maxWidth: "900px" }}>
            <h3
              style={{
                fontSize: "15px",
                color: "#0f172a",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon.Cogs /> Spesifikasi Utama
            </h3>
            <ModernTable>
              {!a.specs || a.specs.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "16px",
                      color: "#94a3b8",
                      fontSize: "13.5px",
                    }}
                  >
                    Tidak ada data spesifikasi.
                  </td>
                </tr>
              ) : (
                (a.specs || []).map((s, idx) => (
                  <TableRow key={idx} label={s.spec_label}>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#0f172a",
                        fontWeight: "600",
                      }}
                    >
                      {s.value}{" "}
                      <span style={{ color: "#64748b", fontWeight: "normal" }}>
                        {s.default_unit}
                      </span>
                    </span>
                  </TableRow>
                ))
              )}
            </ModernTable>

            <h3
              style={{
                fontSize: "15px",
                color: "#0f172a",
                marginBottom: "10px",
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon.LayersIcon /> Atribut Tambahan
            </h3>
            <ModernTable>
              {!a.customSpecs || a.customSpecs.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "16px",
                      color: "#94a3b8",
                      fontSize: "13.5px",
                    }}
                  >
                    Tidak ada data atribut tambahan.
                  </td>
                </tr>
              ) : (
                (a.customSpecs || []).map((s, idx) => (
                  <TableRow key={idx} label={s.spec_label}>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#0f172a",
                        fontWeight: "600",
                      }}
                    >
                      {s.value}{" "}
                      <span style={{ color: "#64748b", fontWeight: "normal" }}>
                        {s.default_unit}
                      </span>
                    </span>
                  </TableRow>
                ))
              )}
            </ModernTable>
          </div>
        )}

        {detailTab === "history" && (
          <div>
            <AssetHistoryTab assetCode={a.id} allBorrows={MOCK_ALL_BORROWS} />
          </div>
        )}
      </PageWrapper>
    );
  };

  // ── RENDER DELETE CONFIRMATION PAGE ─────────────────────────────
  const renderDeletePage = () => {
    return (
      <PageWrapper title="Hapus Barang" onBack={() => setCurrentView("list")}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
            padding: "40px 0",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#fef2f2",
              color: "#ef4444",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <Icon.Warn />
          </div>
          <h2
            style={{ fontSize: "24px", color: "#0f172a", marginBottom: "16px" }}
          >
            Konfirmasi Penghapusan
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#64748b",
              lineHeight: "1.6",
              marginBottom: "32px",
            }}
          >
            Anda yakin ingin menghapus aset secara permanen? Data riwayat,
            spesifikasi, dan barcode aset ini juga akan ikut terhapus dan tidak
            dapat dikembalikan.
          </p>

          <ModernTable>
            <TableRow label="ID Barang">
              <code style={{ fontWeight: "bold" }}>{selectedAsset.id}</code>
            </TableRow>
            <TableRow label="Nama Barang">
              <span style={{ fontWeight: "bold" }}>{selectedAsset.name}</span>
            </TableRow>
            <TableRow label="Lokasi">
              <span>
                {selectedAsset.branch} ({selectedAsset.zona})
              </span>
            </TableRow>
          </ModernTable>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <button
              onClick={() => setCurrentView("list")}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "bold",
                background: "#fff",
                border: "1.5px solid #cbd5e1",
                color: "#475569",
                cursor: "pointer",
              }}
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "bold",
                background: "#ef4444",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon.Trash /> Ya, Hapus Barang
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  };

  // ── RENDER BARCODE PAGE ─────────────────────────────────────────
  const renderBarcodePage = () => {
    const asset = selectedAsset;
    const units = asset.units && asset.units.length > 0 ? asset.units : [{ serialNumber: asset.id }];

    return (
      <PageWrapper
        title="Cetak Barcode Per Unit"
        onBack={() => {
          setCurrentView(barcodeReturnView);
          if (barcodeReturnView !== "add") {
            setSelectedAsset(null);
          }
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                {asset.name}
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                Terdapat {units.length} unit yang siap dicetak labelnya.
              </p>
            </div>
            <button
              onClick={handlePrintBarcode}
              style={{
                padding: "12px 24px",
                background: "#2563eb",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
              }}
            >
              <Icon.Print /> Cetak Semua Barcode ({units.length})
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "24px",
              paddingBottom: "40px"
            }}
          >
            {units.map((u, idx) => {
              const barcodeVal = u.serialNumber || asset.id;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#fff",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "20px",
                    position: "relative"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    fontSize: "10px",
                    fontWeight: "800",
                    color: "#94a3b8",
                    background: "#f8fafc",
                    padding: "2px 6px",
                    borderRadius: "4px"
                  }}>
                    UNIT {idx + 1}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1.5px solid #111", paddingBottom: "10px", marginBottom: "10px" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "900", letterSpacing: "2px", color: "#000" }}>PELINDO</div>
                      <div style={{ fontSize: "7px", fontWeight: "700", color: "#555", letterSpacing: "1px" }}>ASSET MANAGEMENT</div>
                    </div>
                    <span style={{ border: "1.5px solid #000", borderRadius: "4px", padding: "2px 6px", fontSize: "7px", fontWeight: "900", textTransform: "uppercase" }}>{asset.status}</span>
                  </div>

                  <div style={{ fontSize: "13px", fontWeight: "800", margin: "6px 0 2px", color: "#000" }}>{asset.name}</div>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#444", marginBottom: "8px" }}>{barcodeVal}</div>

                  <div style={{ textAlign: "center", borderTop: "1px dashed #ddd", borderBottom: "1px dashed #ddd", padding: "8px 0", margin: "8px 0" }}>
                    <BarcodeCanvas value={barcodeVal} width={300} height={50} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
                    <div>
                      <span style={{ display: "block", fontSize: "7px", color: "#888", textTransform: "uppercase" }}>Cabang</span>
                      <span style={{ fontSize: "9px", fontWeight: "700", color: "#111" }}>{asset.branch}</span>
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "7px", color: "#888", textTransform: "uppercase" }}>Zona/Sub</span>
                      <span style={{ fontSize: "9px", fontWeight: "700", color: "#111" }}>{asset.zona}/{asset.subzona}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageWrapper>
    );
  };

  // ── RENDER ROOT ───────────────────────────────────────────────────
  return (
    <>
      {currentView === "list" && renderListView()}
      {currentView === "add" && renderAddPage()}
      {currentView === "edit" && renderEditPage()}
      {currentView === "detail" && renderDetailPage()}
      {currentView === "delete" && renderDeletePage()}
      {currentView === "barcode" && renderBarcodePage()}
    </>
  );
};

export default ViewAsset;
