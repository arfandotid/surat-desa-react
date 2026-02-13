<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = [
        'nik',
        'name',
        'password',
        'gender',
        'birth_place',
        'birth_date',
        'religion',
        'occupation',
        'education',
        'marital_status',
        'address',
        'rt',
        'rw',
        'phone',
        'meta',
    ];

    public function letters()
    {
        return $this->hasMany(Letter::class);
    }
}
