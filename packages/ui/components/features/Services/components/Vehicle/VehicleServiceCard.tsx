"use client";

import React from "react";
import { useRouter } from "next/router";
import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";

export default function VehicleServiceCard({
  id, // Added ID for redirect
  image,
  price,
  priceType,
  title,
  provider,
  location,
  reviews,
  rating,
}: any) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative group">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        {/* Price badge */}
        <ImageTopbadge text ={price + " per " + priceType}/>
       

        {/* Hover Overlay + View Details */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => router.push(`/service/vehicle/${id}`)}
            className="bg-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-blue-500">{provider}</p>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-700 mt-1">
          ⭐ {rating} ({reviews} reviews)
        </p>

        {/* Optional Show on Map button */}
        <button className="text-sm text-red-500 mt-2">Show on Map</button>
      </div>
    </div>
  );
}
