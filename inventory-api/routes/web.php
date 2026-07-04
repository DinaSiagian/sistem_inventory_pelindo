<?php

/** @var \Laravel\Lumen\Routing\Router $router */

// ── HEALTH CHECK / TEST ROUTES ─────────────────────────
$router->get('/', function () use ($router) {
    return response()->json([
        'status'    => 'OK',
        'message'   => 'Lumen API is running!',
        'version'   => $router->app->version(),
        'timestamp' => \Carbon\Carbon::now()->toIso8601String()
    ]);
});

$router->get('/api/test', function () {
    return response()->json([
        'success'   => true,
        'message'   => 'API routing works!',
        'timestamp' => \Carbon\Carbon::now()->toIso8601String()
    ]);
});

// ── AUTH ROUTES GROUP ─────────────────────────────────
$router->group(['prefix' => 'api'], function () use ($router) {

    // ── PUBLIC ROUTES (Tanpa JWT) ───────────────────
    $router->post('/register', 'AuthController@register');
    $router->post('/login',    'AuthController@login');
    $router->post('/get-security-question', 'AuthController@getSecurityQuestion');
    $router->post('/reset-security-password', 'AuthController@resetSecurityPassword');

    // Master Data untuk Auth (dropdown registrasi) - PUBLIC
    $router->get('/master-data', 'MasterDataController@getMasterData');

    // ── PUBLIC ASSET SCAN (Tanpa JWT) ───────────────
    $router->get('/public/barang/{kode}', 'BarangController@publicShow');


    // ── PROTECTED ROUTES (Butuh JWT Token) ──────────
    $router->group(['middleware' => 'auth.jwt'], function () use ($router) {

        // Auth
        $router->post('/logout', 'AuthController@logout');
        $router->get('/me',      'AuthController@me');

        // ── USER MANAGEMENT ─────────────────────────
        $router->get('/users',                      'UserController@index');
        $router->post('/users',                     'UserController@store');
        $router->get('/users/{id}',                 'UserController@show');
        $router->put('/users/{id}',                 'UserController@update');
        $router->delete('/users/{id}',              'UserController@destroy');
        $router->patch('/users/{id}/toggle-status', 'UserController@toggleStatus');

        // Logs
        $router->get('/logs', 'LogController@index');

        // ── MASTER DATA: ENTITIES ──────────────────
        $router->get('/master-data/entities',         'MasterDataController@indexEntities');
        $router->post('/master-data/entities',        'MasterDataController@storeEntity');
        $router->put('/master-data/entities/{code}',  'MasterDataController@updateEntity');
        $router->delete('/master-data/entities/{code}', 'MasterDataController@deleteEntity');

        // ── MASTER DATA: BRANCHES ──────────────────
        $router->get('/master-data/branches',         'MasterDataController@indexBranches');
        $router->post('/master-data/branches',        'MasterDataController@storeBranch');
        $router->put('/master-data/branches/{code}',  'MasterDataController@updateBranch');
        $router->delete('/master-data/branches/{code}', 'MasterDataController@deleteBranch');

        // ── MASTER DATA: ZONAS & SUBZONAS ──────────
        $router->get('/master-data/zonas',            'MasterDataController@indexZonas');
        $router->post('/master-data/zonas',           'MasterDataController@storeZona');
        $router->put('/master-data/zonas/{code}',     'MasterDataController@updateZona');
        $router->delete('/master-data/zonas/{code}',  'MasterDataController@deleteZona');

        $router->get('/master-data/subzonas',         'MasterDataController@indexSubzonas');
        $router->post('/master-data/subzonas',        'MasterDataController@storeSubzona');
        $router->put('/master-data/subzonas/{code}',  'MasterDataController@updateSubzona');
        $router->delete('/master-data/subzonas/{code}','MasterDataController@deleteSubzona');

        // ── MASTER DATA: DEVICES (KATEGORI) ────────
        $router->get('/master-data/devices',          'MasterDataController@indexDevices');
        $router->post('/master-data/devices',         'MasterDataController@storeDevice');
        $router->put('/master-data/devices/{code}',   'MasterDataController@updateDevice');
        $router->delete('/master-data/devices/{code}','MasterDataController@deleteDevice');

        // ── MASTER DATA: DIVISIONS ─────────────────
        $router->get('/master-data/divisions',         'MasterDataController@indexDivisions');
        $router->post('/master-data/divisions',        'MasterDataController@storeDivision');
        $router->put('/master-data/divisions/{code}',  'MasterDataController@updateDivision');
        $router->delete('/master-data/divisions/{code}', 'MasterDataController@deleteDivision');

        // ── MASTER DATA: ROLES ─────────────────────
        $router->get('/master-data/roles',         'MasterDataController@indexRoles');
        $router->post('/master-data/roles',        'MasterDataController@storeRole');
        $router->put('/master-data/roles/{code}',  'MasterDataController@updateRole');
        $router->delete('/master-data/roles/{code}', 'MasterDataController@deleteRole');

        // ══════════════════════════════════════════════
        // BUDGET: OPEX
        // ══════════════════════════════════════════════
        $router->get('/budget/opex',             'BudgetController@indexOpex');
        $router->post('/budget/opex',            'BudgetController@storeOpex');
        $router->put('/budget/opex/{id}',        'BudgetController@updateOpex');
        $router->delete('/budget/opex/{id}',     'BudgetController@destroyOpex');
        // Projects OPEX
        $router->post('/budget/opex/{id}/projects',    'BudgetController@storeProjectOpex');
        $router->put('/budget/opex/{id}/sync-assets',  'BudgetController@syncAssetsOpex');

        // ══════════════════════════════════════════════
        // BUDGET: CAPEX
        // ══════════════════════════════════════════════
        $router->get('/budget/capex',            'BudgetController@indexCapex');
        $router->post('/budget/capex',           'BudgetController@storeCapex');
        $router->put('/budget/capex/{kd}',       'BudgetController@updateCapex');
        $router->delete('/budget/capex/{kd}',    'BudgetController@destroyCapex');
        // Projects CAPEX
        $router->post('/budget/capex/{kd}/projects',   'BudgetController@storeProjectCapex');
        $router->put('/budget/capex/{kd}/sync-assets', 'BudgetController@syncAssetsCapex');

        // ══════════════════════════════════════════════
        // BUDGET: PROJECTS (universal CRUD)
        // ══════════════════════════════════════════════
        $router->get('/budget/projects',         'BudgetController@indexProjects');
        $router->put('/budget/projects/{id}',    'BudgetController@updateProject');
        $router->delete('/budget/projects/{id}', 'BudgetController@destroyProject');

        // ══════════════════════════════════════════════
        // INVENTORY: BARANG (ASET) & KATALOG
        // ══════════════════════════════════════════════
        $router->get('/katalog',   'BarangController@getKatalog');
        $router->post('/katalog',  'BarangController@storeKatalog');
        $router->put('/katalog/{id}', 'BarangController@updateKatalog');
        $router->delete('/katalog/{id}', 'BarangController@deleteKatalog');

        $router->get('/barang',    'BarangController@index');
        $router->get('/devices',   'BarangController@indexDevices');
        $router->post('/barang',   'BarangController@store');
        $router->put('/barang/{id}', 'BarangController@update');
        $router->delete('/barang/{id}', 'BarangController@destroy');

        // ══════════════════════════════════════════════
        // INVENTORY: TRANSACTIONS (BAST)
        // ══════════════════════════════════════════════
        $router->get('/transactions',         'TransactionController@index');
        $router->post('/transactions',        'TransactionController@store');
        $router->post('/transactions/return', 'TransactionController@returnAsset');
        $router->delete('/transactions/{id}', 'TransactionController@destroy');
    });
});
