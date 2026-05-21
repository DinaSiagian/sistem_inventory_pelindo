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
                ->leftJoin('users AS op', 't.operator_id', '=', 'op.id')
                ->leftJoin('users AS gv', 't.giver_id', '=', 'gv.id')
                ->leftJoin('users AS rc', 't.receiver_id', '=', 'rc.id')
                ->where('t.transaction_type', '=', 'BORROW')
                ->select([
                    't.transaction_id',
                    't.serial_number',
                    't.transaction_date',
                    't.giver_id',
                    't.receiver_id',
                    't.operator_id',
                    't.notes',
                    'b.subzona_code',
                    'a.name AS asset_name',
                    'a.id_pekerjaan',
                ])
                ->orderBy('t.transaction_date', 'desc')
                ->get();

            $borrows = [];
            foreach ($borrowRows as $row) {
                // Check if returned by seeing if there is a later RETURN transaction for this serial number
                $isReturned = DB::table('asset_transactions')
                    ->where('serial_number', $row->serial_number)
                    ->where('transaction_type', 'RETURN')
                    ->where('transaction_date', '>', $row->transaction_date)
                    ->exists();

                $borrows[] = [
                    'id' => (int) $row->transaction_id,
                    'pekerjaan_kode' => $row->id_pekerjaan,
                    'code' => $row->serial_number,
                    'name' => $row->asset_name,
                    'borrow_date' => Carbon::parse($row->transaction_date)->format('Y-m-d\TH:i:s'),
                    'due_date' => Carbon::parse($row->transaction_date)->addDays(30)->format('Y-m-d'),
                    'performed_by_id' => $row->operator_id ? (int) $row->operator_id : null,
                    'giver_id' => $row->giver_id ? (int) $row->giver_id : null,
                    'receiver_id' => $row->receiver_id ? (int) $row->receiver_id : null,
                    'from_zone' => $row->subzona_code ?: 'Gudang',
                    'to_zone' => $row->subzona_code ?: 'Gudang',
                    'reason' => $row->notes ?: 'Kebutuhan operasional',
                    'condition' => 'BAIK',
                    'attachment' => null,
                    'notes' => $row->notes ?: '',
                    'is_returned' => $isReturned,
                ];
            }

            // 2. Fetch Returns
            $returnRows = DB::table('asset_transactions AS t')
                ->join('barang AS b', 't.serial_number', '=', 'b.serial_number')
                ->join('assets AS a', 'b.asset_code', '=', 'a.asset_code')
                ->leftJoin('users AS op', 't.operator_id', '=', 'op.id')
                ->leftJoin('users AS gv', 't.giver_id', '=', 'gv.id')
                ->leftJoin('users AS rc', 't.receiver_id', '=', 'rc.id')
                ->where('t.transaction_type', '=', 'RETURN')
                ->select([
                    't.transaction_id',
                    't.serial_number',
                    't.transaction_date',
                    't.giver_id',
                    't.receiver_id',
                    't.operator_id',
                    't.notes',
                    'b.subzona_code',
                    'a.name AS asset_name',
                    'a.id_pekerjaan',
                ])
                ->orderBy('t.transaction_date', 'desc')
                ->get();

            $returns = [];
            foreach ($returnRows as $row) {
                // Find matching borrow transaction that was returned by this one (the latest borrow before this return)
                $matchingBorrow = DB::table('asset_transactions')
                    ->where('serial_number', $row->serial_number)
                    ->where('transaction_type', 'BORROW')
                    ->where('transaction_date', '<', $row->transaction_date)
                    ->orderBy('transaction_date', 'desc')
                    ->first();

                $returns[] = [
                    'id' => (int) $row->transaction_id,
                    'original_id' => $matchingBorrow ? (int) $matchingBorrow->transaction_id : null,
                    'pekerjaan_kode' => $row->id_pekerjaan,
                    'code' => $row->serial_number,
                    'name' => $row->asset_name,
                    'borrow_date' => $matchingBorrow ? Carbon::parse($matchingBorrow->transaction_date)->format('Y-m-d\TH:i:s') : Carbon::parse($row->transaction_date)->subDays(30)->format('Y-m-d\TH:i:s'),
                    'return_date' => Carbon::parse($row->transaction_date)->format('Y-m-d\TH:i:s'),
                    'performed_by_id' => $row->operator_id ? (int) $row->operator_id : null,
                    'giver_id' => $row->giver_id ? (int) $row->giver_id : null,
                    'receiver_id' => $row->receiver_id ? (int) $row->receiver_id : null,
                    'from_zone' => $row->subzona_code ?: 'Gudang',
                    'to_zone' => $row->subzona_code ?: 'Gudang',
                    'reason' => $row->notes ?: 'Kembali operasional',
                    'return_condition' => 'BAIK',
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

                // Set all previous transactions for this serial number as not current
                DB::table('asset_transactions')
                    ->where('serial_number', $sn)
                    ->update(['is_current' => false]);

                // Insert BORROW transaction
                $txId = DB::table('asset_transactions')->insertGetId([
                    'serial_number' => $sn,
                    'transaction_type' => 'BORROW',
                    'transaction_date' => $transactionDate,
                    'operator_id' => $operatorId,
                    'notes' => $notes,
                    'giver_id' => $giverId,
                    'receiver_id' => $receiverId,
                    'is_current' => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ], 'transaction_id');

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

            // Set all previous transactions for this serial number as not current
            DB::table('asset_transactions')
                ->where('serial_number', $sn)
                ->update(['is_current' => false]);

            // Insert RETURN transaction
            $txId = DB::table('asset_transactions')->insertGetId([
                'serial_number' => $sn,
                'transaction_type' => 'RETURN',
                'transaction_date' => $returnDate,
                'operator_id' => $operatorId,
                'notes' => $notes,
                'giver_id' => $giverId,
                'receiver_id' => $receiverId,
                'is_current' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ], 'transaction_id');

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
}
