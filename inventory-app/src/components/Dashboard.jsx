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
import "./Dashboard.css";

// ================================================================
// MOCK DATA — Tren Peminjaman
// ================================================================
const dataPeminjamanHarian = [
  { name: "Sen", Laptop: 8, Proyektor: 3, Kamera: 2, Kendaraan: 1 },
  { name: "Sel", Laptop: 12, Proyektor: 5, Kamera: 4, Kendaraan: 2 },
  { name: "Rab", Laptop: 10, Proyektor: 7, Kamera: 3, Kendaraan: 3 },
  { name: "Kam", Laptop: 15, Proyektor: 4, Kamera: 6, Kendaraan: 2 },
  { name: "Jum", Laptop: 9, Proyektor: 6, Kamera: 5, Kendaraan: 4 },
  { name: "Sab", Laptop: 5, Proyektor: 2, Kamera: 2, Kendaraan: 1 },
  { name: "Min", Laptop: 3, Proyektor: 1, Kamera: 1, Kendaraan: 0 },
];
const dataPeminjamanBulanan = [
  { name: "Jan", Laptop: 40, Proyektor: 20, Kamera: 15, Kendaraan: 10 },
  { name: "Feb", Laptop: 30, Proyektor: 18, Kamera: 12, Kendaraan: 8 },
  { name: "Mar", Laptop: 65, Proyektor: 30, Kamera: 20, Kendaraan: 12 },
  { name: "Apr", Laptop: 50, Proyektor: 25, Kamera: 18, Kendaraan: 9 },
  { name: "Mei", Laptop: 85, Proyektor: 35, Kamera: 28, Kendaraan: 15 },
  { name: "Jun", Laptop: 120, Proyektor: 45, Kamera: 35, Kendaraan: 20 },
];
const kategoriLines = [
  { key: "Laptop", color: "#004494" },
  { key: "Proyektor", color: "#27ae60" },
  { key: "Kamera", color: "#e67e22" },
  { key: "Kendaraan", color: "#8e44ad" },
];

// ================================================================
// MOCK DATA — Kondisi Aset
// ================================================================
const dataKondisi = [
  { name: "Baik", value: 850, color: "#2ecc71" },
  { name: "Dalam Pemeliharaan", value: 80, color: "#3498db" },
  { name: "Rusak Berat", value: 45, color: "#e74c3c" },
  { name: "Rusak Ringan", value: 120, color: "#f1c40f" },
];
const totalKondisi = dataKondisi.reduce((sum, d) => sum + d.value, 0);

// ================================================================
// MOCK DATA — CAPEX sesuai struktur tabel database
// nm_anggaran_capex, thn_rkap_awal, thn_rkap_akhir, thn_anggaran
// Satu program bisa muncul di beberapa thn_anggaran (multi-year spending)
// ================================================================
const mockCapexRows = [
  {
    nm_anggaran_capex: "Implementasi dan Standarisasi IT Infrastruktur",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_anggaran: 1200000000,
    realisasi: 1200000000,
    status: "selesai",
  },
  {
    nm_anggaran_capex: "Penyediaan Network di Branch SPMT",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_anggaran: 800000000,
    realisasi: 800000000,
    status: "selesai",
  },
  {
    nm_anggaran_capex:
      "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_anggaran: 3500000000,
    realisasi: 3500000000,
    status: "selesai",
  },
  {
    nm_anggaran_capex:
      "Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC Transformasi pada Branch SPMT)",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2025,
    thn_anggaran: 2025,
    nilai_anggaran: 1500000000,
    realisasi: 1200000000,
    status: "berjalan",
  },
  {
    nm_anggaran_capex:
      "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2025,
    nilai_anggaran: 2000000000,
    realisasi: 1600000000,
    status: "berjalan",
  },
  {
    nm_anggaran_capex:
      "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2025,
    nilai_anggaran: 1800000000,
    realisasi: 1300000000,
    status: "berjalan",
  },
  {
    nm_anggaran_capex: "Penyiapan Infrastruktur IT pada Kegiatan Roro",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2025,
    nilai_anggaran: 900000000,
    realisasi: 650000000,
    status: "berjalan",
  },
  {
    nm_anggaran_capex:
      "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2026,
    nilai_anggaran: 2000000000,
    realisasi: 800000000,
    status: "berjalan",
  },
  {
    nm_anggaran_capex:
      "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2026,
    nilai_anggaran: 1800000000,
    realisasi: 400000000,
    status: "berjalan",
  },
  {
    nm_anggaran_capex: "Penyiapan Infrastruktur IT pada Kegiatan Roro",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2026,
    nilai_anggaran: 900000000,
    realisasi: 150000000,
    status: "berjalan",
  },
];

