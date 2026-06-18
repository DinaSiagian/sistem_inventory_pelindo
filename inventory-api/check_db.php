<?php require 'vendor/autoload.php'; require 'bootstrap/app.php'; echo json_encode(DB::table('budget_annual_capex')->limit(1)->get());
