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
            $logs = ActivityLog::orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data'    => $logs,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
