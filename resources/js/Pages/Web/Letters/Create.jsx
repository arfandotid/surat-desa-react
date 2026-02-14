// import Head dan router
import { Head, useForm, usePage } from "@inertiajs/react";

// import useEffect untuk handle form dinamis
import { useEffect } from "react";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb";

// import icons
import { Send } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

export default function LettersCreate() {
    // props "template"
    const { template } = usePage().props;

    // extra fields dari template
    const extraFields = template.extra_fields || [];

    // form inertia dengan dynamic fields
    const { data, setData, post, processing, errors } = useForm({
        letter_template_id: template.id,
        name: "",
        description: "",
        // dynamic fields akan ditambahkan berdasarkan extra_fields
    });

    // Initialize dynamic fields
    useEffect(() => {
        const initialData = { ...data };

        // Pastikan extraFields adalah array
        const fieldsArray = Array.isArray(extraFields) ? extraFields : [];

        fieldsArray.forEach((field) => {
            if (field && field.key && !(field.key in initialData)) {
                initialData[field.key] = "";
            }
        });

        // Update data jika ada field baru
        Object.keys(initialData).forEach((key) => {
            if (!(key in data)) {
                setData(key, initialData[key]);
            }
        });
    }, []);

    // Fungsi submit form
    const submit = (e) => {
        e.preventDefault();

        // kirim data ke server
        post("/letters");
    };

    // Fungsi untuk render input berdasarkan type
    const renderField = (field) => {
        if (!field || !field.key) return null;

        const fieldKey = field.key;
        const fieldLabel = field.label || fieldKey;
        const fieldType = field.type || "text";

        // Handle required field - bisa string "1", number 1, atau boolean true
        const isRequired =
            field.required === "1" ||
            field.required === 1 ||
            field.required === true ||
            field.required === "true";

        const baseClassName =
            "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 hover:border-gray-400";
        const errorClassName = errors[fieldKey]
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "";

        switch (fieldType) {
            case "textarea":
                return (
                    <textarea
                        id={fieldKey}
                        value={data[fieldKey] || ""}
                        onChange={(e) => setData(fieldKey, e.target.value)}
                        className={`${baseClassName} ${errorClassName} min-h-25 resize-y`}
                        placeholder={`Masukkan ${fieldLabel.toLowerCase()}`}
                        required={isRequired}
                    />
                );

            case "date":
                return (
                    <input
                        type="date"
                        id={fieldKey}
                        value={data[fieldKey] || ""}
                        onChange={(e) => setData(fieldKey, e.target.value)}
                        className={`${baseClassName} ${errorClassName}`}
                        required={isRequired}
                    />
                );

            case "number":
                return (
                    <input
                        type="number"
                        id={fieldKey}
                        value={data[fieldKey] || ""}
                        onChange={(e) => setData(fieldKey, e.target.value)}
                        className={`${baseClassName} ${errorClassName}`}
                        placeholder={`Masukkan ${fieldLabel.toLowerCase()}`}
                        required={isRequired}
                    />
                );

            case "text":
            default:
                return (
                    <input
                        type="text"
                        id={fieldKey}
                        value={data[fieldKey] || ""}
                        onChange={(e) => setData(fieldKey, e.target.value)}
                        className={`${baseClassName} ${errorClassName}`}
                        placeholder={`Masukkan ${fieldLabel.toLowerCase()}`}
                        required={isRequired}
                    />
                );
        }
    };

    // Pastikan extraFields adalah array
    const fieldsArray = Array.isArray(extraFields) ? extraFields : [];

    return (
        <>
            <Head title={`Ajukan Surat - ${import.meta.env.VITE_APP_NAME}`} />

            <LayoutWeb>
                <div className="min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Header */}
                        <div className="mb-6">
                            <PageHeader
                                title="Ajukan Surat"
                                description={`Jenis Surat: ${template.name}`}
                            />
                        </div>

                        {/* Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <form onSubmit={submit} className="space-y-5">
                                {/* Template Info */}
                                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900 border-b border-gray-300 pb-3">
                                            {template.name}
                                        </div>
                                        {template.description && (
                                            <p className="text-sm text-gray-600 mt-3">
                                                {template.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Dynamic Fields Section */}
                                {fieldsArray.length > 0 ? (
                                    <div className="border-t border-gray-200 pt-5">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4 uppercase">
                                            Data yang diperlukan
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {fieldsArray.map((field, index) => (
                                                <div
                                                    key={field.key || index}
                                                    className={`${field.type === "textarea" ? "md:col-span-2" : ""}`}
                                                >
                                                    <label
                                                        htmlFor={field.key}
                                                        className="block text-sm font-medium text-gray-700 mb-2"
                                                    >
                                                        {field.label ||
                                                            field.key}
                                                        {(field.required ===
                                                            "1" ||
                                                            field.required ===
                                                                1 ||
                                                            field.required ===
                                                                true ||
                                                            field.required ===
                                                                "true") && (
                                                            <span className="text-red-500 ml-1">
                                                                *
                                                            </span>
                                                        )}
                                                    </label>

                                                    {renderField(field)}

                                                    {errors[field.key] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors[field.key]}
                                                        </p>
                                                    )}

                                                    {field.description && (
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {field.description}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border-t border-gray-200 pt-5">
                                        <p className="text-gray-500 text-center py-8">
                                            Tidak ada data tambahan yang
                                            diperlukan untuk surat ini.
                                        </p>
                                    </div>
                                )}

                                {/* Action */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                    >
                                        <Send className="w-4 h-4" />
                                        {processing
                                            ? "Mengirim..."
                                            : "Kirim Pengajuan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
