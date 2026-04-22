<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';

use Illuminate\Support\Facades\Schema;

$exists = Schema::hasColumn('users', 'is_active');
echo $exists ? "COLUMN EXISTS" : "COLUMN MISSING";
