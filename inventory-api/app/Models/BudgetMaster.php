<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BudgetMaster extends Model
{
    protected $table = 'budget_masters';
    protected $primaryKey = 'kd_anggaran_master';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'kd_anggaran_master',
        'nm_anggaran_master',
        'tipe_anggaran_master',
    ];

    public function opexEntries()
    {
        return $this->hasMany(BudgetAnnualOpex::class, 'kd_anggaran_master', 'kd_anggaran_master');
    }

    public function capexEntries()
    {
        return $this->hasMany(BudgetAnnualCapex::class, 'kd_anggaran_master', 'kd_anggaran_master');
    }
}
