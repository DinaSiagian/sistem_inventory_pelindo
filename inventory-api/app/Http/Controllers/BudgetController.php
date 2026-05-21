<?php

namespace App\Http\Controllers;

use App\Models\BudgetMaster;
use App\Models\BudgetAnnualOpex;
use App\Models\BudgetAnnualCapex;
use App\Models\BudgetProject;
use App\Models\BudgetItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Exception;

class BudgetController extends Controller
{
    // ══════════════════════════════════════════════════════
    //  OPEX ENDPOINTS
    // ══════════════════════════════════════════════════════

    /**
     * GET /api/budget/opex
     */
    public function indexOpex()
    {
        try {
            $items = BudgetAnnualOpex::orderBy('id_anggaran_tahunan')->get();
            $data  = $items->map(fn($item) => $this->formatOpex($item));
            return response()->json(['success' => true, 'data' => $data]);
        } catch (Exception $e) {
            Log::error('Get OPEX Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * POST /api/budget/opex
     */
    public function storeOpex(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nama'         => 'required|string|max:255',
                'thn_anggaran' => 'required|integer|min:2000|max:2099',
                'nilai_kad'    => 'required|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $kd = $request->kode ?? 'OPEX-MISC';
            $this->ensureBudgetMasterExists($kd, $request->nama, 'OPEX');

            $item = BudgetAnnualOpex::create([
                'kd_anggaran_master'     => $kd,
                'thn_anggaran'           => $request->thn_anggaran,
                'nm_anggaran'            => $request->nama,
                'nilai_anggaran'         => $request->nilai_kad,
                'nilai_anggaran_tahunan' => $request->nilai_kad,
                'projects_json'          => $request->projects ?? [],
                'items_json'             => $request->assets   ?? [],
                // realisasi_tahunan TIDAK disentuh — milik BudgetInput.jsx
            ]);

            return response()->json(['success' => true, 'data' => $this->formatOpex($item)], 201);
        } catch (Exception $e) {
            Log::error('Store OPEX Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * PUT /api/budget/opex/{id}
     * Update anggaran + projects + assets sekaligus
     */
    public function updateOpex(Request $request, $id)
    {
        try {
            $item = BudgetAnnualOpex::findOrFail($id);

            $updates = [];
            if ($request->has('nama'))         $updates['nm_anggaran']            = $request->nama;
            if ($request->has('kode'))         $updates['kd_anggaran_master']     = $request->kode;
            if ($request->has('thn_anggaran')) $updates['thn_anggaran']           = $request->thn_anggaran;
            if ($request->has('nilai_kad')) {
                $updates['nilai_anggaran']         = $request->nilai_kad;
                $updates['nilai_anggaran_tahunan'] = $request->nilai_kad;
            }
            if ($request->has('projects')) $updates['projects_json'] = $request->projects;
            if ($request->has('assets'))   $updates['items_json']    = $request->assets;
            // realisasi_tahunan TIDAK disentuh — dikelola oleh BudgetInput.jsx

            $item->update($updates);

            return response()->json(['success' => true, 'data' => $this->formatOpex($item->fresh())]);
        } catch (Exception $e) {
            Log::error('Update OPEX Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * DELETE /api/budget/opex/{id}
     */
    public function destroyOpex($id)
    {
        try {
            BudgetAnnualOpex::findOrFail($id)->delete();
            return response()->json(['success' => true, 'message' => 'OPEX berhasil dihapus']);
        } catch (Exception $e) {
            Log::error('Delete OPEX Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ══════════════════════════════════════════════════════
    //  CAPEX ENDPOINTS
    // ══════════════════════════════════════════════════════

    /**
     * GET /api/budget/capex
     */
    public function indexCapex()
    {
        try {
            $items = BudgetAnnualCapex::orderBy('kd_anggaran_capex')->get();
            $data  = $items->map(fn($item) => $this->formatCapex($item));
            return response()->json(['success' => true, 'data' => $data]);
        } catch (Exception $e) {
            Log::error('Get CAPEX Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * POST /api/budget/capex
     */
    public function storeCapex(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nm_anggaran'    => 'required|string|max:255',
                'thn_rkap_awal'  => 'required|integer|min:2000|max:2099',
                'thn_rkap_akhir' => 'required|integer|min:2000|max:2099',
                'thn_anggaran'   => 'required|integer|min:2000|max:2099',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            // Generate atau gunakan kd_capex yang dikirim
            $kdCapex = $request->kd_capex;
            if (!$kdCapex) {
                $kdCapex = 'CAPEX-' . strtoupper(substr(md5(uniqid()), 0, 8));
            }
            while (BudgetAnnualCapex::where('kd_anggaran_capex', $kdCapex)->exists()) {
                $kdCapex = 'CAPEX-' . strtoupper(substr(md5(uniqid()), 0, 8));
            }

            $kdMaster = '5900100000';
            $this->ensureBudgetMasterExists($kdMaster, 'Beban Investasi', 'CAPEX');

            $item = BudgetAnnualCapex::create([
                'kd_anggaran_capex'   => $kdCapex,
                'kd_anggaran_master'  => $kdMaster,
                'nm_anggaran_capex'   => $request->nm_anggaran,
                'thn_rkap_awal'       => $request->thn_rkap_awal,
                'thn_rkap_akhir'      => $request->thn_rkap_akhir,
                'thn_anggaran'        => $request->thn_anggaran,
                'nilai_anggaran_kad'  => $request->nilai_kad  ?? 0,
                'nilai_anggaran_rkap' => $request->nilai_rkap ?? 0,
                'nm_master'           => 'Beban Investasi',
                'anggaran_tahunan'    => $request->anggaran_tahunan  ?? [],
                'history_anggaran'    => $request->history_anggaran  ?? [],
                'pekerjaan'           => $request->projects          ?? [],
                'assets_json'         => $request->assets            ?? [],
            ]);

            return response()->json(['success' => true, 'data' => $this->formatCapex($item)], 201);
        } catch (Exception $e) {
            Log::error('Store CAPEX Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * PUT /api/budget/capex/{kd}
     * Update anggaran + projects + assets sekaligus
     */
    public function updateCapex(Request $request, $kd)
    {
        try {
            $item    = BudgetAnnualCapex::findOrFail($kd);
            $updates = [];

            if ($request->has('nm_anggaran'))      $updates['nm_anggaran_capex']   = $request->nm_anggaran;
            if ($request->has('kd_capex'))          $updates['kd_anggaran_capex']   = $request->kd_capex;
            if ($request->has('thn_rkap_awal'))     $updates['thn_rkap_awal']       = $request->thn_rkap_awal;
            if ($request->has('thn_rkap_akhir'))    $updates['thn_rkap_akhir']      = $request->thn_rkap_akhir;
            if ($request->has('thn_anggaran'))      $updates['thn_anggaran']        = $request->thn_anggaran;
            if ($request->has('nilai_kad'))         $updates['nilai_anggaran_kad']  = $request->nilai_kad;
            if ($request->has('nilai_rkap'))        $updates['nilai_anggaran_rkap'] = $request->nilai_rkap;
            if ($request->has('anggaran_tahunan'))  $updates['anggaran_tahunan']    = $request->anggaran_tahunan;
            if ($request->has('history_anggaran'))  $updates['history_anggaran']    = $request->history_anggaran;
            if ($request->has('projects'))          $updates['pekerjaan']           = $request->projects;
            if ($request->has('assets'))            $updates['assets_json']         = $request->assets;

            $item->update($updates);

            return response()->json(['success' => true, 'data' => $this->formatCapex($item->fresh())]);
        } catch (Exception $e) {
            Log::error('Update CAPEX Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * DELETE /api/budget/capex/{kd}
     */
    public function destroyCapex($kd)
    {
        try {
            BudgetAnnualCapex::findOrFail($kd)->delete();
            return response()->json(['success' => true, 'message' => 'CAPEX berhasil dihapus']);
        } catch (Exception $e) {
            Log::error('Delete CAPEX Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ══════════════════════════════════════════════════════
    //  PROJECT ENDPOINTS (budget_projects table)
    // ══════════════════════════════════════════════════════

    /**
     * POST /api/budget/capex/{kd}/projects  — tambah project ke CAPEX
     * POST /api/budget/opex/{id}/projects   — tambah project ke OPEX
     */
    public function storeProject(Request $request, $parentId, $type = 'capex')
    {
        try {
            $data = [
                'jenis_anggaran' => $type,
                'nm_pekerjaan'   => $request->nm_pekerjaan ?? '',
                'nilai_rab'      => $request->nilai_rab      ?? 0,
                'nilai_kontrak'  => $request->nilai_kontrak  ?? 0,
                'no_pr'          => $request->no_pr          ?? '',
                'no_po'          => $request->no_po          ?? '',
                'no_kontrak'     => $request->no_kontrak     ?? '',
                'tgl_kontrak'    => $request->tgl_kontrak    ?: null,
                'durasi_kontrak' => $request->durasi_kontrak ?? 1,
                'no_sp3'         => $request->no_sp3         ?? '',
                'tgl_sp3'        => $request->tgl_sp3        ?: null,
                'tgl_bamk'       => $request->tgl_bamk       ?: null,
                'keterangan'     => $request->keterangan     ?? '',
            ];

            if ($type === 'capex') {
                $data['id_anggaran_tahunan'] = $parentId;
            } else {
                $data['id_opex'] = (int) $parentId;
            }

            $project = BudgetProject::create($data);

            return response()->json(['success' => true, 'data' => $this->formatProject($project)], 201);
        } catch (Exception $e) {
            Log::error('Store Project Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * PUT /api/budget/projects/{id}  — edit project
     */
    public function updateProject(Request $request, $id)
    {
        try {
            $project = BudgetProject::findOrFail($id);
            $allowed = ['nm_pekerjaan','nilai_rab','nilai_kontrak','no_pr','no_po',
                        'no_kontrak','tgl_kontrak','durasi_kontrak','no_sp3',
                        'tgl_sp3','tgl_bamk','keterangan'];
            $updates = [];
            foreach ($allowed as $field) {
                if ($request->has($field)) {
                    $updates[$field] = $request->$field ?: ($field === 'nm_pekerjaan' ? '' : null);
                }
            }
            $project->update($updates);
            return response()->json(['success' => true, 'data' => $this->formatProject($project->fresh())]);
        } catch (Exception $e) {
            Log::error('Update Project Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * DELETE /api/budget/projects/{id}  — hapus project + items (cascade)
     */
    public function destroyProject($id)
    {
        try {
            BudgetProject::findOrFail($id)->delete();
            return response()->json(['success' => true, 'message' => 'Pekerjaan berhasil dihapus']);
        } catch (Exception $e) {
            Log::error('Delete Project Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ══════════════════════════════════════════════════════
    //  ASSET/ITEM SYNC ENDPOINTS (budget_items table)
    // ══════════════════════════════════════════════════════

    /**
     * PUT /api/budget/capex/{kd}/sync-assets
     * PUT /api/budget/opex/{id}/sync-assets
     *
     * Kirim seluruh array assets → server hapus lama, insert baru.
     * Setiap asset harus punya id_pekerjaan = DB integer id_pekerjaan.
     */
    public function syncAssets(Request $request, $parentId, $type = 'capex')
    {
        DB::beginTransaction();
        try {
            $assets = $request->assets ?? [];
            Log::info("Sync Assets called for $type Parent: $parentId. Items: " . count($assets));

            // Ambil semua project DB milik parent ini
            $query = BudgetProject::where('jenis_anggaran', $type);
            if ($type === 'capex') {
                $query->where('id_anggaran_tahunan', $parentId);
            } else {
                $query->where('id_opex', (int) $parentId);
            }
            $projectIds = $query->pluck('id_pekerjaan')->toArray();

            // Disassociate all current assets and units of these projects by setting id_pekerjaan to null
            if (!empty($projectIds)) {
                DB::table('assets')->whereIn('id_pekerjaan', $projectIds)->update(['id_pekerjaan' => null]);
                DB::table('barang')->whereIn('id_pekerjaan', $projectIds)->update(['id_pekerjaan' => null]);
            }

            // Hapus semua items lama
            if (!empty($projectIds)) {
                BudgetItem::whereIn('id_pekerjaan', $projectIds)->delete();
            }

            // Insert items baru
            $inserted = [];
            foreach ($assets as $ast) {
                $projId = (int) ($ast['id_pekerjaan'] ?? 0);
                
                // Skip jika id_pekerjaan tidak valid atau tidak milik parent ini
                if (!$projId || !in_array($projId, $projectIds)) {
                    Log::warning("Skipping asset entry: ProjID $projId not in " . implode(',', $projectIds));
                    continue;
                }

                // Skip completely if the asset is empty/invalid (no name and no category/device)
                $name = trim($ast['name'] ?? '');
                $category = trim($ast['category'] ?? '');
                if (empty($name) && empty($category)) {
                    Log::warning("Skipping empty/invalid asset entry.");
                    continue;
                }

                // Generate or use existing asset_code
                $assetCode = $ast['asset_code'] ?? null;

                if (empty($assetCode)) {
                    $assetCode = 'AST-' . strtoupper(uniqid());
                }

                // Ensure device exists
                $deviceCode = $ast['category'] ?? 'GEN';
                $deviceExists = DB::table('device')->where('device_code', $deviceCode)->exists();
                if (!$deviceExists) {
                    DB::table('device')->insert([
                        'device_code' => $deviceCode,
                        'name' => $deviceCode,
                        'is_active' => true,
                        'created_at' => \Carbon\Carbon::now(),
                    ]);
                }

                // Validation check for single-unit asset already assigned to another project
                $existingAsset = DB::table('assets')->where('asset_code', $assetCode)->first();
                if ($existingAsset && !empty($existingAsset->id_pekerjaan)) {
                    if ($existingAsset->id_pekerjaan != $projId) {
                        $unitCount = DB::table('barang')->where('asset_code', $assetCode)->count();
                        if ($unitCount <= 1) {
                            throw new \Exception("Aset '" . ($existingAsset->name ?: $assetCode) . "' sudah dialokasikan ke pekerjaan lain dan hanya memiliki 1 unit barang.");
                        }
                    }
                }

                // Upsert to assets table
                DB::table('assets')->updateOrInsert(
                    ['asset_code' => $assetCode],
                    [
                        'name' => $ast['name'] ?? '-',
                        'device_code' => $deviceCode,
                        'id_pekerjaan' => $projId,
                        'acquisition_value' => $ast['acquisition_value'] ?? 0,
                        'procurement_date' => $ast['procurement_date'] ?: null,
                        'updated_at' => \Carbon\Carbon::now()
                    ]
                );

                // Insert into budget_items
                $item = BudgetItem::create([
                    'id_pekerjaan' => $projId,
                    'jumlah'       => $ast['jumlah'] ?? 1,
                    'asset_code'   => $assetCode,
                    'keterangan'   => $ast['keterangan'] ?? null,
                    'created_at'   => \Carbon\Carbon::now(),
                ]);

                // Fetch existing units of this asset to find which ones to delete/update
                $existingUnits = DB::table('barang')->where('asset_code', $assetCode)->get();
                $incomingSns = [];

                if (!empty($ast['units']) && is_array($ast['units'])) {
                    foreach ($ast['units'] as $idx => $u) {
                        $sn = !empty($u['serialNumber']) ? trim($u['serialNumber']) : null;
                        if (empty($sn)) {
                            $sn = $assetCode . '-SN-' . str_pad($idx + 1, 3, '0', STR_PAD_LEFT);
                        }
                        $incomingSns[] = $sn;

                        $subzonaCode = $this->resolveSubzonaCode($u['location'] ?? null);
                        Log::info("Syncing unit: $sn", ['location_in' => $u['location'] ?? null, 'resolved' => $subzonaCode]);

                        // Check if this unit already exists in the DB
                        $exists = DB::table('barang')->where('serial_number', $sn)->first();
                        if (!$exists) {
                            DB::table('barang')->insert([
                                'asset_code' => $assetCode,
                                'serial_number' => $sn,
                                'subzona_code' => $subzonaCode,
                                'id_pekerjaan' => $projId,
                                'created_at' => \Carbon\Carbon::now(),
                            ]);
                        } else {
                            // Update it only if it is unassigned or already belongs to this project
                            if (empty($exists->id_pekerjaan) || $exists->id_pekerjaan == $projId) {
                                DB::table('barang')->where('serial_number', $sn)->update([
                                    'subzona_code' => $subzonaCode,
                                    'id_pekerjaan' => $projId,
                                ]);
                            }
                        }
                    }
                }



                $inserted[] = $this->formatItem($item);
            }

            DB::commit();
            return response()->json(['success' => true, 'data' => $inserted]);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Sync Assets Error: ' . $e->getMessage() . " at " . $e->getFile() . ":" . $e->getLine());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    private function generateSmartCode($name) {
        $upper = strtoupper(trim($name));
        if (preg_match('/LANTAI\s*(\d+)/i', $upper, $matches)) return 'LT' . substr($matches[1], 0, 1);
        if (strpos($upper, 'GEDUNG') !== false) return 'GDG';
        if (strpos($upper, 'LAPANGAN') !== false) return 'LPG';
        if (strpos($upper, 'DERMAGA') !== false) return 'DMG';
        if (strpos($upper, 'RUANG SERVER') !== false || strpos($upper, 'SERVER') !== false) return 'SRV';
        if (strpos($upper, 'DATA CENTER') !== false) return 'DTC';
        
        $words = preg_split('/[\s\-]+/', $upper);
        if (count($words) >= 3) {
            $code = substr($words[0], 0, 1) . substr($words[1], 0, 1) . substr($words[2], 0, 1);
        } elseif (count($words) == 2) {
            $code = substr($words[0], 0, 2) . substr($words[1], 0, 1);
        } else {
            $code = substr(preg_replace('/[^A-Z0-9]/', '', $upper), 0, 3);
        }
        return str_pad($code, 3, 'X');
    }

    private function resolveSubzonaCode($location, $fallback = null)
    {
        if (empty($location)) return $fallback;

        $parts = array_map('trim', explode('/', $location));
        $subzonaName = end($parts);

        if (empty($subzonaName)) return $fallback;

        // Hierarchical resolution if full path is provided (creates missing nodes)
        if (count($parts) >= 3) {
            $branchName = $parts[0];
            $zonaName = $parts[1];

            // 1. Resolve or create branch
            $branch = DB::table('branches')->where('name', $branchName)->first();
            if (!$branch) {
                $branchCode = $this->generateSmartCode($branchName);
                $suffix = 1;
                $originalBranchCode = $branchCode;
                while (DB::table('branches')->where('branch_code', $branchCode)->exists()) {
                    $branchCode = $originalBranchCode . $suffix;
                    $suffix++;
                }

                $entity = DB::table('entities')->where('is_active', true)->first();
                $entityCode = $entity ? $entity->entity_code : 'SPMT';

                DB::table('branches')->insert([
                    'branch_code' => $branchCode,
                    'entity_code' => $entityCode,
                    'name'        => $branchName,
                    'is_active'   => true,
                    'created_at'  => \Carbon\Carbon::now(),
                    'updated_at'  => \Carbon\Carbon::now(),
                ]);

                $branch = DB::table('branches')->where('branch_code', $branchCode)->first();
            }
            $branchCode = $branch->branch_code;

            // 2. Resolve or create zona
            $zona = DB::table('zonas')
                ->where('name', $zonaName)
                ->where('branch_code', $branchCode)
                ->first();
            if (!$zona) {
                $zonaShort = $this->generateSmartCode($zonaName);
                $zonaCode = $branchCode . '-' . $zonaShort;
                $suffix = 1;
                $originalZonaCode = $zonaCode;
                while (DB::table('zonas')->where('zona_code', $zonaCode)->exists()) {
                    $zonaCode = $originalZonaCode . $suffix;
                    $suffix++;
                }

                DB::table('zonas')->insert([
                    'zona_code'   => $zonaCode,
                    'branch_code' => $branchCode,
                    'name'        => $zonaName,
                ]);

                $zona = DB::table('zonas')->where('zona_code', $zonaCode)->first();
            }
            $zonaCode = $zona->zona_code;

            // 3. Resolve or create subzona
            $sub = DB::table('subzona')
                ->where('name', $subzonaName)
                ->where('zona_code', $zonaCode)
                ->first();
            if ($sub) return $sub->subzona_code;

            $byCode = DB::table('subzona')
                ->where('subzona_code', $subzonaName)
                ->where('zona_code', $zonaCode)
                ->first();
            if ($byCode) return $byCode->subzona_code;

            // Create subzona
            $subShort = $this->generateSmartCode($subzonaName);
            $subCode = $zonaCode . '-' . $subShort;
            $suffix = 1;
            $originalSubCode = $subCode;
            while (DB::table('subzona')->where('subzona_code', $subCode)->exists()) {
                $subCode = $originalSubCode . $suffix;
                $suffix++;
            }

            DB::table('subzona')->insert([
                'subzona_code' => $subCode,
                'zona_code'    => $zonaCode,
                'name'         => $subzonaName,
            ]);

            return $subCode;
        }

        // Fallback for short location strings: search or create under default branch/zona
        $sub = DB::table('subzona')->where('name', $subzonaName)->first();
        if ($sub) return $sub->subzona_code;

        $byCode = DB::table('subzona')->where('subzona_code', $subzonaName)->first();
        if ($byCode) return $byCode->subzona_code;

        // Create under default/first branch and zona
        $branch = DB::table('branches')->first();
        if (!$branch) {
            $branchCode = 'BLW';
            $entity = DB::table('entities')->first();
            $entityCode = $entity ? $entity->entity_code : 'SPMT';
            DB::table('branches')->insert([
                'branch_code' => $branchCode,
                'entity_code' => $entityCode,
                'name'        => 'Belawan',
                'is_active'   => true,
                'created_at'  => \Carbon\Carbon::now(),
                'updated_at'  => \Carbon\Carbon::now(),
            ]);
            $branch = DB::table('branches')->first();
        }
        $branchCode = $branch->branch_code;

        $zona = DB::table('zonas')->where('branch_code', $branchCode)->first();
        if (!$zona) {
            $zonaCode = $branchCode . '-GDG';
            DB::table('zonas')->insert([
                'zona_code'   => $zonaCode,
                'branch_code' => $branchCode,
                'name'        => 'Gedung',
            ]);
            $zona = DB::table('zonas')->where('zona_code', $zonaCode)->first();
        }
        $zonaCode = $zona->zona_code;

        $subShort = $this->generateSmartCode($subzonaName);
        $subCode = $zonaCode . '-' . $subShort;
        $suffix = 1;
        $originalSubCode = $subCode;
        while (DB::table('subzona')->where('subzona_code', $subCode)->exists()) {
            $subCode = $originalSubCode . $suffix;
            $suffix++;
        }

        DB::table('subzona')->insert([
            'subzona_code' => $subCode,
            'zona_code'    => $zonaCode,
            'name'         => $subzonaName,
        ]);

        return $subCode;
    }

    private function getFullLocationString($subzonaCode)
    {
        if (empty($subzonaCode)) return '';

        $loc = DB::table('subzona')
            ->join('zonas', 'subzona.zona_code', '=', 'zonas.zona_code')
            ->join('branches', 'zonas.branch_code', '=', 'branches.branch_code')
            ->where('subzona.subzona_code', $subzonaCode)
            ->select('subzona.name as sub', 'zonas.name as zon', 'branches.name as br')
            ->first();

        if ($loc) {
            return $loc->br . ' / ' . $loc->zon . ' / ' . $loc->sub;
        }

        return $subzonaCode;
    }


    // ══════════════════════════════════════════════════════
    //  HELPERS
    // ══════════════════════════════════════════════════════

    private function ensureBudgetMasterExists(string $kd, string $nama, string $tipe): void
    {
        BudgetMaster::firstOrCreate(
            ['kd_anggaran_master' => $kd],
            ['nm_anggaran_master' => $nama, 'tipe_anggaran_master' => $tipe]
        );
    }

    // Typed wrappers so routes can be named specifically
    public function storeProjectCapex(Request $r, $kd)  { return $this->storeProject($r, $kd,  'capex'); }
    public function storeProjectOpex(Request $r,  $id)  { return $this->storeProject($r, $id,  'opex');  }
    public function syncAssetsCapex(Request $r,   $kd)  { return $this->syncAssets($r,   $kd,  'capex'); }
    public function syncAssetsOpex(Request $r,    $id)  { return $this->syncAssets($r,   $id,  'opex');  }

    private function formatOpex(BudgetAnnualOpex $item): array
    {
        // Load projects dari budget_projects table
        $projects = BudgetProject::where('jenis_anggaran', 'opex')
            ->where('id_opex', $item->id_anggaran_tahunan)
            ->get();

        $projectIds = $projects->pluck('id_pekerjaan')->toArray();

        // Load assets dari budget_items table (flat, dengan id_pekerjaan)
        $assets = $projectIds
            ? BudgetItem::whereIn('id_pekerjaan', $projectIds)->get()
                ->map(fn($i) => $this->formatItem($i))->values()->toArray()
            : [];

        return [
            'id'           => (string) $item->id_anggaran_tahunan,
            'db_id'        => $item->id_anggaran_tahunan,
            'kode'         => $item->kd_anggaran_master ?? '',
            'kd'           => $item->kd_anggaran_master ?? '', // Legacy key for Budgetinput.jsx
            'nama'         => $item->nm_anggaran ?? '',
            'thn_anggaran' => (int) $item->thn_anggaran,
            'nilai_kad'    => (float) ($item->nilai_anggaran ?? 0),
            'nilai_anggaran' => (float) ($item->nilai_anggaran ?? 0), // Legacy key for Budgetinput.jsx
            'type'         => 'opex',
            'projects'     => $projects->map(fn($p) => $this->formatProject($p))->values()->toArray(),
            'assets'       => $assets,
        ];
    }

    private function formatCapex(BudgetAnnualCapex $item): array
    {
        // Load projects dari budget_projects table
        $projects = BudgetProject::where('jenis_anggaran', 'capex')
            ->where('id_anggaran_tahunan', $item->kd_anggaran_capex)
            ->get();

        $projectIds = $projects->pluck('id_pekerjaan')->toArray();

        // Load assets flat dengan id_pekerjaan
        $assets = $projectIds
            ? BudgetItem::whereIn('id_pekerjaan', $projectIds)->get()
                ->map(fn($i) => $this->formatItem($i))->values()->toArray()
            : [];

        return [
            'id'               => $item->kd_anggaran_capex,
            'kode'             => $item->kd_anggaran_capex,
            'kd_capex'         => $item->kd_anggaran_capex, // Legacy key for Budgetinput.jsx
            'db_kd'            => $item->kd_anggaran_capex,
            'kd_master'        => $item->kd_anggaran_master ?? '5900100000',
            'nm_master'        => $item->nm_master ?? 'Beban Investasi',
            'nama'             => $item->nm_anggaran_capex ?? '',
            'nm_anggaran'      => $item->nm_anggaran_capex ?? '', // Legacy key for Budgetinput.jsx
            'thn_rkap_awal'    => (int) $item->thn_rkap_awal,
            'thn_rkap_akhir'   => (int) $item->thn_rkap_akhir,
            'thn_anggaran'     => (int) $item->thn_anggaran,
            'nilai_kad'        => (float) ($item->nilai_anggaran_kad  ?? 0),
            'nilai_rkap'       => (float) ($item->nilai_anggaran_rkap ?? 0),
            'type'             => 'capex',
            'anggaran_tahunan' => $item->anggaran_tahunan ?? [],
            'history_anggaran' => $item->history_anggaran ?? [],
            'projects'         => $projects->map(fn($p) => $this->formatProject($p))->values()->toArray(),
            'assets'           => $assets,
        ];
    }

    private function formatProject(BudgetProject $p): array
    {
        return [
            'id'             => $p->id_pekerjaan,   // integer DB ID
            'nm_pekerjaan'   => $p->nm_pekerjaan   ?? '',
            'nilai_rab'      => (float) ($p->nilai_rab     ?? 0),
            'nilai_kontrak'  => (float) ($p->nilai_kontrak ?? 0),
            'no_pr'          => $p->no_pr          ?? '',
            'no_po'          => $p->no_po          ?? '',
            'no_kontrak'     => $p->no_kontrak     ?? '',
            'tgl_kontrak'    => $p->tgl_kontrak    ?? '',
            'durasi_kontrak' => (int) ($p->durasi_kontrak ?? 1),
            'no_sp3'         => $p->no_sp3         ?? '',
            'tgl_sp3'        => $p->tgl_sp3        ?? '',
            'tgl_bamk'       => $p->tgl_bamk       ?? '',
            'keterangan'     => $p->keterangan     ?? '',
        ];
    }

    private function formatItem(BudgetItem $i): array
    {
        $assetCode = $i->asset_code;
        $asset = $assetCode ? DB::table('assets')->where('asset_code', $assetCode)->first() : null;
        
        $units = $assetCode ? DB::table('barang')
            ->where('asset_code', $assetCode)
            ->where('id_pekerjaan', $i->id_pekerjaan)
            ->get() : collect();
        $unitsArray = $units->map(function ($u) {
            return [
                'serialNumber' => $u->serial_number,
                'location' => $this->getFullLocationString($u->subzona_code),
                'id_pekerjaan' => $u->id_pekerjaan
            ];
        })->toArray();

        return [
            'id'                => $i->id_item,
            'id_pekerjaan'      => $i->id_pekerjaan,
            'name'              => $asset ? $asset->name : '',
            'model'             => $asset ? $asset->name : '', // using name as model
            'category'          => $asset ? $asset->device_code : '',
            'jumlah'            => (int) ($i->jumlah ?? 1),
            'acquisition_value' => (float) ($asset ? $asset->acquisition_value : 0),
            'procurement_date'  => $asset ? $asset->procurement_date : '',
            'asset_code'        => $assetCode ?? '',
            'keterangan'        => $i->keterangan ?? '',
            'units'             => $unitsArray,
        ];
    }
}
