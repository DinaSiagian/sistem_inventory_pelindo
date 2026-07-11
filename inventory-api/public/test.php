<?php
require __DIR__.'/../bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$controller = new \App\Http\Controllers\BarangController();
$response = $controller->index();
$data = $response->getData();
echo json_encode($data[0] ?? []);
