// import Head dan Inertia hooks
import { Head, useForm, usePage } from "@inertiajs/react";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin";

// import icons
import { Save, Upload } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

export default function SettingsIndex() {
    // destructure "setting" dari props page
    const { setting } = usePage().props;

    // inisialisasi useForm dengan data awal dari "setting"
    const { data, setData, post, processing, errors } = useForm({
        // ======================
        // DATA DESA
        // ======================
        village_name: setting?.village_name || "",
        village_address: setting?.village_address || "",
        village_phone: setting?.village_phone || "",
        village_email: setting?.village_email || "",
        village_website: setting?.village_website || "",
        village_logo: null,

        // ======================
        // WILAYAH ADMINISTRATIF
        // ======================
        subdistrict_name: setting?.subdistrict_name || "",
        regency_name: setting?.regency_name || "",
        province_name: setting?.province_name || "",

        // ======================
        // DATA KEPALA DESA
        // ======================
        official_name: setting?.official_name || "",
        official_position: setting?.official_position || "",
        official_phone: setting?.official_phone || "",
        official_email: setting?.official_email || "",
        official_nipd: setting?.official_nipd || "",

        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke route "admin.settings"
        post("/admin/settings", {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head
                title={`Pengaturan Desa - ${import.meta.env.VITE_APP_NAME}`}
            />
            <LayoutAdmin>
                {/* Header */}
                <div className="mb-8">
                    <PageHeader
                        title="Pengaturan Desa"
                        description="Kelola identitas desa, wilayah administrasi, dan kepala desa"
                    />
                </div>

                {/* Card */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            {/* ======================
                                LOGO DESA
                            ====================== */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Logo Desa
                                </label>

                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
                                    ${errors.village_logo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-500"}`}
                                >
                                    <input
                                        type="file"
                                        id="logo_file"
                                        onChange={(e) =>
                                            setData(
                                                "village_logo",
                                                e.target.files[0],
                                            )
                                        }
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/jpg"
                                    />

                                    <label
                                        htmlFor="logo_file"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600">
                                            {data.village_logo
                                                ? data.village_logo.name
                                                : "Klik untuk upload logo desa"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            PNG / JPG, maksimal 2MB
                                        </p>
                                    </label>
                                </div>

                                {errors.village_logo && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.village_logo}
                                    </p>
                                )}
                            </div>

                            {/* ======================
                                DATA DESA
                            ====================== */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Desa
                                    </label>
                                    <input
                                        type="text"
                                        value={data.village_name}
                                        onChange={(e) =>
                                            setData(
                                                "village_name",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.village_name ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    {errors.village_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.village_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Telepon Desa
                                    </label>
                                    <input
                                        type="text"
                                        value={data.village_phone}
                                        onChange={(e) =>
                                            setData(
                                                "village_phone",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.village_phone ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Desa
                                    </label>
                                    <input
                                        type="email"
                                        value={data.village_email}
                                        onChange={(e) =>
                                            setData(
                                                "village_email",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.village_email ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Website Desa
                                    </label>
                                    <input
                                        type="text"
                                        value={data.village_website}
                                        onChange={(e) =>
                                            setData(
                                                "village_website",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.village_website ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alamat Desa
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.village_address}
                                    onChange={(e) =>
                                        setData(
                                            "village_address",
                                            e.target.value,
                                        )
                                    }
                                    className={`w-full px-4 py-2 border rounded-lg ${errors.village_address ? "border-red-500" : "border-gray-300"}`}
                                />
                            </div>

                            {/* ======================
                                WILAYAH ADMINISTRATIF
                            ====================== */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kecamatan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subdistrict_name}
                                        onChange={(e) =>
                                            setData(
                                                "subdistrict_name",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kabupaten
                                    </label>
                                    <input
                                        type="text"
                                        value={data.regency_name}
                                        onChange={(e) =>
                                            setData(
                                                "regency_name",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Provinsi
                                    </label>
                                    <input
                                        type="text"
                                        value={data.province_name}
                                        onChange={(e) =>
                                            setData(
                                                "province_name",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    />
                                </div>
                            </div>

                            {/* ======================
                                DATA KEPALA DESA
                            ====================== */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 border-gray-400 pt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Kepala Desa
                                    </label>
                                    <input
                                        type="text"
                                        value={data.official_name}
                                        onChange={(e) =>
                                            setData(
                                                "official_name",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jabatan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.official_position}
                                        onChange={(e) =>
                                            setData(
                                                "official_position",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        No. Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={data.official_phone}
                                        onChange={(e) =>
                                            setData(
                                                "official_phone",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.official_email}
                                        onChange={(e) =>
                                            setData(
                                                "official_email",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        NIPD
                                    </label>
                                    <input
                                        type="text"
                                        value={data.official_nipd}
                                        onChange={(e) =>
                                            setData(
                                                "official_nipd",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Action */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-2.5 text-sm font-semibold
                                    text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </LayoutAdmin>
        </>
    );
}
