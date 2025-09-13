
import VoucherCard from "./VoucherCard";

import VoucherTable from "./VoucherTable";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import { useResponsive } from "hooks";

import React from "react";


const VouchersSectionMain: React.FC = () => {
    const vouchers = [
        {
            code: "1234567890",
            date: "2023-08-15",
            amount: 100,
            status: "Active",
            icon: "💵",
            bg: "bg-green-100",
        },
        {
            code: "9876543210",
            date: "2023-07-20",
            amount: 50,
            status: "Used",
            icon: "🎟️",
            bg: "bg-gray-100",
        },
        {
            code: "4567890123",
            date: "2023-06-10",
            amount: 200,
            status: "Expired",
            icon: "🧾",
            bg: "bg-orange-100",
        },
    ];
    const { isMobile } = useResponsive();
    if (isMobile) {
        return (
            <VoucherScreenMobile vouchers={vouchers} />
        )
    }
    return (
        <>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div className="flex-1 min-w-0">
                    <SectionTitle title="Vouchers" />
                </div>

            </div>
            <VoucherCard />
            <VoucherTable vouchers={vouchers} />
            <div className="mt-6 flex justify-center">
                <Pagination total={5} current={1} onPageChange={() => { }} />
            </div>
        </>


    );
};
export default VouchersSectionMain;



function VoucherScreenMobile({ vouchers }) {


    return (
        <div className="max-w-md mx-auto px-4 py-6 text-black bg-white h-screen overflow-y-auto">
            <div className="flex items-center space-x-4 mb-6">
                <button className="text-xl">←</button>
                <h1 className="text-lg font-semibold">Voucher</h1>
            </div>

            <div className="mb-6">
                <h2 className="text-sm font-medium">Available Amount</h2>
                <div className="flex justify-between items-center text-lg font-semibold mt-1">
                    <span>1000</span>
                    <span className="text-gray-500">USD</span>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-sm font-medium">Converted Amount</h2>
                <div className="flex justify-between items-center mt-2 bg-gray-100 rounded-lg px-4 py-2 text-sm">
                    <span>0</span>
                    <span className="text-gray-500">USD</span>
                </div>
            </div>

            <button className="w-full bg-black text-white text-sm py-3 rounded-full mb-8">
                Convert Into Voucher
            </button>

            <h3 className="text-base font-semibold mb-4">Voucher History</h3>
            <div className="space-y-4">
                {vouchers.map((v) => (
                    <div
                        key={v.code}
                        className="flex justify-between items-center p-4 rounded-lg border"
                    >
                        <div>
                            <p className="font-medium">
                                Voucher Code: <span className="font-semibold">{v.code}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Date: {v.date} | Amount: {v.amount} USD | Status: {v.status}
                            </p>
                        </div>
                        <div
                            className={`w-12 h-12 flex items-center justify-center rounded-md text-2xl ${v.bg}`}
                        >
                            {v.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

