// import head dan usePage dari inertiajs
import { Head, usePage } from "@inertiajs/react";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb";

export default function HomePage() {
    // get page props "settings"
    const { settings } = usePage().props;

    return (
        <>
            <Head title={`Home - ${import.meta.env.VITE_APP_NAME}`} />

            <LayoutWeb>
                {/* HERO SECTION */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[url('https://cdn.jsdelivr.net/gh/maulayyacyber/assets-images-ebooks/general/bg.jpg')] bg-cover bg-center opacity-20"></div>

                        {/* Decorative Elements */}
                        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 z-10 opacity-10">
                        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                Sistem Informasi Surat Desa
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h1 className="text-6xl md:text-7xl lg:text-6xl font-bold text-white tracking-tight leading-tight uppercase">
                                        Desa{" "}
                                        <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                            {settings?.village_name}
                                        </span>
                                    </h1>

                                    {/* Location Info */}
                                    <div className="flex flex-wrap items-center justify-center gap-3 text-xl md:text-2xl">
                                        <span className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/80 font-medium">
                                            Kec.{" "}
                                            {settings?.subdistrict_name ||
                                                "Subdistrict"}
                                        </span>
                                        <span className="text-white/40">•</span>
                                        <span className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/80 font-medium">
                                            Kab.{" "}
                                            {settings?.regency_name ||
                                                "Regency"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                                Layanan surat menyurat dan administrasi desa
                                yang terintegrasi, efisien, dan dapat diakses
                                dari mana saja, kapan saja.
                            </p>
                        </div>
                    </div>
                </section>
            </LayoutWeb>
        </>
    );
}
