<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$req = Illuminate\Http\Request::create('/api/barang', 'GET');
$res = app()->make('App\Http\Controllers\BarangController')->index($req);
print_r($res->getContent());
