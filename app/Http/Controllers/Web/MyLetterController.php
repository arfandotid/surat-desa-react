<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Letter;
use App\Http\Controllers\Controller;

class MyLetterController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $letters = Letter::query()
            ->with(['resident', 'template'])
            ->where('resident_id', auth()->guard('resident')->id())
            ->when(
                request()->q,
                fn($q) =>
                $q->where(function ($query) {
                    $search = request()->q;

                    $query->where('title', 'like', "%{$search}%")
                        ->orWhereHas(
                            'resident',
                            fn($r) =>
                            $r->where('name', 'like', "%{$search}%")
                        )
                        ->orWhereHas(
                            'template',
                            fn($t) =>
                            $t->where('name', 'like', "%{$search}%")
                        );
                })
            )
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Web/MyLetters/Index', [
            'letters' => $letters,
        ]);
    }

    /**
     * show
     *
     * @return void
     */
    public function show($reference)
    {
        // show detail surat milik resident yang sedang login
        $letter = Letter::with(['resident', 'template'])
            ->where('reference', $reference)
            ->where('resident_id', auth()->guard('resident')->id())
            ->firstOrFail();

        return Inertia::render('Web/MyLetters/Show', [
            'letter' => $letter,
        ]);
    }

    /**
     * print
     *
     * @param  mixed $reference
     * @return void
     */
    public function print($reference)
    {
        // print surat milik resident yang sedang login
        $letter = Letter::with(['resident', 'template'])
            ->where('reference', $reference)
            ->where('resident_id', auth()->guard('resident')->id())
            ->firstOrFail();

        return Inertia::render('Web/MyLetters/Print', [
            'letter' => $letter,
        ]);
    }
}
