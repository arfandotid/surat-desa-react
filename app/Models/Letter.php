<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Letter extends Model
{
    protected $fillable = [
        'letter_template_id',
        'resident_id',
        'resident_snapshot',
        'village_snapshot',
        'official_snapshot',
        'title',
        'letter_number',
        'reference',
        'status',
        'payload',
        'meta',
    ];

    protected $casts = [
        'resident_snapshot' => 'array',
        'village_snapshot'  => 'array',
        'official_snapshot' => 'array',
        'payload'           => 'array',
        'meta'              => 'array',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function template()
    {
        return $this->belongsTo(LetterTemplate::class, 'letter_template_id');
    }
}