// ================================================================
// MOCK DATA — OPEX per tahun
// Satu tahun bisa banyak item beban/pekerjaan
// ================================================================
const mockOpexPerTahun = {
  2023: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 400000000,
      realisasi: 400000000,
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 500000000,
      realisasi: 498000000,
    },
    {
      id: 3,
      nama: "Beban Perlengkapan Kantor",
      rkap: 600000000,
      realisasi: 590000000,
    },
    {
      id: 4,
      nama: "Beban Jasa Konsultan",
      rkap: 700000000,
      realisasi: 695000000,
    },
    {
      id: 5,
      nama: "Beban SDM Pihak Ketiga",
      rkap: 800000000,
      realisasi: 780000000,
    },
  ],
  2024: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 450000000,
      realisasi: 440000000,
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 550000000,
      realisasi: 530000000,
    },
    {
      id: 3,
      nama: "Beban Perlengkapan Kantor",
      rkap: 650000000,
      realisasi: 620000000,
    },
    {
      id: 4,
      nama: "Beban Jasa Konsultan",
      rkap: 750000000,
      realisasi: 740000000,
    },
    {
      id: 5,
      nama: "Beban SDM Pihak Ketiga",
      rkap: 850000000,
      realisasi: 810000000,
    },
  ],
  2025: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 500000000,
      realisasi: 420000000,
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 600000000,
      realisasi: 510000000,
    },
    {
      id: 3,
      nama: "Beban Perlengkapan Kantor",
      rkap: 700000000,
      realisasi: 580000000,
    },
    {
      id: 4,
      nama: "Beban Jasa Konsultan",
      rkap: 800000000,
      realisasi: 720000000,
    },
    {
      id: 5,
      nama: "Beban SDM Pihak Ketiga",
      rkap: 900000000,
      realisasi: 760000000,
    },
    {
      id: 6,
      nama: "Beban Lisensi & Subscription",
      rkap: 300000000,
      realisasi: 280000000,
    },
  ],
  2026: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 500000000,
      realisasi: 85000000,
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 600000000,
      realisasi: 240000000,
    },
    {
      id: 3,
      nama: "Beban Perlengkapan Kantor",
      rkap: 700000000,
      realisasi: 45000000,
    },
    {
      id: 4,
      nama: "Beban Jasa Konsultan",
      rkap: 800000000,
      realisasi: 400000000,
    },
    {
      id: 5,
      nama: "Beban SDM Pihak Ketiga",
      rkap: 900000000,
      realisasi: 150000000,
    },
    {
      id: 6,
      nama: "Beban Outsourcing IT",
      rkap: 450000000,
      realisasi: 120000000,
    },
  ],
};

// ================================================================
// MOCK DATA — Peminjaman
// ================================================================
const mockBorrows = [
  {
    id_peminjaman: 1,
    asset_code: "SPMT-MLH-LPG-DMG-01",
    asset_name: "CCTV Hikvision Malahayati",
    borrower_name: "Andi Pratama",
    borrow_date: "2026-01-10",
    due_date: "2026-01-20",
    is_returned: true,
    return_condition: "GOOD",
  },
  {
    id_peminjaman: 2,
    asset_code: "SPMT-MLH-LPG-DMG-01",
    asset_name: "CCTV Hikvision Malahayati",
    borrower_name: "Budi Santoso",
    borrow_date: "2026-02-01",
    due_date: "2026-02-15",
    is_returned: true,
    return_condition: "MINOR_DAMAGE",
  },
  {
    id_peminjaman: 3,
    asset_code: "SPMT-MLH-LPG-DMG-01",
    asset_name: "CCTV Hikvision Malahayati",
    borrower_name: "Citra Dewi",
    borrow_date: "2026-02-20",
    due_date: "2026-03-01",
    is_returned: true,
    return_condition: "DAMAGED",
  },
  {
    id_peminjaman: 4,
    asset_code: "SPMT-LHK-DTC-PKR-02",
    asset_name: "Core Switch Lhokseumawe",
    borrower_name: "Deni Kurniawan",
    borrow_date: "2026-01-05",
    due_date: "2026-01-20",
    is_returned: false,
    return_condition: null,
  },
  {
    id_peminjaman: 5,
    asset_code: "SPMT-GRG-DTC-PKR-01",
    asset_name: "Access Switch Garongkong",
    borrower_name: "Eka Saputra",
    borrow_date: "2026-02-10",
    due_date: "2026-02-20",
    is_returned: false,
    return_condition: null,
  },
  {
    id_peminjaman: 6,
    asset_code: "SPMT-TBK-DTC-PKR-01",
    asset_name: "Core Switch Tanjung Balai Karimun",
    borrower_name: "Fajar Hidayat",
    borrow_date: "2026-02-25",
    due_date: "2026-03-10",
    is_returned: false,
    return_condition: null,
  },
  {
    id_peminjaman: 7,
    asset_code: "SPMT-LHK-LPG-DMG-01",
    asset_name: "CCTV Hikvision Lhokseumawe",
    borrower_name: "Gita Rahayu",
    borrow_date: "2026-01-15",
    due_date: "2026-01-30",
    is_returned: true,
    return_condition: "MINOR_DAMAGE",
  },
  {
    id_peminjaman: 8,
    asset_code: "SPMT-LHK-LPG-DMG-01",
    asset_name: "CCTV Hikvision Lhokseumawe",
    borrower_name: "Hendra Wijaya",
    borrow_date: "2026-02-15",
    due_date: "2026-02-28",
    is_returned: true,
    return_condition: "MINOR_DAMAGE",
  },
];

// ================================================================
// HELPERS
// ================================================================
const formatRupiah = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const formatRupiahShort = (v) => {
  if (v >= 1_000_000_000) return `Rp ${(v / 1_000_000_000).toFixed(1)} M`;
  if (v >= 1_000_000) return `Rp ${(v / 1_000_000).toFixed(0)} Jt`;
  return formatRupiah(v);
};

