<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BudgetAnnualCapex extends Model
{
    protected $table = 'budget_annual_capex';
    protected $primaryKey = 'kd_anggaran_capex';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_anggaran_capex',
        'kd_anggaran_master',
        'nm_anggaran_capex',
        'thn_rkap_awal',
        'thn_rkap_akhir',
        'thn_anggaran',
        'nilai_anggaran_kad',
        'nilai_anggaran_rkap',
        'nm_master',
        'anggaran_tahunan',
        'history_anggaran',
        'pekerjaan',       // menyimpan daftar pekerjaan CAPEX
        'assets_json',     // [BARU] menyimpan daftar barang/aset CAPEX
    ];

    protected $casts = [
        'anggaran_tahunan'    => 'array',
        'history_anggaran'    => 'array',
        'pekerjaan'           => 'array',
        'assets_json'         => 'array',
        'nilai_anggaran_kad'  => 'float',
        'nilai_anggaran_rkap' => 'float',
        'thn_rkap_awal'       => 'integer',
        'thn_rkap_akhir'      => 'integer',
        'thn_anggaran'        => 'integer',
    ];

    public function master()
    {
        return $this->belongsTo(BudgetMaster::class, 'kd_anggaran_master', 'kd_anggaran_master');
    }
}
