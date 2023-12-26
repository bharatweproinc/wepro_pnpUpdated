<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;
    protected $table= 'histories';
    protected $fillable = [
        'historable_id',
        'historable_type',
        'change_type',
        'description',

    ];

    public function historable()
    {
        return $this->morphTo();
    }
}
