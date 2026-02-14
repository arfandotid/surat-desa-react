// import Head dan usePage dari Inertia
import { Head, usePage } from "@inertiajs/react";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

// import component LetterInformation
import LetterInformation from "@/Pages/Admin/Letters/Components/LetterInformation";

// import component renderSnapshotResident
import renderSnapshotResident from "@/Pages/Admin/Letters/Components/RenderSnapshotResident";

// import component renderPayload
import renderPayload from "@/Pages/Admin/Letters/Components/RenderPayload";

export default function LetterShow() {
    // destruct props "letter"
    const { letter } = usePage().props;

    return (
        <>
            <Head title={`Detail Surat - ${import.meta.env.VITE_APP_NAME}`} />

            <LayoutWeb>
                <div className="min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Header dengan judul */}
                        <div className="mb-8">
                            <PageHeader
                                title="Pengajuan Surat"
                                description="Detail pengajuan surat Anda"
                            />
                        </div>

                        {letter.status === "pending" && (
                            <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-6 mb-6">
                                <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center border-b border-yellow-200 pb-4 uppercase">
                                    Pengajuan Menunggu Proses
                                </h3>
                                <p className="text-yellow-700">
                                    Pengajuan surat Anda sedang menunggu proses
                                    dari admin. Silakan tunggu informasi
                                    selanjutnya.
                                </p>
                            </div>
                        )}

                        {letter.status === "rejected" && (
                            <div className="bg-red-50 border border-red-300 rounded-2xl p-6 mb-6">
                                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center border-b border-red-200 pb-4 uppercase">
                                    Pengajuan Ditolak
                                </h3>
                                <p className="text-red-700">
                                    Alasan Penolakan:{" "}
                                    <strong>{letter.meta.reject_reason}</strong>
                                </p>
                            </div>
                        )}

                        {letter.status === "approved" && (
                            <div className="bg-green-50 border border-green-300 rounded-2xl p-6 mb-6">
                                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center border-b border-green-200 pb-4 uppercase">
                                    Pengajuan Disetujui
                                </h3>
                                <p className="text-green-700">
                                    Nomor Surat:{" "}
                                    <strong>{letter.letter_number}</strong>
                                </p>
                            </div>
                        )}

                        {/* Informasi Dasar Surat */}
                        {LetterInformation(letter)}

                        {/* Data Snapshot Penduduk */}
                        {renderSnapshotResident(letter.resident_snapshot)}

                        {/* Payload Data */}
                        {renderPayload(letter.payload)}
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
