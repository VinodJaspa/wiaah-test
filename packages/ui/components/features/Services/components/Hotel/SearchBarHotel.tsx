"use client";

import { useState } from "react";
import { Search, Calendar, Users, X } from "lucide-react";

export default function SearchBarHotel() {
  const [location, setLocation] = useState("Geneva");
  const [date, setDate] = useState("Aug 12 - Aug 14");
  const [guests, setGuests] = useState("2 Adults, 2 Children");

  const [editingLocation, setEditingLocation] = useState(false);
  const [editingDate, setEditingDate] = useState(false);
  const [editingGuests, setEditingGuests] = useState(false);

  return (
    <div className="w-full flex justify-center gap-4 bg-white rounded-xl p-4 shadow-md">
      {/* Location */}
      <div
        className="flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-lg min-w-[200px] cursor-pointer"
        onClick={() => setEditingLocation(true)}
      >
        <Search size={18} className="text-gray-500" />
        {editingLocation ? (
          <input
            autoFocus
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={() => setEditingLocation(false)}
            className="bg-transparent outline-none text-sm font-medium w-full"
          />
        ) : (
          <span className="text-gray-800 text-sm font-medium">{location}</span>
        )}
        {location && (
          <X
            size={16}
            className="ml-auto text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              setLocation("");
            }}
          />
        )}
      </div>

      {/* Dates */}
      <div
        className="flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-lg min-w-[200px] cursor-pointer"
        onClick={() => setEditingDate(true)}
      >
        <Calendar size={18} className="text-gray-500" />
        {editingDate ? (
          <input
            autoFocus
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onBlur={() => setEditingDate(false)}
            placeholder="Select date range"
            className="bg-transparent outline-none text-sm font-medium w-full"
          />
        ) : (
          <span className="text-gray-800 text-sm font-medium">{date}</span>
        )}
      </div>

      {/* Guests */}
      <div
        className="flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-lg min-w-[200px] cursor-pointer"
        onClick={() => setEditingGuests(true)}
      >
        <Users size={18} className="text-gray-500" />
        {editingGuests ? (
          <input
            autoFocus
            type="text"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            onBlur={() => setEditingGuests(false)}
            placeholder="2 Adults, 2 Children"
            className="bg-transparent outline-none text-sm font-medium w-full"
          />
        ) : (
          <span className="text-gray-800 text-sm font-medium">{guests}</span>
        )}
      </div>
    </div>
  );
}
