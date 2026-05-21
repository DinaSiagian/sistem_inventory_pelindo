<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
try {
    print_r(app()->make('App\Http\Controllers\TransactionController')->index()->getContent());
} catch (\Throwable $e) {
    echo $e->getMessage();
}
