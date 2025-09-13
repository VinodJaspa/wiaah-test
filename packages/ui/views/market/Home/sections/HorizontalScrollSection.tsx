import React from "react";
import { Star } from "lucide-react";

interface HorizontalScrollSectionProps {
  title: string;
  buttonLabel: string;
  onButtonClick: () => void;
  isVideo?: boolean;
  items: any[];
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({
  title,
  buttonLabel,
  onButtonClick,
  isVideo,
  items,
}) => {
  return (
    <div className="space-y-4">
      {/* Section title */}
      <h2 className="text-lg md:text-xl font-bold">{title}</h2>

      {/* Horizontal scroll container */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-52 md:w-56 bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col"
          >
            {/* Image or placeholder */}
            <div className="relative w-full h-40 md:h-48 bg-gray-50 flex items-center justify-center">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-sm">No Image</div>
              )}

              {isVideo && item.thumbnail && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/70 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-semibold text-sm truncate">{item.title}</h3>

              <div className="flex items-center text-xs text-yellow-500 gap-1 mt-1">
                <Star size={14} fill="currentColor" />
                {item.rating}
                {item.reviews && (
                  <span className="text-gray-400 truncate">({item.reviews} Reviews)</span>
                )}
              </div>

              {/* Add to cart button pinned at bottom */}
              <div className="mt-auto">
                <button
                  onClick={onButtonClick}
                  className="w-full mt-2 bg-black text-white py-1.5 rounded hover:bg-gray-800 text-sm"
                >
                  {buttonLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
