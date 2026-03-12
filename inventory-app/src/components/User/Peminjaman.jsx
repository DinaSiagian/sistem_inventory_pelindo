// ============================================================
// Peminjaman.jsx — with Enhanced AssetPickerModal
// ============================================================
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  currentUser,
  assetsMock,
  transactionsMock,
  categoryConf,
  fmtIDR,
  fmt,
  isOverdue,
} from "./Data";
import BorrowModal from "./BorrowModal";
import ReturnModal from "./ReturnModal";
import "./Peminjaman.css";

// ── Asset photos ──
const ASSET_PHOTOS = {
  LAPTOP: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&q=80",
  ],
  SERVER: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=80",
  ],
  DESKTOP: [
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300&q=80",
  ],
  NETWORK: [
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&q=80",
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

// Helper hitung sisa hari
function daysUntilDue(dateStr) {
  const due = new Date(dateStr);
  due.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((due - now) / 86400000);
}

// ── Icon Component ──
const Ico = ({ n, s = 18, c }) => {
  const paths = {
    laptop: (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>),
    server: (<><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></>),
    monitor: (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h10M7 12h6"/></>),
    network: (<><circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="8" x2="5.5" y2="16"/><line x1="12" y1="8" x2="18.5" y2="16"/></>),
    battery: (<><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="11" x2="23" y2="13"/></>),
    cube: (<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>),
    package: (<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>),
    plus: (<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>),
    undo: (<><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.99"/></>),
    history: (<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
    warn: (<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>),
    check_circle: (<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>),
    calendar: (<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>),
    tag: (<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>),
    clock: (<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
    arrow_right: (<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>),
    x: (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
    search: (<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>),
    location: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
    grid: (<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>),
    list_icon: (<><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>),
  };
  const catIcons = {
    LAPTOP: "laptop", SERVER: "server", DESKTOP: "monitor",
    NETWORK: "network", UPS: "battery", OTHER: "cube",
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke={c || "currentColor"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      {paths[catIcons[n] || n]}
    </svg>
  );
};

// ── Asset Thumbnail (untuk list aktif & riwayat) ──
function AssetThumb({ asset, cat }) {
  const [err, setErr] = useState(false);
  return (
    <div className="pem-asset-thumb" style={{ width: "52px", height: "52px", flexShrink: 0 }}>
      {!err ? (
        <img src={getPhoto(asset)} alt={asset?.name} onError={() => setErr(true)} />
      ) : (
        <div className="pem-asset-thumb-fallback" style={{ color: cat.color }}>
          <Ico n={asset?.category} s={22} />
        </div>
      )}
    </div>
  );
}

// ── Asset Photo (untuk picker modal) ──
function AssetPhoto({ asset, cat, size = 48 }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{
      width: size, height: size, flexShrink: 0, borderRadius: 10,
      overflow: "hidden", background: cat.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      border: `1.5px solid ${cat.color}22`,
    }}>
      {!err
        ? <img src={getPhoto(asset)} alt={asset?.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={() => setErr(true)} />
        : <Ico n={asset?.category} s={size * 0.45} c={cat.color} />
      }
    </div>
  );
}

// ── Constants untuk Picker ──
const CATEGORIES = [
  { key: "ALL",     label: "Semua" },
  { key: "LAPTOP",  label: "Laptop" },
  { key: "SERVER",  label: "Server" },
  { key: "DESKTOP", label: "Desktop" },
  { key: "NETWORK", label: "Network" },
  { key: "UPS",     label: "UPS" },
  { key: "OTHER",   label: "Lainnya" },
];

const SORT_OPTIONS = [
  { key: "name_asc",   label: "Nama A–Z" },
  { key: "name_desc",  label: "Nama Z–A" },
  { key: "price_asc",  label: "Harga Terendah" },
  { key: "price_desc", label: "Harga Tertinggi" },
];

// ── Enhanced Asset Picker Modal ──
function AssetPickerModal({ onSelect, onClose }) {
  const [query,    setQuery]    = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort,     setSort]     = useState("name_asc");
  const [viewMode, setViewMode] = useState("list");
  const searchRef = useRef(null);

  useEffect(() => { searchRef.current?.focus(); }, []);

  const available = useMemo(() =>
    assetsMock.filter(a =>
      a.branch_code === currentUser.branch_code && a.status === "AVAILABLE"
    ), []);

  // Hitung jumlah per kategori
  const counts = useMemo(() => {
    const c = { ALL: available.length };
    available.forEach(a => { c[a.category] = (c[a.category] || 0) + 1; });
    return c;
  }, [available]);

  const filtered = useMemo(() => {
    let list = [...available];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        (a.brand || "").toLowerCase().includes(q) ||
        (a.serial || "").toLowerCase().includes(q) ||
        (a.location || "").toLowerCase().includes(q)
      );
    }
    if (category !== "ALL") list = list.filter(a => a.category === category);
    list.sort((a, b) => {
      if (sort === "name_asc")   return a.name.localeCompare(b.name);
      if (sort === "name_desc")  return b.name.localeCompare(a.name);
      if (sort === "price_asc")  return (a.price || 0) - (b.price || 0);
      if (sort === "price_desc") return (b.price || 0) - (a.price || 0);
      return 0;
    });
    return list;
  }, [available, query, category, sort]);

  const isEmpty = filtered.length === 0;

  return (
    <>
      <style>{`
        .picker-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(15,23,42,0.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: picker-fade-in 0.18s ease;
        }
        @keyframes picker-fade-in { from{opacity:0} to{opacity:1} }
        .picker-modal {
          background: #fff; border-radius: 20px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18);
          width: 100%; max-width: 720px; max-height: 88vh;
          display: flex; flex-direction: column; overflow: hidden;
          animation: picker-slide-in 0.22s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes picker-slide-in {
          from{opacity:0;transform:translateY(16px) scale(0.97)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        .picker-head { padding: 20px 24px 0; flex-shrink: 0; }
        .picker-head-row {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 16px;
        }
        .picker-title { font-size: 18px; font-weight: 800; color: #0f172a; margin: 0; }
        .picker-subtitle { font-size: 13px; color: #64748b; margin: 3px 0 0; }
        .picker-close {
          width: 32px; height: 32px; border-radius: 8px;
          border: none; background: #f1f5f9; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #64748b; transition: all 0.15s; flex-shrink: 0;
        }
        .picker-close:hover { background: #fee2e2; color: #ef4444; }
        .picker-search-wrap { position: relative; margin-bottom: 14px; }
        .picker-search-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); color: #94a3b8; pointer-events: none;
        }
        .picker-search {
          width: 100%; padding: 11px 36px 11px 40px;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          font-size: 14px; color: #0f172a; outline: none;
          background: #f8fafc; box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .picker-search:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
          background: #fff;
        }
        .picker-search::placeholder { color: #94a3b8; }
        .picker-search-clear {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          width: 20px; height: 20px; border-radius: 50%;
          border: none; background: #cbd5e1; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff; padding: 0; line-height: 1;
        }
        .picker-search-clear:hover { background: #94a3b8; }
        .picker-toolbar {
          display: flex; align-items: center;
          gap: 10px; margin-bottom: 4px; flex-wrap: wrap;
        }
        .picker-cat-pills {
          display: flex; gap: 6px; overflow-x: auto; flex: 1;
          padding-bottom: 2px; scrollbar-width: none;
        }
        .picker-cat-pills::-webkit-scrollbar { display: none; }
        .picker-cat-pill {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 12px; border-radius: 99px;
          border: 1.5px solid #e2e8f0;
          font-size: 12.5px; font-weight: 600; cursor: pointer;
          white-space: nowrap; background: #fff; color: #475569;
          transition: all 0.15s; flex-shrink: 0;
        }
        .picker-cat-pill:hover { border-color: #bfdbfe; background: #eff6ff; color: #2563eb; }
        .picker-cat-pill.active { background: #2563eb; border-color: #2563eb; color: #fff; }
        .picker-cat-pill .pill-count {
          font-size: 11px; background: rgba(255,255,255,0.25);
          border-radius: 99px; padding: 0 5px; min-width: 16px; text-align: center;
        }
        .picker-cat-pill:not(.active) .pill-count { background: #f1f5f9; color: #94a3b8; }
        .picker-sort {
          padding: 7px 10px; border: 1.5px solid #e2e8f0;
          border-radius: 10px; font-size: 12.5px; color: #475569;
          background: #fff; cursor: pointer; outline: none;
          font-weight: 600; flex-shrink: 0; transition: border-color 0.15s;
        }
        .picker-sort:focus { border-color: #3b82f6; }
        .picker-view-toggle {
          display: flex; gap: 2px; background: #f1f5f9;
          border-radius: 8px; padding: 3px; flex-shrink: 0;
        }
        .picker-view-btn {
          border: none; background: transparent; cursor: pointer;
          padding: 5px 7px; border-radius: 6px;
          color: #94a3b8; transition: all 0.15s;
          display: flex; align-items: center;
        }
        .picker-view-btn.active { background: #fff; color: #2563eb; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
        .picker-divider { height: 1px; background: #f1f5f9; margin: 10px 0 0; }
        .picker-result-meta {
          font-size: 12px; color: #94a3b8; font-weight: 500;
          padding: 10px 24px 6px; flex-shrink: 0;
        }
        .picker-result-meta strong { color: #475569; }
        .picker-list { overflow-y: auto; flex: 1; padding: 0 12px 12px; }
        .picker-row {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 12px; border-radius: 14px; cursor: pointer;
          transition: background 0.12s; border: 1.5px solid transparent;
        }
        .picker-row:hover { background: #eff6ff; border-color: #bfdbfe; }
        .picker-row-info { flex: 1; min-width: 0; }
        .picker-row-name {
          font-size: 14.5px; font-weight: 700; color: #0f172a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0 0 4px;
        }
        .picker-row-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .picker-row-brand { font-size: 12px; color: #64748b; }
        .picker-row-serial {
          font-size: 11.5px; font-family: monospace;
          background: #f1f5f9; color: #475569; padding: 1px 6px; border-radius: 4px;
        }
        .picker-row-loc {
          font-size: 12px; color: #94a3b8;
          display: flex; align-items: center; gap: 3px;
        }
        .picker-row-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 6px; flex-shrink: 0;
        }
        .picker-row-price { font-size: 13.5px; font-weight: 800; color: #2563eb; letter-spacing: -0.3px; }
        .picker-row-badge {
          font-size: 11px; font-weight: 700; padding: 3px 9px;
          border-radius: 99px; background: #dcfce7; color: #16a34a;
          display: flex; align-items: center; gap: 4px;
        }
        .picker-row-badge::before {
          content:""; width:5px; height:5px; border-radius:50%; background:#22c55e;
        }
        .picker-grid-wrap {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 10px; padding: 0 12px 12px; overflow-y: auto; flex: 1;
        }
        .picker-grid-card {
          border: 1.5px solid #e2e8f0; border-radius: 14px;
          padding: 14px; cursor: pointer; transition: all 0.15s; background: #fff;
        }
        .picker-grid-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 16px rgba(59,130,246,0.12);
          transform: translateY(-2px);
        }
        .picker-grid-img {
          width: 100%; aspect-ratio: 16/9; border-radius: 8px;
          overflow: hidden; margin-bottom: 10px; background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
        }
        .picker-grid-img img { width:100%; height:100%; object-fit:cover; }
        .picker-grid-name {
          font-size: 13px; font-weight: 700; color: #0f172a; margin: 0 0 3px;
          overflow: hidden; display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        .picker-grid-brand { font-size: 11.5px; color: #64748b; margin-bottom: 6px; }
        .picker-grid-price { font-size: 13px; font-weight: 800; color: #2563eb; }
        .picker-empty-state {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 56px 24px; text-align: center; color: #94a3b8;
        }
        .picker-empty-icon {
          width: 64px; height: 64px; border-radius: 16px; background: #f8fafc;
          display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
        }
        .picker-empty-state p { margin: 0; font-size: 14px; }
        .picker-empty-state strong { display:block; font-size:15px; color:#475569; margin-bottom:5px; }
        .picker-empty-reset {
          margin-top: 14px; padding: 8px 20px; border: none; border-radius: 8px;
          background: #eff6ff; color: #2563eb; font-size: 13px;
          font-weight: 600; cursor: pointer; transition: background 0.15s;
        }
        .picker-empty-reset:hover { background: #dbeafe; }
      `}</style>

      <div className="picker-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="picker-modal">

          {/* Head */}
          <div className="picker-head">
            <div className="picker-head-row">
              <div>
                <h3 className="picker-title">Pilih Aset untuk Dipinjam</h3>
                <p className="picker-subtitle">{available.length} aset tersedia di cabang Anda</p>
              </div>
              <button className="picker-close" onClick={onClose}>
                <Ico n="x" s={14} />
              </button>
            </div>

            {/* Search bar */}
            <div className="picker-search-wrap">
              <span className="picker-search-icon"><Ico n="search" s={16} /></span>
              <input
                ref={searchRef}
                className="picker-search"
                type="text"
                placeholder="Cari nama, merek, serial, atau lokasi..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button className="picker-search-clear" onClick={() => setQuery("")}>
                  <Ico n="x" s={10} c="#fff" />
                </button>
              )}
            </div>

            {/* Toolbar: kategori + sort + view toggle */}
            <div className="picker-toolbar">
              <div className="picker-cat-pills">
                {CATEGORIES.map(cat =>
                  (counts[cat.key] !== undefined || cat.key === "ALL") ? (
                    <button
                      key={cat.key}
                      className={`picker-cat-pill ${category === cat.key ? "active" : ""}`}
                      onClick={() => setCategory(cat.key)}
                    >
                      {cat.label}
                      <span className="pill-count">{counts[cat.key] || 0}</span>
                    </button>
                  ) : null
                )}
              </div>

              <select className="picker-sort" value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>

              <div className="picker-view-toggle">
                <button
                  className={`picker-view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <Ico n="list_icon" s={15} />
                </button>
                <button
                  className={`picker-view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <Ico n="grid" s={15} />
                </button>
              </div>
            </div>

            <div className="picker-divider" />
          </div>

          {/* Result count */}
          <div className="picker-result-meta">
            Menampilkan <strong>{filtered.length}</strong> dari <strong>{available.length}</strong> aset
            {query && <> · pencarian "<strong>{query}</strong>"</>}
          </div>

          {/* Content */}
          {isEmpty ? (
            <div className="picker-empty-state">
              <div className="picker-empty-icon">
                <Ico n="search" s={28} c="#cbd5e1" />
              </div>
              <strong>Aset tidak ditemukan</strong>
              <p>Coba kata kunci lain atau ubah filter kategori</p>
              <button className="picker-empty-reset" onClick={() => { setQuery(""); setCategory("ALL"); }}>
                Reset Filter
              </button>
            </div>
          ) : viewMode === "list" ? (
            <div className="picker-list">
              {filtered.map(a => {
                const cat = categoryConf[a.category] || categoryConf.OTHER;
                return (
                  <div key={a.id} className="picker-row" onClick={() => onSelect(a)}>
                    <AssetPhoto asset={a} cat={cat} size={48} />
                    <div className="picker-row-info">
                      <p className="picker-row-name">{a.name}</p>
                      <div className="picker-row-meta">
                        <span className="picker-row-brand">{a.brand}</span>
                        <span className="picker-row-serial">{a.serial}</span>
                        <span className="picker-row-loc">
                          <Ico n="location" s={10} c="#94a3b8" /> {a.location}
                        </span>
                      </div>
                    </div>
                    <div className="picker-row-right">
                      <span className="picker-row-price">{fmtIDR(a.price)}</span>
                      <span className="picker-row-badge">Tersedia</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="picker-grid-wrap">
              {filtered.map(a => {
                const cat = categoryConf[a.category] || categoryConf.OTHER;
                return <GridCard key={a.id} a={a} cat={cat} onSelect={onSelect} />;
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// Grid card sebagai sub-component agar hooks bisa dipakai per card
function GridCard({ a, cat, onSelect }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="picker-grid-card" onClick={() => onSelect(a)}>
      <div className="picker-grid-img" style={{ background: cat.bg }}>
        {!imgErr
          ? <img src={getPhoto(a)} alt={a.name} onError={() => setImgErr(true)} />
          : <Ico n={a.category} s={32} c={cat.color} />
        }
      </div>
      <p className="picker-grid-name">{a.name}</p>
      <p className="picker-grid-brand">{a.brand} · {a.location}</p>
      <p className="picker-grid-price">{fmtIDR(a.price)}</p>
    </div>
  );
}

// ── Main Peminjaman Component ──
export default function Peminjaman() {
  const [loans, setLoans]       = useState(transactionsMock);
  const [tab, setTab]           = useState("aktif");
  const [showPicker, setShowPicker] = useState(false);
  const [borrowAsset, setBorrow]    = useState(null);
  const [returnTrx, setReturn]      = useState(null);

  const sessionUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
  const userId = sessionUser.id || "u001";

  const myLoans   = loans.filter(t => t.status === "ACTIVE"    && String(t.user_id).includes(userId));
  const myHistory = loans.filter(t => t.status === "RETURNED"  && String(t.user_id).includes(userId));

  const overdueLoans = myLoans.filter(t => isOverdue(t.return_date));

  const enrich = (list) =>
    list.map(t => ({ ...t, asset: assetsMock.find(a => a.id === t.asset_id) }));
  const activeRows  = enrich(myLoans);
  const historyRows = enrich(myHistory);

  return (
    <div className="peminjaman">
      <style>{`
        @keyframes due-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>

      {/* Header */}
      <div className="pem-header">
        <div>
          <h1 className="pem-title">Peminjaman &amp; Pengembalian</h1>
          <p className="pem-sub">Kelola semua peminjaman aset Anda</p>
        </div>
        <button className="pem-new-btn" onClick={() => setShowPicker(true)}>
          <Ico n="plus" s={16} /> Ajukan Peminjaman Baru
        </button>
      </div>

      {/* Stats cards */}
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
      </div>

      {/* Banner overdue */}
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

      {/* Tabs */}
      <div className="pem-tabs">
        <button className={`pem-tab ${tab === "aktif" ? "active" : ""}`} onClick={() => setTab("aktif")}>
          <Ico n="history" s={15} /> Aktif{" "}
          {myLoans.length > 0 && <span className="pem-tab-count">{myLoans.length}</span>}
        </button>
        <button className={`pem-tab ${tab === "riwayat" ? "active" : ""}`} onClick={() => setTab("riwayat")}>
          <Ico n="check_circle" s={15} /> Riwayat{" "}
          {myHistory.length > 0 && <span className="pem-tab-count pem-tab-count--gray">{myHistory.length}</span>}
        </button>
      </div>

      {/* Tab Aktif */}
      {tab === "aktif" && (
        activeRows.length === 0 ? (
          <div className="card pem-empty">
            <div className="pem-empty-icon"><Ico n="check_circle" s={34} c="#2563eb" /></div>
            <p className="pem-empty-title">Tidak ada peminjaman aktif</p>
            <p className="pem-empty-sub">Semua aset telah dikembalikan dengan baik</p>
            <button className="pem-empty-btn" onClick={() => setShowPicker(true)}>
              <Ico n="plus" s={15} /> Pinjam Aset Sekarang
            </button>
          </div>
        ) : (
          <div className="pem-list">
            {activeRows.map(t => {
              const cat = categoryConf[t.asset?.category] || categoryConf.OTHER;
              const overdue = isOverdue(t.return_date);
              const days = daysUntilDue(t.return_date);
              const isWarning = !overdue && days <= 2;

              return (
                <div
                  key={t.id}
                  className={`pem-item ${overdue ? "pem-item--overdue" : ""}`}
                  style={isWarning && !overdue ? { borderColor: "#fde047" } : {}}
                >
                  <div
                    className={`pem-item-stripe pem-item-stripe--${overdue ? "overdue" : isWarning ? "warning" : "active"}`}
                    style={isWarning && !overdue ? { background: "linear-gradient(to bottom,#f59e0b,#fbbf24)" } : {}}
                  />
                  <div className="pem-item-inner" style={{ alignItems: "center", padding: "20px 24px", gap: "16px" }}>
                    {/* Kiri: Info Aset */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1.2, minWidth: "260px" }}>
                      <AssetThumb asset={t.asset} cat={cat} />
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>{t.asset?.name}</p>
                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                          <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#475569", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>{t.asset?.serial}</span>
                          <span style={{ fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Ico n="tag" s={11} /> {t.purpose}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tengah: Tanggal */}
                    <div style={{ flex: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", minWidth: "280px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.5px" }}>DIPINJAM</span>
                        <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#334155" }}>{fmt(t.date)}</span>
                      </div>
                      <div style={{ color: "#cbd5e1", marginTop: "4px" }}><Ico n="arrow_right" s={20} /></div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: overdue ? "#ef4444" : isWarning ? "#d97706" : "#94a3b8", letterSpacing: "0.5px" }}>JATUH TEMPO</span>
                        <span style={{ fontSize: "13.5px", fontWeight: 800, color: overdue ? "#dc2626" : isWarning ? "#b45309" : "#0f172a" }}>{fmt(t.return_date)}</span>
                      </div>
                    </div>

                    {/* Kanan: Status & Aksi */}
                    <div style={{ flexShrink: 0, minWidth: "150px", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontSize: "12px", fontWeight: 700, padding: "5px 12px", borderRadius: "99px",
                        background: overdue ? "#fef2f2" : isWarning ? "#fffbeb" : "#eff6ff",
                        color: overdue ? "#dc2626" : isWarning ? "#d97706" : "#1d4ed8",
                        animation: overdue || isWarning ? "due-pulse 2s infinite" : "none",
                      }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: overdue ? "#ef4444" : isWarning ? "#f59e0b" : "#3b82f6" }} />
                        {overdue ? `Terlambat ${Math.abs(days)} Hari` : isWarning ? (days === 0 ? "Jatuh Tempo Hari Ini" : `H-${days} Jatuh Tempo`) : "Status Aktif"}
                      </div>
                      <button className="pem-return-btn" onClick={() => setReturn(t)}>
                        <Ico n="undo" s={13} /> Kembalikan
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Tab Riwayat */}
      {tab === "riwayat" && (
        historyRows.length === 0 ? (
          <div className="card pem-empty">
            <div className="pem-empty-icon"><Ico n="history" s={34} c="#64748b" /></div>
            <p className="pem-empty-title">Belum ada riwayat</p>
          </div>
        ) : (
          <div className="pem-list">
            {historyRows.map(t => {
              const cat = categoryConf[t.asset?.category] || categoryConf.OTHER;
              return (
                <div key={t.id} className="pem-item pem-item--returned">
                  <div className="pem-item-stripe pem-item-stripe--returned" />
                  <div className="pem-item-inner" style={{ alignItems: "center", padding: "18px 24px", gap: "16px" }}>
                    {/* Kiri */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1.2, minWidth: "260px" }}>
                      <AssetThumb asset={t.asset} cat={cat} />
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#475569" }}>{t.asset?.name}</p>
                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                          <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#94a3b8" }}>{t.asset?.serial}</span>
                          <span style={{ fontSize: "12px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Ico n="tag" s={11} /> {t.purpose}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tengah */}
                    <div style={{ flex: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", minWidth: "280px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.5px" }}>DIPINJAM</span>
                        <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#64748b" }}>{fmt(t.date)}</span>
                      </div>
                      <div style={{ color: "#e2e8f0", marginTop: "4px" }}><Ico n="arrow_right" s={20} /></div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", letterSpacing: "0.5px" }}>DIKEMBALIKAN</span>
                        <span style={{ fontSize: "13.5px", fontWeight: 800, color: "#16a34a" }}>{fmt(t.returned_date)}</span>
                      </div>
                    </div>

                    {/* Kanan */}
                    <div style={{ flexShrink: 0, minWidth: "150px", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontSize: "12px", fontWeight: 700, padding: "5px 12px",
                        borderRadius: "99px", background: "#dcfce7", color: "#16a34a",
                      }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                        Selesai
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Modals */}
      {showPicker && (
        <AssetPickerModal
          onClose={() => setShowPicker(false)}
          onSelect={a => { setShowPicker(false); setBorrow(a); }}
        />
      )}
      {borrowAsset && (
        <BorrowModal
          asset={borrowAsset}
          onClose={() => setBorrow(null)}
          onConfirm={newTrx => { setLoans(p => [...p, newTrx]); setBorrow(null); }}
        />
      )}
      {returnTrx && (
        <ReturnModal
          trx={returnTrx}
          asset={assetsMock.find(a => a.id === returnTrx.asset_id)}
          onClose={() => setReturn(null)}
          onConfirm={(id, conditionAfter, returnNotes) => {
            setLoans(p => p.map(t =>
              t.id === id
                ? { ...t, status: "RETURNED", returned_date: new Date().toISOString().split("T")[0], condition_after: conditionAfter, return_notes: returnNotes || "" }
                : t
            ));
            setReturn(null);
          }}
        />
      )}
    </div>
  );
}