import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
  FaClipboardList,
  FaTimesCircle,
  FaFileInvoiceDollar,
  FaBalanceScale,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

/* ─────────────────────────────────────────────────────────────────────────────
   INLINE STYLES  (replaces Dashboard.css – keeps every value readable here)
───────────────────────────────────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .db-wrap {
    min-height: 100vh;
    background: #f4f6f9;
    padding: 36px 40px 60px;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .db-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    gap: 20px;
    flex-wrap: wrap;
  }
  .db-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0d1b2a;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }
  .db-subtitle {
    font-size: 0.88rem;
    color: #8a9bb0;
    margin-top: 4px;
    font-weight: 500;
  }

  /* Year picker */
  .year-picker {
    display: flex;
    background: white;
    border-radius: 14px;
    padding: 5px;
    gap: 3px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    border: 1px solid #e4e9f0;
    align-self: flex-start;
  }
  .year-btn {
    padding: 8px 18px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 0.86rem;
    font-weight: 600;
    transition: all 0.2s ease;
    font-family: inherit;
    color: #8a9bb0;
    background: transparent;
  }
  .year-btn.active {
    background: #004494;
    color: white;
    box-shadow: 0 3px 10px rgba(0,68,148,0.3);
  }

  /* ── Section label ── */
  .section-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #a0aec0;
    margin-bottom: 14px;
  }

  /* ── Stats row ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 36px;
  }
  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 24px 26px;
    display: flex;
    align-items: center;
    gap: 18px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    border: 1px solid #edf0f5;
    transition: box-shadow 0.2s;
  }
  .stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.09); }
  .stat-icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .stat-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #a0aec0;
    margin-bottom: 4px;
  }
  .stat-value {
    font-size: 1.85rem;
    font-weight: 800;
    color: #0d1b2a;
    line-height: 1;
    letter-spacing: -1px;
  }
  .stat-sub {
    font-size: 0.75rem;
    color: #a0aec0;
    font-weight: 500;
    margin-top: 3px;
  }

  /* ── Budget grid ── */
  .budget-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }

  /* ── Charts grid ── */
  .chart-grid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 20px;
    margin-bottom: 36px;
  }

  /* ── Card base ── */
  .card {
    background: white;
    border-radius: 18px;
    padding: 28px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    border: 1px solid #edf0f5;
  }
  .card-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0d1b2a;
    letter-spacing: -0.2px;
  }
  .card-subtitle {
    font-size: 0.75rem;
    color: #a0aec0;
    font-weight: 500;
    margin-top: 3px;
  }
  .card-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 22px;
    gap: 12px;
  }

  /* Toggle pill */
  .toggle-pill {
    display: flex;
    background: #f4f6f9;
    border-radius: 9px;
    padding: 3px;
    gap: 2px;
    flex-shrink: 0;
  }
  .toggle-btn {
    padding: 5px 13px;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    font-size: 0.76rem;
    font-weight: 700;
    transition: all 0.18s;
    font-family: inherit;
    color: #a0aec0;
    background: transparent;
  }
  .toggle-btn.active {
    background: white;
    color: #004494;
    box-shadow: 0 1px 6px rgba(0,0,0,0.1);
  }

  /* ── Progress bar ── */
  .prog-track {
    height: 7px;
    border-radius: 99px;
    background: #edf0f5;
    overflow: hidden;
  }
  .prog-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.7s cubic-bezier(.4,0,.2,1);
  }

  /* ── CAPEX program row ── */
  .capex-row {
    border-radius: 12px;
    border: 1px solid #edf0f5;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .capex-row.open { border-color: #c5d8f8; }
  .capex-row-head {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 13px 14px;
    cursor: pointer;
    background: #fafbfc;
    transition: background 0.15s;
  }
  .capex-row.open .capex-row-head { background: #eef4ff; }

  /* ── Alerts ── */
  .alert-list { display: flex; flex-direction: column; gap: 12px; }
  .alert-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 16px 18px;
    border-radius: 12px;
    background: #fafbfc;
    border: 1px solid #edf0f5;
    transition: box-shadow 0.2s;
  }
  .alert-item:hover { box-shadow: 0 3px 10px rgba(0,0,0,0.06); }
  .alert-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.95rem;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .alert-title { font-size: 0.85rem; font-weight: 700; color: #0d1b2a; margin-bottom: 3px; }
  .alert-text  { font-size: 0.78rem; color: #718096; line-height: 1.5; }
  .alert-btn {
    margin-left: auto; flex-shrink: 0;
    padding: 7px 14px;
    border-radius: 8px;
    border: 1px solid #e4e9f0;
    background: white;
    font-size: 0.75rem; font-weight: 700;
    color: #004494;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    white-space: nowrap;
    align-self: flex-start;
  }
  .alert-btn:hover { background: #004494; color: white; border-color: #004494; }

  /* ── OPEX item ── */
  .opex-item {
    display: flex; align-items: center; gap: 10px;
    padding: 4px 0;
  }

  /* Divider */
  .divider { height: 1px; background: #edf0f5; margin: 18px 0; }

  /* Scrollbar */
  .thin-scroll { scrollbar-width: thin; scrollbar-color: #d0d7e2 transparent; }

  /* Responsive */
  @media (max-width: 1024px) {
    .budget-grid, .chart-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 640px) {
    .db-wrap { padding: 20px 16px 40px; }
    .stats-row { grid-template-columns: 1fr; }
  }

  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .drop-in { animation: dropIn 0.18s ease-out; }

  /* Footer strip inside capex */
  .capex-footer {
    display: flex; gap: 0;
    background: #f8f9fb;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 18px;
  }
  .capex-footer-item {
    flex: 1; padding: 14px 16px; text-align: center;
    border-right: 1px solid #edf0f5;
  }
  .capex-footer-item:last-child { border-right: none; }
  .capex-footer-lbl { font-size: 0.68rem; font-weight: 600; color: #a0aec0; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .capex-footer-val { font-size: 0.92rem; font-weight: 800; }
`;

// ================================================================
// MOCK DATA — (unchanged)
// ================================================================
const dataPeminjamanHarian = [
  { name: "Sen", Laptop: 8,  Proyektor: 3, Kamera: 2, Kendaraan: 1 },
  { name: "Sel", Laptop: 12, Proyektor: 5, Kamera: 4, Kendaraan: 2 },
  { name: "Rab", Laptop: 10, Proyektor: 7, Kamera: 3, Kendaraan: 3 },
  { name: "Kam", Laptop: 15, Proyektor: 4, Kamera: 6, Kendaraan: 2 },
  { name: "Jum", Laptop: 9,  Proyektor: 6, Kamera: 5, Kendaraan: 4 },
  { name: "Sab", Laptop: 5,  Proyektor: 2, Kamera: 2, Kendaraan: 1 },
  { name: "Min", Laptop: 3,  Proyektor: 1, Kamera: 1, Kendaraan: 0 },
];
const dataPeminjamanBulanan = [
  { name: "Jan", Laptop: 40,  Proyektor: 20, Kamera: 15, Kendaraan: 10 },
  { name: "Feb", Laptop: 30,  Proyektor: 18, Kamera: 12, Kendaraan: 8  },
  { name: "Mar", Laptop: 65,  Proyektor: 30, Kamera: 20, Kendaraan: 12 },
  { name: "Apr", Laptop: 50,  Proyektor: 25, Kamera: 18, Kendaraan: 9  },
  { name: "Mei", Laptop: 85,  Proyektor: 35, Kamera: 28, Kendaraan: 15 },
  { name: "Jun", Laptop: 120, Proyektor: 45, Kamera: 35, Kendaraan: 20 },
];
const kategoriLines = [
  { key: "Laptop",    color: "#004494" },
  { key: "Proyektor", color: "#27ae60" },
  { key: "Kamera",    color: "#e67e22" },
  { key: "Kendaraan", color: "#8e44ad" },
];

const dataKondisi = [
  { name: "Baik",                value: 850, color: "#2ecc71" },
  { name: "Dalam Pemeliharaan",  value: 80,  color: "#3498db" },
  { name: "Rusak Berat",         value: 45,  color: "#e74c3c" },
  { name: "Rusak Ringan",        value: 120, color: "#f1c40f" },
];
const totalKondisi = dataKondisi.reduce((s, d) => s + d.value, 0);

const mockCapexPrograms = [
  { nm_anggaran_capex: "Implementasi dan Standarisasi IT Infrastruktur", thn_rkap_awal: 2024, thn_rkap_akhir: 2024, nilai_anggaran: 1200000000, status: "selesai",  realisasi_per_tahun: [{ tahun: 2024, realisasi: 1200000000 }] },
  { nm_anggaran_capex: "Penyediaan Network di Branch SPMT",              thn_rkap_awal: 2024, thn_rkap_akhir: 2024, nilai_anggaran: 800000000,  status: "selesai",  realisasi_per_tahun: [{ tahun: 2024, realisasi: 800000000  }] },
  { nm_anggaran_capex: "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal", thn_rkap_awal: 2024, thn_rkap_akhir: 2024, nilai_anggaran: 3500000000, status: "selesai", realisasi_per_tahun: [{ tahun: 2024, realisasi: 3500000000 }] },
  { nm_anggaran_capex: "Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC Transformasi pada Branch SPMT)", thn_rkap_awal: 2024, thn_rkap_akhir: 2025, nilai_anggaran: 1500000000, status: "berjalan", realisasi_per_tahun: [{ tahun: 2025, realisasi: 1200000000 }] },
  { nm_anggaran_capex: "Transformasi dan Digitalisasi PT Pelindo Multi Terminal", thn_rkap_awal: 2025, thn_rkap_akhir: 2026, nilai_anggaran: 2000000000, status: "berjalan", realisasi_per_tahun: [{ tahun: 2025, realisasi: 1600000000 }, { tahun: 2026, realisasi: 800000000 }] },
  { nm_anggaran_capex: "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal", thn_rkap_awal: 2025, thn_rkap_akhir: 2026, nilai_anggaran: 1800000000, status: "berjalan", realisasi_per_tahun: [{ tahun: 2025, realisasi: 1300000000 }, { tahun: 2026, realisasi: 400000000 }] },
  { nm_anggaran_capex: "Penyiapan Infrastruktur IT pada Kegiatan Roro", thn_rkap_awal: 2025, thn_rkap_akhir: 2026, nilai_anggaran: 900000000, status: "berjalan", realisasi_per_tahun: [{ tahun: 2025, realisasi: 650000000 }, { tahun: 2026, realisasi: 150000000 }] },
];

const mockOpexPerTahun = {
  2023: [
    { id: 1, nama: "Beban Pemeliharaan Software",   rkap: 400000000, realisasi: 400000000 },
    { id: 2, nama: "Beban Jaringan dan Koneksi Data",rkap: 500000000, realisasi: 498000000 },
    { id: 3, nama: "Beban Perlengkapan Kantor",      rkap: 600000000, realisasi: 590000000 },
    { id: 4, nama: "Beban Jasa Konsultan",           rkap: 700000000, realisasi: 695000000 },
    { id: 5, nama: "Beban SDM Pihak Ketiga",         rkap: 800000000, realisasi: 780000000 },
  ],
  2024: [
    { id: 1, nama: "Beban Pemeliharaan Software",   rkap: 450000000, realisasi: 440000000 },
    { id: 2, nama: "Beban Jaringan dan Koneksi Data",rkap: 550000000, realisasi: 530000000 },
    { id: 3, nama: "Beban Perlengkapan Kantor",      rkap: 650000000, realisasi: 620000000 },
    { id: 4, nama: "Beban Jasa Konsultan",           rkap: 750000000, realisasi: 740000000 },
    { id: 5, nama: "Beban SDM Pihak Ketiga",         rkap: 850000000, realisasi: 810000000 },
  ],
  2025: [
    { id: 1, nama: "Beban Pemeliharaan Software",    rkap: 500000000, realisasi: 420000000 },
    { id: 2, nama: "Beban Jaringan dan Koneksi Data", rkap: 600000000, realisasi: 510000000 },
    { id: 3, nama: "Beban Perlengkapan Kantor",       rkap: 700000000, realisasi: 580000000 },
    { id: 4, nama: "Beban Jasa Konsultan",            rkap: 800000000, realisasi: 720000000 },
    { id: 5, nama: "Beban SDM Pihak Ketiga",          rkap: 900000000, realisasi: 760000000 },
    { id: 6, nama: "Beban Lisensi & Subscription",   rkap: 300000000, realisasi: 280000000 },
  ],
  2026: [
    { id: 1, nama: "Beban Pemeliharaan Software",   rkap: 500000000, realisasi:  85000000 },
    { id: 2, nama: "Beban Jaringan dan Koneksi Data",rkap: 600000000, realisasi: 240000000 },
    { id: 3, nama: "Beban Perlengkapan Kantor",      rkap: 700000000, realisasi:  45000000 },
    { id: 4, nama: "Beban Jasa Konsultan",           rkap: 800000000, realisasi: 400000000 },
    { id: 5, nama: "Beban SDM Pihak Ketiga",         rkap: 900000000, realisasi: 150000000 },
    { id: 6, nama: "Beban Outsourcing IT",           rkap: 450000000, realisasi: 120000000 },
  ],
};

const mockBorrows = [
  { id_peminjaman: 1, asset_code: "SPMT-MLH-LPG-DMG-01", asset_name: "CCTV Hikvision Malahayati",         borrower_name: "Andi Pratama",  borrow_date: "2026-01-10", due_date: "2026-01-20", is_returned: true,  return_condition: "GOOD"         },
  { id_peminjaman: 2, asset_code: "SPMT-MLH-LPG-DMG-01", asset_name: "CCTV Hikvision Malahayati",         borrower_name: "Budi Santoso",  borrow_date: "2026-02-01", due_date: "2026-02-15", is_returned: true,  return_condition: "MINOR_DAMAGE" },
  { id_peminjaman: 3, asset_code: "SPMT-MLH-LPG-DMG-01", asset_name: "CCTV Hikvision Malahayati",         borrower_name: "Citra Dewi",    borrow_date: "2026-02-20", due_date: "2026-03-01", is_returned: true,  return_condition: "DAMAGED"      },
  { id_peminjaman: 4, asset_code: "SPMT-LHK-DTC-PKR-02", asset_name: "Core Switch Lhokseumawe",           borrower_name: "Deni Kurniawan",borrow_date: "2026-01-05", due_date: "2026-01-20", is_returned: false, return_condition: null           },
  { id_peminjaman: 5, asset_code: "SPMT-GRG-DTC-PKR-01", asset_name: "Access Switch Garongkong",          borrower_name: "Eka Saputra",   borrow_date: "2026-02-10", due_date: "2026-02-20", is_returned: false, return_condition: null           },
  { id_peminjaman: 6, asset_code: "SPMT-TBK-DTC-PKR-01", asset_name: "Core Switch Tanjung Balai Karimun", borrower_name: "Fajar Hidayat", borrow_date: "2026-02-25", due_date: "2026-03-10", is_returned: false, return_condition: null           },
  { id_peminjaman: 7, asset_code: "SPMT-LHK-LPG-DMG-01", asset_name: "CCTV Hikvision Lhokseumawe",        borrower_name: "Gita Rahayu",   borrow_date: "2026-01-15", due_date: "2026-01-30", is_returned: true,  return_condition: "MINOR_DAMAGE" },
  { id_peminjaman: 8, asset_code: "SPMT-LHK-LPG-DMG-01", asset_name: "CCTV Hikvision Lhokseumawe",        borrower_name: "Hendra Wijaya", borrow_date: "2026-02-15", due_date: "2026-02-28", is_returned: true,  return_condition: "MINOR_DAMAGE" },
];

// ================================================================
// HELPERS
// ================================================================
const formatRupiah = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

const formatRupiahShort = (v) => {
  if (v >= 1_000_000_000) return `Rp ${(v / 1_000_000_000).toFixed(1)} M`;
  if (v >= 1_000_000)     return `Rp ${(v / 1_000_000).toFixed(0)} Jt`;
  return formatRupiah(v);
};

// ================================================================
// ALERTS
// ================================================================
const calculateAlerts = (opexData) => {
  const alerts = [];
  const today  = new Date();

  const damageCount = {}, damageNames = {};
  mockBorrows.forEach((b) => {
    if (b.is_returned && (b.return_condition === "MINOR_DAMAGE" || b.return_condition === "DAMAGED")) {
      damageCount[b.asset_code] = (damageCount[b.asset_code] || 0) + 1;
      damageNames[b.asset_code] = b.asset_name;
    }
  });
  Object.entries(damageCount).forEach(([code, count]) => {
    if (count >= 2) alerts.push({ id: `damage-${code}`, type: "FREQUENT_DAMAGE", priority: "high",   title: "Aset Sering Rusak",              message: `${damageNames[code]} (${code}) dikembalikan rusak sebanyak ${count}x. Pertimbangkan pengecekan atau penggantian.`, action_label: "Lihat Riwayat",   action_path: "/peminjaman" });
  });

  const overdue = mockBorrows.filter((b) => !b.is_returned && new Date(b.due_date) < today);
  if (overdue.length > 0) alerts.push({ id: "overdue-summary", type: "OVERDUE_BORROW", priority: "medium", title: "Peminjaman Melewati Jatuh Tempo", message: `${overdue.length} aset melewati jatuh tempo: ${overdue.map((b) => b.asset_name).join(", ")}. Segera tindak lanjut.`, action_label: "Cek Peminjaman", action_path: "/peminjaman" });

  opexData.forEach((opex) => {
    const pct = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
    if (pct >= 80) alerts.push({ id: `opex-critical-${opex.id}`, type: "OPEX_CRITICAL", priority: pct >= 100 ? "high" : "medium", title: "Anggaran OPEX Kritis", message: `${opex.nama} terserap ${pct.toFixed(1)}% (${formatRupiah(opex.realisasi)} dari ${formatRupiah(opex.rkap)}). Sisa: ${formatRupiah(opex.rkap - opex.realisasi)}.`, action_label: "Lihat Anggaran", action_path: "/budget" });
  });

  const order = { high: 0, medium: 1, low: 2 };
  alerts.sort((a, b) => order[a.priority] - order[b.priority]);
  return alerts;
};

const ALERT_STYLE = {
  FREQUENT_DAMAGE: { icon: <FaExclamationTriangle />, bg: "#fdecea", color: "#e74c3c" },
  OVERDUE_BORROW:  { icon: <FaClipboardList />,       bg: "#fff8ee", color: "#f39c12" },
  OPEX_CRITICAL:   { icon: <FaFileInvoiceDollar />,   bg: "#fff8ee", color: "#d35400" },
  CAPEX_NO_ASSET:  { icon: <FaTimesCircle />,         bg: "#eaf4fb", color: "#2980b9" },
  CAPEX_IMBALANCE: { icon: <FaBalanceScale />,        bg: "#f4ecf7", color: "#8e44ad" },
};

const statusConfig = {
  selesai:  { color: "#27ae60", bg: "#e8f8f0", label: "Selesai",      dot: "#27ae60" },
  berjalan: { color: "#004494", bg: "#e8f0fb", label: "Berjalan",     dot: "#004494" },
  belum:    { color: "#b0b8c1", bg: "#f1f2f6", label: "Belum Mulai",  dot: "#b0b8c1" },
};

// ================================================================
// CAPEX CARD
// ================================================================
const CapexMultiYearCard = ({ selectedYear }) => {
  const [openProgram, setOpenProgram] = useState(null);
  const [filterMode, setFilterMode]   = useState("semua");

  React.useEffect(() => { setOpenProgram(null); }, [selectedYear]);

  const programsWithTotal = useMemo(() =>
    mockCapexPrograms.map((p) => {
      const totalRealisasi = p.realisasi_per_tahun.reduce((s, r) => s + r.realisasi, 0);
      const pct = p.nilai_anggaran > 0 ? (totalRealisasi / p.nilai_anggaran) * 100 : 0;
      return { ...p, totalRealisasi, pct };
    }), []);

  const visiblePrograms = useMemo(() => {
    if (filterMode === "tahun") {
      const yr = parseInt(selectedYear);
      return programsWithTotal.filter((p) => p.thn_rkap_awal <= yr && p.thn_rkap_akhir >= yr);
    }
    return programsWithTotal;
  }, [filterMode, selectedYear, programsWithTotal]);

  const grandTotalAnggaran   = visiblePrograms.reduce((s, p) => s + p.nilai_anggaran,   0);
  const grandTotalRealisasi  = visiblePrograms.reduce((s, p) => s + p.totalRealisasi,   0);
  const grandPct = grandTotalAnggaran > 0 ? (grandTotalRealisasi / grandTotalAnggaran) * 100 : 0;

  const allThnAwal = mockCapexPrograms.map((p) => p.thn_rkap_awal);
  const allThnAkhir= mockCapexPrograms.map((p) => p.thn_rkap_akhir);
  const minThn = Math.min(...allThnAwal), maxThn = Math.max(...allThnAkhir);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header-row">
        <div>
          <div className="card-title">Anggaran CAPEX</div>
          <div className="card-subtitle">Komposit Per Program · {mockCapexPrograms.length} Program · {minThn}–{maxThn}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.68rem", color: "#a0aec0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Total RKAP</div>
          <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#004494", lineHeight: 1.2 }}>{formatRupiahShort(grandTotalAnggaran)}</div>
        </div>
      </div>

      {/* Filter toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tampilkan:</span>
        <div className="toggle-pill">
          {[{ val: "semua", label: "Semua" }, { val: "tahun", label: `Aktif ${selectedYear}` }].map((opt) => (
            <button key={opt.val} className={`toggle-btn${filterMode === opt.val ? " active" : ""}`}
              onClick={() => { setFilterMode(opt.val); setOpenProgram(null); }}>{opt.label}</button>
          ))}
        </div>
      </div>

      {/* Overall progress */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
        <span style={{ fontSize: "0.78rem", color: "#718096" }}>Realisasi: <strong style={{ color: "#0d1b2a" }}>{formatRupiahShort(grandTotalRealisasi)}</strong></span>
        <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#004494" }}>{grandPct.toFixed(1)}%</span>
      </div>
      <div className="prog-track" style={{ marginBottom: "20px" }}>
        <div className="prog-fill" style={{ width: `${Math.min(grandPct, 100)}%`, background: "linear-gradient(90deg,#004494,#1a72d9)" }} />
      </div>

      {/* Program list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {visiblePrograms.length === 0 && (
          <div style={{ textAlign: "center", padding: "28px 0", color: "#a0aec0", fontSize: "0.85rem" }}>
            Tidak ada program aktif di tahun {selectedYear}
          </div>
        )}
        {visiblePrograms.map((program, idx) => {
          const cfg = statusConfig[program.status];
          const isOpen = openProgram === idx;
          const isMultiYear = program.thn_rkap_awal !== program.thn_rkap_akhir;
          return (
            <div key={idx} className={`capex-row${isOpen ? " open" : ""}`}>
              <div className="capex-row-head" onClick={() => setOpenProgram(isOpen ? null : idx)}>
                {/* Status dot */}
                <div style={{ paddingTop: "5px", flexShrink: 0 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
                </div>
                {/* Name + badges + bar */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#0d1b2a", lineHeight: 1.4,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    title={program.nm_anggaran_capex}>{program.nm_anggaran_capex}</div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "5px" }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "2px 7px", borderRadius: "99px", background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "2px 7px", borderRadius: "99px", background: "#f4f6f9", color: "#8a9bb0" }}>
                      RKAP {program.thn_rkap_awal}{program.thn_rkap_awal !== program.thn_rkap_akhir ? `–${program.thn_rkap_akhir}` : ""}
                    </span>
                    {isMultiYear && <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "2px 7px", borderRadius: "99px", background: "#fff3e0", color: "#e67e22" }}>Multi-Year</span>}
                  </div>
                  <div className="prog-track" style={{ marginTop: "7px", height: "4px" }}>
                    <div className="prog-fill" style={{ width: `${Math.min(program.pct, 100)}%`, background: cfg.color }} />
                  </div>
                </div>
                {/* Values + chevron */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#0d1b2a" }}>{formatRupiahShort(program.totalRealisasi)}</div>
                    <div style={{ fontSize: "0.65rem", color: "#a0aec0" }}>/ {formatRupiahShort(program.nilai_anggaran)}</div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 800, color: cfg.color }}>{program.pct.toFixed(1)}%</div>
                  </div>
                  <span style={{ color: isOpen ? "#004494" : "#cfd8e3", fontSize: "0.65rem", transition: "color 0.2s" }}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
              </div>

              {/* Dropdown breakdown */}
              {isOpen && (
                <div className="drop-in" style={{ borderTop: "1px solid #e8f0fb", background: "white", padding: "12px 14px" }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#a0aec0", marginBottom: "10px" }}>Breakdown Realisasi Per Tahun</div>
                  {program.realisasi_per_tahun.map((r, i) => {
                    const rowPct = program.nilai_anggaran > 0 ? (r.realisasi / program.nilai_anggaran) * 100 : 0;
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 0",
                        borderBottom: i < program.realisasi_per_tahun.length - 1 ? "1px solid #f4f6f9" : "none" }}>
                        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#004494", minWidth: "38px" }}>{r.tahun}</div>
                        <div className="prog-track" style={{ flex: 1, height: "4px" }}>
                          <div className="prog-fill" style={{ width: `${Math.min(rowPct, 100)}%`, background: "#004494" }} />
                        </div>
                        <div style={{ textAlign: "right", minWidth: "88px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0d1b2a" }}>{formatRupiahShort(r.realisasi)}</span>
                          <span style={{ fontSize: "0.63rem", color: "#a0aec0", marginLeft: "3px" }}>({rowPct.toFixed(1)}%)</span>
                        </div>
                      </div>
                    );
                  })}
                  {/* Sub-total */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    paddingTop: "10px", marginTop: "6px", borderTop: "1px solid #edf0f5" }}>
                    <div>
                      <div style={{ fontSize: "0.67rem", color: "#a0aec0", fontWeight: 600 }}>Total Realisasi (semua tahun)</div>
                      <div style={{ fontSize: "0.65rem", color: "#a0aec0" }}>dari Anggaran: {formatRupiahShort(program.nilai_anggaran)}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#27ae60" }}>{formatRupiahShort(program.totalRealisasi)}</div>
                      <div style={{ fontSize: "0.68rem", fontWeight: 700, color: cfg.color }}>{program.pct.toFixed(1)}% terserap</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="capex-footer">
        <div className="capex-footer-item">
          <div className="capex-footer-lbl">Terserap</div>
          <div className="capex-footer-val" style={{ color: "#27ae60" }}>{formatRupiahShort(grandTotalRealisasi)}</div>
        </div>
        <div className="capex-footer-item">
          <div className="capex-footer-lbl">Sisa Anggaran</div>
          <div className="capex-footer-val" style={{ color: "#e74c3c" }}>{formatRupiahShort(grandTotalAnggaran - grandTotalRealisasi)}</div>
        </div>
        <div className="capex-footer-item">
          <div className="capex-footer-lbl">Total Program</div>
          <div className="capex-footer-val" style={{ color: "#004494" }}>{mockCapexPrograms.length} Program</div>
        </div>
      </div>
    </div>
  );
};

// ================================================================
// OPEX CARD
// ================================================================
const OpexBudgetCard = ({ tahun, dataOpex }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [openItem,   setOpenItem]   = useState(null);

  React.useEffect(() => { setShowDetail(false); setOpenItem(null); }, [tahun]);

  const totalRkap      = dataOpex.reduce((s, o) => s + o.rkap,       0);
  const totalRealisasi = dataOpex.reduce((s, o) => s + o.realisasi,   0);
  const pct = totalRkap > 0 ? (totalRealisasi / totalRkap) * 100 : 0;
  const color = pct >= 100 ? "#e74c3c" : pct >= 80 ? "#f39c12" : "#004494";

  return (
    <div className="card">
      <div className="card-header-row">
        <div>
          <div className="card-title">Anggaran OPEX</div>
          <div className="card-subtitle">Realisasi vs RKAP · {tahun} · {dataOpex.length} Pos</div>
        </div>
      </div>

      {/* Big number */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "10px" }}>
        <span style={{ fontSize: "2rem", fontWeight: 800, color, letterSpacing: "-1px" }}>{formatRupiahShort(totalRealisasi)}</span>
        <span style={{ fontSize: "0.85rem", color: "#a0aec0", fontWeight: 500 }}>/ {formatRupiahShort(totalRkap)}</span>
      </div>
      <div className="prog-track" style={{ marginBottom: "8px" }}>
        <div className="prog-fill" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
      </div>
      <div style={{ fontSize: "0.78rem", color: "#718096", marginBottom: "20px" }}>
        <strong style={{ color }}>{pct.toFixed(1)}%</strong> Terserap · Sisa: {formatRupiahShort(totalRkap - totalRealisasi)}
      </div>

      {/* Mini breakdown bars */}
      <div className="divider" style={{ marginTop: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        {dataOpex.map((opex) => {
          const p = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
          const c = p >= 100 ? "#e74c3c" : p >= 80 ? "#f39c12" : "#27ae60";
          return (
            <div key={opex.id} className="opex-item">
              <div style={{ fontSize: "0.75rem", color: "#555", fontWeight: 500, flex: 1,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                title={opex.nama}>{opex.nama.replace("Beban ", "")}</div>
              <div className="prog-track" style={{ width: "72px", flexShrink: 0 }}>
                <div className="prog-fill" style={{ width: `${Math.min(p, 100)}%`, background: c }} />
              </div>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: c, minWidth: "30px", textAlign: "right", flexShrink: 0 }}>{p.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>

      {/* Toggle detail */}
      <button className={`toggle-btn active`}
        onClick={() => setShowDetail((v) => !v)}
        style={{ width: "100%", padding: "10px", borderRadius: "10px", border: `1.5px solid ${showDetail ? color : "#e4e9f0"}`,
          background: showDetail ? color : "white", color: showDetail ? "white" : color,
          fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          transition: "all 0.18s ease", marginBottom: showDetail ? "14px" : 0 }}>
        {showDetail ? <FaChevronUp /> : <FaChevronDown />}
        {showDetail ? "Sembunyikan Detail" : `Lihat Detail (${dataOpex.length} Pos Anggaran)`}
      </button>

      {showDetail && (
        <div className="drop-in" style={{ border: "1px solid #edf0f5", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#f8f9fb", padding: "9px 14px", borderBottom: "1px solid #edf0f5" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#8a9bb0" }}>
              Rincian Per Pos · {tahun}
            </span>
          </div>
          <div className="thin-scroll" style={{ maxHeight: "340px", overflowY: "auto" }}>
            {dataOpex.map((opex) => {
              const p = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
              const c = p >= 100 ? "#e74c3c" : p >= 80 ? "#f39c12" : "#27ae60";
              const isOpen = openItem === opex.id;
              return (
                <div key={opex.id} style={{ borderBottom: "1px solid #f4f6f9" }}>
                  <div onClick={() => setOpenItem(isOpen ? null : opex.id)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px",
                      cursor: "pointer", background: isOpen ? "#f0f6ff" : "white", transition: "background 0.15s" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.79rem", fontWeight: 600, color: "#0d1b2a",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={opex.nama}>{opex.nama}</div>
                      <div className="prog-track" style={{ marginTop: "5px", height: "4px" }}>
                        <div className="prog-fill" style={{ width: `${Math.min(p, 100)}%`, background: c }} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "0.72rem", fontWeight: 800, color: c }}>{p.toFixed(0)}%</div>
                      <div style={{ fontSize: "0.68rem", color: "#a0aec0" }}>{formatRupiahShort(opex.realisasi)}</div>
                    </div>
                    <span style={{ color: isOpen ? "#004494" : "#cfd8e3", fontSize: "0.65rem", flexShrink: 0 }}>
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="drop-in" style={{ background: "#f8fbff", borderTop: "1px solid #e8f0fb", padding: "12px 14px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                        {[
                          { label: "RKAP",      val: formatRupiahShort(opex.rkap),                col: "#0d1b2a" },
                          { label: "Realisasi", val: formatRupiahShort(opex.realisasi),           col: c },
                          { label: "Sisa",      val: formatRupiahShort(opex.rkap - opex.realisasi), col: opex.rkap - opex.realisasi < 0 ? "#e74c3c" : "#27ae60" },
                        ].map((item) => (
                          <div key={item.label}>
                            <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "2px" }}>{item.label}</div>
                            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: item.col }}>{item.val}</div>
                          </div>
                        ))}
                      </div>
                      <div className="prog-track"><div className="prog-fill" style={{ width: `${Math.min(p, 100)}%`, background: c }} /></div>
                      <div style={{ fontSize: "0.63rem", color: "#a0aec0", marginTop: "4px" }}>{p.toFixed(1)}% dari anggaran terserap</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ================================================================
// DONUT LABEL
// ================================================================
const CustomDonutLabel = ({ viewBox }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 8}  textAnchor="middle" fill="#0d1b2a" fontSize="1.25rem" fontWeight="800">{totalKondisi.toLocaleString()}</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fill="#a0aec0" fontSize="0.7rem"  fontWeight="600">TOTAL ASET</text>
    </g>
  );
};

// ================================================================
// MAIN DASHBOARD
// ================================================================
const tahunOptions = ["2023", "2024", "2025", "2026"];

const Dashboard = () => {
  const [filterTren,    setFilterTren]    = useState("bulanan");
  const [tahunAnggaran, setTahunAnggaran] = useState("2026");
  const navigate = useNavigate();

  const dataTren     = filterTren === "harian" ? dataPeminjamanHarian : dataPeminjamanBulanan;
  const opexTahunIni = mockOpexPerTahun[tahunAnggaran] ?? [];
  const alerts       = useMemo(() => calculateAlerts(opexTahunIni), [tahunAnggaran]);
  const highCount    = alerts.filter((a) => a.priority === "high").length;
  const totalCount   = alerts.length;

  return (
    <>
      <style>{css}</style>
      <div className="db-wrap">

        {/* ── 1. HEADER ─────────────────────────────────────────── */}
        <div className="db-header">
          <div>
            <h1 className="db-title">Dashboard Overview</h1>
            <p className="db-subtitle">Monitoring Aset &amp; Anggaran · PT Pelindo Multi Terminal</p>
          </div>
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#a0aec0", marginBottom: "6px", textAlign: "right" }}>Tahun Anggaran</div>
            <div className="year-picker">
              {tahunOptions.map((t) => (
                <button key={t} className={`year-btn${tahunAnggaran === t ? " active" : ""}`} onClick={() => setTahunAnggaran(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2. STATS CARDS ────────────────────────────────────── */}
        <div className="section-label">Ringkasan Aset</div>
        <div className="stats-row">
          {[
            { title: "Total Aset",           value: "1,245", icon: <FaBox />,         color: "#004494", bg: "#e8f0fb", sub: "Unit terdaftar"   },
            { title: "Available",             value: "980",   icon: <FaCheckCircle />, color: "#27ae60", bg: "#e8f8f0", sub: "Siap digunakan"   },
            { title: "Dalam Pemeliharaan",    value: "15",    icon: <FaTools />,       color: "#f39c12", bg: "#fff8ee", sub: "Sedang diperbaiki" },
          ].map((s) => (
            <div key={s.title} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
              <div>
                <div className="stat-label">{s.title}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. BUDGET ─────────────────────────────────────────── */}
        <div className="section-label">Anggaran</div>
        <div className="budget-grid">
          <CapexMultiYearCard selectedYear={tahunAnggaran} />
          <OpexBudgetCard tahun={tahunAnggaran} dataOpex={opexTahunIni} />
        </div>

        {/* ── 4. CHARTS ─────────────────────────────────────────── */}
        <div className="section-label">Analitik</div>
        <div className="chart-grid">
          {/* Tren peminjaman */}
          <div className="card">
            <div className="card-header-row">
              <div>
                <div className="card-title">Tren Peminjaman per Kategori</div>
                <div className="card-subtitle">Volume peminjaman berdasarkan tipe aset</div>
              </div>
              <div className="toggle-pill">
                {["harian", "bulanan"].map((f) => (
                  <button key={f} className={`toggle-btn${filterTren === f ? " active" : ""}`} onClick={() => setFilterTren(f)}>
                    {f === "harian" ? "Per Hari" : "Per Bulan"}
                  </button>
                ))}
              </div>
            </div>
            {/* Legend */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "12px" }}>
              {kategoriLines.map((k) => (
                <div key={k.key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: k.color }} />
                  <span style={{ fontSize: "0.76rem", color: "#718096", fontWeight: 500 }}>{k.key}</span>
                </div>
              ))}
            </div>
            <div style={{ height: "230px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTren}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#a0aec0" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#a0aec0" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                  {kategoriLines.map((k) => (
                    <Line key={k.key} type="monotone" dataKey={k.key} stroke={k.color} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Kondisi aset */}
          <div className="card">
            <div className="card-header-row" style={{ marginBottom: "8px" }}>
              <div>
                <div className="card-title">Kondisi Aset</div>
                <div className="card-subtitle">Distribusi status kondisi</div>
              </div>
            </div>
            <div style={{ height: "210px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataKondisi} cx="50%" cy="50%" innerRadius={62} outerRadius={88}
                    paddingAngle={4} dataKey="value" labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      const r = Math.PI / 180;
                      const rad = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + rad * Math.cos(-midAngle * r);
                      const y = cy + rad * Math.sin(-midAngle * r);
                      return percent > 0.05 ? (
                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="0.7rem" fontWeight="700">
                          {(percent * 100).toFixed(1)}%
                        </text>
                      ) : null;
                    }}>
                    {dataKondisi.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    <Label content={<CustomDonutLabel />} position="center" />
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v.toLocaleString()} unit (${((v / totalKondisi) * 100).toFixed(1)}%)`, n]}
                    contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="divider" />
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {dataKondisi.map((item) => {
                const pct = ((item.value / totalKondisi) * 100).toFixed(1);
                return (
                  <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "0.8rem", color: "#555", fontWeight: 500 }}>{item.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0d1b2a" }}>{item.value.toLocaleString()}</span>
                      <span style={{ fontSize: "0.7rem", color: "white", fontWeight: 700, background: item.color,
                        padding: "2px 7px", borderRadius: "99px", minWidth: "40px", textAlign: "center" }}>{pct}%</span>
                    </div>
                  </div>
                );
              })}
              <div className="divider" style={{ margin: "4px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0d1b2a" }}>Total Aset</span>
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0d1b2a" }}>{totalKondisi.toLocaleString()} Unit</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. SMART ALERTS ───────────────────────────────────── */}
        <div className="section-label">Notifikasi & Peringatan</div>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <div className="card-title">⚠️ Smart Alerts</div>
              <div className="card-subtitle">Deteksi otomatis kondisi yang memerlukan perhatian</div>
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "99px",
              background: totalCount === 0 ? "#e8f8f0" : highCount > 0 ? "#fdecea" : "#fff8ee",
              color:      totalCount === 0 ? "#27ae60" : highCount > 0 ? "#e74c3c" : "#f39c12" }}>
              {totalCount === 0 ? "Semua Normal ✓" : highCount > 0 ? `${highCount} Prioritas Tinggi · ${totalCount} Total` : `${totalCount} Perlu Tindakan`}
            </span>
          </div>

          {totalCount === 0 && (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#a0aec0", fontSize: "0.9rem" }}>
              Tidak ada alert saat ini. Semua kondisi normal.
            </div>
          )}

          <div className="alert-list">
            {alerts.map((alert) => {
              const s = ALERT_STYLE[alert.type] ?? { icon: <FaExclamationTriangle />, bg: "#fdecea", color: "#e74c3c" };
              return (
                <div key={alert.id} className="alert-item">
                  <div className="alert-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-text">{alert.message}</div>
                  </div>
                  <button className="alert-btn" onClick={() => navigate(alert.action_path)}>{alert.action_label}</button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;