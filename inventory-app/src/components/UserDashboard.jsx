import React, { useState } from "react";
import {
  FaBox,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaArrowRight,
  FaSearch,
  FaLaptop,
  FaCamera,
  FaCar,
  FaTv,
  FaTools,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* ============================================================
   MOCK DATA
   ============================================================ */
const riwayatPeminjaman = [
  {
    id: "PJM-0041",
    aset: "Laptop Dell Latitude",
    kode: "LT-0019",
    tanggalPinjam: "28 Feb 2026",
    tanggalKembali: "7 Mar 2026",
    status: "aktif",
    lokasi: "Kantor Pusat – Lt. 3",
  },
  {
    id: "PJM-0038",
    aset: "Proyektor Epson EB",
    kode: "PRJ-0007",
    tanggalPinjam: "20 Feb 2026",
    tanggalKembali: "22 Feb 2026",
    status: "selesai",
    lokasi: "Ruang Rapat A",
  },
  {
    id: "PJM-0031",
    aset: "Kamera Sony Alpha",
    kode: "KM-0003",
    tanggalPinjam: "10 Feb 2026",
    tanggalKembali: "12 Feb 2026",
    status: "selesai",
    lokasi: "Area Lapangan – Belawan",
  },
  {
    id: "PJM-0025",
    aset: "Laptop Lenovo T14",
    kode: "LT-0011",
    tanggalPinjam: "28 Jan 2026",
    tanggalKembali: "3 Feb 2026",
    status: "terlambat",
    lokasi: "Kantor Cabang Dumai",
  },
];

const asetTersedia = [
  { id: "LT-0022", nama: "Laptop HP ProBook", kategori: "Laptop", icon: <FaLaptop />, color: "#004494" },
  { id: "PRJ-0012", nama: "Proyektor BenQ MH733", kategori: "Proyektor", icon: <FaTv />, color: "#7c3aed" },
  { id: "KM-0008", nama: "Kamera Canon EOS", kategori: "Kamera", icon: <FaCamera />, color: "#0891b2" },
  { id: "KND-0003", nama: "Toyota Fortuner – B 1234 XX", kategori: "Kendaraan", icon: <FaCar />, color: "#059669" },
  { id: "LT-0028", nama: "Laptop Asus Vivobook", kategori: "Laptop", icon: <FaLaptop />, color: "#004494" },
  { id: "KM-0014", nama: "Kamera GoPro Hero 12", kategori: "Kamera", icon: <FaCamera />, color: "#0891b2" },
];

const dataAktivitasBulanan = [
  { bulan: "Sep", total: 2 },
  { bulan: "Okt", total: 4 },
  { bulan: "Nov", total: 3 },
  { bulan: "Des", total: 5 },
  { bulan: "Jan", total: 6 },
  { bulan: "Feb", total: 3 },
];

/* ============================================================
   STATUS BADGE
   ============================================================ */
const StatusBadge = ({ status }) => {
  const map = {
    aktif: { label: "Sedang Dipinjam", bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    selesai: { label: "Selesai", bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
    terlambat: { label: "Terlambat", bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
    pending: { label: "Menunggu", bg: "#fffbeb", color: "#92400e", border: "#fde68a" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "20px",
      fontSize: "0.72rem", fontWeight: 700,
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      whiteSpace: "nowrap",
    }}>
      {s.label}
    </span>
  );
};

/* ============================================================
   KOMPONEN UTAMA
   ============================================================ */
const UserDashboard = () => {
  const [searchAset, setSearchAset] = useState("");

  const filteredAset = asetTersedia.filter((a) =>
    a.nama.toLowerCase().includes(searchAset.toLowerCase()) ||
    a.kategori.toLowerCase().includes(searchAset.toLowerCase())
  );

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="ud-wrapper">

      {/* ── HEADER ── */}
      <div className="ud-header">
        <div>
          <h1 className="ud-title">Selamat Datang, Joy! 👋</h1>
          <p className="ud-subtitle">{today} &nbsp;·&nbsp; Sistem Inventory Aset Pelindo</p>
        </div>
        <button className="ud-pinjam-btn">
          <FaClipboardList />
          Ajukan Peminjaman
        </button>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="ud-stats-grid">
        <StatCard
          icon={<FaClipboardList />}
          label="Total Peminjaman"
          value="23"
          sub="Sepanjang masa"
          color="#004494"
          bg="#eff6ff"
        />
        <StatCard
          icon={<FaBox />}
          label="Sedang Dipinjam"
          value="1"
          sub="Aset aktif"
          color="#0891b2"
          bg="#ecfeff"
        />
        <StatCard
          icon={<FaCheckCircle />}
          label="Selesai"
          value="21"
          sub="Dikembalikan tepat waktu"
          color="#16a34a"
          bg="#f0fdf4"
        />
        <StatCard
          icon={<FaExclamationTriangle />}
          label="Pernah Terlambat"
          value="1"
          sub="Kali keterlambatan"
          color="#d97706"
          bg="#fffbeb"
        />
      </div>

      {/* ── 2-COL GRID ── */}
      <div className="ud-two-col">

        {/* Kiri: Riwayat Peminjaman */}
        <div className="ud-card">
          <div className="ud-card-header">
            <div className="ud-card-title-wrap">
              <div className="ud-card-icon" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                <FaHistory style={{ fontSize: "1rem" }} />
              </div>
              <div>
                <h3 className="ud-card-title">Riwayat Peminjaman</h3>
                <p className="ud-card-sub">4 transaksi terakhir</p>
              </div>
            </div>
            <button className="ud-link-btn">Lihat Semua <FaArrowRight size={11} /></button>
          </div>

          <div className="ud-history-list">
            {riwayatPeminjaman.map((item) => (
              <div key={item.id} className="ud-history-item">
                <div className="ud-history-top">
                  <span className="ud-history-name">{item.aset}</span>
                  <StatusBadge status={item.status} />
                </div>
                <div className="ud-history-meta">
                  <span className="ud-history-code">{item.kode}</span>
                  <span className="ud-history-dot">·</span>
                  <FaCalendarAlt size={10} style={{ color: "#94a3b8" }} />
                  <span>{item.tanggalPinjam} – {item.tanggalKembali}</span>
                  <span className="ud-history-dot">·</span>
                  <FaMapMarkerAlt size={10} style={{ color: "#94a3b8" }} />
                  <span>{item.lokasi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kanan: Grafik Aktivitas + Info Pinjaman Aktif */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          {/* Grafik Aktivitas */}
          <div className="ud-card">
            <div className="ud-card-header">
              <div className="ud-card-title-wrap">
                <div className="ud-card-icon" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  <FaTools style={{ fontSize: "1rem" }} />
                </div>
                <div>
                  <h3 className="ud-card-title">Aktivitas Peminjaman</h3>
                  <p className="ud-card-sub">6 bulan terakhir</p>
                </div>
              </div>
            </div>
            <div style={{ height: "170px", marginTop: "8px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataAktivitasBulanan} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(v) => [`${v} pinjaman`]}
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: "12px" }}
                  />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                    {dataAktivitasBulanan.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={index === dataAktivitasBulanan.length - 1 ? "#00b5e2" : "#bfdbfe"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pinjaman Aktif saat ini */}
          <div className="ud-card ud-card--active">
            <div className="ud-active-header">
              <div className="ud-active-dot" />
              <span className="ud-active-label">Sedang Dipinjam</span>
            </div>
            <div className="ud-active-aset">
              <div className="ud-active-icon"><FaLaptop /></div>
              <div>
                <p className="ud-active-name">Laptop Dell Latitude</p>
                <p className="ud-active-code">LT-0019 &nbsp;·&nbsp; Kantor Pusat – Lt. 3</p>
              </div>
            </div>
            <div className="ud-active-dates">
              <div className="ud-active-date-item">
                <span className="ud-active-date-lbl">Dipinjam</span>
                <span className="ud-active-date-val">28 Feb 2026</span>
              </div>
              <div className="ud-active-date-arrow">→</div>
              <div className="ud-active-date-item">
                <span className="ud-active-date-lbl">Batas Kembali</span>
                <span className="ud-active-date-val" style={{ color: "#dc2626" }}>7 Mar 2026</span>
              </div>
            </div>
            <button className="ud-return-btn">
              <FaCheckCircle size={13} />
              Konfirmasi Pengembalian
            </button>
          </div>

        </div>
      </div>

      {/* ── ASET TERSEDIA ── */}
      <div className="ud-card" style={{ marginTop: 0 }}>
        <div className="ud-card-header">
          <div className="ud-card-title-wrap">
            <div className="ud-card-icon" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
              <FaBox style={{ fontSize: "1rem" }} />
            </div>
            <div>
              <h3 className="ud-card-title">Aset Tersedia untuk Dipinjam</h3>
              <p className="ud-card-sub">{filteredAset.length} aset siap pakai</p>
            </div>
          </div>
          <div className="ud-search-wrap">
            <FaSearch className="ud-search-icon" size={12} />
            <input
              className="ud-search-input"
              placeholder="Cari aset..."
              value={searchAset}
              onChange={(e) => setSearchAset(e.target.value)}
            />
          </div>
        </div>

        <div className="ud-aset-grid">
          {filteredAset.map((aset) => (
            <div key={aset.id} className="ud-aset-card">
              <div className="ud-aset-icon" style={{ background: `${aset.color}15`, color: aset.color }}>
                {aset.icon}
              </div>
              <div className="ud-aset-info">
                <span className="ud-aset-nama">{aset.nama}</span>
                <span className="ud-aset-meta">
                  <span className="ud-aset-kat">{aset.kategori}</span>
                  <span> · </span>
                  <span className="ud-aset-code">{aset.id}</span>
                </span>
              </div>
              <button className="ud-aset-pinjam-btn">Pinjam</button>
            </div>
          ))}
          {filteredAset.length === 0 && (
            <div className="ud-empty-state">
              <span>Tidak ada aset yang cocok dengan pencarian.</span>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          STYLES
          ============================================================ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .ud-wrapper {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          padding: 8px 4px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: udFadeIn 0.4s ease-out;
        }
        @keyframes udFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .ud-header {
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
        }
        .ud-title {
          margin: 0; font-size: 1.55rem; font-weight: 800; color: #0f172a;
          letter-spacing: -0.4px;
        }
        .ud-subtitle { margin: 4px 0 0; font-size: 0.82rem; color: #94a3b8; font-weight: 500; }
        .ud-pinjam-btn {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #004494, #00b5e2);
          color: white; border: none; padding: 11px 20px;
          border-radius: 12px; font-weight: 700; font-size: 0.88rem;
          cursor: pointer; white-space: nowrap; font-family: inherit;
          box-shadow: 0 6px 18px rgba(0,68,148,0.3);
          transition: all 0.25s;
        }
        .ud-pinjam-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,68,148,0.4); }

        /* Stats */
        .ud-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
        }
        .ud-stat-card {
          background: white; border-radius: 14px; padding: 16px 18px;
          display: flex; align-items: center; gap: 13px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ud-stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .ud-stat-icon {
          width: 44px; height: 44px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.05rem; flex-shrink: 0;
        }
        .ud-stat-val { font-size: 1.5rem; font-weight: 800; color: #0f172a; line-height: 1; }
        .ud-stat-lbl { font-size: 0.78rem; font-weight: 600; color: #64748b; margin-top: 2px; }
        .ud-stat-sub { font-size: 0.7rem; color: #cbd5e1; margin-top: 2px; }

        /* 2-col */
        .ud-two-col { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; }

        /* Cards */
        .ud-card {
          background: white; border-radius: 16px; padding: 20px 22px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .ud-card--active {
          background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%);
          border-color: #bfdbfe;
        }
        .ud-card-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 16px; gap: 12px;
        }
        .ud-card-title-wrap { display: flex; align-items: center; gap: 12px; }
        .ud-card-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ud-card-title { margin: 0; font-size: 0.95rem; font-weight: 800; color: #0f172a; }
        .ud-card-sub { margin: 2px 0 0; font-size: 0.75rem; color: #94a3b8; }
        .ud-link-btn {
          display: flex; align-items: center; gap: 5px;
          background: none; border: none; color: #004494;
          font-size: 0.8rem; font-weight: 700; cursor: pointer;
          font-family: inherit; white-space: nowrap;
          padding: 0; transition: color 0.2s;
        }
        .ud-link-btn:hover { color: #00b5e2; }

        /* History */
        .ud-history-list { display: flex; flex-direction: column; gap: 2px; }
        .ud-history-item {
          padding: 13px 14px; border-radius: 10px;
          transition: background 0.15s; cursor: pointer;
        }
        .ud-history-item:hover { background: #f8fafc; }
        .ud-history-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 6px; gap: 8px;
        }
        .ud-history-name { font-size: 0.875rem; font-weight: 700; color: #1e293b; }
        .ud-history-meta {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.72rem; color: #94a3b8; flex-wrap: wrap;
        }
        .ud-history-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem; font-weight: 700;
          background: #f1f5f9; color: #64748b;
          padding: 2px 7px; border-radius: 5px;
        }
        .ud-history-dot { opacity: 0.4; }

        /* Active Loan */
        .ud-active-header {
          display: flex; align-items: center; gap: 7px; margin-bottom: 12px;
        }
        .ud-active-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: ud-pulse 2s infinite;
        }
        @keyframes ud-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.1); }
        }
        .ud-active-label { font-size: 0.75rem; font-weight: 700; color: #16a34a; text-transform: uppercase; letter-spacing: 0.5px; }
        .ud-active-aset {
          display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
          padding: 12px; background: white; border-radius: 11px;
          border: 1px solid #e0f2fe;
        }
        .ud-active-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: #eff6ff; color: #1d4ed8;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.05rem; flex-shrink: 0;
        }
        .ud-active-name { margin: 0 0 3px; font-size: 0.88rem; font-weight: 700; color: #0f172a; }
        .ud-active-code { margin: 0; font-size: 0.72rem; color: #94a3b8; }
        .ud-active-dates {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 14px;
        }
        .ud-active-date-item { flex: 1; }
        .ud-active-date-lbl { display: block; font-size: 0.65rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 3px; }
        .ud-active-date-val { font-size: 0.82rem; font-weight: 700; color: #1e293b; }
        .ud-active-date-arrow { color: #94a3b8; font-size: 1rem; }
        .ud-return-btn {
          width: 100%; padding: 10px;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: white; border: none; border-radius: 10px;
          font-weight: 700; font-size: 0.85rem;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          cursor: pointer; font-family: inherit; transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(22,163,74,0.3);
        }
        .ud-return-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(22,163,74,0.4); }

        /* Aset Grid */
        .ud-search-wrap {
          position: relative; display: flex; align-items: center;
        }
        .ud-search-icon {
          position: absolute; left: 12px; color: #94a3b8; pointer-events: none;
        }
        .ud-search-input {
          padding: 8px 12px 8px 32px;
          border: 1px solid #e2e8f0; border-radius: 10px;
          font-size: 0.82rem; color: #334155; background: #f8fafc;
          outline: none; font-family: inherit; width: 180px;
          transition: all 0.2s;
        }
        .ud-search-input:focus { border-color: #00b5e2; background: white; box-shadow: 0 0 0 3px rgba(0,181,226,0.1); }
        .ud-aset-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        }
        .ud-aset-card {
          display: flex; align-items: center; gap: 11px;
          padding: 12px 14px; border-radius: 11px;
          border: 1px solid #f1f5f9; background: #fafbfc;
          transition: all 0.2s; cursor: pointer;
        }
        .ud-aset-card:hover { border-color: #bfdbfe; background: #f0f9ff; }
        .ud-aset-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.95rem; flex-shrink: 0;
        }
        .ud-aset-info { flex: 1; min-width: 0; }
        .ud-aset-nama {
          display: block; font-size: 0.82rem; font-weight: 700; color: #1e293b;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ud-aset-meta { font-size: 0.7rem; color: #94a3b8; margin-top: 2px; }
        .ud-aset-kat { font-weight: 600; }
        .ud-aset-code { font-family: monospace; font-size: 0.68rem; }
        .ud-aset-pinjam-btn {
          flex-shrink: 0; padding: 5px 12px;
          background: #004494; color: white; border: none;
          border-radius: 8px; font-size: 0.72rem; font-weight: 700;
          cursor: pointer; font-family: inherit; transition: all 0.2s;
        }
        .ud-aset-pinjam-btn:hover { background: #00b5e2; transform: translateY(-1px); }

        .ud-empty-state {
          grid-column: 1 / -1; text-align: center;
          padding: 28px; color: #94a3b8; font-size: 0.85rem;
        }

        @media (max-width: 1100px) {
          .ud-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .ud-two-col { grid-template-columns: 1fr; }
          .ud-aset-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
          .ud-stats-grid { grid-template-columns: 1fr 1fr; }
          .ud-header { flex-direction: column; align-items: flex-start; gap: 12px; }
          .ud-aset-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

/* ── Helper Component ── */
const StatCard = ({ icon, label, value, sub, color, bg }) => (
  <div className="ud-stat-card">
    <div className="ud-stat-icon" style={{ background: bg, color }}>
      {icon}
    </div>
    <div>
      <div className="ud-stat-val" style={{ color }}>{value}</div>
      <div className="ud-stat-lbl">{label}</div>
      <div className="ud-stat-sub">{sub}</div>
    </div>
  </div>
);

// Dummy FaHistory (tidak ada di react-icons/fa, pakai substitute)
const FaHistory = (props) => (
  <svg {...props} viewBox="0 0 512 512" fill="currentColor" width="1em" height="1em">
    <path d="M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"/>
  </svg>
);

export default UserDashboard;