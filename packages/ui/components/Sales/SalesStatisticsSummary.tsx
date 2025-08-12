import React, { useState } from "react";

// 1. SalesStatisticsSummary
export function SalesStatisticsSummary({
  sales,
  salesChange,
  purchases,
  purchasesChange,
  returns,
  returnsChange,
  addition,
  additionChange,
}: {
  sales: string;
  salesChange: string;
  purchases: string;
  purchasesChange: string;
  returns: string;
  returnsChange: string;
  addition: string;
  additionChange: string;
}) {
  const stats = [
    { label: "Sales", value: sales, change: salesChange },
    { label: "Purchases", value: purchases, change: purchasesChange },
    { label: "Returns", value: returns, change: returnsChange },
    { label: "Addition", value: addition, change: additionChange },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map(({ label, value, change }) => {
        const isPositive = change.startsWith("+") || change.startsWith("12"); // example check
        return (
          <div
            key={label}
            className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center"
          >
            <div className="text-gray-500 text-sm">{label}</div>
            <div className="text-xl font-semibold">{value}</div>
            <div
              className={`text-xs font-medium mt-1 ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 2. SalesTrendsChart (stub)
export function SalesTrendsChart({
  earnings,
  changePercent,
}: {
  earnings: string;
  changePercent: string;
}) {
  // You'd replace this with a real chart lib like Recharts, Chart.js, etc.
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-lg mb-2">Earnings</h3>
      <div className="text-2xl font-bold mb-2">{earnings}</div>
      <div className="text-sm text-green-500 mb-4">{changePercent}</div>
      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        {/* Replace with actual line chart */}
        <span className="text-gray-400">[Line Chart Placeholder]</span>
      </div>
      <div className="mt-4 flex space-x-4 justify-center text-sm text-gray-500">
        <button className="px-3 py-1 rounded bg-gray-200">Monthly</button>
        <button className="px-3 py-1 rounded">Weekly</button>
        <button className="px-3 py-1 rounded">Daily</button>
      </div>
    </div>
  );
}

// 3. CustomerStatistics (progress bars)
export function CustomerStatistics({
  returningPct,
  newPct,
  retargetPct,
  overallPct,
}: {
  returningPct: number;
  newPct: number;
  retargetPct: number;
  overallPct: number;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-lg mb-2">Customer Shopping Model</h3>
      <div className="text-2xl font-bold mb-2">{overallPct}%</div>
      <div className="text-green-500 mb-4">This Month +12%</div>
      <div className="space-y-2">
        <ProgressBar label="Returning Customers" value={returningPct} />
        <ProgressBar label="New Customers" value={newPct} />
        <ProgressBar label="Retarget Customer" value={retargetPct} />
      </div>
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-3">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// 4. TopSellingCategories
export function TopSellingCategories({
  categories,
  overallPct,
}: {
  categories: { name: string; pct: number }[];
  overallPct: number;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-lg mb-2">Top Selling Categories</h3>
      <div className="text-2xl font-bold mb-2">{overallPct}%</div>
      <div className="text-green-500 mb-4">This Month +12%</div>
      <div className="flex space-x-4 justify-around text-xs text-gray-500">
        {categories.map(({ name }, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <div className="w-6 h-20 bg-gray-200 rounded" />
            <span>{name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-4 justify-center text-sm text-gray-500">
        <button className="px-3 py-1 rounded bg-gray-200">Weekly</button>
        <button className="px-3 py-1 rounded">Monthly</button>
        <button className="px-3 py-1 rounded">Yearly</button>
      </div>
    </div>
  );
}

// 5. CustomerDemographics
export function CustomerDemographics({
  ageDistribution,
  genderDistribution,
}: {
  ageDistribution: { label: string; pct: number }[];
  genderDistribution: { label: string; pct: number }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Age Distribution</h3>
        <div className="text-2xl font-bold mb-2">100%</div>
        <div className="text-green-500 mb-4">This Month +12%</div>
        <div className="flex justify-between space-x-2 text-xs text-gray-500">
          {ageDistribution.map(({ label }, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <div className="w-6 h-16 bg-gray-200 rounded" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Gender Distribution</h3>
        <div className="text-2xl font-bold mb-2">100%</div>
        <div className="text-green-500 mb-4">This Month +12%</div>
        <div className="flex justify-between space-x-2 text-xs text-gray-500">
          {genderDistribution.map(({ label }, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <div className="w-6 h-16 bg-gray-200 rounded" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. BestSellingItemsTable
export function BestSellingItemsTable({
  items,
}: {
  items: {
    item: string;
    totalRevenue: string;
    percentSales: number;
  }[];
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-lg mb-4">Best Selling Items</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Total Revenue</th>
            <th>% of Overall Sales</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ item, totalRevenue, percentSales }, i) => (
            <tr key={i} className="border-t">
              <td>{item}</td>
              <td>{totalRevenue}</td>
              <td>{percentSales}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 7. RecentSalesTable
export function RecentSalesTable({
  sales,
}: {
  sales: { item: string; productName: string; price: string }[];
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Recent Sales</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(({ item, productName, price }, i) => (
            <tr key={i} className="border-t">
              <td>{item}</td>
              <td>{productName}</td>
              <td>${price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
