import React, { useState, useMemo, useEffect } from "react";
import {
  Save,
  X,
  Plus,
  Trash2,
  FileText,
  CheckCircle,
  ArrowLeft,
  Package,
  Search,
  ChevronDown,
  AlertTriangle,
  Database,
  Layers,
  ChevronRight,
  Edit,
  Clock,
  Eye,
  History,
  Calendar,
  Pencil,
} from "lucide-react";

// ════════════════════════════════════════════════════════════════
// UTILS
// ════════════════════════════════════════════════════════════════
const fmt = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
const newId = () =>
  `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const uid = () => `ID-${Date.now().toString().slice(-6)}`;

function pctColor(p) {
  if (p >= 100) return "#ef4444";
  if (p >= 80) return "#f59e0b";
  if (p >= 50) return "#3b82f6";
  return "#22c55e";
}
function pctMeta(p) {
  if (p >= 100)
    return {
      label: "Over Budget",
      bg: "#fef2f2",
      fg: "#dc2626",
      border: "#fecaca",
    };
  if (p >= 80)
    return {
      label: "Near Limit",
      bg: "#fffbeb",
      fg: "#d97706",
      border: "#fde68a",
    };
  if (p >= 50)
    return {
      label: "On Track",
      bg: "#eff6ff",
      fg: "#2563eb",
      border: "#bfdbfe",
    };
  return { label: "Healthy", bg: "#f0fdf4", fg: "#16a34a", border: "#bbf7d0" };
}

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const MASTER_LIST_INIT = [
  { kd: "5030905000", nm: "Beban Pemeliharaan Software", tipe: "OPEX" },
  { kd: "5021300000", nm: "Beban Jaringan dan Koneksi Data", tipe: "OPEX" },
  { kd: "5021200000", nm: "Beban Perlengkapan Kantor", tipe: "OPEX" },
  { kd: "5081500000", nm: "Beban Jasa Konsultan", tipe: "OPEX" },
  {
    kd: "5060700000",
    nm: "Beban Sumber Daya Pihak Ketiga Peralatan",
    tipe: "OPEX",
  },
  { kd: "5900100000", nm: "Beban Investasi", tipe: "CAPEX" },
];

const INIT_OPEX_MASTERS = [
  {
    id: "OPX-M-1",
    kd: "5030905000",
    nama: "Beban Pemeliharaan Software",
    thn_anggaran: 2026,
    nilai_anggaran: 350000000,
    realisasi_tahunan: [
      {
        id: uid(),
        thn: 2026,
        realisasi_murni: 900000000,
        realisasi_bymhd: 100000000,
        history: [
          {
            id: uid(),
            tgl: "2026-01-01",
            tipe: "initial",
            nilai: 900000000,
            is_initial: true,
            keterangan: "Input awal murni",
          },
          {
            id: uid(),
            tgl: "2026-01-02",
            tipe: "bymhd",
            nilai: 100000000,
            is_initial: false,
            keterangan: "Input awal BYMHD",
          },
        ],
      },
    ],
  },
  {
    id: "OPX-M-2",
    kd: "5021300000",
    nama: "Beban Jaringan dan Koneksi Data",
    thn_anggaran: 2026,
    nilai_anggaran: 288000000,
    realisasi_tahunan: [
      {
        id: uid(),
        thn: 2026,
        realisasi_murni: 240000000,
        realisasi_bymhd: 0,
        history: [
          {
            id: uid(),
            tgl: "2026-01-05",
            tipe: "initial",
            nilai: 240000000,
            is_initial: true,
            keterangan: "Input awal murni",
          },
        ],
      },
    ],
  },
  {
    id: "OPX-M-3",
    kd: "5021200000",
    nama: "Beban Perlengkapan Kantor",
    thn_anggaran: 2026,
    nilai_anggaran: 120000000,
    realisasi_tahunan: [],
  },
  {
    id: "OPX-M-4",
    kd: "5081500000",
    nama: "Beban Jasa Konsultan",
    thn_anggaran: 2026,
    nilai_anggaran: 800000000,
    realisasi_tahunan: [
      {
        id: uid(),
        thn: 2026,
        realisasi_murni: 150000000,
        realisasi_bymhd: 0,
        history: [
          {
            id: uid(),
            tgl: "2026-03-01",
            tipe: "initial",
            nilai: 150000000,
            is_initial: true,
            keterangan: "Konsultan IT Masterplan",
          },
        ],
      },
    ],
  },
  {
    id: "OPX-M-5",
    kd: "5060700000",
    nama: "Beban Sumber Daya Pihak Ketiga Peralatan",
    thn_anggaran: 2026,
    nilai_anggaran: 900000000,
    realisasi_tahunan: [],
  },
  {
    id: "OPX-M-6",
    kd: "5030906000",
    nama: "Beban Pemeliharaan Hardware",
    thn_anggaran: 2026,
    nilai_anggaran: 450000000,
    realisasi_tahunan: [
      {
        id: uid(),
        thn: 2026,
        realisasi_murni: 25000000,
        realisasi_bymhd: 0,
        history: [
          {
            id: uid(),
            tgl: "2026-02-20",
            tipe: "initial",
            nilai: 25000000,
            is_initial: true,
            keterangan: "Maintenance Server Dell R750",
          },
        ],
      },
    ],
  },
  {
    id: "OPX-M-7",
    kd: "5021400000",
    nama: "Beban Lisensi dan Subskripsi",
    thn_anggaran: 2026,
    nilai_anggaran: 300000000,
    realisasi_tahunan: [],
  },
];

const INIT_CAPEX_FORM = [
  {
    id: "CAP-F-1",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Implementasi dan Standarisasi IT Infrastruktur",
    kd_capex: "2440015",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_kad: 0,
    nilai_rkap: 0,
    anggaran_tahunan: [],
    pekerjaan: [
      {
        id: "PKJ-001",
        nm: "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur PT Pelindo Multi Terminal",
        nilai_rab: 0,
        nilai_kontrak: 0,
        no_pr: "",
        no_po: "6440000026",
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-12",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "",
        tgl_bamk: "2024-08-02",
        keterangan: "",
      },
    ],
  },
];

const yearOpts = (() => {
  const a = [];
  for (let y = new Date().getFullYear(); y >= 2000; y--) a.push(y);
  return a;
})();

// ════════════════════════════════════════════════════════════════
// CSS GLOBAL
// ════════════════════════════════════════════════════════════════
const CSS_BM = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");
:root {
  --blue:#2563eb;--blue-lt:#eff6ff;--blue-mid:#dbeafe;
  --green:#16a34a;--green-lt:#f0fdf4;--green-mid:#dcfce7;
  --amber:#d97706;--amber-lt:#fffbeb;--red:#dc2626;--red-lt:#fef2f2;
  --ink:#111827;--ink2:#374151;--ink3:#6b7280;--ink4:#9ca3af;
  --border:#e5e7eb;--border-lt:#f3f4f6;--surf:#ffffff;--bg:#f9fafb;
  --mono:"JetBrains Mono","Courier New",monospace;
  --r:8px;--r-lg:12px;
  --sh:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
  --sh-md:0 4px 12px rgba(0,0,0,.08);--sh-lg:0 20px 48px rgba(0,0,0,.14);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;background:var(--bg);color:var(--ink);font-size:13px;-webkit-font-smoothing:antialiased;line-height:1.5;}
.root{padding:2rem 2.5rem;min-height:100vh;max-width:1400px;margin:0 auto;}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-family:inherit;font-size:.8rem;font-weight:700;cursor:pointer;border:none;transition:all .15s;white-space:nowrap;}
.btn-outline{background:var(--surf);border:1px solid var(--border);color:var(--ink2);}
.btn-outline:hover{background:var(--bg);border-color:#cbd5e1;}
.btn-green{background:var(--green);color:#fff;box-shadow:0 2px 8px rgba(22,163,74,.2);}
.btn-green:hover{background:#15803d;}
.btn-excel{background:#166534;color:#fff;}
.overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:900;backdrop-filter:blur(2px);padding:20px;animation:fadeOvl .15s ease;}
.mbox{background:var(--surf);border-radius:var(--r-lg);width:100%;max-width:600px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:var(--sh-lg);animation:modalUp .2s cubic-bezier(.16,1,.3,1);}
.toast{position:fixed;bottom:24px;right:24px;background:var(--ink);color:#fff;padding:12px 20px;border-radius:12px;font-size:.85rem;font-weight:600;box-shadow:var(--sh-lg);display:flex;align-items:center;gap:8px;z-index:9999;animation:toastIn .2s ease;}
.cbox{background:var(--surf);border-radius:16px;padding:24px;max-width:320px;width:100%;box-shadow:var(--sh-lg);display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center;animation:modalUp .2s ease;}
.asset-table{width:100%;border-collapse:collapse;font-size:.8rem;}
.asset-table thead tr{background:var(--bg);border-bottom:2px solid var(--border);}
.asset-table thead th{padding:11px 14px;text-align:left;font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:var(--ink3);white-space:nowrap;}
.asset-table tbody tr{border-bottom:1px solid var(--border-lt);transition:background .12s;}
.asset-table tbody tr:hover{background:#f8faff;}
.asset-table.opex-table tbody tr:hover{background:#f7fef9;}
.asset-table tbody td{padding:11px 14px;vertical-align:middle;}
.asset-table tfoot tr{background:var(--blue-lt);border-top:2px solid var(--blue-mid);}
.asset-table tfoot td{padding:10px 14px;font-size:.78rem;font-weight:700;color:var(--blue);}
.asset-table.opex-table tfoot tr{background:var(--green-lt);border-top-color:var(--green-mid);}
.asset-table.opex-table tfoot td{color:var(--green);}
.abtn{display:inline-flex;align-items:center;gap:4px;padding:5px 9px;border-radius:6px;border:1px solid var(--border);font-family:inherit;font-size:.73rem;font-weight:600;cursor:pointer;transition:all .15s;background:var(--surf);color:var(--ink3);}
.abtn:hover{background:var(--bg);border-color:#cbd5e1;color:var(--ink2);}
.abtn.del:hover{background:var(--red-lt);border-color:#fca5a5;color:var(--red);}
@keyframes fadeOvl{from{opacity:0}to{opacity:1}}
@keyframes modalUp{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes toastIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideDown{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
`;

