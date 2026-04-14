// ============================================================
// Inventaris.jsx — with pagination, per-page selector & sorting
// Detail aset ditampilkan sebagai halaman inline (tanpa modal/popup)
// ============================================================
import { useState, useMemo } from "react";
import { currentUser, assetsMock, categoryConf, statusConf } from "./data";
import "./Inventaris.css";

// ── Pool foto per-kategori ──
const PHOTO_POOLS = {
  LAPTOP: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1611186871525-8778f68f8f1c?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fm=webp",
  ],
  SERVER: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&q=80&fm=webp",
  ],
  DESKTOP: [
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&fm=webp",
  ],
  NETWORK: [
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80&fm=webp",
  ],
  UPS: [
    "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1548263594-a71ea65a8598?w=600&q=80&fm=webp",
  ],
  OTHER: [
    "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=600&q=80&fm=webp",
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80&fm=webp",
  ],
};

function getAssetPhoto(asset) {
  const pool = PHOTO_POOLS[asset?.category] || PHOTO_POOLS.OTHER;
  const num = parseInt((asset?.id || "").replace(/\D/g, "") || "0", 10);
  return pool[num % pool.length];
}

function getAssetPhotoFallback(asset) {
  const cat = (asset?.category || "OTHER").toLowerCase();
  const num = parseInt((asset?.id || "").replace(/\D/g, "") || "0", 10);
  return `https://picsum.photos/seed/${cat}${num % 8}/600/400`;
}

const isDisposedStatus = (s) =>
  ["DISPOSE", "DIHAPUS", "DISPOSED", "HAPUS", "DELETE", "DELETED"].includes(
    (s || "").toUpperCase(),
  );

// ── Sort config ──
const SORT_OPTIONS = [
  { key: "name_asc", label: "Nama A–Z", field: "name", dir: "asc" },
  { key: "name_desc", label: "Nama Z–A", field: "name", dir: "desc" },
  { key: "status_asc", label: "Status", field: "status", dir: "asc" },
  { key: "category_asc", label: "Kategori", field: "category", dir: "asc" },
  { key: "budget_asc", label: "Budget Type", field: "budget_type", dir: "asc" },
];

// ── Per-page options ──
const PER_PAGE_OPTIONS = [20, 50, 100];

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    pin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    ban: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </>
    ),
    filter: (
      <>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </>
    ),
    tag: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </>
    ),
    sortAsc: (
      <>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </>
    ),
    sortDesc: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </>
    ),
    sort: (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="9" y1="18" x2="15" y2="18" />
      </>
    ),
    chevLeft: (
      <>
        <polyline points="15 18 9 12 15 6" />
      </>
    ),
    chevRight: (
      <>
        <polyline points="9 18 15 12 9 6" />
      </>
    ),
    arrowLeft: (
      <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
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
    hash: (
      <>
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    // ── icon peminjaman: tangan menerima/mengulurkan barang ──
    borrow: (
      <>
        <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
        <path d="M18 8l4 4-4 4" />
        <line x1="22" y1="12" x2="10" y2="12" />
      </>
    ),
    hand: (
      <>
        <path d="M20 10V7c0-1.65-1.35-3-3-3s-3 1.35-3 3v3M10 18.5a2 2 0 0 1-3-3M4 21v-3.5a4.5 4.5 0 0 1 9 0V21M3 16h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z" />
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
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: "block",
        color: c || "inherit",
        flex: "0 0 auto",
      }}
    >
      {paths[catIcons[n] || n]}
    </svg>
  );
};

// ── Pagination helper ──
function buildPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "…", total);
  } else if (current >= total - 3) {
    pages.push(1, "…", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "…", current - 1, current, current + 1, "…", total);
  }
  return pages;
}

