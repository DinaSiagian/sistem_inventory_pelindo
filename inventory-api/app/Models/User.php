<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable;

    protected $table = 'users';
    protected $primaryKey = 'id';
    public $incrementing = true;

    protected $fillable = [
        'name', 'username', 'email', 'password', 'phone', 'nip',
        'role_code', 'entity_code', 'branches_code', 'division_code', 'is_active'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = ['is_active' => 'boolean'];

    // JWT Methods
    public function getJWTIdentifier() { return $this->getKey(); }
    public function getJWTCustomClaims() { return []; }

    // Relationships
    public function role() {
        return $this->belongsTo(Role::class, 'role_code', 'role_code');
    }
    public function entity() {
        return $this->belongsTo(Entity::class, 'entity_code', 'entity_code');
    }
    public function branch() {
        return $this->belongsTo(Branch::class, 'branches_code', 'branch_code');
    }
    public function division() {
        return $this->belongsTo(Division::class, 'division_code', 'division_code');
    }
}