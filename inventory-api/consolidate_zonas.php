<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    DB::beginTransaction();

    // 1. ZONAS
    $zonas = DB::table('zonas')->get();
    $uniqueZonas = [];
    $zonaMapping = []; // old_code => new_code
    
    foreach ($zonas as $z) {
        $name = strtoupper(trim($z->name));
        if (!isset($uniqueZonas[$name])) {
            $uniqueZonas[$name] = $z;
            $zonaMapping[$z->zona_code] = $z->zona_code;
        } else {
            $masterCode = $uniqueZonas[$name]->zona_code;
            $zonaMapping[$z->zona_code] = $masterCode;
        }
    }

    // Update Subzona's zona_code
    foreach ($zonaMapping as $old => $new) {
        if ($old !== $new) {
            DB::table('subzona')->where('zona_code', $old)->update(['zona_code' => $new]);
        }
    }

    // Update Barang's zona_code if it exists in barang table
    if (DB::getSchemaBuilder()->hasColumn('barang', 'zona_code')) {
        foreach ($zonaMapping as $old => $new) {
            if ($old !== $new) {
                DB::table('barang')->where('zona_code', $old)->update(['zona_code' => $new]);
            }
        }
    }

    // Delete duplicate zonas
    foreach ($zonaMapping as $old => $new) {
        if ($old !== $new) {
            DB::table('zonas')->where('zona_code', $old)->delete();
        }
    }

    // 2. SUBZONAS
    $subzonas = DB::table('subzona')->get();
    $uniqueSubzonas = []; // "zona_code|name" => master_subzona_code
    $subzonaMapping = []; // old_code => new_code
    
    foreach ($subzonas as $s) {
        $key = $s->zona_code . '|' . strtoupper(trim($s->name));
        if (!isset($uniqueSubzonas[$key])) {
            $uniqueSubzonas[$key] = $s->subzona_code;
            $subzonaMapping[$s->subzona_code] = $s->subzona_code;
        } else {
            $masterCode = $uniqueSubzonas[$key];
            $subzonaMapping[$s->subzona_code] = $masterCode;
        }
    }

    // Update Barang's subzona_code
    foreach ($subzonaMapping as $old => $new) {
        if ($old !== $new) {
            DB::table('barang')->where('subzona_code', $old)->update(['subzona_code' => $new]);
        }
    }

    // Delete duplicate subzonas
    foreach ($subzonaMapping as $old => $new) {
        if ($old !== $new) {
            DB::table('subzona')->where('subzona_code', $old)->delete();
        }
    }

    DB::commit();
    echo "Consolidation successful!\n";

} catch (\Exception $e) {
    DB::rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
