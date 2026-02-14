// import head dan usePage dari inertiajs
import { Head, usePage } from "@inertiajs/react";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb";

// import icons
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Dashboard() {
    // get page props "auth", "letterCount", "LetterPendingCount", "letterCompletedCount" dan "letterRejectedCount"
    const {
        auth,
        letterCount,
        letterPendingCount,
        letterCompletedCount,
        letterRejectedCount,
    } = usePage().props;

    // get auth "resident"
    const resident = auth.resident;

    // stats data
    const stats = {
        totalSurat: letterCount,
        pending: letterPendingCount,
        approved: letterCompletedCount,
        rejected: letterRejectedCount,
    };

    return (
        <>
            <Head title={`Dashboard - ${import.meta.env.VITE_APP_NAME}`} />

            <LayoutWeb>
                <div className="min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Welcome */}
                        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-300 pb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Selamat Datang,{" "}
                                    <span className="text-blue-600">
                                        {resident?.name}
                                    </span>
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Nomor Induk Kependudukan (NIK):{" "}
                                    <strong>{resident?.nik}</strong>
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[
                                {
                                    label: "Total Pengajuan",
                                    value: stats.totalSurat,
                                    icon: FileText,
                                    color: "blue",
                                },
                                {
                                    label: "Menunggu",
                                    value: stats.pending,
                                    icon: Clock,
                                    color: "amber",
                                },
                                {
                                    label: "Disetujui",
                                    value: stats.approved,
                                    icon: CheckCircle,
                                    color: "emerald",
                                },
                                {
                                    label: "Ditolak",
                                    value: stats.rejected,
                                    icon: XCircle,
                                    color: "red",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl p-6 shadow-sm"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {item.label}
                                            </p>
                                            <p
                                                className={`text-3xl font-bold text-${item.color}-600 mt-2`}
                                            >
                                                {item.value}
                                            </p>
                                        </div>
                                        <div
                                            className={`p-3 bg-${item.color}-50 rounded-xl`}
                                        >
                                            <item.icon
                                                className={`w-8 h-8 text-${item.color}-600`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
