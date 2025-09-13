
import { useResponsive } from "hooks"; // your custom hook
import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import TransactionTable from "./transactiontable";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";

import WithdrawDialog from "./withdrawModal";
import WithdrawalDetailsPage from "../Withdrawal/WithdrawalSection/withdrawlDeatilPage";
export default function TransactionSection() {
  const { isMobile } = useResponsive();
  const [isDetailPage, setDetailPage] = React.useState(false);
  const [openWithdraw, setOpenWithdraw] = React.useState(false);
  const transactions = [
    {
      merchant: "Starbucks",
      date: "12/12/2023",
      method: "Bank Card",
      amount: -200,
      icon: "/icons/mastercard.png",
    },
    {
      merchant: "Best Buy",
      date: "12/12/2023",
      method: "Apple Pay",
      amount: 400,
      icon: "/icons/visa.png",
    },
    {
      merchant: "Amazon",
      date: "12/12/2023",
      method: "Wiaah Coin",
      amount: -250,
      icon: "/icons/amazon.png",
    },
  ];
  if (isDetailPage) {
    return (
      <div className="p-4">
        <WithdrawalDetailsPage setDetailPage={setDetailPage}
        />
      </div>
    );
  }

  return (
    <div className="p-4">

      <WithdrawDialog  isOpen={openWithdraw} onClose={() => setOpenWithdraw(false)} />
      <TransactionHeader setOpenWithdraw={setOpenWithdraw} />

      {/* Transaction History */}
      <div>
        <h2 className="text-base font-semibold mb-2">Transaction History</h2>
        <div className="mb-4">
          <SearchBoxInner placeholder="Search transactions" />

        </div>

        {/* Mobile View */}
        {isMobile ? (
          <div className="space-y-4">
            {transactions.map((txn, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border">
                <div className="flex items-center gap-3">
                  <img src={txn.icon} alt="icon" className="w-8 h-8" />
                  <div>
                    <p className="text-sm font-semibold">{txn.merchant}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${txn.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {txn.amount > 0 ? "+" : ""}
                    ${txn.amount}
                  </p>
                  <p className="text-xs text-gray-500">{txn.method}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <TransactionTable setDetailPage={setDetailPage} />
            {/* <div className="mt-4">
              <Pagination />
            </div> */}
          </>
        )}
        <Pagination total={5} />
      </div>
    </div>
  );
}
function TransactionHeader({ setOpenWithdraw }) {

  return (
    <div className="">

      {/* Left Title */}
      <SectionTitle title="Transaction" className="mb-4" />
      {/* <h1 className="text-2xl font-bold text-gray-900"></h1> */}

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 w-full sm:w-auto">
        {/* Cards */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="bg-gray-100 rounded-md px-6 py-4 flex-1">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-xl font-bold text-gray-900">$400</p>
          </div>
          <div className="bg-gray-100 rounded-md px-6 py-4 flex-1">
            <p className="text-sm text-gray-500">Available Earnings</p>
            <p className="text-xl font-bold text-gray-900">$600</p>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="pt-2 sm:pt-2 mt-3">
        <div className="flex justify-end">
          <PrimaryButton onClick={() => setOpenWithdraw(true)}>
            Withdraw Now
          </PrimaryButton>
        </div>
      </div>


    </div>
  );
}

