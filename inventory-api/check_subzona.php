<?php
require 'vendor/autoload.php';
require 'bootstrap/app.php';
$subzonas = DB::table('subzona')->get();
echo json_encode($subzonas);
