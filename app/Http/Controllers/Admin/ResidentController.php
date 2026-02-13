<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Resident;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class ResidentController extends Controller implements HasMiddleware
{
    /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [
            new Middleware(['permission:residents.index'], only: ['index']),
            new Middleware(['permission:residents.create'], only: ['create', 'store']),
            new Middleware(['permission:residents.edit'], only: ['edit', 'update']),
            new Middleware(['permission:residents.delete'], only: ['destroy']),
        ];
    }

    /**
     * index
     *
     * @return Response
     */
    public function index(): Response
    {
        $residents = Resident::query()
            ->when(request()->q, function ($query) {
                $query->where('name', 'like', '%' . request()->q . '%')
                    ->orWhere('nik', 'like', '%' . request()->q . '%');
            })
            ->latest()
            ->paginate(10);

        $residents->appends(['q' => request()->q]);

        return Inertia::render('Admin/Residents/Index', [
            'residents' => $residents,
        ]);
    }

    /**
     * create
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Residents/Create');
    }

    /**
     * store
     *
     * @param  Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nik'            => 'required|string|unique:residents,nik',
            'name'           => 'required|string|max:255',
            'password'       => 'required|string|min:8',
            'gender'         => 'required|in:L,P',
            'birth_place'    => 'required|string|max:255',
            'birth_date'     => 'required|date',
            'religion'       => 'required|string|max:100',
            'occupation'     => 'required|string|max:255',
            'education'      => 'required|string|max:255',
            'marital_status' => 'required|string|max:100',
            'address'        => 'required|string',
            'rt'             => 'required|string|max:10',
            'rw'             => 'required|string|max:10',
            'phone'          => 'nullable|string|max:20',
            'meta'           => 'nullable|array',
        ]);

        Resident::create([
            'nik'            => $request->nik,
            'name'           => $request->name,
            'password'       => Hash::make($request->password),
            'gender'         => $request->gender,
            'birth_place'    => $request->birth_place,
            'birth_date'     => $request->birth_date,
            'religion'       => $request->religion,
            'occupation'     => $request->occupation,
            'education'      => $request->education,
            'marital_status' => $request->marital_status,
            'address'        => $request->address,
            'rt'             => $request->rt,
            'rw'             => $request->rw,
            'phone'          => $request->phone,
            'meta'           => $request->meta,
        ]);

        return redirect()
            ->route('admin.residents.index')
            ->with('success', 'Data penduduk berhasil ditambahkan.');
    }

    /**
     * edit
     *
     * @param  Resident $resident
     * @return Response
     */
    public function edit(Resident $resident): Response
    {
        return Inertia::render('Admin/Residents/Edit', [
            'resident' => $resident,
        ]);
    }

    /**
     * update
     *
     * @param  Request $request
     * @param  Resident $resident
     * @return RedirectResponse
     */
    public function update(Request $request, Resident $resident): RedirectResponse
    {
        $request->validate([
            'nik'            => 'required|string|unique:residents,nik,' . $resident->id,
            'name'           => 'required|string|max:255',
            'password'       => 'nullable|string|min:8',
            'gender'         => 'required|in:L,P',
            'birth_place'    => 'required|string|max:255',
            'birth_date'     => 'required|date',
            'religion'       => 'required|string|max:100',
            'occupation'     => 'required|string|max:255',
            'education'      => 'required|string|max:255',
            'marital_status' => 'required|string|max:100',
            'address'        => 'required|string',
            'rt'             => 'required|string|max:10',
            'rw'             => 'required|string|max:10',
            'phone'          => 'nullable|string|max:20',
            'meta'           => 'nullable|array',
        ]);

        $data = $request->only([
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
            'meta',
        ]);

        // update password jika diisi
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $resident->update($data);

        return redirect()
            ->route('admin.residents.index')
            ->with('success', 'Data penduduk berhasil diperbarui.');
    }

    /**
     * destroy
     *
     * @param  Resident $resident
     * @return RedirectResponse
     */
    public function destroy(Resident $resident): RedirectResponse
    {
        $resident->delete();

        return redirect()
            ->route('admin.residents.index')
            ->with('success', 'Data penduduk berhasil dihapus.');
    }
}
