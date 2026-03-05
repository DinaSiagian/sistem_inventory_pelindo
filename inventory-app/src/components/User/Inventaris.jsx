// ============================================================
// Inventaris.jsx — with dispose card support
// ============================================================
import { useState, useMemo } from "react";
import {
  currentUser,
  assetsMock,
  categoryConf,
  statusConf,
  fmtIDR,
} from "./data";
import AssetDetailModal from "./AssetDetailModal";
import BorrowModal from "./BorrowModal";
import "./Inventaris.css";

const ASSET_PHOTOS = {
  LAPTOP: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
  ],
  SERVER: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
    "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=400&q=80",
  ],
  DESKTOP: [
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&q=80",
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&q=80",
  ],
  NETWORK: [
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
    "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80",
  ],
  UPS: [
    "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&q=80",
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&q=80",
  ],
  OTHER: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
  ],
};

function getAssetPhoto(asset) {
  const pool = ASSET_PHOTOS[asset.category] || ASSET_PHOTOS.OTHER;
  const idx = parseInt(asset.id.replace(/\D/g, "") || "0", 10) % pool.length;
  return pool[idx];
}

const isDisposedStatus = (s) =>
  ["DISPOSE", "DIHAPUS", "DISPOSED", "HAPUS", "DELETE", "DELETED"].includes(
    (s || "").toUpperCase()
  );

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    search: (<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>),
    laptop: (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>),
    server: (<><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></>),
    monitor: (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h10M7 12h6"/></>),
    network: (<><circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="8" x2="5.5" y2="16"/><line x1="12" y1="8" x2="18.5" y2="16"/></>),
    battery: (<><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="11" x2="23" y2="13"/></>),
    cube: (<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></>),
    x: (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
    pin: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
    eye: (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>),
    ban: (<><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>),
  };
  const catIcons = {
    LAPTOP: "laptop", SERVER: "server", DESKTOP: "monitor",
    NETWORK: "network", UPS: "battery", OTHER: "cube",
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke={c || "currentColor"} strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round">
      {paths[catIcons[n] || n]}
    </svg>
  );
};

export default function Inventaris({ loans, setLoans }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [selectedAsset, setSelected] = useState(null);
  const [borrowAsset, setBorrow] = useState(null);
  const [imgErr, setImgErr] = useState({});

  const branchAssets = assetsMock.filter(
    (a) => a.branch_code === currentUser.branch_code,
  );

  const filtered = useMemo(
    () =>
      branchAssets.filter((a) => {
        const q = search.toLowerCase();
        return (
          (!q ||
            a.name.toLowerCase().includes(q) ||
            a.serial.toLowerCase().includes(q) ||
            a.brand.toLowerCase().includes(q)) &&
          (!catFilter || a.category === catFilter) &&
          (!statusFilter || a.status === statusFilter)
        );
      }),
    [search, catFilter, statusFilter],
  );

  const handleCardClick = (a) => {
    if (isDisposedStatus(a.status)) return;
    setSelected(a);
  };

  return (
    <div className="inventaris">
      <div className="inv-header">
        <div>
          <h1 className="inv-title">Inventaris Aset</h1>
          <p className="inv-sub">
            Aset di {currentUser.branch_name} —{" "}
            <strong>{branchAssets.length}</strong> total aset
          </p>
        </div>
      </div>

      <div className="inv-filterbar card">
        <div className="inv-search-wrap">
          <Ico n="search" s={15} c="var(--gray-400)" />
          <input
            className="inv-search"
            placeholder="Cari nama, serial, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="inv-search-clear" onClick={() => setSearch("")}>
              <Ico n="x" s={13} />
            </button>
          )}
        </div>
        <select
          className="form-control inv-select"
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          {Object.entries(categoryConf).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <select
          className="form-control inv-select"
          value={statusFilter}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Semua Status</option>
          {Object.entries(statusConf).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <span className="inv-count">{filtered.length} aset</span>
      </div>

      {filtered.length === 0 ? (
        <div className="card empty-state">
          <Ico n="search" s={36} />
          <p>Tidak ada aset yang sesuai filter</p>
        </div>
      ) : (
        <div className="inv-grid">
          {filtered.map((a) => {
            const cat = categoryConf[a.category] || categoryConf.OTHER;
            const st = statusConf[a.status];
            const photo = getAssetPhoto(a);
            const hasErr = imgErr[a.id];
            const isDisposed = isDisposedStatus(a.status);

            return (
              <div
                key={a.id}
                className={`inv-card card${isDisposed ? " is-disposed" : ""}`}
                onClick={() => handleCardClick(a)}
                title={isDisposed ? "Aset ini sudah di-dispose dan tidak dapat diakses" : undefined}
              >
                {/* ── Foto ── */}
                <div className="inv-card-photo">
                  {!hasErr ? (
                    <img
                      src={photo}
                      alt={a.name}
                      className="inv-card-img"
                      onError={() => setImgErr((p) => ({ ...p, [a.id]: true }))}
                    />
                  ) : (
                    <div
                      className="inv-card-img-fallback"
                      style={{ background: cat.bg, color: cat.color }}
                    >
                      <Ico n={a.category} s={44} />
                    </div>
                  )}
                  <div className="inv-photo-gradient" />

                  {/* Status badge */}
                  <span
                    className="inv-status-badge"
                    style={{ background: st.bg, color: st.color }}
                  >
                    <span className="badge-dot" style={{ background: st.dot }} />
                    {st.label}
                  </span>

                  {/* Kategori chip */}
                  <span className="inv-cat-chip" style={{ background: cat.color }}>
                    <Ico n={a.category} s={10} c="#fff" />
                    {cat.label}
                  </span>

                  {/* Disposed overlay — hanya jika disposed */}
                  {isDisposed && (
                    <div className="inv-disposed-overlay">
                      <div className="inv-disposed-badge">
                        <Ico n="ban" s={12} c="#f1f5f9" />
                        Aset Disposed
                      </div>
                    </div>
                  )}

                  {/* Hover overlay — hanya jika bukan disposed */}
                  {!isDisposed && (
                    <div className="inv-hover-overlay">
                      <Ico n="eye" s={18} c="#fff" />
                      <span>Lihat Detail</span>
                    </div>
                  )}
                </div>

                {/* ── Body ── */}
                <div className="inv-card-body">
                  <p className="inv-card-name">{a.name}</p>
                  <p className="inv-card-brand">{a.brand} · {a.model}</p>
                  <div className="inv-card-loc">
                    <Ico n="pin" s={11} c="var(--gray-400)" />
                    <span>{a.location}</span>
                  </div>
                  <div className="inv-card-price">{fmtIDR(a.price)}</div>
                  <div className="inv-card-footer">
                    <span className="inv-serial">{a.serial}</span>
                    <span className={`inv-budget ${a.budget_type === "CAPEX" ? "capex" : "opex"}`}>
                      {a.budget_type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          loans={loans}
          onClose={() => setSelected(null)}
          onBorrow={(a) => {
            setSelected(null);
            setBorrow(a);
          }}
        />
      )}
      {borrowAsset && (
        <BorrowModal
          asset={borrowAsset}
          onClose={() => setBorrow(null)}
          onConfirm={(newTrx) => {
            setLoans((prev) => [...prev, newTrx]);
            setBorrow(null);
          }}
        />
      )}
    </div>
  );
}