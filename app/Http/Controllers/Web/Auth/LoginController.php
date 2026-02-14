<?php

namespace App\Http\Controllers\Web\Auth;

use Inertia\Inertia;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;


class LoginController extends Controller
{
    /**
     * Show the resident login form.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Web/Auth/Login');
    }

    /**
     * Handle a resident login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // Set validation
        $request->validate([
            'nik'       => 'required|string|max:16',
            'password'  => 'required|string|min:6',
        ]);

        // Cek apakah resident dengan NIK ini ada
        $resident = Resident::where('nik', $request->nik)->first();

        if (!$resident) {
            return back()->withErrors([
                'nik' => 'NIK tidak ditemukan.',
            ]);
        }

        // Verifikasi password
        if (!Hash::check($request->password, $resident->password)) {
            return back()->withErrors([
                'password' => 'Password yang Anda masukkan salah.',
            ]);
        }

        // Attempt to login dengan guard 'residents'
        if (Auth::guard('resident')->attempt([
            'nik'       => $request->nik,
            'password'  => $request->password
        ])) {

            // Regenerate session
            $request->session()->regenerate();

            // Redirect ke dashboard resident
            return redirect()->intended(route('resident.dashboard.index'));
        }

        // If login fails
        return back()->withErrors([
            'nik' => 'Terjadi kesalahan saat login, silahkan coba lagi.',
        ]);
    }

    /**
     * Logout resident.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        // Logout user dari guard 'residents'
        Auth::guard('resident')->logout();

        // Invalidate session
        $request->session()->invalidate();

        // Regenerate token
        $request->session()->regenerateToken();

        // Redirect to resident login
        return redirect()->route('login');
    }
}
