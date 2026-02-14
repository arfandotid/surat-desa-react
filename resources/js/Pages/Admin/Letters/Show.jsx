// import Head dan router dari Inertia
import { Head, usePage, router } from "@inertiajs/react";

// import useState untuk form
import { useState } from "react";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin";

// import icons
import { CheckCircle, XCircle } from "lucide-react";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader";

// import component LetterInformation
import LetterInformation from "./Components/LetterInformation";

// import component renderSnapshotResident
import renderSnapshotResident from "./Components/RenderSnapshotResident";

// import component renderPayload
import renderPayload from "./Components/RenderPayload";

export default function LetterShow() {
    // destruct props "letter"
    const { letter } = usePage().props;

    // state untuk form
    const [isProcessing, setIsProcessing] = useState(false);
    const [letterNumber, setLetterNumber] = useState("");
    const [actionType, setActionType] = useState("");
    const [rejectReason, setRejectReason] = useState("");

    // fungsi untuk approve
    const handleApprove = () => {
        // cek jika letterNumber kosong
        if (!letterNumber.trim()) {
            // tampilkan alert
            alert("Harap masukkan nomor surat");
            return;
        }

        if (confirm("Apakah Anda yakin ingin menyetujui surat ini?")) {
            // set isProcessing menjadi true
            setIsProcessing(true);

            // kirim data ke route "admin.letters.update"
            (router.put(`/admin/letters/${letter.id}`, {
                letter_number: letterNumber,
                status: "approved",
            }),
                {
                    onFinish: () => setIsProcessing(false),
                });
        }
    };

    // fungsi untuk reject
    const handleReject = () => {
        // cek jika rejectReason kosong
        if (!rejectReason.trim()) {
            // tampilkan alert
            alert("Harap masukkan alasan penolakan");
            return;
        }

        if (confirm("Apakah Anda yakin ingin menolak surat ini?")) {
            // set isProcessing menjadi true
            setIsProcessing(true);

            // kirim data ke route "admin.letters.update"
            (router.put(`/admin/letters/${letter.id}`, {
                reject_reason: rejectReason,
                status: "rejected",
            }),
                {
                    onFinish: () => setIsProcessing(false),
                });
        }
    };

    return (
        <>
            <Head title={`Detail Surat - ${import.meta.env.VITE_APP_NAME}`} />

            <LayoutAdmin>
                {/* Header dengan judul */}
                <div className="mb-8">
                    <PageHeader
                        title="Pengajuan Surat"
                        description="Kelola pengajuan surat dari penduduk"
                    />
                </div>

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
                            Nomor Surat: <strong>{letter.letter_number}</strong>
                        </p>
                    </div>
                )}

                {/* Informasi Dasar Surat */}
                {LetterInformation(letter)}

                {/* Data Snapshot Penduduk */}
                {renderSnapshotResident(letter.resident_snapshot)}

                {/* Payload Data */}
                {renderPayload(letter.payload)}

                {/* Action Section untuk Approve/Reject */}
                {letter.status === "pending" && (
                    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4 flex items-center">
                            Tindakan Administrasi
                        </h3>

                        <div className="space-y-6">
                            {/* Approve Section */}
                            <div
                                className={`p-4 rounded-xl transition-all duration-200 ${actionType === "approve" ? "bg-green-50 border-2 border-green-300" : "bg-gray-50 border border-gray-200"}`}
                                onClick={() => setActionType("approve")}
                            >
                                <div className="flex items-start mb-4">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Setujui Pengajuan
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Setujui pengajuan surat dan berikan
                                            nomor surat resmi.
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-8 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Surat *
                                        </label>
                                        <input
                                            type="text"
                                            value={letterNumber}
                                            onChange={(e) => {
                                                setLetterNumber(e.target.value);
                                                setActionType("approve");
                                            }}
                                            onFocus={() =>
                                                setActionType("approve")
                                            }
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActionType("approve");
                                            }}
                                            placeholder="Contoh: 001/SKD/01/2024"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                            disabled={isProcessing}
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            Format: [NOMOR URUT]/[KODE
                                            SURAT]/[BULAN]/[TAHUN]
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleApprove}
                                        disabled={
                                            isProcessing || !letterNumber.trim()
                                        }
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing
                                            ? "Memproses..."
                                            : "Setujui Surat"}
                                    </button>
                                </div>
                            </div>

                            {/* Reject Section */}
                            <div
                                className={`p-4 rounded-xl transition-all duration-200 ${actionType === "reject" ? "bg-red-50 border-2 border-red-300" : "bg-gray-50 border border-gray-200"}`}
                                onClick={() => setActionType("reject")}
                            >
                                <div className="flex items-start mb-4">
                                    <XCircle className="w-5 h-5 text-red-600 mr-3 mt-1" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Tolak Pengajuan
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Tolak pengajuan surat dengan
                                            memberikan alasan penolakan.
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-8 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alasan Penolakan *
                                        </label>
                                        <textarea
                                            value={rejectReason}
                                            onChange={(e) => {
                                                setRejectReason(e.target.value);
                                                setActionType("reject");
                                            }}
                                            onFocus={() =>
                                                setActionType("reject")
                                            }
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActionType("reject");
                                            }}
                                            placeholder="Masukkan alasan penolakan..."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 min-h-[100px] resize-y"
                                            disabled={isProcessing}
                                        />
                                    </div>

                                    <button
                                        onClick={handleReject}
                                        disabled={
                                            isProcessing || !rejectReason.trim()
                                        }
                                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing
                                            ? "Memproses..."
                                            : "Tolak Surat"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </LayoutAdmin>
        </>
    );
}
