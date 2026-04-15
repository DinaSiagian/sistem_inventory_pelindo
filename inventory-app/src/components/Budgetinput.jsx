import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
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

// ── UTILS ──────────────────────────────────────────────────────
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
const uid = () => `ID-${Date.now().toString().slice(-6)}`;
const CURRENT_YEAR = new Date().getFullYear();

function pctColor(p) {
  if (p >= 100) return "#ef4444";
  if (p >= 80) return "#f59e0b";
  if (p >= 50) return "#3b82f6";
  return "#22c55e";
}

// ── DATA ───────────────────────────────────────────────────────
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
    history_anggaran: [],
  },
  {
    id: "CAP-F-2",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Penyediaan Network di Branch SPMT",
    kd_capex: "2440014",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_kad: 0,
    nilai_rkap: 0,
    anggaran_tahunan: [],
    pekerjaan: [],
    history_anggaran: [],
  },
  {
    id: "CAP-F-3",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran:
      "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
    kd_capex: "2440013",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_kad: 0,
    nilai_rkap: 0,
    anggaran_tahunan: [],
    pekerjaan: [],
    history_anggaran: [],
  },
  {
    id: "CAP-F-4",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran:
      "Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC Transformasi pada Branch SPMT)",
    kd_capex: "2440020",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2025,
    thn_anggaran: 2025,
    nilai_kad: 0,
    nilai_rkap: 0,
    anggaran_tahunan: [],
    pekerjaan: [],
    history_anggaran: [],
  },
  {
    id: "CAP-F-5",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    kd_capex: "2540011",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2025,
    nilai_kad: 0,
    nilai_rkap: 0,
    anggaran_tahunan: [],
    pekerjaan: [],
    history_anggaran: [],
  },
  {
    id: "CAP-F-6",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Pengembangan Sistem Manajemen Aset Pelindo (RKAP Lanjutan)",
    kd_capex: "2540012",
    thn_rkap_awal: 2026,
    thn_rkap_akhir: 2027,
    thn_anggaran: 2026,
    nilai_kad: 0,
    nilai_rkap: 0,
    anggaran_tahunan: [],
    pekerjaan: [],
    history_anggaran: [],
  },
];

const yearOpts = (() => {
  const a = [];
  for (let y = CURRENT_YEAR + 1; y >= 2021; y--) a.push(y);
  return a;
})();

// ── CSS ────────────────────────────────────────────────────────
const CSS_BM = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");
:root {
  --blue:#2563eb;--blue-lt:#eff6ff;--blue-mid:#dbeafe;
  --green:#16a34a;--green-lt:#f0fdf4;--green-mid:#dcfce7;
  --amber:#d97706;--amber-lt:#fffbeb;--red:#dc2626;--red-lt:#fef2f2;
  --ink:#111827;--ink2:#374151;--ink3:#6b7280;--ink4:#9ca3af;
  --border:#e5e7eb;--border-lt:#f3f4f6;--surf:#ffffff;--bg:#f9fafb;
  --r:8px;--r-lg:12px;
  --sh:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
  --sh-md:0 4px 12px rgba(0,0,0,.08);--sh-lg:0 20px 48px rgba(0,0,0,.14);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;background:var(--bg);color:var(--ink);font-size:13px;-webkit-font-smoothing:antialiased;line-height:1.5;}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-family:inherit;font-size:.8rem;font-weight:700;cursor:pointer;border:none;transition:all .15s;white-space:nowrap;}
.overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:900;backdrop-filter:blur(2px);padding:20px;}
.cbox{background:var(--surf);border-radius:16px;padding:24px;max-width:320px;width:100%;box-shadow:var(--sh-lg);display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center;}
.toast{position:fixed;bottom:24px;right:24px;background:var(--ink);color:#fff;padding:12px 20px;border-radius:12px;font-size:.85rem;font-weight:600;box-shadow:var(--sh-lg);display:flex;align-items:center;gap:8px;z-index:9999;}
.no-spinners::-webkit-inner-spin-button,.no-spinners::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
.no-spinners{-moz-appearance:textfield;}
@keyframes fadeOvl{from{opacity:0}to{opacity:1}}
@keyframes modalUp{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes toastIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
`;

// ── SHARED STYLES ──────────────────────────────────────────────
const S = {
  ovs: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9000,
    padding: 20,
  },
  btn: {
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
  },
  btnOut: {
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
  },
  inp: {
    padding: "10px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: 6,
    fontSize: "0.85rem",
    color: "#1e293b",
    outline: "none",
    width: "100%",
    background: "white",
  },
  lbl: {
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: ".5px",
    color: "#475569",
    textTransform: "uppercase",
  },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#475569",
    borderBottom: "1px solid #e2e8f0",
    textTransform: "uppercase",
    letterSpacing: ".4px",
    background: "#f8fafc",
  },
  td: {
    padding: "12px 14px",
    verticalAlign: "middle",
    borderBottom: "1px solid #e2e8f0",
    color: "#334155",
  },
  abtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 4,
    border: "1px solid #e2e8f0",
    background: "white",
    cursor: "pointer",
  },
  lrRow: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    borderBottom: "1px solid #f1f5f9",
    minHeight: 52,
  },
  lrLabel: {
    flexShrink: 0,
    width: 220,
    padding: "12px 16px",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background: "#f8fafc",
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #f1f5f9",
  },
  lrValue: {
    flex: 1,
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  mlrRow: {
    display: "flex",
    alignItems: "stretch",
    borderBottom: "1px solid #f1f5f9",
    minHeight: 56,
  },
  mlrLabel: {
    flexShrink: 0,
    width: 180,
    padding: "14px 16px",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background: "#f8fafc",
    borderRight: "1px solid #f1f5f9",
    display: "flex",
    alignItems: "center",
  },
  mlrValue: {
    flex: 1,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
  },
  tbl: { width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" },
};

// ── SHARED COMPONENTS ──────────────────────────────────────────
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
        <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>{msg}</p>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button
            className="btn"
            style={{
              flex: 1,
              justifyContent: "center",
              background: "white",
              border: "1px solid #e5e7eb",
              color: "#374151",
            }}
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="btn"
            style={{
              flex: 1,
              justifyContent: "center",
              background: "#dc2626",
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
      <label style={S.lbl}>
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

function ModalFormRow({ label, required, helper, children, noBorder }) {
  return (
    <div
      style={{
        ...S.mlrRow,
        borderBottom: noBorder ? "none" : "1px solid #f1f5f9",
      }}
    >
      <div style={S.mlrLabel}>
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
      </div>
      <div style={S.mlrValue}>
        {children}
        {helper && (
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
            {helper}
          </span>
        )}
      </div>
    </div>
  );
}

// ── INLINE EDIT FIELDS (unified) ───────────────────────────────
function InlineEditField({ label, value, onSave, type = "text" }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const isYear = type === "year";
  const isCurrency = type === "currency";

  const handleSave = () => {
    onSave(isCurrency ? parseFloat(val) || 0 : isYear ? parseInt(val) : val);
    setEditing(false);
  };

  const tdLabel = {
    ...S.td,
    width: 220,
    fontWeight: 600,
    fontSize: "0.72rem",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background: "#f8fafc",
  };

  return (
    <tr>
      <td style={tdLabel}>{label}</td>
      <td style={S.td}>
        {editing ? (
          <div>
            {isYear ? (
              <select
                style={{ ...S.inp, width: "100%", maxWidth: 160 }}
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
              <input
                type={isCurrency ? "number" : "text"}
                className={isCurrency ? "no-spinners" : ""}
                style={{ ...S.inp, width: "100%", maxWidth: 320 }}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                autoFocus
              />
            )}
            {isCurrency && parseFloat(val) > 0 && (
              <div
                style={{ marginTop: 4, fontSize: "0.78rem", color: "#64748b" }}
              >
                ≈ {fmt(val)}
              </div>
            )}
          </div>
        ) : (
          <span
            style={{
              fontWeight: isCurrency ? 800 : 700,
              color: isCurrency ? "#2563eb" : "#1e293b",
              fontSize: isCurrency ? "0.95rem" : "0.9rem",
            }}
          >
            {isCurrency ? fmt(value) : value}
          </span>
        )}
      </td>
      <td style={{ ...S.td, width: 100, textAlign: "right" }}>
        {editing ? (
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button
              style={{
                ...S.btn,
                background: "#16a34a",
                padding: "5px 12px",
                fontSize: "0.78rem",
              }}
              onClick={handleSave}
            >
              <CheckCircle size={13} /> Simpan
            </button>
            <button
              style={{ ...S.btnOut, padding: "5px 10px", fontSize: "0.78rem" }}
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
              ...S.abtn,
              color: "#2563eb",
              borderColor: "#bfdbfe",
              background: "#eff6ff",
              padding: "8px",
            }}
            onClick={() => setEditing(true)}
            title="Tambah Perubahan"
          >
            <Plus size={16} style={{ color: "#2563eb" }} />
          </button>
        )}
      </td>
    </tr>
  );
}

// ── HISTORY TABLE (shared inline component) ────────────────────
function InlineHistoryTable({ row, mode = "opex", onUpdateHistoryRecord, onDeleteHistoryRecord }) {
  const lbl = mode === "opex" ? "Anggaran" : "Anggaran";
  const history = row.history || [];
  const [editHistoryId, setEditHistoryId] = useState(null);
  const [editFormH, setEditFormH] = useState({ tipe: "", nilai: "", keterangan: "" });
  const TIPE_META = {
    initial: { label: "Input Awal", color: "#0284c7", bg: "#e0f2fe" },
    penambahan: { label: "Penambahan", color: "#16a34a", bg: "#dcfce7" },
    pengurangan: { label: "Pengurangan", color: "#dc2626", bg: "#fee2e2" },
    bymhd: { label: "BYMHD", color: "#d97706", bg: "#fef3c7" },
    transfer: { label: `Transfer ${lbl}`, color: "#7c3aed", bg: "#ede9fe" },
  };

  let totalReal = 0, totalBymhd = 0;
  const rows = history.map((h) => {
    const isInitial = h.is_initial || h.tipe === "initial";
    let real = null, bymhd = null, jumlah = 0;
    if (isInitial || h.tipe === "penambahan") {
      real = h.nilai;
      totalReal += h.nilai;
      jumlah = h.nilai;
    } else if (h.tipe === "pengurangan") {
      real = -h.nilai;
      totalReal -= h.nilai;
      jumlah = -h.nilai;
    } else if (h.tipe === "bymhd" || h.tipe === "transfer") {
      bymhd = h.nilai;
      totalBymhd += h.nilai;
      jumlah = h.nilai;
    }
    const meta = isInitial
      ? TIPE_META.initial
      : TIPE_META[h.tipe] || { label: h.tipe, color: "#475569", bg: "#f1f5f9" };
    return { ...h, real, bymhd, jumlah, meta };
  });

  return (
    <div style={{ marginTop: 0 }}>
      {history.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            color: "#94a3b8",
            fontSize: "0.82rem",
            fontStyle: "italic",
          }}
        >
          Belum ada riwayat.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={{ ...S.th, width: 40, textAlign: "center" }}>NO</th>
                <th style={{ ...S.th, width: 120 }}>TANGGAL</th>
                <th style={{ ...S.th, width: 160 }}>TIPE</th>
                <th style={{ ...S.th, textAlign: "right" }}>MURNI (Rp)</th>
                <th style={{ ...S.th, textAlign: "right" }}>BYMHD (Rp)</th>
                <th style={{ ...S.th, textAlign: "right" }}>JUMLAH (Rp)</th>
                <th style={{ ...S.th, textAlign: "center", width: 100 }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((h, i) => (
                <tr key={h.id}>
                  <td style={{ ...S.td, textAlign: "center" }}>{i + 1}</td>
                  <td style={{ ...S.td, color: "#64748b" }}>{fmtDate(h.tgl)}</td>
                  <td style={S.td}>
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
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 4 }}>
                        {h.keterangan}
                      </div>
                    )}
                  </td>
                  <td
                    style={{
                      ...S.td,
                      textAlign: "right",
                      color: h.real === null ? "#cbd5e1" : h.real < 0 ? "#ef4444" : "#16a34a",
                    }}
                  >
                    {h.real !== null ? (
                      <>{h.real < 0 ? "−" : ""}{fmt(Math.abs(h.real))}</>
                    ) : "—"}
                  </td>
                  <td style={{ ...S.td, textAlign: "right", color: "#d97706" }}>
                    {h.bymhd !== null ? fmt(h.bymhd) : <span style={{ color: "#cbd5e1" }}>—</span>}
                  </td>
                  <td
                    style={{
                      ...S.td,
                      textAlign: "right",
                      fontWeight: 600,
                      color: (h.jumlah || 0) < 0 ? "#ef4444" : "#1e293b",
                    }}
                  >
                    {h.jumlah < 0 ? "−" : ""}{fmt(Math.abs(h.jumlah || 0))}
                  </td>
                  <td style={{ ...S.td, textAlign: "center" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                      <button
                        style={{
                          ...S.abtn,
                          padding: "6px 10px",
                          background: "#fffbeb",
                          borderColor: "#fde68a",
                        }}
                        onClick={() => {
                          if (h.is_initial) {
                            alert("Tidak bisa edit riwayat Input Awal");
                            return;
                          }
                          setEditHistoryId(h.id);
                          setEditFormH({
                            tipe: h.tipe,
                            nilai: h.nilai,
                            keterangan: h.keterangan || "",
                          });
                        }}
                        title="Edit"
                      >
                        <Edit size={13} style={{ color: "#d97706" }} />
                      </button>
                      <button
                        style={{
                          ...S.abtn,
                          padding: "6px 10px",
                          background: "#fef2f2",
                          borderColor: "#fecaca",
                        }}
                        onClick={() => {
                          if (h.is_initial) {
                            alert("Tidak bisa hapus riwayat Input Awal");
                            return;
                          }
                          if (onDeleteHistoryRecord) {
                            onDeleteHistoryRecord(h.id);
                          }
                        }}
                        title="Hapus"
                      >
                        <Trash2 size={13} style={{ color: "#ef4444" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: "#f8fafc" }}>
                <td
                  colSpan={5}
                  style={{ ...S.td, textAlign: "right", fontWeight: 600, color: "#475569" }}
                >
                  TOTAL ANGGARAN SAAT INI
                </td>
                <td
                  style={{
                    ...S.td,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#2563eb",
                    fontSize: "0.9rem",
                  }}
                >
                  {fmt(totalReal + totalBymhd)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* EDIT HISTORY MODAL */}
      {editHistoryId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setEditHistoryId(null)}
        >
          <div
            style={{
              background: "white",
              borderRadius: 8,
              padding: "24px",
              maxWidth: 400,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: 0, marginBottom: 16, color: "#1e293b" }}>
              Edit Riwayat
            </h3>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4, color: "#475569" }}>
                Tipe Perubahan
              </label>
              <select
                value={editFormH.tipe}
                onChange={(e) =>
                  setEditFormH((f) => ({ ...f, tipe: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  fontSize: "0.8rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                }}
              >
                <option value="">Pilih tipe</option>
                <option value="penambahan">Penambahan</option>
                <option value="pengurangan">Pengurangan</option>
                <option value="bymhd">BYMHD</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4, color: "#475569" }}>
                Nilai (Rp)
              </label>
              <input
                type="number"
                value={editFormH.nilai}
                onChange={(e) =>
                  setEditFormH((f) => ({ ...f, nilai: +e.target.value || 0 }))
                }
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  fontSize: "0.8rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4, color: "#475569" }}>
                Keterangan
              </label>
              <textarea
                value={editFormH.keterangan}
                onChange={(e) =>
                  setEditFormH((f) => ({ ...f, keterangan: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  fontSize: "0.8rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  boxSizing: "border-box",
                  minHeight: 60,
                  fontFamily: "inherit",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button
                onClick={() => setEditHistoryId(null)}
                style={{
                  padding: "6px 12px",
                  fontSize: "0.8rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (onUpdateHistoryRecord) {
                    onUpdateHistoryRecord(editHistoryId, editFormH);
                  }
                  setEditHistoryId(null);
                }}
                style={{
                  padding: "6px 12px",
                  fontSize: "0.8rem",
                  border: "none",
                  borderRadius: 4,
                  background: "#d97706",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── EDIT SECTION (unified for OPEX Anggaran & CAPEX Anggaran) ─
function EditSection({
  row,
  masterNama,
  onBack,
  onSave,
  onUpdateRow,
  mode = "opex",
}) {
  const [tipe, setTipe] = useState("");
  const [nilai, setNilai] = useState("");
  const [ket, setKet] = useState("");

  const OPEX_OPTS = [
    { value: "penambahan", label: "Penambahan Anggaran", color: "#16a34a", bg: "#f0fdf4" },
    { value: "pengurangan", label: "Pengurangan Anggaran", color: "#dc2626", bg: "#fef2f2" },
    { value: "bymhd", label: "BYMHD", color: "#d97706", bg: "#fffbeb" },
    { value: "transfer", label: "Transfer Anggaran", color: "#7c3aed", bg: "#f5f3ff" },
  ];
  const CAPEX_OPTS = [
    { value: "penambahan", label: "Penambahan", color: "#16a34a", bg: "#f0fdf4" },
    { value: "pengurangan", label: "Pengurangan", color: "#dc2626", bg: "#fef2f2" },
  ];
  const OPTS = mode === "opex" ? OPEX_OPTS : CAPEX_OPTS;

  const currentTotal = (row.history || []).reduce((acc, h) => {
    if (h.is_initial || h.tipe === "initial") return acc + h.nilai;
    if (h.tipe === "penambahan") return acc + h.nilai;
    if (h.tipe === "pengurangan") return acc - h.nilai;
    if (h.tipe === "bymhd" || h.tipe === "transfer") return acc + h.nilai;
    return acc;
  }, 0);

  const handleSubmit = () => {
    if (!tipe || !nilai) return;
    const newEntry = {
      id: uid(),
      tgl: new Date().toISOString().split("T")[0],
      tipe,
      nilai: parseFloat(nilai) || 0,
      keterangan: ket,
      is_initial: false,
    };
    onSave(row.id, newEntry, tipe, parseFloat(nilai) || 0);
  };

  const selOpt = OPTS.find((o) => o.value === tipe);
  const lbl = mode === "opex" ? "Nama Anggaran Master" : "Nama Anggaran CAPEX";
  const totalLbl = mode === "opex" ? "Total Anggaran Berjalan" : "Total Anggaran Berjalan";

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 12,
      }}
    >
      <table style={{ ...S.tbl, border: "none" }}>
        <thead>
          <tr>
            <th style={{ ...S.th, width: 220 }}>FIELD</th>
            <th style={S.th}>NILAI</th>
            <th style={{ ...S.th, width: 100, textAlign: "right" }}>AKSI</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <div style={{ borderTop: "1px solid #e2e8f0", background: "#fafafa" }}>
        {[
          {
            label: "Jenis Perubahan",
            required: true,
            content: (
              <select
                style={{
                  ...S.inp,
                  width: "auto",
                  minWidth: 220,
                  maxWidth: 340,
                  background: selOpt?.bg || "white",
                  color: selOpt?.color || "#334155",
                  border: tipe
                    ? `2px solid ${selOpt?.color}`
                    : "1px solid #cbd5e1",
                  fontWeight: tipe ? 700 : 400,
                }}
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
              >
                <option value="">— Pilih Jenis Perubahan —</option>
                {OPTS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ),
          },
          {
            label: "Nilai Perubahan (IDR)",
            required: true,
            content: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flex: 1,
                }}
              >
                <input
                  type="number"
                  className="no-spinners"
                  style={{ ...S.inp, width: "auto", flex: 1, maxWidth: 280 }}
                  placeholder="Contoh: 50000000"
                  value={nilai}
                  onChange={(e) => setNilai(e.target.value)}
                />
                {parseFloat(nilai) > 0 && (
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ≈ {fmt(nilai)}
                  </span>
                )}
              </div>
            ),
          },
          {
            label: "Keterangan",
            content: (
              <input
                style={{ ...S.inp, maxWidth: 400, width: "100%" }}
                placeholder="Catatan perubahan..."
                value={ket}
                onChange={(e) => setKet(e.target.value)}
              />
            ),
          },
        ].map((r, i, arr) => (
          <div
            key={r.label}
            style={{
              ...S.lrRow,
              borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none",
            }}
          >
            <div style={S.lrLabel}>
              {r.label}
              {r.required && (
                <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>
              )}
            </div>
            <div style={S.lrValue}>{r.content}</div>
          </div>
        ))}
      </div>
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
        <button style={{ ...S.btnOut, fontSize: "0.82rem" }} onClick={onBack}>
          Batal
        </button>
        <button
          style={{
            ...S.btn,
            background: mode === "opex" ? "#ea580c" : "#2563eb",
            opacity: !tipe || !nilai ? 0.5 : 1,
            padding: "9px 18px",
            borderRadius: 8,
          }}
          disabled={!tipe || !nilai}
          onClick={handleSubmit}
        >
          {mode === "opex" ? (
            <>
              <Save size={15} /> Submit Perubahan
            </>
          ) : (
            <>
              <PlusCircle size={15} /> Tambah Perubahan
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── ANGGARAN SECTION (OPEX) ────────────────────────────────────
function RealisasiSection({ master, setMasters, toast_ }) {
  const [showForm, setShowForm] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [form, setForm] = useState({
    thn: new Date().getFullYear(),
    realisasi_murni: "",
    realisasi_bymhd: "",
  });
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
    toast_("Data anggaran tahunan ditambahkan.");
    setShowForm(false);
    setForm({
      thn: new Date().getFullYear(),
      realisasi_murni: "",
      realisasi_bymhd: "",
    });
  };

  const handleSavePerubahan = (rowId, newEntry, tipe, nilai) => {
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id !== master.id) return m;
        return {
          ...m,
          realisasi_tahunan: (m.realisasi_tahunan || []).map((r) => {
            if (r.id !== rowId) return r;
            let newMurni = r.realisasi_murni,
              newBymhd = r.realisasi_bymhd || 0;
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
              history: [...(r.history || []), newEntry],
            };
          }),
        };
      }),
    );
    toast_("Perubahan anggaran disimpan.");
    setEditRowId(null);
  };

  const handleUpdateRow = (rowId, changes) => {
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id !== master.id) return m;
        let updated = { ...m };
        if (changes.masterNama !== undefined) updated.nama = changes.masterNama;
        return {
          ...updated,
          realisasi_tahunan: (m.realisasi_tahunan || []).map((r) => {
            if (r.id !== rowId) return r;
            let upd = { ...r };
            if (changes.thn !== undefined) upd.thn = changes.thn;
            if (changes.overrideTotal !== undefined) {
              const selisih =
                changes.overrideTotal -
                (r.realisasi_murni + (r.realisasi_bymhd || 0));
              upd.realisasi_murni = changes.overrideTotal;
              upd.realisasi_bymhd = 0;
              upd.history = [
                ...(r.history || []),
                {
                  id: uid(),
                  tgl: new Date().toISOString().split("T")[0],
                  tipe: selisih >= 0 ? "penambahan" : "pengurangan",
                  nilai: Math.abs(selisih),
                  keterangan: "Edit langsung total anggaran berjalan",
                  is_initial: false,
                },
              ];
            }
            return upd;
          }),
        };
      }),
    );
    toast_("Data berhasil diperbarui.");
  };

  const handleDelete = (rowId) =>
    setConfirm({
      msg: "Hapus data anggaran tahunan ini?",
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
        toast_("Data anggaran dihapus.");
      },
    });

  const handleUpdateHistoryRecord = (historyId, updates) => {
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id !== master.id) return m;
        return {
          ...m,
          realisasi_tahunan: (m.realisasi_tahunan || []).map((r) => ({
            ...r,
            history: (r.history || []).map((h) =>
              h.id === historyId ? { ...h, ...updates } : h,
            ),
          })),
        };
      }),
    );
    toast_("Riwayat diperbarui.");
  };

  const handleDeleteHistoryRecord = (historyId) => {
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id !== master.id) return m;
        return {
          ...m,
          realisasi_tahunan: (m.realisasi_tahunan || []).map((r) => ({
            ...r,
            history: (r.history || []).filter((h) => h.id !== historyId),
          })),
        };
      }),
    );
    toast_("Riwayat dihapus.");
  };

  const grandTotal = list.reduce(
    (a, r) => a + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0),
    0,
  );

  return (
    <div>
      {confirm && (
        <ConfirmBox
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {showForm && (
        <div style={S.ovs} onClick={() => setShowForm(false)}>
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
                  Input Anggaran Tahunan
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
            <div
              style={{
                border: "1px solid #f1f5f9",
                borderRadius: 8,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              <ModalFormRow label="Tahun Anggaran" required>
                <select
                  style={S.inp}
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
              </ModalFormRow>
              <ModalFormRow label="Anggaran Murni (Rp)" required>
                <input
                  type="number"
                  className="no-spinners"
                  style={S.inp}
                  placeholder="0"
                  value={form.realisasi_murni}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, realisasi_murni: e.target.value }))
                  }
                />
              </ModalFormRow>
              <ModalFormRow label="Anggaran BYMHD (Rp)" noBorder>
                <input
                  type="number"
                  className="no-spinners"
                  style={S.inp}
                  placeholder="0"
                  value={form.realisasi_bymhd}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, realisasi_bymhd: e.target.value }))
                  }
                />
              </ModalFormRow>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <button style={S.btnOut} onClick={() => setShowForm(false)}>
                Batal
              </button>
              <button
                style={{
                  ...S.btn,
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

      {/* CARD 2: Daftar Anggaran Tahunan Table */}
      <div
        style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Calendar size={14} style={{ color: "#16a34a" }} />
            <span
              style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151" }}
            >
              Daftar Anggaran Tahunan
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "#64748b",
                background: "#e2e8f0",
                padding: "1px 7px",
                borderRadius: 99,
                fontWeight: 600,
              }}
            >
              {list.length} tahun
            </span>
          </div>
          <button
            style={{
              ...S.btn,
              background: "#16a34a",
              padding: "6px 12px",
              fontSize: "0.75rem",
            }}
            onClick={() => setShowForm(true)}
          >
            <Plus size={12} /> Input Anggaran Baru
          </button>
        </div>

        <table style={{ ...S.tbl, border: "none" }}>
          <thead>
            <tr>
              <th style={{ ...S.th, width: 40, textAlign: "center" }}>NO</th>
              <th style={{ ...S.th, width: 80, textAlign: "center" }}>TAHUN</th>
              <th style={{ ...S.th, textAlign: "right" }}>ANGGARAN MURNI</th>
              <th style={{ ...S.th, textAlign: "right" }}>ANGGARAN BYMHD</th>
              <th style={{ ...S.th, textAlign: "right" }}>TOTAL ANGGARAN</th>
              <th style={{ ...S.th, textAlign: "center", width: 100 }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    ...S.td,
                    textAlign: "center",
                    color: "#94a3b8",
                    padding: 24,
                    fontSize: "0.82rem",
                    background: "#fafafa",
                    fontStyle: "italic",
                  }}
                >
                  Belum ada data anggaran tahunan.
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
                          ...S.td,
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
                          ...S.td,
                          textAlign: "center",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {row.thn}
                      </td>
                      <td
                        style={{
                          ...S.td,
                          textAlign: "right",
                          fontWeight: 600,
                          color: "#475569",
                        }}
                      >
                        {fmt(row.realisasi_murni)}
                      </td>
                      <td
                        style={{
                          ...S.td,
                          textAlign: "right",
                          fontWeight: 600,
                          color: "#d97706",
                        }}
                      >
                        {fmt(row.realisasi_bymhd)}
                      </td>
                      <td
                        style={{
                          ...S.td,
                          textAlign: "right",
                          fontWeight: 700,
                          color: "#16a34a",
                        }}
                      >
                        {fmt(total)}
                      </td>
                      <td style={{ ...S.td, textAlign: "center" }}>
                        <button
                          style={{
                            ...S.abtn,
                            color: "#2563eb",
                            borderColor: "#bfdbfe",
                            background: "#eff6ff",
                            padding: "8px",
                          }}
                          onClick={() =>
                            setEditRowId(editRowId === row.id ? null : row.id)
                          }
                          title="Tambah Jenis Perubahan"
                        >
                          <Plus size={14} style={{ color: "#2563eb" }} />
                        </button>
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
                          <EditSection
                            row={row}
                            masterNama={master.nama}
                            onBack={() => setEditRowId(null)}
                            onSave={handleSavePerubahan}
                            onUpdateRow={(changes) =>
                              handleUpdateRow(row.id, changes)
                            }
                            mode="opex"
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
                    ...S.td,
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
                    ...S.td,
                    textAlign: "right",
                    fontWeight: 800,
                    color: "#15803d",
                    fontSize: "0.88rem",
                  }}
                >
                  {fmt(grandTotal)}
                </td>
                <td style={S.td} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* PADDING AREA: Abu-abu spacing between CARD 2 and CARD 3+ */}
      {list.length > 0 && (
        <div style={{ marginTop: 0, paddingTop: 12, background: "#f5f5f5" }}>
          <div style={{ padding: "0 0 12px 0" }}>
            {list.map((row, idx) => (
              <div
                key={row.id}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  overflow: "hidden",
                  marginBottom: 12,
                  background: "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 16px",
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <History size={14} style={{ color: "#0284c7" }} />
                  <span
                    style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151" }}
                  >
                    Riwayat Perubahan Anggaran
                  </span>
                </div>
                <div style={{ padding: "16px" }}>
                  <InlineHistoryTable
                    row={row}
                    mode="opex"
                    onUpdateHistoryRecord={handleUpdateHistoryRecord}
                    onDeleteHistoryRecord={handleDeleteHistoryRecord}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── CAPEX ANGGARAN TAHUNAN SECTION ─────────────────────────────
function CapexAnggaranTahunanSection({ capex, setCapexList, toast_ }) {
  const [showForm, setShowForm] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [formError, setFormError] = useState(null);
  const [form, setForm] = useState({
    thn: new Date().getFullYear(),
    nilai_anggaran: "",
  });
  const list = capex.anggaran_tahunan || [];

  // Total child anggaran tahunan yang sudah diinput
  const totalChildAnggaran = list.reduce((sum, r) => sum + (r.nilai_anggaran || 0), 0);
  // Nilai RKAP sebagai batas atas pengisian child anggaran
  const nilaiRkapBatas = capex.nilai_rkap || 0;
  // Sisa yang masih bisa diinput
  const sisaRkapTersedia = Math.max(0, nilaiRkapBatas - totalChildAnggaran);

  const calcRealBymhd = (history) => {
    let real = 0, bymhd = 0;
    (history || []).forEach((h) => {
      if (h.is_initial || h.tipe === "initial") real += h.nilai;
      else if (h.tipe === "penambahan") bymhd += h.nilai;
      else if (h.tipe === "pengurangan") real -= h.nilai;
    });
    return { real, bymhd, total: real + bymhd };
  };

  const handleSaveNew = () => {
    setFormError(null);
    const nilaiInput = parseFloat(form.nilai_anggaran) || 0;
    if (nilaiInput <= 0) {
      setFormError("Nilai anggaran harus lebih dari 0!");
      return;
    }
    // Validasi: total child tidak boleh melebihi nilai_rkap
    if (nilaiRkapBatas > 0 && nilaiInput > sisaRkapTersedia) {
      setFormError(`Nilai anggaran melebihi sisa RKAP! Sisa: ${fmt(sisaRkapTersedia)}`);
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const payload = {
      id: uid(),
      thn: parseInt(form.thn),
      nilai_anggaran: nilaiInput,
      history: [
        {
          id: uid(),
          tgl: today,
          tipe: "initial",
          nilai: nilaiInput,
          keterangan: "Input awal",
          is_initial: true,
        },
      ],
    };
    setCapexList((prev) =>
      prev.map((c) =>
        c.id === capex.id
          ? { ...c, anggaran_tahunan: [...(c.anggaran_tahunan || []), payload] }
          : c,
      ),
    );
    toast_("Data anggaran ditambahkan.");
    setShowForm(false);
    setForm({ thn: new Date().getFullYear(), nilai_anggaran: "" });
    setFormError(null);
  };

  const handleSavePerubahan = (rowId, newEntry, tipe, nilai) => {
    setCapexList((prev) =>
      prev.map((c) => {
        if (c.id !== capex.id) return c;
        return {
          ...c,
          anggaran_tahunan: (c.anggaran_tahunan || []).map((r) => {
            if (r.id !== rowId) return r;
            let newNilai = r.nilai_anggaran;
            if (tipe === "pengurangan") newNilai -= nilai;
            else if (tipe === "penambahan") newNilai += nilai;
            return {
              ...r,
              nilai_anggaran: newNilai,
              history: [...(r.history || []), newEntry],
            };
          }),
        };
      }),
    );
    toast_("Perubahan anggaran disimpan.");
    setEditRowId(null);
  };

  const handleUpdateRow = (rowId, changes) => {
    setCapexList((prev) =>
      prev.map((c) => {
        if (c.id !== capex.id) return c;
        let updated = { ...c };
        if (changes.masterNama !== undefined)
          updated.nm_anggaran = changes.masterNama;
        return {
          ...updated,
          anggaran_tahunan: (c.anggaran_tahunan || []).map((r) => {
            if (r.id !== rowId) return r;
            let upd = { ...r };
            if (changes.thn !== undefined) upd.thn = changes.thn;
            if (changes.overrideTotal !== undefined) {
              const selisih = changes.overrideTotal - r.nilai_anggaran;
              upd.nilai_anggaran = changes.overrideTotal;
              upd.history = [
                ...(r.history || []),
                {
                  id: uid(),
                  tgl: new Date().toISOString().split("T")[0],
                  tipe: selisih >= 0 ? "penambahan" : "pengurangan",
                  nilai: Math.abs(selisih),
                  keterangan: "Edit langsung total anggaran berjalan",
                  is_initial: false,
                },
              ];
            }
            return upd;
          }),
        };
      }),
    );
    toast_("Data berhasil diperbarui.");
  };

  const handleDelete = (rowId) =>
    setConfirm({
      msg: "Hapus data anggaran tahunan ini?",
      onConfirm: () => {
        setCapexList((prev) =>
          prev.map((c) =>
            c.id === capex.id
              ? {
                ...c,
                anggaran_tahunan: (c.anggaran_tahunan || []).filter(
                  (r) => r.id !== rowId,
                ),
              }
              : c,
          ),
        );
        setConfirm(null);
        toast_("Data anggaran dihapus.");
      },
    });

  const handleUpdateHistoryRecord = (historyId, updates) => {
    setCapexList((prev) =>
      prev.map((c) => {
        if (c.id !== capex.id) return c;
        return {
          ...c,
          anggaran_tahunan: (c.anggaran_tahunan || []).map((r) => ({
            ...r,
            history: (r.history || []).map((h) =>
              h.id === historyId ? { ...h, ...updates } : h,
            ),
          })),
        };
      }),
    );
    toast_("Riwayat diperbarui.");
  };

  const handleDeleteHistoryRecord = (historyId) => {
    setCapexList((prev) =>
      prev.map((c) => {
        if (c.id !== capex.id) return c;
        return {
          ...c,
          anggaran_tahunan: (c.anggaran_tahunan || []).map((r) => ({
            ...r,
            history: (r.history || []).filter((h) => h.id !== historyId),
          })),
        };
      }),
    );
    toast_("Riwayat dihapus.");
  };

  return (
    <div style={{ padding: "0 20px 20px" }}>
      {confirm && (
        <ConfirmBox
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {showForm && (
        <div style={S.ovs} onClick={() => { setShowForm(false); setFormError(null); }}>
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
                marginBottom: 16,
              }}
            >
              <div>
                <h3 style={{ fontWeight: 600, fontSize: "1rem" }}>
                  Input Anggaran Baru
                </h3>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#64748b",
                    marginTop: 2,
                  }}
                >
                  {capex.nm_anggaran}
                </div>
              </div>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
                onClick={() => { setShowForm(false); setFormError(null); }}
              >
                <X size={20} />
              </button>
            </div>
            {/* Info sisa RKAP */}
            {nilaiRkapBatas > 0 && (
              <div
                style={{
                  background: sisaRkapTersedia <= 0 ? "#fef2f2" : "#f0fdf4",
                  border: `1px solid ${sisaRkapTersedia <= 0 ? "#fecaca" : "#bbf7d0"}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Nilai RKAP</span>
                  <span style={{ fontWeight: 700, color: "#2563eb" }}>{fmt(nilaiRkapBatas)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Sudah Terisi</span>
                  <span style={{ fontWeight: 700, color: "#d97706" }}>{fmt(totalChildAnggaran)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ fontWeight: 700, color: sisaRkapTersedia <= 0 ? "#dc2626" : "#15803d" }}>Sisa Anggaran</span>
                  <span style={{ fontWeight: 800, color: sisaRkapTersedia <= 0 ? "#dc2626" : "#15803d" }}>
                    {fmt(sisaRkapTersedia)}
                    {sisaRkapTersedia <= 0 ? " (Penuh)" : ""}
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{ height: 4, background: "#e2e8f0", borderRadius: 99, overflow: "hidden", marginTop: 4 }}>
                  <div style={{
                    height: "100%",
                    borderRadius: 99,
                    width: `${Math.min(100, nilaiRkapBatas > 0 ? (totalChildAnggaran / nilaiRkapBatas) * 100 : 0)}%`,
                    background: sisaRkapTersedia <= 0 ? "#dc2626" : "#16a34a",
                    transition: "width 0.4s ease",
                  }} />
                </div>
              </div>
            )}
            {formError && (
              <div style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 6,
                padding: "8px 12px",
                marginBottom: 12,
                fontSize: "0.82rem",
                color: "#dc2626",
                fontWeight: 500,
              }}>
                ⚠ {formError}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Tahun Anggaran" required>
                <select
                  style={S.inp}
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
              <Fld label="Nilai Anggaran (Rp)" required
                helper={nilaiRkapBatas > 0 ? `Maks. sisa: ${fmt(sisaRkapTersedia)}` : undefined}>
                <input
                  type="number"
                  className="no-spinners"
                  style={{
                    ...S.inp,
                    borderColor: formError ? "#fca5a5" : undefined,
                  }}
                  placeholder="0"
                  value={form.nilai_anggaran}
                  onChange={(e) => {
                    setFormError(null);
                    setForm((f) => ({ ...f, nilai_anggaran: e.target.value }));
                  }}
                />
                {parseFloat(form.nilai_anggaran) > 0 && (
                  <span style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 4, display: "block" }}>
                    ≈ {fmt(form.nilai_anggaran)}
                  </span>
                )}
              </Fld>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <button style={S.btnOut} onClick={() => { setShowForm(false); setFormError(null); }}>
                Batal
              </button>
              <button
                style={{
                  ...S.btn,
                  background: nilaiRkapBatas > 0 && sisaRkapTersedia <= 0 ? "#9ca3af" : "#16a34a",
                  opacity: form.nilai_anggaran ? 1 : 0.5,
                  cursor: nilaiRkapBatas > 0 && sisaRkapTersedia <= 0 ? "not-allowed" : "pointer",
                }}
                disabled={!form.nilai_anggaran || (nilaiRkapBatas > 0 && sisaRkapTersedia <= 0)}
                onClick={handleSaveNew}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          border: "1px solid #e2e8f0",
          borderRadius: "8px 8px 0 0",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Calendar size={14} style={{ color: "#2563eb" }} />
          <span
            style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151" }}
          >
            Daftar Anggaran per Tahun
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              color: "#64748b",
              background: "#e2e8f0",
              padding: "1px 7px",
              borderRadius: 99,
              fontWeight: 600,
            }}
          >
            {list.length} tahun
          </span>
          {/* Tampilkan progress pengisian RKAP */}
          {nilaiRkapBatas > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 6 }}>
                <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>Terisi:</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563eb" }}>{fmt(totalChildAnggaran)}</span>
                <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>/</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569" }}>{fmt(nilaiRkapBatas)}</span>
              </div>
              {sisaRkapTersedia <= 0 ? (
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", padding: "2px 7px", borderRadius: 6 }}>✓ PENUH</span>
              ) : (
                <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "2px 7px", borderRadius: 6 }}>Sisa: {fmt(sisaRkapTersedia)}</span>
              )}
            </div>
          )}
        </div>
        <button
          style={{
            ...S.btn,
            background: nilaiRkapBatas > 0 && sisaRkapTersedia <= 0 ? "#9ca3af" : "#2563eb",
            padding: "6px 12px",
            fontSize: "0.75rem",
            cursor: nilaiRkapBatas > 0 && sisaRkapTersedia <= 0 ? "not-allowed" : "pointer",
            opacity: nilaiRkapBatas > 0 && sisaRkapTersedia <= 0 ? 0.6 : 1,
          }}
          onClick={() => {
            if (nilaiRkapBatas > 0 && sisaRkapTersedia <= 0) return;
            setShowForm(true);
          }}
          title={nilaiRkapBatas > 0 && sisaRkapTersedia <= 0 ? "Anggaran RKAP sudah penuh" : ""}
        >
          <Plus size={12} /> Input Anggaran
        </button>
      </div>

      {/* CARD 1: Tabel Daftar Anggaran */}
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "0 0 8px 8px",
          overflow: "hidden",
        }}
      >
        <table style={{ ...S.tbl, border: "none" }}>
          <thead>
            <tr>
              <th style={{ ...S.th, width: 40, textAlign: "center" }}>NO</th>
              <th style={{ ...S.th, width: 80, textAlign: "center" }}>TAHUN</th>
              <th style={{ ...S.th, textAlign: "right" }}>REAL (Rp)</th>
              <th style={{ ...S.th, textAlign: "right" }}>BYMHD (Rp)</th>
              <th style={{ ...S.th, textAlign: "right" }}>TOTAL (Rp)</th>
              <th style={{ ...S.th, textAlign: "center", width: 100 }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    ...S.td,
                    textAlign: "center",
                    color: "#94a3b8",
                    padding: 24,
                    fontSize: "0.82rem",
                    background: "#fafafa",
                    fontStyle: "italic",
                  }}
                >
                  Belum ada data anggaran di tabel ini.
                </td>
              </tr>
            ) : (
              list.map((row, idx) => {
                const { real, bymhd, total } = calcRealBymhd(row.history);
                return (
                  <React.Fragment key={row.id}>
                    <tr
                      style={{
                        background: editRowId === row.id ? "#fffbeb" : "white",
                      }}
                    >
                      <td
                        style={{
                          ...S.td,
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
                          ...S.td,
                          textAlign: "center",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {row.thn}
                      </td>
                      <td
                        style={{
                          ...S.td,
                          textAlign: "right",
                          fontWeight: 600,
                          color: real < 0 ? "#ef4444" : "#16a34a",
                        }}
                      >
                        {fmt(Math.abs(real))}
                      </td>
                      <td
                        style={{
                          ...S.td,
                          textAlign: "right",
                          fontWeight: 600,
                          color: bymhd > 0 ? "#d97706" : "#cbd5e1",
                        }}
                      >
                        {fmt(bymhd)}
                      </td>
                      <td
                        style={{
                          ...S.td,
                          textAlign: "right",
                          fontWeight: 700,
                          color: "#1d4ed8",
                        }}
                      >
                        {fmt(total)}
                      </td>
                      <td style={{ ...S.td, textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: 4,
                            justifyContent: "center",
                          }}
                        >
                          <button
                            style={S.abtn}
                            onClick={() =>
                              setEditRowId(editRowId === row.id ? null : row.id)
                            }
                          >
                            <Edit size={12} style={{ color: "#d97706" }} />
                          </button>
                          <button
                            style={S.abtn}
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
                          <EditSection
                            row={row}
                            masterNama={capex.nm_anggaran}
                            onBack={() => setEditRowId(null)}
                            onSave={handleSavePerubahan}
                            onUpdateRow={(changes) =>
                              handleUpdateRow(row.id, changes)
                            }
                            mode="capex"
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
              <tr style={{ background: "#eff6ff" }}>
                <td
                  colSpan={2}
                  style={{
                    ...S.td,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#1d4ed8",
                    fontSize: "0.75rem",
                  }}
                >
                  GRAND TOTAL
                </td>
                <td
                  style={{
                    ...S.td,
                    textAlign: "right",
                    fontWeight: 800,
                    color: "#16a34a",
                    fontSize: "0.88rem",
                  }}
                >
                  {fmt(
                    list.reduce(
                      (acc, r) => acc + calcRealBymhd(r.history).real,
                      0,
                    ),
                  )}
                </td>
                <td
                  style={{
                    ...S.td,
                    textAlign: "right",
                    fontWeight: 800,
                    color: "#d97706",
                    fontSize: "0.88rem",
                  }}
                >
                  {fmt(
                    list.reduce(
                      (acc, r) => acc + calcRealBymhd(r.history).bymhd,
                      0,
                    ),
                  )}
                </td>
                <td
                  style={{
                    ...S.td,
                    textAlign: "right",
                    fontWeight: 800,
                    color: "#2563eb",
                    fontSize: "0.88rem",
                  }}
                >
                  {fmt(
                    list.reduce(
                      (acc, r) => acc + calcRealBymhd(r.history).total,
                      0,
                    ),
                  )}
                </td>
                <td style={S.td} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* CARD 2: Tabel Riwayat Perubahan Anggaran */}
      {list.length > 0 && (
        <div style={{ marginTop: 0, paddingTop: 12, background: "#f5f5f5" }}>
          <div style={{ padding: "0 0 12px 0" }}>
            {list.map((row, idx) => (
              <div
                key={row.id}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  overflow: "hidden",
                  marginBottom: 12,
                  background: "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 16px",
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <History size={14} style={{ color: "#2563eb" }} />
                  <span
                    style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151" }}
                  >
                    Riwayat Perubahan Anggaran
                  </span>
                </div>
                <div style={{ padding: "16px" }}>
                  <InlineHistoryTable
                    row={row}
                    mode="capex"
                    onUpdateHistoryRecord={handleUpdateHistoryRecord}
                    onDeleteHistoryRecord={handleDeleteHistoryRecord}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── CAPEX DETAIL PAGE ──────────────────────────────────────────
function CapexDetailPage({ capex, onBack, setCapexList, toast_ }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <button style={{ ...S.abtn, padding: "6px 10px" }} onClick={onBack}>
          <ArrowLeft size={16} style={{ color: "#2563eb" }} />
        </button>
      </div>
      <div
        style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid #bfdbfe",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,.04)",
        }}
      >
        <div
          style={{
            background: "#eff6ff",
            borderBottom: "1px solid #bfdbfe",
            padding: "20px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                minWidth: 44,
                height: 44,
                borderRadius: 10,
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                flexShrink: 0,
              }}
            >
              <Layers size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#2563eb",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 4,
                }}
              >
                Detail Anggaran CAPEX
              </div>
              <h2
                style={{
                  fontWeight: 800,
                  color: "#0f172a",
                  fontSize: "1.15rem",
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}
              >
                {capex.nm_anggaran}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    color: "#1d4ed8",
                    background: "white",
                    padding: "2px 8px",
                    borderRadius: 4,
                    border: "1px solid #bfdbfe",
                    fontWeight: 700,
                  }}
                >
                  {capex.kd_capex || "KODE_KOSONG"}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    background: "white",
                    padding: "2px 8px",
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
                    fontWeight: 600,
                  }}
                >
                  RKAP {capex.thn_rkap_awal} — {capex.thn_rkap_akhir}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px 0 0" }}>
          <CapexAnggaranTahunanSection
            capex={capex}
            setCapexList={setCapexList}
            toast_={toast_}
          />
        </div>
      </div>
    </div>
  );
}

// ── CAPEX INPUT ANGGARAN PAGE ──────────────────────────────────
function CapexInputAnggaranPage({ capex, onBack, onSave }) {
  const [thnRkapAwal, setThnRkapAwal] = useState(
    capex.thn_rkap_awal || CURRENT_YEAR,
  );
  const [thnRkapAkhir, setThnRkapAkhir] = useState(
    capex.thn_rkap_akhir || CURRENT_YEAR,
  );
  const [nilaiKad, setNilaiKad] = useState(capex.nilai_kad || "");
  const [nilaiRkap, setNilaiRkap] = useState("");
  const [thnAnggaran, setThnAnggaran] = useState("");
  const [error, setError] = useState(null);

  const awal = parseInt(thnRkapAwal) || 0,
    akhir = parseInt(thnRkapAkhir) || 0;
  const isRangeValid = useMemo(
    () =>
      awal >= 1900 &&
      awal <= 2999 &&
      akhir >= 1900 &&
      akhir <= 2999 &&
      awal <= akhir,
    [awal, akhir],
  );
  const tahunOpts = useMemo(
    () =>
      isRangeValid
        ? Array.from({ length: akhir - awal + 1 }, (_, i) => awal + i)
        : [],
    [isRangeValid, awal, akhir],
  );

  const history = capex.history_anggaran || [];
  // Total child anggaran tahunan yang sudah diinput (untuk validasi sisa RKAP)
  const currentTotalRkap = (capex.anggaran_tahunan || []).reduce(
    (sum, a) => sum + (a.nilai_anggaran || 0),
    0,
  );
  // Nilai RKAP yang disimpan di capex (batas penyerapan anggaran child)
  const savedNilaiRkap = capex.nilai_rkap || 0;

  useEffect(() => {
    if (tahunOpts.length > 0 && !tahunOpts.includes(parseInt(thnAnggaran))) {
      setThnAnggaran(tahunOpts[0]);
    }
  }, [tahunOpts, thnAnggaran]);

  const handleSimpan = () => {
    if (!isRangeValid)
      return setError("Tahun RKAP Awal harus ≤ Tahun RKAP Akhir!");
    if (!thnAnggaran) return setError("Pilih Tahun Anggaran!");
    if (!nilaiRkap) return setError("Nilai RKAP harus diisi!");
    const kad = parseFloat(nilaiKad) || 0,
      rkap = parseFloat(nilaiRkap) || 0;
    if (kad < 0 || rkap < 0) return setError("Nilai tidak boleh negatif!");
    if (kad === 0) return setError("Nilai KAD harus lebih dari 0 untuk membuat entri anggaran baru!");
    // RKAP tidak boleh melebihi sisa KAD
    const sisaKad = Math.max(0, kad - currentHistoryTotal);
    if (rkap > sisaKad) return setError(`Nilai RKAP tidak boleh melebihi sisa KAD (Sisa: ${fmt(sisaKad)})!`);
    onSave(
      capex.id,
      {
        id: uid(),
        tgl: new Date().toISOString().split("T")[0],
        thn_rkap_awal: awal,
        thn_rkap_akhir: akhir,
        thn_anggaran: parseInt(thnAnggaran),
        nilai_kad: kad,
        nilai_rkap: rkap,
      },
      kad,
      rkap,
    );
    setNilaiRkap("");
    setThnAnggaran(tahunOpts[0] || "");
  };

  const currentHistoryTotal = history.reduce((sum, h) => sum + (h.nilai_rkap || 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ ...S.abtn, padding: "6px 10px" }} onClick={onBack}>
          <ArrowLeft size={16} style={{ color: "#2563eb" }} />
        </button>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b" }}>
          Input Anggaran CAPEX
        </h2>
      </div>
      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "1.1rem", color: "#dc2626" }}>⚠</span>
            <span style={{ color: "#991b1b", fontSize: "0.9rem", fontWeight: 500 }}>
              {error}
            </span>
          </div>
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#dc2626",
              fontSize: "1.2rem",
              padding: 0,
            }}
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid #f1f5f9",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <PlusCircle size={15} style={{ color: "#2563eb" }} />
          <span
            style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}
          >
            Form Entri Anggaran Baru
          </span>
        </div>
        <ModalFormRow label="Nama Anggaran">
          <span
            style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}
          >
            {capex.nm_anggaran}
          </span>
        </ModalFormRow>
        <ModalFormRow label="Tahun RKAP Awal & Akhir">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b" }}
            >
              {thnRkapAwal}
            </span>
            <span
              style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600 }}
            >
              —
            </span>
            <span
              style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b" }}
            >
              {thnRkapAkhir}
            </span>
          </div>
        </ModalFormRow>
        <ModalFormRow label="Nilai KAD">
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span
              style={{ fontSize: "0.9rem", fontWeight: 600, color: "#2563eb" }}
            >
              {fmt(nilaiKad)}
            </span>
            {parseFloat(nilaiKad) > 0 && currentHistoryTotal > 0 && (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: Math.max(0, (parseFloat(nilaiKad) || 0) - currentHistoryTotal) <= 0 ? "#dc2626" : "#16a34a",
                  background: Math.max(0, (parseFloat(nilaiKad) || 0) - currentHistoryTotal) <= 0 ? "#fef2f2" : "#f0fdf4",
                  border: `1px solid ${Math.max(0, (parseFloat(nilaiKad) || 0) - currentHistoryTotal) <= 0 ? "#fecaca" : "#bbf7d0"}`,
                  padding: "2px 8px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                }}
              >
                Sisa: {fmt(Math.max(0, (parseFloat(nilaiKad) || 0) - currentHistoryTotal))}
                {Math.max(0, (parseFloat(nilaiKad) || 0) - currentHistoryTotal) <= 0 ? " ✓" : ""}
              </span>
            )}
          </div>
        </ModalFormRow>
        {isRangeValid && tahunOpts.length > 0 && (
          <ModalFormRow label="Tahun Anggaran" required>
            <select
              style={{ ...S.inp, maxWidth: 160 }}
              value={thnAnggaran}
              onChange={(e) => setThnAnggaran(parseInt(e.target.value))}
            >
              <option value="">-- Pilih Tahun --</option>
              {tahunOpts.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </ModalFormRow>
        )}
        <ModalFormRow label="Nilai RKAP (Rp)" required noBorder>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="number"
              className="no-spinners"
              style={{ ...S.inp, maxWidth: 280, flex: 1 }}
              placeholder="0"
              value={nilaiRkap}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || parseFloat(v) >= 0) setNilaiRkap(v);
              }}
            />
            {parseFloat(nilaiRkap) > 0 && (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#64748b",
                  whiteSpace: "nowrap",
                }}
              >
                ≈ {fmt(nilaiRkap)}
              </span>
            )}
          </div>
        </ModalFormRow>
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button style={S.btnOut} onClick={onBack}>
            Batal
          </button>
          <button
            style={{
              ...S.btn,
              background: "#2563eb",
              opacity: nilaiRkap ? 1 : 0.5,
              padding: "9px 20px",
              borderRadius: 8,
            }}
            disabled={!nilaiRkap}
            onClick={handleSimpan}
          >
            <Save size={15} /> Simpan Entri Anggaran
          </button>
        </div>
      </div>

      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid #f1f5f9",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <History size={16} style={{ color: "#2563eb" }} />
            <span
              style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}
            >
              Riwayat Entri Anggaran
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "#64748b",
                background: "#e2e8f0",
                padding: "1px 7px",
                borderRadius: 99,
                fontWeight: 600,
              }}
            >
              {history.length} entri
            </span>
          </div>
        </div>
        {history.length === 0 ? (
          <div
            style={{
              padding: "32px 24px",
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "0.85rem",
              fontStyle: "italic",
            }}
          >
            Belum ada riwayat entri anggaran.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ ...S.tbl, border: "none" }}>
              <thead>
                <tr>
                  <th style={{ ...S.th, width: 40, textAlign: "center" }}>
                    NO
                  </th>
                  <th style={{ ...S.th, textAlign: "center" }}>
                    TAHUN ANGGARAN
                  </th>
                  <th style={{ ...S.th, textAlign: "right" }}>NILAI RKAP</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, idx) => (
                  <tr key={h.id}>
                    <td
                      style={{
                        ...S.td,
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        color: "#94a3b8",
                      }}
                    >
                      {idx + 1}
                    </td>
                    <td
                      style={{
                        ...S.td,
                        textAlign: "center",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {h.thn_anggaran || h.thn_rkap_akhir}
                    </td>
                    <td
                      style={{
                        ...S.td,
                        textAlign: "right",
                        fontWeight: 700,
                        color: "#16a34a",
                      }}
                    >
                      {fmt(h.nilai_rkap)}
                    </td>
                  </tr>
                ))}
              </tbody>
              {history.length > 0 && (
                <tfoot>
                  <tr style={{ background: "#f0fdf4" }}>
                    <td
                      colSpan={2}
                      style={{
                        ...S.td,
                        textAlign: "right",
                        fontWeight: 700,
                        color: "#15803d",
                        fontSize: "0.75rem",
                      }}
                    >
                      TOTAL RKAP
                    </td>
                    <td
                      style={{
                        ...S.td,
                        textAlign: "right",
                        fontWeight: 800,
                        color: "#15803d",
                        fontSize: "0.88rem",
                      }}
                    >
                      {fmt(currentHistoryTotal)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── OPEX MASTER LIST PAGE ──────────────────────────────────────
// REVISION: Tombol Edit di baris tabel langsung mengisi form "Tambah/Edit Anggaran Master" di bawah
// (bukan membuka modal baru). Form berubah menjadi mode Edit saat salah satu baris diklik Edit.
function OpexMasterListPage({ masters, onBack, onAdd, onEdit, onDelete }) {
  const [editingMaster, setEditingMaster] = useState(null); // null = mode tambah, obj = mode edit
  const [formKd, setFormKd] = useState("");
  const [formNama, setFormNama] = useState("");

  // Saat klik Edit di baris, isi form dengan data baris tersebut dan set mode edit
  const handleClickEdit = (m) => {
    setEditingMaster(m);
    setFormKd(m.kd);
    setFormNama(m.nama);
    // Scroll ke form bawah
    setTimeout(() => {
      document.getElementById("opex-master-form-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  // Reset form ke mode tambah
  const handleCancelEdit = () => {
    setEditingMaster(null);
    setFormKd("");
    setFormNama("");
  };

  const handleSubmit = () => {
    if (!formNama) return;
    if (editingMaster) {
      // Mode edit: panggil onEdit dengan data baru
      onEdit({ ...editingMaster, kd: formKd, nama: formNama });
      setEditingMaster(null);
    } else {
      // Mode tambah
      onAdd(formKd, formNama);
    }
    setFormKd("");
    setFormNama("");
  };

  const isEditMode = !!editingMaster;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <button
        style={{ ...S.abtn, padding: "6px 10px", alignSelf: "flex-start" }}
        onClick={onBack}
        title="Kembali"
      >
        <ArrowLeft size={16} style={{ color: "#2563eb" }} />
      </button>

      {/* Tabel Daftar Anggaran Master OPEX */}
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid #f1f5f9",
            background: "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Database size={17} style={{ color: "#16a34a" }} />
            <span
              style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: "#0f172a",
              }}
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
              {masters.length} pos
            </span>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ ...S.tbl, border: "none" }}>
            <thead>
              <tr>
                <th style={{ ...S.th, width: 40, textAlign: "center" }}>
                  NO
                </th>
                <th style={{ ...S.th }}>NAMA ANGGARAN</th>
                <th style={{ ...S.th, width: 110, textAlign: "center", paddingLeft: "4px", paddingRight: "4px" }}>
                  KODE
                </th>
                <th style={{ ...S.th, width: 80, textAlign: "center", paddingLeft: "4px", paddingRight: "4px" }}>
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {masters.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      ...S.td,
                      textAlign: "center",
                      color: "#94a3b8",
                      padding: 24,
                      fontSize: "0.82rem",
                      background: "#fafafa",
                      fontStyle: "italic",
                    }}
                  >
                    Belum ada data anggaran master.
                  </td>
                </tr>
              ) : (
                masters.map((m, idx) => {
                  const isBeingEdited = editingMaster?.id === m.id;
                  return (
                    <tr
                      key={m.id}
                      style={{
                        background: isBeingEdited ? "#fffbeb" : "white",
                        transition: "background 0.15s",
                      }}
                    >
                      <td
                        style={{
                          ...S.td,
                          textAlign: "center",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          color: "#94a3b8",
                        }}
                      >
                        {idx + 1}
                      </td>
                      <td style={S.td}>
                        <div
                          style={{
                            fontWeight: 600,
                            color: isBeingEdited ? "#d97706" : "#1e293b",
                            fontSize: "0.88rem",
                          }}
                        >
                          {m.nama}
                          {isBeingEdited && (
                            <span
                              style={{
                                marginLeft: 8,
                                fontSize: "0.68rem",
                                background: "#fef3c7",
                                color: "#b45309",
                                padding: "2px 6px",
                                borderRadius: 4,
                                fontWeight: 700,
                                border: "1px solid #fde68a",
                              }}
                            >
                              ✎ Sedang diedit
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ ...S.td, textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            background: "#f1f5f9",
                            color: "#475569",
                            padding: "3px 8px",
                            borderRadius: 4,
                            fontWeight: 700,
                            fontSize: "0.8rem",
                          }}
                        >
                          {m.kd}
                        </span>
                      </td>
                      <td
                        style={{
                          ...S.td,
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            justifyContent: "center",
                          }}
                        >
                          <button
                            style={{
                              ...S.abtn,
                              padding: "6px 10px",
                              background: isBeingEdited ? "#fef3c7" : "#fffbeb",
                              borderColor: "#fde68a",
                            }}
                            onClick={() => isBeingEdited ? handleCancelEdit() : handleClickEdit(m)}
                            title={isBeingEdited ? "Batalkan edit" : "Edit"}
                          >
                            {isBeingEdited
                              ? <X size={13} style={{ color: "#d97706" }} />
                              : <Edit size={13} style={{ color: "#d97706" }} />
                            }
                          </button>
                          <button
                            style={{
                              ...S.abtn,
                              padding: "6px 10px",
                              background: "#fef2f2",
                              borderColor: "#fecaca",
                            }}
                            onClick={() => {
                              if (isBeingEdited) handleCancelEdit();
                              onDelete(m.id);
                            }}
                          >
                            <Trash2
                              size={13}
                              style={{ color: "#ef4444" }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Tambah / Edit Anggaran Master */}
      <div
        id="opex-master-form-card"
        style={{
          background: "white",
          border: isEditMode ? "2px solid #fde68a" : "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "20px",
          overflow: "hidden",
          transition: "border 0.2s",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: isEditMode ? "#d97706" : "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {isEditMode ? (
              <>
                <Edit size={15} style={{ color: "#d97706" }} />
                Edit Anggaran Master
                <span
                  style={{
                    fontSize: "0.75rem",
                    background: "#fef3c7",
                    color: "#b45309",
                    padding: "2px 8px",
                    borderRadius: 99,
                    fontWeight: 600,
                    border: "1px solid #fde68a",
                  }}
                >
                  {editingMaster?.nama}
                </span>
              </>
            ) : (
              <>
                <Plus size={15} style={{ color: "#16a34a" }} />
                Tambah Anggaran Master Baru
              </>
            )}
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={S.lbl}>Kode</label>
            <input
              type="text"
              style={{
                ...S.inp,
                borderColor: isEditMode ? "#fde68a" : "#cbd5e1",
              }}
              placeholder="Contoh: 5030905000"
              value={formKd}
              onChange={(e) => setFormKd(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={S.lbl}>
              Nama Anggaran{" "}
              <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              style={{
                ...S.inp,
                borderColor: isEditMode ? "#fde68a" : "#cbd5e1",
              }}
              placeholder="Contoh: Beban Pemeliharaan Software"
              value={formNama}
              onChange={(e) => setFormNama(e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          {isEditMode && (
            <button
              style={{ ...S.btnOut, fontSize: "0.82rem" }}
              onClick={handleCancelEdit}
            >
              <X size={14} /> Batal Edit
            </button>
          )}
          <button
            style={{
              ...S.btn,
              background: isEditMode ? "#d97706" : "#16a34a",
              opacity: formNama ? 1 : 0.5,
              padding: "10px 20px",
            }}
            disabled={!formNama}
            onClick={handleSubmit}
          >
            {isEditMode ? (
              <>
                <Save size={15} /> Simpan Perubahan
              </>
            ) : (
              <>
                <Plus size={15} /> Submit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── OPEX MASTER FORM MODAL (extracted to module level) ─────────
function OpexMasterFormModal({ title, form, setForm, onSave, onClose }) {
  return (
    <div style={S.ovs} onClick={onClose}>
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: 28,
          maxWidth: 620,
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
          <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>{title}</h3>
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
        <div
          style={{
            border: "1px solid #f1f5f9",
            borderRadius: 8,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          {[
            {
              label: "Nama Anggaran",
              key: "nama",
              required: true,
              placeholder: "Contoh: Beban Pemeliharaan Software",
            },
            {
              label: "Kode Anggaran",
              key: "kd",
              placeholder: "Contoh: 5030905000",
            },
          ].map((f) => (
            <ModalFormRow key={f.key} label={f.label} required={f.required}>
              <input
                style={S.inp}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) =>
                  setForm((fm) => ({ ...fm, [f.key]: e.target.value }))
                }
              />
            </ModalFormRow>
          ))}
          <ModalFormRow label="Tahun Anggaran" required>
            <select
              style={S.inp}
              value={form.thn_anggaran}
              onChange={(e) =>
                setForm((fm) => ({ ...fm, thn_anggaran: e.target.value }))
              }
            >
              {yearOpts.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </ModalFormRow>
          <ModalFormRow label="Nilai Anggaran (Rp)" required noBorder>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="number"
                className="no-spinners"
                style={{ ...S.inp, flex: 1 }}
                placeholder="0"
                value={form.nilai_anggaran}
                onChange={(e) =>
                  setForm((fm) => ({ ...fm, nilai_anggaran: e.target.value }))
                }
              />
              {parseFloat(form.nilai_anggaran) > 0 && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    whiteSpace: "nowrap",
                  }}
                >
                  ≈ {fmt(form.nilai_anggaran)}
                </span>
              )}
            </div>
          </ModalFormRow>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button style={S.btnOut} onClick={onClose}>
            Batal
          </button>
          <button
            style={{
              ...S.btn,
              background: "#16a34a",
              opacity: form.nama && form.nilai_anggaran ? 1 : 0.5,
            }}
            disabled={!form.nama || !form.nilai_anggaran}
            onClick={onSave}
          >
            <Plus size={14} />{" "}
            {title.includes("Edit") ? "Simpan Perubahan" : "Tambahkan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── OPEX MODULE ────────────────────────────────────────────────
function OpexModule({ masterList, setMasterList }) {
  const [masters, setMasters] = useState(INIT_OPEX_MASTERS);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [showMasterListPage, setShowMasterListPage] = useState(false);
  const [editModalMaster, setEditModalMaster] = useState(null);
  const [detailMaster, setDetailMaster] = useState(null);
  const [filterThnFrom, setFilterThnFrom] = useState("");
  const [filterThnTo, setFilterThnTo] = useState("");
  const [filterNama, setFilterNama] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddAnggaranTahunan, setShowAddAnggaranTahunan] = useState(false);
  const [formTahunan, setFormTahunan] = useState({
    masterNama: "",
    thn: new Date().getFullYear(),
    realisasi_murni: "",
    nilai_anggaran: "",
  });
  const PAGE_SIZE = 5;

  const toast_ = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };
  const emptyForm = {
    nama: "",
    kd: "",
    thn_anggaran: new Date().getFullYear(),
    nilai_anggaran: "",
  };
  const [editForm, setEditForm] = useState(emptyForm);

  // Handler untuk tambah dari halaman master list
  const handleAddMasterFromPage = (kd, nama) => {
    if (!nama) {
      toast_("Nama anggaran harus diisi.");
      return;
    }
    setMasters((p) => [
      ...p,
      {
        id: uid(),
        kd: kd || uid(),
        nama: nama,
        thn_anggaran: new Date().getFullYear(),
        nilai_anggaran: 0,
        realisasi_tahunan: [],
      },
    ]);
    toast_("Anggaran master baru ditambahkan.");
  };

  // Handler untuk edit dari halaman master list (inline form)
  // onEdit dipanggil dari OpexMasterListPage dengan obj master yang sudah diupdate kd & nama
  const handleEditMasterFromPage = (updatedMaster) => {
    setMasters((p) =>
      p.map((m) =>
        m.id === updatedMaster.id
          ? { ...m, kd: updatedMaster.kd, nama: updatedMaster.nama }
          : m,
      ),
    );
    toast_("Data master berhasil diperbarui.");
  };

  const handleAddAnggaranTahunanForm = () => {
    if (!formTahunan.masterNama || !formTahunan.nilai_anggaran) {
      toast_("Nama anggaran dan nilai anggaran harus diisi.");
      return;
    }
    const selectedMaster = masters.find((m) => m.nama === formTahunan.masterNama);
    if (!selectedMaster) {
      toast_("Master anggaran tidak ditemukan.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const payload = {
      id: uid(),
      thn: parseInt(formTahunan.thn),
      realisasi_murni: parseFloat(formTahunan.realisasi_murni) || 0,
      realisasi_bymhd: parseFloat(formTahunan.realisasi_bymhd) || 0,
      history: [
        {
          id: uid(),
          tgl: today,
          tipe: "initial",
          nilai: parseFloat(formTahunan.realisasi_murni) || 0,
          keterangan: "Input awal murni",
          is_initial: true,
        },
        ...(parseFloat(formTahunan.realisasi_bymhd) > 0
          ? [
            {
              id: uid(),
              tgl: today,
              tipe: "bymhd",
              nilai: parseFloat(formTahunan.realisasi_bymhd) || 0,
              keterangan: "Input awal BYMHD",
              is_initial: false,
            },
          ]
          : []),
      ],
    };
    setMasters((prev) =>
      prev.map((m) =>
        m.id === selectedMaster.id
          ? {
            ...m,
            realisasi_tahunan: [...(m.realisasi_tahunan || []), payload],
          }
          : m,
      ),
    );
    toast_("Data anggaran tahunan ditambahkan.");
    setShowAddAnggaranTahunan(false);
    setFormTahunan({
      masterNama: "",
      thn: new Date().getFullYear(),
      realisasi_murni: "",
      nilai_anggaran: "",
    });
  };

  const handleSaveEditMaster = () => {
    if (!editForm.nama || !editForm.nilai_anggaran) return;
    setMasters((p) =>
      p.map((m) =>
        m.id === editModalMaster.id
          ? {
            ...m,
            nama: editForm.nama,
            kd: editForm.kd,
            thn_anggaran: parseInt(editForm.thn_anggaran),
            nilai_anggaran: parseFloat(editForm.nilai_anggaran),
          }
          : m,
      ),
    );
    toast_("Data master diperbarui.");
    setEditModalMaster(null);
    setEditForm(emptyForm);
  };

  const handleDeleteMaster = (id) =>
    setConfirm({
      msg: "Hapus anggaran master ini beserta seluruh data anggarannya?",
      onConfirm: () => {
        setMasters((p) => p.filter((m) => m.id !== id));
        setConfirm(null);
        toast_("Anggaran master dihapus.");
      },
    });

  // FIX 1: namaOptions tidak include duplikat "Semua Pos"
  const namaOptions = useMemo(() => {
    const pool = masters.filter((m) => {
      if (filterThnFrom && m.thn_anggaran < parseInt(filterThnFrom))
        return false;
      if (filterThnTo && m.thn_anggaran > parseInt(filterThnTo)) return false;
      return true;
    });
    const seen = new Set();
    return pool
      .map((m) => ({ id: m.id, nama: m.nama }))
      .filter((item) => {
        if (seen.has(item.nama)) return false;
        seen.add(item.nama);
        return true;
      })
      .sort((a, b) => a.nama.localeCompare(b.nama));
  }, [masters, filterThnFrom, filterThnTo]);

  useEffect(() => {
    if (
      filterNama &&
      filterNama !== "SEMUA" &&
      !namaOptions.find((o) => o.nama === filterNama)
    )
      setFilterNama("");
  }, [namaOptions]);

  const filteredMasters = useMemo(() => {
    return masters.filter((m) => {
      if (filterThnFrom && m.thn_anggaran < parseInt(filterThnFrom))
        return false;
      if (filterThnTo && m.thn_anggaran > parseInt(filterThnTo)) return false;
      if (filterNama && filterNama !== "SEMUA" && m.nama !== filterNama) return false;
      return true;
    });
  }, [masters, filterThnFrom, filterThnTo, filterNama]);

  const kpiBase = useMemo(() => {
    return filterNama
      ? filteredMasters
      : masters.filter((m) => {
        if (filterThnFrom && m.thn_anggaran < parseInt(filterThnFrom))
          return false;
        if (filterThnTo && m.thn_anggaran > parseInt(filterThnTo))
          return false;
        return true;
      });
  }, [masters, filterThnFrom, filterThnTo, filterNama, filteredMasters]);

  const totalAnggaran = kpiBase.reduce(
    (s, m) => s + (m.nilai_anggaran || 0),
    0,
  );
  const totalAnggaranAll = kpiBase.reduce(
    (s, m) =>
      s +
      (m.realisasi_tahunan || []).reduce(
        (ss, r) => ss + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0),
        0,
      ),
    0,
  );

  const totalPersentase = totalAnggaran > 0
    ? Math.round((totalAnggaranAll / totalAnggaran) * 100)
    : 0;

  const sisaAnggaran = totalAnggaran - totalAnggaranAll;

  const totalPages = Math.ceil(filteredMasters.length / PAGE_SIZE);
  const paginatedWithIdx = filteredMasters
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map((m) => ({
      m,
      globalIdx: filteredMasters.findIndex((x) => x.id === m.id),
    }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {toast && <ToastMsg msg={toast} onDone={() => setToast(null)} />}
      {confirm && (
        <ConfirmBox
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      {editModalMaster && (
        <OpexMasterFormModal
          title="Edit Anggaran Master"
          form={editForm}
          setForm={setEditForm}
          onSave={handleSaveEditMaster}
          onClose={() => setEditModalMaster(null)}
        />
      )}

      {/* Halaman master list */}
      {showMasterListPage && (
        <OpexMasterListPage
          masters={masters}
          onBack={() => setShowMasterListPage(false)}
          onAdd={handleAddMasterFromPage}
          onEdit={handleEditMasterFromPage}
          onDelete={handleDeleteMaster}
        />
      )}

      {showAddAnggaranTahunan && (
        <div style={S.ovs} onClick={() => setShowAddAnggaranTahunan(false)}>
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
                  Tambah Anggaran Tahunan
                </h3>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#64748b",
                    marginTop: 2,
                  }}
                >
                  Input anggaran baru untuk master anggaran
                </div>
              </div>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
                onClick={() => setShowAddAnggaranTahunan(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div
              style={{
                border: "1px solid #f1f5f9",
                borderRadius: 8,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              <ModalFormRow label="Nama Anggaran" required>
                <select
                  style={S.inp}
                  value={formTahunan.masterNama}
                  onChange={(e) =>
                    setFormTahunan((f) => ({ ...f, masterNama: e.target.value }))
                  }
                >
                  <option value="">— Pilih Anggaran Master —</option>
                  {masters.map((m) => (
                    <option key={m.id} value={m.nama}>
                      {m.nama}
                    </option>
                  ))}
                </select>
              </ModalFormRow>
              <ModalFormRow label="Tahun Anggaran" required>
                <select
                  style={S.inp}
                  value={formTahunan.thn}
                  onChange={(e) =>
                    setFormTahunan((f) => ({ ...f, thn: e.target.value }))
                  }
                >
                  {yearOpts.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </ModalFormRow>
              <ModalFormRow label="Nilai Anggaran (Rp)" required noBorder>
                <input
                  type="number"
                  className="no-spinners"
                  style={S.inp}
                  placeholder="0"
                  value={formTahunan.nilai_anggaran || ""}
                  onChange={(e) =>
                    setFormTahunan((f) => ({ ...f, nilai_anggaran: e.target.value }))
                  }
                />
              </ModalFormRow>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <button style={S.btnOut} onClick={() => setShowAddAnggaranTahunan(false)}>
                Batal
              </button>
              <button
                style={{
                  ...S.btn,
                  background: "#16a34a",
                  opacity: formTahunan.masterNama && formTahunan.nilai_anggaran ? 1 : 0.5,
                }}
                disabled={!formTahunan.masterNama || !formTahunan.nilai_anggaran}
                onClick={handleAddAnggaranTahunanForm}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {detailMaster &&
        (() => {
          const latest =
            masters.find((m) => m.id === detailMaster.id) || detailMaster;
          const totalR = (latest.realisasi_tahunan || []).reduce(
            (s, r) => s + (r.realisasi_murni || 0) + (r.realisasi_bymhd || 0),
            0,
          );
          const pct =
            latest.nilai_anggaran > 0
              ? Math.round((totalR / latest.nilai_anggaran) * 100)
              : 0;
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <button
                style={{ ...S.abtn, padding: "6px 10px" }}
                onClick={() => setDetailMaster(null)}
                title="Kembali"
              >
                <ArrowLeft size={16} style={{ color: "#2563eb" }} />
              </button>
              {/* CARD 1: Master Info (Green Wrapper) */}
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid #bbf7d0",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,.04)",
                }}
              >
                <div
                  style={{
                    background: "#f0fdf4",
                    borderBottom: "1px solid #bbf7d0",
                    padding: "16px 24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: 9,
                        background: "#16a34a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      <Database size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          color: "#16a34a",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: 2,
                        }}
                      >
                        Detail Anggaran OPEX
                      </div>
                      <h2
                        style={{
                          fontWeight: 800,
                          color: "#0f172a",
                          fontSize: "1.05rem",
                          lineHeight: 1.3,
                          marginBottom: 6,
                        }}
                      >
                        {latest.nama}
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontFamily: "monospace",
                            color: "#15803d",
                            background: "white",
                            padding: "2px 8px",
                            borderRadius: 4,
                            border: "1px solid #bbf7d0",
                            fontWeight: 700,
                          }}
                        >
                          {latest.kd}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "#64748b",
                            background: "white",
                            padding: "2px 8px",
                            borderRadius: 4,
                            border: "1px solid #e2e8f0",
                            fontWeight: 600,
                          }}
                        >
                          Anggaran: {fmt(latest.nilai_anggaran)}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            background:
                              pct >= 100
                                ? "#fef2f2"
                                : pct >= 80
                                  ? "#fffbeb"
                                  : "#f0fdf4",
                            color:
                              pct >= 100
                                ? "#dc2626"
                                : pct >= 80
                                  ? "#d97706"
                                  : "#16a34a",
                            padding: "2px 8px",
                            borderRadius: 4,
                            border: `1px solid ${pct >= 100 ? "#fecaca" : pct >= 80 ? "#fde68a" : "#bbf7d0"}`,
                            fontWeight: 700,
                          }}
                        >
                          Anggaran {pct}%
                        </span>
                      </div>
                    </div>
                    <button
                      style={{
                        ...S.abtn,
                        padding: "6px 10px",
                        background: "#fffbeb",
                        borderColor: "#fde68a",
                      }}
                      title="Edit Master"
                      onClick={() => {
                        setEditModalMaster(latest);
                        setEditForm({
                          nama: latest.nama,
                          kd: latest.kd,
                          thn_anggaran: latest.thn_anggaran,
                          nilai_anggaran: latest.nilai_anggaran,
                        });
                      }}
                    >
                      <Edit size={14} style={{ color: "#d97706" }} />
                    </button>
                  </div>
                </div>
              </div>
              {/* CARD 2 & 3: Realisasi Section */}
              <div style={{ marginTop: 0 }}>
                <RealisasiSection
                  master={latest}
                  setMasters={setMasters}
                  toast_={toast_}
                />
              </div>
            </div>
          );
        })()}

      {!detailMaster && !showMasterListPage && (
        <>
          {/* Ringkasan Anggaran */}
          <div
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                borderBottom: "1px solid #f1f5f9",
                background: "#f8fafc",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#374151",
                }}
              >
                Ringkasan Anggaran
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 0,
              }}
            >
              {[
                {
                  label: "Total Anggaran",
                  val: fmt(totalAnggaran),
                  color: "#2563eb",
                  bg: "#eff6ff",
                  border: "#bfdbfe",
                },
                {
                  label: "Sisa Anggaran",
                  val: fmt(sisaAnggaran),
                  color:
                    totalAnggaranAll > totalAnggaran ? "#dc2626" : "#16a34a",
                  bg: totalAnggaranAll > totalAnggaran ? "#fef2f2" : "#f0fdf4",
                  border:
                    totalAnggaranAll > totalAnggaran ? "#fecaca" : "#bbf7d0",
                },
                {
                  label: "Total Persentase",
                  val: `${totalPersentase}%`,
                  color:
                    totalPersentase >= 100
                      ? "#dc2626"
                      : totalPersentase >= 80
                        ? "#d97706"
                        : totalPersentase >= 50
                          ? "#2563eb"
                          : "#475569",
                  bg:
                    totalPersentase >= 100
                      ? "#fef2f2"
                      : totalPersentase >= 80
                        ? "#fffbeb"
                        : "#f8fafc",
                  border:
                    totalPersentase >= 100
                      ? "#fecaca"
                      : totalPersentase >= 80
                        ? "#fde68a"
                        : "#e2e8f0",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    padding: "12px 16px",
                    borderRight: i < 2 ? "1px solid #f1f5f9" : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: item.color,
                    }}
                  >
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Database size={17} style={{ color: "#16a34a" }} />
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
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
                  {masters.length} pos
                </span>
              </div>
              <button
                style={{
                  ...S.btn,
                  background: "#16a34a",
                  padding: "8px 14px",
                  fontSize: "0.78rem",
                }}
                onClick={() => setShowMasterListPage(true)}
              >
                <Plus size={13} /> Tambah Anggaran Master
              </button>
            </div>

            {/* Filter */}
            <div
              style={{
                padding: "10px 18px",
                background: "#f8fafc",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexShrink: 0,
                  }}
                >
                  <Search size={13} style={{ color: "#94a3b8" }} />
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Filter
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tahun
                  </span>
                  {[
                    {
                      label: "Dari",
                      val: filterThnFrom,
                      set: setFilterThnFrom,
                    },
                    { label: "s/d", val: filterThnTo, set: setFilterThnTo },
                  ].map((f, i) => (
                    <React.Fragment key={f.label}>
                      {i > 0 && (
                        <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                          —
                        </span>
                      )}
                      <select
                        style={{
                          ...S.inp,
                          width: 110,
                          padding: "6px 10px",
                          fontSize: "0.8rem",
                          background: f.val ? "#eff6ff" : "white",
                          border: f.val
                            ? "1px solid #bfdbfe"
                            : "1px solid #cbd5e1",
                          color: f.val ? "#1d4ed8" : "#475569",
                          fontWeight: f.val ? 600 : 400,
                        }}
                        value={f.val}
                        onChange={(e) => {
                          f.set(e.target.value);
                          setCurrentPage(1);
                        }}
                      >
                        <option value="">Semua</option>
                        {yearOpts.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </React.Fragment>
                  ))}
                </div>
                <div
                  style={{
                    width: 1,
                    height: 24,
                    background: "#e2e8f0",
                    flexShrink: 0,
                  }}
                />
                {/* FIX 1: Dropdown Pos - hapus duplikat "Semua Pos" */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flex: 1,
                    minWidth: 200,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Pos
                  </span>
                  <div style={{ position: "relative", flex: 1, maxWidth: 280 }}>
                    <select
                      style={{
                        ...S.inp,
                        padding: "6px 32px 6px 10px",
                        fontSize: "0.8rem",
                        background: filterNama ? "#f0fdf4" : "white",
                        border: filterNama
                          ? "1px solid #bbf7d0"
                          : "1px solid #cbd5e1",
                        color: filterNama ? "#15803d" : "#475569",
                        fontWeight: filterNama ? 600 : 400,
                      }}
                      value={filterNama}
                      onChange={(e) => {
                        setFilterNama(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="SEMUA">— Semua Pos —</option>
                      {namaOptions.map((item) => (
                        <option key={item.id} value={item.nama}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                    {filterNama && (
                      <button
                        style={{
                          position: "absolute",
                          right: 6,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          color: "#94a3b8",
                          padding: 2,
                        }}
                        onClick={() => {
                          setFilterNama("");
                          setCurrentPage(1);
                        }}
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>
                {(filterThnFrom || filterThnTo) && (
                  <button
                    style={{
                      ...S.abtn,
                      padding: "4px 8px",
                      color: "#ef4444",
                      borderColor: "#fecaca",
                      background: "#fef2f2",
                      gap: 4,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      setFilterThnFrom("");
                      setFilterThnTo("");
                      setFilterNama("");
                      setCurrentPage(1);
                    }}
                  >
                    <X size={12} /> Reset
                  </button>
                )}
                <button
                  style={{
                    ...S.btn,
                    background: "#2563eb",
                    padding: "6px 12px",
                    fontSize: "0.75rem",
                    marginLeft: "auto",
                  }}
                  onClick={() => setShowAddAnggaranTahunan(true)}
                >
                  <Plus size={12} /> Tambah Anggaran
                </button>
              </div>
            </div>
          </div>

          {filterNama &&
            (filteredMasters.length === 0 ? (
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
                Tidak ada anggaran master{" "}
                {filterNama !== "SEMUA" ? `dengan nama "${filterNama}"` : ""}{" "}
                pada rentang tahun yang dipilih.
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ ...S.tbl, border: "none" }}>
                      <thead>
                        <tr>
                          {[
                            "NO",
                            "NAMA ANGGARAN",
                            "KODE",
                            "TAHUN",
                            "NILAI ANGGARAN",
                            "ANGGARAN TOTAL",
                            "AKSI",
                          ].map((h, i) => (
                            <th
                              key={h}
                              style={{
                                ...S.th,
                                ...(i === 0 && {
                                  width: 48,
                                  textAlign: "center",
                                }),
                                ...(i === 2 && {
                                  width: 90,
                                  textAlign: "center",
                                }),
                                ...(i === 3 && {
                                  width: 80,
                                  textAlign: "center",
                                }),
                                ...(i === 4 && {
                                  width: 140,
                                  textAlign: "right",
                                }),
                                ...(i === 5 && {
                                  width: 140,
                                  textAlign: "right",
                                }),
                                ...(i === 6 && {
                                  width: 130,
                                  textAlign: "center",
                                }),
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedWithIdx.map(({ m, globalIdx }) => {
                          const totalR = (m.realisasi_tahunan || []).reduce(
                            (s, r) =>
                              s +
                              (r.realisasi_murni || 0) +
                              (r.realisasi_bymhd || 0),
                            0,
                          );
                          const pct =
                            m.nilai_anggaran > 0
                              ? Math.round((totalR / m.nilai_anggaran) * 100)
                              : 0;
                          return (
                            <tr
                              key={m.id}
                              style={{ background: "white", cursor: "default" }}
                            >
                              <td
                                style={{
                                  ...S.td,
                                  textAlign: "center",
                                  fontWeight: 700,
                                  fontSize: "0.78rem",
                                  color: "#94a3b8",
                                }}
                              >
                                {globalIdx + 1}
                              </td>
                              <td style={S.td}>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    color: "#1e293b",
                                    lineHeight: 1.4,
                                    fontSize: "0.88rem",
                                  }}
                                >
                                  {m.nama}
                                </div>
                              </td>
                              <td style={{ ...S.td, textAlign: "center" }}>
                                <span
                                  style={{
                                    fontFamily: "monospace",
                                    background: "#f1f5f9",
                                    color: "#475569",
                                    padding: "3px 8px",
                                    borderRadius: 4,
                                    fontWeight: 700,
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  {m.kd}
                                </span>
                              </td>
                              <td
                                style={{
                                  ...S.td,
                                  textAlign: "center",
                                  color: "#64748b",
                                  fontWeight: 600,
                                }}
                              >
                                {m.thn_anggaran}
                              </td>
                              <td style={{ ...S.td, textAlign: "right" }}>
                                <span
                                  style={{ fontWeight: 700, color: "#1e293b" }}
                                >
                                  {fmt(m.nilai_anggaran)}
                                </span>
                              </td>
                              <td style={{ ...S.td, textAlign: "right" }}>
                                <span
                                  style={{
                                    fontWeight: 700,
                                    color: pctColor(pct),
                                  }}
                                >
                                  {fmt(totalR)}
                                </span>
                              </td>
                              <td style={{ ...S.td, textAlign: "center" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 6,
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    style={{
                                      ...S.abtn,
                                      padding: "6px 10px",
                                      background: "#eff6ff",
                                      borderColor: "#bfdbfe",
                                    }}
                                    title="Lihat Detail Anggaran"
                                    onClick={() => setDetailMaster(m)}
                                  >
                                    <Eye
                                      size={13}
                                      style={{ color: "#2563eb" }}
                                    />
                                  </button>
                                  <button
                                    style={{
                                      ...S.abtn,
                                      padding: "6px 10px",
                                      background: "#fffbeb",
                                      borderColor: "#fde68a",
                                    }}
                                    onClick={() => {
                                      setEditModalMaster(m);
                                      setEditForm({
                                        nama: m.nama,
                                        kd: m.kd,
                                        thn_anggaran: m.thn_anggaran,
                                        nilai_anggaran: m.nilai_anggaran,
                                      });
                                    }}
                                  >
                                    <Edit
                                      size={13}
                                      style={{ color: "#d97706" }}
                                    />
                                  </button>
                                  <button
                                    style={{
                                      ...S.abtn,
                                      padding: "6px 10px",
                                      background: "#fef2f2",
                                      borderColor: "#fecaca",
                                    }}
                                    onClick={() => handleDeleteMaster(m.id)}
                                  >
                                    <Trash2
                                      size={13}
                                      style={{ color: "#ef4444" }}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

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
                        {Math.min(
                          currentPage * PAGE_SIZE,
                          filteredMasters.length,
                        )}
                      </b>{" "}
                      dari <b>{filteredMasters.length}</b>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <button
                        style={{
                          ...S.abtn,
                          padding: "6px 12px",
                          opacity: currentPage === 1 ? 0.4 : 1,
                        }}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        <ChevronRight
                          size={14}
                          style={{
                            transform: "rotate(180deg)",
                            color: "#475569",
                          }}
                        />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
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
                              background:
                                pg === currentPage ? "#16a34a" : "white",
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
                          ...S.abtn,
                          padding: "6px 12px",
                          opacity: currentPage === totalPages ? 0.4 : 1,
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
            ))}
        </>
      )}
    </div>
  );
}

// ── CAPEX FORM MODAL (extracted to module level) ───────────────
const CapexFormModal = React.memo(function CapexFormModal({
  title,
  data,
  setData,
  onSave,
  onClose,
}) {
  return (
    <div style={S.ovs} onClick={onClose}>
      <div
        style={{
          background: "white",
          borderRadius: 12,
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
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
            alignItems: "center",
            background: "#f8fafc",
          }}
        >
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>
            {title}
          </h3>
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
        <ModalFormRow label="Nama Anggaran" required>
          <textarea
            rows={2}
            style={{ ...S.inp, resize: "vertical" }}
            placeholder="Contoh: Transformasi dan Digitalisasi PT Pelindo"
            value={data.nm_anggaran}
            onChange={(e) =>
              setData((f) => ({ ...f, nm_anggaran: e.target.value }))
            }
          />
        </ModalFormRow>
        <ModalFormRow label="Kode CAPEX">
          <input
            style={{ ...S.inp, maxWidth: 200 }}
            placeholder="Contoh: 2540013"
            value={data.kd_capex}
            onChange={(e) =>
              setData((f) => ({ ...f, kd_capex: e.target.value }))
            }
          />
        </ModalFormRow>
        {[
          { label: "Tahun RKAP Awal", key: "thn_rkap_awal" },
          { label: "Tahun RKAP Akhir", key: "thn_rkap_akhir" },
        ].map((f) => (
          <ModalFormRow key={f.key} label={f.label}>
            <select
              style={{ ...S.inp, maxWidth: 160 }}
              value={data[f.key]}
              onChange={(e) =>
                setData((d) => ({ ...d, [f.key]: e.target.value }))
              }
            >
              {yearOpts.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </ModalFormRow>
        ))}
        <ModalFormRow label="Nilai KAD (Rp)">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="number"
              className="no-spinners"
              style={{ ...S.inp, maxWidth: 280, flex: 1 }}
              placeholder="0"
              value={data.nilai_kad}
              onChange={(e) =>
                setData((d) => ({ ...d, nilai_kad: e.target.value }))
              }
            />
            {parseFloat(data.nilai_kad) > 0 && (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#64748b",
                  whiteSpace: "nowrap",
                }}
              >
                ≈ {fmt(data.nilai_kad)}
              </span>
            )}
          </div>
        </ModalFormRow>
        <ModalFormRow label="Tahun Anggaran">
          <select
            style={{ ...S.inp, maxWidth: 160 }}
            value={data.thn_anggaran}
            onChange={(e) =>
              setData((d) => ({ ...d, thn_anggaran: e.target.value }))
            }
          >
            {yearOpts.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </ModalFormRow>
        <ModalFormRow label="Nilai RKAP (Rp)" noBorder>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="number"
              className="no-spinners"
              style={{ ...S.inp, maxWidth: 280, flex: 1 }}
              placeholder="0"
              value={data.nilai_rkap}
              onChange={(e) =>
                setData((d) => ({ ...d, nilai_rkap: e.target.value }))
              }
            />
            {parseFloat(data.nilai_rkap) > 0 && (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#64748b",
                  whiteSpace: "nowrap",
                }}
              >
                ≈ {fmt(data.nilai_rkap)}
              </span>
            )}
          </div>
        </ModalFormRow>
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {(parseFloat(data.nilai_rkap) || 0) > (parseFloat(data.nilai_kad) || 0) && (
              <span style={{ color: "#dc2626", fontSize: "0.8rem", fontWeight: 600 }}>
                ⚠ RKAP tidak melebihi KAD
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.btnOut} onClick={onClose}>
              Batal
            </button>
            <button
              style={{
                ...S.btn,
                background: title.includes("Edit") ? "#d97706" : "#2563eb",
                opacity: data.nm_anggaran && !((parseFloat(data.nilai_rkap) || 0) > (parseFloat(data.nilai_kad) || 0)) ? 1 : 0.5,
              }}
              disabled={!data.nm_anggaran || ((parseFloat(data.nilai_rkap) || 0) > (parseFloat(data.nilai_kad) || 0))}
              onClick={onSave}
            >
            {title.includes("Edit") ? (
              <>
                <Save size={14} /> Simpan Perubahan
              </>
            ) : (
              <>
                <Plus size={14} /> Tambahkan
              </>
            )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ── CAPEX EDIT ANGGARAN MODAL (child row edit) ─────────────────
function CapexEditAnggaranModal({ capexId, anggaran, capex, onSave, onClose }) {
  const [thnAnggaran, setThnAnggaran] = useState(String(anggaran.thn || ""));
  const [nilaiRkap, setNilaiRkap] = useState(
    String(anggaran.nilai_anggaran || ""),
  );
  const [error, setError] = useState(null);

  const handleSave = () => {
    if (!thnAnggaran.trim() || !nilaiRkap.trim()) {
      return setError("Semua field harus diisi!");
    }
    const newNilai = parseFloat(nilaiRkap) || 0;
    const anggaranList = capex.anggaran_tahunan || [];
    const totalExistingExcludingThis = anggaranList
      .filter((a) => a.id !== anggaran.id)
      .reduce((sum, a) => sum + (a.nilai_anggaran || 0), 0);
    const totalWithThis = totalExistingExcludingThis + newNilai;
    const kad = capex.nilai_kad || 0;
    if (totalWithThis > kad) {
      return setError(
        `Anggaran tidak boleh melebihi Nilai KAD!`,
      );
    }
    onSave(capexId, anggaran.id, {
      thn_rkap_awal: anggaran.thn_rkap_awal,
      thn_rkap_akhir: anggaran.thn_rkap_akhir,
      nilai_kad: anggaran.nilai_kad,
      thn: parseInt(thnAnggaran),
      nilai_anggaran: newNilai,
    });
  };

  return (
    <div style={S.ovs} onClick={onClose}>
      <div
        style={{
          background: "white",
          borderRadius: 12,
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
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
            alignItems: "center",
            background: "#f8fafc",
          }}
        >
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>
            Edit Data Anggaran
          </h3>
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

        {error && (
          <div
            style={{
              margin: "16px 20px 0",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.1rem", color: "#dc2626" }}>⚠</span>
              <span style={{ color: "#991b1b", fontSize: "0.9rem", fontWeight: 500 }}>
                {error}
              </span>
            </div>
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#dc2626",
                fontSize: "1.2rem",
                padding: 0,
              }}
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}

        <ModalFormRow label="Tahun RKAP Awal">
          <span
            style={{
              fontWeight: 700,
              color: "#1e293b",
              fontSize: "0.95rem",
              padding: "2px 0",
            }}
          >
            {anggaran.thn_rkap_awal || "—"}
          </span>
        </ModalFormRow>

        <ModalFormRow label="Tahun RKAP Akhir">
          <span
            style={{
              fontWeight: 700,
              color: "#1e293b",
              fontSize: "0.95rem",
              padding: "2px 0",
            }}
          >
            {anggaran.thn_rkap_akhir || "—"}
          </span>
        </ModalFormRow>

        <ModalFormRow label="Nilai KAD (Rp)">
          <span
            style={{
              fontWeight: 700,
              color: "#2563eb",
              fontSize: "0.95rem",
              padding: "2px 0",
            }}
          >
            {fmt(anggaran.nilai_kad || 0)}
          </span>
        </ModalFormRow>

        <ModalFormRow label="Tahun Anggaran">
          <input
            type="number"
            className="no-spinners"
            style={{ ...S.inp, maxWidth: 160 }}
            placeholder="Contoh: 2026"
            value={thnAnggaran}
            onChange={(e) => setThnAnggaran(e.target.value)}
            autoFocus
          />
        </ModalFormRow>

        <ModalFormRow label="Nilai RKAP (Rp)" noBorder>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="number"
              className="no-spinners"
              style={{ ...S.inp, maxWidth: 280, flex: 1 }}
              placeholder="0"
              value={nilaiRkap}
              onChange={(e) => setNilaiRkap(e.target.value)}
            />
            {parseFloat(nilaiRkap) > 0 && (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
              >
                ≈ {fmt(nilaiRkap)}
              </span>
            )}
          </div>
        </ModalFormRow>

        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button style={S.btnOut} onClick={onClose}>
            Batal
          </button>
          <button
            style={{ ...S.btn, background: "#d97706" }}
            onClick={handleSave}
          >
            <Save size={14} /> Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CAPEX MODULE ───────────────────────────────────────────────
function CapexModule({ capexList, setCapexList }) {
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [inputAnggaranCapex, setInputAnggaranCapex] = useState(null);
  const [detailCapex, setDetailCapex] = useState(null);
  const [editAnggaran, setEditAnggaran] = useState(null);
  const [filterCapexTahun, setFilterCapexTahun] = useState("");

  const toast_ = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const emptyNew = {
    nm_anggaran: "",
    kd_capex: "",
    thn_rkap_awal: CURRENT_YEAR - 1,
    thn_rkap_akhir: CURRENT_YEAR - 1,
    thn_anggaran: CURRENT_YEAR - 1,
    nilai_kad: "",
    nilai_rkap: "",
  };
  const [newCapex, setNewCapex] = useState(emptyNew);

  const handleAddCapex = useCallback(() => {
    if (!newCapex.nm_anggaran) return;
    const rkap = parseFloat(newCapex.nilai_rkap) || 0;
    const kad = parseFloat(newCapex.nilai_kad) || 0;
    const today = new Date().toISOString().split("T")[0];
    // Buat entri history_anggaran awal jika ada nilai RKAP
    const initialHistory = rkap > 0
      ? [{
          id: uid(),
          tgl: today,
          thn_rkap_awal: parseInt(newCapex.thn_rkap_awal),
          thn_rkap_akhir: parseInt(newCapex.thn_rkap_akhir),
          thn_anggaran: parseInt(newCapex.thn_anggaran),
          nilai_kad: kad,
          nilai_rkap: rkap,
        }]
      : [];
    setCapexList((p) => [
      ...p,
      {
        id: uid(),
        kd_master: "5900100000",
        nm_master: "Beban Investasi",
        nm_anggaran: newCapex.nm_anggaran,
        kd_capex: newCapex.kd_capex,
        thn_rkap_awal: parseInt(newCapex.thn_rkap_awal),
        thn_rkap_akhir: parseInt(newCapex.thn_rkap_akhir),
        thn_anggaran: parseInt(newCapex.thn_anggaran),
        nilai_kad: kad,
        nilai_rkap: rkap,
        anggaran_tahunan: [],
        pekerjaan: [],
        history_anggaran: initialHistory,
      },
    ]);
    toast_("Data CAPEX baru ditambahkan.");
    setShowAddForm(false);
    setNewCapex(emptyNew);
  }, [newCapex, setCapexList]);

  const saveEditCapex = useCallback(() => {
    if (!editTarget) return;
    const newRkap = parseFloat(editTarget.nilai_rkap) || 0;
    const newKad = parseFloat(editTarget.nilai_kad) || 0;
    const today = new Date().toISOString().split("T")[0];
    setCapexList((p) =>
      p.map((c) => {
        if (c.id !== editTarget.id) return c;
        const oldRkap = c.nilai_rkap || 0;
        // Jika nilai_rkap berubah atau belum ada di history, tambahkan entri baru
        const shouldAddHistory = newRkap > 0 && newRkap !== oldRkap;
        const newHistoryEntry = shouldAddHistory
          ? [{
              id: uid(),
              tgl: today,
              thn_rkap_awal: parseInt(editTarget.thn_rkap_awal),
              thn_rkap_akhir: parseInt(editTarget.thn_rkap_akhir),
              thn_anggaran: parseInt(editTarget.thn_anggaran),
              nilai_kad: newKad,
              nilai_rkap: newRkap,
            }]
          : [];
        return {
          ...c,
          nm_anggaran: editTarget.nm_anggaran,
          kd_capex: editTarget.kd_capex,
          thn_rkap_awal: parseInt(editTarget.thn_rkap_awal),
          thn_rkap_akhir: parseInt(editTarget.thn_rkap_akhir),
          thn_anggaran: parseInt(editTarget.thn_anggaran),
          nilai_kad: newKad,
          nilai_rkap: newRkap,
          history_anggaran: [...(c.history_anggaran || []), ...newHistoryEntry],
        };
      }),
    );
    setEditTarget(null);
    toast_("Perubahan disimpan.");
  }, [editTarget, setCapexList]);

  const handleDeleteCapex = useCallback(
    (id) =>
      setConfirm({
        msg: "Hapus data CAPEX ini beserta seluruh data di dalamnya?",
        onConfirm: () => {
          setCapexList((p) => p.filter((c) => c.id !== id));
          setConfirm(null);
          toast_("Data CAPEX dihapus.");
        },
      }),
    [setCapexList],
  );

  const handleSaveEntriAnggaran = useCallback(
    (capexId, entry, nilaiKad, nilaiRkap) => {
      const anggaran_item = {
        id: entry.id,
        thn_rkap_awal: entry.thn_rkap_awal,
        thn_rkap_akhir: entry.thn_rkap_akhir,
        nilai_kad: entry.nilai_kad,
        thn: entry.thn_anggaran,
        nilai_anggaran: nilaiRkap,
        history: [
          {
            tgl: entry.tgl,
            tipe: "entri_baru",
            nilai: nilaiRkap,
            user: "System",
          },
        ],
      };
      setCapexList((p) =>
        p.map((c) =>
          c.id !== capexId
            ? c
            : {
                ...c,
                nilai_kad: nilaiKad,
                anggaran_tahunan: [...(c.anggaran_tahunan || []), anggaran_item],
                history_anggaran: [...(c.history_anggaran || []), entry],
              },
        ),
      );
      toast_("Entri anggaran berhasil disimpan.");
      setInputAnggaranCapex((prev) =>
        prev?.id === capexId
          ? {
              ...prev,
              nilai_kad: nilaiKad,
              anggaran_tahunan: [
                ...(prev.anggaran_tahunan || []),
                anggaran_item,
              ],
              history_anggaran: [...(prev.history_anggaran || []), entry],
            }
          : prev,
      );
    },
    [setCapexList],
  );

  const handleSaveEditAnggaran = useCallback(
    (capexId, anggaranId, updatedData) => {
      setCapexList((p) =>
        p.map((c) =>
          c.id !== capexId
            ? c
            : {
              ...c,
              thn_rkap_awal: updatedData.thn_rkap_awal,
              thn_rkap_akhir: updatedData.thn_rkap_akhir,
              nilai_kad: updatedData.nilai_kad,
              anggaran_tahunan: (c.anggaran_tahunan || []).map((a) =>
                a.id === anggaranId
                  ? {
                    ...a,
                    thn: updatedData.thn,
                    nilai_anggaran: updatedData.nilai_anggaran,
                  }
                  : a,
              ),
            },
        ),
      );
      toast_("Perubahan anggaran berhasil disimpan.");
      setEditAnggaran(null);
    },
    [setCapexList],
  );

  if (detailCapex) {
    const latest =
      capexList.find((c) => c.id === detailCapex.id) || detailCapex;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {toast && <ToastMsg msg={toast} onDone={() => setToast(null)} />}
        <CapexDetailPage
          capex={latest}
          onBack={() => setDetailCapex(null)}
          setCapexList={setCapexList}
          toast_={toast_}
        />
      </div>
    );
  }
  if (inputAnggaranCapex) {
    const latest =
      capexList.find((c) => c.id === inputAnggaranCapex.id) ||
      inputAnggaranCapex;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {toast && <ToastMsg msg={toast} onDone={() => setToast(null)} />}
        <CapexInputAnggaranPage
          capex={latest}
          onBack={() => setInputAnggaranCapex(null)}
          onSave={handleSaveEntriAnggaran}
        />
      </div>
    );
  }

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
      {showAddForm && (
        <CapexFormModal
          title="Tambah Anggaran CAPEX Baru"
          data={newCapex}
          setData={setNewCapex}
          onSave={handleAddCapex}
          onClose={() => setShowAddForm(false)}
        />
      )}
      {editTarget && (
        <CapexFormModal
          title="Edit Anggaran CAPEX"
          data={editTarget}
          setData={setEditTarget}
          onSave={saveEditCapex}
          onClose={() => setEditTarget(null)}
        />
      )}
      {editAnggaran && (
        <CapexEditAnggaranModal
          capexId={editAnggaran.capexId}
          anggaran={editAnggaran.anggaran}
          capex={capexList.find((c) => c.id === editAnggaran.capexId)}
          onSave={handleSaveEditAnggaran}
          onClose={() => setEditAnggaran(null)}
        />
      )}

      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "#eff6ff",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Database size={20} style={{ color: "#2563eb" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: "#1e293b", fontSize: "1rem" }}>
            Anggaran Master CAPEX
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: 2 }}>
            <span
              style={{
                fontFamily: "monospace",
                background: "#dbeafe",
                color: "#1d4ed8",
                padding: "1px 6px",
                borderRadius: 4,
                fontWeight: 700,
                fontSize: "0.78rem",
                marginRight: 8,
              }}
            >
              5900100000
            </span>
            Beban Investasi
          </div>
        </div>
        <div
          style={{
            fontSize: "0.72rem",
            background: "#dbeafe",
            color: "#1d4ed8",
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 99,
            border: "1px solid #bfdbfe",
          }}
        >
          {capexList.length} data CAPEX
        </div>
      </div>

      {/* RINGKASAN ANGGARAN CAPEX */}
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid #f1f5f9",
            background: "#f8fafc",
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#374151",
            }}
          >
            Ringkasan Anggaran CAPEX
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 0,
          }}
        >
          {[
            {
              label: "Total KAD",
              val: fmt(capexList.reduce((sum, c) => sum + (c.nilai_kad || 0), 0)),
              color: "#2563eb",
              bg: "#eff6ff",
              border: "#bfdbfe",
            },
            {
              label: "Total RKAP",
              val: fmt(
                capexList.reduce(
                  (sum, c) =>
                    sum +
                    (c.anggaran_tahunan || []).reduce(
                      (s, a) => s + (a.nilai_anggaran || 0),
                      0,
                    ),
                  0,
                ),
              ),
              color: "#16a34a",
              bg: "#f0fdf4",
              border: "#bbf7d0",
            },
            {
              label: "Total Item CAPEX",
              val: `${capexList.length} item`,
              color: "#475569",
              bg: "#f8fafc",
              border: "#e2e8f0",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: "12px 16px",
                borderRight: i < 2 ? "1px solid #f1f5f9" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 4,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: item.color,
                }}
              >
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DAFTAR ANGGARAN CAPEX */}
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            borderBottom: "1px solid #f1f5f9",
            background: "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Layers size={17} style={{ color: "#2563eb" }} />
            <span
              style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}
            >
              Daftar Anggaran CAPEX
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {filterCapexTahun && (
              <button
                style={{
                  ...S.abtn,
                  padding: "4px 8px",
                  color: "#ef4444",
                  borderColor: "#fecaca",
                  background: "#fef2f2",
                  gap: 4,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}
                onClick={() => setFilterCapexTahun("")}
              >
                <X size={12} /> Clear
              </button>
            )}
            <button
              style={{
                ...S.btn,
                background: "#2563eb",
                padding: "8px 14px",
                fontSize: "0.78rem",
              }}
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={13} /> Tambah CAPEX Baru
            </button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ ...S.tbl, border: "none" }}>
            <thead>
              <tr>
                {[
                  "NO",
                  "NAMA ANGGARAN CAPEX",
                  "KD CAPEX",
                  "RKAP AWAL",
                  "RKAP AKHIR",
                  "NILAI KAD",
                  "THN ANGGARAN",
                  "NILAI RKAP",
                  "AKSI",
                ].map((h, i) => {
                  const isThnAnggaran = h === "THN ANGGARAN";
                  return (
                    <th
                      key={h}
                      style={{
                        ...S.th,
                        ...(i === 0 && { width: 48, textAlign: "center" }),
                        ...(i === 2 && { width: 110, textAlign: "center" }),
                        ...(i === 3 && { width: 90, textAlign: "center" }),
                        ...(i === 4 && { width: 90, textAlign: "center" }),
                        ...(i === 5 && { width: 140, textAlign: "right" }),
                        ...(i === 6 && {
                          width: 180,
                          textAlign: "center",
                          position: "relative",
                        }),
                        ...(i === 7 && { width: 140, textAlign: "right" }),
                        ...(i === 8 && { width: 130, textAlign: "center" }),
                        paddingRight: isThnAnggaran ? 28 : undefined,
                      }}
                    >
                      {isThnAnggaran ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            minHeight: 44,
                            gap: 6,
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>{h}</span>
                          <select
                            style={{
                              position: "absolute",
                              right: 2,
                              top: 0,
                              width: 24,
                              height: "100%",
                              padding: "0",
                              fontSize: "0.75rem",
                              background: "transparent",
                              border: "none",
                              color: filterCapexTahun ? "#1d4ed8" : "#94a3b8",
                              cursor: "pointer",
                              appearance: "none",
                              opacity: 0,
                            }}
                            value={filterCapexTahun}
                            onChange={(e) =>
                              setFilterCapexTahun(e.target.value)
                            }
                            title={filterCapexTahun || "Filter tahun"}
                          >
                            <option value="">Semua</option>
                            {Array.from(
                              new Set(capexList.map((c) => c.thn_anggaran)),
                            )
                              .sort((a, b) => b - a)
                              .map((y) => (
                                <option key={y} value={y}>
                                  {y}
                                </option>
                              ))}
                          </select>
                          <ChevronDown
                            size={14}
                            style={{
                              color: filterCapexTahun ? "#1d4ed8" : "#94a3b8",
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      ) : (
                        <span>{h}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {capexList.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      ...S.td,
                      textAlign: "center",
                      color: "#94a3b8",
                      padding: 32,
                      fontStyle: "italic",
                    }}
                  >
                    Belum ada data CAPEX. Klik "Tambah CAPEX Baru" untuk
                    menambahkan.
                  </td>
                </tr>
              ) : (
                capexList
                  .filter(
                    (c) =>
                      !filterCapexTahun ||
                      c.thn_anggaran === parseInt(filterCapexTahun),
                  )
                  .flatMap((c, idx) => {
                    const isLebih = c.thn_rkap_akhir > CURRENT_YEAR;
                    const rows = [
                      <tr
                        key={c.id}
                        style={{ background: isLebih ? "#fffbeb" : "white" }}
                      >
                        <td
                          style={{
                            ...S.td,
                            textAlign: "center",
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            color: "#94a3b8",
                          }}
                        >
                          {idx + 1}
                        </td>
                        <td style={S.td}>
                          <div
                            style={{
                              fontWeight: 600,
                              color: "#1e293b",
                              lineHeight: 1.4,
                              fontSize: "0.88rem",
                            }}
                          >
                            {c.nm_anggaran}
                          </div>
                        </td>
                        <td style={{ ...S.td, textAlign: "center" }}>
                          {c.kd_capex ? (
                            <span
                              style={{
                                fontFamily: "monospace",
                                background: "#dbeafe",
                                color: "#1d4ed8",
                                padding: "3px 8px",
                                borderRadius: 4,
                                fontWeight: 700,
                                fontSize: "0.8rem",
                              }}
                            >
                              {c.kd_capex}
                            </span>
                          ) : (
                            <span style={{ color: "#cbd5e1" }}>—</span>
                          )}
                        </td>
                        <td
                          style={{
                            ...S.td,
                            textAlign: "center",
                            color: "#64748b",
                            fontWeight: 600,
                          }}
                        >
                          {c.thn_rkap_awal}
                        </td>
                        <td style={{ ...S.td, textAlign: "center" }}>
                          <span
                            style={{
                              background: isLebih ? "#fef3c7" : "#f1f5f9",
                              color: isLebih ? "#b45309" : "#64748b",
                              border: `1px solid ${isLebih ? "#fde68a" : "#e2e8f0"}`,
                              padding: "3px 10px",
                              borderRadius: 99,
                              fontWeight: 700,
                              fontSize: "0.78rem",
                            }}
                          >
                            {c.thn_rkap_akhir}
                          </span>
                        </td>
                        <td style={{ ...S.td, textAlign: "right" }}>
                          {c.nilai_kad > 0 ? (
                            <span
                              style={{
                                fontWeight: 700,
                                color: "#2563eb",
                                fontSize: "0.82rem",
                              }}
                            >
                              {fmt(c.nilai_kad)}
                            </span>
                          ) : (
                            <span style={{ color: "#cbd5e1" }}>—</span>
                          )}
                        </td>
                        <td style={{ ...S.td, textAlign: "center" }}>
                          <span
                            style={{
                              background: "#f0fdf4",
                              color: "#16a34a",
                              border: "1px solid #bbf7d0",
                              padding: "3px 10px",
                              borderRadius: 99,
                              fontWeight: 700,
                              fontSize: "0.78rem",
                            }}
                          >
                            {c.thn_anggaran}
                          </span>
                        </td>
                        <td style={{ ...S.td, textAlign: "right" }}>
                          {c.nilai_rkap > 0 ? (
                            <span
                              style={{
                                fontWeight: 700,
                                color: "#16a34a",
                                fontSize: "0.82rem",
                              }}
                            >
                              {fmt(c.nilai_rkap)}
                            </span>
                          ) : (
                            <span style={{ color: "#cbd5e1" }}>—</span>
                          )}
                        </td>
                        <td style={{ ...S.td, textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                              justifyContent: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <button
                              style={{
                                ...S.abtn,
                                padding: "5px 8px",
                                background: "#eff6ff",
                                borderColor: "#bfdbfe",
                              }}
                              title="Detail"
                              onClick={() => setDetailCapex({ ...c })}
                            >
                              <Eye size={13} style={{ color: "#2563eb" }} />
                            </button>
                            {isLebih && (
                              <button
                                style={{
                                  ...S.abtn,
                                  padding: "5px 8px",
                                  background: "#fffbeb",
                                  borderColor: "#fde68a",
                                  gap: 3,
                                }}
                                title="Tambah Anggaran"
                                onClick={() => setInputAnggaranCapex({ ...c })}
                              >
                                <PlusCircle
                                  size={12}
                                  style={{ color: "#d97706" }}
                                />
                              </button>
                            )}
                            <button
                              style={{
                                ...S.abtn,
                                padding: "5px 8px",
                                background: "#fffbeb",
                                borderColor: "#fde68a",
                              }}
                              onClick={() => setEditTarget({ ...c })}
                            >
                              <Edit size={13} style={{ color: "#d97706" }} />
                            </button>
                            <button
                              style={{
                                ...S.abtn,
                                padding: "5px 8px",
                                background: "#fef2f2",
                                borderColor: "#fecaca",
                              }}
                              onClick={() => handleDeleteCapex(c.id)}
                            >
                              <Trash2 size={13} style={{ color: "#ef4444" }} />
                            </button>
                          </div>
                        </td>
                      </tr>,
                    ];
                    if (
                      isLebih &&
                      c.anggaran_tahunan &&
                      c.anggaran_tahunan.length > 0
                    ) {
                      rows.push(
                        ...c.anggaran_tahunan.map((a) => (
                          <tr
                            key={`${c.id}-${a.id}`}
                            style={{
                              background: "#fafafa",
                              borderTop: "1px solid #f1f5f9",
                            }}
                          >
                            <td style={{ ...S.td, textAlign: "center" }}></td>
                            <td
                              style={{
                                ...S.td,
                                paddingLeft: 32,
                                fontSize: "0.8rem",
                                color: "#94a3b8",
                              }}
                            >
                              └─ Entri {a.thn}
                            </td>
                            <td style={{ ...S.td }}></td>
                            <td
                              style={{
                                ...S.td,
                                textAlign: "center",
                                color: "#64748b",
                                fontWeight: 600,
                                fontSize: "0.78rem",
                              }}
                            >
                              {a.thn_rkap_awal}
                            </td>
                            <td
                              style={{
                                ...S.td,
                                textAlign: "center",
                                fontSize: "0.78rem",
                              }}
                            >
                              <span
                                style={{
                                  background: "#f1f5f9",
                                  color: "#64748b",
                                  border: "1px solid #e2e8f0",
                                  padding: "2px 8px",
                                  borderRadius: 99,
                                  fontWeight: 700,
                                }}
                              >
                                {a.thn_rkap_akhir}
                              </span>
                            </td>
                            <td
                              style={{
                                ...S.td,
                                textAlign: "right",
                                fontSize: "0.78rem",
                              }}
                            >
                              {a.nilai_kad > 0 ? (
                                <span
                                  style={{ fontWeight: 700, color: "#2563eb" }}
                                >
                                  {fmt(a.nilai_kad)}
                                </span>
                              ) : (
                                <span style={{ color: "#cbd5e1" }}>—</span>
                              )}
                            </td>
                            <td style={{ ...S.td, textAlign: "center" }}>
                              <span
                                style={{
                                  background: "#dbeafe",
                                  color: "#1d4ed8",
                                  border: "1px solid #bfdbfe",
                                  padding: "2px 8px",
                                  borderRadius: 99,
                                  fontWeight: 700,
                                  fontSize: "0.75rem",
                                }}
                              >
                                {a.thn}
                              </span>
                            </td>
                            <td
                              style={{
                                ...S.td,
                                textAlign: "right",
                                fontSize: "0.78rem",
                              }}
                            >
                              {a.nilai_anggaran > 0 ? (
                                <span
                                  style={{ fontWeight: 700, color: "#16a34a" }}
                                >
                                  {fmt(a.nilai_anggaran)}
                                </span>
                              ) : (
                                <span style={{ color: "#cbd5e1" }}>—</span>
                              )}
                            </td>
                            <td style={{ ...S.td, textAlign: "center" }}>
                              <div
                                style={{
                                  display: "flex",
                                  gap: 5,
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  style={{
                                    ...S.abtn,
                                    padding: "4px 6px",
                                    background: "#fffbeb",
                                    borderColor: "#fde68a",
                                  }}
                                  title="Edit"
                                  onClick={() =>
                                    setEditAnggaran({
                                      capexId: c.id,
                                      anggaran: a,
                                    })
                                  }
                                >
                                  <Edit
                                    size={12}
                                    style={{ color: "#d97706" }}
                                  />
                                </button>
                                <button
                                  style={{
                                    ...S.abtn,
                                    padding: "4px 6px",
                                    background: "#fef2f2",
                                    borderColor: "#fecaca",
                                  }}
                                  title="Hapus"
                                  onClick={() =>
                                    setCapexList((p) =>
                                      p.map((pc) =>
                                        pc.id === c.id
                                          ? {
                                            ...pc,
                                            anggaran_tahunan: (
                                              pc.anggaran_tahunan || []
                                            ).filter((r) => r.id !== a.id),
                                          }
                                          : pc,
                                      ),
                                    )
                                  }
                                >
                                  <Trash2
                                    size={12}
                                    style={{ color: "#ef4444" }}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )),
                      );
                    }
                    return rows;
                  })
              )}
            </tbody>
            {capexList.length > 0 && (
              <tfoot>
                <tr style={{ background: "#eff6ff" }}>
                  <td
                    colSpan={5}
                    style={{
                      ...S.td,
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#1d4ed8",
                      fontSize: "0.75rem",
                    }}
                  >
                    TOTAL
                  </td>
                  <td
                    style={{
                      ...S.td,
                      textAlign: "right",
                      fontWeight: 800,
                      color: "#1d4ed8",
                      fontSize: "0.82rem",
                    }}
                  >
                    {fmt(
                      capexList
                        .filter(
                          (c) =>
                            !filterCapexTahun ||
                            c.thn_anggaran === parseInt(filterCapexTahun),
                        )
                        .reduce((s, c) => s + (c.nilai_kad || 0), 0),
                    )}
                  </td>
                  <td
                    style={{
                      ...S.td,
                      textAlign: "center",
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    —
                  </td>
                  <td
                    style={{
                      ...S.td,
                      textAlign: "right",
                      fontWeight: 800,
                      color: "#16a34a",
                      fontSize: "0.82rem",
                    }}
                  >
                    {fmt(
                      capexList
                        .filter(
                          (c) =>
                            !filterCapexTahun ||
                            c.thn_anggaran === parseInt(filterCapexTahun),
                        )
                      .reduce(
                        (s, c) =>
                          s +
                          (c.anggaran_tahunan || []).reduce(
                            (ss, a) => ss + (a.nilai_anggaran || 0),
                            0,
                          ),
                        0,
                      ),
                    )}
                  </td>
                  <td style={S.td} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

// ── ROOT APP ───────────────────────────────────────────────────
export default function App() {
  const { type } = useParams();
  const [masterList, setMasterList] = useState(MASTER_LIST_INIT);
  const [capexList, setCapexList] = useState(INIT_CAPEX_FORM);
  const moduleType = type?.toUpperCase() || "OPEX";

  const wrap = (children) => (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <style>{CSS_BM}</style>
      <style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;font-family:'Plus Jakarta Sans',system-ui,sans-serif!important;}body{-webkit-font-smoothing:antialiased;}`}</style>
      <div style={{ padding: "0 2rem 2rem", maxWidth: 1400, margin: "0 auto" }}>
        {children}
      </div>
    </div>
  );

  if (moduleType === "CAPEX")
    return wrap(
      <CapexModule capexList={capexList} setCapexList={setCapexList} />,
    );
  return wrap(
    <OpexModule masterList={masterList} setMasterList={setMasterList} />,
  );
}