// ════════════════════════════════════════════════════════════════
// SHARED STYLES (inline)
// ════════════════════════════════════════════════════════════════
const OVS = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9000,
  padding: 20,
};
const BTN = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: "0.85rem",
  fontWeight: 500,
  cursor: "pointer",
};
const BTNOUT = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 16px",
  borderRadius: 6,
  border: "1px solid #cbd5e1",
  background: "white",
  color: "#334155",
  fontSize: "0.85rem",
  fontWeight: 500,
  cursor: "pointer",
};
const INP = {
  padding: "10px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: 6,
  fontSize: "0.85rem",
  color: "#1e293b",
  outline: "none",
  width: "100%",
  background: "white",
};
const LBL = {
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: ".5px",
  color: "#475569",
  textTransform: "uppercase",
};
const TABLE = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.85rem",
};
const TH = {
  padding: "12px 14px",
  textAlign: "left",
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "#475569",
  borderBottom: "1px solid #e2e8f0",
  textTransform: "uppercase",
  letterSpacing: ".4px",
  background: "#f8fafc",
};
const TD = {
  padding: "12px 14px",
  verticalAlign: "middle",
  borderBottom: "1px solid #e2e8f0",
  color: "#334155",
};
const ABTN = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 5,
  borderRadius: 4,
  border: "1px solid #e2e8f0",
  background: "white",
  cursor: "pointer",
};

// ════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ════════════════════════════════════════════════════════════════
function ToastMsg({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <CheckCircle size={14} /> {msg}
    </div>
  );
}

function ConfirmBox({ msg, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="cbox" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            width: 48,
            height: 48,
            background: "#fff7ed",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ea580c",
          }}
        >
          <AlertTriangle size={24} />
        </div>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)" }}>
          {msg}
        </p>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button
            className="btn btn-outline"
            style={{ flex: 1, justifyContent: "center" }}
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="btn"
            style={{
              flex: 1,
              justifyContent: "center",
              background: "var(--red)",
              color: "#fff",
            }}
            onClick={onConfirm}
          >
            <Trash2 size={14} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function Fld({ label, required, children, helper }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={LBL}>
        {label}
        {required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
      {children}
      {helper && (
        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{helper}</span>
      )}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        border: "1px solid #e2e8f0",
        padding: "1.4rem",
        boxShadow: "0 1px 2px rgba(0,0,0,.02)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// HISTORY POPUP
// ════════════════════════════════════════════════════════════════
function HistoryPopup({ row, title, onClose, lbl = "Realisasi" }) {
  const history = row.history || [];
  const TIPE_META = {
    initial: { label: "Input Awal", color: "#0284c7", bg: "#e0f2fe" },
    penambahan: { label: "Penambahan", color: "#16a34a", bg: "#dcfce7" },
    pengurangan: { label: "Pengurangan", color: "#dc2626", bg: "#fee2e2" },
    bymhd: { label: "BYMHD", color: "#d97706", bg: "#fef3c7" },
    transfer: { label: `Transfer ${lbl}`, color: "#7c3aed", bg: "#ede9fe" },
  };
  const rows = history.map((h) => {
    const isInitial = h.is_initial || h.tipe === "initial";
    let real = null,
      bymhd = null,
      jumlah = 0;
    if (isInitial) {
      real = h.nilai;
      jumlah = h.nilai;
    } else if (h.tipe === "penambahan") {
      bymhd = h.nilai;
      jumlah = h.nilai;
    } else if (h.tipe === "pengurangan") {
      real = -h.nilai;
      jumlah = -h.nilai;
    } else if (h.tipe === "bymhd" || h.tipe === "transfer") {
      bymhd = h.nilai;
      jumlah = h.nilai;
    }
    const meta = isInitial
      ? TIPE_META.initial
      : TIPE_META[h.tipe] || { label: h.tipe, color: "#475569", bg: "#f1f5f9" };
    return { ...h, real, bymhd, jumlah, meta };
  });
  const grandTotal = rows.reduce((acc, r) => acc + (r.jumlah || 0), 0);
  return (
    <div style={OVS} onClick={onClose}>
      <div
        style={{
          background: "white",
          borderRadius: 12,
          width: "100%",
          maxWidth: 720,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 10px 25px rgba(0,0,0,.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <History size={18} style={{ color: "#2563eb" }} />
              <h3
                style={{ fontWeight: 600, fontSize: "1rem", color: "#1e293b" }}
              >
                Riwayat Perubahan {lbl}
              </h3>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
              <b>{title}</b> — Tahun {row.thn}
            </div>
          </div>
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
            }}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "16px", flex: 1 }}>
          {history.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 0",
                color: "#94a3b8",
                fontSize: "0.85rem",
              }}
            >
              Belum ada riwayat.
            </div>
          ) : (
            <table style={TABLE}>
              <thead>
                <tr>
                  <th style={{ ...TH, width: 40, textAlign: "center" }}>NO</th>
                  <th style={{ ...TH, width: 120 }}>TANGGAL</th>
                  <th style={{ ...TH, width: 160 }}>TIPE</th>
                  <th style={{ ...TH, textAlign: "right" }}>MURNI (Rp)</th>
                  <th style={{ ...TH, textAlign: "right" }}>BYMHD (Rp)</th>
                  <th style={{ ...TH, textAlign: "right" }}>JUMLAH (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((h, i) => (
                  <tr key={h.id}>
                    <td style={{ ...TD, textAlign: "center" }}>{i + 1}</td>
                    <td style={{ ...TD, color: "#64748b" }}>
                      {fmtDate(h.tgl)}
                    </td>
                    <td style={TD}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 8px",
                          borderRadius: 4,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          background: h.meta.bg,
                          color: h.meta.color,
                        }}
                      >
                        {h.meta.label}
                      </span>
                      {h.keterangan && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#94a3b8",
                            marginTop: 4,
                          }}
                        >
                          {h.keterangan}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        color:
                          h.real === null
                            ? "#cbd5e1"
                            : h.real < 0
                              ? "#ef4444"
                              : "#16a34a",
                      }}
                    >
                      {h.real !== null ? (
                        <>
                          {h.real < 0 ? "−" : ""}
                          {fmt(Math.abs(h.real))}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td style={{ ...TD, textAlign: "right", color: "#d97706" }}>
                      {h.bymhd !== null ? (
                        fmt(h.bymhd)
                      ) : (
                        <span style={{ color: "#cbd5e1" }}>—</span>
                      )}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontWeight: 600,
                        color: (h.jumlah || 0) < 0 ? "#ef4444" : "#1e293b",
                      }}
                    >
                      {h.jumlah < 0 ? "−" : ""}
                      {fmt(Math.abs(h.jumlah || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: "#f8fafc" }}>
                  <td
                    colSpan={5}
                    style={{
                      ...TD,
                      textAlign: "right",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    TOTAL {lbl.toUpperCase()} SAAT INI
                  </td>
                  <td
                    style={{
                      ...TD,
                      textAlign: "right",
                      fontWeight: 700,
                      color: grandTotal < 0 ? "#ef4444" : "#2563eb",
                      fontSize: "0.9rem",
                    }}
                  >
                    {grandTotal < 0 ? "−" : ""}Rp {fmt(Math.abs(grandTotal))}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button style={BTNOUT} onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// INLINE EDIT FIELD — teks biasa
// ════════════════════════════════════════════════════════════════
function InlineEditField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  const handleSave = () => {
    onSave(val);
    setEditing(false);
  };

  return (
    <tr>
      <td
        style={{
          ...TD,
          width: 220,
          fontWeight: 600,
          fontSize: "0.72rem",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          background: "#f8fafc",
        }}
      >
        {label}
      </td>
      <td style={{ ...TD }}>
        {editing ? (
          <input
            style={{ ...INP, width: "100%", maxWidth: 320 }}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            autoFocus
          />
        ) : (
          <span
            style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}
          >
            {value}
          </span>
        )}
      </td>
      <td style={{ ...TD, width: 100, textAlign: "right" }}>
        {editing ? (
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button
              style={{
                ...BTN,
                background: "#16a34a",
                padding: "5px 12px",
                fontSize: "0.78rem",
              }}
              onClick={handleSave}
            >
              <CheckCircle size={13} /> Simpan
            </button>
            <button
              style={{ ...BTNOUT, padding: "5px 10px", fontSize: "0.78rem" }}
              onClick={() => {
                setVal(value);
                setEditing(false);
              }}
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <button
            style={{
              ...ABTN,
              color: "#d97706",
              borderColor: "#fde68a",
              background: "#fffbeb",
            }}
            onClick={() => setEditing(true)}
            title="Edit"
          >
            <Pencil size={13} style={{ color: "#d97706" }} />
            <span
              style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 600 }}
            >
              Edit
            </span>
          </button>
        )}
      </td>
    </tr>
  );
}

// ════════════════════════════════════════════════════════════════
// INLINE EDIT FIELD — select tahun
// ════════════════════════════════════════════════════════════════
function InlineEditYearField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  const handleSave = () => {
    onSave(parseInt(val));
    setEditing(false);
  };

  return (
    <tr>
      <td
        style={{
          ...TD,
          width: 220,
          fontWeight: 600,
          fontSize: "0.72rem",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          background: "#f8fafc",
        }}
      >
        {label}
      </td>
      <td style={{ ...TD }}>
        {editing ? (
          <select
            style={{ ...INP, width: "100%", maxWidth: 160 }}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            autoFocus
          >
            {yearOpts.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        ) : (
          <span
            style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}
          >
            {value}
          </span>
        )}
      </td>
      <td style={{ ...TD, width: 100, textAlign: "right" }}>
        {editing ? (
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button
              style={{
                ...BTN,
                background: "#16a34a",
                padding: "5px 12px",
                fontSize: "0.78rem",
              }}
              onClick={handleSave}
            >
              <CheckCircle size={13} /> Simpan
            </button>
            <button
              style={{ ...BTNOUT, padding: "5px 10px", fontSize: "0.78rem" }}
              onClick={() => {
                setVal(value);
                setEditing(false);
              }}
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <button
            style={{
              ...ABTN,
              color: "#d97706",
              borderColor: "#fde68a",
              background: "#fffbeb",
            }}
            onClick={() => setEditing(true)}
            title="Edit"
          >
            <Pencil size={13} style={{ color: "#d97706" }} />
            <span
              style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 600 }}
            >
              Edit
            </span>
          </button>
        )}
      </td>
    </tr>
  );
}

