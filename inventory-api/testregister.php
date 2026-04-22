<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$request = \Illuminate\Http\Request::create('/api/register', 'POST', [], [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
    'name' => 'Dina',
    'username' => 'dina',
    'email' => 'dina@pelindo.co.id',
    'password' => 'dina123',
    'password_confirmation' => 'dina123',
    'phone' => '089617069188',
    'nip' => '1234',
    'role_code' => 'admin',
    'entity_code' => 'SPMT',
    'branches_code' => 'BLW',
    'division_code' => 'IT-SYS'
]));

$response = $app->handle($request);

echo $response->getContent();
