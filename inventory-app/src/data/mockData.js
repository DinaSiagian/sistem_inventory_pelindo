// ================================================================
// mockData.js — Data mock sesuai struktur excel Tabel_Investasi
// acquisition_value ditambahkan di setiap aset dalam projects
// ================================================================

export const mockAnggaranMaster = [
  { kd_anggaran_master: "5030905000", nm_anggaran_master: "Beban Pemeliharaan Software", tipe_anggaran_master: "Opex" },
  { kd_anggaran_master: "5021300000", nm_anggaran_master: "Beban Jaringan dan Koneksi Data", tipe_anggaran_master: "Opex" },
  { kd_anggaran_master: "5021200000", nm_anggaran_master: "Beban Perlengkapan Kantor", tipe_anggaran_master: "Opex" },
  { kd_anggaran_master: "5081500000", nm_anggaran_master: "Beban Jasa Konsultan", tipe_anggaran_master: "Opex" },
  { kd_anggaran_master: "5060700000", nm_anggaran_master: "Beban Sumber Daya Pihak Ketiga Peralatan", tipe_anggaran_master: "Opex" },
  { kd_anggaran_master: "5900100000", nm_anggaran_master: "Beban Investasi", tipe_anggaran_master: "Capex" },
];

// ── realisasi_opex ───────────────────────────────────────────────
export const mockRealisasiOpex = [
  { id_realisasi: 1, id_anggaran_tahunan: 2, tanggal_realisasi: "2026-01-15", jumlah: 120000000, keterangan: "Pembayaran tagihan jaringan MPLS bulan Januari", no_invoice: "INV/2026/001/JRN", id_aset: null, create_user: "finance01", create_date: "2026-01-15T09:00:00" },
  { id_realisasi: 2, id_anggaran_tahunan: 2, tanggal_realisasi: "2026-02-15", jumlah: 120000000, keterangan: "Pembayaran tagihan jaringan MPLS bulan Februari", no_invoice: "INV/2026/002/JRN", id_aset: null, create_user: "finance01", create_date: "2026-02-15T09:00:00" },
  { id_realisasi: 3, id_anggaran_tahunan: 1, tanggal_realisasi: "2026-01-10", jumlah: 85000000, keterangan: "Perpanjangan lisensi Microsoft Office 365 (50 user)", no_invoice: "INV/2026/010/MS365", id_aset: "SPMT-BLW-GDG-DMG-01", create_user: "finance02", create_date: "2026-01-10T10:30:00" },
  { id_realisasi: 4, id_anggaran_tahunan: 3, tanggal_realisasi: "2026-02-01", jumlah: 45000000, keterangan: "Pengadaan ATK dan perlengkapan kantor Q1 2026", no_invoice: "INV/2026/021/ATK", id_aset: null, create_user: "finance01", create_date: "2026-02-01T08:00:00" },
  { id_realisasi: 5, id_anggaran_tahunan: 4, tanggal_realisasi: "2026-01-20", jumlah: 200000000, keterangan: "Pembayaran jasa konsultan IT audit semester 1", no_invoice: "INV/2026/015/KONSUL", id_aset: null, create_user: "finance02", create_date: "2026-01-20T14:00:00" },
  { id_realisasi: 6, id_anggaran_tahunan: 4, tanggal_realisasi: "2026-02-20", jumlah: 200000000, keterangan: "Pembayaran jasa konsultan IT audit semester 1 (termin 2)", no_invoice: "INV/2026/031/KONSUL", id_aset: null, create_user: "finance02", create_date: "2026-02-20T14:00:00" },
  { id_realisasi: 7, id_anggaran_tahunan: 5, tanggal_realisasi: "2026-01-05", jumlah: 150000000, keterangan: "Sewa genset backup power data center bulan Januari", no_invoice: "INV/2026/005/SEWA", id_aset: null, create_user: "finance01", create_date: "2026-01-05T11:00:00" },
];

