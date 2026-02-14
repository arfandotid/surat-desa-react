// import Link dari inertiajs
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

export default function MobileMenu({ isMenuOpen, setIsMenuOpen, auth }) {
    // state untuk dropdown surat
    const [suratDropdownOpen, setSuratDropdownOpen] = useState(false);

    // jika menu tidak terbuka, kembalikan null
    if (!isMenuOpen) return null;

    // fungsi untuk menutup menu saat link diklik
    const handleLinkClick = () => {
        // tutup menu
        setIsMenuOpen(false);

        // tutup dropdown surat
        setSuratDropdownOpen(false);
    };

    return (
        <div className="md:hidden pb-4 border-t border-gray-100 mt-2">
            <div className="flex flex-col space-y-1 pt-4 px-4">
                {auth.resident ? (
                    <>
                        {/* Dashboard Penduduk – Mobile */}
                        <Link
                            href="/dashboard"
                            onClick={handleLinkClick}
                            className="inline-flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200 text-gray-700"
                        >
                            <LayoutDashboard className="size-5 mr-3" />
                            DASHBOARD
                        </Link>

                        {/* Dropdown Surat – Mobile */}
                        <div className="space-y-1">
                            <button
                                onClick={() =>
                                    setSuratDropdownOpen(!suratDropdownOpen)
                                }
                                className={`inline-flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border ${
                                    suratDropdownOpen
                                        ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200"
                                        : "border-transparent hover:border-gray-200 text-gray-700"
                                }`}
                            >
                                <div className="flex items-center">
                                    <Mail className="size-5 mr-3" />
                                    SURAT
                                </div>
                                <ChevronDown
                                    className={`size-5 transition-transform duration-200 ${
                                        suratDropdownOpen
                                            ? "rotate-180 text-blue-600"
                                            : "text-gray-400"
                                    }`}
                                />
                            </button>

                            {/* Dropdown Content – Mobile */}
                            {suratDropdownOpen && (
                                <div className="pl-8 pr-4 space-y-1">
                                    {/* Ajukan Surat Baru */}
                                    <Link
                                        href="/letters"
                                        onClick={handleLinkClick}
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                                    >
                                        <div className="mr-3 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                                            <FileText className="size-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                Ajukan Surat Baru
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                Buat permohonan surat baru
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Surat Saya */}
                                    <Link
                                        href="/my-letters"
                                        onClick={handleLinkClick}
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                                    >
                                        <div className="mr-3 p-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
                                            <FolderOpen className="size-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                Surat Saya
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                Lihat semua surat Anda
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Logout – Mobile */}
                        <Link
                            href="/resident/logout"
                            method="post"
                            as="button"
                            onClick={handleLinkClick}
                            className="inline-flex items-center px-4 py-3 text-sm font-medium rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md mt-2"
                        >
                            <UserLock className="size-5 mr-3" />
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        {/* Login – Mobile */}
                        <Link
                            href={route("resident.login.index")}
                            onClick={handleLinkClick}
                            className="inline-flex items-center px-4 py-3 text-sm font-medium rounded-xl bg-white text-gray-900 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                        >
                            <UserLock className="size-5 mr-3" />
                            Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
