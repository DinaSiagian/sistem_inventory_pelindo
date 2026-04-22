<?php

namespace App\Http\Controllers;

use App\Models\BudgetMaster;
use App\Models\BudgetAnnualOpex;
use App\Models\BudgetAnnualCapex;
use Illuminate\Http\Request;
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
     * Ambil semua entri OPEX
     */
    public function indexOpex()
    {
        try {
            $items = BudgetAnnualOpex::orderBy('id_anggaran_tahunan')->get();

            // Map ke format frontend
            $data = $items->map(function ($item) {
                return [
                    'id'                => (string) $item->id_anggaran_tahunan,
                    'db_id'             => $item->id_anggaran_tahunan,
                    'kd'                => $item->kd_anggaran_master ?? '',
                    'nama'              => $item->nm_anggaran ?? '',
                    'thn_anggaran'      => $item->thn_anggaran,
                    'nilai_anggaran'    => (float) ($item->nilai_anggaran ?? 0),
                    'realisasi_tahunan' => $item->realisasi_tahunan ?? [],
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Data OPEX berhasil diambil',
                'data'    => $data,
            ]);
        } catch (Exception $e) {
            Log::error('Get OPEX Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data OPEX: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /api/budget/opex
     * Tambah entri OPEX baru
     */
    public function storeOpex(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nama'           => 'required|string|max:255',
                'thn_anggaran'   => 'required|integer|min:2000|max:2099',
                'nilai_anggaran' => 'required|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            // Pastikan kd_anggaran_master ada di budget_masters (buat jika belum)
            $kd = $request->kd ?? 'OPEX-MISC';
            $this->ensureBudgetMasterExists($kd, $request->nama, 'OPEX');

            $item = BudgetAnnualOpex::create([
                'kd_anggaran_master'     => $kd,
                'thn_anggaran'           => $request->thn_anggaran,
                'nilai_anggaran_tahunan' => $request->nilai_anggaran,
                'nm_anggaran'            => $request->nama,
                'nilai_anggaran'         => $request->nilai_anggaran,
                'realisasi_tahunan'      => $request->realisasi_tahunan ?? [],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data OPEX berhasil ditambahkan',
                'data'    => [
                    'id'                => (string) $item->id_anggaran_tahunan,
                    'db_id'             => $item->id_anggaran_tahunan,
                    'kd'                => $item->kd_anggaran_master,
                    'nama'              => $item->nm_anggaran,
                    'thn_anggaran'      => $item->thn_anggaran,
                    'nilai_anggaran'    => (float) $item->nilai_anggaran,
                    'realisasi_tahunan' => $item->realisasi_tahunan ?? [],
                ],
            ], 201);
        } catch (Exception $e) {
            Log::error('Store OPEX Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan data OPEX: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * PUT /api/budget/opex/{id}
     * Update entri OPEX
     */
    public function updateOpex(Request $request, $id)
    {
        try {
            $item = BudgetAnnualOpex::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nama'           => 'sometimes|string|max:255',
                'thn_anggaran'   => 'sometimes|integer|min:2000|max:2099',
                'nilai_anggaran' => 'sometimes|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $updates = [];
            if ($request->has('nama'))              $updates['nm_anggaran']        = $request->nama;
            if ($request->has('kd'))                $updates['kd_anggaran_master'] = $request->kd;
            if ($request->has('thn_anggaran'))      $updates['thn_anggaran']       = $request->thn_anggaran;
            if ($request->has('nilai_anggaran')) {
                $updates['nilai_anggaran']         = $request->nilai_anggaran;
                $updates['nilai_anggaran_tahunan'] = $request->nilai_anggaran;
            }
            if ($request->has('realisasi_tahunan')) {
                $updates['realisasi_tahunan'] = $request->realisasi_tahunan;
            }

            $item->update($updates);

            return response()->json([
                'success' => true,
                'message' => 'Data OPEX berhasil diperbarui',
                'data'    => [
                    'id'                => (string) $item->id_anggaran_tahunan,
                    'db_id'             => $item->id_anggaran_tahunan,
                    'kd'                => $item->kd_anggaran_master,
                    'nama'              => $item->nm_anggaran,
                    'thn_anggaran'      => $item->thn_anggaran,
                    'nilai_anggaran'    => (float) $item->nilai_anggaran,
                    'realisasi_tahunan' => $item->realisasi_tahunan ?? [],
                ],
            ]);
        } catch (Exception $e) {
            Log::error('Update OPEX Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui data OPEX: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * DELETE /api/budget/opex/{id}
     * Hapus entri OPEX
     */
    public function destroyOpex($id)
    {
        try {
            $item = BudgetAnnualOpex::findOrFail($id);
            $item->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data OPEX berhasil dihapus',
            ]);
        } catch (Exception $e) {
            Log::error('Delete OPEX Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data OPEX: ' . $e->getMessage(),
            ], 500);
        }
    }

    // ══════════════════════════════════════════════════════
    //  CAPEX ENDPOINTS
    // ══════════════════════════════════════════════════════

    /**
     * GET /api/budget/capex
     * Ambil semua entri CAPEX
     */
    public function indexCapex()
    {
        try {
            $items = BudgetAnnualCapex::orderBy('kd_anggaran_capex')->get();

            $data = $items->map(function ($item) {
                return $this->formatCapex($item);
            });

            return response()->json([
                'success' => true,
                'message' => 'Data CAPEX berhasil diambil',
                'data'    => $data,
            ]);
        } catch (Exception $e) {
            Log::error('Get CAPEX Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data CAPEX: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /api/budget/capex
     * Tambah entri CAPEX baru
     */
    public function storeCapex(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nm_anggaran'   => 'required|string|max:255',
                'thn_rkap_awal' => 'required|integer|min:2000|max:2099',
                'thn_rkap_akhir'=> 'required|integer|min:2000|max:2099',
                'thn_anggaran'  => 'required|integer|min:2000|max:2099',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            // Generate kd_anggaran_capex otomatis jika tidak diberikan
            $kdCapex = $request->kd_capex;
            if (!$kdCapex) {
                $kdCapex = 'CAPEX-' . strtoupper(substr(md5(uniqid()), 0, 8));
            }

            // Pastikan unik
            while (BudgetAnnualCapex::where('kd_anggaran_capex', $kdCapex)->exists()) {
                $kdCapex = 'CAPEX-' . strtoupper(substr(md5(uniqid()), 0, 8));
            }

            $kdMaster = '5900100000';
            $this->ensureBudgetMasterExists($kdMaster, 'Beban Investasi', 'CAPEX');

            $item = BudgetAnnualCapex::create([
                'kd_anggaran_capex'  => $kdCapex,
                'kd_anggaran_master' => $kdMaster,
                'nm_anggaran_capex'  => $request->nm_anggaran,
                'thn_rkap_awal'      => $request->thn_rkap_awal,
                'thn_rkap_akhir'     => $request->thn_rkap_akhir,
                'thn_anggaran'       => $request->thn_anggaran,
                'nilai_anggaran_kad' => $request->nilai_kad ?? 0,
                'nilai_anggaran_rkap'=> $request->nilai_rkap ?? 0,
                'nm_master'          => 'Beban Investasi',
                'anggaran_tahunan'   => $request->anggaran_tahunan ?? [],
                'history_anggaran'   => $request->history_anggaran ?? [],
                'pekerjaan'          => $request->pekerjaan ?? [],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data CAPEX berhasil ditambahkan',
                'data'    => $this->formatCapex($item),
            ], 201);
        } catch (Exception $e) {
            Log::error('Store CAPEX Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan data CAPEX: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * PUT /api/budget/capex/{kd}
     * Update entri CAPEX
     */
    public function updateCapex(Request $request, $kd)
    {
        try {
            $item = BudgetAnnualCapex::findOrFail($kd);

            $updates = [];
            if ($request->has('nm_anggaran'))       $updates['nm_anggaran_capex']  = $request->nm_anggaran;
            if ($request->has('kd_capex'))           $updates['kd_anggaran_capex']  = $request->kd_capex;
            if ($request->has('thn_rkap_awal'))      $updates['thn_rkap_awal']      = $request->thn_rkap_awal;
            if ($request->has('thn_rkap_akhir'))     $updates['thn_rkap_akhir']     = $request->thn_rkap_akhir;
            if ($request->has('thn_anggaran'))       $updates['thn_anggaran']       = $request->thn_anggaran;
            if ($request->has('nilai_kad'))          $updates['nilai_anggaran_kad'] = $request->nilai_kad;
            if ($request->has('nilai_rkap'))         $updates['nilai_anggaran_rkap']= $request->nilai_rkap;
            if ($request->has('anggaran_tahunan'))   $updates['anggaran_tahunan']   = $request->anggaran_tahunan;
            if ($request->has('history_anggaran'))   $updates['history_anggaran']   = $request->history_anggaran;
            if ($request->has('pekerjaan'))          $updates['pekerjaan']          = $request->pekerjaan;

            $item->update($updates);

            return response()->json([
                'success' => true,
                'message' => 'Data CAPEX berhasil diperbarui',
                'data'    => $this->formatCapex($item->fresh()),
            ]);
        } catch (Exception $e) {
            Log::error('Update CAPEX Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui data CAPEX: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * DELETE /api/budget/capex/{kd}
     * Hapus entri CAPEX
     */
    public function destroyCapex($kd)
    {
        try {
            $item = BudgetAnnualCapex::findOrFail($kd);
            $item->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data CAPEX berhasil dihapus',
            ]);
        } catch (Exception $e) {
            Log::error('Delete CAPEX Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data CAPEX: ' . $e->getMessage(),
            ], 500);
        }
    }

    // ══════════════════════════════════════════════════════
    //  HELPERS
    // ══════════════════════════════════════════════════════

    private function ensureBudgetMasterExists(string $kd, string $nama, string $tipe)
    {
        BudgetMaster::firstOrCreate(
            ['kd_anggaran_master' => $kd],
            [
                'nm_anggaran_master'   => $nama,
                'tipe_anggaran_master' => $tipe,
            ]
        );
    }

    private function formatCapex(BudgetAnnualCapex $item): array
    {
        return [
            'id'               => $item->kd_anggaran_capex,
            'db_kd'            => $item->kd_anggaran_capex,
            'kd_master'        => $item->kd_anggaran_master ?? '5900100000',
            'nm_master'        => $item->nm_master ?? 'Beban Investasi',
            'nm_anggaran'      => $item->nm_anggaran_capex ?? '',
            'kd_capex'         => $item->kd_anggaran_capex,
            'thn_rkap_awal'    => $item->thn_rkap_awal,
            'thn_rkap_akhir'   => $item->thn_rkap_akhir,
            'thn_anggaran'     => $item->thn_anggaran,
            'nilai_kad'        => (float) ($item->nilai_anggaran_kad ?? 0),
            'nilai_rkap'       => (float) ($item->nilai_anggaran_rkap ?? 0),
            'anggaran_tahunan' => $item->anggaran_tahunan ?? [],
            'history_anggaran' => $item->history_anggaran ?? [],
            'pekerjaan'        => $item->pekerjaan ?? [],
        ];
    }
}
