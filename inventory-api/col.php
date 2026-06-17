<?php
$pdo = new PDO('pgsql:host=127.0.0.1;port=5432;dbname=sisfor_inventory', 'postgres', '123456');
$stmt = $pdo->query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'barang'");
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
