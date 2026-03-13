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
  FaCalendarAlt,
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
// MOCK DATA (Ditambahkan properti 'tahun' untuk simulasi filter)
// ================================================================

const dataPeminjamanHarian = [
  { name: "Sen", Laptop: 8, Proyektor: 3, Kamera: 2, Kendaraan: 1, tahun: "2025" },
  { name: "Sel", Laptop: 12, Proyektor: 5, Kamera: 4, Kendaraan: 2, tahun: "2025" },
  { name: "Rab", Laptop: 10, Proyektor: 7, Kamera: 3, Kendaraan: 3, tahun: "2026" },
  { name: "Kam", Laptop: 15, Proyektor: 4, Kamera: 6, Kendaraan: 2, tahun: "2026" },
];

const dataPeminjamanBulanan = [
  { name: "Jan", Laptop: 40, Proyektor: 20, Kamera: 15, Kendaraan: 10, tahun: "2025" },
  { name: "Feb", Laptop: 30, Proyektor: 18, Kamera: 12, Kendaraan: 8, tahun: "2025" },
  { name: "Mar", Laptop: 65, Proyektor: 30, Kamera: 20, Kendaraan: 12, tahun: "2026" },
  { name: "Apr", Laptop: 50, Proyektor: 25, Kamera: 18, Kendaraan: 9, tahun: "2026" },
];

const kategoriLines = [
  { key: "Laptop", color: "#004494" },
  { key: "Proyektor", color: "#27ae60" },
  { key: "Kamera", color: "#e67e22" },
  { key: "Kendaraan", color: "#8e44ad" },
];

const dataKondisi = [
  { name: "Baik", value: 850, color: "#2ecc71" },
  { name: "Dalam Pemeliharaan", value: 80, color: "#3498db" },
  { name: "Rusak Berat", value: 45, color: "#e74c3c" },
  { name: "Rusak Ringan", value: 120, color: "#f1c40f" },
];

const totalKondisi = dataKondisi.reduce((sum, d) => sum + d.value, 0);

// ================================================================
// LOGIKA FORMATTING & ALERTS
// ================================================================

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const calculateAlerts = (selectedYear) => {
  const alerts = [];
  // Simulasi: Jika tahun > 2025, munculkan alert dummy berbeda
  if (selectedYear === "2026") {
    alerts.push({
      id: "opex-critical-2026",
      type: "OPEX_CRITICAL",
      priority: "high",
      title: "Anggaran Awal Tahun 2026",
      message: `Realisasi anggaran 2026 mulai berjalan. Pastikan RKAP sudah terinput penuh.`,
      action_label: "Lihat Anggaran",
      action_path: "/budget",
    });
  }

  alerts.push({
    id: "overdue-default",
    type: "OVERDUE_BORROW",
    priority: "medium",
    title: "Peminjaman Berjalan",
    message: `Terdapat beberapa aset yang perlu dikembalikan pada periode ${selectedYear}.`,
    action_label: "Cek Peminjaman",
    action_path: "/peminjaman",
  });

  return alerts;
};

const ALERT_STYLE = {
  FREQUENT_DAMAGE: { icon: <FaExclamationTriangle />, bg: "#fdecea", color: "#e74c3c" },
  OVERDUE_BORROW: { icon: <FaClipboardList />, bg: "#fef5e7", color: "#f39c12" },
  OPEX_CRITICAL: { icon: <FaFileInvoiceDollar />, bg: "#fef5e7", color: "#d35400" },
  CAPEX_NO_ASSET: { icon: <FaTimesCircle />, bg: "#eaf4fb", color: "#2980b9" },
  CAPEX_IMBALANCE: { icon: <FaBalanceScale />, bg: "#f4ecf7", color: "#8e44ad" },
};

// ================================================================
// SUB-COMPONENTS
// ================================================================

const StatsCard = ({ title, value, icon, color, sub }) => (
  <div className="stats-card" style={{ borderLeft: `5px solid ${color}` }}>
    <div className="stats-icon-wrapper" style={{ background: `${color}15`, color }}>
      {icon}
    </div>
    <div className="stats-content">
      <p>{title}</p>
      <h3>{value}</h3>
      <span className="stats-sub" style={{ color }}>{sub}</span>
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
      <h2 className="current-value" style={{ color }}>{current}</h2>
      <span className="target-value">/ {target}</span>
    </div>
    <div className="progress-bar-bg">
      <div className="progress-fill" style={{ width: `${percent}%`, background: color }} />
    </div>
    <p className="budget-summary-text"><strong>{percent}%</strong> {desc}</p>
  </div>
);

const AlertItem = ({ icon, bg, color, title, text, btnText, onAction }) => (
  <div className="alert-item">
    <div className="alert-icon-circle" style={{ background: bg, color }}>{icon}</div>
    <div className="alert-content">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
    <button className="alert-action-btn" onClick={onAction}>{btnText}</button>
  </div>
);

