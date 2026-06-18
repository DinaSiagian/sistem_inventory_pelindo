<?php
require 'vendor/autoload.php';
require 'bootstrap/app.php';
$subzona = DB::table('subzona')->where('subzona_code', 'LIKE', '%TES%')->first();
echo json_encode($subzona);
