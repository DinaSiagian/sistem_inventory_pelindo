import React, { useState } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
  FaClipboardList,
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
  Legend,
  Label,
} from "recharts";

import "./Dashboard.css";

// --- MOCK DATA ---

// Data harian (7 hari terakhir)
const dataPeminjamanHarian = [
  { name: "Sen", Laptop: 8, Proyektor: 3, Kamera: 2, Kendaraan: 1 },
  { name: "Sel", Laptop: 12, Proyektor: 5, Kamera: 4, Kendaraan: 2 },
  { name: "Rab", Laptop: 10, Proyektor: 7, Kamera: 3, Kendaraan: 3 },
  { name: "Kam", Laptop: 15, Proyektor: 4, Kamera: 6, Kendaraan: 2 },
  { name: "Jum", Laptop: 9, Proyektor: 6, Kamera: 5, Kendaraan: 4 },
  { name: "Sab", Laptop: 5, Proyektor: 2, Kamera: 2, Kendaraan: 1 },
  { name: "Min", Laptop: 3, Proyektor: 1, Kamera: 1, Kendaraan: 0 },
];

// Data bulanan
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

// Data kondisi aset
const dataKondisi = [
  { name: "Baik", value: 850, color: "#2ecc71" },
  { name: "Dalam Pemeliharaan", value: 80, color: "#3498db" },
  { name: "Rusak Berat", value: 45, color: "#e74c3c" },
  { name: "Rusak Ringan", value: 120, color: "#f1c40f" },
];

const totalKondisi = dataKondisi.reduce((sum, d) => sum + d.value, 0);

// Custom legend untuk kondisi aset (seperti referensi gambar)
const CustomKondisiLegend = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
    {dataKondisi.map((item) => {
      const pct = ((item.value / totalKondisi) * 100).toFixed(1);
      return (
        <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "12px", height: "12px", borderRadius: "50%",
              background: item.color, flexShrink: 0
            }} />
            <span style={{ fontSize: "0.82rem", color: "#555", fontWeight: 500 }}>{item.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              fontSize: "0.82rem", fontWeight: 700, color: "#2c3e50",
              minWidth: "32px", textAlign: "right"
            }}>{item.value.toLocaleString()}</span>
            <span style={{
              fontSize: "0.75rem", color: "white", fontWeight: 700,
              background: item.color, padding: "2px 7px",
              borderRadius: "10px", minWidth: "42px", textAlign: "center"
            }}>{pct}%</span>
          </div>
        </div>
      );
    })}
    {/* Total row */}
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderTop: "1px solid #f1f2f6", paddingTop: "8px", marginTop: "4px"
    }}>
      <span style={{ fontSize: "0.82rem", color: "#2c3e50", fontWeight: 700 }}>Total Aset</span>
      <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#2c3e50" }}>
        {totalKondisi.toLocaleString()} Unit
      </span>
    </div>
  </div>
);

// Custom center label for donut
const CustomDonutLabel = ({ viewBox }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#2c3e50" fontSize="1.3rem" fontWeight="800">
        {totalKondisi.toLocaleString()}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#95a5a6" fontSize="0.72rem" fontWeight="600">
        TOTAL ASET
      </text>
    </g>
  );
};

