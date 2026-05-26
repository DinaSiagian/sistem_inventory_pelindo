<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\BudgetAnnualCapex;
use Illuminate\Support\Facades\DB;

try {
    $item = BudgetAnnualCapex::create([
        'kd_anggaran_capex'   => 'CAPEX-TEST1',
        'kd_anggaran_master'  => '5900100000',
        'nm_anggaran_capex'   => 'Test',
        'thn_rkap_awal'       => 2024,
        'thn_rkap_akhir'      => 2024,
        'thn_anggaran'        => 2024,
        'nilai_anggaran_kad'  => 1000,
        'nilai_anggaran_rkap' => 500,
        'nm_master'           => 'Beban Investasi',
        'anggaran_tahunan'    => [],
        'history_anggaran'    => [],
        'pekerjaan'           => [],
        'assets_json'         => [],
    ]);
    print_r($item->toArray());
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