// Legend & Label untuk Pie Chart
const CustomKondisiLegend = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
    {dataKondisi.map((item) => (
      <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: item.color }} />
          <span style={{ fontSize: "0.82rem", color: "#555" }}>{item.name}</span>
        </div>
        <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{item.value}</span>
      </div>
    ))}
  </div>
);

const CustomDonutLabel = ({ viewBox }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 5} textAnchor="middle" fill="#2c3e50" fontSize="1.2rem" fontWeight="800">
        {totalKondisi}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill="#95a5a6" fontSize="0.65rem" fontWeight="600">
        UNIT ASET
      </text>
    </g>
  );
};

// ================================================================
// MAIN DASHBOARD COMPONENT
// ================================================================

const Dashboard = () => {
  const navigate = useNavigate();
  const [filterTren, setFilterTren] = useState("bulanan");
  
  // LOGIKA TAHUN ANGGARAN (COMBO BOX)
  const currentYear = new Date().getFullYear();
  const [tahunAnggaran, setTahunAnggaran] = useState(String(currentYear));
  
  // Generate list tahun (dari 2023 sampai 5 tahun ke depan)
  const tahunOptions = Array.from({ length: 8 }, (_, i) => String(2023 + i));

  // Filter Data Tren berdasarkan Tahun yang dipilih
  const dataTrenFiltered = useMemo(() => {
    const dataSource = filterTren === "harian" ? dataPeminjamanHarian : dataPeminjamanBulanan;
    return dataSource.filter(d => d.tahun === tahunAnggaran);
  }, [filterTren, tahunAnggaran]);

  // Alert dinamis berdasarkan tahun
  const alerts = useMemo(() => calculateAlerts(tahunAnggaran), [tahunAnggaran]);

  return (
    <div className="dashboard-wrapper">
      
      {/* 1. HEADER DENGAN COMBO BOX (KOMPOS) */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Monitoring Aset & Anggaran PT Pelindo Multi Terminal</p>
        </div>

        <div className="year-selector-box">
          <label><FaCalendarAlt /> Tahun Anggaran</label>
          <select 
            value={tahunAnggaran} 
            onChange={(e) => setTahunAnggaran(e.target.value)}
            className="combo-box-pelindo"
          >
            {tahunOptions.map(tahun => (
              <option key={tahun} value={tahun}>Tahun {tahun}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="summary-grid">
        <StatsCard title="TOTAL ASET" value="1,245" icon={<FaBox />} color="#004494" sub="Unit" />
        <StatsCard title="AVAILABLE" value="980" icon={<FaCheckCircle />} color="#27ae60" sub="Siap digunakan" />
        <StatsCard title="MAINTENANCE" value="15" icon={<FaTools />} color="#f39c12" sub="Sedang diperbaiki" />
      </div>

      {/* 3. BUDGET SECTION */}
      <div className="budget-grid">
        <BudgetCard 
          title="Anggaran CAPEX" 
          current="Rp 8.5 M" 
          target="Rp 12 M" 
          percent={70} 
          color="#004494" 
          desc={`Realisasi Tahun ${tahunAnggaran}`} 
        />
        <BudgetCard 
          title="Anggaran OPEX" 
          current="Rp 2.1 M" 
          target="Rp 4.5 M" 
          percent={45} 
          color="#d35400" 
          desc={`Sisa plafon ${tahunAnggaran}`} 
        />
      </div>

      {/* 4. CHARTS SECTION */}
      <div className="chart-grid">
        <div className="dashboard-card">
          <div className="card-header-flex">
            <h3 className="section-title">Tren Peminjaman ({tahunAnggaran})</h3>
            <div className="toggle-group">
              <button className={filterTren === "harian" ? "active" : ""} onClick={() => setFilterTren("harian")}>Harian</button>
              <button className={filterTren === "bulanan" ? "active" : ""} onClick={() => setFilterTren("bulanan")}>Bulanan</button>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dataTrenFiltered}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                {kategoriLines.map(k => (
                  <Line key={k.key} type="monotone" dataKey={k.key} stroke={k.color} strokeWidth={3} dot={{ r: 4 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="section-title">Kondisi Aset Keseluruhan</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dataKondisi} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {dataKondisi.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  <Label content={<CustomDonutLabel />} position="center" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CustomKondisiLegend />
        </div>
      </div>

      {/* 5. SMART ALERTS */}
      <div className="dashboard-card">
        <h3 className="section-title">⚠️ Smart Alerts ({tahunAnggaran})</h3>
        <div className="alert-list">
          {alerts.map(alert => {
            const style = ALERT_STYLE[alert.type];
            return (
              <AlertItem 
                key={alert.id}
                icon={style.icon} bg={style.bg} color={style.color}
                title={alert.title} text={alert.message} btnText={alert.action_label}
                onAction={() => navigate(alert.action_path)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;