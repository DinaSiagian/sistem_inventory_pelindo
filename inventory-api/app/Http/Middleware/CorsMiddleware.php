<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $corsHeaders = [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
        ];

        // Security headers (fixes Lighthouse Best Practices)
        $securityHeaders = [
            'X-Content-Type-Options'           => 'nosniff',
            'X-Frame-Options'                  => 'SAMEORIGIN',
            'X-XSS-Protection'                 => '1; mode=block',
            'Referrer-Policy'                  => 'strict-origin-when-cross-origin',
            'Permissions-Policy'               => 'camera=(), microphone=(), geolocation=()',
            'Cross-Origin-Opener-Policy'       => 'same-origin-allow-popups',
            'Cross-Origin-Resource-Policy'     => 'cross-origin',
            'Content-Security-Policy'          => "default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
        ];

        $headers = array_merge($corsHeaders, $securityHeaders);

        if ($request->getMethod() === 'OPTIONS') {
            return response('', 204, $headers);
        }

        $response = $next($request);

        foreach ($headers as $key => $value) {
            $response->header($key, $value);
        }

        return $response;
    }
}