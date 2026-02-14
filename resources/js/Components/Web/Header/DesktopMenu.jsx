// import Link  dari inertiajs
import { Link } from "@inertiajs/react";

// import useState dari react
import { useState } from "react";

// import icons
import {
    LayoutDashboard,
    UserLock,
    Mail,
    ChevronDown,
    FileText,
    FolderOpen,
} from "lucide-react";

export default function DesktopMenu({ auth }) {
    // state untuk dropdown
    const [activeDropdown, setActiveDropdown] = useState(null);

    // fungsi untuk toggle dropdown
    const toggleDropdown = (dropdownName) => {
        // jika dropdown sedang terbuka, tutup dropdown
        setActiveDropdown(
            activeDropdown === dropdownName ? null : dropdownName,
        );
    };

    // fungsi untuk menutup semua dropdown
    const closeAllDropdowns = () => {
        // tutup semua dropdown
        setActiveDropdown(null);
    };

    return (
        <div className="hidden md:flex items-center gap-4">
            {auth.resident ? (
                <>
                    {/* Dashboard Penduduk */}
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200 text-gray-700"
                    >
                        <LayoutDashboard className="size-5 mr-2.5" />
                        DASHBOARD
                    </Link>

                    {/* Dropdown Surat */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown("surat")}
                            className={`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border ${
                                activeDropdown === "surat"
                                    ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 shadow-sm"
                                    : "border-transparent hover:border-gray-200 text-gray-700"
                            }`}
                        >
                            <Mail className="size-5 mr-2.5" />
                            SURAT
                            <ChevronDown
                                className={`size-5 ml-2 transition-transform duration-200 ${
                                    activeDropdown === "surat"
                                        ? "rotate-180 text-blue-600"
                                        : "text-gray-400"
                                }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdown === "surat" && (
                            <div
                                className="absolute top-full left-0 mt-5 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
                                onMouseLeave={closeAllDropdowns}
                            >
                                <div className="py-2">
                                    {/* Ajukan Surat Baru */}
                                    <Link
                                        href="/letters"
                                        onClick={closeAllDropdowns}
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="mr-3 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                                            <FileText className="size-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 group-hover:text-blue-700">
                                                Ajukan Surat Baru
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                Buat permohonan surat baru
                                            </div>
                                        </div>
                                        <ChevronDown className="size-4 ml-auto text-gray-400 rotate-270 group-hover:text-blue-600" />
                                    </Link>

                                    {/* Divider */}
                                    <div className="border-t border-gray-100 my-1 mx-4"></div>

                                    {/* Surat Saya */}
                                    <Link
                                        href="/my-letters"
                                        onClick={closeAllDropdowns}
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="mr-3 p-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all">
                                            <FolderOpen className="size-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 group-hover:text-emerald-700">
                                                Surat Saya
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                Lihat semua surat Anda
                                            </div>
                                        </div>
                                        <ChevronDown className="size-4 ml-auto text-gray-400 rotate-270 group-hover:text-emerald-600" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* divider */}
                    <div className="border-l border-gray-300 h-6 self-center"></div>

                    {/* Logout */}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium
                            rounded-xl bg-red-600 text-white
                            hover:bg-red-700 transition-all duration-200
                            group shadow-sm hover:shadow-md"
                    >
                        <UserLock className="size-5 mr-2.5" />
                        Logout
                    </Link>
                </>
            ) : (
                <>
                    {/* Login */}
                    <Link
                        href="/login"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium
                            rounded-xl bg-white/90 text-gray-900
                            hover:bg-white transition-all duration-200
                            border border-gray-200 group"
                    >
                        <UserLock className="size-5 mr-2.5" />
                        Login
                    </Link>
                </>
            )}
        </div>
    );
}
