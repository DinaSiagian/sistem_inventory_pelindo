<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BudgetAnnualOpex extends Model
{
    protected $table = 'budget_annual_opex';
    protected $primaryKey = 'id_anggaran_tahunan';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'kd_anggaran_master',
        'thn_anggaran',
        'nilai_anggaran_tahunan',
        'nm_anggaran',
        'nilai_anggaran',
        'realisasi_tahunan',
    ];

    protected $casts = [
        'realisasi_tahunan' => 'array',
        'nilai_anggaran'    => 'float',
        'nilai_anggaran_tahunan' => 'float',
        'thn_anggaran'      => 'integer',
    ];

    public function master()
    {
        return $this->belongsTo(BudgetMaster::class, 'kd_anggaran_master', 'kd_anggaran_master');
    }
}
