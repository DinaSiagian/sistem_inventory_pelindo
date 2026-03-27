import React, { useState, useMemo, useEffect, useRef } from "react";

const Icon = ({ d, size = 16, style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    {Array.isArray(d) ? d.map((dd, i) => <path key={i} d={dd} />) : <path d={d} />}
  </svg>
);

const I = {
  briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  monitor: "M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4M9 17l3 3 3-3M12 17v3",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevDown: "m6 9 6 6 6-6",
  chevUp: "m18 15-6-6-6 6",
  plus: "M5 12h14M12 5v14",
  x: "M18 6 6 18M6 6l12 12",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  check: "M20 6 9 17l-5-5",
  package: "M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12",
  warning: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0-3.42 0zM12 9v4M12 17h.01",
  calendar: "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  arrowLeft: "m12 19-7-7 7-7M19 12H5",
  database: "M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zM2 12c0 2.76 4.48 5 10 5s10-2.24 10-5M2 7c0 2.76 4.48 5 10 5s10-2.24 10-5",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01",
  checkCirc: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  mapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  hash: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  image: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-6 6.17a2.5 2.5 0 1 1-3.5 0 2.5 2.5 0 0 1 3.5 0zM11.5 14H10v4h1.5a1.5 1.5 0 1 0 0-3zm6 0h-1v4h1a2 2 0 1 0 0-4zm-3.5 0h-1v4h1a2 2 0 1 0 0-4zm-6.5-6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
};

const fmt = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const newId = () => `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function pctColor(p) {
  if (p >= 100) return "#ef4444";
  if (p >= 80) return "#f59e0b";
  if (p >= 50) return "#3b82f6";
  return "#22c55e";
}
function pctMeta(p) {
  if (p >= 100) return { label: "Over Budget", bg: "#fef2f2", fg: "#dc2626", border: "#fecaca" };
  if (p >= 80) return { label: "Near Limit", bg: "#fffbeb", fg: "#d97706", border: "#fde68a" };
  if (p >= 50) return { label: "On Track", bg: "#eff6ff", fg: "#2563eb", border: "#bfdbfe" };
  return { label: "Healthy", bg: "#f0fdf4", fg: "#16a34a", border: "#bbf7d0" };
}

const ASSET_DB = {
  "SPMT-KPT-DTC-SRV-01": { name: "Server Rack Kantor Pusat — Rack 1", brand: "Dell", model: "PowerEdge R750", category: "Server", location: "Kantor Pusat" },
  "SPMT-KPT-DTC-SRV-02": { name: "Server Rack Kantor Pusat — Rack 2", brand: "Dell", model: "PowerEdge R750", category: "Server", location: "Kantor Pusat" },
  "SPMT-MLH-DTC-PKR-02": { name: "Core Switch Malahayati", brand: "Cisco", model: "Catalyst 9300-48P", category: "Network", location: "Malahayati" },
  "SPMT-TBK-DTC-PKR-01": { name: "Core Switch Tanjung Balai Karimun", brand: "Cisco", model: "Catalyst 9300-24P", category: "Network", location: "Tanjung Balai Karimun" },
  "SPMT-KPT-DTC-PKR-02": { name: "Firewall Data Center Kantor Pusat", brand: "Fortinet", model: "FortiGate 200F", category: "Security", location: "Kantor Pusat" },
};
const SN_DB = {
  "DELL-KPT-SRV-001": "SPMT-KPT-DTC-SRV-01", "DELL-KPT-SRV-002": "SPMT-KPT-DTC-SRV-02",
  "CSC-MLH-CSW-001": "SPMT-MLH-DTC-PKR-02", "CSC-TBK-CSW-001": "SPMT-TBK-DTC-PKR-01",
  "FGT-KPT-FWL-001": "SPMT-KPT-DTC-PKR-02",
};
const BUDGET_MASTERS = [
  { kd_anggaran_master: "5030905000", nm_anggaran_master: "Beban Pemeliharaan Software", tipe_anggaran_master: "OPEX" },
  { kd_anggaran_master: "5021300000", nm_anggaran_master: "Beban Jaringan dan Koneksi Data", tipe_anggaran_master: "OPEX" },
  { kd_anggaran_master: "5021200000", nm_anggaran_master: "Beban Perlengkapan Kantor", tipe_anggaran_master: "OPEX" },
  { kd_anggaran_master: "5030100000", nm_anggaran_master: "Beban Pemeliharaan Hardware", tipe_anggaran_master: "OPEX" },
  { kd_anggaran_master: "5040200000", nm_anggaran_master: "Beban Jasa Konsultan IT", tipe_anggaran_master: "OPEX" },
];

const INIT_CAPEX = [
  {
    id: "CAP-2440013", kode: "2440013", nama: "Penyiapan Infrastruktur IT Kantor Pusat & Branch",
    pagu: 0, thnAwal: 2024, thnAkhir: 2024, thnAnggaran: 2024, type: "capex",
    projects: [{
      id: "PKJ-2440013-001",
      nm_pekerjaan: "Penyiapan Infrastruktur IT PT Pelindo Multi Terminal",
      nilai_rab: 0, nilai_kontrak: 2650000000, no_pr: "", no_po: "8260000074",
      no_kontrak: "SI.01/10/9/2/PPTI/TEKI/PLMT-24", tgl_kontrak: "2024-09-10", durasi_kontrak: 90,
      no_sp3: "", tgl_sp3: "2024-09-06", tgl_bamk: "2024-09-06",
      assets: [
        { id: newId(), asset_code: "SPMT-KPT-DTC-SRV-01", serial_number: "DELL-KPT-SRV-001", name: "Server Rack Kantor Pusat — Rack 1", brand: "Dell", model: "PowerEdge R750", category: "Server", location: "Kantor Pusat", procurement_date: "2024-09-10", acquisition_value: 450000000, image: null },
        { id: newId(), asset_code: "SPMT-KPT-DTC-SRV-02", serial_number: "DELL-KPT-SRV-002", name: "Server Rack Kantor Pusat — Rack 2", brand: "Dell", model: "PowerEdge R750", category: "Server", location: "Kantor Pusat", procurement_date: "2024-09-10", acquisition_value: 450000000, image: null },
      ],
    }],
  },
  {
    id: "CAP-2440014", kode: "2440014", nama: "Penyediaan Network di Branch SPMT",
    pagu: 3200000000, thnAwal: 2024, thnAkhir: 2024, thnAnggaran: 2024, type: "capex",
    projects: [{
      id: "PKJ-2440014-001",
      nm_pekerjaan: "Penyediaan Network di Branch SPMT",
      nilai_rab: 1600000000, nilai_kontrak: 1500000000, no_pr: "", no_po: "6440000025",
      no_kontrak: "SI.01/15/8/5/PPTI/TEKI/PLMT-24", tgl_kontrak: "2024-08-15", durasi_kontrak: 90,
      no_sp3: "", tgl_sp3: "2024-08-02", tgl_bamk: "2024-08-09",
      assets: [
        { id: newId(), asset_code: "SPMT-MLH-DTC-PKR-02", serial_number: "CSC-MLH-CSW-001", name: "Core Switch Malahayati", brand: "Cisco", model: "Catalyst 9300-48P", category: "Network", location: "Malahayati", procurement_date: "2024-08-15", acquisition_value: 320000000, image: null },
      ],
    }],
  },
];

const INIT_OPEX = [
  {
    id: "OPX-1", kd_anggaran_master: "5030905000", nama: "Beban Pemeliharaan Software",
    thn_anggaran: 2026, nilai_anggaran_tahunan: 350000000, type: "opex",
    transaksi: [
      { id: newId(), tanggal: "2026-02-10", keterangan: "Lisensi Antivirus Kaspersky", no_invoice: "INV/2026/015", aset: "", lampiran: "", jumlah: 8500000 },
      { id: newId(), tanggal: "2026-01-15", keterangan: "Pembayaran Lisensi Microsoft Office 365", no_invoice: "INV/2026/001", aset: "AST-OPX-0001", lampiran: "", jumlah: 15000000 },
    ],
  },
  {
    id: "OPX-2", kd_anggaran_master: "5021300000", nama: "Beban Jaringan dan Koneksi Data",
    thn_anggaran: 2026, nilai_anggaran_tahunan: 288000000, type: "opex",
    transaksi: [
      { id: newId(), tanggal: "2026-01-05", keterangan: "Tagihan MPLS Januari 2026", no_invoice: "INV/2026/002", aset: "", lampiran: "", jumlah: 24000000 },
    ],
  },
  {
    id: "OPX-3", kd_anggaran_master: "5021200000", nama: "Beban Perlengkapan Kantor",
    thn_anggaran: 2026, nilai_anggaran_tahunan: 120000000, type: "opex", transaksi: [],
  },
];

// ══════════════════════════════════════════════════════════════════
// CSS — Bersih, Bebas Bloat, Font Ori (13px), Layout Lega
// ══════════════════════════════════════════════════════════════════
const CSS = `
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

body {
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
  background: var(--bg);
  color: var(--ink);
  font-size: 13px; /* Ukuran asli, tidak diperbesar */
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

.root { padding: 2rem 2.5rem; min-height: 100vh; max-width: 1400px; margin: 0 auto; }

/* ── HEADER ── */
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

/* ── KPI STRIP ── */
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

/* ── TOOLBAR ── */
.toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.flt-box, .srch { display: flex; align-items: center; gap: 8px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 8px 12px; box-shadow: var(--sh); transition: border-color .2s; }
.flt-box:focus-within, .srch:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.flt-box svg, .srch svg { color: var(--ink4); flex-shrink: 0; }
.flt-select, .srch input { border: none; background: transparent; font-family: inherit; font-size: .8rem; color: var(--ink); outline: none; }
.flt-select { cursor: pointer; min-width: 180px; font-weight: 500; }
.srch { flex: 1; max-width: 380px; }
.srch input { flex: 1; }

/* ── SECTION LABELS ── */
.section-label { display: flex; align-items: center; gap: 12px; margin: 1.5rem 0 1rem; }
.section-label-line { flex: 1; height: 1px; background: var(--border); }
.section-label-pill { display: flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 99px; font-size: .75rem; font-weight: 700; border: 1px solid transparent; }
.section-label-pill.capex { background: var(--blue-lt); color: var(--blue); border-color: var(--blue-mid); }
.section-label-pill.opex { background: var(--green-lt); color: var(--green); border-color: var(--green-mid); }
.section-count { font-size: .75rem; color: var(--ink4); font-weight: 500; }

/* ── HORIZONTAL JOB CARD (Desain Grid Melebar, Tidak Sumpek) ── */
.card-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.empty { background: var(--surf); border: 1.5px dashed var(--border); border-radius: var(--r-lg); text-align: center; padding: 3rem; color: var(--ink4); font-size: .85rem; font-weight: 500; }

.jcard { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--sh); transition: transform .15s, box-shadow .15s; }
.jcard:hover { transform: translateY(-1px); box-shadow: var(--sh-md); }
.jcard.open-cap { border-color: var(--blue-mid); }
.jcard.open-opx { border-color: var(--green-mid); }

/* Left accent bar */
.jcard-inner { display: flex; }
.jcard-accent { width: 3px; flex-shrink: 0; }
.jcard-accent.cap { background: var(--blue); }
.jcard-accent.opx { background: var(--green); }
.jcard-content { flex: 1; min-width: 0; }

/* Grid Top (Horizontal) */
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

/* Responsive Job Card */
@media (max-width: 1024px) {
  .jcard-top { grid-template-columns: 1fr; gap: 12px; }
  .jc-fin { justify-content: flex-start; }
  .jc-actions { justify-content: flex-start; flex-wrap: wrap; }
  .fin-div { display: none; }
}

/* ── PANEL DETAIL KARTU ── */
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

/* ── MODAL ── */
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
.m-close { width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border); background: var(--surf); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--ink4); transition: all .15s; }
.m-close:hover { background: var(--red-lt); border-color: #fca5a5; color: var(--red); }
.mbody { padding: 20px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; flex: 1; }
.mfoot { display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 16px 20px; border-top: 1px solid var(--border); flex-shrink: 0; background: var(--bg); }

/* Buttons inside Modals/Forms */
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-family: inherit; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: none; transition: all .15s; white-space: nowrap; }
.btn-outline { background: var(--surf); border: 1px solid var(--border); color: var(--ink2); }
.btn-outline:hover { background: var(--bg); border-color: #cbd5e1; }
.btn-prim { background: var(--blue); color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.2); }
.btn-prim:hover { background: #1d4ed8; }
.btn-green { background: var(--green); color: #fff; box-shadow: 0 2px 8px rgba(22,163,74,.2); }
.btn-green:hover { background: #15803d; }

/* ── SUBPAGES ── */
.subpage { animation: fadeUp .15s ease-out; max-width: 900px; margin: 0 auto; }
.subpage-hdr { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.subpage-hdr h2 { font-size: 1.25rem; font-weight: 800; flex: 1; letter-spacing: -0.5px; }
.ctx-card { background: var(--surf); border: 1px solid var(--border); border-left: 4px solid var(--blue); border-radius: var(--r-lg); padding: 16px 20px; margin-bottom: 24px; display: flex; gap: 24px; flex-wrap: wrap; box-shadow: var(--sh); }
.ctx-item { display: flex; flex-direction: column; gap: 4px; }
.ctx-item span { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--ink4); letter-spacing: 0.5px; }
.ctx-item strong { font-size: 0.9rem; font-weight: 700; color: var(--ink); }

.sec-card { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--sh); overflow: hidden; margin-bottom: 20px; }
.sec-card-hdr { display: flex; align-items: center; gap: 12px; padding: 14px 20px; background: var(--bg); border-bottom: 1px solid var(--border); }
.sec-card-hdr h3 { font-size: 0.9rem; font-weight: 800; color: var(--ink); }
.sec-card-body { padding: 20px; }

/* Forms */
.edit-grid { display: grid; gap: 16px; }
.g3 { grid-template-columns: repeat(3,1fr); }
.g2 { grid-template-columns: repeat(2,1fr); }
.g1 { grid-template-columns: 1fr; }
.edit-fld { display: flex; flex-direction: column; gap: 6px; }
.edit-fld label { font-size: 0.7rem; font-weight: 700; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.5px;}
.edit-fld input, .edit-fld textarea, .edit-fld select { padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 0.85rem; color: var(--ink); outline: none; transition: all .15s; background: var(--surf); font-weight: 500; }
.edit-fld input:focus, .edit-fld textarea:focus, .edit-fld select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }

.edit-footer { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: var(--sh-md); margin-top: 24px; position: sticky; bottom: 24px; z-index: 10; }

/* ── NEW: ASSET ENTRY CARD STYLES (Mempertegas pemisahan aset) ── */
.acard { 
  background: var(--surf); 
  border: 1px solid var(--border); 
  border-left: 5px solid var(--blue); /* Garis kiri tebal pemisah visual */
  border-radius: var(--r-lg); 
  overflow: hidden; 
  margin-bottom: 24px; /* Jarak jauh lebih lega antar aset */
  box-shadow: 0 4px 16px rgba(0,0,0,0.03); 
  transition: box-shadow 0.2s; 
}
.acard:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
.acard-hdr { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--bg); border-bottom: 1px solid var(--border); }
.acard-body { padding: 24px; }
.asset-number-badge { 
  background: var(--ink); 
  color: #fff; 
  font-size: 0.7rem; 
  font-weight: 800; 
  padding: 4px 10px; 
  border-radius: 6px; 
  letter-spacing: 0.5px; 
}

