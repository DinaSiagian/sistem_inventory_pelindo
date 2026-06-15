<?php

namespace App\Http\Controllers;

use App\Models\Entity;
use App\Models\Branch;
use App\Models\Division;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Exception;

class MasterDataController extends Controller
{
    /* ==================== ENTITIES ==================== */
    
    /**
     * GET /api/master-data/entities
     * List semua entities dengan count branches
     */
    public function indexEntities()
    {
        try {
            $entities = Entity::withCount('branches')->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Data entitas berhasil diambil',
                'data' => $entities
            ], 200);
        } catch (Exception $e) {
            Log::error('Get Entities Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data entitas'
            ], 500);
        }
    }

    /**
     * POST /api/master-data/entities
     * Tambah entity baru
     */
    public function storeEntity(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'entity_code' => 'required|string|max:50|unique:entities,entity_code',
                'name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $entity = Entity::create([
                'entity_code' => strtoupper($request->entity_code),
                'name' => $request->name,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Entitas berhasil ditambahkan',
                'data' => $entity
            ], 201);

        } catch (Exception $e) {
            Log::error('Store Entity Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan entitas: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT /api/master-data/entities/{code}
     * Update entity by entity_code
     */
    public function updateEntity(Request $request, $code)
    {
        try {
            $entity = Entity::findOrFail($code);

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $entity->update([
                'name' => $request->name,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Entitas berhasil diperbarui',
                'data' => $entity
            ], 200);

        } catch (Exception $e) {
            Log::error('Update Entity Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui entitas'
            ], 500);
        }
    }

    /**
     * DELETE /api/master-data/entities/{code}
     * Hapus entity (dengan proteksi jika masih ada branch)
     */
    public function deleteEntity($code)
    {
        try {
            $entity = Entity::findOrFail($code);
            
            // Cek jika ada branch yang terkait (restrict delete)
            if ($entity->branches()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus entitas yang memiliki cabang'
                ], 400);
            }

            $entity->delete();

            return response()->json([
                'success' => true,
                'message' => 'Entitas berhasil dihapus'
            ], 200);

        } catch (Exception $e) {
            Log::error('Delete Entity Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus entitas'
            ], 500);
        }
    }

    /* ==================== BRANCHES ==================== */
    
    /**
     * GET /api/master-data/branches
     * List semua branches dengan filter entity_code opsional
     */
    public function indexBranches(Request $request)
    {
        try {
            $query = Branch::with(['entity', 'divisions']);
            
            // Filter by entity_code jika ada
            if ($request->has('entity_code')) {
                $query->where('entity_code', $request->entity_code);
            }
            
            // Filter by status
            if ($request->has('is_active')) {
                $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
            }
            
            $branches = $query->withCount('divisions')->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Data cabang berhasil diambil',
                'data' => $branches
            ], 200);
        } catch (Exception $e) {
            Log::error('Get Branches Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data cabang'
            ], 500);
        }
    }

    /**
     * POST /api/master-data/branches
     * Tambah branch baru
     */
    public function storeBranch(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'branch_code' => 'required|string|max:50|unique:branches,branch_code',
                'entity_code' => 'required|exists:entities,entity_code',
                'name' => 'required|string|max:255',
                'address' => 'nullable|string',
                'phone' => 'nullable|string|max:20',
                'longitude' => 'nullable|numeric',
                'latitude' => 'nullable|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $branch = Branch::create([
                'branch_code' => strtoupper($request->branch_code),
                'entity_code' => $request->entity_code,
                'name' => $request->name,
                'address' => $request->address,
                'phone' => $request->phone,
                'longitude' => $request->longitude,
                'latitude' => $request->latitude,
                'is_active' => true,
            ]);

            // Load relations untuk response
            $branch->load(['entity', 'divisions']);

            return response()->json([
                'success' => true,
                'message' => 'Cabang berhasil ditambahkan',
                'data' => $branch
            ], 201);

        } catch (Exception $e) {
            Log::error('Store Branch Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan cabang: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT /api/master-data/branches/{code}
     * Update branch by branch_code
     */
    public function updateBranch(Request $request, $code)
    {
        try {
            $branch = Branch::findOrFail($code);

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'entity_code' => 'required|exists:entities,entity_code',
                'address' => 'nullable|string',
                'phone' => 'nullable|string|max:20',
                'longitude' => 'nullable|numeric',
                'latitude' => 'nullable|numeric',
                'is_active' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $branch->update([
                'name' => $request->name,
                'entity_code' => $request->entity_code,
                'address' => $request->address,
                'phone' => $request->phone,
                'longitude' => $request->longitude,
                'latitude' => $request->latitude,
                'is_active' => $request->has('is_active') ? $request->is_active : $branch->is_active,
            ]);

            $branch->load(['entity', 'divisions']);

            return response()->json([
                'success' => true,
                'message' => 'Cabang berhasil diperbarui',
                'data' => $branch
            ], 200);

        } catch (Exception $e) {
            Log::error('Update Branch Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui cabang'
            ], 500);
        }
    }

    /**
     * DELETE /api/master-data/branches/{code}
     * Hapus branch (dengan proteksi jika masih ada division)
     */
    public function deleteBranch($code)
    {
        try {
            $branch = Branch::findOrFail($code);
            
            // Cek jika ada division yang terkait (restrict delete)
            if ($branch->divisions()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus cabang yang memiliki divisi'
                ], 400);
            }

            $branch->delete();

            return response()->json([
                'success' => true,
                'message' => 'Cabang berhasil dihapus'
            ], 200);

        } catch (Exception $e) {
            Log::error('Delete Branch Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus cabang'
            ], 500);
        }
    }

    /* ==================== DIVISIONS ==================== */
    
    /**
     * GET /api/master-data/divisions
     * List semua divisions dengan filter opsional
     */
    public function indexDivisions(Request $request)
    {
        try {
            $query = Division::with('branch.entity');
            
            // Filter by branch_code jika ada
            if ($request->has('branch_code')) {
                $query->where('branch_code', $request->branch_code);
            }
            
            // Filter by entity_code (via branch)
            if ($request->has('entity_code')) {
                $query->whereHas('branch', function($q) use ($request) {
                    $q->where('entity_code', $request->entity_code);
                });
            }
            
            $divisions = $query->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Data divisi berhasil diambil',
                'data' => $divisions
            ], 200);
        } catch (Exception $e) {
            Log::error('Get Divisions Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data divisi'
            ], 500);
        }
    }

    /**
     * POST /api/master-data/divisions
     * Tambah division baru
     */
    public function storeDivision(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'division_code' => 'required|string|max:50|unique:divisions,division_code',
                'branch_code' => 'required|exists:branches,branch_code',
                'name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $division = Division::create([
                'division_code' => strtoupper($request->division_code),
                'branch_code' => $request->branch_code,
                'name' => $request->name,
            ]);

            // Load relations untuk response
            $division->load('branch.entity');

            return response()->json([
                'success' => true,
                'message' => 'Divisi berhasil ditambahkan',
                'data' => $division
            ], 201);

        } catch (Exception $e) {
            Log::error('Store Division Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan divisi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT /api/master-data/divisions/{code}
     * Update division by division_code
     */
    public function updateDivision(Request $request, $code)
    {
        try {
            $division = Division::findOrFail($code);

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'branch_code' => 'required|exists:branches,branch_code',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $division->update([
                'name' => $request->name,
                'branch_code' => $request->branch_code,
            ]);

            $division->load('branch.entity');

            return response()->json([
                'success' => true,
                'message' => 'Divisi berhasil diperbarui',
                'data' => $division
            ], 200);

        } catch (Exception $e) {
            Log::error('Update Division Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui divisi'
            ], 500);
        }
    }

    /**
     * DELETE /api/master-data/divisions/{code}
     * Hapus division
     */
    public function deleteDivision($code)
    {
        try {
            $division = Division::findOrFail($code);
            $division->delete();

            return response()->json([
                'success' => true,
                'message' => 'Divisi berhasil dihapus'
            ], 200);

        } catch (Exception $e) {
            Log::error('Delete Division Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus divisi'
            ], 500);
        }
    }

    /* ==================== ROLES ==================== */
    
    /**
     * GET /api/master-data/roles
     * List semua roles dengan filter opsional
     */
    public function indexRoles()
    {
        try {
            $roles = \App\Models\Role::all();
            
            return response()->json([
                'success' => true,
                'message' => 'Data role berhasil diambil',
                'data' => $roles
            ], 200);
        } catch (Exception $e) {
            Log::error('Get Roles Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data role'
            ], 500);
        }
    }

    /**
     * POST /api/master-data/roles
     * Tambah role baru
     */
    public function storeRole(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'role_code' => 'required|string|max:50|unique:roles,role_code',
                'name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $role = \App\Models\Role::create([
                'role_code' => strtolower($request->role_code),
                'name' => $request->name,
                'is_active' => true,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Role berhasil ditambahkan',
                'data' => $role
            ], 201);

        } catch (Exception $e) {
            Log::error('Store Role Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan role: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT /api/master-data/roles/{code}
     * Update role by role_code
     */
    public function updateRole(Request $request, $code)
    {
        try {
            $role = \App\Models\Role::findOrFail($code);

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'is_active' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $role->update([
                'name' => $request->name,
                'is_active' => $request->has('is_active') ? $request->is_active : $role->is_active,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Role berhasil diperbarui',
                'data' => $role
            ], 200);

        } catch (Exception $e) {
            Log::error('Update Role Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui role'
            ], 500);
        }
    }

    /**
     * DELETE /api/master-data/roles/{code}
     * Hapus role
     */
    public function deleteRole($code)
    {
        try {
            $role = \App\Models\Role::findOrFail($code);
            
            // Cek jika ada user yang terkait (restrict delete)
            if (\App\Models\User::where('role_code', $code)->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus role karena masih digunakan oleh user'
                ], 400);
            }

            $role->delete();

            return response()->json([
                'success' => true,
                'message' => 'Role berhasil dihapus'
            ], 200);

        } catch (Exception $e) {
            Log::error('Delete Role Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus role'
            ], 500);
        }
    }

    /* ==================== ZONAS ==================== */
    
    public function indexZonas(Request $request)
    {
        try {
            if ($request->get('used_only') === 'true') {
                // Only return zonas that are referenced by subzonas that are actually used in barang
                $usedSubzonaCodes = \Illuminate\Support\Facades\DB::table('barang')
                    ->whereNotNull('subzona_code')
                    ->distinct()
                    ->pluck('subzona_code')
                    ->toArray();

                $usedZonaCodes = \Illuminate\Support\Facades\DB::table('subzona')
                    ->whereIn('subzona_code', $usedSubzonaCodes)
                    ->distinct()
                    ->pluck('zona_code')
                    ->toArray();

                $zonas = \Illuminate\Support\Facades\DB::table('zonas')
                    ->whereIn('zona_code', $usedZonaCodes)
                    ->get();
            } else {
                $query = \Illuminate\Support\Facades\DB::table('zonas');
                if ($request->has('branch_code')) {
                    $query->where('branch_code', $request->branch_code);
                }
                $zonas = $query->get();
            }
            return response()->json([
                'success' => true,
                'data' => $zonas
            ], 200);
        } catch (Exception $e) {
            Log::error('Get Zonas Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal mengambil data zona'], 500);
        }
    }

    public function storeZona(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'zona_code' => 'required|string|max:50|unique:zonas,zona_code',
                'branch_code' => 'nullable|exists:branches,branch_code',
                'name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => 'Validasi gagal', 'errors' => $validator->errors()], 422);
            }

            \Illuminate\Support\Facades\DB::table('zonas')->insert([
                'zona_code' => strtoupper($request->zona_code),
                'branch_code' => $request->branch_code ?: null,
                'name' => $request->name,
            ]);

            $zona = \Illuminate\Support\Facades\DB::table('zonas')->where('zona_code', strtoupper($request->zona_code))->first();

            return response()->json(['success' => true, 'message' => 'Zona berhasil ditambahkan', 'data' => $zona], 201);
        } catch (Exception $e) {
            Log::error('Store Zona Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal menambahkan zona: ' . $e->getMessage()], 500);
        }
    }

    public function updateZona(Request $request, $code)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'branch_code' => 'nullable|exists:branches,branch_code',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => 'Validasi gagal', 'errors' => $validator->errors()], 422);
            }

            \Illuminate\Support\Facades\DB::table('zonas')->where('zona_code', $code)->update([
                'name' => $request->name,
                'branch_code' => $request->branch_code ?: null,
            ]);

            $zona = \Illuminate\Support\Facades\DB::table('zonas')->where('zona_code', $code)->first();

            return response()->json(['success' => true, 'message' => 'Zona berhasil diperbarui', 'data' => $zona], 200);
        } catch (Exception $e) {
            Log::error('Update Zona Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal memperbarui zona'], 500);
        }
    }

    public function deleteZona($code)
    {
        try {
            if (\Illuminate\Support\Facades\DB::table('subzona')->where('zona_code', $code)->count() > 0) {
                return response()->json(['success' => false, 'message' => 'Tidak dapat menghapus zona yang memiliki subzona'], 400);
            }

            \Illuminate\Support\Facades\DB::table('zonas')->where('zona_code', $code)->delete();
            return response()->json(['success' => true, 'message' => 'Zona berhasil dihapus'], 200);
        } catch (Exception $e) {
            Log::error('Delete Zona Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal menghapus zona'], 500);
        }
    }

    /* ==================== SUBZONAS ==================== */
    
    public function indexSubzonas(Request $request)
    {
        try {
            if ($request->get('used_only') === 'true') {
                // Only return subzonas actually referenced in barang table
                $usedSubzonaCodes = \Illuminate\Support\Facades\DB::table('barang')
                    ->whereNotNull('subzona_code')
                    ->distinct()
                    ->pluck('subzona_code')
                    ->toArray();

                $subzonas = \Illuminate\Support\Facades\DB::table('subzona')
                    ->whereIn('subzona_code', $usedSubzonaCodes)
                    ->get();
            } else {
                $query = \Illuminate\Support\Facades\DB::table('subzona');
                if ($request->has('zona_code')) {
                    $query->where('zona_code', $request->zona_code);
                }
                $subzonas = $query->get();
            }
            return response()->json([
                'success' => true,
                'data' => $subzonas
            ], 200);
        } catch (Exception $e) {
            Log::error('Get Subzonas Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal mengambil data subzona'], 500);
        }
    }

    public function storeSubzona(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'subzona_code' => 'required|string|max:50|unique:subzona,subzona_code',
                'zona_code' => 'required|exists:zonas,zona_code',
                'name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => 'Validasi gagal', 'errors' => $validator->errors()], 422);
            }

            \Illuminate\Support\Facades\DB::table('subzona')->insert([
                'subzona_code' => strtoupper($request->subzona_code),
                'zona_code' => $request->zona_code,
                'name' => $request->name,
            ]);

            $subzona = \Illuminate\Support\Facades\DB::table('subzona')->where('subzona_code', strtoupper($request->subzona_code))->first();

            return response()->json(['success' => true, 'message' => 'Subzona berhasil ditambahkan', 'data' => $subzona], 201);
        } catch (Exception $e) {
            Log::error('Store Subzona Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal menambahkan subzona: ' . $e->getMessage()], 500);
        }
    }

    public function updateSubzona(Request $request, $code)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'zona_code' => 'required|exists:zonas,zona_code',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => 'Validasi gagal', 'errors' => $validator->errors()], 422);
            }

            \Illuminate\Support\Facades\DB::table('subzona')->where('subzona_code', $code)->update([
                'name' => $request->name,
                'zona_code' => $request->zona_code,
            ]);

            $subzona = \Illuminate\Support\Facades\DB::table('subzona')->where('subzona_code', $code)->first();

            return response()->json(['success' => true, 'message' => 'Subzona berhasil diperbarui', 'data' => $subzona], 200);
        } catch (Exception $e) {
            Log::error('Update Subzona Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal memperbarui subzona'], 500);
        }
    }

    public function deleteSubzona($code)
    {
        try {
            if (\Illuminate\Support\Facades\DB::table('barang')->where('subzona_code', $code)->count() > 0) {
                return response()->json(['success' => false, 'message' => 'Tidak dapat menghapus subzona karena masih digunakan oleh aset'], 400);
            }

            \Illuminate\Support\Facades\DB::table('subzona')->where('subzona_code', $code)->delete();
            return response()->json(['success' => true, 'message' => 'Subzona berhasil dihapus'], 200);
        } catch (Exception $e) {
            Log::error('Delete Subzona Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal menghapus subzona'], 500);
        }
    }

    /* ==================== DEVICES (KATEGORI) ==================== */

    public function indexDevices()
    {
        try {
            $devices = \Illuminate\Support\Facades\DB::table('device')->get();
            return response()->json([
                'success' => true,
                'data' => $devices
            ], 200);
        } catch (Exception $e) {
            Log::error('Get Devices Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal mengambil data perangkat'], 500);
        }
    }

    public function storeDevice(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'device_code' => 'required|string|max:50|unique:device,device_code',
                'name' => 'required|string|max:255',
                'branch_code' => 'nullable|string|max:100',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => 'Validasi gagal', 'errors' => $validator->errors()], 422);
            }

            \Illuminate\Support\Facades\DB::table('device')->insert([
                'device_code' => strtoupper($request->device_code),
                'name' => strtoupper($request->name),
                'branch_code' => $request->branch_code,
                'is_active' => true,
                'created_at' => \Carbon\Carbon::now(),
            ]);

            $device = \Illuminate\Support\Facades\DB::table('device')->where('device_code', strtoupper($request->device_code))->first();

            return response()->json(['success' => true, 'message' => 'Kategori perangkat berhasil ditambahkan', 'data' => $device], 201);
        } catch (Exception $e) {
            Log::error('Store Device Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal menambahkan kategori perangkat: ' . $e->getMessage()], 500);
        }
    }

    public function updateDevice(Request $request, $code)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'branch_code' => 'nullable|string|max:100',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => 'Validasi gagal', 'errors' => $validator->errors()], 422);
            }

            \Illuminate\Support\Facades\DB::table('device')->where('device_code', $code)->update([
                'name' => strtoupper($request->name),
                'branch_code' => $request->branch_code,
            ]);

            $device = \Illuminate\Support\Facades\DB::table('device')->where('device_code', $code)->first();

            return response()->json(['success' => true, 'message' => 'Kategori perangkat berhasil diperbarui', 'data' => $device], 200);
        } catch (Exception $e) {
            Log::error('Update Device Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal memperbarui kategori perangkat'], 500);
        }
    }

    public function deleteDevice($code)
    {
        try {
            if (\Illuminate\Support\Facades\DB::table('assets')->where('device_code', $code)->count() > 0) {
                return response()->json(['success' => false, 'message' => 'Tidak dapat menghapus kategori karena masih digunakan oleh aset'], 400);
            }

            \Illuminate\Support\Facades\DB::table('device')->where('device_code', $code)->delete();
            return response()->json(['success' => true, 'message' => 'Kategori perangkat berhasil dihapus'], 200);
        } catch (Exception $e) {
            Log::error('Delete Device Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal menghapus kategori perangkat'], 500);
        }
    }

    /* ==================== COMBINED MASTER DATA ==================== */
    /**
     * GET /api/master-data
     * Endpoint khusus untuk Auth.jsx - ambil semua data sekaligus
     */
    public function getMasterData()
    {
        try {
            // Ambil entities dengan nested branches & divisions
            // Kita tidak memfilter entity by is_active di sini agar dropdown registrasi tetap aman 
            // jika ada entity lama yang belum diupdate kolom is_active-nya
            $entities = Entity::with([
                'branches' => function($query) {
                    $query->with('divisions')->where('is_active', true);
                }
            ])->get();
            
            // Ambil roles
            $roles = \App\Models\Role::select('role_code', 'name')->where('is_active', true)->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Master data berhasil diambil',
                'data' => [
                    'entities' => $entities,
                    'roles' => $roles,
                ]
            ], 200);
            
        } catch (Exception $e) {
            Log::error('Get Master Data Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil master data: ' . $e->getMessage(),
                'data' => [
                    'entities' => [],
                    'roles' => []
                ]
            ], 500);
        }
    }
}