"use client";

import { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

export default function SearchBarByLocationAndArea({
  placeholder1 = "Location",
  placeholder2 = "Cuisine, restaurant name...",
}: {
  placeholder1?: string;
  placeholder2?: string;
}) {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div className="flex justify-center w-full px-4 pb-4">
      <div className="flex w-full max-w-2xl rounded-md border border-gray-300 overflow-hidden">
        {/* Location Input */}
        <div className="flex items-center px-4 flex-1 bg-white">
          <FiMapPin className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={placeholder1}
            className="w-full py-3 text-sm text-gray-500 placeholder-gray-400 bg-white focus:outline-none border-transparent outline-none"
          />
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300"></div>

        {/* Search Input */}
        <div className="flex items-center px-4 flex-1 bg-white">
          <FiSearch className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder2}
            className="w-full py-3 text-sm text-gray-500 placeholder-gray-400 bg-white focus:outline-none border-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
}
