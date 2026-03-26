import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
  FaClipboardList,
  FaTimesCircle,
  FaFileInvoiceDollar,
  FaBalanceScale,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

/* ─────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body, .db-wrap { font-family: 'DM Sans', system-ui, sans-serif; }

.db-wrap {
  min-height: 100vh;
  background: #f0f2f7;
  padding: 32px 36px 72px;
  max-width: 1380px;
  margin: 0 auto;
}

/* ── Header ── */
.db-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 36px; gap: 16px; flex-wrap: wrap;
}
.db-title { font-size: 1.6rem; font-weight: 800; color: #0a1628; letter-spacing: -0.6px; }
.db-subtitle { font-size: 0.8rem; color: #8899b0; margin-top: 3px; font-weight: 500; }

/* Year picker */
.year-picker {
  display: flex; background: white; border-radius: 12px; padding: 4px; gap: 2px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.07); border: 1px solid #e2e8f0;
}
.year-btn {
  padding: 7px 16px; border-radius: 9px; border: none; cursor: pointer;
  font-size: 0.82rem; font-weight: 600; transition: all 0.2s ease;
  font-family: inherit; color: #8899b0; background: transparent;
}
.year-btn.active { background: #1a56db; color: white; box-shadow: 0 2px 8px rgba(26,86,219,0.28); }

/* ── Section label ── */
.section-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #a0b0c8; margin-bottom: 12px; }

/* ── Stats row ── */
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 32px; }
.stat-card {
  background: white; border-radius: 14px; padding: 20px 22px;
  display: flex; align-items: center; gap: 14px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05); border: 1px solid #edf1f8;
  transition: box-shadow 0.2s;
}
.stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.09); }
.stat-icon {
  width: 46px; height: 46px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;
}
.stat-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #a0b0c8; margin-bottom: 2px; }
.stat-value { font-size: 1.75rem; font-weight: 800; color: #0a1628; line-height: 1; letter-spacing: -1px; }
.stat-sub { font-size: 0.72rem; color: #a0b0c8; font-weight: 500; margin-top: 2px; }

/* ── Budget grid ── */
.budget-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }

/* ── Charts grid ── */
.chart-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 16px; margin-bottom: 32px; }

