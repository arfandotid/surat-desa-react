<?php

namespace App\Imports;

use App\Models\Resident;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ResidentsImport implements ToModel, WithHeadingRow, WithValidation
{
    public function model(array $row)
    {
        return new Resident([
            'nik'            => $row['nik'],
            'name'           => $row['nama'],
            'password'       => Hash::make($row['nik']), // default password = NIK
            'gender'         => $row['gender'],
            'birth_place'    => $row['tempat_lahir'],
            'birth_date'     => $row['tanggal_lahir'],
            'religion'       => $row['agama'],
            'occupation'     => $row['pekerjaan'],
            'education'      => $row['pendidikan'],
            'marital_status' => $row['status_pernikahan'],
            'address'        => $row['alamat'],
            'rt'             => $row['rt'],
            'rw'             => $row['rw'],
            'phone'          => $row['telepon'] ?? null,
        ]);
    }

    public function rules(): array
    {
        return [
            '*.nik' => 'required|unique:residents,nik',
            '*.nama' => 'required',
            '*.gender' => 'required|in:L,P',
            '*.tanggal_lahir' => 'required|date',
        ];
    }
}
