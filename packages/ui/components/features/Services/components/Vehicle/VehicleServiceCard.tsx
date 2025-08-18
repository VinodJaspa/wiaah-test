import React from "react";

export default function VehicleServiceCard({
  image,
  price,
  priceType,
  title,
  provider,
  location,
  reviews,
  rating,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 bg-white text-black text-sm font-semibold px-3 py-1 rounded-md shadow">
          {price} per {priceType}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-blue-500">{provider}</p>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-700 mt-1">
          ⭐ {rating} ({reviews} reviews)
        </p>
        <button className="text-sm text-red-500 mt-2">Show on Map</button>
      </div>
    </div>
  );
}