/* ── Card base ── */
.card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); border: 1px solid #edf1f8; }
.card-title { font-size: 0.9rem; font-weight: 700; color: #0a1628; }
.card-subtitle { font-size: 0.72rem; color: #a0b0c8; font-weight: 500; margin-top: 2px; }
.card-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; gap: 10px; }

/* ── Budget Section Card ── */
.budget-section-card {
  background: white; border-radius: 16px; padding: 22px 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05); border: 1px solid #edf1f8;
  display: flex; flex-direction: column;
}
.bsc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.bsc-type-tag {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 99px; font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 4px;
}
.bsc-type-tag.capex { background: #dbeafe; color: #1d4ed8; }
.bsc-type-tag.opex  { background: #dcfce7; color: #16a34a; }
.bsc-title { font-size: 0.88rem; font-weight: 700; color: #0a1628; margin-bottom: 2px; line-height: 1.3; }
.bsc-meta  { font-size: 0.7rem; color: #8899b0; }

/* ── Amount display ── */
.bsc-amount { text-align: right; }
.bsc-amount-lbl { font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #a0b0c8; margin-bottom: 2px; }
.bsc-amount-val { font-size: 1.3rem; font-weight: 800; color: #1a56db; letter-spacing: -0.5px; }

/* ── Progress bar ── */
.prog-track { height: 6px; border-radius: 99px; background: #edf1f8; overflow: hidden; }
.prog-fill  { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(.4,0,.2,1); }

/* ── Pct bar row ── */
.pct-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
.pct-label { font-size: 0.74rem; color: #64748b; }
.pct-value { font-size: 0.8rem; font-weight: 700; }

/* ── Detail button ── */
.detail-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 7px 14px; border-radius: 9px; border: 1.5px solid #e2e8f0;
  background: white; font-size: 0.73rem; font-weight: 700; color: #1a56db;
  cursor: pointer; transition: all 0.16s; font-family: inherit;
  margin-top: 14px; align-self: flex-start;
}
.detail-btn:hover { background: #eff6ff; border-color: #bfdbfe; }
.detail-btn.green { color: #16a34a; }
.detail-btn.green:hover { background: #f0fdf4; border-color: #bbf7d0; }

/* ── Slide pager ── */
.pager-wrap { position: relative; overflow: hidden; margin-bottom: 0; }
.pager-track { display: flex; transition: transform 0.38s cubic-bezier(.4,0,.2,1); }
.pager-slide { min-width: 100%; width: 100%; flex-shrink: 0; }
.pager-dots { display: flex; justify-content: center; align-items: center; gap: 5px; margin-top: 10px; }
.pager-dot { width: 6px; height: 6px; border-radius: 99px; background: #d4dbe8; border: none; padding: 0; cursor: pointer; transition: all 0.2s; }
.pager-dot.active { width: 18px; background: #1a56db; }
.pager-nav { display: flex; justify-content: flex-end; gap: 6px; margin-top: 8px; }
.pnav-btn {
  width: 28px; height: 28px; border-radius: 8px; border: 1.5px solid #e2e8f0;
  background: white; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; transition: all 0.16s;
}
.pnav-btn:hover:not(:disabled) { background: #f1f5f9; border-color: #c4cdda; color: #1a56db; }
.pnav-btn:disabled { opacity: 0.35; cursor: not-allowed; }

/* ── Budget item row ── */
.bitem {
  display: flex; align-items: center; gap: 10px; padding: 8px 0;
  border-bottom: 1px solid #f4f6fb;
}
.bitem:last-child { border-bottom: none; }
.bitem-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.bitem-name { font-size: 0.76rem; color: #334155; font-weight: 500; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bitem-bar { flex: 0 0 64px; }
.bitem-pct { font-size: 0.68rem; font-weight: 700; min-width: 28px; text-align: right; flex-shrink: 0; }

/* ── CAPEX item card (in slide) ── */
.capex-item {
  border: 1px solid #edf1f8; border-radius: 12px; padding: 14px 16px; margin-bottom: 8px;
  background: #fafbfe;
}
.capex-item:last-child { margin-bottom: 0; }
.capex-item-header { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
.capex-item-name { font-size: 0.78rem; font-weight: 600; color: #0a1628; flex: 1; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.capex-item-badges { display: flex; gap: 4px; flex-wrap: wrap; flex-shrink: 0; }
.ci-badge { font-size: 0.58rem; font-weight: 700; padding: 2px 7px; border-radius: 99px; }
.ci-badge.selesai { background: #dcfce7; color: #16a34a; }
.ci-badge.berjalan { background: #dbeafe; color: #1d4ed8; }
.ci-badge.multi { background: #fef3c7; color: #d97706; }
.capex-item-amounts { display: flex; justify-content: space-between; font-size: 0.71rem; color: #8899b0; margin-bottom: 5px; }
.capex-item-amounts strong { color: #0a1628; font-weight: 700; }

/* ── Toggle pill ── */
.toggle-pill { display: flex; background: #f0f2f7; border-radius: 9px; padding: 3px; gap: 2px; flex-shrink: 0; }
.toggle-btn {
  padding: 5px 12px; border-radius: 7px; border: none; cursor: pointer;
  font-size: 0.73rem; font-weight: 700; transition: all 0.18s; font-family: inherit; color: #8899b0; background: transparent;
}
.toggle-btn.active { background: white; color: #1a56db; box-shadow: 0 1px 4px rgba(0,0,0,0.09); }

/* ── Alerts ── */
.alert-list { display: flex; flex-direction: column; gap: 10px; }
.alert-item {
  display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px;
  border-radius: 11px; background: #fafbfc; border: 1px solid #edf1f8; transition: box-shadow 0.2s;
}
.alert-item:hover { box-shadow: 0 3px 10px rgba(0,0,0,0.06); }
.alert-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; margin-top: 1px; }
.alert-title { font-size: 0.82rem; font-weight: 700; color: #0a1628; margin-bottom: 2px; }
.alert-text  { font-size: 0.74rem; color: #64748b; line-height: 1.5; }
.alert-btn {
  margin-left: auto; flex-shrink: 0; padding: 6px 12px; border-radius: 8px;
  border: 1px solid #e2e8f0; background: white; font-size: 0.72rem; font-weight: 700;
  color: #1a56db; cursor: pointer; transition: all 0.15s; font-family: inherit;
  white-space: nowrap; align-self: flex-start;
}
.alert-btn:hover { background: #1a56db; color: white; border-color: #1a56db; }

/* ── MODAL OVERLAY ── */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(10,22,40,0.52);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
  backdrop-filter: blur(3px); padding: 20px;
  animation: fadeIn 0.18s ease;
}
.modal-box {
  background: white; border-radius: 18px; width: 100%; max-width: 640px;
  max-height: 88vh; display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.18);
  animation: slideUp 0.22s cubic-bezier(.16,1,.3,1);
}
.modal-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid #edf1f8; flex-shrink: 0;
}
.modal-header-left { display: flex; flex-direction: column; gap: 3px; }
.modal-title { font-size: 1rem; font-weight: 800; color: #0a1628; }
.modal-subtitle { font-size: 0.73rem; color: #8899b0; }
.modal-close {
  width: 30px; height: 30px; border-radius: 8px; border: 1px solid #e2e8f0;
  background: #f8fafc; cursor: pointer; color: #64748b; display: flex; align-items: center;
  justify-content: center; font-size: 0.8rem; transition: all 0.15s; flex-shrink: 0;
}
.modal-close:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }
.modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 16px; }
.modal-footer {
  padding: 14px 24px; border-top: 1px solid #edf1f8; flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between; background: #fafbfc;
}

/* Modal summary strip */
.modal-summary-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 0; }
.mss-item { background: #f8fafc; border: 1px solid #edf1f8; border-radius: 10px; padding: 10px 12px; }
.mss-lbl { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #a0b0c8; margin-bottom: 3px; }
.mss-val { font-size: 0.92rem; font-weight: 800; }

/* Program row in modal */
.mprogram-row { border: 1px solid #edf1f8; border-radius: 11px; overflow: hidden; }
.mpr-head { display: flex; align-items: flex-start; gap: 8px; padding: 12px 14px; background: #fafbfe; }
.mpr-dot { width: 7px; height: 7px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
.mpr-name { font-size: 0.77rem; font-weight: 600; color: #0a1628; flex: 1; line-height: 1.4; }
.mpr-right { text-align: right; flex-shrink: 0; }
.mpr-val { font-size: 0.78rem; font-weight: 700; color: #0a1628; }
.mpr-sub { font-size: 0.64rem; color: #a0b0c8; }
.mpr-pct { font-size: 0.7rem; font-weight: 800; }
.mpr-body { padding: 10px 14px; border-top: 1px solid #f0f4fa; }
.mpr-year-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
.mpr-year-lbl { font-size: 0.72rem; font-weight: 700; color: #1a56db; min-width: 34px; }
.mpr-year-val { font-size: 0.7rem; font-weight: 600; color: #334155; min-width: 80px; text-align: right; }

/* Opex row in modal */
.mopex-row { border: 1px solid #edf1f8; border-radius: 11px; overflow: hidden; margin-bottom: 8px; }
.mopex-row:last-child { margin-bottom: 0; }
.mopex-head { display: flex; align-items: center; gap: 10px; padding: 11px 14px; background: #f7fdf9; }
.mopex-name { font-size: 0.78rem; font-weight: 600; color: #0a1628; flex: 1; }
.mopex-amounts { display: flex; gap: 16px; flex-shrink: 0; }
.mopex-amount { text-align: right; }
.mopex-amount .lbl { font-size: 0.6rem; color: #a0b0c8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
.mopex-amount .val { font-size: 0.8rem; font-weight: 700; }
.mopex-trx { padding: 8px 14px; border-top: 1px solid #f0f4fa; }
.mopex-trx-item { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #f8fafc; }
.mopex-trx-item:last-child { border-bottom: none; }
.trx-ket { font-size: 0.72rem; color: #334155; font-weight: 500; }
.trx-date { font-size: 0.65rem; color: #a0b0c8; }
.trx-val { font-size: 0.74rem; font-weight: 700; color: #d97706; white-space: nowrap; }

/* Divider */
.divider { height: 1px; background: #edf1f8; margin: 14px 0; }

/* Nav to budget page */
.go-budget-btn {
  display: flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 9px;
  border: 1.5px solid #1a56db; background: #1a56db; color: white; font-size: 0.74rem;
  font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.16s;
}
.go-budget-btn:hover { background: #1648c4; }

/* Thin scroll */
.thin-scroll { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

/* Responsive */
@media (max-width: 1024px) { .budget-grid, .chart-grid { grid-template-columns: 1fr; } .stats-row { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) { .db-wrap { padding: 16px 14px 40px; } .stats-row { grid-template-columns: 1fr; } .modal-summary-strip { grid-template-columns: 1fr; } }
`;

/* ─────────────────────────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────────────────────────── */
const dataPeminjamanHarian = [
  { name: "Sen", Laptop: 8, Proyektor: 3, Kamera: 2, Kendaraan: 1 },
  { name: "Sel", Laptop: 12, Proyektor: 5, Kamera: 4, Kendaraan: 2 },
  { name: "Rab", Laptop: 10, Proyektor: 7, Kamera: 3, Kendaraan: 3 },
  { name: "Kam", Laptop: 15, Proyektor: 4, Kamera: 6, Kendaraan: 2 },
  { name: "Jum", Laptop: 9, Proyektor: 6, Kamera: 5, Kendaraan: 4 },
  { name: "Sab", Laptop: 5, Proyektor: 2, Kamera: 2, Kendaraan: 1 },
  { name: "Min", Laptop: 3, Proyektor: 1, Kamera: 1, Kendaraan: 0 },
];
const dataPeminjamanBulanan = [
  { name: "Jan", Laptop: 40, Proyektor: 20, Kamera: 15, Kendaraan: 10 },
  { name: "Feb", Laptop: 30, Proyektor: 18, Kamera: 12, Kendaraan: 8 },
  { name: "Mar", Laptop: 65, Proyektor: 30, Kamera: 20, Kendaraan: 12 },
  { name: "Apr", Laptop: 50, Proyektor: 25, Kamera: 18, Kendaraan: 9 },
  { name: "Mei", Laptop: 85, Proyektor: 35, Kamera: 28, Kendaraan: 15 },
  { name: "Jun", Laptop: 120, Proyektor: 45, Kamera: 35, Kendaraan: 20 },
];
const kategoriLines = [
  { key: "Laptop", color: "#1a56db" },
  { key: "Proyektor", color: "#16a34a" },
  { key: "Kamera", color: "#d97706" },
  { key: "Kendaraan", color: "#7c3aed" },
];

const dataKondisi = [
  { name: "Baik", value: 850, color: "#22c55e" },
  { name: "Dalam Pemeliharaan", value: 80, color: "#3b82f6" },
  { name: "Rusak Berat", value: 45, color: "#ef4444" },
  { name: "Rusak Ringan", value: 120, color: "#f59e0b" },
];
const totalKondisi = dataKondisi.reduce((s, d) => s + d.value, 0);

// CAPEX — multi-year programs (composit)
const mockCapexPrograms = [
  {
    id: "CAP-01",
    nm_anggaran_capex: "Implementasi dan Standarisasi IT Infrastruktur",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    nilai_anggaran: 1200000000,
    status: "selesai",
    realisasi_per_tahun: [{ tahun: 2024, realisasi: 1200000000 }],
  },
  {
    id: "CAP-02",
    nm_anggaran_capex: "Penyediaan Network di Branch SPMT",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    nilai_anggaran: 800000000,
    status: "selesai",
    realisasi_per_tahun: [{ tahun: 2024, realisasi: 800000000 }],
  },
  {
    id: "CAP-03",
    nm_anggaran_capex:
      "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas)",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    nilai_anggaran: 3500000000,
    status: "selesai",
    realisasi_per_tahun: [{ tahun: 2024, realisasi: 3500000000 }],
  },
  {
    id: "CAP-04",
    nm_anggaran_capex:
      "Revisi Capex — Pemenuhan Kebutuhan Gate dan PNC Transformasi Branch SPMT",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2025,
    nilai_anggaran: 1500000000,
    status: "berjalan",
    realisasi_per_tahun: [
      { tahun: 2024, realisasi: 600000000 },
      { tahun: 2025, realisasi: 900000000 },
    ],
  },
  {
    id: "CAP-05",
    nm_anggaran_capex:
      "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    nilai_anggaran: 2000000000,
    status: "berjalan",
    realisasi_per_tahun: [
      { tahun: 2025, realisasi: 1600000000 },
      { tahun: 2026, realisasi: 800000000 },
    ],
  },
  {
    id: "CAP-06",
    nm_anggaran_capex:
      "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    nilai_anggaran: 1800000000,
    status: "berjalan",
    realisasi_per_tahun: [
      { tahun: 2025, realisasi: 1300000000 },
      { tahun: 2026, realisasi: 400000000 },
    ],
  },
  {
    id: "CAP-07",
    nm_anggaran_capex: "Penyiapan Infrastruktur IT pada Kegiatan Roro",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    nilai_anggaran: 900000000,
    status: "berjalan",
    realisasi_per_tahun: [
      { tahun: 2025, realisasi: 650000000 },
      { tahun: 2026, realisasi: 150000000 },
    ],
  },
];

// OPEX — per tahun
const mockOpexPerTahun = {
  2023: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 400000000,
      realisasi: 400000000,
      transaksi: [],
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 500000000,
      realisasi: 498000000,
      transaksi: [],
    },
    {
      id: 3,
      nama: "Beban Perlengkapan Kantor",
      rkap: 600000000,
      realisasi: 590000000,
      transaksi: [],
    },
    {
      id: 4,
      nama: "Beban Jasa Konsultan",
      rkap: 700000000,
      realisasi: 695000000,
      transaksi: [],
    },
    {
      id: 5,
      nama: "Beban SDM Pihak Ketiga",
      rkap: 800000000,
      realisasi: 780000000,
      transaksi: [],
    },
  ],
  2024: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 450000000,
      realisasi: 440000000,
      transaksi: [],
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 550000000,
      realisasi: 530000000,
      transaksi: [],
    },
    {
      id: 3,
      nama: "Beban Perlengkapan Kantor",
      rkap: 650000000,
      realisasi: 620000000,
      transaksi: [],
    },
    {
      id: 4,
      nama: "Beban Jasa Konsultan",
      rkap: 750000000,
      realisasi: 740000000,
      transaksi: [],
    },
    {
      id: 5,
      nama: "Beban SDM Pihak Ketiga",
      rkap: 850000000,
      realisasi: 810000000,
      transaksi: [],
    },
  ],
  2025: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 500000000,
      realisasi: 420000000,
      transaksi: [],
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 600000000,
      realisasi: 510000000,
      transaksi: [],
    },
    {
      id: 3,
      nama: "Beban Perlengkapan Kantor",
      rkap: 700000000,
      realisasi: 580000000,
      transaksi: [],
    },
    {
      id: 4,
      nama: "Beban Jasa Konsultan",
      rkap: 800000000,
      realisasi: 720000000,
      transaksi: [],
    },
    {
      id: 5,
      nama: "Beban SDM Pihak Ketiga",
      rkap: 900000000,
      realisasi: 760000000,
      transaksi: [],
    },
    {
      id: 6,
      nama: "Beban Lisensi & Subscription",
      rkap: 300000000,
      realisasi: 280000000,
      transaksi: [],
    },
  ],
  2026: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 500000000,
      realisasi: 85000000,
      transaksi: [
        {
          id: "t1",
          tanggal: "2026-01-15",
          keterangan: "Lisensi Office 365",
          no_invoice: "INV/2026/001",
          jumlah: 85000000,
        },
      ],
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 600000000,
      realisasi: 240000000,
      transaksi: [
        {
          id: "t2",
          tanggal: "2026-01-05",
          keterangan: "Tagihan MPLS Januari",
          no_invoice: "INV/2026/002",
          jumlah: 24000000,
        },
      ],
    },
    {
      id: 3,
      nama: "Beban Perlengkapan Kantor",
      rkap: 700000000,
      realisasi: 45000000,
      transaksi: [],
    },
    {
      id: 4,
      nama: "Beban Jasa Konsultan",
      rkap: 800000000,
      realisasi: 400000000,
      transaksi: [],
    },
    {
      id: 5,
      nama: "Beban SDM Pihak Ketiga",
      rkap: 900000000,
      realisasi: 150000000,
      transaksi: [],
    },
    {
      id: 6,
      nama: "Beban Outsourcing IT",
      rkap: 450000000,
      realisasi: 120000000,
      transaksi: [],
    },
  ],
};

const mockBorrows = [
  {
    id_peminjaman: 1,
    asset_code: "SPMT-MLH-LPG-DMG-01",
    asset_name: "CCTV Hikvision Malahayati",
    borrower_name: "Andi Pratama",
    borrow_date: "2026-01-10",
    due_date: "2026-01-20",
    is_returned: true,
    return_condition: "GOOD",
  },
  {
    id_peminjaman: 2,
    asset_code: "SPMT-MLH-LPG-DMG-01",
    asset_name: "CCTV Hikvision Malahayati",
    borrower_name: "Budi Santoso",
    borrow_date: "2026-02-01",
    due_date: "2026-02-15",
    is_returned: true,
    return_condition: "MINOR_DAMAGE",
  },
  {
    id_peminjaman: 3,
    asset_code: "SPMT-MLH-LPG-DMG-01",
    asset_name: "CCTV Hikvision Malahayati",
    borrower_name: "Citra Dewi",
    borrow_date: "2026-02-20",
    due_date: "2026-03-01",
    is_returned: true,
    return_condition: "DAMAGED",
  },
  {
    id_peminjaman: 4,
    asset_code: "SPMT-LHK-DTC-PKR-02",
    asset_name: "Core Switch Lhokseumawe",
    borrower_name: "Deni Kurniawan",
    borrow_date: "2026-01-05",
    due_date: "2026-01-20",
    is_returned: false,
    return_condition: null,
  },
  {
    id_peminjaman: 5,
    asset_code: "SPMT-GRG-DTC-PKR-01",
    asset_name: "Access Switch Garongkong",
    borrower_name: "Eka Saputra",
    borrow_date: "2026-02-10",
    due_date: "2026-02-20",
    is_returned: false,
    return_condition: null,
  },
  {
    id_peminjaman: 6,
    asset_code: "SPMT-TBK-DTC-PKR-01",
    asset_name: "Core Switch Tanjung Balai Karimun",
    borrower_name: "Fajar Hidayat",
    borrow_date: "2026-02-25",
    due_date: "2026-03-10",
    is_returned: false,
    return_condition: null,
  },
  {
    id_peminjaman: 7,
    asset_code: "SPMT-LHK-LPG-DMG-01",
    asset_name: "CCTV Hikvision Lhokseumawe",
    borrower_name: "Gita Rahayu",
    borrow_date: "2026-01-15",
    due_date: "2026-01-30",
    is_returned: true,
    return_condition: "MINOR_DAMAGE",
  },
  {
    id_peminjaman: 8,
    asset_code: "SPMT-LHK-LPG-DMG-01",
    asset_name: "CCTV Hikvision Lhokseumawe",
    borrower_name: "Hendra Wijaya",
    borrow_date: "2026-02-15",
    due_date: "2026-02-28",
    is_returned: true,
    return_condition: "MINOR_DAMAGE",
  },
];

/* ─────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────── */
const formatRupiah = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);
const formatRupiahShort = (v) => {
  if (v >= 1_000_000_000) return `Rp ${(v / 1_000_000_000).toFixed(1)} M`;
  if (v >= 1_000_000) return `Rp ${(v / 1_000_000).toFixed(0)} Jt`;
  return formatRupiah(v);
};
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const statusCfg = {
  selesai: { color: "#16a34a", bg: "#dcfce7", label: "Selesai" },
  berjalan: { color: "#1a56db", bg: "#dbeafe", label: "Berjalan" },
  belum: { color: "#9ca3af", bg: "#f1f5f9", label: "Belum Mulai" },
};

/* ─────────────────────────────────────────────────────────────────
   ALERTS
───────────────────────────────────────────────────────────────── */
const calculateAlerts = (opexData) => {
  const alerts = [];
  const today = new Date();
  const damageCount = {},
    damageNames = {};
  mockBorrows.forEach((b) => {
    if (
      b.is_returned &&
      (b.return_condition === "MINOR_DAMAGE" ||
        b.return_condition === "DAMAGED")
    ) {
      damageCount[b.asset_code] = (damageCount[b.asset_code] || 0) + 1;
      damageNames[b.asset_code] = b.asset_name;
    }
  });
  Object.entries(damageCount).forEach(([code, count]) => {
    if (count >= 2)
      alerts.push({
        id: `dmg-${code}`,
        type: "FREQUENT_DAMAGE",
        priority: "high",
        title: "Aset Sering Rusak",
        message: `${damageNames[code]} dikembalikan rusak ${count}x. Pertimbangkan pengecekan.`,
        action_label: "Lihat Riwayat",
        action_path: "/peminjaman",
      });
  });
  const overdue = mockBorrows.filter(
    (b) => !b.is_returned && new Date(b.due_date) < today,
  );
  if (overdue.length > 0)
    alerts.push({
      id: "overdue",
      type: "OVERDUE_BORROW",
      priority: "medium",
      title: "Peminjaman Lewat Jatuh Tempo",
      message: `${overdue.length} aset melewati jatuh tempo. Segera tindak lanjut.`,
      action_label: "Cek Peminjaman",
      action_path: "/peminjaman",
    });
  opexData.forEach((opex) => {
    const pct = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
    if (pct >= 80)
      alerts.push({
        id: `opex-${opex.id}`,
        type: "OPEX_CRITICAL",
        priority: pct >= 100 ? "high" : "medium",
        title: "Anggaran OPEX Kritis",
        message: `${opex.nama} terserap ${pct.toFixed(1)}%. Sisa: ${formatRupiah(opex.rkap - opex.realisasi)}.`,
        action_label: "Lihat Anggaran",
        action_path: "/budget",
      });
  });
  alerts.sort(
    (a, b) =>
      ({ high: 0, medium: 1, low: 2 })[a.priority] -
      { high: 0, medium: 1, low: 2 }[b.priority],
  );
  return alerts;
};

const ALERT_STYLE = {
  FREQUENT_DAMAGE: {
    icon: <FaExclamationTriangle />,
    bg: "#fef2f2",
    color: "#ef4444",
  },
  OVERDUE_BORROW: {
    icon: <FaClipboardList />,
    bg: "#fffbeb",
    color: "#f59e0b",
  },
  OPEX_CRITICAL: {
    icon: <FaFileInvoiceDollar />,
    bg: "#fffbeb",
    color: "#d97706",
  },
  CAPEX_NO_ASSET: { icon: <FaTimesCircle />, bg: "#eff6ff", color: "#3b82f6" },
  CAPEX_IMBALANCE: {
    icon: <FaBalanceScale />,
    bg: "#faf5ff",
    color: "#7c3aed",
  },
};

/* ─────────────────────────────────────────────────────────────────
   SLIDE PAGER component
───────────────────────────────────────────────────────────────── */
const ITEMS_PER_PAGE = 3;

function SlidePager({ items, renderItem, itemKey }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const slice = items.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="pager-wrap">
        <div className="pager-track" style={{ transform: `translateX(0)` }}>
          <div className="pager-slide">
            {slice.map((item, i) => (
              <div key={item[itemKey] ?? i}>{renderItem(item, i)}</div>
            ))}
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <div className="pager-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`pager-dot${page === i ? " active" : ""}`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
          <div className="pager-nav">
            <button
              className="pnav-btn"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <FaChevronLeft />
            </button>
            <button
              className="pnav-btn"
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CAPEX DETAIL MODAL
───────────────────────────────────────────────────────────────── */
function CapexDetailModal({ programs, selectedYear, onClose, onGoToBudget }) {
  // filter: jika ada selectedYear, tampilkan yg aktif di tahun itu; kalau all, tampilkan semua
  const displayed = useMemo(() => {
    const yr = parseInt(selectedYear);
    if (isNaN(yr)) return programs;
    return programs.filter(
      (p) => p.thn_rkap_awal <= yr && p.thn_rkap_akhir >= yr,
    );
  }, [programs, selectedYear]);

  const grandAnggaran = programs.reduce((s, p) => s + p.nilai_anggaran, 0);
  const grandRealisasi = programs.reduce(
    (s, p) => p.realisasi_per_tahun.reduce((ss, r) => ss + r.realisasi, 0) + s,
    0,
  );
  const grandPct =
    grandAnggaran > 0 ? (grandRealisasi / grandAnggaran) * 100 : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 3,
                }}
              >
                <span className="bsc-type-tag capex">CAPEX</span>
                <span style={{ fontSize: "0.65rem", color: "#a0b0c8" }}>
                  Multi-Year Composite
                </span>
              </div>
              <div className="modal-title">Detail Anggaran CAPEX</div>
              <div className="modal-subtitle">
                {programs.length} program ·{" "}
                {selectedYear !== "all"
                  ? `Aktif di ${selectedYear}`
                  : "Semua Tahun"}
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body thin-scroll">
          {/* Summary strip */}
          <div className="modal-summary-strip">
            <div className="mss-item">
              <div className="mss-lbl">Total RKAP</div>
              <div className="mss-val" style={{ color: "#1a56db" }}>
                {formatRupiahShort(grandAnggaran)}
              </div>
            </div>
            <div className="mss-item">
              <div className="mss-lbl">Total Realisasi</div>
              <div className="mss-val" style={{ color: "#16a34a" }}>
                {formatRupiahShort(grandRealisasi)}
              </div>
            </div>
            <div className="mss-item">
              <div className="mss-lbl">Serapan Komposit</div>
              <div
                className="mss-val"
                style={{ color: grandPct >= 80 ? "#d97706" : "#1a56db" }}
              >
                {grandPct.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div>
            <div className="pct-row">
              <span className="pct-label">Total Serapan</span>
              <span className="pct-value" style={{ color: "#1a56db" }}>
                {grandPct.toFixed(1)}%
              </span>
            </div>
            <div className="prog-track">
              <div
                className="prog-fill"
                style={{
                  width: `${Math.min(grandPct, 100)}%`,
                  background: "linear-gradient(90deg, #1a56db, #3b82f6)",
                }}
              />
            </div>
          </div>

          <div className="divider" style={{ margin: "2px 0" }} />

          {/* Program list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {displayed.map((p) => {
              const totalReal = p.realisasi_per_tahun.reduce(
                (s, r) => s + r.realisasi,
                0,
              );
              const pct =
                p.nilai_anggaran > 0 ? (totalReal / p.nilai_anggaran) * 100 : 0;
              const cfg = statusCfg[p.status] || statusCfg.belum;
              const isMulti = p.thn_rkap_awal !== p.thn_rkap_akhir;
              return (
                <div key={p.id} className="mprogram-row">
                  <div className="mpr-head">
                    <div
                      className="mpr-dot"
                      style={{ background: cfg.color }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          marginBottom: 4,
                          flexWrap: "wrap",
                        }}
                      >
                        <span className={`ci-badge ${p.status}`}>
                          {cfg.label}
                        </span>
                        <span
                          style={{
                            fontSize: "0.58rem",
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: 99,
                            background: "#f1f5f9",
                            color: "#64748b",
                          }}
                        >
                          RKAP {p.thn_rkap_awal}
                          {isMulti ? `–${p.thn_rkap_akhir}` : ""}
                        </span>
                        {isMulti && (
                          <span className="ci-badge multi">Multi-Year</span>
                        )}
                      </div>
                      <div className="mpr-name">{p.nm_anggaran_capex}</div>
                      <div
                        className="prog-track"
                        style={{ marginTop: 6, height: "4px" }}
                      >
                        <div
                          className="prog-fill"
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            background: cfg.color,
                          }}
                        />
                      </div>
                    </div>
                    <div className="mpr-right">
                      <div className="mpr-val">
                        {formatRupiahShort(totalReal)}
                      </div>
                      <div className="mpr-sub">
                        / {formatRupiahShort(p.nilai_anggaran)}
                      </div>
                      <div className="mpr-pct" style={{ color: cfg.color }}>
                        {pct.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  {/* Per-year breakdown */}
                  {p.realisasi_per_tahun.length > 0 && (
                    <div className="mpr-body">
                      {p.realisasi_per_tahun.map((r, i) => {
                        const rowPct =
                          p.nilai_anggaran > 0
                            ? (r.realisasi / p.nilai_anggaran) * 100
                            : 0;
                        return (
                          <div key={i} className="mpr-year-row">
                            <span className="mpr-year-lbl">{r.tahun}</span>
                            <div
                              className="prog-track"
                              style={{ flex: 1, height: "3px" }}
                            >
                              <div
                                className="prog-fill"
                                style={{
                                  width: `${Math.min(rowPct, 100)}%`,
                                  background: "#93c5fd",
                                }}
                              />
                            </div>
                            <span className="mpr-year-val">
                              {formatRupiahShort(r.realisasi)}
                            </span>
                            <span
                              style={{
                                fontSize: "0.62rem",
                                color: "#a0b0c8",
                                minWidth: 32,
                                textAlign: "right",
                              }}
                            >
                              ({rowPct.toFixed(0)}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          <span style={{ fontSize: "0.72rem", color: "#8899b0" }}>
            {displayed.length} program ditampilkan
          </span>
          <button
            className="go-budget-btn"
            onClick={() => {
              onClose();
              onGoToBudget();
            }}
          >
            <FaExternalLinkAlt style={{ fontSize: "0.65rem" }} /> Kelola di
            Halaman Anggaran
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   OPEX DETAIL MODAL
───────────────────────────────────────────────────────────────── */
function OpexDetailModal({ opexData, tahun, onClose, onGoToBudget }) {
  const totalRkap = opexData.reduce((s, o) => s + o.rkap, 0);
  const totalReal = opexData.reduce((s, o) => s + o.realisasi, 0);
  const pct = totalRkap > 0 ? (totalReal / totalRkap) * 100 : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 3,
                }}
              >
                <span className="bsc-type-tag opex">OPEX</span>
                <span style={{ fontSize: "0.65rem", color: "#a0b0c8" }}>
                  Per Tahun
                </span>
              </div>
              <div className="modal-title">Detail Anggaran OPEX</div>
              <div className="modal-subtitle">
                Tahun {tahun} · {opexData.length} pos anggaran
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body thin-scroll">
          {/* Summary strip */}
          <div className="modal-summary-strip">
            <div className="mss-item">
              <div className="mss-lbl">Total RKAP</div>
              <div className="mss-val" style={{ color: "#16a34a" }}>
                {formatRupiahShort(totalRkap)}
              </div>
            </div>
            <div className="mss-item">
              <div className="mss-lbl">Total Realisasi</div>
              <div className="mss-val" style={{ color: "#d97706" }}>
                {formatRupiahShort(totalReal)}
              </div>
            </div>
            <div className="mss-item">
              <div className="mss-lbl">Sisa Anggaran</div>
              <div
                className="mss-val"
                style={{
                  color: totalRkap - totalReal >= 0 ? "#16a34a" : "#ef4444",
                }}
              >
                {formatRupiahShort(Math.abs(totalRkap - totalReal))}
              </div>
            </div>
          </div>
          <div>
            <div className="pct-row">
              <span className="pct-label">Serapan Total</span>
              <span
                className="pct-value"
                style={{ color: pct >= 80 ? "#d97706" : "#16a34a" }}
              >
                {pct.toFixed(1)}%
              </span>
            </div>
            <div className="prog-track">
              <div
                className="prog-fill"
                style={{
                  width: `${Math.min(pct, 100)}%`,
                  background:
                    pct >= 100 ? "#ef4444" : pct >= 80 ? "#f59e0b" : "#16a34a",
                }}
              />
            </div>
          </div>
          <div className="divider" style={{ margin: "2px 0" }} />
          {/* Per-pos */}
          <div>
            {opexData.map((opex) => {
              const p = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
              const c = p >= 100 ? "#ef4444" : p >= 80 ? "#f59e0b" : "#16a34a";
              return (
                <div key={opex.id} className="mopex-row">
                  <div className="mopex-head">
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: c,
                        flexShrink: 0,
                      }}
                    />
                    <div className="mopex-name">{opex.nama}</div>
                    <div className="mopex-amounts">
                      <div className="mopex-amount">
                        <div className="lbl">RKAP</div>
                        <div className="val" style={{ color: "#1a56db" }}>
                          {formatRupiahShort(opex.rkap)}
                        </div>
                      </div>
                      <div className="mopex-amount">
                        <div className="lbl">Realisasi</div>
                        <div className="val" style={{ color: c }}>
                          {formatRupiahShort(opex.realisasi)}
                        </div>
                      </div>
                      <div className="mopex-amount">
                        <div className="lbl">Serapan</div>
                        <div className="val" style={{ color: c }}>
                          {p.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "6px 14px" }}>
                    <div className="prog-track" style={{ height: "4px" }}>
                      <div
                        className="prog-fill"
                        style={{ width: `${Math.min(p, 100)}%`, background: c }}
                      />
                    </div>
                  </div>
                  {opex.transaksi && opex.transaksi.length > 0 && (
                    <div className="mopex-trx">
                      {opex.transaksi.slice(0, 3).map((t) => (
                        <div key={t.id} className="mopex-trx-item">
                          <div>
                            <div className="trx-ket">{t.keterangan}</div>
                            <div className="trx-date">
                              {fmtDate(t.tanggal)} · {t.no_invoice}
                            </div>
                          </div>
                          <span className="trx-val">
                            {formatRupiahShort(t.jumlah)}
                          </span>
                        </div>
                      ))}
                      {opex.transaksi.length > 3 && (
                        <div
                          style={{
                            fontSize: "0.67rem",
                            color: "#a0b0c8",
                            paddingTop: 4,
                          }}
                        >
                          +{opex.transaksi.length - 3} transaksi lainnya
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          <span style={{ fontSize: "0.72rem", color: "#8899b0" }}>
            {opexData.length} pos anggaran · Tahun {tahun}
          </span>
          <button
            className="go-budget-btn"
            style={{ background: "#16a34a", borderColor: "#16a34a" }}
            onClick={() => {
              onClose();
              onGoToBudget();
            }}
          >
            <FaExternalLinkAlt style={{ fontSize: "0.65rem" }} /> Kelola di
            Halaman Anggaran
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CAPEX BUDGET CARD (ringkasan, clean)
───────────────────────────────────────────────────────────────── */
const CapexBudgetCard = ({ selectedYear, onOpenDetail }) => {
  const yr = parseInt(selectedYear);

  // Composite: ambil semua program, tapi highlight yg aktif di tahun ini
  const programs = useMemo(
    () =>
      mockCapexPrograms.map((p) => {
        const totalRealisasi = p.realisasi_per_tahun.reduce(
          (s, r) => s + r.realisasi,
          0,
        );
        const pct =
          p.nilai_anggaran > 0 ? (totalRealisasi / p.nilai_anggaran) * 100 : 0;
        const isActiveThisYear =
          !isNaN(yr) && p.thn_rkap_awal <= yr && p.thn_rkap_akhir >= yr;
        return { ...p, totalRealisasi, pct, isActiveThisYear };
      }),
    [selectedYear],
  );

  // Composit total: SEMUA program (karena CAPEX multi-year tidak di-filter per tahun)
  const grandAnggaran = programs.reduce((s, p) => s + p.nilai_anggaran, 0);
  const grandRealisasi = programs.reduce((s, p) => s + p.totalRealisasi, 0);
  const grandPct =
    grandAnggaran > 0 ? (grandRealisasi / grandAnggaran) * 100 : 0;

  // Tampilkan 3 program aktif di tahun ini (atau semua jika all)
  const shownPrograms = programs
    .filter((p) => (isNaN(yr) ? true : p.isActiveThisYear))
    .slice(0, 3);

  const activeCount = programs.filter((p) =>
    isNaN(yr) ? true : p.isActiveThisYear,
  ).length;

  return (
    <div className="budget-section-card">
      <div className="bsc-header">
        <div>
          <div className="bsc-type-tag capex">CAPEX · Multi-Year</div>
          <div className="bsc-title">Komposit Program CAPEX</div>
          <div className="bsc-meta">
            {isNaN(yr)
              ? `${mockCapexPrograms.length} program · Semua Tahun`
              : `${activeCount} program aktif ${selectedYear} dari ${mockCapexPrograms.length} total`}
          </div>
        </div>
        <div className="bsc-amount">
          <div className="bsc-amount-lbl">Total RKAP</div>
          <div className="bsc-amount-val">
            {formatRupiahShort(grandAnggaran)}
          </div>
        </div>
      </div>

      {/* Overall composite progress */}
      <div className="pct-row">
        <span className="pct-label">Serapan Komposit</span>
        <span className="pct-value" style={{ color: "#1a56db" }}>
          {grandPct.toFixed(1)}%
        </span>
      </div>
      <div className="prog-track" style={{ marginBottom: 10 }}>
        <div
          className="prog-fill"
          style={{
            width: `${Math.min(grandPct, 100)}%`,
            background: "linear-gradient(90deg,#1a56db,#3b82f6)",
          }}
        />
      </div>
      <div style={{ fontSize: "0.72rem", color: "#8899b0", marginBottom: 14 }}>
        Realisasi:{" "}
        <strong style={{ color: "#0a1628" }}>
          {formatRupiahShort(grandRealisasi)}
        </strong>
        &nbsp;·&nbsp; Sisa:{" "}
        <strong style={{ color: "#ef4444" }}>
          {formatRupiahShort(grandAnggaran - grandRealisasi)}
        </strong>
      </div>

      <div className="divider" style={{ margin: "0 0 12px" }} />

      {/* Slide pager for program items */}
      <SlidePager
        items={programs.filter((p) => (isNaN(yr) ? true : p.isActiveThisYear))}
        itemKey="id"
        renderItem={(p) => {
          const cfg = statusCfg[p.status] || statusCfg.belum;
          const isMulti = p.thn_rkap_awal !== p.thn_rkap_akhir;
          return (
            <div className="capex-item">
              <div className="capex-item-header">
                <div className="capex-item-name" title={p.nm_anggaran_capex}>
                  {p.nm_anggaran_capex}
                </div>
                <div className="capex-item-badges">
                  <span className={`ci-badge ${p.status}`}>{cfg.label}</span>
                  {isMulti && (
                    <span className="ci-badge multi">Multi-Year</span>
                  )}
                </div>
              </div>
              <div className="capex-item-amounts">
                <span>
                  RKAP: <strong>{formatRupiahShort(p.nilai_anggaran)}</strong>
                </span>
                <span>
                  Realisasi:{" "}
                  <strong>{formatRupiahShort(p.totalRealisasi)}</strong>
                </span>
                <strong style={{ color: cfg.color }}>
                  {p.pct.toFixed(1)}%
                </strong>
              </div>
              <div className="prog-track" style={{ height: "4px" }}>
                <div
                  className="prog-fill"
                  style={{
                    width: `${Math.min(p.pct, 100)}%`,
                    background: cfg.color,
                  }}
                />
              </div>
            </div>
          );
        }}
      />

      <button className="detail-btn" onClick={onOpenDetail}>
        <FaChevronDown style={{ fontSize: "0.65rem" }} /> Lihat Detail{" "}
        {activeCount} Program
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   OPEX BUDGET CARD (ringkasan, clean)
───────────────────────────────────────────────────────────────── */
const OpexBudgetCard = ({ tahun, onOpenDetail }) => {
  const dataOpex = mockOpexPerTahun[tahun] ?? [];
  const totalRkap = dataOpex.reduce((s, o) => s + o.rkap, 0);
  const totalReal = dataOpex.reduce((s, o) => s + o.realisasi, 0);
  const pct = totalRkap > 0 ? (totalReal / totalRkap) * 100 : 0;
  const color = pct >= 100 ? "#ef4444" : pct >= 80 ? "#f59e0b" : "#16a34a";

  return (
    <div className="budget-section-card">
      <div className="bsc-header">
        <div>
          <div className="bsc-type-tag opex">OPEX · Per Tahun</div>
          <div className="bsc-title">Realisasi vs RKAP</div>
          <div className="bsc-meta">
            Tahun {tahun} · {dataOpex.length} pos anggaran
          </div>
        </div>
        <div className="bsc-amount">
          <div className="bsc-amount-lbl">Total Anggaran</div>
          <div className="bsc-amount-val" style={{ color: "#16a34a" }}>
            {formatRupiahShort(totalRkap)}
          </div>
        </div>
      </div>

      {/* Overall */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: "1.45rem",
            fontWeight: 800,
            color,
            letterSpacing: "-0.5px",
          }}
        >
          {formatRupiahShort(totalReal)}
        </span>
        <span style={{ fontSize: "0.78rem", color: "#8899b0" }}>
          / {formatRupiahShort(totalRkap)}
        </span>
      </div>
      <div className="prog-track" style={{ marginBottom: 6 }}>
        <div
          className="prog-fill"
          style={{ width: `${Math.min(pct, 100)}%`, background: color }}
        />
      </div>
      <div style={{ fontSize: "0.72rem", color: "#8899b0", marginBottom: 14 }}>
        <strong style={{ color }}>{pct.toFixed(1)}%</strong> terserap
        &nbsp;·&nbsp; Sisa:{" "}
        <strong>{formatRupiahShort(totalRkap - totalReal)}</strong>
      </div>

      <div className="divider" style={{ margin: "0 0 12px" }} />

      {/* Mini bars per pos */}
      <SlidePager
        items={dataOpex}
        itemKey="id"
        renderItem={(opex) => {
          const p = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
          const c = p >= 100 ? "#ef4444" : p >= 80 ? "#f59e0b" : "#16a34a";
          return (
            <div className="bitem">
              <div className="bitem-dot" style={{ background: c }} />
              <div className="bitem-name">
                {opex.nama.replace("Beban ", "")}
              </div>
              <div className="bitem-bar">
                <div className="prog-track" style={{ height: "5px" }}>
                  <div
                    className="prog-fill"
                    style={{ width: `${Math.min(p, 100)}%`, background: c }}
                  />
                </div>
              </div>
              <div className="bitem-pct" style={{ color: c }}>
                {p.toFixed(0)}%
              </div>
            </div>
          );
        }}
      />

      <button className="detail-btn green" onClick={onOpenDetail}>
        <FaChevronDown style={{ fontSize: "0.65rem" }} /> Lihat Detail{" "}
        {dataOpex.length} Pos Anggaran
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   DONUT LABEL
───────────────────────────────────────────────────────────────── */
const CustomDonutLabel = ({ viewBox }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="#0a1628"
        fontSize="1.2rem"
        fontWeight="800"
      >
        {totalKondisi.toLocaleString()}
      </text>
      <text
        x={cx}
        y={cy + 13}
        textAnchor="middle"
        fill="#a0b0c8"
        fontSize="0.66rem"
        fontWeight="600"
      >
        TOTAL ASET
      </text>
    </g>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────────────────────────── */
const tahunOptions = ["2023", "2024", "2025", "2026"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [filterTren, setFilterTren] = useState("bulanan");
  const [tahunAnggaran, setTahunAnggaran] = useState("2026");
  const [modal, setModal] = useState(null); // "capex" | "opex"

  const dataTren =
    filterTren === "harian" ? dataPeminjamanHarian : dataPeminjamanBulanan;
  const opexTahunIni = mockOpexPerTahun[tahunAnggaran] ?? [];
  const alerts = useMemo(() => calculateAlerts(opexTahunIni), [tahunAnggaran]);
  const highCount = alerts.filter((a) => a.priority === "high").length;
  const totalAlerts = alerts.length;

  return (
    <>
      <style>{css}</style>
      <div className="db-wrap">
        {/* ── 1. HEADER ── */}
        <div className="db-header">
          <div>
            <h1 className="db-title">Dashboard Overview</h1>
            <p className="db-subtitle">
              Monitoring Aset &amp; Anggaran · PT Pelindo Multi Terminal
            </p>
          </div>
          <div>
            <div
              style={{
                fontSize: "0.64rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "#a0b0c8",
                marginBottom: 6,
                textAlign: "right",
              }}
            >
              Tahun Anggaran
            </div>
            <div className="year-picker">
              {tahunOptions.map((t) => (
                <button
                  key={t}
                  className={`year-btn${tahunAnggaran === t ? " active" : ""}`}
                  onClick={() => setTahunAnggaran(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2. STATS CARDS ── */}
        <div className="section-label">Ringkasan Aset</div>
        <div className="stats-row">
          {[
            {
              title: "Total Aset",
              value: "1,245",
              icon: <FaBox />,
              color: "#1a56db",
              bg: "#dbeafe",
              sub: "Unit terdaftar",
            },
            {
              title: "Available",
              value: "980",
              icon: <FaCheckCircle />,
              color: "#16a34a",
              bg: "#dcfce7",
              sub: "Siap digunakan",
            },
            {
              title: "Dalam Pemeliharaan",
              value: "15",
              icon: <FaTools />,
              color: "#d97706",
              bg: "#fef3c7",
              sub: "Sedang diperbaiki",
            },
          ].map((s) => (
            <div key={s.title} className="stat-card">
              <div
                className="stat-icon"
                style={{ background: s.bg, color: s.color }}
              >
                {s.icon}
              </div>
              <div>
                <div className="stat-label">{s.title}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. BUDGET — ringkasan clean ── */}
        <div className="section-label">Anggaran</div>
        <div className="budget-grid">
          <CapexBudgetCard
            selectedYear={tahunAnggaran}
            onOpenDetail={() => setModal("capex")}
          />
          <OpexBudgetCard
            tahun={tahunAnggaran}
            onOpenDetail={() => setModal("opex")}
          />
        </div>

        {/* ── 4. CHARTS ── */}
        <div className="section-label">Analitik</div>
        <div className="chart-grid">
          {/* Tren peminjaman */}
          <div className="card">
            <div className="card-header-row">
              <div>
                <div className="card-title">Tren Peminjaman per Kategori</div>
                <div className="card-subtitle">
                  Volume peminjaman berdasarkan tipe aset
                </div>
              </div>
              <div className="toggle-pill">
                {["harian", "bulanan"].map((f) => (
                  <button
                    key={f}
                    className={`toggle-btn${filterTren === f ? " active" : ""}`}
                    onClick={() => setFilterTren(f)}
                  >
                    {f === "harian" ? "Per Hari" : "Per Bulan"}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 12,
              }}
            >
              {kategoriLines.map((k) => (
                <div
                  key={k.key}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: k.color,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.73rem",
                      color: "#64748b",
                      fontWeight: 500,
                    }}
                  >
                    {k.key}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTren}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#a0b0c8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#a0b0c8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "none",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  />
                  {kategoriLines.map((k) => (
                    <Line
                      key={k.key}
                      type="monotone"
                      dataKey={k.key}
                      stroke={k.color}
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Kondisi aset */}
          <div className="card">
            <div className="card-header-row" style={{ marginBottom: 8 }}>
              <div>
                <div className="card-title">Kondisi Aset</div>
                <div className="card-subtitle">Distribusi status kondisi</div>
              </div>
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataKondisi}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={82}
                    paddingAngle={4}
                    dataKey="value"
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                    }) => {
                      const r = Math.PI / 180,
                        rad = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + rad * Math.cos(-midAngle * r),
                        y = cy + rad * Math.sin(-midAngle * r);
                      return percent > 0.05 ? (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="0.67rem"
                          fontWeight="700"
                        >
                          {(percent * 100).toFixed(1)}%
                        </text>
                      ) : null;
                    }}
                  >
                    {dataKondisi.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                    <Label content={<CustomDonutLabel />} position="center" />
                  </Pie>
                  <Tooltip
                    formatter={(v, n) => [
                      `${v.toLocaleString()} unit (${((v / totalKondisi) * 100).toFixed(1)}%)`,
                      n,
                    ]}
                    contentStyle={{
                      borderRadius: 10,
                      border: "none",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="divider" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {dataKondisi.map((item) => {
                const pct = ((item.value / totalKondisi) * 100).toFixed(1);
                return (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <div
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: item.color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.77rem",
                          color: "#475569",
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <span
                        style={{
                          fontSize: "0.77rem",
                          fontWeight: 700,
                          color: "#0a1628",
                        }}
                      >
                        {item.value.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "0.67rem",
                          color: "white",
                          fontWeight: 700,
                          background: item.color,
                          padding: "2px 7px",
                          borderRadius: 99,
                          minWidth: 38,
                          textAlign: "center",
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 5. ALERTS ── */}
        <div className="section-label">Notifikasi &amp; Peringatan</div>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <div>
              <div className="card-title">⚠️ Smart Alerts</div>
              <div className="card-subtitle">
                Deteksi otomatis kondisi yang memerlukan perhatian
              </div>
            </div>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 99,
                background:
                  totalAlerts === 0
                    ? "#dcfce7"
                    : highCount > 0
                      ? "#fee2e2"
                      : "#fef3c7",
                color:
                  totalAlerts === 0
                    ? "#16a34a"
                    : highCount > 0
                      ? "#ef4444"
                      : "#f59e0b",
              }}
            >
              {totalAlerts === 0
                ? "Semua Normal ✓"
                : highCount > 0
                  ? `${highCount} Prioritas Tinggi · ${totalAlerts} Total`
                  : `${totalAlerts} Perlu Tindakan`}
            </span>
          </div>
          {totalAlerts === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "28px 0",
                color: "#a0b0c8",
                fontSize: "0.87rem",
              }}
            >
              Tidak ada alert. Semua kondisi normal.
            </div>
          )}
          <div className="alert-list">
            {alerts.map((alert) => {
              const s = ALERT_STYLE[alert.type] ?? {
                icon: <FaExclamationTriangle />,
                bg: "#fee2e2",
                color: "#ef4444",
              };
              return (
                <div key={alert.id} className="alert-item">
                  <div
                    className="alert-icon"
                    style={{ background: s.bg, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-text">{alert.message}</div>
                  </div>
                  <button
                    className="alert-btn"
                    onClick={() => navigate(alert.action_path)}
                  >
                    {alert.action_label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      {modal === "capex" && (
        <CapexDetailModal
          programs={mockCapexPrograms}
          selectedYear={tahunAnggaran}
          onClose={() => setModal(null)}
          onGoToBudget={() => navigate("/budget")}
        />
      )}
      {modal === "opex" && (
        <OpexDetailModal
          opexData={mockOpexPerTahun[tahunAnggaran] ?? []}
          tahun={tahunAnggaran}
          onClose={() => setModal(null)}
          onGoToBudget={() => navigate("/budget")}
        />
      )}
    </>
  );
};

export default Dashboard;
