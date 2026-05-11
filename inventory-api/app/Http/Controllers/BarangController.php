<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BarangController extends Controller
{
    public function index()
    {
        $barang = DB::table('barang')->get();
        $units = DB::table('barang_units')->get();
        $specs = DB::table('barang_spesifikasi')->get();

        $grouped = $barang->map(function ($item) use ($units, $specs) {
            $itemUnits = $units->where('assetId', $item->assetId)->values();
            $itemSpecs = $specs->where('assetId', $item->assetId)->values();

            return [
                'id' => $item->assetId,
                'name' => $item->name,
                'category' => $item->category,
                'tipeAset' => $item->tipeAset,
                'entitas' => $item->entitasCode,
                'branch' => $item->branchCode,
                'zona' => $item->zonaCode,
                'subzona' => $item->subzonaCode,
                'value' => (float)$item->value,
                'id_pekerjaan' => $item->id_pekerjaan,
                'quantity' => $itemUnits->count(),
                'units' => $itemUnits->map(function ($u) {
                    return [
                        'serialNumber' => $u->serialNumber,
                        'location' => $u->location,
                        'status' => $u->status,
                        'condition' => $u->condition
                    ];
                })->toArray(),
                'photo' => $item->photo,
                'specs' => $itemSpecs->filter(fn($s) => $s->template_id !== null)->map(function($s) {
                    return [
                        'spec_label' => $s->spec_label,
                        'value' => $s->value,
                        'default_unit' => $s->default_unit
                    ];
                })->values()->toArray(),
                'customSpecs' => $itemSpecs->filter(fn($s) => $s->template_id === null)->map(function($s) {
                    return [
                        'spec_label' => $s->spec_label,
                        'value' => $s->value,
                        'default_unit' => $s->default_unit
                    ];
                })->values()->toArray(),
            ];
        });

        return response()->json($grouped);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();

            $category = $data['category'] ?? '-';
            
            // Auto-insert kategori jika belum ada agar Foreign Key tidak gagal
            $kategoriExists = DB::table('kategori_barang')->where('category', $category)->exists();
            if (!$kategoriExists) {
                DB::table('kategori_barang')->insert([
                    'category' => $category,
                    'name' => $category,
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now()
                ]);
            }

            // Insert to barang
            DB::table('barang')->insert([
                'assetId' => $data['id'],
                'category' => $category,
                'name' => $data['name'] ?? '-',
                'tipeAset' => $data['tipeAset'] ?? null,
                'entitasCode' => $data['entitas'] ?? null,
                'branchCode' => $data['branch'] ?? null,
                'zonaCode' => $data['zona'] ?? null,
                'subzonaCode' => $data['subzona'] ?? null,
                'value' => $data['value'] ?? 0,
                'id_pekerjaan' => $data['id_pekerjaan'] ?? null,
                'photo' => is_array($data['photo']) ? ($data['photo']['dataUrl'] ?? null) : $data['photo'],
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);

            // Insert units
            if (isset($data['units']) && is_array($data['units'])) {
                foreach ($data['units'] as $unit) {
                    DB::table('barang_units')->insert([
                        'assetId' => $data['id'],
                        'serialNumber' => $unit['serialNumber'] ?? null,
                        'location' => $unit['location'] ?? null,
                        'status' => 'Tersedia',
                        'condition' => 'Baik',
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            // Insert specs
            if (isset($data['specs']) && is_array($data['specs'])) {
                foreach ($data['specs'] as $spec) {
                    DB::table('barang_spesifikasi')->insert([
                        'assetId' => $data['id'],
                        'template_id' => $spec['template_id'] ?? 1, // dummy value for template
                        'spec_label' => $spec['spec_label'] ?? '',
                        'value' => $spec['value'] ?? '',
                        'default_unit' => $spec['default_unit'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            // Insert custom specs
            if (isset($data['customSpecs']) && is_array($data['customSpecs'])) {
                foreach ($data['customSpecs'] as $spec) {
                    DB::table('barang_spesifikasi')->insert([
                        'assetId' => $data['id'],
                        'template_id' => null,
                        'spec_label' => $spec['spec_label'] ?? '',
                        'value' => $spec['value'] ?? '',
                        'default_unit' => $spec['default_unit'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now(),
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
            $assetId = $id;

            // 1. Update main barang table
            $barangData = [
                'name' => $data['name'] ?? '-',
                'category' => $data['category'] ?? '-',
                'tipeAset' => $data['tipeAset'] ?? null,
                'entitasCode' => $data['entitas'] ?? null,
                'branchCode' => $data['branch'] ?? null,
                'zonaCode' => $data['zona'] ?? null,
                'subzonaCode' => $data['subzona'] ?? null,
                'value' => $data['value'] ?? 0,
                'id_pekerjaan' => $data['id_pekerjaan'] ?? null,
                'updated_at' => \Carbon\Carbon::now(),
            ];

            if (isset($data['photo'])) {
                $barangData['photo'] = is_array($data['photo']) ? ($data['photo']['dataUrl'] ?? null) : $data['photo'];
            }

            DB::table('barang')->where('assetId', $assetId)->update($barangData);

            // 2. Sync units (barang_units)
            DB::table('barang_units')->where('assetId', $assetId)->delete();
            if (isset($data['units']) && is_array($data['units'])) {
                foreach ($data['units'] as $unit) {
                    if (!empty($unit['serialNumber'])) {
                        DB::table('barang_units')->insert([
                            'assetId' => $assetId,
                            'serialNumber' => $unit['serialNumber'],
                            'location' => $unit['location'] ?? null,
                            'status' => $unit['status'] ?? 'Tersedia',
                            'condition' => $unit['condition'] ?? 'Baik',
                            'created_at' => \Carbon\Carbon::now(),
                            'updated_at' => \Carbon\Carbon::now(),
                        ]);
                    }
                }
            }

            // 3. Sync specifications (barang_spesifikasi)
            DB::table('barang_spesifikasi')->where('assetId', $assetId)->delete();
            
            if (isset($data['specs']) && is_array($data['specs'])) {
                foreach ($data['specs'] as $spec) {
                    DB::table('barang_spesifikasi')->insert([
                        'assetId' => $assetId,
                        'template_id' => $spec['template_id'] ?? 1,
                        'spec_label' => $spec['spec_label'] ?? '',
                        'value' => $spec['value'] ?? '',
                        'default_unit' => $spec['default_unit'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            if (isset($data['customSpecs']) && is_array($data['customSpecs'])) {
                foreach ($data['customSpecs'] as $spec) {
                    DB::table('barang_spesifikasi')->insert([
                        'assetId' => $assetId,
                        'template_id' => null,
                        'spec_label' => $spec['spec_label'] ?? '',
                        'value' => $spec['value'] ?? '',
                        'default_unit' => $spec['default_unit'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now(),
                    ]);
                }
            }

            // 4. SYNC TO BUDGET MANAGEMENT (budget_items table)
            // This ensures changes in View Asset propagate back to Pekerjaan/Project
            DB::table('budget_items')
                ->where('asset_code', $assetId)
                ->update([
                    'id_pekerjaan'      => $data['id_pekerjaan'] ?? null,
                    'nama_barang'       => $data['name'] ?? '-',
                    'kategori'          => $data['category'] ?? '-',
                    'model'             => $data['tipeAset'] ?? null,
                    'acquisition_value' => $data['value'] ?? 0,
                    'jumlah'            => $data['quantity'] ?? 1,
                    'units_json'        => json_encode($data['units'] ?? []),
                ]);

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
            DB::table('barang')->where('assetId', $id)->delete();
            DB::table('barang_units')->where('assetId', $id)->delete();
            DB::table('barang_spesifikasi')->where('assetId', $id)->delete();
            
            // Also nullify asset_code in budget_items to decouple it
            DB::table('budget_items')->where('asset_code', $id)->update(['asset_code' => null]);

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Data deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting barang: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
