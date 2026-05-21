<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
print_r(DB::table('branches')->select('branch_code', 'name')->get()->toArray());
print_r(DB::table('zonas')->select('zona_code', 'name', 'branch_code')->get()->toArray());
print_r(DB::table('subzona')->select('subzona_code', 'name', 'zona_code')->get()->toArray());
