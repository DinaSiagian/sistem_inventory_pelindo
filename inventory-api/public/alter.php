<?php
require __DIR__."/../vendor/autoload.php";
$app = require_once __DIR__."/../bootstrap/app.php";

try {
    Illuminate\Support\Facades\DB::statement("ALTER TABLE assets ADD COLUMN deleted_at TIMESTAMP NULL");
    echo "Kolom deleted_at berhasil ditambahkan ke tabel assets.\n";
} catch (\Exception $e) {
    echo "assets: " . $e->getMessage() . "\n";
}

try {
    Illuminate\Support\Facades\DB::statement("ALTER TABLE barang ADD COLUMN deleted_at TIMESTAMP NULL");
    echo "Kolom deleted_at berhasil ditambahkan ke tabel barang.\n";
} catch (\Exception $e) {
    echo "barang: " . $e->getMessage() . "\n";
}

echo "Proses selesai.\n";
