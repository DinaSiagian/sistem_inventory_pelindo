<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

$zonas = DB::table('zonas')->get();
$subzonas = DB::table('subzona')->get();
echo json_encode(['zonas' => $zonas, 'subzonas' => $subzonas], JSON_PRETTY_PRINT);
