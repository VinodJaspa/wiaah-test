import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import React from "react";

interface Props {
    open: boolean;
    onApprove: () => void;
    onRefuse: () => void;
    onClose: () => void;
}

const ApproveReservationDialog: React.FC<Props> = ({
    open,
    onApprove,
    onRefuse,
    onClose,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40 px-4">
            <div className="transition-transform transform sm:translate-y-0 translate-y-8 sm:scale-100 scale-100">

            <div
                className="bg-white rounded-t-2xl sm:rounded-xl shadow-lg p-6 w-full max-w-lg text-center relative
                   sm:mb-0 mb-2 sm:translate-y-0 translate-y-2 transition-transform duration-300"
            >
                {/* Optional close icon on mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold mb-2">Approve Reservation</h2>
                <p className="text-base font-medium mb-4">
                    Would you like to approve this reservation?
                </p>
                <p className="text-sm text-gray-600 mb-6">
                    Attention : Après confirmation, cette réservation ne pourra plus être
                    annulée ni modifiée.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onRefuse}
                        className="px-4 py-2 rounded-md bg-red-100 text-red-700 font-medium hover:bg-red-200"
                    >
                        Refuse
                    </button>
                    <PrimaryButton children="Approve" onClick={onApprove} />

                </div>
            </div>
            </div>
        </div>
    );
};

export default ApproveReservationDialog;
