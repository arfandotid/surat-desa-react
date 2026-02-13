// import Link dari Inertia
import { Link } from "@inertiajs/react";

// import usePage untuk mendapatkan settings
import { usePage } from "@inertiajs/react";

// import icon dari lucide-react
import { Building2 } from "lucide-react";

export default function Logo() {
    // get page props "settings"
    const { settings } = usePage().props;

    return (
        <Link href="/admin/dashboard">
            <div className="flex items-center flex-shrink-0">
                <div className="relative">
                    <div className="bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"></div>
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                {settings?.village_logo ? (
                                    <img
                                        src={`/storage/settings/${settings.village_logo}`}
                                        alt={`Logo Desa ${settings.village_name || ""}`}
                                        className="w-8 h-8 object-contain"
                                    />
                                ) : (
                                    <Building2
                                        size={28}
                                        className="text-blue-600"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-3">
                    <h1 className="text-md uppercase font-bold text-gray-900">
                        {settings?.village_name
                            ? `Surat Desa ${settings.village_name}`
                            : "Surat Desa"}
                    </h1>
                    <p className="text-xs text-gray-500 font-medium italic mt-0.5">
                        Sistem Informasi Surat Desa
                    </p>
                </div>
            </div>
        </Link>
    );
}
