<?php
require __DIR__."/../vendor/autoload.php";
$app = require_once __DIR__."/../bootstrap/app.php";
echo json_encode(Illuminate\Support\Facades\DB::table('device')->get());
