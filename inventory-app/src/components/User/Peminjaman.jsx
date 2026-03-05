// ============================================================
// Peminjaman.jsx — Redesigned: attractive & consistent
// ============================================================
import { useState } from "react";
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
import BorrowModal from "./BorrowModal";
import ReturnModal from "./ReturnModal";
import "./Peminjaman.css";

// ── Asset photos (sama dengan modul lain) ──
const ASSET_PHOTOS = {
  LAPTOP: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&q=80",
  ],
  SERVER: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=80",
    "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=300&q=80",
  ],
  DESKTOP: [
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300&q=80",
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=300&q=80",
  ],
  NETWORK: [
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&q=80",
    "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=300&q=80",
  ],
  UPS: [
    "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=300&q=80",
  ],
  OTHER: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
  ],
};
function getPhoto(asset) {
  const pool = ASSET_PHOTOS[asset?.category] || ASSET_PHOTOS.OTHER;
  return pool[
    parseInt((asset?.id || "0").replace(/\D/g, ""), 10) % pool.length
  ];
}

// Component kecil: thumbnail foto aset dengan fallback icon
function AssetThumb({ asset, cat }) {
  const [err, setErr] = useState(false);
  return (
    <div className="pem-asset-thumb">
      {!err ? (
        <img
          src={getPhoto(asset)}
          alt={asset?.name}
          onError={() => setErr(true)}
        />
      ) : (
        <div className="pem-asset-thumb-fallback" style={{ color: cat.color }}>
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* icon fallback sederhana — cube */}
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>
      )}
    </div>
  );
}

const Ico = ({ n, s = 18, c }) => {
  const paths = {
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
      </>
    ),
    cube: (
      <>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </>
    ),
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
    undo: (
      <>
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-3.99" />
      </>
    ),
    history: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    warn: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    ),
    check_circle: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    tag: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </>
    ),
    package: (
      <>
        <line x1="16.5" y1="9.4" x2="7.55" y2="4.24" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
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
      {paths[catIcons[n] || n]}
    </svg>
  );
};

