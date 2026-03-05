// ============================================================
// ReturnModal.jsx
// ============================================================
import { useState } from "react";
import { categoryConf, fmt } from "./data";

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
    undo: (
      <>
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-3.99" />
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

export default function ReturnModal({ trx, asset, onClose, onConfirm }) {
  const [condition, setCondition] = useState("GOOD");
  const [notes, setNotes] = useState("");

  const cat = categoryConf[asset?.category] || categoryConf.OTHER;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <div className="modal-header">
          <h3 className="modal-title">Konfirmasi Pengembalian</h3>
          <button className="modal-close" onClick={onClose}>
            <Ico n="x" s={14} />
          </button>
        </div>
        <div className="modal-body">
          {/* Asset chip */}
          {asset && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                background: cat.bg,
                borderRadius: "var(--radius-md)",
                marginBottom: 18,
              }}
            >
              <div style={{ color: cat.color, display: "flex" }}>
                <Ico n={asset.category} s={22} />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "var(--gray-800)",
                  }}
                >
                  {asset.name}
                </p>
                <p style={{ fontSize: "12px", color: "var(--gray-500)" }}>
                  Dipinjam: {fmt(trx.date)} · Jatuh tempo:{" "}
                  {fmt(trx.return_date)}
                </p>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="form-group">
              <label className="form-label">
                Kondisi Aset Saat Dikembalikan{" "}
                <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                className="form-control"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="GOOD">Baik</option>
                <option value="MINOR_DAMAGE">Rusak Ringan</option>
                <option value="DAMAGED">Rusak Berat</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Catatan Pengembalian</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Catatan kondisi, kelengkapan, atau hal lain..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button className="btn btn-primary" onClick={() => onConfirm(trx.id)}>
            <Ico n="undo" s={14} />
            Konfirmasi Kembalikan
          </button>
        </div>
      </div>
    </div>
  );
}
