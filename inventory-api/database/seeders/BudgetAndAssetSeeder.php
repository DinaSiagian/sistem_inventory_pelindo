<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BudgetAndAssetSeeder extends Seeder
{
    public function run()
    {
        // Disable foreign key checks for PostgreSQL
        DB::statement('TRUNCATE TABLE budget_items CASCADE');
        DB::statement('TRUNCATE TABLE budget_projects CASCADE');
        DB::statement('TRUNCATE TABLE budget_annual_capex CASCADE');
        DB::statement('TRUNCATE TABLE budget_annual_opex CASCADE');
        DB::statement('TRUNCATE TABLE budget_masters CASCADE');
        DB::statement('TRUNCATE TABLE barang CASCADE');
        DB::statement('TRUNCATE TABLE assets CASCADE');
        DB::statement('TRUNCATE TABLE device CASCADE');
        DB::statement('TRUNCATE TABLE specification_templates CASCADE');
        DB::statement('TRUNCATE TABLE asset_specifications CASCADE');

        // 1. Seed Devices
        $devices = [
            ['device_code' => 'LPT', 'name' => 'LAPTOP', 'is_active' => true],
            ['device_code' => 'CTV', 'name' => 'CCTV CAMERA', 'is_active' => true],
            ['device_code' => 'RTR', 'name' => 'ROUTER / JARINGAN', 'is_active' => true],
            ['device_code' => 'PC', 'name' => 'PC DESKTOP', 'is_active' => true],
            ['device_code' => 'SRV', 'name' => 'SERVER', 'is_active' => true],
            ['device_code' => 'SWT', 'name' => 'SWITCH', 'is_active' => true],
            ['device_code' => 'PRN', 'name' => 'PRINTER', 'is_active' => true],
            ['device_code' => 'KND', 'name' => 'KENDARAAN', 'is_active' => true],
            ['device_code' => 'AB', 'name' => 'ALAT BERAT', 'is_active' => true],
            ['device_code' => 'FRN', 'name' => 'FURNITURE', 'is_active' => true],
            ['device_code' => 'MAT', 'name' => 'MATERIAL', 'is_active' => true],
            ['device_code' => 'SFT', 'name' => 'SOFTWARE LICENSE', 'is_active' => true],
            ['device_code' => 'HDW', 'name' => 'HARDWARE', 'is_active' => true],
            ['device_code' => 'OTH', 'name' => 'IT LAINNYA', 'is_active' => true],
        ];
        foreach ($devices as $d) {
            DB::table('device')->updateOrInsert(['device_code' => $d['device_code']], $d);
        }

        // 1b. Seed Specification Templates
        $specTemplates = [
            // Laptop / LPT
            ['device_code' => 'LPT', 'spec_label' => 'Processor', 'default_unit' => 'GHz', 'input_type' => 'text'],
            ['device_code' => 'LPT', 'spec_label' => 'RAM', 'default_unit' => 'GB RAM', 'input_type' => 'number'],
            ['device_code' => 'LPT', 'spec_label' => 'Storage', 'default_unit' => 'GB', 'input_type' => 'number'],
            ['device_code' => 'LPT', 'spec_label' => 'Resolusi Layar', 'default_unit' => 'inch', 'input_type' => 'text'],

            // CCTV / CTV
            ['device_code' => 'CTV', 'spec_label' => 'Resolusi', 'default_unit' => 'MP', 'input_type' => 'text'],
            ['device_code' => 'CTV', 'spec_label' => 'Lensa', 'default_unit' => 'mm', 'input_type' => 'text'],
            ['device_code' => 'CTV', 'spec_label' => 'Jangkauan IR', 'default_unit' => 'm', 'input_type' => 'number'],

            // Router / RTR
            ['device_code' => 'RTR', 'spec_label' => 'Kecepatan', 'default_unit' => 'Mbps', 'input_type' => 'number'],
            ['device_code' => 'RTR', 'spec_label' => 'Port', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'RTR', 'spec_label' => 'Frekuensi', 'default_unit' => 'GHz', 'input_type' => 'text'],

            // PC Desktop / PC
            ['device_code' => 'PC', 'spec_label' => 'Processor', 'default_unit' => 'GHz', 'input_type' => 'text'],
            ['device_code' => 'PC', 'spec_label' => 'RAM', 'default_unit' => 'GB RAM', 'input_type' => 'number'],
            ['device_code' => 'PC', 'spec_label' => 'Storage', 'default_unit' => 'GB', 'input_type' => 'number'],

            // Server / SRV
            ['device_code' => 'SRV', 'spec_label' => 'Processor', 'default_unit' => 'GHz', 'input_type' => 'text'],
            ['device_code' => 'SRV', 'spec_label' => 'RAM', 'default_unit' => 'GB', 'input_type' => 'number'],
            ['device_code' => 'SRV', 'spec_label' => 'Storage', 'default_unit' => 'TB', 'input_type' => 'number'],
            ['device_code' => 'SRV', 'spec_label' => 'Power Supply', 'default_unit' => 'W', 'input_type' => 'number'],

            // Switch / SWT
            ['device_code' => 'SWT', 'spec_label' => 'Jumlah Port', 'default_unit' => '-', 'input_type' => 'number'],
            ['device_code' => 'SWT', 'spec_label' => 'Kecepatan', 'default_unit' => 'Mbps', 'input_type' => 'number'],
            ['device_code' => 'SWT', 'spec_label' => 'Manageable', 'default_unit' => '-', 'input_type' => 'text'],

            // Printer / PRN
            ['device_code' => 'PRN', 'spec_label' => 'Tipe Printer', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'PRN', 'spec_label' => 'Fungsi', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'PRN', 'spec_label' => 'Konektivitas', 'default_unit' => '-', 'input_type' => 'text'],

            // Lainnya / OTH / OTHERS
            ['device_code' => 'OTH', 'spec_label' => 'Spesifikasi Utama', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'OTH', 'spec_label' => 'Keterangan Tambahan', 'default_unit' => '-', 'input_type' => 'text'],

            // Kendaraan / KND
            ['device_code' => 'KND', 'spec_label' => 'Plat Nomor', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'KND', 'spec_label' => 'Nomor Mesin', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'KND', 'spec_label' => 'Tahun Pembuatan', 'default_unit' => 'tahun', 'input_type' => 'number'],
            ['device_code' => 'KND', 'spec_label' => 'Merk / Brand', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'KND', 'spec_label' => 'Kapasitas Mesin', 'default_unit' => 'cc', 'input_type' => 'number'],

            // Alat Berat / AB
            ['device_code' => 'AB', 'spec_label' => 'Plat / Lambung', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'AB', 'spec_label' => 'Nomor Mesin', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'AB', 'spec_label' => 'Tahun Pembuatan', 'default_unit' => 'tahun', 'input_type' => 'number'],
            ['device_code' => 'AB', 'spec_label' => 'Kapasitas Angkat', 'default_unit' => 'ton', 'input_type' => 'number'],
            ['device_code' => 'AB', 'spec_label' => 'Daya Mesin', 'default_unit' => 'kW', 'input_type' => 'number'],

            // Furniture / FRN
            ['device_code' => 'FRN', 'spec_label' => 'Bahan Material', 'default_unit' => '-', 'input_type' => 'text'],
            ['device_code' => 'FRN', 'spec_label' => 'Panjang', 'default_unit' => 'cm', 'input_type' => 'number'],
            ['device_code' => 'FRN', 'spec_label' => 'Lebar', 'default_unit' => 'cm', 'input_type' => 'number'],
            ['device_code' => 'FRN', 'spec_label' => 'Tinggi', 'default_unit' => 'cm', 'input_type' => 'number'],
            ['device_code' => 'FRN', 'spec_label' => 'Warna Dominan', 'default_unit' => '-', 'input_type' => 'text'],
        ];

        foreach ($specTemplates as $st) {
            DB::table('specification_templates')->insert(array_merge($st, [
                'is_active' => true
            ]));
        }

        // 2. Seed Budget Masters
        $masters = [
            // CAPEX
            ['kd_anggaran_master' => '2440013', 'nm_anggaran_master' => 'Penyiapan Infrastruktur IT PT Pelindo Multi Terminal', 'tipe_anggaran_master' => 'capex'],
            ['kd_anggaran_master' => '2440015', 'nm_anggaran_master' => 'Implementasi dan Standarisasi IT Infrastruktur', 'tipe_anggaran_master' => 'capex'],
            ['kd_anggaran_master' => '2540011', 'nm_anggaran_master' => 'Transformasi dan Digitalisasi Alat Berat', 'tipe_anggaran_master' => 'capex'],
            ['kd_anggaran_master' => '2440014', 'nm_anggaran_master' => 'Penyediaan Network di Branch SPMT', 'tipe_anggaran_master' => 'capex'],
            ['kd_anggaran_master' => '2440020', 'nm_anggaran_master' => 'Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC)', 'tipe_anggaran_master' => 'capex'],
            ['kd_anggaran_master' => '2540012', 'nm_anggaran_master' => 'Pengembangan Sistem Manajemen Aset Pelindo', 'tipe_anggaran_master' => 'capex'],
            // OPEX
            ['kd_anggaran_master' => '5030905000', 'nm_anggaran_master' => 'Beban Pemeliharaan Software & Hardware', 'tipe_anggaran_master' => 'opex'],
            ['kd_anggaran_master' => '5021300000', 'nm_anggaran_master' => 'Beban Jaringan dan Koneksi Data', 'tipe_anggaran_master' => 'opex'],
            ['kd_anggaran_master' => '5021200000', 'nm_anggaran_master' => 'Beban Perlengkapan Kantor', 'tipe_anggaran_master' => 'opex'],
            ['kd_anggaran_master' => '5081500000', 'nm_anggaran_master' => 'Beban Jasa Konsultan', 'tipe_anggaran_master' => 'opex'],
            ['kd_anggaran_master' => '5060700000', 'nm_anggaran_master' => 'Beban Sumber Daya Pihak Ketiga Peralatan', 'tipe_anggaran_master' => 'opex'],
            ['kd_anggaran_master' => '5900100000', 'nm_anggaran_master' => 'Beban Investasi', 'tipe_anggaran_master' => 'opex'],
        ];
        foreach ($masters as $m) {
            DB::table('budget_masters')->updateOrInsert(['kd_anggaran_master' => $m['kd_anggaran_master']], $m);
        }

        // 3. Seed CAPEX Budgets
        $capexs = [
            [
                'kd_anggaran_capex' => 'CAP-2440013',
                'kd_anggaran_master' => '2440013',
                'nm_anggaran_capex' => 'Penyiapan Infrastruktur IT PT Pelindo Multi Terminal',
                'thn_rkap_awal' => 2024,
                'thn_rkap_akhir' => 2026,
                'thn_anggaran' => 2024,
                'nilai_anggaran_kad' => 5500000000.00,
                'nilai_anggaran_rkap' => 5500000000.00,
                'nm_master' => 'Penyiapan Infrastruktur IT PT Pelindo Multi Terminal',
                'anggaran_tahunan' => json_encode([
                    ['tahun' => 2024, 'nilai' => 2000000000],
                    ['tahun' => 2025, 'nilai' => 2000000000],
                    ['tahun' => 2026, 'nilai' => 1500000000]
                ]),
                'history_anggaran' => json_encode([
                    ['id' => 'H1', 'tahun' => 2024, 'nilai_rkap' => 2000000000],
                    ['id' => 'H2', 'tahun' => 2025, 'nilai_rkap' => 2000000000],
                    ['id' => 'H3', 'tahun' => 2026, 'nilai_rkap' => 1500000000]
                ])
            ],
            [
                'kd_anggaran_capex' => 'CAP-2440015',
                'kd_anggaran_master' => '2440015',
                'nm_anggaran_capex' => 'Implementasi dan Standarisasi IT Infrastruktur',
                'thn_rkap_awal' => 2024,
                'thn_rkap_akhir' => 2024,
                'thn_anggaran' => 2024,
                'nilai_anggaran_kad' => 2500000000.00,
                'nilai_anggaran_rkap' => 2500000000.00,
                'nm_master' => 'Implementasi dan Standarisasi IT Infrastruktur',
                'anggaran_tahunan' => json_encode([
                    ['tahun' => 2024, 'nilai' => 2500000000]
                ]),
                'history_anggaran' => json_encode([
                    ['id' => 'H4', 'tahun' => 2024, 'nilai_rkap' => 2500000000]
                ])
            ],
            [
                'kd_anggaran_capex' => 'CAP-2540011',
                'kd_anggaran_master' => '2540011',
                'nm_anggaran_capex' => 'Transformasi dan Digitalisasi Alat Berat',
                'thn_rkap_awal' => 2025,
                'thn_rkap_akhir' => 2026,
                'thn_anggaran' => 2025,
                'nilai_anggaran_kad' => 5000000000.00,
                'nilai_anggaran_rkap' => 5000000000.00,
                'nm_master' => 'Transformasi dan Digitalisasi Alat Berat',
                'anggaran_tahunan' => json_encode([
                    ['tahun' => 2025, 'nilai' => 2500000000],
                    ['tahun' => 2026, 'nilai' => 2500000000]
                ]),
                'history_anggaran' => json_encode([
                    ['id' => 'H6', 'tahun' => 2025, 'nilai_rkap' => 2500000000],
                    ['id' => 'H7', 'tahun' => 2026, 'nilai_rkap' => 2500000000]
                ])
            ],
            [
                'kd_anggaran_capex' => 'CAP-2440014',
                'kd_anggaran_master' => '2440014',
                'nm_anggaran_capex' => 'Penyediaan Network di Branch SPMT',
                'thn_rkap_awal' => 2024,
                'thn_rkap_akhir' => 2024,
                'thn_anggaran' => 2024,
                'nilai_anggaran_kad' => 3200000000.00,
                'nilai_anggaran_rkap' => 3200000000.00,
                'nm_master' => 'Penyediaan Network di Branch SPMT',
                'anggaran_tahunan' => json_encode([
                    ['tahun' => 2024, 'nilai' => 3200000000]
                ]),
                'history_anggaran' => json_encode([])
            ],
            [
                'kd_anggaran_capex' => 'CAP-2440020',
                'kd_anggaran_master' => '2440020',
                'nm_anggaran_capex' => 'Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC)',
                'thn_rkap_awal' => 2024,
                'thn_rkap_akhir' => 2025,
                'thn_anggaran' => 2024,
                'nilai_anggaran_kad' => 1500000000.00,
                'nilai_anggaran_rkap' => 1500000000.00,
                'nm_master' => 'Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC)',
                'anggaran_tahunan' => json_encode([
                    ['tahun' => 2024, 'nilai' => 750000000],
                    ['tahun' => 2025, 'nilai' => 750000000]
                ]),
                'history_anggaran' => json_encode([])
            ],
            [
                'kd_anggaran_capex' => 'CAP-2540012',
                'kd_anggaran_master' => '2540012',
                'nm_anggaran_capex' => 'Pengembangan Sistem Manajemen Aset Pelindo',
                'thn_rkap_awal' => 2026,
                'thn_rkap_akhir' => 2026,
                'thn_anggaran' => 2026,
                'nilai_anggaran_kad' => 3500000000.00,
                'nilai_anggaran_rkap' => 3500000000.00,
                'nm_master' => 'Pengembangan Sistem Manajemen Aset Pelindo',
                'anggaran_tahunan' => json_encode([]),
                'history_anggaran' => json_encode([])
            ]
        ];
        foreach ($capexs as $c) {
            DB::table('budget_annual_capex')->insert($c);
        }

        // Reset auto increment for budget annual opex
        DB::statement("ALTER SEQUENCE budget_annual_opex_id_anggaran_tahunan_seq RESTART WITH 1");

        // 4. Seed OPEX Budgets
        $opexs = [
            [
                'kd_anggaran_master' => '5030905000',
                'thn_anggaran' => 2026,
                'nilai_anggaran_tahunan' => 800000000.00, // Total kad software & hardware combined
                'nm_anggaran' => 'Beban Pemeliharaan Software & Hardware',
                'nilai_anggaran' => 800000000.00,
                'realisasi_tahunan' => json_encode([])
            ],
            [
                'kd_anggaran_master' => '5021300000',
                'thn_anggaran' => 2026,
                'nilai_anggaran_tahunan' => 288000000.00,
                'nm_anggaran' => 'Beban Jaringan dan Koneksi Data',
                'nilai_anggaran' => 288000000.00,
                'realisasi_tahunan' => json_encode([])
            ],
            [
                'kd_anggaran_master' => '5021200000',
                'thn_anggaran' => 2026,
                'nilai_anggaran_tahunan' => 120000000.00,
                'nm_anggaran' => 'Beban Perlengkapan Kantor',
                'nilai_anggaran' => 120000000.00,
                'realisasi_tahunan' => json_encode([])
            ],
            [
                'kd_anggaran_master' => '5081500000',
                'thn_anggaran' => 2026,
                'nilai_anggaran_tahunan' => 800000000.00,
                'nm_anggaran' => 'Beban Jasa Konsultan',
                'nilai_anggaran' => 800000000.00,
                'realisasi_tahunan' => json_encode([])
            ],
            [
                'kd_anggaran_master' => '5060700000',
                'thn_anggaran' => 2026,
                'nilai_anggaran_tahunan' => 900000000.00,
                'nm_anggaran' => 'Beban Sumber Daya Pihak Ketiga Peralatan',
                'nilai_anggaran' => 900000000.00,
                'realisasi_tahunan' => json_encode([])
            ],
            [
                'kd_anggaran_master' => '5900100000',
                'thn_anggaran' => 2026,
                'nilai_anggaran_tahunan' => 300000000.00,
                'nm_anggaran' => 'Beban Investasi',
                'nilai_anggaran' => 300000000.00,
                'realisasi_tahunan' => json_encode([])
            ]
        ];
        foreach ($opexs as $o) {
            DB::table('budget_annual_opex')->insert($o);
        }

        // Reset auto increment for budget projects
        DB::statement("ALTER SEQUENCE budget_projects_id_pekerjaan_seq RESTART WITH 1");

        // 5. Seed CAPEX & OPEX Projects (Jobs)
        $projects = [
            // CAPEX Projects
            [
                'id_pekerjaan' => 1,
                'id_anggaran_tahunan' => 'CAP-2440013',
                'id_opex' => null,
                'jenis_anggaran' => 'capex',
                'nm_pekerjaan' => 'Pengadaan Server dan Network',
                'nilai_rab' => 2000000000.00,
                'nilai_kontrak' => 1950000000.00,
                'no_pr' => 'PR-2440013-01',
                'no_po' => 'PO-2440013-01',
                'no_kontrak' => 'SI.01/10/9/2/PPTI/TEKI/PLMT-24',
                'tgl_kontrak' => '2024-09-10',
                'durasi_kontrak' => 90,
                'no_sp3' => 'SP3-2440013-01',
                'tgl_sp3' => '2024-08-15',
                'tgl_bamk' => '2024-12-10',
                'keterangan' => 'Penyediaan server utama dan infrastruktur jaringan di kantor cabang.'
            ],
            [
                'id_pekerjaan' => 6,
                'id_anggaran_tahunan' => 'CAP-2440015',
                'id_opex' => null,
                'jenis_anggaran' => 'capex',
                'nm_pekerjaan' => 'Pekerjaan Implementasi CCTV',
                'nilai_rab' => 1000000000.00,
                'nilai_kontrak' => 900000000.00,
                'no_pr' => 'PR-2440015-01',
                'no_po' => 'PO-2440015-01',
                'no_kontrak' => 'SI.01/12/8/2/PPTI/TEKI/PLMT-24',
                'tgl_kontrak' => '2024-08-12',
                'durasi_kontrak' => 60,
                'no_sp3' => 'SP3-2440015-01',
                'tgl_sp3' => '2024-07-10',
                'tgl_bamk' => '2024-10-15',
                'keterangan' => 'Pemasangan IP CCTV di area gerbang masuk utama dan dermaga.'
            ],
            [
                'id_pekerjaan' => 11,
                'id_anggaran_tahunan' => 'CAP-2540011',
                'id_opex' => null,
                'jenis_anggaran' => 'capex',
                'nm_pekerjaan' => 'Penyediaan Alat Berat Excavator',
                'nilai_rab' => 2000000000.00,
                'nilai_kontrak' => 1850000000.00,
                'no_pr' => 'PR-2540011-01',
                'no_po' => 'PO-2540011-01',
                'no_kontrak' => 'SI.05/01/2/PPTI/PLMT-25',
                'tgl_kontrak' => '2025-01-05',
                'durasi_kontrak' => 120,
                'no_sp3' => 'SP3-2540011-01',
                'tgl_sp3' => '2024-12-01',
                'tgl_bamk' => '2025-05-01',
                'keterangan' => 'Pengadaan excavator heavy duty CAT 336 untuk kegiatan bongkar muat terminal.'
            ],
            // OPEX Projects
            [
                'id_pekerjaan' => 101,
                'id_anggaran_tahunan' => null,
                'id_opex' => 1, // Beban Pemeliharaan Software
                'jenis_anggaran' => 'opex',
                'nm_pekerjaan' => 'Pemeliharaan Lisensi Perangkat Lunak',
                'nilai_rab' => 50000000.00,
                'nilai_kontrak' => 40500000.00,
                'no_pr' => 'PR-OPX-001',
                'no_po' => 'PO-OPX-001',
                'no_kontrak' => 'OPX/SFT/2026/001',
                'tgl_kontrak' => '2026-01-10',
                'durasi_kontrak' => 365,
                'no_sp3' => 'SP3-OPX-001',
                'tgl_sp3' => '2025-12-15',
                'tgl_bamk' => '2026-01-01',
                'keterangan' => 'Perpanjangan lisensi Windows Server, Kaspersky Antivirus, Microsoft Office 365, dan Adobe CC.'
            ],
            [
                'id_pekerjaan' => 102,
                'id_anggaran_tahunan' => null,
                'id_opex' => 2, // Beban Jaringan
                'jenis_anggaran' => 'opex',
                'nm_pekerjaan' => 'Penyediaan Koneksi MPLS',
                'nilai_rab' => 30000000.00,
                'nilai_kontrak' => 24000000.00,
                'no_pr' => 'PR-OPX-002',
                'no_po' => 'PO-OPX-002',
                'no_kontrak' => 'OPX/NET/2026/001',
                'tgl_kontrak' => '2026-01-02',
                'durasi_kontrak' => 30,
                'no_sp3' => 'SP3-OPX-002',
                'tgl_sp3' => '2025-12-05',
                'tgl_bamk' => '2026-01-01',
                'keterangan' => 'Biaya bulanan link MPLS utama kantor cabang Belawan.'
            ],
            [
                'id_pekerjaan' => 104,
                'id_anggaran_tahunan' => null,
                'id_opex' => 4, // Beban Konsultan
                'jenis_anggaran' => 'opex',
                'nm_pekerjaan' => 'Penyusunan IT Masterplan',
                'nilai_rab' => 200000000.00,
                'nilai_kontrak' => 150000000.00,
                'no_pr' => 'PR-OPX-003',
                'no_po' => 'PO-OPX-003',
                'no_kontrak' => 'OPX/CON/2026/001',
                'tgl_kontrak' => '2026-02-15',
                'durasi_kontrak' => 180,
                'no_sp3' => 'SP3-OPX-003',
                'tgl_sp3' => '2026-01-20',
                'tgl_bamk' => '2026-08-15',
                'keterangan' => 'Konsultasi audit dan roadmap digitalisasi inventory asset.'
            ],
            [
                'id_pekerjaan' => 105,
                'id_anggaran_tahunan' => null,
                'id_opex' => 1, // Beban Pemeliharaan Hardware
                'jenis_anggaran' => 'opex',
                'nm_pekerjaan' => 'Perbaikan UPS Data Center',
                'nilai_rab' => 15000000.00,
                'nilai_kontrak' => 12500000.00,
                'no_pr' => 'PR-OPX-004',
                'no_po' => 'PO-OPX-004',
                'no_kontrak' => 'OPX/HW/2026/012',
                'tgl_kontrak' => '2026-02-05',
                'durasi_kontrak' => 14,
                'no_sp3' => 'SP3-OPX-004',
                'tgl_sp3' => '2026-01-25',
                'tgl_bamk' => '2026-02-19',
                'keterangan' => 'Penggantian modul baterai 12V 9Ah cadangan UPS server utama.'
            ]
        ];
        foreach ($projects as $p) {
            DB::table('budget_projects')->insert($p);
        }

        // 6. Seed Master Assets
        $assets = [
            // CAPEX Items
            [
                'asset_code' => 'SPMT-LPT-X1-001',
                'name' => 'Laptop Lenovo ThinkPad X1',
                'device_code' => 'LPT',
                'id_pekerjaan' => 1,
                'acquisition_value' => 24000000.00,
                'procurement_date' => '2024-10-15',
                'owner_id' => 1,
                'photo' => '/assets/img/laptop.png'
            ],
            [
                'asset_code' => 'SWT-25MLH-001',
                'name' => 'Switch Cisco Catalyst 9300L',
                'device_code' => 'SWT',
                'id_pekerjaan' => 1,
                'acquisition_value' => 45000000.00,
                'procurement_date' => '2025-05-15',
                'owner_id' => null,
                'photo' => '/assets/img/switch.png'
            ],
            [
                'asset_code' => 'CCTV-24BLW-001',
                'name' => 'CCTV Hikvision DS-2CD2143G2-I',
                'device_code' => 'CTV',
                'id_pekerjaan' => 6,
                'acquisition_value' => 6000000.00,
                'procurement_date' => '2024-08-15',
                'owner_id' => null,
                'photo' => '/assets/img/cctv.png'
            ],
            [
                'asset_code' => 'MAT-PMS-001',
                'name' => 'Jasa Pemasangan Perangkat / Kabel',
                'device_code' => 'MAT',
                'id_pekerjaan' => 6,
                'acquisition_value' => 15000000.00,
                'procurement_date' => '2024-08-20',
                'owner_id' => null,
                'photo' => '/assets/img/installation.png'
            ],
            [
                'asset_code' => 'ALAT-25DMI-001',
                'name' => 'Excavator CAT 336',
                'device_code' => 'AB',
                'id_pekerjaan' => 11,
                'acquisition_value' => 1200000000.00,
                'procurement_date' => '2025-01-20',
                'owner_id' => null,
                'photo' => '/assets/img/excavator.png'
            ],
            // OPEX Items
            [
                'asset_code' => 'SPMT-KPT-SFT-KASP-01',
                'name' => 'Lisensi Antivirus Kaspersky',
                'device_code' => 'SFT',
                'id_pekerjaan' => 101,
                'acquisition_value' => 8500000.00,
                'procurement_date' => '2026-02-10',
                'owner_id' => null,
                'photo' => '/assets/img/kaspersky.png'
            ],
            [
                'asset_code' => 'SPMT-KPT-SFT-O365-01',
                'name' => 'Pembayaran Lisensi Microsoft Office 365',
                'device_code' => 'SFT',
                'id_pekerjaan' => 101,
                'acquisition_value' => 15000000.00,
                'procurement_date' => '2026-01-15',
                'owner_id' => null,
                'photo' => '/assets/img/office.png'
            ],
            [
                'asset_code' => 'SPMT-KPT-SFT-ADOB-01',
                'name' => 'Langganan Adobe Creative Cloud Team',
                'device_code' => 'SFT',
                'id_pekerjaan' => 101,
                'acquisition_value' => 12500000.00,
                'procurement_date' => '2026-03-20',
                'owner_id' => null,
                'photo' => '/assets/img/adobe.png'
            ],
            [
                'asset_code' => 'SPMT-KPT-SFT-ZOOM-01',
                'name' => 'Lisensi Zoom Business (10 Host)',
                'device_code' => 'SFT',
                'id_pekerjaan' => 101,
                'acquisition_value' => 4500000.00,
                'procurement_date' => '2026-04-05',
                'owner_id' => null,
                'photo' => '/assets/img/zoom.png'
            ],
            [
                'asset_code' => 'NET-MPLS-001',
                'name' => 'Tagihan MPLS Januari 2026',
                'device_code' => 'RTR',
                'id_pekerjaan' => 102,
                'acquisition_value' => 24000000.00,
                'procurement_date' => '2026-01-05',
                'owner_id' => null,
                'photo' => '/assets/img/mpls.png'
            ],
            [
                'asset_code' => 'SRV-CON-001',
                'name' => 'Konsultan IT Masterplan Tahap 1',
                'device_code' => 'MAT',
                'id_pekerjaan' => 104,
                'acquisition_value' => 150000000.00,
                'procurement_date' => '2026-03-01',
                'owner_id' => null,
                'photo' => '/assets/img/masterplan.png'
            ],
            [
                'asset_code' => 'HW-UPS-001',
                'name' => 'Ganti Baterai UPS 10kVA',
                'device_code' => 'HDW',
                'id_pekerjaan' => 105,
                'acquisition_value' => 12500000.00,
                'procurement_date' => '2026-02-20',
                'owner_id' => null,
                'photo' => '/assets/img/ups_battery.png'
            ],
            [
                'asset_code' => 'MAT-MLH-001',
                'name' => 'Jasa Pemeliharaan / Maintenance',
                'device_code' => 'MAT',
                'id_pekerjaan' => 105,
                'acquisition_value' => 5000000.00,
                'procurement_date' => '2026-03-15',
                'owner_id' => null,
                'photo' => '/assets/img/services.png'
            ],
        ];
        foreach ($assets as $a) {
            DB::table('assets')->insert($a);
        }

        // 7. Seed Budget Items (Decoupled Specs for Budget Tracker)
        $budget_items = [
            // CAPEX Items
            ['id_pekerjaan' => 1, 'asset_code' => 'SPMT-LPT-X1-001', 'jumlah' => 2, 'keterangan' => 'Thinkpad X1 for IT managers'],
            ['id_pekerjaan' => 1, 'asset_code' => 'SWT-25MLH-001', 'jumlah' => 1, 'keterangan' => 'Cisco core switch'],
            ['id_pekerjaan' => 6, 'asset_code' => 'CCTV-24BLW-001', 'jumlah' => 2, 'keterangan' => 'Outdoor IP cameras'],
            ['id_pekerjaan' => 6, 'asset_code' => 'MAT-PMS-001', 'jumlah' => 1, 'keterangan' => 'Cabling & installation services'],
            ['id_pekerjaan' => 11, 'asset_code' => 'ALAT-25DMI-001', 'jumlah' => 1, 'keterangan' => 'Excavator unit'],
            // OPEX Items
            ['id_pekerjaan' => 101, 'asset_code' => 'SPMT-KPT-SFT-KASP-01', 'jumlah' => 1, 'keterangan' => 'Corporate antivirus'],
            ['id_pekerjaan' => 101, 'asset_code' => 'SPMT-KPT-SFT-O365-01', 'jumlah' => 1, 'keterangan' => 'Microsoft productivity suite'],
            ['id_pekerjaan' => 101, 'asset_code' => 'SPMT-KPT-SFT-ADOB-01', 'jumlah' => 1, 'keterangan' => 'Adobe licenses for design'],
            ['id_pekerjaan' => 101, 'asset_code' => 'SPMT-KPT-SFT-ZOOM-01', 'jumlah' => 1, 'keterangan' => 'Zoom for online meetings'],
            ['id_pekerjaan' => 102, 'asset_code' => 'NET-MPLS-001', 'jumlah' => 1, 'keterangan' => 'MPLS bandwidth subscription'],
            ['id_pekerjaan' => 104, 'asset_code' => 'SRV-CON-001', 'jumlah' => 1, 'keterangan' => 'Strategic IT roadmap advisory'],
            ['id_pekerjaan' => 105, 'asset_code' => 'HW-UPS-001', 'jumlah' => 1, 'keterangan' => '10kVA UPS battery replacement pack'],
            ['id_pekerjaan' => 105, 'asset_code' => 'MAT-MLH-001', 'jumlah' => 1, 'keterangan' => 'Maintenance and certification service'],
        ];
        foreach ($budget_items as $bi) {
            DB::table('budget_items')->insert($bi);
        }

        // 8. Seed physical inventory items (barang)
        $barangs = [
            ['asset_code' => 'SPMT-LPT-X1-001', 'serial_number' => 'SPMT-LPT-X1-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'SPMT-LPT-X1-001', 'serial_number' => 'SPMT-LPT-X1-002', 'subzona_code' => 'DMG'],
            ['asset_code' => 'SWT-25MLH-001', 'serial_number' => 'SWT-25MLH-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'CCTV-24BLW-001', 'serial_number' => 'SN-CCTV-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'CCTV-24BLW-001', 'serial_number' => 'SN-CCTV-002', 'subzona_code' => 'DMG'],
            ['asset_code' => 'MAT-PMS-001', 'serial_number' => 'MAT-PMS-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'ALAT-25DMI-001', 'serial_number' => 'SN-EXC-336-01', 'subzona_code' => 'DMG'],
            ['asset_code' => 'SPMT-KPT-SFT-KASP-01', 'serial_number' => 'SN-KASP-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'SPMT-KPT-SFT-O365-01', 'serial_number' => 'SN-O365-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'SPMT-KPT-SFT-ADOB-01', 'serial_number' => 'SN-ADOB-123', 'subzona_code' => 'DMG'],
            ['asset_code' => 'SPMT-KPT-SFT-ZOOM-01', 'serial_number' => 'SN-ZOOM-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'NET-MPLS-001', 'serial_number' => 'NET-MPLS-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'SRV-CON-001', 'serial_number' => 'SRV-CON-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'HW-UPS-001', 'serial_number' => 'SN-UPS-BATT-001', 'subzona_code' => 'DMG'],
            ['asset_code' => 'MAT-MLH-001', 'serial_number' => 'MAT-MLH-001', 'subzona_code' => 'DMG'],
        ];
        foreach ($barangs as $b) {
            DB::table('barang')->insert($b);
        }
    }
}
