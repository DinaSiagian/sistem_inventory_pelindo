<?php
require 'vendor/autoload.php';
require 'bootstrap/app.php';
$data = DB::table('budget_annual_capex')->get(['kd_anggaran_capex', 'history_anggaran', 'anggaran_tahunan']);
echo json_encode($data);
