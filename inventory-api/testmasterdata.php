<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$controller = new \App\Http\Controllers\AuthController();
$response = $controller->getMasterData();
echo $response->getContent();
