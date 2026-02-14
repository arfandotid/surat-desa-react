// import Link
import { Link } from "@inertiajs/react";

// import usePage dari Inertia
import { usePage } from "@inertiajs/react";

// import useState untuk mobile menu
import { useState } from "react";

// import component DesktopMenu
import DesktopMenu from "./DesktopMenu";

// import component MobileMenu
import MobileMenu from "./MobileMenu";

// import component MobileMenuButton
import MobileMenuButton from "./MobileMenuButton";

export default function Header() {
    // get page props "settings" dan "auth"
    const { settings, auth } = usePage().props;

    // state untuk mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <div className="relative">
                            <div className="bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"></div>
                                    <div className="relative w-10 h-10 flex items-center justify-center">
                                        <img
                                            src={
                                                settings.village_logo
                                                    ? `/storage/settings/${settings.village_logo}`
                                                    : `/images/logo/logo-jbg.png`
                                            }
                                            alt="Logo"
                                            className="w-8 h-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ml-3">
                            <h1 className="text-md uppercase font-bold text-gray-900">
                                Surat Desa {settings.village_name}
                            </h1>
                            <p className="text-xs text-gray-500 font-medium italic mt-0.5 hidden sm:block">
                                Sistem Informasi Surat Desa
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <DesktopMenu auth={auth} />

                    {/* Mobile Menu Button */}
                    <MobileMenuButton
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                </div>

                {/* Mobile Menu */}
                <MobileMenu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    auth={auth}
                />
            </div>
        </header>
    );
}
