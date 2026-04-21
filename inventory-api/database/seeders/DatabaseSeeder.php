<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Entities
        DB::table('entities')->insert([
            ['entity_code' => 'SPMT', 'name' => 'Pelindo Multi Terminal'],
            ['entity_code' => 'PTP', 'name' => 'PT Pelabuhan Indonesia'],
        ]);

        // Branches
        DB::table('branches')->insert([
            ['branch_code' => 'BLW', 'entity_code' => 'SPMT', 'name' => 'Belawan'],
            ['branch_code' => 'DMI', 'entity_code' => 'SPMT', 'name' => 'Dumai'],
        ]);

        // Divisions
        DB::table('divisions')->insert([
            ['division_code' => 'IT-SYS', 'branch_code' => 'BLW', 'name' => 'IT & Sistem'],
            ['division_code' => 'OPS', 'branch_code' => 'BLW', 'name' => 'Operasional'],
        ]);

        // Roles
        DB::table('roles')->insert([
            ['role_code' => 'admin', 'name' => 'Administrator', 'is_active' => true],
            ['role_code' => 'user', 'name' => 'User', 'is_active' => true],
        ]);

        // Users (Password: admin123 & user123)
        DB::table('users')->insert([
            [
                'name' => 'Joy Silalahi',
                'username' => 'joy.silalahi',
                'email' => 'joy@pelindo.co.id',
                'password' => Hash::make('admin123'),
                'phone' => '081234567890',
                'nip' => '199001010001',
                'role_code' => 'admin',
                'entity_code' => 'SPMT',
                'branches_code' => 'BLW',
                'division_code' => 'IT-SYS',
                'is_active' => true,
            ],
            [
                'name' => 'Budi Santoso',
                'username' => 'budi.santoso',
                'email' => 'budi@pelindo.co.id',
                'password' => Hash::make('user123'),
                'phone' => '082345678901',
                'nip' => '199205152002',
                'role_code' => 'user',
                'entity_code' => 'SPMT',
                'branches_code' => 'BLW',
                'division_code' => 'OPS',
                'is_active' => true,
            ],
        ]);
    }
}