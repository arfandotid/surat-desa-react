//import usePage
import { usePage } from "@inertiajs/react";

// import useEffect
import { useEffect } from "react";

// import Swal
import Swal from "sweetalert2";

// import component Header
import Header from "@/Components/Web/Header/Header";

export default function LayoutWeb({ children }) {
    // get page props "flash"
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "SUCCESS!",
                text: flash.success,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            {/* Header */}
            <Header />

            {children}
        </div>
    );
}
