<?php
$pdo = new PDO('pgsql:host=127.0.0.1;port=5432;dbname=sisfor_inventory', 'postgres', '123456');
$stmt = $pdo->query("SELECT * FROM budget_annual_capex WHERE kd_anggaran_capex = '5432'");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows, JSON_PRETTY_PRINT);
