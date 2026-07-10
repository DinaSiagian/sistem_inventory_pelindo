<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Schema;
class BarangController extends Controller
{
    public function publicShow($kode)
    {
        try {
            // Find the unit in 'barang' table matching kd_barang, serial_number, or asset_code
            $unit = DB::table('barang')
                ->where('kd_barang', $kode)
                ->orWhere('serial_number', $kode)
                ->orWhere('asset_code', $kode)
                ->first();
            if (!$unit) {
                return response()->json(['success' => false, 'message' => 'Unit aset tidak ditemukan'], 404);
            }

            // Get the main asset in 'assets' table
            $asset = DB::table('assets')->where('asset_code', $unit->asset_code)->whereNull('deleted_at')->first();
            if (!$asset) {
                return response()->json(['success' => false, 'message' => 'Data induk aset tidak ditemukan'], 404);
            }

            // Get active transaction for status
            $tx = DB::table('asset_transactions')
                    ->leftJoin('users', 'asset_transactions.receiver_id', '=', 'users.id')
                    ->select('asset_transactions.*', 'users.name as borrower_name')
                    ->where('asset_transactions.kd_barang', $unit->kd_barang)
                    ->where('asset_transactions.is_current', true)
                    ->first();
            $status = ($tx && strtoupper($tx->transaction_type) === 'BORROW') ? 'Dipinjam' : 'Tersedia';
            $pemilik = ($status === 'Dipinjam' && !empty($tx->borrower_name)) ? $tx->borrower_name : 'Admin IT';

            // Get location hierarchy
            $locMatch = DB::table('subzona')
                ->join('zonas', 'subzona.zona_code', '=', 'zonas.zona_code')
                ->join('branches', 'zonas.branch_code', '=', 'branches.branch_code')
                ->select('subzona.name as subzona_name', 'zonas.name as zona_name', 'branches.name as branch_name')
                ->where('subzona.subzona_code', $unit->subzona_code)
                ->first();
            
            $fullLocationStr = $locMatch 
                ? $locMatch->branch_name . ' / ' . $locMatch->zona_name . ' / ' . $locMatch->subzona_name 
                : ($unit->subzona_code ?: 'Belum dialokasikan / Gudang');

            // Get specs
            $specs = DB::table('asset_specifications')->where('asset_code', $asset->asset_code)->get();
            $formattedSpecs = $specs->map(function ($s) {
                return [
                    'name' => $s->spec_label,
                    'value' => $s->spec_value . ' ' . $s->spec_unit
                ];
            });

            // Get project name if assigned
            $pekerjaanName = null;
            if (!empty($unit->id_pekerjaan)) {
                $proj = DB::table('budget_projects')->where('id_pekerjaan', $unit->id_pekerjaan)->first();
                if ($proj) {
                    $pekerjaanName = $proj->nm_pekerjaan;
                }
            }

            // Return safe public details
            return response()->json([
                'success' => true,
                'data' => [
                    'asset_id' => $asset->asset_code,
                    'unit_id' => $unit->kd_barang,
                    'id_pekerjaan' => $unit->id_pekerjaan,
                    'nm_pekerjaan' => $pekerjaanName,
                    'name' => $asset->name,
                    'merek' => $asset->merek ?? '-',
                    'tipe' => $asset->tipe ?? '-',
                    'category' => $asset->device_code,
                    'status' => $status,
                    'pemilik' => $pemilik,
                    'location' => $fullLocationStr,
                    'photo' => $asset->photo,
                    'specs' => $formattedSpecs,
                    'custom_specs' => []
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Public Show Error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage() . ' di baris ' . $e->getLine()], 500);
        }
    }

    public function index()
    {
        try {
            // Filter by user's branch (branch-scoped data isolation)
            $user = null;
            try { $user = JWTAuth::user(); } catch (\Exception $e) {}
            $userBranchCode = $user ? $user->branches_code : null;

            // Get all subzona codes that belong to user's branch
            $branchSubzonaCodes = [];
            if ($userBranchCode) {
                $branchSubzonaCodes = DB::table('subzona')
                    ->join('zonas', 'subzona.zona_code', '=', 'zonas.zona_code')
                    ->where('zonas.branch_code', $userBranchCode)
                    ->pluck('subzona.subzona_code')
                    ->toArray();
            }

            // Fetch all active barang (not soft-deleted)
            $barangAll = DB::table('barang')->whereNull('deleted_at')->get();

            $allSubzonas = DB::table('subzona')
                ->join('zonas', 'subzona.zona_code', '=', 'zonas.zona_code')
                ->pluck('zonas.branch_code', 'subzona.subzona_code')
                ->toArray();

            if ($userBranchCode && !empty($branchSubzonaCodes)) {
                $barang = $barangAll->filter(function($b) use ($branchSubzonaCodes, $userBranchCode, $allSubzonas) {
                    $currentBranchCode = $allSubzonas[$b->subzona_code] ?? null;

                    // Jika barang sudah ditempatkan di sebuah subzona (memiliki lokasi fisik yang valid),
                    // maka barang tersebut MURNI milik branch di mana subzona itu berada.
                    if ($currentBranchCode) {
                        return $currentBranchCode === $userBranchCode;
                    }
                    
                    // Fallback jika belum memiliki subzona (belum pernah diserahterimakan ke subzona spesifik)
                    // Include ONLY if branch column exists and matches the creator's branch
                    if (isset($b->branch) && $b->branch === $userBranchCode) return true;
                    
                    return false;
                })->values();
            } else {
                $barang = $barangAll;
            }

            // Only fetch assets that have at least one unit in user's branch
            $branchAssetCodes = $barang->pluck('asset_code')->unique()->values()->toArray();
            $assets = !empty($branchAssetCodes)
                ? DB::table('assets')->whereIn('asset_code', $branchAssetCodes)->get()
                : collect([]);

            $specs = !empty($branchAssetCodes)
                ? DB::table('asset_specifications')->whereIn('asset_code', $branchAssetCodes)->get()
                : collect([]);
            
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

            // OPTIMIZATION: Fetch all current transactions at once (Prevent N+1 Query)
            $allKdBarang = $barang->pluck('kd_barang')->unique()->toArray();
            $activeTransactions = !empty($allKdBarang)
                ? DB::table('asset_transactions')
                    ->whereIn('kd_barang', $allKdBarang)
                    ->where('is_current', true)
                    ->get()
                    ->keyBy('kd_barang')
                : collect();

            $grouped = $assets->map(function ($item) use ($barang, $specs, $locations, $activeTransactions) {
                $itemUnits = $barang->where('asset_code', $item->asset_code)->values();
                $itemSpecs = $specs->where('asset_code', $item->asset_code)->values();

                // Get location details from the first unit's subzona
                $firstUnit = $itemUnits->first();
                $loc = $firstUnit ? $locations->where('subzona_code', $firstUnit->subzona_code)->first() : null;

                $unitsArray = $itemUnits->map(function ($u) use ($locations, $activeTransactions) {
                    // Get active BAST transaction from memory instead of DB
                    $tx = $activeTransactions->get($u->kd_barang);

                    $locMatch = $locations->where('subzona_code', $u->subzona_code)->first();
                    $fullLocationStr = $locMatch 
                        ? $locMatch->branch_name . ' / ' . $locMatch->zona_name . ' / ' . $locMatch->subzona_name 
                        : ($u->subzona_code ?: '-');

                    $cond = $tx ? $tx->condition : 'Baik';
                    $status = 'Tersedia';
                    if ($tx && strtoupper($tx->transaction_type) === 'BORROW') {
                        $status = 'Dipinjam';
                    } else {
                        $c = strtoupper($cond);
                        if (in_array($c, ['RUSAK', 'HILANG', 'DIPERBAIKI', 'MINOR_DAMAGE', 'RUSAK RINGAN', 'RUSAK BERAT', 'DAMAGED', 'MISSING'])) {
                            $status = 'Non-Operasional';
                        }
                    }

                    return [
                        'kd_barang' => $u->kd_barang,
                        'serialNumber' => $u->serial_number,
                        'location' => $fullLocationStr,
                        'id_pekerjaan' => $u->id_pekerjaan,
                        'status' => $status,
                        'condition' => $cond
                    ];
                })->toArray();

                $status = 'Tersedia';
                if (count($unitsArray) > 0) {
                    $tersediaCount = count(array_filter($unitsArray, fn($u) => $u['status'] === 'Tersedia'));
                    if ($tersediaCount === 0) {
                        $borrowedCount = count(array_filter($unitsArray, fn($u) => $u['status'] === 'Dipinjam'));
                        $status = $borrowedCount > 0 ? 'Dipinjam' : 'Non-Operasional';
                    }
                }
                $condition = count($unitsArray) > 0 ? $unitsArray[0]['condition'] : 'Baik';

                return [
                    'id' => $item->asset_code,
                    'name' => $item->name,
                    'merek' => $item->merek ?? '',
                    'tipe' => $item->tipe ?? '',
                    'category' => $item->device_code,
                    'tipeAset' => $item->tipe ?? $item->name, // Map tipe to tipeAset if available
                    'entitas' => $loc ? $loc->entity_code : ($firstUnit->entitas ?? '-'),
                    'branch' => $loc ? $loc->branch_code : ($firstUnit->branch ?? '-'),
                    'zona' => $loc ? $loc->zona_code : ($firstUnit->zona ?? '-'),
                    'subzona' => $loc ? $loc->subzona_code : ($firstUnit->subzona_code ?? '-'),
                    'value' => (float)$item->acquisition_value,
                    'procurement_date' => $item->procurement_date,
                    'tahun_pengadaan' => $item->procurement_date ? date('Y', strtotime($item->procurement_date)) : null,
                    'id_pekerjaan' => $item->id_pekerjaan,
                    'quantity' => $itemUnits->count(),
                    'units' => $unitsArray,
                    'status' => $status,
                    'condition' => $condition,
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

    private function processPhoto($photoData)
    {
        if (empty($photoData)) return null;
        
        if (is_array($photoData) && !empty($photoData['dataUrl'])) {
            $dataUrl = $photoData['dataUrl'];
            if (strpos($dataUrl, 'data:image') === 0) {
                $image_parts = explode(";base64,", $dataUrl);
                if (count($image_parts) >= 2) {
                    $image_base64 = base64_decode($image_parts[1]);
                    $originalName = $photoData['name'] ?? '';
                    $fileName = !empty($originalName) ? basename($originalName) : (uniqid() . '.png');
                    $dir = app()->basePath('public/uploads/assets');
                    if (!is_dir($dir)) {
                        mkdir($dir, 0777, true);
                    }
                    file_put_contents($dir . '/' . $fileName, $image_base64);

                    // Try to automatically find the actual local path of the file on the user's laptop
                    $localPath = $this->findLocalFilePath($fileName, $dataUrl);
                    if ($localPath) {
                        return $localPath;
                    }

                    return isset($photoData['path']) && !empty($photoData['path']) ? $photoData['path'] : '/uploads/assets/' . $fileName;
                }
            }
        }
        
        return is_array($photoData) ? ($photoData['path'] ?? $photoData['name'] ?? null) : $photoData;
    }

    private function findLocalFilePath($filename, $base64Data)
    {
        // 1. Get file content to compare
        $targetContent = base64_decode(explode(";base64,", $base64Data)[1] ?? '');
        if (empty($targetContent)) {
            return null;
        }
        $targetSize = strlen($targetContent);
        $targetHash = md5($targetContent);

        // 2. Query the PowerShell search helper
        $path = $this->searchFileInWindows($filename);
        
        // DEBUG LOGGING
        $logFile = app()->basePath('public/debug_search.log');
        $logMsg = "[" . date('Y-m-d H:i:s') . "] Search for: " . $filename . PHP_EOL .
                  "Target size: " . $targetSize . ", Hash: " . $targetHash . PHP_EOL .
                  "PowerShell returned: " . ($path ?? 'NULL') . PHP_EOL;

        if ($path && file_exists($path)) {
            $actualSize = filesize($path);
            $actualHash = md5_file($path);
            $logMsg .= "Actual file size: " . $actualSize . ", Hash: " . $actualHash . PHP_EOL;
            
            // Verify file size and MD5 hash to ensure it is the exact file that was uploaded
            if ($actualSize === $targetSize && $actualHash === $targetHash) {
                $logMsg .= "STATUS: MATCH FOUND!" . PHP_EOL . PHP_EOL;
                file_put_contents($logFile, $logMsg, FILE_APPEND);
                return $path;
            } else {
                $logMsg .= "STATUS: SIZE OR HASH MISMATCH!" . PHP_EOL . PHP_EOL;
            }
        } else {
            $logMsg .= "STATUS: FILE NOT FOUND OR EMPTY PATH!" . PHP_EOL . PHP_EOL;
        }
        file_put_contents($logFile, $logMsg, FILE_APPEND);

        return null;
    }

    private function searchFileInWindows($filename)
    {
        $filenameEscaped = str_replace("'", "''", $filename);
        $userProfile = getenv('USERPROFILE');
        $userProfileEscaped = str_replace("'", "''", $userProfile);

        $psScript = <<<PS
\$filename = '{$filenameEscaped}';
\$userProfile = '{$userProfileEscaped}';

# 1. Try Windows Search Index (instant query, covers indexed files on all drives)
try {
    \$conn = New-Object -ComObject ADODB.Connection
    \$conn.Open("Provider=Search.CollatorDSO;Extended Properties='Application=Windows';")
    \$rs = New-Object -ComObject ADODB.Recordset
    \$query = "SELECT System.ItemPathDisplay FROM SystemIndex WHERE System.ItemName = '\$filename'"
    \$rs.Open(\$query, \$conn)
    while (-not \$rs.EOF) {
        \$path = \$rs.Fields.Item("System.ItemPathDisplay").Value
        if (\$path -like "C:\\Users\\*" -or \$path -like "D:\\*" -or \$path -like "E:\\*") {
            if (Test-Path \$path) {
                Write-Output \$path
                exit
            }
        }
        \$rs.MoveNext()
    }
} catch {}

# 2. Fallback 1: Search common user directories with depth limit of 4
\$searchDirs = @()
if (\$userProfile -and (Test-Path \$userProfile)) {
    \$subFolders = @('Downloads', 'Documents', 'Pictures', 'Desktop', 'OneDrive')
    foreach (\$sub in \$subFolders) {
        \$dir = Join-Path \$userProfile \$sub
        if (Test-Path \$dir) { \$searchDirs += \$dir }
    }
}
if (Test-Path 'C:\\Dokumen') { \$searchDirs += 'C:\\Dokumen' }

foreach (\$dir in \$searchDirs) {
    \$found = Get-ChildItem -Path \$dir -Filter \$filename -Recurse -Depth 4 -File -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
    if (\$found) {
        Write-Output \$found
        exit
    }
}

# 3. Fallback 2: Check other drive roots with depth limit of 2 (skipping system directories)
for (\$i = 67; \$i -le 90; \$i++) {
    \$drive = "\$([char]\$i):" + [char]92
    if (Test-Path \$drive) {
        \$subdirs = Get-ChildItem -Path \$drive -Directory -ErrorAction SilentlyContinue
        foreach (\$s in \$subdirs) {
            if (\$s.Name -in @('Windows', 'Program Files', 'Program Files (x86)', 'ProgramData', 'Users', 'System Volume Information', '\$Recycle.Bin', 'msocache')) { continue }
            \$found = Get-ChildItem -Path \$s.FullName -Filter \$filename -Recurse -Depth 2 -File -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
            if (\$found) {
                Write-Output \$found
                exit
            }
        }
    }
}
PS;

        // PowerShell -EncodedCommand expects UTF-16LE base64 encoded string to avoid escaping issues
        $utf16 = mb_convert_encoding($psScript, 'UTF-16LE', 'UTF-8');
        $base64 = base64_encode($utf16);
        $cmd = 'powershell -NoProfile -ExecutionPolicy Bypass -EncodedCommand ' . $base64;
        $output = shell_exec($cmd);
        return $output ? trim($output) : null;
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
                    'CCTV' => 'CCTV CAMERA',
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
                    'HW' => 'HARDWARE',
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

            $proposedId = $data['id'] ?? null;
            $prefix = strtoupper($deviceCode) . '-';
            
            $useExisting = isset($data['use_existing_catalog']) && $data['use_existing_catalog'] == true;

            if ($useExisting && !empty($proposedId) && DB::table('assets')->where('asset_code', $proposedId)->exists()) {
                // Gunakan katalog yang sudah ada, JANGAN buat aset baru
                $finalId = $proposedId;
                
                // Update photo if provided during unit registration
                if (isset($data['photo']) && is_array($data['photo'])) {
                    $newPhoto = $this->processPhoto($data['photo']);
                    if ($newPhoto) {
                        DB::table('assets')->where('asset_code', $finalId)->update([
                            'photo' => $newPhoto,
                            'updated_at' => \Carbon\Carbon::now()
                        ]);
                    }
                }
            } else {
                if (!empty($proposedId) && strpos($proposedId, $prefix) === 0) {
                    $finalId = $proposedId;
                    while (DB::table('assets')->where('asset_code', $finalId)->exists()) {
                        $num = intval(substr($finalId, strlen($prefix)));
                        $finalId = $prefix . str_pad($num + 1, 4, '0', STR_PAD_LEFT);
                    }
                } else {
                    $catPrefix = strtoupper($deviceCode);
                    $allAssets = DB::table('assets')->pluck('asset_code')->toArray();
                    
                    $maxKategori = 0;
                    
                    foreach ($allAssets as $ac) {
                        if (preg_match('/^([A-Z]+)-(\d+)$/', $ac, $matches)) {
                            $cat = $matches[1];
                            $catUrut = intval($matches[2]);
                            
                            if ($cat === $catPrefix && $catUrut > $maxKategori) {
                                $maxKategori = $catUrut;
                            }
                        } elseif (preg_match('/^([A-Z]+)(\d{2})-(\d{3})$/', $ac, $matches)) {
                            $cat = $matches[1];
                            $catUrut = intval($matches[2]);
                            if ($cat === $catPrefix && $catUrut > $maxKategori) {
                                $maxKategori = $catUrut;
                            }
                        }
                    }
                    
                    $kategoriUrut = str_pad($maxKategori + 1, 4, '0', STR_PAD_LEFT);
                    $finalId = $catPrefix . '-' . $kategoriUrut;
                }
                $data['id'] = $finalId;

                // Insert to assets master
                DB::table('assets')->insert([
                    'asset_code' => $finalId,
                    'name' => $data['name'] ?? '-',
                    'merek' => $data['merek'] ?? null,
                    'tipe' => $data['tipe'] ?? null,
                    'device_code' => $deviceCode,
                    'id_pekerjaan' => $data['id_pekerjaan'] ?? null,
                    'acquisition_value' => $data['value'] ?? 0,
                    'procurement_date' => $data['procurementDate'] ?? null,
                    'photo' => $this->processPhoto($data['photo'] ?? null),
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now(),
                ]);
            }
            
            $data['id'] = $finalId;

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

            // Use data from frontend payload instead of parsing the ID string
            // Parsing the ID string breaks if zona/subzona codes contain hyphens
            $entitas = $data['entitas'] ?? null;
            $branch = $data['branch'] ?? null;
            $zona = $data['zona'] ?? null;
            $subzona = $data['subzona'] ?? null;

            // Insert physical unit instances
            if (isset($data['units']) && is_array($data['units'])) {
                $userBranchCode = null;
                try {
                    $jwtUser = JWTAuth::user();
                    if ($jwtUser && $jwtUser->branches_code) {
                        $userBranchCode = $jwtUser->branches_code;
                    }
                } catch (\Exception $e) {}
                
                // Set branch strictly to the creator's branch so it doesn't disappear from user's view,
                // regardless of what branch code was placed in the ID format.
                $ownerBranchCode = $userBranchCode ?: $branch;

                if (!empty($data['custom_kd_barang'])) {
                    // Extract the base prefix and the starting number
                    // E.g. "SPMT-BLW-GDG-LT1-CCTV-0005" -> prefix "SPMT-BLW-GDG-LT1-CCTV", suffix 4
                    if (preg_match('/^(.*)-(\d+)$/', $data['custom_kd_barang'], $matches)) {
                        $customKdPrefix = $matches[1];
                        $customKdSuffix = (int)$matches[2] - 1; // start before the requested sequence
                    } else {
                        $customKdPrefix = $data['custom_kd_barang'];
                        $customKdSuffix = 0;
                    }
                } else {
                    $customKdPrefix = $data['id'];
                    $customKdSuffix = 0;
                    
                    $existingKds = DB::table('barang')->where('kd_barang', 'like', $customKdPrefix . '-%')->pluck('kd_barang')->toArray();
                    foreach ($existingKds as $ekd) {
                        $eparts = explode('-', $ekd);
                        $elast = end($eparts);
                        if (is_numeric($elast)) {
                            $customKdSuffix = max($customKdSuffix, (int)$elast);
                        }
                    }
                }

                foreach ($data['units'] as $idx => $unit) {
                    // Use !empty() instead of ?? to also handle empty strings from frontend
                    $unitLocation = !empty($unit['location'])
                        ? $unit['location']
                        : null;

                    $subzonaCode = $this->resolveSubzonaCode($unitLocation);

                    $sn = !empty($unit['serialNumber']) ? trim($unit['serialNumber']) : null;

                    // Ensure serial_number is globally unique if it is not null
                    $finalSn = $sn;
                    if ($finalSn !== null) {
                        $snSuffix = 2;
                        while (DB::table('barang')->where('serial_number', $finalSn)->exists()) {
                            $finalSn = $sn . '-' . $snSuffix;
                            $snSuffix++;
                        }
                    }

                    $customKdSuffix++;
                    $kd_barang = $customKdPrefix . '-' . str_pad($customKdSuffix, 4, '0', STR_PAD_LEFT);

                    $insertData = [
                        'kd_barang' => $kd_barang,
                        'asset_code' => $data['id'],
                        'serial_number' => $finalSn,
                        'subzona_code' => $subzonaCode,
                        'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                        'created_at' => \Carbon\Carbon::now(),
                    ];

                    // If DB schema was updated, safely insert these columns
                    if (Schema::hasColumn('barang', 'entitas')) {
                        $insertData['entitas'] = $entitas;
                    }
                    if (Schema::hasColumn('barang', 'branch')) {
                        $insertData['branch'] = $ownerBranchCode;
                    }
                    if (Schema::hasColumn('barang', 'zona')) {
                        $insertData['zona'] = $zona;
                    }

                    DB::table('barang')->insert($insertData);
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
                'merek' => $data['merek'] ?? null,
                'tipe' => $data['tipe'] ?? null,
                'device_code' => $deviceCode,
                'id_pekerjaan' => $data['id_pekerjaan'] ?? null,
                'acquisition_value' => $data['value'] ?? 0,
                'procurement_date' => $data['procurementDate'] ?? null,
                'updated_at' => \Carbon\Carbon::now(),
            ];

            if (isset($data['photo'])) {
                $assetData['photo'] = $this->processPhoto($data['photo']);
            }

            DB::table('assets')->where('asset_code', $id)->update($assetData);

            // 2. Sync units (barang table)
            // Fetch current serial numbers
            $existingSns = DB::table('barang')->where('asset_code', $id)->pluck('serial_number')->toArray();
            $newSns = [];

            if (isset($data['units']) && is_array($data['units'])) {
                $existingNullUnits = DB::table('barang')->where('asset_code', $id)->whereNull('serial_number')->orderBy('kd_barang')->get();
                $nullIndex = 0;

                $numericKdCounter = DB::table('barang')->whereRaw("kd_barang ~ '^[0-9]+$'")->max(DB::raw("CAST(kd_barang AS BIGINT)"));
                $numericKdCounter = $numericKdCounter ? (int)$numericKdCounter : 0;
                
                $customKdPrefix = $id;
                $customKdSuffix = 0;
                
                $existingKds = DB::table('barang')->where('kd_barang', 'like', $customKdPrefix . '-%')->pluck('kd_barang')->toArray();
                foreach ($existingKds as $ekd) {
                    $eparts = explode('-', $ekd);
                    $elast = end($eparts);
                    if (is_numeric($elast)) {
                        $customKdSuffix = max($customKdSuffix, (int)$elast);
                    }
                }

                foreach ($data['units'] as $idx => $unit) {
                    $sn = !empty($unit['serialNumber']) ? trim($unit['serialNumber']) : null;
                    if ($sn !== null) {
                        $newSns[] = $sn;
                    }

                    $unitLocation = !empty($unit['location']) ? $unit['location'] : null;
                    $subzonaCode = $this->resolveSubzonaCode($unitLocation);

                    if ($sn !== null) {
                        $exists = DB::table('barang')->where('serial_number', $sn)->exists();
                        if (!$exists) {
                            $customKdSuffix++;
                            $kd_barang = $customKdPrefix . '-' . str_pad($customKdSuffix, 4, '0', STR_PAD_LEFT);

                            $insertData = [
                                'kd_barang' => $kd_barang,
                                'asset_code' => $id,
                                'serial_number' => $sn,
                                'subzona_code' => $subzonaCode,
                                'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                                'created_at' => \Carbon\Carbon::now(),
                            ];

                        // Set ownership branch for new unit
                        if (Schema::hasColumn('barang', 'branch')) {
                            $existingUnit = DB::table('barang')->where('asset_code', $id)->first();
                            if ($existingUnit && $existingUnit->branch) {
                                $insertData['branch'] = $existingUnit->branch;
                            } else {
                                try {
                                    $jwtUser = JWTAuth::user();
                                    if ($jwtUser && $jwtUser->branches_code) {
                                        $insertData['branch'] = $jwtUser->branches_code;
                                    }
                                } catch (\Exception $e) {}
                            }
                        }

                        DB::table('barang')->insert($insertData);
                    } else {
                        // Update location/subzona and id_pekerjaan if changed
                        DB::table('barang')->where('serial_number', $sn)->update([
                            'subzona_code' => $subzonaCode,
                            'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                        ]);
                        
                        // Update condition by inserting a new MAINTENANCE transaction if it changed
                        if (isset($unit['condition'])) {
                            $kdBarang = DB::table('barang')->where('serial_number', $sn)->value('kd_barang');
                            if ($kdBarang) {
                                $activeTx = DB::table('asset_transactions')
                                    ->where('kd_barang', $kdBarang)
                                    ->where('is_current', true)
                                    ->first();
                                
                                if ($activeTx && $activeTx->condition !== $unit['condition']) {
                                    $operatorId = null;
                                    try { $jwtUser = JWTAuth::user(); $operatorId = $jwtUser ? $jwtUser->id : null; } catch (\Exception $e) {}
                                    
                                    DB::table('asset_transactions')
                                        ->where('transaction_id', $activeTx->transaction_id)
                                        ->update(['is_current' => false]);
                                        
                                    DB::table('asset_transactions')->insert([
                                        'kd_barang' => $kdBarang,
                                        'transaction_type' => 'MAINTENANCE',
                                        'condition' => $unit['condition'],
                                        'notes' => 'Perubahan status/kondisi barang melalui form Edit Aset',
                                        'giver_id' => $activeTx->receiver_id,
                                        'receiver_id' => $activeTx->receiver_id,
                                        'performed_by_id' => $operatorId,
                                        'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                                        'is_current' => true,
                                        'created_at' => \Carbon\Carbon::now(),
                                        'updated_at' => \Carbon\Carbon::now()
                                    ]);
                                }
                            }
                        }
                    }
                    } else {
                        if ($nullIndex < $existingNullUnits->count()) {
                            $targetKd = $existingNullUnits[$nullIndex]->kd_barang;
                            DB::table('barang')->where('kd_barang', $targetKd)->update([
                                'subzona_code' => $subzonaCode,
                                'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                            ]);
                            if (isset($unit['condition'])) {
                                $activeTx = DB::table('asset_transactions')
                                    ->where('kd_barang', $targetKd)
                                    ->where('is_current', true)
                                    ->first();
                                
                                if ($activeTx && $activeTx->condition !== $unit['condition']) {
                                    $operatorId = null;
                                    try { $jwtUser = JWTAuth::user(); $operatorId = $jwtUser ? $jwtUser->id : null; } catch (\Exception $e) {}
                                    
                                    DB::table('asset_transactions')
                                        ->where('transaction_id', $activeTx->transaction_id)
                                        ->update(['is_current' => false]);
                                        
                                    DB::table('asset_transactions')->insert([
                                        'kd_barang' => $targetKd,
                                        'transaction_type' => 'MAINTENANCE',
                                        'condition' => $unit['condition'],
                                        'notes' => 'Perubahan status/kondisi barang melalui form Edit Aset',
                                        'giver_id' => $activeTx->receiver_id,
                                        'receiver_id' => $activeTx->receiver_id,
                                        'performed_by_id' => $operatorId,
                                        'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                                        'is_current' => true,
                                        'created_at' => \Carbon\Carbon::now(),
                                        'updated_at' => \Carbon\Carbon::now()
                                    ]);
                                }
                            }
                            
                            $nullIndex++;
                        } else {
                            if ($customKdBase) {
                                $customKdSuffix++;
                                $kd_barang = $customKdBase . '-KB-' . str_pad($customKdSuffix, 3, '0', STR_PAD_LEFT);
                            } else {
                                $numericKdCounter++;
                                $kd_barang = (string)$numericKdCounter;
                            }

                            $insertData = [
                                'kd_barang' => $kd_barang,
                                'asset_code' => $id,
                                'serial_number' => null,
                                'subzona_code' => $subzonaCode,
                                'id_pekerjaan' => $unit['id_pekerjaan'] ?? $data['id_pekerjaan'] ?? null,
                                'created_at' => \Carbon\Carbon::now(),
                            ];
                            if (Schema::hasColumn('barang', 'branch')) {
                                $existingUnit = DB::table('barang')->where('asset_code', $id)->first();
                                if ($existingUnit && $existingUnit->branch) {
                                    $insertData['branch'] = $existingUnit->branch;
                                } else {
                                    try {
                                        $jwtUser = JWTAuth::user();
                                        if ($jwtUser && $jwtUser->branches_code) {
                                            $insertData['branch'] = $jwtUser->branches_code;
                                        }
                                    } catch (\Exception $e) {}
                                }
                            }
                            DB::table('barang')->insert($insertData);
                        }
                    }
                }

                while ($nullIndex < $existingNullUnits->count()) {
                    $targetKd = $existingNullUnits[$nullIndex]->kd_barang;
                    $hasTx = DB::table('asset_transactions')->where('kd_barang', $targetKd)->exists();
                    if (!$hasTx) {
                        DB::table('barang')->where('kd_barang', $targetKd)->update(['deleted_at' => \Carbon\Carbon::now()]);
                    }
                    $nullIndex++;
                }

                // Safely delete units that are no longer present, but only if they have no transactions
                $existingSnsFiltered = array_filter($existingSns, function($val) { return $val !== null; });
                $toDelete = array_diff($existingSnsFiltered, $newSns);
                foreach ($toDelete as $snToDelete) {
                    $kd = DB::table('barang')->where('serial_number', $snToDelete)->value('kd_barang');
                    $hasTx = $kd ? DB::table('asset_transactions')->where('kd_barang', $kd)->exists() : false;
                    if (!$hasTx) {
                        DB::table('barang')->where('serial_number', $snToDelete)->update(['deleted_at' => \Carbon\Carbon::now()]);
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
                        $kdBarang = DB::table('barang')->where('serial_number', $sn)->value('kd_barang');
                        if (!$kdBarang) continue;

                        // Check if current active condition is not BAIK
                        $latestTx = DB::table('asset_transactions')
                            ->where('kd_barang', $kdBarang)
                            ->where('is_current', true)
                            ->first();
                            
                        \Illuminate\Support\Facades\Log::info('Latest TX for ' . $sn . ' (kd_barang: ' . $kdBarang . '): ' . json_encode($latestTx));
                            
                        if ($latestTx && strtoupper($latestTx->condition) !== 'BAIK') {
                            // Non-aktifkan transaksi sebelumnya
                            DB::table('asset_transactions')
                                ->where('kd_barang', $kdBarang)
                                ->update(['is_current' => false]);
                                
                            $txType = str_contains(strtolower($unitStatus), 'ditemukan') ? 'FOUND' : 'MAINTENANCE';
                            
                            // Buat transaksi baru
                            $txId = DB::table('asset_transactions')->insertGetId([
                                'transaction_type' => $txType,
                                'kd_barang' => $kdBarang,
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

            // Retrieve all kd_barang for this asset to delete their transactions
            $kdBarangs = DB::table('barang')->where('asset_code', $id)->pluck('kd_barang');
            if ($kdBarangs->isNotEmpty()) {
                DB::table('asset_transactions')->whereIn('kd_barang', $kdBarangs)->delete();
            }

            // Delete child records explicitly to avoid constraint errors if ON DELETE CASCADE is missing
            DB::table('asset_specifications')->where('asset_code', $id)->delete();
            DB::table('barang')->where('asset_code', $id)->update(['deleted_at' => \Carbon\Carbon::now()]);
            DB::table('assets')->where('asset_code', $id)->update(['deleted_at' => \Carbon\Carbon::now()]);

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

    /* =======================================================
       KATALOG (MASTER ASSETS TABLE) ENDPOINTS
       ======================================================= */
       
    public function getKatalog()
    {
        try {
            // Get the current user's branch code from JWT
            $userBranchCode = null;
            try {
                $jwtUser = JWTAuth::user();
                if ($jwtUser) {
                    $userBranchCode = $jwtUser->branches_code ?? null;
                }
            } catch (\Exception $e) {}

            $query = DB::table('assets')
                ->leftJoin('device', 'assets.device_code', '=', 'device.device_code')
                ->select('assets.*', 'device.name as category_name')
                ->whereNull('assets.deleted_at')
                ->orderBy('assets.created_at', 'desc');

            if ($userBranchCode) {
                // Filter: only assets that have at least 1 unit in this branch,
                // OR assets that were created by this branch (branch_code column)
                $assetCodesWithUnits = DB::table('barang')
                    ->where('branch', $userBranchCode)
                    ->whereNull('deleted_at')
                    ->distinct()
                    ->pluck('asset_code');

                if (Schema::hasColumn('assets', 'branch_code')) {
                    $query->where(function($q) use ($userBranchCode, $assetCodesWithUnits) {
                        $q->whereIn('assets.asset_code', $assetCodesWithUnits)
                          ->orWhere('assets.branch_code', $userBranchCode);
                    });
                } else {
                    $query->whereIn('assets.asset_code', $assetCodesWithUnits);
                }
            }

            $assets = $query->get();

            // Count units per branch
            $unitCountsQuery = DB::table('barang')
                ->select('asset_code', DB::raw('count(*) as total_units'))
                ->whereNull('deleted_at')
                ->groupBy('asset_code');
            if ($userBranchCode) {
                $unitCountsQuery->where('branch', $userBranchCode);
            }
            $unitCounts = $unitCountsQuery->pluck('total_units', 'asset_code');

            $data = $assets->map(function($a) use ($unitCounts) {
                $a->total_units = $unitCounts->get($a->asset_code) ?? 0;
                return $a;
            });

            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function storeKatalog(Request $request)
    {
        DB::beginTransaction();
        try {
            $deviceCode = $request->input('category');
            if (empty($deviceCode)) {
                return response()->json(['success' => false, 'message' => 'Kategori wajib diisi'], 400);
            }

            // Get current user's branch code
            $userBranchCode = null;
            try {
                $jwtUser = JWTAuth::user();
                if ($jwtUser) {
                    $userBranchCode = $jwtUser->branches_code ?? null;
                }
            } catch (\Exception $e) {}
            
            // Auto-insert device category if it doesn't exist
            $deviceExists = DB::table('device')->where('device_code', $deviceCode)->exists();
            if (!$deviceExists) {
                DB::table('device')->insert([
                    'device_code' => $deviceCode,
                    'name' => $deviceCode,
                    'is_active' => true,
                    'created_at' => \Carbon\Carbon::now(),
                ]);
            }

            $catPrefix = strtoupper($deviceCode);
            $allAssets = DB::table('assets')->pluck('asset_code')->toArray();
            
            $maxKategori = 0;
            
            foreach ($allAssets as $ac) {
                if (preg_match('/^([A-Z]+)-(\d+)$/', $ac, $matches)) {
                    $cat = $matches[1];
                    $catUrut = intval($matches[2]);
                    
                    if ($cat === $catPrefix && $catUrut > $maxKategori) {
                        $maxKategori = $catUrut;
                    }
                } elseif (preg_match('/^([A-Z]+)(\d{2})-(\d{3})$/', $ac, $matches)) {
                    $cat = $matches[1];
                    $catUrut = intval($matches[2]);
                    if ($cat === $catPrefix && $catUrut > $maxKategori) {
                        $maxKategori = $catUrut;
                    }
                }
            }
            
            $kategoriUrut = str_pad($maxKategori + 1, 4, '0', STR_PAD_LEFT);
            $finalId = $catPrefix . '-' . $kategoriUrut;

            DB::table('assets')->insert([
                'asset_code' => $finalId,
                'name' => $request->input('name') ?? '-',
                'merek' => $request->input('merek') ?? null,
                'tipe' => $request->input('tipe') ?? null,
                'device_code' => $deviceCode,
                'branch_code' => $userBranchCode ?? null,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);

            DB::commit();
            return response()->json([
                'success' => true, 
                'message' => 'Katalog berhasil dibuat',
                'data' => DB::table('assets')->where('asset_code', $finalId)->first()
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function updateKatalog(Request $request, $id)
    {
        try {
            DB::table('assets')->where('asset_code', $id)->update([
                'name' => $request->input('name') ?? '-',
                'merek' => $request->input('merek') ?? null,
                'tipe' => $request->input('tipe') ?? null,
                'updated_at' => \Carbon\Carbon::now(),
            ]);
            return response()->json(['success' => true, 'message' => 'Katalog diupdate']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteKatalog($id)
    {
        DB::beginTransaction();
        try {
            // Delete from budget_items so that it removes the asset from any projects
            DB::table('budget_items')->where('asset_code', $id)->delete();

            // Retrieve all kd_barang for this asset to delete their transactions
            $kdBarangs = DB::table('barang')->where('asset_code', $id)->pluck('kd_barang');
            if ($kdBarangs->isNotEmpty()) {
                DB::table('asset_transactions')->whereIn('kd_barang', $kdBarangs)->delete();
            }

            // Delete child records explicitly to avoid constraint errors
            DB::table('asset_specifications')->where('asset_code', $id)->delete();
            DB::table('barang')->where('asset_code', $id)->update(['deleted_at' => \Carbon\Carbon::now()]);
            DB::table('assets')->where('asset_code', $id)->update(['deleted_at' => \Carbon\Carbon::now()]);

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Katalog beserta unit fisiknya berhasil dihapus']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting katalog: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
