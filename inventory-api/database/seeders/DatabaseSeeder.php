<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Entities
        $entities = [
            ['entity_code' => 'SPMT', 'name' => 'Pelindo Multi Terminal', 'is_active' => true],
            ['entity_code' => 'PTP',  'name' => 'PT Pelabuhan Indonesia', 'is_active' => true],
            ['entity_code' => 'IKT',  'name' => 'Indonesia Kendaraan Terminal', 'is_active' => true],
        ];
        foreach ($entities as $e) {
            DB::table('entities')->updateOrInsert(['entity_code' => $e['entity_code']], $e);
        }

        // 2. Branches
        $branches = [
            ['branch_code' => 'BLW', 'entity_code' => 'SPMT', 'name' => 'Belawan', 'is_active' => true],
            ['branch_code' => 'GRK', 'entity_code' => 'SPMT', 'name' => 'Gresik', 'is_active' => true],
            ['branch_code' => 'LBR', 'entity_code' => 'SPMT', 'name' => 'Lembar Badas', 'is_active' => true],
            ['branch_code' => 'TJI', 'entity_code' => 'SPMT', 'name' => 'Tanjung Intan', 'is_active' => true],
            ['branch_code' => 'DMI', 'entity_code' => 'SPMT', 'name' => 'Dumai',   'is_active' => true],
            ['branch_code' => 'SBG', 'entity_code' => 'SPMT', 'name' => 'Sibolga', 'is_active' => true],
            ['branch_code' => 'MLH', 'entity_code' => 'SPMT', 'name' => 'Malahayati', 'is_active' => true],
            ['branch_code' => 'LHK', 'entity_code' => 'SPMT', 'name' => 'Lhokseumawe', 'is_active' => true],
            ['branch_code' => 'TJE', 'entity_code' => 'SPMT', 'name' => 'Tanjung Emas', 'is_active' => true],
            ['branch_code' => 'BLP', 'entity_code' => 'SPMT', 'name' => 'Balikpapan', 'is_active' => true],
            ['branch_code' => 'MKS', 'entity_code' => 'SPMT', 'name' => 'Makassar', 'is_active' => true],
            ['branch_code' => 'BJM', 'entity_code' => 'SPMT', 'name' => 'Trisakti', 'is_active' => true],
            
            ['branch_code' => 'BTN', 'entity_code' => 'PTP', 'name' => 'Banten', 'is_active' => true],
            ['branch_code' => 'TJP', 'entity_code' => 'PTP', 'name' => 'Tanjung Priok', 'is_active' => true],
            ['branch_code' => 'TBR', 'entity_code' => 'PTP', 'name' => 'Teluk Bayur', 'is_active' => true],
            ['branch_code' => 'PLB', 'entity_code' => 'PTP', 'name' => 'Palembang', 'is_active' => true],
            ['branch_code' => 'JMB', 'entity_code' => 'PTP', 'name' => 'Jambi', 'is_active' => true],
            
            ['branch_code' => 'JKT', 'entity_code' => 'IKT', 'name' => 'Jakarta', 'is_active' => true],
        ];
        foreach ($branches as $b) {
            DB::table('branches')->updateOrInsert(['branch_code' => $b['branch_code']], $b);
        }

        // 3. Zonas
        $zonas = [
            ['zona_code' => 'GDG', 'branch_code' => 'BLW', 'name' => 'Gedung'],
            ['zona_code' => 'LPG', 'branch_code' => 'BLW', 'name' => 'Lapangan'],
            ['zona_code' => 'DTC', 'branch_code' => 'BLW', 'name' => 'Data Center'],
            ['zona_code' => 'GDN', 'branch_code' => 'BLW', 'name' => 'Gudang'],
        ];
        foreach ($zonas as $z) {
            DB::table('zonas')->updateOrInsert(['zona_code' => $z['zona_code']], $z);
        }

        // 4. Subzonas
        $subzonas = [
            // Original
            ['subzona_code' => 'DMG', 'zona_code' => 'GDG', 'name' => 'Dermaga'],
            ['subzona_code' => 'PKR', 'zona_code' => 'GDG', 'name' => 'Parkir'],
            ['subzona_code' => 'JLN', 'zona_code' => 'GDG', 'name' => 'Jalan'],
            ['subzona_code' => 'TPK', 'zona_code' => 'GDG', 'name' => 'Taman'],
            
            // New ones to match LOCATION_MAP exactly but keeping the standard format
            ['subzona_code' => 'LT1', 'zona_code' => 'GDG', 'name' => 'Lantai 1'],
            ['subzona_code' => 'LT2', 'zona_code' => 'GDG', 'name' => 'Lantai 2'],
            ['subzona_code' => 'SRV', 'zona_code' => 'DTC', 'name' => 'Server Room'],
            
            ['subzona_code' => 'DMU', 'zona_code' => 'LPG', 'name' => 'Dermaga Utama'],
            ['subzona_code' => 'GDL', 'zona_code' => 'LPG', 'name' => 'Gudang Logistik'],
            ['subzona_code' => 'KCB', 'zona_code' => 'GDG', 'name' => 'Kantor Cabang'],
            ['subzona_code' => 'RPT', 'zona_code' => 'GDG', 'name' => 'Ruang Rapat'],
            
            ['subzona_code' => 'KDM', 'zona_code' => 'GDG', 'name' => 'Kantor Dumai'],
            ['subzona_code' => 'PKA', 'zona_code' => 'LPG', 'name' => 'Parkir Area'],
            
            ['subzona_code' => 'KLH', 'zona_code' => 'GDG', 'name' => 'Kantor LHK'],
            ['subzona_code' => 'DMM', 'zona_code' => 'LPG', 'name' => 'Dermaga Malahayati'],
            ['subzona_code' => 'OFC', 'zona_code' => 'GDG', 'name' => 'Office'],
        ];
        foreach ($subzonas as $sz) {
            DB::table('subzona')->updateOrInsert(['subzona_code' => $sz['subzona_code']], $sz);
        }

        // 5. Divisions
        DB::table('divisions')->updateOrInsert(
            ['division_code' => 'IT-SYS'],
            ['branch_code' => 'BLW', 'name' => 'IT & Sistem', 'is_active' => true]
        );
        DB::table('divisions')->updateOrInsert(
            ['division_code' => 'OPS'],
            ['branch_code' => 'BLW', 'name' => 'Operasional', 'is_active' => true]
        );

        // 6. Roles
        DB::table('roles')->updateOrInsert(
            ['role_code' => 'admin'],
            ['name' => 'Administrator', 'is_active' => true]
        );
        DB::table('roles')->updateOrInsert(
            ['role_code' => 'user'],
            ['name' => 'User', 'is_active' => true]
        );

        // 7. Users
        DB::table('users')->updateOrInsert(
            ['username' => 'joy.silalahi'],
            [
                'name' => 'Joy Silalahi',
                'email' => 'joy@pelindo.co.id',
                'password' => Hash::make('admin123'),
                'phone' => '081234567890',
                'nip' => '199001010001',
                'role_code' => 'admin',
                'entity_code' => 'SPMT',
                'branches_code' => 'BLW',
                'division_code' => 'IT-SYS',
                'is_active' => true,
            ]
        );
        DB::table('users')->updateOrInsert(
            ['username' => 'budi.santoso'],
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@pelindo.co.id',
                'password' => Hash::make('user123'),
                'phone' => '082345678901',
                'nip' => '199205152002',
                'role_code' => 'user',
                'entity_code' => 'SPMT',
                'branches_code' => 'BLW',
                'division_code' => 'OPS',
                'is_active' => true,
            ]
        );
    }
}