// ================================================================
// mockData.js — Data mock sesuai struktur excel Tabel_Investasi
// acquisition_value ditambahkan di setiap aset dalam projects
// ================================================================

export const mockAnggaranMaster = [
  {
    kd_anggaran_master: "5030905000",
    nm_anggaran_master: "Beban Pemeliharaan Software",
    tipe_anggaran_master: "Opex",
  },
  {
    kd_anggaran_master: "5021300000",
    nm_anggaran_master: "Beban Jaringan dan Koneksi Data",
    tipe_anggaran_master: "Opex",
  },
  {
    kd_anggaran_master: "5021200000",
    nm_anggaran_master: "Beban Perlengkapan Kantor",
    tipe_anggaran_master: "Opex",
  },
  {
    kd_anggaran_master: "5081500000",
    nm_anggaran_master: "Beban Jasa Konsultan",
    tipe_anggaran_master: "Opex",
  },
  {
    kd_anggaran_master: "5060700000",
    nm_anggaran_master: "Beban Sumber Daya Pihak Ketiga Peralatan",
    tipe_anggaran_master: "Opex",
  },
  {
    kd_anggaran_master: "5900100000",
    nm_anggaran_master: "Beban Investasi",
    tipe_anggaran_master: "Capex",
  },
];

// ── realisasi_opex ───────────────────────────────────────────────
export const mockRealisasiOpex = [
  {
    id_realisasi: 1,
    id_anggaran_tahunan: 2,
    tanggal_realisasi: "2026-01-15",
    jumlah: 120000000,
    keterangan: "Pembayaran tagihan jaringan MPLS bulan Januari",
    no_invoice: "INV/2026/001/JRN",
    id_aset: null,
    create_user: "finance01",
    create_date: "2026-01-15T09:00:00",
  },
  {
    id_realisasi: 2,
    id_anggaran_tahunan: 2,
    tanggal_realisasi: "2026-02-15",
    jumlah: 120000000,
    keterangan: "Pembayaran tagihan jaringan MPLS bulan Februari",
    no_invoice: "INV/2026/002/JRN",
    id_aset: null,
    create_user: "finance01",
    create_date: "2026-02-15T09:00:00",
  },
  {
    id_realisasi: 3,
    id_anggaran_tahunan: 1,
    tanggal_realisasi: "2026-01-10",
    jumlah: 85000000,
    keterangan: "Perpanjangan lisensi Microsoft Office 365 (50 user)",
    no_invoice: "INV/2026/010/MS365",
    id_aset: "SPMT-BLW-GDG-DMG-01",
    create_user: "finance02",
    create_date: "2026-01-10T10:30:00",
  },
  {
    id_realisasi: 4,
    id_anggaran_tahunan: 3,
    tanggal_realisasi: "2026-02-01",
    jumlah: 45000000,
    keterangan: "Pengadaan ATK dan perlengkapan kantor Q1 2026",
    no_invoice: "INV/2026/021/ATK",
    id_aset: null,
    create_user: "finance01",
    create_date: "2026-02-01T08:00:00",
  },
  {
    id_realisasi: 5,
    id_anggaran_tahunan: 4,
    tanggal_realisasi: "2026-01-20",
    jumlah: 200000000,
    keterangan: "Pembayaran jasa konsultan IT audit semester 1",
    no_invoice: "INV/2026/015/KONSUL",
    id_aset: null,
    create_user: "finance02",
    create_date: "2026-01-20T14:00:00",
  },
  {
    id_realisasi: 6,
    id_anggaran_tahunan: 4,
    tanggal_realisasi: "2026-02-20",
    jumlah: 200000000,
    keterangan: "Pembayaran jasa konsultan IT audit semester 1 (termin 2)",
    no_invoice: "INV/2026/031/KONSUL",
    id_aset: null,
    create_user: "finance02",
    create_date: "2026-02-20T14:00:00",
  },
  {
    id_realisasi: 7,
    id_anggaran_tahunan: 5,
    tanggal_realisasi: "2026-01-05",
    jumlah: 150000000,
    keterangan: "Sewa genset backup power data center bulan Januari",
    no_invoice: "INV/2026/005/SEWA",
    id_aset: null,
    create_user: "finance01",
    create_date: "2026-01-05T11:00:00",
  },
];

