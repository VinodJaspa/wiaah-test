import React from "react";
import { useTranslation } from "react-i18next";
import { BiStar } from "react-icons/bi";
import { useRouting } from "routing";

export interface ResturantRecommendedCardProps {
  price: number;
  thumbnail: string;
  id: number | string;
  title: string;
  rating: number;
  reviews: number;
  location: {
    city: string;
    country: string;
    address: string;
  };
  hashtags: string[];
  minimal?: boolean;
}

export const ResturantRecommendedCard: React.FC<
  ResturantRecommendedCardProps
> = ({
  price,
  thumbnail,
  id,
  title,
  rating,
  reviews,
  location,
  hashtags,
  minimal,
}) => {
  const { t } = useTranslation();
  const router = useRouting();

  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white flex flex-col">
      {/* Image Section */}
      <div className="relative group">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => router.push(`/service/restaurant/${id}`)}
            className="bg-white text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            {t("View Details")}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">
          {location.city}, {location.country}
        </p>
        <p className="text-sm text-gray-400">{location.address}</p>

        <div className="flex items-center mt-2 text-sm text-gray-600">
          <BiStar className="text-yellow-500 mr-1" /> {rating} ({reviews}{" "}
          {t("reviews")})
        </div>

        <p className="mt-2 text-sm text-gray-700">
          {t("Average price")}: ${price}
        </p>

        {/* Hashtags */}
        <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-500">
          {hashtags?.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
