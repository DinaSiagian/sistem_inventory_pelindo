<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

if (!Schema::hasColumn('users', 'recovery_code')) {
    Schema::table('users', function (Blueprint $table) {
        $table->string('recovery_code')->nullable();
    });
    echo "Column recovery_code added.\n";
} else {
    echo "Column already exists.\n";
}
