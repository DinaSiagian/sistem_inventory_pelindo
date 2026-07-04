<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$user = \App\Models\User::where('email', 'dina123@pelindo.co.id')->first();
echo "USER_FOUND: " . ($user ? 'YES' : 'NO') . "\n";
echo "RECOVERY_CODE: " . ($user ? $user->recovery_code : 'N/A') . "\n";
