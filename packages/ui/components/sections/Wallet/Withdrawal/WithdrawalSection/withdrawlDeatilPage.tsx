import { CheckCircle, CalendarDays, Landmark, CreditCard, Hash } from "lucide-react";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import BackButton from "@UI/components/shadcn-components/Buttons/backtoListButton";

const details = [
    { label: "Transfer number", value: "REF123456789", icon: <Hash className="w-5 h-5" /> },
    { label: "Routing Number", value: "987654321", icon: <Hash className="w-5 h-5" /> },
    { label: "Transfer Date", value: "07/26/2024", icon: <CalendarDays className="w-5 h-5" /> },
    { label: "Checking Account", value: "Bank of America", icon: <Landmark className="w-5 h-5" /> },
    { label: "Account Number", value: "987*** 0", icon: <CreditCard className="w-5 h-5" /> },
];

const amountDetails = [
    { label: "Currency", value: "USD" },
    { label: "US Dollar Equivalent", value: "1 USD = 114 EUR" },
    { label: "Exchange Rate", value: "114 EUR = 1 USD" },
    { label: "Fees", value: "FREE" },
    { label: "Transfer to Account", value: "$600" },
];

export default function WithdrawalDetailsPage({ setDetailPage }) {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Title and Back Button */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div className="flex-1 min-w-0">
                    <SectionTitle title="Withdrawal Details" />
                </div>
                <div className="shrink-0">
                    <BackButton onClick={() => setDetailPage(false)} label="Back to List" />
                </div>
            </div>


            {/* Transaction Details */}
            <section className="mb-10">
                <h2 className="text-sm font-semibold mb-4">Transaction Details</h2>
                <div className="space-y-4">
                    {details.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-md">{item.icon}</div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                <p className="text-sm text-gray-500">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Amount Section */}
            <section className="mb-10">
                <h2 className="text-sm font-semibold mb-4">Amount</h2>
                <div className="border border-gray-200 rounded-md divide-y divide-gray-200 text-sm">
                    {amountDetails.map((item, index) => (
                        <div key={index} className="flex justify-between px-4 py-3">
                            <span className="text-gray-500">{item.label}</span>
                            <span className="text-gray-900 font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Status Section */}
            <section className="mb-6">
                <h2 className="text-sm font-semibold mb-4">Status</h2>
                <div className="flex items-center gap-2">
                    <div className="bg-gray-100 text-green-600 px-3 py-2 rounded-md flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Completed</span>
                    </div>
                </div>
            </section>

            {/* Download Button */}
            <div className="pt-2">
                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition text-sm font-medium">
                    Download
                </button>
            </div>
        </div>
    );
}
