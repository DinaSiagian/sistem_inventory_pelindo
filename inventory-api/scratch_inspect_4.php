<?php
require __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$transactions = app('db')->table('asset_transactions')->where('serial_number', 'test2')->get();
echo "Transactions for test2:\n";
foreach($transactions as $t) {
    echo "ID: $t->transaction_id, Type: $t->transaction_type, Cond: $t->condition, Current: $t->is_current, Notes: $t->notes\n";
}
