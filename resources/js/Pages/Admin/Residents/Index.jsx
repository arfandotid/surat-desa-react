// import Head dan Link dari Inertia
import { Head, Link, usePage } from "@inertiajs/react";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin";

// import hasAnyPermission
import hasAnyPermission from "@/Utils/Permission";

// import icons
import { Edit, Upload, Download } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

// import component TableEmpty
import TableEmpty from "@/Shared/TableEmpty";

// import component Search
import Search from "@/Shared/Search";

// import component Pagination
import Pagination from "@/Shared/Pagination";

// import component Delete
import Delete from "@/Shared/Delete";

export default function ResidentsIndex() {
    // destruct props "residents"
    const { residents } = usePage().props;

    return (
        <>
            <Head title={`Data Penduduk - ${import.meta.env.VITE_APP_NAME}`} />
            <LayoutAdmin>
                {/* Header */}
                <div className="mb-8">
                    <PageHeader
                        showButton
                        title="Data Penduduk"
                        description="Kelola data penduduk desa"
                        action="/admin/residents/create"
                        actionText="Tambah Penduduk"
                        permission="residents.create"
                    />
                </div>

                {/* Card */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    {/* Extra Action */}
                    <div className="flex items-center gap-2 mb-3">
                        {/* Export */}
                        <a
                            href="/admin/residents/export"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export Excel
                        </a>

                        {/* Import */}
                        <Link
                            href="/admin/residents/import"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Import Excel
                        </Link>
                    </div>

                    {/* Search */}
                    <Search URL={"/admin/residents"} />

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg mt-5">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        No.
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        NIK
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        Jenis Kelamin
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                        RT / RW
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-7">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {residents && residents.data.length > 0 ? (
                                    residents.data.map((resident, index) => (
                                        <tr
                                            key={resident.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {++index +
                                                    (residents.current_page -
                                                        1) *
                                                        residents.per_page}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {resident.nik}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {resident.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {resident.gender === "L"
                                                    ? "Laki-laki"
                                                    : "Perempuan"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {resident.rt} / {resident.rw}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    {hasAnyPermission([
                                                        "residents.edit",
                                                    ]) && (
                                                        <Link
                                                            href={`/admin/residents/${resident.id}/edit`}
                                                            className="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                    {hasAnyPermission([
                                                        "residents.delete",
                                                    ]) && (
                                                        <Delete
                                                            URL={
                                                                "/admin/residents"
                                                            }
                                                            id={resident.id}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <TableEmpty
                                        title="Tidak ada data penduduk"
                                        description="Silahkan tambahkan data penduduk"
                                        colSpan={6}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="my-3">
                        <Pagination links={residents.links} />
                    </div>
                </div>
            </LayoutAdmin>
        </>
    );
}
