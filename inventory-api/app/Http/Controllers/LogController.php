<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;

class LogController extends Controller
{
    /**
     * GET /api/logs — Dummy logs (activity log belum ada tabel di DB)
     * Mengembalikan array kosong agar frontend tidak error
     */
    public function index(Request $request)
    {
        try {
            return response()->json([
                'success' => true,
                'data'    => [],
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
