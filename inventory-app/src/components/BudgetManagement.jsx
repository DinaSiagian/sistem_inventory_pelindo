// ================================================================
// BudgetManagement + Inline Edit + Invoice Attachment
// ================================================================

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";

// ── Icons mini (lucide-style SVG inline) ──────────────────────────
const Icon = ({ d, size = 16, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    {Array.isArray(d) ? (
      d.map((dd, i) => <path key={i} d={dd} />)
    ) : (
      <path d={d} />
    )}
  </svg>
);

const Icons = {
  dollar: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  trending: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  wallet:
    "M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M16 13a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
  search: "m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  chevDown: "m6 9 6 6 6-6",
  chevUp: "m18 15-6-6-6 6",
  plus: "M5 12h14M12 5v14",
  x: "M18 6 6 18M6 6l12 12",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:
    "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  check: "M20 6 9 17l-5-5",
  receipt:
    "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1zM16 8H8M16 12H8M12 16H8",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  briefcase:
    "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  monitor:
    "M20 3H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 21h8M12 17v4",
  calendar:
    "M8 2v4M16 2v4M3 10h18M21 8H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z",
  layers: "m2 20 10-10 10 10M2 4l10 10L22 4",
  fileText:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  package:
    "M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12",
  warning:
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0-3.42 0zM12 9v4M12 17h.01",
  alertCirc:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01",
  minusCirc:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8 12h8",
  checkCirc: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  paperclip:
    "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
};

// ── Helpers ───────────────────────────────────────────────────────
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
const fmtFileSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
const statusClass = (pct) =>
  pct >= 100 ? "over" : pct >= 80 ? "warn" : pct >= 40 ? "mid" : "safe";
const statusLabel = (pct) =>
  pct >= 100
    ? "Melebihi"
    : pct >= 80
      ? "Kritis"
      : pct >= 40
        ? "Berjalan"
        : "Aman";
const getBalanceInfo = (assets, nilaiKontrak) => {
  if (!assets || assets.length === 0)
    return {
      status: "empty",
      selisih: nilaiKontrak,
      label: "Belum Diisi",
      pct: 0,
    };
  const sumAset = assets.reduce((s, a) => s + (a.acquisition_value || 0), 0);
  if (sumAset === 0)
    return {
      status: "empty",
      selisih: nilaiKontrak,
      label: "Nilai Kosong",
      pct: 0,
    };
  const selisih = nilaiKontrak - sumAset;
  const pctSelisih =
    nilaiKontrak > 0 ? Math.abs(selisih / nilaiKontrak) * 100 : 0;
  if (selisih === 0)
    return {
      status: "balanced",
      selisih: 0,
      label: "Balanced",
      pct: pctSelisih,
      sumAset,
    };
  if (pctSelisih <= 5)
    return {
      status: "near",
      selisih,
      label: "Hampir Balance",
      pct: pctSelisih,
      sumAset,
    };
  return {
    status: "unbalanced",
    selisih,
    label: "Belum Balance",
    pct: pctSelisih,
    sumAset,
  };
};
const newId = () =>
  `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ── Mock Data ─────────────────────────────────────────────────────
const initMockCapex = [
  {
    kd_anggaran_capex: "CAP-2440013",
    kd_anggaran_master: "2440013",
    nm_anggaran_capex: "Penyiapan Infrastruktur IT Kantor Pusat & Branch",
    nilai_anggaran_rkap: 0,
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    projects: [
      {
        id_pekerjaan: "PKJ-2440013-001",
        nm_pekerjaan:
          "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
        nilai_rab: 0,
        nilai_kontrak: 0,
        no_pr: "",
        no_po: "8260000074",
        no_kontrak: "SI.01/10/9/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-09-10",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "2024-09-06",
        tgl_bamk: "2024-09-06",
        assets: [
          {
            asset_code: "SPMT-KPT-DTC-SRV-01",
            name: "Server Rack Kantor Pusat — Rack 1",
            brand: "Dell",
            model: "PowerEdge R750",
            serial_number: "DELL-KPT-SRV-001",
            procurement_date: "2024-09-10",
            acquisition_value: 450000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-SRV-02",
            name: "Server Rack Kantor Pusat — Rack 2",
            brand: "Dell",
            model: "PowerEdge R750",
            serial_number: "DELL-KPT-SRV-002",
            procurement_date: "2024-09-10",
            acquisition_value: 450000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-PKR-01",
            name: "Core Switch Data Center Kantor Pusat",
            brand: "Cisco",
            model: "Nexus 9300-48S",
            serial_number: "CSC-KPT-CSW-001",
            procurement_date: "2024-09-10",
            acquisition_value: 520000000,
          },
          {
            asset_code: "SPMT-PLT-GDG-PKR-01",
            name: "Access Switch Pelindo Tower — Lantai 1-5",
            brand: "Cisco",
            model: "Catalyst 9200L-24P",
            serial_number: "CSC-PLT-ASW-001",
            procurement_date: "2024-09-10",
            acquisition_value: 180000000,
          },
          {
            asset_code: "SPMT-PLP-GDG-PKR-01",
            name: "Access Switch Pelindo Place",
            brand: "Cisco",
            model: "Catalyst 9200L-24P",
            serial_number: "CSC-PLP-ASW-001",
            procurement_date: "2024-09-10",
            acquisition_value: 180000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-PKR-02",
            name: "Firewall Data Center Kantor Pusat",
            brand: "Fortinet",
            model: "FortiGate 200F",
            serial_number: "FGT-KPT-FWL-001",
            procurement_date: "2024-09-10",
            acquisition_value: 380000000,
          },
          {
            asset_code: "SPMT-TJE-DTC-PKR-01",
            name: "Core Switch Tanjung Emas",
            brand: "Cisco",
            model: "Catalyst 9300-24P",
            serial_number: "CSC-TJE-CSW-001",
            procurement_date: "2024-09-10",
            acquisition_value: 245000000,
          },
          {
            asset_code: "SPMT-GRK-DTC-PKR-01",
            name: "Core Switch Gresik",
            brand: "Cisco",
            model: "Catalyst 9300-24P",
            serial_number: "CSC-GRK-CSW-001",
            procurement_date: "2024-09-10",
            acquisition_value: 245000000,
          },
        ],
      },
    ],
  },
  {
    kd_anggaran_capex: "CAP-2440014",
    kd_anggaran_master: "2440014",
    nm_anggaran_capex: "Penyediaan Network di Branch SPMT",
    nilai_anggaran_rkap: 3200000000,
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    projects: [
      {
        id_pekerjaan: "PKJ-2440014-001",
        nm_pekerjaan:
          "Penyediaan Network di Branch SPMT (Malahayati, Lhokseumawe, Lembar, Parepare dan Garongkong)",
        nilai_rab: 1600000000,
        nilai_kontrak: 1500000000,
        no_pr: "",
        no_po: "6440000025",
        no_kontrak: "SI.01/15/8/5/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-15",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "2024-08-02",
        tgl_bamk: "2024-08-09",
        assets: [
          {
            asset_code: "SPMT-MLH-DTC-PKR-02",
            name: "Core Switch Malahayati",
            brand: "Cisco",
            model: "Catalyst 9300-48P",
            serial_number: "CSC-MLH-CSW-001",
            procurement_date: "2024-08-15",
            acquisition_value: 320000000,
          },
          {
            asset_code: "SPMT-LHK-DTC-PKR-02",
            name: "Core Switch Lhokseumawe",
            brand: "Cisco",
            model: "Catalyst 9300-48P",
            serial_number: "CSC-LHK-CSW-001",
            procurement_date: "2024-08-15",
            acquisition_value: 320000000,
          },
          {
            asset_code: "SPMT-LMB-DTC-PKR-01",
            name: "Core Switch Lembar",
            brand: "Cisco",
            model: "Catalyst 9300-24P",
            serial_number: "CSC-LMB-CSW-001",
            procurement_date: "2024-08-15",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-PPR-DTC-PKR-02",
            name: "Core Switch Parepare",
            brand: "Cisco",
            model: "Catalyst 9300-24P",
            serial_number: "CSC-PPR-CSW-001",
            procurement_date: "2024-08-15",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-GRG-DTC-PKR-01",
            name: "Access Switch Garongkong",
            brand: "Cisco",
            model: "Catalyst 2960-X 24TS",
            serial_number: "CSC-GRG-ASW-001",
            procurement_date: "2024-08-15",
            acquisition_value: 150000000,
          },
          {
            asset_code: "SPMT-MLH-DTC-PKR-03",
            name: "Firewall UTM Malahayati",
            brand: "Fortinet",
            model: "FortiGate 80F",
            serial_number: "FGT-MLH-FWL-001",
            procurement_date: "2024-08-15",
            acquisition_value: 150000000,
          },
        ],
      },
    ],
  },
  {
    kd_anggaran_capex: "CAP-2440015",
    kd_anggaran_master: "2440015",
    nm_anggaran_capex: "Implementasi dan Standarisasi IT Infrastruktur",
    nilai_anggaran_rkap: 5800000000,
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    projects: [
      {
        id_pekerjaan: "PKJ-2440015-001",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Planning & Control, CCTV dan SD-WAN Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_rab: 1250000000,
        nilai_kontrak: 1200000000,
        no_pr: "",
        no_po: "6440000026",
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-12",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "2024-08-02",
        tgl_bamk: "2024-08-06",
        assets: [
          {
            asset_code: "SPMT-MLH-LPG-KMR-01",
            name: "CCTV IP Camera Malahayati",
            brand: "Hikvision",
            model: "DS-2CD2T47G2-L",
            serial_number: "HVK-MLH-KMR-001",
            procurement_date: "2024-08-12",
            acquisition_value: 85000000,
          },
          {
            asset_code: "SPMT-LHK-LPG-KMR-01",
            name: "CCTV IP Camera Lhokseumawe",
            brand: "Hikvision",
            model: "DS-2CD2T47G2-L",
            serial_number: "HVK-LHK-KMR-001",
            procurement_date: "2024-08-12",
            acquisition_value: 85000000,
          },
          {
            asset_code: "SPMT-MLH-DTC-PKR-01",
            name: "Router SD-WAN Malahayati",
            brand: "Cisco",
            model: "ISR 4331",
            serial_number: "CSC-MLH-RTR-001",
            procurement_date: "2024-08-12",
            acquisition_value: 185000000,
          },
          {
            asset_code: "SPMT-MLH-DTC-SRV-01",
            name: "Server Planning & Control Malahayati",
            brand: "Dell",
            model: "PowerEdge R450",
            serial_number: "DELL-MLH-SRV-001",
            procurement_date: "2024-08-12",
            acquisition_value: 195000000,
          },
        ],
      },
      {
        id_pekerjaan: "PKJ-2440015-002",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_rab: 1000000000,
        nilai_kontrak: 980000000,
        no_pr: "",
        no_po: "6440000027",
        no_kontrak: "SI.01/8/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-08",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "2024-08-02",
        tgl_bamk: "2024-08-02",
        assets: [
          {
            asset_code: "SPMT-MLH-LPG-DMG-01",
            name: "Gate Controller Malahayati",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-MLH-GCL-001",
            procurement_date: "2024-08-08",
            acquisition_value: 210000000,
          },
          {
            asset_code: "SPMT-LHK-LPG-DMG-01",
            name: "Gate Controller Lhokseumawe",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-LHK-GCL-001",
            procurement_date: "2024-08-08",
            acquisition_value: 210000000,
          },
          {
            asset_code: "SPMT-LMB-LPG-DMG-01",
            name: "Gate Controller Lembar",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-LMB-GCL-001",
            procurement_date: "2024-08-08",
            acquisition_value: 185000000,
          },
        ],
      },
    ],
  },
  {
    kd_anggaran_capex: "CAP-2440020",
    kd_anggaran_master: "2440020",
    nm_anggaran_capex:
      "Pemenuhan Kebutuhan Gate System & Planning Control Transformasi",
    nilai_anggaran_rkap: 0,
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2025,
    thn_anggaran: 2025,
    projects: [
      {
        id_pekerjaan: "PKJ-2440020-001",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System Transformasi pada Branch (Jamrud Nilam Mirah, Tanjung Wangi, Trisakti, Dumai, Belawan) PT Pelindo Multi Terminal",
        nilai_rab: 0,
        nilai_kontrak: 0,
        no_pr: "8260000282",
        no_po: "6440000675",
        no_kontrak: "SI.01/7/1/3/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-01-07",
        durasi_kontrak: 90,
        no_sp3: "KP.20.01/3/1/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-01-03",
        tgl_bamk: "2025-01-15",
        assets: [
          {
            asset_code: "SPMT-JNM-LPG-DMG-01",
            name: "Gate Controller Jamrud Nilam Mirah",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-JNM-GCL-001",
            procurement_date: "2025-01-07",
            acquisition_value: 420000000,
          },
          {
            asset_code: "SPMT-TWG-LPG-DMG-01",
            name: "Gate Controller Tanjung Wangi",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-TWG-GCL-001",
            procurement_date: "2025-01-07",
            acquisition_value: 400000000,
          },
          {
            asset_code: "SPMT-BLW-LPG-DMG-01",
            name: "Gate Controller Belawan",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-BLW-GCL-001",
            procurement_date: "2025-01-07",
            acquisition_value: 420000000,
          },
        ],
      },
    ],
  },
  {
    kd_anggaran_capex: "CAP-2540010",
    kd_anggaran_master: "2540010",
    nm_anggaran_capex: "Penyiapan Infrastruktur Gate System RoRo",
    nilai_anggaran_rkap: 0,
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2025,
    thn_anggaran: 2025,
    projects: [
      {
        id_pekerjaan: "PKJ-2540010-001",
        nm_pekerjaan:
          "Penyiapan Infrastruktur Gate System Pendukung Kegiatan RoRo pada Branch Tanjung Emas PT Pelindo Multi Terminal",
        nilai_rab: 0,
        nilai_kontrak: 0,
        no_pr: "8260000779",
        no_po: "6440000821",
        no_kontrak: "PD.01/4/8/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-08-04",
        durasi_kontrak: 60,
        no_sp3: "PD.01/31/7/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-07-31",
        tgl_bamk: "2025-09-01",
        assets: [
          {
            asset_code: "SPMT-TJE-LPG-DMG-02",
            name: "Gate Controller RoRo Tanjung Emas — Dermaga 1",
            brand: "Genetec",
            model: "AutoVu Sharp XP",
            serial_number: "GTC-TJE-GCL-002",
            procurement_date: "2025-08-04",
            acquisition_value: 560000000,
          },
          {
            asset_code: "SPMT-TJE-LPG-KMR-02",
            name: "CCTV Dermaga RoRo Tanjung Emas — 4K PTZ",
            brand: "Axis",
            model: "Q6135-LE PTZ",
            serial_number: "AXIS-TJE-KMR-002",
            procurement_date: "2025-08-04",
            acquisition_value: 185000000,
          },
        ],
      },
    ],
  },
  {
    kd_anggaran_capex: "CAP-2540011",
    kd_anggaran_master: "2540011",
    nm_anggaran_capex: "Transformasi dan Digitalisasi Operasional",
    nilai_anggaran_rkap: 12000000000,
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2027,
    thn_anggaran: 2025,
    projects: [
      {
        id_pekerjaan: "PKJ-2540011-001",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Roro pada Branch (Lembar Gilimas, Tanjung Wangi, Tanjung Emas, Sibolga, Balikpapan, Parepare dan Tanjung Balai Karimun) PT Pelindo Multi Terminal",
        nilai_rab: 4200000000,
        nilai_kontrak: 3950000000,
        no_pr: "8260000711",
        no_po: "6440000822",
        no_kontrak: "SI.01/7/7/4/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-07-07",
        durasi_kontrak: 120,
        no_sp3: "PD.05.01/30/6/3/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-06-30",
        tgl_bamk: "2025-07-01",
        assets: [
          {
            asset_code: "SPMT-LMB-LPG-DMG-02",
            name: "Gate Controller RoRo Lembar Gilimas",
            brand: "Genetec",
            model: "AutoVu Sharp XP",
            serial_number: "GTC-LMB-GCL-002",
            procurement_date: "2025-07-07",
            acquisition_value: 560000000,
          },
          {
            asset_code: "SPMT-TJE-DTC-SRV-01",
            name: "Server Planning & Control Tanjung Emas",
            brand: "Dell",
            model: "PowerEdge R550",
            serial_number: "DELL-TJE-SRV-001",
            procurement_date: "2025-07-07",
            acquisition_value: 420000000,
          },
        ],
      },
    ],
  },
  {
    kd_anggaran_capex: "CAP-2540012",
    kd_anggaran_master: "2540012",
    nm_anggaran_capex: "Pengembangan Infrastruktur Jaringan",
    nilai_anggaran_rkap: 4500000000,
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2028,
    thn_anggaran: 2025,
    projects: [
      {
        id_pekerjaan: "PKJ-2540012-001",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Perangkat Network Branch Tanjung Balai Karimun Terminal Selat Panjang PT Pelindo Multi Terminal",
        nilai_rab: 850000000,
        nilai_kontrak: 810000000,
        no_pr: "8260000734",
        no_po: "6430001555",
        no_kontrak: "PD.01/24/7/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-07-24",
        durasi_kontrak: 60,
        no_sp3: "PD.01/22/7/1/PGDN/DSDM/PLMT-25",
        tgl_sp3: "2025-07-22",
        tgl_bamk: "2025-08-01",
        assets: [
          {
            asset_code: "SPMT-TBK-DTC-PKR-01",
            name: "Core Switch Tanjung Balai Karimun",
            brand: "Cisco",
            model: "Catalyst 9300-24P",
            serial_number: "CSC-TBK-CSW-001",
            procurement_date: "2025-07-24",
            acquisition_value: 270000000,
          },
          {
            asset_code: "SPMT-TBK-DTC-PKR-02",
            name: "Firewall UTM Tanjung Balai Karimun",
            brand: "Fortinet",
            model: "FortiGate 100F",
            serial_number: "FGT-TBK-FWL-001",
            procurement_date: "2025-07-24",
            acquisition_value: 220000000,
          },
        ],
      },
    ],
  },
];

const initMockOpex = [
  {
    id_anggaran_tahunan: 1,
    kd_anggaran_master: "5030905000",
    nm_anggaran_master: "Beban Pemeliharaan Software",
    nilai_anggaran_tahunan: 350000000,
  },
  {
    id_anggaran_tahunan: 2,
    kd_anggaran_master: "5021300000",
    nm_anggaran_master: "Beban Jaringan dan Koneksi Data",
    nilai_anggaran_tahunan: 288000000,
  },
  {
    id_anggaran_tahunan: 3,
    kd_anggaran_master: "5021200000",
    nm_anggaran_master: "Beban Perlengkapan Kantor",
    nilai_anggaran_tahunan: 120000000,
  },
];

const initMockRealisasiOpex = [
  {
    id_realisasi: 1,
    id_anggaran_tahunan: 1,
    tanggal_realisasi: "2026-01-15",
    keterangan: "Pembayaran lisensi Microsoft Office 365",
    no_invoice: "INV/2026/001",
    jumlah: 15000000,
    id_aset: "AST-OPX-0001",
    lampiran: [],
  },
  {
    id_realisasi: 2,
    id_anggaran_tahunan: 1,
    tanggal_realisasi: "2026-02-10",
    keterangan: "Lisensi Antivirus Kaspersky",
    no_invoice: "INV/2026/015",
    jumlah: 8500000,
    id_aset: null,
    lampiran: [],
  },
  {
    id_realisasi: 3,
    id_anggaran_tahunan: 2,
    tanggal_realisasi: "2026-01-05",
    keterangan: "Tagihan MPLS bulan Januari",
    no_invoice: "INV/TEL/2026/001",
    jumlah: 24000000,
    id_aset: "AST-OPX-0002",
    lampiran: [],
  },
];

// ══════════════════════════════════════════════════════════════════
// CSS
// ══════════════════════════════════════════════════════════════════
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap");
:root {
  --blue:#1d4ed8;--blue-lt:#dbeafe;--blue-md:#93c5fd;
  --amber:#d97706;--amber-lt:#fef3c7;
  --green:#15803d;--green-lt:#dcfce7;
  --red:#dc2626;--red-lt:#fee2e2;
  --warn:#b45309;--warn-lt:#fef9c3;
  --ink:#0f172a;--ink2:#475569;--ink3:#94a3b8;
  --border:#e2e8f0;--surface:#ffffff;--bg:#f1f5f9;--bg2:#f8fafc;
  --accent:var(--blue);
  --shadow-sm:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
  --shadow-md:0 4px 12px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.04);
  --shadow-lg:0 12px 40px rgba(0,0,0,.14);
  --r-sm:6px;--r-md:10px;--r-lg:14px;
  --font:"Plus Jakarta Sans",system-ui,sans-serif;
  --mono:"JetBrains Mono","Courier New",monospace;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.bm-root{font-family:var(--font);background:var(--bg);min-height:100vh;padding:2rem 2.25rem;color:var(--ink);font-size:14px;line-height:1.5}
.fw-med{font-weight:600}.fw-bold{font-weight:700}
.ta-r{text-align:right}.ta-c{text-align:center}
.tc-muted{color:var(--ink2)}.tc-muted2{color:var(--ink3)}.tc-accent{color:var(--accent)}
.tc-red{color:var(--red)}.tc-green{color:var(--green)}.tc-amber{color:var(--amber)}.tc-ink{color:var(--ink)}
.lh-tight{line-height:1.3}.fs-xs{font-size:.75rem}.mt2{margin-top:3px}

.bm-header{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1.75rem}
.bm-header-text h1{font-size:1.7rem;font-weight:800;color:var(--ink);letter-spacing:-.5px}
.bm-header-text p{color:var(--ink3);font-size:.85rem;margin-top:3px}
.bm-header-right{display:flex;flex-direction:column;align-items:flex-end;gap:10px}
.bm-year-filter-wrap{display:flex;flex-direction:column;align-items:flex-end;gap:5px}
.bm-year-filter-label{font-size:.72rem;color:var(--ink3);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.bm-year-pills{display:flex;background:white;border-radius:12px;padding:4px;gap:4px;box-shadow:0 2px 10px rgba(0,0,0,.08);border:1px solid var(--border)}
.bm-year-pill{padding:7px 16px;border-radius:8px;border:none;cursor:pointer;font-size:.88rem;font-weight:500;background:transparent;color:var(--ink3);transition:all .2s;font-family:var(--font)}
.bm-year-pill:hover:not(.active){background:var(--bg);color:var(--ink2)}
.bm-year-pill.active{font-weight:700;background:linear-gradient(135deg,#1d4ed8,#2563eb);color:white;box-shadow:0 3px 10px rgba(29,78,216,.35);transform:translateY(-1px)}
.bm-tabs{display:flex;gap:4px;background:var(--surface);padding:4px;border-radius:var(--r-md);border:1px solid var(--border);box-shadow:var(--shadow-sm)}
.bm-tab{display:flex;align-items:center;gap:6px;padding:7px 18px;border:none;background:transparent;border-radius:var(--r-sm);font-family:var(--font);font-size:.82rem;font-weight:700;color:var(--ink3);cursor:pointer;transition:all .2s}
.bm-tab:hover{background:var(--bg);color:var(--ink2)}
.bm-tab.active{background:var(--blue);color:#fff;box-shadow:0 2px 8px rgba(29,78,216,.3)}

.bm-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;margin-bottom:1.25rem}
.bm-kpi{background:var(--surface);border-radius:var(--r-lg);padding:1.3rem 1.4rem;display:flex;align-items:flex-start;gap:1rem;border:1px solid var(--border);box-shadow:var(--shadow-sm);border-top:3px solid var(--border);transition:transform .15s,box-shadow .15s}
.bm-kpi:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.bm-kpi--blue{border-top-color:var(--blue)}.bm-kpi--amber{border-top-color:var(--amber)}.bm-kpi--green{border-top-color:var(--green)}
.bm-kpi-icon{width:40px;height:40px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.bm-kpi--blue .bm-kpi-icon{background:var(--blue-lt);color:var(--blue)}
.bm-kpi--amber .bm-kpi-icon{background:var(--amber-lt);color:var(--amber)}
.bm-kpi--green .bm-kpi-icon{background:var(--green-lt);color:var(--green)}
.bm-kpi-lbl{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--ink3)}
.bm-kpi-val{font-size:1.35rem;font-weight:800;letter-spacing:-.4px;color:var(--ink);margin-top:2px}
.bm-kpi-sub{font-size:.75rem;color:var(--ink3);margin-top:4px}
.bm-kpi-bar{height:5px;border-radius:99px;background:var(--bg);width:100%;overflow:hidden;margin-top:6px}
.bm-kpi-bar-fill{height:100%;border-radius:99px;transition:width .6s ease}

.bm-banner{display:flex;align-items:center;gap:7px;background:var(--blue-lt);border:1px solid var(--blue-md);border-radius:var(--r-sm);padding:8px 14px;font-size:.8rem;color:#1e40af;margin-bottom:1.25rem}

.bm-table-wrap{background:var(--surface);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--shadow-sm);overflow:hidden}
.bm-table-bar{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.5rem;border-bottom:1px solid var(--border)}
.bm-table-bar h2{font-size:.9rem;font-weight:700;color:var(--ink)}
.bm-search{display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-sm);padding:6px 12px;color:var(--ink3);transition:border-color .2s}
.bm-search:focus-within{border-color:var(--blue)}
.bm-search input{border:none;background:transparent;font-family:var(--font);font-size:.82rem;color:var(--ink);outline:none;width:220px}
.bm-table-scroll{overflow-x:auto}
.bm-table{width:100%;border-collapse:collapse;font-size:.83rem}
.bm-table thead th{background:var(--bg2);padding:10px 14px;text-align:left;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--ink3);border-bottom:1px solid var(--border);white-space:nowrap}
.bm-table td{padding:13px 14px;border-bottom:1px solid var(--border);vertical-align:middle}
.bm-row{cursor:pointer;transition:background .15s}
.bm-row:hover{background:#f8faff}
.bm-row--open{background:#eff6ff!important}
.bm-row--open td{border-bottom-color:transparent}
.bm-empty-cell{text-align:center;padding:3rem;color:var(--ink3);font-size:.85rem}

.bm-pct-wrap{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:80px}
.bm-pct-bar{width:70px;height:5px;border-radius:99px;background:var(--bg);overflow:hidden}
.bm-pct-fill{height:100%;border-radius:99px;transition:width .4s}
.bm-badge{font-size:.68rem;font-weight:700;padding:2px 8px;border-radius:99px}
.bm-status-lbl{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-top:1px}
.sc-safe .bm-pct-fill,.sc-safe.bm-kpi-bar-fill{background:var(--green)}
.sc-mid .bm-pct-fill,.sc-mid.bm-kpi-bar-fill{background:#3b82f6}
.sc-warn .bm-pct-fill,.sc-warn.bm-kpi-bar-fill{background:var(--warn)}
.sc-over .bm-pct-fill,.sc-over.bm-kpi-bar-fill{background:var(--red)}
.sc-safe.bm-badge{background:var(--green-lt);color:var(--green)}
.sc-mid.bm-badge{background:var(--blue-lt);color:var(--blue)}
.sc-warn.bm-badge{background:var(--warn-lt);color:var(--warn)}
.sc-over.bm-badge{background:var(--red-lt);color:var(--red)}
.sc-safe.bm-status-lbl{color:var(--green)}.sc-mid.bm-status-lbl{color:var(--blue)}
.sc-warn.bm-status-lbl{color:var(--warn)}.sc-over.bm-status-lbl{color:var(--red)}

.bm-pill{display:inline-flex;align-items:center;padding:2px 9px;border-radius:99px;font-size:.68rem;font-weight:700}
.bm-pill.blue{background:var(--blue-lt);color:var(--blue)}
.bm-code{font-family:var(--mono);font-size:.73rem;background:var(--bg);color:var(--ink2);padding:2px 7px;border-radius:4px;border:1px solid var(--border)}
.bm-code--aset{background:#eff6ff!important;color:var(--blue)!important;border-color:#bfdbfe!important}
.bm-type-badge{display:inline-block;padding:2px 7px;border-radius:4px;font-size:.68rem;font-weight:700}
.bm-type-badge.capex{background:#dbeafe;color:#1e40af}
.bm-type-badge.opex{background:#d1fae5;color:#065f46}

.bm-drill-row>td{padding:0;border-bottom:1px solid var(--border)}
.bm-drill-wrap{background:#f8faff;border-left:4px solid var(--blue);padding:1.1rem 1.4rem}
.bm-drill-header{display:flex;align-items:center;gap:7px;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink2);margin-bottom:.9rem;flex-wrap:wrap}
.bm-drill-actions{margin-left:auto;display:flex;gap:8px;align-items:center}

.bm-sub-table{width:100%;border-collapse:collapse;font-size:.8rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);overflow:hidden}
.bm-sub-table th{background:#eef2ff;padding:7px 11px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#4338ca;border-bottom:1px solid #c7d2fe}
.bm-sub-table td{padding:8px 11px;border-bottom:1px solid #f1f5f9;vertical-align:middle}
.bm-sub-table tr:last-child td{border-bottom:none}
.bm-sub-table tbody tr:hover td{background:#f8faff}
.bm-sub-total td{background:#f8fafc!important;border-top:1.5px solid var(--border)!important;font-size:.8rem}
.bm-date-cell{display:flex;align-items:center;gap:5px;color:var(--ink2);font-size:.8rem}
.bm-no-aset{font-size:.72rem;color:var(--ink3);font-style:italic}

/* ── Aset cell: plain, no link icon ── */
.bm-aset-plain{display:inline-flex;align-items:center}

.bm-projects{display:flex;flex-direction:column;gap:8px}
.bm-proj-card{border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden;background:var(--surface);transition:box-shadow .15s}
.bm-proj-card:hover{box-shadow:var(--shadow-sm)}
.bm-proj-card.open{border-color:#a5b4fc}
.bm-proj-row{display:flex;justify-content:space-between;align-items:flex-start;padding:10px 14px;cursor:pointer;gap:1rem;transition:background .15s}
.bm-proj-row:hover{background:var(--bg2)}
.bm-proj-card.open .bm-proj-row{background:#eff6ff;border-bottom:1px solid #c7d2fe}
.bm-proj-left{flex:1}
.bm-proj-name{font-weight:600;font-size:.82rem;color:#1e3a8a;line-height:1.4;margin-bottom:5px}
.bm-proj-meta{display:flex;flex-wrap:wrap;gap:10px;font-size:.72rem;color:var(--ink3);margin-bottom:4px}
.bm-meta-item{display:flex;align-items:center;gap:4px}
.bm-proj-refs{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:3px}
.bm-ref{background:#f1f5f9;color:var(--ink2);padding:2px 7px;border-radius:4px;font-family:var(--mono);font-size:.68rem}
.bm-proj-right{display:flex;align-items:center;gap:16px;flex-shrink:0}
.bm-proj-vals{display:flex;gap:16px;align-items:flex-end}
.bm-val-block{display:flex;flex-direction:column;align-items:flex-end}
.bm-val-lbl{font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink3)}
.bm-val-num{font-size:.82rem;font-weight:700}
.bm-val-num.rab{color:var(--ink3)}.bm-val-num.kontrak{color:var(--red)}.bm-val-num.aset{color:var(--blue)}
.bm-proj-actions{display:flex;flex-direction:column;align-items:flex-end;gap:5px}

.bm-balance-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:99px;font-size:.65rem;font-weight:700;letter-spacing:.3px;white-space:nowrap}
.bm-balance-badge--balanced{background:var(--green-lt);color:var(--green);border:1px solid #86efac}
.bm-balance-badge--near{background:var(--warn-lt);color:var(--warn);border:1px solid #fde047}
.bm-balance-badge--unbalanced{background:var(--red-lt);color:var(--red);border:1px solid #fca5a5}
.bm-balance-badge--empty{background:var(--bg2);color:var(--ink3);border:1px solid var(--border)}
.bm-balance-bar{display:flex;align-items:center;margin-top:8px;border-radius:var(--r-sm);border:1px solid;overflow:hidden;font-size:.78rem}
.bm-balance-bar--balanced{background:#f0fdf4;border-color:#86efac}
.bm-balance-bar--near{background:#fffbeb;border-color:#fde047}
.bm-balance-bar--unbalanced{background:#fff1f2;border-color:#fca5a5}
.bm-balance-bar-left{flex:1;display:flex}
.bm-balance-row{flex:1;display:flex;flex-direction:column;gap:2px;padding:10px 14px}
.bm-balance-row span{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink3)}
.bm-balance-row strong{font-size:.82rem;font-weight:700;color:var(--ink)}
.bm-balance-divider{width:1px;align-self:stretch}
.bm-balance-bar--balanced .bm-balance-divider{background:#86efac}
.bm-balance-bar--near .bm-balance-divider{background:#fde047}
.bm-balance-bar--unbalanced .bm-balance-divider{background:#fca5a5}
.bm-balance-bar-right{padding:10px 16px;display:flex;flex-direction:column;align-items:flex-end;gap:2px;min-width:160px}
.bm-balance-selisih-label{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink3)}
.bm-balance-selisih-val{font-size:.92rem;font-weight:800}
.bm-balance-selisih-val--balanced{color:var(--green)}
.bm-balance-selisih-val--near{color:var(--warn)}
.bm-balance-selisih-val--unbalanced{color:var(--red)}
.bm-balance-selisih-pct{font-size:.68rem;color:var(--ink3);font-weight:500}
.bm-asset-sub{background:var(--bg2);border-top:1px solid #e0e7ff;padding:12px 14px}
.bm-asset-sub-title{display:flex;align-items:center;gap:5px;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--blue);margin-bottom:8px}
.bm-capex-total{display:flex;justify-content:space-between;align-items:center;padding:9px 14px;background:#fef2f2;border:1px solid #fecaca;border-radius:var(--r-sm);margin-top:6px;font-size:.8rem;font-weight:600;color:var(--ink)}
.bm-empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:2rem;color:var(--ink3);font-size:.83rem}
.bm-empty--sm{padding:.8rem;flex-direction:row;justify-content:center;font-size:.76rem}

.anim-in{animation:slideIn .22s ease-out}
@keyframes slideIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}

/* ══ Edit Panel ══ */
.bm-row-edit-btn{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;background:white;border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font);font-size:.72rem;font-weight:700;color:var(--ink2);cursor:pointer;transition:all .2s;white-space:nowrap}
.bm-row-edit-btn:hover{background:var(--blue-lt);border-color:var(--blue);color:var(--blue)}
.bm-row-edit-btn.active{background:var(--blue);border-color:var(--blue);color:white}
.bm-edit-drawer{background:#f0f7ff;border-left:4px solid var(--blue);padding:0}
.bm-edit-drawer > td{padding:0;border-bottom:2px solid var(--blue)}
.bm-edit-panel{padding:1.4rem 1.6rem}
.bm-edit-panel-header{display:flex;align-items:center;gap:10px;margin-bottom:1.2rem;padding-bottom:.9rem;border-bottom:1px solid #c7d2fe}
.bm-edit-panel-header h3{font-size:.9rem;font-weight:800;color:var(--ink);flex:1}
.bm-edit-section{margin-bottom:1.4rem}
.bm-edit-section-title{display:flex;align-items:center;gap:7px;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--blue);margin-bottom:.8rem;padding-bottom:5px;border-bottom:1px solid #dbeafe}
.bm-edit-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.8rem}
.bm-edit-grid-2{grid-template-columns:repeat(2,1fr)}
.bm-edit-grid-full{grid-column:1/-1}
.bm-edit-field{display:flex;flex-direction:column;gap:5px}
.bm-edit-field label{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink2)}
.bm-edit-field input,.bm-edit-field textarea,.bm-edit-field select{padding:8px 10px;border:1px solid var(--border);border-radius:7px;font-family:var(--font);font-size:.82rem;color:var(--ink);outline:none;transition:all .2s;background:white}
.bm-edit-field input:focus,.bm-edit-field textarea:focus,.bm-edit-field select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(29,78,216,.1)}
.bm-edit-field textarea{resize:vertical;min-height:52px}
.bm-edit-field input[readonly]{background:#f8fafc;color:var(--ink3);cursor:default}
.bm-edit-hint{font-size:.7rem;color:var(--green);font-weight:600;margin-top:2px}
.bm-edit-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:1rem;padding-top:.9rem;border-top:1px solid #c7d2fe}
.bm-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-family:var(--font);font-size:.8rem;font-weight:700;cursor:pointer;border:none;transition:all .2s}
.bm-btn-cancel{background:white;color:var(--ink2);border:1px solid var(--border)}
.bm-btn-cancel:hover{background:var(--bg)}
.bm-btn-save{background:linear-gradient(135deg,var(--blue),#3b82f6);color:white;box-shadow:0 2px 8px rgba(29,78,216,.25)}
.bm-btn-save:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(29,78,216,.4)}
.bm-btn-danger{background:var(--red-lt);color:var(--red);border:1px solid #fca5a5}
.bm-btn-danger:hover{background:#fecaca}
.bm-btn-add-sm{background:linear-gradient(135deg,var(--blue),#3b82f6);color:white;font-size:.72rem;padding:5px 12px;box-shadow:0 1px 5px rgba(29,78,216,.2)}
.bm-btn-add-sm:hover{transform:translateY(-1px)}
.bm-btn-add-realisasi{margin-left:auto;display:inline-flex;align-items:center;gap:5px;padding:6px 12px;background:linear-gradient(135deg,var(--blue),#3b82f6);color:white;border:none;border-radius:7px;font-size:.72rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:var(--font);box-shadow:0 2px 8px rgba(29,78,216,.25)}
.bm-btn-add-realisasi:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(29,78,216,.4)}
.bm-proj-edit-card{background:white;border:1px solid #c7d2fe;border-radius:var(--r-md);overflow:hidden;margin-bottom:10px}
.bm-proj-edit-card-header{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#eef2ff;border-bottom:1px solid #c7d2fe}
.bm-proj-edit-card-title{font-size:.78rem;font-weight:700;color:#3730a3;flex:1}
.bm-real-edit-row{background:#fffff8;border:1px solid #fde68a;border-radius:var(--r-sm);padding:12px;margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px}
.bm-real-edit-row.new-row{background:#f0fff4;border-color:#86efac}
.bm-real-edit-fullrow{grid-column:1/-1}
.bm-asset-edit-row{background:white;border:1px solid #e0e7ff;border-radius:var(--r-sm);padding:10px;margin-top:8px}
.bm-asset-edit-row-header{display:flex;align-items:center;gap:8px;margin-bottom:8px}

/* ══ Invoice File Attachment ══ */
.bm-file-drop-zone{border:2px dashed #c7d2fe;border-radius:8px;padding:9px 12px;background:#f8faff;transition:all .2s;cursor:pointer;position:relative}
.bm-file-drop-zone:hover,.bm-file-drop-zone.drag-over{border-color:var(--blue);background:#eff6ff}
.bm-file-drop-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.bm-file-drop-inner{display:flex;align-items:center;gap:7px;pointer-events:none}
.bm-file-drop-inner svg{color:var(--blue);flex-shrink:0}
.bm-file-drop-text{font-size:.73rem;color:var(--ink2);font-weight:500}
.bm-file-drop-hint{font-size:.65rem;color:var(--ink3);margin-left:auto}
.bm-file-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
.bm-file-chip{display:inline-flex;align-items:center;gap:4px;background:white;border:1px solid #bfdbfe;border-radius:20px;padding:3px 8px 3px 6px;font-size:.68rem;color:#1e40af;font-weight:600;max-width:200px}
.bm-file-chip-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:120px}
.bm-file-chip-size{color:#94a3b8;font-weight:400;font-size:.62rem;flex-shrink:0}
.bm-file-chip-del{display:flex;align-items:center;background:none;border:none;cursor:pointer;padding:0;color:#94a3b8;transition:color .15s;flex-shrink:0;line-height:1}
.bm-file-chip-del:hover{color:var(--red)}
/* View chip for lampiran — paperclip icon here is intentional */
.bm-file-view-chip{display:inline-flex;align-items:center;gap:4px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;padding:2px 8px;font-size:.68rem;color:var(--blue);font-weight:600}

/* ══ Toast & Modal & Confirm ══ */
.bm-toast{position:fixed;bottom:24px;right:24px;background:var(--ink);color:white;padding:12px 20px;border-radius:12px;font-size:.82rem;font-weight:600;box-shadow:var(--shadow-lg);display:flex;align-items:center;gap:8px;z-index:9999;animation:toastIn .3s cubic-bezier(.16,1,.3,1)}
.bm-toast.success{background:var(--green)}.bm-toast.error{background:var(--red)}
@keyframes toastIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.bm-modal-overlay{position:fixed;inset:0;background:rgba(10,22,40,.6);display:flex;align-items:center;justify-content:center;z-index:2000;backdrop-filter:blur(4px);padding:20px;animation:fadeOvl .2s ease}
@keyframes fadeOvl{from{opacity:0}to{opacity:1}}
.bm-modal{background:var(--surface);border-radius:18px;width:100%;max-width:540px;box-shadow:var(--shadow-lg);display:flex;flex-direction:column;overflow:hidden;animation:modalUp .25s cubic-bezier(.16,1,.3,1)}
@keyframes modalUp{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.bm-modal-header{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;background:var(--bg2);border-bottom:1px solid var(--border)}
.bm-modal-header-left{display:flex;align-items:center;gap:12px}
.bm-modal-icon{width:40px;height:40px;border-radius:10px;background:var(--blue-lt);color:var(--blue);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.bm-modal-header h3{font-size:.95rem;font-weight:800;color:var(--ink);margin:0}
.bm-modal-header p{font-size:.75rem;color:var(--ink3);margin:2px 0 0}
.bm-modal-close{width:32px;height:32px;border-radius:8px;border:1px solid var(--border);background:var(--surface);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--ink3);transition:all .2s}
.bm-modal-close:hover{background:var(--red-lt);border-color:#fecaca;color:var(--red)}
.bm-modal-body{padding:20px 22px;display:flex;flex-direction:column;gap:16px}
.bm-modal-info-bar{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px 14px}
.bm-modal-info-item{display:flex;flex-direction:column;gap:3px}
.bm-modal-info-item span{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink3)}
.bm-modal-info-item strong{font-size:.9rem;font-weight:800;color:var(--ink)}
.bm-form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.bm-form-group{display:flex;flex-direction:column;gap:6px}
.bm-form-group--full{grid-column:1/-1}
.bm-form-group label{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink2);display:flex;align-items:center;gap:4px}
.bm-form-group input,.bm-form-group textarea{padding:9px 12px;border:1px solid var(--border);border-radius:8px;font-family:var(--font);font-size:.85rem;color:var(--ink);outline:none;transition:all .2s;background:var(--surface)}
.bm-form-group input:focus,.bm-form-group textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(29,78,216,.1)}
.bm-form-group textarea{resize:vertical;min-height:56px}
.bm-form-hint{font-size:.72rem;color:var(--green);font-weight:600}
.bm-form-hint--muted{color:var(--ink3);font-weight:400}
.bm-optional-badge{background:#e0f2fe;color:#0369a1;font-size:.62rem;font-weight:700;padding:2px 7px;border-radius:20px;text-transform:none;letter-spacing:0;margin-left:4px}
.req{color:var(--red);margin-left:1px}
.bm-modal-footer{display:flex;align-items:center;justify-content:flex-end;gap:10px;padding:16px 22px;background:var(--bg2);border-top:1px solid var(--border)}
.bm-btn-save-modal{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:linear-gradient(135deg,var(--blue),#3b82f6);color:white;border:none;border-radius:8px;font-family:var(--font);font-size:.82rem;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 3px 10px rgba(29,78,216,.3)}
.bm-btn-save-modal:hover{transform:translateY(-1px);box-shadow:0 5px 14px rgba(29,78,216,.4)}
.bm-btn-cancel-modal{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--ink2);font-family:var(--font);font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s}
.bm-btn-cancel-modal:hover{background:var(--bg)}
.bm-confirm-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:9000;padding:20px}
.bm-confirm-box{background:white;border-radius:16px;padding:28px 24px;max-width:360px;width:100%;box-shadow:var(--shadow-lg);display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;animation:modalUp .22s cubic-bezier(.16,1,.3,1)}
.bm-confirm-icon{width:50px;height:50px;background:#fff7ed;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#f97316}
.bm-confirm-msg{font-size:.9rem;color:var(--ink);font-weight:500;line-height:1.5}
.bm-confirm-actions{display:flex;gap:10px}

/* ══ Lampiran th icon ══ */
.bm-th-with-icon{display:inline-flex;align-items:center;gap:4px}

@media(max-width:768px){
  .bm-root{padding:1rem}
  .bm-header{flex-direction:column;align-items:flex-start}
  .bm-header-right{align-items:flex-start}
  .bm-search input{width:150px}
  .bm-edit-grid{grid-template-columns:1fr}
  .bm-edit-grid-2{grid-template-columns:1fr}
  .bm-real-edit-row{grid-template-columns:1fr}
}
`;

// ══════════════════════════════════════════════════════════════════
// InvoiceAttachment — reusable drop-zone component
// ══════════════════════════════════════════════════════════════════
function InvoiceAttachment({ files = [], onChange, compact = false }) {
  const [dragging, setDragging] = useState(false);

  const handleFiles = (incoming) => {
    const arr = Array.from(incoming);
    const mapped = arr.map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      _file: f,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    }));
    onChange([...files, ...mapped]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id) => onChange(files.filter((f) => f.id !== id));

  return (
    <div>
      <div
        className={`bm-file-drop-zone${dragging ? " drag-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
          onChange={(e) => {
            if (e.target.files.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <div className="bm-file-drop-inner">
          <Icon d={Icons.upload} size={14} />
          <span className="bm-file-drop-text">
            {compact
              ? "Drop atau klik untuk lampirkan invoice"
              : "Drop file atau klik untuk upload lampiran invoice"}
          </span>
          <span className="bm-file-drop-hint">PDF, JPG, PNG, Excel, Word</span>
        </div>
      </div>
      {files.length > 0 && (
        <div className="bm-file-chips">
          {files.map((f) => (
            <span key={f.id} className="bm-file-chip">
              <Icon
                d={Icons.file}
                size={11}
                style={{ flexShrink: 0, color: "#3b82f6" }}
              />
              <span className="bm-file-chip-name" title={f.name}>
                {f.name}
              </span>
              <span className="bm-file-chip-size">{fmtFileSize(f.size)}</span>
              <button
                className="bm-file-chip-del"
                onClick={() => removeFile(f.id)}
                title="Hapus lampiran"
              >
                <Icon d={Icons.x} size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// Toast
// ══════════════════════════════════════════════════════════════════
function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`bm-toast ${type}`}>
      <Icon d={Icons.check} size={15} />
      {msg}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ConfirmDialog
// ══════════════════════════════════════════════════════════════════
function ConfirmDialog({ msg, onConfirm, onCancel }) {
  return (
    <div className="bm-confirm-overlay" onClick={onCancel}>
      <div className="bm-confirm-box" onClick={(e) => e.stopPropagation()}>
        <div className="bm-confirm-icon">
          <Icon d={Icons.warning} size={24} />
        </div>
        <p className="bm-confirm-msg">{msg}</p>
        <div className="bm-confirm-actions">
          <button className="bm-btn bm-btn-cancel" onClick={onCancel}>
            Batal
          </button>
          <button className="bm-btn bm-btn-danger" onClick={onConfirm}>
            <Icon d={Icons.trash} size={13} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ModalRealisasiOpex — with invoice attachment
// ══════════════════════════════════════════════════════════════════
function ModalRealisasi({ anggaran, onClose, onSave }) {
  const [form, setForm] = useState({
    tanggal_realisasi: new Date().toISOString().split("T")[0],
    jumlah: "",
    keterangan: "",
    no_invoice: "",
    id_aset: "",
    lampiran: [],
  });

  const save = () => {
    if (!form.jumlah || !form.keterangan || !form.tanggal_realisasi) {
      alert("Tanggal, jumlah, dan keterangan wajib diisi.");
      return;
    }
    onSave({
      ...form,
      jumlah: parseFloat(form.jumlah),
      id_aset: form.id_aset || null,
    });
    onClose();
  };

  return (
    <div className="bm-modal-overlay" onClick={onClose}>
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bm-modal-header">
          <div className="bm-modal-header-left">
            <div className="bm-modal-icon">
              <Icon d={Icons.receipt} size={18} />
            </div>
            <div>
              <h3>Tambah Realisasi OPEX</h3>
              <p>{anggaran.nm_anggaran_master}</p>
            </div>
          </div>
          <button className="bm-modal-close" onClick={onClose}>
            <Icon d={Icons.x} size={16} />
          </button>
        </div>
        <div className="bm-modal-body">
          <div className="bm-modal-info-bar">
            <div className="bm-modal-info-item">
              <span>Pagu</span>
              <strong>{fmt(anggaran.nilai_anggaran_tahunan)}</strong>
            </div>
            <div className="bm-modal-info-item">
              <span>Terpakai</span>
              <strong className="tc-amber">{fmt(anggaran.used)}</strong>
            </div>
            <div className="bm-modal-info-item">
              <span>Sisa</span>
              <strong
                className={anggaran.remaining < 0 ? "tc-red" : "tc-green"}
              >
                {fmt(anggaran.remaining)}
              </strong>
            </div>
          </div>
          <div className="bm-form-grid">
            <div className="bm-form-group">
              <label>
                Tanggal Realisasi <span className="req">*</span>
              </label>
              <input
                type="date"
                value={form.tanggal_realisasi}
                onChange={(e) =>
                  setForm({ ...form, tanggal_realisasi: e.target.value })
                }
              />
            </div>
            <div className="bm-form-group">
              <label>
                No. Invoice <span className="bm-optional-badge">Opsional</span>
              </label>
              <input
                placeholder="INV/2026/001"
                value={form.no_invoice}
                onChange={(e) =>
                  setForm({ ...form, no_invoice: e.target.value })
                }
              />
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>
                Jumlah (IDR) <span className="req">*</span>
              </label>
              <input
                type="number"
                placeholder="0"
                value={form.jumlah}
                onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
              />
              {form.jumlah && (
                <span className="bm-form-hint">≈ {fmt(form.jumlah)}</span>
              )}
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>
                Keterangan <span className="req">*</span>
              </label>
              <textarea
                rows="2"
                value={form.keterangan}
                onChange={(e) =>
                  setForm({ ...form, keterangan: e.target.value })
                }
              />
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>
                ID Aset{" "}
                <span className="bm-optional-badge">Opsional</span>
              </label>
              <input
                placeholder="Kosongkan jika tidak ada"
                value={form.id_aset}
                onChange={(e) => setForm({ ...form, id_aset: e.target.value })}
              />
              <span className="bm-form-hint bm-form-hint--muted">
                Isi jika berhubungan dengan aset di inventory
              </span>
            </div>
            {/* ── Invoice Attachment ── */}
            <div className="bm-form-group bm-form-group--full">
              <label>
                <Icon d={Icons.paperclip} size={11} /> Lampiran Invoice{" "}
                <span className="bm-optional-badge">Opsional</span>
              </label>
              <InvoiceAttachment
                files={form.lampiran}
                onChange={(lamps) => setForm({ ...form, lampiran: lamps })}
              />
            </div>
          </div>
        </div>
        <div className="bm-modal-footer">
          <button className="bm-btn-cancel-modal" onClick={onClose}>
            <Icon d={Icons.x} size={14} /> Batal
          </button>
          <button className="bm-btn-save-modal" onClick={save}>
            <Icon d={Icons.save} size={14} /> Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// Balance components
// ══════════════════════════════════════════════════════════════════
function BalanceBadge({ assets, nilaiKontrak }) {
  const info = getBalanceInfo(assets, nilaiKontrak);
  return (
    <span className={`bm-balance-badge bm-balance-badge--${info.status}`}>
      {info.status === "balanced" && <Icon d={Icons.checkCirc} size={10} />}
      {info.status === "near" && <Icon d={Icons.alertCirc} size={10} />}
      {info.status === "unbalanced" && <Icon d={Icons.warning} size={10} />}
      {info.status === "empty" && <Icon d={Icons.minusCirc} size={10} />}
      {info.label}
    </span>
  );
}

function BalanceBar({ assets, nilaiKontrak }) {
  const info = getBalanceInfo(assets, nilaiKontrak);
  if (info.status === "empty") return null;
  return (
    <div className={`bm-balance-bar bm-balance-bar--${info.status}`}>
      <div className="bm-balance-bar-left">
        <div className="bm-balance-row">
          <span>Nilai Kontrak</span>
          <strong>{fmt(nilaiKontrak)}</strong>
        </div>
        <div className="bm-balance-row">
          <span>Total Nilai Aset</span>
          <strong>{fmt(info.sumAset)}</strong>
        </div>
      </div>
      <div className="bm-balance-divider" />
      <div className="bm-balance-bar-right">
        <div className="bm-balance-selisih-label">Selisih</div>
        <div
          className={`bm-balance-selisih-val bm-balance-selisih-val--${info.status}`}
        >
          {info.selisih === 0
            ? "—"
            : info.selisih > 0
              ? `− ${fmt(info.selisih)}`
              : `+ ${fmt(Math.abs(info.selisih))}`}
        </div>
        {info.status !== "balanced" && (
          <div className="bm-balance-selisih-pct">
            {info.pct.toFixed(1)}% dari kontrak
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// EDIT PANEL — OPEX (with invoice attachment per realisasi row)
// ══════════════════════════════════════════════════════════════════
function OpexEditPanel({ item, realisasiOpex, onSave, onCancel, showToast }) {
  const [pagu, setPagu] = useState(String(item.raw.nilai_anggaran_tahunan));
  const [nama, setNama] = useState(item.raw.nm_anggaran_master);
  const [kode, setKode] = useState(item.raw.kd_anggaran_master);
  const [realisasiList, setRealisasiList] = useState(
    realisasiOpex
      .filter((r) => r.id_anggaran_tahunan === item.raw.id_anggaran_tahunan)
      .map((r) => ({ ...r, lampiran: r.lampiran || [] })),
  );
  const [confirm, setConfirm] = useState(null);

  const updateReal = (id, field, val) =>
    setRealisasiList(
      realisasiList.map((r) =>
        r.id_realisasi === id ? { ...r, [field]: val } : r,
      ),
    );

  const addReal = () =>
    setRealisasiList([
      ...realisasiList,
      {
        id_realisasi: newId(),
        id_anggaran_tahunan: item.raw.id_anggaran_tahunan,
        tanggal_realisasi: new Date().toISOString().split("T")[0],
        jumlah: "",
        keterangan: "",
        no_invoice: "",
        id_aset: "",
        lampiran: [],
        _new: true,
      },
    ]);

  const removeReal = (id) =>
    setRealisasiList(realisasiList.filter((r) => r.id_realisasi !== id));

  const handleSave = () => {
    onSave({
      type: "opex",
      itemId: item.id,
      pagu: parseFloat(pagu) || 0,
      nama,
      kode,
      realisasiList,
    });
    showToast("Perubahan OPEX berhasil disimpan", "success");
    onCancel();
  };

  return (
    <>
      {confirm && (
        <ConfirmDialog
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      <tr className="bm-edit-drawer anim-in">
        <td colSpan="7">
          <div className="bm-edit-panel">
            <div className="bm-edit-panel-header">
              <div
                className="bm-modal-icon"
                style={{ width: 34, height: 34, borderRadius: 8 }}
              >
                <Icon d={Icons.edit} size={16} />
              </div>
              <h3>Edit Pos Anggaran OPEX</h3>
              <button className="bm-btn bm-btn-cancel" onClick={onCancel}>
                <Icon d={Icons.x} size={13} /> Batal
              </button>
            </div>

            <div className="bm-edit-section">
              <div className="bm-edit-section-title">
                <Icon d={Icons.fileText} size={13} /> Informasi Anggaran
              </div>
              <div className="bm-edit-grid bm-edit-grid-2">
                <div className="bm-edit-field">
                  <label>Kode Anggaran Master</label>
                  <input
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    placeholder="5030905000"
                  />
                </div>
                <div className="bm-edit-field">
                  <label>Pagu Anggaran Tahunan (IDR)</label>
                  <input
                    type="number"
                    value={pagu}
                    onChange={(e) => setPagu(e.target.value)}
                  />
                  {pagu && (
                    <span className="bm-edit-hint">
                      ≈ {fmt(parseFloat(pagu) || 0)}
                    </span>
                  )}
                </div>
                <div className="bm-edit-field bm-edit-grid-full">
                  <label>Nama Mata Anggaran</label>
                  <input
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="bm-edit-section">
              <div className="bm-edit-section-title">
                <Icon d={Icons.receipt} size={13} /> Daftar Realisasi
                <span className="bm-pill blue" style={{ marginLeft: 4 }}>
                  {realisasiList.length}
                </span>
                <button
                  className="bm-btn bm-btn-add-sm"
                  style={{ marginLeft: "auto" }}
                  onClick={addReal}
                >
                  <Icon d={Icons.plus} size={13} /> Tambah Baris
                </button>
              </div>

              {realisasiList.length === 0 && (
                <div className="bm-empty bm-empty--sm">
                  <Icon d={Icons.receipt} size={16} />
                  <span>Belum ada realisasi</span>
                </div>
              )}

              {realisasiList.map((r, i) => (
                <div
                  key={r.id_realisasi}
                  className={`bm-real-edit-row ${r._new ? "new-row" : ""}`}
                >
                  <div className="bm-edit-field">
                    <label>Tanggal</label>
                    <input
                      type="date"
                      value={r.tanggal_realisasi}
                      onChange={(e) =>
                        updateReal(
                          r.id_realisasi,
                          "tanggal_realisasi",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="bm-edit-field">
                    <label>
                      No. Invoice{" "}
                      <span
                        style={{
                          fontSize: ".6rem",
                          color: "var(--ink3)",
                          fontWeight: 400,
                          textTransform: "none",
                          letterSpacing: 0,
                        }}
                      >
                        (opsional)
                      </span>
                    </label>
                    <input
                      value={r.no_invoice || ""}
                      onChange={(e) =>
                        updateReal(r.id_realisasi, "no_invoice", e.target.value)
                      }
                      placeholder="INV/..."
                    />
                  </div>
                  <div className="bm-edit-field bm-real-edit-fullrow">
                    <label>Keterangan</label>
                    <input
                      value={r.keterangan}
                      onChange={(e) =>
                        updateReal(r.id_realisasi, "keterangan", e.target.value)
                      }
                      placeholder="Keterangan transaksi..."
                    />
                  </div>
                  <div className="bm-edit-field">
                    <label>Jumlah (IDR)</label>
                    <input
                      type="number"
                      value={r.jumlah}
                      onChange={(e) =>
                        updateReal(r.id_realisasi, "jumlah", e.target.value)
                      }
                    />
                    {r.jumlah && (
                      <span className="bm-edit-hint">≈ {fmt(r.jumlah)}</span>
                    )}
                  </div>
                  <div
                    className="bm-edit-field"
                    style={{ position: "relative" }}
                  >
                    <label>ID Aset</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      <input
                        value={r.id_aset || ""}
                        onChange={(e) =>
                          updateReal(r.id_realisasi, "id_aset", e.target.value)
                        }
                        placeholder="AST-OPX-..."
                        style={{ flex: 1 }}
                      />
                      <button
                        className="bm-btn bm-btn-danger"
                        style={{ padding: "6px 10px", flexShrink: 0 }}
                        onClick={() =>
                          setConfirm({
                            msg: `Hapus realisasi "${r.keterangan || `#${i + 1}`}"?`,
                            onConfirm: () => {
                              removeReal(r.id_realisasi);
                              setConfirm(null);
                            },
                          })
                        }
                      >
                        <Icon d={Icons.trash} size={13} />
                      </button>
                    </div>
                  </div>
                  {/* ── Lampiran Invoice per baris ── */}
                  <div className="bm-edit-field bm-real-edit-fullrow">
                    <label>
                      <Icon
                        d={Icons.paperclip}
                        size={11}
                        style={{ display: "inline", marginRight: 3 }}
                      />
                      Lampiran Invoice{" "}
                      <span
                        style={{
                          fontSize: ".6rem",
                          color: "var(--ink3)",
                          fontWeight: 400,
                          textTransform: "none",
                          letterSpacing: 0,
                        }}
                      >
                        (opsional)
                      </span>
                    </label>
                    <InvoiceAttachment
                      files={r.lampiran || []}
                      onChange={(lamps) =>
                        updateReal(r.id_realisasi, "lampiran", lamps)
                      }
                      compact
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bm-edit-actions">
              <button className="bm-btn bm-btn-cancel" onClick={onCancel}>
                <Icon d={Icons.x} size={13} /> Batal
              </button>
              <button className="bm-btn bm-btn-save" onClick={handleSave}>
                <Icon d={Icons.save} size={13} /> Simpan Perubahan
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════
// EDIT PANEL — CAPEX
// ══════════════════════════════════════════════════════════════════
function CapexEditPanel({ item, onSave, onCancel, showToast }) {
  const [pagu, setPagu] = useState(String(item.raw.nilai_anggaran_rkap));
  const [nama, setNama] = useState(item.raw.nm_anggaran_capex);
  const [projects, setProjects] = useState(
    item.projects.map((p) => ({
      ...p,
      assets: p.assets ? p.assets.map((a) => ({ ...a })) : [],
    })),
  );
  const [confirm, setConfirm] = useState(null);
  const [expandedProj, setExpandedProj] = useState(null);

  const updateProj = (id, field, val) =>
    setProjects(
      projects.map((p) => (p.id_pekerjaan === id ? { ...p, [field]: val } : p)),
    );
  const addProj = () =>
    setProjects([
      ...projects,
      {
        id_pekerjaan: newId(),
        nm_pekerjaan: "",
        nilai_rab: "",
        nilai_kontrak: "",
        no_pr: "",
        no_po: "",
        no_kontrak: "",
        tgl_kontrak: new Date().toISOString().split("T")[0],
        durasi_kontrak: "",
        no_sp3: "",
        tgl_sp3: "",
        tgl_bamk: "",
        assets: [],
        _new: true,
      },
    ]);
  const removeProj = (id) =>
    setProjects(projects.filter((p) => p.id_pekerjaan !== id));
  const addAsset = (projId) =>
    setProjects(
      projects.map((p) =>
        p.id_pekerjaan === projId
          ? {
              ...p,
              assets: [
                ...p.assets,
                {
                  asset_code: newId(),
                  name: "",
                  brand: "",
                  model: "",
                  serial_number: "",
                  procurement_date: new Date().toISOString().split("T")[0],
                  acquisition_value: "",
                  _new: true,
                },
              ],
            }
          : p,
      ),
    );
  const updateAsset = (projId, assetCode, field, val) =>
    setProjects(
      projects.map((p) =>
        p.id_pekerjaan === projId
          ? {
              ...p,
              assets: p.assets.map((a) =>
                a.asset_code === assetCode ? { ...a, [field]: val } : a,
              ),
            }
          : p,
      ),
    );
  const removeAsset = (projId, assetCode) =>
    setProjects(
      projects.map((p) =>
        p.id_pekerjaan === projId
          ? { ...p, assets: p.assets.filter((a) => a.asset_code !== assetCode) }
          : p,
      ),
    );

  const handleSave = () => {
    onSave({
      type: "capex",
      itemId: item.id,
      pagu: parseFloat(pagu) || 0,
      nama,
      projects,
    });
    showToast("Perubahan CAPEX berhasil disimpan", "success");
    onCancel();
  };

  return (
    <>
      {confirm && (
        <ConfirmDialog
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      <tr className="bm-edit-drawer anim-in">
        <td colSpan="7">
          <div className="bm-edit-panel">
            <div className="bm-edit-panel-header">
              <div
                className="bm-modal-icon"
                style={{ width: 34, height: 34, borderRadius: 8 }}
              >
                <Icon d={Icons.edit} size={16} />
              </div>
              <h3>Edit Pos Anggaran CAPEX</h3>
              <button className="bm-btn bm-btn-cancel" onClick={onCancel}>
                <Icon d={Icons.x} size={13} /> Batal
              </button>
            </div>
            <div className="bm-edit-section">
              <div className="bm-edit-section-title">
                <Icon d={Icons.briefcase} size={13} /> Informasi Anggaran CAPEX
              </div>
              <div className="bm-edit-grid bm-edit-grid-2">
                <div className="bm-edit-field">
                  <label>Kode Anggaran CAPEX</label>
                  <input value={item.raw.kd_anggaran_capex} readOnly />
                </div>
                <div className="bm-edit-field">
                  <label>Nilai Anggaran RKAP (IDR)</label>
                  <input
                    type="number"
                    value={pagu}
                    onChange={(e) => setPagu(e.target.value)}
                  />
                  {pagu && (
                    <span className="bm-edit-hint">
                      ≈ {fmt(parseFloat(pagu) || 0)}
                    </span>
                  )}
                </div>
                <div className="bm-edit-field bm-edit-grid-full">
                  <label>Nama Anggaran CAPEX</label>
                  <input
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="bm-edit-section">
              <div className="bm-edit-section-title">
                <Icon d={Icons.fileText} size={13} /> Daftar Pekerjaan / Kontrak
                <span className="bm-pill blue" style={{ marginLeft: 4 }}>
                  {projects.length}
                </span>
                <button
                  className="bm-btn bm-btn-add-sm"
                  style={{ marginLeft: "auto" }}
                  onClick={addProj}
                >
                  <Icon d={Icons.plus} size={13} /> Tambah Pekerjaan
                </button>
              </div>
              {projects.length === 0 && (
                <div className="bm-empty bm-empty--sm">
                  <Icon d={Icons.fileText} size={16} />
                  <span>Belum ada pekerjaan</span>
                </div>
              )}
              {projects.map((proj, idx) => {
                const isOpen = expandedProj === proj.id_pekerjaan;
                return (
                  <div key={proj.id_pekerjaan} className="bm-proj-edit-card">
                    <div className="bm-proj-edit-card-header">
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          color: "#6366f1",
                        }}
                        onClick={() =>
                          setExpandedProj(isOpen ? null : proj.id_pekerjaan)
                        }
                      >
                        <Icon
                          d={isOpen ? Icons.chevUp : Icons.chevDown}
                          size={15}
                        />
                      </button>
                      <span className="bm-proj-edit-card-title">
                        Pekerjaan #{idx + 1}
                        {proj.nm_pekerjaan
                          ? ` — ${proj.nm_pekerjaan.substring(0, 60)}...`
                          : ""}
                        {proj._new && (
                          <span
                            style={{
                              marginLeft: 8,
                              fontSize: ".65rem",
                              background: "#dcfce7",
                              color: "#15803d",
                              padding: "1px 7px",
                              borderRadius: 99,
                              fontWeight: 700,
                            }}
                          >
                            Baru
                          </span>
                        )}
                      </span>
                      <button
                        className="bm-btn bm-btn-danger"
                        style={{ padding: "4px 10px", fontSize: ".7rem" }}
                        onClick={() =>
                          setConfirm({
                            msg: `Hapus pekerjaan "${proj.nm_pekerjaan ? proj.nm_pekerjaan.substring(0, 40) + "..." : `#${idx + 1}`}" beserta semua asetnya?`,
                            onConfirm: () => {
                              removeProj(proj.id_pekerjaan);
                              setConfirm(null);
                            },
                          })
                        }
                      >
                        <Icon d={Icons.trash} size={13} /> Hapus
                      </button>
                    </div>
                    {isOpen && (
                      <div style={{ padding: "12px 14px" }} className="anim-in">
                        <div
                          className="bm-edit-grid"
                          style={{ marginBottom: 10 }}
                        >
                          <div className="bm-edit-field bm-edit-grid-full">
                            <label>Nama Pekerjaan</label>
                            <textarea
                              rows="2"
                              value={proj.nm_pekerjaan}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "nm_pekerjaan",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="bm-edit-field">
                            <label>Nilai RAB (IDR)</label>
                            <input
                              type="number"
                              value={proj.nilai_rab || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "nilai_rab",
                                  e.target.value,
                                )
                              }
                            />
                            {proj.nilai_rab > 0 && (
                              <span className="bm-edit-hint">
                                ≈ {fmt(proj.nilai_rab)}
                              </span>
                            )}
                          </div>
                          <div className="bm-edit-field">
                            <label>Nilai Kontrak (IDR)</label>
                            <input
                              type="number"
                              value={proj.nilai_kontrak || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "nilai_kontrak",
                                  e.target.value,
                                )
                              }
                            />
                            {proj.nilai_kontrak > 0 && (
                              <span className="bm-edit-hint">
                                ≈ {fmt(proj.nilai_kontrak)}
                              </span>
                            )}
                          </div>
                          <div className="bm-edit-field">
                            <label>No. PR</label>
                            <input
                              value={proj.no_pr || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "no_pr",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="bm-edit-field">
                            <label>No. PO</label>
                            <input
                              value={proj.no_po || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "no_po",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="bm-edit-field">
                            <label>No. Kontrak</label>
                            <input
                              value={proj.no_kontrak || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "no_kontrak",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="bm-edit-field">
                            <label>Tgl Kontrak</label>
                            <input
                              type="date"
                              value={proj.tgl_kontrak || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "tgl_kontrak",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="bm-edit-field">
                            <label>Durasi (Hari)</label>
                            <input
                              type="number"
                              value={proj.durasi_kontrak || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "durasi_kontrak",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="bm-edit-field">
                            <label>No. SP3</label>
                            <input
                              value={proj.no_sp3 || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "no_sp3",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="bm-edit-field">
                            <label>Tgl SP3</label>
                            <input
                              type="date"
                              value={proj.tgl_sp3 || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "tgl_sp3",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="bm-edit-field">
                            <label>Tgl BAMK</label>
                            <input
                              type="date"
                              value={proj.tgl_bamk || ""}
                              onChange={(e) =>
                                updateProj(
                                  proj.id_pekerjaan,
                                  "tgl_bamk",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            borderTop: "1px dashed #c7d2fe",
                            paddingTop: 10,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 8,
                            }}
                          >
                            <Icon
                              d={Icons.layers}
                              size={13}
                              style={{ color: "#6366f1" }}
                            />
                            <span
                              style={{
                                fontSize: ".72rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: ".5px",
                                color: "#4338ca",
                              }}
                            >
                              Aset ({proj.assets.length})
                            </span>
                            <button
                              className="bm-btn bm-btn-add-sm"
                              style={{
                                marginLeft: "auto",
                                fontSize: ".68rem",
                                padding: "4px 10px",
                              }}
                              onClick={() => addAsset(proj.id_pekerjaan)}
                            >
                              <Icon d={Icons.plus} size={12} /> Tambah Aset
                            </button>
                          </div>
                          {proj.assets.map((asset, aIdx) => (
                            <div
                              key={asset.asset_code}
                              className="bm-asset-edit-row"
                            >
                              <div className="bm-asset-edit-row-header">
                                <span
                                  style={{
                                    fontSize: ".7rem",
                                    fontWeight: 700,
                                    color: "#0369a1",
                                  }}
                                >
                                  Aset #{aIdx + 1}
                                </span>
                                {asset._new && (
                                  <span
                                    style={{
                                      fontSize: ".62rem",
                                      background: "#dcfce7",
                                      color: "#15803d",
                                      padding: "1px 7px",
                                      borderRadius: 99,
                                      fontWeight: 700,
                                    }}
                                  >
                                    Baru
                                  </span>
                                )}
                                <button
                                  className="bm-btn bm-btn-danger"
                                  style={{
                                    marginLeft: "auto",
                                    padding: "3px 9px",
                                    fontSize: ".68rem",
                                  }}
                                  onClick={() =>
                                    setConfirm({
                                      msg: `Hapus aset "${asset.name || asset.asset_code}"?`,
                                      onConfirm: () => {
                                        removeAsset(
                                          proj.id_pekerjaan,
                                          asset.asset_code,
                                        );
                                        setConfirm(null);
                                      },
                                    })
                                  }
                                >
                                  <Icon d={Icons.trash} size={12} /> Hapus
                                </button>
                              </div>
                              <div
                                className="bm-edit-grid"
                                style={{ gridTemplateColumns: "repeat(3,1fr)" }}
                              >
                                <div className="bm-edit-field">
                                  <label>Kode Aset</label>
                                  <input
                                    value={
                                      asset._new
                                        ? asset.asset_code.startsWith("id-")
                                          ? ""
                                          : asset.asset_code
                                        : asset.asset_code
                                    }
                                    onChange={(e) =>
                                      updateAsset(
                                        proj.id_pekerjaan,
                                        asset.asset_code,
                                        "asset_code",
                                        e.target.value,
                                      )
                                    }
                                    readOnly={!asset._new}
                                    style={
                                      !asset._new
                                        ? {
                                            background: "#f8fafc",
                                            color: "#94a3b8",
                                          }
                                        : {}
                                    }
                                  />
                                </div>
                                <div
                                  className="bm-edit-field"
                                  style={{ gridColumn: "2/-1" }}
                                >
                                  <label>Nama Aset</label>
                                  <input
                                    value={asset.name}
                                    onChange={(e) =>
                                      updateAsset(
                                        proj.id_pekerjaan,
                                        asset.asset_code,
                                        "name",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div className="bm-edit-field">
                                  <label>Brand</label>
                                  <input
                                    value={asset.brand}
                                    onChange={(e) =>
                                      updateAsset(
                                        proj.id_pekerjaan,
                                        asset.asset_code,
                                        "brand",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div className="bm-edit-field">
                                  <label>Model</label>
                                  <input
                                    value={asset.model}
                                    onChange={(e) =>
                                      updateAsset(
                                        proj.id_pekerjaan,
                                        asset.asset_code,
                                        "model",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div className="bm-edit-field">
                                  <label>Serial Number</label>
                                  <input
                                    value={asset.serial_number || ""}
                                    onChange={(e) =>
                                      updateAsset(
                                        proj.id_pekerjaan,
                                        asset.asset_code,
                                        "serial_number",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div className="bm-edit-field">
                                  <label>Tgl Pengadaan</label>
                                  <input
                                    type="date"
                                    value={asset.procurement_date}
                                    onChange={(e) =>
                                      updateAsset(
                                        proj.id_pekerjaan,
                                        asset.asset_code,
                                        "procurement_date",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div className="bm-edit-field">
                                  <label>Nilai Perolehan (IDR)</label>
                                  <input
                                    type="number"
                                    value={asset.acquisition_value || ""}
                                    onChange={(e) =>
                                      updateAsset(
                                        proj.id_pekerjaan,
                                        asset.asset_code,
                                        "acquisition_value",
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                  />
                                  {asset.acquisition_value > 0 && (
                                    <span className="bm-edit-hint">
                                      ≈ {fmt(asset.acquisition_value)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          {proj.assets.length === 0 && (
                            <div
                              className="bm-empty bm-empty--sm"
                              style={{
                                border: "1px dashed #c7d2fe",
                                borderRadius: 8,
                              }}
                            >
                              <Icon d={Icons.package} size={14} />
                              <span>Belum ada aset untuk pekerjaan ini</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="bm-edit-actions">
              <button className="bm-btn bm-btn-cancel" onClick={onCancel}>
                <Icon d={Icons.x} size={13} /> Batal
              </button>
              <button className="bm-btn bm-btn-save" onClick={handleSave}>
                <Icon d={Icons.save} size={13} /> Simpan Perubahan
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════
// OPEX Detail (view mode)
// CHANGES:
//   - Kolom ASET: hapus icon link (🔗), tampilkan kode aset plain saja
//   - Kolom LAMPIRAN header: tambahkan icon paperclip
// ══════════════════════════════════════════════════════════════════
function OpexDetail({ item, onAddRealisasi }) {
  return (
    <tr className="bm-drill-row">
      <td colSpan="7">
        <div className="bm-drill-wrap">
          <div className="bm-drill-header">
            <Icon d={Icons.receipt} size={14} />
            Riwayat Realisasi
            <span className="bm-pill blue">
              {item.realisasiList.length} transaksi
            </span>
            <div className="bm-drill-actions">
              <button
                className="bm-btn-add-realisasi"
                onClick={() => onAddRealisasi(item)}
              >
                <Icon d={Icons.plus} size={13} /> Tambah Realisasi
              </button>
            </div>
          </div>
          {item.realisasiList.length > 0 ? (
            <table className="bm-sub-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>No. Invoice</th>
                  <th>Aset</th>
                  {/* ── Paperclip icon hanya di header LAMPIRAN ── */}
                  <th>
                    <span className="bm-th-with-icon">
                      <Icon d={Icons.paperclip} size={11} />
                      Lampiran
                    </span>
                  </th>
                  <th className="ta-r">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {[...item.realisasiList]
                  .sort(
                    (a, b) =>
                      new Date(b.tanggal_realisasi) -
                      new Date(a.tanggal_realisasi),
                  )
                  .map((r) => (
                    <tr key={r.id_realisasi}>
                      <td>
                        <div className="bm-date-cell">
                          <Icon d={Icons.calendar} size={11} />
                          {fmtDate(r.tanggal_realisasi)}
                        </div>
                      </td>
                      <td className="fw-med">{r.keterangan}</td>
                      <td>
                        {r.no_invoice ? (
                          <code className="bm-code">{r.no_invoice}</code>
                        ) : (
                          <span className="tc-muted2">—</span>
                        )}
                      </td>
                      {/* ── Aset: plain code badge, NO link icon ── */}
                      <td>
                        {r.id_aset ? (
                          <span className="bm-aset-plain">
                            <code className="bm-code bm-code--aset">
                              {r.id_aset}
                            </code>
                          </span>
                        ) : (
                          <span className="bm-no-aset">—</span>
                        )}
                      </td>
                      {/* ── Lampiran: paperclip icon muncul di chip ── */}
                      <td>
                        {r.lampiran && r.lampiran.length > 0 ? (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 4,
                            }}
                          >
                            {r.lampiran.map((f) => (
                              <span
                                key={f.id}
                                className="bm-file-view-chip"
                                title={f.name}
                              >
                                <Icon d={Icons.paperclip} size={10} />
                                <span
                                  style={{
                                    maxWidth: 80,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {f.name}
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="bm-no-aset">—</span>
                        )}
                      </td>
                      <td className="ta-r tc-red fw-bold">− {fmt(r.jumlah)}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="bm-sub-total">
                  <td colSpan="5" className="ta-r fw-bold">
                    Total
                  </td>
                  <td className="ta-r tc-red fw-bold">{fmt(item.used)}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="bm-empty">
              <Icon d={Icons.receipt} size={28} />
              <span>Belum ada realisasi</span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

// ══════════════════════════════════════════════════════════════════
// CAPEX Detail (view mode — unchanged)
// ══════════════════════════════════════════════════════════════════
function CapexDetail({ item, expandedProject, toggleProject }) {
  return (
    <tr className="bm-drill-row">
      <td colSpan="7">
        <div className="bm-drill-wrap">
          <div className="bm-drill-header">
            <Icon d={Icons.fileText} size={14} />
            Daftar Pekerjaan / Kontrak
            <span className="bm-pill blue">
              {item.projects.length} pekerjaan
            </span>
          </div>
          {item.projects.length > 0 ? (
            <div className="bm-projects">
              {item.projects.map((p) => {
                const open = expandedProject === p.id_pekerjaan;
                const assetCnt = p.assets ? p.assets.length : 0;
                const balanceInfo = getBalanceInfo(p.assets, p.nilai_kontrak);
                return (
                  <div
                    key={p.id_pekerjaan}
                    className={`bm-proj-card ${open ? "open" : ""}`}
                  >
                    <div
                      className="bm-proj-row"
                      onClick={() => toggleProject(p.id_pekerjaan)}
                    >
                      <div className="bm-proj-left">
                        <div className="bm-proj-name">{p.nm_pekerjaan}</div>
                        <div className="bm-proj-meta">
                          {p.no_kontrak && (
                            <span className="bm-meta-item">
                              <Icon d={Icons.fileText} size={11} />
                              {p.no_kontrak}
                            </span>
                          )}
                          {p.tgl_kontrak && (
                            <span className="bm-meta-item">
                              <Icon d={Icons.calendar} size={11} />
                              {fmtDate(p.tgl_kontrak)}
                            </span>
                          )}
                          {p.durasi_kontrak && (
                            <span className="bm-meta-item">
                              ⏱ {p.durasi_kontrak} hari
                            </span>
                          )}
                        </div>
                        <div className="bm-proj-refs">
                          {p.no_pr && (
                            <span className="bm-ref">PR: {p.no_pr}</span>
                          )}
                          {p.no_po && (
                            <span className="bm-ref">PO: {p.no_po}</span>
                          )}
                          {p.no_sp3 && (
                            <span className="bm-ref">SP3: {p.no_sp3}</span>
                          )}
                          {p.tgl_sp3 && (
                            <span className="bm-ref">
                              Tgl SP3: {fmtDate(p.tgl_sp3)}
                            </span>
                          )}
                          {p.tgl_bamk && (
                            <span className="bm-ref">
                              BAMK: {fmtDate(p.tgl_bamk)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="bm-proj-right">
                        <div className="bm-proj-vals">
                          <div className="bm-val-block">
                            <span className="bm-val-lbl">RAB</span>
                            <span className="bm-val-num rab">
                              {p.nilai_rab > 0 ? fmt(p.nilai_rab) : "—"}
                            </span>
                          </div>
                          <div className="bm-val-block">
                            <span className="bm-val-lbl">Kontrak</span>
                            <span className="bm-val-num kontrak">
                              {p.nilai_kontrak > 0 ? fmt(p.nilai_kontrak) : "—"}
                            </span>
                          </div>
                          {balanceInfo.sumAset > 0 && (
                            <div className="bm-val-block">
                              <span className="bm-val-lbl">Nilai Aset</span>
                              <span className="bm-val-num aset">
                                {fmt(balanceInfo.sumAset)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="bm-proj-actions">
                          <BalanceBadge
                            assets={p.assets}
                            nilaiKontrak={p.nilai_kontrak}
                          />
                          <span className="bm-pill blue">{assetCnt} Aset</span>
                          <Icon
                            d={open ? Icons.chevUp : Icons.chevDown}
                            size={16}
                            className={open ? "tc-accent" : "tc-muted2"}
                          />
                        </div>
                      </div>
                    </div>
                    {open && (
                      <div className="bm-asset-sub anim-in">
                        <div className="bm-asset-sub-title">
                          <Icon d={Icons.layers} size={12} />
                          Aset Terdaftar
                        </div>
                        {assetCnt > 0 ? (
                          <>
                            <table
                              className="bm-sub-table"
                              style={{ fontSize: ".77rem" }}
                            >
                              <thead>
                                <tr>
                                  <th>Kode Aset</th>
                                  <th>Nama Aset</th>
                                  <th>Brand / Model</th>
                                  <th>S/N</th>
                                  <th>Tgl</th>
                                  <th className="ta-r">Nilai</th>
                                </tr>
                              </thead>
                              <tbody>
                                {p.assets.map((a) => (
                                  <tr key={a.asset_code}>
                                    <td>
                                      <code className="bm-code">
                                        {a.asset_code}
                                      </code>
                                    </td>
                                    <td className="fw-med">{a.name}</td>
                                    <td className="tc-muted">
                                      {a.brand} / {a.model}
                                    </td>
                                    <td className="tc-muted">
                                      {a.serial_number || "—"}
                                    </td>
                                    <td>{fmtDate(a.procurement_date)}</td>
                                    <td className="ta-r fw-bold tc-ink">
                                      {a.acquisition_value ? (
                                        fmt(a.acquisition_value)
                                      ) : (
                                        <span className="bm-no-aset">
                                          Belum diisi
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr className="bm-sub-total">
                                  <td colSpan="5" className="ta-r fw-bold">
                                    Total Nilai Aset
                                  </td>
                                  <td className="ta-r fw-bold tc-ink">
                                    {fmt(
                                      p.assets.reduce(
                                        (s, a) =>
                                          s + (a.acquisition_value || 0),
                                        0,
                                      ),
                                    )}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                            <BalanceBar
                              assets={p.assets}
                              nilaiKontrak={p.nilai_kontrak}
                            />
                          </>
                        ) : (
                          <div className="bm-empty bm-empty--sm">
                            <Icon d={Icons.package} size={16} />
                            <span>Belum ada aset terdaftar</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="bm-capex-total">
                <span>Total Nilai Kontrak Terserap</span>
                <span className="tc-red fw-bold">{fmt(item.used)}</span>
              </div>
            </div>
          ) : (
            <div className="bm-empty">
              <Icon d={Icons.fileText} size={28} />
              <span>Belum ada pekerjaan/kontrak terdaftar</span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function BudgetManagement() {
  const [activeTab, setActiveTab] = useState("capex");
  const [expandedBudget, setExpandedBudget] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [search, setSearch] = useState("");
  const currentYear = new Date().getFullYear();
  const [tahunAnggaran, setTahunAnggaran] = useState(String(currentYear));
  const tahunOptions = [
    String(currentYear - 3),
    String(currentYear - 2),
    String(currentYear - 1),
    String(currentYear),
  ];

  const [mockCapex, setMockCapex] = useState(initMockCapex);
  const [mockOpex] = useState(initMockOpex);
  const [realisasiOpex, setRealisasiOpex] = useState(initMockRealisasiOpex);
  const [modalRealisasi, setModalRealisasi] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const data = useMemo(() => {
    const raw = activeTab === "capex" ? mockCapex : mockOpex;
    return raw
      .map((item) => {
        let id,
          name,
          pagu,
          used,
          projects = [],
          realisasiList = [];
        if (activeTab === "capex") {
          id = item.kd_anggaran_capex;
          name = item.nm_anggaran_capex;
          pagu = item.nilai_anggaran_rkap || 0;
          projects = item.projects || [];
          used = projects.reduce((s, p) => s + (p.nilai_kontrak || 0), 0);
        } else {
          id = String(item.id_anggaran_tahunan);
          name = item.nm_anggaran_master;
          pagu = item.nilai_anggaran_tahunan || 0;
          realisasiList = realisasiOpex.filter(
            (r) => r.id_anggaran_tahunan === item.id_anggaran_tahunan,
          );
          used = realisasiList.reduce((s, r) => s + (r.jumlah || 0), 0);
        }
        const remaining = pagu - used;
        const percentage = pagu > 0 ? (used / pagu) * 100 : 0;
        return {
          id,
          name,
          pagu,
          used,
          remaining,
          percentage,
          projects,
          realisasiList,
          raw: item,
        };
      })
      .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
  }, [activeTab, search, realisasiOpex, mockCapex, mockOpex]);

  const totals = useMemo(() => {
    const pagu = data.reduce((s, d) => s + d.pagu, 0);
    const used = data.reduce((s, d) => s + d.used, 0);
    return {
      pagu,
      used,
      remaining: pagu - used,
      pct: pagu > 0 ? (used / pagu) * 100 : 0,
    };
  }, [data]);

  const toggleBudget = (id) => {
    if (editingBudget === id) return;
    setExpandedBudget(expandedBudget === id ? null : id);
    setExpandedProject(null);
  };
  const toggleProject = (id) =>
    setExpandedProject(expandedProject === id ? null : id);
  const handleEditClick = (e, id) => {
    e.stopPropagation();
    if (editingBudget === id) {
      setEditingBudget(null);
    } else {
      setExpandedBudget(id);
      setEditingBudget(id);
    }
  };
  const switchTab = (t) => {
    setActiveTab(t);
    setExpandedBudget(null);
    setEditingBudget(null);
    setExpandedProject(null);
    setSearch("");
  };

  const handleSaveEdit = (payload) => {
    if (payload.type === "opex") {
      const otherReal = realisasiOpex.filter(
        (r) => r.id_anggaran_tahunan !== parseInt(payload.itemId),
      );
      const myRealWithId = payload.realisasiList.map((r) => ({
        ...r,
        jumlah: parseFloat(r.jumlah) || 0,
        id_anggaran_tahunan: parseInt(payload.itemId),
      }));
      setRealisasiOpex([...otherReal, ...myRealWithId]);
    } else if (payload.type === "capex") {
      setMockCapex((prev) =>
        prev.map((c) =>
          c.kd_anggaran_capex === payload.itemId
            ? {
                ...c,
                nilai_anggaran_rkap: payload.pagu,
                nm_anggaran_capex: payload.nama,
                projects: payload.projects,
              }
            : c,
        ),
      );
    }
    setEditingBudget(null);
  };

  const handleSaveRealisasi = (anggaranItem, formData) => {
    setRealisasiOpex([
      ...realisasiOpex,
      {
        id_realisasi: Date.now(),
        id_anggaran_tahunan: anggaranItem.id_anggaran_tahunan,
        ...formData,
        create_date: new Date().toISOString(),
      },
    ]);
    showToast("Realisasi berhasil ditambahkan", "success");
  };

  const sc = (pct) => statusClass(pct);

  return (
    <>
      <style>{CSS}</style>
      <div className="bm-root">
        {toast && (
          <Toast
            msg={toast.msg}
            type={toast.type}
            onDone={() => setToast(null)}
          />
        )}
        {modalRealisasi && (
          <ModalRealisasi
            anggaran={modalRealisasi}
            onClose={() => setModalRealisasi(null)}
            onSave={(fd) => handleSaveRealisasi(modalRealisasi.raw, fd)}
          />
        )}

        <header className="bm-header">
          <div className="bm-header-text">
            <h1>Anggaran &amp; Realisasi</h1>
            <p>
              Monitoring{" "}
              {activeTab === "capex"
                ? "Investasi (CAPEX)"
                : "Operasional (OPEX)"}
              &ensp;·&ensp;Tahun {tahunAnggaran}
            </p>
          </div>
          <div className="bm-header-right">
            <div className="bm-year-filter-wrap">
              <span className="bm-year-filter-label">Tahun Anggaran</span>
              <div className="bm-year-pills">
                {tahunOptions.map((t) => (
                  <button
                    key={t}
                    className={`bm-year-pill ${tahunAnggaran === t ? "active" : ""}`}
                    onClick={() => setTahunAnggaran(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="bm-tabs">
              <button
                className={`bm-tab ${activeTab === "capex" ? "active" : ""}`}
                onClick={() => switchTab("capex")}
              >
                <Icon d={Icons.briefcase} size={15} /> CAPEX
              </button>
              <button
                className={`bm-tab ${activeTab === "opex" ? "active" : ""}`}
                onClick={() => switchTab("opex")}
              >
                <Icon d={Icons.monitor} size={15} /> OPEX
              </button>
            </div>
          </div>
        </header>

        <section className="bm-kpis">
          <div className="bm-kpi bm-kpi--blue">
            <div className="bm-kpi-icon">
              <Icon d={Icons.dollar} size={20} />
            </div>
            <div>
              <div className="bm-kpi-lbl">Total Pagu Anggaran</div>
              <div className="bm-kpi-val">{fmt(totals.pagu)}</div>
              <div className="bm-kpi-sub">{data.length} pos anggaran aktif</div>
            </div>
          </div>
          <div className="bm-kpi bm-kpi--amber">
            <div className="bm-kpi-icon">
              <Icon d={Icons.trending} size={20} />
            </div>
            <div>
              <div className="bm-kpi-lbl">Total Realisasi</div>
              <div className="bm-kpi-val">{fmt(totals.used)}</div>
              <div className="bm-kpi-sub">
                {totals.pct.toFixed(1)}% dari total pagu
              </div>
            </div>
          </div>
          <div className="bm-kpi bm-kpi--green">
            <div className="bm-kpi-icon">
              <Icon d={Icons.wallet} size={20} />
            </div>
            <div>
              <div className="bm-kpi-lbl">Sisa Anggaran</div>
              <div className="bm-kpi-val">{fmt(totals.remaining)}</div>
              <div className="bm-kpi-sub">
                <div className="bm-kpi-bar">
                  <div
                    className={`bm-kpi-bar-fill sc-${sc(totals.pct)}`}
                    style={{ width: `${Math.min(totals.pct, 100)}%` }}
                  />
                </div>
                <span>{totals.pct.toFixed(1)}% terserap</span>
              </div>
            </div>
          </div>
        </section>

        <div className="bm-banner">
          {activeTab === "capex" ? (
            <>
              <Icon d={Icons.briefcase} size={13} />
              Realisasi CAPEX = total <b>nilai_kontrak</b>. Klik ✏ Edit untuk
              mengubah data langsung di halaman ini.
            </>
          ) : (
            <>
              <Icon d={Icons.monitor} size={13} />
              Realisasi OPEX = total transaksi. Klik ✏ Edit untuk mengubah data
              — termasuk menambah lampiran invoice.
            </>
          )}
        </div>

        <section className="bm-table-wrap">
          <div className="bm-table-bar">
            <h2>Rincian Pos Anggaran</h2>
            <div className="bm-search">
              <Icon d={Icons.search} size={15} />
              <input
                placeholder="Cari nama anggaran…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="bm-table-scroll">
            <table className="bm-table">
              <thead>
                <tr>
                  <th style={{ width: "32%" }}>
                    {activeTab === "capex"
                      ? "Nama Anggaran CAPEX"
                      : "Mata Anggaran OPEX"}
                  </th>
                  <th>Kode / ID</th>
                  <th className="ta-r">Pagu (RKAP)</th>
                  <th className="ta-r">Realisasi</th>
                  <th className="ta-r">Sisa</th>
                  <th className="ta-c">Serapan</th>
                  <th className="ta-c">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 && (
                  <tr>
                    <td colSpan="7" className="bm-empty-cell">
                      Tidak ada data yang cocok.
                    </td>
                  </tr>
                )}
                {data.map((item) => {
                  const open = expandedBudget === item.id;
                  const editing = editingBudget === item.id;
                  const scClass = sc(item.percentage);
                  return (
                    <React.Fragment key={item.id}>
                      <tr
                        className={`bm-row ${open ? "bm-row--open" : ""}`}
                        onClick={() => toggleBudget(item.id)}
                      >
                        <td>
                          <div className="fw-med lh-tight">{item.name}</div>
                          {activeTab === "capex" && item.raw.thn_rkap_awal && (
                            <div className="tc-muted fs-xs">
                              RKAP {item.raw.thn_rkap_awal}–
                              {item.raw.thn_rkap_akhir}&ensp;·&ensp;Thn{" "}
                              {item.raw.thn_anggaran}
                            </div>
                          )}
                          <div className="tc-muted2 fs-xs mt2">
                            {activeTab === "capex"
                              ? `${item.projects.length} pekerjaan · ${item.projects.reduce((s, p) => s + (p.assets?.length || 0), 0)} aset`
                              : `${item.realisasiList.length} transaksi realisasi`}
                          </div>
                        </td>
                        <td>
                          <code className="bm-code">{item.id}</code>
                          <div className="tc-muted fs-xs mt2">
                            {item.raw.kd_anggaran_master}
                          </div>
                        </td>
                        <td className="ta-r fw-med">{fmt(item.pagu)}</td>
                        <td
                          className={`ta-r fw-bold ${item.used > 0 ? "tc-amber" : "tc-muted"}`}
                        >
                          {item.used > 0 ? fmt(item.used) : "—"}
                        </td>
                        <td
                          className={`ta-r fw-bold ${item.remaining < 0 ? "tc-red" : "tc-green"}`}
                        >
                          {fmt(item.remaining)}
                        </td>
                        <td className="ta-c">
                          <div className="bm-pct-wrap">
                            <div className="bm-pct-bar">
                              <div
                                className={`bm-pct-fill sc-${scClass}`}
                                style={{
                                  width: `${Math.min(item.percentage, 100)}%`,
                                }}
                              />
                            </div>
                            <span className={`bm-badge sc-${scClass}`}>
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className={`bm-status-lbl sc-${scClass}`}>
                            {statusLabel(item.percentage)}
                          </div>
                        </td>
                        <td
                          className="ta-c"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 6,
                            }}
                          >
                            <button
                              className="bm-row-edit-btn"
                              style={{ padding: "5px 9px" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBudget(item.id);
                              }}
                              title="Lihat detail"
                            >
                              <Icon
                                d={
                                  open && !editing
                                    ? Icons.chevUp
                                    : Icons.chevDown
                                }
                                size={14}
                              />
                            </button>
                            <button
                              className={`bm-row-edit-btn ${editing ? "active" : ""}`}
                              onClick={(e) => handleEditClick(e, item.id)}
                              title={editing ? "Tutup edit" : "Edit data"}
                            >
                              <Icon
                                d={editing ? Icons.x : Icons.edit}
                                size={13}
                              />
                              {editing ? "Tutup" : "Edit"}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {open && !editing && activeTab === "opex" && (
                        <OpexDetail
                          item={item}
                          onAddRealisasi={setModalRealisasi}
                        />
                      )}
                      {open && !editing && activeTab === "capex" && (
                        <CapexDetail
                          item={item}
                          expandedProject={expandedProject}
                          toggleProject={toggleProject}
                        />
                      )}
                      {editing && activeTab === "opex" && (
                        <OpexEditPanel
                          item={item}
                          realisasiOpex={realisasiOpex}
                          onSave={handleSaveEdit}
                          onCancel={() => setEditingBudget(null)}
                          showToast={showToast}
                        />
                      )}
                      {editing && activeTab === "capex" && (
                        <CapexEditPanel
                          item={item}
                          onSave={handleSaveEdit}
                          onCancel={() => setEditingBudget(null)}
                          showToast={showToast}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}