// import Head dan Link dari Inertia
import { Head, Link, useForm } from "@inertiajs/react";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin";

// import icons
import { Upload, ArrowLeft, FileSpreadsheet } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

export default function ResidentsImport() {
    // useForm untuk mengelola form data
    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    // fungsi handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        post("/admin/residents/import", {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head
                title={`Import Penduduk - ${import.meta.env.VITE_APP_NAME}`}
            />
            <LayoutAdmin>
                <div className="mb-8">
                    <PageHeader
                        title="Import Penduduk"
                        description="Upload file Excel untuk mengimpor data penduduk"
                    />
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm max-w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <a
                                target="_blank"
                                href="/templates/residents.xlsx"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-green-700 bg-white border rounded-lg"
                            >
                                <FileSpreadsheet className="w-4 h-4 mr-2" />
                                Download Template
                            </a>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    File Excel
                                </label>

                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center
                                    ${errors.file ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                                >
                                    <input
                                        type="file"
                                        id="import_file"
                                        className="hidden"
                                        accept=".xlsx,.xls,.csv"
                                        onChange={(e) =>
                                            setData("file", e.target.files[0])
                                        }
                                    />

                                    <label
                                        htmlFor="import_file"
                                        className="cursor-pointer"
                                    >
                                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600">
                                            {data.file
                                                ? data.file.name
                                                : "Klik untuk upload file Excel"}
                                        </p>
                                    </label>
                                </div>

                                {errors.file && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.file}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6">
                            <Link
                                href="/admin/residents"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg disabled:opacity-50"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                {processing ? "Mengimpor..." : "Import"}
                            </button>
                        </div>
                    </form>
                </div>
            </LayoutAdmin>
        </>
    );
}