/* ── NEW: IMAGE HANDLING IN ENTRY (UI Baru Jarak Lega) ── */
.acard-image-section { 
  display: flex; 
  align-items: flex-start; 
  gap: 20px; 
  margin-bottom: 20px; 
  border-bottom: 1px dashed var(--border); 
  padding-bottom: 20px; 
}
.acard-image-box { 
  width: 120px; 
  height: 120px; 
  border-radius: 8px; 
  border: 1.5px dashed #cbd5e1; 
  background: var(--bg); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  flex-shrink: 0; 
  position: relative; 
  overflow: hidden; 
  cursor: pointer; 
  transition: all .15s; 
}
.acard-image-box:hover { border-color: var(--blue); background: var(--blue-lt); }
.acard-image-preview-container { 
  width: 100%; 
  height: 100%; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
}
.acard-image-preview { 
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain; 
}
.acard-image-upload-trigger { 
  color: var(--ink4); 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  gap: 6px; 
  font-size: 0.7rem; 
  font-weight: 600; 
  text-align: center; 
}
.acard-image-upload-trigger:hover { color: var(--blue); }
.abtn.clear { 
  padding: 4px 8px; 
  background: rgba(255,255,255,.8); 
  color: var(--ink2); 
  border: 1px solid var(--border); 
  border-radius: 6px; 
  font-size: 0.65rem; 
  position: absolute; 
  top: 6px; 
  right: 6px; 
  z-index: 2; 
}
.abtn.clear:hover { background: #fff; color: var(--red); border-color: #fca5a5; }

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
  .g3 { grid-template-columns: 1fr; }
  .g2 { grid-template-columns: 1fr; }
  .ctx-card { grid-template-columns: 1fr 1fr; }
}
`;

// ══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ══════════════════════════════════════════════════════════════════
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, []);
  return <div className="toast"><Icon d={I.check} size={14} />{msg}</div>;
}

function Confirm({ msg, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="cbox" onClick={e => e.stopPropagation()}>
        <div style={{ width: 48, height: 48, background: "#fff7ed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}><Icon d={I.warning} size={24} /></div>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)" }}>{msg}</p>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={onCancel}>Batal</button>
          <button className="btn" style={{ flex: 1, justifyContent: "center", background: "var(--red)", color: "#fff" }} onClick={onConfirm}><Icon d={I.trash} size={14} /> Hapus</button>
        </div>
      </div>
    </div>
  );
}

function CatBadge({ cat }) {
  const cls = cat === "Server" ? "cat-server" : cat === "Network" ? "cat-network" : cat === "Security" ? "cat-security" : "cat-default";
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, fontSize: "0.65rem", fontWeight: 800, background: "var(--border-lt)", color: "var(--ink3)" }} className={cls}>{cat || "—"}</span>;
}

function PctRing({ pct }) {
  const meta = pctMeta(pct);
  const r = 16, circ = 2 * Math.PI * r;
  const filled = Math.min(pct, 100) / 100 * circ;
  return (
    <div className="ring-wrap">
      <div className="ring">
        <svg width="36" height="36" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
          <circle cx="18" cy="18" r={r} fill="none" stroke={pctColor(pct)} strokeWidth="4"
            strokeDasharray={`${filled} ${circ}`} strokeDashoffset={circ * 0.25}
            strokeLinecap="round" style={{ transition: "stroke-dasharray .5s ease" }} />
        </svg>
        <span className="ring-lbl">{pct}%</span>
      </div>
      <span className="status-pill" style={{ background: meta.bg, color: meta.fg, borderColor: meta.border }}>{meta.label}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ASSET MODAL
// ══════════════════════════════════════════════════════════════════
function AssetModal({ proj, onClose, onEntry }) {
  const assets = proj.assets || [];
  const total = assets.reduce((s, a) => s + (a.acquisition_value || 0), 0);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="mbox wide" onClick={e => e.stopPropagation()}>
        <div className="mhd">
          <div className="mhd-left">
            <div className="m-ico blue"><Icon d={I.package} size={18} /></div>
            <div>
              <h3>Daftar Aset Tercatat</h3>
              <p>{assets.length} aset · {proj.nm_pekerjaan?.substring(0, 52)}…</p>
            </div>
          </div>
          <button className="m-close" onClick={onClose}><Icon d={I.x} size={14} /></button>
        </div>
        <div className="mbody">
          <div className="asset-ref" style={{ padding: "12px 16px", background: "var(--blue-lt)", borderRadius: 12, border: "1px solid var(--blue-mid)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <code style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", fontWeight: 800, background: "#fff", color: "var(--blue)", padding: "4px 8px", borderRadius: 6, border: "1px solid var(--blue-mid)" }}>{proj.no_kontrak || "—"}</code>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e40af", flex: 1 }}>{proj.nm_pekerjaan?.substring(0, 68)}…</span>
          </div>

          {assets.length === 0 ? (
            <div className="d-empty" style={{ padding: 32 }}>
              <Icon d={I.package} size={32} style={{ opacity: .3, marginBottom: 8, display:"block", margin:"0 auto 8px" }} />
              <span>Belum ada aset tercatat untuk pekerjaan ini.</span>
            </div>
          ) : (
            <div className="ai-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {assets.map((a, i) => (
                <div key={a.id} className="ai-item" style={{ display: "flex", flexDirection: "column", padding: "16px", background: "var(--surf)", border: "1px solid var(--border)", borderRadius: "12px", boxShadow: "var(--sh)" }}>
                  
                  {/* Baris Atas: Info Utama & Harga */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "16px", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Thumbnail Gambar (Jika ada) */}
                      {a.image && (
                        <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", flexShrink: 0 }}>
                          <img src={a.image} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <p style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--ink)", lineHeight: "1.3" }}>{a.name || "—"}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", fontWeight: "700", background: "var(--blue-lt)", color: "var(--blue)", padding: "2px 8px", borderRadius: "6px" }}>{a.asset_code || "—"}</span>
                          <CatBadge cat={a.category} />
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--blue)", flexShrink: 0 }}>{fmt(a.acquisition_value)}</span>
                  </div>

                  {/* Baris Bawah: Meta Data (Dibatasi garis putus-putus) */}
                  <div style={{ display: "flex", flexWrap: "wrap", rowGap: "8px", columnGap: "16px", fontSize: "0.75rem", color: "var(--ink4)", paddingTop: "12px", borderTop: "1px dashed var(--border)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }}><Icon d={I.tag} size={14} />{a.brand} {a.model}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }}><Icon d={I.mapPin} size={14} />{a.location}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }}><Icon d={I.calendar} size={14} />{fmtDate(a.procurement_date)}</span>
                    {a.serial_number && <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }}><Icon d={I.hash} size={14} />S/N: {a.serial_number}</span>}
                  </div>

                </div>
              ))}
              
              <div className="panel-total blue" style={{ marginTop: "4px" }}>
                <span>Total Nilai Aset</span>
                <strong>{fmt(total)}</strong>
              </div>
            </div>
          )}
        </div>
        <div className="mfoot">
          <button className="btn btn-outline" onClick={onClose}>Tutup</button>
          <button className="btn btn-prim" onClick={() => { onClose(); onEntry(); }}>
            <Icon d={I.plus} size={14} /> Entry Aset Baru
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// CAPEX CARD (Horizontal / Row Layout)
// ══════════════════════════════════════════════════════════════════
function CapexCard({ proj, onEdit, onAsset, onDelete }) {
  const [open, setOpen] = useState(false);
  const [assetModal, setAssetModal] = useState(false);
  const assets = proj.assets || [];
  const assetTotal = assets.reduce((s, a) => s + (a.acquisition_value || 0), 0);
  const pct = proj.nilai_kontrak > 0 ? Math.round((assetTotal / proj.nilai_kontrak) * 100) : 0;

  return (
    <>
      <div className={`jcard ${open ? "open-cap" : ""}`}>
        <div className="jcard-inner">
          <div className="jcard-accent cap" />
          <div className="jcard-content">
            <div className="jcard-top" onClick={() => setOpen(v => !v)}>
              <div className="jc-info">
                <div className="jc-tags">
                  <span className="badge capex">CAPEX</span>
                  <span className="yr-tag">{proj._thn}</span>
                  <code className="code-tag">{proj._angKode}</code>
                </div>
                <p className="jc-title">{proj.nm_pekerjaan}</p>
              </div>

              <div className="jc-meta">
                <span><Icon d={I.calendar} size={12} />{fmtDate(proj.tgl_kontrak)}</span>
                {proj.durasi_kontrak > 0 && <span><Icon d={I.clock} size={12} />{proj.durasi_kontrak} hari kerja</span>}
              </div>

              <div className="jc-fin">
                <div className="amt-blk">
                  <span className="amt-lbl">Nilai Kontrak</span>
                  <span className="amt-val red">{fmt(proj.nilai_kontrak)}</span>
                </div>
                <div className="fin-div" />
                <div className="amt-blk">
                  <span className="amt-lbl">Aset Tercatat</span>
                  <span className="amt-val blue">{fmt(assetTotal)}</span>
                </div>
              </div>

              <div className="jc-actions">
                <PctRing pct={pct} />
                <div className="act-btns" onClick={e => e.stopPropagation()}>
                  <button className="abtn" onClick={() => onEdit(proj)}><Icon d={I.edit} size={12} /> Edit</button>
                  <button className="abtn blue" onClick={() => setAssetModal(true)}>
                    <Icon d={I.package} size={12} />{assets.length > 0 ? `${assets.length} Aset` : "Entry"}
                  </button>
                  <button className="abtn del" onClick={() => onDelete(proj)}><Icon d={I.trash} size={12} /></button>
                </div>
                <div className="chev"><Icon d={open ? I.chevUp : I.chevDown} size={14} /></div>
              </div>
            </div>

            {open && (
              <div className="jcard-detail">
                <div className="detail-grid">
                  <div className="d-panel">
                    <div className="d-title">Informasi Kontrak</div>
                    <div className="d-rows">
                      {proj.no_kontrak && <div className="d-row"><span className="lbl">No. Kontrak</span><span className="val"><code>{proj.no_kontrak}</code></span></div>}
                      {proj.no_po && <div className="d-row"><span className="lbl">No. PO</span><span className="val"><code>{proj.no_po}</code></span></div>}
                      {proj.no_pr && <div className="d-row"><span className="lbl">No. PR</span><span className="val"><code>{proj.no_pr}</code></span></div>}
                      {proj.tgl_kontrak && <div className="d-row"><span className="lbl">Tgl. Kontrak</span><span className="val">{fmtDate(proj.tgl_kontrak)}</span></div>}
                      {proj.durasi_kontrak > 0 && <div className="d-row"><span className="lbl">Durasi</span><span className="val">{proj.durasi_kontrak} hari</span></div>}
                      {proj.tgl_sp3 && <div className="d-row"><span className="lbl">Tgl. SP3</span><span className="val">{fmtDate(proj.tgl_sp3)}</span></div>}
                      {proj.tgl_bamk && <div className="d-row"><span className="lbl">BAMK</span><span className="val">{fmtDate(proj.tgl_bamk)}</span></div>}
                      {proj.nilai_rab > 0 && <div className="d-row"><span className="lbl">Nilai RAB</span><span className="val">{fmt(proj.nilai_rab)}</span></div>}
                    </div>
                  </div>
                  <div className="d-panel">
                    <div className="d-title">
                      Aset Tercatat
                      <button className="inline-link" onClick={() => setAssetModal(true)}>Lihat & Entry →</button>
                    </div>
                    {assets.length === 0 ? (
                      <div className="d-empty">Belum ada aset ditambahkan.</div>
                    ) : (
                      <div className="ai-list">
                        {assets.slice(0, 3).map(a => (
                          <div key={a.id} className="ai-item">
                            <div className="ai-info">
                              <code className="a-code">{a.asset_code}</code>
                              <div>
                                <p className="a-name">{a.name}</p>
                                <p className="a-loc"><Icon d={I.mapPin} size={10} />{a.location}</p>
                              </div>
                            </div>
                            <span className="a-val">{fmt(a.acquisition_value)}</span>
                          </div>
                        ))}
                        {assets.length > 3 && (
                          <div style={{ textAlign: "center", paddingTop: 4 }}>
                            <button className="inline-link" onClick={() => setAssetModal(true)}>+ {assets.length - 3} aset lainnya</button>
                          </div>
                        )}
                        <div className="panel-total blue">
                          <span>Total Nilai</span>
                          <strong>{fmt(assetTotal)}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {assetModal && (
        <AssetModal proj={proj} onClose={() => setAssetModal(false)} onEntry={() => onAsset(proj)} />
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════════
// OPEX CARD (Horizontal / Row Layout)
// ══════════════════════════════════════════════════════════════════
function OpexCard({ ang, onSave, onSaveOpex, showToast, onDelete, onOpenRealisasi }) {
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const totalReal = (ang.transaksi || []).reduce((s, t) => s + (t.jumlah || 0), 0);
  const pagu = ang.nilai_anggaran_tahunan || 0;
  const sisa = pagu - totalReal;
  const pct = pagu > 0 ? Math.round((totalReal / pagu) * 100) : 0;
  const masterInfo = BUDGET_MASTERS.find(m => m.kd_anggaran_master === ang.kd_anggaran_master);

  const deleteRow = id => setConfirm({
    msg: "Hapus transaksi realisasi ini?",
    onConfirm: () => { onSave(ang.id, ang.transaksi.filter(t => t.id !== id)); showToast("Transaksi dihapus"); setConfirm(null); }
  });

  return (
    <div className={`jcard ${open ? "open-opx" : ""}`}>
      <div className="jcard-inner">
        <div className="jcard-accent opx" />
        <div className="jcard-content">
          <div className="jcard-top" onClick={() => setOpen(v => !v)}>
            <div className="jc-info">
              <div className="jc-tags">
                <span className="badge opex">OPEX</span>
                <span className="yr-tag">Thn {ang.thn_anggaran}</span>
                <code className="code-tag">{ang.kd_anggaran_master}</code>
              </div>
              <p className="jc-title" style={{ color: open ? "#14532d" : "var(--ink)" }}>{ang.nama}</p>
            </div>

            <div className="jc-meta">
              <span><Icon d={I.database} size={12} />{masterInfo?.nm_anggaran_master || ang.nama}</span>
            </div>

            <div className="jc-fin">
              <div className="amt-blk">
                <span className="amt-lbl">Pagu Anggaran</span>
                <span className="amt-val blue">{fmt(pagu)}</span>
              </div>
              <div className="fin-div" />
              <div className="amt-blk">
                <span className="amt-lbl">Realisasi</span>
                <span className="amt-val amber">{fmt(totalReal)}</span>
              </div>
              <div className="fin-div" />
              <div className="amt-blk">
                <span className="amt-lbl">Sisa</span>
                <span className="amt-val" style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>{fmt(Math.abs(sisa))}</span>
              </div>
            </div>

            <div className="jc-actions">
              <PctRing pct={pct} />
              <div className="act-btns" onClick={e => e.stopPropagation()}>
                <button className={`abtn ${showEdit ? "del" : ""}`} onClick={() => { setShowEdit(v => !v); if (!showEdit) setOpen(true); }}>
                  <Icon d={showEdit ? I.x : I.edit} size={12} />{showEdit ? "Tutup" : "Edit"}
                </button>
                <button className="abtn green" onClick={() => onOpenRealisasi(ang, null)}>
                  <Icon d={I.plus} size={12} /> Entry
                </button>
                <button className="abtn del" onClick={() => onDelete(ang.id)}><Icon d={I.trash} size={12} /></button>
              </div>
              <div className="chev"><Icon d={open ? I.chevUp : I.chevDown} size={14} /></div>
            </div>
          </div>

          {showEdit && (
            <EditOpexInline ang={ang} onSave={u => { onSaveOpex(ang.id, u); showToast("Pos diperbarui"); setShowEdit(false); }} onCancel={() => setShowEdit(false)} />
          )}

          {open && (
            <div className="jcard-detail">
              <div className="detail-grid">
                <div className="d-panel">
                  <div className="d-title">Ringkasan Dana</div>
                  <div className="d-rows">
                    <div className="d-row"><span className="lbl">Kode Master</span><span className="val"><code>{ang.kd_anggaran_master}</code></span></div>
                    <div className="d-row"><span className="lbl">Tahun Anggaran</span><span className="val">{ang.thn_anggaran}</span></div>
                    <div className="d-row"><span className="lbl">Total Anggaran (Pagu)</span><span className="val" style={{ color: "var(--blue)" }}>{fmt(pagu)}</span></div>
                    <div className="d-row"><span className="lbl">Total Realisasi</span><span className="val" style={{ color: "var(--amber)" }}>{fmt(totalReal)}</span></div>
                    <div className="d-row"><span className="lbl">Sisa Anggaran</span><span className="val" style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>{fmt(Math.abs(sisa))} {sisa < 0 && "(melebihi)"}</span></div>
                    <div className="d-row"><span className="lbl">Persentase Serapan</span><span className="val">{pct}%</span></div>
                  </div>
                </div>
                <div className="d-panel">
                  <div className="d-title">
                    Riwayat Realisasi
                    <button className="inline-link" onClick={() => onOpenRealisasi(ang, null)}>+ Entry Baru</button>
                  </div>
                  {(!ang.transaksi || ang.transaksi.length === 0) ? (
                    <div className="d-empty">Belum ada realisasi tercatat.</div>
                  ) : (
                    <div className="ri-list">
                      {ang.transaksi.slice(0,3).map(t => (
                        <div key={t.id} className="ri-item">
                          <div className="ri-info">
                            <span className="r-id">{t.no_invoice || "—"}</span>
                            <div>
                              <p className="r-ket">{t.keterangan}</p>
                              <p className="r-date">{fmtDate(t.tanggal)}</p>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span className="r-val">{fmt(t.jumlah)}</span>
                            <div className="act-btns">
                              <button className="abtn" style={{ padding: "4px 6px" }} onClick={() => onOpenRealisasi(ang, t)}><Icon d={I.edit} size={11} /></button>
                              <button className="abtn del" style={{ padding: "4px 6px" }} onClick={() => deleteRow(t.id)}><Icon d={I.trash} size={11} /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {ang.transaksi.length > 3 && (
                        <div style={{ textAlign: "center", paddingTop: 4, fontSize: "0.75rem", color: "var(--ink4)" }}>
                          +{ang.transaksi.length - 3} transaksi lainnya
                        </div>
                      )}
                      <div className="panel-total amber">
                        <span>Total Realisasi</span>
                        <strong>{fmt(totalReal)}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {confirm && <Confirm msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// EDIT OPEX INLINE
// ══════════════════════════════════════════════════════════════════
function EditOpexInline({ ang, onSave, onCancel }) {
  const [form, setForm] = useState({ kd_anggaran_master: ang.kd_anggaran_master || "", nama: ang.nama || "", thn_anggaran: ang.thn_anggaran || new Date().getFullYear(), nilai_anggaran_tahunan: ang.nilai_anggaran_tahunan || 0 });
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleMaster = kd => { const m = BUDGET_MASTERS.find(x => x.kd_anggaran_master === kd); setForm(f => ({ ...f, kd_anggaran_master: kd, nama: m ? m.nm_anggaran_master : f.nama })); };
  return (
    <div style={{ background: "var(--green-lt)", borderTop: "1px solid var(--green-mid)", borderBottom: "1px solid var(--green-mid)", padding: "20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--green)", display: "flex", alignItems: "center", gap: 8 }}><Icon d={I.edit} size={12} /> Edit Pos OPEX</h3>
        <button className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "0.75rem" }} onClick={onCancel}><Icon d={I.x} size={10} /> Tutup</button>
      </div>
      <div className="edit-grid g2" style={{ marginBottom: "16px" }}>
        <div className="edit-fld">
          <label>Kode Anggaran Master</label>
          <select value={form.kd_anggaran_master} onChange={e => handleMaster(e.target.value)}>
            <option value="">— Pilih —</option>
            {BUDGET_MASTERS.map(m => <option key={m.kd_anggaran_master} value={m.kd_anggaran_master}>{m.kd_anggaran_master} — {m.nm_anggaran_master}</option>)}
          </select>
        </div>
        <div className="edit-fld"><label>Nama Pos Anggaran</label><input value={form.nama} onChange={e => up("nama", e.target.value)} /></div>
      </div>
      <div className="edit-grid g2" style={{ marginBottom: "16px" }}>
        <div className="edit-fld"><label>Tahun Anggaran</label><input type="number" value={form.thn_anggaran} onChange={e => up("thn_anggaran", e.target.value)} /></div>
        <div className="edit-fld">
          <label>Nilai Anggaran Tahunan (IDR)</label>
          <input type="number" value={form.nilai_anggaran_tahunan || ""} onChange={e => up("nilai_anggaran_tahunan", e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn-green" onClick={() => onSave({ kd_anggaran_master: form.kd_anggaran_master, nama: form.nama, thn_anggaran: parseInt(form.thn_anggaran) || new Date().getFullYear(), nilai_anggaran_tahunan: parseFloat(form.nilai_anggaran_tahunan) || 0 })}>
          <Icon d={I.save} size={12} /> Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// EDIT PROJECT PAGE
// ══════════════════════════════════════════════════════════════════
function EditProjectPage({ project, anggaran, onBack, onSave, showToast }) {
  const [form, setForm] = useState({ ...project });
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSave = () => {
    onSave(project.id, { ...form, nilai_rab: parseFloat(form.nilai_rab) || 0, nilai_kontrak: parseFloat(form.nilai_kontrak) || 0, durasi_kontrak: parseInt(form.durasi_kontrak) || 0 });
    showToast("Pekerjaan berhasil diperbarui"); onBack();
  };
  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}><Icon d={I.arrowLeft} size={12} /> Kembali</button>
        <div style={{ flex: 1 }}>
          <h2>Edit Pekerjaan CAPEX</h2>
        </div>
      </div>
      <div className="ctx-card">
        <div className="ctx-item"><span>Anggaran</span><strong>{anggaran?.nama || "—"}</strong></div>
        <div className="ctx-item"><span>Kode</span><strong><code>{anggaran?.kode}</code></strong></div>
        <div className="ctx-item"><span>Tahun</span><strong>{anggaran?.thnAnggaran}</strong></div>
        <div className="ctx-item"><span>Pagu</span><strong style={{ color: "var(--blue)" }}>{anggaran?.pagu > 0 ? fmt(anggaran.pagu) : "—"}</strong></div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <h3>Informasi Pekerjaan</h3>
        </div>
        <div className="sec-card-body">
          <div className="edit-grid g1" style={{ marginBottom: "16px" }}>
            <div className="edit-fld full"><label>Nama Pekerjaan *</label><textarea rows="2" value={form.nm_pekerjaan || ""} onChange={e => up("nm_pekerjaan", e.target.value)} /></div>
          </div>
          <div className="edit-grid g3">
            <div className="edit-fld"><label>Nilai RAB (IDR)</label><input type="number" value={form.nilai_rab || ""} onChange={e => up("nilai_rab", e.target.value)} /></div>
            <div className="edit-fld"><label>Nilai Kontrak (IDR)</label><input type="number" value={form.nilai_kontrak || ""} onChange={e => up("nilai_kontrak", e.target.value)} /></div>
            <div className="edit-fld"><label>Durasi Kontrak (Hari)</label><input type="number" value={form.durasi_kontrak || ""} onChange={e => up("durasi_kontrak", e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <h3>Referensi Dokumen</h3>
        </div>
        <div className="sec-card-body">
          <div className="edit-grid g3" style={{ marginBottom: "16px" }}>
            <div className="edit-fld"><label>No. PR</label><input value={form.no_pr || ""} onChange={e => up("no_pr", e.target.value)} /></div>
            <div className="edit-fld"><label>No. PO</label><input value={form.no_po || ""} onChange={e => up("no_po", e.target.value)} /></div>
            <div className="edit-fld"><label>No. Kontrak</label><input value={form.no_kontrak || ""} onChange={e => up("no_kontrak", e.target.value)} /></div>
          </div>
          <div className="edit-grid g3">
            <div className="edit-fld"><label>Tgl. Kontrak</label><input type="date" value={form.tgl_kontrak || ""} onChange={e => up("tgl_kontrak", e.target.value)} /></div>
            <div className="edit-fld"><label>No. SP3</label><input value={form.no_sp3 || ""} onChange={e => up("no_sp3", e.target.value)} /></div>
            <div className="edit-fld"><label>Tgl. SP3</label><input type="date" value={form.tgl_sp3 || ""} onChange={e => up("tgl_sp3", e.target.value)} /></div>
            <div className="edit-fld"><label>Tgl. BAMK</label><input type="date" value={form.tgl_bamk || ""} onChange={e => up("tgl_bamk", e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div className="edit-footer">
        <div className="edit-footer-info">
          <span>Menyimpan Perubahan</span>
          <strong>Pastikan semua nilai sudah benar.</strong>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-outline" onClick={onBack}>Batal</button>
          <button className="btn btn-prim" onClick={handleSave}><Icon d={I.save} size={12} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ASSET ENTRY PAGE (Dengan Fitur Unggah Gambar per Aset)
// ══════════════════════════════════════════════════════════════════
function AssetEntryPage({ project, anggaran, onBack, onSave, showToast }) {
  const [assets, setAssets] = useState((project.assets || []).map(a => ({ ...a, _af: false, image: a.image || null })));
  const [confirm, setConfirm] = useState(null);
  const fileInputRef = useRef(null);
  const [activeAssetId, setActiveAssetId] = useState(null);

  const add = () => setAssets(p => [...p, { id: newId(), asset_code: "", serial_number: "", name: "", brand: "", model: "", category: "", location: "", procurement_date: "", acquisition_value: "", image: null, _new: true, _af: false }]);
  const upd = (id, k, v) => setAssets(p => p.map(a => a.id === id ? { ...a, [k]: v } : a));
  const remove = id => setAssets(p => p.filter(a => a.id !== id));
  
  const handleFileRead = (id, file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      upd(id, 'image', e.target.result); // Simpan Base64 string
    };
  };

  const triggerImageUpload = (id) => {
    setActiveAssetId(id);
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && activeAssetId) {
      handleFileRead(activeAssetId, file);
    }
    setActiveAssetId(null);
    e.target.value = null;
  };

  const tryAF = (id, k, v) => setAssets(p => p.map(a => {
    if (a.id !== id) return a;
    let u = { ...a, [k]: v, _af: false };
    let lk = null;
    if (k === "asset_code" && v) lk = ASSET_DB[v.trim()];
    else if (k === "serial_number" && v) { const c = SN_DB[v.trim()]; if (c) { lk = ASSET_DB[c]; u.asset_code = c; } }
    if (lk) u = { ...u, name: lk.name, brand: lk.brand, model: lk.model, category: lk.category, location: lk.location, _af: true };
    return u;
  }));

  const total = assets.reduce((s, a) => s + (parseFloat(a.acquisition_value) || 0), 0);
  const save = () => {
    const cl = assets.map(({ _new, _af, ...a }) => ({ ...a, acquisition_value: parseFloat(a.acquisition_value) || 0 }));
    onSave(project.id, cl); showToast(`${cl.length} aset disimpan`); onBack();
  };

  return (
    <div className="subpage">
      <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}><Icon d={I.arrowLeft} size={12} /> Kembali</button>
        <div style={{ flex: 1 }}>
          <h2>Kelola Aset Pekerjaan</h2>
        </div>
      </div>
      <div className="ctx-card">
        <div className="ctx-item"><span>Pekerjaan</span><strong>{project.nm_pekerjaan?.substring(0,40)}...</strong></div>
        <div className="ctx-item"><span>No. Kontrak</span><strong>{project.no_kontrak || "—"}</strong></div>
        <div className="ctx-item"><span>Nilai Kontrak</span><strong style={{ color: "var(--red)" }}>{project.nilai_kontrak > 0 ? fmt(project.nilai_kontrak) : "—"}</strong></div>
        <div className="ctx-item"><span>Total Nilai Aset</span><strong style={{ color: "var(--blue)" }}>{fmt(total)}</strong></div>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 800 }}>Daftar Aset Terdaftar</span>
        </div>
        <button className="btn btn-prim" onClick={add}><Icon d={I.plus} size={12} /> Tambah Aset Baru</button>
      </div>

      {assets.length === 0 && <div className="empty">Belum ada aset ditambahkan ke pekerjaan ini.</div>}
      {assets.map((a, i) => (
        <div key={a.id} className="acard">
          <div className="acard-hdr">
            <span className="asset-number-badge">ASET #{i + 1}</span>
            {a._new && <span style={{ background: "var(--green-mid)", color: "var(--green)", borderRadius: 99, padding: "2px 8px", fontSize: "0.65rem", fontWeight: 800 }}>Baru</span>}
            {a._af && <span style={{ background: "var(--green-lt)", color: "var(--green)", border: "1px solid var(--green-mid)", borderRadius: 99, padding: "2px 8px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}><Icon d={I.checkCirc} size={10} /> Auto-filled</span>}
            <button className="abtn del" style={{ marginLeft: "auto" }} onClick={() => setConfirm({ msg: `Hapus aset "#${i + 1}"?`, onConfirm: () => { remove(a.id); setConfirm(null); } })}><Icon d={I.trash} size={12} /> Hapus</button>
          </div>
          <div className="acard-body">
            
            {/* AREA UNGGAH GAMBAR ASET */}
            <div className="acard-image-section">
              <div className="acard-image-box" onClick={() => triggerImageUpload(a.id)}>
                {a.image ? (
                  <div className="acard-image-preview-container">
                    <img src={a.image} alt="Preview Aset" className="acard-image-preview" />
                    <button className="abtn clear" onClick={(e) => { e.stopPropagation(); upd(a.id, 'image', null); }}>Hapus</button>
                  </div>
                ) : (
                  <div className="acard-image-upload-trigger">
                    <Icon d={I.image} size={24} />
                    <span>Unggah Foto</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Dokumentasi Fisik Aset</p>
                <p style={{ fontSize: "0.75rem", color: "var(--ink4)", lineHeight: 1.4 }}>
                  Ketuk kotak di sebelah kiri untuk mengunggah foto fisik aset. Foto akan membantu identifikasi saat audit atau pelaporan kerusakan. 
                  <br/>Mendukung JPG, PNG (maks. 5MB).
                </p>
              </div>
            </div>

            {a._af && <div className="af-banner"><Icon d={I.checkCirc} size={16} /> Data ditemukan & diisi otomatis dari database!</div>}
            <div className="edit-grid g3">
              <div className="edit-fld"><label>Kode Aset *</label><input value={a.asset_code} onChange={e => tryAF(a.id, "asset_code", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Serial Number</label><input value={a.serial_number || ""} onChange={e => tryAF(a.id, "serial_number", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Tgl. Pengadaan</label><input type="date" value={a.procurement_date || ""} onChange={e => upd(a.id, "procurement_date", e.target.value)} /></div>
              <div className="edit-fld full"><label>Nama Aset *</label><input value={a.name} onChange={e => upd(a.id, "name", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Merek</label><input value={a.brand || ""} onChange={e => upd(a.id, "brand", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Model / Tipe</label><input value={a.model || ""} onChange={e => upd(a.id, "model", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Kategori</label><input value={a.category || ""} onChange={e => upd(a.id, "category", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Lokasi</label><input value={a.location || ""} onChange={e => upd(a.id, "location", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Nilai Perolehan (IDR)</label><input type="number" value={a.acquisition_value || ""} onChange={e => upd(a.id, "acquisition_value", e.target.value)} /></div>
            </div>
          </div>
        </div>
      ))}
      {assets.length > 0 && (
        <div className="edit-footer">
          <div className="edit-footer-info">
            <span>Total Nilai Semua Aset</span>
            <strong style={{ color: "var(--blue)" }}>{fmt(total)}</strong>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-outline" onClick={onBack}>Batal</button>
            <button className="btn btn-prim" onClick={save}><Icon d={I.save} size={14} /> Simpan Data Aset</button>
          </div>
        </div>
      )}
      {confirm && <Confirm msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// REALISASI PAGE
// ══════════════════════════════════════════════════════════════════
function RealisasiPage({ ang, editData, onBack, onSave, showToast }) {
  const isEdit = !!editData;
  const [form, setForm] = useState(isEdit ? { ...editData, jumlah: editData.jumlah || "" } : { tanggal: "", keterangan: "", no_invoice: "", aset: "", lampiran: "", jumlah: "" });
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  
  const pagu = ang.nilai_anggaran_tahunan || 0;
  const prev = (ang.transaksi || []).filter(t => !isEdit || t.id !== editData.id).reduce((s, t) => s + (t.jumlah || 0), 0);
  const jumlah = parseFloat(String(form.jumlah).replace(/[^\d.]/g, "")) || 0;
  const sisa = pagu - prev - jumlah;

  const save = () => {
    if (!form.tanggal || !form.keterangan || !form.jumlah) return;
    const j = parseFloat(String(form.jumlah).replace(/[^\d.]/g, "")) || 0;
    const list = isEdit ? ang.transaksi.map(t => t.id === editData.id ? { ...form, jumlah: j, id: editData.id } : t) : [...(ang.transaksi || []), { ...form, jumlah: j, id: newId() }];
    onSave(ang.id, list); showToast(isEdit ? "Realisasi diperbarui" : "Realisasi ditambahkan"); onBack();
  };

  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" onClick={onBack}><Icon d={I.arrowLeft} size={14} /> Kembali</button>
        <div style={{ flex: 1 }}>
          <h2>{isEdit ? "Edit Realisasi" : "Tambah Realisasi"}</h2>
        </div>
      </div>
      <div className="ctx-card" style={{ borderColor: "var(--green)", background: "var(--green-lt)", borderLeft: "4px solid var(--green)" }}>
        <div className="ctx-item"><span>Pos Anggaran</span><strong style={{color:"var(--ink)"}}>{ang.nama}</strong></div>
        <div className="ctx-item"><span>Pagu</span><strong style={{ color: "var(--blue)" }}>{fmt(pagu)}</strong></div>
        <div className="ctx-item">
          <span>Sisa Setelah Input</span>
          <strong style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>{fmt(Math.abs(sisa))} {sisa < 0 && "(melebihi)"}</strong>
        </div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <div style={{width:32, height:32, borderRadius:8, background:"var(--green-lt)", color:"var(--green)", display:"flex", alignItems:"center", justifyContent:"center"}}><Icon d={isEdit ? I.edit : I.plus} size={14} /></div>
          <div><h3>{isEdit ? "Edit Transaksi" : "Data Transaksi"}</h3></div>
        </div>
        <div className="sec-card-body">
          <div className="edit-grid g2" style={{ marginBottom: "16px" }}>
            <div className="edit-fld"><label>Tanggal *</label><input type="date" value={form.tanggal} onChange={e => up("tanggal", e.target.value)} /></div>
            <div className="edit-fld"><label>Keterangan *</label><input value={form.keterangan} onChange={e => up("keterangan", e.target.value)} /></div>
          </div>
          <div className="edit-grid g2">
            <div className="edit-fld"><label>No. Invoice</label><input value={form.no_invoice} onChange={e => up("no_invoice", e.target.value)} /></div>
            <div className="edit-fld"><label>Jumlah (IDR) *</label><input type="number" value={form.jumlah} onChange={e => up("jumlah", e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div className="edit-footer">
        <div className="edit-footer-info">
          <span>Jumlah Transaksi Input</span>
          <strong style={{ color: "var(--green)" }}>{fmt(jumlah)}</strong>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-outline" onClick={onBack}>Batal</button>
          <button className="btn btn-green" style={{ opacity: !form.tanggal || !form.keterangan || !form.jumlah ? .5 : 1 }} onClick={save}><Icon d={I.save} size={12} /> {isEdit ? "Perbarui" : "Simpan"}</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function BudgetManagement() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [tahun, setTahun] = useState("all");
  const [angFilter, setAngFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [capexData, setCapexData] = useState(INIT_CAPEX);
  const [opexData, setOpexData] = useState(INIT_OPEX);

  const showToast = msg => setToast(msg);
  const currentYear = new Date().getFullYear();
  const yearOpts = ["all", String(currentYear - 3), String(currentYear - 2), String(currentYear - 1), String(currentYear)];

  const allProjects = useMemo(() => capexData.flatMap(ang => ang.projects.map(p => ({ ...p, _angId: ang.id, _angNama: ang.nama, _angKode: ang.kode, _thn: ang.thnAnggaran }))), [capexData]);
  const filteredOpex = useMemo(() => opexData.filter(ang => tahun === "all" || String(ang.thn_anggaran) === tahun), [opexData, tahun]);

  const angList = useMemo(() => {
    const f = allProjects.filter(p => tahun === "all" || String(p._thn) === tahun);
    const m = new Map();
    f.forEach(p => { if (!m.has(p._angId)) m.set(p._angId, { id: p._angId, nama: p._angNama }); });
    return Array.from(m.values());
  }, [allProjects, tahun]);

  const filteredProjects = useMemo(() => {
    if (typeFilter === "opex") return [];
    return allProjects.filter(p => {
      if (tahun !== "all" && String(p._thn) !== tahun) return false;
      if (angFilter !== "all" && p._angId !== angFilter) return false;
      if (search && !p.nm_pekerjaan?.toLowerCase().includes(search.toLowerCase()) && !p.no_kontrak?.toLowerCase().includes(search.toLowerCase()) && !p._angNama?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [allProjects, typeFilter, tahun, angFilter, search]);

  useEffect(() => { setAngFilter("all"); }, [typeFilter, tahun]);

  const stats = useMemo(() => {
    const cb = allProjects.filter(p => tahun === "all" || String(p._thn) === tahun);
    const paguCap = capexData.filter(a => tahun === "all" || String(a.thnAnggaran) === tahun).reduce((s, a) => s + (a.pagu || 0), 0);
    const paguOpx = filteredOpex.reduce((s, a) => s + (a.nilai_anggaran_tahunan || 0), 0);
    const pagu = typeFilter === "opex" ? paguOpx : typeFilter === "capex" ? paguCap : paguCap + paguOpx;
    const kontrak = cb.reduce((s, p) => s + (p.nilai_kontrak || 0), 0);
    const aset = cb.reduce((s, p) => s + (p.assets || []).reduce((ss, a) => ss + (a.acquisition_value || 0), 0), 0);
    return { pagu, kontrak, aset, count: cb.length };
  }, [allProjects, filteredOpex, capexData, typeFilter, tahun]);

  const getAng = id => capexData.find(a => a.id === id);

  const saveOpexTrx = (id, trx) => setOpexData(p => p.map(a => a.id === id ? { ...a, transaksi: trx } : a));
  const saveOpexData = (id, u) => setOpexData(p => p.map(a => a.id === id ? { ...a, ...u } : a));
  const deleteOpex = id => setConfirm({ msg: "Hapus pos anggaran OPEX ini beserta semua transaksinya?", onConfirm: () => { setOpexData(p => p.filter(a => a.id !== id)); showToast("Pos anggaran dihapus"); setConfirm(null); } });
  const saveProject = (id, u) => setCapexData(p => p.map(ang => ({ ...ang, projects: ang.projects.map(pr => pr.id === id ? { ...pr, ...u } : pr) })));
  const saveAssets = (id, assets) => setCapexData(p => p.map(ang => ({ ...ang, projects: ang.projects.map(pr => pr.id === id ? { ...pr, assets } : pr) })));
  const deleteProject = (id, angId) => { setCapexData(p => p.map(ang => ang.id === angId ? { ...ang, projects: ang.projects.filter(pr => pr.id !== id) } : ang)); showToast("Pekerjaan dihapus"); };

  if (page?.type === "editProject") return (<><style>{CSS}</style><div className="root">{toast && <Toast msg={toast} onDone={() => setToast(null)} />}<EditProjectPage project={page.project} anggaran={page.anggaran} onBack={() => setPage(null)} onSave={saveProject} showToast={showToast} /></div></>);
  if (page?.type === "asset") return (<><style>{CSS}</style><div className="root">{toast && <Toast msg={toast} onDone={() => setToast(null)} />}<AssetEntryPage project={page.project} anggaran={page.anggaran} onBack={() => setPage(null)} onSave={saveAssets} showToast={showToast} /></div></>);
  if (page?.type === "realisasi") { const angNow = opexData.find(a => a.id === page.ang.id) || page.ang; return (<><style>{CSS}</style><div className="root">{toast && <Toast msg={toast} onDone={() => setToast(null)} />}<RealisasiPage ang={angNow} editData={page.editData} onBack={() => setPage(null)} onSave={saveOpexTrx} showToast={showToast} /></div></>); }

  const showCapex = typeFilter !== "opex";
  const showOpex = typeFilter !== "capex";
  const showBoth = typeFilter === "all";

  return (
    <>
      <style>{CSS}</style>
      <div className="root">
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
        
        {/* HEADER */}
        <div className="hdr">
          <div>
            <h1>Anggaran &amp; Pekerjaan</h1>
            <p>Monitoring CAPEX &amp; OPEX berdasarkan anggaran</p>
          </div>
          <div className="hdr-right">
            <div className="yr-row">
              {yearOpts.map(y => <button key={y} className={`yr-btn ${tahun === y ? "on" : ""}`} onClick={() => setTahun(y)}>{y === "all" ? "Semua Tahun" : y}</button>)}
            </div>
            <div className="type-tabs">
              <button className={`type-tab all ${typeFilter === "all" ? "on" : ""}`} onClick={() => setTypeFilter("all")}><Icon d={I.layers} size={14} /> Semua</button>
              <button className={`type-tab ${typeFilter === "capex" ? "on" : ""}`} onClick={() => setTypeFilter("capex")}><Icon d={I.briefcase} size={14} /> CAPEX</button>
              <button className={`type-tab ${typeFilter === "opex" ? "on" : ""}`} onClick={() => setTypeFilter("opex")}><Icon d={I.monitor} size={14} /> OPEX</button>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="kpi-strip">
          <div className="kpi blue">
            <div className="kpi-ico"><Icon d={I.briefcase} size={20} /></div>
            <div className="kpi-body">
              <div className="kpi-lbl">Total Anggaran</div>
              <div className="kpi-val">{fmt(stats.pagu)}</div>
              <div className="kpi-sub">{stats.count} pekerjaan terdaftar</div>
            </div>
          </div>
          <div className="kpi amber">
            <div className="kpi-ico"><Icon d={I.fileText} size={20} /></div>
            <div className="kpi-body">
              <div className="kpi-lbl">Realisasi Kontrak</div>
              <div className="kpi-val">{fmt(stats.kontrak)}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${stats.pagu > 0 ? Math.min((stats.kontrak / stats.pagu) * 100, 100) : 0}%`, background: "var(--amber)" }} /></div>
            </div>
          </div>
          <div className="kpi green">
            <div className="kpi-ico"><Icon d={I.package} size={20} /></div>
            <div className="kpi-body">
              <div className="kpi-lbl">Nilai Aset Tercatat</div>
              <div className="kpi-val">{fmt(stats.aset)}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${stats.kontrak > 0 ? Math.min((stats.aset / stats.kontrak) * 100, 100) : 0}%`, background: "var(--green)" }} /></div>
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="toolbar">
          <div className="flt-box">
            <Icon d={I.filter} size={14} />
            <select className="flt-select" value={angFilter} onChange={e => setAngFilter(e.target.value)}>
              <option value="all">Semua Kategori Anggaran</option>
              {angList.map(a => <option key={a.id} value={a.id}>{a.nama.length > 42 ? a.nama.substring(0, 42) + "..." : a.nama}</option>)}
            </select>
          </div>
          <div className="srch">
            <Icon d={I.search} size={14} />
            <input placeholder="Cari berdasarkan nama pekerjaan atau nomor kontrak..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* CAPEX SECTION */}
        {showCapex && (
          <>
            {showBoth && (
              <div className="section-label">
                <div className="section-label-line" />
                <div className="section-label-pill capex"><Icon d={I.briefcase} size={12} /> CAPEX</div>
                <span className="section-count">{filteredProjects.length} pekerjaan</span>
                <div className="section-label-line" />
              </div>
            )}
            {!showBoth && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon d={I.briefcase} size={16} style={{ color: "var(--blue)" }} /> Daftar Pekerjaan CAPEX
                </div>
              </div>
            )}
            {filteredProjects.length === 0 ? (
              <div className="empty">Tidak ada pekerjaan CAPEX yang cocok dengan filter.</div>
            ) : (
              <div className="card-list">
                {filteredProjects.map(proj => (
                  <CapexCard key={proj.id} proj={proj}
                    onEdit={p => { const a = getAng(p._angId); setPage({ type: "editProject", project: p, anggaran: a }); }}
                    onAsset={p => { const a = getAng(p._angId); setPage({ type: "asset", project: p, anggaran: a }); }}
                    onDelete={p => setConfirm({ msg: `Hapus pekerjaan ini beserta datanya?`, onConfirm: () => { deleteProject(p.id, p._angId); setConfirm(null); } })}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* OPEX SECTION */}
        {showOpex && (
          <>
            {showBoth && (
              <div className="section-label" style={{ marginTop: "16px" }}>
                <div className="section-label-line" />
                <div className="section-label-pill opex"><Icon d={I.monitor} size={12} /> OPEX</div>
                <span className="section-count">{filteredOpex.length} pos anggaran</span>
                <div className="section-label-line" />
              </div>
            )}
            {!showBoth && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon d={I.monitor} size={16} style={{ color: "var(--green)" }} /> Pos Anggaran OPEX
                </div>
              </div>
            )}
            {filteredOpex.length === 0 ? (
              <div className="empty">Tidak ada pos anggaran OPEX yang cocok.</div>
            ) : (
              <div className="card-list">
                {filteredOpex.map(ang => (
                  <OpexCard key={ang.id} ang={ang}
                    onSave={saveOpexTrx} onSaveOpex={saveOpexData}
                    showToast={showToast} onDelete={deleteOpex}
                    onOpenRealisasi={(a, ed) => setPage({ type: "realisasi", ang: a, editData: ed })}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}