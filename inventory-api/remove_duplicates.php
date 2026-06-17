<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

DB::beginTransaction();

try {
    echo "Starting Zona Deduplication...\n";
    
    // 1. Deduplicate Zonas by name
    $zonas = DB::table('zonas')->get();
    $zonaGroups = [];
    foreach ($zonas as $z) {
        $name = strtoupper(trim($z->name));
        if (!isset($zonaGroups[$name])) {
            $zonaGroups[$name] = [];
        }
        $zonaGroups[$name][] = $z;
    }

    $deletedZonas = 0;
    foreach ($zonaGroups as $name => $group) {
        if (count($group) > 1) {
            $primary = $group[0];
            echo "Merging Zonas for '$name'. Primary: {$primary->zona_code}\n";
            
            for ($i = 1; $i < count($group); $i++) {
                $duplicate = $group[$i];
                echo "  Moving subzonas from {$duplicate->zona_code} to {$primary->zona_code}\n";
                // Move subzonas to primary zona
                DB::table('subzona')
                    ->where('zona_code', $duplicate->zona_code)
                    ->update(['zona_code' => $primary->zona_code]);
                
                // Delete duplicate zona
                DB::table('zonas')->where('zona_code', $duplicate->zona_code)->delete();
                $deletedZonas++;
            }
        }
    }

    echo "Deleted $deletedZonas duplicate Zonas.\n\n";
    echo "Starting Subzona Deduplication...\n";

    // 2. Deduplicate Subzonas by zona_code + name
    $subzonas = DB::table('subzona')->get();
    $subzonaGroups = [];
    foreach ($subzonas as $s) {
        $key = $s->zona_code . '|' . strtoupper(trim($s->name));
        if (!isset($subzonaGroups[$key])) {
            $subzonaGroups[$key] = [];
        }
        $subzonaGroups[$key][] = $s;
    }

    $deletedSubzonas = 0;
    $updatedBarang = 0;
    foreach ($subzonaGroups as $key => $group) {
        if (count($group) > 1) {
            $primary = $group[0];
            echo "Merging Subzonas for '$key'. Primary: {$primary->subzona_code}\n";
            
            for ($i = 1; $i < count($group); $i++) {
                $duplicate = $group[$i];
                
                // Update barang records to point to primary subzona
                $affected = DB::table('barang')
                    ->where('subzona_code', $duplicate->subzona_code)
                    ->update(['subzona_code' => $primary->subzona_code]);
                
                if ($affected > 0) {
                    echo "  Moved $affected barang items from {$duplicate->subzona_code} to {$primary->subzona_code}\n";
                    $updatedBarang += $affected;
                }
                
                // Delete duplicate subzona
                DB::table('subzona')->where('subzona_code', $duplicate->subzona_code)->delete();
                $deletedSubzonas++;
            }
        }
    }

    echo "Deleted $deletedSubzonas duplicate Subzonas. Updated $updatedBarang barang records.\n";

    DB::commit();
    echo "\nSuccessfully completed deduplication.\n";

} catch (\Exception $e) {
    DB::rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
