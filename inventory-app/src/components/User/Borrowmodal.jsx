// ============================================================
// BorrowModal.jsx — Bold visual format + lokasi combobox (pilih/ketik sendiri)
// ============================================================
import { useState, useRef, useEffect } from "react";
import { currentUser, categoryConf, fmtIDR } from "./data";

const ASSET_PHOTOS = {
  LAPTOP: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=85",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=85",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=85",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=85",
  ],
  SERVER: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=85",
    "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=85",
  ],
  DESKTOP: [
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&q=85",
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=85",
  ],
  NETWORK: [
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=85",
    "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=85",
  ],
  UPS: ["https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&q=85"],
  OTHER: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=85"],
};

function getPhoto(asset) {
  const pool = ASSET_PHOTOS[asset?.category] || ASSET_PHOTOS.OTHER;
  return pool[parseInt((asset?.id || "0").replace(/\D/g, ""), 10) % pool.length];
}

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    x:        (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
    laptop:   (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>),
    server:   (<><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></>),
    monitor:  (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>),
    network:  (<><circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="8" x2="5.5" y2="16"/><line x1="12" y1="8" x2="18.5" y2="16"/></>),
    battery:  (<><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="11" x2="23" y2="13"/></>),
    cube:     (<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>),
    tag:      (<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>),
    calendar: (<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>),
    alert:    (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>),
    check:    (<><polyline points="20 6 9 17 4 12"/></>),
    send:     (<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>),
    hash:     (<><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></>),
    location: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
    chevron:  (<><polyline points="6 9 12 15 18 9"/></>),
    pencil:   (<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>),
  };
  const catIcons = { LAPTOP:"laptop", SERVER:"server", DESKTOP:"monitor", NETWORK:"network", UPS:"battery", OTHER:"cube" };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke={c || "currentColor"} strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round">
      {paths[catIcons[n] || n]}
    </svg>
  );
};

const LOKASI_OPTIONS = [
  "Ruang IT – Lantai 3",
  "Ruang HR – Lantai 2",
  "Ruang Desain – Lantai 3",
  "Ruang Direksi – Lantai 4",
  "Ruang Rapat A – Lantai 1",
  "Ruang Rapat B – Lantai 2",
  "Gudang – Lantai 1",
  "Kantor Cabang Medan",
  "Kantor Cabang Surabaya",
  "Kantor Cabang Makassar",
];

