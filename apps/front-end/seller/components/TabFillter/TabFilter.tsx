const tabs = ["All", "To Ship", "Shipped", "Delivered"];

export default function TabFilter({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-4 mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 text-sm font-medium ${
            activeTab === tab
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