const Dashboard = () => {
  const [filterTren, setFilterTren] = useState("bulanan");
  const [tahunAnggaran, setTahunAnggaran] = useState("2026");
  const dataTren = filterTren === "harian" ? dataPeminjamanHarian : dataPeminjamanBulanan;
  const tahunOptions = ["2023", "2024", "2025", "2026"];

  return (
    <div className="dashboard-wrapper">
      {/* 1. HEADER SECTION */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">
            Monitoring Aset & Anggaran PT Pelindo Multi Terminal
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
          <span style={{ fontSize: "0.75rem", color: "#95a5a6", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Tahun Anggaran
          </span>
          <div style={{ display: "flex", background: "white", borderRadius: "12px", padding: "4px", gap: "4px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "1px solid #e8ecf0" }}>
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
                  background: tahunAnggaran === t
                    ? "linear-gradient(135deg, #004494, #0066cc)"
                    : "transparent",
                  color: tahunAnggaran === t ? "white" : "#7f8c8d",
                  boxShadow: tahunAnggaran === t ? "0 3px 10px rgba(0,68,148,0.35)" : "none",
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

      {/* 4. CHARTS SECTION */}
      <div className="chart-grid">
        {/* Tren Peminjaman - Multi Category */}
        <div className="dashboard-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <h3 className="section-title">Tren Peminjaman per Kategori</h3>
            {/* Filter Toggle */}
            <div style={{
              display: "flex", background: "#f1f2f6", borderRadius: "8px", padding: "3px", gap: "2px"
            }}>
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
                    boxShadow: filterTren === f ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.2s",
                    textTransform: "capitalize",
                  }}
                >
                  {f === "harian" ? "Per Hari" : "Per Bulan"}
                </button>
              ))}
            </div>
          </div>

          {/* Category Legend */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "4px" }}>
            {kategoriLines.map((k) => (
              <div key={k.key} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: k.color }} />
                <span style={{ fontSize: "0.78rem", color: "#555", fontWeight: 500 }}>{k.key}</span>
              </div>
            ))}
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTren}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
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

        {/* Kondisi Aset - Donut + Detail */}
        <div className="dashboard-card">
          <h3 className="section-title">Kondisi Aset</h3>
          <div className="chart-container" style={{ height: "220px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataKondisi}
                  cx="50%" cy="50%"
                  innerRadius={65} outerRadius={90}
                  paddingAngle={4} dataKey="value"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return percent > 0.05 ? (
                      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
                        fontSize="0.72rem" fontWeight="700">
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
                    name
                  ]}
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Detail Legend */}
          <CustomKondisiLegend />
        </div>
      </div>

      {/* 5. ALERTS SECTION */}
      <div className="dashboard-card">
        <div className="alert-header">
          <h3 className="section-title">⚠️ Smart Alerts</h3>
          <span className="alert-badge">3 Perlu Tindakan</span>
        </div>

        <AlertItem
          icon={<FaExclamationTriangle />}
          bg="#fdecea" color="#e74c3c"
          title="Aset Sering Rusak"
          text="Laptop Lenovo Thinkpad (SN: 99283) telah rusak 3x. Pertimbangkan penggantian (CAPEX)."
        />

        <AlertItem
          icon={<FaClipboardList />}
          bg="#fef5e7" color="#f39c12"
          title="Jadwal Maintenance CCTV"
          text="50 Unit CCTV di Zona Belawan belum dimaintenance selama 6 bulan."
          btnText="Buat Jadwal"
        />
      </div>
    </div>
  );
};

// --- KOMPONEN KECIL ---
const StatsCard = ({ title, value, icon, color, sub }) => (
  <div className="stats-card" style={{ borderLeftColor: color }}>
    <div className="stats-icon-wrapper" style={{ background: `${color}15`, color: color }}>
      {icon}
    </div>
    <div className="stats-content">
      <p>{title}</p>
      <h3>{value}</h3>
      <span className="stats-sub" style={{ color: color }}>{sub}</span>
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
      <h2 className="current-value" style={{ color: color }}>{current}</h2>
      <span className="target-value">/ {target}</span>
    </div>
    <div className="progress-bar-bg">
      <div className="progress-fill" style={{ width: `${percent}%`, background: color }}></div>
    </div>
    <p className="budget-summary-text"><strong>{percent}%</strong> {desc}</p>
  </div>
);

const AlertItem = ({ icon, bg, color, title, text, btnText = "Cek Detail" }) => (
  <div className="alert-item">
    <div className="alert-icon-circle" style={{ background: bg, color: color }}>
      {icon}
    </div>
    <div className="alert-content">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
    <button className="alert-action-btn">{btnText}</button>
  </div>
);


export default Dashboard;