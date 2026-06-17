<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel');
try {
    // Drop the foreign key first
    Illuminate\Support\Facades\DB::statement('ALTER TABLE asset_transactions DROP CONSTRAINT IF EXISTS fk_at_kd_barang');
    Illuminate\Support\Facades\DB::statement('ALTER TABLE asset_transactions DROP CONSTRAINT IF EXISTS fk_at_serial');

    // Rename the column
    Illuminate\Support\Facades\DB::statement('ALTER TABLE asset_transactions RENAME COLUMN serial_number TO kd_barang');

    // Add the foreign key back
    Illuminate\Support\Facades\DB::statement('ALTER TABLE asset_transactions ADD CONSTRAINT fk_at_kd_barang FOREIGN KEY (kd_barang) REFERENCES barang(kd_barang) ON UPDATE CASCADE');
    echo "Column and foreign key updated successfully.\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
