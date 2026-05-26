<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
print_r(DB::table('users')->select('id', 'name', 'username', 'email', 'role_code')->get()->toArray());
$rows2 = DB::table('barang')->select('serial_number', 'asset_code', 'id_pekerjaan')->limit(10)->get()->toArray();
print_r($rows2);

echo "\n=== budget_projects (id_pekerjaan, nm_pekerjaan) ===\n";
$rows3 = DB::table('budget_projects')->select('id_pekerjaan', 'nm_pekerjaan', 'jenis_anggaran', 'no_pr')->limit(5)->get()->toArray();
print_r($rows3);

echo "\n=== assets JOIN budget_projects ===\n";
$rows4 = DB::table('assets AS a')
    ->leftJoin('budget_projects AS bp', 'a.id_pekerjaan', '=', 'bp.id_pekerjaan')
    ->select('a.asset_code', 'a.name', 'a.id_pekerjaan', 'bp.nm_pekerjaan', 'bp.jenis_anggaran')
    ->limit(10)->get()->toArray();
print_r($rows4);
