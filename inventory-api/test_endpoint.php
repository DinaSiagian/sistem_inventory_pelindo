<?php
require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

try {
    $user = User::where('email', 'joy@pelindo.co.id')->first();
    if (!$user) {
        die("User not found!\n");
    }

    $token = JWTAuth::fromUser($user);
    echo "Generated Token: " . substr($token, 0, 30) . "...\n";

    // Simulate Request
    $request = Illuminate\Http\Request::create('/api/budget/projects', 'GET');
    $request->headers->set('Authorization', 'Bearer ' . $token);

    $response = $app->handle($request);
    echo "Status Code: " . $response->getStatusCode() . "\n";
    echo "Content:\n" . $response->getContent() . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
