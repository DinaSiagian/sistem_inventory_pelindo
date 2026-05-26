<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$capex = DB::table('budget_annual_capex')->get();
foreach ($capex as $c) {
    $anggaran_tahunan = json_decode($c->anggaran_tahunan, true);
    $history_anggaran = json_decode($c->history_anggaran, true) ?? [];
    
    $new_anggaran = [];
    $new_history = [];
    
    // First, map existing history items
    $history_map = [];
    foreach ($history_anggaran as $h) {
        if (isset($h['tahun'])) {
            $history_map[$h['tahun']] = $h;
        }
    }

    if (is_array($anggaran_tahunan)) {
        foreach ($anggaran_tahunan as $i => $a) {
            $year = $a['tahun'] ?? $a['thn'] ?? null;
            $val = $a['nilai'] ?? $a['nilai_anggaran'] ?? null;
            
            if ($year && $val) {
                // Try to find matching history to keep the same ID
                $h_item = $history_map[$year] ?? null;
                $id = $h_item['id'] ?? 'H_' . $c->kd_anggaran_capex . '_' . $year;
                
                $new_anggaran[] = [
                    'id' => $id,
                    'thn_rkap_awal' => $c->thn_rkap_awal,
                    'thn_rkap_akhir' => $c->thn_rkap_akhir,
                    'nilai_kad' => (float) $c->nilai_anggaran_kad,
                    'thn' => (int) $year,
                    'nilai_anggaran' => (float) $val
                ];
                
                $new_history[] = [
                    'id' => $id,
                    'tahun' => (int) $year,
                    'nilai_rkap' => (float) $val
                ];
            }
        }
        
        DB::table('budget_annual_capex')
            ->where('kd_anggaran_capex', $c->kd_anggaran_capex)
            ->update([
                'anggaran_tahunan' => json_encode($new_anggaran),
                'history_anggaran' => json_encode($new_history)
            ]);
        echo "Updated {$c->kd_anggaran_capex}\n";
    }
}
echo "Done!\n";
