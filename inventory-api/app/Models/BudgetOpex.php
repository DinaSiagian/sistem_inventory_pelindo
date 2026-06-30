<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BudgetOpex extends Model
{
    protected $table = 'budget_annual_opex';
    protected $primaryKey = 'id_anggaran_tahunan';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'kd_anggaran_master',
        'thn_anggaran',
        'nilai_anggaran_tahunan'
    ];

    protected $casts = [
        'thn_anggaran' => 'integer',
        'nilai_anggaran_tahunan' => 'decimal:2'
    ];

    // Relasi ke Master
    public function master()
    {
        return $this->belongsTo(BudgetMaster::class, 'kd_anggaran_master', 'kd_anggaran_master');
    }
}