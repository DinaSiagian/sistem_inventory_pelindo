import React from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTools,
  FaMoneyBillWave,
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
} from "recharts";

// Import CSS yang sudah disesuaikan
import "./Dashboard.css";

// --- MOCK DATA ---
const dataPeminjaman = [
  { name: "Jan", total: 40 },
  { name: "Feb", total: 30 },
  { name: "Mar", total: 65 },
  { name: "Apr", total: 50 },
  { name: "Mei", total: 85 },
  { name: "Jun", total: 120 },
];

const dataKondisi = [
  { name: "Baik", value: 850, color: "#2ecc71" },
  { name: "Maintenance", value: 80, color: "#3498db" },
  { name: "Rusak Berat", value: 45, color: "#e74c3c" },
  { name: "Rusak Ringan", value: 120, color: "#f1c40f" },
];

const Dashboard = () => {
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
        <div className="dashboard-year-badge">
          Tahun Anggaran: 2026
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
          sub="Ready to use"
        />
        <StatsCard
          title="MAINTENANCE"
          value="15"
          icon={<FaTools />}
          color="#f39c12"
          sub="Dalam perbaikan"
        />
        <StatsCard
          title="VALUASI ASET"
          value="Rp 14.2 M"
          icon={<FaMoneyBillWave />}
          color="#8e44ad"
          sub="Total Nilai"
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
          items={[
            { label: "IT Equipment", val: "60% (Laptop & Server)", icon: "🔌" },
            { label: "Infrastruktur", val: "80% (Renovasi)", icon: "🏗️" }
          ]}
        />
        <BudgetCard 
          title="Anggaran OPEX" 
          current="Rp 2.1 M" 
          target="Rp 4.5 M" 
          percent={45} 
          color="#d35400" 
          desc="Terserap. Sisa: Rp 2.4 M"
          items={[
            { label: "Maintenance", val: "50% (AC & Genset)", icon: "🔧" },
            { label: "Licensing", val: "30% (Software)", icon: "📄" }
          ]}
        />
      </div>

      {/* 4. CHARTS SECTION */}
      <div className="chart-grid">
        <div className="dashboard-card">
          <h3 className="section-title">Tren Peminjaman</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPeminjaman}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                <Line type="monotone" dataKey="total" stroke="#00b5e2" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="section-title">Kondisi Aset</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataKondisi}
                  cx="50%" cy="50%"
                  innerRadius={60} outerRadius={80}
                  paddingAngle={5} dataKey="value"
                >
                  {dataKondisi.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
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

const BudgetCard = ({ title, current, target, percent, color, desc, items }) => (
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
    <div className="budget-breakdown">
      {items.map((item, idx) => (
        <p key={idx}>{item.icon} <strong>{item.label}:</strong> &nbsp; {item.val}</p>
      ))}
    </div>
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