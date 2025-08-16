"use client";

import { useState } from "react";

export default function SearchBarHotel() {
  const [location, setLocation] = useState("Geneva");
  const [date, setDate] = useState("Aug 12 - Aug 14");
  const [guests, setGuests] = useState("2 Adults, 2 Children");

  return (
    <div className="flex gap-3 bg-white rounded-xl p-3 shadow-md">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button className="bg-blue-600 text-white px-4 rounded">Search</button>
    </div>
  );
}
