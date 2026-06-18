<?php
require 'vendor/autoload.php';
require 'bootstrap/app.php';
$columns = DB::select("SELECT column_name, is_nullable FROM information_schema.columns WHERE table_name = 'barang'");
echo json_encode($columns);
