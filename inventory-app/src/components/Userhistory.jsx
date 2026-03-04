import React, { useState } from "react";
import {
  FaHistory, FaSearch, FaFilter, FaLaptop, FaCamera, FaCar, FaTv,
  FaBox, FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaChevronLeft, FaChevronRight,
  FaEye, FaCheckCircle, FaClock, FaExclamationTriangle, FaFileAlt,
} from "react-icons/fa";

/* ============================================================
   DATA
   ============================================================ */
const historyData = [
  { id:"PJM-0041", aset:"Laptop Dell Latitude 5540", kode:"LT-0019", kategori:"Laptop",
    tglPinjam:"2026-02-28", tglKembali:"2026-03-07", tglDikembalikan:null,
    status:"aktif", keperluan:"Kerja lapangan survey pelabuhan Belawan",
    lokasi:"Area Pelabuhan Belawan", catatan:"Butuh charger cadangan" },
  { id:"PJM-0038", aset:"Proyektor Epson EB-FH52", kode:"PRJ-0007", kategori:"Proyektor",
    tglPinjam:"2026-02-20", tglKembali:"2026-02-22", tglDikembalikan:"2026-02-22",
    status:"selesai", keperluan:"Presentasi laporan RUPS", lokasi:"Ruang Rapat A", catatan:"-" },
  { id:"PJM-0031", aset:"Kamera Sony Alpha A7 III", kode:"KM-0003", kategori:"Kamera",
    tglPinjam:"2026-02-10", tglKembali:"2026-02-12", tglDikembalikan:"2026-02-12",
    status:"selesai", keperluan:"Dokumentasi kegiatan HUT Pelindo", lokasi:"Kantor Pusat", catatan:"-" },
  { id:"PJM-0025", aset:"Laptop Lenovo ThinkPad T14", kode:"LT-0011", kategori:"Laptop",
    tglPinjam:"2026-01-28", tglKembali:"2026-02-03", tglDikembalikan:"2026-02-06",
    status:"terlambat", keperluan:"Pekerjaan analisis data CAPEX", lokasi:"Kantor Dumai", catatan:"Terlambat 3 hari" },
  { id:"PJM-0019", aset:"Toyota Fortuner B 1234 XX", kode:"KND-0003", kategori:"Kendaraan",
    tglPinjam:"2026-01-15", tglKembali:"2026-01-16", tglDikembalikan:"2026-01-16",
    status:"selesai", keperluan:"Inspeksi lapangan ke Terminal Belawan", lokasi:"Terminal Belawan", catatan:"-" },
  { id:"PJM-0014", aset:"Kamera GoPro Hero 12", kode:"KM-0014", kategori:"Kamera",
    tglPinjam:"2025-12-20", tglKembali:"2025-12-22", tglDikembalikan:"2025-12-22",
    status:"selesai", keperluan:"Dokumentasi kegiatan akhir tahun", lokasi:"Area Operasional", catatan:"-" },
  { id:"PJM-0010", aset:"Proyektor BenQ MH733", kode:"PRJ-0012", kategori:"Proyektor",
    tglPinjam:"2025-12-05", tglKembali:"2025-12-06", tglDikembalikan:"2025-12-06",
    status:"selesai", keperluan:"Pelatihan K3 karyawan baru", lokasi:"Aula Lantai 2", catatan:"-" },
  { id:"PJM-0007", aset:"Laptop HP ProBook 450", kode:"LT-0022", kategori:"Laptop",
    tglPinjam:"2025-11-18", tglKembali:"2025-11-25", tglDikembalikan:"2025-11-28",
    status:"terlambat", keperluan:"Audit internal departemen keuangan", lokasi:"Ruang Audit", catatan:"Terlambat 3 hari karena proses audit belum selesai" },
];

const STATUSES = ["Semua", "aktif", "selesai", "terlambat"];
const CATS     = ["Semua", "Laptop", "Proyektor", "Kamera", "Kendaraan"];
const PER_PAGE = 6;

const iconMap  = { Laptop:<FaLaptop/>, Proyektor:<FaTv/>, Kamera:<FaCamera/>, Kendaraan:<FaCar/> };
const colorMap = { Laptop:"#004494", Proyektor:"#7c3aed", Kamera:"#0891b2", Kendaraan:"#059669" };
const statusCfg = {
  aktif:     { label:"Aktif",      bg:"#eff6ff", color:"#1d4ed8", border:"#bfdbfe", icon:<FaClock size={10}/> },
  selesai:   { label:"Selesai",    bg:"#f0fdf4", color:"#15803d", border:"#bbf7d0", icon:<FaCheckCircle size={10}/> },
  terlambat: { label:"Terlambat",  bg:"#fef2f2", color:"#b91c1c", border:"#fecaca", icon:<FaExclamationTriangle size={10}/> },
};

