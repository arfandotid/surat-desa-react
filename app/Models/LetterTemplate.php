<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LetterTemplate extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'status',
        'content_template',
        'meta',
        'extra_fields',
    ];

    protected $casts = [
        'extra_fields'  => 'array',
        'meta'         => 'array',
    ];

    public function letters()
    {
        return $this->hasMany(Letter::class);
    }
}
