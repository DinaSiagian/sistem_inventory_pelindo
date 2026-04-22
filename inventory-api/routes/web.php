<?php

/** @var \Laravel\Lumen\Routing\Router $router */

// ── HEALTH CHECK / TEST ROUTES ─────────────────────────
$router->get('/', function () use ($router) {
    return response()->json([
        'status' => 'OK',
        'message' => 'Lumen API is running!',
        'version' => $router->app->version(),
        'timestamp' => now()->toISOString()
    ]);
});

$router->get('/api/test', function () {
    return response()->json([
        'success' => true, 
        'message' => 'API routing works!',
        'timestamp' => now()->toISOString()
    ]);
});

// ── AUTH ROUTES GROUP ─────────────────────────────────
$router->group(['prefix' => 'api'], function () use ($router) {
    
    // ── PUBLIC ROUTES (Tanpa JWT) ───────────────────
    $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');
    
    // Master Data untuk Auth (dropdown registrasi) - PUBLIC
    $router->get('/master-data', 'MasterDataController@getMasterData');

    // ── PROTECTED ROUTES (Butuh JWT Token) ──────────
    $router->group(['middleware' => 'auth.jwt'], function () use ($router) {
        
        // Auth protected
        $router->post('/logout', 'AuthController@logout');
        $router->get('/me', 'AuthController@me');
        
        // ── USER MANAGEMENT ROUTES ─────────────────
        $router->get('/users', 'UserController@index');
        $router->post('/users', 'UserController@store');
        $router->get('/users/{id}', 'UserController@show');
        $router->put('/users/{id}', 'UserController@update');
        $router->delete('/users/{id}', 'UserController@destroy');
        $router->patch('/users/{id}/toggle-status', 'UserController@toggleStatus');
        
        // Logs
        $router->get('/logs', 'LogController@index');
        
        // ── MASTER DATA: ENTITIES ──────────────────
        $router->get('/master-data/entities', 'MasterDataController@indexEntities');
        $router->post('/master-data/entities', 'MasterDataController@storeEntity');
        $router->put('/master-data/entities/{code}', 'MasterDataController@updateEntity');
        $router->delete('/master-data/entities/{code}', 'MasterDataController@deleteEntity');
        
        // ── MASTER DATA: BRANCHES ──────────────────
        $router->get('/master-data/branches', 'MasterDataController@indexBranches');
        $router->post('/master-data/branches', 'MasterDataController@storeBranch');
        $router->put('/master-data/branches/{code}', 'MasterDataController@updateBranch');
        $router->delete('/master-data/branches/{code}', 'MasterDataController@deleteBranch');
        
        // ── MASTER DATA: DIVISIONS ─────────────────
        $router->get('/master-data/divisions', 'MasterDataController@indexDivisions');
        $router->post('/master-data/divisions', 'MasterDataController@storeDivision');
        $router->put('/master-data/divisions/{code}', 'MasterDataController@updateDivision');
        $router->delete('/master-data/divisions/{code}', 'MasterDataController@deleteDivision');

        // ── MASTER DATA: ROLES ─────────────────────
        $router->get('/master-data/roles', 'MasterDataController@indexRoles');
        $router->post('/master-data/roles', 'MasterDataController@storeRole');
        $router->put('/master-data/roles/{code}', 'MasterDataController@updateRole');
        $router->delete('/master-data/roles/{code}', 'MasterDataController@deleteRole');

        // ── BUDGET: OPEX ───────────────────────────────────
        $router->get('/budget/opex', 'BudgetController@indexOpex');
        $router->post('/budget/opex', 'BudgetController@storeOpex');
        $router->put('/budget/opex/{id}', 'BudgetController@updateOpex');
        $router->delete('/budget/opex/{id}', 'BudgetController@destroyOpex');

        // ── BUDGET: CAPEX ──────────────────────────────────
        $router->get('/budget/capex', 'BudgetController@indexCapex');
        $router->post('/budget/capex', 'BudgetController@storeCapex');
        $router->put('/budget/capex/{kd}', 'BudgetController@updateCapex');
        $router->delete('/budget/capex/{kd}', 'BudgetController@destroyCapex');
    });
});