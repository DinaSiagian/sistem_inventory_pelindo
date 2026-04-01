import React, { useState, useMemo, useEffect, useRef } from "react";
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
} from "lucide-react";

// ════════════════════════════════════════════════════════════════
// ICON COMPONENT (dari BudgetManagement)
// ════════════════════════════════════════════════════════════════
const Icon = ({ d, size = 16, style, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    {Array.isArray(d) ? (
      d.map((dd, i) => <path key={i} d={dd} />)
    ) : (
      <path d={d} />
    )}
  </svg>
);

const I = {
  briefcase:
    "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  monitor:
    "M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4M9 17l3 3 3-3M12 17v3",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevDown: "m6 9 6 6 6-6",
  chevUp: "m18 15-6-6-6 6",
  chevLeft: "m15 18-6-6 6-6",
  chevRight: "m9 18 6-6-6-6",
  plus: "M5 12h14M12 5v14",
  x: "M18 6 6 18M6 6l12 12",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:
    "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  check: "M20 6 9 17l-5-5",
  package:
    "M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12",
  warning:
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0-3.42 0zM12 9v4M12 17h.01",
  calendar:
    "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  fileText:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  arrowLeft: "m12 19-7-7 7-7M19 12H5",
  database:
    "M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zM2 12c0 2.76 4.48 5 10 5s10-2.24 10-5M2 7c0 2.76 4.48 5 10 5s10-2.24 10-5",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01",
  checkCirc: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  mapPin:
    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  hash: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  clock:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  image:
    "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-6 6.17a2.5 2.5 0 1 1-3.5 0 2.5 2.5 0 0 1 3.5 0zM11.5 14H10v4h1.5a1.5 1.5 0 1 0 0-3zm6 0h-1v4h1a2 2 0 1 0 0-4zm-3.5 0h-1v4h1a2 2 0 1 0 0-4zm-6.5-6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  table:
    "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
};

// ════════════════════════════════════════════════════════════════
// DATA & UTILS (dari BudgetManagement)
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
// DATA MASTER
// ════════════════════════════════════════════════════════════════
const MASTER_LIST = [
  { kd: "5030905000", nm: "Beban Pemeliharaan Software", tipe: "OPEX" },
  { kd: "5021300000", nm: "Beban Jaringan dan Koneksi Data", tipe: "OPEX" },
  { kd: "5021200000", nm: "Beban Perlengkapan Kantor", tipe: "OPEX" },
  { kd: "5081500000", nm: "Beban Jasa Konsultan", tipe: "OPEX" },
  { kd: "5060700000", nm: "Beban Sumber Daya Pihak Ketiga Peralatan", tipe: "OPEX" },
  { kd: "5900100000", nm: "Beban Investasi", tipe: "CAPEX" },
];

const BUDGET_MASTERS = [
  { kd_anggaran_master: "5030905000", nm_anggaran_master: "Beban Pemeliharaan Software", tipe_anggaran_master: "OPEX" },
  { kd_anggaran_master: "5021300000", nm_anggaran_master: "Beban Jaringan dan Koneksi Data", tipe_anggaran_master: "OPEX" },
  { kd_anggaran_master: "5021200000", nm_anggaran_master: "Beban Perlengkapan Kantor", tipe_anggaran_master: "OPEX" },
  { kd_anggaran_master: "5030100000", nm_anggaran_master: "Beban Pemeliharaan Hardware", tipe_anggaran_master: "OPEX" },
  { kd_anggaran_master: "5040200000", nm_anggaran_master: "Beban Jasa Konsultan IT", tipe_anggaran_master: "OPEX" },
];

// ════════════════════════════════════════════════════════════════
// INIT DATA OPEX (BudgetManagement)
// ════════════════════════════════════════════════════════════════
const INIT_OPEX_BM = [
  {
    id: "OPX-1",
    kd_anggaran_master: "5030905000",
    nama: "Beban Pemeliharaan Software",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 350000000,
    type: "opex",
    transaksi: [
      { id: newId(), tanggal: "2026-02-10", keterangan: "Lisensi Antivirus Kaspersky", no_invoice: "INV/2026/015", aset: "", lampiran: "", jumlah: 8500000 },
      { id: newId(), tanggal: "2026-01-15", keterangan: "Pembayaran Lisensi Microsoft Office 365", no_invoice: "INV/2026/001", aset: "AST-OPX-0001", lampiran: "", jumlah: 15000000 },
    ],
  },
  {
    id: "OPX-2",
    kd_anggaran_master: "5021300000",
    nama: "Beban Jaringan dan Koneksi Data",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 288000000,
    type: "opex",
    transaksi: [
      { id: newId(), tanggal: "2026-01-05", keterangan: "Tagihan MPLS Januari 2026", no_invoice: "INV/2026/002", aset: "", lampiran: "", jumlah: 24000000 },
    ],
  },
  {
    id: "OPX-3",
    kd_anggaran_master: "5021200000",
    nama: "Beban Perlengkapan Kantor",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 120000000,
    type: "opex",
    transaksi: [],
  },
  {
    id: "OPX-4",
    kd_anggaran_master: "5081500000",
    nama: "Beban Jasa Konsultan",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 800000000,
    type: "opex",
    transaksi: [
      { id: newId(), tanggal: "2026-03-01", keterangan: "Konsultan IT Masterplan Tahap 1", no_invoice: "INV/2026/045", aset: "", lampiran: "", jumlah: 150000000 },
    ],
  },
  {
    id: "OPX-5",
    kd_anggaran_master: "5060700000",
    nama: "Beban Sumber Daya Pihak Ketiga Peralatan",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 900000000,
    type: "opex",
    transaksi: [],
  },
  {
    id: "OPX-6",
    kd_anggaran_master: "5030906000",
    nama: "Beban Pemeliharaan Hardware",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 450000000,
    type: "opex",
    transaksi: [
      { id: newId(), tanggal: "2026-02-20", keterangan: "Maintenance Server Dell R750", no_invoice: "INV/2026/033", aset: "SPMT-KPT-DTC-SRV-01", lampiran: "", jumlah: 25000000 },
    ],
  },
  {
    id: "OPX-7",
    kd_anggaran_master: "5021400000",
    nama: "Beban Lisensi dan Subskripsi",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 300000000,
    type: "opex",
    transaksi: [],
  },
];

// ════════════════════════════════════════════════════════════════
// INIT DATA OPEX (Input Form / file 2)
// ════════════════════════════════════════════════════════════════
const INIT_OPEX_FORM = [
  {
    id: "OPX-F-1",
    kd_master: "5030905000",
    nm_master: "Beban Pemeliharaan Software",
    nm_anggaran: "Lisensi Software Antivirus",
    kd_anggaran: "5030905001",
    anggaran_tahunan: [
      {
        id: "OPX-YR-1",
        thn: 2024,
        anggaran_murni: 900000000,
        anggaran_bymhd: 100000000,
        history: [
          { id: "H1", tgl: "2024-01-01", tipe: "initial", nilai: 900000000, is_initial: true, keterangan: "Input awal murni" },
          { id: "H2", tgl: "2024-01-02", tipe: "bymhd", nilai: 100000000, is_initial: false, keterangan: "Input awal BYMHD" },
        ],
      },
    ],
  },
];

const INIT_CAPEX_FORM = [
  {
    id: "CAP-F-1",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Implementasi dan Standarisasi IT Infrastruktur",
    kd_capex: "2440015",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [],
    pekerjaan: [
      {
        id: "PKJ-001",
        nm: "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur PT Pelindo Multi Terminal",
        nilai_rab: 0, nilai_kontrak: 0,
        no_pr: "", no_po: "6440000026",
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-12", durasi_kontrak: 90,
        no_sp3: "", tgl_sp3: "", tgl_bamk: "2024-08-02", keterangan: "",
      },
    ],
  },
];

const uid = () => `ID-${Date.now().toString().slice(-6)}`;
const yearOpts = (() => {
  const max = new Date().getFullYear() - 1;
  const a = [];
  for (let y = max; y >= 2000; y--) a.push(y);
  return a;
})();

// ════════════════════════════════════════════════════════════════
// CSS (BudgetManagement)
// ════════════════════════════════════════════════════════════════
const CSS_BM = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");

:root {
  --blue: #2563eb; --blue-lt: #eff6ff; --blue-mid: #dbeafe;
  --green: #16a34a; --green-lt: #f0fdf4; --green-mid: #dcfce7;
  --amber: #d97706; --amber-lt: #fffbeb;
  --red: #dc2626; --red-lt: #fef2f2;
  --ink: #111827; --ink2: #374151; --ink3: #6b7280; --ink4: #9ca3af;
  --border: #e5e7eb; --border-lt: #f3f4f6;
  --surf: #ffffff; --bg: #f9fafb;
  --mono: "JetBrains Mono", "Courier New", monospace;
  --r: 8px; --r-lg: 12px;
  --sh: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
  --sh-md: 0 4px 12px rgba(0,0,0,.08);
  --sh-lg: 0 20px 48px rgba(0,0,0,.14);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: "Plus Jakarta Sans", system-ui, sans-serif; background: var(--bg); color: var(--ink); font-size: 13px; -webkit-font-smoothing: antialiased; line-height: 1.5; }

.root { padding: 2rem 2.5rem; min-height: 100vh; max-width: 1400px; margin: 0 auto; }
.hdr { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.hdr h1 { font-size: 1.4rem; font-weight: 800; letter-spacing: -.5px; color: var(--ink); }
.hdr p { font-size: .8rem; color: var(--ink4); margin-top: 4px; font-weight: 500; }
.hdr-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

.yr-row { display: flex; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 4px; gap: 2px; box-shadow: var(--sh); }
.yr-btn { padding: 6px 14px; border-radius: 6px; border: none; cursor: pointer; font-family: inherit; font-size: .75rem; font-weight: 600; background: transparent; color: var(--ink3); transition: all .15s; }
.yr-btn:hover:not(.on) { background: var(--bg); color: var(--ink2); }
.yr-btn.on { background: var(--blue); color: #fff; font-weight: 700; box-shadow: 0 2px 6px rgba(37,99,235,0.2); }

.type-tabs { display: flex; gap: 2px; background: var(--surf); padding: 4px; border-radius: var(--r); border: 1px solid var(--border); box-shadow: var(--sh); }
.type-tab { display: flex; align-items: center; gap: 6px; padding: 6px 16px; border: none; background: transparent; border-radius: 6px; font-family: inherit; font-size: .75rem; font-weight: 600; color: var(--ink3); cursor: pointer; transition: all .15s; }
.type-tab:hover:not(.on) { background: var(--bg); color: var(--ink2); }
.type-tab.on { background: var(--blue); color: #fff; box-shadow: 0 2px 6px rgba(37,99,235,0.2); }
.type-tab.on.all { background: var(--ink); box-shadow: 0 2px 6px rgba(15,23,42,0.2); }

.kpi-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
.kpi { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 1.25rem; display: flex; gap: 16px; align-items: center; box-shadow: var(--sh); transition: transform 0.2s; }
.kpi:hover { transform: translateY(-2px); box-shadow: var(--sh-md); }
.kpi-ico { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi.blue .kpi-ico { background: var(--blue-lt); color: var(--blue); }
.kpi.amber .kpi-ico { background: var(--amber-lt); color: var(--amber); }
.kpi.green .kpi-ico { background: var(--green-lt); color: var(--green); }
.kpi-body { flex: 1; min-width: 0; }
.kpi-lbl { font-size: .7rem; color: var(--ink3); font-weight: 600; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
.kpi-val { font-size: 1.2rem; font-weight: 800; color: var(--ink); line-height: 1; }
.kpi-sub { font-size: .7rem; color: var(--ink4); margin-top: 6px; }
.kpi-bar { height: 4px; background: var(--border-lt); border-radius: 99px; overflow: hidden; margin-top: 8px; }
.kpi-bar-fill { height: 100%; border-radius: 99px; transition: width .6s ease; }

.toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.flt-box, .srch { display: flex; align-items: center; gap: 8px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 8px 12px; box-shadow: var(--sh); transition: border-color .2s; }
.flt-box:focus-within, .srch:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.flt-box svg, .srch svg { color: var(--ink4); flex-shrink: 0; }
.flt-select, .srch input { border: none; background: transparent; font-family: inherit; font-size: .8rem; color: var(--ink); outline: none; }
.flt-select { cursor: pointer; min-width: 180px; font-weight: 500; }
.srch { flex: 1; max-width: 380px; }
.srch input { flex: 1; }

.section-label { display: flex; align-items: center; gap: 12px; margin: 1.5rem 0 1rem; }
.section-label-line { flex: 1; height: 1px; background: var(--border); }
.section-label-pill { display: flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 99px; font-size: .75rem; font-weight: 700; border: 1px solid transparent; }
.section-label-pill.capex { background: var(--blue-lt); color: var(--blue); border-color: var(--blue-mid); }
.section-label-pill.opex { background: var(--green-lt); color: var(--green); border-color: var(--green-mid); }
.section-count { font-size: .75rem; color: var(--ink4); font-weight: 500; }

.card-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.empty { background: var(--surf); border: 1.5px dashed var(--border); border-radius: var(--r-lg); text-align: center; padding: 3rem; color: var(--ink4); font-size: .85rem; font-weight: 500; }

.jcard { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--sh); transition: transform .15s, box-shadow .15s; }
.jcard:hover { transform: translateY(-1px); box-shadow: var(--sh-md); }
.jcard.open-cap { border-color: var(--blue-mid); }
.jcard.open-opx { border-color: var(--green-mid); }
.jcard-inner { display: flex; }
.jcard-accent { width: 3px; flex-shrink: 0; }
.jcard-accent.cap { background: var(--blue); }
.jcard-accent.opx { background: var(--green); }
.jcard-content { flex: 1; min-width: 0; }
.jcard-top { display: grid; grid-template-columns: 2.2fr 1.3fr 2.5fr auto; align-items: center; gap: 16px; padding: 14px 20px; cursor: pointer; transition: background .15s; }
.jcard-top:hover { background: var(--bg); }
.jcard.open-cap .jcard-top { background: #f8faff; }
.jcard.open-opx .jcard-top { background: #f7fef9; }

.jc-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.jc-tags { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.badge { font-size: 0.65rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.badge.capex { background: var(--blue-lt); color: var(--blue); }
.badge.opex { background: var(--green-lt); color: var(--green); }
.code-tag { font-family: var(--mono); font-size: 0.7rem; color: var(--ink3); background: var(--border-lt); border: 1px solid var(--border); padding: 1px 6px; border-radius: 4px; }
.yr-tag { font-size: 0.7rem; font-weight: 600; color: var(--ink3); background: var(--border-lt); border: 1px solid var(--border); padding: 1px 6px; border-radius: 4px; }
.jc-title { font-size: 0.85rem; font-weight: 700; color: var(--ink); line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.jc-meta { display: flex; flex-direction: column; gap: 4px; font-size: 0.75rem; color: var(--ink3); font-weight: 500; }
.jc-meta span { display: flex; align-items: center; gap: 6px; }
.jc-fin { display: flex; align-items: center; justify-content: flex-end; gap: 20px; }
.amt-blk { display: flex; flex-direction: column; gap: 2px; text-align: right; }
.amt-lbl { font-size: 0.65rem; color: var(--ink4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.amt-val { font-size: 0.9rem; font-weight: 800; }
.amt-val.blue { color: var(--blue); }
.amt-val.amber { color: var(--amber); }
.amt-val.red { color: var(--red); }
.amt-val.green { color: var(--green); }
.fin-div { width: 1px; height: 28px; background: var(--border); }
.jc-actions { display: flex; align-items: center; gap: 16px; justify-content: flex-end; }
.ring-wrap { display: flex; align-items: center; gap: 8px; }
.ring { position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.ring svg { position: absolute; top: 0; left: 0; transform: rotate(-90deg); width: 100%; height: 100%; }
.ring-lbl { font-size: 0.7rem; font-weight: 800; color: var(--ink); z-index: 1; }
.status-pill { font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 99px; border: 1px solid transparent; }
.act-btns { display: flex; gap: 4px; }
.abtn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); font-family: inherit; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all .15s; background: var(--surf); color: var(--ink3); }
.abtn:hover { background: var(--bg); border-color: #cbd5e1; color: var(--ink2); }
.abtn.blue { background: var(--blue-lt); border-color: var(--blue-mid); color: var(--blue); }
.abtn.blue:hover { background: var(--blue-mid); color: #1d4ed8; }
.abtn.green { background: var(--green-lt); border-color: var(--green-mid); color: var(--green); }
.abtn.green:hover { background: var(--green-mid); color: #15803d; }
.abtn.del { padding: 6px 8px; }
.abtn.del:hover { background: var(--red-lt); border-color: #fca5a5; color: var(--red); }
.chev { color: var(--ink4); padding: 4px; border-radius: 50%; display: flex; transition: background 0.15s; }
.jcard-top:hover .chev { background: var(--border); color: var(--ink2); }

.jcard-detail { padding: 20px; background: var(--bg); border-top: 1px dashed var(--border); animation: slideDown .15s ease-out; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.d-panel { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 16px; box-shadow: var(--sh); }
.d-title { font-size: 0.75rem; font-weight: 800; color: var(--ink2); margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-lt); padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;}
.d-rows { display: flex; flex-direction: column; gap: 6px; }
.d-row { display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.8rem; }
.d-row .lbl { color: var(--ink4); font-weight: 500; }
.d-row .val { color: var(--ink); font-weight: 600; text-align: right; }
.d-row code { font-family: var(--mono); font-size: 0.75rem; color: var(--blue); background: var(--blue-lt); padding: 2px 6px; border-radius: 4px; }
.d-empty { font-size: 0.8rem; color: var(--ink4); text-align: center; padding: 16px; background: var(--bg); border-radius: 8px; border: 1px dashed var(--border); }
.inline-link { font-size: 0.75rem; font-weight: 700; color: var(--blue); background: none; border: none; cursor: pointer; padding: 0; display: inline-flex; align-items: center; gap: 4px; transition: color .15s; }
.inline-link:hover { color: #1e40af; text-decoration: underline; }

.ai-list, .ri-list { display: flex; flex-direction: column; gap: 6px; }
.ai-item, .ri-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--surf); border: 1px solid var(--border); border-radius: 8px; box-shadow: var(--sh); }
.ai-info, .ri-info { display: flex; align-items: center; gap: 10px; }
.a-code, .r-id { font-family: var(--mono); font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; white-space: nowrap; }
.a-code { background: var(--blue-lt); color: var(--blue); }
.r-id { background: var(--amber-lt); color: var(--amber); }
.a-name, .r-ket { font-size: 0.8rem; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
.a-loc, .r-date { font-size: 0.7rem; color: var(--ink4); display: flex; align-items: center; gap: 4px; font-weight: 500; }
.a-val { font-size: 0.85rem; font-weight: 800; color: var(--blue); }
.r-val { font-size: 0.85rem; font-weight: 800; color: var(--amber); }
.panel-total { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 8px; margin-top: 6px; }
.panel-total.blue { background: var(--blue-lt); border: 1px solid var(--blue-mid); color: var(--blue); }
.panel-total.amber { background: var(--amber-lt); border: 1px solid #fde68a; color: var(--amber); }
.panel-total span { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.panel-total strong { font-size: 0.95rem; font-weight: 800; }

.overlay { position: fixed; inset: 0; background: rgba(15,23,42,.5); display: flex; align-items: center; justify-content: center; z-index: 900; backdrop-filter: blur(2px); padding: 20px; animation: fadeOvl .15s ease; }
.mbox { background: var(--surf); border-radius: var(--r-lg); width: 100%; max-width: 600px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--sh-lg); animation: modalUp .2s cubic-bezier(.16,1,.3,1); }
.mbox.wide { max-width: 720px; }
.mhd { display: flex; align-items: flex-start; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
.mhd-left { display: flex; align-items: center; gap: 12px; }
.m-ico { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.m-ico.blue { background: var(--blue-lt); color: var(--blue); }
.m-ico.green { background: var(--green-lt); color: var(--green); }
.m-ico.amber { background: var(--amber-lt); color: var(--amber); }
.mhd h3 { font-size: 0.95rem; font-weight: 800; color: var(--ink); }
.mhd p { font-size: 0.75rem; color: var(--ink4); font-weight: 500; }
.m-close { width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border); background: var(--border-lt); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--ink2); transition: all .15s; flex-shrink: 0; }
.m-close:hover { background: var(--red-lt); border-color: #fca5a5; color: var(--red); }
.mbody { padding: 20px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; flex: 1; }
.mfoot { display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 16px 20px; border-top: 1px solid var(--border); flex-shrink: 0; background: var(--bg); }

.btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-family: inherit; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: none; transition: all .15s; white-space: nowrap; }
.btn-outline { background: var(--surf); border: 1px solid var(--border); color: var(--ink2); }
.btn-outline:hover { background: var(--bg); border-color: #cbd5e1; }
.btn-prim { background: var(--blue); color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.2); }
.btn-prim:hover { background: #1d4ed8; }
.btn-green { background: var(--green); color: #fff; box-shadow: 0 2px 8px rgba(22,163,74,.2); }
.btn-green:hover { background: #15803d; }
.btn-excel { background: #166534; color: #fff; box-shadow: 0 2px 8px rgba(22,101,52,.25); }
.btn-excel:hover { background: #14532d; }

.pagination-bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 4px; margin-bottom: 24px; flex-wrap: wrap; gap: 8px; }
.pagination-info { font-size: 0.75rem; color: var(--ink4); font-weight: 500; }
.pagination-controls { display: flex; align-items: center; gap: 4px; }
.pg-btn { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 6px; border: 1px solid var(--border); background: var(--surf); color: var(--ink3); font-family: inherit; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all .15s; }
.pg-btn:hover:not(:disabled):not(.active) { background: var(--bg); border-color: #cbd5e1; color: var(--ink2); }
.pg-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: 0 2px 6px rgba(37,99,235,.2); }
.pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.asset-page { animation: fadeUp .15s ease-out; }
.asset-page-hdr { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.asset-page-hdr-left { display: flex; align-items: center; gap: 16px; }
.asset-page-hdr-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.asset-ctx-banner { background: var(--surf); border: 1px solid var(--border); border-left: 4px solid var(--blue); border-radius: var(--r-lg); padding: 14px 20px; margin-bottom: 20px; display: flex; gap: 32px; flex-wrap: wrap; box-shadow: var(--sh); }
.asset-ctx-banner.opex-theme { border-left-color: var(--green); }
.asset-ctx-item { display: flex; flex-direction: column; gap: 3px; }
.asset-ctx-item span { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--ink4); letter-spacing: 0.5px; }
.asset-ctx-item strong { font-size: 0.88rem; font-weight: 700; color: var(--ink); }

.asset-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.asset-toolbar-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.asset-toolbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.at-filter { display: flex; align-items: center; gap: 8px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 7px 12px; box-shadow: var(--sh); transition: border-color .2s; }
.at-filter:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.at-filter svg { color: var(--ink4); flex-shrink: 0; }
.at-filter input, .at-filter select { border: none; background: transparent; font-family: inherit; font-size: 0.78rem; color: var(--ink); outline: none; font-weight: 500; }
.at-filter select { cursor: pointer; min-width: 130px; }
.at-filter input { min-width: 220px; }

.asset-table-wrap { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--sh); overflow: hidden; }
.asset-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.asset-table thead tr { background: var(--bg); border-bottom: 2px solid var(--border); }
.asset-table thead th { padding: 11px 14px; text-align: left; font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--ink3); white-space: nowrap; border-right: 1px solid var(--border-lt); user-select: none; cursor: default; }
.asset-table thead th:last-child { border-right: none; }
.asset-table thead th.th-no { width: 44px; text-align: center; }
.asset-table thead th.th-actions { width: 80px; text-align: center; }
.asset-table tbody tr { border-bottom: 1px solid var(--border-lt); transition: background .12s; }
.asset-table tbody tr:last-child { border-bottom: none; }
.asset-table tbody tr:hover { background: #f8faff; }
.asset-table.opex-table tbody tr:hover { background: #f7fef9; }
.asset-table tbody td { padding: 11px 14px; vertical-align: middle; border-right: 1px solid var(--border-lt); }
.asset-table tbody td:last-child { border-right: none; }
.td-no { text-align: center; font-size: 0.7rem; font-weight: 700; color: var(--ink4); background: var(--bg); }
.td-name-text { font-size: 0.82rem; font-weight: 700; color: var(--ink); line-height: 1.3; }
.td-name-sub { font-size: 0.7rem; color: var(--ink4); font-weight: 500; }
.td-sn { font-family: var(--mono); font-size: 0.7rem; color: var(--ink3); font-weight: 600; }
.td-date { font-size: 0.78rem; color: var(--ink3); font-weight: 500; }
.td-value { font-size: 0.85rem; font-weight: 800; color: var(--blue); white-space: nowrap; }
.td-actions { text-align: center; }
.td-act-row { display: flex; align-items: center; justify-content: center; gap: 4px; }
.asset-table tfoot tr { background: var(--blue-lt); border-top: 2px solid var(--blue-mid); }
.asset-table tfoot td { padding: 10px 14px; font-size: 0.78rem; font-weight: 700; color: var(--blue); }
.asset-table tfoot .tfoot-total { font-size: 0.9rem; font-weight: 800; }
.asset-table.opex-table tfoot tr { background: var(--green-lt); border-top-color: var(--green-mid); }
.asset-table.opex-table tfoot td { color: var(--green); }
.table-empty-row td { text-align: center; padding: 48px 24px !important; color: var(--ink4); }
.table-empty-inner { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.asset-summary-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; background: var(--bg); border-top: 1px solid var(--border); flex-wrap: wrap; gap: 12px; }
.asset-summary-stat { display: flex; align-items: center; gap: 8px; }
.asset-summary-stat span { font-size: 0.75rem; color: var(--ink4); font-weight: 500; }
.asset-summary-stat strong { font-size: 0.85rem; font-weight: 800; color: var(--ink); }

.subpage { animation: fadeUp .15s ease-out; max-width: 900px; margin: 0 auto; }
.subpage-hdr { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.subpage-hdr h2 { font-size: 1.25rem; font-weight: 800; flex: 1; letter-spacing: -0.5px; }
.ctx-card { background: var(--surf); border: 1px solid var(--border); border-left: 4px solid var(--blue); border-radius: var(--r-lg); padding: 16px 20px; margin-bottom: 24px; display: flex; gap: 24px; flex-wrap: wrap; box-shadow: var(--sh); }
.ctx-item { display: flex; flex-direction: column; gap: 4px; }
.ctx-item span { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--ink4); letter-spacing: 0.5px; }
.ctx-item strong { font-size: 0.9rem; font-weight: 700; color: var(--ink); }

.toast { position: fixed; bottom: 24px; right: 24px; background: var(--ink); color: #fff; padding: 12px 20px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; box-shadow: var(--sh-lg); display: flex; align-items: center; gap: 8px; z-index: 9999; animation: toastIn .2s ease; }
.cbox { background: var(--surf); border-radius: 16px; padding: 24px; max-width: 320px; width: 100%; box-shadow: var(--sh-lg); display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; animation: modalUp .2s ease; }

@keyframes slideDown { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeOvl { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalUp { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

@media(max-width:1024px) {
  .jcard-top { grid-template-columns: 1fr; gap: 12px; }
  .jc-fin { justify-content: flex-start; }
  .jc-actions { justify-content: flex-start; flex-wrap: wrap; }
  .fin-div { display: none; }
}
@media(max-width:900px) {
  .root { padding: 24px 20px 80px; }
  .hdr { flex-direction: column; align-items: stretch; }
  .kpi-strip { grid-template-columns: 1fr; }
  .detail-grid { grid-template-columns: 1fr; }
}
`;

const PAGE_SIZE = 5;

// ════════════════════════════════════════════════════════════════
// SHARED BM COMPONENTS
// ════════════════════════════════════════════════════════════════
function ToastBM({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <Icon d={I.check} size={14} />
      {msg}
    </div>
  );
}

function ConfirmBM({ msg, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="cbox" onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 48, height: 48, background: "#fff7ed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}>
          <Icon d={I.warning} size={24} />
        </div>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)" }}>{msg}</p>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={onCancel}>Batal</button>
          <button className="btn" style={{ flex: 1, justifyContent: "center", background: "var(--red)", color: "#fff" }} onClick={onConfirm}>
            <Icon d={I.trash} size={14} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function PctRing({ pct }) {
  const meta = pctMeta(pct);
  const r = 16, circ = 2 * Math.PI * r;
  const filled = (Math.min(pct, 100) / 100) * circ;
  return (
    <div className="ring-wrap">
      <div className="ring">
        <svg width="36" height="36" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
          <circle cx="18" cy="18" r={r} fill="none" stroke={pctColor(pct)} strokeWidth="4"
            strokeDasharray={`${filled} ${circ}`} strokeDashoffset={circ * 0.25} strokeLinecap="round"
            style={{ transition: "stroke-dasharray .5s ease" }} />
        </svg>
        <span className="ring-lbl">{pct}%</span>
      </div>
      <span className="status-pill" style={{ background: meta.bg, color: meta.fg, borderColor: meta.border }}>{meta.label}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// REALISASI TABLE PAGE (dari BudgetManagement)
// ════════════════════════════════════════════════════════════════
function RealisasiTablePage({ ang, onBack, onEntryNew, onEditRow, onDeleteRow, showToast }) {
  const [searchQ, setSearchQ] = useState("");
  const transactions = ang.transaksi || [];

  const filtered = useMemo(
    () => transactions.filter((t) => {
      if (searchQ) {
        const q = searchQ.toLowerCase();
        return t.keterangan?.toLowerCase().includes(q) || t.no_invoice?.toLowerCase().includes(q);
      }
      return true;
    }),
    [transactions, searchQ],
  );

  const totalFiltered = filtered.reduce((s, t) => s + (t.jumlah || 0), 0);
  const totalAll = transactions.reduce((s, t) => s + (t.jumlah || 0), 0);
  const pagu = ang.nilai_anggaran_tahunan || 0;
  const sisa = pagu - totalAll;
  const pct = pagu > 0 ? Math.round((totalAll / pagu) * 100) : 0;

  const exportExcelOpex = () => {
    const headers = ["No", "Tanggal", "Keterangan", "No. Invoice", "Jumlah (IDR)"];
    const rows = filtered.map((t, i) => [
      i + 1,
      t.tanggal ? new Date(t.tanggal).toLocaleDateString("id-ID") : "",
      t.keterangan || "",
      t.no_invoice || "",
      t.jumlah || 0,
    ]);
    const infoRows = [
      ["Laporan Riwayat Realisasi OPEX"],
      ["Pos Anggaran:", ang.nama || ""],
      ["Kode Master:", ang.kd_anggaran_master || ""],
      ["Pagu Anggaran:", pagu],
      ["Total Realisasi:", totalAll],
      ["Sisa Anggaran:", sisa],
      ["Tanggal Export:", new Date().toLocaleDateString("id-ID")],
      [],
      headers,
      ...rows,
      [],
      ["", "", "", "TOTAL REALISASI", totalFiltered],
    ];
    const csvContent = infoRows.map((row) =>
      row.map((cell) => {
        const s = String(cell);
        return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
      }).join(","),
    ).join("\n");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (ang.nama || "opex").replace(/[^a-zA-Z0-9-]/g, "_");
    a.download = `Realisasi_${safeName}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("File berhasil diunduh (.csv)");
  };

  return (
    <div className="asset-page">
      <div className="asset-page-hdr">
        <div className="asset-page-hdr-left">
          <button className="btn btn-outline" onClick={onBack}>
            <Icon d={I.arrowLeft} size={12} /> Kembali
          </button>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--ink)", marginBottom: 3 }}>
              Riwayat Realisasi OPEX
            </h2>
            <p style={{ fontSize: "0.75rem", color: "var(--ink4)", fontWeight: 500 }}>
              {transactions.length} transaksi tercatat · {ang.nama?.substring(0, 55)}{ang.nama?.length > 55 ? "…" : ""}
            </p>
          </div>
        </div>
        <div className="asset-page-hdr-right">
          <button className="btn btn-excel" onClick={exportExcelOpex}>
            <Icon d={I.download} size={13} /> Export Excel
          </button>
          <button className="btn btn-green" onClick={onEntryNew}>
            <Icon d={I.plus} size={13} /> Entry Transaksi Baru
          </button>
        </div>
      </div>

      <div className="asset-ctx-banner opex-theme">
        <div className="asset-ctx-item">
          <span>Pos Anggaran</span>
          <strong style={{ maxWidth: 260 }}>{ang.nama?.substring(0, 48)}{ang.nama?.length > 48 ? "…" : ""}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Kode Master</span>
          <strong><code style={{ fontFamily: "var(--mono)", fontSize: "0.82rem" }}>{ang.kd_anggaran_master || "—"}</code></strong>
        </div>
        <div className="asset-ctx-item">
          <span>Pagu Anggaran</span>
          <strong style={{ color: "var(--blue)" }}>{pagu > 0 ? fmt(pagu) : "—"}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Total Realisasi</span>
          <strong style={{ color: "var(--amber)" }}>{fmt(totalAll)}</strong>
        </div>
        <div className="asset-ctx-item">
          <span>Sisa Anggaran</span>
          <strong style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>
            {fmt(Math.abs(sisa))} {sisa < 0 && "(melebihi)"}
          </strong>
        </div>
      </div>

      <div className="asset-toolbar">
        <div className="asset-toolbar-left">
          <div className="at-filter">
            <Icon d={I.search} size={13} />
            <input
              placeholder="Cari keterangan atau no. invoice…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="asset-table-wrap">
        <table className="asset-table opex-table">
          <thead>
            <tr>
              <th className="th-no">No</th>
              <th>Tanggal</th>
              <th>No. Invoice</th>
              <th>Keterangan Realisasi</th>
              <th>Lampiran</th>
              <th>Jumlah (IDR)</th>
              <th className="th-actions">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="table-empty-row">
                <td colSpan={7}>
                  <div className="table-empty-inner">
                    <Icon d={I.fileText} size={36} style={{ opacity: 0.2 }} />
                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {transactions.length === 0 ? "Belum ada riwayat realisasi untuk pos ini." : "Tidak ada transaksi yang cocok dengan pencarian."}
                    </span>
                    {transactions.length === 0 && (
                      <button className="btn btn-green" style={{ marginTop: 4 }} onClick={onEntryNew}>
                        <Icon d={I.plus} size={12} /> Tambah Transaksi Pertama
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((t, i) => (
                <tr key={t.id}>
                  <td className="td-no">{i + 1}</td>
                  <td><span className="td-date">{fmtDate(t.tanggal)}</span></td>
                  <td><span className="td-sn" style={{ color: "var(--ink)" }}>{t.no_invoice || "—"}</span></td>
                  <td><span className="td-name-text">{t.keterangan || "—"}</span></td>
                  <td>
                    {t.lampiran ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "var(--ink3)" }}>
                        <Icon d={I.fileText} size={11} /> {t.lampiran}
                      </span>
                    ) : (
                      <span style={{ color: "var(--ink4)" }}>—</span>
                    )}
                  </td>
                  <td><span className="td-value" style={{ color: "var(--amber)" }}>{fmt(t.jumlah)}</span></td>
                  <td className="td-actions">
                    <div className="td-act-row">
                      <button className="abtn" title="Edit" onClick={() => onEditRow(t)}>
                        <Icon d={I.edit} size={11} />
                      </button>
                      <button className="abtn del" title="Hapus" onClick={() => onDeleteRow(t.id)}>
                        <Icon d={I.trash} size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {filtered.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={5} style={{ fontWeight: 700, fontSize: "0.75rem" }}>
                  {filtered.length < transactions.length ? `Menampilkan ${filtered.length} dari ${transactions.length} transaksi` : `Total ${transactions.length} transaksi`}
                </td>
                <td className="tfoot-total">{fmt(totalFiltered)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>

        {transactions.length > 0 && (
          <div className="asset-summary-bar">
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div className="asset-summary-stat">
                <span>Total Transaksi</span>
                <strong>{transactions.length} kali</strong>
              </div>
              <div className="asset-summary-stat">
                <span>Total Realisasi OPEX</span>
                <strong style={{ color: "var(--amber)" }}>{fmt(totalAll)}</strong>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "0.75rem", color: "var(--ink4)", fontWeight: 500 }}>{pct}% pagu telah terserap</span>
              <div style={{ width: 100, height: 6, background: "var(--border-lt)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: pctColor(pct), borderRadius: 99, transition: "width .6s" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// REALISASI FORM PAGE (dari BudgetManagement)
// ════════════════════════════════════════════════════════════════
function RealisasiPage({ ang, editData, onBack, onSave, showToast }) {
  const isEdit = !!editData;
  const [form, setForm] = useState(
    isEdit ? { ...editData, jumlah: editData.jumlah || "" }
      : { tanggal: "", keterangan: "", no_invoice: "", aset: "", lampiran: "", jumlah: "" },
  );
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const pagu = ang.nilai_anggaran_tahunan || 0;
  const prev = (ang.transaksi || []).filter((t) => !isEdit || t.id !== editData.id).reduce((s, t) => s + (t.jumlah || 0), 0);
  const jumlah = parseFloat(String(form.jumlah).replace(/[^\d.]/g, "")) || 0;
  const sisa = pagu - prev - jumlah;

  const save = () => {
    if (!form.tanggal || !form.keterangan || !form.jumlah) return;
    const j = parseFloat(String(form.jumlah).replace(/[^\d.]/g, "")) || 0;
    const list = isEdit
      ? ang.transaksi.map((t) => t.id === editData.id ? { ...form, jumlah: j, id: editData.id } : t)
      : [...(ang.transaksi || []), { ...form, jumlah: j, id: newId() }];
    onSave(ang.id, list);
    showToast(isEdit ? "Realisasi diperbarui" : "Realisasi ditambahkan");
    onBack();
  };

  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}><Icon d={I.arrowLeft} size={14} /> Kembali</button>
        <div style={{ flex: 1 }}><h2>{isEdit ? "Edit Realisasi" : "Tambah Realisasi"}</h2></div>
      </div>
      <div className="ctx-card" style={{ borderColor: "var(--green)", background: "var(--green-lt)", borderLeft: "4px solid var(--green)" }}>
        <div className="ctx-item"><span>Pos Anggaran</span><strong style={{ color: "var(--ink)" }}>{ang.nama}</strong></div>
        <div className="ctx-item"><span>Pagu</span><strong style={{ color: "var(--blue)" }}>{fmt(pagu)}</strong></div>
        <div className="ctx-item">
          <span>Sisa Setelah Input</span>
          <strong className={sisa >= 0 ? "green" : "red"}>{fmt(Math.abs(sisa))} {sisa < 0 && "(melebihi)"}</strong>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh)", overflow: "hidden", marginBottom: 20 }}>
        <div style={{ padding: "14px 20px", background: "var(--bg)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 800 }}>{isEdit ? "Edit Transaksi" : "Data Transaksi"}</h3>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tanggal *</label>
              <input type="date" style={{ padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontFamily: "inherit", fontSize: "0.85rem", outline: "none" }} value={form.tanggal} onChange={(e) => up("tanggal", e.target.value)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Keterangan *</label>
              <input style={{ padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontFamily: "inherit", fontSize: "0.85rem", outline: "none" }} value={form.keterangan} onChange={(e) => up("keterangan", e.target.value)} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.5px" }}>No. Invoice</label>
              <input style={{ padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontFamily: "inherit", fontSize: "0.85rem", outline: "none" }} value={form.no_invoice} onChange={(e) => up("no_invoice", e.target.value)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Jumlah (IDR) *</label>
              <input type="number" style={{ padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontFamily: "inherit", fontSize: "0.85rem", outline: "none" }} value={form.jumlah} onChange={(e) => up("jumlah", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, boxShadow: "var(--sh-md)" }}>
        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--ink3)" }}>Jumlah Transaksi Input</span>
          <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--green)" }}>{fmt(jumlah)}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-outline" onClick={onBack}>Batal</button>
          <button className="btn btn-green" style={{ opacity: !form.tanggal || !form.keterangan || !form.jumlah ? 0.5 : 1 }} onClick={save}>
            <Icon d={I.save} size={12} /> {isEdit ? "Perbarui" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SHARED FORM STYLES
// ════════════════════════════════════════════════════════════════
const OVS = { position: "fixed", inset: 0, background: "rgba(15,23,42,.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9000, padding: 20 };
const BTN = { display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 6, border: "none", background: "#2563eb", color: "white", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "opacity 0.2s" };
const BTNOUT = { display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 6, border: "1px solid #cbd5e1", background: "white", color: "#334155", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "background 0.2s" };
const INP = { padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: "0.85rem", color: "#1e293b", outline: "none", width: "100%", background: "white", transition: "border-color .2s" };
const LBL = { fontSize: "0.75rem", fontWeight: 700, letterSpacing: ".5px", color: "#475569", textTransform: "uppercase" };
const TOGGLE = { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 6, border: "none", background: "transparent", fontSize: "0.85rem", fontWeight: 500, color: "#64748b", cursor: "pointer", transition: "all .2s" };
const TABLE = { width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" };
const TH = { padding: "14px 16px", textAlign: "left", fontSize: "0.78rem", fontWeight: 700, color: "#475569", borderBottom: "1px solid #e2e8f0", verticalAlign: "middle" };
const TD = { padding: "14px 16px", verticalAlign: "middle", borderBottom: "1px solid #e2e8f0", color: "#334155" };
const ABTN = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 6, borderRadius: 4, border: "1px solid #e2e8f0", background: "white", cursor: "pointer", transition: "background .15s" };

// ════════════════════════════════════════════════════════════════
// SHARED FORM COMPONENTS
// ════════════════════════════════════════════════════════════════
function ToastForm({ msg, color = "#16a34a" }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, background: color, color: "white", padding: "12px 20px", borderRadius: 8, fontSize: "0.85rem", fontWeight: 500, boxShadow: "0 4px 12px rgba(0,0,0,.1)", display: "flex", alignItems: "center", gap: 8, zIndex: 9999 }}>
      <CheckCircle size={16} /> {msg}
    </div>
  );
}

function ConfirmDlg({ msg, onConfirm, onCancel }) {
  return (
    <div style={OVS} onClick={onCancel}>
      <div style={{ background: "white", borderRadius: 12, padding: "24px", maxWidth: 320, width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,.1)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#dc2626" }}>
          <AlertTriangle size={24} />
        </div>
        <p style={{ fontSize: "0.9rem", color: "#334155", fontWeight: 500 }}>{msg}</p>
        <div style={{ display: "flex", gap: 10, width: "100%" }}>
          <button style={{ ...BTNOUT, flex: 1 }} onClick={onCancel}>Batal</button>
          <button style={{ ...BTN, background: "#dc2626", flex: 1, justifyContent: "center" }} onClick={onConfirm}><Trash2 size={14} /> Hapus</button>
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

function Stepper({ steps, current, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", padding: "1rem 1.4rem", borderRadius: 10, border: "1px solid #e2e8f0", marginBottom: "1rem", boxShadow: "0 1px 2px rgba(0,0,0,.02)" }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "0.75rem", background: current > i ? "#16a34a" : current === i ? color : "#f1f5f9", color: current >= i ? "white" : "#94a3b8", flexShrink: 0 }}>
              {current > i ? <CheckCircle size={14} /> : i + 1}
            </div>
            <span style={{ fontSize: "0.8rem", fontWeight: current === i ? 600 : 500, color: current >= i ? "#1e293b" : "#94a3b8", whiteSpace: "nowrap" }}>{s}</span>
          </div>
          {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: current > i ? "#16a34a" : "#f1f5f9", borderRadius: 99 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: "white", borderRadius: 10, border: "1px solid #e2e8f0", padding: "1.4rem", boxShadow: "0 1px 2px rgba(0,0,0,.02)", ...style }}>{children}</div>;
}

function CardHdr({ icon, title, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #f1f5f9" }}>
      {React.cloneElement(icon, { size: 18, style: { color } })}
      <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1e293b" }}>{title}</h2>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MASTER DROP — DENGAN TOMBOL DETAIL (PERUBAHAN UTAMA)
// ════════════════════════════════════════════════════════════════
function MasterDrop({ options, value, onChange, onEditDrop, onDeleteDrop, onDetailDrop, placeholder = "Cari & pilih master…" }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = options.filter((o) => !q || o.nm.toLowerCase().includes(q.toLowerCase()));
  const sel = options.find((o) => o.kd === value);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", border: `1px solid ${open ? "#3b82f6" : "#e2e8f0"}`, borderRadius: 6, cursor: "pointer", background: "white" }}
        onClick={() => setOpen(!open)}
      >
        <Search size={14} style={{ color: "#94a3b8", flexShrink: 0 }} />
        <span style={{ color: sel ? "#1e293b" : "#94a3b8", fontSize: "0.85rem", flex: 1, fontWeight: sel ? 500 : 400 }}>
          {sel ? `${sel.nm} (${sel.kd})` : placeholder}
        </span>
        <ChevronDown size={16} style={{ color: "#94a3b8", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </div>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => { setOpen(false); setQ(""); }} />
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", border: "1px solid #e2e8f0", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,.08)", zIndex: 50, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
              <Search size={14} style={{ color: "#64748b" }} />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ketik untuk mencari…" style={{ flex: 1, border: "none", outline: "none", fontSize: "0.85rem", background: "transparent" }} />
            </div>
            <div style={{ maxHeight: 240, overflowY: "auto" }}>
              {filtered.length === 0 && (
                <div style={{ padding: 14, textAlign: "center", color: "#94a3b8", fontSize: "0.85rem" }}>Tidak ada hasil</div>
              )}
              {filtered.map((o) => (
                <div
                  key={o.kd}
                  style={{ padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  onClick={() => { onChange(o.kd); setOpen(false); setQ(""); }}
                >
                  <div style={{ fontWeight: 500, fontSize: "0.85rem", color: "#1e293b", flex: 1 }}>
                    {o.nm} <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>({o.kd})</span>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {/* ── TOMBOL DETAIL (BARU) ── */}
                    <button
                      style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", borderRadius: 4, transition: "background .15s" }}
                      title="Lihat Riwayat Realisasi"
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#e0f2fe")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                        setQ("");
                        onDetailDrop(o);
                      }}
                    >
                      <Eye size={14} color="#0284c7" />
                    </button>
                    <button
                      style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer" }}
                      title="Edit Master List"
                      onClick={(e) => { e.stopPropagation(); setOpen(false); onEditDrop(o); }}
                    >
                      <Edit size={14} color="#d97706" />
                    </button>
                    <button
                      style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer" }}
                      title="Hapus Master List"
                      onClick={(e) => { e.stopPropagation(); setOpen(false); onDeleteDrop(o); }}
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// HISTORY POPUP
// ════════════════════════════════════════════════════════════════
function HistoryPopup({ row, title, onClose, lbl = "Anggaran" }) {
  const history = row.history || [];
  const TIPE_META = {
    initial: { label: "Input Awal", color: "#0284c7", bg: "#e0f2fe" },
    penambahan: { label: "Penambahan", color: "#16a34a", bg: "#dcfce7" },
    pengurangan: { label: "Pengurangan", color: "#dc2626", bg: "#fee2e2" },
    bymhd: { label: "BYMHD", color: "#d97706", bg: "#fef3c7" },
    transfer: { label: `Transfer ${lbl}`, color: "#7c3aed", bg: "#ede9fe" },
  };
  const rows = history.map((h) => {
    const isBymhd = h.tipe === "bymhd" || h.tipe === "transfer";
    const isInitial = h.is_initial || h.tipe === "initial";
    let real = null, bymhd = null, jumlah = 0;
    if (isInitial) { real = h.nilai; bymhd = null; jumlah = h.nilai; }
    else if (h.tipe === "penambahan") { real = null; bymhd = h.nilai; jumlah = h.nilai; }
    else if (h.tipe === "pengurangan") { real = -h.nilai; bymhd = null; jumlah = -h.nilai; }
    else if (isBymhd) { real = null; bymhd = h.nilai; jumlah = h.nilai; }
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
            <div style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8", fontSize: "0.85rem" }}>Belum ada riwayat perubahan.</div>
          ) : (
            <table style={TABLE}>
              <thead>
                <tr>
                  <th style={{ ...TH, width: 40, textAlign: "center" }}>NO</th>
                  <th style={{ ...TH, width: 120 }}>TANGGAL</th>
                  <th style={{ ...TH, width: 160 }}>TIPE</th>
                  <th style={{ ...TH, textAlign: "right" }}>REAL (Rp)</th>
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
                    <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", color: h.real === null ? "#cbd5e1" : h.real < 0 ? "#ef4444" : "#16a34a" }}>
                      {h.real !== null ? <>{h.real < 0 ? "−" : ""}{fmt(Math.abs(h.real))}</> : "—"}
                    </td>
                    <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", color: "#d97706" }}>
                      {h.bymhd !== null ? fmt(h.bymhd) : <span style={{ color: "#cbd5e1" }}>—</span>}
                    </td>
                    <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 600, color: (h.jumlah || 0) < 0 ? "#ef4444" : "#1e293b" }}>
                      {h.jumlah < 0 ? "−" : ""}{fmt(Math.abs(h.jumlah || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: "#f8fafc" }}>
                  <td colSpan={5} style={{ ...TD, textAlign: "right", fontWeight: 600, color: "#475569" }}>TOTAL {lbl.toUpperCase()} SAAT INI</td>
                  <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 700, color: grandTotal < 0 ? "#ef4444" : "#2563eb", fontSize: "0.9rem" }}>
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
// EDIT ANGGARAN PAGE
// ════════════════════════════════════════════════════════════════
function EditAnggaranPage({ row, title, onBack, onSave, lbl = "Anggaran" }) {
  const [tipePerubahan, setTipePerubahan] = useState("");
  const [nilaiPerubahan, setNilaiPerubahan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const LBL = lbl.toUpperCase();
  const TIPE_OPTIONS = [
    { value: "penambahan", label: `Penambahan ${lbl}` },
    { value: "pengurangan", label: `Pengurangan ${lbl}` },
    { value: "bymhd", label: "BYMHD (Biaya Yang Masih Harus Dibayar)" },
    { value: "transfer", label: `Transfer ${lbl}` },
  ];
  const handleSubmit = () => {
    if (!tipePerubahan || !nilaiPerubahan) return;
    const today = new Date().toISOString().split("T")[0];
    const newEntry = { id: uid(), tgl: today, tipe: tipePerubahan, nilai: parseFloat(nilaiPerubahan) || 0, keterangan, is_initial: false };
    onSave(row.id, newEntry, tipePerubahan, parseFloat(nilaiPerubahan) || 0);
  };
  const currentTotal = (row.history || []).reduce((acc, h) => {
    if (h.is_initial || h.tipe === "initial") return acc + h.nilai;
    if (h.tipe === "penambahan") return acc + h.nilai;
    if (h.tipe === "pengurangan") return acc - h.nilai;
    if (h.tipe === "bymhd" || h.tipe === "transfer") return acc + h.nilai;
    return acc;
  }, 0);
  return (
    <div style={{ marginTop: "24px", paddingBottom: "24px" }}>
      <div style={{ background: "white", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <Edit size={20} style={{ color: "#d97706" }} />
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>Edit / Revisi {lbl}</h2>
        </div>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", marginBottom: "24px", background: "#fdfdfd" }}>
          {[
            { label: `NAMA ${LBL}`, value: title },
            { label: "TAHUN", value: String(row.thn) },
            { label: `TOTAL ${LBL} BERJALAN`, value: `Rp ${new Intl.NumberFormat("id-ID").format(currentTotal)}`, highlight: true },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: i < arr.length - 1 ? "1px solid #e2e8f0" : "none" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px" }}>{item.label}</span>
              <span style={{ fontSize: item.highlight ? "1rem" : "0.95rem", fontWeight: 700, color: item.highlight ? "#2563eb" : "#1e293b", fontVariantNumeric: item.highlight ? "tabular-nums" : "normal" }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ maxWidth: "500px" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", letterSpacing: "0.5px", marginBottom: "8px" }}>JENIS PERUBAHAN <span style={{ color: "#ef4444" }}>*</span></label>
            <div style={{ position: "relative" }}>
              <select style={{ ...INP, cursor: "pointer", appearance: "none", paddingRight: "36px" }} value={tipePerubahan} onChange={(e) => setTipePerubahan(e.target.value)}>
                <option value="">-- Pilih Jenis Perubahan --</option>
                {TIPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={16} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b", pointerEvents: "none" }} />
            </div>
          </div>
          {tipePerubahan && (
            <>
              <div style={{ maxWidth: "500px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", letterSpacing: "0.5px", marginBottom: "8px" }}>NILAI PERUBAHAN (IDR) <span style={{ color: "#ef4444" }}>*</span></label>
                <input type="number" style={INP} placeholder="Contoh: 50000000" value={nilaiPerubahan} onChange={(e) => setNilaiPerubahan(e.target.value)} />
                {parseFloat(nilaiPerubahan) > 0 && <div style={{ marginTop: 6, fontSize: "0.8rem", color: "#64748b" }}>≈ Rp {new Intl.NumberFormat("id-ID").format(nilaiPerubahan)}</div>}
              </div>
              <div style={{ maxWidth: "500px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", letterSpacing: "0.5px", marginBottom: "8px" }}>KETERANGAN (OPSIONAL)</label>
                <input style={INP} placeholder="Catatan perubahan..." value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
              </div>
            </>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
          <button style={{ background: "transparent", border: "none", color: "#64748b", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", padding: "8px 16px" }} onClick={onBack}>Batal</button>
          <button style={{ ...BTN, background: "#ea580c", opacity: !tipePerubahan || !nilaiPerubahan ? 0.5 : 1, padding: "10px 20px", borderRadius: "8px" }} disabled={!tipePerubahan || !nilaiPerubahan} onClick={handleSubmit}>
            <Save size={16} /> Submit Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ANGGARAN TAHUNAN SECTION
// ════════════════════════════════════════════════════════════════
function AnggaranTahunanSection({ item, setList, title, toast_, lbl = "Anggaran" }) {
  const [showForm, setShowForm] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [historyRow, setHistoryRow] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const LBL = lbl.toUpperCase();
  const emptyForm = { thn: new Date().getFullYear() - 1, anggaran_murni: "", anggaran_bymhd: "" };
  const [form, setForm] = useState(emptyForm);
  const list = item?.anggaran_tahunan || [];

  const handleSaveNew = () => {
    const today = new Date().toISOString().split("T")[0];
    const payload = {
      id: uid(), thn: parseInt(form.thn),
      anggaran_murni: parseFloat(form.anggaran_murni) || 0,
      anggaran_bymhd: parseFloat(form.anggaran_bymhd) || 0,
      history: [
        { id: uid(), tgl: today, tipe: "initial", nilai: parseFloat(form.anggaran_murni) || 0, keterangan: "Input awal murni", is_initial: true },
        ...(parseFloat(form.anggaran_bymhd) > 0 ? [{ id: uid(), tgl: today, tipe: "bymhd", nilai: parseFloat(form.anggaran_bymhd) || 0, keterangan: "Input awal BYMHD", is_initial: false }] : []),
      ],
    };
    setList((prev) => prev.map((c) => c.id === item.id ? { ...c, anggaran_tahunan: [...(c.anggaran_tahunan || []), payload] } : c));
    toast_(`Data ${lbl.toLowerCase()} tahunan ditambahkan.`);
    setShowForm(false);
    setForm(emptyForm);
  };

  const handleSavePerubahan = (rowId, newHistoryEntry, tipe, nilai) => {
    setList((prev) => prev.map((c) => {
      if (c.id !== item.id) return c;
      return {
        ...c,
        anggaran_tahunan: (c.anggaran_tahunan || []).map((r) => {
          if (r.id !== rowId) return r;
          let newMurni = r.anggaran_murni;
          let newBymhd = r.anggaran_bymhd || 0;
          if (tipe === "pengurangan") newMurni -= nilai;
          else if (tipe === "penambahan" || tipe === "bymhd" || tipe === "transfer") newBymhd += nilai;
          return { ...r, anggaran_murni: newMurni, anggaran_bymhd: newBymhd, history: [...(r.history || []), newHistoryEntry] };
        }),
      };
    }));
    toast_(`Perubahan ${lbl.toLowerCase()} berhasil disimpan.`);
    setEditRow(null);
  };

  const handleDelete = (rowId) => {
    setConfirm({
      msg: `Hapus data ${lbl.toLowerCase()} tahunan ini?`,
      onConfirm: () => {
        setList((prev) => prev.map((c) => c.id === item.id ? { ...c, anggaran_tahunan: (c.anggaran_tahunan || []).filter((r) => r.id !== rowId) } : c));
        setConfirm(null);
        toast_(`Data ${lbl.toLowerCase()} tahunan dihapus.`);
      },
    });
  };

  const grandTotal = list.reduce((a, r) => a + (r.anggaran_murni || 0) + (r.anggaran_bymhd || 0), 0);

  return (
    <div style={{ marginTop: "24px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
      {confirm && <ConfirmDlg msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
      {historyRow && <HistoryPopup row={historyRow} title={title} onClose={() => setHistoryRow(null)} lbl={lbl} />}
      {showForm && (
        <div style={OVS} onClick={() => setShowForm(false)}>
          <div style={{ background: "white", borderRadius: 12, padding: "24px", maxWidth: 420, width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div><h3 style={{ fontWeight: 600, fontSize: "1rem" }}>Input {lbl} Tahunan</h3><div style={{ fontSize: "0.8rem", color: "#64748b" }}>{title}</div></div>
              <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label={`Tahun ${lbl}`} required>
                <select style={INP} value={form.thn} onChange={(e) => setForm((f) => ({ ...f, thn: e.target.value }))}>
                  {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </Fld>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Fld label={`${lbl} Murni (Rp)`} required>
                  <input type="number" style={INP} placeholder="0" value={form.anggaran_murni} onChange={(e) => setForm((f) => ({ ...f, anggaran_murni: e.target.value }))} />
                </Fld>
                <Fld label={`${lbl} BYMHD (Rp)`}>
                  <input type="number" style={INP} placeholder="0" value={form.anggaran_bymhd} onChange={(e) => setForm((f) => ({ ...f, anggaran_bymhd: e.target.value }))} />
                </Fld>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button style={BTNOUT} onClick={() => setShowForm(false)}>Batal</button>
              <button style={{ ...BTN, background: "#16a34a", opacity: form.anggaran_murni ? 1 : 0.5 }} disabled={!form.anggaran_murni} onClick={handleSaveNew}>Simpan</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Calendar size={18} style={{ color: "#16a34a" }} />
          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>Daftar {lbl} Tahunan</span>
        </div>
        <button style={{ ...BTN, background: "#16a34a", padding: "8px 14px", fontSize: "0.8rem" }} onClick={() => setShowForm(true)}>
          <Plus size={14} /> Input Data Baru
        </button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ ...TABLE, border: "none", borderRadius: 0 }}>
          <thead>
            <tr>
              <th style={{ ...TH, width: 40, textAlign: "center" }}>NO</th>
              <th style={{ ...TH, width: 80, textAlign: "center" }}>TAHUN</th>
              <th style={{ ...TH, textAlign: "right" }}>{LBL} MURNI</th>
              <th style={{ ...TH, textAlign: "right" }}>{LBL} BYMHD</th>
              <th style={{ ...TH, textAlign: "right" }}>TOTAL {LBL}</th>
              <th style={{ ...TH, textAlign: "center", width: 100 }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={6} style={{ ...TD, textAlign: "center", color: "#94a3b8", padding: "24px" }}>Belum ada data {lbl.toLowerCase()} tahunan.</td></tr>
            ) : (
              list.map((row, idx) => {
                const total = (row.anggaran_murni || 0) + (row.anggaran_bymhd || 0);
                return (
                  <tr key={row.id}>
                    <td style={{ ...TD, textAlign: "center" }}>{idx + 1}</td>
                    <td style={{ ...TD, textAlign: "center", fontWeight: 700, color: "#0f172a" }}>{row.thn}</td>
                    <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", color: "#475569", fontWeight: 600 }}>{fmt(row.anggaran_murni)}</td>
                    <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", color: "#d97706", fontWeight: 600 }}>{fmt(row.anggaran_bymhd)}</td>
                    <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 700, color: "#16a34a" }}>{fmt(total)}</td>
                    <td style={{ ...TD, textAlign: "center" }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                        <button style={ABTN} title="Edit" onClick={() => setEditRow({ ...row })}><Edit size={14} style={{ color: "#d97706" }} /></button>
                        <button style={ABTN} title="Riwayat" onClick={() => setHistoryRow({ ...row })}><History size={14} style={{ color: "#2563eb" }} /></button>
                        <button style={ABTN} title="Hapus" onClick={() => handleDelete(row.id)}><Trash2 size={14} style={{ color: "#ef4444" }} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          {list.length > 0 && (
            <tfoot>
              <tr style={{ background: "#f0fdf4" }}>
                <td colSpan={4} style={{ ...TD, textAlign: "right", fontWeight: 700, color: "#16a34a" }}>GRAND TOTAL SELURUH TAHUN</td>
                <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 700, color: "#16a34a", fontSize: "0.95rem" }}>{fmt(grandTotal)}</td>
                <td style={TD} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <div style={{ padding: "0 24px" }}>
        {editRow && <EditAnggaranPage row={editRow} title={title} onBack={() => setEditRow(null)} onSave={handleSavePerubahan} lbl={lbl} />}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// OPEX MODULE — dengan onDetailDrop yang navigasi ke RealisasiTablePage
// ════════════════════════════════════════════════════════════════
function OpexModule({ opexList, setOpexList, opexBMData, setOpexBMData, masterList, setMasterList, onNavigateToRealisasi }) {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [masterMode, setMasterMode] = useState("existing");
  const [selKd, setSelKd] = useState("");
  const [newMaster, setNewMaster] = useState({ kd: "", nm: "" });
  const [anggaranMode, setAnggaranMode] = useState("existing");
  const [selAnggaranId, setSelAnggaranId] = useState("");
  const [newAnggaran, setNewAnggaran] = useState({ no_invoice: "", nm: "", tanggal: "", lampiran: null, nilai: "" });
  const [activeOpexId, setActiveOpexId] = useState(null);
  const [editMasterModal, setEditMasterModal] = useState(false);
  const [editMasterForm, setEditMasterForm] = useState({ kd: "", nm: "" });
  const [editDropItem, setEditDropItem] = useState(null);

  const opexMasters = masterList.filter((m) => m.tipe === "OPEX");

  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const isMasterResolved = masterMode === "existing" ? !!selKd : !!(newMaster.kd && newMaster.nm);
  const activeMasterKd = masterMode === "existing" ? selKd : newMaster.kd;
  const availableOpex = opexList.filter((c) => c.kd_master === activeMasterKd);
  const isAnggaranResolved = anggaranMode === "existing" ? !!selAnggaranId : !!(newAnggaran.nm && newAnggaran.no_invoice && newAnggaran.tanggal && newAnggaran.nilai);
  const canNextToStep1 = isMasterResolved && isAnggaranResolved;

  useEffect(() => {
    if (isMasterResolved && masterMode === "existing" && availableOpex.length === 0) setAnggaranMode("new");
  }, [isMasterResolved, masterMode, activeMasterKd, availableOpex.length]);

  const handleLanjutToStep1 = () => {
    const nmMaster = masterMode === "existing" ? opexMasters.find((m) => m.kd === selKd)?.nm : newMaster.nm;
    const kdMaster = activeMasterKd;
    if (masterMode === "new" && !opexMasters.find((m) => m.kd === newMaster.kd)) {
      setMasterList((p) => [...p, { kd: newMaster.kd, nm: newMaster.nm, tipe: "OPEX" }]);
    }
    if (anggaranMode === "new") {
      const targetId = uid();
      const nilaiAwal = parseFloat(newAnggaran.nilai) || 0;
      const initialHistory = nilaiAwal > 0 ? [{ id: uid(), tgl: newAnggaran.tanggal || new Date().toISOString().split("T")[0], tipe: "initial", nilai: nilaiAwal, keterangan: `Realisasi Invoice: ${newAnggaran.no_invoice}`, is_initial: true }] : [];
      const thnRealisasi = newAnggaran.tanggal ? parseInt(newAnggaran.tanggal.split("-")[0]) : new Date().getFullYear();
      const newItem = {
        id: targetId, kd_master: kdMaster, nm_master: nmMaster, nm_anggaran: newAnggaran.nm,
        kd_anggaran: newAnggaran.no_invoice, no_invoice: newAnggaran.no_invoice,
        tanggal: newAnggaran.tanggal, lampiran: newAnggaran.lampiran ? newAnggaran.lampiran.name : null,
        anggaran_tahunan: [{ id: uid(), thn: thnRealisasi, anggaran_murni: nilaiAwal, anggaran_bymhd: 0, history: initialHistory }],
      };
      setOpexList((p) => [...p, newItem]);

      setOpexBMData((prev) => {
        const existingBM = prev.find(a => a.kd_anggaran_master === kdMaster);
        if (existingBM) {
          return prev.map(a => a.kd_anggaran_master === kdMaster ? { ...a, nilai_anggaran_tahunan: a.nilai_anggaran_tahunan + nilaiAwal } : a);
        } else {
          return [...prev, {
            id: `OPX-NEW-${Date.now()}`, kd_anggaran_master: kdMaster, nama: nmMaster,
            thn_anggaran: thnRealisasi, nilai_anggaran_tahunan: nilaiAwal, type: "opex", transaksi: []
          }];
        }
      });

      setActiveOpexId(targetId);
      setSelAnggaranId(targetId);
      setNewAnggaran({ no_invoice: "", nm: "", tanggal: "", lampiran: null, nilai: "" });
    } else {
      setActiveOpexId(selAnggaranId);
    }
    setStep(1);
  };

  const saveEditMaster = () => {
    const activeItem = opexList.find((o) => o.id === activeOpexId);
    setOpexList((p) => p.map((o) => o.id === activeOpexId ? { ...o, kd_master: editMasterForm.kd, nm_master: editMasterForm.nm } : o));
    setMasterList((p) => p.map((m) => m.kd === activeItem.kd_master && m.tipe === "OPEX" ? { ...m, kd: editMasterForm.kd, nm: editMasterForm.nm } : m));
    setOpexBMData((p) => p.map((x) => x.kd_anggaran_master === activeItem.kd_master ? { ...x, kd_anggaran_master: editMasterForm.kd, nama: editMasterForm.nm } : x));
    setEditMasterModal(false);
    toast_("Info master berhasil diperbarui.");
  };

  const saveEditDrop = () => {
    setMasterList((p) => p.map((m) => m.kd === editDropItem.oldKd && m.tipe === "OPEX" ? { ...m, kd: editDropItem.kd, nm: editDropItem.nm } : m));
    setOpexList((p) => p.map((x) => x.kd_master === editDropItem.oldKd ? { ...x, kd_master: editDropItem.kd, nm_master: editDropItem.nm } : x));
    setOpexBMData((p) => p.map((x) => x.kd_anggaran_master === editDropItem.oldKd ? { ...x, kd_anggaran_master: editDropItem.kd, nama: editDropItem.nm } : x));
    if (selKd === editDropItem.oldKd) setSelKd(editDropItem.kd);
    setEditDropItem(null);
    toast_("Pilihan master berhasil diperbarui.");
  };

  const reset = () => {
    setStep(0); setMasterMode("existing"); setSelKd(""); setNewMaster({ kd: "", nm: "" });
    setAnggaranMode("existing"); setSelAnggaranId("");
    setNewAnggaran({ no_invoice: "", nm: "", tanggal: "", lampiran: null, nilai: "" });
  };

  const activeItem = opexList.find((o) => o.id === activeOpexId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && <ToastForm msg={toast} color="#16a34a" />}
      {confirm && <ConfirmDlg msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}

      {editDropItem && (
        <div style={OVS} onClick={() => setEditDropItem(null)}>
          <div style={{ background: "white", borderRadius: 12, padding: "24px", maxWidth: 420, width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontWeight: 600, marginBottom: 20 }}>Edit Pilihan Master Dropdown</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Nama Realisasi Master"><input style={INP} value={editDropItem.nm} onChange={(e) => setEditDropItem((t) => ({ ...t, nm: e.target.value }))} /></Fld>
              <Fld label="Kode Realisasi Master"><input style={INP} value={editDropItem.kd} onChange={(e) => setEditDropItem((t) => ({ ...t, kd: e.target.value }))} /></Fld>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
              <button style={BTNOUT} onClick={() => setEditDropItem(null)}>Batal</button>
              <button style={{ ...BTN, background: "#16a34a" }} onClick={saveEditDrop}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      <Stepper steps={["Pilih Master & Realisasi", "Detail Realisasi", "Daftar Keseluruhan"]} current={step} color="#16a34a" />

      {step === 0 && (
        <>
          <Card>
            <CardHdr icon={<Database />} title="Anggaran Master OPEX" color="#16a34a" />
            <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 8, padding: 4, gap: 4, marginBottom: 20 }}>
              {[["existing", <Search size={14} />, "Pilih Master Tersimpan"], ["new", <Plus size={14} />, "Tambah Master Baru"]].map(([v, ic, lbl]) => (
                <button key={v} style={{ ...TOGGLE, flex: 1, justifyContent: "center", ...(masterMode === v ? { background: "white", color: "#16a34a", boxShadow: "0 1px 2px rgba(0,0,0,.05)" } : {}) }} onClick={() => { setMasterMode(v); setSelKd(""); }}>
                  {ic} {lbl}
                </button>
              ))}
            </div>
            {masterMode === "existing" && (
              <Fld label="Nama Anggaran Master" required>
                <MasterDrop
                  options={opexMasters}
                  value={selKd}
                  onChange={(kd) => setSelKd(kd)}
                  placeholder="Cari & pilih anggaran master…"
                  onEditDrop={(o) => setEditDropItem({ oldKd: o.kd, kd: o.kd, nm: o.nm })}
                  onDeleteDrop={(o) => {
                    setConfirm({
                      msg: `Hapus opsi "${o.nm}" dari daftar pilihan?`,
                      onConfirm: () => { setMasterList((p) => p.filter((m) => m.kd !== o.kd)); if (selKd === o.kd) setSelKd(""); setConfirm(null); toast_("Opsi berhasil dihapus."); },
                    });
                  }}
                  onDetailDrop={(o) => {
                    let matchingBM = opexBMData.find((a) => a.kd_anggaran_master === o.kd);
                    if (!matchingBM) {
                      matchingBM = {
                        id: `OPX-NEW-${Date.now()}`, kd_anggaran_master: o.kd, nama: o.nm,
                        thn_anggaran: new Date().getFullYear(), nilai_anggaran_tahunan: 0, type: "opex", transaksi: []
                      };
                      setOpexBMData(prev => [...prev, matchingBM]);
                    }
                    onNavigateToRealisasi(matchingBM);
                  }}
                />
              </Fld>
            )}
            {masterMode === "new" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Fld label="Nama Realisasi Master" required><input style={INP} value={newMaster.nm} onChange={(e) => setNewMaster((f) => ({ ...f, nm: e.target.value }))} /></Fld>
                <Fld label="Kode Realisasi Master" required><input style={INP} value={newMaster.kd} onChange={(e) => setNewMaster((f) => ({ ...f, kd: e.target.value }))} /></Fld>
              </div>
            )}
          </Card>

          {isMasterResolved && (
            <Card style={{ marginTop: 16 }}>
              <CardHdr icon={<Layers />} title="Pilih / Input Realisasi OPEX" color="#16a34a" />
              <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 8, padding: 4, gap: 4, marginBottom: 20 }}>
                {[["existing", "Pilih Realisasi Tersimpan"], ["new", "Tambah Realisasi Baru"]].map(([v, lbl]) => (
                  <button key={v} style={{ ...TOGGLE, flex: 1, justifyContent: "center", ...(anggaranMode === v ? { background: "white", color: "#16a34a", boxShadow: "0 1px 2px rgba(0,0,0,.05)" } : {}) }} onClick={() => setAnggaranMode(v)}>{lbl}</button>
                ))}
              </div>
              {anggaranMode === "existing" && (
                <Fld label="PILIH REALISASI" required>
                  {availableOpex.length > 0 ? (
                    <select style={INP} value={selAnggaranId} onChange={(e) => setSelAnggaranId(e.target.value)}>
                      <option value="">-- Pilih Realisasi --</option>
                      {availableOpex.map((c) => <option key={c.id} value={c.id}>{c.nm_anggaran || c.nm_master} {c.no_invoice ? `(Inv: ${c.no_invoice})` : ""}</option>)}
                    </select>
                  ) : (
                    <div style={{ fontSize: "0.8rem", color: "#ef4444", background: "#fef2f2", padding: 12, borderRadius: 6 }}>Belum ada realisasi untuk master ini. Silakan pilih "Tambah Realisasi Baru".</div>
                  )}
                </Fld>
              )}
              {anggaranMode === "new" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Fld label="Nomor Invoice" required><input style={INP} placeholder="Contoh: INV/2024/001" value={newAnggaran.no_invoice} onChange={(e) => setNewAnggaran((f) => ({ ...f, no_invoice: e.target.value }))} /></Fld>
                  <Fld label="Keterangan Realisasi" required><input style={INP} placeholder="Contoh: Pembayaran Langganan Software" value={newAnggaran.nm} onChange={(e) => setNewAnggaran((f) => ({ ...f, nm: e.target.value }))} /></Fld>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Fld label="Tanggal Realisasi" required><input type="date" style={INP} value={newAnggaran.tanggal} onChange={(e) => setNewAnggaran((f) => ({ ...f, tanggal: e.target.value }))} /></Fld>
                    <Fld label="Lampiran Dokumen"><input type="file" style={{ ...INP, padding: "7px 14px" }} onChange={(e) => setNewAnggaran((f) => ({ ...f, lampiran: e.target.files ? e.target.files[0] : null }))} /></Fld>
                  </div>
                  <Fld label="Jumlah / Harga (Rp)" required>
                    <input type="number" style={INP} placeholder="0" value={newAnggaran.nilai} onChange={(e) => setNewAnggaran((f) => ({ ...f, nilai: e.target.value }))} />
                    {parseFloat(newAnggaran.nilai) > 0 && <div style={{ marginTop: 4, fontSize: "0.8rem", color: "#64748b" }}>≈ Rp {fmt(newAnggaran.nilai)}</div>}
                  </Fld>
                </div>
              )}
            </Card>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button style={{ ...BTN, background: "#16a34a", opacity: canNextToStep1 ? 1 : 0.5 }} disabled={!canNextToStep1} onClick={handleLanjutToStep1}>
              Lanjut ke Detail <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}

      {step === 1 && activeItem && (
        <>
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>{activeItem.nm_anggaran || activeItem.nm_master}</h3>
                <div style={{ display: "flex", gap: 16, fontSize: "0.85rem", color: "#64748b" }}>
                  <span>Master: {activeItem.nm_master}</span>
                  {activeItem.no_invoice && <span>Invoice: {activeItem.no_invoice}</span>}
                  {activeItem.tanggal && <span>Tanggal: {fmtDate(activeItem.tanggal)}</span>}
                </div>
              </div>
              <button style={{ ...BTNOUT, padding: "6px 12px", fontSize: "0.75rem" }} onClick={() => { setEditMasterForm({ kd: activeItem.kd_master, nm: activeItem.nm_master }); setEditMasterModal(true); }}>
                <Edit size={12} style={{ color: "#d97706" }} /> Edit Info Master
              </button>
            </div>
          </div>
          <AnggaranTahunanSection item={activeItem} setList={setOpexList} title={activeItem.nm_anggaran || activeItem.nm_master} toast_={toast_} lbl="Realisasi" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" }}>
            <button style={BTNOUT} onClick={() => setStep(0)}><ArrowLeft size={16} /> Kembali</button>
            <button style={{ ...BTN, background: "#16a34a" }} onClick={() => setStep(2)}><Save size={16} /> Selesai & Lihat Daftar</button>
          </div>
        </>
      )}

      {editMasterModal && (
        <div style={OVS} onClick={() => setEditMasterModal(false)}>
          <div style={{ background: "white", borderRadius: 12, padding: "24px", maxWidth: 420, width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontWeight: 600, marginBottom: 20 }}>Edit Realisasi Master</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Nama Realisasi Master"><input style={INP} value={editMasterForm.nm} onChange={(e) => setEditMasterForm((t) => ({ ...t, nm: e.target.value }))} /></Fld>
              <Fld label="Kode Realisasi Master"><input style={INP} value={editMasterForm.kd} onChange={(e) => setEditMasterForm((t) => ({ ...t, kd: e.target.value }))} /></Fld>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
              <button style={BTNOUT} onClick={() => setEditMasterModal(false)}>Batal</button>
              <button style={{ ...BTN, background: "#16a34a" }} onClick={saveEditMaster}>Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.1rem" }}>Daftar Keseluruhan OPEX</h2>
            <button style={{ ...BTN, background: "#16a34a" }} onClick={reset}><Plus size={16} /> Kelola Realisasi Lainnya</button>
          </div>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ ...TABLE, border: "none" }}>
                <thead>
                  <tr>
                    <th style={{ ...TH, width: 40, textAlign: "center" }}>No</th>
                    <th style={TH}>Realisasi & Invoice</th>
                    <th style={TH}>Kode Master</th>
                    <th style={{ ...TH, textAlign: "right" }}>Total Akumulasi</th>
                    <th style={{ ...TH, textAlign: "center", width: 100 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {opexList.length === 0 ? (
                    <tr><td colSpan={5} style={{ ...TD, textAlign: "center", color: "#94a3b8" }}>Belum ada data realisasi OPEX.</td></tr>
                  ) : (
                    opexList.map((row, i) => {
                      const totalOpex = row.anggaran_tahunan?.reduce((acc, r) => acc + (r.anggaran_murni || 0) + (r.anggaran_bymhd || 0), 0) || 0;
                      return (
                        <tr key={row.id}>
                          <td style={{ ...TD, textAlign: "center" }}>{i + 1}</td>
                          <td style={{ ...TD, fontWeight: 500 }}>
                            <div style={{ color: "#1e293b", marginBottom: 4 }}>{row.nm_anggaran || row.nm_master}</div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 400 }}>{row.no_invoice ? `Inv: ${row.no_invoice}` : "-"}</div>
                          </td>
                          <td style={{ ...TD, color: "#64748b", fontVariantNumeric: "tabular-nums" }}>{row.kd_master}</td>
                          <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", color: "#16a34a", fontWeight: 600 }}>Rp {fmt(totalOpex)}</td>
                          <td style={{ ...TD, textAlign: "center" }}>
                            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                              <button style={ABTN} title="Lihat/Edit Detail" onClick={() => { setActiveOpexId(row.id); setStep(1); }}><Edit size={14} style={{ color: "#d97706" }} /></button>
                              <button style={ABTN} title="Hapus Realisasi" onClick={() => { setConfirm({ msg: "Hapus seluruh data Realisasi ini?", onConfirm: () => { setOpexList((p) => p.filter((o) => o.id !== row.id)); setConfirm(null); } }); }}><Trash2 size={14} style={{ color: "#ef4444" }} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CAPEX MODULE (tidak diubah, hanya disertakan ulang)
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
  const emptyNewAnggaran = { nm: "", kd_capex: "", thn_rkap_awal: new Date().getFullYear() - 1, thn_rkap_akhir: new Date().getFullYear() - 1, thn_anggaran: new Date().getFullYear() - 1, nilai_kad: "", nilai_rkap: "" };
  const [newAnggaran, setNewAnggaran] = useState(emptyNewAnggaran);
  const [editTarget, setEditTarget] = useState(null);
  const [showPkj, setShowPkj] = useState(false);
  const [pkjCapexId, setPkjCapexId] = useState(null);
  const [pkjEditId, setPkjEditId] = useState(null);
  const emptyPkj = { nm: "", nilai_rab: "", nilai_kontrak: "", no_pr: "", no_po: "", no_kontrak: "", tgl_kontrak: "", durasi_kontrak: "", no_sp3: "", tgl_sp3: "", tgl_bamk: "", keterangan: "" };
  const [pkjForm, setPkjForm] = useState(emptyPkj);
  const [viewDetail, setViewDetail] = useState(null);

  const toast_ = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const isMasterResolved = masterMode === "existing" ? !!selKd : !!(newMaster.kd && newMaster.nm);
  const activeMasterKd = masterMode === "existing" ? selKd : newMaster.kd;
  const availableCapex = capexList.filter((c) => c.kd_master === activeMasterKd);
  const isAnggaranResolved = anggaranMode === "existing" ? !!selAnggaranId : !!(newAnggaran.nm && newAnggaran.kd_capex && newAnggaran.thn_anggaran);

  useEffect(() => {
    if (isMasterResolved && masterMode === "existing" && availableCapex.length === 0) setAnggaranMode("new");
  }, [isMasterResolved, masterMode, activeMasterKd, availableCapex.length]);

  const handleLanjutToStep1 = () => {
    if (masterMode === "new" && !capexMasters.find((m) => m.kd === newMaster.kd)) {
      setMasterList((p) => [...p, { kd: newMaster.kd, nm: newMaster.nm, tipe: "CAPEX" }]);
    }
    if (anggaranMode === "new") {
      const nmMaster = masterMode === "existing" ? capexMasters.find((m) => m.kd === selKd)?.nm : newMaster.nm;
      const kdMaster = activeMasterKd;
      const targetId = uid();
      const newItem = {
        id: targetId, kd_master: kdMaster, nm_master: nmMaster, nm_anggaran: newAnggaran.nm,
        kd_capex: newAnggaran.kd_capex, thn_rkap_awal: parseInt(newAnggaran.thn_rkap_awal),
        thn_rkap_akhir: parseInt(newAnggaran.thn_rkap_akhir), thn_anggaran: parseInt(newAnggaran.thn_anggaran),
        nilai_kad: parseFloat(newAnggaran.nilai_kad) || 0, nilai_rkap: parseFloat(newAnggaran.nilai_rkap) || 0,
        anggaran_tahunan: [], pekerjaan: [],
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
    setCapexList((p) => p.map((c) => c.id === editTarget.id ? { ...c, nm_anggaran: editTarget.nm_anggaran, kd_capex: editTarget.kd_capex, thn_rkap_awal: parseInt(editTarget.thn_rkap_awal), thn_rkap_akhir: parseInt(editTarget.thn_rkap_akhir), thn_anggaran: parseInt(editTarget.thn_anggaran), nilai_kad: parseFloat(editTarget.nilai_kad) || 0, nilai_rkap: parseFloat(editTarget.nilai_rkap) || 0 } : c));
    setEditTarget(null);
    toast_("Perubahan disimpan.");
  };

  const saveEditDrop = () => {
    setMasterList((p) => p.map((m) => m.kd === editDropItem.oldKd && m.tipe === "CAPEX" ? { ...m, kd: editDropItem.kd, nm: editDropItem.nm } : m));
    setCapexList((p) => p.map((x) => x.kd_master === editDropItem.oldKd ? { ...x, kd_master: editDropItem.kd, nm_master: editDropItem.nm } : x));
    if (selKd === editDropItem.oldKd) setSelKd(editDropItem.kd);
    setEditDropItem(null);
    toast_("Pilihan master berhasil diperbarui.");
  };

  const openAddPkj = (capexId) => { setPkjCapexId(capexId); setPkjForm(emptyPkj); setPkjEditId(null); setShowPkj(true); };
  const openEditPkj = (capexId, pkj) => { setPkjCapexId(capexId); setPkjForm({ ...pkj }); setPkjEditId(pkj.id); setShowPkj(true); };

  const handleSavePkj = () => {
    const payload = { ...pkjForm, nilai_rab: parseFloat(pkjForm.nilai_rab) || 0, nilai_kontrak: parseFloat(pkjForm.nilai_kontrak) || 0, durasi_kontrak: parseInt(pkjForm.durasi_kontrak) || 0 };
    if (pkjEditId) {
      setCapexList((p) => p.map((c) => c.id === pkjCapexId ? { ...c, pekerjaan: c.pekerjaan.map((pk) => pk.id === pkjEditId ? { ...pk, ...payload } : pk) } : c));
      toast_("Pekerjaan diperbarui.");
    } else {
      setCapexList((p) => p.map((c) => c.id === pkjCapexId ? { ...c, pekerjaan: [...(c.pekerjaan || []), { id: uid(), ...payload }] } : c));
      toast_("Pekerjaan ditambahkan.");
    }
    setShowPkj(false);
  };

  const reset = () => { setStep(0); setMasterMode("existing"); setSelKd(""); setNewMaster({ kd: "", nm: "" }); setAnggaranMode("existing"); setSelAnggaranId(""); setNewAnggaran(emptyNewAnggaran); };

  const activeCapex = capexList.find((c) => c.id === selAnggaranId);

  if (viewDetail) {
    const { cap, pkj } = viewDetail;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={BTNOUT} onClick={() => setViewDetail(null)}><ArrowLeft size={16} /> Kembali</button>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Detail Pekerjaan</h2>
        </div>
        <Card>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "1px dashed #e2e8f0" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>{pkj.nm}</h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Anggaran: {cap.nm_anggaran}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { title: "Finansial", icon: <Database size={16} />, items: [["RAB", `Rp ${fmt(pkj.nilai_rab)}`], ["Kontrak", `Rp ${fmt(pkj.nilai_kontrak)}`]] },
              { title: "Dokumen", icon: <FileText size={16} />, items: [["PR", pkj.no_pr || "-"], ["PO", pkj.no_po || "-"], ["Kontrak", pkj.no_kontrak || "-"], ["SP3", pkj.no_sp3 || "-"]] },
              { title: "Waktu", icon: <Clock size={16} />, items: [["Tgl. Kontrak", fmtDate(pkj.tgl_kontrak) || "-"], ["Durasi", pkj.durasi_kontrak ? `${pkj.durasi_kontrak} hari` : "-"], ["Tgl. SP3", fmtDate(pkj.tgl_sp3) || "-"], ["Tgl. BAMK", fmtDate(pkj.tgl_bamk) || "-"]] },
            ].map((sec) => (
              <div key={sec.title} style={{ background: "#f8fafc", padding: 16, borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontWeight: 600, color: "#475569" }}>{sec.icon} {sec.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {sec.items.map(([lbl, val]) => (
                    <div key={lbl} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: 4 }}>
                      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{lbl}</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#1e293b" }}>{val}</span>
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && <ToastForm msg={toast} color="#2563eb" />}
      {confirm && <ConfirmDlg msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
      {editDropItem && (
        <div style={OVS} onClick={() => setEditDropItem(null)}>
          <div style={{ background: "white", borderRadius: 12, padding: "24px", maxWidth: 420, width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,.1)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontWeight: 600, marginBottom: 20 }}>Edit Pilihan Master Dropdown</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Nama Anggaran Master"><input style={INP} value={editDropItem.nm} onChange={(e) => setEditDropItem((t) => ({ ...t, nm: e.target.value }))} /></Fld>
              <Fld label="Kode Anggaran Master"><input style={INP} value={editDropItem.kd} onChange={(e) => setEditDropItem((t) => ({ ...t, kd: e.target.value }))} /></Fld>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
              <button style={BTNOUT} onClick={() => setEditDropItem(null)}>Batal</button>
              <button style={{ ...BTN, background: "#2563eb" }} onClick={saveEditDrop}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      <Stepper steps={["Pilih Master & Anggaran", "Daftar & Kelola CAPEX"]} current={step} color="#2563eb" />

      {step === 0 && (
        <>
          <Card>
            <CardHdr icon={<Database />} title="Anggaran Master CAPEX" color="#2563eb" />
            <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 8, padding: 4, gap: 4, marginBottom: 20 }}>
              {[["existing", <Search size={14} />, "Pilih Master Tersimpan"], ["new", <Plus size={14} />, "Tambah Master Baru"]].map(([v, ic, lbl]) => (
                <button key={v} style={{ ...TOGGLE, flex: 1, justifyContent: "center", ...(masterMode === v ? { background: "white", color: "#2563eb", boxShadow: "0 1px 2px rgba(0,0,0,.05)" } : {}) }} onClick={() => { setMasterMode(v); setSelKd(""); }}>{ic} {lbl}</button>
              ))}
            </div>
            {masterMode === "existing" && (
              <Fld label="Nama Anggaran Master" required>
                <MasterDrop
                  options={capexMasters}
                  value={selKd}
                  onChange={(kd) => setSelKd(kd)}
                  onEditDrop={(o) => setEditDropItem({ oldKd: o.kd, kd: o.kd, nm: o.nm })}
                  onDeleteDrop={(o) => { setConfirm({ msg: `Hapus opsi "${o.nm}"?`, onConfirm: () => { setMasterList((p) => p.filter((m) => m.kd !== o.kd)); if (selKd === o.kd) setSelKd(""); setConfirm(null); toast_("Opsi berhasil dihapus."); } }); }}
                  onDetailDrop={() => {}} // CAPEX tidak memerlukan navigasi ke realisasi
                />
              </Fld>
            )}
            {masterMode === "new" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Fld label="Nama Anggaran Master" required><input style={INP} value={newMaster.nm} onChange={(e) => setNewMaster((f) => ({ ...f, nm: e.target.value }))} /></Fld>
                <Fld label="Kode Anggaran Master" required><input style={INP} value={newMaster.kd} onChange={(e) => setNewMaster((f) => ({ ...f, kd: e.target.value }))} /></Fld>
              </div>
            )}
          </Card>

          {isMasterResolved && (
            <Card style={{ marginTop: 16 }}>
              <CardHdr icon={<Layers />} title="Pilih / Buat Anggaran CAPEX" color="#2563eb" />
              <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 8, padding: 4, gap: 4, marginBottom: 20 }}>
                {[["existing", "Pilih Anggaran Tersimpan"], ["new", "Tambah Anggaran Baru"]].map(([v, lbl]) => (
                  <button key={v} style={{ ...TOGGLE, flex: 1, justifyContent: "center", ...(anggaranMode === v ? { background: "white", color: "#2563eb", boxShadow: "0 1px 2px rgba(0,0,0,.05)" } : {}) }} onClick={() => setAnggaranMode(v)}>{lbl}</button>
                ))}
              </div>
              {anggaranMode === "existing" && (
                <>
                  <Fld label="Pilih Anggaran" required>
                    {availableCapex.length > 0 ? (
                      <select style={INP} value={selAnggaranId} onChange={(e) => setSelAnggaranId(e.target.value)}>
                        <option value="">-- Pilih Anggaran --</option>
                        {availableCapex.map((c) => <option key={c.id} value={c.id}>{c.nm_anggaran} {c.kd_capex ? `(${c.kd_capex})` : ""}</option>)}
                      </select>
                    ) : (
                      <div style={{ fontSize: "0.8rem", color: "#ef4444", background: "#fef2f2", padding: 12, borderRadius: 6 }}>Belum ada anggaran untuk master ini. Silakan pilih "Tambah Anggaran Baru".</div>
                    )}
                  </Fld>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                    <button style={{ ...BTN, background: "#2563eb", opacity: selAnggaranId ? 1 : 0.5 }} disabled={!selAnggaranId} onClick={() => { if (masterMode === "new" && !capexMasters.find((m) => m.kd === newMaster.kd)) { setMasterList((p) => [...p, { kd: newMaster.kd, nm: newMaster.nm, tipe: "CAPEX" }]); } setStep(1); }}>
                      Lanjut Kelola Daftar <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              )}
              {anggaranMode === "new" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Fld label="NAMA ANGGARAN CAPEX" required><input style={INP} value={newAnggaran.nm} onChange={(e) => setNewAnggaran((f) => ({ ...f, nm: e.target.value }))} /></Fld>
                  <Fld label="KODE CAPEX"><input style={INP} value={newAnggaran.kd_capex} onChange={(e) => setNewAnggaran((f) => ({ ...f, kd_capex: e.target.value }))} /></Fld>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    {["thn_rkap_awal", "thn_rkap_akhir", "thn_anggaran"].map((key) => (
                      <Fld key={key} label={key.replace(/_/g, " ").toUpperCase()}>
                        <select style={INP} value={newAnggaran[key]} onChange={(e) => setNewAnggaran((f) => ({ ...f, [key]: e.target.value }))}>
                          {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </Fld>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Fld label="NILAI KAD (RP)"><input type="number" style={INP} value={newAnggaran.nilai_kad} onChange={(e) => setNewAnggaran((f) => ({ ...f, nilai_kad: e.target.value }))} /></Fld>
                    <Fld label="NILAI RKAP (RP)"><input type="number" style={INP} value={newAnggaran.nilai_rkap} onChange={(e) => setNewAnggaran((f) => ({ ...f, nilai_rkap: e.target.value }))} /></Fld>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
                    <button style={BTNOUT} onClick={() => setAnggaranMode("existing")}>Kembali</button>
                    <button style={{ ...BTN, background: "#2563eb", opacity: newAnggaran.nm ? 1 : 0.5 }} disabled={!newAnggaran.nm} onClick={handleLanjutToStep1}>Simpan & Lanjut ke Daftar <ChevronRight size={16} /></button>
                  </div>
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {step === 1 && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.1rem" }}>Kelola Anggaran CAPEX</h2>
            <button style={{ ...BTN, background: "#2563eb" }} onClick={reset}><Plus size={16} /> Pilih / Tambah CAPEX Lain</button>
          </div>
          {!activeCapex ? (
            <Card style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>Data tidak ditemukan atau belum dipilih.</Card>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e293b", marginBottom: 12 }}>{activeCapex.nm_anggaran}</h3>
                    <div style={{ display: "flex", gap: 20, fontSize: "0.9rem", color: "#64748b" }}>
                      <span>Kode: <b>{activeCapex.kd_capex || "-"}</b></span>
                      <span>Tahun: <b>{activeCapex.thn_anggaran}</b></span>
                      <span>RKAP: <b>{activeCapex.thn_rkap_awal} - {activeCapex.thn_rkap_akhir}</b></span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginBottom: 6, letterSpacing: "0.5px" }}>NILAI RKAP</div>
                    <div style={{ fontSize: "1.3rem", fontVariantNumeric: "tabular-nums", fontWeight: 700, color: "#2563eb" }}>Rp {fmt(activeCapex.nilai_rkap)}</div>
                    <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <button style={{ ...BTNOUT, padding: "6px 12px", fontSize: "0.8rem" }} onClick={() => setEditTarget({ ...activeCapex })}><Edit size={14} /> Edit Detail</button>
                      <button style={{ ...BTNOUT, padding: "6px 12px", fontSize: "0.8rem", color: "#ef4444", borderColor: "#fecaca" }} onClick={() => setConfirm({ msg: "Hapus anggaran CAPEX ini?", onConfirm: () => { setCapexList((p) => p.filter((c) => c.id !== activeCapex.id)); setConfirm(null); reset(); } })}><Trash2 size={14} /> Hapus</button>
                    </div>
                  </div>
                </div>
              </div>
              <AnggaranTahunanSection item={activeCapex} setList={setCapexList} title={activeCapex.nm_anggaran} toast_={toast_} />
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Layers size={18} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>Daftar Pekerjaan ({activeCapex.pekerjaan?.length || 0})</span>
                  </div>
                  <button style={{ ...BTN, background: "#2563eb", padding: "8px 14px", fontSize: "0.8rem" }} onClick={() => openAddPkj(activeCapex.id)}><Plus size={14} /> Tambah Pekerjaan</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ ...TABLE, border: "none", borderRadius: 0 }}>
                    <thead>
                      <tr>
                        <th style={{ ...TH, width: 40, textAlign: "center" }}>No</th>
                        <th style={TH}>Nama Pekerjaan</th>
                        <th style={{ ...TH, width: 120 }}>Tgl Kontrak</th>
                        <th style={{ ...TH, width: 100 }}>Durasi</th>
                        <th style={{ ...TH, textAlign: "right" }}>Nilai Kontrak</th>
                        <th style={{ ...TH, textAlign: "center", width: 120 }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!activeCapex.pekerjaan || activeCapex.pekerjaan.length === 0 ? (
                        <tr><td colSpan={6} style={{ ...TD, textAlign: "center", color: "#94a3b8", padding: "24px" }}>Belum ada pekerjaan.</td></tr>
                      ) : (
                        activeCapex.pekerjaan.map((pkj, idx) => (
                          <tr key={pkj.id}>
                            <td style={{ ...TD, textAlign: "center" }}>{idx + 1}</td>
                            <td style={{ ...TD, fontWeight: 500, color: "#1e293b" }}>{pkj.nm}</td>
                            <td style={{ ...TD, color: "#64748b" }}>{fmtDate(pkj.tgl_kontrak) || "-"}</td>
                            <td style={{ ...TD, color: "#64748b" }}>{pkj.durasi_kontrak ? `${pkj.durasi_kontrak} hari` : "-"}</td>
                            <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums", color: "#2563eb", fontWeight: 600 }}>Rp {fmt(pkj.nilai_kontrak)}</td>
                            <td style={{ ...TD, textAlign: "center" }}>
                              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                                <button style={ABTN} onClick={() => setViewDetail({ cap: activeCapex, pkj })} title="Lihat Detail"><Eye size={14} style={{ color: "#2563eb" }} /></button>
                                <button style={ABTN} onClick={() => openEditPkj(activeCapex.id, pkj)} title="Edit"><Edit size={14} style={{ color: "#d97706" }} /></button>
                                <button style={ABTN} title="Hapus" onClick={() => setConfirm({ msg: "Hapus pekerjaan ini?", onConfirm: () => { setCapexList((p) => p.map((c) => c.id === activeCapex.id ? { ...c, pekerjaan: c.pekerjaan.filter((pk) => pk.id !== pkj.id) } : c)); setConfirm(null); } })}><Trash2 size={14} style={{ color: "#ef4444" }} /></button>
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
              <div style={{ background: "white", borderRadius: 12, width: "100%", maxWidth: 650, maxHeight: "90vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
                <div style={{ padding: "20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ fontWeight: 600 }}>{pkjEditId ? "Edit Pekerjaan" : "Tambah Pekerjaan"}</h3>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer" }} onClick={() => setShowPkj(false)}><X size={20} /></button>
                </div>
                <div style={{ overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
                  <Fld label="Nama Pekerjaan" required><textarea rows={2} style={INP} value={pkjForm.nm} onChange={(e) => setPkjForm((f) => ({ ...f, nm: e.target.value }))} /></Fld>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Fld label="Nilai RAB (Rp)"><input type="number" style={INP} value={pkjForm.nilai_rab} onChange={(e) => setPkjForm((f) => ({ ...f, nilai_rab: e.target.value }))} /></Fld>
                    <Fld label="Nilai Kontrak (Rp)"><input type="number" style={INP} value={pkjForm.nilai_kontrak} onChange={(e) => setPkjForm((f) => ({ ...f, nilai_kontrak: e.target.value }))} /></Fld>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    <Fld label="Nomor PR"><input style={INP} value={pkjForm.no_pr} onChange={(e) => setPkjForm((f) => ({ ...f, no_pr: e.target.value }))} /></Fld>
                    <Fld label="Nomor PO"><input style={INP} value={pkjForm.no_po} onChange={(e) => setPkjForm((f) => ({ ...f, no_po: e.target.value }))} /></Fld>
                    <Fld label="Nomor Kontrak"><input style={INP} value={pkjForm.no_kontrak} onChange={(e) => setPkjForm((f) => ({ ...f, no_kontrak: e.target.value }))} /></Fld>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    <Fld label="Tanggal Kontrak"><input type="date" style={INP} value={pkjForm.tgl_kontrak} onChange={(e) => setPkjForm((f) => ({ ...f, tgl_kontrak: e.target.value }))} /></Fld>
                    <Fld label="Durasi (Hari)"><input type="number" style={INP} value={pkjForm.durasi_kontrak} onChange={(e) => setPkjForm((f) => ({ ...f, durasi_kontrak: e.target.value }))} /></Fld>
                    <Fld label="Tanggal BAMK"><input type="date" style={INP} value={pkjForm.tgl_bamk} onChange={(e) => setPkjForm((f) => ({ ...f, tgl_bamk: e.target.value }))} /></Fld>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Fld label="Nomor SP3"><input style={INP} value={pkjForm.no_sp3} onChange={(e) => setPkjForm((f) => ({ ...f, no_sp3: e.target.value }))} /></Fld>
                    <Fld label="Tanggal SP3"><input type="date" style={INP} value={pkjForm.tgl_sp3} onChange={(e) => setPkjForm((f) => ({ ...f, tgl_sp3: e.target.value }))} /></Fld>
                  </div>
                  <Fld label="Keterangan Tambahan"><textarea rows={2} style={INP} value={pkjForm.keterangan} onChange={(e) => setPkjForm((f) => ({ ...f, keterangan: e.target.value }))} /></Fld>
                </div>
                <div style={{ padding: "16px 20px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: 12 }}>
                  <button style={BTNOUT} onClick={() => setShowPkj(false)}>Batal</button>
                  <button style={{ ...BTN, opacity: pkjForm.nm ? 1 : 0.5 }} disabled={!pkjForm.nm} onClick={handleSavePkj}>Simpan Pekerjaan</button>
                </div>
              </div>
            </div>
          )}

          {editTarget && (
            <div style={OVS} onClick={() => setEditTarget(null)}>
              <div style={{ background: "white", borderRadius: 12, padding: "24px", maxWidth: 500, width: "100%" }} onClick={(e) => e.stopPropagation()}>
                <h3 style={{ fontWeight: 600, marginBottom: 20 }}>Edit Info CAPEX</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Fld label="NAMA ANGGARAN CAPEX"><input style={INP} value={editTarget.nm_anggaran} onChange={(e) => setEditTarget((t) => ({ ...t, nm_anggaran: e.target.value }))} /></Fld>
                  <Fld label="KODE CAPEX"><input style={INP} value={editTarget.kd_capex} onChange={(e) => setEditTarget((t) => ({ ...t, kd_capex: e.target.value }))} /></Fld>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    {["thn_rkap_awal", "thn_rkap_akhir", "thn_anggaran"].map((key) => (
                      <Fld key={key} label={key.replace(/_/g, " ").toUpperCase()}>
                        <select style={INP} value={editTarget[key]} onChange={(e) => setEditTarget((t) => ({ ...t, [key]: e.target.value }))}>
                          {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </Fld>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Fld label="NILAI KAD (RP)"><input type="number" style={INP} value={editTarget.nilai_kad} onChange={(e) => setEditTarget((t) => ({ ...t, nilai_kad: e.target.value }))} /></Fld>
                    <Fld label="NILAI RKAP (RP)"><input type="number" style={INP} value={editTarget.nilai_rkap} onChange={(e) => setEditTarget((t) => ({ ...t, nilai_rkap: e.target.value }))} /></Fld>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
                  <button style={BTNOUT} onClick={() => setEditTarget(null)}>Batal</button>
                  <button style={BTN} onClick={saveEditCapex}>Simpan</button>
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
  
  // Data inisial dengan pilihan lengkap
  const [opexFormList, setOpexFormList] = useState(INIT_OPEX_FORM);
  const [capexList, setCapexList] = useState(INIT_CAPEX_FORM);
  const [opexBMData, setOpexBMData] = useState(INIT_OPEX_BM);
  
  // MENGANGKAT (LIFTING) STATE: Agar master tidak hilang saat ganti menu
  const [masterList, setMasterList] = useState(MASTER_LIST);

  const [realisasiPage, setRealisasiPage] = useState(null);
  const [realisasiFormPage, setRealisasiFormPage] = useState(null);
  const [bmToast, setBmToast] = useState(null);
  const [bmConfirm, setBmConfirm] = useState(null);

  const showBmToast = (msg) => setBmToast(msg);
  const saveOpexTrx = (id, trx) => setOpexBMData((p) => p.map((a) => (a.id === id ? { ...a, transaksi: trx } : a)));
 const handleNavigateToRealisasi = (ang) => {
  sessionStorage.setItem("pendingRealisasi", JSON.stringify(ang));
  window.dispatchEvent(new CustomEvent("navigate-to-budget"));
};
  if (realisasiFormPage) {
    const angNow = opexBMData.find((a) => a.id === realisasiFormPage.ang.id) || realisasiFormPage.ang;
    return (
      <>
        <style>{CSS_BM}</style>
        <div className="root">
          {bmToast && <ToastBM msg={bmToast} onDone={() => setBmToast(null)} />}
          <RealisasiPage ang={angNow} editData={realisasiFormPage.editData} onBack={() => { if (realisasiFormPage.returnToTable) { setRealisasiFormPage(null); setRealisasiPage({ ang: angNow }); } else { setRealisasiFormPage(null); } }} onSave={saveOpexTrx} showToast={showBmToast} />
        </div>
      </>
    );
  }

  if (realisasiPage) {
    const angNow = opexBMData.find((a) => a.id === realisasiPage.ang.id) || realisasiPage.ang;
    return (
      <>
        <style>{CSS_BM}</style>
        <div className="root">
          {bmToast && <ToastBM msg={bmToast} onDone={() => setBmToast(null)} />}
          <RealisasiTablePage ang={angNow} onBack={() => setRealisasiPage(null)} onEntryNew={() => setRealisasiFormPage({ ang: angNow, editData: null, returnToTable: true })} onEditRow={(t) => setRealisasiFormPage({ ang: angNow, editData: t, returnToTable: true })} onDeleteRow={(id) => { setBmConfirm({ msg: "Hapus transaksi ini?", onConfirm: () => { saveOpexTrx(angNow.id, angNow.transaksi.filter((trx) => trx.id !== id)); showBmToast("Dihapus"); setBmConfirm(null); } }); }} />
          {bmConfirm && <ConfirmBM msg={bmConfirm.msg} onConfirm={bmConfirm.onConfirm} onCancel={() => setBmConfirm(null)} />}
        </div>
      </>
    );
  }

  if (tipe === "OPEX") {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <style>{`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif !important; } body { -webkit-font-smoothing: antialiased; }`}</style>
        <div style={{ padding: "2rem" }}>
          <button style={{ ...BTNOUT, marginBottom: 20 }} onClick={() => setTipe(null)}><ArrowLeft size={16} /> Pilih Menu Utama</button>
          <OpexModule
            opexList={opexFormList}
            setOpexList={setOpexFormList}
            opexBMData={opexBMData}
            setOpexBMData={setOpexBMData}
            masterList={masterList}
            setMasterList={setMasterList}
            onNavigateToRealisasi={handleNavigateToRealisasi}
          />
        </div>
      </div>
    );
  }

  if (tipe === "CAPEX") {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
         <style>{`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif !important; } body { -webkit-font-smoothing: antialiased; }`}</style>
         <div style={{ padding: "2rem" }}>
           <button style={{ ...BTNOUT, marginBottom: 20 }} onClick={() => setTipe(null)}><ArrowLeft size={16} /> Pilih Menu Utama</button>
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
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <style>{`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif !important; } body { -webkit-font-smoothing: antialiased; }`}</style>
      <div style={{ padding: "4rem 2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 700, width: "100%" }}>
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ width: 48, height: 48, background: "#f1f5f9", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Database size={24} style={{ color: "#475569" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1e293b" }}>Sistem Pembuatan Anggaran</h1>
              <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4 }}>Pilih modul anggaran yang akan dikelola.</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { tipe: "OPEX", icon: <Package size={24} style={{ color: "#16a34a" }} />, bg: "#dcfce7", color: "#16a34a", sub: "Anggaran Operasional", count: `${masterList.filter(m => m.tipe === "OPEX").length} pos anggaran master` },
              { tipe: "CAPEX", icon: <FileText size={24} style={{ color: "#2563eb" }} />, bg: "#dbeafe", color: "#2563eb", sub: "Anggaran Investasi & Pekerjaan", count: `${masterList.filter(m => m.tipe === "CAPEX").length} pos anggaran master` },
            ].map((item) => (
              <div
                key={item.tipe}
                style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px", cursor: "pointer", transition: "all .2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}
                onClick={() => setTipe(item.tipe)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.02)"; }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontWeight: 600, fontSize: "1.1rem", color: "#1e293b", marginBottom: 6 }}>{item.tipe}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 12 }}>{item.sub}</p>
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}