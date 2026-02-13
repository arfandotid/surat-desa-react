<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'village_name',
        'village_address',
        'village_phone',
        'village_email',
        'village_website',
        'village_logo',
        'subdistrict_name',
        'regency_name',
        'province_name',
        'official_name',
        'official_position',
        'official_phone',
        'official_email',
        'official_nipd',
    ];
}
