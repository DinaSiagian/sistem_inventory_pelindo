<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entity extends Model
{
    protected $table = 'entities';

    // Primary Key adalah string (entity_code)
    protected $primaryKey = 'entity_code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'entity_code',
        'name',
    ];

    public $timestamps = true;

    /**
     * Relasi: Satu Entity memiliki banyak Branch
     */
    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class, 'entity_code', 'entity_code');
    }

    /**
     * Relasi: Satu Entity memiliki banyak User
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'entity_code', 'entity_code');
    }
}