<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

Schema::table('barang', function (Blueprint $table) {
    if (!Schema::hasColumn('barang', 'entitas')) {
        $table->string('entitas')->nullable();
    }
    if (!Schema::hasColumn('barang', 'branch')) {
        $table->string('branch')->nullable();
    }
    if (!Schema::hasColumn('barang', 'zona')) {
        $table->string('zona')->nullable();
    }
});
echo "Columns added successfully!\n";
