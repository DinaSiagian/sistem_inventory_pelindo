// ============================================================
// ReturnModal.jsx — Redesigned: premium overlay modal
// ============================================================
import { useState } from "react";
import { categoryConf, fmt } from "./data";
import "./ReturnModal.css";

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    x: (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
    laptop: (<><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>),
    server: (<><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /></>),
    monitor: (<><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>),
    network: (<><circle cx="12" cy="5" r="3" /><circle cx="19" cy="19" r="3" /><circle cx="5" cy="19" r="3" /><line x1="12" y1="8" x2="5.5" y2="16" /><line x1="12" y1="8" x2="18.5" y2="16" /></>),
    battery: (<><rect x="1" y="6" width="18" height="12" rx="2" /><line x1="23" y1="11" x2="23" y2="13" /></>),
    cube: (<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></>),
    undo: (<><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.99" /></>),
    calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>),
    tag: (<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>),
    clipboard: (<><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></>),
    shield: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>),
    alert: (<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>),
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

const CONDITION_OPTIONS = [
  {
    value: "GOOD",
    label: "Baik",
    desc: "Tidak ada kerusakan, kondisi normal",
    color: "#16a34a",
    bg: "#dcfce7",
    border: "#86efac",
    dot: "#22c55e",
  },
  {
    value: "MINOR_DAMAGE",
    label: "Rusak Ringan",
    desc: "Ada sedikit goresan atau kerusakan minor",
    color: "#d97706",
    bg: "#fef9c3",
    border: "#fde047",
    dot: "#f59e0b",
  },
  {
    value: "DAMAGED",
    label: "Rusak Berat",
    desc: "Kerusakan signifikan, perlu perbaikan",
    color: "#dc2626",
    bg: "#fee2e2",
    border: "#fca5a5",
    dot: "#ef4444",
  },
];

export default function ReturnModal({ trx, asset, onClose, onConfirm }) {
  const [condition, setCondition] = useState("GOOD");
  const [notes, setNotes] = useState("");
  const [notesFocused, setNotesFocused] = useState(false);

  const cat = categoryConf[asset?.category] || categoryConf.OTHER;
  const selected = CONDITION_OPTIONS.find((o) => o.value === condition);

  return (
    <div className="rm-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rm-box">

        {/* ── Top accent bar ── */}
        <div className="rm-accent-bar" />

        {/* ── Header ── */}
        <div className="rm-header">
          <div className="rm-header-left">
            <div className="rm-header-icon">
              <Ico n="undo" s={18} c="#2563eb" />
            </div>
            <div>
              <h3 className="rm-title">Konfirmasi Pengembalian</h3>
              <p className="rm-subtitle">Pastikan data sebelum mengkonfirmasi</p>
            </div>
          </div>
          <button className="rm-close" onClick={onClose}>
            <Ico n="x" s={15} c="#64748b" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="rm-body">

          {/* Asset Card */}
          {asset && (
            <div className="rm-asset-card" style={{ background: cat.bg }}>
              <div className="rm-asset-icon" style={{ color: cat.color, background: "rgba(255,255,255,0.7)" }}>
                <Ico n={asset.category} s={22} />
              </div>
              <div className="rm-asset-info">
                <p className="rm-asset-name">{asset.name}</p>
                <div className="rm-asset-dates">
                  <span className="rm-date-chip">
                    <Ico n="calendar" s={11} c="#64748b" />
                    Dipinjam: {fmt(trx.date)}
                  </span>
                  <span className="rm-date-sep">·</span>
                  <span className="rm-date-chip">
                    <Ico n="calendar" s={11} c="#64748b" />
                    Jatuh tempo: {fmt(trx.return_date)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="rm-divider">
            <span>Detail Pengembalian</span>
          </div>

          {/* Kondisi — card picker */}
          <div className="rm-field">
            <label className="rm-label">
              <Ico n="shield" s={13} c="#64748b" />
              Kondisi Aset Saat Dikembalikan
              <span className="rm-req">*</span>
            </label>
            <div className="rm-condition-grid">
              {CONDITION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`rm-condition-card ${condition === opt.value ? "rm-condition-card--active" : ""}`}
                  style={condition === opt.value ? {
                    background: opt.bg,
                    borderColor: opt.border,
                    color: opt.color,
                  } : {}}
                  onClick={() => setCondition(opt.value)}
                >
                  <span
                    className="rm-condition-dot"
                    style={{ background: opt.dot }}
                  />
                  <span className="rm-condition-label">{opt.label}</span>
                  {condition === opt.value && (
                    <span className="rm-condition-check">✓</span>
                  )}
                </button>
              ))}
            </div>
            {selected && (
              <p className="rm-condition-desc" style={{ color: selected.color }}>
                {selected.desc}
              </p>
            )}
          </div>

          {/* Catatan */}
          <div className="rm-field">
            <label className="rm-label">
              <Ico n="clipboard" s={13} c="#64748b" />
              Catatan Pengembalian
              <span className="rm-opt">Opsional</span>
            </label>
            <div className={`rm-textarea-wrap ${notesFocused ? "rm-textarea-wrap--focus" : ""}`}>
              <textarea
                className="rm-textarea"
                rows={3}
                placeholder="Catatan kondisi, kelengkapan, aksesori, atau hal lain..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onFocus={() => setNotesFocused(true)}
                onBlur={() => setNotesFocused(false)}
              />
              <div className="rm-textarea-counter">
                {notes.length}/300
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="rm-footer">
          <button className="rm-btn-cancel" onClick={onClose}>
            Batal
          </button>
          <button
            className="rm-btn-confirm"
            onClick={() => onConfirm(trx.id, condition, notes)}
          >
            <Ico n="undo" s={15} c="#fff" />
            Konfirmasi Kembalikan
          </button>
        </div>
      </div>
    </div>
  );
}