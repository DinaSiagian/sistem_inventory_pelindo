<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BudgetProject extends Model
{
    protected $table      = 'budget_projects';
    protected $primaryKey = 'id_pekerjaan';
    public $incrementing  = true;
    public $timestamps    = false;

    protected $fillable = [
        'id_anggaran_tahunan', // FK ke budget_annual_capex (nullable untuk OPEX)
        'id_opex',             // FK ke budget_annual_opex  (nullable untuk CAPEX)
        'jenis_anggaran',      // 'capex' | 'opex'
        'nm_pekerjaan',
        'nilai_rab',
        'nilai_kontrak',
        'no_pr',
        'no_po',
        'no_kontrak',
        'tgl_kontrak',
        'durasi_kontrak',
        'no_sp3',
        'tgl_sp3',
        'tgl_bamk',
        'keterangan',
    ];

    protected $casts = [
        'nilai_rab'      => 'float',
        'nilai_kontrak'  => 'float',
        'durasi_kontrak' => 'integer',
        'id_opex'        => 'integer',
    ];

    public function items()
    {
        return $this->hasMany(BudgetItem::class, 'id_pekerjaan', 'id_pekerjaan');
    }

    public function capex()
    {
        return $this->belongsTo(BudgetAnnualCapex::class, 'id_anggaran_tahunan', 'kd_anggaran_capex');
    }

    public function opex()
    {
        return $this->belongsTo(BudgetAnnualOpex::class, 'id_opex', 'id_anggaran_tahunan');
    }
}
