<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ActivityLog;
use App\Models\LoginLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class UserController extends Controller
{
    /**
     * GET /api/users — Daftar semua user
     */
    public function index(Request $request)
    {
        try {
            $users = User::with(['role', 'entity', 'branch', 'division'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data'    => $users->map(fn($u) => $this->formatUser($u)),
            ], 200);
        } catch (Exception $e) {
            Log::error('UserController@index: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * GET /api/users/{id}
     */
    public function show($id)
    {
        try {
            $user = User::with(['role', 'entity', 'branch', 'division'])->find($id);
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'User tidak ditemukan'], 404);
            }
            return response()->json([
                'success' => true,
                'data'    => $this->formatUser($user),
            ], 200);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * POST /api/users — Buat user baru
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name'          => 'required|string|max:255',
                'username'      => 'required|string|unique:users,username',
                'email'         => 'required|string|email|max:255|unique:users,email',
                'password'      => 'required|string|min:6',
                'phone'         => 'nullable|string|max:20',
                'nip'           => 'nullable|string|max:50',
                'role_code'     => 'required|exists:roles,role_code',
                'entity_code'   => 'required|exists:entities,entity_code',
                'branch_code'   => 'required|exists:branches,branch_code',
                'division_code' => 'nullable|exists:divisions,division_code',
                'is_active'     => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $user = User::create([
                'name'         => $request->name,
                'username'     => $request->username,
                'email'        => $request->email,
                'password'     => Hash::make($request->password),
                'phone'        => $request->phone ?: null,
                'nip'          => $request->nip ?: null,
                'role_code'    => $request->role_code,
                'entity_code'  => $request->entity_code,
                'branches_code'=> $request->branch_code,
                'division_code'=> $request->division_code ?: null,
                'is_active'    => $request->input('is_active', true),
            ]);

            $user->load(['role', 'entity', 'branch', 'division']);

            // Log activity: REGISTER
            ActivityLog::create([
                'user_id'     => JWTAuth::user()?->id,
                'action_type' => 'REGISTER',
                'table_name'  => 'users',
                'record_id'   => (string) $user->id,
                'old_value'   => null,
                'new_value'   => json_encode($this->setLastLoginActual($user) ?? $this->formatUser($user)),
                'ip_address'  => $request->ip(),
                'created_at'  => Carbon::now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dibuat',
                'data'    => ($this->setLastLoginActual($user) ?? true) ? $this->formatUser($user) : null,
            ], 201);
        } catch (Exception $e) {
            Log::error('UserController@store: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * PUT /api/users/{id} — Update user
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'User tidak ditemukan'], 404);
            }

            $rules = [
                'name'          => 'sometimes|required|string|max:255',
                'username'      => 'sometimes|required|string|unique:users,username,' . $id,
                'email'         => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
                'phone'         => 'nullable|string|max:20',
                'nip'           => 'nullable|string|max:50',
                'role_code'     => 'sometimes|required|exists:roles,role_code',
                'entity_code'   => 'sometimes|required|exists:entities,entity_code',
                'branch_code'   => 'sometimes|required|exists:branches,branch_code',
                'division_code' => 'nullable|exists:divisions,division_code',
                'is_active'     => 'nullable|boolean',
                'password'      => 'nullable|string|min:6',
            ];

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $data = $request->only([
                'name', 'username', 'email', 'phone', 'nip',
                'role_code', 'entity_code', 'division_code', 'is_active',
            ]);

            if ($request->has('branch_code')) {
                $data['branches_code'] = $request->branch_code;
            }
            if ($request->filled('password')) {
                $data['password'] = Hash::make($request->password);
            }

            $oldUser = $this->formatUser($user);
            $user->update($data);
            $user->load(['role', 'entity', 'branch', 'division']);
            $newUser = $this->formatUser($user);

            // Log activity: UPDATE_PROFILE
            ActivityLog::create([
                'user_id'     => JWTAuth::user()?->id,
                'action_type' => 'UPDATE_PROFILE',
                'table_name'  => 'users',
                'record_id'   => (string) $user->id,
                'old_value'   => json_encode($oldUser),
                'new_value'   => json_encode($newUser),
                'ip_address'  => $request->ip(),
                'created_at'  => Carbon::now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User berhasil diperbarui',
                'data'    => $this->formatUser($user),
            ], 200);
        } catch (Exception $e) {
            Log::error('UserController@update: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * DELETE /api/users/{id}
     */
    public function destroy($id)
    {
        try {
            $currentUser = JWTAuth::user();
            if ($currentUser && $currentUser->id == $id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus akun sendiri',
                ], 403);
            }

            $user = User::find($id);
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'User tidak ditemukan'], 404);
            }

            $oldUser = $this->formatUser($user);
            $user->delete();

            // Log activity: DELETE_ACCOUNT
            ActivityLog::create([
                'user_id'     => JWTAuth::user()?->id,
                'action_type' => 'DELETE_ACCOUNT',
                'table_name'  => 'users',
                'record_id'   => (string) $id,
                'old_value'   => json_encode($oldUser),
                'new_value'   => null,
                'ip_address'  => request()->ip(),
                'created_at'  => Carbon::now(),
            ]);
            return response()->json(['success' => true, 'message' => 'User berhasil dihapus'], 200);
        } catch (Exception $e) {
            Log::error('UserController@destroy: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * PATCH /api/users/{id}/toggle-status
     */
    public function toggleStatus($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'User tidak ditemukan'], 404);
            }

            $oldUser = $this->formatUser($user);
            $user->is_active = !$user->is_active;
            $user->save();
            
            Log::info("User ID {$id} status toggled to: " . ($user->is_active ? 'Active' : 'Inactive'));

            $user->load(['role', 'entity', 'branch', 'division']);
            $newUser = $this->formatUser($user);

            // Log activity: UPDATE_STATUS
            ActivityLog::create([
                'user_id'     => JWTAuth::user()?->id,
                'action_type' => 'UPDATE_STATUS',
                'table_name'  => 'users',
                'record_id'   => (string) $user->id,
                'old_value'   => json_encode($oldUser),
                'new_value'   => json_encode($newUser),
                'ip_address'  => request()->ip(),
                'created_at'  => Carbon::now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Status user diperbarui',
                'data'    => $this->formatUser($user),
            ], 200);
        } catch (Exception $e) {
            Log::error('UserController@toggleStatus: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Get dynamic last_login_actual from login_logs table
     */
    private function getLastLoginActual(User $u)
    {
        $lastLog = LoginLog::where('user_id', $u->id)
            ->orderBy('login_time', 'desc')
            ->first();
        return $lastLog ? $lastLog->login_time : null;
    }

    /**
     * Format user untuk konsistensi field di frontend
     * Frontend menggunakan `branch_code`, DB menyimpan sebagai `branches_code`
     */
    private function formatUser($user): array
    {
        // Jika $user adalah array (dari format lain), handle gracefully
        if (is_array($user)) return $user;
        
        $actual = $this->getLastLoginActual($user);
        return [
            'id'            => $user->id,
            'name'          => $user->name,
            'username'      => $user->username,
            'email'         => $user->email,
            'phone'         => $user->phone,
            'nip'           => $user->nip,
            'role_code'     => $user->role_code,
            'entity_code'   => $user->entity_code,
            'branch_code'   => $user->branches_code, // map branches_code -> branch_code
            'division_code' => $user->division_code,
            'is_active'     => (bool) $user->is_active,
            'created_at'    => $user->created_at,
            'updated_at'    => $user->updated_at,
            'last_login'    => $actual ?? $user->last_login,
        ];
    }
}