const fmt = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" });
};

/* ============================================================
   MAIN
   ============================================================ */
const UserHistory = () => {
  const [search, setSearch]       = useState("");
  const [statFilter, setStatFilter] = useState("Semua");
  const [catFilter, setCatFilter] = useState("Semua");
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage]           = useState(1);
  const [detail, setDetail]       = useState(null);

  const filtered = historyData.filter((h) => {
    const matchSearch = h.aset.toLowerCase().includes(search.toLowerCase()) ||
      h.id.toLowerCase().includes(search.toLowerCase());
    const matchStat = statFilter === "Semua" || h.status === statFilter;
    const matchCat  = catFilter === "Semua" || h.kategori === catFilter;
    return matchSearch && matchStat && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalPinjam   = historyData.length;
  const totalSelesai  = historyData.filter(h=>h.status==="selesai").length;
  const totalAktif    = historyData.filter(h=>h.status==="aktif").length;
  const totalTerlambat= historyData.filter(h=>h.status==="terlambat").length;

  return (
    <div className="uh-wrapper">
      {/* HEADER */}
      <div className="uh-header">
        <div className="uh-header-left">
          <div className="uh-header-icon"><FaHistory /></div>
          <div>
            <h1 className="uh-title">Riwayat Peminjaman</h1>
            <p className="uh-subtitle">Semua transaksi peminjaman aset Anda</p>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="uh-summary">
        {[
          { label:"Total",     val:totalPinjam,    color:"#004494", bg:"#eff6ff" },
          { label:"Aktif",     val:totalAktif,     color:"#1d4ed8", bg:"#f0f9ff" },
          { label:"Selesai",   val:totalSelesai,   color:"#15803d", bg:"#f0fdf4" },
          { label:"Terlambat", val:totalTerlambat, color:"#b91c1c", bg:"#fef2f2" },
        ].map((s) => (
          <div key={s.label} className="uh-sum-card" style={{ borderLeftColor: s.color }}>
            <span className="uh-sum-val" style={{ color: s.color }}>{s.val}</span>
            <span className="uh-sum-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="uh-controls">
        <div className="uh-search">
          <FaSearch className="uh-search-icon" size={13}/>
          <input
            className="uh-search-input"
            placeholder="Cari nama aset atau nomor referensi..."
            value={search}
            onChange={(e)=>{ setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <button
          className={`uh-filter-btn ${showFilter?"uh-filter-btn--active":""}`}
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter size={12}/> Filter
          {(statFilter!=="Semua"||catFilter!=="Semua") && <span className="uh-filter-dot"/>}
        </button>
      </div>

      {/* FILTER PANEL */}
      {showFilter && (
        <div className="uh-filter-panel">
          <div className="uh-filter-group">
            <label>Status</label>
            <div className="uh-pills">
              {STATUSES.map(s=>(
                <button key={s}
                  className={`uh-pill ${statFilter===s?"uh-pill--active":""}`}
                  onClick={()=>{ setStatFilter(s); setPage(1); }}
                >
                  {s==="Semua"?"Semua":statusCfg[s].label}
                </button>
              ))}
            </div>
          </div>
          <div className="uh-filter-group">
            <label>Kategori Aset</label>
            <div className="uh-pills">
              {CATS.map(c=>(
                <button key={c}
                  className={`uh-pill ${catFilter===c?"uh-pill--active":""}`}
                  onClick={()=>{ setCatFilter(c); setPage(1); }}
                >{c}</button>
              ))}
            </div>
          </div>
          <button className="uh-reset-btn" onClick={()=>{ setStatFilter("Semua"); setCatFilter("Semua"); setPage(1); }}>
            <FaTimes size={11}/> Reset
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="uh-table-wrap">
        <div className="uh-table-info">
          Menampilkan <strong>{paginated.length}</strong> dari <strong>{filtered.length}</strong> data
        </div>
        <div className="uh-list">
          {paginated.length === 0 ? (
            <div className="uh-empty">
              <FaFileAlt size={30} style={{color:"#cbd5e1",marginBottom:12}}/>
              <p>Tidak ada riwayat yang cocok.</p>
            </div>
          ) : paginated.map((item) => {
            const sc = statusCfg[item.status];
            const ic = colorMap[item.kategori] || "#64748b";
            return (
              <div key={item.id} className="uh-item" onClick={()=>setDetail(item)}>
                <div className="uh-item-icon" style={{background:`${ic}15`,color:ic}}>
                  {iconMap[item.kategori]||<FaBox/>}
                </div>
                <div className="uh-item-main">
                  <div className="uh-item-top">
                    <span className="uh-item-nama">{item.aset}</span>
                    <span className="uh-item-status" style={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`}}>
                      {sc.icon} {sc.label}
                    </span>
                  </div>
                  <div className="uh-item-meta">
                    <span className="uh-ref">{item.id}</span>
                    <span className="uh-sep">·</span>
                    <FaCalendarAlt size={10} style={{color:"#94a3b8"}}/>
                    <span>{fmt(item.tglPinjam)} → {fmt(item.tglKembali)}</span>
                    <span className="uh-sep">·</span>
                    <FaMapMarkerAlt size={10} style={{color:"#94a3b8"}}/>
                    <span>{item.lokasi}</span>
                  </div>
                  <div className="uh-item-keperluan">{item.keperluan}</div>
                </div>
                <button className="uh-detail-btn" onClick={(e)=>{e.stopPropagation();setDetail(item);}}>
                  <FaEye size={12}/>
                </button>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="uh-pagination">
            <button className="uh-pg-btn" disabled={page===1} onClick={()=>setPage(page-1)}>
              <FaChevronLeft size={11}/>
            </button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
              <button key={p} className={`uh-pg-btn ${page===p?"uh-pg-btn--active":""}`} onClick={()=>setPage(p)}>{p}</button>
            ))}
            <button className="uh-pg-btn" disabled={page===totalPages} onClick={()=>setPage(page+1)}>
              <FaChevronRight size={11}/>
            </button>
          </div>
        )}
      </div>

      {/* MODAL DETAIL */}
      {detail && (
        <div className="uh-overlay" onClick={()=>setDetail(null)}>
          <div className="uh-modal" onClick={e=>e.stopPropagation()}>
            <div className="uh-modal-header">
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div className="uh-modal-icon" style={{background:`${colorMap[detail.kategori]}15`,color:colorMap[detail.kategori]}}>
                  {iconMap[detail.kategori]}
                </div>
                <div>
                  <h3 className="uh-modal-title">{detail.aset}</h3>
                  <span className="uh-modal-code">{detail.kode} · {detail.id}</span>
                </div>
              </div>
              <button className="uh-modal-close" onClick={()=>setDetail(null)}><FaTimes/></button>
            </div>
            <div className="uh-modal-body">
              {/* Status Banner */}
              {(() => {
                const sc = statusCfg[detail.status];
                return (
                  <div className="uh-status-banner" style={{background:sc.bg,border:`1.5px solid ${sc.border}`}}>
                    <span style={{color:sc.color,fontWeight:700,fontSize:".85rem",display:"flex",alignItems:"center",gap:7}}>
                      {sc.icon} Status: {sc.label}
                    </span>
                    {detail.status==="terlambat" && (
                      <span style={{color:sc.color,fontSize:".78rem"}}>{detail.catatan}</span>
                    )}
                  </div>
                );
              })()}

              <div className="uh-d-grid">
                {[
                  ["Tanggal Pinjam",    fmt(detail.tglPinjam)],
                  ["Batas Kembali",     fmt(detail.tglKembali)],
                  ["Dikembalikan",      fmt(detail.tglDikembalikan)],
                  ["Lokasi Penggunaan", detail.lokasi],
                  ["Kategori Aset",     detail.kategori],
                ].map(([lbl,val])=>(
                  <div key={lbl} className="uh-d-item">
                    <span className="uh-d-lbl">{lbl}</span>
                    <span className="uh-d-val">{val}</span>
                  </div>
                ))}
              </div>
              <div className="uh-d-item" style={{background:"#f8fafc",borderRadius:10,border:"1px solid #f1f5f9",padding:"12px 14px"}}>
                <span className="uh-d-lbl">Keperluan</span>
                <span className="uh-d-val" style={{marginTop:5,lineHeight:1.5}}>{detail.keperluan}</span>
              </div>
              {detail.catatan && detail.catatan!=="-" && (
                <div className="uh-d-item" style={{background:"#fffbeb",borderRadius:10,border:"1px solid #fde68a",padding:"12px 14px"}}>
                  <span className="uh-d-lbl" style={{color:"#92400e"}}>⚠ Catatan</span>
                  <span className="uh-d-val" style={{marginTop:5,color:"#78350f"}}>{detail.catatan}</span>
                </div>
              )}
            </div>
            <div className="uh-modal-footer">
              <button className="uh-close-btn" onClick={()=>setDetail(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .uh-wrapper { font-family:'Plus Jakarta Sans','Inter',sans-serif;display:flex;flex-direction:column;gap:18px;animation:uhIn .4s ease-out; }
        @keyframes uhIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

        .uh-header { display:flex;justify-content:space-between;align-items:center; }
        .uh-header-left { display:flex;align-items:center;gap:14px; }
        .uh-header-icon {
          width:48px;height:48px;border-radius:13px;
          background:linear-gradient(135deg,#dbeafe,#bfdbfe);
          color:#2563eb;display:flex;align-items:center;justify-content:center;font-size:1.1rem;
        }
        .uh-title { margin:0;font-size:1.5rem;font-weight:800;color:#0f172a;letter-spacing:-.4px; }
        .uh-subtitle { margin:4px 0 0;font-size:.82rem;color:#94a3b8; }

        .uh-summary { display:grid;grid-template-columns:repeat(4,1fr);gap:12px; }
        .uh-sum-card {
          background:white;border-radius:12px;padding:16px 18px;
          border-left:4px solid;border-top:1px solid #f1f5f9;
          border-right:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9;
          display:flex;flex-direction:column;gap:4px;
          box-shadow:0 2px 6px rgba(0,0,0,.04);
        }
        .uh-sum-val { font-size:1.6rem;font-weight:800;line-height:1; }
        .uh-sum-lbl { font-size:.72rem;font-weight:600;color:#94a3b8;text-transform:uppercase; }

        .uh-controls { display:flex;gap:10px; }
        .uh-search { position:relative;flex:1;display:flex;align-items:center; }
        .uh-search-icon { position:absolute;left:14px;color:#94a3b8; }
        .uh-search-input {
          width:100%;padding:12px 14px 12px 42px;border:1.5px solid #e2e8f0;border-radius:12px;
          font-size:.88rem;color:#334155;background:#f8fafc;outline:none;font-family:inherit;transition:all .2s;
        }
        .uh-search-input:focus { border-color:#00b5e2;background:white;box-shadow:0 0 0 4px rgba(0,181,226,.1); }
        .uh-filter-btn {
          display:flex;align-items:center;gap:7px;padding:11px 18px;
          border:1.5px solid #e2e8f0;border-radius:12px;background:white;color:#64748b;
          font-size:.85rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;position:relative;
        }
        .uh-filter-btn--active { border-color:#00b5e2;color:#00b5e2;background:#f0f9ff; }
        .uh-filter-dot {
          width:8px;height:8px;border-radius:50%;background:#ef4444;
          position:absolute;top:-3px;right:-3px;border:2px solid white;
        }

        .uh-filter-panel {
          background:white;border:1.5px solid #e2e8f0;border-radius:14px;
          padding:18px 20px;display:flex;flex-direction:column;gap:14px;
          box-shadow:0 4px 16px rgba(0,0,0,.06);animation:uhIn .2s ease-out;
        }
        .uh-filter-group { display:flex;flex-direction:column;gap:8px; }
        .uh-filter-group label { font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px; }
        .uh-pills { display:flex;gap:7px;flex-wrap:wrap; }
        .uh-pill {
          padding:6px 14px;border-radius:20px;border:1.5px solid #e2e8f0;
          background:white;color:#64748b;font-size:.78rem;font-weight:600;
          cursor:pointer;font-family:inherit;transition:all .2s;
        }
        .uh-pill--active { background:#004494;border-color:#004494;color:white; }
        .uh-reset-btn {
          display:inline-flex;align-items:center;gap:6px;
          background:#fef2f2;color:#dc2626;border:none;
          padding:7px 14px;border-radius:8px;font-size:.78rem;font-weight:700;
          cursor:pointer;font-family:inherit;width:fit-content;
        }

        .uh-table-wrap { background:white;border-radius:16px;border:1px solid #f1f5f9;box-shadow:0 2px 8px rgba(0,0,0,.04);overflow:hidden; }
        .uh-table-info { padding:12px 20px;font-size:.8rem;color:#94a3b8;border-bottom:1px solid #f8fafc; }
        .uh-table-info strong { color:#334155; }
        .uh-list { display:flex;flex-direction:column; }
        .uh-item {
          display:flex;align-items:center;gap:14px;
          padding:16px 20px;border-bottom:1px solid #f8fafc;
          cursor:pointer;transition:background .15s;
        }
        .uh-item:last-child { border-bottom:none; }
        .uh-item:hover { background:#f8fafc; }
        .uh-item-icon {
          width:44px;height:44px;border-radius:11px;
          display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;
        }
        .uh-item-main { flex:1;min-width:0;display:flex;flex-direction:column;gap:5px; }
        .uh-item-top { display:flex;align-items:center;justify-content:space-between;gap:10px; }
        .uh-item-nama { font-size:.9rem;font-weight:700;color:#0f172a; }
        .uh-item-status {
          padding:3px 10px;border-radius:20px;
          font-size:.68rem;font-weight:700;white-space:nowrap;
          display:flex;align-items:center;gap:5px;
        }
        .uh-item-meta {
          display:flex;align-items:center;gap:6px;font-size:.72rem;color:#94a3b8;flex-wrap:wrap;
        }
        .uh-ref {
          font-family:monospace;font-size:.68rem;font-weight:700;
          background:#f1f5f9;color:#64748b;padding:2px 7px;border-radius:5px;
        }
        .uh-sep { opacity:.35; }
        .uh-item-keperluan { font-size:.78rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
        .uh-detail-btn {
          width:34px;height:34px;border:1.5px solid #e2e8f0;border-radius:9px;
          background:white;color:#94a3b8;cursor:pointer;
          display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;
        }
        .uh-detail-btn:hover { border-color:#00b5e2;color:#00b5e2; }

        .uh-empty { display:flex;flex-direction:column;align-items:center;padding:50px;color:#94a3b8;font-size:.88rem;text-align:center; }

        .uh-pagination { display:flex;align-items:center;gap:5px;padding:14px 20px;border-top:1px solid #f8fafc; }
        .uh-pg-btn {
          min-width:33px;height:33px;border-radius:7px;border:1.5px solid #e2e8f0;
          background:white;color:#64748b;font-size:.82rem;font-weight:600;
          cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:inherit;transition:all .2s;
        }
        .uh-pg-btn:disabled { opacity:.35;cursor:not-allowed; }
        .uh-pg-btn:hover:not(:disabled) { border-color:#00b5e2;color:#00b5e2; }
        .uh-pg-btn--active { background:#004494;border-color:#004494;color:white; }

        /* Modal */
        .uh-overlay {
          position:fixed;inset:0;background:rgba(10,22,40,.6);
          display:flex;align-items:center;justify-content:center;z-index:2000;
          backdrop-filter:blur(6px);padding:20px;
        }
        .uh-modal {
          background:white;border-radius:20px;width:100%;max-width:500px;
          box-shadow:0 24px 60px rgba(0,0,0,.2);animation:uhIn .25s ease-out;overflow:hidden;
        }
        .uh-modal-header {
          padding:18px 22px;background:#f8fafc;border-bottom:1px solid #f1f5f9;
          display:flex;justify-content:space-between;align-items:center;
        }
        .uh-modal-icon { width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem; }
        .uh-modal-title { margin:0;font-size:.95rem;font-weight:800;color:#0f172a; }
        .uh-modal-code { font-family:monospace;font-size:.72rem;color:#94a3b8; }
        .uh-modal-close {
          width:30px;height:30px;border-radius:50%;border:none;
          background:#e2e8f0;color:#64748b;cursor:pointer;font-size:.9rem;
          display:flex;align-items:center;justify-content:center;transition:all .2s;
        }
        .uh-modal-close:hover { background:#334155;color:white; }
        .uh-modal-body { padding:20px 22px;display:flex;flex-direction:column;gap:11px; }
        .uh-status-banner { border-radius:10px;padding:12px 16px;display:flex;flex-direction:column;gap:4px; }
        .uh-d-grid { display:grid;grid-template-columns:1fr 1fr;gap:9px; }
        .uh-d-item { display:flex;flex-direction:column;gap:4px;padding:11px 13px;background:#f8fafc;border-radius:10px;border:1px solid #f1f5f9; }
        .uh-d-lbl { font-size:.68rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.3px; }
        .uh-d-val { font-size:.84rem;font-weight:700;color:#1e293b; }
        .uh-modal-footer { padding:14px 22px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end; }
        .uh-close-btn {
          padding:9px 20px;border:1.5px solid #e2e8f0;border-radius:9px;
          background:white;color:#64748b;font-size:.85rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;
        }
        .uh-close-btn:hover { background:#f1f5f9; }

        @media(max-width:768px){ .uh-summary{grid-template-columns:1fr 1fr} }
        @media(max-width:480px){ .uh-summary{grid-template-columns:1fr 1fr};.uh-item-meta{flex-wrap:wrap} }
      `}</style>
    </div>
  );
};

export default UserHistory;