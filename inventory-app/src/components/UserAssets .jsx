import React, { useState } from "react";
import {
  FaBox, FaSearch, FaFilter, FaLaptop, FaCamera,
  FaCar, FaTv, FaTools, FaEye, FaClipboardList,
  FaMapMarkerAlt, FaTimes, FaChevronLeft, FaChevronRight,
} from "react-icons/fa";

/* ============================================================
   DATA
   ============================================================ */
const allAssets = [
  { id: "LT-0019", nama: "Laptop Dell Latitude 5540", kategori: "Laptop", kondisi: "Baik", status: "tersedia", lokasi: "Gudang Pusat", entitas: "Pelindo Pusat", spek: "Intel i5-13th, 16GB RAM, 512GB SSD", tahun: 2023 },
  { id: "LT-0022", nama: "Laptop HP ProBook 450", kategori: "Laptop", kondisi: "Baik", status: "tersedia", lokasi: "Gudang Pusat", entitas: "PMT", spek: "Intel i5-12th, 8GB RAM, 256GB SSD", tahun: 2022 },
  { id: "LT-0028", nama: "Laptop Asus Vivobook 16", kategori: "Laptop", kondisi: "Baik", status: "tersedia", lokasi: "Kantor Belawan", entitas: "PMT", spek: "AMD Ryzen 5, 16GB RAM, 512GB SSD", tahun: 2024 },
  { id: "LT-0011", nama: "Laptop Lenovo ThinkPad T14", kategori: "Laptop", kondisi: "Baik", status: "dipinjam", lokasi: "Kantor Dumai", entitas: "SPMT", spek: "Intel i7-11th, 16GB RAM, 512GB SSD", tahun: 2021 },
  { id: "PRJ-0007", nama: "Proyektor Epson EB-FH52", kategori: "Proyektor", kondisi: "Baik", status: "tersedia", lokasi: "Ruang Rapat A", entitas: "Pelindo Pusat", spek: "1080p Full HD, 4000 Lumens", tahun: 2022 },
  { id: "PRJ-0012", nama: "Proyektor BenQ MH733", kategori: "Proyektor", kondisi: "Baik", status: "tersedia", lokasi: "Ruang Rapat B", entitas: "PMT", spek: "1080p Full HD, 4000 Lumens, HDMI", tahun: 2023 },
  { id: "KM-0003", nama: "Kamera Sony Alpha A7 III", kategori: "Kamera", kondisi: "Baik", status: "tersedia", lokasi: "Gudang Pusat", entitas: "Pelindo Pusat", spek: "Full Frame, 24.2MP, 4K Video", tahun: 2022 },
  { id: "KM-0008", nama: "Kamera Canon EOS 850D", kategori: "Kamera", kondisi: "Baik", status: "tersedia", lokasi: "Gudang Pusat", entitas: "PMT", spek: "APS-C, 24.1MP, Full HD Video", tahun: 2021 },
  { id: "KM-0014", nama: "Kamera GoPro Hero 12", kategori: "Kamera", kondisi: "Baik", status: "maintenance", lokasi: "Bengkel IT", entitas: "PMT", spek: "5.3K Video, Waterproof, HyperSmooth", tahun: 2023 },
  { id: "KND-0003", nama: "Toyota Fortuner B 1234 XX", kategori: "Kendaraan", kondisi: "Baik", status: "tersedia", lokasi: "Pool Kendaraan", entitas: "Pelindo Pusat", spek: "2.4L Diesel, 7-seater, 2022", tahun: 2022 },
  { id: "KND-0007", nama: "Mitsubishi Pajero Sport", kategori: "Kendaraan", kondisi: "Baik", status: "dipinjam", lokasi: "Pool Kendaraan", entitas: "SPMT", spek: "2.4L Diesel, 7-seater, 2023", tahun: 2023 },
  { id: "CCTV-0021", nama: "IP Camera Hikvision 4MP", kategori: "Perangkat Jaringan", kondisi: "Rusak Ringan", status: "maintenance", lokasi: "Bengkel IT", entitas: "PMT", spek: "4MP, IR Night Vision, IP67", tahun: 2020 },
];

