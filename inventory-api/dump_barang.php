<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
print_r(Illuminate\Support\Facades\DB::table('barang')->select('serial_number', 'subzona_code')->get()->toArray());
