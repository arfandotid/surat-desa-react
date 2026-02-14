<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Letter;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //count letters milik resident yang sedang login
        $letterCount = Letter::query()
            ->where('resident_id', auth()->guard('resident')->id())
            ->count();

        //count letters menunggu persetujuan milik resident yang sedang login
        $letterPendingCount = Letter::query()
            ->where('resident_id', auth()->guard('resident')->id())
            ->where('status', 'pending')
            ->count();

        //count letters selesai milik resident yang sedang login
        $letterCompletedCount = Letter::query()
            ->where('resident_id', auth()->guard('resident')->id())
            ->where('status', 'approved')
            ->count();

        //count letters ditolak milik resident yang sedang login
        $letterRejectedCount = Letter::query()
            ->where('resident_id', auth()->guard('resident')->id())
            ->where('status', 'rejected')
            ->count();

        return Inertia::render('Web/Dashboard/Index', [
            'letterCount'           => $letterCount,
            'letterPendingCount'    => $letterPendingCount,
            'letterCompletedCount'  => $letterCompletedCount,
            'letterRejectedCount'   => $letterRejectedCount,
        ]);
    }
}
