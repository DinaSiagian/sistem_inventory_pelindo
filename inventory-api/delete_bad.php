<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
Illuminate\Support\Facades\DB::table('subzona')->where('subzona_code', 'LIKE', '%-%')->delete();
Illuminate\Support\Facades\DB::table('zonas')->where('zona_code', 'LIKE', '%-%')->delete();
echo 'Deleted bad codes!';
