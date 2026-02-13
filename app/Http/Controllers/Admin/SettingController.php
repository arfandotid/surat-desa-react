<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class SettingController extends Controller implements HasMiddleware
{
    /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [
            new Middleware(['permission:settings.index'], only: ['index']),
            new Middleware(['permission:settings.update'], only: ['update']),
        ];
    }

    /**
     * index
     *
     * @return Response
     */
    public function index(): Response
    {
        // setting hanya 1 data
        $setting = Setting::first();

        // return inertia
        return Inertia::render('Admin/Settings/Index', [
            'setting' => $setting,
        ]);
    }

    /**
     * update
     *
     * @param  Request $request
     * @return RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        // setting hanya 1 data
        $setting = Setting::firstOrFail();

        // set validation
        $request->validate([
            // ======================
            // DATA DESA
            // ======================
            'village_name'      => 'required|string|max:255',
            'village_address'   => 'required|string',
            'village_phone'     => 'nullable|string|max:50',
            'village_email'     => 'nullable|email|max:255',
            'village_website'   => 'nullable|string|max:255',
            'village_logo'      => 'nullable|image|mimes:png,jpg,jpeg|max:2048',

            // ======================
            // WILAYAH ADMINISTRATIF
            // ======================
            'subdistrict_name'  => 'required|string|max:255',
            'regency_name'      => 'required|string|max:255',
            'province_name'     => 'required|string|max:255',

            // ======================
            // DATA KEPALA DESA
            // ======================
            'official_name'     => 'nullable|string|max:255',
            'official_position' => 'nullable|string|max:255',
            'official_phone'    => 'nullable|string|max:50',
            'official_email'    => 'nullable|email|max:255',
            'official_nipd'     => 'nullable|string|max:100',
        ]);

        $data = $request->only([
            // DATA DESA
            'village_name',
            'village_address',
            'village_phone',
            'village_email',
            'village_website',

            // WILAYAH
            'subdistrict_name',
            'regency_name',
            'province_name',

            // KEPALA DESA
            'official_name',
            'official_position',
            'official_phone',
            'official_email',
            'official_nipd',
        ]);

        // upload logo desa jika ada
        if ($request->hasFile('village_logo')) {

            // hapus logo lama
            if ($setting->village_logo) {
                Storage::disk('public')->delete('settings/' . $setting->village_logo);
            }

            // simpan logo baru
            $logo = $request->file('village_logo');
            $logo->storeAs('settings', $logo->hashName(), 'public');

            // set data logo
            $data['village_logo'] = $logo->hashName();
        }

        // update setting
        $setting->update($data);

        // kembali ke halaman setting
        return redirect()
            ->route('admin.settings.index')
            ->with('success', 'Setting updated successfully.');
    }
}