const CATEGORIES = ["Semua", "Laptop", "Proyektor", "Kamera", "Kendaraan", "Perangkat Jaringan"];
const STATUSES   = ["Semua", "tersedia", "dipinjam", "maintenance"];
const PER_PAGE   = 8;

const iconMap = {
  Laptop: <FaLaptop />, Proyektor: <FaTv />, Kamera: <FaCamera />,
  Kendaraan: <FaCar />, "Perangkat Jaringan": <FaTools />,
};
const colorMap = {
  Laptop: "#004494", Proyektor: "#7c3aed", Kamera: "#0891b2",
  Kendaraan: "#059669", "Perangkat Jaringan": "#d97706",
};
const statusCfg = {
  tersedia:    { label: "Tersedia",    bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  dipinjam:    { label: "Dipinjam",    bg: "#fffbeb", color: "#92400e", border: "#fde68a" },
  maintenance: { label: "Maintenance", bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
};

/* ============================================================
   MAIN
   ============================================================ */
const UserAssets = () => {
  const [search, setSearch]       = useState("");
  const [catFilter, setCatFilter] = useState("Semua");
  const [statFilter, setStatFilter] = useState("Semua");
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage]           = useState(1);
  const [detail, setDetail]       = useState(null);

  const filtered = allAssets.filter((a) => {
    const matchSearch = a.nama.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === "Semua" || a.kategori === catFilter;
    const matchStat   = statFilter === "Semua" || a.status === statFilter;
    return matchSearch && matchCat && matchStat;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetFilter = () => { setCatFilter("Semua"); setStatFilter("Semua"); setPage(1); };

  return (
    <div className="ua-wrapper">
      {/* HEADER */}
      <div className="ua-header">
        <div className="ua-header-left">
          <div className="ua-header-icon"><FaBox /></div>
          <div>
            <h1 className="ua-title">Daftar Aset</h1>
            <p className="ua-subtitle">{allAssets.filter(a=>a.status==="tersedia").length} aset tersedia dari total {allAssets.length}</p>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="ua-controls">
        <div className="ua-search">
          <FaSearch className="ua-search-icon" />
          <input
            className="ua-search-input"
            placeholder="Cari nama atau kode aset..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <button
          className={`ua-filter-btn ${showFilter ? "ua-filter-btn--active" : ""}`}
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter size={12} /> Filter
          {(catFilter !== "Semua" || statFilter !== "Semua") && (
            <span className="ua-filter-badge">!</span>
          )}
        </button>
      </div>

      {/* FILTER PANEL */}
      {showFilter && (
        <div className="ua-filter-panel">
          <div className="ua-filter-group">
            <label>Kategori</label>
            <div className="ua-filter-pills">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`ua-pill ${catFilter === c ? "ua-pill--active" : ""}`}
                  onClick={() => { setCatFilter(c); setPage(1); }}
                >{c}</button>
              ))}
            </div>
          </div>
          <div className="ua-filter-group">
            <label>Status</label>
            <div className="ua-filter-pills">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  className={`ua-pill ${statFilter === s ? "ua-pill--active" : ""}`}
                  onClick={() => { setStatFilter(s); setPage(1); }}
                >{s === "Semua" ? "Semua" : statusCfg[s].label}</button>
              ))}
            </div>
          </div>
          <button className="ua-reset-btn" onClick={resetFilter}><FaTimes size={11}/> Reset Filter</button>
        </div>
      )}

      {/* TABLE INFO */}
      <div className="ua-table-info">
        Menampilkan <strong>{paginated.length}</strong> dari <strong>{filtered.length}</strong> aset
      </div>

      {/* GRID ASET */}
      {paginated.length === 0 ? (
        <div className="ua-empty">
          <FaBox size={32} style={{ color: "#cbd5e1", marginBottom: 12 }} />
          <p>Tidak ada aset yang cocok.</p>
          <button className="ua-reset-btn" onClick={resetFilter}>Reset Filter</button>
        </div>
      ) : (
        <div className="ua-grid">
          {paginated.map((aset) => {
            const sc = statusCfg[aset.status];
            const ic = colorMap[aset.kategori] || "#64748b";
            return (
              <div key={aset.id} className="ua-card">
                <div className="ua-card-top">
                  <div className="ua-card-icon" style={{ background: `${ic}15`, color: ic }}>
                    {iconMap[aset.kategori] || <FaBox />}
                  </div>
                  <span className="ua-card-status" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                    {sc.label}
                  </span>
                </div>
                <p className="ua-card-nama">{aset.nama}</p>
                <p className="ua-card-code">{aset.id}</p>
                <div className="ua-card-meta">
                  <span><FaMapMarkerAlt size={10} /> {aset.lokasi}</span>
                  <span>{aset.kategori}</span>
                </div>
                <div className="ua-card-actions">
                  <button className="ua-btn-detail" onClick={() => setDetail(aset)}>
                    <FaEye size={12} /> Detail
                  </button>
                  {aset.status === "tersedia" && (
                    <button className="ua-btn-pinjam">
                      <FaClipboardList size={12} /> Pinjam
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="ua-pagination">
          <button className="ua-pg-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <FaChevronLeft size={11} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`ua-pg-btn ${page === p ? "ua-pg-btn--active" : ""}`}
              onClick={() => setPage(p)}
            >{p}</button>
          ))}
          <button className="ua-pg-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            <FaChevronRight size={11} />
          </button>
        </div>
      )}

      {/* MODAL DETAIL */}
      {detail && (
        <div className="ua-modal-overlay" onClick={() => setDetail(null)}>
          <div className="ua-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ua-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="ua-modal-icon" style={{ background: `${colorMap[detail.kategori]}15`, color: colorMap[detail.kategori] }}>
                  {iconMap[detail.kategori]}
                </div>
                <div>
                  <h3 className="ua-modal-title">{detail.nama}</h3>
                  <span className="ua-modal-code">{detail.id}</span>
                </div>
              </div>
              <button className="ua-modal-close" onClick={() => setDetail(null)}><FaTimes /></button>
            </div>
            <div className="ua-modal-body">
              <div className="ua-detail-grid">
                {[
                  ["Kategori", detail.kategori],
                  ["Status", statusCfg[detail.status].label],
                  ["Kondisi", detail.kondisi],
                  ["Lokasi", detail.lokasi],
                  ["Entitas", detail.entitas],
                  ["Tahun Pengadaan", detail.tahun],
                ].map(([lbl, val]) => (
                  <div key={lbl} className="ua-detail-item">
                    <span className="ua-detail-lbl">{lbl}</span>
                    <span className="ua-detail-val">{val}</span>
                  </div>
                ))}
              </div>
              <div className="ua-detail-spek">
                <span className="ua-detail-lbl">Spesifikasi</span>
                <p className="ua-detail-val">{detail.spek}</p>
              </div>
            </div>
            <div className="ua-modal-footer">
              <button className="ua-btn-detail" onClick={() => setDetail(null)}>Tutup</button>
              {detail.status === "tersedia" && (
                <button className="ua-btn-pinjam" style={{ padding: "10px 22px", fontSize: "0.88rem" }}>
                  <FaClipboardList size={13} /> Ajukan Peminjaman
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .ua-wrapper { font-family: 'Plus Jakarta Sans','Inter',sans-serif; display:flex; flex-direction:column; gap:18px; animation: uaIn .4s ease-out; }
        @keyframes uaIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

        .ua-header { display:flex; justify-content:space-between; align-items:center; }
        .ua-header-left { display:flex; align-items:center; gap:14px; }
        .ua-header-icon {
          width:48px;height:48px;border-radius:13px;
          background:linear-gradient(135deg,#dbeafe,#bfdbfe);
          color:#2563eb;display:flex;align-items:center;justify-content:center;font-size:1.1rem;
        }
        .ua-title { margin:0;font-size:1.5rem;font-weight:800;color:#0f172a;letter-spacing:-.4px; }
        .ua-subtitle { margin:4px 0 0;font-size:.82rem;color:#94a3b8; }

        .ua-controls { display:flex;gap:10px; }
        .ua-search { position:relative;flex:1;display:flex;align-items:center; }
        .ua-search-icon { position:absolute;left:14px;color:#94a3b8;font-size:.85rem; }
        .ua-search-input {
          width:100%;padding:12px 14px 12px 42px;
          border:1.5px solid #e2e8f0;border-radius:12px;
          font-size:.88rem;color:#334155;background:#f8fafc;
          outline:none;font-family:inherit;transition:all .2s;
        }
        .ua-search-input:focus { border-color:#00b5e2;background:white;box-shadow:0 0 0 4px rgba(0,181,226,.1); }
        .ua-filter-btn {
          display:flex;align-items:center;gap:7px;
          padding:11px 18px;border:1.5px solid #e2e8f0;border-radius:12px;
          background:white;color:#64748b;font-size:.85rem;font-weight:600;
          cursor:pointer;font-family:inherit;transition:all .2s;position:relative;
        }
        .ua-filter-btn--active { border-color:#00b5e2;color:#00b5e2;background:#f0f9ff; }
        .ua-filter-badge {
          position:absolute;top:-6px;right:-6px;width:16px;height:16px;
          background:#ef4444;color:white;border-radius:50%;font-size:.6rem;font-weight:800;
          display:flex;align-items:center;justify-content:center;border:2px solid white;
        }

        .ua-filter-panel {
          background:white;border:1.5px solid #e2e8f0;border-radius:14px;
          padding:18px 20px;display:flex;flex-direction:column;gap:14px;
          box-shadow:0 4px 16px rgba(0,0,0,.06);animation:uaIn .2s ease-out;
        }
        .ua-filter-group { display:flex;flex-direction:column;gap:8px; }
        .ua-filter-group label { font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px; }
        .ua-filter-pills { display:flex;gap:7px;flex-wrap:wrap; }
        .ua-pill {
          padding:6px 14px;border-radius:20px;border:1.5px solid #e2e8f0;
          background:white;color:#64748b;font-size:.78rem;font-weight:600;
          cursor:pointer;font-family:inherit;transition:all .2s;
        }
        .ua-pill--active { background:#004494;border-color:#004494;color:white; }
        .ua-reset-btn {
          display:inline-flex;align-items:center;gap:6px;
          background:#fef2f2;color:#dc2626;border:none;
          padding:7px 14px;border-radius:8px;font-size:.78rem;font-weight:700;
          cursor:pointer;font-family:inherit;width:fit-content;
        }

        .ua-table-info { font-size:.82rem;color:#94a3b8; }
        .ua-table-info strong { color:#334155; }

        .ua-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
        .ua-card {
          background:white;border-radius:14px;padding:16px 18px;
          border:1.5px solid #f1f5f9;
          box-shadow:0 2px 8px rgba(0,0,0,.04);
          display:flex;flex-direction:column;gap:8px;
          transition:all .2s;
        }
        .ua-card:hover { transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.09);border-color:#e2e8f0; }
        .ua-card-top { display:flex;justify-content:space-between;align-items:center; }
        .ua-card-icon { width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:.95rem; }
        .ua-card-status { padding:3px 10px;border-radius:20px;font-size:.68rem;font-weight:700; }
        .ua-card-nama { margin:0;font-size:.88rem;font-weight:700;color:#0f172a;line-height:1.3; }
        .ua-card-code { margin:0;font-family:monospace;font-size:.72rem;color:#94a3b8;font-weight:700; }
        .ua-card-meta { display:flex;justify-content:space-between;font-size:.72rem;color:#94a3b8;gap:4px; }
        .ua-card-meta span { display:flex;align-items:center;gap:4px; }
        .ua-card-actions { display:flex;gap:8px;margin-top:4px; }
        .ua-btn-detail {
          flex:1;padding:8px;border:1.5px solid #e2e8f0;border-radius:9px;
          background:white;color:#64748b;font-size:.78rem;font-weight:700;
          cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px;
          font-family:inherit;transition:all .2s;
        }
        .ua-btn-detail:hover { border-color:#004494;color:#004494; }
        .ua-btn-pinjam {
          flex:1;padding:8px;border:none;border-radius:9px;
          background:linear-gradient(135deg,#004494,#00b5e2);color:white;
          font-size:.78rem;font-weight:700;cursor:pointer;
          display:flex;align-items:center;justify-content:center;gap:5px;
          font-family:inherit;transition:all .2s;
        }
        .ua-btn-pinjam:hover { transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,68,148,.3); }

        .ua-empty { display:flex;flex-direction:column;align-items:center;padding:60px 20px;text-align:center;color:#94a3b8;font-size:.88rem; }

        .ua-pagination { display:flex;align-items:center;gap:6px;justify-content:center;padding-top:8px; }
        .ua-pg-btn {
          min-width:34px;height:34px;border-radius:8px;border:1.5px solid #e2e8f0;
          background:white;color:#64748b;font-size:.82rem;font-weight:600;
          cursor:pointer;display:flex;align-items:center;justify-content:center;
          font-family:inherit;transition:all .2s;
        }
        .ua-pg-btn:disabled { opacity:.35;cursor:not-allowed; }
        .ua-pg-btn:hover:not(:disabled) { border-color:#00b5e2;color:#00b5e2; }
        .ua-pg-btn--active { background:#004494;border-color:#004494;color:white; }

        /* Modal */
        .ua-modal-overlay {
          position:fixed;inset:0;background:rgba(10,22,40,.6);
          display:flex;align-items:center;justify-content:center;
          z-index:2000;backdrop-filter:blur(6px);padding:20px;
        }
        .ua-modal {
          background:white;border-radius:20px;width:100%;max-width:500px;
          box-shadow:0 24px 60px rgba(0,0,0,.2);animation:uaIn .25s ease-out;overflow:hidden;
        }
        .ua-modal-header {
          padding:18px 22px;background:#f8fafc;border-bottom:1px solid #f1f5f9;
          display:flex;justify-content:space-between;align-items:center;
        }
        .ua-modal-icon { width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem; }
        .ua-modal-title { margin:0;font-size:.95rem;font-weight:800;color:#0f172a; }
        .ua-modal-code { font-family:monospace;font-size:.72rem;color:#94a3b8;font-weight:700; }
        .ua-modal-close {
          width:30px;height:30px;border-radius:50%;border:none;
          background:#e2e8f0;color:#64748b;cursor:pointer;font-size:.9rem;
          display:flex;align-items:center;justify-content:center;transition:all .2s;
        }
        .ua-modal-close:hover { background:#334155;color:white; }
        .ua-modal-body { padding:20px 22px;display:flex;flex-direction:column;gap:14px; }
        .ua-detail-grid { display:grid;grid-template-columns:1fr 1fr;gap:10px; }
        .ua-detail-item { padding:11px 13px;background:#f8fafc;border-radius:10px;border:1px solid #f1f5f9; }
        .ua-detail-lbl { display:block;font-size:.68rem;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:4px; }
        .ua-detail-val { font-size:.85rem;font-weight:700;color:#1e293b; }
        .ua-detail-spek { padding:13px;background:#f8fafc;border-radius:10px;border:1px solid #f1f5f9; }
        .ua-detail-spek p { margin:4px 0 0;font-size:.85rem;color:#334155;line-height:1.5; }
        .ua-modal-footer { padding:16px 22px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px; }

        @media(max-width:1100px){ .ua-grid{grid-template-columns:repeat(3,1fr)} }
        @media(max-width:768px){ .ua-grid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:480px){ .ua-grid{grid-template-columns:1fr} }
      `}</style>
    </div>
  );
};

export default UserAssets;