// ── Combobox Lokasi ──
function LokasiCombobox({ value, onChange, hasError }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState(value || "");
  const inputRef  = useRef(null);
  const wrapRef   = useRef(null);

  // Sync query kalau value di-reset dari luar
  useEffect(() => { if (!value) setQuery(""); }, [value]);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = query.trim()
    ? LOKASI_OPTIONS.filter(o => o.toLowerCase().includes(query.toLowerCase()))
    : LOKASI_OPTIONS;

  // Apakah query sudah persis match salah satu opsi
  const isExactMatch = LOKASI_OPTIONS.some(o => o.toLowerCase() === query.toLowerCase());
  // Tampilkan opsi "Gunakan lokasi ini" kalau query tidak kosong & tidak exact match
  const showCustom = query.trim() && !isExactMatch;

  const select = (val) => {
    setQuery(val);
    onChange(val);
    setOpen(false);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    onChange(e.target.value);   // langsung update value parent juga
    setOpen(true);
  };

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      {/* Input */}
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
          pointerEvents: "none", color: "#94a3b8",
        }}>
          <Ico n="location" s={15} />
        </span>
        <input
          ref={inputRef}
          className={`bm-input${hasError ? " err" : ""}`}
          style={{ paddingLeft: 38, paddingRight: 38 }}
          type="text"
          placeholder="Cari atau ketik lokasi tujuan..."
          value={query}
          onFocus={() => setOpen(true)}
          onChange={handleInput}
          autoComplete="off"
        />
        {/* Chevron toggle */}
        <button
          type="button"
          onClick={() => { setOpen(o => !o); inputRef.current?.focus(); }}
          style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            border: "none", background: "transparent", cursor: "pointer",
            color: "#94a3b8", padding: 4, display: "flex", alignItems: "center",
            transition: "transform 0.15s",
            rotate: open ? "180deg" : "0deg",
          }}
        >
          <Ico n="chevron" s={15} />
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          zIndex: 50, overflow: "hidden",
          animation: "bm-fadein 0.15s ease",
          maxHeight: 240, overflowY: "auto",
        }}>

          {/* Opsi dari daftar */}
          {filtered.length > 0 && (
            <div style={{ padding: "6px 6px 4px" }}>
              <p style={{
                fontSize: 10.5, fontWeight: 700, color: "#94a3b8",
                textTransform: "uppercase", letterSpacing: "0.5px",
                padding: "4px 8px 6px", margin: 0,
              }}>Pilihan Tersedia</p>
              {filtered.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => select(opt)}
                  style={{
                    width: "100%", textAlign: "left", padding: "9px 12px",
                    border: "none", borderRadius: 9, background: "transparent",
                    cursor: "pointer", fontSize: 13.5, color: "#0f172a",
                    fontWeight: value === opt ? 700 : 500,
                    display: "flex", alignItems: "center", gap: 9,
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f0f9ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <Ico n="location" s={13} c={value === opt ? "#2563eb" : "#94a3b8"} />
                  <span style={{ flex: 1 }}>{opt}</span>
                  {value === opt && <Ico n="check" s={13} c="#2563eb" />}
                </button>
              ))}
            </div>
          )}

          {/* Divider kalau ada keduanya */}
          {filtered.length > 0 && showCustom && (
            <div style={{ height: 1, background: "#f1f5f9", margin: "0 10px" }} />
          )}

          {/* Opsi ketik sendiri */}
          {showCustom && (
            <div style={{ padding: "4px 6px 6px" }}>
              <p style={{
                fontSize: 10.5, fontWeight: 700, color: "#94a3b8",
                textTransform: "uppercase", letterSpacing: "0.5px",
                padding: "6px 8px 6px", margin: 0,
              }}>Lokasi Kustom</p>
              <button
                type="button"
                onClick={() => select(query)}
                style={{
                  width: "100%", textAlign: "left", padding: "9px 12px",
                  border: "none", borderRadius: 9,
                  background: "#f0fdf4",
                  cursor: "pointer", fontSize: 13.5, color: "#16a34a",
                  fontWeight: 700,
                  display: "flex", alignItems: "center", gap: 9,
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#dcfce7"}
                onMouseLeave={e => e.currentTarget.style.background = "#f0fdf4"}
              >
                <Ico n="pencil" s={13} c="#16a34a" />
                Gunakan "<strong>{query}</strong>"
              </button>
            </div>
          )}

          {/* Kosong */}
          {filtered.length === 0 && !showCustom && (
            <div style={{ padding: "20px 16px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
              Tidak ada hasil
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Modal ──
export default function BorrowModal({ asset, onClose, onConfirm }) {
  const [purpose,   setPurpose]   = useState("");
  const [lokasi,    setLokasi]    = useState("");
  const [retDate,   setRetDate]   = useState("");
  const [notes,     setNotes]     = useState("");
  const [errors,    setErrors]    = useState({});
  const [imgErr,    setImgErr]    = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cat   = categoryConf[asset.category] || categoryConf.OTHER;
  const today = new Date().toISOString().split("T")[0];
  const photo = getPhoto(asset);

  const durationDays = retDate
    ? Math.ceil((new Date(retDate) - new Date(today)) / 86400000)
    : null;

  const validate = () => {
    const e = {};
    if (!purpose.trim()) e.purpose = "Tujuan peminjaman wajib diisi";
    if (!lokasi.trim())  e.lokasi  = "Lokasi tujuan wajib diisi";
    if (!retDate)        e.retDate = "Tanggal kembali wajib diisi";
    else if (retDate <= today) e.retDate = "Tanggal kembali harus setelah hari ini";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
    setTimeout(() => {
      onConfirm({
        id: "trx" + Date.now(),
        asset_id: asset.id,
        user_id: currentUser.id,
        user_name: currentUser.name,
        type: "BORROW",
        date: today,
        return_date: retDate,
        returned_date: null,
        purpose: purpose.trim(),
        lokasi_tujuan: lokasi.trim(),
        status: "ACTIVE",
        notes: notes.trim(),
        return_notes: null,
      });
    }, 900);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        .bm-backdrop {
          position: fixed; inset: 0; z-index: 1100;
          background: rgba(8,15,30,0.7); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: bm-bg-in 0.2s ease;
        }
        @keyframes bm-bg-in { from{opacity:0} to{opacity:1} }

        .bm-shell {
          font-family: 'Sora', system-ui, sans-serif;
          width: 100%; max-width: 580px; border-radius: 24px; overflow: hidden;
          box-shadow: 0 32px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06);
          animation: bm-modal-in 0.28s cubic-bezier(.34,1.4,.64,1);
          display: flex; flex-direction: column; background: #fff; max-height: 92vh;
        }
        @keyframes bm-modal-in {
          from{opacity:0;transform:scale(0.93) translateY(20px)}
          to{opacity:1;transform:scale(1) translateY(0)}
        }

        .bm-hero { position: relative; height: 200px; overflow: hidden; flex-shrink: 0; }
        .bm-hero-img { width:100%; height:100%; object-fit:cover; transition:transform 6s ease; }
        .bm-hero-img:hover { transform:scale(1.04); }
        .bm-hero-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to bottom,rgba(8,15,30,0.15) 0%,rgba(8,15,30,0.72) 100%);
        }
        .bm-hero-fallback { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .bm-close {
          position:absolute; top:14px; right:14px; width:34px; height:34px; border-radius:50%;
          border:none; background:rgba(255,255,255,0.18); backdrop-filter:blur(8px);
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          color:#fff; transition:background 0.15s; z-index:2;
        }
        .bm-close:hover { background:rgba(255,255,255,0.32); }
        .bm-cat-chip {
          position:absolute; top:14px; left:14px; display:flex; align-items:center; gap:6px;
          padding:5px 12px; border-radius:99px; font-size:11.5px; font-weight:700;
          letter-spacing:0.3px; backdrop-filter:blur(10px); z-index:2;
          border:1px solid rgba(255,255,255,0.25);
        }
        .bm-hero-info { position:absolute; bottom:0; left:0; right:0; padding:16px 22px 18px; z-index:2; }
        .bm-hero-name {
          font-size:20px; font-weight:800; color:#fff; margin:0 0 6px;
          text-shadow:0 1px 8px rgba(0,0,0,0.4); line-height:1.2;
        }
        .bm-hero-meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .bm-hero-chip {
          display:flex; align-items:center; gap:4px; font-size:11.5px; font-weight:600;
          background:rgba(255,255,255,0.15); backdrop-filter:blur(6px);
          border:1px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.9);
          border-radius:6px; padding:3px 8px;
        }
        .bm-hero-price {
          font-size:13px; font-weight:800; color:#fff;
          background:rgba(59,130,246,0.75); backdrop-filter:blur(6px);
          border-radius:6px; padding:3px 10px; letter-spacing:-0.3px;
        }

        .bm-body { padding:24px 24px 0; flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:18px; }

        .bm-borrower {
          display:flex; align-items:center; gap:10px;
          background:#f8fafc; border-radius:12px; padding:11px 14px; border:1px solid #e2e8f0;
        }
        .bm-borrower-avatar {
          width:34px; height:34px; border-radius:50%;
          background:linear-gradient(135deg,#3b82f6,#2563eb);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; font-size:14px; font-weight:800; color:#fff;
        }
        .bm-borrower-label { font-size:11px; color:#94a3b8; font-weight:600; margin-bottom:1px; }
        .bm-borrower-name  { font-size:13.5px; color:#0f172a; font-weight:700; }

        .bm-duration-bar {
          display:flex; align-items:center; gap:12px;
          background:linear-gradient(135deg,#eff6ff,#f0fdf4);
          border:1.5px solid #bfdbfe; border-radius:12px; padding:12px 16px; transition:all 0.2s;
        }
        .bm-duration-bar.hidden { opacity:0; transform:translateY(-4px); pointer-events:none; }
        .bm-duration-icon {
          width:38px; height:38px; border-radius:10px; background:#2563eb;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .bm-duration-days  { font-size:22px; font-weight:800; color:#1d4ed8; line-height:1; }
        .bm-duration-label { font-size:11.5px; color:#3b82f6; font-weight:600; margin-top:1px; }
        .bm-duration-date  { font-size:12.5px; color:#475569; font-weight:600; }

        .bm-field { display:flex; flex-direction:column; gap:7px; }
        .bm-label {
          font-size:12px; font-weight:700; color:#475569;
          display:flex; align-items:center; gap:6px;
          text-transform:uppercase; letter-spacing:0.5px;
        }
        .bm-req { color:#ef4444; font-size:13px; }
        .bm-opt {
          font-size:10.5px; font-weight:600; color:#94a3b8;
          background:#f1f5f9; border-radius:4px; padding:1px 6px;
          text-transform:none; letter-spacing:0;
        }
        .bm-textarea, .bm-input {
          width:100%; padding:11px 14px; border:1.5px solid #e2e8f0; border-radius:12px;
          font-size:14px; color:#0f172a; outline:none; font-family:inherit;
          background:#f8fafc; box-sizing:border-box; resize:none;
          transition:border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }
        .bm-textarea:focus, .bm-input:focus {
          border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.12); background:#fff;
        }
        .bm-textarea.err, .bm-input.err { border-color:#fca5a5; background:#fff5f5; }
        .bm-textarea::placeholder, .bm-input::placeholder { color:#94a3b8; }
        .bm-error {
          display:flex; align-items:center; gap:5px;
          font-size:12px; color:#ef4444; font-weight:600; margin:0;
        }
        .bm-lokasi-preview {
          display:inline-flex; align-items:center; gap:6px;
          background:#f0fdf4; border:1px solid #bbf7d0; color:#16a34a;
          border-radius:8px; padding:5px 10px; font-size:12px; font-weight:700;
          animation:bm-fadein 0.18s ease;
        }
        @keyframes bm-fadein { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }

        .bm-footer {
          display:flex; align-items:center; justify-content:flex-end;
          gap:10px; padding:20px 24px 24px;
          border-top:1px solid #f1f5f9; margin-top:4px; flex-shrink:0;
        }
        .bm-btn-cancel {
          padding:10px 20px; border-radius:10px; border:1.5px solid #e2e8f0; background:#fff;
          font-size:13.5px; font-weight:700; color:#64748b; cursor:pointer;
          font-family:inherit; transition:all 0.15s;
        }
        .bm-btn-cancel:hover { background:#f8fafc; border-color:#cbd5e1; color:#334155; }
        .bm-btn-submit {
          display:flex; align-items:center; gap:8px; padding:11px 24px;
          border-radius:10px; border:none;
          background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);
          font-size:14px; font-weight:800; color:#fff; cursor:pointer;
          font-family:inherit; box-shadow:0 4px 16px rgba(37,99,235,0.35);
          transition:all 0.18s; position:relative; overflow:hidden;
        }
        .bm-btn-submit::after {
          content:""; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.12),transparent);
        }
        .bm-btn-submit:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(37,99,235,0.45); }
        .bm-btn-submit:active { transform:translateY(0); }
        .bm-btn-submit:disabled { opacity:0.65; cursor:not-allowed; transform:none; }

        .bm-success {
          position:absolute; inset:0; z-index:10; background:rgba(255,255,255,0.96);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:12px; animation:bm-success-in 0.3s ease; border-radius:24px;
        }
        @keyframes bm-success-in { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        .bm-success-ring {
          width:72px; height:72px; border-radius:50%;
          background:linear-gradient(135deg,#22c55e,#16a34a);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 8px 32px rgba(34,197,94,0.4);
          animation:bm-ring-pop 0.4s cubic-bezier(.34,1.6,.64,1) 0.1s both;
        }
        @keyframes bm-ring-pop { from{transform:scale(0)} to{transform:scale(1)} }
        .bm-success-title { font-size:18px; font-weight:800; color:#0f172a; margin:0; }
        .bm-success-sub   { font-size:13px; color:#64748b; margin:0; }
        .bm-success-lokasi {
          font-size:12px; color:#475569; margin:0; background:#f1f5f9;
          border-radius:8px; padding:6px 14px; display:flex; align-items:center; gap:6px;
        }
      `}</style>

      <div className="bm-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="bm-shell" style={{ position: "relative" }}>

          {/* ── Success overlay ── */}
          {submitted && (
            <div className="bm-success">
              <div className="bm-success-ring">
                <Ico n="check" s={32} c="#fff" />
              </div>
              <p className="bm-success-title">Peminjaman Diajukan!</p>
              <p className="bm-success-sub">Menunggu konfirmasi admin…</p>
              {lokasi && (
                <p className="bm-success-lokasi">
                  <Ico n="location" s={12} c="#64748b" /> {lokasi}
                </p>
              )}
            </div>
          )}

          {/* ── Hero ── */}
          <div className="bm-hero">
            {!imgErr ? (
              <img className="bm-hero-img" src={photo} alt={asset.name} onError={() => setImgErr(true)} />
            ) : (
              <div className="bm-hero-fallback" style={{ background: cat.bg }}>
                <Ico n={asset.category} s={64} c={cat.color} />
              </div>
            )}
            <div className="bm-hero-overlay" />
            <button className="bm-close" onClick={onClose}>
              <Ico n="x" s={14} c="#fff" />
            </button>
            <div className="bm-cat-chip" style={{ background: cat.bg + "cc", color: cat.color }}>
              <Ico n={asset.category} s={12} c={cat.color} />
              {cat.label || asset.category}
            </div>
            <div className="bm-hero-info">
              <p className="bm-hero-name">{asset.name}</p>
              <div className="bm-hero-meta">
                <span className="bm-hero-chip">
                  <Ico n="hash" s={11} c="rgba(255,255,255,0.8)" />
                  {asset.serial}
                </span>
                <span className="bm-hero-chip">{asset.brand}</span>
                <span className="bm-hero-price">{fmtIDR(asset.price)}</span>
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="bm-body">

            {/* Borrower strip */}
            <div className="bm-borrower">
              <div className="bm-borrower-avatar">
                {(currentUser.name || "U").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="bm-borrower-label">Peminjam</p>
                <p className="bm-borrower-name">{currentUser.name}</p>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <p className="bm-borrower-label">Tanggal Pengajuan</p>
                <p className="bm-borrower-name" style={{ fontSize: "12.5px" }}>
                  {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* Duration bar */}
            <div className={`bm-duration-bar ${!durationDays ? "hidden" : ""}`}>
              <div className="bm-duration-icon">
                <Ico n="calendar" s={18} c="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span className="bm-duration-days">{durationDays || 0}</span>
                  <span className="bm-duration-label">hari peminjaman</span>
                </div>
                {retDate && (
                  <p className="bm-duration-date">
                    Kembali paling lambat{" "}
                    {new Date(retDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </p>
                )}
              </div>
            </div>

            {/* Field: Tujuan */}
            <div className="bm-field">
              <label className="bm-label">
                <Ico n="tag" s={12} c="#64748b" />
                Tujuan Peminjaman
                <span className="bm-req">*</span>
              </label>
              <textarea
                className={`bm-textarea${errors.purpose ? " err" : ""}`}
                rows={3}
                placeholder="Jelaskan keperluan peminjaman Anda..."
                value={purpose}
                onChange={e => { setPurpose(e.target.value); setErrors(p => ({ ...p, purpose: "" })); }}
              />
              {errors.purpose && (
                <p className="bm-error"><Ico n="alert" s={12} c="#ef4444" /> {errors.purpose}</p>
              )}
            </div>

            {/* Field: Lokasi — Combobox */}
            <div className="bm-field">
              <label className="bm-label">
                <Ico n="location" s={12} c="#64748b" />
                Lokasi Tujuan Penggunaan
                <span className="bm-req">*</span>
              </label>
              <LokasiCombobox
                value={lokasi}
                onChange={val => { setLokasi(val); setErrors(p => ({ ...p, lokasi: "" })); }}
                hasError={!!errors.lokasi}
              />
              {errors.lokasi ? (
                <p className="bm-error"><Ico n="alert" s={12} c="#ef4444" /> {errors.lokasi}</p>
              ) : lokasi ? (
                <span className="bm-lokasi-preview">
                  <Ico n="location" s={12} c="#16a34a" /> {lokasi}
                </span>
              ) : null}
            </div>

            {/* Field: Tanggal kembali */}
            <div className="bm-field">
              <label className="bm-label">
                <Ico n="calendar" s={12} c="#64748b" />
                Tanggal Pengembalian
                <span className="bm-req">*</span>
              </label>
              <input
                type="date"
                className={`bm-input${errors.retDate ? " err" : ""}`}
                min={today}
                value={retDate}
                onChange={e => { setRetDate(e.target.value); setErrors(p => ({ ...p, retDate: "" })); }}
              />
              {errors.retDate && (
                <p className="bm-error"><Ico n="alert" s={12} c="#ef4444" /> {errors.retDate}</p>
              )}
            </div>

            {/* Field: Catatan */}
            <div className="bm-field">
              <label className="bm-label">
                Catatan
                <span className="bm-opt">Opsional</span>
              </label>
              <textarea
                className="bm-textarea"
                rows={2}
                placeholder="Aksesori yang dibawa, kondisi khusus, dll..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="bm-footer">
            <button className="bm-btn-cancel" onClick={onClose}>Batal</button>
            <button className="bm-btn-submit" onClick={handleSubmit} disabled={submitted}>
              <Ico n="send" s={15} c="#fff" />
              Konfirmasi Pinjam
            </button>
          </div>

        </div>
      </div>
    </>
  );
}