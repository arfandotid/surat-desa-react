// import Head dan Link dari Inertia
import { Head, Link, usePage } from "@inertiajs/react";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb";

// import icons
import {
    PlusCircle,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Printer,
} from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

// import component TableEmpty
import TableEmpty from "@/Shared/TableEmpty";

// import component Search
import Search from "@/Shared/Search";

// import component Pagination
import Pagination from "@/Shared/Pagination";

export default function MyLettersIndex() {
    // destruct props "letters"
    const { letters } = usePage().props;

    return (
        <>
            <Head title={`Surat Saya - ${import.meta.env.VITE_APP_NAME}`} />

            <LayoutWeb>
                <div className="min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Header */}
                        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <PageHeader
                                title="Surat Saya"
                                description="Daftar pengajuan surat yang pernah Anda ajukan"
                            />

                            <Link
                                href="/letters"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white text-sm rounded-xl shadow-sm hover:shadow-lg transition"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Surat Baru
                            </Link>
                        </div>

                        {/* Card */}
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            {/* Search */}
                            <Search URL={"/my-letters"} />

                            {/* Table */}
                            <div className="overflow-x-auto border border-gray-200 rounded-lg mt-5">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                                No.
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                                Nama Surat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-30">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {letters && letters.data.length > 0 ? (
                                            letters.data.map(
                                                (letter, index) => (
                                                    <tr
                                                        key={letter.id}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            {++index +
                                                                (letters.current_page -
                                                                    1) *
                                                                    letters.per_page}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="w-4 h-4 text-blue-600" />
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {letter
                                                                            .template
                                                                            ?.name ??
                                                                            "-"}
                                                                    </div>
                                                                    {letter.title && (
                                                                        <div className="text-xs text-gray-500 mt-1">
                                                                            {
                                                                                letter.title
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            {letter.status ===
                                                                "pending" && (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 uppercase">
                                                                    <Clock className="w-3 h-3 mr-1" />
                                                                    Menunggu
                                                                </span>
                                                            )}

                                                            {letter.status ===
                                                                "rejected" && (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 uppercase">
                                                                    <XCircle className="w-3 h-3 mr-1" />
                                                                    Ditolak
                                                                </span>
                                                            )}

                                                            {letter.status ===
                                                                "approved" && (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase">
                                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                                    Disetujui
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                {new Date(
                                                                    letter.created_at,
                                                                ).toLocaleDateString(
                                                                    "id-ID",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    },
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-1">
                                                                {new Date(
                                                                    letter.created_at,
                                                                ).toLocaleTimeString(
                                                                    "id-ID",
                                                                    {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    },
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm">
                                                            <Link
                                                                href={`/my-letters/${letter.reference}`}
                                                                className="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                                                title="Lihat Detail"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Link>

                                                            {letter.status ===
                                                                "approved" && (
                                                                <Link
                                                                    href={`/my-letters/print/${letter.reference}`}
                                                                    target="_blank"
                                                                    className="inline-flex items-center p-2 bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 ml-2"
                                                                    title="Unduh Surat"
                                                                >
                                                                    <Printer className="w-4 h-4" />
                                                                </Link>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <TableEmpty
                                                title="Belum Ada Pengajuan"
                                                description="Anda belum pernah mengajukan surat"
                                                colSpan={5}
                                            />
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="my-3">
                                <Pagination links={letters.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
