// import usePage dari Inertia
import { usePage } from "@inertiajs/react";

// import icons
import { ArrowLeft, Printer } from "lucide-react";

export default function Print() {
    // Ambil props dari controller
    const { settings, letter } = usePage().props;

    // Gabungkan semua data dari letter
    const allData = {
        ...(letter.resident_snapshot || {}),
        ...(letter.village_snapshot || {}),
        ...(letter.official_snapshot || {}),
        ...(letter.payload || {}),
    };

    // Helper format tanggal Indonesia
    const formatDateToIndonesian = (date) => {
        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Tambahkan tanggal terbilang
    allData.tanggal_hari_ini_terbilang = formatDateToIndonesian(new Date());

    // Render HTML TinyMCE
    const renderedHtml = Object.keys(allData).reduce((content, key) => {
        const value = allData[key] ?? "";
        return content.replaceAll(`{{${key}}}`, String(value));
    }, letter.template?.content_template || "");

    return (
        <div className="bg-gray-300 min-h-screen p-4 print:bg-white">
            {/* BUTTON PRINT (tidak ikut tercetak) */}
            <div className="max-w-4xl mx-auto justify-between flex mb-4 print:hidden">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </button>

                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Surat
                </button>
            </div>

            <div className="mx-auto max-w-4xl">
                <div
                    id="print"
                    className="bg-white p-8 shadow rounded-lg print:bg-transparent print:shadow-none print:rounded-none"
                >
                    {/* ============================= */}
                    {/* KOP SURAT */}
                    {/* ============================= */}
                    <div className="flex justify-center items-center gap-4 pb-4 mb-6 relative">
                        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-0.5">
                            <div className="h-[0.5px] bg-gray-800/60"></div>
                            <div className="h-0.5 bg-gray-800"></div>
                        </div>

                        <img
                            src={`/storage/settings/${settings.village_logo}`}
                            alt="Logo Desa"
                            className="absolute left-0 w-20 h-20 object-contain"
                        />

                        <div className="text-center">
                            <div className="font-bold uppercase text-lg">
                                Pemerintah Kabupaten {settings.regency_name}
                            </div>
                            <div className="font-bold uppercase text-lg">
                                Kecamatan {settings.subdistrict_name}
                            </div>
                            <div className="font-bold uppercase text-2xl">
                                Desa {settings.village_name}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                                {settings.village_address} / email:{" "}
                                {settings.village_email} / No. Telepon:{" "}
                                {settings.village_phone}
                            </div>
                        </div>

                        <div className="absolute right-0 w-20"></div>
                    </div>

                    {/* ============================= */}
                    {/* JUDUL & NOMOR SURAT */}
                    {/* ============================= */}
                    <div className="text-center my-8">
                        <div className="font-bold uppercase text-lg underline">
                            {letter.template?.name}
                        </div>
                        <div className="text-sm mt-1">
                            Nomor: <strong>{letter.letter_number}</strong>
                        </div>
                    </div>

                    {/* ============================= */}
                    {/* ISI SURAT */}
                    {/* ============================= */}
                    <div
                        className="prose prose-md max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderedHtml }}
                    />
                </div>
            </div>
        </div>
    );
}
