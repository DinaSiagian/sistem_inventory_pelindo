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
  PlusCircle,
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

const CURRENT_YEAR = new Date().getFullYear(); // 2026

function pctColor(p) {
  if (p >= 100) return "#ef4444";
  if (p >= 80) return "#f59e0b";
  if (p >= 50) return "#3b82f6";
  return "#22c55e";
}
function pctMeta(p) {
  if (p >= 100)
    return { label: "Over Budget", bg: "#fef2f2", fg: "#dc2626", border: "#fecaca" };
  if (p >= 80)
    return { label: "Near Limit", bg: "#fffbeb", fg: "#d97706", border: "#fde68a" };
  if (p >= 50)
    return { label: "On Track", bg: "#eff6ff", fg: "#2563eb", border: "#bfdbfe" };
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
  { kd: "5060700000", nm: "Beban Sumber Daya Pihak Ketiga Peralatan", tipe: "OPEX" },
  { kd: "5900100000", nm: "Beban Investasi", tipe: "CAPEX" },
];

const INIT_OPEX_MASTERS = [
  {
    id: "OPX-M-1", kd: "5030905000", nama: "Beban Pemeliharaan Software",
    thn_anggaran: 2026, nilai_anggaran: 350000000,
    realisasi_tahunan: [
      {
        id: uid(), thn: 2026, realisasi_murni: 900000000, realisasi_bymhd: 100000000,
        history: [
          { id: uid(), tgl: "2026-01-01", tipe: "initial", nilai: 900000000, is_initial: true, keterangan: "Input awal murni" },
          { id: uid(), tgl: "2026-01-02", tipe: "bymhd", nilai: 100000000, is_initial: false, keterangan: "Input awal BYMHD" },
        ],
      },
    ],
  },
  {
    id: "OPX-M-2", kd: "5021300000", nama: "Beban Jaringan dan Koneksi Data",
    thn_anggaran: 2026, nilai_anggaran: 288000000,
    realisasi_tahunan: [
      {
        id: uid(), thn: 2026, realisasi_murni: 240000000, realisasi_bymhd: 0,
        history: [{ id: uid(), tgl: "2026-01-05", tipe: "initial", nilai: 240000000, is_initial: true, keterangan: "Input awal murni" }],
      },
    ],
  },
  { id: "OPX-M-3", kd: "5021200000", nama: "Beban Perlengkapan Kantor", thn_anggaran: 2026, nilai_anggaran: 120000000, realisasi_tahunan: [] },
  {
    id: "OPX-M-4", kd: "5081500000", nama: "Beban Jasa Konsultan",
    thn_anggaran: 2026, nilai_anggaran: 800000000,
    realisasi_tahunan: [
      {
        id: uid(), thn: 2026, realisasi_murni: 150000000, realisasi_bymhd: 0,
        history: [{ id: uid(), tgl: "2026-03-01", tipe: "initial", nilai: 150000000, is_initial: true, keterangan: "Konsultan IT Masterplan" }],
      },
    ],
  },
  { id: "OPX-M-5", kd: "5060700000", nama: "Beban Sumber Daya Pihak Ketiga Peralatan", thn_anggaran: 2026, nilai_anggaran: 900000000, realisasi_tahunan: [] },
  {
    id: "OPX-M-6", kd: "5030906000", nama: "Beban Pemeliharaan Hardware",
    thn_anggaran: 2026, nilai_anggaran: 450000000,
    realisasi_tahunan: [
      {
        id: uid(), thn: 2026, realisasi_murni: 25000000, realisasi_bymhd: 0,
        history: [{ id: uid(), tgl: "2026-02-20", tipe: "initial", nilai: 25000000, is_initial: true, keterangan: "Maintenance Server Dell R750" }],
      },
    ],
  },
  { id: "OPX-M-7", kd: "5021400000", nama: "Beban Lisensi dan Subskripsi", thn_anggaran: 2026, nilai_anggaran: 300000000, realisasi_tahunan: [] },
];

// ── Data CAPEX lengkap dari Excel ──
const INIT_CAPEX_FORM = [
  {
    id: "CAP-F-1", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Implementasi dan Standarisasi IT Infrastruktur",
    kd_capex: "2440015", thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [],
    pekerjaan: [
      {
        id: "PKJ-001",
        nm: "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur PT Pelindo Multi Terminal",
        nilai_rab: 0, nilai_kontrak: 0, no_pr: "", no_po: "6440000026",
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24", tgl_kontrak: "2024-08-12",
        durasi_kontrak: 90, no_sp3: "", tgl_sp3: "", tgl_bamk: "2024-08-02", keterangan: "",
      },
    ],
    history_anggaran: [],
  },
  {
    id: "CAP-F-2", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Penyediaan Network di Branch SPMT",
    kd_capex: "2440014", thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
  },
  {
    id: "CAP-F-3", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
    kd_capex: "2440013", thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
  },
  {
    id: "CAP-F-4", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC Transformasi pada Branch SPMT)",
    kd_capex: "2440020", thn_rkap_awal: 2024, thn_rkap_akhir: 2025, thn_anggaran: 2025,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
  },
  {
    id: "CAP-F-5", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    kd_capex: "2540011", thn_rkap_awal: 2025, thn_rkap_akhir: 2026, thn_anggaran: 2025,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
  },
  {
    id: "CAP-F-6", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    kd_capex: "2540012", thn_rkap_awal: 2025, thn_rkap_akhir: 2026, thn_anggaran: 2025,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
  },
  {
    id: "CAP-F-7", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Penyiapan Infrastruktur IT pada Kegiatan Roro",
    kd_capex: "2540010", thn_rkap_awal: 2025, thn_rkap_akhir: 2026, thn_anggaran: 2025,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
  },
  {
    id: "CAP-F-8", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    kd_capex: "2540011", thn_rkap_awal: 2025, thn_rkap_akhir: 2027, thn_anggaran: 2026,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
  },
  {
    id: "CAP-F-9", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    kd_capex: "2540012", thn_rkap_awal: 2026, thn_rkap_akhir: 2027, thn_anggaran: 2026,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
  },
  {
    id: "CAP-F-10", kd_master: "5900100000", nm_master: "Beban Investasi",
    nm_anggaran: "Penyiapan Infrastruktur IT pada Kegiatan Roro",
    kd_capex: "2540010", thn_rkap_awal: 2025, thn_rkap_akhir: 2026, thn_anggaran: 2026,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: [], history_anggaran: [],
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
  position: "fixed", inset: 0, background: "rgba(15,23,42,.4)",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9000, padding: 20,
};
const BTN = {
  display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px",
  borderRadius: 6, border: "none", background: "#2563eb", color: "white",
  fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
};
const BTNOUT = {
  display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px",
  borderRadius: 6, border: "1px solid #cbd5e1", background: "white",
  color: "#334155", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
};
const INP = {
  padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: 6,
  fontSize: "0.85rem", color: "#1e293b", outline: "none", width: "100%", background: "white",
};
const LBL = {
  fontSize: "0.75rem", fontWeight: 700, letterSpacing: ".5px",
  color: "#475569", textTransform: "uppercase",
};
const TABLE = { width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" };
const TH = {
  padding: "12px 14px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700,
  color: "#475569", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase",
  letterSpacing: ".4px", background: "#f8fafc",
};
const TD = {
  padding: "12px 14px", verticalAlign: "middle",
  borderBottom: "1px solid #e2e8f0", color: "#334155",
};
const ABTN = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  padding: 5, borderRadius: 4, border: "1px solid #e2e8f0", background: "white", cursor: "pointer",
};

// ── Left-right row style for inline form layout ──
const LR_ROW = {
  display: "flex", alignItems: "center", gap: 0,
  borderBottom: "1px solid #f1f5f9", minHeight: 52,
};
const LR_LABEL = {
  flexShrink: 0, width: 220, padding: "12px 16px",
  fontSize: "0.72rem", fontWeight: 700, color: "#64748b",
  textTransform: "uppercase", letterSpacing: "0.5px",
  background: "#f8fafc", alignSelf: "stretch",
  display: "flex", alignItems: "center",
  borderRight: "1px solid #f1f5f9",
};
const LR_VALUE = {
  flex: 1, padding: "10px 16px",
  display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8,
};

// ── Left-right row style for MODAL forms (wider label for readability) ──
const MLR_ROW = {
  display: "flex", alignItems: "stretch",
  borderBottom: "1px solid #f1f5f9",
  minHeight: 56,
};
const MLR_LABEL = {
  flexShrink: 0, width: 180, padding: "14px 16px",
  fontSize: "0.72rem", fontWeight: 700, color: "#64748b",
  textTransform: "uppercase", letterSpacing: "0.5px",
  background: "#f8fafc", borderRight: "1px solid #f1f5f9",
  display: "flex", alignItems: "center",
};
const MLR_VALUE = {
  flex: 1, padding: "12px 16px",
  display: "flex", flexDirection: "column", justifyContent: "center", gap: 4,
};

const MASTER_ACCENT_COLORS = [
  { border: "#2563eb", headerBg: "#eff6ff", headerBorder: "#bfdbfe", badge: "#dbeafe", badgeText: "#1d4ed8", dot: "#2563eb" },
  { border: "#16a34a", headerBg: "#f0fdf4", headerBorder: "#bbf7d0", badge: "#dcfce7", badgeText: "#15803d", dot: "#16a34a" },
  { border: "#d97706", headerBg: "#fffbeb", headerBorder: "#fde68a", badge: "#fef3c7", badgeText: "#b45309", dot: "#d97706" },
  { border: "#7c3aed", headerBg: "#f5f3ff", headerBorder: "#ddd6fe", badge: "#ede9fe", badgeText: "#6d28d9", dot: "#7c3aed" },
  { border: "#0891b2", headerBg: "#ecfeff", headerBorder: "#a5f3fc", badge: "#cffafe", badgeText: "#0e7490", dot: "#0891b2" },
  { border: "#db2777", headerBg: "#fdf2f8", headerBorder: "#fbcfe8", badge: "#fce7f3", badgeText: "#be185d", dot: "#db2777" },
  { border: "#65a30d", headerBg: "#f7fee7", headerBorder: "#d9f99d", badge: "#ecfccb", badgeText: "#4d7c0f", dot: "#65a30d" },
];

