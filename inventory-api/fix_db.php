<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

DB::table('device')->where('device_code', 'CTV')->update(['device_code' => 'CCTV']);
DB::table('device')->where('device_code', 'HDW')->update(['device_code' => 'HW']);

DB::table('assets')->where('device_code', 'CTV')->update(['device_code' => 'CCTV']);
DB::table('assets')->where('device_code', 'HDW')->update(['device_code' => 'HW']);

// Hapus tes yang menggunakan CTV
DB::table('assets')->where('asset_code', 'like', 'CTV0%')->delete();
DB::table('assets')->where('asset_code', 'like', 'CTV-%')->delete();

echo "Database updated successfully!\n";