// ================================================================
// ALERTS
// ================================================================
const calculateAlerts = (opexData) => {
  const alerts = [];
  const today = new Date();

  const damageCount = {};
  const damageNames = {};
  mockBorrows.forEach((b) => {
    if (
      b.is_returned &&
      (b.return_condition === "MINOR_DAMAGE" ||
        b.return_condition === "DAMAGED")
    ) {
      damageCount[b.asset_code] = (damageCount[b.asset_code] || 0) + 1;
      damageNames[b.asset_code] = b.asset_name;
    }
  });
  Object.entries(damageCount).forEach(([code, count]) => {
    if (count >= 2)
      alerts.push({
        id: `damage-${code}`,
        type: "FREQUENT_DAMAGE",
        priority: "high",
        title: "Aset Sering Rusak",
        message: `${damageNames[code]} (${code}) dikembalikan rusak sebanyak ${count}x. Pertimbangkan pengecekan atau penggantian.`,
        action_label: "Lihat Riwayat",
        action_path: "/peminjaman",
      });
  });

  const overdue = mockBorrows.filter(
    (b) => !b.is_returned && new Date(b.due_date) < today,
  );
  if (overdue.length > 0)
    alerts.push({
      id: "overdue-summary",
      type: "OVERDUE_BORROW",
      priority: "medium",
      title: "Peminjaman Melewati Jatuh Tempo",
      message: `${overdue.length} aset melewati jatuh tempo: ${overdue.map((b) => b.asset_name).join(", ")}. Segera tindak lanjut.`,
      action_label: "Cek Peminjaman",
      action_path: "/peminjaman",
    });

  opexData.forEach((opex) => {
    const pct = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
    if (pct >= 80)
      alerts.push({
        id: `opex-critical-${opex.id}`,
        type: "OPEX_CRITICAL",
        priority: pct >= 100 ? "high" : "medium",
        title: "Anggaran OPEX Kritis",
        message: `${opex.nama} terserap ${pct.toFixed(1)}% (${formatRupiah(opex.realisasi)} dari ${formatRupiah(opex.rkap)}). Sisa: ${formatRupiah(opex.rkap - opex.realisasi)}.`,
        action_label: "Lihat Anggaran",
        action_path: "/budget",
      });
  });

  const order = { high: 0, medium: 1, low: 2 };
  alerts.sort((a, b) => order[a.priority] - order[b.priority]);
  return alerts;
};

const ALERT_STYLE = {
  FREQUENT_DAMAGE: {
    icon: <FaExclamationTriangle />,
    bg: "#fdecea",
    color: "#e74c3c",
  },
  OVERDUE_BORROW: {
    icon: <FaClipboardList />,
    bg: "#fef5e7",
    color: "#f39c12",
  },
  OPEX_CRITICAL: {
    icon: <FaFileInvoiceDollar />,
    bg: "#fef5e7",
    color: "#d35400",
  },
  CAPEX_NO_ASSET: { icon: <FaTimesCircle />, bg: "#eaf4fb", color: "#2980b9" },
  CAPEX_IMBALANCE: {
    icon: <FaBalanceScale />,
    bg: "#f4ecf7",
    color: "#8e44ad",
  },
};

// ================================================================
// SUB-COMPONENTS
// ================================================================
const CustomKondisiLegend = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginTop: "16px",
    }}
  >
    {dataKondisi.map((item) => {
      const pct = ((item.value / totalKondisi) * 100).toFixed(1);
      return (
        <div
          key={item.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: item.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{ fontSize: "0.82rem", color: "#555", fontWeight: 500 }}
            >
              {item.name}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#2c3e50",
                minWidth: "32px",
                textAlign: "right",
              }}
            >
              {item.value.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "white",
                fontWeight: 700,
                background: item.color,
                padding: "2px 7px",
                borderRadius: "10px",
                minWidth: "42px",
                textAlign: "center",
              }}
            >
              {pct}%
            </span>
          </div>
        </div>
      );
    })}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #f1f2f6",
        paddingTop: "8px",
        marginTop: "4px",
      }}
    >
      <span style={{ fontSize: "0.82rem", color: "#2c3e50", fontWeight: 700 }}>
        Total Aset
      </span>
      <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#2c3e50" }}>
        {totalKondisi.toLocaleString()} Unit
      </span>
    </div>
  </div>
);

const CustomDonutLabel = ({ viewBox }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="#2c3e50"
        fontSize="1.3rem"
        fontWeight="800"
      >
        {totalKondisi.toLocaleString()}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="#95a5a6"
        fontSize="0.72rem"
        fontWeight="600"
      >
        TOTAL ASET
      </text>
    </g>
  );
};

const StatsCard = ({ title, value, icon, color, sub }) => (
  <div className="stats-card" style={{ borderLeftColor: color }}>
    <div
      className="stats-icon-wrapper"
      style={{ background: `${color}15`, color }}
    >
      {icon}
    </div>
    <div className="stats-content">
      <p>{title}</p>
      <h3>{value}</h3>
      <span className="stats-sub" style={{ color }}>
        {sub}
      </span>
    </div>
  </div>
);

const AlertItem = ({
  icon,
  bg,
  color,
  title,
  text,
  btnText = "Cek Detail",
  onAction,
}) => (
  <div className="alert-item">
    <div className="alert-icon-circle" style={{ background: bg, color }}>
      {icon}
    </div>
    <div className="alert-content">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
    <button className="alert-action-btn" onClick={onAction}>
      {btnText}
    </button>
  </div>
);

