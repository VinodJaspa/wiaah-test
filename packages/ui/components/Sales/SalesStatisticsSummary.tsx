
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Sales Statistics Summary component - now responsive
export function SalesStatisticsSummary({
  sales,
  salesChange,
  purchases,
  purchasesChange,
  returns,
  returnsChange,
  attrition,
  attritionChange,
}: {
  sales: string;
  salesChange: string;
  purchases: string;
  purchasesChange: string;
  returns: string;
  returnsChange: string;
  attrition: string;
  attritionChange: string;
}) {
  const stats = [
    { label: "Sales", value: sales, change: salesChange },
    { label: "Purchases", value: purchases, change: purchasesChange },
    { label: "Returns", value: returns, change: returnsChange },
    { label: "Attrition", value: attrition, change: attritionChange },
  ];

  return (
    // Responsive grid layout: 1 column on mobile, 2 on medium screens, 4 on large screens
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
      {stats.map(({ label, value, change }) => {
        const isPositive = change.startsWith("+") || change.startsWith("0");
        return (
          <div
            key={label}
            className="bg-white rounded-lg p-4 shadow flex flex-col items-center border border-gray-200"
          >
            <div className="text-gray-400 text-xs font-semibold">{label}</div>
            <div className="text-lg font-bold mt-1">{value}</div>
            <div
              className={`text-[10px] font-semibold mt-1 ${
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

// Sales Trends Chart component - unchanged, as it's already fluid
export function SalesTrendsChart({
  earnings,
  changePercent,
  dataPoints = [50, 70, 40, 80, 60, 90, 30],
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}: {
  earnings: string;
  changePercent: string;
  dataPoints?: number[];
  labels?: string[];
}) {
  const data = {
    labels,
    datasets: [
      {
        label: "Earnings",
        data: dataPoints,
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        max: Math.max(...dataPoints) + 20,
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow mb-6 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-semibold">Earnings</h3>
        <div className="text-sm text-green-600 font-semibold">{changePercent}</div>
      </div>
      <div className="text-2xl font-bold mb-4">{earnings}</div>
      <div className="relative h-40 mb-3">
        <Line data={data} options={options} />
      </div>
      <div className="flex space-x-4 justify-center text-xs text-gray-400">
        <button className="px-3 py-1 rounded bg-gray-200 font-medium text-gray-700">
          Monthly
        </button>
        <button className="px-3 py-1 rounded hover:bg-gray-200 cursor-pointer font-medium text-gray-600">
          Weekly
        </button>
        <button className="px-3 py-1 rounded hover:bg-gray-200 cursor-pointer font-medium text-gray-600">
          Daily
        </button>
      </div>
    </div>
  );
}

// Customer Statistics component - unchanged
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
    <div className="bg-white rounded-lg p-5 shadow mb-6 border border-gray-200">
      <h3 className="text-base font-semibold mb-1">Customer Shopping Model</h3>
      <div className="text-xl font-bold mb-1">{overallPct}%</div>
      <div className="text-xs text-green-500 mb-4">This Month +12%</div>
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
      <div className="flex justify-between text-[10px] text-gray-600 mb-1 font-medium">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// Top Selling Categories component - unchanged
export function TopSellingCategories({
  categories,
  overallPct,
}: {
  categories: { name: string; pct: number }[];
  overallPct: number;
}) {
  return (
    <div className="bg-white rounded-lg p-5 shadow mb-6 border border-gray-200">
      <h3 className="text-base font-semibold mb-1">Top Selling Categories</h3>
      <div className="text-xl font-bold mb-1">{overallPct}%</div>
      <div className="text-xs text-green-500 mb-4">This Month +12%</div>
      <div className="flex space-x-4 justify-around text-[10px] text-gray-500">
        {categories.map(({ name }, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <div className="w-5 h-20 bg-gray-200 rounded" />
            <span>{name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-4 justify-center text-xs text-gray-500">
        <button className="px-3 py-1 rounded bg-gray-200 font-medium text-gray-700">
          Weekly
        </button>
        <button className="px-3 py-1 rounded hover:bg-gray-200 cursor-pointer font-medium text-gray-600">
          Monthly
        </button>
        <button className="px-3 py-1 rounded hover:bg-gray-200 cursor-pointer font-medium text-gray-600">
          Yearly
        </button>
      </div>
    </div>
  );
}

// Customer Demographics component - now responsive
export function CustomerDemographics({
  ageDistribution,
  genderDistribution,
}: {
  ageDistribution: { label: string; pct: number }[];
  genderDistribution: { label: string; pct: number }[];
}) {
  return (
    // Responsive grid layout: 1 column on mobile, 2 on medium screens and up
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg p-5 shadow border border-gray-200">
        <h3 className="text-base font-semibold mb-1">Age Distribution</h3>
        <div className="text-xl font-bold mb-1">100%</div>
        <div className="text-xs text-green-500 mb-4">This Month +12%</div>
        <div className="flex justify-between space-x-2 text-[10px] text-gray-500">
          {ageDistribution.map(({ label }, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <div className="w-5 h-16 bg-gray-200 rounded" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg p-5 shadow border border-gray-200">
        <h3 className="text-base font-semibold mb-1">Gender Distribution</h3>
        <div className="text-xl font-bold mb-1">100%</div>
        <div className="text-xs text-green-500 mb-4">This Month +12%</div>
        <div className="flex justify-between space-x-2 text-[10px] text-gray-500">
          {genderDistribution.map(({ label }, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <div className="w-5 h-16 bg-gray-200 rounded" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Best Selling Items Table component - unchanged
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
    <div className="bg-white rounded-lg p-5 shadow mb-6 border border-gray-200 overflow-x-auto">
      <h3 className="text-base font-semibold mb-4">Best Selling Items</h3>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-2">Item</th>
            <th className="pb-2">Total Revenue</th>
            <th className="pb-2">% of Overall Sales</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ item, totalRevenue, percentSales }, i) => (
            <tr key={i} className="border-t border-gray-100">
              <td className="py-2">{item}</td>
              <td className="py-2">{totalRevenue}</td>
              <td className="py-2">{percentSales}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Recent Sales Table component - unchanged
export function RecentSalesTable({
  sales,
}: {
  sales: { item: string; productName: string; price: string }[];
}) {
  return (
    <div className="bg-white rounded-lg p-5 shadow mb-6 border border-gray-200 overflow-x-auto">
      <h3 className="text-base font-semibold mb-4">Recent Sales</h3>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-2">Item</th>
            <th className="pb-2">Product Name</th>
            <th className="pb-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(({ item, productName, price }, i) => (
            <tr key={i} className="border-t border-gray-100">
              <td className="py-2">{item}</td>
              <td className="py-2">{productName}</td>
              <td className="py-2">${price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TimePeriodTabs() {
  const [activeTab, setActiveTab] = React.useState("Month");
  const tabs = ["Day", "Month", "Year"];

  return (
    <div className="flex space-x-6 border-b border-gray-300">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm ${
              isActive
                ? "font-bold text-black border-b-2 border-grey"
                : "text-gray-400 font-normal"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

// Main App component to render the dashboard
export default function App() {
  const salesData = {
    sales: "$2,412",
    salesChange: "+12%",
    purchases: "$6,451",
    purchasesChange: "-22%",
    returns: "$2,412",
    returnsChange: "+1%",
    attrition: "$2,471",
    attritionChange: "-3%",
  };

  const salesTrendsData = {
    earnings: "$1,820",
    changePercent: "+12%",
  };

  const customerStatsData = {
    returningPct: 60,
    newPct: 30,
    retargetPct: 10,
    overallPct: 75,
  };

  const topCategoriesData = {
    categories: [
      { name: "Beverages", pct: 30 },
      { name: "Health", pct: 25 },
      { name: "Electronics", pct: 20 },
      { name: "Groceries", pct: 15 },
    ],
    overallPct: 70,
  };

  const customerDemographicsData = {
    ageDistribution: [
      { label: "18-24", pct: 25 },
      { label: "25-34", pct: 35 },
      { label: "35-44", pct: 20 },
      { label: "45-54", pct: 15 },
      { label: "55+", pct: 5 },
    ],
    genderDistribution: [
      { label: "Male", pct: 40 },
      { label: "Female", pct: 50 },
      { label: "Other", pct: 10 },
    ],
  };

  const bestSellingItemsData = {
    items: [
      { item: "Organic Green Tea", totalRevenue: "$1,230", percentSales: 15 },
      { item: "Premium Coffee", totalRevenue: "$1,100", percentSales: 13 },
      { item: "Artisanal Bread", totalRevenue: "$800", percentSales: 10 },
      { item: "Spicy Chips", totalRevenue: "$620", percentSales: 8 },
    ],
  };

  const recentSalesData = {
    sales: [
      { item: "123", productName: "Organic Green Tea", price: "12.95" },
      { item: "456", productName: "Lavender Soap", price: "6.50" },
      { item: "789", productName: "Beeswax Candles", price: "16.50" },
      { item: "101", productName: "Honey Sticks", price: "5.70" },
      { item: "112", productName: "Rosemary Cream", price: "25.00" },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen font-[Inter] p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Sales Statistics</h1>
      <TimePeriodTabs />
      <div className="mt-6">
        <SalesStatisticsSummary {...salesData} />
        <SalesTrendsChart {...salesTrendsData} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomerStatistics {...customerStatsData} />
          <TopSellingCategories {...topCategoriesData} />
        </div>
        <CustomerDemographics {...customerDemographicsData} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestSellingItemsTable {...bestSellingItemsData} />
          <RecentSalesTable {...recentSalesData} />
        </div>
      </div>
    </div>
  );
}