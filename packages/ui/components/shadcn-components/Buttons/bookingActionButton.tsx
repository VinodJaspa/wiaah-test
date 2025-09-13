export default function ActionButtonsReservation() {
    return (
      <div className="flex justify-end space-x-2">
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition">
          Download PDF
        </button>
        <button className="bg-gray-100 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition">
          Contact Customer
        </button>
      </div>
    );
  }
  