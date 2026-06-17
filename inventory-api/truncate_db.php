<?php
$pdo = new PDO('pgsql:host=127.0.0.1;port=5432;dbname=sisfor_inventory', 'postgres', '123456');
try {
    $pdo->exec("TRUNCATE TABLE assets CASCADE;");
    $pdo->exec("TRUNCATE TABLE barang CASCADE;");
    echo "Success truncated assets and barang cascade!";
} catch (Exception $e) {
    echo $e->getMessage();
}
