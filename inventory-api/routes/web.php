<?php

/** @var \Laravel\Lumen\Routing\Router $router */

// Test route untuk verifikasi
$router->get('/', function () use ($router) {
    return response()->json([
        'status' => 'OK',
        'message' => 'Lumen API is running!',
        'version' => $router->app->version()
    ]);
});

// Test route khusus debugging
$router->get('/api/test', function () {
    return response()->json(['success' => true, 'message' => 'API routing works!']);
});

// ── AUTH ROUTES GROUP ─────────────────────────────────
$router->group(['prefix' => 'api'], function () use ($router) {
    
    // ── PUBLIC ROUTES (Tanpa JWT) ───────────────────
    $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');
    $router->get('/master-data', 'AuthController@getMasterData');

    // ── PROTECTED ROUTES (Butuh JWT Token) ──────────
    $router->group(['middleware' => 'auth.jwt'], function () use ($router) {
        $router->post('/logout', 'AuthController@logout');
        $router->get('/me', 'AuthController@me');
        
        // ── MASTER DATA ROUTES (CRUD) ───────────────
        // Entities
        $router->get('/master-data/entities', 'MasterDataController@indexEntities');
        $router->post('/master-data/entities', 'MasterDataController@storeEntity');
        $router->put('/master-data/entities/{code}', 'MasterDataController@updateEntity');
        $router->delete('/master-data/entities/{code}', 'MasterDataController@deleteEntity');
        
        // Branches
        $router->get('/master-data/branches', 'MasterDataController@indexBranches');
        $router->post('/master-data/branches', 'MasterDataController@storeBranch');
        $router->put('/master-data/branches/{code}', 'MasterDataController@updateBranch');
        $router->delete('/master-data/branches/{code}', 'MasterDataController@deleteBranch');
        
        // Divisions
        $router->get('/master-data/divisions', 'MasterDataController@indexDivisions');
        $router->post('/master-data/divisions', 'MasterDataController@storeDivision');
        $router->put('/master-data/divisions/{code}', 'MasterDataController@updateDivision');
        $router->delete('/master-data/divisions/{code}', 'MasterDataController@deleteDivision');
    });
});