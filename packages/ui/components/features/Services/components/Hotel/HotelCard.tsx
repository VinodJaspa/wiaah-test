"use client";

import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HotelCard({
  id,
  image,
  name,
  location,
  rating,
  reviews,
  price,
  dateRange,
  onMapClick,
}: {
  id: string; // ✅ Add ID
  image: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  dateRange: string;
  onMapClick?: () => void;
}) {
  const router = useRouter();

  return (
    <div className="group rounded-2xl shadow-md overflow-hidden bg-white max-w-sm relative">
      {/* Image + Price Badge */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <ImageTopbadge text={"From " + price} />

        {/* Hover Overlay + Details Button */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => router.push(`/service/hotel/${id}`)} // ✅ Navigate to details page with ID
            className="bg-white text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            View Details
          </button>
        </div>
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
          onClick={() =>
            router.push(`/search/services/hotels/${encodeURIComponent(location)}/onmap?id=${id}`)
          }
          className="text-red-600 text-sm font-medium hover:underline mt-1"
        >
          Show on Map
        </button>


      </div>
    </div>
  );
}
