<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel');
$barang = Illuminate\Support\Facades\DB::table('barang')->get();
echo json_encode($barang, JSON_PRETTY_PRINT);
