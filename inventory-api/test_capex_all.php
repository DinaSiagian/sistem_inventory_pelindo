<?php
$pdo = new PDO('pgsql:host=127.0.0.1;port=5432;dbname=sisfor_inventory', 'postgres', '123456');
$stmt = $pdo->query("SELECT kd_anggaran_capex, anggaran_tahunan FROM budget_annual_capex ORDER BY kd_anggaran_capex ASC LIMIT 5");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows, JSON_PRETTY_PRINT);
