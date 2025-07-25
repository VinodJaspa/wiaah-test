import { useResponsive } from "hooks";
import React, { useState } from "react";



export default function BookingCardList({ bookings }) {
  const { isMobile } = useResponsive();
  if (isMobile) {
    return (
      <BookingListMobileView bookings={bookings} />
    )
  }
  return (
    <div className="space-y-6 max-w-4xl mx-auto pt-4 pb-4">
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {/* Left side */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{booking.location}</h3>
            <p
              className={`text-sm ${booking.status === "Confirmed" ? "text-green-600" : "text-red-600"
                }`}
            >
              {booking.status}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {booking.dates} · {booking.nights}
            </p>
            <div className="inline-block mt-3 bg-gray-100 text-gray-800 text-sm  py-1 rounded-full font-medium">
              {booking.amount}
            </div>
          </div>

          {/* Image */}
          <img
            src={booking.image}
            alt={booking.location}
            className="w-full md:w-64 h-40 object-cover md:rounded-r-xl"
          />
        </div>
      ))}
    </div>
  );
}






function BookingListMobileView({ bookings }) {
  const [selected, setSelected] = useState<string | null>("Tokyo");

  return (
    <div className="space-y-6 bg-white pt-6 pb-6 rounded-lg shadow-sm">
      {bookings?.map((trip, index) => (
        <div key={index} className="flex items-center gap-4">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-14 h-14 rounded-md object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{trip.location}</p>
            <p className="text-sm text-gray-500">{trip.status}</p>
            <p className="text-sm text-gray-500">  {trip.dates} · {trip.nights}</p>
          </div>
          <span className="text-sm text-gray-700 bg-gray-100 rounded-full px-3 py-1">
            {trip.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
