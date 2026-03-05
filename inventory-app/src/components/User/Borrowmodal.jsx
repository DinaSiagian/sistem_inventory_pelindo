// ============================================================
// BorrowModal.jsx — with asset photo + right-aligned footer
// ============================================================
import { useState } from "react";
import { currentUser, categoryConf, fmtIDR } from "./data";
import "./BorrowModal.css";

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
  const pool = ASSET_PHOTOS[asset.category] || ASSET_PHOTOS.OTHER;
  return pool[parseInt(asset.id.replace(/\D/g, "") || "0", 10) % pool.length];
}

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
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
    borrow: (
      <>
        <path d="M16 3h5v5" />
        <path d="M4 20L21 3" />
      </>
    ),
    alert: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
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

export default function BorrowModal({ asset, onClose, onConfirm }) {
  const [purpose, setPurpose] = useState("");
  const [retDate, setRetDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const cat = categoryConf[asset.category] || categoryConf.OTHER;
  const today = new Date().toISOString().split("T")[0];
  const photo = getPhoto(asset);
  const [imgErr, setImgErr] = useState(false);

  const validate = () => {
    const e = {};
    if (!purpose.trim()) e.purpose = "Tujuan peminjaman wajib diisi";
    if (!retDate) e.retDate = "Tanggal kembali wajib diisi";
    else if (retDate <= today)
      e.retDate = "Tanggal kembali harus setelah hari ini";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
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
      status: "ACTIVE",
      notes: notes.trim(),
      return_notes: null,
    });
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        {/* ── Header ── */}
        <div className="modal-header">
          <h3 className="modal-title">Ajukan Peminjaman</h3>
          <button className="modal-close" onClick={onClose}>
            <Ico n="x" s={14} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="modal-body">
          {/* Asset hero card with photo */}
          <div
            className="borrow-asset-hero"
            style={{
              background: `linear-gradient(135deg, ${cat.bg} 0%, #f0f9ff 100%)`,
            }}
          >
            {/* Photo thumbnail */}
            <div className="borrow-asset-photo">
              {!imgErr ? (
                <img
                  src={photo}
                  alt={asset.name}
                  onError={() => setImgErr(true)}
                />
              ) : (
                <div
                  className="borrow-asset-photo-fallback"
                  style={{ color: cat.color }}
                >
                  <Ico n={asset.category} s={28} />
                </div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="borrow-asset-name">{asset.name}</p>
              <div className="borrow-asset-meta">
                <span>{asset.brand}</span>
                <span style={{ color: "#cbd5e1" }}>·</span>
                <span>{asset.serial}</span>
                <span style={{ color: "#cbd5e1" }}>·</span>
                <span className="borrow-asset-price">
                  {fmtIDR(asset.price)}
                </span>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="borrow-fields">
            {/* Tujuan */}
            <div className="borrow-field">
              <label className="borrow-label">
                <Ico n="tag" s={13} c="#64748b" />
                Tujuan Peminjaman
                <span className="borrow-label-req">*</span>
              </label>
              <textarea
                className={`borrow-textarea${errors.purpose ? " error" : ""}`}
                rows={3}
                placeholder="Jelaskan keperluan peminjaman Anda..."
                value={purpose}
                onChange={(e) => {
                  setPurpose(e.target.value);
                  setErrors((p) => ({ ...p, purpose: "" }));
                }}
              />
              {errors.purpose && (
                <p className="borrow-error">
                  <Ico n="alert" s={12} c="#ef4444" /> {errors.purpose}
                </p>
              )}
            </div>

            {/* Tanggal kembali */}
            <div className="borrow-field">
              <label className="borrow-label">
                <Ico n="calendar" s={13} c="#64748b" />
                Tanggal Pengembalian
                <span className="borrow-label-req">*</span>
              </label>
              <input
                type="date"
                className={`borrow-input${errors.retDate ? " error" : ""}`}
                min={today}
                value={retDate}
                onChange={(e) => {
                  setRetDate(e.target.value);
                  setErrors((p) => ({ ...p, retDate: "" }));
                }}
              />
              {errors.retDate ? (
                <p className="borrow-error">
                  <Ico n="alert" s={12} c="#ef4444" /> {errors.retDate}
                </p>
              ) : (
                retDate && (
                  <p className="borrow-date-hint">
                    <Ico n="calendar" s={12} c="#22c55e" />
                    Berakhir pada{" "}
                    {new Date(retDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )
              )}
            </div>

            {/* Catatan opsional */}
            <div className="borrow-field">
              <label className="borrow-label">
                Catatan
                <span className="borrow-label-opt">Opsional</span>
              </label>
              <textarea
                className="borrow-textarea"
                rows={2}
                placeholder="Catatan tambahan, aksesori yang dibawa, dll..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Footer — right-aligned ── */}
        <div className="modal-footer" style={{ justifyContent: "flex-end" }}>
          <button className="borrow-btn-cancel" onClick={onClose}>
            Batal
          </button>
          <button className="borrow-btn-submit" onClick={handleSubmit}>
            <Ico n="borrow" s={15} c="#fff" />
            Konfirmasi Pinjam
          </button>
        </div>
      </div>
    </div>
  );
}
