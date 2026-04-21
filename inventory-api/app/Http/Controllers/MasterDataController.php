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
    
    public function indexEntities()
    {
        try {
            $entities = Entity::withCount('branches')->get();
            return response()->json([
                'success' => true,
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

    public function storeEntity(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'entity_code' => 'required|string|max:255|unique:entities,entity_code',
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

    public function deleteEntity($code)
    {
        try {
            $entity = Entity::findOrFail($code);
            
            // Cek jika ada branch yang terkait
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
    
    public function indexBranches(Request $request)
    {
        try {
            $query = Branch::with(['entity', 'divisions']);
            
            // Filter by entity jika ada
            if ($request->has('entity_code')) {
                $query->where('entity_code', $request->entity_code);
            }
            
            $branches = $query->withCount('divisions')->get();
            
            return response()->json([
                'success' => true,
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

    public function storeBranch(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'branch_code' => 'required|string|max:255|unique:branches,branch_code',
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

            return response()->json([
                'success' => true,
                'message' => 'Cabang berhasil diperbarui',
                'data' => $branch->load(['entity', 'divisions'])
            ], 200);

        } catch (Exception $e) {
            Log::error('Update Branch Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui cabang'
            ], 500);
        }
    }

    public function deleteBranch($code)
    {
        try {
            $branch = Branch::findOrFail($code);
            
            // Cek jika ada division yang terkait
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
    
    public function indexDivisions(Request $request)
    {
        try {
            $query = Division::with('branch.entity');
            
            // Filter by branch jika ada
            if ($request->has('branch_code')) {
                $query->where('branch_code', $request->branch_code);
            }
            
            $divisions = $query->get();
            
            return response()->json([
                'success' => true,
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

    public function storeDivision(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'division_code' => 'required|string|max:255|unique:divisions,division_code',
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

            return response()->json([
                'success' => true,
                'message' => 'Divisi berhasil ditambahkan',
                'data' => $division->load('branch.entity')
            ], 201);

        } catch (Exception $e) {
            Log::error('Store Division Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan divisi: ' . $e->getMessage()
            ], 500);
        }
    }

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

            return response()->json([
                'success' => true,
                'message' => 'Divisi berhasil diperbarui',
                'data' => $division->load('branch.entity')
            ], 200);

        } catch (Exception $e) {
            Log::error('Update Division Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui divisi'
            ], 500);
        }
    }

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
}