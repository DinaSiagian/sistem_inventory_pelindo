<?php
$pdo = new PDO('pgsql:host=127.0.0.1;port=5432;dbname=sisfor_inventory', 'postgres', '123456');
$stmt = $pdo->query("SELECT anggaran_tahunan FROM budget_annual_capex WHERE kd_anggaran_capex = 'CAP-2440013'");
$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo $row['anggaran_tahunan'];
