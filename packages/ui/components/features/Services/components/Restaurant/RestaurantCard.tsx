"use client";

export default function RestaurantCard({
  image,
  name,
  cuisine,
  priceRange,
  tags = [],
  address,
  rating,
  reviews,
  onMapClick,
}: {
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
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
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
          onClick={onMapClick}
          className="mt-2 text-red-600 text-sm hover:underline"
        >
          Show on Map
        </button>
      </div>
    </div>
  );
}
