<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Letter;
use App\Models\Setting;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\LetterTemplate;
use App\Http\Controllers\Controller;

class LetterController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $templates = LetterTemplate::query()
            ->when(
                request()->q,
                fn($q) =>
                $q->where('name', 'like', '%' . request()->q . '%')
            )
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Web/Letters/Index', [
            'templates' => $templates,
        ]);
    }

    /**
     * create
     */
    public function create(Request $request)
    {
        $template = LetterTemplate::where('status', 'active')
            ->when(
                $request->template,
                fn($q) =>
                $q->where('slug', $request->template)
            )
            ->firstOrFail();

        return Inertia::render('Web/Letters/Create', [
            'template' => $template,
        ]);
    }

    /**
     * store
     */
    public function store(Request $request)
    {
        // Validasi
        $request->validate([
            'letter_template_id' => 'required|exists:letter_templates,id',
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Get template
        $template = LetterTemplate::findOrFail($request->letter_template_id);

        // Get extra fields from template
        $extraFields = $template->extra_fields ?? [];

        // Filter payload hanya untuk field yang ada di extra_fields
        $payload = [];
        if (is_array($extraFields)) {
            foreach ($extraFields as $field) {
                $key = $field['key'] ?? null;
                if ($key && $request->has($key)) {
                    $payload[$key] = $request->input($key);
                }
            }
        }

        //get resident
        $resident = auth()->guard('resident')->user();

        // Tambahkan data default ke payload
        $payload['submitted_at']    = now()->toDateTimeString();
        $payload['submitted_by']    = $resident->name;
        $payload['template_name']   = $template->name;

        //get setting
        $setting = Setting::first();

        // Create letter
        Letter::create([
            'letter_template_id'    => $template->id,
            'resident_id'           => $resident->id,
            'resident_snapshot' => [
                'resident_nik'               => $resident->nik,
                'resident_name'              => $resident->name,
                'resident_gender'            => $resident->gender == 'L' ? 'Laki-laki' : 'Perempuan',
                'resident_birth_place'       => $resident->birth_place,
                'resident_birth_date'        => $resident->birth_date,
                'resident_religion'          => $resident->religion,
                'resident_occupation'        => $resident->occupation,
                'resident_education'         => $resident->education,
                'resident_marital_status'    => $resident->marital_status,
                'resident_address'           => $resident->address,
                'resident_rt'                => $resident->rt,
                'resident_rw'                => $resident->rw,
                'resident_phone'             => $resident->phone,
            ],
            'village_snapshot'   => [
                'village_name'      => $setting->village_name,
                'village_address'   => $setting->village_address,
                'village_phone'     => $setting->village_phone,
                'village_email'     => $setting->village_email,
                'village_website'   => $setting->village_website,
                'village_logo'      => $setting->village_logo,
                'subdistrict_name'  => $setting->subdistrict_name,
                'regency_name'      => $setting->regency_name,
                'province_name'     => $setting->province_name,
            ],
            'official_snapshot'   => [
                'official_name'     => $setting->official_name,
                'official_nipd'     => $setting->official_nipd,
                'official_position' => $setting->official_position,
                'official_phone'    => $setting->official_phone,
                'official_email'    => $setting->official_email,
            ],
            'title'     => $template->name . ' - ' . $resident->name . ' (' . $resident->nik . ')',
            'reference' => Str::uuid()->toString(),
            'status'    => 'pending',
            'payload' => $payload,
            'meta' => [
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ],
        ]);

        // Return success response
        return redirect()->route('resident.my-letters.index')
            ->with('success', 'Surat berhasil diajukan.');
    }
}