// ── anggaran_tahunan_opex ────────────────────────────────────────
export const mockOpex = [
  {
    id_anggaran_tahunan: 1,
    kd_anggaran_master: "5030905000",
    nm_anggaran_master: "Beban Pemeliharaan Software",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 500000000,
  },
  {
    id_anggaran_tahunan: 2,
    kd_anggaran_master: "5021300000",
    nm_anggaran_master: "Beban Jaringan dan Koneksi Data",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 600000000,
  },
  {
    id_anggaran_tahunan: 3,
    kd_anggaran_master: "5021200000",
    nm_anggaran_master: "Beban Perlengkapan Kantor",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 700000000,
  },
  {
    id_anggaran_tahunan: 4,
    kd_anggaran_master: "5081500000",
    nm_anggaran_master: "Beban Jasa Konsultan",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 800000000,
  },
  {
    id_anggaran_tahunan: 5,
    kd_anggaran_master: "5060700000",
    nm_anggaran_master: "Beban Sumber Daya Pihak Ketiga Peralatan",
    thn_anggaran: 2026,
    nilai_anggaran_tahunan: 900000000,
  },
];

// ── anggaran_tahunan_capex + list_pekerjaan ──────────────────────
// Setiap aset kini punya acquisition_value (nilai perolehan per unit)
// SUM(acquisition_value) per project idealnya = nilai_kontrak
export const mockCapex = [
  // ================================================================
  // 2440013 — Penyiapan Infrastruktur IT Kantor Pusat & Branch
  // Dari Excel: SI.01/10/9/2/PPTI/TEKI/PLMT-24 | 10-Sep-24 | 90 hari
  //             tgl_sp3: 06-Sep-24 | tgl_bamk: 06-Sep-24
  //             no_po: 8260000074
  // ================================================================
  {
    id_anggaran_tahunan_capex: 5,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2440013",
    nm_anggaran_capex: "Penyiapan Infrastruktur IT Kantor Pusat & Branch",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 0,
    projects: [
      {
        id_pekerjaan: 10,
        id_anggaran_tahunan: "2440013",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
        nilai_rab: null,
        nilai_kontrak: null,
        no_pr: null,
        no_po: "8260000074",
        no_kontrak: "SI.01/10/9/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-09-10",
        durasi_kontrak: 90,
        no_sp3: null,
        tgl_sp3: "2024-09-06",
        tgl_bamk: "2024-09-06",
        create_user: null,
        create_date: null,
        keterangan: null,
        assets: [],
      },
    ],
  },

  // ================================================================
  // 2440015 — Implementasi dan Standarisasi IT Infrastruktur
  // (data sudah ada sebelumnya)
  // ================================================================
  {
    id_anggaran_tahunan_capex: 1,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2440015",
    nm_anggaran_capex: "Implementasi dan Standarisasi IT Infrastruktur",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 5800000000,
    projects: [
      {
        id_pekerjaan: 1,
        id_anggaran_tahunan: "2440015",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Planning & Control, CCTV dan SD-WAN Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_rab: 1250000000,
        nilai_kontrak: 1200000000,
        no_pr: null,
        no_po: "6440000026",
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-12",
        durasi_kontrak: 90,
        no_sp3: null,
        tgl_sp3: "2024-08-02",
        tgl_bamk: "2024-08-06",
        assets: [
          {
            asset_code: "SPMT-MLH-LPG-DMG-01",
            name: "CCTV Hikvision Malahayati",
            brand: "Hikvision",
            model: "DS-2CD2143G2-I",
            serial_number: "SN-HVK-001",
            procurement_date: "2024-08-12",
            acquisition_value: 350000000,
          },
          {
            asset_code: "SPMT-LHK-LPG-DMG-01",
            name: "CCTV Hikvision Lhokseumawe",
            brand: "Hikvision",
            model: "DS-2CD2143G2-I",
            serial_number: "SN-HVK-002",
            procurement_date: "2024-08-12",
            acquisition_value: 350000000,
          },
          {
            asset_code: "SPMT-MLH-DTC-PKR-01",
            name: "Switch SD-WAN Malahayati",
            brand: "Cisco",
            model: "ISR 4331",
            serial_number: "SN-CSC-001",
            procurement_date: "2024-08-12",
            acquisition_value: 500000000,
          },
        ],
      },
      {
        id_pekerjaan: 2,
        id_anggaran_tahunan: "2440015",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_rab: 1000000000,
        nilai_kontrak: 980000000,
        no_pr: null,
        no_po: "6440000027",
        no_kontrak: "SI.01/8/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-08",
        durasi_kontrak: 90,
        no_sp3: null,
        tgl_sp3: "2024-08-02",
        tgl_bamk: "2024-08-02",
        assets: [
          {
            asset_code: "SPMT-MLH-LPG-DMG-02",
            name: "Gate System Controller Malahayati",
            brand: "Genetec",
            model: "AutoVu",
            serial_number: "SN-GTC-001",
            procurement_date: "2024-08-08",
            acquisition_value: 490000000,
          },
          {
            asset_code: "SPMT-GRG-LPG-DMG-01",
            name: "Gate System Controller Garongkong",
            brand: "Genetec",
            model: "AutoVu",
            serial_number: "SN-GTC-002",
            procurement_date: "2024-08-08",
            acquisition_value: 490000000,
          },
        ],
      },
      {
        id_pekerjaan: 3,
        id_anggaran_tahunan: "2440015",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System dan Planning & Control Branch Balikpapan dan Bagendang) PT Pelindo Multi Terminal",
        nilai_rab: 800000000,
        nilai_kontrak: 750000000,
        no_pr: "8260000057",
        no_po: "6440000109",
        no_kontrak: "SI.01/4/9/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-09-24",
        durasi_kontrak: 90,
        no_sp3: null,
        tgl_sp3: "2024-09-02",
        tgl_bamk: "2024-09-02",
        assets: [],
      },
    ],
  },

  // ================================================================
  // 2440014 — Penyediaan Network di Branch SPMT
  // (data sudah ada sebelumnya)
  // ================================================================
  {
    id_anggaran_tahunan_capex: 2,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2440014",
    nm_anggaran_capex: "Penyediaan Network di Branch SPMT",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 3200000000,
    projects: [
      {
        id_pekerjaan: 4,
        id_anggaran_tahunan: "2440014",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyediaan Network di Branch SPMT (Malahayati, Lhokseumawe, Lembar, Parepare dan Garongkong)",
        nilai_rab: 1600000000,
        nilai_kontrak: 1500000000,
        no_pr: null,
        no_po: "6440000025",
        no_kontrak: "SI.01/15/8/5/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-15",
        durasi_kontrak: 90,
        no_sp3: null,
        tgl_sp3: "2024-08-02",
        tgl_bamk: "2024-08-09",
        assets: [
          {
            asset_code: "SPMT-MLH-DTC-PKR-02",
            name: "Core Switch Malahayati",
            brand: "Cisco",
            model: "Catalyst 9300",
            serial_number: "SN-CS9300-001",
            procurement_date: "2024-08-15",
            acquisition_value: 450000000,
          },
          {
            asset_code: "SPMT-LHK-DTC-PKR-02",
            name: "Core Switch Lhokseumawe",
            brand: "Cisco",
            model: "Catalyst 9300",
            serial_number: "SN-CS9300-002",
            procurement_date: "2024-08-15",
            acquisition_value: 450000000,
          },
          {
            asset_code: "SPMT-GRG-DTC-PKR-01",
            name: "Access Switch Garongkong",
            brand: "Cisco",
            model: "Catalyst 2960-X",
            serial_number: "SN-C2960-001",
            procurement_date: "2024-08-15",
            acquisition_value: 350000000,
          },
        ],
      },
    ],
  },

  // ================================================================
  // 2440020 — Gate System & Transformasi (multi pekerjaan dari Excel)
  // Dari Excel: 4 baris dengan kd_anggaran 2440020
  // ================================================================
  {
    id_anggaran_tahunan_capex: 6,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2440020",
    nm_anggaran_capex:
      "Pemenuhan Kebutuhan Gate System Transformasi dan Planning & Control PT Pelindo Multi Terminal",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2025,
    thn_anggaran: 2024,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 0,
    projects: [
      {
        // Baris 1 Excel: SI.01/7/1/3/PPTI/TEKI/PLMT-25 | 07-Jan-25 | 90 hari
        // tgl_sp3: 03-Jan-25 | tgl_bamk: 15-Jan-25
        // no_sp3: KP.20.01/3/1/2/PGDN/SDMU/PLMT-25
        id_pekerjaan: 11,
        id_anggaran_tahunan: "2440020",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System Transformasi pada Branch (Jamrud Nilam Mirah, Tanjung Wangi, Trisakti, Dumai, Belawan) PT Pelindo Multi Terminal",
        nilai_rab: null,
        nilai_kontrak: null,
        no_pr: null,
        no_po: null,
        no_kontrak: "SI.01/7/1/3/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-01-07",
        durasi_kontrak: 90,
        no_sp3: "KP.20.01/3/1/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-01-03",
        tgl_bamk: "2025-01-15",
        create_user: null,
        create_date: null,
        keterangan: null,
        assets: [],
      },
      {
        // Baris 2 Excel: SI.01/13/1/2/PPTI/TEKI/PLMT-25 | 13-Jan-25 | 90 hari
        // tgl_sp3: 10-Jan-25 | tgl_bamk: 15-Jan-25
        // no_sp3: KP.20.01/10/1/4/PGD N/SDMU/PLMT-25
        id_pekerjaan: 12,
        id_anggaran_tahunan: "2440020",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Planning and Control Transformasi pada Branch (Jamrud Nilam Mirah, Tanjung Wangi, Trisakti, Dumai, Belawan dan Kantor Pusat) PT Pelindo Multi Terminal",
        nilai_rab: null,
        nilai_kontrak: null,
        no_pr: null,
        no_po: null,
        no_kontrak: "SI.01/13/1/2/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-01-13",
        durasi_kontrak: 90,
        no_sp3: "KP.20.01/10/1/4/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-01-10",
        tgl_bamk: "2025-01-15",
        create_user: null,
        create_date: null,
        keterangan: null,
        assets: [],
      },
      {
        // Baris 3 Excel: SI.01/24/1/3/PPTI/TEKI/PLMT-25 | 24-Jan-25 | 90 hari
        // tgl_sp3: 21-Jan-25 | tgl_bamk: 07-Feb-25
        // no_sp3: KP.20.01/21/1/4/PGDN/SDMU/PLMT-25
        id_pekerjaan: 13,
        id_anggaran_tahunan: "2440020",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Transformasi PT Pelindo Multi Terminal",
        nilai_rab: null,
        nilai_kontrak: null,
        no_pr: null,
        no_po: null,
        no_kontrak: "SI.01/24/1/3/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-01-24",
        durasi_kontrak: 90,
        no_sp3: "KP.20.01/21/1/4/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-01-21",
        tgl_bamk: "2025-02-07",
        create_user: null,
        create_date: null,
        keterangan: null,
        assets: [],
      },
      {
        // Baris 4 Excel: PD.05.01/29/10/1/PPTI/TEKI/PLMT-25 | 29-Oct-25 | 60 hari
        // tgl_sp3: 23-Oct-25 | tgl_bamk: 02-Oct-25
        // no_sp3: PD.05.01/23/10/2/PGDN/SDMU/PLMT-25
        id_pekerjaan: 14,
        id_anggaran_tahunan: "2440020",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System dan Planning and Control (Public Announcer, Kelengkapan Gate dan Radio Point To Point) PT Pelindo Multi Terminal",
        nilai_rab: null,
        nilai_kontrak: null,
        no_pr: null,
        no_po: null,
        no_kontrak: "PD.05.01/29/10/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-10-29",
        durasi_kontrak: 60,
        no_sp3: "PD.05.01/23/10/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-10-23",
        tgl_bamk: "2025-10-02",
        create_user: null,
        create_date: null,
        keterangan: null,
        assets: [],
      },
    ],
  },

  // ================================================================
  // 2540011 — Transformasi dan Digitalisasi PT Pelindo Multi Terminal
  // (data sudah ada + tambah baris baru dari Excel)
  // ================================================================
  {
    id_anggaran_tahunan_capex: 3,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2540011",
    nm_anggaran_capex:
      "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2025,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 12000000000,
    projects: [
      {
        // Dari Excel baris 2540011 ke-1: SI.01/7/7/4/PPTI/TEKI/PLMT-25 | 07-Jul-25 | 120 hari
        // tgl_sp3: 30-Jun-25 | tgl_bamk: 01-Jul-25
        // no_sp3: PD.05.01/30/6/3/PGD N/SDMU/PLMT-25
        id_pekerjaan: 5,
        id_anggaran_tahunan: "2540011",
        jenis_anggaran: "Capex",
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
            asset_code: "SPMT-TJE-LPG-DMG-01",
            name: "Gate Controller Tanjung Emas",
            brand: "Genetec",
            model: "AutoVu Sharp",
            serial_number: "SN-GTC-TJE-01",
            procurement_date: "2025-07-07",
            acquisition_value: 1400000000,
          },
          {
            asset_code: "SPMT-BLP-LPG-DMG-01",
            name: "Gate Controller Balikpapan",
            brand: "Genetec",
            model: "AutoVu Sharp",
            serial_number: "SN-GTC-BLP-01",
            procurement_date: "2025-07-07",
            acquisition_value: 1350000000,
          },
          {
            asset_code: "SPMT-TJE-DTC-PKR-01",
            name: "Server Planning Control Tanjung Emas",
            brand: "Dell",
            model: "PowerEdge R740",
            serial_number: "SN-DELL-TJE-01",
            procurement_date: "2025-07-07",
            acquisition_value: 1200000000,
          },
        ],
      },
      {
        // Dari Excel baris 2540011 ke-2: PD.05.01/18/8/1/PPTI/TEKI/PLMT-25 | 18-Ags-2025 | 60 hari
        // tgl_sp3: 11 Ags 2025 | tgl_bamk: 15-Sep-25
        // no_sp3: PD.05.01/11/8/3/PGDN/SDMU/PLMT-25
        id_pekerjaan: 15,
        id_anggaran_tahunan: "2540011",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Digitalisasi Branch (Balikpapan, Belawan, Dumai, Trisakti, Makassar, Parepare, Garongkong, Sibolga, Tanjung Emas, Tanjung Intan dan Gresik) PT Pelindo Multi Terminal",
        nilai_rab: null,
        nilai_kontrak: null,
        no_pr: null,
        no_po: null,
        no_kontrak: "PD.05.01/18/8/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-08-18",
        durasi_kontrak: 60,
        no_sp3: "PD.05.01/11/8/3/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-08-11",
        tgl_bamk: "2025-09-15",
        create_user: null,
        create_date: null,
        keterangan: null,
        assets: [],
      },
      {
        // Dari Excel baris 2540011 ke-3: PD.01/28/10/1/PPTI/TEKI/PLMT-25 | 28-Oct-25 | 60 hari
        // tgl_sp3: 23-Oct-25 | tgl_bamk: 02-Oct-25
        // no_sp3: PD.01/23/10/2/PGDN/SDMU/PLMT-25
        id_pekerjaan: 16,
        id_anggaran_tahunan: "2540011",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyediaan Kebutuhan Perangkat Jaringan, Security Information and Management (SIEM) dan Perangkat Pendukung Gate System PT Pelindo Multi Terminal",
        nilai_rab: null,
        nilai_kontrak: null,
        no_pr: null,
        no_po: null,
        no_kontrak: "PD.01/28/10/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-10-28",
        durasi_kontrak: 60,
        no_sp3: "PD.01/23/10/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-10-23",
        tgl_bamk: "2025-10-02",
        create_user: null,
        create_date: null,
        keterangan: null,
        assets: [],
      },
      {
        // Dari Excel baris 2540011 ke-4 (sudah ada di mock sebelumnya):
        // PD.01/22/10/1/PPTI/TEKI/PLMT-25 | 22-Oct-25 | 60 hari
        // tgl_sp3: 16-Oct-25 | tgl_bamk: 02-Oct-25
        // no_sp3: PD.01/16/10/2/PGDN/SDMU/PLMT-25
        id_pekerjaan: 6,
        id_anggaran_tahunan: "2540011",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyediaan Kebutuhan Transformasi dan Digitalisasi (CCTV dan Public Announcer Traffic Monitoring pada Gate) Branch Belawan, Dumai, Malahayati, Lhokseumawe, Lembar, Makassar, Balikpapan PT Pelindo Multi Terminal",
        nilai_rab: 3100000000,
        nilai_kontrak: 2870000000,
        no_pr: "8260001031",
        no_po: "6440000840",
        no_kontrak: "PD.01/22/10/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-10-22",
        durasi_kontrak: 60,
        no_sp3: "PD.01/16/10/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-10-16",
        tgl_bamk: "2025-10-02",
        assets: [],
      },
    ],
  },

  // ================================================================
  // 2540012 — Standarisasi Perangkat Jaringan
  // (data sudah ada sebelumnya)
  // ================================================================
  {
    id_anggaran_tahunan_capex: 4,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2540012",
    nm_anggaran_capex:
      "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2025,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 4500000000,
    projects: [
      {
        // Dari Excel: PD.01/24/7/1/PPTI/TEKI/PLMT-25 | 24-Jul-25 | 60 hari
        // tgl_sp3: 22-Jul-25 | tgl_bamk: ########  (terpotong, estimasi 01-Ags-25)
        // no_sp3: PD.01/22/7/1/PGDN/DSDM/PLMT-25
        id_pekerjaan: 7,
        id_anggaran_tahunan: "2540012",
        jenis_anggaran: "Capex",
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
            model: "Catalyst 2960-X",
            serial_number: "SN-C2960-TBK-01",
            procurement_date: "2025-07-24",
            acquisition_value: 410000000,
          },
          {
            asset_code: "SPMT-TBK-DTC-PKR-02",
            name: "Firewall Tanjung Balai Karimun",
            brand: "Fortinet",
            model: "FortiGate 100F",
            serial_number: "SN-FG100F-TBK-01",
            procurement_date: "2025-07-24",
            acquisition_value: 400000000,
          },
        ],
      },
    ],
  },

  // ================================================================
  // 2540010 — Penyiapan Infrastruktur Gate System RoRo
  // Dari Excel: SI.01/4/8/1/PPTI/TEKI/PLMT-25 | 4-Ags-2025 | 60 hari
  //             tgl_sp3: 31-Jul-25 | tgl_bamk: 01-Sep-25
  //             no_sp3: PD.01/31/7/2/PGDN/SDMU/PLMT-25
  // ================================================================
  {
    id_anggaran_tahunan_capex: 7,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2540010",
    nm_anggaran_capex:
      "Penyiapan Infrastruktur Gate System Pendukung Kegiatan RoRo PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2025,
    thn_anggaran: 2025,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 0,
    projects: [
      {
        id_pekerjaan: 17,
        id_anggaran_tahunan: "2540010",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyiapan Infrastruktur Gate System Pendukung Kegiatan RoRo pada Branch Tanjung Emas PT Pelindo Multi Terminal",
        nilai_rab: null,
        nilai_kontrak: null,
        no_pr: null,
        no_po: null,
        no_kontrak: "SI.01/4/8/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-08-04",
        durasi_kontrak: 60,
        no_sp3: "PD.01/31/7/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-07-31",
        tgl_bamk: "2025-09-01",
        create_user: null,
        create_date: null,
        keterangan: null,
        assets: [],
      },
    ],
  },
];

