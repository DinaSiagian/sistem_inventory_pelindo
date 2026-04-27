// ============================================================
// Dashboard.jsx — Fixed: pakai useNavigate dari React Router
// ============================================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  currentUser,
  assetsMock,
  transactionsMock,
  categoryConf,
  statusConf,
  fmtIDR,
  fmt,
  isOverdue,
} from "./data";
import AssetDetailModal from "./AssetDetailModal";
import BorrowModal from "./BorrowModal";
import "./Dashboard.css";

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    box: (
      <>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    building: (
      <>
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
        <line x1="12" y1="12" x2="12" y2="17" />
        <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
      </>
    ),
    warn: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    ),
    laptop: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
    server: (
      <>
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </>
    ),
    monitor: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 8h10M7 12h6" />
      </>
    ),
    network: (
      <>
        <circle cx="12" cy="5" r="3" />
        <circle cx="19" cy="19" r="3" />
        <circle cx="5" cy="19" r="3" />
        <line x1="12" y1="8" x2="5.5" y2="16" />
        <line x1="12" y1="8" x2="18.5" y2="16" />
      </>
    ),
    battery: (
      <>
        <rect x="1" y="6" width="18" height="12" rx="2" />
        <line x1="23" y1="11" x2="23" y2="13" />
        <line x1="5" y1="9" x2="5" y2="15" />
        <line x1="9" y1="9" x2="9" y2="15" />
      </>
    ),
    cube: (
      <>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </>
    ),
  };
  const catIcons = {
    LAPTOP: "laptop",
    SERVER: "server",
    DESKTOP: "monitor",
    NETWORK: "network",
    UPS: "battery",
    OTHER: "cube",
  };
  const k = catIcons[n] || n;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[k]}
    </svg>
  );
};

