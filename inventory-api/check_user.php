<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
use App\Models\User;
$count = User::where('email', 'dinaa@pelindo.co.id')->count();
echo "User count for dinaa@pelindo.co.id: " . $count . "\n";