function getMasterAccent(globalIdx) {
  return MASTER_ACCENT_COLORS[globalIdx % MASTER_ACCENT_COLORS.length];
}

// ════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ════════════════════════════════════════════════════════════════
function ToastMsg({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast"><CheckCircle size={14} /> {msg}</div>
  );
}

function ConfirmBox({ msg, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="cbox" onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 48, height: 48, background: "#fff7ed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}>
          <AlertTriangle size={24} />
        </div>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)" }}>{msg}</p>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={onCancel}>Batal</button>
          <button className="btn" style={{ flex: 1, justifyContent: "center", background: "var(--red)", color: "#fff" }} onClick={onConfirm}>
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
      <label style={LBL}>{label}{required && <span style={{ color: "#ef4444" }}> *</span>}</label>
      {children}
      {helper && <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{helper}</span>}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: "white", borderRadius: 10, border: "1px solid #e2e8f0", padding: "1.4rem", boxShadow: "0 1px 2px rgba(0,0,0,.02)", ...style }}>
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CAPEX MODAL FORM ROW — reusable left-right row for modals
// ════════════════════════════════════════════════════════════════
function ModalFormRow({ label, required, helper, children, noBorder }) {
  return (
    <div style={{ ...MLR_ROW, borderBottom: noBorder ? "none" : "1px solid #f1f5f9" }}>
      <div style={MLR_LABEL}>
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
      </div>
      <div style={MLR_VALUE}>
        {children}
        {helper && (
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{helper}</span>
        )}
      </div>
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
    let real = null, bymhd = null, jumlah = 0;
    if (isInitial) { real = h.nilai; jumlah = h.nilai; }
    else if (h.tipe === "penambahan") { bymhd = h.nilai; jumlah = h.nilai; }
    else if (h.tipe === "pengurangan") { real = -h.nilai; jumlah = -h.nilai; }
    else if (h.tipe === "bymhd" || h.tipe === "transfer") { bymhd = h.nilai; jumlah = h.nilai; }
    const meta = isInitial ? TIPE_META.initial : TIPE_META[h.tipe] || { label: h.tipe, color: "#475569", bg: "#f1f5f9" };
    return { ...h, real, bymhd, jumlah, meta };
  });
  const grandTotal = rows.reduce((acc, r) => acc + (r.jumlah || 0), 0);
  return (
    <div style={OVS} onClick={onClose}>
      <div style={{ background: "white", borderRadius: 12, width: "100%", maxWidth: 720, maxHeight: "85vh", display: "flex", flexDirection: "column", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <History size={18} style={{ color: "#2563eb" }} />
              <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "#1e293b" }}>Riwayat Perubahan {lbl}</h3>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}><b>{title}</b> — Tahun {row.thn}</div>
          </div>
          <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onClick={onClose}><X size={20} /></button>
        </div>
        <div style={{ overflowY: "auto", padding: "16px", flex: 1 }}>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8", fontSize: "0.85rem" }}>Belum ada riwayat.</div>
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
                    <td style={{ ...TD, color: "#64748b" }}>{fmtDate(h.tgl)}</td>
                    <td style={TD}>
                      <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 8px", borderRadius: 4, fontSize: "0.75rem", fontWeight: 600, background: h.meta.bg, color: h.meta.color }}>{h.meta.label}</span>
                      {h.keterangan && <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 4 }}>{h.keterangan}</div>}
                    </td>
                    <td style={{ ...TD, textAlign: "right", color: h.real === null ? "#cbd5e1" : h.real < 0 ? "#ef4444" : "#16a34a" }}>
                      {h.real !== null ? <>{h.real < 0 ? "−" : ""}{fmt(Math.abs(h.real))}</> : "—"}
                    </td>
                    <td style={{ ...TD, textAlign: "right", color: "#d97706" }}>
                      {h.bymhd !== null ? fmt(h.bymhd) : <span style={{ color: "#cbd5e1" }}>—</span>}
                    </td>
                    <td style={{ ...TD, textAlign: "right", fontWeight: 600, color: (h.jumlah || 0) < 0 ? "#ef4444" : "#1e293b" }}>
                      {h.jumlah < 0 ? "−" : ""}{fmt(Math.abs(h.jumlah || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: "#f8fafc" }}>
                  <td colSpan={5} style={{ ...TD, textAlign: "right", fontWeight: 600, color: "#475569" }}>TOTAL {lbl.toUpperCase()} SAAT INI</td>
                  <td style={{ ...TD, textAlign: "right", fontWeight: 700, color: grandTotal < 0 ? "#ef4444" : "#2563eb", fontSize: "0.9rem" }}>
                    {grandTotal < 0 ? "−" : ""}Rp {fmt(Math.abs(grandTotal))}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
        <div style={{ padding: "16px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end" }}>
          <button style={BTNOUT} onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// INLINE EDIT FIELDS
// ════════════════════════════════════════════════════════════════
function InlineEditField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const handleSave = () => { onSave(val); setEditing(false); };
  return (
    <tr>
      <td style={{ ...TD, width: 220, fontWeight: 600, fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", background: "#f8fafc" }}>{label}</td>
      <td style={{ ...TD }}>
        {editing ? <input style={{ ...INP, width: "100%", maxWidth: 320 }} value={val} onChange={(e) => setVal(e.target.value)} autoFocus />
          : <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>{value}</span>}
      </td>
      <td style={{ ...TD, width: 100, textAlign: "right" }}>
        {editing ? (
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button style={{ ...BTN, background: "#16a34a", padding: "5px 12px", fontSize: "0.78rem" }} onClick={handleSave}><CheckCircle size={13} /> Simpan</button>
            <button style={{ ...BTNOUT, padding: "5px 10px", fontSize: "0.78rem" }} onClick={() => { setVal(value); setEditing(false); }}><X size={13} /></button>
          </div>
        ) : (
          <button style={{ ...ABTN, color: "#d97706", borderColor: "#fde68a", background: "#fffbeb" }} onClick={() => setEditing(true)} title="Edit">
            <Pencil size={13} style={{ color: "#d97706" }} />
            <span style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 600 }}>Edit</span>
          </button>
        )}
      </td>
    </tr>
  );
}

function InlineEditYearField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const handleSave = () => { onSave(parseInt(val)); setEditing(false); };
  return (
    <tr>
      <td style={{ ...TD, width: 220, fontWeight: 600, fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", background: "#f8fafc" }}>{label}</td>
      <td style={{ ...TD }}>
        {editing ? (
          <select style={{ ...INP, width: "100%", maxWidth: 160 }} value={val} onChange={(e) => setVal(e.target.value)} autoFocus>
            {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        ) : <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>{value}</span>}
      </td>
      <td style={{ ...TD, width: 100, textAlign: "right" }}>
        {editing ? (
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button style={{ ...BTN, background: "#16a34a", padding: "5px 12px", fontSize: "0.78rem" }} onClick={handleSave}><CheckCircle size={13} /> Simpan</button>
            <button style={{ ...BTNOUT, padding: "5px 10px", fontSize: "0.78rem" }} onClick={() => { setVal(value); setEditing(false); }}><X size={13} /></button>
          </div>
        ) : (
          <button style={{ ...ABTN, color: "#d97706", borderColor: "#fde68a", background: "#fffbeb" }} onClick={() => setEditing(true)} title="Edit">
            <Pencil size={13} style={{ color: "#d97706" }} />
            <span style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 600 }}>Edit</span>
          </button>
        )}
      </td>
    </tr>
  );
}

function InlineEditCurrencyField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const handleSave = () => { onSave(parseFloat(val) || 0); setEditing(false); };
  return (
    <tr>
      <td style={{ ...TD, width: 220, fontWeight: 600, fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", background: "#f8fafc" }}>{label}</td>
      <td style={{ ...TD }}>
        {editing ? (
          <div>
            <input type="number" style={{ ...INP, width: "100%", maxWidth: 320 }} value={val} onChange={(e) => setVal(e.target.value)} autoFocus />
            {parseFloat(val) > 0 && <div style={{ marginTop: 4, fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(val)}</div>}
          </div>
        ) : <span style={{ fontWeight: 800, color: "#2563eb", fontSize: "0.95rem" }}>{fmt(value)}</span>}
      </td>
      <td style={{ ...TD, width: 100, textAlign: "right" }}>
        {editing ? (
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button style={{ ...BTN, background: "#16a34a", padding: "5px 12px", fontSize: "0.78rem" }} onClick={handleSave}><CheckCircle size={13} /> Simpan</button>
            <button style={{ ...BTNOUT, padding: "5px 10px", fontSize: "0.78rem" }} onClick={() => { setVal(value); setEditing(false); }}><X size={13} /></button>
          </div>
        ) : (
          <button style={{ ...ABTN, color: "#d97706", borderColor: "#fde68a", background: "#fffbeb" }} onClick={() => setEditing(true)} title="Edit">
            <Pencil size={13} style={{ color: "#d97706" }} />
            <span style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 600 }}>Edit</span>
          </button>
        )}
      </td>
    </tr>
  );
}

