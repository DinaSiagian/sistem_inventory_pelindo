<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $table = 'activity_logs';
    protected $primaryKey = 'log_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'action_type',
        'table_name',
        'record_id',
        'old_value',
        'new_value',
        'ip_address',
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