// ════════════════════════════════════════════════════════════════
// INLINE EDIT FIELD — nilai currency (number)
// ════════════════════════════════════════════════════════════════
function InlineEditCurrencyField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  const handleSave = () => {
    onSave(parseFloat(val) || 0);
    setEditing(false);
  };

  return (
    <tr>
      <td
        style={{
          ...TD,
          width: 220,
          fontWeight: 600,
          fontSize: "0.72rem",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          background: "#f8fafc",
        }}
      >
        {label}
      </td>
      <td style={{ ...TD }}>
        {editing ? (
          <div>
            <input
              type="number"
              style={{ ...INP, width: "100%", maxWidth: 320 }}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              autoFocus
            />
            {parseFloat(val) > 0 && (
              <div
                style={{ marginTop: 4, fontSize: "0.78rem", color: "#64748b" }}
              >
                ≈ {fmt(val)}
              </div>
            )}
          </div>
        ) : (
          <span
            style={{ fontWeight: 800, color: "#2563eb", fontSize: "0.95rem" }}
          >
            {fmt(value)}
          </span>
        )}
      </td>
      <td style={{ ...TD, width: 100, textAlign: "right" }}>
        {editing ? (
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button
              style={{
                ...BTN,
                background: "#16a34a",
                padding: "5px 12px",
                fontSize: "0.78rem",
              }}
              onClick={handleSave}
            >
              <CheckCircle size={13} /> Simpan
            </button>
            <button
              style={{ ...BTNOUT, padding: "5px 10px", fontSize: "0.78rem" }}
              onClick={() => {
                setVal(value);
                setEditing(false);
              }}
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <button
            style={{
              ...ABTN,
              color: "#d97706",
              borderColor: "#fde68a",
              background: "#fffbeb",
            }}
            onClick={() => setEditing(true)}
            title="Edit"
          >
            <Pencil size={13} style={{ color: "#d97706" }} />
            <span
              style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 600 }}
            >
              Edit
            </span>
          </button>
        )}
      </td>
    </tr>
  );
}

