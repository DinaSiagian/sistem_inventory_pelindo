<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BarangController extends Controller
{
    public function index()
    {
        try {
            $assets = DB::table('assets')->get();
            $barang = DB::table('barang')->get();
            $specs = DB::table('asset_specifications')->get();
            
            // Fetch hierarchical location details
            $locations = DB::table('subzona')
                ->join('zonas', 'subzona.zona_code', '=', 'zonas.zona_code')
                ->join('branches', 'zonas.branch_code', '=', 'branches.branch_code')
                ->select(
                    'subzona.subzona_code',
                    'subzona.name as subzona_name',
                    'zonas.zona_code',
                    'zonas.name as zona_name',
                    'branches.branch_code',
                    'branches.name as branch_name',
                    'branches.entity_code'
                )->get();

            $grouped = $assets->map(function ($item) use ($barang, $specs, $locations) {
                $itemUnits = $barang->where('asset_code', $item->asset_code)->values();
                $itemSpecs = $specs->where('asset_code', $item->asset_code)->values();

                // Get location details from the first unit's subzona
                $firstUnit = $itemUnits->first();
                $loc = $firstUnit ? $locations->where('subzona_code', $firstUnit->subzona_code)->first() : null;

                return [
                    'id' => $item->asset_code,
                    'name' => $item->name,
                    'category' => $item->device_code,
                    'tipeAset' => $item->name, // Map name to tipeAset for React frontend compatibility
                    'entitas' => $loc ? $loc->entity_code : null,
                    'branch' => $loc ? $loc->branch_code : null,
                    'zona' => $loc ? $loc->zona_code : null,
                    'subzona' => $loc ? $loc->subzona_code : null,
                    'value' => (float)$item->acquisition_value,
                    'procurement_date' => $item->procurement_date,
                    'tahun_pengadaan' => $item->procurement_date ? date('Y', strtotime($item->procurement_date)) : null,
                    'id_pekerjaan' => $item->id_pekerjaan,
                    'quantity' => $itemUnits->count(),
                    'units' => $itemUnits->map(function ($u) use ($locations) {
                        // Fetch active BAST transaction condition/status
                        $tx = DB::table('asset_transactions')
                            ->where('serial_number', $u->serial_number)
                            ->where('is_current', true)
                            ->first();

                        $locMatch = $locations->where('subzona_code', $u->subzona_code)->first();
                        $fullLocationStr = $locMatch 
                            ? $locMatch->branch_name . ' / ' . $locMatch->zona_name . ' / ' . $locMatch->subzona_name 
                            : $u->subzona_code;

                        return [
                            'serialNumber' => $u->serial_number,
                            'location' => $fullLocationStr,
                            'id_pekerjaan' => $u->id_pekerjaan,
                            'status' => ($tx && strtoupper($tx->transaction_type) === 'BORROW') ? 'Dipinjam' : 'Tersedia',
                            'condition' => $tx ? $tx->condition : 'Baik'
                        ];
                    })->toArray(),
                    'photo' => $item->photo,
                    'specs' => $itemSpecs->filter(fn($s) => $s->template_id !== null)->map(function($s) {
                        return [
                            'spec_label' => $s->spec_label,
                            'value' => $s->spec_value,
                            'default_unit' => $s->spec_unit
                        ];
                    })->values()->toArray(),
                    'customSpecs' => $itemSpecs->filter(fn($s) => $s->template_id === null)->map(function($s) {
                        return [
                            'spec_label' => $s->spec_label,
                            'value' => $s->spec_value,
                            'default_unit' => $s->spec_unit
                        ];
                    })->values()->toArray(),
                ];
            });

            $groupedArray = $grouped->toArray();
            if (!empty($groupedArray)) {
                $groupedArray[0]['_all_locations'] = $locations->map(function($loc) {
                    return [
                        'branch_name' => $loc->branch_name,
                        'branch_code' => $loc->branch_code,
                        'zona_name' => $loc->zona_name,
                        'zona_code' => $loc->zona_code,
                        'subzona_name' => $loc->subzona_name,
                        'subzona_code' => $loc->subzona_code,
                        'entity_code' => $loc->entity_code
                    ];
                })->toArray();
            }

            return response()->json($groupedArray);
        } catch (\Exception $e) {
            Log::error('Error loading assets: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $deviceCode = $data['category'] ?? '-';
            
            // Auto-insert device category if it doesn't exist
            $deviceExists = DB::table('device')->where('device_code', $deviceCode)->exists();
            if (!$deviceExists) {
                $categoryNames = [
                    'LPT' => 'LAPTOP',
                    'CTV' => 'CCTV CAMERA',
                    'RTR' => 'ROUTER / JARINGAN',
                    'PC' => 'PC DESKTOP',
                    'SRV' => 'SERVER',
                    'SWT' => 'SWITCH',
                    'PRN' => 'PRINTER',
                    'KND' => 'KENDARAAN',
                    'AB' => 'ALAT BERAT',
                    'FRN' => 'FURNITURE',
                    'MAT' => 'MATERIAL',
                    'SFT' => 'SOFTWARE LICENSE',
                    'HDW' => 'HARDWARE',
                    'OTH' => 'IT LAINNYA',
                ];
                $deviceName = $categoryNames[$deviceCode] ?? strtoupper($deviceCode);

                DB::table('device')->insert([
                    'device_code' => $deviceCode,
                    'name' => $deviceName,
                    'is_active' => true,
                    'created_at' => \Carbon\Carbon::now(),
                ]);
            }

            // Insert to assets master
            DB::table('assets')->insert([
                'asset_code' => $data['id'],
                'name' => $data['name'] ?? '-',
                'device_code' => $deviceCode,
                'id_pekerjaan' => $data['id_pekerjaan'] ?? null,
                'acquisition_value' => $data['value'] ?? 0,
                'procurement_date' => $data['procurementDate'] ?? null,
                'photo' => is_array($data['photo']) ? ($data['photo']['dataUrl'] ?? null) : $data['photo'],
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);

            // Sync to budget_items if id_pekerjaan is provided
            if (!empty($data['id_pekerjaan'])) {
                DB::table('budget_items')->insert([
                    'id_pekerjaan' => $data['id_pekerjaan'],
                    'jumlah' => $data['quantity'] ?? (isset($data['units']) ? count($data['units']) : 1),
                    'asset_code' => $data['id'],
                    'keterangan' => $data['keterangan'] ?? null,
                    'created_at' => \Carbon\Carbon::now(),
                ]);
            }

            // Insert physical unit instances
            if (isset($data['units']) && is_array($data['units'])) {
                foreach ($data['units'] as $idx => $unit) {
                    $unitLocation = $unit['location'] ?? $data['subzona'] ?? null;
                    $subzonaCode = $this->resolveSubzonaCode($unitLocation);

                    $sn = !empty($unit['serialNumber']) ? trim($unit['serialNumber']) : null;
                    if (empty($sn)) {
                        $sn = $data['id'] . '-SN-' . str_pad($idx + 1, 3, '0', STR_PAD_LEFT);
                    }

                    DB::table('barang')->insert([
                        'asset_code' => $data['id'],
                        'serial_number' => $sn,
                        'subzona_code' => $subzonaCode,
                        'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            // Insert specs
            if (isset($data['specs']) && is_array($data['specs'])) {
                foreach ($data['specs'] as $spec) {
                    $tplId = $spec['template_id'] ?? null;
                    if (empty($tplId) && !empty($spec['spec_label'])) {
                        $tplId = DB::table('specification_templates')
                            ->where('device_code', $deviceCode)
                            ->where('spec_label', $spec['spec_label'])
                            ->value('template_id');
                    }

                    DB::table('asset_specifications')->insert([
                        'asset_code' => $data['id'],
                        'template_id' => $tplId,
                        'spec_label' => $spec['spec_label'] ?? '',
                        'spec_value' => $spec['value'] ?? '',
                        'spec_unit' => $spec['default_unit'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            // Insert custom specs
            if (isset($data['customSpecs']) && is_array($data['customSpecs'])) {
                foreach ($data['customSpecs'] as $spec) {
                    $tplId = null;
                    if (!empty($spec['spec_label'])) {
                        $tplId = DB::table('specification_templates')
                            ->where('device_code', $deviceCode)
                            ->where('spec_label', $spec['spec_label'])
                            ->value('template_id');
                    }

                    DB::table('asset_specifications')->insert([
                        'asset_code' => $data['id'],
                        'template_id' => $tplId,
                        'spec_label' => $spec['spec_label'] ?? '',
                        'spec_value' => $spec['value'] ?? '',
                        'spec_unit' => $spec['default_unit'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Data saved successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error saving barang: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $deviceCode = $data['category'] ?? '-';

            // Ensure device exists
            $deviceExists = DB::table('device')->where('device_code', $deviceCode)->exists();
            if (!$deviceExists) {
                $categoryNames = [
                    'LPT' => 'LAPTOP',
                    'CTV' => 'CCTV CAMERA',
                    'RTR' => 'ROUTER / JARINGAN',
                    'PC' => 'PC DESKTOP',
                    'SRV' => 'SERVER',
                    'SWT' => 'SWITCH',
                    'PRN' => 'PRINTER',
                    'KND' => 'KENDARAAN',
                    'AB' => 'ALAT BERAT',
                    'FRN' => 'FURNITURE',
                    'MAT' => 'MATERIAL',
                    'SFT' => 'SOFTWARE LICENSE',
                    'HDW' => 'HARDWARE',
                    'OTH' => 'IT LAINNYA',
                ];
                $deviceName = $categoryNames[$deviceCode] ?? strtoupper($deviceCode);

                DB::table('device')->insert([
                    'device_code' => $deviceCode,
                    'name' => $deviceName,
                    'is_active' => true,
                    'created_at' => \Carbon\Carbon::now(),
                ]);
            }

            // 1. Update main assets master table
            $assetData = [
                'name' => $data['name'] ?? '-',
                'device_code' => $deviceCode,
                'id_pekerjaan' => $data['id_pekerjaan'] ?? null,
                'acquisition_value' => $data['value'] ?? 0,
                'procurement_date' => $data['procurementDate'] ?? null,
                'updated_at' => \Carbon\Carbon::now(),
            ];

            if (isset($data['photo'])) {
                $assetData['photo'] = is_array($data['photo']) ? ($data['photo']['dataUrl'] ?? null) : $data['photo'];
            }

            DB::table('assets')->where('asset_code', $id)->update($assetData);

            // 2. Sync units (barang table)
            // Fetch current serial numbers
            $existingSns = DB::table('barang')->where('asset_code', $id)->pluck('serial_number')->toArray();
            $newSns = [];

            if (isset($data['units']) && is_array($data['units'])) {
                foreach ($data['units'] as $idx => $unit) {
                    $sn = !empty($unit['serialNumber']) ? trim($unit['serialNumber']) : null;
                    if (empty($sn)) {
                        $sn = $id . '-SN-' . str_pad($idx + 1, 3, '0', STR_PAD_LEFT);
                    }
                    $newSns[] = $sn;

                    $unitLocation = $unit['location'] ?? $data['subzona'] ?? null;
                    $subzonaCode = $this->resolveSubzonaCode($unitLocation);

                    $exists = DB::table('barang')->where('serial_number', $sn)->exists();
                    if (!$exists) {
                        DB::table('barang')->insert([
                            'asset_code' => $id,
                            'serial_number' => $sn,
                            'subzona_code' => $subzonaCode,
                            'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                            'created_at' => \Carbon\Carbon::now(),
                        ]);
                    } else {
                        // Update location/subzona and id_pekerjaan if changed
                        DB::table('barang')->where('serial_number', $sn)->update([
                            'subzona_code' => $subzonaCode,
                            'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                        ]);
                    }
                }

                // Safely delete units that are no longer present, but only if they have no transactions
                $toDelete = array_diff($existingSns, $newSns);
                foreach ($toDelete as $snToDelete) {
                    $hasTx = DB::table('asset_transactions')->where('serial_number', $snToDelete)->exists();
                    if (!$hasTx) {
                        DB::table('barang')->where('serial_number', $snToDelete)->delete();
                    }
                }
            }

            // 3. Sync specifications (asset_specifications)
            DB::table('asset_specifications')->where('asset_code', $id)->delete();
            
            if (isset($data['specs']) && is_array($data['specs'])) {
                foreach ($data['specs'] as $spec) {
                    $tplId = $spec['template_id'] ?? null;
                    if (empty($tplId) && !empty($spec['spec_label'])) {
                        $tplId = DB::table('specification_templates')
                            ->where('device_code', $deviceCode)
                            ->where('spec_label', $spec['spec_label'])
                            ->value('template_id');
                    }

                    DB::table('asset_specifications')->insert([
                        'asset_code' => $id,
                        'template_id' => $tplId,
                        'spec_label' => $spec['spec_label'] ?? '',
                        'spec_value' => $spec['value'] ?? '',
                        'spec_unit' => $spec['default_unit'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            if (isset($data['customSpecs']) && is_array($data['customSpecs'])) {
                foreach ($data['customSpecs'] as $spec) {
                    $tplId = null;
                    if (!empty($spec['spec_label'])) {
                        $tplId = DB::table('specification_templates')
                            ->where('device_code', $deviceCode)
                            ->where('spec_label', $spec['spec_label'])
                            ->value('template_id');
                    }

                    DB::table('asset_specifications')->insert([
                        'asset_code' => $id,
                        'template_id' => $tplId,
                        'spec_label' => $spec['spec_label'] ?? '',
                        'spec_value' => $spec['value'] ?? '',
                        'spec_unit' => $spec['default_unit'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            // 4. SYNC BACK TO BUDGET MANAGEMENT (budget_items table)
            $projId = $data['id_pekerjaan'] ?? null;
            if (!empty($projId)) {
                $exists = DB::table('budget_items')->where('asset_code', $id)->exists();
                if ($exists) {
                    DB::table('budget_items')
                        ->where('asset_code', $id)
                        ->update([
                            'id_pekerjaan' => $projId,
                            'jumlah' => $data['quantity'] ?? (isset($data['units']) ? count($data['units']) : 1),
                            'keterangan' => $data['keterangan'] ?? null,
                        ]);
                } else {
                    DB::table('budget_items')->insert([
                        'id_pekerjaan' => $projId,
                        'jumlah' => $data['quantity'] ?? (isset($data['units']) ? count($data['units']) : 1),
                        'asset_code' => $id,
                        'keterangan' => $data['keterangan'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                    ]);
                }
            } else {
                // If id_pekerjaan is removed, delete from budget_items
                DB::table('budget_items')->where('asset_code', $id)->delete();
            }

            // --- Status Update Logic (Maintenance/Ditemukan) ---
            // Jika user memilih "Tersedia (Telah Diperbaiki)" atau "Tersedia (Telah Ditemukan)" per unit
            // Kita akan mencatat transaksi "MAINTENANCE" baru dengan kondisi BAIK
            $units = $data['units'] ?? [];
            \Illuminate\Support\Facades\Log::info('Update Barang ID: ' . $id . ' | Units: ' . json_encode($units));
            foreach ($units as $u) {
                $unitStatus = $u['status'] ?? '';
                \Illuminate\Support\Facades\Log::info('Checking SN: ' . ($u['serialNumber'] ?? 'null') . ' | Status: ' . $unitStatus);
                if (str_contains($unitStatus, 'Tersedia')) {
                    $sn = $u['serialNumber'] ?? null;
                    if ($sn) {
                        // Check if current active condition is not BAIK
                        $latestTx = DB::table('asset_transactions')
                            ->where('serial_number', $sn)
                            ->where('is_current', true)
                            ->first();
                            
                        \Illuminate\Support\Facades\Log::info('Latest TX for ' . $sn . ': ' . json_encode($latestTx));
                            
                        if ($latestTx && strtoupper($latestTx->condition) !== 'BAIK') {
                            // Non-aktifkan transaksi sebelumnya
                            DB::table('asset_transactions')
                                ->where('serial_number', $sn)
                                ->update(['is_current' => false]);
                                
                            $txType = str_contains(strtolower($unitStatus), 'ditemukan') ? 'FOUND' : 'MAINTENANCE';
                            
                            // Buat transaksi baru
                            $txId = DB::table('asset_transactions')->insertGetId([
                                'transaction_type' => $txType,
                                'serial_number' => $sn,
                                'performed_by_id' => 1, // Admin IT
                                'condition' => 'BAIK',
                                'notes' => 'Status diupdate via Edit Data Barang: ' . $unitStatus,
                                'is_current' => true,
                                'created_at' => \Carbon\Carbon::now(),
                                'updated_at' => \Carbon\Carbon::now()
                            ], 'transaction_id');
                            
                            $prefix = $txType === 'FOUND' ? 'FN-' : 'MT-';
                            $bastNumber = $prefix . date('Y/m/') . str_pad($txId, 4, '0', STR_PAD_LEFT);
                            DB::table('asset_transactions')->where('transaction_id', $txId)->update(['bast_number' => $bastNumber]);
                        }
                    }
                }
            }

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Data updated successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating barang: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            // Delete from budget_items so that it removes the asset from any projects
            DB::table('budget_items')->where('asset_code', $id)->delete();

            // Deleting from the master assets table will automatically trigger cascaded deletes
            // on barang, asset_specifications, etc.
            DB::table('assets')->where('asset_code', $id)->delete();

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Data deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting barang: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Helper to resolve subzona code from any string
     */
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

    private function resolveSubzonaCode($locationString, $fallback = null)
    {
        if (empty($locationString)) return $fallback;

        $parts = array_map('trim', explode('/', $locationString));
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

    public function indexDevices()
    {
        try {
            $devices = DB::table('device')
                ->where('is_active', true)
                ->pluck('device_code')
                ->toArray();
            return response()->json($devices);
        } catch (\Exception $e) {
            Log::error('Error loading devices: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
