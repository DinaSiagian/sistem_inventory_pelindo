<?php
$file = 'app/Http/Controllers/TransactionController.php';
$content = file_get_contents($file);

// Replace exact string matches
$content = str_replace("'serial_number'", "'kd_barang'", $content);
$content = str_replace('"serial_number"', '"kd_barang"', $content);
$content = str_replace('t.serial_number', 't.kd_barang', $content);
$content = str_replace('b.serial_number', 'b.kd_barang', $content);
$content = str_replace('->serial_number', '->kd_barang', $content);
$content = str_replace('serial_number:', 'kd_barang:', $content);
$content = str_replace('items.*.serial_number', 'items.*.kd_barang', $content);

file_put_contents($file, $content);

$file2 = 'app/Http/Controllers/BarangController.php';
$content2 = file_get_contents($file2);
$content2 = str_replace("whereIn('serial_number', \$allKdBarang)", "whereIn('kd_barang', \$allKdBarang)", $content2);
$content2 = str_replace("keyBy('serial_number')", "keyBy('kd_barang')", $content2);
$content2 = str_replace("table('asset_transactions')->where('serial_number'", "table('asset_transactions')->where('kd_barang'", $content2);

file_put_contents($file2, $content2);

echo "Done.\n";
