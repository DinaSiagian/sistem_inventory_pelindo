<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    protected $table = 'branches';

    // Primary Key adalah string (branch_code)
    protected $primaryKey = 'branch_code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'branch_code',
        'entity_code',
        'name',
        'address',
        'phone',
        'longitude',
        'latitude',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        // 'longitude' => 'decimal:8', // Opsional: jika butuh casting decimal
        // 'latitude' => 'decimal:8',
    ];

    public $timestamps = true;

    /**
     * Relasi: Branch milik satu Entity
     */
    public function entity(): BelongsTo
    {
        return $this->belongsTo(Entity::class, 'entity_code', 'entity_code');
    }

    /**
     * Relasi: Satu Branch memiliki banyak Division
     */
    public function divisions(): HasMany
    {
        return $this->hasMany(Division::class, 'branch_code', 'branch_code');
    }

    /**
     * Relasi: Satu Branch memiliki banyak User
     * (Catatan: FK di tabel users adalah 'branches_code')
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'branches_code', 'branch_code');
    }
}