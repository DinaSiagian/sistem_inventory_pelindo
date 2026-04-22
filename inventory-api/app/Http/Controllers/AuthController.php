<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Entity;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\Models\ActivityLog;
use App\Models\LoginLog;
use Carbon\Carbon;
use Exception;

class AuthController extends Controller
{
    /**
     * Register user baru
     */
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'username' => 'required|string|unique:users,username',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:6|confirmed',
                'phone' => 'nullable|string|max:20',
                'nip' => 'nullable|string|max:50',
                'role_code' => 'required|exists:roles,role_code',
                'entity_code' => 'required|exists:entities,entity_code',
                'branches_code' => 'required|exists:branches,branch_code',
                'division_code' => 'nullable|exists:divisions,division_code',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone ?: null,
                'nip' => $request->nip ?: null,
                'role_code' => $request->role_code,
                'entity_code' => $request->entity_code,
                'branches_code' => $request->branches_code,
                'division_code' => $request->division_code ?: null,
                'is_active' => true,
            ]);

            // ✅ Generate JWT token untuk user yang baru dibuat
            $token = JWTAuth::fromUser($user);

            // Log activity: REGISTER
            ActivityLog::create([
                'user_id'     => $user->id,
                'action_type' => 'REGISTER',
                'table_name'  => 'users',
                'record_id'   => (string) $user->id,
                'old_value'   => null,
                'new_value'   => json_encode($user),
                'ip_address'  => $request->ip(),
                'created_at'  => Carbon::now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Registrasi berhasil',
                'data' => [
                    'user' => $user,
                    'access_token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 201);

        } catch (JWTException $e) {
            Log::error('JWT Error saat register: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat token. Pastikan JWT_SECRET sudah diset di .env'
            ], 500);
        } catch (Exception $e) {
            Log::error('Register Error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses registrasi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login user
     */


    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $credentials = $request->only('email', 'password');

            // Check if user exists and is active before attempting login
            $user = User::where('email', $credentials['email'])->first();
            if ($user && !$user->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Akun Anda telah dinonaktifkan. Silakan hubungi administrator.'
                ], 403);
            }

            // ✅ PENTING: Gunakan JWTAuth::attempt, BUKAN Auth::attempt
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email atau password salah'
                ], 401);
            }

            // Re-fetch user to ensure we have the correct instance
            $user = JWTAuth::user();

            $user->load(['role', 'entity', 'branch', 'division']);

            // Perbarui last_login di tabel users
            $user->update(['last_login' => Carbon::now()]);

            // Log activity: LOGIN
            ActivityLog::create([
                'user_id'     => $user->id,
                'action_type' => 'LOGIN',
                'table_name'  => 'users',
                'record_id'   => (string) $user->id,
                'old_value'   => null,
                'new_value'   => json_encode(['username' => $user->username, 'device' => $request->header('User-Agent')]),
                'ip_address'  => $request->ip(),
                'created_at'  => Carbon::now(),
            ]);

            // Create login log
            LoginLog::create([
                'user_id'    => $user->id,
                'login_time' => Carbon::now(),
                'ip_address' => $request->ip(),
                'device_info'=> $request->header('User-Agent'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Login berhasil',
                'data' => [
                    'user' => $user,
                    'access_token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 200);

        } catch (JWTException $e) {
            Log::error('JWT Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem pada layanan token. Mohon coba lagi nanti.'
            ], 500);
        } catch (Exception $e) {
            Log::error('Login Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal login: ' . $e->getMessage()
            ], 500);
        }
    }
    /**
     * Logout user
     */
    public function logout()
    {
        try {
            $token = JWTAuth::getToken();
            if ($token) {
                $user = JWTAuth::toUser($token);
                if ($user) {
                    // Log activity: LOGOUT
                    ActivityLog::create([
                        'user_id'     => $user->id,
                        'action_type' => 'LOGOUT',
                        'table_name'  => 'users',
                        'record_id'   => (string) $user->id,
                        'old_value'   => null,
                        'new_value'   => null,
                        'ip_address'  => request()->ip(),
                        'created_at'  => Carbon::now(),
                    ]);

                    // Update login log
                    LoginLog::where('user_id', $user->id)
                        ->whereNull('logout_time')
                        ->orderBy('login_time', 'desc')
                        ->first()
                        ?->update(['logout_time' => Carbon::now()]);
                }
                JWTAuth::invalidate($token);
            }
            return response()->json([
                'success' => true,
                'message' => 'Logout berhasil'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal logout'
            ], 500);
        }
    }

    /**
     * Get master data
     */
    public function getMasterData()
    {
        try {
            $entities = Entity::with(['branches' => function($q) {
                $q->with('divisions')->where('is_active', true);
            }])->whereHas('branches')->get();
            
            $roles = Role::where('is_active', true)->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'entities' => $entities,
                    'roles' => $roles
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => true,
                'data' => ['entities' => [], 'roles' => []]
            ], 200);
        }
    }

    /**
     * Get authenticated user
     */
    public function me()
    {
        try {
            $user = JWTAuth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }
            $user->load(['role', 'entity', 'branch', 'division']);
            return response()->json([
                'success' => true,
                'data' => $user
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error'
            ], 500);
        }
    }
}