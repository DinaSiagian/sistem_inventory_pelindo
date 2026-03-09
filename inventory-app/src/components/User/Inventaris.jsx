// ============================================================
// Inventaris.jsx — with pagination, per-page selector & sorting
// ============================================================
import { useState, useMemo } from "react";
import { currentUser, assetsMock, categoryConf, statusConf } from "./data";
import AssetDetailModal from "./AssetDetailModal";
import BorrowModal from "./BorrowModal";
import "./Inventaris.css";

// ── Pool foto per-kategori — dipakai oleh card grid DAN AssetDetailModal ──
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

// Fungsi deterministik: aset sama → foto sama di card maupun modal
function getAssetPhoto(asset) {
  const pool = PHOTO_POOLS[asset?.category] || PHOTO_POOLS.OTHER;
  const num = parseInt((asset?.id || "").replace(/\D/g, "") || "0", 10);
  return pool[num % pool.length];
}

// Fallback picsum.photos — 100% tidak pernah broken, tidak akan tampil icon
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

// ── Pagination helper: build page number list with ellipsis ──
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

export default function Inventaris({ loans, setLoans }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [selectedAsset, setSelected] = useState(null);
  const [borrowAsset, setBorrow] = useState(null);
  const [imgErr, setImgErr] = useState({});

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
      // Disposed always sinks to bottom
      if (aDisposed && !bDisposed) return 1;
      if (!aDisposed && bDisposed) return -1;
      // Normal sort for the rest
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

  // Reset to page 1 on filter/sort/perPage change
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
    setSelected(a);
  };

  const pageList = buildPageList(safePage, totalPages);

  const currentSortOpt = SORT_OPTIONS.find((o) => o.key === sortKey);

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

      {/* ── Toolbar: Sort + Per-page ── */}
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

      {/* ── Grid / Empty ── */}
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
      ) : (
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
                    {/* Foto: primary (Unsplash) → fallback (picsum, 100% reliable) */}
                    <img
                      src={!hasErr ? photo : getAssetPhotoFallback(a)}
                      alt={a.name}
                      className="inv-card-img"
                      onError={(e) => {
                        if (!hasErr) {
                          // Primary gagal → coba picsum fallback
                          setImgErr((p) => ({ ...p, [a.id]: true }));
                        } else {
                          // Picsum juga gagal (sangat jarang) → hide img
                          e.currentTarget.style.display = "none";
                        }
                      }}
                    />
                    <div className="inv-photo-gradient" />

                    {/* Status badge */}
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

                    {/* Kategori chip */}
                    <span
                      className="inv-cat-chip"
                      style={{ background: cat.color }}
                    >
                      <Ico n={a.category} s={10} c="#fff" />
                      {cat.label}
                    </span>

                    {/* Disposed overlay */}
                    {isDisposed && (
                      <div className="inv-disposed-overlay">
                        <div className="inv-disposed-badge">
                          <Ico n="ban" s={12} c="#f1f5f9" />
                          Aset Disposed
                        </div>
                      </div>
                    )}

                    {/* Hover overlay */}
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
                {/* Prev */}
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

                {/* Next */}
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
