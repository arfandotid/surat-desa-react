<?php

namespace App\Exports;

use App\Models\Resident;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ResidentsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Resident::select([
            'nik',
            'name',
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
        ])->get();
    }

    public function headings(): array
    {
        return [
            'NIK',
            'Nama',
            'Gender',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Agama',
            'Pekerjaan',
            'Pendidikan',
            'Status Pernikahan',
            'Alamat',
            'RT',
            'RW',
            'Telepon',
        ];
    }
}
