<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    public $developer;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'project_manager',
        'developer',
    ];

    public function developers()
    {
        return $this->hasMany(Developer::class);
    }

    public function developer()
    {
        return $this->morphMany(Developer::class, 'assignable');
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
