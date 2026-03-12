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
// MOCK DATA — Anggaran OPEX
// ================================================================

const mockOpex = [
  {
    id_anggaran_tahunan: 1,
    nm_anggaran_master: "Beban Pemeliharaan Software",
    nilai_anggaran_tahunan: 500000000,
  },
  {
    id_anggaran_tahunan: 2,
    nm_anggaran_master: "Beban Jaringan dan Koneksi Data",
    nilai_anggaran_tahunan: 600000000,
  },
  {
    id_anggaran_tahunan: 3,
    nm_anggaran_master: "Beban Perlengkapan Kantor",
    nilai_anggaran_tahunan: 700000000,
  },
  {
    id_anggaran_tahunan: 4,
    nm_anggaran_master: "Beban Jasa Konsultan",
    nilai_anggaran_tahunan: 800000000,
  },
  {
    id_anggaran_tahunan: 5,
    nm_anggaran_master: "Beban Sumber Daya Pihak Ketiga Peralatan",
    nilai_anggaran_tahunan: 900000000,
  },
];

const mockRealisasiOpex = [
  { id_realisasi: 1, id_anggaran_tahunan: 2, jumlah: 120000000 },
  { id_realisasi: 2, id_anggaran_tahunan: 2, jumlah: 120000000 },
  { id_realisasi: 3, id_anggaran_tahunan: 1, jumlah: 85000000 },
  { id_realisasi: 4, id_anggaran_tahunan: 3, jumlah: 45000000 },
  { id_realisasi: 5, id_anggaran_tahunan: 4, jumlah: 200000000 },
  { id_realisasi: 6, id_anggaran_tahunan: 4, jumlah: 200000000 },
  { id_realisasi: 7, id_anggaran_tahunan: 5, jumlah: 150000000 },
];

// ================================================================
// MOCK DATA — CAPEX Projects
// ================================================================

const mockCapex = [
  {
    projects: [
      {
        id_pekerjaan: 1,
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Planning & Control, CCTV dan SD-WAN Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_kontrak: 1200000000,
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        assets: [
          { asset_code: "SPMT-MLH-LPG-DMG-01", acquisition_value: 350000000 },
          { asset_code: "SPMT-LHK-LPG-DMG-01", acquisition_value: 350000000 },
          { asset_code: "SPMT-MLH-DTC-PKR-01", acquisition_value: 500000000 },
        ],
      },
      {
        id_pekerjaan: 2,
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_kontrak: 980000000,
        no_kontrak: "SI.01/8/8/2/PPTI/TEKI/PLMT-24",
        assets: [
          { asset_code: "SPMT-MLH-LPG-DMG-02", acquisition_value: 490000000 },
          { asset_code: "SPMT-GRG-LPG-DMG-01", acquisition_value: 490000000 },
        ],
      },
      {
        id_pekerjaan: 3,
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System dan Planning & Control Branch Balikpapan dan Bagendang) PT Pelindo Multi Terminal",
        nilai_kontrak: 750000000,
        no_kontrak: "SI.01/4/9/2/PPTI/TEKI/PLMT-24",
        assets: [],
      },
    ],
  },
  {
    projects: [
      {
        id_pekerjaan: 4,
        nm_pekerjaan:
          "Penyediaan Network di Branch SPMT (Malahayati, Lhokseumawe, Lembar, Parepare dan Garongkong)",
        nilai_kontrak: 1500000000,
        no_kontrak: "SI.01/15/8/5/PPTI/TEKI/PLMT-24",
        assets: [
          { asset_code: "SPMT-MLH-DTC-PKR-02", acquisition_value: 450000000 },
          { asset_code: "SPMT-LHK-DTC-PKR-02", acquisition_value: 450000000 },
          { asset_code: "SPMT-GRG-DTC-PKR-01", acquisition_value: 350000000 },
        ],
      },
    ],
  },
  {
    projects: [
      {
        id_pekerjaan: 5,
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Roro pada Branch (Lembar Gilimas, Tanjung Wangi, Tanjung Emas, Sibolga, Balikpapan, Parepare dan Tanjung Balai Karimun) PT Pelindo Multi Terminal",
        nilai_kontrak: 3950000000,
        no_kontrak: "SI.01/7/7/4/PPTI/TEKI/PLMT-25",
        assets: [
          { asset_code: "SPMT-TJE-LPG-DMG-01", acquisition_value: 1400000000 },
          { asset_code: "SPMT-BLP-LPG-DMG-01", acquisition_value: 1350000000 },
          { asset_code: "SPMT-TJE-DTC-PKR-01", acquisition_value: 1200000000 },
        ],
      },
      {
        id_pekerjaan: 6,
        nm_pekerjaan:
          "Penyediaan Kebutuhan Transformasi dan Digitalisasi (CCTV dan Public Announcer Traffic Monitoring pada Gate) Branch Belawan, Dumai, Malahayati, Lhokseumawe, Lembar, Makassar, Balikpapan PT Pelindo Multi Terminal",
        nilai_kontrak: 2870000000,
        no_kontrak: "PD.01/22/10/1/PPTI/TEKI/PLMT-25",
        assets: [],
      },
    ],
  },
  {
    projects: [
      {
        id_pekerjaan: 7,
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Perangkat Network Branch Tanjung Balai Karimun Terminal Selat Panjang PT Pelindo Multi Terminal",
        nilai_kontrak: 810000000,
        no_kontrak: "PD.01/24/7/1/PPTI/TEKI/PLMT-25",
        assets: [
          { asset_code: "SPMT-TBK-DTC-PKR-01", acquisition_value: 410000000 },
          { asset_code: "SPMT-TBK-DTC-PKR-02", acquisition_value: 400000000 },
        ],
      },
    ],
  },
];

