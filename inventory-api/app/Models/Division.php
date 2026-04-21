<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Division extends Model
{
    protected $table = 'divisions';

    // Primary Key adalah string (division_code)
    protected $primaryKey = 'division_code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'division_code',
        'branch_code',
        'name',
    ];

    public $timestamps = true;

    /**
     * Relasi: Division milik satu Branch
     */
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'branch_code', 'branch_code');
    }
}