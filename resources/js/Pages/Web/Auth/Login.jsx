//import hook react
import { useState } from "react";

//import Head, Link and useForm dari inertiajs
import { Head, Link, useForm } from "@inertiajs/react";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb";

//import icons
import { Eye, EyeOff, User, Lock, LogIn, Fingerprint } from "lucide-react";

export default function ResidentLogin() {
    // useForm untuk login
    const { data, setData, post, processing, errors } = useForm({
        nik: "",
        password: "",
    });

    //state showPassword
    const [showPassword, setShowPassword] = useState(false);

    //function "loginHandler"
    const loginHandler = async (e) => {
        e.preventDefault();

        //fetch to login
        post("/login");
    };

    return (
        <>
            <Head title={`Login Penduduk - ${import.meta.env.VITE_APP_NAME}`} />

            {/* Background gradient dengan blue theme */}
            <LayoutWeb>
                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md">
                        {/* Login Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            {/* Header */}
                            <div className="mb-8 text-center">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                                    <Fingerprint className="w-8 h-8 text-blue-600" />
                                </div>
                                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                                    Login Penduduk
                                </h1>
                                <p className="text-gray-600">
                                    Masuk dengan NIK dan password Anda
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={loginHandler} className="space-y-6">
                                {/* NIK Field */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Nomor Induk Kependudukan (NIK)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <User className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="16 digit NIK"
                                            value={data.nik}
                                            onChange={(e) =>
                                                setData("nik", e.target.value)
                                            }
                                            maxLength="16"
                                            className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-white"
                                        />
                                    </div>
                                    {errors.nik && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.nik}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <Link
                                            href="#"
                                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                        >
                                            Lupa password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Lock className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Masukkan password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full pl-10 pr-12 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="block ml-3 text-sm text-gray-700"
                                    >
                                        Ingat saya
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full px-4 py-3 text-sm font-semibold text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${processing ? "bg-blue-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow hover:shadow-md"}`}
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="w-5 h-5 mr-3 animate-spin"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Memproses...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <LogIn className="w-5 h-5 mr-2" />
                                                Masuk
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </LayoutWeb>
        </>
    );
}
