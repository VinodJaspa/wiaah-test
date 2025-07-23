export default function BookingTabs() {
    return (
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        {["Upcoming", "Past", "Cancelled"].map((tab, idx) => (
          <button
            key={idx}
            className={`py-2 text-sm font-medium ${
              idx === 0 ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  