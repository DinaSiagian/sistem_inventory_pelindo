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

// ================================================================
// mockCapex
// Format kode aset: SPMT-{BRANCH}-{KATEGORI}-{TIPE}-{NO}
//   BRANCH: MLH=Malahayati, LHK=Lhokseumawe, LMB=Lembar,
//           PPR=Parepare, GRG=Garongkong, BLP=Balikpapan,
//           BGD=Bagendang, MKS=Makassar, JNM=Jamrud Nilam Mirah,
//           TWG=Tanjung Wangi, TSK=Trisakti, DMI=Dumai,
//           BLW=Belawan, TJE=Tanjung Emas, SBG=Sibolga,
//           TBK=Tanjung Balai Karimun, SPJ=Selat Panjang,
//           KPT=Kantor Pusat, PLT=Pelindo Tower, PLP=Pelindo Place,
//           GRK=Gresik, TMI=Tanjung Intan, TPG=Tanjung Pinang,
//           BMH=Bumiharjo, MEK=Mekar Putih
//   KATEGORI: DTC=Data Center, LPG=Lapangan, GDG=Gedung
//   TIPE: PKR=Perangkat Keras, DMG=Dermaga/Gate, KMR=Kamera,
//         ANS=Announcer, SRV=Server
// ================================================================

