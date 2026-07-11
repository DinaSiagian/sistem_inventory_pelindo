import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { barangAPI, transactionAPI, budgetAPI, masterDataAPI } from "../services/api";
import { useEffect } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTools,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaTimes,
  FaExternalLinkAlt,
  FaPlus,
  FaExclamationTriangle,
  FaTimesCircle,
  FaBalanceScale
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
   GLOBAL STYLES (Modern Tab & Bento Grid Layout)
───────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body, .db-wrap { font-family: 'DM Sans', system-ui, sans-serif; }

.db-wrap {
  min-height: 100vh;
  background: #f8fafc;
  padding: 40px 48px 80px;
  max-width: 1440px;
  margin: 0 auto;
}

/* ── Header & Quick Actions ── */
.db-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 24px; gap: 24px; flex-wrap: wrap;
}
.db-title { font-size: 2rem; font-weight: 800; color: #0f172a; letter-spacing: -0.8px; }
.db-subtitle { font-size: 1rem; color: #64748b; margin-top: 6px; font-weight: 500; }

.header-actions { display: flex; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
.action-group { display: flex; flex-direction: column; gap: 6px; }
.action-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; text-align: right; }

/* Year picker */
.year-picker {
  display: flex; background: white; border-radius: 14px; padding: 4px; gap: 4px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.02); border: 1px solid #f1f5f9;
}
.year-btn {
  padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer;
  font-size: 0.9rem; font-weight: 600; transition: all 0.2s ease;
  font-family: inherit; color: #64748b; background: transparent;
}
.year-btn.active { background: #1a56db; color: white; box-shadow: 0 4px 12px rgba(26,86,219,0.2); }

/* Primary Button (Quick Action) */
.btn-primary {
  display: flex; align-items: center; gap: 8px;
  background: #1a56db; color: white; padding: 12px 24px; border-radius: 14px;
  font-weight: 700; font-size: 0.9rem; border: none; cursor: pointer; font-family: inherit;
  box-shadow: 0 4px 12px rgba(26,86,219,0.2); transition: all 0.2s; height: 45px;
}
.btn-primary:hover { background: #1e40af; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(26,86,219,0.3); }

/* ── Tabs Navigation ── */
.tab-container {
  display: flex; gap: 32px; border-bottom: 2px solid #e2e8f0; margin-bottom: 32px;
}
.tab-btn {
  padding: 12px 4px; font-size: 1.05rem; font-weight: 700; color: #94a3b8;
  background: none; border: none; cursor: pointer; font-family: inherit;
  border-bottom: 3px solid transparent; transition: all 0.2s;
  position: relative; top: 2px;
}
.tab-btn:hover { color: #475569; }
.tab-btn.active { color: #1a56db; border-bottom-color: #1a56db; }

/* ── Stats row (Bento Top) ── */
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
.stat-card {
  background: white; border-radius: 24px; padding: 24px 28px;
  display: flex; align-items: center; gap: 20px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.015); border: 1px solid #f8fafc;
  transition: transform 0.2s, box-shadow 0.2s;
}
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.04); }
.stat-icon {
  width: 56px; height: 56px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0;
}
.stat-label { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 6px; }
.stat-value { font-size: 2.2rem; font-weight: 800; color: #0f172a; line-height: 1; letter-spacing: -1px; }
.stat-sub { font-size: 0.85rem; color: #94a3b8; font-weight: 500; margin-top: 6px; }

/* ── Bento Grid ── */
.bento-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 24px; margin-bottom: 24px; }
.bento-grid-equal { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }

/* ── Card base ── */
.card { background: white; border-radius: 24px; padding: 28px; box-shadow: 0 2px 20px rgba(0,0,0,0.015); border: 1px solid #f8fafc; display: flex; flex-direction: column; }
.card-title { font-size: 1.15rem; font-weight: 800; color: #0f172a; }
.card-subtitle { font-size: 0.85rem; color: #64748b; font-weight: 500; margin-top: 6px; }
.card-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; gap: 16px; }

/* ── Budget Section Components ── */
.bsc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; gap: 16px;}
.bsc-type-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 8px;
}
.bsc-type-tag.capex { background: #eff6ff; color: #1d4ed8; }
.bsc-type-tag.opex  { background: #f0fdf4; color: #16a34a; }
.bsc-title { font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; line-height: 1.3; }
.bsc-meta  { font-size: 0.85rem; color: #64748b; }

.bsc-amount { text-align: right; }
.bsc-amount-lbl { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 6px; }
.bsc-amount-val { font-size: 1.6rem; font-weight: 800; color: #1a56db; letter-spacing: -0.5px; }

.prog-track { height: 8px; border-radius: 99px; background: #f1f5f9; overflow: hidden; }
.prog-fill  { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(.4,0,.2,1); }

.pct-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
.pct-label { font-size: 0.9rem; font-weight: 600; color: #64748b; }
.pct-value { font-size: 0.95rem; font-weight: 800; }

.detail-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: 12px; border: 1.5px solid #e2e8f0;
  background: white; font-size: 0.85rem; font-weight: 700; color: #1a56db;
  cursor: pointer; transition: all 0.2s; font-family: inherit;
  margin-top: 24px; align-self: flex-start;
}
.detail-btn:hover { background: #eff6ff; border-color: #bfdbfe; }
.detail-btn.green { color: #16a34a; }
.detail-btn.green:hover { background: #f0fdf4; border-color: #bbf7d0; }

/* ── Slide pager ── */
.pager-wrap { position: relative; overflow: hidden; margin-bottom: 0; }
.pager-track { display: flex; transition: transform 0.38s cubic-bezier(.4,0,.2,1); }
.pager-slide { min-width: 100%; width: 100%; flex-shrink: 0; padding-bottom: 4px;}
.pager-dots { display: flex; justify-content: center; align-items: center; gap: 6px; margin-top: 12px; }
.pager-dot { width: 8px; height: 8px; border-radius: 99px; background: #cbd5e1; border: none; padding: 0; cursor: pointer; transition: all 0.2s; }
.pager-dot.active { width: 24px; background: #1a56db; }
.pager-nav { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
.pnav-btn {
  width: 34px; height: 34px; border-radius: 10px; border: 1.5px solid #e2e8f0;
  background: white; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; transition: all 0.2s;
}
.pnav-btn:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; color: #1a56db; }
.pnav-btn:disabled { opacity: 0.35; cursor: not-allowed; }

/* ── Lists ── */
.bitem { display: flex; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid transparent; }
.bitem-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.bitem-name { font-size: 0.9rem; color: #334155; font-weight: 600; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bitem-bar { flex: 0 0 80px; }
.bitem-pct { font-size: 0.85rem; font-weight: 800; min-width: 36px; text-align: right; flex-shrink: 0; }

.capex-item { border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px 24px; margin-bottom: 12px; background: #ffffff; box-shadow: 0 2px 12px rgba(0,0,0,0.01); }
.capex-item:last-child { margin-bottom: 0; }
.capex-item-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
.capex-item-name { font-size: 0.9rem; font-weight: 700; color: #0f172a; flex: 1; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.capex-item-badges { display: flex; gap: 6px; flex-wrap: wrap; flex-shrink: 0; }
.ci-badge { font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 99px; }
.ci-badge.selesai { background: #dcfce7; color: #16a34a; }
.ci-badge.berjalan { background: #dbeafe; color: #1d4ed8; }
.ci-badge.multi { background: #fef3c7; color: #d97706; }
.capex-item-amounts { display: flex; justify-content: space-between; font-size: 0.85rem; color: #64748b; margin-bottom: 10px; }
.capex-item-amounts strong { color: #0f172a; font-weight: 800; }

.toggle-pill { display: flex; background: #f1f5f9; border-radius: 12px; padding: 4px; gap: 4px; flex-shrink: 0; }
.toggle-btn { padding: 8px 16px; border-radius: 10px; border: none; cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s; font-family: inherit; color: #64748b; background: transparent; }
.toggle-btn.active { background: white; color: #1a56db; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }

/* ── Alerts ── */
.alert-list { display: flex; flex-direction: column; gap: 16px; }
.alert-item { display: flex; align-items: flex-start; gap: 16px; padding: 20px; border-radius: 16px; background: white; border: 1px solid #f1f5f9; transition: transform 0.2s, box-shadow 0.2s; }
.alert-item:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.04); }
.alert-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; margin-top: 2px; }
.alert-title { font-size: 1rem; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
.alert-text  { font-size: 0.85rem; color: #64748b; line-height: 1.6; }
.alert-btn { margin-left: auto; flex-shrink: 0; padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; font-size: 0.85rem; font-weight: 700; color: #1a56db; cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap; align-self: flex-start; }
.alert-btn:hover { background: #1a56db; color: white; border-color: #1a56db; }

/* ── MODAL OVERLAY ── */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); padding: 24px; animation: fadeIn 0.2s ease; }
.modal-box { background: white; border-radius: 24px; width: 100%; max-width: 720px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.15); animation: slideUp 0.3s cubic-bezier(.16,1,.3,1); }
.modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 32px 36px 24px; border-bottom: 1px solid #f1f5f9; flex-shrink: 0; }
.modal-header-left { display: flex; flex-direction: column; gap: 6px; }
.modal-title { font-size: 1.25rem; font-weight: 800; color: #0f172a; }
.modal-subtitle { font-size: 0.9rem; color: #64748b; }
.modal-close { width: 36px; height: 36px; border-radius: 12px; border: 1px solid #e2e8f0; background: white; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: all 0.2s; flex-shrink: 0; }
.modal-close:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }
.modal-body { padding: 24px 36px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 24px; }
.modal-footer { padding: 20px 36px; border-top: 1px solid #f1f5f9; flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; }

/* Modal Elements */
.modal-summary-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 8px; }
.mss-item { background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 16px 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.01); }
.mss-lbl { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 6px; }
.mss-val { font-size: 1.2rem; font-weight: 800; }
.mprogram-row { border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden; background: white; }
.mpr-head { display: flex; align-items: flex-start; gap: 12px; padding: 16px 20px; background: #fafbfe; }
.mpr-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
.mpr-name { font-size: 0.95rem; font-weight: 700; color: #0f172a; flex: 1; line-height: 1.5; }
.mpr-right { text-align: right; flex-shrink: 0; }
.mpr-val { font-size: 0.95rem; font-weight: 800; color: #0f172a; }
.mpr-sub { font-size: 0.8rem; color: #94a3b8; margin-top: 4px; }
.mpr-pct { font-size: 0.85rem; font-weight: 800; margin-top: 4px; }
.mpr-body { padding: 16px 20px; border-top: 1px solid #f1f5f9; }
.mpr-year-row { display: flex; align-items: center; gap: 12px; padding: 6px 0; }
.mpr-year-lbl { font-size: 0.85rem; font-weight: 700; color: #1a56db; min-width: 44px; }
.mpr-year-val { font-size: 0.85rem; font-weight: 700; color: #334155; min-width: 90px; text-align: right; }
.mopex-row { border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden; margin-bottom: 12px; background: white;}
.mopex-row:last-child { margin-bottom: 0; }
.mopex-head { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: #f8fafc; }
.mopex-name { font-size: 0.95rem; font-weight: 700; color: #0f172a; flex: 1; }
.mopex-amounts { display: flex; gap: 24px; flex-shrink: 0; }
.mopex-amount { text-align: right; }
.mopex-amount .lbl { font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;}
.mopex-amount .val { font-size: 0.95rem; font-weight: 800; }
.mopex-trx { padding: 12px 20px; border-top: 1px solid #f1f5f9; }
.mopex-trx-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; }
.mopex-trx-item:last-child { border-bottom: none; }
.trx-ket { font-size: 0.85rem; color: #334155; font-weight: 600; margin-bottom: 4px;}
.trx-date { font-size: 0.75rem; color: #94a3b8; }
.trx-val { font-size: 0.9rem; font-weight: 800; color: #d97706; white-space: nowrap; }
.divider { height: 1px; background: #f1f5f9; margin: 24px 0; }
.go-budget-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 12px; border: none; background: #1a56db; color: white; font-size: 0.85rem; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; box-shadow: 0 4px 12px rgba(26,86,219,0.2); }
.go-budget-btn:hover { background: #1648c4; transform: translateY(-1px); }
.thin-scroll { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

/* Responsive */
@media (max-width: 1024px) { .bento-grid, .bento-grid-equal { grid-template-columns: 1fr; } .stats-row { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) { .db-wrap { padding: 24px 20px 60px; } .stats-row { grid-template-columns: 1fr; } .modal-summary-strip { grid-template-columns: 1fr; } .db-header { flex-direction: column; align-items: stretch; gap: 16px; } .header-actions { flex-direction: column; align-items: stretch; } .action-label { text-align: left; } .year-picker { justify-content: space-between; } .year-btn { flex: 1; text-align: center; } .tab-container { overflow-x: auto; white-space: nowrap; padding-bottom: 4px; } }
`;

/* ─────────────────────────────────────────────────────────────────
   MOCK DATA 100% LENGKAP
───────────────────────────────────────────────────────────────── */
const dataPeminjamanHarian = []; // Removed mock data, now dynamically generated
const dataPeminjamanBulanan = []; // Removed mock data, now dynamically generated
const kategoriLines = []; // Removed mock data, now dynamically generated

const dataKondisi = [
  { name: "Baik", value: 850, color: "#22c55e" },
  { name: "Dalam Pemeliharaan", value: 80, color: "#3b82f6" },
  { name: "Rusak Berat", value: 45, color: "#ef4444" },
  { name: "Rusak Ringan", value: 120, color: "#f59e0b" },
];
const totalKondisi = dataKondisi.reduce((s, d) => s + d.value, 0);

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

const mockOpexPerTahun = {
  2023: [
    { id: 1, nama: "Beban Pemeliharaan Software", rkap: 400000000, realisasi: 400000000, transaksi: [] },
    { id: 2, nama: "Beban Jaringan dan Koneksi Data", rkap: 500000000, realisasi: 498000000, transaksi: [] },
    { id: 3, nama: "Beban Perlengkapan Kantor", rkap: 600000000, realisasi: 590000000, transaksi: [] },
    { id: 4, nama: "Beban Jasa Konsultan", rkap: 700000000, realisasi: 695000000, transaksi: [] },
    { id: 5, nama: "Beban SDM Pihak Ketiga", rkap: 800000000, realisasi: 780000000, transaksi: [] },
  ],
  2024: [
    { id: 1, nama: "Beban Pemeliharaan Software", rkap: 450000000, realisasi: 440000000, transaksi: [] },
    { id: 2, nama: "Beban Jaringan dan Koneksi Data", rkap: 550000000, realisasi: 530000000, transaksi: [] },
    { id: 3, nama: "Beban Perlengkapan Kantor", rkap: 650000000, realisasi: 620000000, transaksi: [] },
    { id: 4, nama: "Beban Jasa Konsultan", rkap: 750000000, realisasi: 740000000, transaksi: [] },
    { id: 5, nama: "Beban SDM Pihak Ketiga", rkap: 850000000, realisasi: 810000000, transaksi: [] },
  ],
  2025: [
    { id: 1, nama: "Beban Pemeliharaan Software", rkap: 500000000, realisasi: 420000000, transaksi: [] },
    { id: 2, nama: "Beban Jaringan dan Koneksi Data", rkap: 600000000, realisasi: 510000000, transaksi: [] },
    { id: 3, nama: "Beban Perlengkapan Kantor", rkap: 700000000, realisasi: 580000000, transaksi: [] },
    { id: 4, nama: "Beban Jasa Konsultan", rkap: 800000000, realisasi: 720000000, transaksi: [] },
    { id: 5, nama: "Beban SDM Pihak Ketiga", rkap: 900000000, realisasi: 760000000, transaksi: [] },
    { id: 6, nama: "Beban Lisensi & Subscription", rkap: 300000000, realisasi: 280000000, transaksi: [] },
  ],
  2026: [
    {
      id: 1,
      nama: "Beban Pemeliharaan Software",
      rkap: 500000000,
      realisasi: 85000000,
      transaksi: [
        { id: "t1", tanggal: "2026-01-15", keterangan: "Lisensi Office 365", no_invoice: "INV/2026/001", jumlah: 85000000 },
      ],
    },
    {
      id: 2,
      nama: "Beban Jaringan dan Koneksi Data",
      rkap: 600000000,
      realisasi: 240000000,
      transaksi: [
        { id: "t2", tanggal: "2026-01-05", keterangan: "Tagihan MPLS Januari", no_invoice: "INV/2026/002", jumlah: 24000000 },
      ],
    },
    { id: 3, nama: "Beban Perlengkapan Kantor", rkap: 700000000, realisasi: 45000000, transaksi: [] },
    { id: 4, nama: "Beban Jasa Konsultan", rkap: 800000000, realisasi: 400000000, transaksi: [] },
    { id: 5, nama: "Beban SDM Pihak Ketiga", rkap: 900000000, realisasi: 150000000, transaksi: [] },
    { id: 6, nama: "Beban Outsourcing IT", rkap: 450000000, realisasi: 120000000, transaksi: [] },
  ],
};

const mockBorrows = [
  { id_peminjaman: 1, asset_code: "SPMT-MLH-LPG-DMG-01", asset_name: "CCTV Hikvision Malahayati", borrower_name: "Andi Pratama", borrow_date: "2026-01-10", due_date: "2026-01-20", is_returned: true, return_condition: "GOOD" },
  { id_peminjaman: 2, asset_code: "SPMT-MLH-LPG-DMG-01", asset_name: "CCTV Hikvision Malahayati", borrower_name: "Budi Santoso", borrow_date: "2026-02-01", due_date: "2026-02-15", is_returned: true, return_condition: "MINOR_DAMAGE" },
  { id_peminjaman: 3, asset_code: "SPMT-MLH-LPG-DMG-01", asset_name: "CCTV Hikvision Malahayati", borrower_name: "Citra Dewi", borrow_date: "2026-02-20", due_date: "2026-03-01", is_returned: true, return_condition: "DAMAGED" },
  { id_peminjaman: 4, asset_code: "SPMT-LHK-DTC-PKR-02", asset_name: "Core Switch Lhokseumawe", borrower_name: "Deni Kurniawan", borrow_date: "2026-01-05", due_date: "2026-01-20", is_returned: false, return_condition: null },
  { id_peminjaman: 5, asset_code: "SPMT-GRG-DTC-PKR-01", asset_name: "Access Switch Garongkong", borrower_name: "Eka Saputra", borrow_date: "2026-02-10", due_date: "2026-02-20", is_returned: false, return_condition: null },
  { id_peminjaman: 6, asset_code: "SPMT-TBK-DTC-PKR-01", asset_name: "Core Switch Tanjung Balai Karimun", borrower_name: "Fajar Hidayat", borrow_date: "2026-02-25", due_date: "2026-03-10", is_returned: false, return_condition: null },
  { id_peminjaman: 7, asset_code: "SPMT-LHK-LPG-DMG-01", asset_name: "CCTV Hikvision Lhokseumawe", borrower_name: "Gita Rahayu", borrow_date: "2026-01-15", due_date: "2026-01-30", is_returned: true, return_condition: "MINOR_DAMAGE" },
  { id_peminjaman: 8, asset_code: "SPMT-LHK-LPG-DMG-01", asset_name: "CCTV Hikvision Lhokseumawe", borrower_name: "Hendra Wijaya", borrow_date: "2026-02-15", due_date: "2026-02-28", is_returned: true, return_condition: "MINOR_DAMAGE" },
];

/* ─────────────────────────────────────────────────────────────────
   HELPERS & ALERTS
───────────────────────────────────────────────────────────────── */
const formatRupiah = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);
const formatRupiahShort = (v) => {
  if (v >= 1_000_000_000) return `Rp ${Number((v / 1_000_000_000).toFixed(2))} M`;
  if (v >= 1_000_000) return `Rp ${Number((v / 1_000_000).toFixed(2))} Jt`;
  return formatRupiah(v);
};
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const statusCfg = {
  selesai: { color: "#16a34a", bg: "#dcfce7", label: "Selesai" },
  berjalan: { color: "#1a56db", bg: "#dbeafe", label: "Berjalan" },
  belum: { color: "#94a3b8", bg: "#f1f5f9", label: "Belum Mulai" },
};



/* ─────────────────────────────────────────────────────────────────
   SLIDE PAGER component
───────────────────────────────────────────────────────────────── */
const ITEMS_PER_PAGE = 3;
function SlidePager({ items, renderItem, itemKey }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const slice = items.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="pager-wrap">
        <div className="pager-track" style={{ transform: `translateX(0)` }}>
          <div className="pager-slide">
            {slice.map((item, i) => (<div key={item[itemKey] ?? i}>{renderItem(item, i)}</div>))}
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <div className="pager-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} className={`pager-dot${page === i ? " active" : ""}`} onClick={() => setPage(i)} />
            ))}
          </div>
          <div className="pager-nav">
            <button className="pnav-btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)}><FaChevronLeft /></button>
            <button className="pnav-btn" disabled={page === totalPages - 1} onClick={() => setPage((p) => p + 1)}><FaChevronRight /></button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CAPEX DETAIL MODAL (FULL)
───────────────────────────────────────────────────────────────── */
function CapexDetailModal({ programs, selectedYear, onClose, onGoToBudget }) {
  const { displayed, totalCount } = useMemo(() => {
    const yr = parseInt(selectedYear);
    let filtered = programs;
    if (!isNaN(yr)) {
      filtered = programs.filter(
        (p) => p.thn_rkap_awal <= yr && p.thn_rkap_akhir >= yr
      );
    }
    const totalCount = filtered.length;
    const sorted = [...filtered].sort((a, b) => {
      const ar = a.realisasi_per_tahun.reduce((s, r) => s + r.realisasi, 0);
      const br = b.realisasi_per_tahun.reduce((s, r) => s + r.realisasi, 0);
      return br - ar;
    });
    return { displayed: sorted.slice(0, 3), totalCount };
  }, [programs, selectedYear]);

  const grandAnggaran = programs.reduce((s, p) => s + p.nilai_anggaran, 0);
  const grandRealisasi = programs.reduce(
    (s, p) => p.realisasi_per_tahun.reduce((ss, r) => ss + r.realisasi, 0) + s,
    0,
  );
  const grandPct = grandAnggaran > 0 ? (grandRealisasi / grandAnggaran) * 100 : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span className="bsc-type-tag capex">CAPEX</span>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600 }}>Multi-Year Composite</span>
              </div>
              <div className="modal-title">Detail Anggaran CAPEX</div>
              <div className="modal-subtitle">
                {programs.length} program · {selectedYear !== "all" ? `Aktif di ${selectedYear}` : "Semua Tahun"}
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="modal-body thin-scroll">
          <div className="modal-summary-strip">
            <div className="mss-item">
              <div className="mss-lbl">Total Nilai KAD</div>
              <div className="mss-val" style={{ color: "#1a56db" }}>{formatRupiahShort(grandAnggaran)}</div>
            </div>
            <div className="mss-item">
              <div className="mss-lbl">Total Kontrak</div>
              <div className="mss-val" style={{ color: "#16a34a" }}>{formatRupiahShort(grandRealisasi)}</div>
            </div>
            <div className="mss-item">
              <div className="mss-lbl">Serapan Komposit</div>
              <div className="mss-val" style={{ color: grandPct >= 80 ? "#d97706" : "#1a56db" }}>{Number(grandPct.toFixed(2))}%</div>
            </div>
          </div>

          <div>
            <div className="pct-row">
              <span className="pct-label">Total Serapan</span>
              <span className="pct-value" style={{ color: "#1a56db" }}>{Number(grandPct.toFixed(2))}%</span>
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${Math.min(grandPct, 100)}%`, background: "linear-gradient(90deg, #1a56db, #3b82f6)" }} />
            </div>
          </div>

          <div className="divider" style={{ margin: "12px 0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {displayed.map((p) => {
              const totalReal = p.realisasi_per_tahun.reduce((s, r) => s + r.realisasi, 0);
              const pct = p.nilai_anggaran > 0 ? (totalReal / p.nilai_anggaran) * 100 : 0;
              const cfg = statusCfg[p.status] || statusCfg.belum;
              const isMulti = p.thn_rkap_awal !== p.thn_rkap_akhir;
              return (
                <div key={p.id} className="mprogram-row">
                  <div className="mpr-head">
                    <div className="mpr-dot" style={{ background: cfg.color }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                        <span className={`ci-badge ${p.status}`}>{cfg.label}</span>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "#f1f5f9", color: "#64748b" }}>
                          RKAP {p.thn_rkap_awal}{isMulti ? `–${p.thn_rkap_akhir}` : ""}
                        </span>
                        {isMulti && <span className="ci-badge multi">Multi-Year</span>}
                      </div>
                      <div className="mpr-name">{p.nm_anggaran_capex}</div>
                      <div className="prog-track" style={{ marginTop: 12, height: "6px" }}>
                        <div className="prog-fill" style={{ width: `${Math.min(pct, 100)}%`, background: cfg.color }} />
                      </div>
                    </div>
                    <div className="mpr-right">
                      <div className="mpr-val">{formatRupiahShort(totalReal)}</div>
                      <div className="mpr-sub">/ {formatRupiahShort(p.nilai_anggaran)}</div>
                      <div className="mpr-pct" style={{ color: cfg.color }}>{Number(pct.toFixed(2))}%</div>
                    </div>
                  </div>
                  {p.realisasi_per_tahun.length > 0 && (
                    <div className="mpr-body">
                      {p.realisasi_per_tahun.map((r, i) => {
                        const rowPct = p.nilai_anggaran > 0 ? (r.realisasi / p.nilai_anggaran) * 100 : 0;
                        return (
                          <div key={i} className="mpr-year-row">
                            <span className="mpr-year-lbl">{r.tahun}</span>
                            <div className="prog-track" style={{ flex: 1, height: "5px" }}>
                              <div className="prog-fill" style={{ width: `${Math.min(rowPct, 100)}%`, background: "#93c5fd" }} />
                            </div>
                            <span className="mpr-year-val">{formatRupiahShort(r.realisasi)}</span>
                            <span style={{ fontSize: "0.8rem", color: "#94a3b8", minWidth: 40, textAlign: "right", fontWeight: 600 }}>
                              ({Number(rowPct.toFixed(2))}%)
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
          <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Menampilkan 3 program teratas dari total {totalCount || 0} aktif</span>
          <button className="go-budget-btn" onClick={() => { onClose(); onGoToBudget(); }}>
            <FaExternalLinkAlt style={{ fontSize: "0.75rem" }} /> Kelola di Anggaran
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   OPEX DETAIL MODAL (FULL)
───────────────────────────────────────────────────────────────── */
function OpexDetailModal({ opexData, tahun, onClose, onGoToBudget }) {
  const totalRkap = opexData.reduce((s, o) => s + o.rkap, 0);
  const totalReal = opexData.reduce((s, o) => s + o.realisasi, 0);
  const pct = totalRkap > 0 ? (totalReal / totalRkap) * 100 : 0;

  const { displayedOpex, totalCount } = useMemo(() => {
    const totalCount = opexData.length;
    const sorted = [...opexData].sort((a, b) => b.realisasi - a.realisasi);
    return { displayedOpex: sorted.slice(0, 3), totalCount };
  }, [opexData]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span className="bsc-type-tag opex">OPEX</span>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600 }}>Per Tahun</span>
              </div>
              <div className="modal-title">Detail Anggaran OPEX</div>
              <div className="modal-subtitle">Tahun {tahun} · {opexData.length} pos anggaran</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="modal-body thin-scroll">
          <div className="modal-summary-strip">
            <div className="mss-item">
              <div className="mss-lbl">Total Nilai KAD</div>
              <div className="mss-val" style={{ color: "#16a34a" }}>{formatRupiahShort(totalRkap)}</div>
            </div>
            <div className="mss-item">
              <div className="mss-lbl">Total Kontrak</div>
              <div className="mss-val" style={{ color: "#d97706" }}>{formatRupiahShort(totalReal)}</div>
            </div>
            <div className="mss-item">
              <div className="mss-lbl">Sisa Anggaran</div>
              <div className="mss-val" style={{ color: totalRkap - totalReal >= 0 ? "#16a34a" : "#ef4444" }}>
                {formatRupiahShort(Math.abs(totalRkap - totalReal))}
              </div>
            </div>
          </div>
          <div>
            <div className="pct-row">
              <span className="pct-label">Serapan Total</span>
              <span className="pct-value" style={{ color: pct >= 80 ? "#d97706" : "#16a34a" }}>{Number(pct.toFixed(2))}%</span>
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${Math.min(pct, 100)}%`, background: pct >= 100 ? "#ef4444" : pct >= 80 ? "#f59e0b" : "#16a34a" }} />
            </div>
          </div>
          <div className="divider" style={{ margin: "12px 0" }} />
          <div>
            {displayedOpex.map((opex) => {
              const p = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
              const c = p >= 100 ? "#ef4444" : p >= 80 ? "#f59e0b" : "#16a34a";
              return (
                <div key={opex.id} className="mopex-row">
                  <div className="mopex-head">
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: c, flexShrink: 0 }} />
                    <div className="mopex-name">{opex.nama}</div>
                    <div className="mopex-amounts">
                      <div className="mopex-amount">
                        <div className="lbl">Nilai KAD</div>
                        <div className="val" style={{ color: "#1a56db" }}>{formatRupiahShort(opex.rkap)}</div>
                      </div>
                      <div className="mopex-amount">
                        <div className="lbl">Nilai Kontrak</div>
                        <div className="val" style={{ color: c }}>{formatRupiahShort(opex.realisasi)}</div>
                      </div>
                      <div className="mopex-amount">
                        <div className="lbl">Serapan</div>
                        <div className="val" style={{ color: c }}>{Number(p.toFixed(2))}%</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "8px 20px 16px" }}>
                    <div className="prog-track" style={{ height: "6px" }}>
                      <div className="prog-fill" style={{ width: `${Math.min(p, 100)}%`, background: c }} />
                    </div>
                  </div>
                  {opex.transaksi && opex.transaksi.length > 0 && (
                    <div className="mopex-trx">
                      {opex.transaksi.slice(0, 3).map((t) => (
                        <div key={t.id} className="mopex-trx-item">
                          <div>
                            <div className="trx-ket">{t.keterangan}</div>
                            <div className="trx-date">{fmtDate(t.tanggal)} · {t.no_invoice}</div>
                          </div>
                          <span className="trx-val">{formatRupiahShort(t.jumlah)}</span>
                        </div>
                      ))}
                      {opex.transaksi.length > 3 && (
                        <div style={{ fontSize: "0.8rem", color: "#94a3b8", paddingTop: 8, fontWeight: 600 }}>
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
          <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Menampilkan 3 pos anggaran teratas dari total {totalCount || 0} aktif</span>
          <button className="go-budget-btn" style={{ background: "#16a34a", borderColor: "#16a34a" }} onClick={() => { onClose(); onGoToBudget(); }}>
            <FaExternalLinkAlt style={{ fontSize: "0.75rem" }} /> Kelola di Anggaran
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CAPEX BUDGET CARD
───────────────────────────────────────────────────────────────── */
const CapexBudgetCard = ({ selectedYear, onOpenDetail, programsRaw }) => {
  const yr = parseInt(selectedYear);
  const programs = useMemo(() => programsRaw.map((p) => {
    const totalRealisasi = p.realisasi_per_tahun.reduce((s, r) => s + r.realisasi, 0);
    const pct = p.nilai_anggaran > 0 ? (totalRealisasi / p.nilai_anggaran) * 100 : 0;
    const isActiveThisYear = !isNaN(yr) && p.thn_rkap_awal <= yr && p.thn_rkap_akhir >= yr;
    return { ...p, totalRealisasi, pct, isActiveThisYear };
  }), [selectedYear]);

  const grandAnggaran = programs.reduce((s, p) => s + p.nilai_anggaran, 0);
  const grandRealisasi = programs.reduce((s, p) => s + p.totalRealisasi, 0);
  const grandPct = grandAnggaran > 0 ? (grandRealisasi / grandAnggaran) * 100 : 0;
  const activeCount = programs.filter((p) => isNaN(yr) ? true : p.isActiveThisYear).length;
  if (programsRaw.length === 0) return <div className="card">Memuat CAPEX...</div>;

  return (
    <div className="card">
      <div className="bsc-header">
        <div>
          <div className="bsc-type-tag capex">CAPEX · Multi-Year</div>
          <div className="bsc-title">Komposit Program CAPEX</div>
          <div className="bsc-meta">{isNaN(yr) ? `${programsRaw.length} program` : `${activeCount} program aktif`}</div>
        </div>
        <div className="bsc-amount">
          <div className="bsc-amount-lbl">Total Nilai KAD</div>
          <div className="bsc-amount-val">{formatRupiahShort(grandAnggaran)}</div>
        </div>
      </div>
      <div className="pct-row"><span className="pct-label">Serapan Komposit</span><span className="pct-value" style={{ color: "#1a56db" }}>{Number(grandPct.toFixed(2))}%</span></div>
      <div className="prog-track" style={{ marginBottom: 16 }}><div className="prog-fill" style={{ width: `${Math.min(grandPct, 100)}%`, background: "linear-gradient(90deg,#1a56db,#3b82f6)" }} /></div>
      <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 24 }}>
        Total Kontrak: <strong style={{ color: "#0f172a" }}>{formatRupiahShort(grandRealisasi)}</strong> &nbsp;·&nbsp; Sisa: <strong style={{ color: "#ef4444" }}>{formatRupiahShort(grandAnggaran - grandRealisasi)}</strong>
      </div>
      <div className="divider" style={{ margin: "0 0 20px" }} />
      <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600, marginBottom: "12px", background: "#f8fafc", padding: "8px 12px", borderRadius: "8px", borderLeft: "3px solid #1a56db" }}>
        3 program teratas tahun ini
      </div>
      <SlidePager
        items={[...programs.filter((p) => (isNaN(yr) ? true : p.isActiveThisYear))].sort((a, b) => b.totalRealisasi - a.totalRealisasi).slice(0, 3)}
        itemKey="id"
        renderItem={(p) => {
          const cfg = statusCfg[p.status] || statusCfg.belum;
          return (
            <div className="capex-item">
              <div className="capex-item-header">
                <div className="capex-item-name" title={p.nm_anggaran_capex}>{p.nm_anggaran_capex}</div>
                <div className="capex-item-badges"><span className={`ci-badge ${p.status}`}>{cfg.label}</span></div>
              </div>
              <div className="capex-item-amounts">
                <span>Nilai KAD: <strong>{formatRupiahShort(p.nilai_anggaran)}</strong></span>
                <span>Nilai Kontrak: <strong>{formatRupiahShort(p.totalRealisasi)}</strong></span>
                <strong style={{ color: cfg.color }}>{Number(p.pct.toFixed(2))}%</strong>
              </div>
              <div className="prog-track" style={{ height: "6px" }}><div className="prog-fill" style={{ width: `${Math.min(p.pct, 100)}%`, background: cfg.color }} /></div>
            </div>
          );
        }}
      />
      <button className="detail-btn" onClick={onOpenDetail}><FaChevronDown style={{ fontSize: "0.8rem" }} /> Lihat Detail {Math.min(activeCount, 3)} Program</button>
    </div>
  );
};

const OpexBudgetCard = ({ tahun, onOpenDetail, dataOpex }) => {

  const totalRkap = dataOpex.reduce((s, o) => s + o.rkap, 0);
  const totalReal = dataOpex.reduce((s, o) => s + o.realisasi, 0);
  const pct = totalRkap > 0 ? (totalReal / totalRkap) * 100 : 0;
  const color = pct >= 100 ? "#ef4444" : pct >= 80 ? "#f59e0b" : "#16a34a";

  return (
    <div className="card">
      <div className="bsc-header">
        <div>
          <div className="bsc-type-tag opex">OPEX · Per Tahun</div>
          <div className="bsc-title">Total Kontrak vs Nilai KAD</div>
          <div className="bsc-meta">Tahun {tahun} · {dataOpex.length} pos anggaran</div>
        </div>
        <div className="bsc-amount">
          <div className="bsc-amount-lbl">Total Nilai KAD</div>
          <div className="bsc-amount-val" style={{ color: "#16a34a" }}>{formatRupiahShort(totalRkap)}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: "1.8rem", fontWeight: 800, color, letterSpacing: "-0.5px" }}>{formatRupiahShort(totalReal)}</span>
        <span style={{ fontSize: "0.95rem", color: "#64748b", fontWeight: 600 }}>/ {formatRupiahShort(totalRkap)}</span>
      </div>
      <div className="prog-track" style={{ marginBottom: 10 }}><div className="prog-fill" style={{ width: `${Math.min(pct, 100)}%`, background: color }} /></div>
      <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 24 }}>
        <strong style={{ color }}>{Number(pct.toFixed(2))}%</strong> terserap &nbsp;·&nbsp; Sisa: <strong style={{ color: "#0f172a" }}>{formatRupiahShort(totalRkap - totalReal)}</strong>
      </div>
      <div className="divider" style={{ margin: "0 0 20px" }} />
      <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600, marginBottom: "12px", background: "#f8fafc", padding: "8px 12px", borderRadius: "8px", borderLeft: "3px solid #16a34a" }}>
        3 pos anggaran teratas tahun ini
      </div>
      <SlidePager
        items={[...dataOpex].sort((a, b) => b.realisasi - a.realisasi).slice(0, 3)}
        itemKey="id"
        renderItem={(opex) => {
          const p = opex.rkap > 0 ? (opex.realisasi / opex.rkap) * 100 : 0;
          const c = p >= 100 ? "#ef4444" : p >= 80 ? "#f59e0b" : "#16a34a";
          return (
            <div className="bitem">
              <div className="bitem-dot" style={{ background: c }} />
              <div className="bitem-name">{opex.nama.replace("Beban ", "")}</div>
              <div className="bitem-bar"><div className="prog-track" style={{ height: "6px" }}><div className="prog-fill" style={{ width: `${Math.min(p, 100)}%`, background: c }} /></div></div>
              <div className="bitem-pct" style={{ color: c }}>{Number(p.toFixed(2))}%</div>
            </div>
          );
        }}
      />
      <button className="detail-btn green" onClick={onOpenDetail}><FaChevronDown style={{ fontSize: "0.8rem" }} /> Lihat Detail {Math.min(dataOpex.length, 3)} Pos</button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   DONUT LABEL
───────────────────────────────────────────────────────────────── */
const CustomDonutLabel = ({ viewBox, val }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#0f172a" fontSize="1.6rem" fontWeight="800">{val.toLocaleString()}</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fill="#94a3b8" fontSize="0.75rem" fontWeight="700" letterSpacing="1px">TOTAL ASET</text>
    </g>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN DASHBOARD (TABS IMPLEMENTATION)
───────────────────────────────────────────────────────────────── */
const tahunOptions = ["2023", "2024", "2025", "2026"];

const Dashboard = () => {
  const [dbBorrows, setDbBorrows] = useState(() => JSON.parse(sessionStorage.getItem('SWR_DashBorrows')) || []);
  const [dbReturns, setDbReturns] = useState(() => JSON.parse(sessionStorage.getItem('SWR_DashReturns')) || []);
  const [dbAssets, setDbAssets] = useState(() => JSON.parse(sessionStorage.getItem('SWR_DashAssets')) || []);
  const [dbCapex, setDbCapex] = useState(() => JSON.parse(sessionStorage.getItem('SWR_DashCapex')) || []);
  const [dbOpex, setDbOpex] = useState(() => JSON.parse(sessionStorage.getItem('SWR_DashOpex')) || {});
  const [dbDevices, setDbDevices] = useState(() => JSON.parse(sessionStorage.getItem('SWR_DashDevices')) || []);
  const [loading, setLoading] = useState(false);
  const [trendTimeframe, setTrendTimeframe] = useState("bulan");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [astRes, txRes, cpxRes, opxRes, devRes] = await Promise.all([
          barangAPI.getAll().catch(e => ({ data: [] })),
          transactionAPI.getAll().catch(e => ({ data: { borrows: [] } })),
          budgetAPI.getCapex().catch(e => ({ data: { data: [] } })),
          budgetAPI.getOpex().catch(e => ({ data: { data: [] } })),
          masterDataAPI.getDevices().catch(e => ({ data: { data: [] } }))
        ]);

        const assets = Array.isArray(astRes.data) ? astRes.data : [];
        const borrows = txRes.data?.borrows || [];
        const capex = Array.isArray(cpxRes.data?.data) ? cpxRes.data.data : [];
        const opexRaw = Array.isArray(opxRes.data?.data) ? opxRes.data.data : [];
        const devices = Array.isArray(devRes.data?.data) ? devRes.data.data : [];

        setDbAssets(assets);
        setDbBorrows(borrows);
        setDbReturns(txRes.data?.returns || []);
        setDbDevices(devices);
        sessionStorage.setItem('SWR_DashAssets', JSON.stringify(assets));
        sessionStorage.setItem('SWR_DashBorrows', JSON.stringify(borrows));
        sessionStorage.setItem('SWR_DashReturns', JSON.stringify(txRes.data?.returns || []));
        sessionStorage.setItem('SWR_DashDevices', JSON.stringify(devices));

        // Format Capex
        const fmtCapex = capex.map(c => {
          const projs = c.projects || [];
          const totalReal = projs.reduce((s, p) => s + (p.nilai_kontrak || 0), 0);
          const rkapVal = parseFloat(c.nilai_kad || 0);

          return {
            id: c.kd_anggaran_capex || c.id,
            nm_anggaran_capex: c.nama || c.nm_anggaran_capex || '-',
            thn_rkap_awal: parseInt(c.thn_rkap_awal || 2026),
            thn_rkap_akhir: parseInt(c.thn_rkap_akhir || 2026),
            nilai_anggaran: rkapVal,
            status: (rkapVal > 0 && totalReal >= rkapVal) ? 'selesai' : 'berjalan',
            realisasi_per_tahun: [{ tahun: parseInt(c.thn_rkap_awal || 2026), realisasi: totalReal }]
          };
        });
        setDbCapex(fmtCapex);
        sessionStorage.setItem('SWR_DashCapex', JSON.stringify(fmtCapex));

        // Format Opex grouping by year
        const opexByYear = {};
        opexRaw.forEach(o => {
          const yr = String(o.thn_anggaran || 2026);
          if (!opexByYear[yr]) opexByYear[yr] = [];

          const projs = o.projects || [];
          const totalReal = projs.reduce((s, p) => s + (p.nilai_kontrak || 0), 0);
          const rkapVal = parseFloat(o.nilai_kad || 0);

          opexByYear[yr].push({
            id: o.id || o.id_anggaran_tahunan,
            nama: o.nama || o.nm_anggaran || '-',
            rkap: rkapVal,
            realisasi: totalReal,
            transaksi: projs.map((p, idx) => ({
              id: p.id || String(idx),
              tanggal: p.tgl_kontrak || null,
              keterangan: p.nm_pekerjaan || '-',
              no_invoice: p.no_kontrak || '-',
              jumlah: p.nilai_kontrak || 0
            }))
          });
        });
        setDbOpex(opexByYear);
        sessionStorage.setItem('SWR_DashOpex', JSON.stringify(opexByYear));

      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const activeDevices = useMemo(() => {
    if (!dbDevices || !dbAssets) return [];
    const usedCategories = new Set();
    dbAssets.forEach(a => {
      if (a.category) usedCategories.add(a.category);
    });
    return dbDevices.filter(d => usedCategories.has(d.device_code));
  }, [dbDevices, dbAssets]);

  const trendData = useMemo(() => {
    if (!activeDevices || !dbAssets) return [];

    if (trendTimeframe === "hari") {
      const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
      const base = days.map((day) => {
        const obj = { name: day };
        activeDevices.forEach(d => { obj[d.device_code] = 0; });
        return obj;
      });

      dbAssets.forEach(asset => {
        if (!asset.category) return;
        const device = activeDevices.find(d => d.device_code === asset.category);
        if (!device) return;

        const qty = asset.units && Array.isArray(asset.units) ? asset.units.length : 1;

        const date = asset.created_at ? new Date(asset.created_at) : new Date();
        let dayIdx = date.getDay() - 1;
        if (dayIdx === -1) dayIdx = 6;
        base[dayIdx][device.device_code] += qty;
      });
      return base;
    } else {
      const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
      const base = months.map((m) => {
        const obj = { name: m };
        activeDevices.forEach(d => { obj[d.device_code] = 0; });
        return obj;
      });

      dbAssets.forEach(asset => {
        if (!asset.category) return;
        const device = activeDevices.find(d => d.device_code === asset.category);
        if (!device) return;

        const qty = asset.units && Array.isArray(asset.units) ? asset.units.length : 1;

        const date = asset.created_at ? new Date(asset.created_at) : new Date();
        const monthIdx = date.getMonth();
        base[monthIdx][device.device_code] += qty;
      });
      return base;
    }
  }, [activeDevices, dbAssets, trendTimeframe]);

  // Compute dynamic stats
  const dynamicStats = useMemo(() => {
    let tAset = 0;
    let tAvail = 0;
    let tMaint = 0;
    const cond = { "Baik": 0, "Rusak": 0, "Hilang": 0 };

    const activeBorrowSet = new Set();
    dbBorrows.forEach(b => {
      if (!b.is_returned) activeBorrowSet.add(b.code);
    });

    dbAssets.forEach(item => {
      if (item.units && Array.isArray(item.units)) {
        item.units.forEach(u => {
          tAset++;
          if (u.status === "Tersedia") {
            tAvail++;
          } else if (u.status && u.status.includes("Non-Operasional")) {
            tMaint++;
          }

          const st = (u.condition || "BAIK").toUpperCase();
          if (st === "RUSAK" || st === "MINOR_DAMAGE" || st === "RUSAK RINGAN" || st === "RUSAK BERAT" || st === "DAMAGED" || st === "DIPERBAIKI" || st === "MAINTENANCE") {
            cond["Rusak"]++;
          } else if (st === "HILANG" || st === "MISSING") {
            cond["Hilang"]++;
          } else {
            cond["Baik"]++;
          }
        });
      }
    });

    const dKondisi = [
      { name: "Baik", value: cond["Baik"], color: "#16a34a" },
      { name: "Rusak", value: cond["Rusak"], color: "#dc2626" },
      { name: "Hilang", value: cond["Hilang"], color: "#9ca3af" },
    ];

    return { totalAset: tAset, totalAvailable: tAvail, totalMaint: tMaint, dataKondisi: dKondisi, totalKondisiVal: tAset };
  }, [dbAssets, dbBorrows]);

  const totalAsetData = useMemo(() => {
    const categoryTotals = {};
    const validDevices = dbDevices.filter(d => d && d.name);
    validDevices.forEach(d => { categoryTotals[d.name] = 0; });

    dbAssets.forEach(item => {
      const device = validDevices.find(d => d.device_code === item.category);
      const devName = device ? device.name : null;
      if (devName && categoryTotals[devName] !== undefined) {
        const qty = parseInt(item.quantity, 10);
        categoryTotals[devName] += (isNaN(qty) ? 1 : qty);
      }
    });

    const colors = ["#1a56db", "#16a34a", "#d97706", "#7c3aed", "#e11d48", "#0891b2", "#84cc16", "#f59e0b", "#6366f1", "#14b8a6"];

    return validDevices
      .map((d, i) => ({
        name: String(d.name),
        Total: Number(categoryTotals[d.name]) || 0,
        fill: colors[i % colors.length]
      }))
      .filter(d => d.Total > 0); // Jika belum ada data (0), tidak dimunculkan
  }, [dbDevices, dbAssets]);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("aset"); // "aset" | "anggaran"
  const [filterTren, setFilterTren] = useState("bulanan");
  const [tahunAnggaran, setTahunAnggaran] = useState("2026");
  const [modal, setModal] = useState(null);




  return (
    <>
      <style>{css}</style>
      <div className="db-wrap">

        {/* ── 1. HEADER & QUICK ACTION ── */}
        <div className="db-header">
          <div>
            <h1 className="db-title">Dashboard Overview</h1>
            <p className="db-subtitle">Monitoring Aset &amp; Anggaran · PT Pelindo Multi Terminal</p>
          </div>
          <div className="header-actions">
            <div className="action-group">
              <div className="action-label">Tahun Anggaran</div>
              <div className="year-picker">
                {tahunOptions.map((t) => (
                  <button key={t} className={`year-btn${tahunAnggaran === t ? " active" : ""}`} onClick={() => setTahunAnggaran(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. TAB NAVIGATION ── */}
        <div className="tab-container">
          <button
            className={`tab-btn ${activeTab === 'aset' ? 'active' : ''}`}
            onClick={() => setActiveTab('aset')}
          >
            Overview Aset
          </button>
          <button
            className={`tab-btn ${activeTab === 'anggaran' ? 'active' : ''}`}
            onClick={() => setActiveTab('anggaran')}
          >
            Overview Anggaran
          </button>
        </div>

        {/* ── 3. CONTENT AREA ── */}
        <div style={{ animation: 'fadeIn 0.3s ease' }} key={activeTab}>

          {/* CONTENT: ASET */}
          {activeTab === 'aset' && (
            <>
              <div className="stats-row">
                {[
                  { title: "Total Aset", value: dynamicStats.totalAset.toLocaleString(), icon: <FaBox />, color: "#1a56db", bg: "#eff6ff", sub: "Unit terdaftar" },
                  { title: "Tersedia", value: dynamicStats.totalAvailable.toLocaleString(), icon: <FaCheckCircle />, color: "#16a34a", bg: "#f0fdf4", sub: "Siap digunakan" },
                  { title: "Non Operasional", value: dynamicStats.totalMaint.toLocaleString(), icon: <FaTools />, color: "#d97706", bg: "#fffbeb", sub: "Tidak dapat digunakan" },
                ].map((s) => (
                  <div key={s.title} className="stat-card">
                    <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                    <div>
                      <div className="stat-label">{s.title}</div>
                      <div className="stat-value">{s.value}</div>
                      <div className="stat-sub">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bento-grid">
                {/* Tren Peminjaman per Kategori (Dynamic Line Chart) */}
                <div className="card">
                  <div className="card-header-row">
                    <div>
                      <div className="card-title">Jumlah Aset per Kategori</div>
                      <div className="card-subtitle">Visualisasi jumlah aset pada setiap kategori</div>
                    </div>
                    <div className="toggle-pill">
                      <button className={`toggle-btn ${trendTimeframe === 'hari' ? 'active' : ''}`} onClick={() => setTrendTimeframe('hari')}>Per Hari</button>
                      <button className={`toggle-btn ${trendTimeframe === 'bulan' ? 'active' : ''}`} onClick={() => setTrendTimeframe('bulan')}>Per Bulan</button>
                    </div>
                  </div>
                  <div style={{ height: 300, width: "100%", position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
                          <Tooltip cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }} contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px" }} />
                          {activeDevices && activeDevices.map((device, index) => {
                            const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#6366f1", "#14b8a6", "#f43f5e", "#0ea5e9", "#10b981"];
                            const color = colors[index % colors.length];
                            return (
                              <Line
                                key={device.device_code}
                                type="monotone"
                                dataKey={device.device_code}
                                name={device.name || device.device_name || device.device_code}
                                stroke={color}
                                strokeWidth={2}
                                dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: color }}
                                activeDot={{ r: 6, strokeWidth: 0, fill: color }}
                              />
                            );
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Kondisi Aset (Span Kanan) */}
                <div className="card">
                  <div className="card-header-row" style={{ marginBottom: 12 }}>
                    <div>
                      <div className="card-title">Kondisi Aset</div>
                      <div className="card-subtitle">Distribusi status fisik</div>
                    </div>
                  </div>
                  <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={dynamicStats.dataKondisi} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value" labelLine={false}>
                          {dynamicStats.dataKondisi.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          <Label content={(props) => <CustomDonutLabel {...props} val={dynamicStats.totalKondisiVal} />} position="center" />
                        </Pie>
                        <Tooltip formatter={(v, n) => [`${v.toLocaleString()} unit`, n]} contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="divider" style={{ margin: "16px 0" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {dynamicStats.dataKondisi.map((item) => (
                      <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color }} />
                          <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>{item.name}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a" }}>{item.value.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CONTENT: ANGGARAN */}
          {activeTab === 'anggaran' && (
            <div className="bento-grid-equal">
              <CapexBudgetCard selectedYear={tahunAnggaran} onOpenDetail={() => setModal("capex")} programsRaw={dbCapex} />
              <OpexBudgetCard tahun={tahunAnggaran} onOpenDetail={() => setModal("opex")} dataOpex={dbOpex[String(tahunAnggaran)] ?? []} />
            </div>
          )}


        </div>
      </div>

      {/* ── MODALS ── */}
      {modal === "capex" && <CapexDetailModal programs={dbCapex} selectedYear={tahunAnggaran} onClose={() => setModal(null)} onGoToBudget={() => navigate("/budget")} />}
      {modal === "opex" && <OpexDetailModal opexData={dbOpex[tahunAnggaran] ?? []} tahun={tahunAnggaran} onClose={() => setModal(null)} onGoToBudget={() => navigate("/budget")} />}
    </>
  );
};

export default Dashboard;