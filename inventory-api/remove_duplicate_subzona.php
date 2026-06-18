<?php
require 'vendor/autoload.php';
require 'bootstrap/app.php';
use Illuminate\Support\Facades\DB;

$subzonas = DB::table('subzona')->orderBy('created_at', 'asc')->get();
$seenNames = [];
$duplicatesDeleted = 0;
$reassignedBarang = 0;

foreach ($subzonas as $sz) {
    $name = trim(strtolower($sz->name));
    
    // We only consider exact name matches as duplicates.
    if (!isset($seenNames[$name])) {
        // First time seeing this name, keep it.
        $seenNames[$name] = $sz->subzona_code;
    } else {
        // It's a duplicate. Reassign its barang items to the original one.
        $keptCode = $seenNames[$name];
        $duplicateCode = $sz->subzona_code;
        
        // Reassign
        $updated = DB::table('barang')->where('subzona_code', $duplicateCode)->update(['subzona_code' => $keptCode]);
        $reassignedBarang += $updated;
        
        // Delete the duplicate
        DB::table('subzona')->where('subzona_code', $duplicateCode)->delete();
        $duplicatesDeleted++;
    }
}

echo "Deleted $duplicatesDeleted duplicate subzonas.\n";
echo "Reassigned $reassignedBarang barang items.\n";
