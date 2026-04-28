<?php

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';

use Illuminate\Support\Facades\DB;

try {
    echo "Fixing activity_logs sequence...\n";
    $maxActivity = DB::table('activity_logs')->max('log_id') ?: 0;
    $nextActivity = $maxActivity + 1;
    DB::statement("SELECT setval(pg_get_serial_sequence('activity_logs', 'log_id'), $nextActivity, false)");
    echo "activity_logs sequence reset to $nextActivity\n";

    echo "Fixing login_logs sequence...\n";
    $maxLogin = DB::table('login_logs')->max('id') ?: 0;
    $nextLogin = $maxLogin + 1;
    DB::statement("SELECT setval(pg_get_serial_sequence('login_logs', 'id'), $nextLogin, false)");
    echo "login_logs sequence reset to $nextLogin\n";

    echo "Fixing users sequence...\n";
    $maxUser = DB::table('users')->max('id') ?: 0;
    $nextUser = $maxUser + 1;
    DB::statement("SELECT setval(pg_get_serial_sequence('users', 'id'), $nextUser, false)");
    echo "users sequence reset to $nextUser\n";

    echo "\nAll sequences fixed successfully!\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