export default function Dashboard() {
  const navigate = useNavigate(); // ← React Router, bukan props
  const [user] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const [loans, setLoans] = useState(transactionsMock);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [borrowAsset, setBorrowAsset] = useState(null);

  // Gunakan ID user yang sedang login jika ada, fallback ke u001 untuk demo data
  const activeUserId = user?.id || "u001";

  const myLoans = loans.filter(
    (t) => t.user_id == activeUserId && t.status === "ACTIVE",
  );
  const myReturned = loans.filter(
    (t) => t.user_id == activeUserId && t.status === "RETURNED",
  );
  const branchAssets = assetsMock.filter(
    (a) => a.branch_code === (user?.branches_code || user?.branch_code || currentUser.branch_code),
  );
  const available = branchAssets.filter((a) => a.status === "AVAILABLE");

  const loanDetails = myLoans.map((t) => ({
    ...t,
    asset: assetsMock.find((a) => a.id === t.asset_id),
  }));

  const kpis = [
    {
      label: "Aset Tersedia",
      value: available.length,
      sub: "di lokasi Anda",
      icon: "box",
      color: "blue",
    },
    {
      label: "Sedang Dipinjam",
      value: myLoans.length,
      sub: "oleh Anda",
      icon: "clock",
      color: "orange",
    },
    {
      label: "Total Dikembalikan",
      value: myReturned.length,
      sub: "riwayat Anda",
      icon: "check",
      color: "green",
    },
    {
      label: "Total Aset Lokasi",
      value: branchAssets.length,
      sub: user?.branch?.name || user?.branch_name || currentUser.branch_name,
      icon: "building",
      color: "purple",
    },
  ];

  return (
    <div className="dashboard">
      {/* Greeting */}
      <div className="dash-greeting">
        <div>
          <h1 className="dash-greeting-title">
            Halo, {user?.name?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="dash-greeting-sub">
            Selamat datang di sistem manajemen aset {user?.branch?.name || user?.branch_name || currentUser.branch_name}.
          </p>
        </div>
        <div className="dash-date-chip">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Warning banner */}
      {myLoans.some((t) => isOverdue(t.return_date)) && (
        <div className="dash-warn-banner">
          <Ico n="warn" s={18} c="#b45309" />
          <div>
            <strong>Perhatian:</strong> Anda memiliki peminjaman yang{" "}
            <strong>melewati batas waktu pengembalian</strong>. Segera
            kembalikan aset tersebut.
          </div>
          <button
            className="btn btn-sm"
            style={{ background: "#b45309", color: "#fff", marginLeft: "auto" }}
            onClick={() => navigate("/user/peminjaman")}
          >
            Lihat →
          </button>
        </div>
      )}

      {/* KPI cards */}
      <div className="dash-kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className={`kpi-card kpi-${k.color}`}>
            <div className="kpi-icon">
              <Ico n={k.icon} s={20} />
            </div>
            <div className="kpi-body">
              <p className="kpi-value">{k.value}</p>
              <p className="kpi-label">{k.label}</p>
              <p className="kpi-sub">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two-col section */}
      <div className="dash-cols">
        {/* Active loans */}
        <div className="card dash-loans-card">
          <div className="card-header">
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              <Ico n="clock" s={16} c="var(--primary-600)" />
              Peminjaman Aktif
            </h2>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/user/peminjaman")}
            >
              Lihat Semua
            </button>
          </div>
          {loanDetails.length === 0 ? (
            <div className="empty-state" style={{ padding: "32px" }}>
              <Ico n="check" s={32} c="var(--gray-300)" />
              <p>Tidak ada peminjaman aktif</p>
            </div>
          ) : (
            <div className="dash-loan-list">
              {loanDetails.map((t) => (
                <div key={t.id} className="dash-loan-item">
                  <div
                    className="loan-asset-icon"
                    style={{
                      background: categoryConf[t.asset?.category]?.bg,
                      color: categoryConf[t.asset?.category]?.color,
                    }}
                  >
                    <Ico n={t.asset?.category || "OTHER"} s={16} />
                  </div>
                  <div className="loan-info">
                    <p className="loan-name">{t.asset?.name}</p>
                    <p className="loan-purpose">{t.purpose}</p>
                  </div>
                  <div className="loan-due">
                    <span
                      className={`loan-due-label ${isOverdue(t.return_date) ? "overdue" : ""}`}
                    >
                      {isOverdue(t.return_date) && "⚠ "}Jatuh tempo{" "}
                      {fmt(t.return_date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick browse available */}
        <div className="card dash-avail-card">
          <div className="card-header">
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              <Ico n="box" s={16} c="var(--primary-600)" />
              Aset Tersedia
            </h2>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/user/inventaris")}
            >
              Lihat Semua
            </button>
          </div>
          <div className="dash-avail-list">
            {available.slice(0, 5).map((a) => (
              <div
                key={a.id}
                className="dash-avail-item"
                onClick={() => setSelectedAsset(a)}
              >
                <div
                  className="avail-icon"
                  style={{
                    background: categoryConf[a.category]?.bg,
                    color: categoryConf[a.category]?.color,
                  }}
                >
                  <Ico n={a.category} s={15} />
                </div>
                <div className="avail-info">
                  <p className="avail-name">{a.name}</p>
                  <p className="avail-loc">{a.location}</p>
                </div>
                <span
                  className="badge"
                  style={{
                    background: statusConf[a.status]?.bg,
                    color: statusConf[a.status]?.color,
                    fontSize: "11px",
                  }}
                >
                  {statusConf[a.status]?.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          loans={loans}
          onClose={() => setSelectedAsset(null)}
          onBorrow={(a) => {
            setSelectedAsset(null);
            setBorrowAsset(a);
          }}
        />
      )}
      {borrowAsset && (
        <BorrowModal
          asset={borrowAsset}
          onClose={() => setBorrowAsset(null)}
          onConfirm={(newTrx) => {
            setLoans((prev) => [...prev, newTrx]);
            setBorrowAsset(null);
          }}
        />
      )}
    </div>
  );
}
