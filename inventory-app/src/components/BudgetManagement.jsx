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
      nm_pekerjaan: "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
      nilai_rab: 0, nilai_kontrak: 2650000000, no_pr: "", no_po: "8260000074",
      no_kontrak: "SI.01/10/9/2/PPTI/TEKI/PLMT-24", tgl_kontrak: "2024-09-10", durasi_kontrak: 90,
      no_sp3: "", tgl_sp3: "2024-09-06", tgl_bamk: "2024-09-06",
      assets: [
        { id: newId(), asset_code: "SPMT-KPT-DTC-SRV-01", serial_number: "DELL-KPT-SRV-001", name: "Server Rack Kantor Pusat — Rack 1", brand: "Dell", model: "PowerEdge R750", category: "Server", location: "Kantor Pusat", procurement_date: "2024-09-10", acquisition_value: 450000000 },
        { id: newId(), asset_code: "SPMT-KPT-DTC-SRV-02", serial_number: "DELL-KPT-SRV-002", name: "Server Rack Kantor Pusat — Rack 2", brand: "Dell", model: "PowerEdge R750", category: "Server", location: "Kantor Pusat", procurement_date: "2024-09-10", acquisition_value: 450000000 },
      ],
    }],
  },
  {
    id: "CAP-2440014", kode: "2440014", nama: "Penyediaan Network di Branch SPMT",
    pagu: 3200000000, thnAwal: 2024, thnAkhir: 2024, thnAnggaran: 2024, type: "capex",
    projects: [{
      id: "PKJ-2440014-001",
      nm_pekerjaan: "Penyediaan Network di Branch SPMT (Malahayati, Lhokseumawe, Lembar, Parepare dan Garongkong)",
      nilai_rab: 1600000000, nilai_kontrak: 1500000000, no_pr: "", no_po: "6440000025",
      no_kontrak: "SI.01/15/8/5/PPTI/TEKI/PLMT-24", tgl_kontrak: "2024-08-15", durasi_kontrak: 90,
      no_sp3: "", tgl_sp3: "2024-08-02", tgl_bamk: "2024-08-09",
      assets: [
        { id: newId(), asset_code: "SPMT-MLH-DTC-PKR-02", serial_number: "CSC-MLH-CSW-001", name: "Core Switch Malahayati", brand: "Cisco", model: "Catalyst 9300-48P", category: "Network", location: "Malahayati", procurement_date: "2024-08-15", acquisition_value: 320000000 },
      ],
    }],
  },
  {
    id: "CAP-2440015", kode: "2440015", nama: "Implementasi dan Standarisasi IT Infrastruktur",
    pagu: 5800000000, thnAwal: 2024, thnAkhir: 2024, thnAnggaran: 2024, type: "capex",
    projects: [{
      id: "PKJ-2440015-001",
      nm_pekerjaan: "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Planning & Control, CCTV dan SD-WAN Branch) PT Pelindo Multi Terminal",
      nilai_rab: 1250000000, nilai_kontrak: 1200000000, no_pr: "", no_po: "6440000026",
      no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24", tgl_kontrak: "2024-08-12", durasi_kontrak: 90,
      no_sp3: "", tgl_sp3: "2024-08-02", tgl_bamk: "2024-08-06",
      assets: [],
    }],
  },
  {
    id: "CAP-2540011", kode: "2540011", nama: "Transformasi dan Digitalisasi Operasional",
    pagu: 12000000000, thnAwal: 2025, thnAkhir: 2027, thnAnggaran: 2025, type: "capex",
    projects: [{
      id: "PKJ-2540011-001",
      nm_pekerjaan: "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Roro pada Branch PT Pelindo Multi Terminal",
      nilai_rab: 4200000000, nilai_kontrak: 3950000000, no_pr: "8260000711", no_po: "6440000822",
      no_kontrak: "SI.01/7/7/4/PPTI/TEKI/PLMT-25", tgl_kontrak: "2025-07-07", durasi_kontrak: 120,
      no_sp3: "PD.05.01/30/6/3/PGDN/SDMU/PLMT-25", tgl_sp3: "2025-06-30", tgl_bamk: "2025-07-01",
      assets: [],
    }],
  },
  {
    id: "CAP-2540012", kode: "2540012", nama: "Pengembangan Infrastruktur Jaringan",
    pagu: 4500000000, thnAwal: 2025, thnAkhir: 2028, thnAnggaran: 2025, type: "capex",
    projects: [{
      id: "PKJ-2540012-001",
      nm_pekerjaan: "Pemenuhan Kebutuhan Perangkat Network Branch Tanjung Balai Karimun Terminal Selat Panjang PT Pelindo Multi Terminal",
      nilai_rab: 850000000, nilai_kontrak: 810000000, no_pr: "8260000734", no_po: "6430001555",
      no_kontrak: "PD.01/24/7/1/PPTI/TEKI/PLMT-25", tgl_kontrak: "2025-07-24", durasi_kontrak: 60,
      no_sp3: "PD.01/22/7/1/PGDN/DSDM/PLMT-25", tgl_sp3: "2025-07-22", tgl_bamk: "2025-08-01",
      assets: [
        { id: newId(), asset_code: "SPMT-TBK-DTC-PKR-01", serial_number: "CSC-TBK-CSW-001", name: "Core Switch Tanjung Balai Karimun", brand: "Cisco", model: "Catalyst 9300-24P", category: "Network", location: "Tanjung Balai Karimun", procurement_date: "2025-07-24", acquisition_value: 270000000 },
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
// CSS — Simplified, cleaner visual language
// ══════════════════════════════════════════════════════════════════
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");

:root {
  --blue: #2563eb;
  --blue-lt: #eff6ff;
  --blue-mid: #dbeafe;
  --green: #16a34a;
  --green-lt: #f0fdf4;
  --green-mid: #dcfce7;
  --amber: #d97706;
  --amber-lt: #fffbeb;
  --red: #dc2626;
  --red-lt: #fef2f2;
  --ink: #111827;
  --ink2: #374151;
  --ink3: #6b7280;
  --ink4: #9ca3af;
  --border: #e5e7eb;
  --border-lt: #f3f4f6;
  --surf: #ffffff;
  --bg: #f9fafb;
  --mono: "JetBrains Mono", "Courier New", monospace;
  --r: 10px;
  --r-lg: 14px;
  --sh: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
  --sh-md: 0 4px 12px rgba(0,0,0,.08);
  --sh-lg: 0 20px 48px rgba(0,0,0,.14);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
  background: var(--bg);
  color: var(--ink);
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

/* ── ROOT ── */
.root { padding: 2rem 2.5rem; min-height: 100vh; max-width: 1400px; margin: 0 auto; }

/* ── HEADER ── */
.hdr { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.75rem; flex-wrap: wrap; }
.hdr h1 { font-size: 1.35rem; font-weight: 800; letter-spacing: -.5px; color: var(--ink); }
.hdr p { font-size: .78rem; color: var(--ink4); margin-top: 2px; }
.hdr-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

/* year row */
.yr-row { display: flex; background: var(--surf); border: 1px solid var(--border); border-radius: 9px; padding: 3px; gap: 2px; box-shadow: var(--sh); }
.yr-btn { padding: 5px 12px; border-radius: 6px; border: none; cursor: pointer; font-family: inherit; font-size: .75rem; font-weight: 600; background: transparent; color: var(--ink3); transition: all .15s; }
.yr-btn:hover:not(.on) { background: var(--bg); color: var(--ink2); }
.yr-btn.on { background: var(--blue); color: #fff; font-weight: 700; }

/* type tabs */
.type-tabs { display: flex; gap: 2px; background: var(--surf); padding: 3px; border-radius: 9px; border: 1px solid var(--border); box-shadow: var(--sh); }
.type-tab { display: flex; align-items: center; gap: 5px; padding: 5px 14px; border: none; background: transparent; border-radius: 6px; font-family: inherit; font-size: .75rem; font-weight: 600; color: var(--ink3); cursor: pointer; transition: all .15s; }
.type-tab:hover:not(.on) { background: var(--bg); color: var(--ink2); }
.type-tab.on { background: var(--blue); color: #fff; }
.type-tab.on.all { background: var(--ink); }

/* ── KPI ── */
.kpi-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
.kpi { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 1.1rem 1.25rem; display: flex; gap: 12px; align-items: flex-start; box-shadow: var(--sh); }
.kpi-ico { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi.blue .kpi-ico { background: var(--blue-lt); color: var(--blue); }
.kpi.amber .kpi-ico { background: var(--amber-lt); color: var(--amber); }
.kpi.green .kpi-ico { background: var(--green-lt); color: var(--green); }
.kpi-body { flex: 1; min-width: 0; }
.kpi-lbl { font-size: .68rem; color: var(--ink3); font-weight: 500; margin-bottom: 2px; }
.kpi-val { font-size: 1.05rem; font-weight: 800; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.kpi-sub { font-size: .68rem; color: var(--ink4); margin-top: 3px; }
.kpi-bar { height: 3px; background: var(--border-lt); border-radius: 99px; overflow: hidden; margin-top: 6px; }
.kpi-bar-fill { height: 100%; border-radius: 99px; transition: width .6s ease; }

/* ── TOOLBAR ── */
.toolbar { display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem; flex-wrap: wrap; }
.flt-box { display: flex; align-items: center; gap: 6px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 6px 10px; box-shadow: var(--sh); }
.flt-box svg { color: var(--ink4); flex-shrink: 0; }
.flt-select { border: none; background: transparent; font-family: inherit; font-size: .78rem; color: var(--ink); outline: none; cursor: pointer; min-width: 160px; }
.srch { display: flex; align-items: center; gap: 6px; background: var(--surf); border: 1px solid var(--border); border-radius: var(--r); padding: 6px 10px; box-shadow: var(--sh); flex: 1; max-width: 340px; transition: border-color .2s; }
.srch:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.08); }
.srch input { border: none; background: transparent; font-family: inherit; font-size: .78rem; color: var(--ink); outline: none; flex: 1; }
.srch svg { color: var(--ink4); flex-shrink: 0; }

/* ── SECTION LABELS ── */
.section-label { display: flex; align-items: center; gap: 8px; margin: .5rem 0 .9rem; }
.section-label-line { flex: 1; height: 1px; background: var(--border); }
.section-label-pill { display: flex; align-items: center; gap: 5px; padding: 3px 12px; border-radius: 99px; font-size: .7rem; font-weight: 700; white-space: nowrap; }
.section-label-pill.capex { background: var(--blue-lt); color: var(--blue); border: 1px solid var(--blue-mid); }
.section-label-pill.opex { background: var(--green-lt); color: var(--green); border: 1px solid var(--green-mid); }
.section-count { font-size: .68rem; color: var(--ink4); white-space: nowrap; }

/* ── CARD LIST ── */
.card-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 1.25rem; }
.empty { background: var(--surf); border: 1.5px dashed var(--border); border-radius: var(--r-lg); text-align: center; padding: 3rem; color: var(--ink4); font-size: .83rem; }

/* ── JOB CARD ── */
.jcard { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--sh); transition: box-shadow .15s; }
.jcard:hover { box-shadow: var(--sh-md); }
.jcard.open-cap { border-color: #bfdbfe; }
.jcard.open-opx { border-color: #bbf7d0; }

/* left accent bar */
.jcard-inner { display: flex; }
.jcard-accent { width: 3px; flex-shrink: 0; }
.jcard-accent.cap { background: var(--blue); }
.jcard-accent.opx { background: var(--green); }
.jcard-content { flex: 1; min-width: 0; }

/* top row */
.jcard-top { display: flex; align-items: center; gap: 1rem; padding: .85rem 1.1rem; cursor: pointer; transition: background .12s; }
.jcard-top:hover { background: var(--bg); }
.jcard.open-cap .jcard-top { background: #f8faff; }
.jcard.open-opx .jcard-top { background: #f7fef9; }

/* main */
.jcard-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.jcard-tags { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
.jcard-name { font-size: .84rem; font-weight: 600; color: var(--ink); line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.jcard.open-cap .jcard-name { color: #1e40af; }
.jcard.open-opx .jcard-name { color: #14532d; }
.jcard-meta { display: flex; flex-wrap: wrap; gap: 10px; font-size: .69rem; color: var(--ink4); align-items: center; }
.jcard-meta span { display: flex; align-items: center; gap: 3px; }

/* right */
.jcard-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
.amounts { display: flex; gap: 16px; }
.amt-blk { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; }
.amt-lbl { font-size: .6rem; color: var(--ink4); font-weight: 500; }
.amt-val { font-size: .88rem; font-weight: 700; }
.amt-val.red { color: var(--red); }
.amt-val.blue { color: var(--blue); }
.amt-val.amber { color: var(--amber); }
.amt-val.green { color: var(--green); }

/* compact ring */
.ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 3px; }
.ring { position: relative; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; }
.ring svg { position: absolute; top: 0; left: 0; transform: rotate(-90deg); }
.ring-lbl { font-size: .65rem; font-weight: 800; color: var(--ink); z-index: 1; }
.status-pill { font-size: .57rem; font-weight: 700; padding: 2px 6px; border-radius: 99px; white-space: nowrap; border: 1px solid transparent; }

/* action buttons — more minimal */
.jcard-actions { display: flex; align-items: center; gap: 3px; }
.abtn { display: inline-flex; align-items: center; gap: 3px; padding: 5px 9px; border-radius: 7px; border: 1px solid var(--border); font-family: inherit; font-size: .7rem; font-weight: 600; cursor: pointer; transition: all .12s; background: var(--surf); color: var(--ink3); white-space: nowrap; }
.abtn:hover { background: var(--bg); border-color: #d1d5db; }
.abtn.blue { background: var(--blue-lt); border-color: var(--blue-mid); color: var(--blue); }
.abtn.blue:hover { background: var(--blue-mid); }
.abtn.green { background: var(--green-lt); border-color: var(--green-mid); color: var(--green); }
.abtn.green:hover { background: var(--green-mid); }
.abtn.del:hover { background: var(--red-lt); border-color: #fecaca; color: var(--red); }
.chev { color: var(--ink4); display: flex; align-items: center; margin-left: 2px; }

/* ── DETAIL PANEL ── */
.jcard-detail { padding: 1rem 1.1rem; border-top: 1px solid var(--border-lt); animation: slideDown .18s ease-out; }
.jcard.open-cap .jcard-detail { background: #fafcff; }
.jcard.open-opx .jcard-detail { background: #fafffe; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
.detail-title { font-size: .65rem; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: var(--ink4); margin-bottom: 7px; display: flex; align-items: center; justify-content: space-between; }
.detail-rows { display: flex; flex-direction: column; gap: 4px; }
.detail-row { display: flex; align-items: center; justify-content: space-between; padding: 6px 9px; background: var(--surf); border-radius: 7px; border: 1px solid var(--border); }
.detail-row .lbl { font-size: .7rem; color: var(--ink3); }
.detail-row code { font-family: var(--mono); font-size: .67rem; color: var(--blue); background: var(--blue-lt); padding: 1px 6px; border-radius: 4px; }
.detail-row strong { font-size: .75rem; font-weight: 600; color: var(--ink); }
.detail-empty { font-size: .72rem; color: var(--ink4); padding: 12px; text-align: center; background: var(--surf); border-radius: 7px; border: 1px dashed var(--border); }
.inline-link { font-size: .67rem; font-weight: 600; color: var(--blue); background: none; border: none; cursor: pointer; padding: 0; }
.inline-link:hover { text-decoration: underline; }

/* inline asset list */
.ai-list { display: flex; flex-direction: column; gap: 4px; }
.ai-item { display: flex; align-items: center; justify-content: space-between; padding: 7px 9px; background: var(--surf); border: 1px solid #dbeafe; border-radius: 8px; }
.ai-code { font-family: var(--mono); font-size: .61rem; font-weight: 600; background: var(--blue-lt); color: var(--blue); padding: 1px 6px; border-radius: 4px; white-space: nowrap; }
.ai-name { font-size: .76rem; font-weight: 600; color: var(--ink); }
.ai-loc { font-size: .65rem; color: var(--ink4); display: flex; align-items: center; gap: 2px; }
.ai-val { font-size: .78rem; font-weight: 700; color: var(--blue); white-space: nowrap; }
.ai-total { display: flex; justify-content: space-between; align-items: center; padding: 6px 9px; background: var(--blue-lt); border-radius: 7px; border: 1px solid var(--blue-mid); margin-top: 2px; }
.ai-total span { font-size: .68rem; color: var(--blue); font-weight: 500; }
.ai-total strong { font-size: .82rem; font-weight: 800; color: var(--blue); }

/* realisasi list */
.ri-list { display: flex; flex-direction: column; gap: 4px; }
.ri-item { display: flex; align-items: center; justify-content: space-between; padding: 7px 9px; background: var(--surf); border: 1px solid var(--border); border-radius: 8px; }
.ri-id { font-family: var(--mono); font-size: .61rem; font-weight: 600; background: var(--amber-lt); color: var(--amber); padding: 1px 6px; border-radius: 4px; white-space: nowrap; }
.ri-ket { font-size: .76rem; font-weight: 600; color: var(--ink); }
.ri-date { font-size: .65rem; color: var(--ink4); }
.ri-val { font-size: .78rem; font-weight: 700; color: var(--amber); white-space: nowrap; }
.ri-actions { display: flex; gap: 3px; margin-left: 8px; }
.ri-total { display: flex; justify-content: space-between; align-items: center; padding: 6px 9px; background: var(--amber-lt); border-radius: 7px; border: 1px solid #fde68a; margin-top: 2px; }
.ri-total span { font-size: .68rem; color: var(--amber); font-weight: 500; }
.ri-total strong { font-size: .82rem; font-weight: 800; color: var(--amber); }

/* ── BADGES ── */
.badge { display: inline-flex; align-items: center; padding: 2px 7px; border-radius: 5px; font-size: .61rem; font-weight: 700; letter-spacing: .1px; }
.badge.capex { background: var(--blue-lt); color: var(--blue); }
.badge.opex { background: var(--green-lt); color: var(--green); }
.yr-tag { font-size: .66rem; font-weight: 600; padding: 2px 7px; border-radius: 5px; background: var(--border-lt); color: var(--ink3); border: 1px solid var(--border); }
.code-tag { font-family: var(--mono); font-size: .63rem; color: var(--ink3); background: var(--border-lt); padding: 2px 7px; border-radius: 5px; border: 1px solid var(--border); }
.ang-tag { font-size: .66rem; color: var(--ink3); padding: 2px 7px; background: var(--border-lt); border-radius: 5px; }
.cat-badge { display: inline-flex; align-items: center; gap: 3px; padding: 2px 6px; border-radius: 4px; font-size: .61rem; font-weight: 700; }
.cat-server { background: #fce7f3; color: #9d174d; }
.cat-network { background: #e0f2fe; color: #0369a1; }
.cat-security { background: #fef9c3; color: #713f12; }
.cat-default { background: var(--border-lt); color: var(--ink3); }

/* ── MODAL ── */
.overlay { position: fixed; inset: 0; background: rgba(10,22,40,.48); display: flex; align-items: center; justify-content: center; z-index: 900; backdrop-filter: blur(4px); padding: 20px; animation: fadeOvl .18s ease; }
.mbox { background: var(--surf); border-radius: 16px; width: 100%; max-width: 580px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--sh-lg); animation: modalUp .22s cubic-bezier(.16,1,.3,1); }
.mbox.wide { max-width: 650px; }
.mhd { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
.mhd-left { display: flex; align-items: center; gap: 10px; }
.m-ico { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; }
.m-ico.blue { background: var(--blue-lt); color: var(--blue); }
.m-ico.green { background: var(--green-lt); color: var(--green); }
.m-ico.amber { background: var(--amber-lt); color: var(--amber); }
.mhd h3 { font-size: .9rem; font-weight: 700; color: var(--ink); }
.mhd p { font-size: .68rem; color: var(--ink4); margin-top: 1px; }
.m-close { width: 28px; height: 28px; border-radius: 7px; border: 1px solid var(--border); background: var(--surf); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--ink4); transition: all .15s; }
.m-close:hover { background: var(--red-lt); border-color: #fecaca; color: var(--red); }
.mbody { padding: 16px 18px; display: flex; flex-direction: column; gap: 11px; overflow-y: auto; flex: 1; }
.mfoot { display: flex; align-items: center; justify-content: flex-end; gap: 7px; padding: 11px 18px; border-top: 1px solid var(--border); flex-shrink: 0; background: var(--bg); }
.minfo-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 9px; padding: 10px 12px; }
.minfo-item { display: flex; flex-direction: column; gap: 2px; }
.minfo-item span { font-size: .58rem; font-weight: 600; text-transform: uppercase; letter-spacing: .4px; color: var(--ink4); }
.minfo-item strong { font-size: .86rem; font-weight: 700; color: var(--ink); }
.minfo-item strong.red { color: var(--red); }
.minfo-item strong.green { color: var(--green); }
.asset-ref { padding: 8px 11px; background: var(--blue-lt); border-radius: 8px; border: 1px solid var(--blue-mid); display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.ma-list { display: flex; flex-direction: column; gap: 7px; }
.ma-item { padding: 10px 12px; background: var(--surf); border: 1px solid #dbeafe; border-radius: 10px; }
.ma-item-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
.ma-item-left { display: flex; align-items: center; gap: 6px; }
.ma-id { font-family: var(--mono); font-size: .63rem; font-weight: 700; background: var(--blue-lt); color: var(--blue); padding: 1px 6px; border-radius: 4px; }
.ma-val { font-size: .88rem; font-weight: 700; color: var(--blue); }
.ma-name { font-size: .82rem; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
.ma-meta { display: flex; flex-wrap: wrap; gap: 9px; font-size: .68rem; color: var(--ink4); }
.ma-meta span { display: flex; align-items: center; gap: 3px; }
.ma-total { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--blue-lt); border-radius: 8px; border: 1px solid var(--blue-mid); }
.ma-total span { font-size: .7rem; color: var(--blue); font-weight: 500; }
.ma-total strong { font-size: .9rem; font-weight: 800; color: var(--blue); }
.ma-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 1.75rem; color: var(--ink4); font-size: .8rem; background: var(--bg); border-radius: 9px; border: 1px dashed var(--border); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.form-grp { display: flex; flex-direction: column; gap: 4px; }
.form-grp label { font-size: .63rem; font-weight: 700; text-transform: uppercase; letter-spacing: .4px; color: var(--ink2); }
.form-grp input, .form-grp textarea, .form-grp select { padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; font-family: inherit; font-size: .8rem; color: var(--ink); outline: none; transition: all .18s; background: var(--surf); }
.form-grp input:focus, .form-grp textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.08); }
.form-grp textarea { resize: vertical; min-height: 56px; }

/* buttons */
.btn { display: inline-flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 8px; font-family: inherit; font-size: .76rem; font-weight: 600; cursor: pointer; border: none; transition: all .15s; white-space: nowrap; }
.btn-outline { background: var(--surf); border: 1px solid var(--border); color: var(--ink2); }
.btn-outline:hover { background: var(--bg); }
.btn-prim { background: var(--blue); color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.22); }
.btn-prim:hover { background: #1d4ed8; }
.btn-green { background: var(--green); color: #fff; box-shadow: 0 2px 8px rgba(22,163,74,.2); }
.btn-green:hover { background: #15803d; }

/* confirm */
.cbox { background: var(--surf); border-radius: 14px; padding: 24px 20px; max-width: 320px; width: 100%; box-shadow: var(--sh-lg); display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; animation: modalUp .2s cubic-bezier(.16,1,.3,1); }
.c-ico { width: 44px; height: 44px; background: #fff7ed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #f97316; }
.c-msg { font-size: .85rem; color: var(--ink); line-height: 1.5; }
.c-btns { display: flex; gap: 8px; }

/* toast */
.toast { position: fixed; bottom: 20px; right: 20px; background: var(--green); color: #fff; padding: 10px 16px; border-radius: 10px; font-size: .78rem; font-weight: 600; box-shadow: var(--sh-lg); display: flex; align-items: center; gap: 6px; z-index: 9999; animation: toastIn .26s cubic-bezier(.16,1,.3,1); }

/* ── EDIT PAGES ── */
.subpage { animation: fadeUp .2s ease-out; }
.subpage-hdr { display: flex; align-items: center; gap: 10px; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
.subpage-hdr h2 { font-size: 1.1rem; font-weight: 800; flex: 1; }
.subpage-hdr p { font-size: .73rem; color: var(--ink4); margin-top: 2px; }
.ctx-card { background: var(--blue-lt); border: 1px solid var(--blue-mid); border-radius: var(--r-lg); padding: .85rem 1.1rem; margin-bottom: 1.25rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px,1fr)); gap: .75rem; }
.ctx-item { display: flex; flex-direction: column; gap: 2px; }
.ctx-item span { font-size: .57rem; font-weight: 700; text-transform: uppercase; letter-spacing: .4px; color: #3b82f6; }
.ctx-item strong { font-size: .79rem; font-weight: 600; color: var(--ink); }
.sec-card { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--sh); overflow: hidden; margin-bottom: .85rem; }
.sec-card-hdr { display: flex; align-items: center; gap: 8px; padding: .7rem 1.1rem; background: var(--bg); border-bottom: 1px solid var(--border); }
.sec-card-ico { width: 26px; height: 26px; border-radius: 7px; background: var(--blue-lt); color: var(--blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sec-card-hdr h3 { font-size: .76rem; font-weight: 700; color: var(--ink); }
.sec-card-hdr p { font-size: .67rem; color: var(--ink4); margin-top: 1px; }
.sec-card-body { padding: 1rem 1.1rem; }
.edit-grid { display: grid; gap: .65rem; }
.g3 { grid-template-columns: repeat(3,1fr); }
.g2 { grid-template-columns: repeat(2,1fr); }
.g1 { grid-template-columns: 1fr; }
.full { grid-column: 1/-1; }
.edit-fld { display: flex; flex-direction: column; gap: 4px; }
.edit-fld label { font-size: .61rem; font-weight: 700; text-transform: uppercase; letter-spacing: .4px; color: var(--ink2); }
.edit-fld input, .edit-fld textarea, .edit-fld select { padding: 7px 9px; border: 1px solid var(--border); border-radius: 7px; font-family: inherit; font-size: .79rem; color: var(--ink); outline: none; transition: all .18s; background: var(--surf); }
.edit-fld input:focus, .edit-fld textarea:focus, .edit-fld select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.08); }
.edit-fld textarea { resize: vertical; min-height: 50px; }
.edit-hint { font-size: .65rem; color: var(--green); font-weight: 600; margin-top: 1px; }
.edit-footer { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); padding: .8rem 1.1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; box-shadow: var(--sh); }
.edit-footer-info span { font-size: .58rem; font-weight: 600; text-transform: uppercase; letter-spacing: .4px; color: var(--ink4); display: block; margin-bottom: 2px; }
.edit-footer-info strong { font-size: .78rem; font-weight: 600; color: var(--ink); max-width: 380px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; }
.af-banner { display: flex; align-items: center; gap: 5px; background: var(--green-lt); border: 1px solid var(--green-mid); border-radius: 7px; padding: 6px 10px; font-size: .7rem; color: var(--green); font-weight: 600; margin-bottom: 8px; }
.af-field { background: #f0fdf4 !important; border-color: #86efac !important; }
.ae-tip { background: var(--blue-lt); border: 1px solid var(--blue-mid); border-radius: 7px; padding: 7px 11px; margin-bottom: .8rem; font-size: .72rem; color: var(--blue); display: flex; align-items: center; gap: 6px; }
.acard { background: var(--surf); border: 1px solid var(--border); border-radius: var(--r-lg); overflow: hidden; margin-bottom: 8px; }
.acard-hdr { display: flex; align-items: center; gap: 6px; padding: 6px 11px; background: var(--bg); border-bottom: 1px solid var(--border); }
.acard-body { padding: .85rem 1rem; }

/* OPEX inline edit */
.opex-edit { border-top: 2px solid var(--green); background: var(--green-lt); animation: slideDown .18s ease-out; }
.opex-edit-inner { padding: 1.1rem 1.25rem; border-left: 3px solid var(--green); }
.opex-edit-hdr { display: flex; align-items: center; gap: 8px; margin-bottom: 1rem; padding-bottom: .7rem; border-bottom: 1px solid var(--green-mid); }
.opex-edit-hdr h3 { font-size: .82rem; font-weight: 700; flex: 1; color: var(--green); }
.opex-edit-actions { display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: .85rem; padding-top: .7rem; border-top: 1px solid var(--green-mid); }

/* ── ANIMATIONS ── */
@keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeOvl { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalUp { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

@media(max-width:900px) {
  .root { padding: 1rem; }
  .hdr { flex-direction: column; }
  .kpi-strip { grid-template-columns: 1fr; }
  .jcard-top { flex-direction: column; align-items: flex-start; }
  .jcard-right { flex-wrap: wrap; }
  .amounts { flex-wrap: wrap; }
  .detail-grid { grid-template-columns: 1fr; }
  .g3 { grid-template-columns: 1fr; }
  .g2 { grid-template-columns: 1fr; }
  .ctx-card { grid-template-columns: 1fr 1fr; }
  .minfo-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
}
`;

// ══════════════════════════════════════════════════════════════════
// SMALL SHARED COMPONENTS
// ══════════════════════════════════════════════════════════════════
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, []);
  return <div className="toast"><Icon d={I.check} size={13} />{msg}</div>;
}

function Confirm({ msg, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="cbox" onClick={e => e.stopPropagation()}>
        <div className="c-ico"><Icon d={I.warning} size={20} /></div>
        <p className="c-msg">{msg}</p>
        <div className="c-btns">
          <button className="btn btn-outline" onClick={onCancel}>Batal</button>
          <button className="btn" style={{ background: "var(--red)", color: "#fff" }} onClick={onConfirm}><Icon d={I.trash} size={12} /> Hapus</button>
        </div>
      </div>
    </div>
  );
}

function CatBadge({ cat }) {
  const cls = cat === "Server" ? "cat-server" : cat === "Network" ? "cat-network" : cat === "Security" ? "cat-security" : "cat-default";
  return <span className={`cat-badge ${cls}`}>{cat || "—"}</span>;
}

function PctRing({ pct }) {
  const meta = pctMeta(pct);
  const r = 19, circ = 2 * Math.PI * r;
  const filled = Math.min(pct, 100) / 100 * circ;
  return (
    <div className="ring-wrap">
      <div className="ring">
        <svg width="46" height="46" viewBox="0 0 46 46">
          <circle cx="23" cy="23" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle cx="23" cy="23" r={r} fill="none" stroke={pctColor(pct)} strokeWidth="4"
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
            <div className="m-ico blue"><Icon d={I.package} size={16} /></div>
            <div>
              <h3>Daftar Aset Tercatat</h3>
              <p>{assets.length} aset · {proj.nm_pekerjaan?.substring(0, 52)}…</p>
            </div>
          </div>
          <button className="m-close" onClick={onClose}><Icon d={I.x} size={13} /></button>
        </div>
        <div className="mbody">
          <div className="asset-ref">
            <code style={{ fontFamily: "var(--mono)", fontSize: ".66rem", fontWeight: 700, background: "#fff", color: "var(--blue)", padding: "2px 7px", borderRadius: 5, border: "1px solid var(--blue-mid)" }}>{proj.no_kontrak || "—"}</code>
            <span style={{ fontSize: ".73rem", color: "#1e40af", flex: 1 }}>{proj.nm_pekerjaan?.substring(0, 68)}…</span>
          </div>
          {assets.length === 0 ? (
            <div className="ma-empty">
              <Icon d={I.package} size={26} style={{ opacity: .3 }} />
              <span>Belum ada aset tercatat untuk pekerjaan ini.</span>
            </div>
          ) : (
            <div className="ma-list">
              {assets.map((a, i) => (
                <div key={a.id} className="ma-item">
                  <div className="ma-item-top">
                    <div className="ma-item-left">
                      <span className="ma-id">{a.asset_code || "—"}</span>
                      <CatBadge cat={a.category} />
                    </div>
                    <span className="ma-val">{fmt(a.acquisition_value)}</span>
                  </div>
                  <p className="ma-name">{a.name || "—"}</p>
                  <div className="ma-meta">
                    <span><Icon d={I.tag} size={10} />{a.brand} {a.model}</span>
                    <span><Icon d={I.mapPin} size={10} />{a.location}</span>
                    <span><Icon d={I.calendar} size={10} />{fmtDate(a.procurement_date)}</span>
                    {a.serial_number && <span><Icon d={I.hash} size={10} />S/N: {a.serial_number}</span>}
                  </div>
                </div>
              ))}
              <div className="ma-total">
                <span>Total Nilai Aset</span>
                <strong>{fmt(total)}</strong>
              </div>
            </div>
          )}
        </div>
        <div className="mfoot">
          <button className="btn btn-outline" onClick={onClose}>Tutup</button>
          <button className="btn btn-prim" onClick={() => { onClose(); onEntry(); }}>
            <Icon d={I.plus} size={12} /> Entry Aset Baru
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// CAPEX CARD
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
              <div className="jcard-main">
                <div className="jcard-tags">
                  <span className="badge capex">CAPEX</span>
                  <span className="yr-tag">{proj._thn}</span>
                  <span className="ang-tag">{proj._angNama?.substring(0, 32)}{proj._angNama?.length > 32 ? "…" : ""}</span>
                  <code className="code-tag">{proj._angKode}</code>
                </div>
                <p className="jcard-name">{proj.nm_pekerjaan}</p>
                <div className="jcard-meta">
                  <span><Icon d={I.calendar} size={10} />{fmtDate(proj.tgl_kontrak)}</span>
                  {proj.durasi_kontrak > 0 && <span>· <Icon d={I.clock} size={10} />{proj.durasi_kontrak} hari</span>}
                  {proj.tgl_bamk && <span>· BAMK: {fmtDate(proj.tgl_bamk)}</span>}
                </div>
              </div>
              <div className="jcard-right">
                <div className="amounts">
                  <div className="amt-blk">
                    <span className="amt-lbl">Nilai Kontrak</span>
                    <span className="amt-val red">{fmt(proj.nilai_kontrak)}</span>
                  </div>
                  <div className="amt-blk">
                    <span className="amt-lbl">Nilai Aset</span>
                    <span className="amt-val blue">{fmt(assetTotal)}</span>
                  </div>
                </div>
                <PctRing pct={pct} />
                <div className="jcard-actions" onClick={e => e.stopPropagation()}>
                  <button className="abtn" onClick={() => onEdit(proj)}><Icon d={I.edit} size={11} /> Edit</button>
                  <button className="abtn blue" onClick={() => setAssetModal(true)}>
                    <Icon d={I.package} size={11} />{assets.length > 0 ? `${assets.length} Aset` : "Entry Aset"}
                  </button>
                  <button className="abtn del" onClick={() => onDelete(proj)}><Icon d={I.trash} size={11} /></button>
                </div>
                <div className="chev"><Icon d={open ? I.chevUp : I.chevDown} size={13} /></div>
              </div>
            </div>

            {open && (
              <div className="jcard-detail">
                <div className="detail-grid">
                  <div>
                    <div className="detail-title">Informasi Kontrak</div>
                    <div className="detail-rows">
                      {proj.no_kontrak && <div className="detail-row"><span className="lbl">No. Kontrak</span><code>{proj.no_kontrak}</code></div>}
                      {proj.no_po && <div className="detail-row"><span className="lbl">No. PO</span><code>{proj.no_po}</code></div>}
                      {proj.no_pr && <div className="detail-row"><span className="lbl">No. PR</span><code>{proj.no_pr}</code></div>}
                      {proj.tgl_kontrak && <div className="detail-row"><span className="lbl">Tgl. Kontrak</span><strong>{fmtDate(proj.tgl_kontrak)}</strong></div>}
                      {proj.durasi_kontrak > 0 && <div className="detail-row"><span className="lbl">Durasi</span><strong>{proj.durasi_kontrak} hari</strong></div>}
                      {proj.tgl_sp3 && <div className="detail-row"><span className="lbl">Tgl. SP3</span><strong>{fmtDate(proj.tgl_sp3)}</strong></div>}
                      {proj.tgl_bamk && <div className="detail-row"><span className="lbl">BAMK</span><strong>{fmtDate(proj.tgl_bamk)}</strong></div>}
                      {proj.nilai_rab > 0 && <div className="detail-row"><span className="lbl">Nilai RAB</span><strong>{fmt(proj.nilai_rab)}</strong></div>}
                    </div>
                  </div>
                  <div>
                    <div className="detail-title">
                      Aset Tercatat
                      <button className="inline-link" onClick={() => setAssetModal(true)}>Lihat & Entry →</button>
                    </div>
                    {assets.length === 0 ? (
                      <div className="detail-empty">Belum ada aset. Klik "Entry Aset" untuk mulai.</div>
                    ) : (
                      <div className="ai-list">
                        {assets.slice(0, 3).map(a => (
                          <div key={a.id} className="ai-item">
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <code className="ai-code">{a.asset_code}</code>
                              <div>
                                <p className="ai-name">{a.name}</p>
                                <p className="ai-loc"><Icon d={I.mapPin} size={9} />{a.location}</p>
                              </div>
                            </div>
                            <span className="ai-val">{fmt(a.acquisition_value)}</span>
                          </div>
                        ))}
                        {assets.length > 3 && (
                          <button className="inline-link" style={{ padding: "5px 0", fontSize: ".7rem" }} onClick={() => setAssetModal(true)}>
                            + {assets.length - 3} aset lainnya →
                          </button>
                        )}
                        <div className="ai-total">
                          <span>Total Nilai Aset</span>
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
// OPEX CARD
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
            <div className="jcard-main">
              <div className="jcard-tags">
                <span className="badge opex">OPEX</span>
                <code className="code-tag">{ang.kd_anggaran_master}</code>
                <span className="yr-tag">Tahun {ang.thn_anggaran}</span>
                {masterInfo && <span className="ang-tag">{masterInfo.tipe_anggaran_master}</span>}
              </div>
              <p className="jcard-name" style={{ color: open ? "#14532d" : "var(--ink)" }}>{ang.nama}</p>
              <div className="jcard-meta">
                <span><Icon d={I.database} size={10} />{masterInfo?.nm_anggaran_master || ang.nama}</span>
              </div>
            </div>
            <div className="jcard-right">
              <div className="amounts">
                <div className="amt-blk">
                  <span className="amt-lbl">Anggaran</span>
                  <span className="amt-val blue">{fmt(pagu)}</span>
                </div>
                <div className="amt-blk">
                  <span className="amt-lbl">Realisasi</span>
                  <span className="amt-val amber">{fmt(totalReal)}</span>
                </div>
                <div className="amt-blk">
                  <span className="amt-lbl">Sisa</span>
                  <span className="amt-val" style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>{fmt(Math.abs(sisa))}</span>
                </div>
              </div>
              <PctRing pct={pct} />
              <div className="jcard-actions" onClick={e => e.stopPropagation()}>
                <button className={`abtn ${showEdit ? "del" : ""}`} onClick={() => { setShowEdit(v => !v); if (!showEdit) setOpen(true); }}>
                  <Icon d={showEdit ? I.x : I.edit} size={11} />{showEdit ? "Tutup" : "Edit"}
                </button>
                <button className="abtn green" onClick={e => { e.stopPropagation(); onOpenRealisasi(ang, null); }}>
                  <Icon d={I.plus} size={11} /> Realisasi
                </button>
                <button className="abtn del" onClick={e => { e.stopPropagation(); onDelete && onDelete(ang.id); }}>
                  <Icon d={I.trash} size={11} />
                </button>
              </div>
              <div className="chev"><Icon d={open ? I.chevUp : I.chevDown} size={13} /></div>
            </div>
          </div>

          {showEdit && (
            <EditOpexInline ang={ang}
              onSave={u => { onSaveOpex(ang.id, u); showToast("Pos anggaran diperbarui"); setShowEdit(false); }}
              onCancel={() => setShowEdit(false)} />
          )}

          {open && (
            <div className="jcard-detail">
              <div className="detail-grid">
                <div>
                  <div className="detail-title">Ringkasan Anggaran</div>
                  <div className="detail-rows">
                    <div className="detail-row"><span className="lbl">Kode Anggaran Master</span><code>{ang.kd_anggaran_master}</code></div>
                    <div className="detail-row"><span className="lbl">Tahun Anggaran</span><strong>{ang.thn_anggaran}</strong></div>
                    <div className="detail-row"><span className="lbl">Nilai Anggaran Tahunan</span><strong style={{ color: "var(--blue)" }}>{fmt(pagu)}</strong></div>
                    <div className="detail-row"><span className="lbl">Total Realisasi</span><strong style={{ color: "var(--amber)" }}>{fmt(totalReal)}</strong></div>
                    <div className="detail-row">
                      <span className="lbl">Sisa Anggaran</span>
                      <strong style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>{fmt(Math.abs(sisa))} {sisa < 0 ? "(melebihi)" : ""}</strong>
                    </div>
                    <div className="detail-row"><span className="lbl">Serapan</span><strong>{pct}%</strong></div>
                  </div>
                </div>
                <div>
                  <div className="detail-title">
                    Riwayat Realisasi
                    <button className="inline-link" onClick={e => { e.stopPropagation(); onOpenRealisasi(ang, null); }}>+ Entry Baru</button>
                  </div>
                  {(!ang.transaksi || ang.transaksi.length === 0) ? (
                    <div className="detail-empty">Belum ada realisasi.</div>
                  ) : (
                    <div className="ri-list">
                      {ang.transaksi.map(t => (
                        <div key={t.id} className="ri-item">
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <span className="ri-id">{t.no_invoice || "—"}</span>
                            <div>
                              <p className="ri-ket">{t.keterangan}</p>
                              <p className="ri-date">{fmtDate(t.tanggal)}</p>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                            <span className="ri-val">{fmt(t.jumlah)}</span>
                            <div className="ri-actions">
                              <button className="abtn" style={{ padding: "3px 5px" }} onClick={e => { e.stopPropagation(); onOpenRealisasi(ang, t); }}><Icon d={I.edit} size={10} /></button>
                              <button className="abtn del" style={{ padding: "3px 5px" }} onClick={e => { e.stopPropagation(); deleteRow(t.id); }}><Icon d={I.trash} size={10} /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="ri-total">
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
    <div className="opex-edit">
      <div className="opex-edit-inner">
        <div className="opex-edit-hdr">
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "var(--green-lt)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={I.edit} size={12} /></div>
          <h3>Edit Pos Anggaran OPEX</h3>
          <button className="btn btn-outline" style={{ padding: "4px 9px", fontSize: ".68rem" }} onClick={onCancel}><Icon d={I.x} size={10} /> Batal</button>
        </div>
        <div className="edit-grid g2" style={{ marginBottom: ".7rem" }}>
          <div className="edit-fld">
            <label>Kode Anggaran Master</label>
            <select value={form.kd_anggaran_master} onChange={e => handleMaster(e.target.value)} style={{ padding: "7px 9px", border: "1px solid var(--border)", borderRadius: 7, fontFamily: "inherit", fontSize: ".78rem", outline: "none", background: "var(--surf)" }}>
              <option value="">— Pilih —</option>
              {BUDGET_MASTERS.map(m => <option key={m.kd_anggaran_master} value={m.kd_anggaran_master}>{m.kd_anggaran_master} — {m.nm_anggaran_master}</option>)}
            </select>
          </div>
          <div className="edit-fld"><label>Nama Pos Anggaran</label><input value={form.nama} onChange={e => up("nama", e.target.value)} /></div>
        </div>
        <div className="edit-grid g2">
          <div className="edit-fld"><label>Tahun Anggaran</label><input type="number" value={form.thn_anggaran} onChange={e => up("thn_anggaran", e.target.value)} /></div>
          <div className="edit-fld">
            <label>Nilai Anggaran Tahunan (IDR)</label>
            <input type="number" value={form.nilai_anggaran_tahunan || ""} onChange={e => up("nilai_anggaran_tahunan", e.target.value)} />
            {form.nilai_anggaran_tahunan > 0 && <span className="edit-hint">≈ {fmt(form.nilai_anggaran_tahunan)}</span>}
          </div>
        </div>
        <div className="opex-edit-actions">
          <button className="btn btn-outline" style={{ fontSize: ".7rem", padding: "5px 11px" }} onClick={onCancel}>Batal</button>
          <button className="btn btn-green" style={{ fontSize: ".7rem", padding: "5px 13px" }} onClick={() => onSave({ kd_anggaran_master: form.kd_anggaran_master, nama: form.nama, thn_anggaran: parseInt(form.thn_anggaran) || new Date().getFullYear(), nilai_anggaran_tahunan: parseFloat(form.nilai_anggaran_tahunan) || 0 })}>
            <Icon d={I.save} size={11} /> Simpan
          </button>
        </div>
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
        <button className="btn btn-outline" style={{ padding: "6px 12px" }} onClick={onBack}><Icon d={I.arrowLeft} size={12} /> Kembali</button>
        <div style={{ flex: 1 }}>
          <h2>Edit Pekerjaan CAPEX</h2>
          <p>{anggaran?.nama} · <code style={{ fontFamily: "var(--mono)", fontSize: ".63rem" }}>{anggaran?.kode}</code></p>
        </div>
      </div>
      <div className="ctx-card">
        <div className="ctx-item"><span>Anggaran</span><strong>{anggaran?.nama || "—"}</strong></div>
        <div className="ctx-item"><span>Kode</span><strong><code style={{ fontFamily: "var(--mono)", fontSize: ".76rem" }}>{anggaran?.kode}</code></strong></div>
        <div className="ctx-item"><span>Tahun</span><strong>{anggaran?.thnAnggaran}</strong></div>
        <div className="ctx-item"><span>Pagu</span><strong style={{ color: "var(--blue)" }}>{anggaran?.pagu > 0 ? fmt(anggaran.pagu) : "—"}</strong></div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <div className="sec-card-ico"><Icon d={I.fileText} size={12} /></div>
          <div><h3>Informasi Pekerjaan</h3><p>Nama, nilai RAB, nilai kontrak, dan durasi</p></div>
        </div>
        <div className="sec-card-body">
          <div className="edit-grid g1" style={{ marginBottom: ".65rem" }}>
            <div className="edit-fld full"><label>Nama Pekerjaan *</label><textarea rows="3" value={form.nm_pekerjaan || ""} onChange={e => up("nm_pekerjaan", e.target.value)} /></div>
          </div>
          <div className="edit-grid g3">
            <div className="edit-fld"><label>Nilai RAB (IDR)</label><input type="number" value={form.nilai_rab || ""} onChange={e => up("nilai_rab", e.target.value)} />{form.nilai_rab > 0 && <span className="edit-hint">≈ {fmt(form.nilai_rab)}</span>}</div>
            <div className="edit-fld"><label>Nilai Kontrak (IDR)</label><input type="number" value={form.nilai_kontrak || ""} onChange={e => up("nilai_kontrak", e.target.value)} />{form.nilai_kontrak > 0 && <span className="edit-hint">≈ {fmt(form.nilai_kontrak)}</span>}</div>
            <div className="edit-fld"><label>Durasi Kontrak (Hari)</label><input type="number" value={form.durasi_kontrak || ""} onChange={e => up("durasi_kontrak", e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <div className="sec-card-ico"><Icon d={I.database} size={12} /></div>
          <div><h3>Referensi Dokumen</h3><p>No. PR, PO, Kontrak, SP3, BAMK</p></div>
        </div>
        <div className="sec-card-body">
          <div className="edit-grid g3" style={{ marginBottom: ".65rem" }}>
            <div className="edit-fld"><label>No. PR</label><input value={form.no_pr || ""} onChange={e => up("no_pr", e.target.value)} placeholder="8260000..." /></div>
            <div className="edit-fld"><label>No. PO</label><input value={form.no_po || ""} onChange={e => up("no_po", e.target.value)} placeholder="6440000..." /></div>
            <div className="edit-fld"><label>No. Kontrak</label><input value={form.no_kontrak || ""} onChange={e => up("no_kontrak", e.target.value)} placeholder="SI.01/..." /></div>
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
          <span>Pekerjaan yang diedit</span>
          <strong>{project.nm_pekerjaan?.substring(0, 62)}{project.nm_pekerjaan?.length > 62 ? "…" : ""}</strong>
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          <button className="btn btn-outline" onClick={onBack}>Batal</button>
          <button className="btn btn-prim" onClick={handleSave}><Icon d={I.save} size={12} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ASSET ENTRY PAGE
// ══════════════════════════════════════════════════════════════════
function AssetEntryPage({ project, anggaran, onBack, onSave, showToast }) {
  const [assets, setAssets] = useState((project.assets || []).map(a => ({ ...a, _af: false })));
  const [confirm, setConfirm] = useState(null);

  const add = () => setAssets(p => [...p, { id: newId(), asset_code: "", serial_number: "", name: "", brand: "", model: "", category: "", location: "", procurement_date: "", acquisition_value: "", _new: true, _af: false }]);
  const upd = (id, k, v) => setAssets(p => p.map(a => a.id === id ? { ...a, [k]: v } : a));
  const tryAF = (id, k, v) => setAssets(p => p.map(a => {
    if (a.id !== id) return a;
    let u = { ...a, [k]: v, _af: false };
    let lk = null;
    if (k === "asset_code" && v) lk = ASSET_DB[v.trim()];
    else if (k === "serial_number" && v) { const c = SN_DB[v.trim()]; if (c) { lk = ASSET_DB[c]; u.asset_code = c; } }
    if (lk) u = { ...u, name: lk.name, brand: lk.brand, model: lk.model, category: lk.category, location: lk.location, _af: true };
    return u;
  }));
  const remove = id => setAssets(p => p.filter(a => a.id !== id));
  const total = assets.reduce((s, a) => s + (parseFloat(a.acquisition_value) || 0), 0);
  const save = () => {
    const cl = assets.map(({ _new, _af, ...a }) => ({ ...a, acquisition_value: parseFloat(a.acquisition_value) || 0 }));
    onSave(project.id, cl); showToast(`${cl.length} aset disimpan`); onBack();
  };

  return (
    <div className="subpage">
      <div className="subpage-hdr">
        <button className="btn btn-outline" style={{ padding: "6px 12px" }} onClick={onBack}><Icon d={I.arrowLeft} size={12} /> Kembali</button>
        <div style={{ flex: 1 }}>
          <h2>Entry Aset Pekerjaan</h2>
          <p>{project.nm_pekerjaan?.substring(0, 72)}…</p>
        </div>
      </div>
      <div className="ctx-card">
        <div className="ctx-item"><span>Anggaran</span><strong>{anggaran.nama}</strong></div>
        <div className="ctx-item"><span>No. Kontrak</span><strong>{project.no_kontrak || "—"}</strong></div>
        <div className="ctx-item"><span>Nilai Kontrak</span><strong style={{ color: "var(--red)" }}>{project.nilai_kontrak > 0 ? fmt(project.nilai_kontrak) : "—"}</strong></div>
        <div className="ctx-item"><span>Total Nilai Aset</span><strong style={{ color: "var(--blue)" }}>{fmt(total)}</strong></div>
      </div>
      <div className="ae-tip"><Icon d={I.info} size={12} />Ketik <b>Kode Aset</b> atau <b>Serial Number</b> untuk mengisi otomatis dari database inventaris.</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".7rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: ".78rem", fontWeight: 700 }}>Daftar Aset</span>
          <span style={{ background: "var(--blue-lt)", color: "var(--blue)", borderRadius: 99, padding: "2px 8px", fontSize: ".65rem", fontWeight: 700 }}>{assets.length} aset</span>
        </div>
        <button className="btn btn-prim" style={{ fontSize: ".7rem", padding: "5px 12px" }} onClick={add}><Icon d={I.plus} size={12} /> Tambah Aset</button>
      </div>
      {assets.length === 0 && <div style={{ textAlign: "center", padding: "2rem", color: "var(--ink4)", border: "1.5px dashed var(--border)", borderRadius: "var(--r-lg)", marginBottom: ".8rem" }}><Icon d={I.package} size={28} style={{ display: "block", margin: "0 auto 7px", opacity: .3 }} />Belum ada aset.</div>}
      {assets.map((a, i) => (
        <div key={a.id} className="acard">
          <div className="acard-hdr">
            <span style={{ fontSize: ".66rem", fontWeight: 700, color: "var(--ink4)" }}>Aset #{i + 1}</span>
            {a._new && <span style={{ background: "var(--green-mid)", color: "var(--green)", borderRadius: 99, padding: "1px 7px", fontSize: ".6rem", fontWeight: 700 }}>Baru</span>}
            {a._af && <span style={{ background: "var(--green-lt)", color: "var(--green)", border: "1px solid var(--green-mid)", borderRadius: 99, padding: "1px 7px", fontSize: ".6rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 3 }}><Icon d={I.checkCirc} size={9} /> Auto-filled</span>}
            <button className="abtn del" style={{ marginLeft: "auto", padding: "3px 6px" }} onClick={() => setConfirm({ msg: `Hapus aset "#${i + 1}"?`, onConfirm: () => { remove(a.id); setConfirm(null); } })}><Icon d={I.trash} size={10} /> Hapus</button>
          </div>
          <div className="acard-body">
            {a._af && <div className="af-banner"><Icon d={I.checkCirc} size={12} /> Data ditemukan & diisi otomatis dari database!</div>}
            <div className="edit-grid g3">
              <div className="edit-fld"><label>Kode Aset *</label><input value={a.asset_code} onChange={e => tryAF(a.id, "asset_code", e.target.value)} placeholder="SPMT-..." className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Serial Number</label><input value={a.serial_number || ""} onChange={e => tryAF(a.id, "serial_number", e.target.value)} placeholder="DELL-..." className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Tgl. Pengadaan</label><input type="date" value={a.procurement_date || ""} onChange={e => upd(a.id, "procurement_date", e.target.value)} /></div>
              <div className="edit-fld full"><label>Nama Aset *</label><input value={a.name} onChange={e => upd(a.id, "name", e.target.value)} placeholder="Nama aset lengkap" className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Merek</label><input value={a.brand || ""} onChange={e => upd(a.id, "brand", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Model / Tipe</label><input value={a.model || ""} onChange={e => upd(a.id, "model", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Kategori</label><input value={a.category || ""} onChange={e => upd(a.id, "category", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Lokasi</label><input value={a.location || ""} onChange={e => upd(a.id, "location", e.target.value)} className={a._af ? "af-field" : ""} /></div>
              <div className="edit-fld"><label>Nilai Perolehan (IDR)</label><input type="number" value={a.acquisition_value || ""} onChange={e => upd(a.id, "acquisition_value", e.target.value)} placeholder="0" />{a.acquisition_value > 0 && <span className="edit-hint">≈ {fmt(a.acquisition_value)}</span>}</div>
            </div>
          </div>
        </div>
      ))}
      {assets.length > 0 && (
        <div style={{ background: "var(--surf)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: ".8rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginTop: ".8rem" }}>
          <div>
            <div style={{ fontSize: ".6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".4px", color: "var(--ink4)" }}>Total Nilai Aset</div>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--blue)" }}>{fmt(total)}</div>
          </div>
          <div style={{ display: "flex", gap: 7, marginLeft: "auto" }}>
            <button className="btn btn-outline" onClick={onBack}>Batal</button>
            <button className="btn btn-prim" onClick={save}><Icon d={I.save} size={12} /> Simpan Aset</button>
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
  const [lamFile, setLamFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef(null);
  const fmtSize = b => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`;

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
        <button className="btn btn-outline" style={{ padding: "6px 12px" }} onClick={onBack}><Icon d={I.arrowLeft} size={12} /> Kembali</button>
        <div style={{ flex: 1 }}>
          <h2>{isEdit ? "Edit Realisasi" : "Tambah Realisasi"}</h2>
          <p>{ang.nama} · Tahun {ang.thn_anggaran}</p>
        </div>
      </div>
      <div className="ctx-card" style={{ background: "var(--green-lt)", borderColor: "var(--green-mid)" }}>
        <div className="ctx-item"><span style={{ color: "var(--green)" }}>Pos Anggaran</span><strong>{ang.nama}</strong></div>
        <div className="ctx-item"><span style={{ color: "var(--green)" }}>Kode</span><strong><code style={{ fontFamily: "var(--mono)", fontSize: ".76rem" }}>{ang.kd_anggaran_master}</code></strong></div>
        <div className="ctx-item"><span style={{ color: "var(--green)" }}>Tahun</span><strong>{ang.thn_anggaran}</strong></div>
        <div className="ctx-item"><span style={{ color: "var(--green)" }}>Nilai Anggaran</span><strong style={{ color: "var(--blue)" }}>{fmt(pagu)}</strong></div>
        <div className="ctx-item">
          <span style={{ color: "var(--green)" }}>Sisa Setelah Input</span>
          <strong style={{ color: sisa >= 0 ? "var(--green)" : "var(--red)" }}>{fmt(Math.abs(sisa))} <span style={{ fontSize: ".65rem", fontWeight: 500, color: "var(--ink4)" }}>{sisa >= 0 ? "tersisa" : "melebihi"}</span></strong>
        </div>
      </div>
      <div className="sec-card">
        <div className="sec-card-hdr">
          <div className="sec-card-ico" style={{ background: "var(--green-lt)", color: "var(--green)" }}><Icon d={isEdit ? I.edit : I.plus} size={12} /></div>
          <div><h3>{isEdit ? "Edit Data Transaksi" : "Data Transaksi Baru"}</h3></div>
        </div>
        <div className="sec-card-body">
          <div className="edit-grid g2" style={{ marginBottom: ".65rem" }}>
            <div className="edit-fld"><label>Tanggal *</label><input type="date" value={form.tanggal} onChange={e => up("tanggal", e.target.value)} /></div>
            <div className="edit-fld"><label>Keterangan *</label><input value={form.keterangan} onChange={e => up("keterangan", e.target.value)} placeholder="Deskripsi transaksi..." /></div>
          </div>
          <div className="edit-grid g2" style={{ marginBottom: ".65rem" }}>
            <div className="edit-fld"><label>No. Invoice</label><input value={form.no_invoice} onChange={e => up("no_invoice", e.target.value)} placeholder="INV/2026/001" /></div>
            <div className="edit-fld"><label>Jumlah (IDR) *</label><input type="number" value={form.jumlah} onChange={e => up("jumlah", e.target.value)} placeholder="0" />{jumlah > 0 && <span className="edit-hint">≈ {fmt(jumlah)}</span>}</div>
          </div>
          <div className="edit-grid g2">
            <div className="edit-fld"><label>Aset Terkait</label><input value={form.aset} onChange={e => up("aset", e.target.value)} placeholder="Kode aset (opsional)" /></div>
            <div className="edit-fld">
              <label>Lampiran <span style={{ fontSize: ".6rem", fontWeight: 400, color: "var(--ink4)", textTransform: "none" }}>opsional</span></label>
              <input ref={fileRef} type="file" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) { setLamFile(f); up("lampiran", f.name); } }} />
              {lamFile ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", border: "1px solid var(--green-mid)", borderRadius: 7, background: "var(--green-lt)" }}>
                  <Icon d={I.fileText} size={15} style={{ color: "var(--green)", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: ".76rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lamFile.name}</div>
                    <div style={{ fontSize: ".65rem", color: "var(--ink4)", marginTop: 1 }}>{fmtSize(lamFile.size)}</div>
                  </div>
                  <button className="abtn del" style={{ padding: "3px 5px", flexShrink: 0 }} onClick={() => { setLamFile(null); up("lampiran", ""); if (fileRef.current) fileRef.current.value = ""; }}><Icon d={I.x} size={10} /></button>
                </div>
              ) : (
                <div onClick={() => fileRef.current?.click()} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
                  onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) { setLamFile(f); up("lampiran", f.name); } }}
                  style={{ border: `1.5px dashed ${drag ? "var(--green)" : "var(--border)"}`, borderRadius: 7, padding: "13px", textAlign: "center", cursor: "pointer", background: drag ? "var(--green-lt)" : "var(--bg)", transition: "all .18s" }}>
                  <Icon d={I.fileText} size={18} style={{ display: "block", margin: "0 auto 4px", color: drag ? "var(--green)" : "var(--ink4)", opacity: drag ? 1 : .5 }} />
                  <div style={{ fontSize: ".72rem", color: drag ? "var(--green)" : "var(--ink3)", fontWeight: 600 }}>{drag ? "Lepaskan file" : "Seret atau klik untuk pilih"}</div>
                  <div style={{ fontSize: ".63rem", color: "var(--ink4)", marginTop: 2 }}>PDF, JPG, PNG, Excel, Word · maks. 10 MB</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "var(--surf)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: ".8rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: ".6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".4px", color: "var(--ink4)" }}>Jumlah Transaksi</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--green)" }}>{fmt(jumlah)}</div>
        </div>
        <div style={{ display: "flex", gap: 7, marginLeft: "auto" }}>
          <button className="btn btn-outline" onClick={onBack}>Batal</button>
          <button className="btn btn-green" style={{ opacity: !form.tanggal || !form.keterangan || !form.jumlah ? .5 : 1 }} onClick={save}><Icon d={I.save} size={12} />{isEdit ? "Perbarui" : "Simpan Realisasi"}</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN
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
        {confirm && <Confirm msg={confirm.msg} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}

        {/* HEADER */}
        <div className="hdr">
          <div>
            <h1>Anggaran &amp; Pekerjaan</h1>
            <p>Monitoring CAPEX &amp; OPEX berdasarkan anggaran</p>
          </div>
          <div className="hdr-right">
            <div className="yr-row">
              {yearOpts.map(y => <button key={y} className={`yr-btn ${tahun === y ? "on" : ""}`} onClick={() => setTahun(y)}>{y === "all" ? "Semua" : y}</button>)}
            </div>
            <div className="type-tabs">
              <button className={`type-tab all ${typeFilter === "all" ? "on" : ""}`} onClick={() => setTypeFilter("all")}><Icon d={I.layers} size={12} /> Semua</button>
              <button className={`type-tab ${typeFilter === "capex" ? "on" : ""}`} onClick={() => setTypeFilter("capex")}><Icon d={I.briefcase} size={12} /> CAPEX</button>
              <button className={`type-tab ${typeFilter === "opex" ? "on" : ""}`} onClick={() => setTypeFilter("opex")}><Icon d={I.monitor} size={12} /> OPEX</button>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="kpi-strip">
          <div className="kpi blue">
            <div className="kpi-ico"><Icon d={I.briefcase} size={17} /></div>
            <div className="kpi-body">
              <div className="kpi-lbl">Total Anggaran</div>
              <div className="kpi-val">{fmt(stats.pagu)}</div>
              <div className="kpi-sub">{stats.count} pekerjaan</div>
            </div>
          </div>
          <div className="kpi amber">
            <div className="kpi-ico"><Icon d={I.fileText} size={17} /></div>
            <div className="kpi-body">
              <div className="kpi-lbl">Realisasi Kontrak</div>
              <div className="kpi-val">{fmt(stats.kontrak)}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${stats.pagu > 0 ? Math.min((stats.kontrak / stats.pagu) * 100, 100) : 0}%`, background: "var(--amber)" }} /></div>
              <div className="kpi-sub">{stats.pagu > 0 ? `${((stats.kontrak / stats.pagu) * 100).toFixed(1)}% dari anggaran` : "—"}</div>
            </div>
          </div>
          <div className="kpi green">
            <div className="kpi-ico"><Icon d={I.package} size={17} /></div>
            <div className="kpi-body">
              <div className="kpi-lbl">Nilai Aset Tercatat</div>
              <div className="kpi-val">{fmt(stats.aset)}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${stats.kontrak > 0 ? Math.min((stats.aset / stats.kontrak) * 100, 100) : 0}%`, background: "var(--green)" }} /></div>
              <div className="kpi-sub">{stats.kontrak > 0 ? `${((stats.aset / stats.kontrak) * 100).toFixed(1)}% dari kontrak` : "—"}</div>
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="toolbar">
          <div className="flt-box">
            <Icon d={I.filter} size={12} />
            <select className="flt-select" value={angFilter} onChange={e => setAngFilter(e.target.value)}>
              <option value="all">Semua Anggaran</option>
              {angList.map(a => <option key={a.id} value={a.id}>{a.nama.length > 42 ? a.nama.substring(0, 42) + "..." : a.nama}</option>)}
            </select>
          </div>
          <div className="srch">
            <Icon d={I.search} size={13} />
            <input placeholder="Cari pekerjaan atau no. kontrak…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* CAPEX SECTION */}
        {showCapex && (
          <>
            {showBoth && (
              <div className="section-label">
                <div className="section-label-line" />
                <div className="section-label-pill capex"><Icon d={I.briefcase} size={11} /> CAPEX</div>
                <span className="section-count">{filteredProjects.length} pekerjaan</span>
                <div className="section-label-line" />
              </div>
            )}
            {!showBoth && (
              <div style={{ marginBottom: ".9rem" }}>
                <div style={{ fontSize: ".88rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon d={I.briefcase} size={14} style={{ color: "var(--blue)" }} /> Daftar Pekerjaan CAPEX
                  <span style={{ fontSize: ".65rem", color: "var(--ink4)", fontWeight: 500 }}>· {filteredProjects.length} pekerjaan</span>
                </div>
              </div>
            )}
            {filteredProjects.length === 0 ? (
              <div className="empty">Tidak ada pekerjaan CAPEX yang cocok.</div>
            ) : (
              <div className="card-list">
                {filteredProjects.map(proj => (
                  <CapexCard key={proj.id} proj={proj}
                    onEdit={p => { const a = getAng(p._angId); setPage({ type: "editProject", project: p, anggaran: a }); }}
                    onAsset={p => { const a = getAng(p._angId); setPage({ type: "asset", project: p, anggaran: a }); }}
                    onDelete={p => setConfirm({ msg: `Hapus pekerjaan ini?`, onConfirm: () => { deleteProject(p.id, p._angId); setConfirm(null); } })}
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
              <div className="section-label" style={{ marginTop: ".25rem" }}>
                <div className="section-label-line" />
                <div className="section-label-pill opex"><Icon d={I.monitor} size={11} /> OPEX</div>
                <span className="section-count">{filteredOpex.length} pos anggaran</span>
                <div className="section-label-line" />
              </div>
            )}
            {!showBoth && (
              <div style={{ marginBottom: ".9rem" }}>
                <div style={{ fontSize: ".88rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon d={I.monitor} size={14} style={{ color: "var(--green)" }} /> Pos Anggaran OPEX
                  <span style={{ fontSize: ".65rem", color: "var(--ink4)", fontWeight: 500 }}>· {filteredOpex.length} pos</span>
                </div>
              </div>
            )}
            {filteredOpex.length === 0 ? (
              <div className="empty">Tidak ada pos anggaran OPEX.</div>
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