export const mockCapex = [
  // ═══════════════════════════════════════════════════════════════
  // ANGGARAN 2440015 — Implementasi dan Standarisasi IT Infrastruktur
  // thn_anggaran: 2024
  // ═══════════════════════════════════════════════════════════════
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
      // ── Pekerjaan 1 ──
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
            asset_code: "SPMT-LMB-LPG-KMR-01",
            name: "CCTV IP Camera Lembar",
            brand: "Hikvision",
            model: "DS-2CD2T47G2-L",
            serial_number: "HVK-LMB-KMR-001",
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
            asset_code: "SPMT-LHK-DTC-PKR-01",
            name: "Router SD-WAN Lhokseumawe",
            brand: "Cisco",
            model: "ISR 4331",
            serial_number: "CSC-LHK-RTR-001",
            procurement_date: "2024-08-12",
            acquisition_value: 185000000,
          },
          {
            asset_code: "SPMT-PPR-DTC-PKR-01",
            name: "Router SD-WAN Parepare",
            brand: "Cisco",
            model: "ISR 4331",
            serial_number: "CSC-PPR-RTR-001",
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
          {
            asset_code: "SPMT-GRG-DTC-SRV-01",
            name: "Server Planning & Control Garongkong",
            brand: "Dell",
            model: "PowerEdge R450",
            serial_number: "DELL-GRG-SRV-001",
            procurement_date: "2024-08-12",
            acquisition_value: 195000000,
          },
        ],
      },
      // ── Pekerjaan 2 ──
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
          {
            asset_code: "SPMT-PPR-LPG-DMG-01",
            name: "Gate Controller Parepare",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-PPR-GCL-001",
            procurement_date: "2024-08-08",
            acquisition_value: 185000000,
          },
          {
            asset_code: "SPMT-GRG-LPG-DMG-01",
            name: "Gate Controller Garongkong",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-GRG-GCL-001",
            procurement_date: "2024-08-08",
            acquisition_value: 190000000,
          },
        ],
      },
      // ── Pekerjaan 3 ──
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
        assets: [
          {
            asset_code: "SPMT-BLP-LPG-DMG-01",
            name: "Gate Controller Balikpapan",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-BLP-GCL-001",
            procurement_date: "2024-09-24",
            acquisition_value: 210000000,
          },
          {
            asset_code: "SPMT-BGD-LPG-DMG-01",
            name: "Gate Controller Bagendang",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-BGD-GCL-001",
            procurement_date: "2024-09-24",
            acquisition_value: 190000000,
          },
          {
            asset_code: "SPMT-BLP-DTC-SRV-01",
            name: "Server Planning & Control Balikpapan",
            brand: "Dell",
            model: "PowerEdge R450",
            serial_number: "DELL-BLP-SRV-001",
            procurement_date: "2024-09-24",
            acquisition_value: 195000000,
          },
          {
            asset_code: "SPMT-BGD-DTC-SRV-01",
            name: "Server Planning & Control Bagendang",
            brand: "Dell",
            model: "PowerEdge R450",
            serial_number: "DELL-BGD-SRV-001",
            procurement_date: "2024-09-24",
            acquisition_value: 155000000,
          },
        ],
      },
      // ── Pekerjaan 4 ──
      {
        id_pekerjaan: 4,
        id_anggaran_tahunan: "2440015",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System Branch Makassar) PT Pelindo Multi Terminal",
        nilai_rab: 680000000,
        nilai_kontrak: 640000000,
        no_pr: "8260000058",
        no_po: "6440000110",
        no_kontrak: "SI.01/20/9/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-09-20",
        durasi_kontrak: 90,
        no_sp3: null,
        tgl_sp3: "2024-09-17",
        tgl_bamk: "2024-09-17",
        assets: [
          {
            asset_code: "SPMT-MKS-LPG-DMG-01",
            name: "Gate Controller Makassar — Pintu 1",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-MKS-GCL-001",
            procurement_date: "2024-09-20",
            acquisition_value: 210000000,
          },
          {
            asset_code: "SPMT-MKS-LPG-DMG-02",
            name: "Gate Controller Makassar — Pintu 2",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-MKS-GCL-002",
            procurement_date: "2024-09-20",
            acquisition_value: 210000000,
          },
          {
            asset_code: "SPMT-MKS-LPG-KMR-01",
            name: "CCTV Overhead Gate Makassar",
            brand: "Hikvision",
            model: "DS-2CD2T47G2-L",
            serial_number: "HVK-MKS-KMR-001",
            procurement_date: "2024-09-20",
            acquisition_value: 95000000,
          },
          {
            asset_code: "SPMT-MKS-DTC-PKR-01",
            name: "UPS Gate Room Makassar",
            brand: "APC",
            model: "Smart-UPS 3000VA",
            serial_number: "APC-MKS-UPS-001",
            procurement_date: "2024-09-20",
            acquisition_value: 125000000,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ANGGARAN 2440014 — Penyediaan Network di Branch SPMT
  // thn_anggaran: 2024
  // ═══════════════════════════════════════════════════════════════
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
        id_pekerjaan: 5,
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

  // ═══════════════════════════════════════════════════════════════
  // ANGGARAN 2440013 — Penyiapan Infrastruktur IT
  // thn_anggaran: 2024
  // ═══════════════════════════════════════════════════════════════
  {
    id_anggaran_tahunan_capex: 3,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2440013",
    nm_anggaran_capex:
      "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, dan Branch)",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 4500000000,
    projects: [
      {
        id_pekerjaan: 6,
        id_anggaran_tahunan: "2440013",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
        nilai_rab: 2800000000,
        nilai_kontrak: 2650000000,
        no_pr: null,
        no_po: "8260000074",
        no_kontrak: "SI.01/10/9/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-09-10",
        durasi_kontrak: 90,
        no_sp3: null,
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

  // ═══════════════════════════════════════════════════════════════
  // ANGGARAN 2440020 — Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC)
  // thn_anggaran: 2025
  // ═══════════════════════════════════════════════════════════════
  {
    id_anggaran_tahunan_capex: 4,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2440020",
    nm_anggaran_capex:
      "Revisi Capex (Pemenuhan Kebutuhan Gate dan Planning & Control)",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2025,
    thn_anggaran: 2025,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 8500000000,
    projects: [
      // ── Pekerjaan 7 ──
      {
        id_pekerjaan: 7,
        id_anggaran_tahunan: "2440020",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System Transformasi pada Branch (Jamrud Nilam Mirah, Tanjung Wangi, Trisakti, Dumai, Belawan) PT Pelindo Multi Terminal",
        nilai_rab: 2200000000,
        nilai_kontrak: 2050000000,
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
            asset_code: "SPMT-TSK-LPG-DMG-01",
            name: "Gate Controller Trisakti",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-TSK-GCL-001",
            procurement_date: "2025-01-07",
            acquisition_value: 400000000,
          },
          {
            asset_code: "SPMT-DMI-LPG-DMG-01",
            name: "Gate Controller Dumai",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-DMI-GCL-001",
            procurement_date: "2025-01-07",
            acquisition_value: 410000000,
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
      // ── Pekerjaan 8 ──
      {
        id_pekerjaan: 8,
        id_anggaran_tahunan: "2440020",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Planning and Control Transformasi pada Branch (Jamrud Nilam Mirah, Tanjung Wangi, Trisakti, Dumai, Belawan dan Kantor Pusat) PT Pelindo Multi Terminal",
        nilai_rab: 1900000000,
        nilai_kontrak: 1780000000,
        no_pr: "8260000283",
        no_po: "6440000676",
        no_kontrak: "SI.01/13/1/2/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-01-13",
        durasi_kontrak: 90,
        no_sp3: "KP.20.01/10/1/4/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-01-10",
        tgl_bamk: "2025-01-15",
        assets: [
          {
            asset_code: "SPMT-JNM-DTC-SRV-01",
            name: "Server Planning & Control Jamrud Nilam Mirah",
            brand: "Dell",
            model: "PowerEdge R550",
            serial_number: "DELL-JNM-SRV-001",
            procurement_date: "2025-01-13",
            acquisition_value: 310000000,
          },
          {
            asset_code: "SPMT-TWG-DTC-SRV-01",
            name: "Server Planning & Control Tanjung Wangi",
            brand: "Dell",
            model: "PowerEdge R550",
            serial_number: "DELL-TWG-SRV-001",
            procurement_date: "2025-01-13",
            acquisition_value: 310000000,
          },
          {
            asset_code: "SPMT-TSK-DTC-SRV-01",
            name: "Server Planning & Control Trisakti",
            brand: "Dell",
            model: "PowerEdge R550",
            serial_number: "DELL-TSK-SRV-001",
            procurement_date: "2025-01-13",
            acquisition_value: 310000000,
          },
          {
            asset_code: "SPMT-DMI-DTC-SRV-01",
            name: "Server Planning & Control Dumai",
            brand: "Dell",
            model: "PowerEdge R550",
            serial_number: "DELL-DMI-SRV-001",
            procurement_date: "2025-01-13",
            acquisition_value: 310000000,
          },
          {
            asset_code: "SPMT-BLW-DTC-SRV-01",
            name: "Server Planning & Control Belawan",
            brand: "Dell",
            model: "PowerEdge R550",
            serial_number: "DELL-BLW-SRV-001",
            procurement_date: "2025-01-13",
            acquisition_value: 310000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-SRV-03",
            name: "Server Aggregasi Planning & Control — Kantor Pusat",
            brand: "Dell",
            model: "PowerEdge R750",
            serial_number: "DELL-KPT-SRV-003",
            procurement_date: "2025-01-13",
            acquisition_value: 230000000,
          },
        ],
      },
      // ── Pekerjaan 9 ──
      {
        id_pekerjaan: 9,
        id_anggaran_tahunan: "2440020",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Transformasi PT Pelindo Multi Terminal",
        nilai_rab: 2400000000,
        nilai_kontrak: 2250000000,
        no_pr: "8260000256",
        no_po: "6440000761",
        no_kontrak: "SI.01/24/1/3/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-01-24",
        durasi_kontrak: 90,
        no_sp3: "KP.20.01/21/1/4/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-01-21",
        tgl_bamk: "2025-02-07",
        assets: [
          {
            asset_code: "SPMT-BLW-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Belawan — Gate Utama",
            brand: "Axis",
            model: "P3245-V",
            serial_number: "AXIS-BLW-KMR-001",
            procurement_date: "2025-01-24",
            acquisition_value: 95000000,
          },
          {
            asset_code: "SPMT-DMI-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Dumai — Gate Utama",
            brand: "Axis",
            model: "P3245-V",
            serial_number: "AXIS-DMI-KMR-001",
            procurement_date: "2025-01-24",
            acquisition_value: 95000000,
          },
          {
            asset_code: "SPMT-JNM-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Jamrud Nilam Mirah",
            brand: "Axis",
            model: "P3245-V",
            serial_number: "AXIS-JNM-KMR-001",
            procurement_date: "2025-01-24",
            acquisition_value: 95000000,
          },
          {
            asset_code: "SPMT-BLW-DTC-PKR-01",
            name: "UPS Rack Belawan — Data Center",
            brand: "APC",
            model: "Smart-UPS 3000VA RM",
            serial_number: "APC-BLW-UPS-001",
            procurement_date: "2025-01-24",
            acquisition_value: 125000000,
          },
          {
            asset_code: "SPMT-DMI-DTC-PKR-01",
            name: "UPS Rack Dumai — Data Center",
            brand: "APC",
            model: "Smart-UPS 3000VA RM",
            serial_number: "APC-DMI-UPS-001",
            procurement_date: "2025-01-24",
            acquisition_value: 125000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-PKR-03",
            name: "Network Management System (NMS) Appliance — Kantor Pusat",
            brand: "Paessler",
            model: "PRTG Enterprise Monitor",
            serial_number: "PRTG-KPT-NMS-001",
            procurement_date: "2025-01-24",
            acquisition_value: 380000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-PKR-04",
            name: "Patch Panel 48-Port — Kantor Pusat",
            brand: "Panduit",
            model: "CP24BLY",
            serial_number: "PDT-KPT-PNL-001",
            procurement_date: "2025-01-24",
            acquisition_value: 45000000,
          },
          {
            asset_code: "SPMT-JNM-DTC-PKR-01",
            name: "Access Switch Gate Area Jamrud Nilam Mirah",
            brand: "Cisco",
            model: "Catalyst 2960-X 24TS",
            serial_number: "CSC-JNM-ASW-001",
            procurement_date: "2025-01-24",
            acquisition_value: 155000000,
          },
          {
            asset_code: "SPMT-TWG-DTC-PKR-01",
            name: "Access Switch Gate Area Tanjung Wangi",
            brand: "Cisco",
            model: "Catalyst 2960-X 24TS",
            serial_number: "CSC-TWG-ASW-001",
            procurement_date: "2025-01-24",
            acquisition_value: 155000000,
          },
          {
            asset_code: "SPMT-TSK-DTC-PKR-02",
            name: "Access Switch Gate Area Trisakti",
            brand: "Cisco",
            model: "Catalyst 2960-X 24TS",
            serial_number: "CSC-TSK-ASW-002",
            procurement_date: "2025-01-24",
            acquisition_value: 155000000,
          },
          {
            asset_code: "SPMT-TSK-DTC-PKR-03",
            name: "Firewall UTM Trisakti",
            brand: "Fortinet",
            model: "FortiGate 80F",
            serial_number: "FGT-TSK-FWL-001",
            procurement_date: "2025-01-24",
            acquisition_value: 155000000,
          },
          {
            asset_code: "SPMT-TWG-DTC-PKR-02",
            name: "Firewall UTM Tanjung Wangi",
            brand: "Fortinet",
            model: "FortiGate 80F",
            serial_number: "FGT-TWG-FWL-001",
            procurement_date: "2025-01-24",
            acquisition_value: 155000000,
          },
          {
            asset_code: "SPMT-JNM-DTC-PKR-02",
            name: "Firewall UTM Jamrud Nilam Mirah",
            brand: "Fortinet",
            model: "FortiGate 80F",
            serial_number: "FGT-JNM-FWL-001",
            procurement_date: "2025-01-24",
            acquisition_value: 155000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-PKR-05",
            name: "Storage NAS Monitoring Data — Kantor Pusat",
            brand: "Synology",
            model: "RS2423+",
            serial_number: "SYN-KPT-NAS-001",
            procurement_date: "2025-01-24",
            acquisition_value: 360000000,
          },
        ],
      },
      // ── Pekerjaan 10 ──
      {
        id_pekerjaan: 10,
        id_anggaran_tahunan: "2440020",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Pemenuhan Kebutuhan Gate System dan Planning and Control (Public Announcer, Kelengkapan Gate dan Radio Point To Point) PT Pelindo Multi Terminal",
        nilai_rab: 1800000000,
        nilai_kontrak: 1680000000,
        no_pr: "8260000614",
        no_po: "6440000838",
        no_kontrak: "PD.05.01/29/10/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-10-29",
        durasi_kontrak: 60,
        no_sp3: "PD.05.01/23/10/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-10-23",
        tgl_bamk: "2025-10-02",
        assets: [
          {
            asset_code: "SPMT-BLW-LPG-ANS-01",
            name: "IP Public Announcer Belawan — Gate",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-BLW-ANS-001",
            procurement_date: "2025-10-29",
            acquisition_value: 145000000,
          },
          {
            asset_code: "SPMT-JNM-LPG-ANS-01",
            name: "IP Public Announcer Jamrud Nilam Mirah — Gate",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-JNM-ANS-001",
            procurement_date: "2025-10-29",
            acquisition_value: 145000000,
          },
          {
            asset_code: "SPMT-DMI-LPG-ANS-01",
            name: "IP Public Announcer Dumai — Gate",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-DMI-ANS-001",
            procurement_date: "2025-10-29",
            acquisition_value: 145000000,
          },
          {
            asset_code: "SPMT-BLW-LPG-PKR-01",
            name: "Radio Point-to-Point Belawan — Link Kantor Pusat",
            brand: "Ubiquiti",
            model: "airFiber 5XHD",
            serial_number: "UBQ-BLW-P2P-001",
            procurement_date: "2025-10-29",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-DMI-LPG-PKR-01",
            name: "Radio Point-to-Point Dumai — Link Kantor Pusat",
            brand: "Ubiquiti",
            model: "airFiber 5XHD",
            serial_number: "UBQ-DMI-P2P-001",
            procurement_date: "2025-10-29",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-TSK-LPG-PKR-01",
            name: "Radio Point-to-Point Trisakti — Link Kantor Pusat",
            brand: "Ubiquiti",
            model: "airFiber 5XHD",
            serial_number: "UBQ-TSK-P2P-001",
            procurement_date: "2025-10-29",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-TWG-LPG-PKR-01",
            name: "Barrier Gate Otomatis Tanjung Wangi",
            brand: "FAAC",
            model: "B680H",
            serial_number: "FAAC-TWG-BGT-001",
            procurement_date: "2025-10-29",
            acquisition_value: 405000000,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ANGGARAN 2540011 — Transformasi dan Digitalisasi PT Pelindo Multi Terminal
  // thn_anggaran: 2025
  // ═══════════════════════════════════════════════════════════════
  {
    id_anggaran_tahunan_capex: 5,
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
      // ── Pekerjaan 11 ──
      {
        id_pekerjaan: 11,
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
            asset_code: "SPMT-LMB-LPG-DMG-02",
            name: "Gate Controller RoRo Lembar Gilimas",
            brand: "Genetec",
            model: "AutoVu Sharp XP",
            serial_number: "GTC-LMB-GCL-002",
            procurement_date: "2025-07-07",
            acquisition_value: 560000000,
          },
          {
            asset_code: "SPMT-TWG-LPG-DMG-02",
            name: "Gate Controller RoRo Tanjung Wangi",
            brand: "Genetec",
            model: "AutoVu Sharp XP",
            serial_number: "GTC-TWG-GCL-002",
            procurement_date: "2025-07-07",
            acquisition_value: 560000000,
          },
          {
            asset_code: "SPMT-TJE-LPG-DMG-01",
            name: "Gate Controller Tanjung Emas",
            brand: "Genetec",
            model: "AutoVu Sharp XP",
            serial_number: "GTC-TJE-GCL-001",
            procurement_date: "2025-07-07",
            acquisition_value: 560000000,
          },
          {
            asset_code: "SPMT-SBG-LPG-DMG-01",
            name: "Gate Controller Sibolga",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-SBG-GCL-001",
            procurement_date: "2025-07-07",
            acquisition_value: 420000000,
          },
          {
            asset_code: "SPMT-BLP-LPG-DMG-02",
            name: "Gate Controller RoRo Balikpapan",
            brand: "Genetec",
            model: "AutoVu Sharp XP",
            serial_number: "GTC-BLP-GCL-002",
            procurement_date: "2025-07-07",
            acquisition_value: 560000000,
          },
          {
            asset_code: "SPMT-PPR-LPG-DMG-02",
            name: "Gate Controller RoRo Parepare",
            brand: "Genetec",
            model: "AutoVu Sharp XP",
            serial_number: "GTC-PPR-GCL-002",
            procurement_date: "2025-07-07",
            acquisition_value: 450000000,
          },
          {
            asset_code: "SPMT-TBK-LPG-DMG-01",
            name: "Gate Controller Tanjung Balai Karimun",
            brand: "Genetec",
            model: "AutoVu SharpX",
            serial_number: "GTC-TBK-GCL-001",
            procurement_date: "2025-07-07",
            acquisition_value: 420000000,
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
      // ── Pekerjaan 12 ──
      // PERBAIKAN: nm_pekerjaan disesuaikan dengan Excel (Belawan,Dumai tanpa spasi)
      {
        id_pekerjaan: 12,
        id_anggaran_tahunan: "2540011",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyediaan Kebutuhan Public Announcer Pendukung Transformasi dan Digitalisasi Branch (Balikpapan, Belawan,Dumai, Trisakti, Makassar, Parepare, Garongkong, Sibolga, Tanjung Emas, Tanjung Intan dan Gresik) PT Pelindo Multi Terminal",
        nilai_rab: 2200000000,
        nilai_kontrak: 2050000000,
        no_pr: "8260000748",
        no_po: "6440000820",
        no_kontrak: "PD.05.01/18/8/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-08-18",
        durasi_kontrak: 60,
        no_sp3: "PD.05.01/11/8/3/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-08-11",
        tgl_bamk: "2025-09-15",
        assets: [
          {
            asset_code: "SPMT-BLP-LPG-ANS-01",
            name: "IP Public Announcer Balikpapan",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-BLP-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-BLW-LPG-ANS-02",
            name: "IP Public Announcer Belawan",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-BLW-ANS-002",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-DMI-LPG-ANS-02",
            name: "IP Public Announcer Dumai",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-DMI-ANS-002",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-TSK-LPG-ANS-01",
            name: "IP Public Announcer Trisakti",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-TSK-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-MKS-LPG-ANS-01",
            name: "IP Public Announcer Makassar",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-MKS-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-PPR-LPG-ANS-01",
            name: "IP Public Announcer Parepare",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-PPR-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-GRG-LPG-ANS-01",
            name: "IP Public Announcer Garongkong",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-GRG-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-SBG-LPG-ANS-01",
            name: "IP Public Announcer Sibolga",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-SBG-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-TJE-LPG-ANS-01",
            name: "IP Public Announcer Tanjung Emas",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-TJE-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-TMI-LPG-ANS-01",
            name: "IP Public Announcer Tanjung Intan",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-TMI-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-GRK-LPG-ANS-01",
            name: "IP Public Announcer Gresik",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-GRK-ANS-001",
            procurement_date: "2025-08-18",
            acquisition_value: 165000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-SRV-04",
            name: "Server Manajemen Announcer — Kantor Pusat",
            brand: "Dell",
            model: "PowerEdge R450",
            serial_number: "DELL-KPT-SRV-004",
            procurement_date: "2025-08-18",
            acquisition_value: 210000000,
          },
        ],
      },
      // ── Pekerjaan 13 ──
      {
        id_pekerjaan: 13,
        id_anggaran_tahunan: "2540011",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyediaan Kebutuhan Perangkat Jaringan, Security Information and Management (SIEM) dan Perangkat Pendukung Gate System PT Pelindo Multi Terminal",
        nilai_rab: 3600000000,
        nilai_kontrak: 3350000000,
        no_pr: "8260001121",
        no_po: "6440000839",
        no_kontrak: "PD.01/28/10/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-10-28",
        durasi_kontrak: 60,
        no_sp3: "PD.01/23/10/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-10-23",
        tgl_bamk: "2025-10-02",
        assets: [
          {
            asset_code: "SPMT-KPT-DTC-SRV-05",
            name: "SIEM Appliance — Kantor Pusat (Primary)",
            brand: "IBM",
            model: "QRadar SIEM 3105",
            serial_number: "IBM-KPT-SIEM-001",
            procurement_date: "2025-10-28",
            acquisition_value: 850000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-SRV-06",
            name: "SIEM Log Collector — Kantor Pusat",
            brand: "IBM",
            model: "QRadar Log Manager",
            serial_number: "IBM-KPT-SIEM-002",
            procurement_date: "2025-10-28",
            acquisition_value: 450000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-PKR-05",
            name: "Core Switch Backbone — Kantor Pusat (Redundant)",
            brand: "Cisco",
            model: "Nexus 9300-48S",
            serial_number: "CSC-KPT-CSW-002",
            procurement_date: "2025-10-28",
            acquisition_value: 520000000,
          },
          {
            asset_code: "SPMT-BLW-DTC-PKR-02",
            name: "Firewall UTM Belawan",
            brand: "Fortinet",
            model: "FortiGate 100F",
            serial_number: "FGT-BLW-FWL-001",
            procurement_date: "2025-10-28",
            acquisition_value: 220000000,
          },
          {
            asset_code: "SPMT-DMI-DTC-PKR-02",
            name: "Firewall UTM Dumai",
            brand: "Fortinet",
            model: "FortiGate 100F",
            serial_number: "FGT-DMI-FWL-001",
            procurement_date: "2025-10-28",
            acquisition_value: 220000000,
          },
          {
            asset_code: "SPMT-MKS-DTC-PKR-02",
            name: "Firewall UTM Makassar",
            brand: "Fortinet",
            model: "FortiGate 100F",
            serial_number: "FGT-MKS-FWL-001",
            procurement_date: "2025-10-28",
            acquisition_value: 220000000,
          },
          {
            asset_code: "SPMT-BLP-DTC-PKR-02",
            name: "Access Switch Gate Area Balikpapan",
            brand: "Cisco",
            model: "Catalyst 2960-X 48TS",
            serial_number: "CSC-BLP-ASW-002",
            procurement_date: "2025-10-28",
            acquisition_value: 180000000,
          },
          {
            asset_code: "SPMT-TJE-DTC-PKR-02",
            name: "Access Switch Gate Area Tanjung Emas",
            brand: "Cisco",
            model: "Catalyst 2960-X 48TS",
            serial_number: "CSC-TJE-ASW-001",
            procurement_date: "2025-10-28",
            acquisition_value: 180000000,
          },
          {
            asset_code: "SPMT-KPT-GDG-PKR-01",
            name: "Patch Panel Manajemen Kabel — Kantor Pusat",
            brand: "Panduit",
            model: "CP48BLY",
            serial_number: "PDT-KPT-PNL-002",
            procurement_date: "2025-10-28",
            acquisition_value: 510000000,
          },
        ],
      },
      // ── Pekerjaan 14 ──
      {
        id_pekerjaan: 14,
        id_anggaran_tahunan: "2540011",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyediaan Kebutuhan Transformasi dan Digitalisasi (CCTV dan Public Announcer Traffic Monitoring pada Gate) Branch Belawan, Dumai, Malahayati, Lhokseumawe, Lembar, Jamrud Nilam Mirah, Makassar, Balikpapan, Bumiharjo Bagendang, Tanjung Pinang, Sibolga, Tanjung Emas, Parepare, Trisakti dan Gresik PT Pelindo Multi Terminal",
        nilai_rab: 4800000000,
        nilai_kontrak: 4500000000,
        no_pr: "8260001031",
        no_po: "6440000840",
        no_kontrak: "PD.01/22/10/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-10-22",
        durasi_kontrak: 60,
        no_sp3: "PD.01/16/10/2/PGDN/SDMU/PLMT-25",
        tgl_sp3: "2025-10-16",
        tgl_bamk: "2025-10-02",
        assets: [
          {
            asset_code: "SPMT-BLW-LPG-KMR-02",
            name: "CCTV Traffic Monitoring Gate — Belawan",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-BLW-KMR-002",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-DMI-LPG-KMR-02",
            name: "CCTV Traffic Monitoring Gate — Dumai",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-DMI-KMR-002",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-MLH-LPG-KMR-02",
            name: "CCTV Traffic Monitoring Gate — Malahayati",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-MLH-KMR-002",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-LHK-LPG-KMR-02",
            name: "CCTV Traffic Monitoring Gate — Lhokseumawe",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-LHK-KMR-002",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-LMB-LPG-KMR-02",
            name: "CCTV Traffic Monitoring Gate — Lembar",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-LMB-KMR-002",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-JNM-LPG-KMR-02",
            name: "CCTV Traffic Monitoring Gate — Jamrud Nilam Mirah",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-JNM-KMR-002",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-MKS-LPG-KMR-02",
            name: "CCTV Traffic Monitoring Gate — Makassar",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-MKS-KMR-002",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-BLP-LPG-KMR-02",
            name: "CCTV Traffic Monitoring Gate — Balikpapan",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-BLP-KMR-002",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-BMH-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Gate — Bumiharjo Bagendang",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-BMH-KMR-001",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-TPG-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Gate — Tanjung Pinang",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-TPG-KMR-001",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-SBG-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Gate — Sibolga",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-SBG-KMR-001",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-TJE-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Gate — Tanjung Emas",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-TJE-KMR-001",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-PPR-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Gate — Parepare",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-PPR-KMR-001",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-TSK-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Gate — Trisakti",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-TSK-KMR-001",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-GRK-LPG-KMR-01",
            name: "CCTV Traffic Monitoring Gate — Gresik",
            brand: "Axis",
            model: "P3245-V 1080p",
            serial_number: "AXIS-GRK-KMR-001",
            procurement_date: "2025-10-22",
            acquisition_value: 280000000,
          },
          {
            asset_code: "SPMT-KPT-DTC-SRV-07",
            name: "Video Management System (VMS) Server — Kantor Pusat",
            brand: "Genetec",
            model: "Security Center 5.11",
            serial_number: "GTC-KPT-VMS-001",
            procurement_date: "2025-10-22",
            acquisition_value: 420000000,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ANGGARAN 2540012 — Standarisasi Perangkat Jaringan
  // thn_anggaran: 2025
  // ═══════════════════════════════════════════════════════════════
  {
    id_anggaran_tahunan_capex: 6,
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
        id_pekerjaan: 15,
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
          {
            asset_code: "SPMT-SPJ-DTC-PKR-01",
            name: "Core Switch Terminal Selat Panjang",
            brand: "Cisco",
            model: "Catalyst 2960-X 24TS",
            serial_number: "CSC-SPJ-CSW-001",
            procurement_date: "2025-07-24",
            acquisition_value: 155000000,
          },
          {
            asset_code: "SPMT-SPJ-DTC-PKR-02",
            name: "Wireless Access Point Selat Panjang",
            brand: "Cisco",
            model: "Aironet 2800",
            serial_number: "CSC-SPJ-WAP-001",
            procurement_date: "2025-07-24",
            acquisition_value: 85000000,
          },
          {
            asset_code: "SPMT-TBK-DTC-PKR-03",
            name: "Wireless Access Point Tanjung Balai Karimun",
            brand: "Cisco",
            model: "Aironet 2800",
            serial_number: "CSC-TBK-WAP-001",
            procurement_date: "2025-07-24",
            acquisition_value: 80000000,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ANGGARAN 2540010 — Penyiapan Infrastruktur Gate System RoRo
  // thn_anggaran: 2025
  // ═══════════════════════════════════════════════════════════════
  {
    id_anggaran_tahunan_capex: 7,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2540010",
    nm_anggaran_capex:
      "Penyiapan Infrastruktur Gate System Pendukung Kegiatan RoRo",
    thn_rkap_awal: 2025,
    thn_rkap_akhir: 2026,
    thn_anggaran: 2025,
    nilai_anggaran_kad: null,
    nilai_anggaran_rkap: 2800000000,
    projects: [
      {
        id_pekerjaan: 16,
        id_anggaran_tahunan: "2540010",
        jenis_anggaran: "Capex",
        nm_pekerjaan:
          "Penyiapan Infrastruktur Gate System Pendukung Kegiatan RoRo pada Branch Tanjung Emas PT Pelindo Multi Terminal",
        nilai_rab: 1800000000,
        nilai_kontrak: 1680000000,
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
            asset_code: "SPMT-TJE-LPG-DMG-03",
            name: "Gate Controller RoRo Tanjung Emas — Dermaga 2",
            brand: "Genetec",
            model: "AutoVu Sharp XP",
            serial_number: "GTC-TJE-GCL-003",
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
          {
            asset_code: "SPMT-TJE-LPG-ANS-02",
            name: "IP Public Announcer Dermaga RoRo Tanjung Emas",
            brand: "Bosch",
            model: "PRA-CSI2",
            serial_number: "BSH-TJE-ANS-002",
            procurement_date: "2025-08-04",
            acquisition_value: 145000000,
          },
          {
            asset_code: "SPMT-TJE-LPG-PKR-01",
            name: "Barrier Gate Otomatis RoRo Tanjung Emas — Pintu 1",
            brand: "FAAC",
            model: "B680H",
            serial_number: "FAAC-TJE-BGT-001",
            procurement_date: "2025-08-04",
            acquisition_value: 135000000,
          },
          {
            asset_code: "SPMT-TJE-LPG-PKR-02",
            name: "Barrier Gate Otomatis RoRo Tanjung Emas — Pintu 2",
            brand: "FAAC",
            model: "B680H",
            serial_number: "FAAC-TJE-BGT-002",
            procurement_date: "2025-08-04",
            acquisition_value: 95000000,
          },
        ],
      },
    ],
  },
];

// ================================================================
// MOCK DATA PEMINJAMAN
// ================================================================
export const mockBorrows = [
  {
    id_peminjaman: 1,
    asset_code: "SPMT-MLH-LPG-KMR-01",
    asset_name: "CCTV IP Camera Malahayati",
    borrower_name: "Andi Pratama",
    borrow_date: "2026-01-10",
    due_date: "2026-01-20",
    is_returned: true,
    return_date: "2026-01-19",
    return_condition: "GOOD",
  },
  {
    id_peminjaman: 2,
    asset_code: "SPMT-MLH-LPG-KMR-01",
    asset_name: "CCTV IP Camera Malahayati",
    borrower_name: "Budi Santoso",
    borrow_date: "2026-02-01",
    due_date: "2026-02-15",
    is_returned: true,
    return_date: "2026-02-16",
    return_condition: "MINOR_DAMAGE",
  },
  {
    id_peminjaman: 3,
    asset_code: "SPMT-MLH-LPG-KMR-01",
    asset_name: "CCTV IP Camera Malahayati",
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
    asset_code: "SPMT-LHK-LPG-KMR-01",
    asset_name: "CCTV IP Camera Lhokseumawe",
    borrower_name: "Gita Rahayu",
    borrow_date: "2026-01-15",
    due_date: "2026-01-30",
    is_returned: true,
    return_date: "2026-01-29",
    return_condition: "MINOR_DAMAGE",
  },
  {
    id_peminjaman: 8,
    asset_code: "SPMT-LHK-LPG-KMR-01",
    asset_name: "CCTV IP Camera Lhokseumawe",
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
          }) sudah kontrak senilai ${formatRupiah(proj.nilai_kontrak)} namun belum ada data aset.`,
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
