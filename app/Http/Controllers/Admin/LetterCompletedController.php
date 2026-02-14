<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Letter;
use App\Http\Controllers\Controller;

class LetterCompletedController extends Controller
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
            ->where('status', 'approved')
            ->orWhere('status', 'rejected')
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
            ->orderBy('updated_at', 'desc')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/LetterCompleteds/Index', [
            'letters' => $letters,
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
            ->firstOrFail();

        return Inertia::render('Admin/LetterCompleteds/Print', [
            'letter' => $letter,
        ]);
    }
}
