<?php

require __DIR__.'/vendor/autoload.php';

$app = require __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    DB::statement('ALTER TABLE zonas ALTER COLUMN branch_code DROP NOT NULL;');
    echo "Successfully removed NOT NULL from zonas.branch_code\n";
} catch (\Exception $e) {
    echo "Error 1: " . $e->getMessage() . "\n";
}

try {
    DB::statement('ALTER TABLE subzona ALTER COLUMN zona_code DROP NOT NULL;');
    echo "Successfully removed NOT NULL from subzona.zona_code\n";
} catch (\Exception $e) {
    echo "Error 2: " . $e->getMessage() . "\n";
}

?>
