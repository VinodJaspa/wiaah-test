import React from "react";

const transactions = [
  {
    date: "July 20, 2024",
    description: "Grocery shopping at Local Market",
    amount: "-$75.50",
    transactionNumber: "TXN12345",
    status: "Completed",
  },
  {
    date: "July 19, 2024",
    description: "Payment received from Emily",
    amount: "+$200.00",
    transactionNumber: "TXN67890",
    status: "Completed",
  },
  {
    date: "July 18, 2024",
    description: "Dinner at The Bistro",
    amount: "-$45.00",
    transactionNumber: "TXN11223",
    status: "Completed",
  },
  {
    date: "July 17, 2024",
    description: "Online purchase from Tech Store",
    amount: "-$120.00",
    transactionNumber: "TXN33445",
    status: "Completed",
  },
  {
    date: "July 16, 2024",
    description: "Salary deposit",
    amount: "+$3000.00",
    transactionNumber: "TXN55667",
    status: "Completed",
  },
];

export const TransactionsTable = () => {
  return (
    <div className="max-w-5xl mx-auto">
      
      <div className="mt-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions"
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>

        <div className="overflow-x-auto mt-6 rounded-lg shadow border border-gray-200">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Transaction Number</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {transactions.map((txn, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap">{txn.date}</td>
                  <td className="px-6 py-4">{txn.description}</td>
                  <td className="px-6 py-4">{txn.amount}</td>
                  <td className="px-6 py-4">{txn.transactionNumber}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
