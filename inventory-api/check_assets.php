<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$assets = DB::table('assets')->orderBy('created_at', 'desc')->take(10)->get();
print_r($assets);

$barang = DB::table('barang')->orderBy('created_at', 'desc')->take(10)->get();
print_r($barang);
