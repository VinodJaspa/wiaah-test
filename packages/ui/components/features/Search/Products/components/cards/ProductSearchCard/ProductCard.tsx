"use client";
import { useState } from "react";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";

import ImageTopbadge from "@UI/components/shadcn-components/components/imageTopbadge";


interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  discount: number;
  cashback?: number;
  thumbnail: string;
  rating: number;
  onButtonClick?: () => void;
  onDelete?: () => void;
  position?: "delete" | "add";
  forceHover?: boolean;
  buttonText?: string;
  liked?:boolean;
}

export const ProductCard = ({
  id,
  title,
  price,
  discount,
  cashback,
  thumbnail,
  rating,
  onButtonClick,
  onDelete,
  position,
  forceHover,
  buttonText,
}: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-auto flex-shrink-0">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-56 object-cover rounded-md"
        />
        {cashback && <ImageTopbadge text={`${cashback}% Cashback`} />}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 text-lg"
        >
          {liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600" />
          )}
        </button>
      </div>

      <div className="mt-2 text-sm">
        <p className="font-medium line-clamp-2">{title}</p>

        <div className="flex items-center space-x-2">
          <span className="line-through text-gray-400 text-xs">
            ${(price / (1 - discount / 100)).toFixed(0)}
          </span>
          <span className="text-black font-semibold">${price}</span>
        </div>
        <span className="text-red-500 text-xs font-semibold">
          Save {discount}%
        </span>

        <div className="flex items-center mt-1 text-xs text-gray-600">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={i < Math.round(rating) ? "text-blue-500" : "text-gray-300"}
            />
          ))}
          <span className="ml-1">({rating.toFixed(1)})</span>
        </div>
      </div>
    </div>
  );
};
