// import Head dan Link dari Inertia
import { Head, Link, useForm, usePage } from "@inertiajs/react";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin";

// import icons
import { Save } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

// import constant
import {
    genderOptions,
    religionOptions,
    occupationOptions,
    maritalStatusOptions,
    educationOptions,
} from "./constant/resident";

export default function ResidentsEdit() {
    // resident dari controller
    const { resident } = usePage().props;

    // useForm untuk mengelola form data
    const { data, setData, put, processing, errors } = useForm({
        nik: resident.nik || "",
        name: resident.name || "",
        password: "",
        gender: resident.gender || "",
        birth_place: resident.birth_place || "",
        birth_date: resident.birth_date || "",
        religion: resident.religion || "",
        occupation: resident.occupation || "",
        education: resident.education || "",
        marital_status: resident.marital_status || "",
        address: resident.address || "",
        rt: resident.rt || "",
        rw: resident.rw || "",
        phone: resident.phone || "",
    });

    // fungsi handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        // kirim data ke server
        put(`/admin/residents/${resident.id}`);
    };

    return (
        <>
            <Head title={`Edit Penduduk - ${import.meta.env.VITE_APP_NAME}`} />
            <LayoutAdmin>
                {/* Header */}
                <div className="mb-8">
                    <PageHeader
                        title="Edit Penduduk"
                        description="Perbarui data penduduk"
                    />
                </div>

                {/* Card */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* NIK, Nama, Password, Jenis Kelamin */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* NIK */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        NIK
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nik}
                                        onChange={(e) =>
                                            setData("nik", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.nik ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>

                                {/* Nama */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>

                                {/* Password (opsional) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password{" "}
                                        <span className="text-gray-400">
                                            (Opsional)
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="Kosongkan jika tidak diubah"
                                    />
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        value={data.gender}
                                        onChange={(e) =>
                                            setData("gender", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg bg-white ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        <option value="">-- Pilih --</option>
                                        {genderOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Tempat & Tanggal Lahir */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tempat Lahir
                                    </label>
                                    <input
                                        type="text"
                                        value={data.birth_place}
                                        onChange={(e) =>
                                            setData(
                                                "birth_place",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.birth_place ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    {errors.birth_place && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.birth_place}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) =>
                                            setData(
                                                "birth_date",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.birth_date ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    {errors.birth_date && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.birth_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Data Sosial */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Agama */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Agama
                                    </label>
                                    <select
                                        value={data.religion}
                                        onChange={(e) =>
                                            setData("religion", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg bg-white ${errors.religion ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        <option value="">-- Pilih --</option>
                                        {religionOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.religion && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.religion}
                                        </p>
                                    )}
                                </div>

                                {/* Pekerjaan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pekerjaan
                                    </label>
                                    <select
                                        value={data.occupation}
                                        onChange={(e) =>
                                            setData(
                                                "occupation",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg bg-white ${errors.occupation ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        {occupationOptions.map(
                                            (option, index) => (
                                                <option
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option || "-- Pilih --"}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    {errors.occupation && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.occupation}
                                        </p>
                                    )}
                                </div>

                                {/* Pendidikan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pendidikan
                                    </label>
                                    <select
                                        value={data.education}
                                        onChange={(e) =>
                                            setData("education", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg bg-white ${errors.education ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        {educationOptions.map(
                                            (option, index) => (
                                                <option
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option || "-- Pilih --"}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    {errors.education && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.education}
                                        </p>
                                    )}
                                </div>

                                {/* Status Pernikahan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Pernikahan
                                    </label>
                                    <select
                                        value={data.marital_status}
                                        onChange={(e) =>
                                            setData(
                                                "marital_status",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg bg-white ${errors.marital_status ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        {maritalStatusOptions.map(
                                            (option, index) => (
                                                <option
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option || "-- Pilih --"}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    {errors.marital_status && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.marital_status}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alamat
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className={`w-full px-4 py-2 border rounded-lg ${errors.address ? "border-red-500" : "border-gray-300"}`}
                                />
                            </div>

                            {/* RT / RW / Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        RT
                                    </label>
                                    <input
                                        type="text"
                                        value={data.rt}
                                        onChange={(e) =>
                                            setData("rt", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.rt ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        RW
                                    </label>
                                    <input
                                        type="text"
                                        value={data.rw}
                                        onChange={(e) =>
                                            setData("rw", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.rw ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="flex justify-start space-x-3 pt-6">
                            <Link
                                href="/admin/residents"
                                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>
                        </div>
                    </form>
                </div>
            </LayoutAdmin>
        </>
    );
}
