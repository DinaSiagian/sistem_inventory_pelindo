<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BudgetCapex extends Model
{
    protected $table = 'budget_annual_capex';
    protected $primaryKey = 'kd_anggaran_capex'; // PK bertipe VARCHAR
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
        'nilai_anggaran_rkap'
    ];

    protected $casts = [
        'thn_rkap_awal' => 'integer',
        'thn_rkap_akhir' => 'integer',
        'thn_anggaran' => 'integer',
        'nilai_anggaran_kad' => 'decimal:2',
        'nilai_anggaran_rkap' => 'decimal:2'
    ];

    // Relasi ke Master
    public function master()
    {
        return $this->belongsTo(BudgetMaster::class, 'kd_anggaran_master', 'kd_anggaran_master');
    }

    // Relasi ke Pekerjaan/Proyek
    public function projects()
    {
        return $this->hasMany(BudgetProject::class, 'id_anggaran_tahunan', 'kd_anggaran_capex');
    }
}