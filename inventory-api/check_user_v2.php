<?php
define('LARAVEL_START', microtime(true));
$app = require __DIR__ . '/bootstrap/app.php';
$app->make('db'); // ensure DB is booted

use Illuminate\Support\Facades\DB;

$email = 'dinaa@pelindo.co.id';
$user = DB::table('users')->where('email', $email)->first();

if ($user) {
    echo "User found: " . $user->email . " (ID: " . $user->id . ")\n";
} else {
    echo "User not found: " . $email . "\n";
}
