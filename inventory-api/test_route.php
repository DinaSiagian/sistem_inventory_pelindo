<?php
require 'vendor/autoload.php';
require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$request = Illuminate\Http\Request::create('/api/master-data/subzonas/TES-TES%20SBZ', 'DELETE');
$response = app()->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent() . "\n";
