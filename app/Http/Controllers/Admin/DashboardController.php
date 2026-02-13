<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Letter;
use App\Models\Resident;
use App\Models\LetterTemplate;
use Illuminate\Support\Facades\DB;
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
        // Count all letter templates
        $lettersCount = LetterTemplate::query()->count();

        // Count all letters pending (masuk)
        $letterPendingCount = Letter::query()
            ->where('status', 'pending')
            ->count();

        // Count all completed letters
        $letterCompletedCount = Letter::query()
            ->where('status', 'approved')
            ->count();

        // Count all residents
        $residentsCount = Resident::query()->count();

        // Count male residents
        $maleResidentsCount = Resident::query()
            ->where('gender', 'male')
            ->count();

        // Count female residents
        $femaleResidentsCount = Resident::query()
            ->where('gender', 'female')
            ->count();

        // Get recent incoming letters
        $recentSuratMasuk = Letter::query()
            ->with(['template', 'resident'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($letter) {
                return [
                    'id'        => $letter->id,
                    'jenis'     => $letter->template->name,
                    'pengirim'  => $letter->resident->name,
                    'tanggal'   => $letter->created_at->format('Y-m-d H:i:s'),
                    'status'    => $letter->status,
                ];
            });

        // Get recent completed letters
        $recentSuratSelesai = Letter::query()
            ->with(['template', 'resident'])
            ->where('status', 'approved')
            ->orderBy('updated_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($letter) {
                return [
                    'id'        => $letter->id,
                    'jenis'     => $letter->template->name,
                    'penerima'  => $letter->resident->name,
                    'tanggal'   => $letter->updated_at->format('Y-m-d H:i:s'),
                ];
            });

        // Get monthly statistics for charts (last 6 months)
        $monthlyData = $this->getMonthlyStatistics();

        // Get letter type distribution for pie chart
        $letterTypeDistribution = $this->getLetterTypeDistribution();

        // Get status distribution for horizontal bar chart
        $statusDistribution = $this->getStatusDistribution();

        // Get daily trend for line chart (last 7 days)
        $dailyTrend = $this->getDailyTrend();

        return inertia('Admin/Dashboard/Index', [
            'stats' => [
                'totalSurat'            => $lettersCount,
                'suratMasuk'            => $letterPendingCount,
                'suratSelesai'          => $letterCompletedCount,
                'suratSelesaiBulanIni'  => $this->getCompletedThisMonth(),
                'totalPenduduk'         => $residentsCount,
                'pendudukLaki'          => $maleResidentsCount,
                'pendudukPerempuan'     => $femaleResidentsCount,
            ],
            'recentSuratMasuk'          => $recentSuratMasuk,
            'recentSuratSelesai'        => $recentSuratSelesai,
            'chartData'     => [
                'monthly'       => $monthlyData,
                'letterTypes'   => $letterTypeDistribution,
                'statuses'      => $statusDistribution,
                'dailyTrend'    => $dailyTrend,
            ],
            'performance' => [
                'avgProcessingTime' => $this->getAverageProcessingTime(),
                'completionRate'    => $this->getCompletionRate(),
            ],
        ]);
    }

    /**
     * Get monthly statistics for the last 6 months
     */
    private function getMonthlyStatistics()
    {
        $months = [];
        $incoming = [];
        $completed = [];

        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthName = $date->format('M');

            $monthStart = $date->copy()->startOfMonth();
            $monthEnd = $date->copy()->endOfMonth();

            $incomingCount = Letter::query()
                ->whereBetween('created_at', [$monthStart, $monthEnd])
                ->count();

            $completedCount = Letter::query()
                ->where('status', 'approved')
                ->whereBetween('updated_at', [$monthStart, $monthEnd])
                ->count();

            $months[] = $monthName;
            $incoming[] = $incomingCount;
            $completed[] = $completedCount;
        }

        return [
            'months' => $months,
            'incoming' => $incoming,
            'completed' => $completed,
        ];
    }

    /**
     * Get letter type distribution
     */
    private function getLetterTypeDistribution()
    {
        $distribution = Letter::query()
            ->join('letter_templates', 'letters.letter_template_id', '=', 'letter_templates.id')
            ->select('letter_templates.name', DB::raw('count(*) as total'))
            ->groupBy('letter_templates.name')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();

        $labels = [];
        $data = [];
        $colors = [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(249, 115, 22, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(107, 114, 128, 0.8)',
        ];

        foreach ($distribution as $index => $item) {
            $labels[] = $item->name;
            $data[] = $item->total;
        }

        // If we have less than 5 types, add "Lainnya"
        if (count($labels) < 5) {
            $otherCount = Letter::query()
                ->whereNotIn('letter_template_id', function ($query) use ($distribution) {
                    $query->select('id')
                        ->from('letter_templates')
                        ->whereIn('name', $distribution->pluck('name'));
                })
                ->count();

            if ($otherCount > 0) {
                $labels[] = 'Lainnya';
                $data[] = $otherCount;
            }
        }

        return [
            'labels' => $labels,
            'data' => $data,
            'colors' => array_slice($colors, 0, count($labels)),
        ];
    }

    /**
     * Get status distribution
     */
    private function getStatusDistribution()
    {
        $statuses = [
            'pending'   => 'Menunggu',
            'approved'  => 'Selesai',
            'rejected'  => 'Ditolak',
        ];

        $data = [];
        $labels = [];
        $backgroundColors = [
            'pending'   => 'rgba(234, 179, 8, 0.8)',
            'approved'  => 'rgba(34, 197, 94, 0.8)',
            'rejected'  => 'rgba(239, 68, 68, 0.8)',
        ];

        foreach ($statuses as $status => $label) {
            $count = Letter::query()
                ->where('status', $status)
                ->count();

            $labels[] = $label;
            $data[] = $count;
        }

        return [
            'labels' => $labels,
            'data'   => $data,
            'colors' => array_values($backgroundColors),
        ];
    }

    /**
     * Get daily trend for the last 7 days
     */
    private function getDailyTrend()
    {
        $days = [];
        $incoming = [];
        $processed = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dayName = $date->locale('id')->isoFormat('ddd');

            $dayStart = $date->copy()->startOfDay();
            $dayEnd = $date->copy()->endOfDay();

            $incomingCount = Letter::query()
                ->whereBetween('created_at', [$dayStart, $dayEnd])
                ->count();

            $processedCount = Letter::query()
                ->whereIn('status', ['pending', 'approved'])
                ->whereBetween('updated_at', [$dayStart, $dayEnd])
                ->count();

            $days[] = $dayName;
            $incoming[] = $incomingCount;
            $processed[] = $processedCount;
        }

        return [
            'days'      => $days,
            'incoming'  => $incoming,
            'processed' => $processed,
        ];
    }

    /**
     * Get completed letters this month
     */
    private function getCompletedThisMonth()
    {
        $monthStart = Carbon::now()->startOfMonth();
        $monthEnd = Carbon::now()->endOfMonth();

        return Letter::query()
            ->where('status', 'approved')
            ->whereBetween('updated_at', [$monthStart, $monthEnd])
            ->count();
    }

    /**
     * Get average processing time in days
     */
    private function getAverageProcessingTime()
    {
        $letters = Letter::query()
            ->where('status', 'approved')
            ->whereNotNull('created_at')
            ->whereNotNull('updated_at')
            ->get();

        if ($letters->isEmpty()) {
            return 0;
        }

        $totalDays = 0;
        foreach ($letters as $letter) {
            $created = Carbon::parse($letter->created_at);
            $approved = Carbon::parse($letter->updated_at);
            $totalDays += $created->diffInDays($approved);
        }

        return round($totalDays / $letters->count(), 1);
    }

    /**
     * Get completion rate percentage
     */
    private function getCompletionRate()
    {
        $total = Letter::query()->count();
        if ($total === 0) {
            return 0;
        }

        $completed = Letter::query()
            ->where('status', 'approved')
            ->count();

        return round(($completed / $total) * 100, 1);
    }
}
