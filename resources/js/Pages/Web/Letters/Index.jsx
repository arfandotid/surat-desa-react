// import Head dan Link dari Inertia
import { Head, Link, usePage } from "@inertiajs/react";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb";

// import icons
import { FileText, Pencil } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

// import component TableEmpty
import TableEmpty from "@/Shared/TableEmpty";

// import component Search
import Search from "@/Shared/Search";

// import component Pagination
import Pagination from "@/Shared/Pagination";

export default function LettersIndex() {
    // destruct props "templates"
    const { templates } = usePage().props;

    return (
        <>
            <Head title={`Daftar Surat - ${import.meta.env.VITE_APP_NAME}`} />

            <LayoutWeb>
                <div className="min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Header */}
                        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <PageHeader
                                title="Daftar Surat"
                                description="Pilih jenis surat yang ingin Anda ajukan"
                            />
                        </div>

                        {/* Card */}
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            {/* Search */}
                            <Search URL={"/letters"} />

                            {/* Table */}
                            <div className="overflow-x-auto border border-gray-200 rounded-lg mt-5">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                                No.
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-70">
                                                Nama Surat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                                Deskripsi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-40">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {templates &&
                                        templates.data.length > 0 ? (
                                            templates.data.map(
                                                (template, index) => (
                                                    <tr
                                                        key={template.id}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            {++index +
                                                                (templates.current_page -
                                                                    1) *
                                                                    templates.per_page}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="w-4 h-4 text-blue-600" />
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {
                                                                        template.name
                                                                    }
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td class="px-6 py-4 text-sm text-gray-600 pb-5">
                                                            <div class="line-clamp-2">
                                                                {template.description ??
                                                                    "-"}
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <Link
                                                                href={`/letters/create?template=${template.slug}`}
                                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 transition uppercase"
                                                            >
                                                                <Pencil className="w-3 h-3" />
                                                                Buat Surat
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <TableEmpty
                                                title="Surat Tidak Ditemukan"
                                                description="Tidak ada jenis surat yang tersedia"
                                                colSpan={4}
                                            />
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="my-3">
                                <Pagination links={templates.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
