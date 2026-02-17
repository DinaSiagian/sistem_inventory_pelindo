// src/data/mockData.js

export const mockOpex = [
  {
    // Tabel: budget_annual_opex JOIN budget_masters
    id_anggaran_tahunan: 1,
    kd_anggaran_master: "5030905000",
    nm_anggaran_master: "Beban Pemeliharaan Software",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 500000000,

    // Simulasi tabel 'assets'
    assets: [
      {
        asset_code: "AST-26-001",
        name: "Lisensi Adobe Creative Cloud (1 Tahun)",
        acquisition_value: 15000000,
        procurement_date: "2026-01-10",
        employee_name: "Desi Ratnasari",
      },
      {
        asset_code: "AST-26-002",
        name: "Perpanjangan Lisensi Oracle DB",
        acquisition_value: 120000000,
        procurement_date: "2026-02-15",
        employee_name: "Budi Santoso",
      },
    ],
  },
  {
    id_anggaran_tahunan: 2,
    kd_anggaran_master: "5021300000",
    nm_anggaran_master: "Beban Jaringan dan Koneksi Data",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 600000000,
    assets: [
      {
        asset_code: "AST-26-003",
        name: "Langganan Internet Dedicated Jan 2026",
        acquisition_value: 45000000,
        procurement_date: "2026-01-28",
        employee_name: "Rudi Hartono",
      },
      {
        asset_code: "AST-26-004",
        name: "Sewa VPN IP Public",
        acquisition_value: 15000000,
        procurement_date: "2026-02-10",
        employee_name: "Rudi Hartono",
      },
    ],
  },
  {
    id_anggaran_tahunan: 3,
    kd_anggaran_master: "5021200000",
    nm_anggaran_master: "Beban Perlengkapan Kantor",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 700000000,
    assets: [],
  },
];

export const mockCapex = [
  {
    // Tabel: budget_annual_capex
    id_anggaran_tahunan_capex: 10,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "CPX-244015",
    nm_anggaran_capex: "Implementasi dan Standarisasi IT Infrastruktur",
    thn_anggaran: 2026,
    nilai_anggaran_rkap: 2500000000,

    // Simulasi tabel 'budget_projects'
    projects: [
      {
        id_pekerjaan: 101,
        nm_pekerjaan: "Pengadaan Server Dell R740 (3 Unit)",
        nilai_kontrak: 850000000,
        no_kontrak: "SPK/IT/001/2026",
        tgl_kontrak: "2026-01-20",
      },
      {
        id_pekerjaan: 102,
        nm_pekerjaan: "Instalasi Rack & Cabling Data Center",
        nilai_kontrak: 250000000,
        no_kontrak: "SPK/IT/002/2026",
        tgl_kontrak: "2026-02-05",
      },
    ],
  },
  {
    id_anggaran_tahunan_capex: 11,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "CPX-244014",
    nm_anggaran_capex: "Penyediaan Network di Branch SPMT",
    thn_anggaran: 2026,
    nilai_anggaran_rkap: 1500000000,
    projects: [
      {
        id_pekerjaan: 103,
        nm_pekerjaan: "Pembelian Switch Cisco Catalyst 2960",
        nilai_kontrak: 1450000000,
        no_kontrak: "SPK/IT/005/2026",
        tgl_kontrak: "2026-03-01",
      },
    ],
  },
  {
    id_anggaran_tahunan_capex: 12,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "CPX-254011",
    nm_anggaran_capex:
      "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    thn_anggaran: 2026,
    nilai_anggaran_rkap: 3000000000,
    projects: [],
  },
];
