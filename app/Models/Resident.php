<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Resident extends Authenticatable
{
    /**
     * fillable
     *
     * @var array
     */
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

    /**
     * letters
     *
     * @return void
     */
    public function letters()
    {
        return $this->hasMany(Letter::class);
    }
}
