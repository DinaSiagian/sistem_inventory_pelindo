<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    protected $table = 'roles';
    
    // Primary Key adalah string (role_code), bukan auto-increment integer
    protected $primaryKey = 'role_code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'role_code',
        'name',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public $timestamps = true;

    /**
     * Relasi: Satu Role memiliki banyak User
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'role_code', 'role_code');
    }
}