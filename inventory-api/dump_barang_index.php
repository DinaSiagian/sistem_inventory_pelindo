<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel');
$schema = Illuminate\Support\Facades\DB::select("
    SELECT
        a.attname,
        i.indisprimary,
        i.indisunique
    FROM   pg_index i
    JOIN   pg_attribute a ON a.attrelid = i.indrelid
                         AND a.attnum = ANY(i.indkey)
    WHERE  i.indrelid = 'barang'::regclass
");
print_r($schema);
