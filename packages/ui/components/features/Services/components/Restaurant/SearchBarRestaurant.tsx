"use client";

import { useState } from "react";

export default function SearchBarRestaurant({
  placeholder1 = "Location",
  placeholder2 = "Cuisine, restaurant name...",
}: {
  placeholder1?: string;
  placeholder2?: string;
}) {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-3 bg-white rounded-xl p-3 shadow-md">
      <input
        type="text"
        placeholder={placeholder1}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder={placeholder2}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />
      <button className="bg-red-600 text-white px-4 rounded">Search</button>
    </div>
  );
}