// ================================================================
// STATUS CONFIG
// ================================================================
const statusConfig = {
  selesai: {
    color: "#27ae60",
    bg: "#e8f8f0",
    label: "Selesai",
    dot: "#27ae60",
  },
  berjalan: {
    color: "#004494",
    bg: "#e8f0fb",
    label: "Berjalan",
    dot: "#004494",
  },
  belum: {
    color: "#b0b8c1",
    bg: "#f1f2f6",
    label: "Belum Mulai",
    dot: "#b0b8c1",
  },
};

// ================================================================
// CAPEX CARD
// - Semua tahun tampil sekaligus dengan progress bar masing-masing
// - Klik chevron per-tahun → muncul dropdown detail pekerjaan tahun itu
// ================================================================
const CapexMultiYearCard = ({ selectedYear }) => {
  // selectedCapexTahun: tahun yang dipilih di dropdown (null = belum pilih)
  const [selectedCapexTahun, setSelectedCapexTahun] = useState(null);
  // openYear: baris tahun yang dropdown detailnya terbuka
  const [openYear, setOpenYear] = useState(null);

  // Sync dropdown ke selectedYear dari header saat pertama render / ganti tahun
  React.useEffect(() => {
    setSelectedCapexTahun(selectedYear);
    setOpenYear(null);
  }, [selectedYear]);

  // Group rows by thn_anggaran
  const byTahun = useMemo(() => {
    const map = {};
    mockCapexRows.forEach((row) => {
      const y = String(row.thn_anggaran);
      if (!map[y]) map[y] = [];
      map[y].push(row);
    });
    return map;
  }, []);

  const tahunList = Object.keys(byTahun).sort();

  const totalAnggaran = mockCapexRows.reduce((s, r) => s + r.nilai_anggaran, 0);
  const totalRealisasi = mockCapexRows.reduce((s, r) => s + r.realisasi, 0);
  const pctTotal =
    totalAnggaran > 0 ? (totalRealisasi / totalAnggaran) * 100 : 0;

  const tahunSummary = tahunList.map((y) => {
    const rows = byTahun[y];
    const anggaran = rows.reduce((s, r) => s + r.nilai_anggaran, 0);
    const realisasi = rows.reduce((s, r) => s + r.realisasi, 0);
    const pct = anggaran > 0 ? (realisasi / anggaran) * 100 : 0;
    const hasBerjalan = rows.some((r) => r.status === "berjalan");
    const hasSelesai = rows.some((r) => r.status === "selesai");
    const status = hasBerjalan ? "berjalan" : hasSelesai ? "selesai" : "belum";
    return { tahun: y, anggaran, realisasi, pct, status, rows };
  });

  const tahunAktif = tahunSummary.filter((t) => t.status !== "belum").length;

  // Data untuk tahun yang dipilih (untuk stacked bar & rows)
  const visibleSummary = selectedCapexTahun
    ? tahunSummary.filter((t) => t.tahun === selectedCapexTahun)
    : [];

  return (
    <div className="dashboard-card capex-card">
      {/* ── Header ── */}
      <div className="card-header" style={{ marginBottom: "12px" }}>
        <div>
          <h3 className="section-title">Anggaran CAPEX</h3>
          <span className="section-subtitle">Multi-Year · Semua Program</span>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
          <div
            style={{
              fontSize: "0.68rem",
              color: "#95a5a6",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Total RKAP
          </div>
          <div
            style={{
              fontSize: "1.55rem",
              fontWeight: 800,
              color: "#004494",
              lineHeight: 1.2,
            }}
          >
            {formatRupiahShort(totalAnggaran)}
          </div>
          <div
            style={{ fontSize: "0.72rem", color: "#7f8c8d", marginTop: "2px" }}
          >
            {tahunList[0]}–{tahunList[tahunList.length - 1]}
          </div>
        </div>
      </div>

      {/* ── Overall progress (selalu tampil) ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <span style={{ fontSize: "0.8rem", color: "#7f8c8d", fontWeight: 600 }}>
          Total Realisasi:{" "}
          <strong style={{ color: "#2c3e50" }}>
            {formatRupiahShort(totalRealisasi)}
          </strong>
        </span>
        <span
          style={{ fontSize: "0.88rem", fontWeight: 800, color: "#004494" }}
        >
          {pctTotal.toFixed(1)}%
        </span>
      </div>
      <div className="capex-bar-scroll-wrap" style={{ marginBottom: "16px" }}>
        <div
          className="capex-stacked-bar-bg"
          style={{ minWidth: `${tahunSummary.length * 60}px` }}
        >
          {tahunSummary.map((t) => {
            const segW = (t.anggaran / totalAnggaran) * 100;
            const fillW = t.anggaran > 0 ? (t.realisasi / t.anggaran) * 100 : 0;
            const cfg = statusConfig[t.status];
            const isActive = t.tahun === selectedCapexTahun;
            return (
              <div
                key={t.tahun}
                className={`capex-stacked-segment ${isActive ? "capex-stacked-segment--active" : ""}`}
                style={{ width: `${segW}%` }}
                title={`${t.tahun}: ${formatRupiahShort(t.realisasi)} / ${formatRupiahShort(t.anggaran)} (${fillW.toFixed(1)}%)`}
              >
                <div
                  className="capex-stacked-fill"
                  style={{ width: `${fillW}%`, background: cfg.color }}
                />
              </div>
            );
          })}
        </div>
        <div
          className="capex-stacked-labels"
          style={{ minWidth: `${tahunSummary.length * 60}px` }}
        >
          {tahunSummary.map((t) => {
            const segW = (t.anggaran / totalAnggaran) * 100;
            const isActive = t.tahun === selectedCapexTahun;
            return (
              <div
                key={t.tahun}
                style={{
                  width: `${segW}%`,
                  textAlign: "center",
                  fontSize: "0.68rem",
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? "#004494" : "#95a5a6",
                }}
              >
                {t.tahun}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dropdown pilih tahun anggaran ── */}
      <div style={{ marginBottom: "14px" }}>
        <label
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "#7f8c8d",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            display: "block",
            marginBottom: "6px",
          }}
        >
          Pilih Tahun Anggaran
        </label>
        <div style={{ position: "relative" }}>
          <select
            value={selectedCapexTahun ?? ""}
            onChange={(e) => {
              setSelectedCapexTahun(e.target.value || null);
              setOpenYear(null);
            }}
            style={{
              width: "100%",
              padding: "9px 36px 9px 12px",
              borderRadius: "8px",
              border: `1.5px solid ${selectedCapexTahun ? "#004494" : "#d0d7e2"}`,
              background: "white",
              fontSize: "0.88rem",
              fontWeight: selectedCapexTahun ? 700 : 400,
              color: selectedCapexTahun ? "#2c3e50" : "#95a5a6",
              cursor: "pointer",
              appearance: "none",
              WebkitAppearance: "none",
              fontFamily: "inherit",
              outline: "none",
              boxShadow: selectedCapexTahun
                ? "0 0 0 3px rgba(0,68,148,0.1)"
                : "none",
              transition: "all 0.2s ease",
            }}
          >
            <option value="">-- Pilih tahun anggaran --</option>
            {tahunSummary.map((t) => {
              const cfg = statusConfig[t.status];
              return (
                <option key={t.tahun} value={t.tahun}>
                  {t.tahun} · {cfg.label} · {t.pct.toFixed(1)}%
                </option>
              );
            })}
          </select>
          {/* Custom chevron icon */}
          <div
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: selectedCapexTahun ? "#004494" : "#b0b8c1",
              fontSize: "0.75rem",
            }}
          >
            <FaChevronDown />
          </div>
        </div>
      </div>

      {/* ── Baris progress per tahun — muncul setelah tahun dipilih ── */}
      {selectedCapexTahun ? (
        <div
          className="capex-year-rows"
          style={{ animation: "capexDropIn 0.2s ease-out" }}
        >
          {visibleSummary.map((t) => {
            const cfg = statusConfig[t.status];
            const isOpen = openYear === t.tahun;

            return (
              <div
                key={t.tahun}
                style={{
                  borderRadius: "8px",
                  border: `1px solid #c7d9f8`,
                  background: "#eef4ff",
                  overflow: "hidden",
                }}
              >
                {/* Row header — klik untuk toggle dropdown detail pekerjaan */}
                <div
                  className="capex-year-row"
                  onClick={() => setOpenYear(isOpen ? null : t.tahun)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Kiri: dot + tahun + badge status */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      minWidth: "100px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: cfg.dot,
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 800,
                        color: cfg.color,
                      }}
                    >
                      {t.tahun}
                    </span>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: "8px",
                        background: cfg.bg,
                        color: cfg.color,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  {/* Tengah: progress bar */}
                  <div style={{ flex: 1, margin: "0 10px" }}>
                    <div
                      style={{
                        height: "6px",
                        borderRadius: "3px",
                        background: "#d0dcf0",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${Math.min(t.pct, 100)}%`,
                          background: cfg.color,
                          borderRadius: "3px",
                          transition: "width 0.7s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* Kanan: nilai + persen + chevron */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div style={{ textAlign: "right", minWidth: "140px" }}>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#2c3e50",
                        }}
                      >
                        {formatRupiahShort(t.realisasi)}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#95a5a6",
                          fontWeight: 400,
                        }}
                      >
                        {" "}
                        / {formatRupiahShort(t.anggaran)}
                      </span>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          color: cfg.color,
                        }}
                      >
                        {t.pct.toFixed(1)}%
                      </div>
                    </div>
                    <div
                      style={{
                        color: isOpen ? "#004494" : "#b0b8c1",
                        fontSize: "0.7rem",
                        transition: "color 0.2s",
                        width: "14px",
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                </div>

                {/* DROPDOWN: daftar pekerjaan */}
                {isOpen && (
                  <div
                    style={{
                      borderTop: "1px solid #c7d9f8",
                      background: "white",
                      padding: "10px 14px",
                      animation: "capexDropIn 0.18s ease-out",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.67rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#95a5a6",
                        marginBottom: "8px",
                      }}
                    >
                      {t.rows.length} Pekerjaan · Thn Anggaran {t.tahun}
                    </div>

                    {t.rows.map((row, idx) => {
                      const pct =
                        row.nilai_anggaran > 0
                          ? (row.realisasi / row.nilai_anggaran) * 100
                          : 0;
                      const rowCfg = statusConfig[row.status];
                      return (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            padding: "7px 0",
                            borderBottom:
                              idx < t.rows.length - 1
                                ? "1px solid #f5f6f8"
                                : "none",
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                color: "#2c3e50",
                                lineHeight: 1.35,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                              title={row.nm_anggaran_capex}
                            >
                              {row.nm_anggaran_capex}
                            </div>
                            <div
                              style={{
                                fontSize: "0.64rem",
                                color: "#95a5a6",
                                marginTop: "2px",
                              }}
                            >
                              RKAP {row.thn_rkap_awal}
                              {row.thn_rkap_akhir !== row.thn_rkap_awal
                                ? `–${row.thn_rkap_akhir}`
                                : ""}
                            </div>
                          </div>
                          <div
                            style={{
                              flexShrink: 0,
                              width: "68px",
                              paddingTop: "3px",
                            }}
                          >
                            <div
                              style={{
                                height: "4px",
                                borderRadius: "2px",
                                background: "#f1f2f6",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${Math.min(pct, 100)}%`,
                                  background: rowCfg.color,
                                  borderRadius: "2px",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                fontSize: "0.64rem",
                                fontWeight: 700,
                                color: rowCfg.color,
                                textAlign: "right",
                                marginTop: "2px",
                              }}
                            >
                              {pct.toFixed(0)}%
                            </div>
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              flexShrink: 0,
                              minWidth: "105px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                color: "#2c3e50",
                              }}
                            >
                              {formatRupiahShort(row.realisasi)}
                            </div>
                            <div
                              style={{ fontSize: "0.67rem", color: "#95a5a6" }}
                            >
                              / {formatRupiahShort(row.nilai_anggaran)}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Sub-total */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "8px",
                        marginTop: "4px",
                        borderTop: "1.5px solid #e8ecf0",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          color: "#7f8c8d",
                        }}
                      >
                        Total Tahun {t.tahun}
                      </span>
                      <div>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 800,
                            color: "#27ae60",
                          }}
                        >
                          {formatRupiahShort(t.realisasi)}
                        </span>
                        <span style={{ fontSize: "0.7rem", color: "#95a5a6" }}>
                          {" "}
                          dari {formatRupiahShort(t.anggaran)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Placeholder: belum pilih tahun ── */
        <div
          style={{
            border: "1.5px dashed #d0d7e2",
            borderRadius: "10px",
            padding: "28px 20px",
            textAlign: "center",
            marginBottom: "14px",
            background: "#fafbfc",
          }}
        >
          <div style={{ fontSize: "1.6rem", marginBottom: "8px" }}>📅</div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#7f8c8d",
              marginBottom: "4px",
            }}
          >
            Pilih tahun anggaran terlebih dahulu
          </div>
          <div style={{ fontSize: "0.75rem", color: "#b0b8c1" }}>
            Progress per tahun akan tampil di sini
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="capex-footer-summary">
        <div className="capex-footer-item">
          <span>Sudah Terserap</span>
          <strong style={{ color: "#27ae60" }}>
            {formatRupiahShort(totalRealisasi)}
          </strong>
        </div>
        <div className="capex-footer-divider" />
        <div className="capex-footer-item">
          <span>Sisa Anggaran</span>
          <strong style={{ color: "#e74c3c" }}>
            {formatRupiahShort(totalAnggaran - totalRealisasi)}
          </strong>
        </div>
        <div className="capex-footer-divider" />
        <div className="capex-footer-item">
          <span>Rentang Tahun</span>
          <strong style={{ color: "#004494" }}>{tahunAktif} Tahun Aktif</strong>
        </div>
      </div>
    </div>
  );
};

