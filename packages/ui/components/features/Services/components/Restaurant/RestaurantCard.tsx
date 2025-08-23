"use client";

import { useRouter } from "next/router";

export default function RestaurantCard({
  image,
  id,
  name,
  cuisine,
  priceRange,
  tags = [],
  address,
  rating,
  reviews,
  onMapClick,
}: {
  id: string; // ✅ Add ID
  image: string;
  name: string;
  cuisine: string;
  priceRange: string;
  tags?: string[];
  address: string;
  rating: number;
  reviews: number;
  onMapClick?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white">
      <div className="relative">
        <div className="relative group">
          <img
            src={image}
            alt={name}
            className="w-full h-40 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => router.push(`/service/restaurant/${id}`)}
              className="bg-white text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              View Details
            </button>
          </div>
        </div>

      </div>

      <div className="p-3">
        <p className="text-sm text-gray-600 flex flex-wrap gap-2">
          <span>{priceRange}</span>
          <span>| {cuisine}</span>
          {tags.map((tag, idx) => (
            <span key={idx} className="text-red-500 font-medium">
              | {tag}
            </span>
          ))}
        </p>

        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">{address}</p>

        <div className="flex items-center mt-2 text-sm">
          ⭐ {rating} ({reviews} reviews)
        </div>

        <button
          onClick={() => router.push(`/service/restaurant/${id}`)}
          className="mt-2 text-red-600 text-sm hover:underline"
        >
          Show on Map
        </button>
      </div>
    </div>
  );
}