// ── anggaran_tahunan_opex ────────────────────────────────────────
export const mockOpex = [
  { id_anggaran_tahunan: 1, kd_anggaran_master: "5030905000", nm_anggaran_master: "Beban Pemeliharaan Software", thn_anggaran: 2026, nilai_anggaran_tahunan: 500000000 },
  { id_anggaran_tahunan: 2, kd_anggaran_master: "5021300000", nm_anggaran_master: "Beban Jaringan dan Koneksi Data", thn_anggaran: 2026, nilai_anggaran_tahunan: 600000000 },
  { id_anggaran_tahunan: 3, kd_anggaran_master: "5021200000", nm_anggaran_master: "Beban Perlengkapan Kantor", thn_anggaran: 2026, nilai_anggaran_tahunan: 700000000 },
  { id_anggaran_tahunan: 4, kd_anggaran_master: "5081500000", nm_anggaran_master: "Beban Jasa Konsultan", thn_anggaran: 2026, nilai_anggaran_tahunan: 800000000 },
  { id_anggaran_tahunan: 5, kd_anggaran_master: "5060700000", nm_anggaran_master: "Beban Sumber Daya Pihak Ketiga Peralatan", thn_anggaran: 2026, nilai_anggaran_tahunan: 900000000 },
];

// ── anggaran_tahunan_capex + list_pekerjaan ──────────────────────
// Setiap aset kini punya acquisition_value (nilai perolehan per unit)
// SUM(acquisition_value) per project idealnya = nilai_kontrak
export const mockCapex = [
  {
    id_anggaran_tahunan_capex: 1,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2440015",
    nm_anggaran_capex: "Implementasi dan Standarisasi IT Infrastruktur",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_anggaran_kad: null, nilai_anggaran_rkap: 5800000000,
    projects: [
      {
        id_pekerjaan: 1, id_anggaran_tahunan: "2440015", jenis_anggaran: "Capex",
        nm_pekerjaan: "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Planning & Control, CCTV dan SD-WAN Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_rab: 1250000000, nilai_kontrak: 1200000000,
        no_pr: null, no_po: "6440000026", no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-12", durasi_kontrak: 90, no_sp3: null,
        tgl_sp3: "2024-08-02", tgl_bamk: "2024-08-06",
        assets: [
          // SUM = 350 + 350 + 500 = 1.200.000.000 ✅ balanced
          { asset_code: "SPMT-MLH-LPG-DMG-01", name: "CCTV Hikvision Malahayati", brand: "Hikvision", model: "DS-2CD2143G2-I", serial_number: "SN-HVK-001", procurement_date: "2024-08-12", acquisition_value: 350000000 },
          { asset_code: "SPMT-LHK-LPG-DMG-01", name: "CCTV Hikvision Lhokseumawe", brand: "Hikvision", model: "DS-2CD2143G2-I", serial_number: "SN-HVK-002", procurement_date: "2024-08-12", acquisition_value: 350000000 },
          { asset_code: "SPMT-MLH-DTC-PKR-01", name: "Switch SD-WAN Malahayati", brand: "Cisco", model: "ISR 4331", serial_number: "SN-CSC-001", procurement_date: "2024-08-12", acquisition_value: 500000000 },
        ],
      },
      {
        id_pekerjaan: 2, id_anggaran_tahunan: "2440015", jenis_anggaran: "Capex",
        nm_pekerjaan: "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System Branch Malahayati, Lhokseumawe, Lembar, ParePare dan Garongkong) PT Pelindo Multi Terminal",
        nilai_rab: 1000000000, nilai_kontrak: 980000000,
        no_pr: null, no_po: "6440000027", no_kontrak: "SI.01/8/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-08", durasi_kontrak: 90, no_sp3: null,
        tgl_sp3: "2024-08-02", tgl_bamk: "2024-08-02",
        assets: [
          // SUM = 490 + 490 = 980.000.000 ✅ balanced
          { asset_code: "SPMT-MLH-LPG-DMG-02", name: "Gate System Controller Malahayati", brand: "Genetec", model: "AutoVu", serial_number: "SN-GTC-001", procurement_date: "2024-08-08", acquisition_value: 490000000 },
          { asset_code: "SPMT-GRG-LPG-DMG-01", name: "Gate System Controller Garongkong", brand: "Genetec", model: "AutoVu", serial_number: "SN-GTC-002", procurement_date: "2024-08-08", acquisition_value: 490000000 },
        ],
      },
      {
        id_pekerjaan: 3, id_anggaran_tahunan: "2440015", jenis_anggaran: "Capex",
        nm_pekerjaan: "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (Gate System dan Planning & Control Branch Balikpapan dan Bagendang) PT Pelindo Multi Terminal",
        nilai_rab: 800000000, nilai_kontrak: 750000000,
        no_pr: "8260000057", no_po: "6440000109", no_kontrak: "SI.01/4/9/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-09-24", durasi_kontrak: 90, no_sp3: null,
        tgl_sp3: "2024-09-02", tgl_bamk: "2024-09-02",
        assets: [],
        // kosong → status "Belum Diisi"
      },
    ],
  },
  {
    id_anggaran_tahunan_capex: 2,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2440014",
    nm_anggaran_capex: "Penyediaan Network di Branch SPMT",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_anggaran_kad: null, nilai_anggaran_rkap: 3200000000,
    projects: [
      {
        id_pekerjaan: 4, id_anggaran_tahunan: "2440014", jenis_anggaran: "Capex",
        nm_pekerjaan: "Penyediaan Network di Branch SPMT (Malahayati, Lhokseumawe, Lembar, Parepare dan Garongkong)",
        nilai_rab: 1600000000, nilai_kontrak: 1500000000,
        no_pr: null, no_po: "6440000025", no_kontrak: "SI.01/15/8/5/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-15", durasi_kontrak: 90, no_sp3: null,
        tgl_sp3: "2024-08-02", tgl_bamk: "2024-08-09",
        assets: [
          // SUM = 450+450+350 = 1.250.000.000 ⚠️ selisih 250jt dari kontrak (contoh tidak balance)
          { asset_code: "SPMT-MLH-DTC-PKR-02", name: "Core Switch Malahayati", brand: "Cisco", model: "Catalyst 9300", serial_number: "SN-CS9300-001", procurement_date: "2024-08-15", acquisition_value: 450000000 },
          { asset_code: "SPMT-LHK-DTC-PKR-02", name: "Core Switch Lhokseumawe", brand: "Cisco", model: "Catalyst 9300", serial_number: "SN-CS9300-002", procurement_date: "2024-08-15", acquisition_value: 450000000 },
          { asset_code: "SPMT-GRG-DTC-PKR-01", name: "Access Switch Garongkong", brand: "Cisco", model: "Catalyst 2960-X", serial_number: "SN-C2960-001", procurement_date: "2024-08-15", acquisition_value: 350000000 },
        ],
      },
    ],
  },
  {
    id_anggaran_tahunan_capex: 3,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2540011",
    nm_anggaran_capex: "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025, thn_rkap_akhir: 2026, thn_anggaran: 2025,
    nilai_anggaran_kad: null, nilai_anggaran_rkap: 12000000000,
    projects: [
      {
        id_pekerjaan: 5, id_anggaran_tahunan: "2540011", jenis_anggaran: "Capex",
        nm_pekerjaan: "Pemenuhan Kebutuhan Gate System, Planning and Control dan Perangkat Pendukung Roro pada Branch (Lembar Gilimas, Tanjung Wangi, Tanjung Emas, Sibolga, Balikpapan, Parepare dan Tanjung Balai Karimun) PT Pelindo Multi Terminal",
        nilai_rab: 4200000000, nilai_kontrak: 3950000000,
        no_pr: "8260000711", no_po: "6440000822", no_kontrak: "SI.01/7/7/4/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-07-07", durasi_kontrak: 120,
        no_sp3: "PD.05.01/30/6/3/PGDN/SDMU/PLMT-25", tgl_sp3: "2025-06-30", tgl_bamk: "2025-07-01",
        assets: [
          // SUM = 1400+1350+1200 = 3.950.000.000 ✅ balanced
          { asset_code: "SPMT-TJE-LPG-DMG-01", name: "Gate Controller Tanjung Emas", brand: "Genetec", model: "AutoVu Sharp", serial_number: "SN-GTC-TJE-01", procurement_date: "2025-07-07", acquisition_value: 1400000000 },
          { asset_code: "SPMT-BLP-LPG-DMG-01", name: "Gate Controller Balikpapan", brand: "Genetec", model: "AutoVu Sharp", serial_number: "SN-GTC-BLP-01", procurement_date: "2025-07-07", acquisition_value: 1350000000 },
          { asset_code: "SPMT-TJE-DTC-PKR-01", name: "Server Planning Control Tanjung Emas", brand: "Dell", model: "PowerEdge R740", serial_number: "SN-DELL-TJE-01", procurement_date: "2025-07-07", acquisition_value: 1200000000 },
        ],
      },
      {
        id_pekerjaan: 6, id_anggaran_tahunan: "2540011", jenis_anggaran: "Capex",
        nm_pekerjaan: "Penyediaan Kebutuhan Transformasi dan Digitalisasi (CCTV dan Public Announcer Traffic Monitoring pada Gate) Branch Belawan, Dumai, Malahayati, Lhokseumawe, Lembar, Makassar, Balikpapan PT Pelindo Multi Terminal",
        nilai_rab: 3100000000, nilai_kontrak: 2870000000,
        no_pr: "8260001031", no_po: "6440000840", no_kontrak: "PD.01/22/10/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-10-22", durasi_kontrak: 60,
        no_sp3: "PD.01/16/10/2/PGDN/SDMU/PLMT-25", tgl_sp3: "2025-10-16", tgl_bamk: "2025-10-02",
        assets: [],
        // kosong → status "Belum Diisi"
      },
    ],
  },
  {
    id_anggaran_tahunan_capex: 4,
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "2540012",
    nm_anggaran_capex: "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    thn_rkap_awal: 2025, thn_rkap_akhir: 2026, thn_anggaran: 2025,
    nilai_anggaran_kad: null, nilai_anggaran_rkap: 4500000000,
    projects: [
      {
        id_pekerjaan: 7, id_anggaran_tahunan: "2540012", jenis_anggaran: "Capex",
        nm_pekerjaan: "Pemenuhan Kebutuhan Perangkat Network Branch Tanjung Balai Karimun Terminal Selat Panjang PT Pelindo Multi Terminal",
        nilai_rab: 850000000, nilai_kontrak: 810000000,
        no_pr: "8260000734", no_po: "6430001555", no_kontrak: "PD.01/24/7/1/PPTI/TEKI/PLMT-25",
        tgl_kontrak: "2025-07-24", durasi_kontrak: 60,
        no_sp3: "PD.01/22/7/1/PGDN/DSDM/PLMT-25", tgl_sp3: "2025-07-22", tgl_bamk: "2025-08-01",
        assets: [
          // SUM = 410+400 = 810.000.000 ✅ balanced
          { asset_code: "SPMT-TBK-DTC-PKR-01", name: "Core Switch Tanjung Balai Karimun", brand: "Cisco", model: "Catalyst 2960-X", serial_number: "SN-C2960-TBK-01", procurement_date: "2025-07-24", acquisition_value: 410000000 },
          { asset_code: "SPMT-TBK-DTC-PKR-02", name: "Firewall Tanjung Balai Karimun", brand: "Fortinet", model: "FortiGate 100F", serial_number: "SN-FG100F-TBK-01", procurement_date: "2025-07-24", acquisition_value: 400000000 },
        ],
      },
    ],
  },
];