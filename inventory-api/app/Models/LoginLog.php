<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginLog extends Model
{
    protected $table = 'login_logs';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'login_time',
        'logout_time',
        'ip_address',
        'device_info',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
