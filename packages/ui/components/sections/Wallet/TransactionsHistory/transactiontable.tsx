import React from "react";
import { useResponsive } from "hooks"; // Your custom hook

const transactions = [
  {
    date: "July 20, 2024",
    description: "Grocery shopping at Local Market",
    amount: "-$75.50",
    transactionNumber: "TXN12345",
    status: "Completed",
    method: "Bank Card",
  },
  {
    date: "July 19, 2024",
    description: "Payment received from Emily",
    amount: "+$200.00",
    transactionNumber: "TXN67890",
    status: "Completed",
    method: "Apple Pay",
  },
  {
    date: "July 18, 2024",
    description: "Dinner at The Bistro",
    amount: "-$45.00",
    transactionNumber: "TXN11223",
    status: "Completed",
    method: "Debit Card",
  },
  {
    date: "July 17, 2024",
    description: "Online purchase from Tech Store",
    amount: "-$120.00",
    transactionNumber: "TXN33445",
    status: "Completed",
    method: "UPI",
  },
  {
    date: "July 16, 2024",
    description: "Salary deposit",
    amount: "+$3000.00",
    transactionNumber: "TXN55667",
    status: "Completed",
    method: "Bank Transfer",
  },
];

export default function TransactionTable({setDetailPage}) {
  const { isMobile } = useResponsive();

  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          {transactions.map((txn, index) => (
            <div
              key={index}
              className="flex flex-col p-4 bg-white rounded-lg shadow-sm border"
            >
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-500">{txn.date}</p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    txn.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {txn.status}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-800">
                {txn.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">{txn.method}</p>
                <p
                  className={`text-sm font-semibold ${
                    txn.amount.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {txn.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">
                  Transaction #
                </th>
                <th className="px-4 py-3 font-medium text-gray-700">
                  Description
                </th>
                <th className="px-4 py-3 font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 font-medium text-gray-700">
                  Payment Method
                </th>
                <th className="px-4 py-3 font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((txn, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDetailPage(true)}>
                  <td className="px-4 py-3 text-blue-600 font-medium">
                    {txn.transactionNumber}
                  </td>
                  <td className="px-4 py-3">{txn.description}</td>
                  <td className="px-4 py-3">{txn.date}</td>
                  <td className="px-4 py-3">{txn.method}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      txn.amount.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {txn.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        txn.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
