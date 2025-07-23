import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const TABS = ["Last 30 days", "Last 10 days", "All time"];

const mockStats = [
  { label: "Earnings", value: "$1,234", change: "+12%", color: "text-green-500" },
  { label: "Spends", value: "$1,234", change: "-5%", color: "text-red-500" },
  { label: "Affiliation", value: "$1,234", change: "+8%", color: "text-green-500" },
  { label: "Cashback", value: "$1,234", change: "+3%", color: "text-green-500" },
];

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Earnings",
      data: [800, 950, 850, 1000, 1250, 900, 1100],
      fill: false,
      borderColor: "#3B82F6",
      tension: 0.4,
    },
  ],
};

const tableData = [
  {
    image: "https://www.bing.com/images/search?view=detailV2&ccid=JA8YTHyX&id=10C00D1744F9519E95EBCAD7066FBEC6239F9A88&thid=OIP.JA8YTHyXaMNDHgjabg-7EAHaIO&mediaurl=https%3a%2f%2fi5.walmartimages.com%2fasr%2f78ff8e5b-5570-4eb2-8ca0-422e4a64d51e.a392ad46e96f707de61a5547318e70d1.jpeg&exph=1500&expw=1350&q=headpone&simid=608027259877327246&FORM=IRPRST&ck=23591A388A64ECA655D060217FAFFAC8&selectedIndex=0&itb=0",
    type: "Product",
    date: "Jul 12, 2024",
    id: "8986464",
    price: "$150",
    percent: "10%",
    earning: "$15",
  },
  {
    image: "https://media.wired.com/photos/6463dbca88479249e0cc290e/master/w_2560%2Cc_limit/Dyzon%2520Zone%2520Review%2520Featured%2520Gear.jpg",
    type: "Service",
    date: "Jul 10, 2024",
    id: "8986464",
    price: "$200",
    percent: "10%",
    earning: "$20",
  },
  {
    image: "https://tse4.mm.bing.net/th/id/OIP.zKl9npCnm3Gj3knaMRY0IQHaH1?w=1417&h=1500&rs=1&pid=ImgDetMain&o=7&rm=3",
    type: "Service",
    date: "Jul 08, 2024",
    id: "8986464",
    price: "$190",
    percent: "10%",
    earning: "$19",
  },
];

export default function EarningsDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-8 space-y-8">
      {/* Tabs */}
      <div className="flex space-x-4 border rounded-full w-fit">
        {TABS.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-2 text-sm font-medium rounded-full ${
              activeTab === idx ? "bg-gray-900 text-white" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {mockStats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded shadow text-sm">
            <div className="text-gray-500">{stat.label}</div>
            <div className="text-xl font-semibold">{stat.value}</div>
            <div className={stat.color}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Earnings Summary */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Earnings</h3>
        <p className="text-2xl font-bold">$1,234</p>
        <p className="text-green-500 text-sm">This month +12%</p>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded shadow">
        <h4 className="text-lg font-semibold mb-4">Earnings</h4>
        <Line data={chartData} />
      </div>

      {/* Tables */}
      <div className="space-y-6">
        <TableSection
          title="Recent Affiliation Earnings"
          data={tableData}
          column="Affiliation %"
        />
        <TableSection
          title="Recent Cashback Earnings"
          data={tableData}
          column="Cashback %"
        />
      </div>
    </div>
  );
}

type TableSectionProps = {
  title: string;
  data: typeof tableData;
  column: string;
};

function TableSection({ title, data, column }: TableSectionProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500">
          <tr>
            <th className="py-2">Image</th>
            <th>Type</th>
            <th>Date</th>
            <th>ID</th>
            <th>Price</th>
            <th>{column}</th>
            <th>Earning</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2">
                <img
                  src={item.image}
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </td>
              <td>{item.type}</td>
              <td>{item.date}</td>
              <td>{item.id}</td>
              <td>{item.price}</td>
              <td>{item.percent}</td>
              <td>{item.earning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
