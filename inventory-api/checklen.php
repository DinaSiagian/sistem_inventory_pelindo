<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$entities = \Illuminate\Support\Facades\DB::table('entities')->get();
foreach ($entities as $e) {
    echo "'" . $e->entity_code . "' (length: " . strlen($e->entity_code) . ")\n";
}
