// Import icons from lucide-react
import {
    BarChart3,
    PieChart,
    TrendingUp,
    Clock,
    AlertCircle,
} from "lucide-react";

// Import Chart.js components
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";

// Import React Chart.js components
import { Bar, Pie, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
);

export default function ChartsSection({ chartData, performance, statistics }) {
    // Data untuk chart surat per bulan (Bar Chart)
    const barChartData = {
        labels: chartData?.monthly?.months || [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
        ],
        datasets: [
            {
                label: "Surat Masuk",
                data: chartData?.monthly?.incoming || [0, 0, 0, 0, 0, 0],
                backgroundColor: "rgba(249, 115, 22, 0.8)",
                borderColor: "rgb(249, 115, 22)",
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            },
            {
                label: "Surat Selesai",
                data: chartData?.monthly?.completed || [0, 0, 0, 0, 0, 0],
                backgroundColor: "rgba(34, 197, 94, 0.8)",
                borderColor: "rgb(34, 197, 94)",
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif",
                    },
                    padding: 20,
                    usePointStyle: true,
                },
            },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                titleColor: "#1f2937",
                bodyColor: "#4b5563",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw} surat`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(243, 244, 246, 1)",
                },
                ticks: {
                    font: {
                        size: 11,
                    },
                    color: "#6b7280",
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: "#6b7280",
                },
            },
        },
    };

    // Data untuk pie chart jenis surat
    const pieChartData = {
        labels: chartData?.letterTypes?.labels || ["Tidak ada data"],
        datasets: [
            {
                data: chartData?.letterTypes?.data || [1],
                backgroundColor: chartData?.letterTypes?.colors || [
                    "rgba(107, 114, 128, 0.8)",
                ],
                borderColor: chartData?.letterTypes?.colors?.map((color) =>
                    color.replace("0.8", "1"),
                ) || ["rgb(107, 114, 128)"],
                borderWidth: 2,
                hoverOffset: 15,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    font: {
                        size: 11,
                        family: "'Inter', sans-serif",
                    },
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: "circle",
                },
            },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                titleColor: "#1f2937",
                bodyColor: "#4b5563",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                callbacks: {
                    label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce(
                            (a, b) => a + b,
                            0,
                        );
                        const percentage =
                            total > 0 ? Math.round((value / total) * 100) : 0;
                        return `${label}: ${value} surat${total > 0 ? ` (${percentage}%)` : ""}`;
                    },
                },
            },
        },
    };

    // Data untuk line chart trend surat
    const lineChartData = {
        labels: chartData?.dailyTrend?.days || [
            "Sen",
            "Sel",
            "Rab",
            "Kam",
            "Jum",
            "Sab",
            "Min",
        ],
        datasets: [
            {
                label: "Surat Masuk",
                data: chartData?.dailyTrend?.incoming || [0, 0, 0, 0, 0, 0, 0],
                borderColor: "rgb(249, 115, 22)",
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgb(249, 115, 22)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 4,
            },
            {
                label: "Surat Diproses",
                data: chartData?.dailyTrend?.processed || [0, 0, 0, 0, 0, 0, 0],
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgb(59, 130, 246)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif",
                    },
                    padding: 20,
                    usePointStyle: true,
                },
            },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                titleColor: "#1f2937",
                bodyColor: "#4b5563",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(243, 244, 246, 1)",
                },
                ticks: {
                    font: {
                        size: 11,
                    },
                    color: "#6b7280",
                },
            },
            x: {
                grid: {
                    color: "rgba(243, 244, 246, 1)",
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: "#6b7280",
                },
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
    };

    // Data untuk horizontal bar chart status surat
    const horizontalBarData = {
        labels: chartData?.statuses?.labels || [
            "Menunggu",
            "Diproses",
            "Selesai",
            "Ditolak",
        ],
        datasets: [
            {
                label: "Jumlah Surat",
                data: chartData?.statuses?.data || [0, 0, 0, 0],
                backgroundColor: chartData?.statuses?.colors || [
                    "rgba(234, 179, 8, 0.8)",
                    "rgba(59, 130, 246, 0.8)",
                    "rgba(34, 197, 94, 0.8)",
                    "rgba(239, 68, 68, 0.8)",
                ],
                borderColor: chartData?.statuses?.colors?.map((color) =>
                    color.replace("0.8", "1"),
                ) || [
                    "rgb(234, 179, 8)",
                    "rgb(59, 130, 246)",
                    "rgb(34, 197, 94)",
                    "rgb(239, 68, 68)",
                ],
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    const horizontalBarOptions = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                titleColor: "#1f2937",
                bodyColor: "#4b5563",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                callbacks: {
                    label: function (context) {
                        return `${context.raw} surat`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: "rgba(243, 244, 246, 1)",
                },
                ticks: {
                    font: {
                        size: 11,
                    },
                    color: "#6b7280",
                    callback: function (value) {
                        return value;
                    },
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: "500",
                    },
                    color: "#4b5563",
                },
            },
        },
    };

    // Hitung total surat untuk pie chart
    const totalSuratForPie = pieChartData.datasets[0].data.reduce(
        (a, b) => a + b,
        0,
    );

    // Hitung puncak aktivitas untuk line chart
    const maxIncoming = Math.max(...lineChartData.datasets[0].data);
    const maxIncomingIndex =
        lineChartData.datasets[0].data.indexOf(maxIncoming);
    const peakDay = lineChartData.labels[maxIncomingIndex];

    // Hitung rata-rata surat per hari
    const avgDaily =
        lineChartData.datasets[0].data.reduce((a, b) => a + b, 0) /
        lineChartData.datasets[0].data.length;

    return (
        <>
            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
                {/* Chart 1: Bar Chart - Tren Surat Per Bulan */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Tren Surat Per Bulan
                            </h3>
                            <p className="text-sm text-gray-600">
                                Perbandingan surat masuk vs selesai
                            </p>
                        </div>
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>

                    <div className="h-64">
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 mr-2 bg-orange-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">
                                        Surat Masuk
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">
                                        Surat Selesai
                                    </span>
                                </div>
                            </div>
                            <div
                                className={`flex items-center text-sm ${
                                    statistics.suratSelesaiBulanIni > 0
                                        ? "text-green-600"
                                        : "text-gray-600"
                                }`}
                            >
                                <TrendingUp className="w-4 h-4 mr-1" />
                                {statistics.suratSelesaiBulanIni || 0} bulan ini
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart 2: Pie Chart - Distribusi Jenis Surat */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Distribusi Jenis Surat
                            </h3>
                            <p className="text-sm text-gray-600">
                                Persentase berdasarkan jenis surat
                            </p>
                        </div>
                        <PieChart className="w-6 h-6 text-purple-600" />
                    </div>

                    <div className="h-64">
                        <Pie data={pieChartData} options={pieChartOptions} />
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Total{" "}
                                <span className="font-semibold text-gray-900">
                                    {totalSuratForPie} surat
                                </span>{" "}
                                terdata
                            </div>
                            {pieChartData.labels.length > 1 && (
                                <div className="text-sm text-blue-600 font-medium">
                                    {pieChartData.labels[0]} dominan
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Row Charts */}
            <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
                {/* Chart 3: Line Chart - Trend Harian */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Aktivitas Surat Harian
                            </h3>
                            <p className="text-sm text-gray-600">
                                Trend surat minggu ini
                            </p>
                        </div>
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>

                    <div className="h-64">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                {maxIncoming > 0 ? (
                                    <>
                                        Puncak:{" "}
                                        <span className="font-semibold text-gray-900">
                                            {peakDay} ({maxIncoming} surat)
                                        </span>
                                    </>
                                ) : (
                                    "Tidak ada aktivitas"
                                )}
                            </div>
                            <div className="flex items-center text-sm text-blue-600">
                                <Clock className="w-4 h-4 mr-1" />
                                Rata-rata {avgDaily.toFixed(1)} surat/hari
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart 4: Horizontal Bar - Status Surat */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Status Surat Saat Ini
                            </h3>
                            <p className="text-sm text-gray-600">
                                Distribusi status surat terbaru
                            </p>
                        </div>
                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>

                    <div className="h-64">
                        <Bar
                            data={horizontalBarData}
                            options={horizontalBarOptions}
                        />
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-3 text-blue-600" />
                            <div>
                                <p className="text-sm font-medium text-blue-900">
                                    Rata-rata waktu proses:{" "}
                                    {performance?.avgProcessingTime || 0} hari
                                </p>
                                {performance?.completionRate > 0 && (
                                    <p className="text-xs text-blue-700">
                                        Tingkat penyelesaian:{" "}
                                        {performance?.completionRate}%
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
