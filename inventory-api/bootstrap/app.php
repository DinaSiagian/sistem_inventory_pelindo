<?php

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

date_default_timezone_set(env('APP_TIMEZONE', 'UTC'));

$app = new Laravel\Lumen\Application(
    dirname(__DIR__)
);

// ✅ Enable Facades & Eloquent
$app->withFacades();
$app->withEloquent();

// ✅ Register Middleware
$app->middleware([
    App\Http\Middleware\CorsMiddleware::class,
]);

// ✅ Register Route Middleware
$app->routeMiddleware([
    'auth.jwt' => App\Http\Middleware\JwtMiddleware::class,
]);

// ✅ Register Service Providers
$app->register(App\Providers\AppServiceProvider::class);
$app->register(App\Providers\AuthServiceProvider::class);

// ✅ Register JWT Service Provider
$app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);

// ✅ Load configuration
$app->configure('jwt');
$app->configure('auth');

// ✅ Load routes with namespace
$app->router->group([
    'namespace' => 'App\Http\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});

return $app;