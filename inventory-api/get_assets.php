<?php
try {
    $pdo = new PDO('pgsql:host=127.0.0.1;port=5432;dbname=sisfor_inventory', 'postgres', 'joy');
    $stmt = $pdo->query('SELECT email, role_code, username FROM users LIMIT 10');
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo $row['email'] . ' | ' . $row['role_code'] . ' | ' . $row['username'] . "\n";
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
