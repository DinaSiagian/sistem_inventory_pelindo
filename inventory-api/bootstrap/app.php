<?php

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

date_default_timezone_set(env('APP_TIMEZONE', 'UTC'));

// ── Create Application ─────────────────────────────────────
$app = new Laravel\Lumen\Application(
    dirname(__DIR__)
);

// ── Enable Core Features ───────────────────────────────────
$app->withFacades();
$app->withEloquent();

// ── Register Middleware ────────────────────────────────────
$app->middleware([
    // Global middleware (runs on every request)
    App\Http\Middleware\CorsMiddleware::class,
    // App\Http\Middleware\TrimStrings::class,
    // App\Http\Middleware\TrustProxies::class,
]);

// ── Register Route Middleware ─────────────────────────────
$app->routeMiddleware([
    'auth' => App\Http\Middleware\Authenticate::class,
    'auth.jwt' => Tymon\JWTAuth\Http\Middleware\Authenticate::class,
    // 'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
]);

// ── Register Service Providers ────────────────────────────
$app->register(App\Providers\AppServiceProvider::class);
$app->register(App\Providers\AuthServiceProvider::class);
$app->register(App\Providers\EventServiceProvider::class);

// ── Register JWT Service Provider ─────────────────────────
$app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);

// ── Load Configuration Files ──────────────────────────────
$app->configure('jwt');
$app->configure('auth');
$app->configure('cors'); // Jika pakai config cors
$app->configure('database');

// ── Register Console Kernel (PENTING untuk artisan commands) ─
$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

// ── Register Exception Handler ────────────────────────────
$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

// ── Load Routes with Controller Namespace ─────────────────
$app->router->group([
    'namespace' => 'App\Http\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});

// ── Return Application Instance ───────────────────────────
return $app;