<?php
require __DIR__."/../vendor/autoload.php";
$app = require_once __DIR__."/../bootstrap/app.php";
Illuminate\Support\Facades\DB::statement("ALTER TABLE device ADD COLUMN branch_code VARCHAR(100) NULL");
echo "Done";
