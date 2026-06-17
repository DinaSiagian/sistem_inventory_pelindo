<?php
$pdo = new PDO('pgsql:host=127.0.0.1;port=5432;dbname=sisfor_inventory', 'postgres', '123456');
try {
    $pdo->exec("ALTER TABLE barang ALTER COLUMN kd_barang DROP IDENTITY IF EXISTS;");
    $pdo->exec("ALTER TABLE barang ALTER COLUMN kd_barang TYPE VARCHAR(255);");
    echo "Success!";
} catch (Exception $e) {
    echo $e->getMessage();
}