// ================================================================
// MOCK DATA — Peminjaman (untuk alert rusak & overdue)
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
// HELPER
// ================================================================

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

// ================================================================
// calculateAlerts()
// ================================================================

const calculateAlerts = () => {
  const alerts = [];
  const today = new Date();

  // 1. Aset sering rusak (≥2x)
  const damageCount = {};
  const damageAssetNames = {};
  mockBorrows.forEach((b) => {
    if (
      b.is_returned &&
      (b.return_condition === "MINOR_DAMAGE" ||
        b.return_condition === "DAMAGED")
    ) {
      damageCount[b.asset_code] = (damageCount[b.asset_code] || 0) + 1;
      damageAssetNames[b.asset_code] = b.asset_name;
    }
  });
  Object.entries(damageCount).forEach(([code, count]) => {
    if (count >= 2) {
      alerts.push({
        id: `damage-${code}`,
        type: "FREQUENT_DAMAGE",
        priority: "high",
        title: "Aset Sering Rusak",
        message: `${damageAssetNames[code]} (${code}) dikembalikan dalam kondisi rusak sebanyak ${count}x. Pertimbangkan pengecekan atau penggantian.`,
        action_label: "Lihat Riwayat",
        action_path: "/peminjaman",
      });
    }
  });

  // 2. Peminjaman overdue
  const overdueBorrows = mockBorrows.filter(
    (b) => !b.is_returned && new Date(b.due_date) < today,
  );
  if (overdueBorrows.length > 0) {
    alerts.push({
      id: "overdue-summary",
      type: "OVERDUE_BORROW",
      priority: "medium",
      title: "Peminjaman Melewati Jatuh Tempo",
      message: `${overdueBorrows.length} aset melewati jatuh tempo: ${overdueBorrows.map((b) => b.asset_name).join(", ")}. Segera tindak lanjut.`,
      action_label: "Cek Peminjaman",
      action_path: "/peminjaman",
    });
  }

  // 3. Anggaran OPEX kritis (≥80%)
  mockOpex.forEach((opex) => {
    const totalRealisasi = mockRealisasiOpex
      .filter((r) => r.id_anggaran_tahunan === opex.id_anggaran_tahunan)
      .reduce((sum, r) => sum + r.jumlah, 0);
    const pct = (totalRealisasi / opex.nilai_anggaran_tahunan) * 100;
    if (pct >= 80) {
      alerts.push({
        id: `opex-critical-${opex.id_anggaran_tahunan}`,
        type: "OPEX_CRITICAL",
        priority: pct >= 100 ? "high" : "medium",
        title: "Anggaran OPEX Kritis",
        message: `${opex.nm_anggaran_master} terserap ${pct.toFixed(1)}% (${formatRupiah(totalRealisasi)} dari ${formatRupiah(opex.nilai_anggaran_tahunan)}). Sisa: ${formatRupiah(opex.nilai_anggaran_tahunan - totalRealisasi)}.`,
        action_label: "Lihat Anggaran",
        action_path: "/budget",
      });
    }
  });

  // 4. Project CAPEX tanpa aset
  mockCapex.forEach((capexItem) => {
    capexItem.projects.forEach((proj) => {
      if (!proj.assets || proj.assets.length === 0) {
        alerts.push({
          id: `capex-no-asset-${proj.id_pekerjaan}`,
          type: "CAPEX_NO_ASSET",
          priority: "medium",
          title: "Data Aset CAPEX Belum Diisi",
          message: `Pekerjaan "${proj.nm_pekerjaan.substring(0, 60)}..." (${proj.no_kontrak}) sudah kontrak senilai ${formatRupiah(proj.nilai_kontrak)} namun belum ada data aset.`,
          action_label: "Input Aset",
          action_path: "/budget",
        });
      }
    });
  });

  // 5. CAPEX imbalance (selisih >5%)
  mockCapex.forEach((capexItem) => {
    capexItem.projects.forEach((proj) => {
      if (!proj.assets || proj.assets.length === 0) return;
      const sumAcquisition = proj.assets.reduce(
        (sum, a) => sum + (a.acquisition_value || 0),
        0,
      );
      const selisih = Math.abs(proj.nilai_kontrak - sumAcquisition);
      const selisihPct = (selisih / proj.nilai_kontrak) * 100;
      if (selisihPct > 5) {
        alerts.push({
          id: `capex-imbalance-${proj.id_pekerjaan}`,
          type: "CAPEX_IMBALANCE",
          priority: "medium",
          title: "Nilai Aset vs Kontrak Tidak Sesuai",
          message: `Pekerjaan "${proj.nm_pekerjaan.substring(0, 55)}..." selisih ${formatRupiah(selisih)} (${selisihPct.toFixed(1)}%) antara kontrak (${formatRupiah(proj.nilai_kontrak)}) dan total aset (${formatRupiah(sumAcquisition)}).`,
          action_label: "Cek Detail",
          action_path: "/budget",
        });
      }
    });
  });

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  alerts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  return alerts;
};

