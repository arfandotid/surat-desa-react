// import Head dan Link dari Inertia
import { Head, Link, usePage } from "@inertiajs/react";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin";

// import hasAnyPermission
import hasAnyPermission from "@/Utils/Permission";

// import icons
import {
    Eye,
    CheckCircle,
    XCircle,
    Calendar,
    User,
    FileText,
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

export default function LettersCompleted() {
    //destruct props "letters"
    const { letters } = usePage().props;

    return (
        <>
            <Head
                title={`Pengajuan Surat - ${import.meta.env.VITE_APP_NAME}`}
            />
            <LayoutAdmin>
                {/* Header dengan judul */}
                <div className="mb-8">
                    <PageHeader
                        title="Pengajuan Surat (Selesai)"
                        description="Kelola pengajuan surat dari penduduk"
                    />
                </div>

                {/* Card untuk tabel */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <Search URL={"/admin/letter-completeds"} />

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg mt-5">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        No.
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-30"
                                    >
                                        No. Surat
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Jenis Surat
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Pemohon
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Tanggal
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-7"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {letters && letters.data.length > 0 ? (
                                    letters.data.map((letter, index) => (
                                        <tr
                                            key={letter.id}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {++index +
                                                        (letters.current_page -
                                                            1) *
                                                            letters.per_page}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {letter.letter_number && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {letter.letter_number
                                                            ? letter.letter_number
                                                            : "-"}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                                        <FileText className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {letter.template
                                                                ?.name ||
                                                                "Tidak ada template"}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {letter.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                                                        <User className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {letter.resident
                                                                ?.name ||
                                                                "Tidak diketahui"}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            NIK:{" "}
                                                            {letter.resident
                                                                ?.nik || "-"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
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
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {new Date(
                                                        letter.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
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
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    {/* View */}
                                                    {hasAnyPermission([
                                                        "letters.show",
                                                    ]) && (
                                                        <Link
                                                            href={`/admin/letters/${letter.reference}`}
                                                            className="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                                            title="Lihat Detail"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                    )}

                                                    {letter.status ===
                                                        "approved" && (
                                                        <Link
                                                            href={`/admin/letters/print/${letter.reference}`}
                                                            target="_blank"
                                                            className="inline-flex items-center p-2 bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 ml-2"
                                                            title="Unduh Surat"
                                                        >
                                                            <Printer className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <TableEmpty
                                        title="Tidak ada Pengajuan Surat"
                                        description="Belum ada pengajuan surat dari penduduk"
                                        colSpan={7}
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
            </LayoutAdmin>
        </>
    );
}
