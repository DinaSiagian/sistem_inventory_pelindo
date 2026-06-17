<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel');
$schema = Illuminate\Support\Facades\DB::select("SELECT conname, pg_get_constraintdef(c.oid) FROM pg_constraint c JOIN pg_namespace n ON n.oid = c.connamespace WHERE contype = 'f' AND conname = 'fk_at_serial'");
print_r($schema);