// ════════════════════════════════════════════════════════════════
// EDIT REALISASI — REVISED: left-right layout
// ════════════════════════════════════════════════════════════════
function EditRealisasiSection({ row, masterNama, onBack, onSave, onUpdateRow }) {
  const [tipe, setTipe] = useState("");
  const [nilai, setNilai] = useState("");
  const [ket, setKet] = useState("");

  const TIPE_OPTIONS = [
    { value: "penambahan", label: "Penambahan Realisasi", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
    { value: "pengurangan", label: "Pengurangan Realisasi", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
    { value: "bymhd", label: "BYMHD", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
    { value: "transfer", label: "Transfer Realisasi", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
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
    const newEntry = { id: uid(), tgl: today, tipe, nilai: parseFloat(nilai) || 0, keterangan: ket, is_initial: false };
    onSave(row.id, newEntry, tipe, parseFloat(nilai) || 0);
  };

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden", marginTop: 12 }}>
      {/* Top info table — unchanged */}
      <table style={{ ...TABLE, border: "none" }}>
        <thead>
          <tr>
            <th style={{ ...TH, width: 220 }}>FIELD</th>
            <th style={TH}>NILAI</th>
            <th style={{ ...TH, width: 100, textAlign: "right" }}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          <InlineEditField label="Nama Anggaran Master" value={masterNama} onSave={(v) => onUpdateRow && onUpdateRow({ masterNama: v })} />
          <InlineEditYearField label="Tahun Realisasi" value={row.thn} onSave={(v) => onUpdateRow && onUpdateRow({ thn: v })} />
          <InlineEditCurrencyField label="Total Realisasi Berjalan" value={currentTotal} onSave={(v) => onUpdateRow && onUpdateRow({ overrideTotal: v })} />
        </tbody>
      </table>

      {/* ── REVISED: Jenis Perubahan — left label, right dropdown ── */}
      <div style={{ borderTop: "1px solid #e2e8f0", background: "#fafafa" }}>
        {/* Row: Jenis Perubahan */}
        <div style={LR_ROW}>
          <div style={LR_LABEL}>
            Jenis Perubahan <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>
          </div>
          <div style={{ ...LR_VALUE, flexWrap: "wrap", gap: 8 }}>
            <select
              style={{
                ...INP,
                width: "auto",
                minWidth: 220,
                maxWidth: 340,
                background: tipe ? (() => {
                  const opt = TIPE_OPTIONS.find(o => o.value === tipe);
                  return opt ? opt.bg : "white";
                })() : "white",
                color: tipe ? (() => {
                  const opt = TIPE_OPTIONS.find(o => o.value === tipe);
                  return opt ? opt.color : "#334155";
                })() : "#334155",
                border: tipe ? (() => {
                  const opt = TIPE_OPTIONS.find(o => o.value === tipe);
                  return opt ? `2px solid ${opt.color}` : "1px solid #cbd5e1";
                })() : "1px solid #cbd5e1",
                fontWeight: tipe ? 700 : 400,
              }}
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
            >
              <option value="">— Pilih Jenis Perubahan —</option>
              {TIPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row: Nilai Perubahan */}
        <div style={LR_ROW}>
          <div style={LR_LABEL}>
            Nilai Perubahan (IDR) <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>
          </div>
          <div style={{ ...LR_VALUE, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
            <input
              type="number"
              style={{ ...INP, maxWidth: 340, width: "100%" }}
              placeholder="Contoh: 50000000"
              value={nilai}
              onChange={(e) => setNilai(e.target.value)}
            />
            {parseFloat(nilai) > 0 && (
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(nilai)}</span>
            )}
          </div>
        </div>

        {/* Row: Keterangan */}
        <div style={{ ...LR_ROW, borderBottom: "none" }}>
          <div style={LR_LABEL}>
            Keterangan <span style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 500, textTransform: "none", letterSpacing: 0, marginLeft: 4 }}>(opsional)</span>
          </div>
          <div style={LR_VALUE}>
            <input
              style={{ ...INP, maxWidth: 400, width: "100%" }}
              placeholder="Catatan perubahan..."
              value={ket}
              onChange={(e) => setKet(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div style={{ padding: "12px 18px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button style={{ ...BTNOUT, fontSize: "0.82rem" }} onClick={onBack}>Batal</button>
        <button
          style={{ ...BTN, background: "#ea580c", opacity: !tipe || !nilai ? 0.5 : 1, padding: "9px 18px", borderRadius: 8 }}
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
  const emptyForm = { thn: new Date().getFullYear(), realisasi_murni: "", realisasi_bymhd: "" };
  const [form, setForm] = useState(emptyForm);
  const list = master.realisasi_tahunan || [];

  const handleSaveNew = () => {
    const today = new Date().toISOString().split("T")[0];
    const payload = {
      id: uid(), thn: parseInt(form.thn),
      realisasi_murni: parseFloat(form.realisasi_murni) || 0,
      realisasi_bymhd: parseFloat(form.realisasi_bymhd) || 0,
      history: [
        { id: uid(), tgl: today, tipe: "initial", nilai: parseFloat(form.realisasi_murni) || 0, keterangan: "Input awal murni", is_initial: true },
        ...(parseFloat(form.realisasi_bymhd) > 0 ? [{ id: uid(), tgl: today, tipe: "bymhd", nilai: parseFloat(form.realisasi_bymhd) || 0, keterangan: "Input awal BYMHD", is_initial: false }] : []),
      ],
    };
    setMasters((prev) => prev.map((m) => m.id === master.id ? { ...m, realisasi_tahunan: [...(m.realisasi_tahunan || []), payload] } : m));
    toast_("Data realisasi tahunan ditambahkan.");
    setShowForm(false);
    setForm(emptyForm);
  };

  const handleSavePerubahan = (rowId, newHistoryEntry, tipe, nilai) => {
    setMasters((prev) => prev.map((m) => {
      if (m.id !== master.id) return m;
      return {
        ...m,
        realisasi_tahunan: (m.realisasi_tahunan || []).map((r) => {
          if (r.id !== rowId) return r;
          let newMurni = r.realisasi_murni;
          let newBymhd = r.realisasi_bymhd || 0;
          if (tipe === "pengurangan") newMurni -= nilai;
          else if (tipe === "penambahan" || tipe === "bymhd" || tipe === "transfer") newBymhd += nilai;
          return { ...r, realisasi_murni: newMurni, realisasi_bymhd: newBymhd, history: [...(r.history || []), newHistoryEntry] };
        }),
      };
    }));
    toast_("Perubahan realisasi disimpan.");
    setEditRowId(null);
  };

  const handleUpdateRow = (rowId, changes) => {
    setMasters((prev) => prev.map((m) => {
      if (m.id !== master.id) return m;
      let updatedMaster = { ...m };
      if (changes.masterNama !== undefined) updatedMaster.nama = changes.masterNama;
      return {
        ...updatedMaster,
        realisasi_tahunan: (m.realisasi_tahunan || []).map((r) => {
          if (r.id !== rowId) return r;
          let updated = { ...r };
          if (changes.thn !== undefined) updated.thn = changes.thn;
          if (changes.overrideTotal !== undefined) {
            const today = new Date().toISOString().split("T")[0];
            const selisih = changes.overrideTotal - (r.realisasi_murni + (r.realisasi_bymhd || 0));
            const tipeEntry = selisih >= 0 ? "penambahan" : "pengurangan";
            const nilaiEntry = Math.abs(selisih);
            updated.realisasi_murni = changes.overrideTotal;
            updated.realisasi_bymhd = 0;
            updated.history = [...(r.history || []), { id: uid(), tgl: new Date().toISOString().split("T")[0], tipe: tipeEntry, nilai: nilaiEntry, keterangan: "Edit langsung total realisasi berjalan", is_initial: false }];
          }
          return updated;
        }),
      };
    }));
    toast_("Data berhasil diperbarui.");
  };

  const handleDelete = (rowId) => {
    setConfirm({
      msg: "Hapus data realisasi tahunan ini?",
      onConfirm: () => {
        setMasters((prev) => prev.map((m) => m.id === master.id ? { ...m, realisasi_tahunan: (m.realisasi_tahunan || []).filter((r) => r.id !== rowId) } : m));
        setConfirm(null);
        toast_("Data realisasi dihapus.");
      },
    });
  };

  const grandTotal = list.reduce((a, r) => a + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0), 0);

  return (
    <div style={{ marginTop: 0 }}>
      {confirm && <ConfirmBox msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
      {historyRow && <HistoryPopup row={historyRow} title={master.nama} onClose={() => setHistoryRow(null)} lbl="Realisasi" />}

      {showForm && (
        <div style={OVS} onClick={() => setShowForm(false)}>
          <div style={{ background: "white", borderRadius: 12, padding: 24, maxWidth: 420, width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: "1rem" }}>Input Realisasi Tahunan</h3>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2 }}>{master.nama}</div>
              </div>
              <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Tahun Realisasi" required>
                <select style={INP} value={form.thn} onChange={(e) => setForm((f) => ({ ...f, thn: e.target.value }))}>
                  {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </Fld>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Fld label="Realisasi Murni (Rp)" required>
                  <input type="number" style={INP} placeholder="0" value={form.realisasi_murni} onChange={(e) => setForm((f) => ({ ...f, realisasi_murni: e.target.value }))} />
                </Fld>
                <Fld label="Realisasi BYMHD (Rp)">
                  <input type="number" style={INP} placeholder="0" value={form.realisasi_bymhd} onChange={(e) => setForm((f) => ({ ...f, realisasi_bymhd: e.target.value }))} />
                </Fld>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button style={BTNOUT} onClick={() => setShowForm(false)}>Batal</button>
              <button style={{ ...BTN, background: "#16a34a", opacity: form.realisasi_murni ? 1 : 0.5 }} disabled={!form.realisasi_murni} onClick={handleSaveNew}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Calendar size={14} style={{ color: "#16a34a" }} />
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151" }}>Daftar Realisasi Tahunan</span>
          <span style={{ fontSize: "0.72rem", color: "#64748b", background: "#e2e8f0", padding: "1px 7px", borderRadius: 99, fontWeight: 600 }}>{list.length} tahun</span>
        </div>
        <button style={{ ...BTN, background: "#16a34a", padding: "6px 12px", fontSize: "0.75rem" }} onClick={() => setShowForm(true)}>
          <Plus size={12} /> Input Realisasi Baru
        </button>
      </div>

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
            <tr><td colSpan={6} style={{ ...TD, textAlign: "center", color: "#94a3b8", padding: 24, fontSize: "0.82rem", background: "#fafafa", fontStyle: "italic" }}>Belum ada data realisasi tahunan.</td></tr>
          ) : (
            list.map((row, idx) => {
              const total = (row.realisasi_murni || 0) + (row.realisasi_bymhd || 0);
              return (
                <React.Fragment key={row.id}>
                  <tr style={{ background: editRowId === row.id ? "#fffbeb" : "white" }}>
                    <td style={{ ...TD, textAlign: "center", fontSize: "0.72rem", color: "#94a3b8", fontWeight: 700 }}>{idx + 1}</td>
                    <td style={{ ...TD, textAlign: "center", fontWeight: 700, color: "#0f172a" }}>{row.thn}</td>
                    <td style={{ ...TD, textAlign: "right", fontWeight: 600, color: "#475569" }}>{fmt(row.realisasi_murni)}</td>
                    <td style={{ ...TD, textAlign: "right", fontWeight: 600, color: "#d97706" }}>{fmt(row.realisasi_bymhd)}</td>
                    <td style={{ ...TD, textAlign: "right", fontWeight: 700, color: "#16a34a" }}>{fmt(total)}</td>
                    <td style={{ ...TD, textAlign: "center" }}>
                      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                        <button style={ABTN} title="Edit / Revisi" onClick={() => setEditRowId(editRowId === row.id ? null : row.id)}><Edit size={12} style={{ color: "#d97706" }} /></button>
                        <button style={ABTN} title="Riwayat" onClick={() => setHistoryRow({ ...row })}><History size={12} style={{ color: "#2563eb" }} /></button>
                        <button style={ABTN} title="Hapus" onClick={() => handleDelete(row.id)}><Trash2 size={12} style={{ color: "#ef4444" }} /></button>
                      </div>
                    </td>
                  </tr>
                  {editRowId === row.id && (
                    <tr>
                      <td colSpan={6} style={{ padding: "0 16px 16px", background: "#fffbeb", borderBottom: "1px solid #e2e8f0" }}>
                        <EditRealisasiSection row={row} masterNama={master.nama} onBack={() => setEditRowId(null)} onSave={handleSavePerubahan} onUpdateRow={(changes) => handleUpdateRow(row.id, changes)} />
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
              <td colSpan={4} style={{ ...TD, textAlign: "right", fontWeight: 700, color: "#15803d", fontSize: "0.75rem" }}>GRAND TOTAL</td>
              <td style={{ ...TD, textAlign: "right", fontWeight: 800, color: "#15803d", fontSize: "0.88rem" }}>{fmt(grandTotal)}</td>
              <td style={TD} />
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// OPEX MODULE — REVISED FILTER FLOW
// ════════════════════════════════════════════════════════════════
function OpexModule({ masterList, setMasterList }) {
  const [masters, setMasters] = useState(INIT_OPEX_MASTERS);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [showAddMaster, setShowAddMaster] = useState(false);
  const [editMaster, setEditMaster] = useState(null);

  const [filterThnFrom, setFilterThnFrom] = useState("");
  const [filterThnTo, setFilterThnTo] = useState("");
  const [filterNama, setFilterNama] = useState("");

  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const emptyMasterForm = { nama: "", kd: "", thn_anggaran: new Date().getFullYear(), nilai_anggaran: "" };
  const [addForm, setAddForm] = useState(emptyMasterForm);

  const handleAddMaster = () => {
    if (!addForm.nama || !addForm.nilai_anggaran) return;
    const newM = { id: uid(), kd: addForm.kd || uid(), nama: addForm.nama, thn_anggaran: parseInt(addForm.thn_anggaran), nilai_anggaran: parseFloat(addForm.nilai_anggaran) || 0, realisasi_tahunan: [] };
    setMasters((p) => [...p, newM]);
    toast_("Anggaran master baru ditambahkan.");
    setShowAddMaster(false);
    setAddForm(emptyMasterForm);
  };

  const handleSaveEditMaster = () => {
    if (!editMaster) return;
    setMasters((p) => p.map((m) => m.id === editMaster.id ? { ...m, nama: editMaster.nama, thn_anggaran: parseInt(editMaster.thn_anggaran), nilai_anggaran: parseFloat(editMaster.nilai_anggaran) || 0 } : m));
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

  const namaOptions = useMemo(() => {
    const yearFrom = filterThnFrom ? parseInt(filterThnFrom) : null;
    const yearTo = filterThnTo ? parseInt(filterThnTo) : null;
    const pool = masters.filter((m) => {
      if (yearFrom && m.thn_anggaran < yearFrom) return false;
      if (yearTo && m.thn_anggaran > yearTo) return false;
      return true;
    });
    const seen = new Set();
    return pool.map((m) => ({ id: m.id, nama: m.nama, kd: m.kd })).filter((item) => { if (seen.has(item.nama)) return false; seen.add(item.nama); return true; }).sort((a, b) => a.nama.localeCompare(b.nama));
  }, [masters, filterThnFrom, filterThnTo]);

  useEffect(() => {
    if (filterNama && filterNama !== "SEMUA" && !namaOptions.find((o) => o.nama === filterNama)) {
      setFilterNama("");
    }
  }, [namaOptions]);

  const filteredMasters = useMemo(() => {
    setCurrentPage(1);
    if (!filterNama) return [];
    return masters.filter((m) => {
      if (filterThnFrom && m.thn_anggaran < parseInt(filterThnFrom)) return false;
      if (filterThnTo && m.thn_anggaran > parseInt(filterThnTo)) return false;
      if (filterNama !== "SEMUA" && m.nama !== filterNama) return false;
      return true;
    });
  }, [masters, filterThnFrom, filterThnTo, filterNama]);

  const kpiBase = useMemo(() => {
    if (filterNama) return filteredMasters;
    return masters.filter((m) => {
      if (filterThnFrom && m.thn_anggaran < parseInt(filterThnFrom)) return false;
      if (filterThnTo && m.thn_anggaran > parseInt(filterThnTo)) return false;
      return true;
    });
  }, [masters, filterThnFrom, filterThnTo, filterNama, filteredMasters]);

  const totalAnggaran = kpiBase.reduce((s, m) => s + (m.nilai_anggaran || 0), 0);
  const totalRealisasi = kpiBase.reduce((s, m) => s + (m.realisasi_tahunan || []).reduce((ss, r) => ss + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0), 0), 0);

  const totalPages = Math.ceil(filteredMasters.length / PAGE_SIZE);
  const paginatedMasters = filteredMasters.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const paginatedWithGlobalIdx = paginatedMasters.map((m) => ({ m, globalIdx: filteredMasters.findIndex((x) => x.id === m.id) }));

  const hasYearFilter = filterThnFrom || filterThnTo;
  const hasActiveFilter = filterThnFrom || filterThnTo || filterNama;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && <ToastMsg msg={toast} onDone={() => setToast(null)} />}
      {confirm && <ConfirmBox msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}

      {showAddMaster && (
        <div style={OVS} onClick={() => setShowAddMaster(false)}>
          <div style={{ background: "white", borderRadius: 12, padding: 24, maxWidth: 440, width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>Tambah Anggaran Master OPEX</h3>
              <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onClick={() => setShowAddMaster(false)}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Fld label="Nama Anggaran Master" required><input style={INP} placeholder="Contoh: Beban Pemeliharaan Software" value={addForm.nama} onChange={(e) => setAddForm((f) => ({ ...f, nama: e.target.value }))} /></Fld>
              <Fld label="Kode Anggaran"><input style={INP} placeholder="Contoh: 5030905000" value={addForm.kd} onChange={(e) => setAddForm((f) => ({ ...f, kd: e.target.value }))} /></Fld>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Fld label="Tahun Anggaran" required>
                  <select style={INP} value={addForm.thn_anggaran} onChange={(e) => setAddForm((f) => ({ ...f, thn_anggaran: e.target.value }))}>
                    {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </Fld>
                <Fld label="Nilai Anggaran (Rp)" required><input type="number" style={INP} placeholder="0" value={addForm.nilai_anggaran} onChange={(e) => setAddForm((f) => ({ ...f, nilai_anggaran: e.target.value }))} /></Fld>
              </div>
              {parseFloat(addForm.nilai_anggaran) > 0 && <div style={{ fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(addForm.nilai_anggaran)}</div>}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
              <button style={BTNOUT} onClick={() => setShowAddMaster(false)}>Batal</button>
              <button style={{ ...BTN, background: "#16a34a", opacity: addForm.nama && addForm.nilai_anggaran ? 1 : 0.5 }} disabled={!addForm.nama || !addForm.nilai_anggaran} onClick={handleAddMaster}><Plus size={14} /> Tambahkan</button>
            </div>
          </div>
        </div>
      )}

      {editMaster && (
        <div style={OVS} onClick={() => setEditMaster(null)}>
          <div style={{ background: "white", borderRadius: 12, padding: 24, maxWidth: 440, width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>Edit Anggaran Master</h3>
              <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onClick={() => setEditMaster(null)}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Fld label="Nama Anggaran Master" required><input style={INP} value={editMaster.nama} onChange={(e) => setEditMaster((m) => ({ ...m, nama: e.target.value }))} /></Fld>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Fld label="Tahun Anggaran">
                  <select style={INP} value={editMaster.thn_anggaran} onChange={(e) => setEditMaster((m) => ({ ...m, thn_anggaran: e.target.value }))}>
                    {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </Fld>
                <Fld label="Nilai Anggaran (Rp)"><input type="number" style={INP} value={editMaster.nilai_anggaran} onChange={(e) => setEditMaster((m) => ({ ...m, nilai_anggaran: e.target.value }))} /></Fld>
              </div>
              {parseFloat(editMaster.nilai_anggaran) > 0 && <div style={{ fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(editMaster.nilai_anggaran)}</div>}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
              <button style={BTNOUT} onClick={() => setEditMaster(null)}>Batal</button>
              <button style={{ ...BTN, background: "#16a34a" }} onClick={handleSaveEditMaster}><Save size={14} /> Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {[
          { label: filterNama && filterNama !== "SEMUA" ? "Total Anggaran (dipilih)" : "Total Anggaran", val: fmt(totalAnggaran), color: "#2563eb", bg: "#eff6ff" },
          { label: filterNama && filterNama !== "SEMUA" ? "Total Realisasi (dipilih)" : "Total Realisasi", val: fmt(totalRealisasi), color: "#d97706", bg: "#fffbeb" },
          { label: "Sisa Anggaran", val: fmt(totalAnggaran - totalRealisasi), color: totalRealisasi > totalAnggaran ? "#dc2626" : "#16a34a", bg: totalRealisasi > totalAnggaran ? "#fef2f2" : "#f0fdf4" },
          { label: "Total Pos Master", val: `${masters.length} item`, color: "#475569", bg: "#f8fafc" },
        ].map((item) => (
          <div key={item.label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", boxShadow: "0 1px 2px rgba(0,0,0,.03)" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontSize: "1rem", fontWeight: 800, color: item.color }}>{item.val}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Database size={17} style={{ color: "#16a34a" }} />
            <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>Daftar Anggaran Master OPEX</span>
            <span style={{ fontSize: "0.72rem", background: "#dcfce7", color: "#16a34a", fontWeight: 700, padding: "2px 8px", borderRadius: 99, border: "1px solid #bbf7d0" }}>{masters.length} pos</span>
          </div>
          <button style={{ ...BTN, background: "#16a34a", padding: "8px 14px", fontSize: "0.78rem" }} onClick={() => setShowAddMaster(true)}><Plus size={13} /> Tambah Anggaran Master</button>
        </div>

        <div style={{ padding: "20px 24px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <Search size={14} style={{ color: "#64748b" }} />Filter & Pencarian
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 160, paddingTop: 8 }}>
                <Calendar size={15} style={{ color: "#64748b" }} />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", whiteSpace: "nowrap" }}>Tahun Anggaran</span>
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontStyle: "italic", fontWeight: 500 }}>(opsional)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500, whiteSpace: "nowrap" }}>Dari</span>
                  <select style={{ ...INP, width: 130, padding: "8px 12px", fontSize: "0.85rem", background: filterThnFrom ? "#eff6ff" : "#ffffff", border: filterThnFrom ? "1px solid #bfdbfe" : "1px solid #cbd5e1", color: filterThnFrom ? "#1d4ed8" : "#334155", fontWeight: filterThnFrom ? 600 : 400, cursor: "pointer" }} value={filterThnFrom} onChange={(e) => setFilterThnFrom(e.target.value)}>
                    <option value="">— Semua —</option>
                    {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div style={{ width: 16, height: 2, background: hasYearFilter ? "#bfdbfe" : "#cbd5e1", borderRadius: 99, flexShrink: 0 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500, whiteSpace: "nowrap" }}>Sampai</span>
                  <select style={{ ...INP, width: 130, padding: "8px 12px", fontSize: "0.85rem", background: filterThnTo ? "#eff6ff" : "#ffffff", border: filterThnTo ? "1px solid #bfdbfe" : "1px solid #cbd5e1", color: filterThnTo ? "#1d4ed8" : "#334155", fontWeight: filterThnTo ? 600 : 400, cursor: "pointer" }} value={filterThnTo} onChange={(e) => setFilterThnTo(e.target.value)}>
                    <option value="">— Semua —</option>
                    {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 160, paddingTop: 8 }}>
                <Search size={15} style={{ color: "#64748b" }} />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", whiteSpace: "nowrap" }}>Pos Anggaran</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, flexWrap: "wrap" }}>
                <select style={{ ...INP, maxWidth: 480, padding: "9px 12px", fontSize: "0.85rem", background: filterNama ? "#f0fdf4" : "#ffffff", border: filterNama ? "1px solid #bbf7d0" : "1px solid #cbd5e1", color: filterNama ? "#15803d" : "#334155", fontWeight: filterNama ? 600 : 400, cursor: "pointer" }} value={filterNama} onChange={(e) => { setFilterNama(e.target.value); setCurrentPage(1); }}>
                  <option value="">{namaOptions.length === 0 ? "— Tidak ada pos pada rentang tahun ini —" : `— Pilih Pos Anggaran (${namaOptions.length} tersedia) —`}</option>
                  {namaOptions.length > 0 && <option value="SEMUA">— Tampilkan Semua Pos Anggaran —</option>}
                  {namaOptions.map((item) => <option key={item.id} value={item.nama}>{item.nama}</option>)}
                </select>
              </div>
            </div>
            {hasActiveFilter && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: 8, paddingTop: 16, borderTop: "1px dashed #cbd5e1" }}>
                <button style={{ ...BTNOUT, padding: "8px 14px", fontSize: "0.8rem", color: "#ef4444", borderColor: "#fecaca", background: "#fef2f2" }} onClick={() => { setFilterThnFrom(""); setFilterThnTo(""); setFilterNama(""); }}>
                  <X size={14} /> Reset Semua Filter
                </button>
              </div>
            )}
          </div>
        </div>

        {!filterNama && (
          <div style={{ padding: "32px 24px", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Search size={24} style={{ color: "#16a34a" }} />
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#374151", marginBottom: 8 }}>Pilih pos anggaran untuk melihat detail</div>
            <div style={{ fontSize: "0.82rem", color: "#94a3b8" }}>Gunakan dropdown "Pos Anggaran" di atas, atau filter tahun terlebih dahulu.</div>
          </div>
        )}
      </div>

      {filterNama && (
        <>
          {filteredMasters.length === 0 ? (
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "0.88rem" }}>
              Tidak ada anggaran master {filterNama !== "SEMUA" ? `dengan nama "${filterNama}"` : ""} pada rentang tahun yang dipilih.
            </div>
          ) : (
            <>
              {paginatedWithGlobalIdx.map(({ m, globalIdx }) => {
                const totalR = (m.realisasi_tahunan || []).reduce((s, r) => s + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0), 0);
                const pct = m.nilai_anggaran > 0 ? Math.round((totalR / m.nilai_anggaran) * 100) : 0;
                const pc = pctColor(pct);
                const pmeta = pctMeta(pct);
                const accent = getMasterAccent(globalIdx);
                return (
                  <div key={m.id} style={{ background: "white", borderLeft: `5px solid ${accent.border}`, border: `1px solid ${accent.headerBorder}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
                    <div style={{ background: accent.headerBg, borderBottom: `1px solid ${accent.headerBorder}`, padding: "14px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1 }}>
                          <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: accent.badge, border: `1px solid ${accent.headerBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", color: accent.badgeText, flexShrink: 0, marginTop: 2 }}>{globalIdx + 1}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.95rem", lineHeight: 1.3, marginBottom: 6 }}>{m.nama}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: accent.badgeText, background: accent.badge, padding: "2px 8px", borderRadius: 4, border: `1px solid ${accent.headerBorder}`, fontWeight: 700 }}>{m.kd}</span>
                              <span style={{ fontSize: "0.72rem", color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>TA {m.thn_anggaran}</span>
                              <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: pmeta.bg, color: pmeta.fg, border: `1px solid ${pmeta.border}` }}>{pmeta.label}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                          <div style={{ textAlign: "center", minWidth: 68 }}>
                            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: pc, lineHeight: 1, marginBottom: 5 }}>{pct}%</div>
                            <div style={{ width: 68, height: 6, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                              <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: pc, borderRadius: 99 }} />
                            </div>
                            <div style={{ fontSize: "0.62rem", color: "#94a3b8", marginTop: 3, fontWeight: 600 }}>TERPAKAI</div>
                          </div>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button style={{ ...ABTN, padding: "6px 10px", background: "#fffbeb", borderColor: "#fde68a" }} title="Edit Master" onClick={() => setEditMaster({ ...m })}><Edit size={13} style={{ color: "#d97706" }} /></button>
                            <button style={{ ...ABTN, padding: "6px 10px", background: "#fef2f2", borderColor: "#fecaca" }} title="Hapus" onClick={() => handleDeleteMaster(m.id)}><Trash2 size={13} style={{ color: "#ef4444" }} /></button>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 14, padding: "12px 0 0", borderTop: `1px dashed ${accent.headerBorder}` }}>
                        {[
                          { label: "Nilai Anggaran", val: fmt(m.nilai_anggaran), color: accent.badgeText },
                          { label: "Total Realisasi", val: fmt(totalR), color: "#d97706" },
                          { label: "Sisa Anggaran", val: fmt(m.nilai_anggaran - totalR), color: totalR > m.nilai_anggaran ? "#dc2626" : "#16a34a" },
                        ].map((item) => (
                          <div key={item.label}>
                            <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{item.label}</div>
                            <div style={{ fontSize: "0.9rem", fontWeight: 800, color: item.color }}>{item.val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <RealisasiSection master={masters.find((x) => x.id === m.id) || m} setMasters={setMasters} toast_={toast_} />
                  </div>
                );
              })}
              {totalPages > 1 && (
                <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Menampilkan <b>{(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredMasters.length)}</b> dari <b>{filteredMasters.length}</b></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button style={{ ...ABTN, padding: "6px 12px", opacity: currentPage === 1 ? 0.4 : 1 }} disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}><ChevronRight size={14} style={{ transform: "rotate(180deg)", color: "#475569" }} /></button>
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
                      <button key={pg} onClick={() => setCurrentPage(pg)} style={{ width: 32, height: 32, borderRadius: 6, border: pg === currentPage ? "2px solid #16a34a" : "1px solid #e2e8f0", background: pg === currentPage ? "#16a34a" : "white", color: pg === currentPage ? "white" : "#475569", fontWeight: pg === currentPage ? 700 : 500, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{pg}</button>
                    ))}
                    <button style={{ ...ABTN, padding: "6px 12px", opacity: currentPage === totalPages ? 0.4 : 1 }} disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}><ChevronRight size={14} style={{ color: "#475569" }} /></button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CAPEX — INPUT ANGGARAN PAGE — left-right layout
// ════════════════════════════════════════════════════════════════
function CapexInputAnggaranPage({ capex, onBack, onSave }) {
  const rkap_awal_opts = [CURRENT_YEAR, CURRENT_YEAR + 1];

  const [thnRkapAwal, setThnRkapAwal] = useState(
    rkap_awal_opts.includes(capex.thn_rkap_awal) ? capex.thn_rkap_awal : CURRENT_YEAR
  );
  const [nilaiKad, setNilaiKad] = useState("");
  const [nilaiRkap, setNilaiRkap] = useState("");

  const rkap_akhir_opts = thnRkapAwal === CURRENT_YEAR
    ? [CURRENT_YEAR]
    : [CURRENT_YEAR, thnRkapAwal];

  const [thnRkapAkhir, setThnRkapAkhir] = useState(rkap_akhir_opts[0]);

  useEffect(() => {
    const opts = thnRkapAwal === CURRENT_YEAR ? [CURRENT_YEAR] : [CURRENT_YEAR, thnRkapAwal];
    if (!opts.includes(thnRkapAkhir)) setThnRkapAkhir(opts[0]);
  }, [thnRkapAwal]);

  const history = capex.history_anggaran || [];

  const handleSimpan = () => {
    if (!nilaiKad && !nilaiRkap) return;
    const entry = {
      id: uid(),
      tgl: new Date().toISOString().split("T")[0],
      thn_rkap_awal: thnRkapAwal,
      thn_rkap_akhir: thnRkapAkhir,
      nilai_kad: parseFloat(nilaiKad) || 0,
      nilai_rkap: parseFloat(nilaiRkap) || 0,
    };
    onSave(capex.id, entry, parseFloat(nilaiKad) || 0, parseFloat(nilaiRkap) || 0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Back nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={BTNOUT} onClick={onBack}><ArrowLeft size={16} /> Kembali ke Daftar CAPEX</button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <PlusCircle size={18} style={{ color: "#2563eb" }} />
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b" }}>Input Anggaran CAPEX</h2>
        </div>
      </div>

      {/* Form card — all left-right */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.02)" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc", display: "flex", alignItems: "center", gap: 8 }}>
          <PlusCircle size={15} style={{ color: "#2563eb" }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}>Form Entri Anggaran Baru</span>
        </div>

        {/* Nama Anggaran */}
        <ModalFormRow label="Nama Anggaran">
          <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem", lineHeight: 1.5 }}>
            {capex.nm_anggaran}
          </span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
            {capex.kd_capex && (
              <span style={{ fontSize: "0.72rem", fontFamily: "monospace", background: "#dbeafe", color: "#1d4ed8", padding: "2px 8px", borderRadius: 4, fontWeight: 700, border: "1px solid #bfdbfe" }}>{capex.kd_capex}</span>
            )}
            <span style={{ fontSize: "0.72rem", background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
              RKAP Akhir Asal: {capex.thn_rkap_akhir}
            </span>
          </div>
        </ModalFormRow>

        {/* Tahun RKAP Awal */}
        <ModalFormRow
          label="Tahun RKAP Awal"
          required
          helper={`Pilihan: tahun berjalan (${CURRENT_YEAR}) atau P+1 (${CURRENT_YEAR + 1})`}
        >
          <select style={{ ...INP, maxWidth: 160 }} value={thnRkapAwal} onChange={(e) => setThnRkapAwal(parseInt(e.target.value))}>
            {rkap_awal_opts.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </ModalFormRow>

        {/* Tahun RKAP Akhir */}
        <ModalFormRow
          label="Tahun RKAP Akhir"
          required
          helper={thnRkapAwal === CURRENT_YEAR
            ? `Hanya ${CURRENT_YEAR} (karena RKAP awal = ${CURRENT_YEAR})`
            : `${CURRENT_YEAR} atau ${thnRkapAwal}`}
        >
          <select style={{ ...INP, maxWidth: 160 }} value={thnRkapAkhir} onChange={(e) => setThnRkapAkhir(parseInt(e.target.value))}>
            {rkap_akhir_opts.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </ModalFormRow>

        {/* Nilai KAD */}
        <ModalFormRow label="Nilai KAD (Rp)">
          <input type="number" style={{ ...INP, maxWidth: 340 }} placeholder="0" value={nilaiKad} onChange={(e) => setNilaiKad(e.target.value)} />
          {parseFloat(nilaiKad) > 0 && (
            <span style={{ fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(nilaiKad)}</span>
          )}
        </ModalFormRow>

        {/* Nilai RKAP */}
        <ModalFormRow label="Nilai RKAP (Rp)" required noBorder>
          <input type="number" style={{ ...INP, maxWidth: 340 }} placeholder="0" value={nilaiRkap} onChange={(e) => setNilaiRkap(e.target.value)} />
          {parseFloat(nilaiRkap) > 0 && (
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>≈ {fmt(nilaiRkap)}</span>
          )}
        </ModalFormRow>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button style={BTNOUT} onClick={onBack}>Batal</button>
          <button
            style={{ ...BTN, background: "#2563eb", opacity: (nilaiKad || nilaiRkap) ? 1 : 0.5, padding: "9px 20px", borderRadius: 8 }}
            disabled={!nilaiKad && !nilaiRkap}
            onClick={handleSimpan}
          >
            <Save size={15} /> Simpan Entri Anggaran
          </button>
        </div>
      </div>

      {/* History anggaran */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.02)" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc", display: "flex", alignItems: "center", gap: 8 }}>
          <History size={16} style={{ color: "#2563eb" }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}>Riwayat Entri Anggaran</span>
          <span style={{ fontSize: "0.72rem", color: "#64748b", background: "#e2e8f0", padding: "1px 7px", borderRadius: 99, fontWeight: 600 }}>{history.length} entri</span>
        </div>

        {history.length === 0 ? (
          <div style={{ padding: "32px 24px", textAlign: "center", color: "#94a3b8", fontSize: "0.85rem", fontStyle: "italic" }}>
            Belum ada riwayat entri anggaran.
          </div>
        ) : (
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
            {history.map((h, i) => (
              <div key={h.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", align: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: "#dbeafe", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.78rem", color: "#1d4ed8", flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.88rem" }}>
                      {h.thn_rkap_awal} — {h.thn_rkap_akhir}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 2 }}>{fmtDate(h.tgl)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 24, textAlign: "right" }}>
                  <div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 2 }}>Nilai KAD</div>
                    <div style={{ fontWeight: 700, color: "#2563eb", fontSize: "0.88rem" }}>{fmt(h.nilai_kad)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 2 }}>Nilai RKAP</div>
                    <div style={{ fontWeight: 700, color: "#16a34a", fontSize: "0.88rem" }}>{fmt(h.nilai_rkap)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CAPEX MODULE — with left-right modal forms
// ════════════════════════════════════════════════════════════════
function CapexModule({ capexList, setCapexList }) {
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [inputAnggaranCapex, setInputAnggaranCapex] = useState(null);

  const emptyNewCapex = {
    nm_anggaran: "", kd_capex: "",
    thn_rkap_awal: new Date().getFullYear() - 1,
    thn_rkap_akhir: new Date().getFullYear() - 1,
    thn_anggaran: new Date().getFullYear() - 1,
    nilai_kad: "", nilai_rkap: "",
  };
  const [newCapex, setNewCapex] = useState(emptyNewCapex);

  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleAddCapex = () => {
    if (!newCapex.nm_anggaran) return;
    const item = {
      id: uid(),
      kd_master: "5900100000",
      nm_master: "Beban Investasi",
      nm_anggaran: newCapex.nm_anggaran,
      kd_capex: newCapex.kd_capex,
      thn_rkap_awal: parseInt(newCapex.thn_rkap_awal),
      thn_rkap_akhir: parseInt(newCapex.thn_rkap_akhir),
      thn_anggaran: parseInt(newCapex.thn_anggaran),
      nilai_kad: parseFloat(newCapex.nilai_kad) || 0,
      nilai_rkap: parseFloat(newCapex.nilai_rkap) || 0,
      anggaran_tahunan: [],
      pekerjaan: [],
      history_anggaran: [],
    };
    setCapexList((p) => [...p, item]);
    toast_("Data CAPEX baru ditambahkan.");
    setShowAddForm(false);
    setNewCapex(emptyNewCapex);
  };

  const saveEditCapex = () => {
    if (!editTarget) return;
    setCapexList((p) => p.map((c) => c.id === editTarget.id ? {
      ...c,
      nm_anggaran: editTarget.nm_anggaran,
      kd_capex: editTarget.kd_capex,
      thn_rkap_awal: parseInt(editTarget.thn_rkap_awal),
      thn_rkap_akhir: parseInt(editTarget.thn_rkap_akhir),
      thn_anggaran: parseInt(editTarget.thn_anggaran),
      nilai_kad: parseFloat(editTarget.nilai_kad) || 0,
      nilai_rkap: parseFloat(editTarget.nilai_rkap) || 0,
    } : c));
    setEditTarget(null);
    toast_("Perubahan disimpan.");
  };

  const handleDeleteCapex = (id) => {
    setConfirm({
      msg: "Hapus data CAPEX ini beserta seluruh data di dalamnya?",
      onConfirm: () => {
        setCapexList((p) => p.filter((c) => c.id !== id));
        setConfirm(null);
        toast_("Data CAPEX dihapus.");
      },
    });
  };

  const handleSaveEntriAnggaran = (capexId, entry, nilaiKad, nilaiRkap) => {
    setCapexList((p) => p.map((c) => {
      if (c.id !== capexId) return c;
      return {
        ...c,
        nilai_kad: nilaiKad,
        nilai_rkap: nilaiRkap,
        history_anggaran: [...(c.history_anggaran || []), entry],
      };
    }));
    toast_("Entri anggaran berhasil disimpan.");
    setInputAnggaranCapex((prev) => {
      if (!prev || prev.id !== capexId) return prev;
      return {
        ...prev,
        nilai_kad: nilaiKad,
        nilai_rkap: nilaiRkap,
        history_anggaran: [...(prev.history_anggaran || []), entry],
      };
    });
  };

  if (inputAnggaranCapex) {
    const latestCapex = capexList.find((c) => c.id === inputAnggaranCapex.id) || inputAnggaranCapex;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {toast && <ToastMsg msg={toast} onDone={() => setToast(null)} />}
        <CapexInputAnggaranPage
          capex={latestCapex}
          onBack={() => setInputAnggaranCapex(null)}
          onSave={handleSaveEntriAnggaran}
        />
      </div>
    );
  }

  // ── CAPEX MODAL: Tambah — left-right layout ──
  const CapexAddModal = () => (
    <div style={OVS} onClick={() => setShowAddForm(false)}>
      <div
        style={{ background: "white", borderRadius: 12, width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#f8fafc" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Plus size={16} style={{ color: "#2563eb" }} />
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>Tambah Anggaran CAPEX Baru</h3>
            </div>
            <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 3 }}>
              Master: <span style={{ fontFamily: "monospace", background: "#dbeafe", color: "#1d4ed8", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>5900100000</span> Beban Investasi
            </div>
          </div>
          <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onClick={() => setShowAddForm(false)}><X size={20} /></button>
        </div>

        {/* Form rows — left-right */}
        <div>
          {/* Nama Anggaran CAPEX */}
          <ModalFormRow label="Nama Anggaran" required>
            <textarea
              rows={2}
              style={{ ...INP, resize: "vertical", maxWidth: "100%" }}
              placeholder="Contoh: Transformasi dan Digitalisasi PT Pelindo"
              value={newCapex.nm_anggaran}
              onChange={(e) => setNewCapex((f) => ({ ...f, nm_anggaran: e.target.value }))}
            />
          </ModalFormRow>

          {/* Kode CAPEX */}
          <ModalFormRow label="Kode CAPEX">
            <input
              style={{ ...INP, maxWidth: 200 }}
              placeholder="Contoh: 2540013"
              value={newCapex.kd_capex}
              onChange={(e) => setNewCapex((f) => ({ ...f, kd_capex: e.target.value }))}
            />
          </ModalFormRow>

          {/* Tahun RKAP Awal */}
          <ModalFormRow label="Tahun RKAP Awal">
            <select
              style={{ ...INP, maxWidth: 160 }}
              value={newCapex.thn_rkap_awal}
              onChange={(e) => setNewCapex((f) => ({ ...f, thn_rkap_awal: e.target.value }))}
            >
              {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </ModalFormRow>

          {/* Tahun RKAP Akhir */}
          <ModalFormRow label="Tahun RKAP Akhir">
            <select
              style={{ ...INP, maxWidth: 160 }}
              value={newCapex.thn_rkap_akhir}
              onChange={(e) => setNewCapex((f) => ({ ...f, thn_rkap_akhir: e.target.value }))}
            >
              {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </ModalFormRow>

          {/* Tahun Anggaran */}
          <ModalFormRow label="Tahun Anggaran">
            <select
              style={{ ...INP, maxWidth: 160 }}
              value={newCapex.thn_anggaran}
              onChange={(e) => setNewCapex((f) => ({ ...f, thn_anggaran: e.target.value }))}
            >
              {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </ModalFormRow>

          {/* Nilai KAD */}
          <ModalFormRow label="Nilai KAD (Rp)">
            <input
              type="number"
              style={{ ...INP, maxWidth: 280 }}
              placeholder="0"
              value={newCapex.nilai_kad}
              onChange={(e) => setNewCapex((f) => ({ ...f, nilai_kad: e.target.value }))}
            />
            {parseFloat(newCapex.nilai_kad) > 0 && (
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(newCapex.nilai_kad)}</span>
            )}
          </ModalFormRow>

          {/* Nilai RKAP */}
          <ModalFormRow label="Nilai RKAP (Rp)" noBorder>
            <input
              type="number"
              style={{ ...INP, maxWidth: 280 }}
              placeholder="0"
              value={newCapex.nilai_rkap}
              onChange={(e) => setNewCapex((f) => ({ ...f, nilai_rkap: e.target.value }))}
            />
            {parseFloat(newCapex.nilai_rkap) > 0 && (
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(newCapex.nilai_rkap)}</span>
            )}
          </ModalFormRow>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button style={BTNOUT} onClick={() => setShowAddForm(false)}>Batal</button>
          <button
            style={{ ...BTN, background: "#2563eb", opacity: newCapex.nm_anggaran ? 1 : 0.5 }}
            disabled={!newCapex.nm_anggaran}
            onClick={handleAddCapex}
          >
            <Plus size={14} /> Tambahkan
          </button>
        </div>
      </div>
    </div>
  );

  // ── CAPEX MODAL: Edit — left-right layout ──
  const CapexEditModal = () => (
    <div style={OVS} onClick={() => setEditTarget(null)}>
      <div
        style={{ background: "white", borderRadius: 12, width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#f8fafc" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Edit size={16} style={{ color: "#d97706" }} />
            <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>Edit Anggaran CAPEX</h3>
          </div>
          <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onClick={() => setEditTarget(null)}><X size={20} /></button>
        </div>

        {/* Form rows — left-right */}
        <div>
          {/* Nama Anggaran CAPEX */}
          <ModalFormRow label="Nama Anggaran" required>
            <textarea
              rows={2}
              style={{ ...INP, resize: "vertical", maxWidth: "100%" }}
              value={editTarget.nm_anggaran}
              onChange={(e) => setEditTarget((t) => ({ ...t, nm_anggaran: e.target.value }))}
            />
          </ModalFormRow>

          {/* Kode CAPEX */}
          <ModalFormRow label="Kode CAPEX">
            <input
              style={{ ...INP, maxWidth: 200 }}
              value={editTarget.kd_capex}
              onChange={(e) => setEditTarget((t) => ({ ...t, kd_capex: e.target.value }))}
            />
          </ModalFormRow>

          {/* Tahun RKAP Awal */}
          <ModalFormRow label="Tahun RKAP Awal">
            <select
              style={{ ...INP, maxWidth: 160 }}
              value={editTarget.thn_rkap_awal}
              onChange={(e) => setEditTarget((t) => ({ ...t, thn_rkap_awal: e.target.value }))}
            >
              {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </ModalFormRow>

          {/* Tahun RKAP Akhir */}
          <ModalFormRow label="Tahun RKAP Akhir">
            <select
              style={{ ...INP, maxWidth: 160 }}
              value={editTarget.thn_rkap_akhir}
              onChange={(e) => setEditTarget((t) => ({ ...t, thn_rkap_akhir: e.target.value }))}
            >
              {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </ModalFormRow>

          {/* Tahun Anggaran */}
          <ModalFormRow label="Tahun Anggaran">
            <select
              style={{ ...INP, maxWidth: 160 }}
              value={editTarget.thn_anggaran}
              onChange={(e) => setEditTarget((t) => ({ ...t, thn_anggaran: e.target.value }))}
            >
              {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </ModalFormRow>

          {/* Nilai KAD */}
          <ModalFormRow label="Nilai KAD (Rp)">
            <input
              type="number"
              style={{ ...INP, maxWidth: 280 }}
              value={editTarget.nilai_kad}
              onChange={(e) => setEditTarget((t) => ({ ...t, nilai_kad: e.target.value }))}
            />
            {parseFloat(editTarget.nilai_kad) > 0 && (
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(editTarget.nilai_kad)}</span>
            )}
          </ModalFormRow>

          {/* Nilai RKAP */}
          <ModalFormRow label="Nilai RKAP (Rp)" noBorder>
            <input
              type="number"
              style={{ ...INP, maxWidth: 280 }}
              value={editTarget.nilai_rkap}
              onChange={(e) => setEditTarget((t) => ({ ...t, nilai_rkap: e.target.value }))}
            />
            {parseFloat(editTarget.nilai_rkap) > 0 && (
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>≈ {fmt(editTarget.nilai_rkap)}</span>
            )}
          </ModalFormRow>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button style={BTNOUT} onClick={() => setEditTarget(null)}>Batal</button>
          <button style={{ ...BTN, background: "#d97706" }} onClick={saveEditCapex}>
            <Save size={14} /> Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && <ToastMsg msg={toast} onDone={() => setToast(null)} />}
      {confirm && <ConfirmBox msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}

      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 1px 2px rgba(0,0,0,.02)" }}>
        <div style={{ width: 40, height: 40, background: "#eff6ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Database size={20} style={{ color: "#2563eb" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: "#1e293b", fontSize: "1rem" }}>Anggaran Master CAPEX</div>
          <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: 2 }}>
            <span style={{ fontFamily: "monospace", background: "#dbeafe", color: "#1d4ed8", padding: "1px 6px", borderRadius: 4, fontWeight: 700, fontSize: "0.78rem", marginRight: 8 }}>5900100000</span>
            Beban Investasi
          </div>
        </div>
        <div style={{ fontSize: "0.72rem", background: "#dbeafe", color: "#1d4ed8", fontWeight: 700, padding: "4px 10px", borderRadius: 99, border: "1px solid #bfdbfe" }}>
          {capexList.length} data CAPEX
        </div>
      </div>

      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.02)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Layers size={17} style={{ color: "#2563eb" }} />
            <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>Daftar Anggaran CAPEX</span>
          </div>
          <button style={{ ...BTN, background: "#2563eb", padding: "8px 14px", fontSize: "0.78rem" }} onClick={() => setShowAddForm(true)}>
            <Plus size={13} /> Tambah CAPEX Baru
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ ...TABLE, border: "none" }}>
            <thead>
              <tr>
                <th style={{ ...TH, width: 48, textAlign: "center" }}>NO</th>
                <th style={TH}>NAMA ANGGARAN CAPEX</th>
                <th style={{ ...TH, width: 110, textAlign: "center" }}>KD CAPEX</th>
                <th style={{ ...TH, width: 90, textAlign: "center" }}>RKAP AWAL</th>
                <th style={{ ...TH, width: 90, textAlign: "center" }}>RKAP AKHIR</th>
                <th style={{ ...TH, width: 100, textAlign: "center" }}>THN ANGGARAN</th>
                <th style={{ ...TH, width: 140, textAlign: "right" }}>NILAI KAD</th>
                <th style={{ ...TH, width: 140, textAlign: "right" }}>NILAI RKAP</th>
                <th style={{ ...TH, width: 130, textAlign: "center" }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {capexList.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ ...TD, textAlign: "center", color: "#94a3b8", padding: 32, fontStyle: "italic" }}>
                    Belum ada data CAPEX. Klik "Tambah CAPEX Baru" untuk menambahkan.
                  </td>
                </tr>
              ) : (
                capexList.map((c, idx) => {
                  const isRkapAkhirLebih = c.thn_rkap_akhir > CURRENT_YEAR;
                  return (
                    <tr key={c.id} style={{ transition: "background .12s", background: isRkapAkhirLebih ? "#fffbeb" : "white" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = isRkapAkhirLebih ? "#fef9ec" : "#f8faff"}
                      onMouseLeave={(e) => e.currentTarget.style.background = isRkapAkhirLebih ? "#fffbeb" : "white"}>
                      <td style={{ ...TD, textAlign: "center", fontWeight: 700, fontSize: "0.78rem", color: "#94a3b8" }}>{idx + 1}</td>
                      <td style={{ ...TD }}>
                        <div style={{ fontWeight: 600, color: "#1e293b", lineHeight: 1.4, fontSize: "0.88rem" }}>{c.nm_anggaran}</div>
                        {isRkapAkhirLebih && (
                          <div style={{ marginTop: 4 }}>
                            <span style={{ fontSize: "0.68rem", background: "#fef3c7", color: "#b45309", padding: "2px 6px", borderRadius: 4, fontWeight: 700, border: "1px solid #fde68a" }}>
                              ★ RKAP Akhir melewati tahun berjalan
                            </span>
                          </div>
                        )}
                      </td>
                      <td style={{ ...TD, textAlign: "center" }}>
                        {c.kd_capex ? (
                          <span style={{ fontFamily: "monospace", background: "#dbeafe", color: "#1d4ed8", padding: "3px 8px", borderRadius: 4, fontWeight: 700, fontSize: "0.8rem" }}>{c.kd_capex}</span>
                        ) : <span style={{ color: "#cbd5e1" }}>—</span>}
                      </td>
                      <td style={{ ...TD, textAlign: "center", color: "#64748b", fontWeight: 600 }}>{c.thn_rkap_awal}</td>
                      <td style={{ ...TD, textAlign: "center" }}>
                        <span style={{
                          background: isRkapAkhirLebih ? "#fef3c7" : "#f1f5f9",
                          color: isRkapAkhirLebih ? "#b45309" : "#64748b",
                          border: isRkapAkhirLebih ? "1px solid #fde68a" : "1px solid #e2e8f0",
                          padding: "3px 10px", borderRadius: 99, fontWeight: 700, fontSize: "0.78rem"
                        }}>{c.thn_rkap_akhir}</span>
                      </td>
                      <td style={{ ...TD, textAlign: "center" }}>
                        <span style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", padding: "3px 10px", borderRadius: 99, fontWeight: 700, fontSize: "0.78rem" }}>{c.thn_anggaran}</span>
                      </td>
                      <td style={{ ...TD, textAlign: "right" }}>
                        {c.nilai_kad > 0
                          ? <span style={{ fontWeight: 700, color: "#2563eb", fontSize: "0.82rem" }}>{fmt(c.nilai_kad)}</span>
                          : <span style={{ color: "#cbd5e1" }}>—</span>}
                      </td>
                      <td style={{ ...TD, textAlign: "right" }}>
                        {c.nilai_rkap > 0
                          ? <span style={{ fontWeight: 700, color: "#16a34a", fontSize: "0.82rem" }}>{fmt(c.nilai_rkap)}</span>
                          : <span style={{ color: "#cbd5e1" }}>—</span>}
                      </td>
                      <td style={{ ...TD, textAlign: "center" }}>
                        <div style={{ display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap" }}>
                          {isRkapAkhirLebih && (
                            <button
                              style={{ ...ABTN, padding: "5px 8px", background: "#fffbeb", borderColor: "#fde68a", gap: 4 }}
                              title="Input Anggaran Baru"
                              onClick={() => setInputAnggaranCapex({ ...c })}
                            >
                              <PlusCircle size={13} style={{ color: "#d97706" }} />
                              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#d97706" }}>Anggaran</span>
                            </button>
                          )}
                          <button
                            style={{ ...ABTN, padding: "5px 8px", background: "#fffbeb", borderColor: "#fde68a" }}
                            title="Edit"
                            onClick={() => setEditTarget({ ...c })}
                          >
                            <Edit size={13} style={{ color: "#d97706" }} />
                          </button>
                          <button
                            style={{ ...ABTN, padding: "5px 8px", background: "#fef2f2", borderColor: "#fecaca" }}
                            title="Hapus"
                            onClick={() => handleDeleteCapex(c.id)}
                          >
                            <Trash2 size={13} style={{ color: "#ef4444" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {capexList.length > 0 && (
              <tfoot>
                <tr style={{ background: "#eff6ff" }}>
                  <td colSpan={6} style={{ ...TD, textAlign: "right", fontWeight: 700, color: "#1d4ed8", fontSize: "0.75rem" }}>TOTAL</td>
                  <td style={{ ...TD, textAlign: "right", fontWeight: 800, color: "#1d4ed8", fontSize: "0.82rem" }}>
                    {fmt(capexList.reduce((s, c) => s + (c.nilai_kad || 0), 0))}
                  </td>
                  <td style={{ ...TD, textAlign: "right", fontWeight: 800, color: "#16a34a", fontSize: "0.82rem" }}>
                    {fmt(capexList.reduce((s, c) => s + (c.nilai_rkap || 0), 0))}
                  </td>
                  <td style={TD} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {capexList.some(c => c.thn_rkap_akhir > CURRENT_YEAR) && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <AlertTriangle size={15} style={{ color: "#d97706", flexShrink: 0 }} />
          <span style={{ fontSize: "0.78rem", color: "#92400e" }}>
            Baris berwarna kuning menandakan CAPEX dengan RKAP akhir melewati tahun berjalan ({CURRENT_YEAR}). Klik tombol <b>Anggaran</b> pada baris tersebut untuk menginput data anggaran baru.
          </span>
        </div>
      )}

      {/* Render modals */}
      {showAddForm && <CapexAddModal />}
      {editTarget && <CapexEditModal />}
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
    display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px",
    borderRadius: 6, border: "1px solid #cbd5e1", background: "white", color: "#334155",
    fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", marginBottom: 20,
  };

  if (tipe === "OPEX") {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <style>{CSS_BM}</style>
        <style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;font-family:'Plus Jakarta Sans',system-ui,sans-serif!important;}body{-webkit-font-smoothing:antialiased;}`}</style>
        <div style={{ padding: "2rem", maxWidth: 1400, margin: "0 auto" }}>
          <button style={BTNOUT_HOME} onClick={() => setTipe(null)}><ArrowLeft size={16} /> Pilih Menu Utama</button>
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
        <div style={{ padding: "2rem", maxWidth: 1400, margin: "0 auto" }}>
          <button style={BTNOUT_HOME} onClick={() => setTipe(null)}><ArrowLeft size={16} /> Pilih Menu Utama</button>
          <CapexModule capexList={capexList} setCapexList={setCapexList} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{-webkit-font-smoothing:antialiased;}`}</style>
      <div style={{ maxWidth: 700, width: "100%", padding: "0 24px" }}>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24, marginBottom: 24, display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ width: 48, height: 48, background: "#f1f5f9", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Database size={24} style={{ color: "#475569" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e293b" }}>Sistem Pembuatan Anggaran</h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4 }}>Pilih modul anggaran yang akan dikelola.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { tipe: "OPEX", icon: <Package size={24} style={{ color: "#16a34a" }} />, bg: "#dcfce7", color: "#16a34a", sub: "Anggaran Operasional", count: `${masterList.filter((m) => m.tipe === "OPEX").length} pos anggaran master` },
            { tipe: "CAPEX", icon: <FileText size={24} style={{ color: "#2563eb" }} />, bg: "#dbeafe", color: "#2563eb", sub: "Anggaran Investasi & Pekerjaan", count: `${capexList.length} data CAPEX` },
          ].map((item) => (
            <div key={item.tipe}
              style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, cursor: "pointer", transition: "all .2s", boxShadow: "0 1px 3px rgba(0,0,0,.02)" }}
              onClick={() => setTipe(item.tipe)}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.07)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.02)"; }}
            >
              <div style={{ width: 50, height: 50, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1e293b", marginBottom: 6 }}>{item.tipe}</h3>
              <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 12 }}>{item.sub}</p>
              <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}