function AssetPickerModal({ onSelect, onClose }) {
  const available = assetsMock.filter(
    (a) =>
      a.branch_code === currentUser.branch_code && a.status === "AVAILABLE",
  );
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h3 className="modal-title">Pilih Aset untuk Dipinjam</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body" style={{ padding: 0 }}>
          {available.length === 0 ? (
            <div className="empty-state">
              <Ico n="warn" s={28} />
              <p>Tidak ada aset tersedia saat ini</p>
            </div>
          ) : (
            available.map((a) => {
              const cat = categoryConf[a.category] || categoryConf.OTHER;
              return (
                <div
                  key={a.id}
                  className="picker-item"
                  onClick={() => onSelect(a)}
                >
                  <div
                    className="picker-icon"
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    <Ico n={a.category} s={18} />
                  </div>
                  <div className="picker-info">
                    <p className="picker-name">{a.name}</p>
                    <p className="picker-meta">
                      {a.brand} · {a.location}
                    </p>
                  </div>
                  <span className="picker-price">{fmtIDR(a.price)}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default function Peminjaman() {
  const [loans, setLoans] = useState(transactionsMock);
  const [tab, setTab] = useState("aktif");
  const [showPicker, setShowPicker] = useState(false);
  const [borrowAsset, setBorrow] = useState(null);
  const [returnTrx, setReturn] = useState(null);

  const myLoans = loans.filter(
    (t) => t.user_id === "u001" && t.status === "ACTIVE",
  );
  const myHistory = loans.filter(
    (t) => t.user_id === "u001" && t.status === "RETURNED",
  );
  const overdueLoans = myLoans.filter((t) => isOverdue(t.return_date));

  const enrich = (list) =>
    list.map((t) => ({
      ...t,
      asset: assetsMock.find((a) => a.id === t.asset_id),
    }));
  const activeRows = enrich(myLoans);
  const historyRows = enrich(myHistory);

  return (
    <div className="peminjaman">
      {/* ── Header ── */}
      <div className="pem-header">
        <div>
          <h1 className="pem-title">Peminjaman &amp; Pengembalian</h1>
          <p className="pem-sub">Kelola semua peminjaman aset Anda</p>
        </div>
        <button className="pem-new-btn" onClick={() => setShowPicker(true)}>
          <Ico n="plus" s={16} /> Ajukan Peminjaman Baru
        </button>
      </div>

      {/* ── Stats cards ── */}
      <div className="pem-stats">
        <div className="pem-stat-card">
          <div className="pem-stat-icon pem-stat-icon--blue">
            <Ico n="package" s={22} c="#1d4ed8" />
          </div>
          <div>
            <p className="pem-stat-val">{myLoans.length + myHistory.length}</p>
            <p className="pem-stat-label">Total Transaksi</p>
          </div>
        </div>
        <div className="pem-stat-card">
          <div className="pem-stat-icon pem-stat-icon--amber">
            <Ico n="clock" s={22} c="#d97706" />
          </div>
          <div>
            <p className="pem-stat-val">{myLoans.length}</p>
            <p className="pem-stat-label">Sedang Dipinjam</p>
          </div>
        </div>
        <div className="pem-stat-card">
          <div className="pem-stat-icon pem-stat-icon--green">
            <Ico n="check_circle" s={22} c="#16a34a" />
          </div>
          <div>
            <p className="pem-stat-val">{myHistory.length}</p>
            <p className="pem-stat-label">Dikembalikan</p>
          </div>
        </div>
        {overdueLoans.length > 0 && (
          <div className="pem-stat-card">
            <div className="pem-stat-icon pem-stat-icon--red">
              <Ico n="warn" s={22} c="#dc2626" />
            </div>
            <div>
              <p className="pem-stat-val" style={{ color: "#dc2626" }}>
                {overdueLoans.length}
              </p>
              <p className="pem-stat-label">Terlambat</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Overdue alert ── */}
      {overdueLoans.length > 0 && (
        <div className="pem-overdue-banner">
          <div className="pem-overdue-banner-icon">
            <Ico n="warn" s={18} c="#dc2626" />
          </div>
          <div>
            <strong>{overdueLoans.length} aset melewati jatuh tempo.</strong>{" "}
            Segera kembalikan untuk menghindari sanksi.
          </div>
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="pem-tabs">
        <button
          className={`pem-tab ${tab === "aktif" ? "active" : ""}`}
          onClick={() => setTab("aktif")}
        >
          <Ico n="history" s={15} />
          Aktif
          {myLoans.length > 0 && (
            <span className="pem-tab-count">{myLoans.length}</span>
          )}
        </button>
        <button
          className={`pem-tab ${tab === "riwayat" ? "active" : ""}`}
          onClick={() => setTab("riwayat")}
        >
          <Ico n="check_circle" s={15} />
          Riwayat
          {myHistory.length > 0 && (
            <span className="pem-tab-count pem-tab-count--gray">
              {myHistory.length}
            </span>
          )}
        </button>
      </div>

      {/* ── AKTIF tab ── */}
      {tab === "aktif" &&
        (activeRows.length === 0 ? (
          <div className="card pem-empty">
            <div className="pem-empty-icon">
              <Ico n="check_circle" s={34} c="#2563eb" />
            </div>
            <p className="pem-empty-title">Tidak ada peminjaman aktif</p>
            <p className="pem-empty-sub">
              Semua aset telah dikembalikan dengan baik
            </p>
            <button
              className="pem-empty-btn"
              onClick={() => setShowPicker(true)}
            >
              <Ico n="plus" s={15} /> Pinjam Aset Sekarang
            </button>
          </div>
        ) : (
          <div className="pem-list">
            {activeRows.map((t) => {
              const cat = categoryConf[t.asset?.category] || categoryConf.OTHER;
              const overdue = isOverdue(t.return_date);
              return (
                <div
                  key={t.id}
                  className={`pem-item ${overdue ? "pem-item--overdue" : ""}`}
                >
                  {/* accent stripe */}
                  <div
                    className={`pem-item-stripe pem-item-stripe--${overdue ? "overdue" : "active"}`}
                  />

                  <div className="pem-item-inner">
                    {/* kiri: foto + info aset */}
                    <div className="pem-item-asset">
                      <AssetThumb asset={t.asset} cat={cat} />
                      <div>
                        <p className="pem-asset-name">{t.asset?.name}</p>
                        <span className="pem-asset-serial">
                          {t.asset?.serial}
                        </span>
                      </div>
                    </div>

                    {/* tengah: tanggal + tujuan */}
                    <div className="pem-item-dates">
                      <div className="pem-date-row">
                        <Ico n="calendar" s={12} c="#94a3b8" />
                        <span className="pem-date-label">Dipinjam</span>
                        <span className="pem-date-val">{fmt(t.date)}</span>
                      </div>
                      <div
                        className={`pem-date-row ${overdue ? "pem-date-row--overdue" : ""}`}
                      >
                        <Ico
                          n={overdue ? "warn" : "calendar"}
                          s={12}
                          c={overdue ? "#ef4444" : "#94a3b8"}
                        />
                        <span className="pem-date-label">Jatuh Tempo</span>
                        <span className="pem-date-val">
                          {fmt(t.return_date)}
                          {overdue && " ⚠"}
                        </span>
                      </div>
                      <div className="pem-purpose">
                        <Ico n="tag" s={11} c="#94a3b8" />
                        <span>{t.purpose}</span>
                      </div>
                    </div>

                    {/* kanan: status + aksi */}
                    <div className="pem-item-right">
                      <span
                        className="pem-status-badge"
                        style={{
                          background: overdue ? "#fee2e2" : "#fef9c3",
                          color: overdue ? "#dc2626" : "#d97706",
                        }}
                      >
                        <span
                          className="badge-dot"
                          style={{
                            background: overdue ? "#ef4444" : "#f59e0b",
                          }}
                        />
                        {overdue ? "Terlambat" : "Aktif"}
                      </span>
                      <button
                        className="pem-return-btn"
                        onClick={() => setReturn(t)}
                      >
                        <Ico n="undo" s={13} /> Kembalikan
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

      {/* ── RIWAYAT tab ── */}
      {tab === "riwayat" &&
        (historyRows.length === 0 ? (
          <div className="card pem-empty">
            <div className="pem-empty-icon">
              <Ico n="history" s={34} c="#64748b" />
            </div>
            <p className="pem-empty-title">Belum ada riwayat</p>
            <p className="pem-empty-sub">
              Riwayat pengembalian akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="pem-list">
            {historyRows.map((t) => {
              const cat = categoryConf[t.asset?.category] || categoryConf.OTHER;
              return (
                <div key={t.id} className="pem-item pem-item--returned">
                  <div className="pem-item-stripe pem-item-stripe--returned" />
                  <div className="pem-item-inner">
                    <div className="pem-item-asset">
                      <AssetThumb asset={t.asset} cat={cat} />
                      <div>
                        <p className="pem-asset-name">{t.asset?.name}</p>
                        <span className="pem-asset-serial">
                          {t.asset?.serial}
                        </span>
                      </div>
                    </div>
                    <div className="pem-item-dates">
                      <div className="pem-date-row">
                        <Ico n="calendar" s={12} c="#94a3b8" />
                        <span className="pem-date-label">Dipinjam</span>
                        <span className="pem-date-val">{fmt(t.date)}</span>
                      </div>
                      <div className="pem-date-row">
                        <Ico n="calendar" s={12} c="#22c55e" />
                        <span className="pem-date-label">Dikembalikan</span>
                        <span
                          className="pem-date-val"
                          style={{ color: "#16a34a" }}
                        >
                          {fmt(t.returned_date)}
                        </span>
                      </div>
                      <div className="pem-purpose">
                        <Ico n="tag" s={11} c="#94a3b8" />
                        <span>{t.purpose}</span>
                      </div>
                    </div>
                    <div className="pem-item-right">
                      <span
                        className="pem-status-badge"
                        style={{ background: "#dcfce7", color: "#16a34a" }}
                      >
                        <span
                          className="badge-dot"
                          style={{ background: "#22c55e" }}
                        />
                        Dikembalikan
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

      {/* ── Modals ── */}
      {showPicker && (
        <AssetPickerModal
          onClose={() => setShowPicker(false)}
          onSelect={(a) => {
            setShowPicker(false);
            setBorrow(a);
          }}
        />
      )}
      {borrowAsset && (
        <BorrowModal
          asset={borrowAsset}
          onClose={() => setBorrow(null)}
          onConfirm={(newTrx) => {
            setLoans((p) => [...p, newTrx]);
            setBorrow(null);
          }}
        />
      )}
      {returnTrx && (
        <ReturnModal
          trx={returnTrx}
          asset={assetsMock.find((a) => a.id === returnTrx.asset_id)}
          onClose={() => setReturn(null)}
          onConfirm={(id, conditionAfter, returnNotes) => {
            setLoans((p) =>
              p.map((t) =>
                t.id === id
                  ? {
                      ...t,
                      status: "RETURNED",
                      returned_date: new Date().toISOString().split("T")[0],
                      condition_after: conditionAfter,
                      return_notes: returnNotes || "",
                    }
                  : t,
              ),
            );
            setReturn(null);
          }}
        />
      )}
    </div>
  );
}
