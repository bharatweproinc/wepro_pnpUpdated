<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable =[
        'task_name',
        'description',
        'priority',
        'start_date',
        'developer',
        'status',
        'level',
        'developer_id',
        'project_id',
        'estimated',
    ];

    public function developer()
    {
        return $this->morphMany(Developer::class, 'assignable');
    }

    public function developers()
    {
        return $this->belongsToMany(Developer::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function histories()
    {
        return $this->morphMany(History::class, 'historable');
    }

}
