<?php
use Illuminate\Support\Facades\DB;

DB::beginTransaction();
try {
    $assets = DB::table('assets')->get();
    $count = 0;
    foreach($assets as $asset) {
        if (preg_match('/^([A-Z]+)(\d{2})-(\d{3})$/', $asset->asset_code, $matches)) {
            $cat = $matches[1];
            $catUrut = intval($matches[2]);
            $newId = $cat . '-' . str_pad($catUrut, 3, '0', STR_PAD_LEFT);
            
            // Check if newId already exists (to avoid conflict)
            if (DB::table('assets')->where('asset_code', $newId)->exists()) {
                continue; // skip or handle?
            }
            
            // Update related tables first (if no CASCADE)
            DB::table('asset_specifications')->where('asset_code', $asset->asset_code)->update(['asset_code' => $newId]);
            DB::table('barang')->where('asset_code', $asset->asset_code)->update(['asset_code' => $newId]);
            DB::table('budget_items')->where('asset_code', $asset->asset_code)->update(['asset_code' => $newId]);
            
            // Update the main asset record
            DB::table('assets')->where('asset_code', $asset->asset_code)->update(['asset_code' => $newId]);
            $count++;
        }
    }
    DB::commit();
    echo "Successfully updated $count assets.\n";
} catch (\Exception $e) {
    DB::rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