// ── Halaman Detail Aset (inline, bukan modal) ──
function AssetDetailPage({ asset, loans, onBack, onBorrow }) {
  const [imgErr, setImgErr] = useState(false);
  const cat = categoryConf[asset.category] || categoryConf.OTHER;
  const st = statusConf[asset.status];
  const isDisposed = isDisposedStatus(asset.status);
  const photo = getAssetPhoto(asset);

  // Riwayat peminjaman untuk aset ini
  const assetLoans = (loans || []).filter((l) => l.asset_id === asset.id);

  return (
    <div className="inv-detail-page">
      {/* ── Breadcrumb / Back ── */}
      <div className="inv-detail-breadcrumb">
        <button className="inv-back-btn" onClick={onBack}>
          <Ico n="arrowLeft" s={16} />
          Kembali ke Inventaris
        </button>
        <span className="inv-breadcrumb-sep">/</span>
        <span className="inv-breadcrumb-current">{asset.name}</span>
      </div>

      {/* ── Hero foto ── */}
      <div className="inv-detail-hero">
        <img
          src={!imgErr ? photo : getAssetPhotoFallback(asset)}
          alt={asset.name}
          className={`inv-detail-hero-img${isDisposed ? " is-disposed" : ""}`}
          onError={() => setImgErr(true)}
        />

        {isDisposed && (
          <div className="inv-disposed-overlay">
            <div className="inv-disposed-badge">
              <Ico n="ban" s={12} c="#f1f5f9" />
              Aset Disposed
            </div>
          </div>
        )}
      </div>

      {/* Konten Detail */}
      <div className="inv-detail-content">
        {/* Kolom kiri: info aset */}
        <div className="inv-detail-main">
          <div className="card inv-detail-card">
            <h2 className="inv-detail-name">{asset.name}</h2>
            <p className="inv-detail-brand">
              {asset.brand} · {asset.model}
            </p>

            <div className="inv-detail-divider" />

            <div className="inv-detail-grid">
              <div className="inv-detail-field">
                <span className="inv-detail-label">ID</span>
                <span
                  className="inv-detail-value inv-detail-mono"
                  style={{
                    background: "var(--gray-50)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12.5px",
                    color: "var(--gray-600)",
                  }}
                >
                  {asset.id}
                </span>
              </div>

              <div className="inv-detail-field">
                <span className="inv-detail-label">Serial</span>
                <span className="inv-detail-value">{asset.serial}</span>
              </div>

              <div className="inv-detail-field">
                <span className="inv-detail-label">Kategori</span>
                <span className="inv-detail-value">{cat.label}</span>
              </div>

              <div className="inv-detail-field">
                <span className="inv-detail-label">Lokasi</span>
                <span className="inv-detail-value">{asset.location}</span>
              </div>

              <div className="inv-detail-field">
                <span className="inv-detail-label">Status</span>
                <span className="inv-detail-value">{st.label}</span>
              </div>

              <div className="inv-detail-field">
                <span className="inv-detail-label">Budget Type</span>
                <span className="inv-detail-value">{asset.budget_type}</span>
              </div>

              {asset.purchase_date && (
                <div className="inv-detail-field">
                  <span className="inv-detail-label">Tanggal Beli</span>
                  <span className="inv-detail-value">
                    {asset.purchase_date}
                  </span>
                </div>
              )}

              {asset.warranty_until && (
                <div className="inv-detail-field">
                  <span className="inv-detail-label">Garansi s.d.</span>
                  <span className="inv-detail-value">
                    {asset.warranty_until}
                  </span>
                </div>
              )}

              {asset.notes && (
                <div className="inv-detail-field inv-detail-field--full">
                  <span className="inv-detail-label">Catatan</span>
                  <span className="inv-detail-value">{asset.notes}</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Tombol aksi ── */}
          {!isDisposed && (
            <div className="inv-detail-actions">
              {asset.status === "AVAILABLE" && (
                <button
                  className="inv-action-btn inv-action-btn--primary"
                  onClick={() => onBorrow(asset)}
                >
                  <Ico n="borrow" s={16} />
                  Pinjam Aset
                </button>
              )}
              <button
                className="inv-action-btn inv-action-btn--secondary"
                onClick={onBack}
              >
                <Ico n="arrowLeft" s={16} />
                Kembali
              </button>
            </div>
          )}
        </div>

        {/* Kolom kanan: riwayat peminjaman */}
        <div className="inv-detail-sidebar">
          <div className="card inv-detail-card">
            <h3 className="inv-detail-section-title">Riwayat Peminjaman</h3>
            {assetLoans.length === 0 ? (
              <p className="inv-detail-empty-loans">
                Belum ada riwayat peminjaman untuk aset ini.
              </p>
            ) : (
              <div className="inv-loan-list">
                {assetLoans.map((loan, idx) => (
                  <div key={loan.id || idx} className="inv-loan-item">
                    <div className="inv-loan-header">
                      <span className="inv-loan-user">
                        {loan.borrower_name || loan.user_id}
                      </span>
                      <span
                        className={`inv-loan-status ${loan.returned_at ? "returned" : "active"}`}
                      >
                        {loan.returned_at ? "Dikembalikan" : "Sedang dipinjam"}
                      </span>
                    </div>
                    <div className="inv-loan-dates">
                      <span>
                        <Ico n="calendar" s={11} c="var(--gray-400)" />
                        {loan.borrow_date || loan.borrowed_at}
                      </span>
                      {loan.returned_at && <span>→ {loan.returned_at}</span>}
                    </div>
                    {loan.notes && (
                      <p className="inv-loan-notes">{loan.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Halaman Form Peminjaman (inline, bukan modal) ──
function BorrowPage({ asset, onBack, onConfirm }) {
  const [form, setForm] = useState({
    borrower_name: currentUser.name || "",
    borrow_date: new Date().toISOString().slice(0, 10),
    return_plan: "",
    notes: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.borrower_name || !form.borrow_date) return;
    const newTrx = {
      id: `TRX-${Date.now()}`,
      asset_id: asset.id,
      borrower_name: form.borrower_name,
      borrow_date: form.borrow_date,
      return_plan: form.return_plan,
      notes: form.notes,
      borrowed_at: form.borrow_date,
      returned_at: null,
    };
    onConfirm(newTrx);
  };

  const cat = categoryConf[asset.category] || categoryConf.OTHER;

  return (
    <div className="inv-borrow-page">
      {/* Breadcrumb */}
      <div className="inv-detail-breadcrumb">
        <button className="inv-back-btn" onClick={onBack}>
          <Ico n="arrowLeft" s={16} />
          Kembali ke Detail Aset
        </button>
        <span className="inv-breadcrumb-sep">/</span>
        <span className="inv-breadcrumb-current">Pinjam Aset</span>
      </div>

      <div className="inv-borrow-layout">
        {/* Info aset ringkas */}
        <div className="card inv-borrow-asset-card">
          <div className="inv-borrow-asset-info">
            <span
              className="inv-cat-chip"
              style={{
                background: cat.color,
                position: "relative",
                fontSize: 11,
              }}
            >
              <Ico n={asset.category} s={10} c="#fff" />
              {cat.label}
            </span>
            <div>
              <p className="inv-borrow-asset-name">{asset.name}</p>
              <p className="inv-borrow-asset-brand">
                {asset.brand} · {asset.model}
              </p>
              <p className="inv-borrow-asset-serial">{asset.serial}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card inv-borrow-form-card">
          <h2 className="inv-borrow-title">Form Peminjaman</h2>

          <div className="inv-borrow-field">
            <label className="inv-borrow-label">Nama Peminjam *</label>
            <input
              className="inv-borrow-input"
              type="text"
              value={form.borrower_name}
              onChange={(e) => handleChange("borrower_name", e.target.value)}
              placeholder="Nama lengkap peminjam"
            />
          </div>

          <div className="inv-borrow-row">
            <div className="inv-borrow-field">
              <label className="inv-borrow-label">Tanggal Pinjam *</label>
              <input
                className="inv-borrow-input"
                type="date"
                value={form.borrow_date}
                onChange={(e) => handleChange("borrow_date", e.target.value)}
              />
            </div>
            <div className="inv-borrow-field">
              <label className="inv-borrow-label">Rencana Pengembalian</label>
              <input
                className="inv-borrow-input"
                type="date"
                value={form.return_plan}
                onChange={(e) => handleChange("return_plan", e.target.value)}
              />
            </div>
          </div>

          <div className="inv-borrow-field">
            <label className="inv-borrow-label">Catatan</label>
            <textarea
              className="inv-borrow-input inv-borrow-textarea"
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Keterangan tambahan (opsional)"
              rows={3}
            />
          </div>

          <div className="inv-borrow-actions">
            <button
              className="inv-action-btn inv-action-btn--secondary"
              onClick={onBack}
            >
              Batal
            </button>
            <button
              className="inv-action-btn inv-action-btn--primary"
              onClick={handleSubmit}
              disabled={!form.borrower_name || !form.borrow_date}
            >
              <Ico n="borrow" s={16} />
              Konfirmasi Peminjaman
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Inventaris({ loans, setLoans }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [imgErr, setImgErr] = useState({});

  // ── View state: "list" | "detail" | "borrow" ──
  const [view, setView] = useState("list");
  const [selectedAsset, setSelectedAsset] = useState(null);

  // ── Display mode: "table" | "grid" (default table) ──
  const [displayMode, setDisplayMode] = useState("table");

  // ── Sorting & paging state ──
  const [sortKey, setSortKey] = useState("name_asc");
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const branchAssets = assetsMock.filter(
    (a) => a.branch_code === currentUser.branch_code,
  );

  // Filter
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

  // Sort — disposed/deleted always pinned to the very bottom
  const sorted = useMemo(() => {
    const opt = SORT_OPTIONS.find((o) => o.key === sortKey);
    if (!opt) return filtered;
    return [...filtered].sort((a, b) => {
      const aDisposed = isDisposedStatus(a.status);
      const bDisposed = isDisposedStatus(b.status);
      if (aDisposed && !bDisposed) return 1;
      if (!aDisposed && bDisposed) return -1;
      const va = (a[opt.field] || "").toString().toLowerCase();
      const vb = (b[opt.field] || "").toString().toLowerCase();
      if (va < vb) return opt.dir === "asc" ? -1 : 1;
      if (va > vb) return opt.dir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const safePage = Math.min(page, totalPages);
  const pageItems = sorted.slice((safePage - 1) * perPage, safePage * perPage);
  const startItem = sorted.length === 0 ? 0 : (safePage - 1) * perPage + 1;
  const endItem = Math.min(safePage * perPage, sorted.length);

  const handleSearch = (v) => {
    setSearch(v);
    setPage(1);
  };
  const handleCat = (v) => {
    setCatFilter(v);
    setPage(1);
  };
  const handleStatus = (v) => {
    setStatus(v);
    setPage(1);
  };
  const handleSort = (key) => {
    setSortKey(key);
    setPage(1);
  };
  const handlePerPage = (n) => {
    setPerPage(n);
    setPage(1);
  };

  const handleCardClick = (a) => {
    if (isDisposedStatus(a.status)) return;
    setSelectedAsset(a);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedAsset(null);
  };

  const handleGoToBorrow = (a) => {
    setSelectedAsset(a);
    setView("borrow");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBorrowConfirm = (newTrx) => {
    setLoans((prev) => [...prev, newTrx]);
    setView("list");
    setSelectedAsset(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageList = buildPageList(safePage, totalPages);

  // ── Render: halaman detail ──
  if (view === "detail" && selectedAsset) {
    return (
      <AssetDetailPage
        asset={selectedAsset}
        loans={loans}
        onBack={handleBackToList}
        onBorrow={handleGoToBorrow}
      />
    );
  }

  // ── Render: halaman form pinjam ──
  if (view === "borrow" && selectedAsset) {
    return (
      <BorrowPage
        asset={selectedAsset}
        onBack={() => setView("detail")}
        onConfirm={handleBorrowConfirm}
      />
    );
  }

  // ── Render: halaman daftar inventaris ──
  return (
    <div className="inventaris">
      {/* ── Header ── */}
      <div className="inv-header">
        <div className="inv-header-text">
          <h1 className="inv-title">Inventaris Aset</h1>
          <p className="inv-sub">
            {currentUser.branch_name} — <strong>{branchAssets.length}</strong>{" "}
            total aset terdaftar
          </p>
        </div>
        <div className="inv-header-stat">
          <div className="inv-stat-pill">
            <span className="inv-stat-dot inv-stat-dot--green" />
            <span>
              {branchAssets.filter((a) => a.status === "AVAILABLE").length}{" "}
              Tersedia
            </span>
          </div>
          <div className="inv-stat-pill">
            <span className="inv-stat-dot inv-stat-dot--amber" />
            <span>
              {branchAssets.filter((a) => a.status === "BORROWED").length}{" "}
              Dipinjam
            </span>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="inv-filterbar card">
        <div className="inv-search-wrap">
          <Ico n="search" s={15} c="var(--gray-400)" />
          <input
            className="inv-search"
            placeholder="Cari nama, serial, brand..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {search && (
            <button
              className="inv-search-clear"
              onClick={() => handleSearch("")}
            >
              <Ico n="x" s={13} />
            </button>
          )}
        </div>

        <div className="inv-filters-right">
          <div className="inv-select-wrap">
            <Ico n="tag" s={13} c="var(--gray-400)" />
            <select
              className="inv-select"
              value={catFilter}
              onChange={(e) => handleCat(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              {Object.entries(categoryConf).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div className="inv-select-wrap">
            <Ico n="filter" s={13} c="var(--gray-400)" />
            <select
              className="inv-select"
              value={statusFilter}
              onChange={(e) => handleStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              {Object.entries(statusConf).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <span className="inv-count">{filtered.length} aset</span>
        </div>
      </div>

      {/* ── Toolbar: Sort + Per-page + View Toggle ── */}
      <div className="inv-toolbar">
        <div className="inv-toolbar-left">
          <span className="inv-toolbar-label">Urutkan:</span>
          {SORT_OPTIONS.map((opt) => {
            const isActive = sortKey === opt.key;
            const iconName =
              opt.dir === "asc"
                ? "sortAsc"
                : opt.dir === "desc"
                  ? "sortDesc"
                  : "sort";
            return (
              <button
                key={opt.key}
                className={`inv-sort-btn${isActive ? " active" : ""}`}
                onClick={() => handleSort(opt.key)}
              >
                <Ico n={iconName} s={12} />
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="inv-toolbar-right">
          {/* View Mode Toggle */}
          <div className="inv-view-toggle">
            <button
              className={`inv-view-btn${displayMode === "table" ? " active" : ""}`}
              onClick={() => setDisplayMode("table")}
              title="Tampilan Tabel"
            >
              <Ico n="hash" s={14} />
              Tabel
            </button>
            <button
              className={`inv-view-btn${displayMode === "grid" ? " active" : ""}`}
              onClick={() => setDisplayMode("grid")}
              title="Tampilan Grid"
            >
              <Ico n="cube" s={14} />
              Grid
            </button>
          </div>

          <span className="inv-perpage-label">Tampilkan:</span>
          <div className="inv-perpage-group">
            {PER_PAGE_OPTIONS.map((n) => (
              <button
                key={n}
                className={`inv-perpage-btn${perPage === n ? " active" : ""}`}
                onClick={() => handlePerPage(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table / Grid / Empty ── */}
      {filtered.length === 0 ? (
        <div className="card inv-empty">
          <div className="inv-empty-icon">
            <Ico n="search" s={28} c="#94a3b8" />
          </div>
          <p className="inv-empty-title">Tidak ada aset ditemukan</p>
          <p className="inv-empty-sub">
            Coba ubah filter atau kata kunci pencarian
          </p>
        </div>
      ) : displayMode === "table" ? (
        /* ── TABLE VIEW ── */
        <>
          <div className="inv-table-container">
            <table className="inv-table">
              <thead>
                <tr>
                  <th className="inv-table-id">ID Aset</th>
                  <th className="inv-table-name">Nama Aset</th>
                  <th className="inv-table-brand">Brand · Model</th>
                  <th className="inv-table-serial">Serial</th>
                  <th className="inv-table-location">Lokasi</th>
                  <th className="inv-table-category">Kategori</th>
                  <th className="inv-table-status">Status</th>
                  <th className="inv-table-action">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((a) => {
                  const cat = categoryConf[a.category] || categoryConf.OTHER;
                  const st = statusConf[a.status];
                  const photo = getAssetPhoto(a);
                  const hasErr = imgErr[a.id];
                  const isDisposed = isDisposedStatus(a.status);
                  const isAvailable = a.status === "AVAILABLE";

                  return (
                    <tr
                      key={a.id}
                      className={`inv-table-row${isDisposed ? " is-disposed" : ""}`}
                    >
                      {/* ID Aset */}
                      <td className="inv-table-id">
                        <code className="inv-table-code">{a.id}</code>
                      </td>

                      {/* Nama Aset dengan foto */}
                      <td className="inv-table-name">
                        <div className="inv-table-cell-name">
                          <img
                            src={!hasErr ? photo : getAssetPhotoFallback(a)}
                            alt={a.name}
                            className="inv-table-thumb"
                            onError={() => {
                              if (!hasErr) {
                                setImgErr((p) => ({ ...p, [a.id]: true }));
                              }
                            }}
                          />
                          <span className="inv-table-text-strong">
                            {a.name}
                          </span>
                          {isDisposed && (
                            <span className="inv-table-badge inv-table-badge--disposed">
                              Disposed
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Brand · Model */}
                      <td className="inv-table-brand">
                        <span className="inv-table-text">
                          {a.brand} · {a.model}
                        </span>
                      </td>

                      {/* Serial */}
                      <td className="inv-table-serial">
                        <code className="inv-table-code">{a.serial}</code>
                      </td>

                      {/* Lokasi */}
                      <td className="inv-table-location">
                        <div className="inv-table-location-text">
                          <div className="inv-table-loc-main">{a.location}</div>
                        </div>
                      </td>

                      {/* Kategori */}
                      <td className="inv-table-category">
                        <span
                          className="inv-table-badge"
                          style={{
                            background: cat.color + "20",
                            color: cat.color,
                          }}
                        >
                          {cat.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="inv-table-status">
                        <span
                          className="inv-table-status-badge"
                          style={{ background: st.bg, color: st.color }}
                        >
                          {st.label}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="inv-table-action">
                        <div className="inv-table-actions">
                          <button
                            className="inv-table-action-btn inv-table-action-btn--detail"
                            onClick={() => handleCardClick(a)}
                            title="Lihat Detail"
                          >
                            <Ico n="eye" s={13} />
                          </button>
                          {isAvailable && !isDisposed && (
                            <button
                              className="inv-table-action-btn inv-table-action-btn--borrow"
                              onClick={() => handleGoToBorrow(a)}
                              title="Pinjam Aset"
                            >
                              <Ico n="borrow" s={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="inv-pagination-wrap">
              <p className="inv-pagination-info">
                Menampilkan{" "}
                <strong>
                  {startItem}–{endItem}
                </strong>{" "}
                dari <strong>{sorted.length}</strong> aset
              </p>

              <div className="inv-pagination">
                <button
                  className="inv-pg-btn"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => p - 1)}
                  title="Halaman sebelumnya"
                >
                  <Ico n="chevLeft" s={13} />
                </button>

                {pageList.map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className="inv-pg-ellipsis">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      className={`inv-pg-btn${p === safePage ? " active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  className="inv-pg-btn"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  title="Halaman berikutnya"
                >
                  <Ico n="chevRight" s={13} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* ── GRID VIEW ── */
        <>
          <div className="inv-grid">
            {pageItems.map((a) => {
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
                  title={isDisposed ? "Aset ini sudah di-dispose" : undefined}
                >
                  {/* ── Foto ── */}
                  <div className="inv-card-photo">
                    <img
                      src={!hasErr ? photo : getAssetPhotoFallback(a)}
                      alt={a.name}
                      className="inv-card-img"
                      onError={(e) => {
                        if (!hasErr) {
                          setImgErr((p) => ({ ...p, [a.id]: true }));
                        } else {
                          e.currentTarget.style.display = "none";
                        }
                      }}
                    />
                    <div className="inv-photo-gradient" />

                    <span
                      className="inv-status-badge"
                      style={{ background: st.bg, color: st.color }}
                    >
                      <span
                        className="badge-dot"
                        style={{ background: st.dot }}
                      />
                      {st.label}
                    </span>

                    <span
                      className="inv-cat-chip"
                      style={{ background: cat.color }}
                    >
                      <Ico n={a.category} s={10} c="#fff" />
                      {cat.label}
                    </span>

                    {isDisposed && (
                      <div className="inv-disposed-overlay">
                        <div className="inv-disposed-badge">
                          <Ico n="ban" s={12} c="#f1f5f9" />
                          Aset Disposed
                        </div>
                      </div>
                    )}

                    {!isDisposed && (
                      <div className="inv-hover-overlay">
                        <div className="inv-hover-btn">
                          <Ico n="eye" s={16} c="#fff" />
                          Lihat Detail
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Body ── */}
                  <div className="inv-card-body">
                    <div className="inv-card-top">
                      <p className="inv-card-name">{a.name}</p>
                      <span
                        className={`inv-budget ${a.budget_type === "CAPEX" ? "capex" : "opex"}`}
                      >
                        {a.budget_type}
                      </span>
                    </div>
                    <p className="inv-card-brand">
                      {a.brand} · {a.model}
                    </p>
                    <div className="inv-card-loc">
                      <Ico n="pin" s={11} c="var(--gray-400)" />
                      <span>{a.location}</span>
                    </div>
                    <div className="inv-card-footer">
                      <span className="inv-serial">{a.serial}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="inv-pagination-wrap">
              <p className="inv-pagination-info">
                Menampilkan{" "}
                <strong>
                  {startItem}–{endItem}
                </strong>{" "}
                dari <strong>{sorted.length}</strong> aset
              </p>

              <div className="inv-pagination">
                <button
                  className="inv-pg-btn"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => p - 1)}
                  title="Halaman sebelumnya"
                >
                  <Ico n="chevLeft" s={13} />
                </button>

                {pageList.map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className="inv-pg-ellipsis">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      className={`inv-pg-btn${p === safePage ? " active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  className="inv-pg-btn"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  title="Halaman berikutnya"
                >
                  <Ico n="chevRight" s={13} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}