<?php
$pdo = new PDO('pgsql:host=127.0.0.1;port=5432;dbname=sisfor_inventory', 'postgres', '123456');

$stmt = $pdo->query("SELECT kd_barang, asset_code FROM barang WHERE kd_barang LIKE '%-KB-%' ORDER BY asset_code, kd_barang");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$baseSuffixes = [];
$updates = [];

foreach ($rows as $row) {
    $kd = $row['kd_barang'];
    $assetCode = $row['asset_code'];
    
    $assetParts = explode('-', $assetCode);
    if (count($assetParts) != 2) continue;
    $assetCat = $assetParts[0];
    $assetNumStr = str_pad((int)$assetParts[1], 3, '0', STR_PAD_LEFT);
    
    $parts = explode('-', $kd);
    $kbIndex = array_search('KB', $parts);
    
    if ($kbIndex !== false && $kbIndex >= 2) {
        $parts[$kbIndex - 1] = $assetNumStr;
        $parts[$kbIndex - 2] = $assetCat;
        
        $baseParts = array_slice($parts, 0, $kbIndex);
        $base = implode('-', $baseParts);
        
        if (!isset($baseSuffixes[$base])) {
            $baseSuffixes[$base] = 1;
        } else {
            $baseSuffixes[$base]++;
        }
        
        $suffix = $baseSuffixes[$base];
        $newKd = $base . '-KB-' . str_pad($suffix, 3, '0', STR_PAD_LEFT);
        
        if ($newKd !== $kd) {
            $updates[] = ['old' => $kd, 'new' => $newKd, 'temp' => 'TEMP-' . uniqid() . '-KB-' . str_pad($suffix, 3, '0', STR_PAD_LEFT)];
        }
    }
}

// 1. Rename to temp
foreach ($updates as $up) {
    $stmt = $pdo->prepare("UPDATE barang SET kd_barang = :temp WHERE kd_barang = :old");
    $stmt->execute([':temp' => $up['temp'], ':old' => $up['old']]);
}

// 2. Rename to final
foreach ($updates as $up) {
    $stmt = $pdo->prepare("UPDATE barang SET kd_barang = :new WHERE kd_barang = :temp");
    $stmt->execute([':new' => $up['new'], ':temp' => $up['temp']]);
    echo "Updated {$up['old']} to {$up['new']}\n";
}

echo "Done fixing DB.\n";
