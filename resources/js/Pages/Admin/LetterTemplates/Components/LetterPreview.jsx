// import usePage
import { usePage } from "@inertiajs/react";

export default function LetterPreview({ title, html }) {
    // get page props "settings"
    const { settings } = usePage().props;

    return (
        <div className="bg-gray-300 p-4 overflow-y-auto">
            <div
                className="bg-white print:bg-transparent p-8 mt-0 shadow rounded-lg max-w-full mx-auto"
                id="print"
            >
                {/* KOP SURAT */}
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
                        {title}
                    </div>
                    <div className="text-sm mt-1">Nomor: xxx/xxx/xxx/xxx</div>
                </div>

                {/* ============================= */}
                {/* ISI SURAT (TinyMCE) */}
                {/* ============================= */}
                <div
                    className="prose prose-md max-w-none"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
}
