<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterDataSeeder extends Seeder
{
    public function run()
    {
        // 1. Roles
        DB::table('roles')->insert([
            ['role_code' => 'admin', 'name' => 'Administrator', 'is_active' => true],
            ['role_code' => 'user',  'name' => 'User / Pegawai', 'is_active' => true],
        ]);

        // 2. Entities
        DB::table('entities')->insert([
            ['entity_code' => 'SPMT', 'name' => 'Pelindo Multi Terminal', 'is_active' => true],
            ['entity_code' => 'PTP',  'name' => 'PT Pelabuhan Indonesia', 'is_active' => true],
            ['entity_code' => 'IKT',  'name' => 'Indonesia Kendaraan Terminal', 'is_active' => true],
        ]);

        // 3. Branches
        DB::table('branches')->insert([
            ['branch_code' => 'BLW', 'entity_code' => 'SPMT', 'name' => 'Belawan', 'is_active' => true],
            ['branch_code' => 'DMI', 'entity_code' => 'SPMT', 'name' => 'Dumai',   'is_active' => true],
            ['branch_code' => 'GRK', 'entity_code' => 'SPMT', 'name' => 'Gresik',  'is_active' => true],
        ]);

        // 4. Divisions (Sesuai CSV: IT-SYS & OPS di Belawan)
        DB::table('divisions')->insert([
            ['division_code' => 'IT-SYS', 'branch_code' => 'BLW', 'name' => 'IT & Sistem',   'is_active' => true],
            ['division_code' => 'OPS',    'branch_code' => 'BLW', 'name' => 'Operasional',   'is_active' => true],
            ['division_code' => 'FIN',    'branch_code' => 'BLW', 'name' => 'Keuangan',      'is_active' => true],
        ]);
    }
}