// ════════════════════════════════════════════════════════════════
// EDIT REALISASI — dengan inline edit untuk semua 3 field info
// ════════════════════════════════════════════════════════════════
function EditRealisasiSection({
  row,
  masterNama,
  onBack,
  onSave,
  onUpdateRow,
}) {
  const [tipe, setTipe] = useState("");
  const [nilai, setNilai] = useState("");
  const [ket, setKet] = useState("");

  const TIPE_OPTIONS = [
    {
      value: "penambahan",
      label: "Penambahan Realisasi",
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      value: "pengurangan",
      label: "Pengurangan Realisasi",
      color: "#dc2626",
      bg: "#fef2f2",
      border: "#fecaca",
    },
    {
      value: "bymhd",
      label: "BYMHD",
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a",
    },
    {
      value: "transfer",
      label: "Transfer Realisasi",
      color: "#7c3aed",
      bg: "#f5f3ff",
      border: "#ddd6fe",
    },
  ];

  const currentTotal = (row.history || []).reduce((acc, h) => {
    if (h.is_initial || h.tipe === "initial") return acc + h.nilai;
    if (h.tipe === "penambahan") return acc + h.nilai;
    if (h.tipe === "pengurangan") return acc - h.nilai;
    if (h.tipe === "bymhd" || h.tipe === "transfer") return acc + h.nilai;
    return acc;
  }, 0);

  const handleSubmit = () => {
    if (!tipe || !nilai) return;
    const today = new Date().toISOString().split("T")[0];
    const newEntry = {
      id: uid(),
      tgl: today,
      tipe,
      nilai: parseFloat(nilai) || 0,
      keterangan: ket,
      is_initial: false,
    };
    onSave(row.id, newEntry, tipe, parseFloat(nilai) || 0);
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 12,
      }}
    >
      {/* Header info tabel — semua 3 field bisa diedit */}
      <table style={{ ...TABLE, border: "none" }}>
        <thead>
          <tr>
            <th style={{ ...TH, width: 220 }}>FIELD</th>
            <th style={TH}>NILAI</th>
            <th style={{ ...TH, width: 100, textAlign: "right" }}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {/* Nama Anggaran Master — editable teks */}
          <InlineEditField
            label="Nama Anggaran Master"
            value={masterNama}
            onSave={(v) => onUpdateRow && onUpdateRow({ masterNama: v })}
          />

          {/* Tahun Realisasi — editable select tahun */}
          <InlineEditYearField
            label="Tahun Realisasi"
            value={row.thn}
            onSave={(v) => onUpdateRow && onUpdateRow({ thn: v })}
          />

          {/* Total Realisasi Berjalan — editable number */}
          <InlineEditCurrencyField
            label="Total Realisasi Berjalan"
            value={currentTotal}
            onSave={(v) => onUpdateRow && onUpdateRow({ overrideTotal: v })}
          />
        </tbody>
      </table>

      {/* Jenis Perubahan — tombol klik */}
      <div
        style={{
          padding: "16px 18px",
          borderTop: "1px solid #e2e8f0",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 10,
          }}
        >
          Jenis Perubahan <span style={{ color: "#ef4444" }}>*</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TIPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTipe(opt.value)}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: `2px solid ${tipe === opt.value ? opt.color : "#e2e8f0"}`,
                background: tipe === opt.value ? opt.bg : "white",
                color: tipe === opt.value ? opt.color : "#64748b",
                fontWeight: tipe === opt.value ? 700 : 500,
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nilai & Keterangan */}
      {tipe && (
        <div
          style={{
            padding: "16px 18px",
            borderTop: "1px solid #e2e8f0",
            background: "white",
          }}
        >
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 6,
                }}
              >
                Nilai Perubahan (IDR){" "}
                <span style={{ color: "#ef4444" }}>*</span>
              </div>
              <input
                type="number"
                style={{ ...INP }}
                placeholder="Contoh: 50000000"
                value={nilai}
                onChange={(e) => setNilai(e.target.value)}
              />
              {parseFloat(nilai) > 0 && (
                <div
                  style={{
                    marginTop: 4,
                    fontSize: "0.78rem",
                    color: "#64748b",
                  }}
                >
                  ≈ {fmt(nilai)}
                </div>
              )}
            </div>
            <div style={{ flex: 2, minWidth: 200 }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 6,
                }}
              >
                Keterangan (opsional)
              </div>
              <input
                style={INP}
                placeholder="Catatan perubahan..."
                value={ket}
                onChange={(e) => setKet(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer aksi */}
      <div
        style={{
          padding: "12px 18px",
          borderTop: "1px solid #e2e8f0",
          background: "#f8fafc",
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <button style={{ ...BTNOUT, fontSize: "0.82rem" }} onClick={onBack}>
          Batal
        </button>
        <button
          style={{
            ...BTN,
            background: "#ea580c",
            opacity: !tipe || !nilai ? 0.5 : 1,
            padding: "9px 18px",
            borderRadius: 8,
          }}
          disabled={!tipe || !nilai}
          onClick={handleSubmit}
        >
          <Save size={15} /> Submit Perubahan
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// REALISASI TAHUNAN PER MASTER
// ════════════════════════════════════════════════════════════════
function RealisasiSection({ master, setMasters, toast_ }) {
  const [showForm, setShowForm] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [historyRow, setHistoryRow] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const emptyForm = {
    thn: new Date().getFullYear(),
    realisasi_murni: "",
    realisasi_bymhd: "",
  };
  const [form, setForm] = useState(emptyForm);
  const list = master.realisasi_tahunan || [];

  const handleSaveNew = () => {
    const today = new Date().toISOString().split("T")[0];
    const payload = {
      id: uid(),
      thn: parseInt(form.thn),
      realisasi_murni: parseFloat(form.realisasi_murni) || 0,
      realisasi_bymhd: parseFloat(form.realisasi_bymhd) || 0,
      history: [
        {
          id: uid(),
          tgl: today,
          tipe: "initial",
          nilai: parseFloat(form.realisasi_murni) || 0,
          keterangan: "Input awal murni",
          is_initial: true,
        },
        ...(parseFloat(form.realisasi_bymhd) > 0
          ? [
              {
                id: uid(),
                tgl: today,
                tipe: "bymhd",
                nilai: parseFloat(form.realisasi_bymhd) || 0,
                keterangan: "Input awal BYMHD",
                is_initial: false,
              },
            ]
          : []),
      ],
    };
    setMasters((prev) =>
      prev.map((m) =>
        m.id === master.id
          ? {
              ...m,
              realisasi_tahunan: [...(m.realisasi_tahunan || []), payload],
            }
          : m,
      ),
    );
    toast_("Data realisasi tahunan ditambahkan.");
    setShowForm(false);
    setForm(emptyForm);
  };

  const handleSavePerubahan = (rowId, newHistoryEntry, tipe, nilai) => {
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id !== master.id) return m;
        return {
          ...m,
          realisasi_tahunan: (m.realisasi_tahunan || []).map((r) => {
            if (r.id !== rowId) return r;
            let newMurni = r.realisasi_murni;
            let newBymhd = r.realisasi_bymhd || 0;
            if (tipe === "pengurangan") newMurni -= nilai;
            else if (
              tipe === "penambahan" ||
              tipe === "bymhd" ||
              tipe === "transfer"
            )
              newBymhd += nilai;
            return {
              ...r,
              realisasi_murni: newMurni,
              realisasi_bymhd: newBymhd,
              history: [...(r.history || []), newHistoryEntry],
            };
          }),
        };
      }),
    );
    toast_("Perubahan realisasi disimpan.");
    setEditRowId(null);
  };

  // ── BARU: handler untuk update field info (nama, tahun, total) ──
  const handleUpdateRow = (rowId, changes) => {
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id !== master.id) return m;

        // Jika masterNama diubah, update nama di master
        let updatedMaster = { ...m };
        if (changes.masterNama !== undefined) {
          updatedMaster.nama = changes.masterNama;
        }

        return {
          ...updatedMaster,
          realisasi_tahunan: (m.realisasi_tahunan || []).map((r) => {
            if (r.id !== rowId) return r;

            let updated = { ...r };

            // Update tahun realisasi
            if (changes.thn !== undefined) {
              updated.thn = changes.thn;
            }

            // Override total realisasi berjalan:
            // Kita set realisasi_murni = nilai baru, bymhd = 0,
            // dan tambahkan history entry override
            if (changes.overrideTotal !== undefined) {
              const today = new Date().toISOString().split("T")[0];
              const selisih =
                changes.overrideTotal -
                (r.realisasi_murni + (r.realisasi_bymhd || 0));
              const tipeEntry = selisih >= 0 ? "penambahan" : "pengurangan";
              const nilaiEntry = Math.abs(selisih);
              updated.realisasi_murni = changes.overrideTotal;
              updated.realisasi_bymhd = 0;
              updated.history = [
                ...(r.history || []),
                {
                  id: uid(),
                  tgl: today,
                  tipe: tipeEntry,
                  nilai: nilaiEntry,
                  keterangan: "Edit langsung total realisasi berjalan",
                  is_initial: false,
                },
              ];
            }

            return updated;
          }),
        };
      }),
    );
    toast_("Data berhasil diperbarui.");
  };

  const handleDelete = (rowId) => {
    setConfirm({
      msg: "Hapus data realisasi tahunan ini?",
      onConfirm: () => {
        setMasters((prev) =>
          prev.map((m) =>
            m.id === master.id
              ? {
                  ...m,
                  realisasi_tahunan: (m.realisasi_tahunan || []).filter(
                    (r) => r.id !== rowId,
                  ),
                }
              : m,
          ),
        );
        setConfirm(null);
        toast_("Data realisasi dihapus.");
      },
    });
  };

  const grandTotal = list.reduce(
    (a, r) => a + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0),
    0,
  );

  return (
    <div style={{ marginTop: 0 }}>
      {confirm && (
        <ConfirmBox
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      {historyRow && (
        <HistoryPopup
          row={historyRow}
          title={master.nama}
          onClose={() => setHistoryRow(null)}
          lbl="Realisasi"
        />
      )}

      {/* Add Form Modal */}
      {showForm && (
        <div style={OVS} onClick={() => setShowForm(false)}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 24,
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h3 style={{ fontWeight: 600, fontSize: "1rem" }}>
                  Input Realisasi Tahunan
                </h3>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#64748b",
                    marginTop: 2,
                  }}
                >
                  {master.nama}
                </div>
              </div>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Tahun Realisasi" required>
                <select
                  style={INP}
                  value={form.thn}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, thn: e.target.value }))
                  }
                >
                  {yearOpts.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </Fld>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Fld label="Realisasi Murni (Rp)" required>
                  <input
                    type="number"
                    style={INP}
                    placeholder="0"
                    value={form.realisasi_murni}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        realisasi_murni: e.target.value,
                      }))
                    }
                  />
                </Fld>
                <Fld label="Realisasi BYMHD (Rp)">
                  <input
                    type="number"
                    style={INP}
                    placeholder="0"
                    value={form.realisasi_bymhd}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        realisasi_bymhd: e.target.value,
                      }))
                    }
                  />
                </Fld>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <button style={BTNOUT} onClick={() => setShowForm(false)}>
                Batal
              </button>
              <button
                style={{
                  ...BTN,
                  background: "#16a34a",
                  opacity: form.realisasi_murni ? 1 : 0.5,
                }}
                disabled={!form.realisasi_murni}
                onClick={handleSaveNew}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-header realisasi */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          background: "#f0fdf4",
          borderTop: "1px solid #bbf7d0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Calendar size={14} style={{ color: "#16a34a" }} />
          <span
            style={{ fontSize: "0.8rem", fontWeight: 700, color: "#15803d" }}
          >
            Daftar Realisasi Tahunan
          </span>
          <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
            ({list.length} tahun)
          </span>
        </div>
        <button
          style={{
            ...BTN,
            background: "#16a34a",
            padding: "6px 12px",
            fontSize: "0.75rem",
          }}
          onClick={() => setShowForm(true)}
        >
          <Plus size={12} /> Input Realisasi Baru
        </button>
      </div>

      {/* Tabel realisasi */}
      <table style={{ ...TABLE, border: "none" }}>
        <thead>
          <tr>
            <th style={{ ...TH, width: 40, textAlign: "center" }}>NO</th>
            <th style={{ ...TH, width: 80, textAlign: "center" }}>TAHUN</th>
            <th style={{ ...TH, textAlign: "right" }}>REALISASI MURNI</th>
            <th style={{ ...TH, textAlign: "right" }}>REALISASI BYMHD</th>
            <th style={{ ...TH, textAlign: "right" }}>TOTAL REALISASI</th>
            <th style={{ ...TH, textAlign: "center", width: 120 }}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  ...TD,
                  textAlign: "center",
                  color: "#94a3b8",
                  padding: 20,
                  fontSize: "0.82rem",
                }}
              >
                Belum ada data realisasi tahunan.
              </td>
            </tr>
          ) : (
            list.map((row, idx) => {
              const total =
                (row.realisasi_murni || 0) + (row.realisasi_bymhd || 0);
              return (
                <React.Fragment key={row.id}>
                  <tr
                    style={{
                      background: editRowId === row.id ? "#fffbeb" : "white",
                    }}
                  >
                    <td
                      style={{
                        ...TD,
                        textAlign: "center",
                        fontSize: "0.72rem",
                        color: "#94a3b8",
                        fontWeight: 700,
                      }}
                    >
                      {idx + 1}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "center",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {row.thn}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {fmt(row.realisasi_murni)}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#d97706",
                      }}
                    >
                      {fmt(row.realisasi_bymhd)}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontWeight: 700,
                        color: "#16a34a",
                      }}
                    >
                      {fmt(total)}
                    </td>
                    <td style={{ ...TD, textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          justifyContent: "center",
                        }}
                      >
                        <button
                          style={ABTN}
                          title="Edit / Revisi"
                          onClick={() =>
                            setEditRowId(editRowId === row.id ? null : row.id)
                          }
                        >
                          <Edit size={12} style={{ color: "#d97706" }} />
                        </button>
                        <button
                          style={ABTN}
                          title="Riwayat"
                          onClick={() => setHistoryRow({ ...row })}
                        >
                          <History size={12} style={{ color: "#2563eb" }} />
                        </button>
                        <button
                          style={ABTN}
                          title="Hapus"
                          onClick={() => handleDelete(row.id)}
                        >
                          <Trash2 size={12} style={{ color: "#ef4444" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {editRowId === row.id && (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: "0 16px 16px",
                          background: "#fffbeb",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <EditRealisasiSection
                          row={row}
                          masterNama={master.nama}
                          onBack={() => setEditRowId(null)}
                          onSave={handleSavePerubahan}
                          onUpdateRow={(changes) =>
                            handleUpdateRow(row.id, changes)
                          }
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
        {list.length > 0 && (
          <tfoot>
            <tr style={{ background: "#f0fdf4" }}>
              <td
                colSpan={4}
                style={{
                  ...TD,
                  textAlign: "right",
                  fontWeight: 700,
                  color: "#15803d",
                  fontSize: "0.75rem",
                }}
              >
                GRAND TOTAL
              </td>
              <td
                style={{
                  ...TD,
                  textAlign: "right",
                  fontWeight: 800,
                  color: "#15803d",
                  fontSize: "0.88rem",
                }}
              >
                {fmt(grandTotal)}
              </td>
              <td style={TD} />
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// OPEX MODULE
// ════════════════════════════════════════════════════════════════
function OpexModule({ masterList, setMasterList }) {
  const [masters, setMasters] = useState(INIT_OPEX_MASTERS);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [showAddMaster, setShowAddMaster] = useState(false);
  const [editMaster, setEditMaster] = useState(null);

  const [filterThnFrom, setFilterThnFrom] = useState("");
  const [filterThnTo, setFilterThnTo] = useState("");

  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const toast_ = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const emptyMasterForm = {
    nama: "",
    kd: "",
    thn_anggaran: new Date().getFullYear(),
    nilai_anggaran: "",
  };
  const [addForm, setAddForm] = useState(emptyMasterForm);

  const handleAddMaster = () => {
    if (!addForm.nama || !addForm.nilai_anggaran) return;
    const newM = {
      id: uid(),
      kd: addForm.kd || uid(),
      nama: addForm.nama,
      thn_anggaran: parseInt(addForm.thn_anggaran),
      nilai_anggaran: parseFloat(addForm.nilai_anggaran) || 0,
      realisasi_tahunan: [],
    };
    setMasters((p) => [...p, newM]);
    toast_("Anggaran master baru ditambahkan.");
    setShowAddMaster(false);
    setAddForm(emptyMasterForm);
  };

  const handleSaveEditMaster = () => {
    if (!editMaster) return;
    setMasters((p) =>
      p.map((m) =>
        m.id === editMaster.id
          ? {
              ...m,
              nama: editMaster.nama,
              thn_anggaran: parseInt(editMaster.thn_anggaran),
              nilai_anggaran: parseFloat(editMaster.nilai_anggaran) || 0,
            }
          : m,
      ),
    );
    toast_("Anggaran master diperbarui.");
    setEditMaster(null);
  };

  const handleDeleteMaster = (id) => {
    setConfirm({
      msg: "Hapus anggaran master ini beserta seluruh data realisasinya?",
      onConfirm: () => {
        setMasters((p) => p.filter((m) => m.id !== id));
        setConfirm(null);
        toast_("Anggaran master dihapus.");
      },
    });
  };

  const filteredMasters = useMemo(() => {
    setCurrentPage(1);
    return masters.filter((m) => {
      if (filterThnFrom && m.thn_anggaran < parseInt(filterThnFrom))
        return false;
      if (filterThnTo && m.thn_anggaran > parseInt(filterThnTo)) return false;
      return true;
    });
  }, [masters, filterThnFrom, filterThnTo]);

  const totalPages = Math.ceil(filteredMasters.length / PAGE_SIZE);
  const paginatedMasters = filteredMasters.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const totalAnggaran = filteredMasters.reduce(
    (s, m) => s + (m.nilai_anggaran || 0),
    0,
  );
  const totalRealisasi = filteredMasters.reduce(
    (s, m) =>
      s +
      (m.realisasi_tahunan || []).reduce(
        (ss, r) => ss + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0),
        0,
      ),
    0,
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && <ToastMsg msg={toast} onDone={() => setToast(null)} />}
      {confirm && (
        <ConfirmBox
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {showAddMaster && (
        <div style={OVS} onClick={() => setShowAddMaster(false)}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 24,
              maxWidth: 440,
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>
                Tambah Anggaran Master OPEX
              </h3>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
                onClick={() => setShowAddMaster(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Fld label="Nama Anggaran Master" required>
                <input
                  style={INP}
                  placeholder="Contoh: Beban Pemeliharaan Software"
                  value={addForm.nama}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, nama: e.target.value }))
                  }
                />
              </Fld>
              <Fld label="Kode Anggaran">
                <input
                  style={INP}
                  placeholder="Contoh: 5030905000"
                  value={addForm.kd}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, kd: e.target.value }))
                  }
                />
              </Fld>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Fld label="Tahun Anggaran" required>
                  <select
                    style={INP}
                    value={addForm.thn_anggaran}
                    onChange={(e) =>
                      setAddForm((f) => ({
                        ...f,
                        thn_anggaran: e.target.value,
                      }))
                    }
                  >
                    {yearOpts.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </Fld>
                <Fld label="Nilai Anggaran (Rp)" required>
                  <input
                    type="number"
                    style={INP}
                    placeholder="0"
                    value={addForm.nilai_anggaran}
                    onChange={(e) =>
                      setAddForm((f) => ({
                        ...f,
                        nilai_anggaran: e.target.value,
                      }))
                    }
                  />
                </Fld>
              </div>
              {parseFloat(addForm.nilai_anggaran) > 0 && (
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                  ≈ {fmt(addForm.nilai_anggaran)}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 22,
                justifyContent: "flex-end",
              }}
            >
              <button style={BTNOUT} onClick={() => setShowAddMaster(false)}>
                Batal
              </button>
              <button
                style={{
                  ...BTN,
                  background: "#16a34a",
                  opacity: addForm.nama && addForm.nilai_anggaran ? 1 : 0.5,
                }}
                disabled={!addForm.nama || !addForm.nilai_anggaran}
                onClick={handleAddMaster}
              >
                <Plus size={14} /> Tambahkan
              </button>
            </div>
          </div>
        </div>
      )}

      {editMaster && (
        <div style={OVS} onClick={() => setEditMaster(null)}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 24,
              maxWidth: 440,
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>
                Edit Anggaran Master
              </h3>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
                onClick={() => setEditMaster(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Fld label="Nama Anggaran Master" required>
                <input
                  style={INP}
                  value={editMaster.nama}
                  onChange={(e) =>
                    setEditMaster((m) => ({ ...m, nama: e.target.value }))
                  }
                />
              </Fld>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Fld label="Tahun Anggaran">
                  <select
                    style={INP}
                    value={editMaster.thn_anggaran}
                    onChange={(e) =>
                      setEditMaster((m) => ({
                        ...m,
                        thn_anggaran: e.target.value,
                      }))
                    }
                  >
                    {yearOpts.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </Fld>
                <Fld label="Nilai Anggaran (Rp)">
                  <input
                    type="number"
                    style={INP}
                    value={editMaster.nilai_anggaran}
                    onChange={(e) =>
                      setEditMaster((m) => ({
                        ...m,
                        nilai_anggaran: e.target.value,
                      }))
                    }
                  />
                </Fld>
              </div>
              {parseFloat(editMaster.nilai_anggaran) > 0 && (
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                  ≈ {fmt(editMaster.nilai_anggaran)}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 22,
                justifyContent: "flex-end",
              }}
            >
              <button style={BTNOUT} onClick={() => setEditMaster(null)}>
                Batal
              </button>
              <button
                style={{ ...BTN, background: "#16a34a" }}
                onClick={handleSaveEditMaster}
              >
                <Save size={14} /> Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI STRIP */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
        }}
      >
        {[
          {
            label: "Total Anggaran",
            val: fmt(totalAnggaran),
            color: "#2563eb",
            bg: "#eff6ff",
          },
          {
            label: "Total Realisasi",
            val: fmt(totalRealisasi),
            color: "#d97706",
            bg: "#fffbeb",
          },
          {
            label: "Sisa Anggaran",
            val: fmt(totalAnggaran - totalRealisasi),
            color: totalRealisasi > totalAnggaran ? "#dc2626" : "#16a34a",
            bg: totalRealisasi > totalAnggaran ? "#fef2f2" : "#f0fdf4",
          },
          {
            label: "Pos Anggaran",
            val: `${filteredMasters.length} item`,
            color: "#475569",
            bg: "#f8fafc",
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              padding: "12px 16px",
              boxShadow: "0 1px 2px rgba(0,0,0,.03)",
            }}
          >
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 6,
              }}
            >
              {item.label}
            </div>
            <div
              style={{ fontSize: "1rem", fontWeight: 800, color: item.color }}
            >
              {item.val}
            </div>
          </div>
        ))}
      </div>

      {/* HEADER + FILTER */}
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Database size={17} style={{ color: "#16a34a" }} />
          <span
            style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}
          >
            Daftar Anggaran Master OPEX
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              background: "#dcfce7",
              color: "#16a34a",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 99,
              border: "1px solid #bbf7d0",
            }}
          >
            {filteredMasters.length} pos
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}
            >
              Filter Tahun:
            </span>
            <select
              style={{
                ...INP,
                width: 90,
                padding: "6px 10px",
                fontSize: "0.8rem",
              }}
              value={filterThnFrom}
              onChange={(e) => setFilterThnFrom(e.target.value)}
            >
              <option value="">Dari</option>
              {yearOpts.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>—</span>
            <select
              style={{
                ...INP,
                width: 90,
                padding: "6px 10px",
                fontSize: "0.8rem",
              }}
              value={filterThnTo}
              onChange={(e) => setFilterThnTo(e.target.value)}
            >
              <option value="">Sampai</option>
              {yearOpts.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {(filterThnFrom || filterThnTo) && (
              <button
                style={{
                  ...BTNOUT,
                  padding: "5px 10px",
                  fontSize: "0.75rem",
                  color: "#ef4444",
                  borderColor: "#fecaca",
                }}
                onClick={() => {
                  setFilterThnFrom("");
                  setFilterThnTo("");
                }}
              >
                <X size={12} /> Reset
              </button>
            )}
          </div>
          <button
            style={{
              ...BTN,
              background: "#16a34a",
              padding: "8px 14px",
              fontSize: "0.78rem",
            }}
            onClick={() => setShowAddMaster(true)}
          >
            <Plus size={13} /> Tambah Anggaran Master
          </button>
        </div>
      </div>

      {filteredMasters.length === 0 ? (
        <div
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "48px 24px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.88rem",
          }}
        >
          Tidak ada anggaran master yang sesuai filter.
        </div>
      ) : (
        <>
          {paginatedMasters.map((m, i) => {
            const globalIdx = (currentPage - 1) * PAGE_SIZE + i;
            const totalR = (m.realisasi_tahunan || []).reduce(
              (s, r) => s + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0),
              0,
            );
            const pct =
              m.nilai_anggaran > 0
                ? Math.round((totalR / m.nilai_anggaran) * 100)
                : 0;
            const pc = pctColor(pct);

            return (
              <div
                key={m.id}
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,.02)",
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        background: "#dcfce7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        color: "#15803d",
                      }}
                    >
                      {globalIdx + 1}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          fontSize: "0.9rem",
                        }}
                      >
                        {m.nama}
                      </div>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontFamily: "monospace",
                          color: "#64748b",
                          background: "#f1f5f9",
                          padding: "1px 6px",
                          borderRadius: 3,
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        {m.kd}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 800,
                          color: pc,
                        }}
                      >
                        {pct}%
                      </span>
                      <div
                        style={{
                          width: 60,
                          height: 5,
                          background: "#e2e8f0",
                          borderRadius: 99,
                          overflow: "hidden",
                          marginTop: 3,
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            height: "100%",
                            background: pc,
                            borderRadius: 99,
                            transition: "width .5s",
                          }}
                        />
                      </div>
                    </div>
                    <button
                      style={ABTN}
                      title="Edit Master"
                      onClick={() => setEditMaster({ ...m })}
                    >
                      <Edit size={12} style={{ color: "#d97706" }} />
                    </button>
                    <button
                      style={ABTN}
                      title="Hapus"
                      onClick={() => handleDeleteMaster(m.id)}
                    >
                      <Trash2 size={12} style={{ color: "#ef4444" }} />
                    </button>
                  </div>
                </div>

                <table style={{ ...TABLE, border: "none" }}>
                  <thead>
                    <tr>
                      <th style={{ ...TH, width: "25%" }}>TAHUN ANGGARAN</th>
                      <th style={{ ...TH, textAlign: "right", width: "37.5%" }}>
                        NILAI ANGGARAN
                      </th>
                      <th style={{ ...TH, textAlign: "right", width: "37.5%" }}>
                        TOTAL REALISASI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ ...TD, fontWeight: 700, color: "#1e293b" }}>
                        {m.thn_anggaran}
                      </td>
                      <td
                        style={{
                          ...TD,
                          textAlign: "right",
                          fontWeight: 800,
                          color: "#2563eb",
                          fontSize: "0.9rem",
                        }}
                      >
                        {fmt(m.nilai_anggaran)}
                      </td>
                      <td
                        style={{
                          ...TD,
                          textAlign: "right",
                          fontWeight: 700,
                          color: "#d97706",
                          fontSize: "0.88rem",
                        }}
                      >
                        {fmt(totalR)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <RealisasiSection
                  master={masters.find((x) => x.id === m.id) || m}
                  setMasters={setMasters}
                  toast_={toast_}
                />
              </div>
            );
          })}

          {totalPages > 1 && (
            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                padding: "12px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                Menampilkan{" "}
                <b>
                  {(currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(currentPage * PAGE_SIZE, filteredMasters.length)}
                </b>{" "}
                dari <b>{filteredMasters.length}</b> pos anggaran
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  style={{
                    ...ABTN,
                    padding: "6px 12px",
                    opacity: currentPage === 1 ? 0.4 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <ChevronRight
                    size={14}
                    style={{ transform: "rotate(180deg)", color: "#475569" }}
                  />
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (pg) => (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        border:
                          pg === currentPage
                            ? "2px solid #16a34a"
                            : "1px solid #e2e8f0",
                        background: pg === currentPage ? "#16a34a" : "white",
                        color: pg === currentPage ? "white" : "#475569",
                        fontWeight: pg === currentPage ? 700 : 500,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {pg}
                    </button>
                  ),
                )}
                <button
                  style={{
                    ...ABTN,
                    padding: "6px 12px",
                    opacity: currentPage === totalPages ? 0.4 : 1,
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <ChevronRight size={14} style={{ color: "#475569" }} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CAPEX MODULE (UNCHANGED)
// ════════════════════════════════════════════════════════════════
function CapexModule({ capexList, setCapexList, masterList, setMasterList }) {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [masterMode, setMasterMode] = useState("existing");
  const [selKd, setSelKd] = useState("");
  const [newMaster, setNewMaster] = useState({ kd: "", nm: "" });
  const [anggaranMode, setAnggaranMode] = useState("existing");
  const [selAnggaranId, setSelAnggaranId] = useState("");
  const capexMasters = masterList.filter((m) => m.tipe === "CAPEX");
  const [editDropItem, setEditDropItem] = useState(null);
  const emptyNewAnggaran = {
    nm: "",
    kd_capex: "",
    thn_rkap_awal: new Date().getFullYear() - 1,
    thn_rkap_akhir: new Date().getFullYear() - 1,
    thn_anggaran: new Date().getFullYear() - 1,
    nilai_kad: "",
    nilai_rkap: "",
  };
  const [newAnggaran, setNewAnggaran] = useState(emptyNewAnggaran);
  const [editTarget, setEditTarget] = useState(null);
  const [showPkj, setShowPkj] = useState(false);
  const [pkjCapexId, setPkjCapexId] = useState(null);
  const [pkjEditId, setPkjEditId] = useState(null);
  const emptyPkj = {
    nm: "",
    nilai_rab: "",
    nilai_kontrak: "",
    no_pr: "",
    no_po: "",
    no_kontrak: "",
    tgl_kontrak: "",
    durasi_kontrak: "",
    no_sp3: "",
    tgl_sp3: "",
    tgl_bamk: "",
    keterangan: "",
  };
  const [pkjForm, setPkjForm] = useState(emptyPkj);
  const [viewDetail, setViewDetail] = useState(null);

  const toast_ = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const isMasterResolved =
    masterMode === "existing" ? !!selKd : !!(newMaster.kd && newMaster.nm);
  const activeMasterKd = masterMode === "existing" ? selKd : newMaster.kd;
  const availableCapex = capexList.filter(
    (c) => c.kd_master === activeMasterKd,
  );
  const isAnggaranResolved =
    anggaranMode === "existing"
      ? !!selAnggaranId
      : !!(newAnggaran.nm && newAnggaran.kd_capex && newAnggaran.thn_anggaran);
  useEffect(() => {
    if (
      isMasterResolved &&
      masterMode === "existing" &&
      availableCapex.length === 0
    )
      setAnggaranMode("new");
  }, [isMasterResolved, masterMode, activeMasterKd, availableCapex.length]);

  const TOGGLE = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    background: "transparent",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#64748b",
    cursor: "pointer",
  };

  const handleLanjutToStep1 = () => {
    if (
      masterMode === "new" &&
      !capexMasters.find((m) => m.kd === newMaster.kd)
    )
      setMasterList((p) => [
        ...p,
        { kd: newMaster.kd, nm: newMaster.nm, tipe: "CAPEX" },
      ]);
    if (anggaranMode === "new") {
      const nmMaster =
        masterMode === "existing"
          ? capexMasters.find((m) => m.kd === selKd)?.nm
          : newMaster.nm;
      const targetId = uid();
      const newItem = {
        id: targetId,
        kd_master: activeMasterKd,
        nm_master: nmMaster,
        nm_anggaran: newAnggaran.nm,
        kd_capex: newAnggaran.kd_capex,
        thn_rkap_awal: parseInt(newAnggaran.thn_rkap_awal),
        thn_rkap_akhir: parseInt(newAnggaran.thn_rkap_akhir),
        thn_anggaran: parseInt(newAnggaran.thn_anggaran),
        nilai_kad: parseFloat(newAnggaran.nilai_kad) || 0,
        nilai_rkap: parseFloat(newAnggaran.nilai_rkap) || 0,
        anggaran_tahunan: [],
        pekerjaan: [],
      };
      setCapexList((p) => [...p, newItem]);
      setSelAnggaranId(targetId);
      setNewAnggaran(emptyNewAnggaran);
      setAnggaranMode("existing");
      toast_("Data CAPEX ditambahkan.");
    }
    setStep(1);
  };
  const saveEditCapex = () => {
    if (!editTarget) return;
    setCapexList((p) =>
      p.map((c) =>
        c.id === editTarget.id
          ? {
              ...c,
              nm_anggaran: editTarget.nm_anggaran,
              kd_capex: editTarget.kd_capex,
              thn_rkap_awal: parseInt(editTarget.thn_rkap_awal),
              thn_rkap_akhir: parseInt(editTarget.thn_rkap_akhir),
              thn_anggaran: parseInt(editTarget.thn_anggaran),
              nilai_kad: parseFloat(editTarget.nilai_kad) || 0,
              nilai_rkap: parseFloat(editTarget.nilai_rkap) || 0,
            }
          : c,
      ),
    );
    setEditTarget(null);
    toast_("Perubahan disimpan.");
  };
  const saveEditDrop = () => {
    setMasterList((p) =>
      p.map((m) =>
        m.kd === editDropItem.oldKd && m.tipe === "CAPEX"
          ? { ...m, kd: editDropItem.kd, nm: editDropItem.nm }
          : m,
      ),
    );
    setCapexList((p) =>
      p.map((x) =>
        x.kd_master === editDropItem.oldKd
          ? { ...x, kd_master: editDropItem.kd, nm_master: editDropItem.nm }
          : x,
      ),
    );
    if (selKd === editDropItem.oldKd) setSelKd(editDropItem.kd);
    setEditDropItem(null);
    toast_("Pilihan master diperbarui.");
  };
  const openAddPkj = (capexId) => {
    setPkjCapexId(capexId);
    setPkjForm(emptyPkj);
    setPkjEditId(null);
    setShowPkj(true);
  };
  const openEditPkj = (capexId, pkj) => {
    setPkjCapexId(capexId);
    setPkjForm({ ...pkj });
    setPkjEditId(pkj.id);
    setShowPkj(true);
  };
  const handleSavePkj = () => {
    const payload = {
      ...pkjForm,
      nilai_rab: parseFloat(pkjForm.nilai_rab) || 0,
      nilai_kontrak: parseFloat(pkjForm.nilai_kontrak) || 0,
      durasi_kontrak: parseInt(pkjForm.durasi_kontrak) || 0,
    };
    if (pkjEditId) {
      setCapexList((p) =>
        p.map((c) =>
          c.id === pkjCapexId
            ? {
                ...c,
                pekerjaan: c.pekerjaan.map((pk) =>
                  pk.id === pkjEditId ? { ...pk, ...payload } : pk,
                ),
              }
            : c,
        ),
      );
      toast_("Pekerjaan diperbarui.");
    } else {
      setCapexList((p) =>
        p.map((c) =>
          c.id === pkjCapexId
            ? {
                ...c,
                pekerjaan: [...(c.pekerjaan || []), { id: uid(), ...payload }],
              }
            : c,
        ),
      );
      toast_("Pekerjaan ditambahkan.");
    }
    setShowPkj(false);
  };
  const reset = () => {
    setStep(0);
    setMasterMode("existing");
    setSelKd("");
    setNewMaster({ kd: "", nm: "" });
    setAnggaranMode("existing");
    setSelAnggaranId("");
    setNewAnggaran(emptyNewAnggaran);
  };
  const activeCapex = capexList.find((c) => c.id === selAnggaranId);

  if (viewDetail) {
    const { cap, pkj } = viewDetail;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={BTNOUT} onClick={() => setViewDetail(null)}>
            <ArrowLeft size={16} /> Kembali
          </button>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            Detail Pekerjaan
          </h2>
        </div>
        <Card>
          <div
            style={{
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: "1px dashed #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: 8,
              }}
            >
              {pkj.nm}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Anggaran: {cap.nm_anggaran}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                title: "Finansial",
                icon: <Database size={16} />,
                items: [
                  ["RAB", `Rp ${fmt(pkj.nilai_rab)}`],
                  ["Kontrak", `Rp ${fmt(pkj.nilai_kontrak)}`],
                ],
              },
              {
                title: "Dokumen",
                icon: <FileText size={16} />,
                items: [
                  ["PR", pkj.no_pr || "-"],
                  ["PO", pkj.no_po || "-"],
                  ["Kontrak", pkj.no_kontrak || "-"],
                  ["SP3", pkj.no_sp3 || "-"],
                ],
              },
              {
                title: "Waktu",
                icon: <Clock size={16} />,
                items: [
                  ["Tgl. Kontrak", fmtDate(pkj.tgl_kontrak) || "-"],
                  [
                    "Durasi",
                    pkj.durasi_kontrak ? `${pkj.durasi_kontrak} hari` : "-",
                  ],
                  ["Tgl. SP3", fmtDate(pkj.tgl_sp3) || "-"],
                  ["Tgl. BAMK", fmtDate(pkj.tgl_bamk) || "-"],
                ],
              },
            ].map((sec) => (
              <div
                key={sec.title}
                style={{ background: "#f8fafc", padding: 16, borderRadius: 8 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  {sec.icon}
                  {sec.title}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {sec.items.map(([lbl, val]) => (
                    <div
                      key={lbl}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #e2e8f0",
                        paddingBottom: 4,
                      }}
                    >
                      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                        {lbl}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: "#1e293b",
                        }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const steps = ["Pilih Master & Anggaran", "Daftar & Kelola CAPEX"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && <ToastMsg msg={toast} onDone={() => setToast(null)} />}
      {confirm && (
        <ConfirmBox
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      {editDropItem && (
        <div style={OVS} onClick={() => setEditDropItem(null)}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 24,
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 600, marginBottom: 20 }}>
              Edit Pilihan Master Dropdown
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Nama Anggaran Master">
                <input
                  style={INP}
                  value={editDropItem.nm}
                  onChange={(e) =>
                    setEditDropItem((t) => ({ ...t, nm: e.target.value }))
                  }
                />
              </Fld>
              <Fld label="Kode Anggaran Master">
                <input
                  style={INP}
                  value={editDropItem.kd}
                  onChange={(e) =>
                    setEditDropItem((t) => ({ ...t, kd: e.target.value }))
                  }
                />
              </Fld>
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <button style={BTNOUT} onClick={() => setEditDropItem(null)}>
                Batal
              </button>
              <button style={BTN} onClick={saveEditDrop}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "white",
          padding: "1rem 1.4rem",
          borderRadius: 10,
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 2px rgba(0,0,0,.02)",
        }}
      >
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  background:
                    step > i ? "#16a34a" : step === i ? "#2563eb" : "#f1f5f9",
                  color: step >= i ? "white" : "#94a3b8",
                  flexShrink: 0,
                }}
              >
                {step > i ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: step === i ? 600 : 500,
                  color: step >= i ? "#1e293b" : "#94a3b8",
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: step > i ? "#16a34a" : "#f1f5f9",
                  borderRadius: 99,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 0 && (
        <>
          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <Database size={18} style={{ color: "#2563eb" }} />
              <h2
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#1e293b",
                }}
              >
                Anggaran Master CAPEX
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                background: "#f1f5f9",
                borderRadius: 8,
                padding: 4,
                gap: 4,
                marginBottom: 20,
              }}
            >
              {[
                ["existing", "Pilih Master Tersimpan"],
                ["new", "Tambah Master Baru"],
              ].map(([v, lbl]) => (
                <button
                  key={v}
                  style={{
                    ...TOGGLE,
                    flex: 1,
                    justifyContent: "center",
                    ...(masterMode === v
                      ? {
                          background: "white",
                          color: "#2563eb",
                          boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                        }
                      : {}),
                  }}
                  onClick={() => {
                    setMasterMode(v);
                    setSelKd("");
                  }}
                >
                  {v === "existing" ? <Search size={14} /> : <Plus size={14} />}{" "}
                  {lbl}
                </button>
              ))}
            </div>
            {masterMode === "existing" && (
              <Fld label="Nama Anggaran Master" required>
                <select
                  style={{ ...INP, cursor: "pointer" }}
                  value={selKd}
                  onChange={(e) => setSelKd(e.target.value)}
                >
                  <option value="">-- Pilih Master --</option>
                  {capexMasters.map((m) => (
                    <option key={m.kd} value={m.kd}>
                      {m.nm} ({m.kd})
                    </option>
                  ))}
                </select>
              </Fld>
            )}
            {masterMode === "new" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Fld label="Nama Anggaran Master" required>
                  <input
                    style={INP}
                    value={newMaster.nm}
                    onChange={(e) =>
                      setNewMaster((f) => ({ ...f, nm: e.target.value }))
                    }
                  />
                </Fld>
                <Fld label="Kode Anggaran Master" required>
                  <input
                    style={INP}
                    value={newMaster.kd}
                    onChange={(e) =>
                      setNewMaster((f) => ({ ...f, kd: e.target.value }))
                    }
                  />
                </Fld>
              </div>
            )}
          </Card>

          {isMasterResolved && (
            <Card style={{ marginTop: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <Layers size={18} style={{ color: "#2563eb" }} />
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#1e293b",
                  }}
                >
                  Pilih / Buat Anggaran CAPEX
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  background: "#f1f5f9",
                  borderRadius: 8,
                  padding: 4,
                  gap: 4,
                  marginBottom: 20,
                }}
              >
                {[
                  ["existing", "Pilih Anggaran Tersimpan"],
                  ["new", "Tambah Anggaran Baru"],
                ].map(([v, lbl]) => (
                  <button
                    key={v}
                    style={{
                      ...TOGGLE,
                      flex: 1,
                      justifyContent: "center",
                      ...(anggaranMode === v
                        ? {
                            background: "white",
                            color: "#2563eb",
                            boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                          }
                        : {}),
                    }}
                    onClick={() => setAnggaranMode(v)}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
              {anggaranMode === "existing" && (
                <>
                  <Fld label="Pilih Anggaran" required>
                    {availableCapex.length > 0 ? (
                      <select
                        style={INP}
                        value={selAnggaranId}
                        onChange={(e) => setSelAnggaranId(e.target.value)}
                      >
                        <option value="">-- Pilih Anggaran --</option>
                        {availableCapex.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nm_anggaran}
                            {c.kd_capex ? ` (${c.kd_capex})` : ""}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#ef4444",
                          background: "#fef2f2",
                          padding: 12,
                          borderRadius: 6,
                        }}
                      >
                        Belum ada anggaran. Pilih "Tambah Anggaran Baru".
                      </div>
                    )}
                  </Fld>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 24,
                    }}
                  >
                    <button
                      style={{
                        ...BTN,
                        background: "#2563eb",
                        opacity: selAnggaranId ? 1 : 0.5,
                      }}
                      disabled={!selAnggaranId}
                      onClick={() => {
                        if (
                          masterMode === "new" &&
                          !capexMasters.find((m) => m.kd === newMaster.kd)
                        )
                          setMasterList((p) => [
                            ...p,
                            {
                              kd: newMaster.kd,
                              nm: newMaster.nm,
                              tipe: "CAPEX",
                            },
                          ]);
                        setStep(1);
                      }}
                    >
                      Lanjut Kelola Daftar <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              )}
              {anggaranMode === "new" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <Fld label="Nama Anggaran CAPEX" required>
                    <input
                      style={INP}
                      value={newAnggaran.nm}
                      onChange={(e) =>
                        setNewAnggaran((f) => ({ ...f, nm: e.target.value }))
                      }
                    />
                  </Fld>
                  <Fld label="Kode CAPEX">
                    <input
                      style={INP}
                      value={newAnggaran.kd_capex}
                      onChange={(e) =>
                        setNewAnggaran((f) => ({
                          ...f,
                          kd_capex: e.target.value,
                        }))
                      }
                    />
                  </Fld>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 16,
                    }}
                  >
                    {["thn_rkap_awal", "thn_rkap_akhir", "thn_anggaran"].map(
                      (key) => (
                        <Fld
                          key={key}
                          label={key.replace(/_/g, " ").toUpperCase()}
                        >
                          <select
                            style={INP}
                            value={newAnggaran[key]}
                            onChange={(e) =>
                              setNewAnggaran((f) => ({
                                ...f,
                                [key]: e.target.value,
                              }))
                            }
                          >
                            {yearOpts.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </Fld>
                      ),
                    )}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Nilai KAD (Rp)">
                      <input
                        type="number"
                        style={INP}
                        value={newAnggaran.nilai_kad}
                        onChange={(e) =>
                          setNewAnggaran((f) => ({
                            ...f,
                            nilai_kad: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="Nilai RKAP (Rp)">
                      <input
                        type="number"
                        style={INP}
                        value={newAnggaran.nilai_rkap}
                        onChange={(e) =>
                          setNewAnggaran((f) => ({
                            ...f,
                            nilai_rkap: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 12,
                      marginTop: 16,
                    }}
                  >
                    <button
                      style={BTNOUT}
                      onClick={() => setAnggaranMode("existing")}
                    >
                      Kembali
                    </button>
                    <button
                      style={{
                        ...BTN,
                        background: "#2563eb",
                        opacity: newAnggaran.nm ? 1 : 0.5,
                      }}
                      disabled={!newAnggaran.nm}
                      onClick={handleLanjutToStep1}
                    >
                      Simpan & Lanjut <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {step === 1 && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <h2 style={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Kelola Anggaran CAPEX
            </h2>
            <button style={{ ...BTN, background: "#2563eb" }} onClick={reset}>
              <Plus size={16} /> Pilih / Tambah CAPEX Lain
            </button>
          </div>
          {!activeCapex ? (
            <Card
              style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}
            >
              Data tidak ditemukan.
            </Card>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  padding: "20px 24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "#1e293b",
                        marginBottom: 12,
                      }}
                    >
                      {activeCapex.nm_anggaran}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                        fontSize: "0.9rem",
                        color: "#64748b",
                      }}
                    >
                      <span>
                        Kode: <b>{activeCapex.kd_capex || "-"}</b>
                      </span>
                      <span>
                        Tahun: <b>{activeCapex.thn_anggaran}</b>
                      </span>
                      <span>
                        RKAP:{" "}
                        <b>
                          {activeCapex.thn_rkap_awal} -{" "}
                          {activeCapex.thn_rkap_akhir}
                        </b>
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      NILAI RKAP
                    </div>
                    <div
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "#2563eb",
                      }}
                    >
                      Rp {fmt(activeCapex.nilai_rkap)}
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        gap: 8,
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        style={{
                          ...BTNOUT,
                          padding: "6px 12px",
                          fontSize: "0.8rem",
                        }}
                        onClick={() => setEditTarget({ ...activeCapex })}
                      >
                        <Edit size={14} /> Edit Detail
                      </button>
                      <button
                        style={{
                          ...BTNOUT,
                          padding: "6px 12px",
                          fontSize: "0.8rem",
                          color: "#ef4444",
                          borderColor: "#fecaca",
                        }}
                        onClick={() =>
                          setConfirm({
                            msg: "Hapus anggaran CAPEX ini?",
                            onConfirm: () => {
                              setCapexList((p) =>
                                p.filter((c) => c.id !== activeCapex.id),
                              );
                              setConfirm(null);
                              reset();
                            },
                          })
                        }
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,.02)",
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                    padding: "16px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Layers size={18} style={{ color: "#2563eb" }} />
                    <span
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      Daftar Pekerjaan ({activeCapex.pekerjaan?.length || 0})
                    </span>
                  </div>
                  <button
                    style={{
                      ...BTN,
                      background: "#2563eb",
                      padding: "8px 14px",
                      fontSize: "0.8rem",
                    }}
                    onClick={() => openAddPkj(activeCapex.id)}
                  >
                    <Plus size={14} /> Tambah Pekerjaan
                  </button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ ...TABLE, border: "none" }}>
                    <thead>
                      <tr>
                        <th style={{ ...TH, width: 40, textAlign: "center" }}>
                          No
                        </th>
                        <th style={TH}>Nama Pekerjaan</th>
                        <th style={{ ...TH, width: 120 }}>Tgl Kontrak</th>
                        <th style={{ ...TH, width: 100 }}>Durasi</th>
                        <th style={{ ...TH, textAlign: "right" }}>
                          Nilai Kontrak
                        </th>
                        <th style={{ ...TH, textAlign: "center", width: 120 }}>
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!activeCapex.pekerjaan ||
                      activeCapex.pekerjaan.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{
                              ...TD,
                              textAlign: "center",
                              color: "#94a3b8",
                              padding: 24,
                            }}
                          >
                            Belum ada pekerjaan.
                          </td>
                        </tr>
                      ) : (
                        activeCapex.pekerjaan.map((pkj, idx) => (
                          <tr key={pkj.id}>
                            <td style={{ ...TD, textAlign: "center" }}>
                              {idx + 1}
                            </td>
                            <td
                              style={{
                                ...TD,
                                fontWeight: 500,
                                color: "#1e293b",
                              }}
                            >
                              {pkj.nm}
                            </td>
                            <td style={{ ...TD, color: "#64748b" }}>
                              {fmtDate(pkj.tgl_kontrak) || "-"}
                            </td>
                            <td style={{ ...TD, color: "#64748b" }}>
                              {pkj.durasi_kontrak
                                ? `${pkj.durasi_kontrak} hari`
                                : "-"}
                            </td>
                            <td
                              style={{
                                ...TD,
                                textAlign: "right",
                                color: "#2563eb",
                                fontWeight: 600,
                              }}
                            >
                              Rp {fmt(pkj.nilai_kontrak)}
                            </td>
                            <td style={{ ...TD, textAlign: "center" }}>
                              <div
                                style={{
                                  display: "flex",
                                  gap: 6,
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  style={ABTN}
                                  onClick={() =>
                                    setViewDetail({ cap: activeCapex, pkj })
                                  }
                                  title="Lihat Detail"
                                >
                                  <Eye size={14} style={{ color: "#2563eb" }} />
                                </button>
                                <button
                                  style={ABTN}
                                  onClick={() =>
                                    openEditPkj(activeCapex.id, pkj)
                                  }
                                  title="Edit"
                                >
                                  <Edit
                                    size={14}
                                    style={{ color: "#d97706" }}
                                  />
                                </button>
                                <button
                                  style={ABTN}
                                  title="Hapus"
                                  onClick={() =>
                                    setConfirm({
                                      msg: "Hapus pekerjaan ini?",
                                      onConfirm: () => {
                                        setCapexList((p) =>
                                          p.map((c) =>
                                            c.id === activeCapex.id
                                              ? {
                                                  ...c,
                                                  pekerjaan: c.pekerjaan.filter(
                                                    (pk) => pk.id !== pkj.id,
                                                  ),
                                                }
                                              : c,
                                          ),
                                        );
                                        setConfirm(null);
                                      },
                                    })
                                  }
                                >
                                  <Trash2
                                    size={14}
                                    style={{ color: "#ef4444" }}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {showPkj && (
            <div style={OVS} onClick={() => setShowPkj(false)}>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  width: "100%",
                  maxWidth: 650,
                  maxHeight: "90vh",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    padding: 20,
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 style={{ fontWeight: 600 }}>
                    {pkjEditId ? "Edit Pekerjaan" : "Tambah Pekerjaan"}
                  </h3>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPkj(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <Fld label="Nama Pekerjaan" required>
                    <textarea
                      rows={2}
                      style={INP}
                      value={pkjForm.nm}
                      onChange={(e) =>
                        setPkjForm((f) => ({ ...f, nm: e.target.value }))
                      }
                    />
                  </Fld>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Nilai RAB (Rp)">
                      <input
                        type="number"
                        style={INP}
                        value={pkjForm.nilai_rab}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            nilai_rab: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="Nilai Kontrak (Rp)">
                      <input
                        type="number"
                        style={INP}
                        value={pkjForm.nilai_kontrak}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            nilai_kontrak: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Nomor PR">
                      <input
                        style={INP}
                        value={pkjForm.no_pr}
                        onChange={(e) =>
                          setPkjForm((f) => ({ ...f, no_pr: e.target.value }))
                        }
                      />
                    </Fld>
                    <Fld label="Nomor PO">
                      <input
                        style={INP}
                        value={pkjForm.no_po}
                        onChange={(e) =>
                          setPkjForm((f) => ({ ...f, no_po: e.target.value }))
                        }
                      />
                    </Fld>
                    <Fld label="Nomor Kontrak">
                      <input
                        style={INP}
                        value={pkjForm.no_kontrak}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            no_kontrak: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Tanggal Kontrak">
                      <input
                        type="date"
                        style={INP}
                        value={pkjForm.tgl_kontrak}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            tgl_kontrak: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="Durasi (Hari)">
                      <input
                        type="number"
                        style={INP}
                        value={pkjForm.durasi_kontrak}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            durasi_kontrak: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="Tanggal BAMK">
                      <input
                        type="date"
                        style={INP}
                        value={pkjForm.tgl_bamk}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            tgl_bamk: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Nomor SP3">
                      <input
                        style={INP}
                        value={pkjForm.no_sp3}
                        onChange={(e) =>
                          setPkjForm((f) => ({ ...f, no_sp3: e.target.value }))
                        }
                      />
                    </Fld>
                    <Fld label="Tanggal SP3">
                      <input
                        type="date"
                        style={INP}
                        value={pkjForm.tgl_sp3}
                        onChange={(e) =>
                          setPkjForm((f) => ({ ...f, tgl_sp3: e.target.value }))
                        }
                      />
                    </Fld>
                  </div>
                  <Fld label="Keterangan">
                    <textarea
                      rows={2}
                      style={INP}
                      value={pkjForm.keterangan}
                      onChange={(e) =>
                        setPkjForm((f) => ({
                          ...f,
                          keterangan: e.target.value,
                        }))
                      }
                    />
                  </Fld>
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    borderTop: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 12,
                  }}
                >
                  <button style={BTNOUT} onClick={() => setShowPkj(false)}>
                    Batal
                  </button>
                  <button
                    style={{ ...BTN, opacity: pkjForm.nm ? 1 : 0.5 }}
                    disabled={!pkjForm.nm}
                    onClick={handleSavePkj}
                  >
                    Simpan Pekerjaan
                  </button>
                </div>
              </div>
            </div>
          )}
          {editTarget && (
            <div style={OVS} onClick={() => setEditTarget(null)}>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  padding: 24,
                  maxWidth: 500,
                  width: "100%",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 style={{ fontWeight: 600, marginBottom: 20 }}>
                  Edit Info CAPEX
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <Fld label="Nama Anggaran CAPEX">
                    <input
                      style={INP}
                      value={editTarget.nm_anggaran}
                      onChange={(e) =>
                        setEditTarget((t) => ({
                          ...t,
                          nm_anggaran: e.target.value,
                        }))
                      }
                    />
                  </Fld>
                  <Fld label="Kode CAPEX">
                    <input
                      style={INP}
                      value={editTarget.kd_capex}
                      onChange={(e) =>
                        setEditTarget((t) => ({
                          ...t,
                          kd_capex: e.target.value,
                        }))
                      }
                    />
                  </Fld>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 12,
                    }}
                  >
                    {["thn_rkap_awal", "thn_rkap_akhir", "thn_anggaran"].map(
                      (key) => (
                        <Fld
                          key={key}
                          label={key.replace(/_/g, " ").toUpperCase()}
                        >
                          <select
                            style={INP}
                            value={editTarget[key]}
                            onChange={(e) =>
                              setEditTarget((t) => ({
                                ...t,
                                [key]: e.target.value,
                              }))
                            }
                          >
                            {yearOpts.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </Fld>
                      ),
                    )}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    <Fld label="Nilai KAD (Rp)">
                      <input
                        type="number"
                        style={INP}
                        value={editTarget.nilai_kad}
                        onChange={(e) =>
                          setEditTarget((t) => ({
                            ...t,
                            nilai_kad: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="Nilai RKAP (Rp)">
                      <input
                        type="number"
                        style={INP}
                        value={editTarget.nilai_rkap}
                        onChange={(e) =>
                          setEditTarget((t) => ({
                            ...t,
                            nilai_rkap: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 24,
                    justifyContent: "flex-end",
                  }}
                >
                  <button style={BTNOUT} onClick={() => setEditTarget(null)}>
                    Batal
                  </button>
                  <button style={BTN} onClick={saveEditCapex}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════
export default function App() {
  const [tipe, setTipe] = useState(null);
  const [masterList, setMasterList] = useState(MASTER_LIST_INIT);
  const [capexList, setCapexList] = useState(INIT_CAPEX_FORM);

  const BTNOUT_HOME = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    background: "white",
    color: "#334155",
    fontSize: "0.85rem",
    fontWeight: 500,
    cursor: "pointer",
    marginBottom: 20,
  };

  if (tipe === "OPEX") {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <style>{CSS_BM}</style>
        <style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;font-family:'Plus Jakarta Sans',system-ui,sans-serif!important;}body{-webkit-font-smoothing:antialiased;}`}</style>
        <div style={{ padding: "2rem", maxWidth: 1400, margin: "0 auto" }}>
          <button style={BTNOUT_HOME} onClick={() => setTipe(null)}>
            <ArrowLeft size={16} /> Pilih Menu Utama
          </button>
          <OpexModule masterList={masterList} setMasterList={setMasterList} />
        </div>
      </div>
    );
  }

  if (tipe === "CAPEX") {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <style>{CSS_BM}</style>
        <style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;font-family:'Plus Jakarta Sans',system-ui,sans-serif!important;}body{-webkit-font-smoothing:antialiased;}`}</style>
        <div style={{ padding: "2rem" }}>
          <button style={BTNOUT_HOME} onClick={() => setTipe(null)}>
            <ArrowLeft size={16} /> Pilih Menu Utama
          </button>
          <CapexModule
            capexList={capexList}
            setCapexList={setCapexList}
            masterList={masterList}
            setMasterList={setMasterList}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif",
      }}
    >
      <style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{-webkit-font-smoothing:antialiased;}`}</style>
      <div style={{ maxWidth: 700, width: "100%", padding: "0 24px" }}>
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            padding: 24,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: "#f1f5f9",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Database size={24} style={{ color: "#475569" }} />
          </div>
          <div>
            <h1
              style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e293b" }}
            >
              Sistem Pembuatan Anggaran
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4 }}>
              Pilih modul anggaran yang akan dikelola.
            </p>
          </div>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {[
            {
              tipe: "OPEX",
              icon: <Package size={24} style={{ color: "#16a34a" }} />,
              bg: "#dcfce7",
              color: "#16a34a",
              sub: "Anggaran Operasional",
              count: `${masterList.filter((m) => m.tipe === "OPEX").length} pos anggaran master`,
            },
            {
              tipe: "CAPEX",
              icon: <FileText size={24} style={{ color: "#2563eb" }} />,
              bg: "#dbeafe",
              color: "#2563eb",
              sub: "Anggaran Investasi & Pekerjaan",
              count: `${masterList.filter((m) => m.tipe === "CAPEX").length} pos anggaran master`,
            },
          ].map((item) => (
            <div
              key={item.tipe}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 24,
                cursor: "pointer",
                transition: "all .2s",
                boxShadow: "0 1px 3px rgba(0,0,0,.02)",
              }}
              onClick={() => setTipe(item.tipe)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.02)";
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#1e293b",
                  marginBottom: 6,
                }}
              >
                {item.tipe}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  marginBottom: 12,
                }}
              >
                {item.sub}
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
