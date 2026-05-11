<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActivityLog;
use Exception;

class LogController extends Controller
{
    /**
     * GET /api/logs — Daftar log aktivitas
     */
    public function index(Request $request)
    {
        try {
            // Batasi pengambilan log terakhir (default 100) agar tidak memberatkan loading
            $logs = ActivityLog::orderBy('created_at', 'desc')
                ->paginate($request->input('per_page', 100));

            return response()->json([
                'success' => true,
                'data'    => $logs->items(),
                'meta'    => [
                    'current_page' => $logs->currentPage(),
                    'last_page'    => $logs->lastPage(),
                    'total'        => $logs->total(),
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
