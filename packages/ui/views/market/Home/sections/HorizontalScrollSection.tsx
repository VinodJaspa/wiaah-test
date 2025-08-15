import React from "react";
import { Star } from "lucide-react";

interface HorizontalScrollSectionProps {
  title: string;
  buttonLabel: string;
  onButtonClick: () => void;
  isVideo?: boolean;
  items: any;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({
  title,
  buttonLabel,
  onButtonClick,
  isVideo,
  items,
}) => {
  return (
    <div className="mb-12 mt-12">
      {/* Title centered with spacing below */}
      <h2 className="text-lg md:text-xl font-bold text-center mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[220px] bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              {isVideo && (
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
            <div className="p-3 space-y-1">
              <h3 className="font-semibold text-sm truncate">{item.title}</h3>
              <div className="flex items-center text-xs text-yellow-500 gap-1">
                <Star size={14} fill="currentColor" />
                {item.rating}
                {item.reviews && (
                  <span className="text-gray-400">({item.reviews} Reviews)</span>
                )}
              </div>
              <button
                onClick={onButtonClick}
                className="w-full mt-2 bg-black text-white py-1.5 rounded hover:bg-gray-800 text-sm"
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
