<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;

class TransactionController extends Controller
{
    /**
     * Get list of borrow and return transactions
     */
    public function index(Request $request)
    {
        try {
            // Get user's branch for filtering
            $user = null;
            try { $user = JWTAuth::user(); } catch (\Exception $e) {}
            $userBranchCode = $user ? $user->branches_code : null;

            // Get all subzona_codes belonging to user's branch
            $branchSubzonaCodes = [];
            if ($userBranchCode) {
                $branchSubzonaCodes = DB::table('subzona')
                    ->join('zonas', 'subzona.zona_code', '=', 'zonas.zona_code')
                    ->where('zonas.branch_code', $userBranchCode)
                    ->pluck('subzona.subzona_code')
                    ->toArray();
            }

            // 1. Fetch Borrows — filtered to user's branch
            $borrowQuery = DB::table('asset_transactions AS t')
                ->join('barang AS b', 't.kd_barang', '=', 'b.kd_barang')
                ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                ->leftJoin('users AS op', 't.performed_by_id', '=', 'op.id')
                ->leftJoin('users AS gv', 't.giver_id', '=', 'gv.id')
                ->leftJoin('users AS rc', 't.receiver_id', '=', 'rc.id')
                ->where('t.transaction_type', '=', 'BORROW')
                ->leftJoin('budget_projects AS bp', function ($join) {
                    $join->on('t.id_pekerjaan', '=', 'bp.id_pekerjaan')
                         ->orOn('b.id_pekerjaan', '=', 'bp.id_pekerjaan')
                         ->orOn('a.id_pekerjaan', '=', 'bp.id_pekerjaan');
                });

            // Apply branch filter if user has a branch
            if ($userBranchCode && !empty($branchSubzonaCodes)) {
                $borrowQuery->where(function($q) use ($branchSubzonaCodes, $user) {
                    $q->whereIn('b.subzona_code', $branchSubzonaCodes)
                      ->orWhere('t.giver_id', $user->id)
                      ->orWhere('t.receiver_id', $user->id)
                      ->orWhere('t.performed_by_id', $user->id);
                });
            }

            $borrowRows = $borrowQuery->select([
                    't.transaction_id',
                    't.bast_number',
                    't.kd_barang',
                    't.created_at AS transaction_date',
                    't.giver_id',
                    't.receiver_id',
                    't.performed_by_id AS operator_id',
                    't.condition',
                    't.notes',
                    'b.subzona_code',
                    'a.asset_code',
                    'a.name AS asset_name',
                    'a.acquisition_value AS price',
                    DB::raw('COALESCE(t.id_pekerjaan, b.id_pekerjaan, a.id_pekerjaan) AS id_pekerjaan'),
                    'a.procurement_date',
                    'bp.nm_pekerjaan AS pekerjaan_nama',
                    'bp.no_pr AS pekerjaan_no_anggaran',
                    'bp.jenis_anggaran AS pekerjaan_jenis',
                    'b.serial_number',
                    'op.name AS operator_name',
                    'gv.name AS giver_name',
                    'rc.name AS receiver_name',
                    'op.branches_code AS operator_branch',
                ])
                ->orderBy('t.created_at', 'desc')
                ->get()
                ->unique('transaction_id');

            // OPTIMIZATION: Prevent N+1 Query by fetching max transaction_id for all returned serials
            $borrowSerialNumbers = $borrowRows->pluck('kd_barang')->unique()->toArray();
            $newerTransactions = !empty($borrowSerialNumbers)
                ? DB::table('asset_transactions')
                    ->select('kd_barang', DB::raw('MAX(transaction_id) as max_id'))
                    ->whereIn('kd_barang', $borrowSerialNumbers)
                    ->groupBy('kd_barang')
                    ->pluck('max_id', 'kd_barang')
                : collect();

            $borrows = [];
            foreach ($borrowRows as $row) {
                // A BORROW is "completed/returned" if any newer transaction exists for this serial number.
                $maxId = $newerTransactions->get($row->kd_barang);
                $isReturned = $maxId && $maxId > $row->transaction_id;

                $borrows[] = [
                    'id' => (int) $row->transaction_id,
                    'type' => 'BORROW',
                    'bast_number' => $row->bast_number,
                    'pekerjaan_kode' => $row->id_pekerjaan,
                    'pekerjaan' => [
                        'kode' => $row->id_pekerjaan,
                        'nama' => $row->pekerjaan_nama ?? null,
                        'no_anggaran' => $row->pekerjaan_no_anggaran ?? null,
                        'jenis' => $row->pekerjaan_jenis ?? null,
                        'tahun_pengadaan' => $row->procurement_date ? date('Y', strtotime($row->procurement_date)) : null,
                    ],
                    'asset_code' => $row->asset_code,
                    'code' => $row->kd_barang,
                    'serial_number' => $row->serial_number ?: $row->kd_barang,
                    'name' => $row->asset_name,
                    'price' => (float) $row->price,
                    'tahun_pengadaan' => $row->procurement_date ? date('Y', strtotime($row->procurement_date)) : null,
                    'borrow_date' => Carbon::parse($row->transaction_date)->format('Y-m-d\TH:i:s'),
                    'due_date' => Carbon::parse($row->transaction_date)->addDays(30)->format('Y-m-d'),
                    'performed_by_id' => $row->operator_id ? (int) $row->operator_id : null,
                    'performed_by_name' => $row->receiver_name ?: ($row->giver_name ?: $row->operator_name),
                    'performed_by_branch' => $row->operator_branch ?: 'Gudang',
                    'giver_id' => $row->giver_id ? (int) $row->giver_id : null,
                    'giver_name' => $row->giver_name,
                    'receiver_id' => $row->receiver_id ? (int) $row->receiver_id : null,
                    'receiver_name' => $row->receiver_name,
                    'from_zone' => $row->subzona_code ?: 'Gudang',
                    'to_zone' => $row->subzona_code ?: 'Gudang',
                    'reason' => $row->notes ?: '',
                    'condition' => $row->condition ?: 'BAIK',
                    'attachment' => null,
                    'notes' => $row->notes ?: '',
                    'is_returned' => $isReturned,
                ];
            }

            // 2. Fetch Returns — filtered to user's branch
            $returnQuery = DB::table('asset_transactions AS t')
                ->join('barang AS b', 't.kd_barang', '=', 'b.kd_barang')
                ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                ->leftJoin('users AS op', 't.performed_by_id', '=', 'op.id')
                ->leftJoin('users AS gv', 't.giver_id', '=', 'gv.id')
                ->leftJoin('users AS rc', 't.receiver_id', '=', 'rc.id')
                ->where('t.transaction_type', '=', 'RETURN')
                ->leftJoin('budget_projects AS bp', function ($join) {
                    $join->on('t.id_pekerjaan', '=', 'bp.id_pekerjaan')
                         ->orOn('b.id_pekerjaan', '=', 'bp.id_pekerjaan')
                         ->orOn('a.id_pekerjaan', '=', 'bp.id_pekerjaan');
                });

            if ($userBranchCode && !empty($branchSubzonaCodes)) {
                $returnQuery->where(function($q) use ($branchSubzonaCodes, $user) {
                    $q->whereIn('b.subzona_code', $branchSubzonaCodes)
                      ->orWhere('t.giver_id', $user->id)
                      ->orWhere('t.receiver_id', $user->id)
                      ->orWhere('t.performed_by_id', $user->id);
                });
            }

            $returnRows = $returnQuery->select([
                    't.transaction_id',
                    't.bast_number',
                    't.kd_barang',
                    't.created_at AS transaction_date',
                    't.giver_id',
                    't.receiver_id',
                    't.performed_by_id AS operator_id',
                    't.condition',
                    't.notes',
                    'b.subzona_code',
                    'a.asset_code',
                    'a.name AS asset_name',
                    'a.acquisition_value AS price',
                    DB::raw('COALESCE(t.id_pekerjaan, b.id_pekerjaan, a.id_pekerjaan) AS id_pekerjaan'),
                    'a.procurement_date',
                    'bp.nm_pekerjaan AS pekerjaan_nama',
                    'bp.no_pr AS pekerjaan_no_anggaran',
                    'bp.jenis_anggaran AS pekerjaan_jenis',
                    'b.serial_number',
                    'op.name AS operator_name',
                    'gv.name AS giver_name',
                    'rc.name AS receiver_name',
                    'op.branches_code AS operator_branch',
                ])
                ->orderBy('t.created_at', 'desc')
                ->get()
                ->unique('transaction_id');

            // OPTIMIZATION: Fetch all related BORROW transactions at once
            $returnSerialNumbers = $returnRows->pluck('kd_barang')->unique()->toArray();
            $allBorrows = !empty($returnSerialNumbers)
                ? DB::table('asset_transactions')
                    ->whereIn('kd_barang', $returnSerialNumbers)
                    ->where('transaction_type', 'BORROW')
                    ->orderBy('created_at', 'desc')
                    ->get()
                    ->groupBy('kd_barang')
                : collect();

            $returns = [];
            foreach ($returnRows as $row) {
                // Find matching borrow transaction from memory
                $matchingBorrow = null;
                if ($allBorrows->has($row->kd_barang)) {
                    $matchingBorrow = $allBorrows->get($row->kd_barang)->first(function($b) use ($row) {
                        return $b->created_at < $row->transaction_date;
                    });
                }

                $returns[] = [
                    'id' => (int) $row->transaction_id,
                    'type' => 'RETURN',
                    'bast_number' => $row->bast_number,
                    'original_id' => $matchingBorrow ? (int) $matchingBorrow->transaction_id : null,
                    'pekerjaan_kode' => $row->id_pekerjaan,
                    'pekerjaan' => [
                        'kode' => $row->id_pekerjaan,
                        'nama' => $row->pekerjaan_nama ?? null,
                        'no_anggaran' => $row->pekerjaan_no_anggaran ?? null,
                        'jenis' => $row->pekerjaan_jenis ?? null,
                        'tahun_pengadaan' => $row->procurement_date ? date('Y', strtotime($row->procurement_date)) : null,
                    ],
                    'asset_code' => $row->asset_code,
                    'code' => $row->kd_barang,
                    'serial_number' => $row->serial_number ?: $row->kd_barang,
                    'name' => $row->asset_name,
                    'price' => (float) $row->price,
                    'tahun_pengadaan' => $row->procurement_date ? date('Y', strtotime($row->procurement_date)) : null,
                    'borrow_date' => $matchingBorrow ? Carbon::parse($matchingBorrow->created_at)->format('Y-m-d\TH:i:s') : Carbon::parse($row->transaction_date)->subDays(30)->format('Y-m-d\TH:i:s'),
                    'return_date' => Carbon::parse($row->transaction_date)->format('Y-m-d\TH:i:s'),
                    'performed_by_id' => $row->operator_id ? (int) $row->operator_id : null,
                    'performed_by_name' => $row->giver_name ?: ($row->receiver_name ?: $row->operator_name),
                    'performed_by_branch' => $row->operator_branch ?: 'Gudang',
                    'giver_id' => $row->giver_id ? (int) $row->giver_id : null,
                    'giver_name' => $row->giver_name,
                    'receiver_id' => $row->receiver_id ? (int) $row->receiver_id : null,
                    'receiver_name' => $row->receiver_name,
                    'from_zone' => $row->subzona_code ?: 'Gudang',
                    'to_zone' => $row->subzona_code ?: 'Gudang',
                    'reason' => $row->notes ?: '',
                    'return_condition' => $row->condition ?: 'BAIK',
                    'return_notes' => $row->notes ?: '',
                    'attachment' => null,
                ];
            }

            return response()->json([
                'success' => true,
                'borrows' => $borrows,
                'returns' => $returns,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching transactions: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store new borrow transaction(s)
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = JWTAuth::user();
            $operatorId = $user ? $user->id : null;

            $validator = Validator::make($request->all(), [
                'giver_id' => 'required|integer',
                'receiver_id' => 'required|integer',
                'transaction_date' => 'nullable|string',
                'items' => 'required|array',
                'items.*.kd_barang' => 'required|string',
                'items.*.notes' => 'nullable|string',
                'items.*.condition' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $giverId = $request->input('giver_id');
            $receiverId = $request->input('receiver_id');
            $transactionDate = $request->input('transaction_date') 
                ? Carbon::parse($request->input('transaction_date')) 
                : Carbon::now();

            $giverUser = DB::table('users')->where('id', $giverId)->first();
            $receiverUser = DB::table('users')->where('id', $receiverId)->first();

            if ($giverUser && $receiverUser && $giverUser->branches_code !== $receiverUser->branches_code) {
                // Cross-branch BAST is only allowed if the receiver is an admin in their branch
                if (!in_array($receiverUser->role_code, ['superadmin', 'admin'])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Serah terima aset antar cabang (Branch) hanya dapat dilakukan kepada sesama Admin IT. Anda tidak dapat melakukan serah terima langsung ke User biasa di cabang lain.'
                    ], 403);
                }
            }

            $insertedIds = [];
            $bastNumber = null; // Single BAST number for entire batch

            foreach ($request->input('items') as $item) {
                $sn = $item['kd_barang'];
                $notes = $item['notes'] ?? null;
                $condition = $item['condition'] ?? 'BAIK';

                // Fetch id_pekerjaan from barang/assets
                $barangInfo = DB::table('barang AS b')
                    ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                    ->where('b.kd_barang', $sn)
                    ->select(DB::raw('COALESCE(b.id_pekerjaan, a.id_pekerjaan) AS id_pekerjaan'))
                    ->first();
                $idPekerjaan = $barangInfo ? $barangInfo->id_pekerjaan : null;

                // Set all previous transactions for this serial number as not current
                DB::table('asset_transactions')
                    ->where('kd_barang', $sn)
                    ->update(['is_current' => false]);

                // Insert BORROW transaction
                $txId = DB::table('asset_transactions')->insertGetId([
                    'kd_barang' => $sn,
                    'transaction_type' => 'BORROW',
                    'performed_by_id' => $operatorId,
                    'condition' => $condition,
                    'notes' => $notes,
                    'giver_id' => $giverId,
                    'receiver_id' => $receiverId,
                    'id_pekerjaan' => $idPekerjaan,
                    'is_current' => true,
                    'created_at' => $transactionDate,
                    'updated_at' => $transactionDate,
                ], 'transaction_id');

                // Generate BAST number from first item's ID, reuse for the rest
                if ($bastNumber === null) {
                    $bastNumber = "BAST-IT/" . $transactionDate->format('Y/m/') . str_pad($txId, 4, '0', STR_PAD_LEFT);
                }
                DB::table('asset_transactions')->where('transaction_id', $txId)->update(['bast_number' => $bastNumber]);

                // Update barang's physical location (subzona) and branch ownership to receiver's branch
                $receiverUser = DB::table('users')->where('id', $receiverId)->first();
                if ($receiverUser && $receiverUser->branches_code) {
                    $receiverSubzona = DB::table('subzona')
                        ->join('zonas', 'subzona.zona_code', '=', 'zonas.zona_code')
                        ->where('zonas.branch_code', $receiverUser->branches_code)
                        ->select('subzona.subzona_code')
                        ->first();
                    
                    $updateData = [];
                    if ($receiverSubzona) {
                        $updateData['subzona_code'] = $receiverSubzona->subzona_code;
                    }
                    if (Schema::hasColumn('barang', 'branch')) {
                        $updateData['branch'] = $receiverUser->branches_code;
                    }

                    if (!empty($updateData)) {
                        DB::table('barang')
                            ->where('kd_barang', $sn)
                            ->update($updateData);
                    }
                }

                $insertedIds[] = $txId;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Berita Acara Serah Terima berhasil disimpan',
                'inserted_ids' => $insertedIds,
                'bast_number' => $bastNumber,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error storing transaction: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Record a return transaction
     */
    public function returnAsset(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = JWTAuth::user();
            $operatorId = $user ? $user->id : null;

            // Check if it's a batch request (has 'items' array) or a single request
            $isBatch = $request->has('items');

            if ($isBatch) {
                $validator = Validator::make($request->all(), [
                    'giver_id' => 'required|integer',
                    'receiver_id' => 'required|integer',
                    'return_date' => 'nullable|string',
                    'items' => 'required|array',
                    'items.*.code' => 'required|string',
                    'items.*.return_notes' => 'nullable|string',
                    'items.*.return_condition' => 'nullable|string',
                ]);
            } else {
                $validator = Validator::make($request->all(), [
                    'code' => 'required|string',
                    'giver_id' => 'required|integer',
                    'receiver_id' => 'required|integer',
                    'return_date' => 'nullable|string',
                    'return_notes' => 'nullable|string',
                    'return_condition' => 'nullable|string',
                ]);
            }

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $giverId = $request->input('giver_id');
            $receiverId = $request->input('receiver_id');
            $returnDate = $request->input('return_date') 
                ? Carbon::parse($request->input('return_date')) 
                : Carbon::now();

            $itemsToProcess = [];
            if ($isBatch) {
                $itemsToProcess = $request->input('items');
            } else {
                $itemsToProcess = [
                    [
                        'code' => $request->input('code'),
                        'return_notes' => $request->input('return_notes'),
                        'return_condition' => $request->input('return_condition'),
                    ]
                ];
            }

            $insertedIds = [];
            $bastNumber = null;

            foreach ($itemsToProcess as $item) {
                $sn = $item['code'];
                $notes = $item['return_notes'] ?? null;
                $condition = $item['return_condition'] ?? 'BAIK';

                // Fetch id_pekerjaan from barang/assets
                $barangInfo = DB::table('barang AS b')
                    ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                    ->where('b.kd_barang', $sn)
                    ->select(DB::raw('COALESCE(b.id_pekerjaan, a.id_pekerjaan) AS id_pekerjaan'))
                    ->first();
                $idPekerjaan = $barangInfo ? $barangInfo->id_pekerjaan : null;

                // Set all previous transactions for this serial number as not current
                DB::table('asset_transactions')
                    ->where('kd_barang', $sn)
                    ->update(['is_current' => false]);

                // Insert RETURN transaction
                $txId = DB::table('asset_transactions')->insertGetId([
                    'kd_barang' => $sn,
                    'transaction_type' => 'RETURN',
                    'performed_by_id' => $operatorId,
                    'condition' => $condition,
                    'notes' => $notes,
                    'giver_id' => $giverId,
                    'receiver_id' => $receiverId,
                    'id_pekerjaan' => $idPekerjaan,
                    'is_current' => true,
                    'created_at' => $returnDate,
                    'updated_at' => $returnDate,
                ], 'transaction_id');

                if ($bastNumber === null) {
                    $bastNumber = "BAST-IT/" . $returnDate->format('Y/m/') . str_pad($txId, 4, '0', STR_PAD_LEFT);
                }
                DB::table('asset_transactions')->where('transaction_id', $txId)->update(['bast_number' => $bastNumber]);

                // Update barang's physical location (subzona) and branch ownership to receiver's branch
                $receiverUser = DB::table('users')->where('id', $receiverId)->first();
                if ($receiverUser && $receiverUser->branches_code) {
                    $receiverSubzona = DB::table('subzona')
                        ->join('zonas', 'subzona.zona_code', '=', 'zonas.zona_code')
                        ->where('zonas.branch_code', $receiverUser->branches_code)
                        ->select('subzona.subzona_code')
                        ->first();
                    
                    $updateData = [];
                    if ($receiverSubzona) {
                        $updateData['subzona_code'] = $receiverSubzona->subzona_code;
                    }
                    if (Schema::hasColumn('barang', 'branch')) {
                        $updateData['branch'] = $receiverUser->branches_code;
                    }

                    if (!empty($updateData)) {
                        DB::table('barang')
                            ->where('kd_barang', $sn)
                            ->update($updateData);
                    }
                }
                
                $insertedIds[] = $txId;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pengembalian barang berhasil dicatat',
                'id' => $txId
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error returning asset: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $transaction = DB::table('asset_transactions')->where('transaction_id', $id)->first();
            if (!$transaction) {
                return response()->json(['success' => false, 'message' => 'Transaksi tidak ditemukan'], 404);
            }

            // Restore is_current to previous transaction if this was a BORROW
            if ($transaction->transaction_type === 'BORROW') {
                $previousTransaction = DB::table('asset_transactions')
                    ->where('kd_barang', $transaction->kd_barang)
                    ->where('transaction_id', '<', $id)
                    ->orderBy('transaction_id', 'desc')
                    ->first();
                
                if ($previousTransaction) {
                    DB::table('asset_transactions')
                        ->where('transaction_id', $previousTransaction->transaction_id)
                        ->update(['is_current' => true]);
                }
            }

            DB::table('asset_transactions')->where('transaction_id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Transaksi berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error deleting transaction: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
