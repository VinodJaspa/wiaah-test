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
    <div className="rounded-2xl shadow-md overflow-hidden bg-white">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-black text-white text-sm px-2 py-1 rounded">
          From {price}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-500">{dateRange}</p>

        <div className="flex items-center mt-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="ml-1 text-sm">{rating}</span>
          <span className="ml-2 text-sm text-gray-500">
            ({reviews} reviews)
          </span>
        </div>

        <button
          onClick={onMapClick}
          className="mt-2 text-blue-600 text-sm hover:underline"
        >
          Show on Map
        </button>
      </div>
    </div>
  );
}
