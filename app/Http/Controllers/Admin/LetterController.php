<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Letter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class LetterController extends Controller implements HasMiddleware
{   
    /**
     * Middleware permission
     */
    public static function middleware(): array
    {
        return [
            new Middleware(['permission:letters.index'], only: ['index']),
            new Middleware(['permission:letters.show'], only: ['show']),
            new Middleware(['permission:letters.edit'], only: ['update']),
        ];
    } 

    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $letters = Letter::query()
            ->with(['resident', 'template'])
            ->where('status', 'pending')
            ->when(request()->q, fn ($q) =>
                $q->where(function ($query) {
                    $search = request()->q;

                    $query->where('title', 'like', "%{$search}%")
                        ->orWhereHas('resident', fn ($r) =>
                            $r->where('name', 'like', "%{$search}%")
                        )
                        ->orWhereHas('template', fn ($t) =>
                            $t->where('name', 'like', "%{$search}%")
                        );
                })
            )
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Letters/Index', [
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
        $letter = Letter::with(['resident', 'template'])
            ->where('reference', $reference)
            ->firstOrFail();

        return Inertia::render('Admin/Letters/Show', [
            'letter' => $letter,
        ]);
    }
    
    /**
     * update
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function update(Request $request, $id)
    {
        // Find the letter by ID
        $letter = Letter::findOrFail($id);

        // Validate the request
        $request->validate([
            'status'        => 'required|in:approved,rejected',
            'letter_number' => 'required_if:status,approved|unique:letters,letter_number,' . $letter->id,
            'reject_reason' => 'required_if:status,rejected|string|max:1000',
        ]);

        // Update letter status and other fields
        $letter->status = $request->status;

        // If approved, set the letter number
        if ($request->status === 'approved') {

            // Set the letter number
            $letter->letter_number = $request->letter_number;

        } elseif ($request->status === 'rejected') {

            // Set the reject reason in meta
            $meta = $letter->meta ?? [];

            // Set the reject reason
            $meta['reject_reason'] = $request->reject_reason;

            // Set the meta
            $letter->meta = $meta;
        }

        // Save the letter
        $letter->save();

        // Redirect back with success message
        return redirect()->route('admin.letters.show', $letter->reference)
            ->with('success', 'Surat berhasil diperbarui.');
    }
}
