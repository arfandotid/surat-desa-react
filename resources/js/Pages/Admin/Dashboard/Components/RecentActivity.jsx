// import Link dari Inertia
import { Link } from "@inertiajs/react";

// import icons dari lucide-react
import { Inbox, CheckSquare, LoaderCircle, ArrowRight } from "lucide-react";

export default function RecentActivity({
    recentSuratMasuk,
    recentSuratSelesai,
}) {
    // Mendapatkan data "recentSuratMasuk" dan "recentSuratSelesai" dari props
    const recentSurat = recentSuratMasuk || [];
    const selesaiSurat = recentSuratSelesai || [];

    return (
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            {/* Recent Surat Masuk */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Surat Masuk Terbaru
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                            {recentSurat.length} baru
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Surat yang memerlukan tindakan
                    </p>
                </div>

                <div className="p-6">
                    {recentSurat.length > 0 ? (
                        <div className="space-y-4">
                            {recentSurat.map((surat) => (
                                <div
                                    key={surat.id}
                                    className="flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mr-3">
                                            <LoaderCircle className="w-5 h-5 animate-spin" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {surat.jenis}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Dari: {surat.pengirim}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            {surat.tanggal}
                                        </p>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                surat.status === "pending"
                                                    ? "bg-orange-100 text-orange-800"
                                                    : surat.status ===
                                                        "processed"
                                                      ? "bg-blue-100 text-blue-800"
                                                      : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {surat.status === "pending"
                                                ? "Menunggu"
                                                : surat.status === "processed"
                                                  ? "Diproses"
                                                  : "Lainnya"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">
                                Tidak ada surat masuk
                            </p>
                        </div>
                    )}

                    {recentSurat.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <Link
                                href="/admin/letters"
                                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                            >
                                Lihat Semua Surat Masuk
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Surat Selesai */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Surat Selesai Terbaru
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {selesaiSurat.length} selesai
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Surat yang telah diproses
                    </p>
                </div>

                <div className="p-6">
                    {selesaiSurat.length > 0 ? (
                        <div className="space-y-4">
                            {selesaiSurat.map((surat) => (
                                <div
                                    key={surat.id}
                                    className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3">
                                            <CheckSquare className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {surat.jenis}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Penerima: {surat.penerima}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            {surat.tanggal}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">
                                Belum ada surat selesai
                            </p>
                        </div>
                    )}

                    {selesaiSurat.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <Link
                                href="/admin/letter-completeds"
                                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                            >
                                Lihat Arsip Surat
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
