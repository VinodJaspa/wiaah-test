import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import { Dispatch, SetStateAction } from "react";
interface WithdrawDialogProps {
    isOpen: boolean;
    onClose: () => void;


}

export default function WithdrawDialog({ isOpen, onClose }: WithdrawDialogProps) {
    const [amount, setAmount] = useState("");


    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                {/* Scrollable Panel */}
                <div className="fixed inset-0 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                            {/* Scrollable content container */}
                            <div className="max-h-[85vh] overflow-y-auto px-4 pr-6 custom-scroll space-y-6">

                                {/* Header */}
                                <div className="flex items-center justify-between mb-2">
                                    <Dialog.Title className="text-xl font-semibold">Withdraw</Dialog.Title>
                                    <button onClick={onClose}>
                                        <HiOutlineXMark className="text-2xl text-gray-500 hover:text-gray-700" />
                                    </button>
                                </div>

                                {/* Balance + Input Section */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 pr-4">
                                    <div className="bg-black text-white rounded-xl p-5">
                                        <p className="text-sm text-gray-300 mb-1">Available balance:</p>
                                        <p className="text-3xl font-bold">$1,234.56</p>
                                    </div>

                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="$"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full border bg-gray-100 rounded-md px-4 py-2 text-lg focus:outline-none"
                                        />

                                        <div className="grid grid-cols-2 gap-2">
                                            {[20, 50, 20, 50].map((amt, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setAmount(String(amt))}
                                                    className="w-full py-2 rounded-md bg-gray-200 text-sm font-medium hover:bg-gray-300"
                                                >
                                                    ${amt}
                                                </button>
                                            ))}
                                        </div>

                                        <PrimaryButton className="w-full">Withdraw</PrimaryButton>
                                    </div>
                                </div>

                                {/* Transaction Details */}
                                <div className="border-t pt-4 space-y-3">
                                    <h3 className="text-sm font-semibold">Transaction details</h3>
                                    <div className="text-sm space-y-2">
                                        <DetailRow label="Currency" value="USD" />
                                        <DetailRow label="US Dollar Equivalent" value="1 USD = 1.14 EUR" />
                                        <DetailRow label="Exchange Rate" value="1.14 USD = 1 USD" />
                                        <DetailRow label="Fees" value="FREE" />
                                        <DetailRow label="Transfer to Account" value="$600" />
                                    </div>
                                </div>

                                {/* Recent Transactions */}
                                <div className="border-t pt-4">
                                    <h3 className="text-sm font-semibold mb-3">Recent transactions</h3>
                                    <div className="space-y-2 text-sm cursor-pointer hover:bg-gray-50 rounded-md" >
                                        {["12/11/2023", "12/11/2023", "12/11/2023"].map((date, i) => (
                                            <div key={i} className="flex justify-between">
                                                <div>
                                                    <p className="font-medium">Withdrawal</p>
                                                    <p className="text-gray-500 text-xs">{date}</p>
                                                </div>
                                                <p className="text-red-500">- $50.00</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

// Helper component for transaction details
interface DetailRowProps {
    label: string;
    value: string;
    handleDetail?: () => void; // Optional click handler
}

function DetailRow({ label, value, handleDetail }: DetailRowProps) {
    return (
        <div
            className="flex justify-between items-center px-2 py-1 "

        >
            <span className="text-gray-600">{label}</span>
            <span>{value}</span>
        </div>
    );
}

