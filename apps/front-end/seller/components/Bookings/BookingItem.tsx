
export default function BookingItem({ booking , handleBookingDeatils }) {
  return (
    <div className="relative flex items-start  pb-6">
      <div className="flex-1">
        <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
        <h3 className="text-lg font-semibold mt-1">{booking.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {booking.time} · {booking.venue}
        </p>
        <button onClick={handleBookingDeatils} className="mt-3 px-4 py-1.5 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition">
          View Details
        </button>
      </div>
      <img
        src={booking.image}
        alt={booking.title}
        className="w-48 h-28 object-cover rounded-lg ml-auto"
      />
    </div>
  );
}
