<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan hanya ada 1 data setting
        DB::table('settings')->truncate();

        DB::table('settings')->insert([
            // ======================
            // DATA DESA
            // ======================
            'village_name'     => 'Santri',
            'village_address'  => 'Jl. Raya Desa Santri No. 1',
            'village_phone'    => '081234567890',
            'village_email'    => 'info@desasantri.id',
            'village_website'  => 'https://desasantri.id',
            'village_logo'     => null,

            // ======================
            // WILAYAH ADMINISTRATIF
            // ======================
            'subdistrict_name' => 'Diwek',
            'regency_name'     => 'Jombang',
            'province_name'    => 'Jawa Timur',

            // ======================
            // DATA KEPALA DESA
            // ======================
            'official_name'     => 'Ahmad Fauzi',
            'official_position' => 'Kepala Desa',
            'official_phone'    => '081298765432',
            'official_email'    => 'kades@desasantri.id',
            'official_nipd'     => '35743275383',

            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
