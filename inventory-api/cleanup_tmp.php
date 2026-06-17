<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel');
Illuminate\Support\Facades\DB::table('barang')->where('kd_barang', 'like', 'TMP-%')->delete();
echo "Cleanup done.\n";
