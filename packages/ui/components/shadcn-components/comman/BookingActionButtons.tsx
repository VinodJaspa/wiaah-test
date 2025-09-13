export default function BookingActionButtons({onCancel}) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button onClick={onCancel} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
        Cancel Booking
      </button>
      <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
        Download PDF
      </button>
      <button className="px-4 py-2 border rounded hover:bg-gray-100 transition">
        Contact Provider
      </button>
    </div>
  );
}
