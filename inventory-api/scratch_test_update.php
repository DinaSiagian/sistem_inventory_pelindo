<?php
require __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$request = Illuminate\Http\Request::create('/api/barang/LAP-0002', 'PUT', [
    'name' => 'Lenovo ThinkPad T15',
    'category' => 'LAPTOP',
    'quantity' => 2,
    'units' => [
        [
            'serialNumber' => 'test1',
            'location' => 'Gudang',
            'status' => 'Tersedia (Baik)'
        ],
        [
            'serialNumber' => 'test2',
            'location' => 'Gudang',
            'status' => 'Tersedia (Telah Ditemukan)'
        ]
    ]
]);

$controller = $app->make('App\Http\Controllers\BarangController');
$response = $controller->update($request, 'LAP-0002');
echo $response->getContent();