// ================================================================
// ALERT STYLE MAP
// ================================================================

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

const BudgetCard = ({ title, current, target, percent, color, desc }) => (
  <div className="dashboard-card">
    <div className="card-header">
      <h3 className="section-title">{title}</h3>
      <span className="section-subtitle">Realisasi vs RKAP</span>
    </div>
    <div className="budget-value-row">
      <h2 className="current-value" style={{ color }}>
        {current}
      </h2>
      <span className="target-value">/ {target}</span>
    </div>
    <div className="progress-bar-bg">
      <div
        className="progress-fill"
        style={{ width: `${percent}%`, background: color }}
      />
    </div>
    <p className="budget-summary-text">
      <strong>{percent}%</strong> {desc}
    </p>
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
// MAIN DASHBOARD
// ================================================================

const Dashboard = () => {
  const [filterTren, setFilterTren] = useState("bulanan");
  const navigate = useNavigate();

  // ✅ Tahun anggaran — composable: otomatis generate dari 2023
  //    sampai 2 tahun ke depan dari tahun saat ini.
  //    Tidak perlu edit manual setiap tahun baru.
  const currentYear = new Date().getFullYear();
  const tahunOptions = Array.from(
    { length: currentYear - 2023 + 3 },
    (_, i) => String(2023 + i)
  );
  const [tahunAnggaran, setTahunAnggaran] = useState(String(currentYear));

  const dataTren =
    filterTren === "harian" ? dataPeminjamanHarian : dataPeminjamanBulanan;

  const alerts = useMemo(() => calculateAlerts(), []);
  const highCount = alerts.filter((a) => a.priority === "high").length;
  const totalCount = alerts.length;

  return (
    <div className="dashboard-wrapper">
      {/* 1. HEADER */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">
            Monitoring Aset & Anggaran PT Pelindo Multi Terminal
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

      {/* 3. BUDGET MONITORING */}
      <div className="budget-grid">
        <BudgetCard
          title="Anggaran CAPEX"
          current="Rp 8.5 M"
          target="Rp 12 M"
          percent={70}
          color="#004494"
          desc="Terserap. Sisa: Rp 3.5 M"
        />
        <BudgetCard
          title="Anggaran OPEX"
          current="Rp 2.1 M"
          target="Rp 4.5 M"
          percent={45}
          color="#d35400"
          desc="Terserap. Sisa: Rp 2.4 M"
        />
      </div>

      {/* 4. CHARTS */}
      <div className="chart-grid">
        {/* Tren Peminjaman */}
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
                    textTransform: "capitalize",
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

        {/* Kondisi Aset */}
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
                    const RADIAN = Math.PI / 180;
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
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
                  formatter={(value, name) => [
                    `${value.toLocaleString()} unit (${((value / totalKondisi) * 100).toFixed(1)}%)`,
                    name,
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

      {/* 5. SMART ALERTS — dinamis dari calculateAlerts() */}
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
          const style = ALERT_STYLE[alert.type] ?? {
            icon: <FaExclamationTriangle />,
            bg: "#fdecea",
            color: "#e74c3c",
          };
          return (
            <AlertItem
              key={alert.id}
              icon={style.icon}
              bg={style.bg}
              color={style.color}
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