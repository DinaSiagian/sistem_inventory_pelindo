<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BudgetItem extends Model
{
    protected $table      = 'budget_items';
    protected $primaryKey = 'id_item';
    public $incrementing  = true;
    public $timestamps    = false;

    protected $fillable = [
        'id_pekerjaan',
        'nama_barang',
        'model',
        'kategori',
        'jumlah',
        'acquisition_value',
        'procurement_date',
        'asset_code',
        'keterangan',
        'units_json',
        'created_at',
    ];

    protected $casts = [
        'jumlah'            => 'integer',
        'acquisition_value' => 'float',
        'units_json'        => 'array',
        'id_pekerjaan'      => 'integer',
    ];

    public function project()
    {
        return $this->belongsTo(BudgetProject::class, 'id_pekerjaan', 'id_pekerjaan');
    }
}
