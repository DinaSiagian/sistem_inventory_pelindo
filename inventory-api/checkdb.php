<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$entities = \Illuminate\Support\Facades\DB::table('entities')->get();
$branches = \Illuminate\Support\Facades\DB::table('branches')->get();

echo "ENTITIES:\n";
echo json_encode($entities, JSON_PRETTY_PRINT) . "\n";

echo "BRANCHES:\n";
echo json_encode($branches, JSON_PRETTY_PRINT) . "\n";
