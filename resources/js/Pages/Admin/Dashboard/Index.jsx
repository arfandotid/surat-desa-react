// import Head and Link dari Inertia
import { Head, usePage } from "@inertiajs/react";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

// import component StatisticsGrid
import StatisticsGrid from "./Components/StatisticsGrid";

// import component RecentActivity
import RecentActivity from "./Components/RecentActivity";

// import component ChartsSection
import ChartsSection from "./Components/ChartsSection";

export default function Dashboard() {
    // Mendapatkan data "stats, recentSuratMasuk, recentSuratSelesai" dari props
    const {
        stats,
        recentSuratMasuk,
        recentSuratSelesai,
        chartData,
        performance,
    } = usePage().props;

    return (
        <>
            <Head title={`Dashboard - ${import.meta.env.VITE_APP_NAME}`} />
            <LayoutAdmin>
                {/* Header */}
                <div className="mb-8">
                    <PageHeader
                        showButton={false}
                        title="Dashboard"
                        description="Selamat datang di Aplikasi Surat Desa. Berikut adalah ringkasan aktivitas sistem."
                    />
                </div>

                {/* Statistics Grid */}
                <StatisticsGrid statistics={stats} />

                {/* Recent Activity Section */}
                <RecentActivity
                    recentSuratMasuk={recentSuratMasuk}
                    recentSuratSelesai={recentSuratSelesai}
                />

                {/* Charts Section */}
                <ChartsSection
                    chartData={chartData}
                    performance={performance}
                    statistics={stats}
                />
            </LayoutAdmin>
        </>
    );
}
