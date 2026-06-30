<?php
require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';

use Illuminate\Support\Facades\DB;

$zonas = DB::table('zonas')->get();

foreach ($zonas as $zona) {
    if (strpos($zona->zona_code, '-') !== false) {
        $parts = explode('-', $zona->zona_code, 2);
        $newCode = $parts[1]; // keep the part after the hyphen

        // Check if the new code already exists
        $exists = DB::table('zonas')->where('zona_code', $newCode)->exists();
        
        if (!$exists) {
            // Update the zona_code directly
            DB::table('zonas')
                ->where('zona_code', $zona->zona_code)
                ->update(['zona_code' => $newCode]);
                
            // Update related subzona
            DB::table('subzona')
                ->where('zona_code', $zona->zona_code)
                ->update(['zona_code' => $newCode]);
                
            echo "Updated zona {$zona->zona_code} to {$newCode}\n";
        } else {
            echo "Cannot update {$zona->zona_code} to {$newCode} because {$newCode} already exists!\n";
        }
    }
}

$subzonas = DB::table('subzona')->get();

foreach ($subzonas as $sz) {
    if (strpos($sz->subzona_code, '-') !== false) {
        $parts = explode('-', $sz->subzona_code, 2);
        // Wait, for subzonas, what was the format? Sometimes it was branch-subzona?
        // Actually, the canonical subzonas output from previous script:
        // JMB-COY-BLA -> BLOK A
        // If it has multiple hyphens, we might want the last part? Or maybe just remove the branch part?
        // Let's just remove the first part before the first hyphen if the first part matches a branch code.
        // Wait, for subzonas, earlier output was: JMB-COY-BLA. If zona is COY, the subzona code could be just BLA!
        
        // Let's check all subzonas that have the current zona_code as prefix, or something else.
        $branches = DB::table('branches')->pluck('branch_code')->toArray();
        $firstPart = $parts[0];
        
        if (in_array($firstPart, $branches)) {
            // If the first part is a branch code, strip it!
            $newSubzonaCode = $parts[1];
            
            // if it still has a hyphen, like COY-BLA, maybe strip COY too?
            // Actually let's just make sure it's short.
            $exists = DB::table('subzona')->where('subzona_code', $newSubzonaCode)->exists();
            if (!$exists) {
                DB::table('subzona')->where('subzona_code', $sz->subzona_code)->update(['subzona_code' => $newSubzonaCode]);
                DB::table('barang')->where('subzona_code', $sz->subzona_code)->update(['subzona_code' => $newSubzonaCode]);
                echo "Updated subzona {$sz->subzona_code} to {$newSubzonaCode}\n";
            }
        } else {
            // maybe it is ZONA-SUBZONA? e.g. COY-BLA
            $zonasCodes = DB::table('zonas')->pluck('zona_code')->toArray();
            if (in_array($firstPart, $zonasCodes)) {
                $newSubzonaCode = $parts[1];
                $exists = DB::table('subzona')->where('subzona_code', $newSubzonaCode)->exists();
                if (!$exists) {
                    DB::table('subzona')->where('subzona_code', $sz->subzona_code)->update(['subzona_code' => $newSubzonaCode]);
                    DB::table('barang')->where('subzona_code', $sz->subzona_code)->update(['subzona_code' => $newSubzonaCode]);
                    echo "Updated subzona {$sz->subzona_code} to {$newSubzonaCode}\n";
                }
            }
        }
    }
}
echo "Done strip_prefix.\n";
