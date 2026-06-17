<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel');
try {
    Illuminate\Support\Facades\DB::statement('ALTER TABLE asset_transactions DROP CONSTRAINT IF EXISTS fk_at_serial');
    Illuminate\Support\Facades\DB::statement('ALTER TABLE asset_transactions ADD CONSTRAINT fk_at_kd_barang FOREIGN KEY (serial_number) REFERENCES barang(kd_barang) ON UPDATE CASCADE');
    echo "Foreign key updated successfully.\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
