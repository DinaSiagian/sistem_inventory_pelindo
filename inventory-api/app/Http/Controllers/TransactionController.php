<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;

class TransactionController extends Controller
{
    /**
     * Get list of borrow and return transactions
     */
    public function index(Request $request)
    {
        try {
            // 1. Fetch Borrows
            $borrowRows = DB::table('asset_transactions AS t')
                ->join('barang AS b', 't.serial_number', '=', 'b.serial_number')
                ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                ->leftJoin('users AS op', 't.performed_by_id', '=', 'op.id')
                ->leftJoin('users AS gv', 't.giver_id', '=', 'gv.id')
                ->leftJoin('users AS rc', 't.receiver_id', '=', 'rc.id')
                ->where('t.transaction_type', '=', 'BORROW')
                ->leftJoin('budget_projects AS bp', function ($join) {
                    $join->on('t.id_pekerjaan', '=', 'bp.id_pekerjaan')
                         ->orOn('b.id_pekerjaan', '=', 'bp.id_pekerjaan')
                         ->orOn('a.id_pekerjaan', '=', 'bp.id_pekerjaan');
                })
                ->select([
                    't.transaction_id',
                    't.bast_number',
                    't.serial_number',
                    't.created_at AS transaction_date',
                    't.giver_id',
                    't.receiver_id',
                    't.performed_by_id AS operator_id',
                    't.condition',
                    't.notes',
                    'b.subzona_code',
                    'a.name AS asset_name',
                    'a.acquisition_value AS price',
                    DB::raw('COALESCE(t.id_pekerjaan, b.id_pekerjaan, a.id_pekerjaan) AS id_pekerjaan'),
                    'a.procurement_date',
                    'bp.nm_pekerjaan AS pekerjaan_nama',
                    'bp.no_pr AS pekerjaan_no_anggaran',
                    'bp.jenis_anggaran AS pekerjaan_jenis',
                ])
                ->orderBy('t.created_at', 'desc')
                ->get();

            $borrows = [];
            foreach ($borrowRows as $row) {
                // A BORROW is "completed/returned" if any newer transaction exists for this serial number.
                // This covers: (1) explicit RETURN transactions, and (2) subsequent BORROW transactions
                // where the asset was transferred to another user (user-to-user serah terima).
                $isReturned = DB::table('asset_transactions')
                    ->where('serial_number', $row->serial_number)
                    ->where('transaction_id', '>', $row->transaction_id)
                    ->exists();

                $borrows[] = [
                    'id' => (int) $row->transaction_id,
                    'bast_number' => $row->bast_number,
                    'pekerjaan_kode' => $row->id_pekerjaan,
                    'pekerjaan' => [
                        'kode' => $row->id_pekerjaan,
                        'nama' => $row->pekerjaan_nama ?? null,
                        'no_anggaran' => $row->pekerjaan_no_anggaran ?? null,
                        'jenis' => $row->pekerjaan_jenis ?? null,
                        'tahun_pengadaan' => $row->procurement_date ? date('Y', strtotime($row->procurement_date)) : null,
                    ],
                    'code' => $row->serial_number,
                    'name' => $row->asset_name,
                    'price' => (float) $row->price,
                    'tahun_pengadaan' => $row->procurement_date ? date('Y', strtotime($row->procurement_date)) : null,
                    'borrow_date' => Carbon::parse($row->transaction_date)->format('Y-m-d\TH:i:s'),
                    'due_date' => Carbon::parse($row->transaction_date)->addDays(30)->format('Y-m-d'),
                    'performed_by_id' => $row->operator_id ? (int) $row->operator_id : null,
                    'giver_id' => $row->giver_id ? (int) $row->giver_id : null,
                    'receiver_id' => $row->receiver_id ? (int) $row->receiver_id : null,
                    'from_zone' => $row->subzona_code ?: 'Gudang',
                    'to_zone' => $row->subzona_code ?: 'Gudang',
                    'reason' => $row->notes ?: 'Kebutuhan operasional',
                    'condition' => $row->condition ?: 'BAIK',
                    'attachment' => null,
                    'notes' => $row->notes ?: '',
                    'is_returned' => $isReturned,
                ];
            }

            // 2. Fetch Returns
            $returnRows = DB::table('asset_transactions AS t')
                ->join('barang AS b', 't.serial_number', '=', 'b.serial_number')
                ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                ->leftJoin('users AS op', 't.performed_by_id', '=', 'op.id')
                ->leftJoin('users AS gv', 't.giver_id', '=', 'gv.id')
                ->leftJoin('users AS rc', 't.receiver_id', '=', 'rc.id')
                ->where('t.transaction_type', '=', 'RETURN')
                ->leftJoin('budget_projects AS bp', function ($join) {
                    $join->on('t.id_pekerjaan', '=', 'bp.id_pekerjaan')
                         ->orOn('b.id_pekerjaan', '=', 'bp.id_pekerjaan')
                         ->orOn('a.id_pekerjaan', '=', 'bp.id_pekerjaan');
                })
                ->select([
                    't.transaction_id',
                    't.bast_number',
                    't.serial_number',
                    't.created_at AS transaction_date',
                    't.giver_id',
                    't.receiver_id',
                    't.performed_by_id AS operator_id',
                    't.condition',
                    't.notes',
                    'b.subzona_code',
                    'a.name AS asset_name',
                    'a.acquisition_value AS price',
                    DB::raw('COALESCE(t.id_pekerjaan, b.id_pekerjaan, a.id_pekerjaan) AS id_pekerjaan'),
                    'a.procurement_date',
                    'bp.nm_pekerjaan AS pekerjaan_nama',
                    'bp.no_pr AS pekerjaan_no_anggaran',
                    'bp.jenis_anggaran AS pekerjaan_jenis',
                ])
                ->orderBy('t.created_at', 'desc')
                ->get();

            $returns = [];
            foreach ($returnRows as $row) {
                // Find matching borrow transaction that was returned by this one (the latest borrow before this return)
                $matchingBorrow = DB::table('asset_transactions')
                    ->where('serial_number', $row->serial_number)
                    ->where('transaction_type', 'BORROW')
                    ->where('created_at', '<', $row->transaction_date) // Match using created_at
                    ->orderBy('created_at', 'desc')
                    ->first();

                $returns[] = [
                    'id' => (int) $row->transaction_id,
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
                    'code' => $row->serial_number,
                    'name' => $row->asset_name,
                    'price' => (float) $row->price,
                    'tahun_pengadaan' => $row->procurement_date ? date('Y', strtotime($row->procurement_date)) : null,
                    'borrow_date' => $matchingBorrow ? Carbon::parse($matchingBorrow->created_at)->format('Y-m-d\TH:i:s') : Carbon::parse($row->transaction_date)->subDays(30)->format('Y-m-d\TH:i:s'),
                    'return_date' => Carbon::parse($row->transaction_date)->format('Y-m-d\TH:i:s'),
                    'performed_by_id' => $row->operator_id ? (int) $row->operator_id : null,
                    'giver_id' => $row->giver_id ? (int) $row->giver_id : null,
                    'receiver_id' => $row->receiver_id ? (int) $row->receiver_id : null,
                    'from_zone' => $row->subzona_code ?: 'Gudang',
                    'to_zone' => $row->subzona_code ?: 'Gudang',
                    'reason' => $row->notes ?: 'Kembali operasional',
                    'return_condition' => $row->condition ?: 'BAIK',
                    'return_notes' => $row->notes ?: 'Dikembalikan dalam kondisi baik',
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
                'items.*.serial_number' => 'required|string',
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

            $insertedIds = [];

            foreach ($request->input('items') as $item) {
                $sn = $item['serial_number'];
                $notes = $item['notes'] ?? null;
                $condition = $item['condition'] ?? 'BAIK';

                // Fetch id_pekerjaan from barang/assets
                $barangInfo = DB::table('barang AS b')
                    ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                    ->where('b.serial_number', $sn)
                    ->select(DB::raw('COALESCE(b.id_pekerjaan, a.id_pekerjaan) AS id_pekerjaan'))
                    ->first();
                $idPekerjaan = $barangInfo ? $barangInfo->id_pekerjaan : null;

                // Set all previous transactions for this serial number as not current
                DB::table('asset_transactions')
                    ->where('serial_number', $sn)
                    ->update(['is_current' => false]);



                // Insert BORROW transaction
                $txId = DB::table('asset_transactions')->insertGetId([
                    'serial_number' => $sn,
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

                $bastNumber = "BAST-IT/" . $transactionDate->format('Y/m/') . str_pad($txId, 4, '0', STR_PAD_LEFT);
                DB::table('asset_transactions')->where('transaction_id', $txId)->update(['bast_number' => $bastNumber]);

                $insertedIds[] = $txId;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Berita Acara Serah Terima berhasil disimpan',
                'inserted_ids' => $insertedIds
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

            $validator = Validator::make($request->all(), [
                'code' => 'required|string', // serial_number
                'giver_id' => 'required|integer',
                'receiver_id' => 'required|integer',
                'return_date' => 'nullable|string',
                'return_notes' => 'nullable|string',
                'return_condition' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $sn = $request->input('code');
            $giverId = $request->input('giver_id');
            $receiverId = $request->input('receiver_id');
            $returnDate = $request->input('return_date') 
                ? Carbon::parse($request->input('return_date')) 
                : Carbon::now();
            $notes = $request->input('return_notes') ?? null;
            $condition = $request->input('return_condition') ?? 'BAIK';

            // Fetch id_pekerjaan from barang/assets
            $barangInfo = DB::table('barang AS b')
                ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                ->where('b.serial_number', $sn)
                ->select(DB::raw('COALESCE(b.id_pekerjaan, a.id_pekerjaan) AS id_pekerjaan'))
                ->first();
            $idPekerjaan = $barangInfo ? $barangInfo->id_pekerjaan : null;

            // Set all previous transactions for this serial number as not current
            DB::table('asset_transactions')
                ->where('serial_number', $sn)
                ->update(['is_current' => false]);



            // Insert RETURN transaction
            $txId = DB::table('asset_transactions')->insertGetId([
                'serial_number' => $sn,
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

            $bastNumber = "BAST-IT/" . $returnDate->format('Y/m/') . str_pad($txId, 4, '0', STR_PAD_LEFT);
            DB::table('asset_transactions')->where('transaction_id', $txId)->update(['bast_number' => $bastNumber]);

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
                    ->where('serial_number', $transaction->serial_number)
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