// ================================================================
// MOCK DATA PEMINJAMAN
// Digunakan untuk alert: aset sering rusak & peminjaman overdue
// ================================================================
export const mockBorrows = [
  {
    id_peminjaman: 1,
    asset_code: "SPMT-MLH-LPG-DMG-01",
    asset_name: "CCTV Hikvision Malahayati",
    borrower_name: "Andi Pratama",
    borrow_date: "2026-01-10",
    due_date: "2026-01-20",
    is_returned: true,
    return_date: "2026-01-19",
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
    return_date: "2026-02-16",
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
    return_date: "2026-03-02",
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
    return_date: null,
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
    return_date: null,
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
    return_date: null,
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
    return_date: "2026-01-29",
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
    return_date: "2026-03-01",
    return_condition: "MINOR_DAMAGE",
  },
];

// ================================================================
// HELPER: Format rupiah
// ================================================================
export const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

// ================================================================
// calculateAlerts()
// Menghitung semua smart alerts dari data mock di atas.
// Return: array of alert objects, sorted by priority (high first).
//
// Alert types:
//   1. FREQUENT_DAMAGE  — aset dikembalikan rusak ≥2x
//   2. OVERDUE_BORROW   — peminjaman belum dikembalikan & sudah lewat due_date
//   3. OPEX_CRITICAL    — serapan anggaran OPEX ≥ 80%
//   4. CAPEX_NO_ASSET   — project CAPEX sudah kontrak tapi assets kosong
//   5. CAPEX_IMBALANCE  — selisih SUM(acquisition_value) vs nilai_kontrak > 5%
// ================================================================
export const calculateAlerts = () => {
  const alerts = [];
  const today = new Date();

  // ── 1. ASET SERING RUSAK ──────────────────────────────────────
  const damageCount = {};
  const damageAssetNames = {};

  mockBorrows.forEach((b) => {
    if (
      b.is_returned &&
      (b.return_condition === "MINOR_DAMAGE" ||
        b.return_condition === "DAMAGED")
    ) {
      damageCount[b.asset_code] = (damageCount[b.asset_code] || 0) + 1;
      damageAssetNames[b.asset_code] = b.asset_name;
    }
  });

  Object.entries(damageCount).forEach(([code, count]) => {
    if (count >= 2) {
      alerts.push({
        id: `damage-${code}`,
        type: "FREQUENT_DAMAGE",
        priority: "high",
        title: "Aset Sering Rusak",
        message: `${damageAssetNames[code]} (${code}) dikembalikan dalam kondisi rusak sebanyak ${count}x. Pertimbangkan pengecekan atau penggantian.`,
        asset_code: code,
        action_label: "Lihat Riwayat",
        action_path: "/peminjaman",
      });
    }
  });

  // ── 2. PEMINJAMAN OVERDUE ─────────────────────────────────────
  const overdueBorrows = mockBorrows.filter((b) => {
    if (b.is_returned) return false;
    return new Date(b.due_date) < today;
  });

  if (overdueBorrows.length > 0) {
    alerts.push({
      id: "overdue-summary",
      type: "OVERDUE_BORROW",
      priority: "medium",
      title: "Peminjaman Melewati Jatuh Tempo",
      message: `${overdueBorrows.length} aset melewati jatuh tempo pengembalian: ${overdueBorrows
        .map((b) => b.asset_name)
        .join(", ")}. Segera tindak lanjut.`,
      count: overdueBorrows.length,
      items: overdueBorrows,
      action_label: "Cek Peminjaman",
      action_path: "/peminjaman",
    });
  }

  // ── 3. ANGGARAN OPEX KRITIS (≥80%) ───────────────────────────
  mockOpex.forEach((opex) => {
    const totalRealisasi = mockRealisasiOpex
      .filter((r) => r.id_anggaran_tahunan === opex.id_anggaran_tahunan)
      .reduce((sum, r) => sum + r.jumlah, 0);

    const pct = (totalRealisasi / opex.nilai_anggaran_tahunan) * 100;

    if (pct >= 80) {
      const sisa = opex.nilai_anggaran_tahunan - totalRealisasi;
      alerts.push({
        id: `opex-critical-${opex.id_anggaran_tahunan}`,
        type: "OPEX_CRITICAL",
        priority: pct >= 100 ? "high" : "medium",
        title: "Anggaran OPEX Kritis",
        message: `${opex.nm_anggaran_master} telah terserap ${pct.toFixed(1)}% (${formatRupiah(
          totalRealisasi,
        )} dari ${formatRupiah(opex.nilai_anggaran_tahunan)}). Sisa: ${formatRupiah(sisa)}.`,
        id_anggaran_tahunan: opex.id_anggaran_tahunan,
        percentage: pct,
        action_label: "Lihat Anggaran",
        action_path: "/budget",
      });
    }
  });

  // ── 4. PROJECT CAPEX TANPA ASET ───────────────────────────────
  mockCapex.forEach((capexItem) => {
    capexItem.projects.forEach((proj) => {
      if (!proj.assets || proj.assets.length === 0) {
        alerts.push({
          id: `capex-no-asset-${proj.id_pekerjaan}`,
          type: "CAPEX_NO_ASSET",
          priority: "medium",
          title: "Data Aset CAPEX Belum Diisi",
          message: `Pekerjaan "${proj.nm_pekerjaan.substring(0, 60)}..." (${
            proj.no_kontrak
          }) sudah kontrak senilai ${proj.nilai_kontrak ? formatRupiah(proj.nilai_kontrak) : "belum ada nilai"} namun belum ada data aset.`,
          id_pekerjaan: proj.id_pekerjaan,
          no_kontrak: proj.no_kontrak,
          action_label: "Input Aset",
          action_path: "/budget",
        });
      }
    });
  });

  // ── 5. CAPEX IMBALANCE (selisih > 5%) ─────────────────────────
  mockCapex.forEach((capexItem) => {
    capexItem.projects.forEach((proj) => {
      if (!proj.assets || proj.assets.length === 0) return;
      if (!proj.nilai_kontrak) return;

      const sumAcquisition = proj.assets.reduce(
        (sum, a) => sum + (a.acquisition_value || 0),
        0,
      );
      const selisih = Math.abs(proj.nilai_kontrak - sumAcquisition);
      const selisihPct = (selisih / proj.nilai_kontrak) * 100;

      if (selisihPct > 5) {
        alerts.push({
          id: `capex-imbalance-${proj.id_pekerjaan}`,
          type: "CAPEX_IMBALANCE",
          priority: "medium",
          title: "Nilai Aset vs Kontrak Tidak Sesuai",
          message: `Pekerjaan "${proj.nm_pekerjaan.substring(0, 55)}..." memiliki selisih ${formatRupiah(
            selisih,
          )} (${selisihPct.toFixed(1)}%) antara nilai kontrak (${formatRupiah(
            proj.nilai_kontrak,
          )}) dan total perolehan aset (${formatRupiah(sumAcquisition)}).`,
          id_pekerjaan: proj.id_pekerjaan,
          no_kontrak: proj.no_kontrak,
          selisih,
          selisih_pct: selisihPct,
          action_label: "Cek Detail",
          action_path: "/budget",
        });
      }
    });
  });

  // ── Sort: high → medium → low ─────────────────────────────────
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  alerts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return alerts;
};