// ================================================================
// OPEX CARD
// - Default: total progress + mini bar per pos (tanpa angka detail)
// - Klik "Lihat Detail" → muncul semua nama pos + bisa klik tiap item untuk expand
// ================================================================
const OpexBudgetCard = ({ tahun, dataOpex }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [openItem, setOpenItem] = useState(null);

  // Reset saat tahun berubah
  React.useEffect(() => {
    setShowDetail(false);
    setOpenItem(null);
  }, [tahun]);

  const totalRkap = dataOpex.reduce((s, o) => s + o.rkap, 0);
  const totalRealisasi = dataOpex.reduce((s, o) => s + o.realisasi, 0);
  const pct = totalRkap > 0 ? (totalRealisasi / totalRkap) * 100 : 0;
  const color = pct >= 100 ? "#e74c3c" : pct >= 80 ? "#f39c12" : "#d35400";

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h3 className="section-title">Anggaran OPEX</h3>
          <span className="section-subtitle">
            Realisasi vs RKAP · Tahun {tahun} · {dataOpex.length} Pos
          </span>
        </div>
      </div>

      {/* ── Total overview ── */}
      <div className="budget-value-row">
        <h2 className="current-value" style={{ color }}>
          {formatRupiahShort(totalRealisasi)}
        </h2>
        <span className="target-value">/ {formatRupiahShort(totalRkap)}</span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(pct, 100)}%`, background: color }}
        />
      </div>
      <p className="budget-summary-text">
        <strong>{pct.toFixed(1)}%</strong> Terserap. Sisa:{" "}
        {formatRupiahShort(totalRkap - totalRealisasi)}
      </p>

      {/* ── Mini bar ringkasan per pos (selalu tampil, tanpa angka detail) ── */}
      <div
        style={{
          borderTop: "1px solid #f1f2f6",
          paddingTop: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          marginBottom: "14px",
        }}
      >
        {dataOpex.map((opex) => {
          const p = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
          const c = p >= 100 ? "#e74c3c" : p >= 80 ? "#f39c12" : "#27ae60";
          return (
            <div
              key={opex.id}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{
                  fontSize: "0.76rem",
                  color: "#555",
                  fontWeight: 500,
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={opex.nama}
              >
                {opex.nama.replace("Beban ", "")}
              </div>
              <div
                style={{
                  width: "80px",
                  height: "5px",
                  borderRadius: "3px",
                  background: "#f1f2f6",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(p, 100)}%`,
                    background: c,
                    borderRadius: "3px",
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: c,
                  minWidth: "32px",
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {p.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Tombol Lihat Detail ── */}
      <button
        onClick={() => setShowDetail((v) => !v)}
        style={{
          width: "100%",
          padding: "9px",
          borderRadius: "8px",
          border: `1px solid ${color}`,
          background: showDetail ? color : "white",
          color: showDetail ? "white" : color,
          fontWeight: 700,
          fontSize: "0.82rem",
          cursor: "pointer",
          transition: "all 0.18s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          fontFamily: "inherit",
          marginBottom: showDetail ? "12px" : "0",
        }}
      >
        {showDetail ? <FaChevronUp /> : <FaChevronDown />}
        {showDetail
          ? "Sembunyikan Detail"
          : `Lihat Detail (${dataOpex.length} Pos Anggaran)`}
      </button>

      {/* ── Detail per-item: muncul saat showDetail ── */}
      {showDetail && (
        <div
          style={{
            border: "1px solid #e8ecf0",
            borderRadius: "10px",
            overflow: "hidden",
            animation: "capexDropIn 0.2s ease-out",
          }}
        >
          <div
            style={{
              background: "#f8f9fb",
              padding: "8px 14px",
              borderBottom: "1px solid #e8ecf0",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#7f8c8d",
              }}
            >
              Rincian Per Pos Anggaran · {tahun}
            </span>
          </div>
          <div
            style={{
              maxHeight: "360px",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#d0d7e2 transparent",
            }}
          >
            {dataOpex.map((opex) => {
              const p = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
              const c = p >= 100 ? "#e74c3c" : p >= 80 ? "#f39c12" : "#27ae60";
              const isOpen = openItem === opex.id;
              return (
                <div
                  key={opex.id}
                  style={{ borderBottom: "1px solid #f1f2f6" }}
                >
                  {/* Row item — klik untuk expand detail angka */}
                  <div
                    onClick={() => setOpenItem(isOpen ? null : opex.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      cursor: "pointer",
                      background: isOpen ? "#f0f6ff" : "white",
                      transition: "background 0.15s",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "0.79rem",
                          fontWeight: 600,
                          color: "#2c3e50",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={opex.nama}
                      >
                        {opex.nama}
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          height: "4px",
                          borderRadius: "2px",
                          background: "#f1f2f6",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${Math.min(p, 100)}%`,
                            background: c,
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          color: c,
                        }}
                      >
                        {p.toFixed(0)}%
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#95a5a6" }}>
                        {formatRupiahShort(opex.realisasi)}
                      </div>
                    </div>
                    <span
                      style={{
                        color: isOpen ? "#004494" : "#b0b8c1",
                        fontSize: "0.65rem",
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>

                  {/* Detail item: RKAP, Realisasi, Sisa */}
                  {isOpen && (
                    <div
                      style={{
                        background: "#f8fbff",
                        borderTop: "1px solid #e8f0fb",
                        padding: "10px 14px",
                        animation: "capexDropIn 0.15s ease-out",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "10px",
                          marginBottom: "8px",
                        }}
                      >
                        {[
                          {
                            label: "RKAP",
                            val: formatRupiahShort(opex.rkap),
                            col: "#2c3e50",
                          },
                          {
                            label: "Realisasi",
                            val: formatRupiahShort(opex.realisasi),
                            col: c,
                          },
                          {
                            label: "Sisa",
                            val: formatRupiahShort(opex.rkap - opex.realisasi),
                            col:
                              opex.rkap - opex.realisasi < 0
                                ? "#e74c3c"
                                : "#27ae60",
                          },
                        ].map((item) => (
                          <div key={item.label}>
                            <div
                              style={{
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                color: "#95a5a6",
                                textTransform: "uppercase",
                                letterSpacing: "0.4px",
                              }}
                            >
                              {item.label}
                            </div>
                            <div
                              style={{
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                color: item.col,
                              }}
                            >
                              {item.val}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          height: "5px",
                          borderRadius: "3px",
                          background: "#e8ecf0",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${Math.min(p, 100)}%`,
                            background: c,
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: "0.63rem",
                          color: "#95a5a6",
                          marginTop: "3px",
                        }}
                      >
                        {p.toFixed(1)}% dari anggaran terserap
                      </div>
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

// ================================================================
// MAIN DASHBOARD
// ================================================================
const tahunOptions = ["2023", "2024", "2025", "2026"];

const Dashboard = () => {
  const [filterTren, setFilterTren] = useState("bulanan");
  const [tahunAnggaran, setTahunAnggaran] = useState("2026");
  const navigate = useNavigate();

  const dataTren =
    filterTren === "harian" ? dataPeminjamanHarian : dataPeminjamanBulanan;

  const opexTahunIni = mockOpexPerTahun[tahunAnggaran] ?? [];

  const alerts = useMemo(() => calculateAlerts(opexTahunIni), [tahunAnggaran]);
  const highCount = alerts.filter((a) => a.priority === "high").length;
  const totalCount = alerts.length;

  return (
    <div className="dashboard-wrapper">
      {/* Animasi dropdown */}
      <style>{`
        @keyframes capexDropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* 1. HEADER */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">
            Monitoring Aset &amp; Anggaran PT Pelindo Multi Terminal
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "#95a5a6",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Tahun Anggaran
          </span>
          <div
            style={{
              display: "flex",
              background: "white",
              borderRadius: "12px",
              padding: "4px",
              gap: "4px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              border: "1px solid #e8ecf0",
            }}
          >
            {tahunOptions.map((t) => (
              <button
                key={t}
                onClick={() => setTahunAnggaran(t)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  fontWeight: tahunAnggaran === t ? 700 : 500,
                  background:
                    tahunAnggaran === t
                      ? "linear-gradient(135deg, #004494, #0066cc)"
                      : "transparent",
                  color: tahunAnggaran === t ? "white" : "#7f8c8d",
                  boxShadow:
                    tahunAnggaran === t
                      ? "0 3px 10px rgba(0,68,148,0.35)"
                      : "none",
                  transition: "all 0.2s ease",
                  transform: tahunAnggaran === t ? "translateY(-1px)" : "none",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <div className="summary-grid">
        <StatsCard
          title="TOTAL ASET"
          value="1,245"
          icon={<FaBox />}
          color="#004494"
          sub="Unit"
        />
        <StatsCard
          title="AVAILABLE"
          value="980"
          icon={<FaCheckCircle />}
          color="#27ae60"
          sub="Siap digunakan"
        />
        <StatsCard
          title="DALAM PEMELIHARAAN"
          value="15"
          icon={<FaTools />}
          color="#f39c12"
          sub="Sedang diperbaiki"
        />
      </div>

      {/* 3. BUDGET */}
      <div className="budget-grid">
        <CapexMultiYearCard selectedYear={tahunAnggaran} />
        <OpexBudgetCard tahun={tahunAnggaran} dataOpex={opexTahunIni} />
      </div>

      {/* 4. CHARTS */}
      <div className="chart-grid">
        <div className="dashboard-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <h3 className="section-title">Tren Peminjaman per Kategori</h3>
            <div
              style={{
                display: "flex",
                background: "#f1f2f6",
                borderRadius: "8px",
                padding: "3px",
                gap: "2px",
              }}
            >
              {["harian", "bulanan"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterTren(f)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    background: filterTren === f ? "white" : "transparent",
                    color: filterTren === f ? "#004494" : "#95a5a6",
                    boxShadow:
                      filterTren === f ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {f === "harian" ? "Per Hari" : "Per Bulan"}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "4px",
            }}
          >
            {kategoriLines.map((k) => (
              <div
                key={k.key}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: k.color,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#555",
                    fontWeight: 500,
                  }}
                >
                  {k.key}
                </span>
              </div>
            ))}
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTren}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                {kategoriLines.map((k) => (
                  <Line
                    key={k.key}
                    type="monotone"
                    dataKey={k.key}
                    stroke={k.color}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="section-title">Kondisi Aset</h3>
          <div className="chart-container" style={{ height: "220px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataKondisi}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                  }) => {
                    const r = Math.PI / 180;
                    const rad = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + rad * Math.cos(-midAngle * r);
                    const y = cy + rad * Math.sin(-midAngle * r);
                    return percent > 0.05 ? (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="0.72rem"
                        fontWeight="700"
                      >
                        {(percent * 100).toFixed(1)}%
                      </text>
                    ) : null;
                  }}
                >
                  {dataKondisi.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label content={<CustomDonutLabel />} position="center" />
                </Pie>
                <Tooltip
                  formatter={(v, n) => [
                    `${v.toLocaleString()} unit (${((v / totalKondisi) * 100).toFixed(1)}%)`,
                    n,
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CustomKondisiLegend />
        </div>
      </div>

      {/* 5. SMART ALERTS */}
      <div className="dashboard-card">
        <div className="alert-header">
          <h3 className="section-title">⚠️ Smart Alerts</h3>
          {totalCount > 0 ? (
            <span className="alert-badge">
              {highCount > 0
                ? `${highCount} Prioritas Tinggi · ${totalCount} Total`
                : `${totalCount} Perlu Tindakan`}
            </span>
          ) : (
            <span
              className="alert-badge"
              style={{ background: "#e8f8f0", color: "#27ae60" }}
            >
              Semua Normal ✓
            </span>
          )}
        </div>
        {totalCount === 0 && (
          <p
            style={{
              color: "#95a5a6",
              fontSize: "0.9rem",
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            Tidak ada alert saat ini. Semua kondisi normal.
          </p>
        )}
        {alerts.map((alert) => {
          const s = ALERT_STYLE[alert.type] ?? {
            icon: <FaExclamationTriangle />,
            bg: "#fdecea",
            color: "#e74c3c",
          };
          return (
            <AlertItem
              key={alert.id}
              icon={s.icon}
              bg={s.bg}
              color={s.color}
              title={alert.title}
              text={alert.message}
              btnText={alert.action_label}
              onAction={() => navigate(alert.action_path)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
