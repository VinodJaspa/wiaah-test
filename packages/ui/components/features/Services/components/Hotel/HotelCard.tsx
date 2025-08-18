"use client";

import { Star } from "lucide-react";

export default function HotelCard({
  image,
  name,
  location,
  rating,
  reviews,
  price,
  dateRange,
  onMapClick,
}: {
  image: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  dateRange: string;
  onMapClick?: () => void;
}) {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white max-w-sm">
      {/* Image + Price Badge */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-white/80 text-black font-medium text-sm px-3 py-1 rounded-md">
          From {price}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-500">{dateRange}</p>

        {/* Rating + Reviews */}
        <div className="flex items-center text-sm mt-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 font-medium">{rating}</span>
          <span className="ml-2 text-gray-500">({reviews} reviews)</span>
        </div>

        {/* Show on Map */}
        <button
          onClick={onMapClick}
          className="text-red-600 text-sm font-medium hover:underline mt-1"
        >
          Show on Map
        </button>
      </div>
    </div>
  );
}
